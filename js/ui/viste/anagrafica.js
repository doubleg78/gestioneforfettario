import { h, campo, scheda, testataPagina, bottone, chip, avviso, percentuale } from '../dom.js';
import { icona } from '../icone.js';
import { TIPI_PREVIDENZA, nuovaVoceAteco } from '../../domain/modello.js';
import { coefficienteAteco2025, gruppoAteco } from '../../fiscal/ateco.js';
import { cercaAteco, titoloAteco2025 } from '../../fiscal/ateco-ricerca.js';
import { verificaRequisitiStartup } from '../../fiscal/requisiti.js';
import { partitaIvaValida, codiceFiscaleValido, codiceFiscaleSocietaValido } from '../../domain/validazione.js';
import { ETICHETTE_GRUPPI, testataCliente } from '../dominio-ui.js';
import { apriDialogo } from '../overlay.js';

const DESCRIZIONI_PREVIDENZA = {
  'gestione-separata': 'Professionisti senza cassa propria. Aliquota 26,07% (24% se già pensionati o assicurati altrove), senza minimale.',
  artigiani: 'Gestione IVS artigiani: contributi fissi sul minimale più quota sul reddito eccedente. Riduzione del 35% per i forfettari su domanda.',
  commercianti: 'Gestione IVS commercianti: contributi fissi sul minimale più quota sul reddito eccedente. Riduzione del 35% per i forfettari su domanda.',
  cassa: 'Cassa professionale propria (ingegneri, architetti, avvocati…). Aliquota e minimo dipendono dalla cassa.',
};

export function vistaAnagrafica(ctx) {
  const { archivio, cliente: c, params } = ctx;
  const bozza = structuredClone(c);
  let sporco = false;
  const barra = h('div', { classe: 'barra-salvataggio no-stampa', hidden: true });
  const segnaModifica = () => {
    sporco = true;
    barra.hidden = false;
  };
  const input = (props = {}) => h('input', { classe: 'input', ...props });
  const campoTesto = (etichetta, chiave, props = {}, aiuto) => campo(etichetta, input({ type: 'text', valore: bozza[chiave] ?? '', onInput: (e) => { bozza[chiave] = e.target.value; segnaModifica(); }, ...props }), aiuto);

  // --- Dati del contribuente ---
  const nome = campoTesto('Nome o ragione sociale', 'nome', { required: true, autocomplete: 'off' });
  const cf = campoTesto('Codice fiscale', 'codiceFiscale', { maxlength: '16', autocapitalize: 'characters', placeholder: 'RSSMRA85T10A562S' });
  const piva = campoTesto('Partita IVA', 'partitaIva', { maxlength: '11', inputmode: 'numeric', placeholder: '11 cifre' });
  const anno = campo('Anno di inizio attività', input({ type: 'number', min: '1950', max: '2100', valore: bozza.annoInizioAttivita, onInput: (e) => { bozza.annoInizioAttivita = Number(e.target.value); segnaModifica(); } }));

  // --- Previdenza ---
  const sezPrev = h('div', { classe: 'pila', style: 'gap:14px' });
  const disegnaPrev = () => {
    const p = bozza.previdenza;
    sezPrev.replaceChildren(
      h('div', { classe: 'opzioni-scelta', role: 'radiogroup', 'aria-label': 'Gestione previdenziale' }, TIPI_PREVIDENZA.map((t) => h('label', { classe: `opzione ${p.tipo === t.valore ? 'scelta' : ''}` },
        h('input', { type: 'radio', name: 'previdenza', value: t.valore, checked: p.tipo === t.valore, onChange: () => { p.tipo = t.valore; segnaModifica(); disegnaPrev(); } }),
        h('div', null, h('strong', null, t.etichetta.replace(/ \(.*\)/, '')), h('div', { classe: 'muted piccolo' }, DESCRIZIONI_PREVIDENZA[t.valore]))))),
      p.tipo === 'gestione-separata' ? h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: p.altraCopertura, onChange: (e) => { p.altraCopertura = e.target.checked; segnaModifica(); } }), 'Già pensionato o assicurato presso altra forma obbligatoria (aliquota 24%)') : null,
      p.tipo === 'artigiani' || p.tipo === 'commercianti' ? h('div', { classe: 'pila', style: 'gap:10px' },
        h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: p.iscrittoDal1996, onChange: (e) => { p.iscrittoDal1996 = e.target.checked; segnaModifica(); } }), 'Iscritto dal 1° gennaio 1996 o dopo (massimale 122.295 € nel 2026)'),
        h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: p.riduzione35, onChange: (e) => { p.riduzione35 = e.target.checked; segnaModifica(); } }), 'Riduzione contributiva del 35% (regime forfettario, su domanda INPS)')) : null,
      p.tipo === 'cassa' ? h('div', { classe: 'griglia-campi' },
        campo('Aliquota contributo soggettivo (%)', input({ type: 'number', step: '0.01', min: '0', max: '100', valore: +(p.cassa.aliquotaSoggettiva * 100).toFixed(3), onInput: (e) => { p.cassa.aliquotaSoggettiva = Number(e.target.value) / 100; segnaModifica(); } }), 'Dipende dalla cassa di appartenenza.'),
        campo('Contributo minimo annuo (€)', input({ type: 'number', step: '0.01', min: '0', valore: p.cassa.contributoMinimo, onInput: (e) => { p.cassa.contributoMinimo = Number(e.target.value); segnaModifica(); } }))) : null);
  };
  disegnaPrev();

  // --- ATECO ---
  const elencoAteco = h('div', { classe: 'pila', style: 'gap:14px' });
  const disegnaAteco = () => {
    elencoAteco.replaceChildren(...(bozza.ateco.length ? bozza.ateco.map((v, i) => rigaAteco(v, i)) : [avviso('info', 'Nessun codice ATECO.', 'Aggiungine almeno uno per calcolare il reddito forfettario.')]));
  };
  function rigaAteco(v, i) {
    const risultati = h('ul', { classe: 'suggerimenti', role: 'listbox', hidden: true });
    const stato = h('div', { classe: 'pila', style: 'gap:8px' });
    const ambiguo = () => (v.codice ? coefficienteAteco2025(v.codice, params) : null);
    const aggiornaStato = () => {
      stato.replaceChildren();
      const r2025 = v.codice ? coefficienteAteco2025(v.codice, params) : null;
      const r2007 = v.codice && !r2025 ? gruppoAteco(v.codice) : null;
      const coeff = params.forfettario.coefficienti[v.gruppo];
      if (r2025) stato.append(h('div', { classe: 'riga-flex', style: 'gap:8px' }, chip('ok', 'ATECO 2025 riconosciuto', 'spunta'), h('span', { classe: 'muted piccolo' }, titoloAteco2025(v.codice) ?? '')));
      else if (r2007) stato.append(h('div', { classe: 'riga-flex', style: 'gap:8px' }, chip('info', 'Codice ATECO 2007/2022', 'info')));
      else if (v.codice) stato.append(avviso('errore', 'Codice non riconosciuto.', 'Scegli il gruppo di settore manualmente.'));
      if (r2025 && !r2025.univoco) stato.append(avviso('attenzione', 'Raccordo non univoco.', `L’attività può rientrare in più gruppi: ${r2025.candidati.map((x) => `${ETICHETTE_GRUPPI[x.gruppo]} (${percentuale(x.coefficiente)})`).join(' oppure ')}. Scegli in base alla visura.`));
      stato.append(h('div', { classe: 'griglia-campi' }, campo('Gruppo di settore e coefficiente', h('select', { classe: 'input', onChange: (e) => { v.gruppo = e.target.value; segnaModifica(); aggiornaStato(); } },
        Object.entries(ETICHETTE_GRUPPI).map(([k, et]) => h('option', { value: k, selected: k === v.gruppo }, `${et} — ${percentuale(params.forfettario.coefficienti[k])}`))))),
        coeff ? h('div', { classe: 'riga-flex' }, chip('primario', `Coefficiente di redditività ${percentuale(coeff)}`)) : null);
    };
    const campoCerca = input({ type: 'text', valore: v.codice ? `${v.codice}${v.descrizione ? ` — ${v.descrizione}` : ''}` : '', placeholder: 'Cerca per attività o codice (es. programmazione, 62.10)', autocomplete: 'off', role: 'combobox', 'aria-expanded': 'false' });
    let cursore = -1, trovati = [];
    const scegli = (r) => {
      v.codice = r.codice; v.descrizione = r.titolo;
      const ris = coefficienteAteco2025(r.codice, params);
      if (ris) v.gruppo = ris.candidati[0].gruppo;
      campoCerca.value = `${r.codice} — ${r.titolo}`;
      risultati.hidden = true; segnaModifica(); aggiornaStato();
    };
    const mostra = () => {
      risultati.replaceChildren(...trovati.map((r, k) => h('li', { role: 'option', 'aria-selected': String(k === cursore), onPointerdown: (e) => { e.preventDefault(); scegli(r); } }, h('strong', null, r.codice), ' ', r.titolo)));
      risultati.hidden = trovati.length === 0;
      campoCerca.setAttribute('aria-expanded', String(!risultati.hidden));
    };
    campoCerca.addEventListener('input', () => {
      const t = campoCerca.value;
      if (/^\d{2}\.\d{2}\.\d{2}$/.test(t.trim()) || /^\d{2}(\.\d{1,2})?$/.test(t.trim())) { v.codice = t.trim(); v.descrizione = titoloAteco2025(v.codice) ?? ''; const ris = coefficienteAteco2025(v.codice, params); if (ris) v.gruppo = ris.candidati[0].gruppo; else if (gruppoAteco(v.codice)) v.gruppo = gruppoAteco(v.codice); }
      trovati = cercaAteco(t); cursore = -1; mostra(); segnaModifica(); aggiornaStato();
    });
    campoCerca.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); cursore = Math.min(cursore + 1, trovati.length - 1); mostra(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); cursore = Math.max(cursore - 1, 0); mostra(); }
      if (e.key === 'Enter' && cursore >= 0) { e.preventDefault(); scegli(trovati[cursore]); }
      if (e.key === 'Escape') { risultati.hidden = true; }
    });
    campoCerca.addEventListener('blur', () => setTimeout(() => { risultati.hidden = true; }, 120));
    aggiornaStato();
    return h('div', { classe: 'riga-ateco-nuova' },
      h('div', { style: 'position:relative' }, campo(`Attività ${i + 1}`, campoCerca), risultati),
      stato,
      h('div', null, bottone('Rimuovi', { variante: 'ghost pericolo', piccolo: true, icona: 'cestino', onClick: () => { bozza.ateco.splice(i, 1); segnaModifica(); disegnaAteco(); } })));
  }
  disegnaAteco();

  // --- Aliquota ---
  const verifica = () => {
    const d = { attivitaNeiTreAnniPrecedenti: false, prosecuzioneAltraAttivita: false, proseguitaAttivitaAltroSoggetto: false, ricaviAttivitaRilevata: 0 };
    const esito = h('div');
    const casella = (et, k) => h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', onChange: (e) => { d[k] = e.target.checked; } }), et);
    const dlg = apriDialogo({
      titolo: 'Verifica requisiti per l’aliquota del 5%',
      corpo: h('div', { classe: 'pila', style: 'gap:12px' },
        h('p', { classe: 'muted' }, 'Art. 1 c. 65 L. 190/2014: aliquota del 5% per l’anno di inizio e i quattro successivi, se ricorrono tutte le condizioni.'),
        casella('Ho esercitato attività artistica, professionale o d’impresa nei 3 anni precedenti', 'attivitaNeiTreAnniPrecedenti'),
        casella('L’attività è mera prosecuzione di un precedente lavoro dipendente o autonomo', 'prosecuzioneAltraAttivita'),
        casella('Proseguo un’attività svolta in precedenza da altro soggetto', 'proseguitaAttivitaAltroSoggetto'), esito),
      azioni: [bottone('Chiudi', { onClick: () => dlg.chiudi() }), bottone('Verifica e applica', { variante: 'primario', onClick: () => {
        const r = verificaRequisitiStartup(d);
        bozza.startup = r.ammesso; segnaModifica();
        esito.replaceChildren(r.ammesso ? avviso('ok', 'Requisiti soddisfatti.', 'Applicata l’aliquota del 5% (ricordati di salvare).') : avviso('errore', 'Requisiti non soddisfatti.', 'Si applica l’aliquota del 15%.'));
        disegnaStartup();
      } })],
    });
  };
  const sezStartup = h('div', { classe: 'pila', style: 'gap:12px' });
  const disegnaStartup = () => sezStartup.replaceChildren(
    h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: bozza.startup, onChange: (e) => { bozza.startup = e.target.checked; segnaModifica(); } }), h('span', null, 'Applica l’aliquota del 5% ', h('span', { classe: 'muted' }, '(nuova attività, primi 5 anni)'))),
    h('div', null, bottone('Verifica guidata dei requisiti', { icona: 'spunta', piccolo: true, onClick: verifica })));
  disegnaStartup();

  const note = h('textarea', { classe: 'input', rows: '3', style: 'height:auto;padding:10px 12px', onInput: (e) => { bozza.note = e.target.value; segnaModifica(); } }, bozza.note ?? '');

  const salva = async () => {
    nome.mostraErrore(bozza.nome.trim() ? null : 'Il nome è obbligatorio.');
    const ivaOk = !bozza.partitaIva || partitaIvaValida(bozza.partitaIva);
    piva.mostraErrore(ivaOk ? null : 'Partita IVA non valida (controlla la cifra di controllo).');
    const cfOk = !bozza.codiceFiscale || codiceFiscaleValido(bozza.codiceFiscale) || codiceFiscaleSocietaValido(bozza.codiceFiscale);
    cf.mostraErrore(cfOk ? null : 'Codice fiscale non valido.');
    if (!bozza.nome.trim() || !ivaOk || !cfOk) { ctx.toast('Controlla i campi evidenziati.', 'errore'); return; }
    bozza.codiceFiscale = bozza.codiceFiscale.toUpperCase();
    await archivio.modifica((d) => { Object.assign(d.clienti.find((x) => x.id === c.id), bozza); });
    ctx.toast('Anagrafica salvata.');
  };
  barra.append(h('div', { classe: 'riga-flex', style: 'gap:10px' }, icona('info', 16), 'Modifiche non salvate'),
    h('div', { classe: 'gruppo-azioni' }, bottone('Annulla', { onClick: () => ctx.aggiorna() }), bottone('Salva anagrafica', { variante: 'primario', icona: 'spunta', onClick: salva })));

  return h('div', { classe: 'pila' },
    testataCliente(ctx, null),
    scheda({ titolo: 'Dati del contribuente' }, h('div', { classe: 'griglia-campi' }, nome, cf, piva, anno)),
    scheda({ titolo: 'Gestione previdenziale', sottotitolo: 'Determina contributi, minimale e scadenze' }, sezPrev),
    scheda({ titolo: 'Attività e coefficiente di redditività', sottotitolo: 'Cerca per descrizione o codice ATECO 2025 (raccordo ISTAT) oppure inserisci un codice 2007/2022',
      azioni: [bottone('Aggiungi attività', { icona: 'piu', piccolo: true, onClick: () => { bozza.ateco.push(nuovaVoceAteco()); segnaModifica(); disegnaAteco(); } })] }, elencoAteco),
    scheda({ titolo: 'Aliquota imposta sostitutiva' }, sezStartup),
    scheda({ titolo: 'Note' }, campo('Note interne', note)),
    barra);
}
