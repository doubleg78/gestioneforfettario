import { h, campo, scheda, testataPagina, bottone, tabella, vuoto, tile, euro, dataIt, avviso } from '../dom.js';
import { icona } from '../icone.js';
import { nuovaSpesa } from '../../domain/modello.js';
import { round2 } from '../../fiscal/utils.js';
import { testataCliente } from '../dominio-ui.js';
import { apriDrawer, apriMenu } from '../overlay.js';

export function vistaSpese(ctx) {
  const { archivio, dati, cliente: c, anno } = ctx;
  const sue = dati.spese.filter((x) => x.clienteId === c.id && x.data.startsWith(String(anno)));
  const totale = round2(sue.reduce((t, x) => t + x.importo, 0));
  const categorie = [...new Set(dati.spese.filter((x) => x.clienteId === c.id).map((x) => x.categoria).filter(Boolean))];
  const perCategoria = new Map();
  for (const s of sue) perCategoria.set(s.categoria || 'Altro', round2((perCategoria.get(s.categoria || 'Altro') ?? 0) + s.importo));

  function apriForm(esistente) {
    const s = esistente ? structuredClone(esistente) : nuovaSpesa(c.id);
    if (!esistente) s.data = ctx.oggi;
    const dl = h('datalist', { id: 'cat-spese' }, categorie.map((k) => h('option', { value: k })));
    const corpo = h('form', { classe: 'pila', style: 'gap:16px', onSubmit: (e) => { e.preventDefault(); salva(); } },
      campo('Data', h('input', { type: 'date', required: true, valore: s.data, onInput: (e) => { s.data = e.target.value; } })),
      campo('Descrizione', h('input', { type: 'text', required: true, valore: s.descrizione, autofocus: true, onInput: (e) => { s.descrizione = e.target.value; } })),
      campo('Categoria', h('input', { type: 'text', list: 'cat-spese', valore: s.categoria, onInput: (e) => { s.categoria = e.target.value; } })), dl,
      campo('Importo (€)', h('input', { type: 'number', step: '0.01', min: '0', required: true, valore: s.importo || '', onInput: (e) => { s.importo = Number(e.target.value); } })));
    async function salva() {
      if (!corpo.reportValidity()) return;
      await archivio.modifica((d) => { const i = d.spese.findIndex((x) => x.id === s.id); if (i >= 0) d.spese[i] = s; else d.spese.push(s); });
      drawer.chiudi(); ctx.toast(esistente ? 'Spesa aggiornata.' : 'Spesa aggiunta.');
    }
    const drawer = apriDrawer({ titolo: esistente ? 'Modifica spesa' : 'Nuova spesa', sottotitolo: c.nome, corpo,
      azioni: [bottone('Annulla', { onClick: () => drawer.chiudi() }), bottone('Salva', { variante: 'primario', icona: 'spunta', onClick: salva })] });
  }

  const tab = tabella({ ordinaIniziale: { chiave: 'data', verso: -1 }, righe: sue, piede: h('tr', null, h('td', { colspan: '3' }, 'Totale'), h('td', { classe: 'numero' }, euro(totale)), h('td')),
    colonne: [
      { chiave: 'data', titolo: 'Data', ordina: (x) => x.data, cella: (x) => dataIt(x.data) },
      { chiave: 'desc', titolo: 'Descrizione', ordina: (x) => x.descrizione.toLowerCase(), cella: (x) => h('strong', null, x.descrizione) },
      { chiave: 'cat', titolo: 'Categoria', ordina: (x) => x.categoria.toLowerCase(), cella: (x) => x.categoria || h('span', { classe: 'muted' }, '—') },
      { chiave: 'imp', titolo: 'Importo', numerica: true, ordina: (x) => x.importo, cella: (x) => euro(x.importo) },
      { chiave: 'az', titolo: '', cella: (x) => h('div', { classe: 'azioni-riga' }, h('button', { classe: 'bottone ghost icona-sola piccolo', type: 'button', 'aria-label': `Azioni spesa ${x.descrizione}`, onClick: (e) => apriMenu(e.currentTarget, [
        { testo: 'Modifica', icona: 'modifica', onClick: () => apriForm(x) },
        'sep', { testo: 'Elimina', icona: 'cestino', pericolo: true, onClick: async () => { if (await ctx.conferma({ titolo: 'Eliminare la spesa?', testo: x.descrizione, etichetta: 'Elimina', pericolo: true })) { await archivio.modifica((d) => { d.spese = d.spese.filter((y) => y.id !== x.id); }); ctx.toast('Spesa eliminata.'); } } }]) }, icona('altro', 18))) },
    ] });

  return h('div', { classe: 'pila' },
    testataCliente(ctx, ctx.riepilogo(), []),
    testataPagina('Spese', `Anno ${anno}`, [bottone('Nuova spesa', { variante: 'primario', icona: 'piu', onClick: () => apriForm() })]),
    avviso('info', 'Nel forfettario i costi non sono deducibili.', 'Le spese servono a calcolare il netto reale e a confrontare la convenienza con il regime ordinario.'),
    h('div', { classe: 'tiles' },
      tile(`Spese ${anno}`, euro(totale), { icona: 'ricevuta', nota: `${sue.length} voci` }),
      ...[...perCategoria.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k, v]) => tile(k, euro(v), { nota: `${Math.round((v / (totale || 1)) * 100)}% del totale` }))),
    scheda({ senzaPadding: true }, sue.length ? tab : vuoto({ icona: 'ricevuta', titolo: `Nessuna spesa per il ${anno}`, testo: 'Registra le spese sostenute per calcolare il netto reale.', azioni: [bottone('Nuova spesa', { variante: 'primario', icona: 'piu', onClick: () => apriForm() })] })));
}
