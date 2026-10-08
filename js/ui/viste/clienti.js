import { h, scheda, testataPagina, bottone, tabella, vuoto, meter, euro, euroIntero, chip } from '../dom.js';
import { icona } from '../icone.js';
import { avatar, chipSoglia, statoMeter } from '../dominio-ui.js';
import { etichettaPrevidenza } from '../shell.js';
import { apriMenu } from '../overlay.js';

export function vistaClienti(ctx) {
  const { dati, anno, archivio } = ctx;
  const q = (ctx.stato.cercaClienti ?? '').toLowerCase();
  const elenco = dati.clienti.filter((c) => !q || `${c.nome} ${c.partitaIva} ${c.note}`.toLowerCase().includes(q));

  const eliminaCliente = async (c) => {
    const ok = await ctx.conferma({ titolo: `Eliminare ${c.nome || 'il cliente'}?`, testo: 'Verranno eliminate anche tutte le sue fatture e spese. L’operazione non è reversibile: esporta prima un backup se serve.', etichetta: 'Elimina cliente', pericolo: true });
    if (!ok) return;
    await archivio.modifica((d) => {
      d.clienti = d.clienti.filter((x) => x.id !== c.id);
      d.fatture = d.fatture.filter((x) => x.clienteId !== c.id);
      d.spese = d.spese.filter((x) => x.clienteId !== c.id);
      if (d.ui.clienteId === c.id) d.ui.clienteId = d.clienti[0]?.id ?? null;
    });
    ctx.toast('Cliente eliminato.');
  };

  const tab = tabella({
    ordinaIniziale: { chiave: 'nome', verso: 1 },
    righe: elenco,
    colonne: [
      { chiave: 'nome', titolo: 'Cliente', ordina: (c) => c.nome.toLowerCase(), cella: (c) => h('div', { classe: 'cella-persona' }, avatar(c.nome), h('div', null, h('a', { href: '#/riepilogo', style: 'color:var(--ink);font-weight:600;text-decoration:none', onClick: () => ctx.selezionaCliente(c.id) }, c.nome || '(senza nome)'), h('div', { classe: 'sotto' }, c.note || (c.partitaIva ? `P.IVA ${c.partitaIva}` : '')))) },
      { chiave: 'prev', titolo: 'Previdenza', cella: (c) => chip('neutro', etichettaPrevidenza(c)) },
      { chiave: 'ricavi', titolo: `Incassi ${anno}`, numerica: true, ordina: (c) => ctx.riepilogo(c).ricavi, cella: (c) => h('strong', null, euro(ctx.riepilogo(c).ricavi)) },
      { chiave: 'soglia', titolo: 'Soglia', ordina: (c) => ctx.riepilogo(c).soglie.percentuale, cella: (c) => { const r = ctx.riepilogo(c); return h('div', { style: 'min-width:130px' }, meter(r.soglie.percentuale, statoMeter(r.soglie.stato)), h('div', { classe: 'sotto', style: 'margin-top:4px' }, `${r.soglie.percentuale.toLocaleString('it-IT')}%`)); } },
      { chiave: 'stato', titolo: 'Stato', cella: (c) => chipSoglia(ctx.riepilogo(c).soglie.stato) },
      { chiave: 'az', titolo: '', cella: (c) => h('div', { classe: 'azioni-riga' },
        bottone('Apri', { piccolo: true, onClick: () => ctx.selezionaCliente(c.id, '#/riepilogo') }),
        h('button', { classe: 'bottone ghost icona-sola piccolo', type: 'button', 'aria-label': `Altre azioni per ${c.nome}`, onClick: (e) => apriMenu(e.currentTarget, [
          { testo: 'Modifica anagrafica', icona: 'modifica', onClick: () => ctx.selezionaCliente(c.id, '#/anagrafica') },
          { testo: 'Vedi fatture', icona: 'documento', onClick: () => ctx.selezionaCliente(c.id, '#/fatture') },
          'sep', { testo: 'Elimina cliente', icona: 'cestino', pericolo: true, onClick: () => eliminaCliente(c) }]) }, icona('altro', 18))) },
    ],
  });

  const cerca = h('div', { classe: 'cerca' }, icona('cerca', 16), h('input', { classe: 'input', type: 'search', placeholder: 'Cerca per nome, P.IVA o note…', 'aria-label': 'Cerca clienti', valore: ctx.stato.cercaClienti ?? '',
    onInput: (e) => { ctx.stato.cercaClienti = e.target.value; const pos = e.target.selectionStart; ctx.aggiorna(); const n = document.querySelector('.strumenti input'); n?.focus(); n?.setSelectionRange(pos, pos); } }));

  return h('div', { classe: 'pila' },
    testataPagina('Clienti', `${dati.clienti.length} contribuenti nello studio`, [bottone('Nuovo cliente', { variante: 'primario', icona: 'piu', onClick: ctx.nuovoCliente })]),
    scheda({ senzaPadding: true },
      dati.clienti.length === 0
        ? vuoto({ icona: 'utenti', titolo: 'Nessun cliente', testo: 'Crea il primo cliente per iniziare a registrare fatture e calcolare imposte e contributi.', azioni: [bottone('Nuovo cliente', { variante: 'primario', icona: 'piu', onClick: ctx.nuovoCliente }), bottone('Carica dati di esempio', { icona: 'carica', onClick: ctx.caricaDemo })] })
        : [h('div', { classe: 'strumenti' }, cerca), elenco.length ? tab : vuoto({ icona: 'cerca', titolo: 'Nessun risultato', testo: 'Prova con un altro termine di ricerca.' })]));
}
