import { h, euro } from './dom.js';
import { nuovoCliente } from '../domain/modello.js';
import { riepilogoAnno } from '../domain/riepilogo.js';

export function vistaClienti(ctx) {
  const { archivio, dati } = ctx;
  const anno = new Date().getFullYear();
  const params = ctx.paramsAnno(anno).params;

  const righe = dati.clienti.map((c) => {
    const r = riepilogoAnno(c, dati, anno, params);
    return h('tr', null,
      h('td', null, h('strong', null, c.nome || '(senza nome)'), h('div', { classe: 'tenue' }, c.partitaIva ? `P.IVA ${c.partitaIva}` : '')),
      h('td', null, c.previdenza.tipo.replace('-', ' ')),
      h('td', { classe: 'numero' }, euro(r.ricavi)),
      h('td', { classe: 'numero' }, `${r.soglie.percentuale.toLocaleString('it-IT')}%`),
      h('td', null,
        h('div', { classe: 'azioni' },
          h('button', { onClick: () => ctx.selezionaCliente(c.id, '#/riepilogo') }, 'Apri'),
          h('button', { classe: 'pericolo', onClick: async () => {
            if (!confirm(`Eliminare ${c.nome || 'il cliente'} con tutte le sue fatture e spese? L’operazione non è reversibile.`)) return;
            await archivio.modifica((d) => {
              d.clienti = d.clienti.filter((x) => x.id !== c.id);
              d.fatture = d.fatture.filter((x) => x.clienteId !== c.id);
              d.spese = d.spese.filter((x) => x.clienteId !== c.id);
              if (d.ui.clienteId === c.id) d.ui.clienteId = d.clienti[0]?.id ?? null;
            });
          } }, 'Elimina'))));
  });

  return h('div', null,
    h('h1', null, 'Clienti'),
    h('p', { classe: 'tenue' }, `Ricavi incassati ${anno} e utilizzo della soglia di 85.000 €.`),
    h('div', { classe: 'scheda' },
      dati.clienti.length === 0
        ? h('div', { classe: 'vuoto' }, 'Nessun cliente. Crea il primo per iniziare.')
        : h('div', { classe: 'tabella-contenitore' }, h('table', null,
          h('thead', null, h('tr', null, h('th', null, 'Cliente'), h('th', null, 'Previdenza'), h('th', { classe: 'numero' }, `Incassi ${anno}`), h('th', { classe: 'numero' }, 'Soglia'), h('th', null, ''))),
          h('tbody', null, righe))),
      h('div', { classe: 'azioni' },
        h('button', { classe: 'primario', onClick: async () => {
          const c = nuovoCliente();
          await archivio.modifica((d) => { d.clienti.push(c); d.ui.clienteId = c.id; });
          location.hash = '#/anagrafica';
        } }, 'Nuovo cliente'))));
}
