import { h, scheda, testataPagina, bottone, vuoto, tile, euro, MESI_LUNGHI } from '../dom.js';
import { agendaStudio } from '../../domain/studio.js';
import { voceAgenda, esportaPdf } from '../dominio-ui.js';
import { pdfAgenda } from '../../export/pdf.js';
import { csvAgenda } from '../../export/csv.js';
import { scarica } from '../dom.js';

export function vistaAgenda(ctx) {
  const { dati, anno, oggi, archivio } = ctx;
  const filtro = ctx.stato.filtroAgenda ?? 'da-versare';
  const tutte = agendaStudio(dati, anno, ctx.paramsPer, { oggi });
  const conImporto = tutte.filter((v) => v.tipo === 'adempimento' || v.importo > 0);
  const filtrate = conImporto.filter((v) => {
    if (filtro === 'da-versare') return !v.versata && v.data >= oggi;
    if (filtro === 'scadute') return !v.versata && v.data < oggi && v.tipo !== 'adempimento';
    if (filtro === 'versate') return Boolean(v.versata);
    return true;
  });
  const conteggi = {
    'da-versare': conImporto.filter((v) => !v.versata && v.data >= oggi).length,
    scadute: conImporto.filter((v) => !v.versata && v.data < oggi && v.tipo !== 'adempimento').length,
    versate: conImporto.filter((v) => v.versata).length,
    tutte: conImporto.length,
  };
  const importoDa = conImporto.filter((v) => !v.versata && v.data >= oggi && v.tipo !== 'adempimento').reduce((s, v) => s + v.importo, 0);
  const importoScaduto = conImporto.filter((v) => !v.versata && v.data < oggi && v.tipo !== 'adempimento').reduce((s, v) => s + v.importo, 0);

  const segna = async (v) => {
    await archivio.modifica((d) => {
      const c = d.clienti.find((x) => x.id === v.cliente.id);
      const chiave = `${anno}:${v.id}`;
      c.pagati ??= {};
      if (c.pagati[chiave]) delete c.pagati[chiave]; else c.pagati[chiave] = oggi;
    });
  };

  const gruppi = new Map();
  for (const v of filtrate) { const k = v.data.slice(0, 7); (gruppi.get(k) ?? gruppi.set(k, []).get(k)).push(v); }

  const seg = (chiave, etichetta) => h('button', { type: 'button', 'aria-pressed': String(filtro === chiave), onClick: () => { ctx.stato.filtroAgenda = chiave; ctx.aggiorna(); } }, `${etichetta} ${conteggi[chiave]}`);

  return h('div', { classe: 'pila' },
    testataPagina('Agenda scadenze', `Versamenti ${anno} di tutti i clienti`, [
      bottone('CSV', { icona: 'scarica', onClick: () => scarica(`agenda-${anno}.csv`, csvAgenda(filtrate), 'text/csv;charset=utf-8') }),
      bottone('PDF', { variante: 'primario', icona: 'pdf', onClick: () => esportaPdf((J) => pdfAgenda(J, { voci: filtrate, anno, studio: ctx.studio }), `agenda-versamenti-${anno}.pdf`) })]),
    h('div', { classe: 'tiles' },
      tile('Da versare', euro(importoDa), { nota: `${conteggi['da-versare']} versamenti futuri`, icona: 'calendario' }),
      tile('Scaduti non versati', euro(importoScaduto), { nota: conteggi.scadute ? 'Valuta il ravvedimento operoso' : 'Nessuno', icona: 'avviso' }),
      tile('Già versati', String(conteggi.versate), { nota: 'Segnati come versati', icona: 'spunta' })),
    scheda({ senzaPadding: true },
      h('div', { classe: 'strumenti' }, h('div', { classe: 'segmenti', role: 'group', 'aria-label': 'Filtra le scadenze' }, seg('da-versare', 'Da versare'), seg('scadute', 'Scadute'), seg('versate', 'Versate'), seg('tutte', 'Tutte'))),
      filtrate.length === 0 ? vuoto({ icona: 'calendario', titolo: 'Nessuna scadenza', testo: 'Non ci sono versamenti per questo filtro.' })
        : [...gruppi.entries()].map(([k, voci]) => h('div', null, h('div', { classe: 'intestazione-mese' }, `${MESI_LUNGHI[Number(k.slice(5)) - 1]} ${k.slice(0, 4)}`), h('ul', { classe: 'timeline' }, voci.map((v) => voceAgenda(v, { mostraCliente: true, onVersata: segna })))))));
}
