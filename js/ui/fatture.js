import { h, campo, avviso, euro, dataIt, selezionaFile, scarica } from './dom.js';
import { csvFatture } from '../export/csv.js';
import { nuovaFattura } from '../domain/modello.js';
import { bolloDovuto } from '../fiscal/forfettario.js';
import { fattureDaCsv } from '../import/csv.js';
import { fattureDaXml } from '../import/fatturapa.js';
import { round2 } from '../fiscal/utils.js';

export function vistaFatture(ctx) {
  const { archivio, dati, cliente: c, params } = ctx;
  if (!c) return h('div', null, h('h1', null, 'Fatture'), avviso('attenzione', 'Nessun cliente selezionato.'));

  const anni = [...new Set(dati.fatture.filter((f) => f.clienteId === c.id).flatMap((f) => [f.data, f.dataIncasso]).filter(Boolean).map((d) => Number(d.slice(0, 4))))].sort();
  const annoCorrente = new Date().getFullYear();
  if (!anni.includes(annoCorrente)) anni.push(annoCorrente);
  const filtro = ctx.stato.annoFatture ?? annoCorrente;

  const lista = dati.fatture
    .filter((f) => f.clienteId === c.id && (f.data.startsWith(String(filtro)) || (f.dataIncasso || '').startsWith(String(filtro))))
    .sort((a, b) => b.data.localeCompare(a.data));
  const incassato = round2(lista.filter((f) => (f.dataIncasso || '').startsWith(String(filtro))).reduce((s, f) => s + f.importo, 0));
  const daIncassare = round2(lista.filter((f) => !f.dataIncasso).reduce((s, f) => s + f.importo, 0));

  // --- Form di inserimento / modifica ---
  const f = ctx.stato.fatturaInModifica ? structuredClone(dati.fatture.find((x) => x.id === ctx.stato.fatturaInModifica)) : nuovaFattura(c.id);
  const inModifica = Boolean(ctx.stato.fatturaInModifica && f);
  const esitoForm = h('div');
  const bollo = h('input', { type: 'number', step: '0.01', min: '0', valore: f.bollo, onInput: (e) => { f.bollo = Number(e.target.value); } });
  const importo = h('input', { type: 'number', step: '0.01', required: true, valore: f.importo || '', onInput: (e) => { f.importo = Number(e.target.value); if (!inModifica || !f.bollo) { f.bollo = bolloDovuto(f.importo, params); bollo.value = f.bollo; } } });
  const selAteco = h('select', { onChange: (e) => { f.atecoCodice = e.target.value; } },
    h('option', { value: '' }, c.ateco.length ? 'Prima voce ATECO (predefinita)' : 'Nessun codice ATECO'),
    c.ateco.filter((v) => v.codice).map((v) => h('option', { value: v.codice, selected: v.codice === f.atecoCodice }, `${v.codice} ${v.descrizione}`)));

  const form = h('form', { onSubmit: async (e) => {
    e.preventDefault();
    if (f.dataIncasso && f.dataIncasso < f.data) return esitoForm.replaceChildren(avviso('errore', 'La data di incasso non può precedere la data della fattura.'));
    await archivio.modifica((d) => {
      const i = d.fatture.findIndex((x) => x.id === f.id);
      if (i >= 0) d.fatture[i] = f; else d.fatture.push(f);
    });
    ctx.stato.fatturaInModifica = null;
    ctx.aggiorna();
  } },
  h('div', { classe: 'griglia' },
    campo('Numero', h('input', { type: 'text', valore: f.numero, onInput: (e) => { f.numero = e.target.value; } })),
    campo('Data fattura', h('input', { type: 'date', required: true, valore: f.data, onInput: (e) => { f.data = e.target.value; } })),
    campo('Cliente (controparte)', h('input', { type: 'text', valore: f.controparte, onInput: (e) => { f.controparte = e.target.value; } })),
    campo('Importo imponibile (€)', importo),
    campo('Data incasso', h('input', { type: 'date', valore: f.dataIncasso, onInput: (e) => { f.dataIncasso = e.target.value; } }), 'Il ricavo conta nell’anno di incasso (criterio di cassa).'),
    campo('Bollo (€)', bollo, 'Dovuto sopra 77,47 €.'),
    campo('Attività (ATECO)', selAteco)),
  esitoForm,
  h('div', { classe: 'azioni' },
    h('button', { type: 'submit', classe: 'primario' }, inModifica ? 'Salva modifiche' : 'Aggiungi fattura'),
    inModifica ? h('button', { type: 'button', onClick: () => { ctx.stato.fatturaInModifica = null; ctx.aggiorna(); } }, 'Annulla') : null));

  // --- Import ---
  const areaImport = h('div');
  async function importa(origine) {
    const files = await selezionaFile(origine === 'csv' ? '.csv,text/csv,text/plain' : '.xml,text/xml,application/xml', origine === 'xml');
    if (!files.length) return;
    const fatture = [], errori = [];
    for (const file of files) {
      const testo = await file.text();
      if (origine === 'csv') {
        const r = fattureDaCsv(testo);
        fatture.push(...r.fatture);
        errori.push(...r.errori.map((x) => `Riga ${x.riga}: ${x.messaggio}`));
      } else {
        const r = fattureDaXml(testo, file.name);
        fatture.push(...r.fatture);
        errori.push(...r.errori);
      }
    }
    const esistenti = new Set(dati.fatture.filter((x) => x.clienteId === c.id).map((x) => `${x.numero}|${x.data}|${x.importo}`));
    const nuove = fatture.filter((x) => !esistenti.has(`${x.numero}|${x.data}|${x.importo}`));
    const duplicate = fatture.length - nuove.length;
    areaImport.replaceChildren(
      h('div', { classe: 'scheda' },
        h('h2', null, 'Anteprima importazione'),
        avviso(nuove.length ? 'ok' : 'attenzione', `${nuove.length} fatture da importare.`, duplicate ? `${duplicate} già presenti (stessi numero, data e importo) verranno ignorate.` : ''),
        errori.length ? avviso('errore', `${errori.length} righe scartate:`, errori.slice(0, 8).join(' · ') + (errori.length > 8 ? ' …' : '')) : null,
        origine === 'xml' ? h('p', { classe: 'tenue' }, 'Le fatture XML non riportano la data di incasso: inseriscila dopo l’importazione.') : null,
        h('div', { classe: 'azioni' },
          h('button', { classe: 'primario', disabled: nuove.length === 0, onClick: async () => {
            await archivio.modifica((d) => {
              for (const n of nuove) {
                const rec = { ...nuovaFattura(c.id), ...n };
                if (!n.bollo && n.bollo !== 0) rec.bollo = bolloDovuto(n.importo, params);
                d.fatture.push(rec);
              }
            });
            areaImport.replaceChildren();
            ctx.aggiorna();
          } }, 'Importa'),
          h('button', { onClick: () => areaImport.replaceChildren() }, 'Annulla'))));
  }

  const righe = lista.map((x) => h('tr', null,
    h('td', null, x.numero),
    h('td', null, dataIt(x.data)),
    h('td', null, x.controparte),
    h('td', { classe: 'numero' }, euro(x.importo)),
    h('td', null, x.dataIncasso ? dataIt(x.dataIncasso) : h('span', { classe: 'tenue' }, 'da incassare')),
    h('td', { classe: 'numero' }, x.bollo ? euro(x.bollo) : ''),
    h('td', null, x.atecoCodice),
    h('td', null, h('div', { classe: 'azioni' },
      h('button', { onClick: () => { ctx.stato.fatturaInModifica = x.id; ctx.aggiorna(); } }, 'Modifica'),
      h('button', { classe: 'pericolo', onClick: async () => { if (confirm('Eliminare la fattura?')) await archivio.modifica((d) => { d.fatture = d.fatture.filter((y) => y.id !== x.id); }); } }, 'Elimina')))));

  return h('div', null,
    h('h1', null, 'Fatture emesse'),
    h('p', { classe: 'tenue' }, c.nome),
    h('div', { classe: 'statistiche' },
      h('div', { classe: 'statistica' }, h('div', { classe: 'valore' }, euro(incassato)), h('div', { classe: 'etichetta' }, `Incassato nel ${filtro}`)),
      h('div', { classe: 'statistica' }, h('div', { classe: 'valore' }, euro(daIncassare)), h('div', { classe: 'etichetta' }, 'Da incassare'))),
    h('div', { classe: 'scheda' }, h('h2', null, inModifica ? 'Modifica fattura' : 'Nuova fattura'), form),
    h('div', { classe: 'scheda' },
      h('div', { classe: 'azioni' },
        h('strong', null, 'Importa:'),
        h('button', { onClick: () => importa('csv') }, 'File CSV'),
        h('button', { onClick: () => importa('xml') }, 'XML FatturaPA'),
        h('span', { classe: 'tenue' }, 'CSV: colonne data, importo (obbligatorie), numero, cliente, data incasso, ateco.'),
        h('strong', null, 'Esporta:'),
        h('button', { onClick: () => scarica(`fatture-${c.nome.replace(/[^\w-]+/g, '_')}-${filtro}.csv`, csvFatture(lista), 'text/csv;charset=utf-8') }, `CSV ${filtro}`)),
      areaImport),
    h('div', { classe: 'scheda' },
      h('div', { classe: 'azioni' },
        campo('Anno', h('select', { onChange: (e) => { ctx.stato.annoFatture = Number(e.target.value); ctx.aggiorna(); } }, anni.map((a) => h('option', { value: a, selected: a === filtro }, a))))),
      lista.length === 0 ? h('div', { classe: 'vuoto' }, `Nessuna fattura per il ${filtro}.`)
        : h('div', { classe: 'tabella-contenitore' }, h('table', null,
          h('thead', null, h('tr', null, ['N.', 'Data', 'Controparte'].map((t) => h('th', null, t)), h('th', { classe: 'numero' }, 'Importo'), h('th', null, 'Incasso'), h('th', { classe: 'numero' }, 'Bollo'), h('th', null, 'ATECO'), h('th', null, ''))),
          h('tbody', null, righe)))));
}
