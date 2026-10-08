import { h, campo, avviso, euro, dataIt } from './dom.js';
import { nuovaSpesa } from '../domain/modello.js';
import { round2 } from '../fiscal/utils.js';

export function vistaSpese(ctx) {
  const { archivio, dati, cliente: c } = ctx;
  if (!c) return h('div', null, h('h1', null, 'Spese'), avviso('attenzione', 'Nessun cliente selezionato.'));

  const s = nuovaSpesa(c.id);
  const anno = ctx.stato.annoSpese ?? new Date().getFullYear();
  const lista = dati.spese.filter((x) => x.clienteId === c.id && x.data.startsWith(String(anno))).sort((a, b) => b.data.localeCompare(a.data));
  const totale = round2(lista.reduce((t, x) => t + x.importo, 0));

  const form = h('form', { onSubmit: async (e) => { e.preventDefault(); await archivio.modifica((d) => d.spese.push(s)); } },
    h('div', { classe: 'griglia' },
      campo('Data', h('input', { type: 'date', required: true, onInput: (e) => { s.data = e.target.value; } })),
      campo('Descrizione', h('input', { type: 'text', required: true, onInput: (e) => { s.descrizione = e.target.value; } })),
      campo('Categoria', h('input', { type: 'text', onInput: (e) => { s.categoria = e.target.value; } })),
      campo('Importo (€)', h('input', { type: 'number', step: '0.01', required: true, onInput: (e) => { s.importo = Number(e.target.value); } }))),
    h('div', { classe: 'azioni' }, h('button', { type: 'submit', classe: 'primario' }, 'Aggiungi spesa')));

  return h('div', null,
    h('h1', null, 'Spese'),
    h('p', { classe: 'tenue' }, 'Nel regime forfettario i costi non sono deducibili: servono per confrontare la convenienza con il regime ordinario.'),
    h('div', { classe: 'scheda' }, h('h2', null, 'Nuova spesa'), form),
    h('div', { classe: 'scheda' },
      campo('Anno', h('input', { type: 'number', min: '2000', max: '2100', valore: anno, onChange: (e) => { ctx.stato.annoSpese = Number(e.target.value); ctx.aggiorna(); } })),
      lista.length === 0 ? h('div', { classe: 'vuoto' }, `Nessuna spesa per il ${anno}.`)
        : h('div', { classe: 'tabella-contenitore' }, h('table', null,
          h('thead', null, h('tr', null, h('th', null, 'Data'), h('th', null, 'Descrizione'), h('th', null, 'Categoria'), h('th', { classe: 'numero' }, 'Importo'), h('th', null, ''))),
          h('tbody', null, lista.map((x) => h('tr', null,
            h('td', null, dataIt(x.data)), h('td', null, x.descrizione), h('td', null, x.categoria), h('td', { classe: 'numero' }, euro(x.importo)),
            h('td', null, h('button', { classe: 'pericolo', onClick: async () => { if (confirm('Eliminare la spesa?')) await archivio.modifica((d) => { d.spese = d.spese.filter((y) => y.id !== x.id); }); } }, 'Elimina'))))),
          h('tfoot', null, h('tr', null, h('td', { colspan: '3' }, 'Totale'), h('td', { classe: 'numero' }, euro(totale)), h('td')))))));
}
