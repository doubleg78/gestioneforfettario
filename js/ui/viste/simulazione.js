import { h, campo, scheda, bottone, avviso, tile, vuoto, euro, percentuale, testataPagina, scarica } from '../dom.js';
import { icona } from '../icone.js';
import { confrontaRegimi, scenari } from '../../fiscal/confronto.js';
import { verificaSoglieRicavi } from '../../fiscal/requisiti.js';
import { csvConfronto } from '../../export/csv.js';
import { pdfSimulazione } from '../../export/pdf.js';
import { graficoLinee } from '../grafici.js';
import { round2 } from '../../fiscal/utils.js';
import { testataCliente, esportaPdf } from '../dominio-ui.js';
import { etichettaPrevidenza } from '../shell.js';

const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

export function vistaSimulazione(ctx) {
  const { cliente: c, anno, params, esatto, annoUsato } = ctx;
  const r = ctx.riepilogo();
  const voci = r.perAteco.filter((v) => v.coefficiente > 0);
  if (voci.length === 0) {
    return h('div', { classe: 'pila' }, testataCliente(ctx, null), vuoto({ icona: 'bilancia', titolo: 'Servono i codici ATECO', testo: 'Per simulare il regime forfettario assegna almeno un codice ATECO con coefficiente nell’anagrafica del cliente.', azioni: [bottone('Vai all’anagrafica', { variante: 'primario', onClick: () => ctx.naviga('#/anagrafica') })] }));
  }

  const chiaveStato = `sim:${c.id}:${anno}`;
  const s = ctx.stato[chiaveStato] ??= { ricavi: null, costi: null, ricaviPct: 0, costiPct: 0, addReg: 1.73, addCom: 0.8, detrazioni: 0, altriRedditi: 0, perdite: 0, senzaDetrAut: false, irap: false };
  const ricaviBase = s.ricavi ?? r.ricavi;
  const costiBase = s.costi ?? r.spese;
  const risultati = h('div', { classe: 'pila' });

  function ricalcola() {
    const ricavi = round2(ricaviBase * (1 + s.ricaviPct / 100));
    const costi = round2(costiBase * (1 + s.costiPct / 100));
    const somma = voci.reduce((t, v) => t + v.importo, 0);
    const ripartiti = voci.map((v, i) => ({ importo: somma > 0 ? (v.importo / somma) * ricavi : i === 0 ? ricavi : 0, coefficiente: v.coefficiente }));
    const input = {
      ricavi, costiReali: costi, ricaviPerAteco: ripartiti, aliquota: r.aliquota.aliquota, previdenza: c.previdenza, riduzione35: c.previdenza.riduzione35,
      ordinario: { addizionaleRegionale: s.addReg / 100, addizionaleComunale: s.addCom / 100, detrazioni: s.detrazioni, altriRedditi: s.altriRedditi, perditePregresse: s.perdite, senzaDetrazioneAutonomi: s.senzaDetrAut, soggettoIrap: s.irap },
    };
    const conf = confrontaRegimi(params, input);
    const f = conf.forfettario, o = conf.ordinario;
    const soglia = verificaSoglieRicavi(params, ricavi);
    const conv = conf.conveniente;
    const x = [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50];
    const sc = scenari(params, { ...input }, x.map((p) => ({ ricaviPct: p / 100 })));

    const segmenti = (reg) => {
      const tot = Math.max(ricavi, 1);
      return [
        ['Costi', costi, 'var(--asse)'], ['Contributi', reg.contributi.totale, 'var(--serie-2)'],
        ['Imposte', reg === f ? f.imposta : o.irpef + o.addizionali + o.irap, '#475569'], ['Netto', reg.netto, 'var(--serie-1)'],
      ].map(([et, val, col]) => ({ et, val: Math.max(val, 0), pct: Math.max(val, 0) / tot * 100, col }));
    };
    const barra = (titolo, reg, vince) => {
      const seg = segmenti(reg);
      return h('div', { style: 'display:grid;gap:8px' },
        h('div', { classe: 'riga-flex', style: 'justify-content:space-between' }, h('strong', null, titolo, vince ? h('span', { style: 'margin-left:8px' }, h('span', { classe: 'chip ok' }, icona('spunta', 12), 'Più conveniente')) : null), h('strong', { classe: 'numero' }, euro(reg.netto))),
        h('div', { style: 'display:flex;height:16px;border-radius:6px;overflow:hidden;gap:2px', role: 'img', 'aria-label': `Composizione dei ricavi: ${seg.map((q) => `${q.et} ${euro(q.val)}`).join(', ')}` },
          seg.map((q) => { const el = h('span', { title: `${q.et}: ${euro(q.val)}` }); el.style.width = `${q.pct}%`; el.style.background = q.col; return el; })),
        h('div', { classe: 'muted piccolo', style: 'display:flex;gap:14px;flex-wrap:wrap' }, seg.map((q) => h('span', { style: 'display:inline-flex;align-items:center;gap:6px' }, (() => { const d = h('span', { style: 'width:9px;height:9px;border-radius:3px;display:inline-block' }); d.style.background = q.col; return d; })(), `${q.et} ${euro(q.val)}`))));
    };
    const riga = (et, vf, vo, forte) => h('tr', null, h('td', null, et), h('td', { classe: 'numero' }, forte ? h('strong', null, typeof vf === 'number' ? euro(vf) : vf) : (typeof vf === 'number' ? euro(vf) : vf)), h('td', { classe: 'numero' }, forte ? h('strong', null, typeof vo === 'number' ? euro(vo) : vo) : (typeof vo === 'number' ? euro(vo) : vo)));

    const ipotesi = { previdenza: etichettaPrevidenza(c), righe: [
      ['Ricavi di partenza', euro(ricaviBase)], ['Variazione dei ricavi', `${s.ricaviPct > 0 ? '+' : ''}${s.ricaviPct}%`],
      ['Costi di partenza', euro(costiBase)], ['Variazione dei costi', `${s.costiPct > 0 ? '+' : ''}${s.costiPct}%`],
      ['Addizionali IRPEF (regionale + comunale)', `${(s.addReg + s.addCom).toLocaleString('it-IT')}%`], ['Altre detrazioni', euro(s.detrazioni)], ['Perdite pregresse', euro(s.perdite)], ['Soggetto a IRAP', s.irap ? 'Sì' : 'No'],
    ] };

    risultati.replaceChildren(
      soglia.stato === 'esce-subito' ? avviso('errore', 'Oltre 100.000 €.', 'Il forfettario cessa subito e il reddito dell’intero anno va determinato con le regole ordinarie: il confronto è solo indicativo.')
        : soglia.stato === 'esce-anno-successivo' ? avviso('attenzione', 'Oltre 85.000 €.', 'Il regime forfettario cessa dall’anno successivo.') : null,
      h('div', { classe: 'verdetto' },
        h('div', { classe: 'verdetto-icona' }, icona(conv === 'pari' ? 'bilancia' : 'spunta', 24)),
        h('div', null, h('h2', null, conv === 'pari' ? 'I due regimi si equivalgono' : `Conviene il regime ${conv}`),
          h('p', null, conv === 'pari' ? 'Stesso netto con entrambi.' : `Netto superiore di ${euro(Math.abs(conf.differenza))} (${Math.abs(conf.differenza / Math.max(Math.min(f.netto, o.netto), 1) * 100).toFixed(1).replace('.', ',')}%) rispetto all’altro regime.`))),
      h('div', { classe: 'tiles' },
        tile('Netto forfettario', euro(f.netto), { icona: 'scudo', nota: `Imposte e contributi ${euro(f.totaleCarico)}` }),
        tile('Netto ordinario', euro(o.netto), { icona: 'bilancia', nota: `Imposte e contributi ${euro(o.totaleCarico)}` }),
        tile('Pressione complessiva', `${(f.totaleCarico / Math.max(ricavi, 1) * 100).toFixed(1).replace('.', ',')}% · ${(o.totaleCarico / Math.max(ricavi, 1) * 100).toFixed(1).replace('.', ',')}%`, { nota: 'Forfettario · ordinario, sui ricavi' })),
      scheda({ titolo: 'Dove vanno i ricavi', sottotitolo: 'Costi, contributi, imposte e netto a confronto' }, h('div', { classe: 'pila', style: 'gap:22px' }, barra('Forfettario', f, conv === 'forfettario'), barra('Ordinario', o, conv === 'ordinario'))),
      scheda({ titolo: 'Dettaglio del calcolo', senzaPadding: true, azioni: [
        bottone('CSV', { piccolo: true, icona: 'scarica', onClick: () => scarica(`confronto-regimi-${anno}.csv`, csvConfronto(conf), 'text/csv;charset=utf-8') }),
        bottone('PDF', { piccolo: true, variante: 'primario', icona: 'pdf', onClick: () => esportaPdf((J) => pdfSimulazione(J, { conf, cliente: c, anno, studio: ctx.studio, ipotesi }), `confronto-regimi-${anno}-${c.nome.replace(/\W+/g, '-')}.pdf`) })] },
      h('div', { classe: 'tabella-contenitore' }, h('table', { classe: 'tabella' },
        h('thead', null, h('tr', null, h('th', null, 'Voce'), h('th', { classe: 'numero' }, 'Forfettario'), h('th', { classe: 'numero' }, 'Ordinario'))),
        h('tbody', null,
          riga('Ricavi', f.ricavi, o.ricavi), riga('Costi reali sostenuti', costi, costi), riga('Reddito', f.redditoLordo, o.redditoProfessionale),
          riga('Contributi previdenziali', f.contributi.totale, o.contributi.totale), riga('Imponibile fiscale', f.imponibile, o.imponibile),
          riga(`Imposta (${percentuale(f.aliquota)} sostitutiva / IRPEF netta)`, f.imposta, o.irpef),
          riga('di cui detrazione lavoro autonomo (art. 13 c. 5 TUIR)', '—', o.detrazioneAutonomi),
          riga('Addizionali regionale e comunale', '—', o.addizionali), riga('IRAP', '—', o.irap),
          riga('Totale imposte e contributi', f.totaleCarico, o.totaleCarico, true), riga('Netto disponibile', f.netto, o.netto, true))))),
      scheda({}, graficoLinee({ titolo: 'Netto al variare dei ricavi', descrizione: 'Stessi costi, ricavi da −50% a +50% rispetto allo scenario. Il forfettario non è applicabile oltre 85.000 €.', x: sc.map((q) => q.forfettario.ricavi), titoloX: 'Ricavi',
        formatoX: (v) => euro(Math.round(v)).replace(',00', ''),
        serie: [{ nome: 'Forfettario', valori: sc.map((q) => q.forfettario.netto), colore: '--serie-1' }, { nome: 'Ordinario', valori: sc.map((q) => q.ordinario.netto), colore: '--serie-2' }],
        riferimentoX: { valore: params.forfettario.soglie.ricaviEsclusione, etichetta: 'Soglia 85.000 €' } })),
      h('p', { classe: 'muted piccolo' }, 'Semplificazioni: la detrazione per lavoro autonomo è calcolata in automatico; altre detrazioni e perdite pregresse sono importi da inserire. L’IVA è neutra; ammortamenti e altre spese vanno inseriti tra i costi. Non sono modellati altre deduzioni oltre ai contributi né i limiti IRAP per i professionisti. Stima indicativa.'));
  }

  const slider = (etichetta, chiave, min, max) => {
    const out = h('strong', null, `${s[chiave] > 0 ? '+' : ''}${s[chiave]}%`);
    return h('div', { classe: 'campo' }, h('label', { style: 'display:flex;justify-content:space-between' }, etichetta, out),
      h('input', { type: 'range', min, max, step: '1', valore: s[chiave], 'aria-label': etichetta, onInput: (e) => { s[chiave] = Number(e.target.value); out.textContent = `${s[chiave] > 0 ? '+' : ''}${s[chiave]}%`; ricalcola(); } }));
  };
  const numero = (chiave, props = {}) => h('input', { type: 'number', step: '0.01', min: '0', valore: s[chiave], onInput: (e) => { s[chiave] = num(e.target.value); ricalcola(); }, ...props });

  const pannello = h('aside', { classe: 'pannello-ipotesi' },
    scheda({ titolo: 'Ipotesi' },
      h('div', { classe: 'pila', style: 'gap:16px' },
        campo('Ricavi (€)', h('input', { type: 'number', step: '0.01', min: '0', valore: ricaviBase, onInput: (e) => { s.ricavi = num(e.target.value); ricalcola(); } }), 'Predefinito: incassi registrati nell’anno.'),
        campo('Costi reali (€)', h('input', { type: 'number', step: '0.01', min: '0', valore: costiBase, onInput: (e) => { s.costi = num(e.target.value); ricalcola(); } }), 'Predefinito: spese registrate nell’anno.'),
        h('hr', { style: 'margin:0' }),
        h('div', { classe: 'etichetta' }, 'Scenario what-if'),
        slider('Variazione dei ricavi', 'ricaviPct', -50, 100), slider('Variazione dei costi', 'costiPct', -50, 100),
        bottone('Azzera scenario', { variante: 'ghost', piccolo: true, icona: 'ricarica', onClick: () => { s.ricaviPct = 0; s.costiPct = 0; ctx.aggiorna(); } }))),
    scheda({ titolo: 'Regime ordinario', sottotitolo: 'Parametri per il confronto' },
      h('div', { classe: 'pila', style: 'gap:14px' },
        h('div', { classe: 'griglia-campi stretta' }, campo('Add. regionale (%)', numero('addReg', { step: '0.01' })), campo('Add. comunale (%)', numero('addCom', { step: '0.01' }))),
        campo('Altre detrazioni IRPEF (€)', numero('detrazioni'), 'Quella per lavoro autonomo è automatica.'),
        campo('Altri redditi imponibili (€)', numero('altriRedditi')),
        campo('Perdite pregresse (€)', numero('perdite')),
        h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: s.senzaDetrAut, onChange: (e) => { s.senzaDetrAut = e.target.checked; ricalcola(); } }), 'Escludi la detrazione per lavoro autonomo'),
        h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: s.irap, onChange: (e) => { s.irap = e.target.checked; ricalcola(); } }), 'Soggetto a IRAP (3,9%)'))));

  ricalcola();
  return h('div', { classe: 'pila' },
    testataCliente(ctx, r, []),
    testataPagina('Simulazione forfettario e ordinario', `Anno ${anno} · parti dai dati registrati e prova scenari diversi`),
    esatto ? null : avviso('attenzione', 'Parametri non disponibili per questo anno.', `Il confronto usa i parametri ${annoUsato}.`),
    h('div', { classe: 'layout-simulazione' }, pannello, risultati));
}
