import { h, scheda, testataPagina, chip, avviso, euro, percentuale } from '../dom.js';
import { icona } from '../icone.js';
import { anniDisponibili } from '../../fiscal/params/index.js';
import { FONTI, STATI } from '../../fiscal/params/fonti.js';

export function vistaParametri(ctx) {
  const anni = anniDisponibili();
  const selezionato = ctx.stato.annoParametri && anni.includes(ctx.stato.annoParametri) ? ctx.stato.annoParametri : (anni.includes(ctx.anno) ? ctx.anno : anni[anni.length - 1]);
  const voci = FONTI[selezionato] ?? [];
  const sezioni = new Map();
  for (const v of voci) (sezioni.get(v[0]) ?? sezioni.set(v[0], []).get(v[0])).push(v);
  const conta = (stato) => voci.filter((v) => v[3] === stato).length;
  const tipo = { verificato: 'ok', parziale: 'attenzione', 'da-confermare': 'errore' };
  const icn = { verificato: 'spunta', parziale: 'info', 'da-confermare': 'avviso' };

  return h('div', { classe: 'pila' },
    testataPagina('Parametri fiscali', 'Ogni valore usato nei calcoli, con la fonte e lo stato di verifica', [
      h('div', { classe: 'segmenti', role: 'group', 'aria-label': 'Anno dei parametri' }, anni.map((a) => h('button', { type: 'button', 'aria-pressed': String(a === selezionato), onClick: () => { ctx.stato.annoParametri = a; ctx.aggiorna(); } }, String(a))))]),
    avviso('info', 'Trasparenza dei calcoli.', 'I parametri sono in file separati per anno (js/fiscal/params). Sono stati letti su circolari INPS, istruzioni dell’Agenzia delle Entrate e norme; dove la fonte è solo secondaria la voce è segnata come parziale o da confermare.'),
    h('div', { classe: 'tiles' },
      h('div', { classe: 'tile' }, h('div', { classe: 'tile-etichetta' }, chip('ok', 'Verificato', 'spunta')), h('div', { classe: 'tile-valore' }, String(conta('verificato'))), h('div', { classe: 'tile-nota' }, 'Letti sul testo ufficiale')),
      h('div', { classe: 'tile' }, h('div', { classe: 'tile-etichetta' }, chip('attenzione', 'Parziale', 'info')), h('div', { classe: 'tile-valore' }, String(conta('parziale'))), h('div', { classe: 'tile-nota' }, 'Fonti ufficiali in parte o secondarie')),
      h('div', { classe: 'tile' }, h('div', { classe: 'tile-etichetta' }, chip('errore', 'Da confermare', 'avviso')), h('div', { classe: 'tile-valore' }, String(conta('da-confermare'))), h('div', { classe: 'tile-nota' }, 'Da riscontrare con una fonte'))),
    ...[...sezioni.entries()].map(([nome, righe]) => scheda({ titolo: nome, senzaPadding: true },
      h('div', { classe: 'tabella-contenitore' }, h('table', { classe: 'tabella' },
        h('thead', null, h('tr', null, h('th', null, 'Parametro'), h('th', null, 'Valore'), h('th', null, 'Stato'), h('th', null, 'Fonte'))),
        h('tbody', null, righe.map(([, voce, valore, stato, fonte]) => h('tr', null,
          h('td', { style: 'min-width:200px' }, h('strong', null, voce)), h('td', { style: 'min-width:200px' }, valore),
          h('td', null, chip(tipo[stato], STATI[stato], icn[stato])), h('td', { classe: 'muted', style: 'min-width:260px;font-size:13px' }, fonte)))))))));
}
