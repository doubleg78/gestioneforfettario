import { h, campo, scheda, testataPagina, bottone, chip, avviso, tabella, vuoto, tile, zonaRilascio, euro, dataIt, scarica } from '../dom.js';
import { icona } from '../icone.js';
import { nuovaFattura } from '../../domain/modello.js';
import { bolloDovuto } from '../../fiscal/forfettario.js';
import { fattureDaCsv } from '../../import/csv.js';
import { fattureDaXml } from '../../import/fatturapa.js';
import { csvFatture } from '../../export/csv.js';
import { round2 } from '../../fiscal/utils.js';
import { testataCliente } from '../dominio-ui.js';
import { apriDrawer, apriDialogo, apriMenu } from '../overlay.js';

export function vistaFatture(ctx) {
  const { archivio, dati, cliente: c, anno, params } = ctx;
  const filtro = ctx.stato.filtroFatture ?? 'tutte';
  const q = (ctx.stato.cercaFatture ?? '').toLowerCase();

  const sue = dati.fatture.filter((f) => f.clienteId === c.id && (f.data.startsWith(String(anno)) || (f.dataIncasso || '').startsWith(String(anno))));
  const lista = sue.filter((f) => {
    if (filtro === 'da-incassare' && f.dataIncasso) return false;
    if (filtro === 'incassate' && !f.dataIncasso) return false;
    return !q || `${f.numero} ${f.controparte} ${f.note ?? ''}`.toLowerCase().includes(q);
  });
  const incassato = round2(sue.filter((f) => (f.dataIncasso || '').startsWith(String(anno))).reduce((s, f) => s + f.importo, 0));
  const daIncassare = round2(sue.filter((f) => !f.dataIncasso).reduce((s, f) => s + f.importo, 0));
  const fatturato = round2(sue.filter((f) => f.data.startsWith(String(anno))).reduce((s, f) => s + f.importo, 0));

  // ---- Drawer di inserimento / modifica ----
  function apriForm(esistente) {
    const f = esistente ? structuredClone(esistente) : nuovaFattura(c.id);
    if (!esistente) f.data = ctx.oggi;
    const err = h('div');
    const bollo = h('input', { type: 'number', step: '0.01', min: '0', valore: f.bollo });
    const importo = h('input', { type: 'number', step: '0.01', required: true, valore: f.importo || '', autofocus: true,
      onInput: (e) => { f.importo = Number(e.target.value); f.bollo = bolloDovuto(f.importo, params); bollo.value = f.bollo; } });
    bollo.addEventListener('input', (e) => { f.bollo = Number(e.target.value); });
    const selAteco = h('select', { onChange: (e) => { f.atecoCodice = e.target.value; } },
      h('option', { value: '' }, c.ateco.length ? 'Prima attività (predefinita)' : 'Nessun codice ATECO'),
      c.ateco.filter((v) => v.codice).map((v) => h('option', { value: v.codice, selected: v.codice === f.atecoCodice }, `${v.codice} — ${v.descrizione}`)));
    const corpo = h('form', { id: 'form-fattura', classe: 'pila', style: 'gap:16px', onSubmit: async (e) => { e.preventDefault(); salva(); } },
      h('div', { classe: 'griglia-campi stretta' },
        campo('Numero', h('input', { type: 'text', valore: f.numero, placeholder: 'es. 12/2026', onInput: (e) => { f.numero = e.target.value; } })),
        campo('Data fattura', h('input', { type: 'date', required: true, valore: f.data, onInput: (e) => { f.data = e.target.value; } }))),
      campo('Cliente (controparte)', h('input', { type: 'text', valore: f.controparte, placeholder: 'Denominazione del committente', onInput: (e) => { f.controparte = e.target.value; } })),
      h('div', { classe: 'griglia-campi stretta' },
        campo('Importo imponibile (€)', importo),
        campo('Bollo (€)', bollo, 'Dovuto sopra 77,47 €.')),
      campo('Data di incasso', h('input', { type: 'date', valore: f.dataIncasso, onInput: (e) => { f.dataIncasso = e.target.value; } }), 'Il ricavo concorre al reddito nell’anno di incasso (criterio di cassa). Lascia vuoto se non ancora incassata.'),
      campo('Attività (ATECO)', selAteco),
      campo('Note', h('input', { type: 'text', valore: f.note ?? '', onInput: (e) => { f.note = e.target.value; } })), err);
    async function salva() {
      if (!corpo.reportValidity()) return;
      if (f.dataIncasso && f.dataIncasso < f.data) { err.replaceChildren(avviso('errore', 'La data di incasso non può precedere la fattura.')); return; }
      await archivio.modifica((d) => { const i = d.fatture.findIndex((x) => x.id === f.id); if (i >= 0) d.fatture[i] = f; else d.fatture.push(f); });
      drawer.chiudi();
      ctx.toast(esistente ? 'Fattura aggiornata.' : 'Fattura aggiunta.');
    }
    const drawer = apriDrawer({
      titolo: esistente ? 'Modifica fattura' : 'Nuova fattura', sottotitolo: c.nome, corpo,
      azioni: [bottone('Annulla', { onClick: () => drawer.chiudi() }), bottone(esistente ? 'Salva modifiche' : 'Aggiungi fattura', { variante: 'primario', icona: 'spunta', onClick: salva })],
    });
  }

  // ---- Importazione ----
  function apriImport(origine) {
    const area = h('div', { classe: 'pila', style: 'gap:14px' });
    const dlg = apriDialogo({ titolo: origine === 'csv' ? 'Importa da CSV' : 'Importa da FatturaPA (XML)', largo: true, corpo: area, azioni: [bottone('Chiudi', { onClick: () => dlg.chiudi() })] });
    const esistenti = new Set(dati.fatture.filter((x) => x.clienteId === c.id).map((x) => `${x.numero}|${x.data}|${x.importo}`));
    area.append(
      origine === 'csv' ? h('p', { classe: 'muted' }, 'Colonne obbligatorie: data e importo. Facoltative: numero, cliente, data incasso, ateco. Separatore ; o , — numeri e date all’italiana.')
        : h('p', { classe: 'muted' }, 'Puoi selezionare più file XML. L’importo è la somma degli imponibili; le note di credito (TD04) sono negative. La data di incasso va inserita dopo.'),
      zonaRilascio({ testo: origine === 'csv' ? 'Scegli un file CSV' : 'Scegli i file XML', accept: origine === 'csv' ? '.csv,text/csv,text/plain' : '.xml,text/xml,application/xml', multiplo: origine === 'xml', onFile: async (files) => {
        const fatture = [], errori = [];
        for (const file of files) {
          const testo = await file.text();
          if (origine === 'csv') { const r = fattureDaCsv(testo); fatture.push(...r.fatture); errori.push(...r.errori.map((x) => `Riga ${x.riga}: ${x.messaggio}`)); }
          else { const r = fattureDaXml(testo, file.name); fatture.push(...r.fatture); errori.push(...r.errori); }
        }
        const nuove = fatture.filter((x) => !esistenti.has(`${x.numero}|${x.data}|${x.importo}`));
        const duplicate = fatture.length - nuove.length;
        area.querySelector('.anteprima')?.remove();
        area.append(h('div', { classe: 'anteprima pila', style: 'gap:12px' },
          avviso(nuove.length ? 'ok' : 'attenzione', `${nuove.length} fatture da importare.`, duplicate ? `${duplicate} già presenti (stessi numero, data e importo) verranno ignorate.` : ''),
          errori.length ? avviso('errore', `${errori.length} righe scartate:`, errori.slice(0, 6).join(' · ') + (errori.length > 6 ? ' …' : '')) : null,
          nuove.length ? h('div', { classe: 'tabella-contenitore', style: 'max-height:220px;overflow:auto;border:1px solid var(--line);border-radius:8px' }, h('table', { classe: 'tabella' }, h('thead', null, h('tr', null, ['N.', 'Data', 'Controparte', 'Importo'].map((t, i) => h('th', { classe: i === 3 ? 'numero' : '' }, t)))), h('tbody', null, nuove.slice(0, 50).map((x) => h('tr', null, h('td', null, x.numero), h('td', null, dataIt(x.data)), h('td', null, x.controparte), h('td', { classe: 'numero' }, euro(x.importo))))))) : null,
          bottone(`Importa ${nuove.length} fatture`, { variante: 'primario', icona: 'carica', disabled: nuove.length === 0, onClick: async () => {
            await archivio.modifica((d) => { for (const n of nuove) { const rec = { ...nuovaFattura(c.id), ...n }; if (n.bollo === undefined) rec.bollo = bolloDovuto(n.importo, params); d.fatture.push(rec); } });
            dlg.chiudi(); ctx.toast(`${nuove.length} fatture importate.`);
          } })));
      } }));
  }

  const elimina = async (f) => {
    if (!(await ctx.conferma({ titolo: 'Eliminare la fattura?', testo: `Fattura ${f.numero || ''} del ${dataIt(f.data)} (${euro(f.importo)}).`, etichetta: 'Elimina', pericolo: true }))) return;
    await archivio.modifica((d) => { d.fatture = d.fatture.filter((y) => y.id !== f.id); });
    ctx.toast('Fattura eliminata.');
  };
  const incassaOggi = async (f) => { await archivio.modifica((d) => { const x = d.fatture.find((y) => y.id === f.id); x.dataIncasso = x.dataIncasso ? '' : (ctx.oggi >= x.data ? ctx.oggi : x.data); }); };

  const seg = (k, et) => h('button', { type: 'button', 'aria-pressed': String(filtro === k), onClick: () => { ctx.stato.filtroFatture = k; ctx.aggiorna(); } }, et);
  const cerca = h('div', { classe: 'cerca' }, icona('cerca', 16), h('input', { classe: 'input', type: 'search', placeholder: 'Cerca per numero o cliente…', 'aria-label': 'Cerca fatture', valore: ctx.stato.cercaFatture ?? '',
    onInput: (e) => { ctx.stato.cercaFatture = e.target.value; const pos = e.target.selectionStart; ctx.aggiorna(); const n = document.querySelector('.strumenti input'); n?.focus(); n?.setSelectionRange(pos, pos); } }));

  const tab = tabella({
    ordinaIniziale: { chiave: 'data', verso: -1 }, righe: lista,
    colonne: [
      { chiave: 'numero', titolo: 'Numero', ordina: (f) => f.numero, cella: (f) => h('strong', null, f.numero || '—') },
      { chiave: 'data', titolo: 'Data', ordina: (f) => f.data, cella: (f) => dataIt(f.data) },
      { chiave: 'cp', titolo: 'Controparte', ordina: (f) => f.controparte.toLowerCase(), cella: (f) => f.controparte || h('span', { classe: 'muted' }, '—') },
      { chiave: 'importo', titolo: 'Importo', numerica: true, ordina: (f) => f.importo, cella: (f) => h('div', null, h('strong', null, euro(f.importo)), f.bollo ? h('div', { classe: 'sotto' }, `bollo ${euro(f.bollo)}`) : null) },
      { chiave: 'inc', titolo: 'Incasso', ordina: (f) => f.dataIncasso || '9999', cella: (f) => (f.dataIncasso ? chip('ok', dataIt(f.dataIncasso), 'spunta') : chip('attenzione', 'Da incassare', 'orologio')) },
      { chiave: 'az', titolo: '', cella: (f) => h('div', { classe: 'azioni-riga' }, h('button', { classe: 'bottone ghost icona-sola piccolo', type: 'button', 'aria-label': `Azioni fattura ${f.numero}`, onClick: (e) => apriMenu(e.currentTarget, [
        { testo: 'Modifica', icona: 'modifica', onClick: () => apriForm(f) },
        { testo: f.dataIncasso ? 'Segna da incassare' : 'Segna incassata oggi', icona: 'spunta', onClick: () => incassaOggi(f) },
        'sep', { testo: 'Elimina', icona: 'cestino', pericolo: true, onClick: () => elimina(f) }]) }, icona('altro', 18))) },
    ],
  });

  if (ctx.stato.nuovaFattura) { ctx.stato.nuovaFattura = false; setTimeout(() => apriForm(), 50); }

  return h('div', { classe: 'pila' },
    testataCliente(ctx, ctx.riepilogo(), []),
    testataPagina('Fatture emesse', `Anno ${anno}`, [
      bottone('Importa CSV', { icona: 'carica', onClick: () => apriImport('csv') }),
      bottone('Importa XML', { icona: 'carica', onClick: () => apriImport('xml') }),
      bottone('Esporta CSV', { icona: 'scarica', onClick: () => scarica(`fatture-${c.nome.replace(/\W+/g, '_')}-${anno}.csv`, csvFatture(lista), 'text/csv;charset=utf-8') }),
      bottone('Nuova fattura', { variante: 'primario', icona: 'piu', onClick: () => apriForm() })]),
    h('div', { classe: 'tiles' },
      tile(`Incassato nel ${anno}`, euro(incassato), { icona: 'spunta', nota: 'Concorre ai ricavi dell’anno' }),
      tile('Da incassare', euro(daIncassare), { icona: 'orologio', nota: `${sue.filter((f) => !f.dataIncasso).length} fatture aperte` }),
      tile(`Fatturato ${anno}`, euro(fatturato), { icona: 'documento', nota: `${sue.filter((f) => f.data.startsWith(String(anno))).length} fatture emesse` })),
    scheda({ senzaPadding: true },
      sue.length === 0
        ? vuoto({ icona: 'documento', titolo: `Nessuna fattura per il ${anno}`, testo: 'Inserisci una fattura oppure importala da CSV o da file XML FatturaPA.', azioni: [bottone('Nuova fattura', { variante: 'primario', icona: 'piu', onClick: () => apriForm() }), bottone('Importa XML', { icona: 'carica', onClick: () => apriImport('xml') })] })
        : [h('div', { classe: 'strumenti' }, cerca, h('div', { classe: 'segmenti', role: 'group', 'aria-label': 'Filtra' }, seg('tutte', 'Tutte'), seg('da-incassare', 'Da incassare'), seg('incassate', 'Incassate'))),
          lista.length ? tab : vuoto({ icona: 'cerca', titolo: 'Nessun risultato', testo: 'Nessuna fattura corrisponde ai filtri.' })]));
}
