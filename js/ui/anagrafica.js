import { h, campo, avviso, percentuale } from './dom.js';
import { TIPI_PREVIDENZA, nuovaVoceAteco } from '../domain/modello.js';
import { coefficienteAteco, coefficienteAteco2025, gruppoAteco } from '../fiscal/ateco.js';
import { verificaRequisitiStartup } from '../fiscal/requisiti.js';

const ETICHETTE_GRUPPI = {
  'industrie-alimentari-bevande': 'Industrie alimentari e bevande',
  'commercio-ingrosso-dettaglio': 'Commercio all’ingrosso e al dettaglio',
  'commercio-ambulante-alimentare': 'Commercio ambulante di prodotti alimentari e bevande',
  'commercio-ambulante-altri': 'Commercio ambulante di altri prodotti',
  'intermediari-commercio': 'Intermediari del commercio',
  'alloggio-ristorazione': 'Servizi di alloggio e ristorazione',
  'attivita-professionali-sanitarie': 'Attività professionali, scientifiche, tecniche, sanitarie, istruzione, finanza e assicurazioni',
  'costruzioni-immobiliari': 'Costruzioni e attività immobiliari',
  'altre-attivita': 'Altre attività economiche',
};

export function vistaAnagrafica(ctx) {
  const { archivio, cliente: c, params } = ctx;
  if (!c) return h('div', null, h('h1', null, 'Anagrafica'), avviso('attenzione', 'Nessun cliente selezionato.', 'Creane uno dalla sezione Clienti.'));

  // Copia di lavoro: si modifica solo al salvataggio
  const bozza = structuredClone(c);
  const testo = (chiave, props = {}) => h('input', { type: 'text', valore: bozza[chiave] ?? '', onInput: (e) => { bozza[chiave] = e.target.value; }, ...props });

  const selPrev = h('select', { onChange: (e) => { bozza.previdenza.tipo = e.target.value; aggiornaPrev(); } },
    TIPI_PREVIDENZA.map((t) => h('option', { value: t.valore, selected: t.valore === bozza.previdenza.tipo }, t.etichetta)));
  const spunta = (etichetta, get, set) => h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: get(), onChange: (e) => set(e.target.checked) }), etichetta);

  const opzPrev = h('div', { classe: 'griglia' });
  function aggiornaPrev() {
    const p = bozza.previdenza;
    opzPrev.replaceChildren();
    if (p.tipo === 'gestione-separata') {
      opzPrev.append(spunta('Già pensionato o assicurato presso altra forma obbligatoria (aliquota 24%)', () => p.altraCopertura, (v) => { p.altraCopertura = v; }));
    } else if (p.tipo === 'artigiani' || p.tipo === 'commercianti') {
      opzPrev.append(
        spunta('Iscritto dal 1° gennaio 1996 o successivamente (massimale 122.295 €)', () => p.iscrittoDal1996, (v) => { p.iscrittoDal1996 = v; }),
        spunta('Riduzione contributiva del 35% (regime forfettario, su domanda INPS)', () => p.riduzione35, (v) => { p.riduzione35 = v; }));
    } else {
      opzPrev.append(
        campo('Aliquota contributo soggettivo (%)', h('input', { type: 'number', step: '0.01', min: '0', max: '100', valore: p.cassa.aliquotaSoggettiva * 100, onInput: (e) => { p.cassa.aliquotaSoggettiva = Number(e.target.value) / 100; } }), 'Dipende dalla cassa di appartenenza.'),
        campo('Contributo minimo annuo (€)', h('input', { type: 'number', step: '0.01', min: '0', valore: p.cassa.contributoMinimo, onInput: (e) => { p.cassa.contributoMinimo = Number(e.target.value); } })));
    }
  }
  aggiornaPrev();

  // --- Codici ATECO ---
  const listaAteco = h('div');
  function disegnaAteco() {
    listaAteco.replaceChildren();
    if (bozza.ateco.length === 0) listaAteco.append(h('p', { classe: 'tenue' }, 'Nessun codice ATECO. Aggiungine almeno uno per calcolare il reddito forfettario.'));
    bozza.ateco.forEach((v, i) => {
      const info = h('small', { classe: 'tenue' }, descrizioneCoeff(v));
      const sel = h('select', { onChange: (e) => { v.gruppo = e.target.value; info.textContent = descrizioneCoeff(v); } },
        Object.entries(ETICHETTE_GRUPPI).map(([k, et]) => h('option', { value: k, selected: k === v.gruppo }, `${et} — ${percentuale(params.forfettario.coefficienti[k])}`)));
      const suggerimento = h('div');
      const cod = h('input', { type: 'text', valore: v.codice, placeholder: 'es. 62.10.00', onInput: (e) => { v.codice = e.target.value.trim(); } });
      const cerca = h('button', { type: 'button', onClick: () => {
        suggerimento.replaceChildren();
        const r2025 = coefficienteAteco2025(v.codice, params);
        if (r2025?.univoco) { v.gruppo = r2025.candidati[0].gruppo; sel.value = v.gruppo; info.textContent = descrizioneCoeff(v); return suggerimento.append(avviso('ok', 'Codice ATECO 2025 riconosciuto.')); }
        if (r2025) return suggerimento.append(avviso('attenzione', 'Codice ambiguo.', `Il raccordo ISTAT 2025–2022 prevede più gruppi: ${r2025.candidati.map((x) => ETICHETTE_GRUPPI[x.gruppo]).join(' oppure ')}. Scegli il gruppo corretto in base alla visura.`));
        const g = gruppoAteco(v.codice);
        if (g) { v.gruppo = g; sel.value = g; info.textContent = descrizioneCoeff(v); return suggerimento.append(avviso('ok', 'Codice ATECO 2007/2022 riconosciuto.')); }
        suggerimento.append(avviso('errore', 'Codice non riconosciuto.', 'Scegli il gruppo manualmente.'));
      } }, 'Suggerisci gruppo');
      listaAteco.append(h('div', null,
        h('div', { classe: 'riga-ateco' },
          campo('Codice ATECO', cod),
          campo('Descrizione attività', h('input', { type: 'text', valore: v.descrizione, onInput: (e) => { v.descrizione = e.target.value; } })),
          campo('Gruppo di settore e coefficiente', sel),
          h('button', { type: 'button', classe: 'pericolo', onClick: () => { bozza.ateco.splice(i, 1); disegnaAteco(); } }, 'Rimuovi')),
        h('div', { classe: 'azioni' }, cerca, info), suggerimento));
    });
  }
  function descrizioneCoeff(v) { const k = params.forfettario.coefficienti[v.gruppo]; return k ? `Coefficiente di redditività ${percentuale(k)}` : ''; }
  disegnaAteco();

  // --- Aliquota 5% ---
  const esitoStartup = h('div');
  const chkStartup = h('input', { type: 'checkbox', checked: bozza.startup, onChange: (e) => { bozza.startup = e.target.checked; } });
  const datiStartup = { attivitaNeiTreAnniPrecedenti: false, prosecuzioneAltraAttivita: false, proseguitaAttivitaAltroSoggetto: false, ricaviAttivitaRilevata: 0 };
  const verStartup = h('button', { type: 'button', onClick: () => {
    const r = verificaRequisitiStartup(datiStartup);
    esitoStartup.replaceChildren(
      r.ammesso ? avviso('ok', 'Requisiti soddisfatti.', 'Puoi applicare l’aliquota del 5% per l’anno di inizio e i quattro successivi.') : avviso('errore', 'Requisiti non soddisfatti.', 'Si applica l’aliquota del 15%.'));
    chkStartup.checked = bozza.startup = r.ammesso;
  } }, 'Verifica requisiti');
  const chk = (et, k) => h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', onChange: (e) => { datiStartup[k] = e.target.checked; } }), et);

  const esito = h('div');
  if (ctx.stato.flash) { esito.append(avviso('ok', ctx.stato.flash)); ctx.stato.flash = null; }
  const form = h('form', { onSubmit: async (e) => {
    e.preventDefault();
    await archivio.modifica((d) => { Object.assign(d.clienti.find((x) => x.id === c.id), bozza); });
    ctx.stato.flash = 'Anagrafica salvata.';
    ctx.aggiorna();
  } },
  h('div', { classe: 'scheda' },
    h('h2', null, 'Dati del contribuente'),
    h('div', { classe: 'griglia' },
      campo('Nome o ragione sociale', testo('nome', { required: true })),
      campo('Codice fiscale', testo('codiceFiscale', { maxlength: '16', autocapitalize: 'characters' })),
      campo('Partita IVA', testo('partitaIva', { maxlength: '11', inputmode: 'numeric' })),
      campo('Anno di inizio attività', h('input', { type: 'number', min: '1950', max: '2100', valore: bozza.annoInizioAttivita, onInput: (e) => { bozza.annoInizioAttivita = Number(e.target.value); } })))),
  h('div', { classe: 'scheda' },
    h('h2', null, 'Previdenza'),
    campo('Gestione previdenziale', selPrev), opzPrev),
  h('div', { classe: 'scheda' },
    h('h2', null, 'Codici ATECO e coefficiente di redditività'),
    h('p', { classe: 'tenue' }, 'Accetta codici ATECO 2025 (tramite il raccordo ISTAT con l’ATECO 2022) e codici 2007/2022.'),
    listaAteco,
    h('div', { classe: 'azioni' }, h('button', { type: 'button', onClick: () => { bozza.ateco.push(nuovaVoceAteco()); disegnaAteco(); } }, 'Aggiungi codice ATECO'))),
  h('div', { classe: 'scheda' },
    h('h2', null, 'Aliquota imposta sostitutiva'),
    h('label', { classe: 'spunta' }, chkStartup, 'Applica l’aliquota del 5% (nuova attività, primi 5 anni)'),
    h('details', null,
      h('summary', null, 'Verifica guidata dei requisiti (art. 1 c. 65 L. 190/2014)'),
      chk('Ho esercitato attività artistica, professionale o d’impresa nei 3 anni precedenti', 'attivitaNeiTreAnniPrecedenti'),
      chk('L’attività è mera prosecuzione di precedente lavoro dipendente o autonomo', 'prosecuzioneAltraAttivita'),
      chk('Proseguo un’attività svolta da altro soggetto', 'proseguitaAttivitaAltroSoggetto'),
      h('div', { classe: 'azioni' }, verStartup), esitoStartup)),
  h('div', { classe: 'scheda' }, h('div', { classe: 'campo' }, h('label', { for: 'note' }, 'Note'),
    h('textarea', { id: 'note', rows: '3', onInput: (e) => { bozza.note = e.target.value; } }, bozza.note))),
  esito,
  h('div', { classe: 'azioni' }, h('button', { type: 'submit', classe: 'primario' }, 'Salva anagrafica')));

  return h('div', null, h('h1', null, 'Anagrafica'), h('p', { classe: 'tenue' }, c.nome || 'Nuovo cliente'), form);
}
