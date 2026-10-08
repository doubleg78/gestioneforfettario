// Costruzione del DOM senza innerHTML: ogni stringa dell'utente passa da textContent.
import { icona } from './icone.js';

// Un nodo assente (null, undefined, false) non deve diventare il testo "null": i filtri vivono qui, una volta sola.
const pulisci = (nodi) => nodi.flat(Infinity).filter((n) => n !== null && n !== undefined && n !== false);
for (const nome of ['append', 'prepend', 'replaceChildren']) {
  const originale = Element.prototype[nome];
  Element.prototype[nome] = function (...nodi) { return originale.apply(this, pulisci(nodi)); };
}

export function h(tag, attrs, ...figli) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'classe') el.className = v;
    else if (k === 'valore') el.value = v;
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  aggiungi(el, figli);
  return el;
}

function aggiungi(el, figli) {
  for (const f of figli.flat(Infinity)) {
    if (f === null || f === undefined || f === false) continue;
    el.append(f instanceof Node ? f : document.createTextNode(String(f)));
  }
}

const eur = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', useGrouping: 'always' });
const eurIntero = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' });
export const euro = (n) => eur.format(n ?? 0);
export const euroIntero = (n) => eurIntero.format(Math.round(n ?? 0));
export const dataIt = (iso) => (iso ? iso.split('-').reverse().join('/') : '');
export const percentuale = (n) => `${(n * 100).toLocaleString('it-IT', { maximumFractionDigits: 2 })}%`;
export const MESI_LUNGHI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
export const iniziali = (nome) => (nome || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();

/** Campo di form con etichetta, aiuto ed errore; `ctrl` è l'elemento input/select già costruito. */
export function campo(etichetta, ctrl, aiuto) {
  const id = `c-${Math.random().toString(36).slice(2, 9)}`;
  ctrl.id = id;
  const el = h('div', { classe: 'campo' }, h('label', { for: id }, etichetta), ctrl, aiuto ? h('div', { classe: 'aiuto' }, aiuto) : null);
  el.mostraErrore = (msg) => {
    el.querySelector('.errore-campo')?.remove();
    ctrl.removeAttribute('aria-invalid');
    if (msg) { ctrl.setAttribute('aria-invalid', 'true'); el.append(h('div', { classe: 'errore-campo', role: 'alert' }, icona('avviso', 14), msg)); }
  };
  return el;
}

export function bottone(testo, { variante = '', icona: nomeIcona, onClick, tipo = 'button', piccolo = false, titolo, disabled = false } = {}) {
  const solaIcona = !testo;
  return h('button', {
    type: tipo, classe: `bottone ${variante} ${piccolo ? 'piccolo' : ''} ${solaIcona ? 'icona-sola' : ''}`.replace(/\s+/g, ' ').trim(),
    onClick, title: titolo, 'aria-label': solaIcona ? titolo : null, disabled,
  }, nomeIcona ? icona(nomeIcona, piccolo ? 15 : 16) : null, testo);
}

export function chip(tipo, testo, nomeIcona) {
  return h('span', { classe: `chip ${tipo}` }, nomeIcona ? icona(nomeIcona, 12) : null, testo);
}

const ICONE_AVVISO = { ok: 'spunta', attenzione: 'avviso', errore: 'avviso', info: 'info' };
export function avviso(tipo, titolo, testo) {
  return h('div', { classe: `avviso ${tipo}`, role: tipo === 'errore' ? 'alert' : 'status' },
    icona(ICONE_AVVISO[tipo] ?? 'info', 18),
    h('div', null, h('strong', null, titolo), testo ? ` ${testo}` : ''));
}

export function tile(etichetta, valore, { nota, icona: nomeIcona, evidenza = false } = {}) {
  return h('div', { classe: `tile ${evidenza ? 'evidenza' : ''}` },
    h('div', { classe: 'tile-etichetta' }, nomeIcona ? h('span', { classe: 'icona-tile' }, icona(nomeIcona, 16)) : null, etichetta),
    h('div', { classe: 'tile-valore' }, valore),
    nota ? h('div', { classe: 'tile-nota' }, nota) : null);
}

export function meter(percentuale, stato = '', grande = false) {
  const el = h('div', { classe: `meter ${stato} ${grande ? 'grande' : ''}`, role: 'img', 'aria-label': `${Math.round(percentuale)}%` }, h('span'));
  el.firstChild.style.width = `${Math.max(0, Math.min(100, percentuale))}%`;
  return el;
}

export function vuoto({ icona: nomeIcona = 'info', titolo, testo, azioni = [] }) {
  return h('div', { classe: 'vuoto' },
    h('div', { classe: 'vuoto-icona' }, icona(nomeIcona, 26)),
    h('h3', null, titolo), testo ? h('p', null, testo) : null,
    azioni.length ? h('div', { classe: 'gruppo-azioni' }, azioni) : null);
}

/** Scheda con testata (titolo, sottotitolo, azioni) e corpo. */
export function scheda({ titolo, sottotitolo, azioni, senzaPadding = false, classe = '' }, ...corpo) {
  return h('section', { classe: `scheda ${classe}` },
    titolo ? h('div', { classe: 'scheda-testa' }, h('div', null, h('h2', null, titolo), sottotitolo ? h('p', null, sottotitolo) : null), azioni ? h('div', { classe: 'gruppo-azioni' }, azioni) : null) : null,
    h('div', { classe: `scheda-corpo ${senzaPadding ? 'senza-padding' : ''}` }, corpo));
}

export function testataPagina(titolo, sottotitolo, azioni) {
  return h('div', { classe: 'testata-pagina' },
    h('div', null, h('h1', null, titolo), sottotitolo ? h('p', { classe: 'sottotitolo' }, sottotitolo) : null),
    azioni ? h('div', { classe: 'gruppo-azioni no-stampa' }, azioni) : null);
}

/**
 * Tabella con ordinamento al clic sull'intestazione.
 * colonne: [{chiave, titolo, numerica?, ordina?: (r)=>valore, cella: (r)=>Node|string}]
 */
export function tabella({ colonne, righe, ordinaIniziale, piede }) {
  const stato = { chiave: ordinaIniziale?.chiave ?? null, verso: ordinaIniziale?.verso ?? 1 };
  const contenitore = h('div', { classe: 'tabella-contenitore' });
  const disegna = () => {
    let dati = [...righe];
    const col = colonne.find((c) => c.chiave === stato.chiave);
    if (col?.ordina) dati.sort((a, b) => {
      const x = col.ordina(a), y = col.ordina(b);
      return (x < y ? -1 : x > y ? 1 : 0) * stato.verso;
    });
    contenitore.replaceChildren(h('table', { classe: 'tabella' },
      h('thead', null, h('tr', null, colonne.map((c) => h('th', {
        classe: `${c.numerica ? 'numero' : ''} ${c.ordina ? 'ordinabile' : ''}`.trim(),
        'aria-sort': c.chiave === stato.chiave ? (stato.verso === 1 ? 'ascending' : 'descending') : null,
        onClick: c.ordina ? () => { stato.verso = stato.chiave === c.chiave ? -stato.verso : 1; stato.chiave = c.chiave; disegna(); } : null,
      }, c.titolo, c.chiave === stato.chiave ? h('span', { classe: 'freccia-ord' }, stato.verso === 1 ? '↑' : '↓') : null)))),
      h('tbody', null, dati.map((r) => h('tr', null, colonne.map((c) => h('td', { classe: c.numerica ? 'numero' : '' }, c.cella(r)))))),
      piede ? h('tfoot', null, piede) : null));
  };
  disegna();
  return contenitore;
}

export function selezionaFile(accept, multiplo = false) {
  return new Promise((ok) => {
    const inp = h('input', { type: 'file', accept, multiple: multiplo });
    inp.addEventListener('change', () => ok([...inp.files]));
    inp.addEventListener('cancel', () => ok([]));
    inp.click();
  });
}

export function scarica(nomeFile, contenuto, tipo = 'application/json') {
  const url = URL.createObjectURL(new Blob([contenuto], { type: tipo }));
  const a = h('a', { href: url, download: nomeFile });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Zona di rilascio file con apertura da clic; `onFile(files)`. */
export function zonaRilascio({ testo, accept, multiplo = true, onFile }) {
  const z = h('div', { classe: 'zona-rilascio', tabindex: '0', role: 'button' }, icona('carica', 26), h('div', null, h('strong', null, testo), h('div', { classe: 'piccolo' }, 'Trascina qui i file oppure fai clic per sceglierli')));
  const apri = async () => { const f = await selezionaFile(accept, multiplo); if (f.length) onFile(f); };
  z.addEventListener('click', apri);
  z.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); apri(); } });
  z.addEventListener('dragover', (e) => { e.preventDefault(); z.classList.add('attiva'); });
  z.addEventListener('dragleave', () => z.classList.remove('attiva'));
  z.addEventListener('drop', (e) => { e.preventDefault(); z.classList.remove('attiva'); if (e.dataTransfer.files.length) onFile([...e.dataTransfer.files]); });
  return z;
}
