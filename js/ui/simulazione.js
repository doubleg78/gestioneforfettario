import { h, campo, avviso, euro, percentuale, scarica } from './dom.js';
import { riepilogoAnno } from '../domain/riepilogo.js';
import { confrontaRegimi, scenari } from '../fiscal/confronto.js';
import { verificaSoglieRicavi } from '../fiscal/requisiti.js';
import { csvConfronto } from '../export/csv.js';
import { graficoLinee } from './grafici.js';
import { round2 } from '../fiscal/utils.js';

const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

export function vistaSimulazione(ctx) {
  const { dati, cliente: c } = ctx;
  if (!c) return h('div', null, h('h1', null, 'Simulazione'), avviso('attenzione', 'Nessun cliente selezionato.'));

  const anno = ctx.stato.annoSim ?? new Date().getFullYear();
  const { params, esatto, annoUsato } = ctx.paramsAnno(anno);
  const r = riepilogoAnno(c, dati, anno, params);
  const voci = r.perAteco.filter((v) => v.coefficiente > 0);
  if (voci.length === 0) {
    return h('div', null, h('h1', null, 'Simulazione'), avviso('attenzione', 'Servono i codici ATECO.', 'Assegna almeno un codice ATECO con coefficiente nell’anagrafica del cliente.'));
  }

  const s = ctx.stato.sim ??= { ricavi: null, costi: null, ricaviPct: 0, costiPct: 0, addReg: 1.73, addCom: 0.8, detrazioni: 0, altriRedditi: 0, perdite: 0, senzaDetrAut: false, irap: false };
  const ricaviBase = s.ricavi ?? r.ricavi;
  const costiBase = s.costi ?? r.spese;
  const risultati = h('div');

  function ricalcola() {
    const ricavi = round2(ricaviBase * (1 + s.ricaviPct / 100));
    const costi = round2(costiBase * (1 + s.costiPct / 100));
    const somma = voci.reduce((t, v) => t + v.importo, 0);
    const ripartiti = voci.map((v, i) => ({ importo: somma > 0 ? (v.importo / somma) * ricavi : i === 0 ? ricavi : 0, coefficiente: v.coefficiente }));
    const input = {
      ricavi, costiReali: costi, ricaviPerAteco: ripartiti, aliquota: r.aliquota.aliquota,
      previdenza: c.previdenza, riduzione35: c.previdenza.riduzione35,
      ordinario: { addizionaleRegionale: s.addReg / 100, addizionaleComunale: s.addCom / 100, detrazioni: s.detrazioni, altriRedditi: s.altriRedditi, perditePregresse: s.perdite, senzaDetrazioneAutonomi: s.senzaDetrAut, soggettoIrap: s.irap },
    };
    const conf = confrontaRegimi(params, input);
    const f = conf.forfettario, o = conf.ordinario;
    const soglia = verificaSoglieRicavi(params, ricavi);

    const riga = (et, vf, vo, evidenzia) => h('tr', null, h('td', null, et), h('td', { classe: 'numero' }, evidenzia ? h('strong', null, euro(vf)) : euro(vf)), h('td', { classe: 'numero' }, evidenzia ? h('strong', null, euro(vo)) : euro(vo)));
    const conv = conf.conveniente;
    const x = [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50];
    const sc = scenari(params, { ...input }, x.map((p) => ({ ricaviPct: p / 100 })));
    const ricaviX = sc.map((q) => q.forfettario.ricavi);

    risultati.replaceChildren(
      soglia.stato === 'esce-subito' ? avviso('errore', 'Oltre 100.000 €.', 'Il forfettario cessa subito: il confronto è solo indicativo.')
        : soglia.stato === 'esce-anno-successivo' ? avviso('attenzione', 'Oltre 85.000 €.', 'Il regime forfettario cessa dall’anno successivo.') : null,
      h('div', { classe: 'statistiche' },
        h('div', { classe: 'statistica' }, h('div', { classe: `valore ${conv === 'forfettario' ? 'vince' : ''}` }, euro(f.netto)), h('div', { classe: 'etichetta' }, 'Netto con il forfettario')),
        h('div', { classe: 'statistica' }, h('div', { classe: `valore ${conv === 'ordinario' ? 'vince' : ''}` }, euro(o.netto)), h('div', { classe: 'etichetta' }, 'Netto in regime ordinario')),
        h('div', { classe: 'statistica' }, h('div', { classe: 'valore' }, conv === 'pari' ? 'Pari' : `${conv === 'forfettario' ? 'Forfettario' : 'Ordinario'} +${euro(Math.abs(conf.differenza))}`), h('div', { classe: 'etichetta' }, 'Regime più conveniente'))),
      h('div', { classe: 'scheda' },
        h('div', { classe: 'tabella-contenitore' }, h('table', { classe: 'confronto' },
          h('thead', null, h('tr', null, h('th', null, 'Voce'), h('th', { classe: 'numero' }, 'Forfettario'), h('th', { classe: 'numero' }, 'Ordinario'))),
          h('tbody', null,
            riga('Ricavi', f.ricavi, o.ricavi),
            riga('Costi reali sostenuti', costi, costi),
            riga('Reddito', f.redditoLordo, o.redditoProfessionale),
            riga('Contributi previdenziali', f.contributi.totale, o.contributi.totale),
            riga('Imponibile fiscale', f.imponibile, o.imponibile),
            riga(`Imposta (${percentuale(f.aliquota)} sostitutiva / IRPEF netta)`, f.imposta, o.irpef),
            riga('di cui detrazione lavoro autonomo (art. 13 c. 5 TUIR)', 0, o.detrazioneAutonomi),
            riga('Addizionali regionale e comunale', 0, o.addizionali),
            riga('IRAP', 0, o.irap),
            riga('Totale imposte e contributi', f.totaleCarico, o.totaleCarico, true),
            riga('Netto disponibile (ricavi − costi − imposte − contributi)', f.netto, o.netto, true)))),
        h('div', { classe: 'azioni' },
          h('button', { onClick: () => scarica(`confronto-regimi-${anno}.csv`, csvConfronto(conf), 'text/csv;charset=utf-8') }, 'Esporta CSV'),
          h('button', { onClick: () => window.print() }, 'Stampa / PDF'))),
      h('div', { classe: 'scheda' },
        graficoLinee({
          titolo: 'Netto al variare dei ricavi',
          descrizione: 'Stessi costi, ricavi da −50% a +50% rispetto alla simulazione. Il forfettario non è applicabile oltre 85.000 €.',
          x: ricaviX, titoloX: 'Ricavi',
          formatoX: (v) => euro(Math.round(v)).replace(',00', ''),
          serie: [
            { nome: 'Forfettario', valori: sc.map((q) => q.forfettario.netto), colore: '--serie-1' },
            { nome: 'Ordinario', valori: sc.map((q) => q.ordinario.netto), colore: '--serie-2' },
          ],
          riferimentoX: { valore: params.forfettario.soglie.ricaviEsclusione, etichetta: 'Soglia 85.000 €' },
        })),
      h('p', { classe: 'tenue' }, 'Semplificazioni: nel regime ordinario la detrazione per lavoro autonomo (art. 13 c. 5 TUIR) è calcolata in automatico; altre detrazioni e le perdite pregresse sono importi da inserire. L’IVA è considerata neutra; ammortamenti e altre spese vanno inseriti tra i costi. Non sono modellati le altre deduzioni oltre ai contributi né i limiti all’IRAP per i professionisti. Stima indicativa, da verificare con il commercialista.'));
  }

  const slider = (etichetta, chiave, min, max) => {
    const out = h('span', { classe: 'tenue' }, `${s[chiave] > 0 ? '+' : ''}${s[chiave]}%`);
    const inp = h('input', { type: 'range', min, max, step: '1', valore: s[chiave], 'aria-label': etichetta, onInput: (e) => { s[chiave] = Number(e.target.value); out.textContent = `${s[chiave] > 0 ? '+' : ''}${s[chiave]}%`; ricalcola(); } });
    return h('div', { classe: 'slider' }, h('label', null, etichetta, ' ', out), inp);
  };
  const numero = (chiave, props = {}) => h('input', { type: 'number', step: '0.01', min: '0', valore: s[chiave], onInput: (e) => { s[chiave] = num(e.target.value); ricalcola(); }, ...props });

  ricalcola();
  return h('div', null,
    h('div', { classe: 'solo-stampa' }, h('strong', null, `${c.nome} — simulazione forfettario / ordinario ${anno}`), h('div', null, `Stampato il ${new Date().toLocaleDateString('it-IT')}`)),
    h('h1', null, 'Simulazione forfettario vs ordinario'),
    h('p', { classe: 'tenue' }, `${c.nome}. Parti dai dati registrati e prova scenari diversi con i cursori.`),
    esatto ? null : avviso('attenzione', 'Parametri non disponibili per questo anno.', `Il confronto usa i parametri ${annoUsato}.`),
    h('div', { classe: 'scheda' },
      h('h2', null, 'Punto di partenza'),
      h('div', { classe: 'griglia' },
        campo('Anno', h('input', { type: 'number', min: '2000', max: '2100', valore: anno, onChange: (e) => { ctx.stato.annoSim = Number(e.target.value); ctx.stato.sim.ricavi = null; ctx.stato.sim.costi = null; ctx.aggiorna(); } })),
        campo('Ricavi (€)', h('input', { type: 'number', step: '0.01', min: '0', valore: ricaviBase, onInput: (e) => { s.ricavi = num(e.target.value); ricalcola(); } }), 'Predefinito: incassi registrati nell’anno.'),
        campo('Costi reali (€)', h('input', { type: 'number', step: '0.01', min: '0', valore: costiBase, onInput: (e) => { s.costi = num(e.target.value); ricalcola(); } }), 'Predefinito: spese registrate nell’anno.')),
      h('h2', null, 'Scenario what-if'),
      h('div', { classe: 'griglia' }, slider('Variazione dei ricavi', 'ricaviPct', -50, 100), slider('Variazione dei costi', 'costiPct', -50, 100)),
      h('details', null,
        h('summary', null, 'Parametri del regime ordinario'),
        h('div', { classe: 'griglia' },
          campo('Addizionale regionale (%)', numero('addReg', { step: '0.01' })),
          campo('Addizionale comunale (%)', numero('addCom', { step: '0.01' })),
          campo('Altre detrazioni IRPEF (€)', numero('detrazioni'), 'La detrazione per lavoro autonomo è calcolata in automatico.'),
          campo('Perdite pregresse da riportare (€)', numero('perdite')),
          h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: s.senzaDetrAut, onChange: (e) => { s.senzaDetrAut = e.target.checked; ricalcola(); } }), 'Escludi la detrazione per lavoro autonomo'),
          campo('Altri redditi imponibili (€)', numero('altriRedditi')),
          h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: s.irap, onChange: (e) => { s.irap = e.target.checked; ricalcola(); } }), 'Soggetto a IRAP (3,9%)')))),
    risultati);

}
