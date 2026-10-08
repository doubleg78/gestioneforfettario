// Grafici SVG senza librerie. Colonne e linee seguono le specifiche di dataviz:
// marchi sottili, griglia recessiva, legenda per >= 2 serie, tooltip al passaggio e al focus, vista tabella.

import { h, euro } from './dom.js';

const NS = 'http://www.w3.org/2000/svg';
const svg = (tag, attrs = {}, ...figli) => {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v !== null && v !== undefined) el.setAttribute(k === 'classe' ? 'class' : k, v);
  el.append(...figli.flat().filter((f) => f !== null && f !== undefined));
  return el;
};
const testo = (x, y, t, attrs = {}) => { const el = svg('text', { x, y, ...attrs }); el.textContent = t; return el; };

const L = 520, A = 250, M = { sx: 64, dx: 16, su: 16, giu: 32 };
const w = L - M.sx - M.dx, hh = A - M.su - M.giu;

/** Estremo "bello" per l'asse y e passo dei tick. */
function scalaY(massimo) {
  const grezzo = massimo > 0 ? massimo : 1;
  const mag = 10 ** Math.floor(Math.log10(grezzo));
  const passo = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((p) => grezzo / p <= 5) ?? mag * 10;
  const cima = Math.ceil(grezzo / passo) * passo;
  return { cima, passo };
}

const compatto = (n) => (Math.abs(n) >= 1000 ? `${(n / 1000).toLocaleString('it-IT', { maximumFractionDigits: 1 })}k` : String(Math.round(n)));

function tooltipBase(figura) {
  const tip = h('div', { classe: 'tooltip', role: 'status', hidden: true });
  figura.append(tip);
  const mostra = (clientX, clientY, righe) => {
    tip.replaceChildren(...righe);
    tip.hidden = false;
    const r = figura.getBoundingClientRect();
    const x = Math.min(clientX - r.left + 12, r.width - tip.offsetWidth - 4);
    tip.style.left = `${Math.max(4, x)}px`;
    tip.style.top = `${Math.max(4, clientY - r.top - tip.offsetHeight - 10)}px`;
  };
  return { tip, mostra, nascondi: () => { tip.hidden = true; } };
}

function assiEGriglia(cima, passo, formatoY) {
  const g = svg('g');
  for (let v = 0; v <= cima + 1e-9; v += passo) {
    const y = M.su + hh - (v / cima) * hh;
    g.append(svg('line', { x1: M.sx, x2: L - M.dx, y1: y, y2: y, classe: v === 0 ? 'asse' : 'griglia' }));
    g.append(testo(M.sx - 8, y + 4, formatoY(v), { classe: 'tick', 'text-anchor': 'end' }));
  }
  return g;
}

function tabella(intestazioni, righe) {
  return h('details', { classe: 'vista-tabella' }, h('summary', null, 'Mostra come tabella'),
    h('div', { classe: 'tabella-contenitore' }, h('table', null,
      h('thead', null, h('tr', null, intestazioni.map((t, i) => h('th', { classe: i ? 'numero' : null }, t)))),
      h('tbody', null, righe.map((r) => h('tr', null, r.map((c, i) => h('td', { classe: i ? 'numero' : null }, c))))))));
}

/**
 * Grafico a colonne, una serie.
 * @param {{titolo:string, descrizione?:string, categorie:string[], valori:number[], formato?:(n:number)=>string}} o
 */
export function graficoColonne({ titolo, descrizione, categorie, valori, formato = euro }) {
  const { cima, passo } = scalaY(Math.max(...valori, 0));
  const slot = w / valori.length;
  const spessore = Math.min(24, slot * 0.6);
  const figura = h('figure', { classe: 'grafico' });
  const { mostra, nascondi } = tooltipBase(figura);
  const lienzo = svg('svg', { viewBox: `0 0 ${L} ${A}`, role: 'img', 'aria-label': `${titolo}. ${descrizione ?? ''}` }, assiEGriglia(cima, passo, compatto));

  valori.forEach((v, i) => {
    const x = M.sx + slot * i + (slot - spessore) / 2;
    const alt = (v / cima) * hh;
    const y = M.su + hh - alt;
    // colonna con testa arrotondata (4px) e base quadrata
    const r = Math.min(4, alt, spessore / 2);
    const d = alt > 0 ? `M${x},${y + alt} V${y + r} Q${x},${y} ${x + r},${y} H${x + spessore - r} Q${x + spessore},${y} ${x + spessore},${y + r} V${y + alt} Z` : '';
    const colonna = svg('path', { d, classe: 'colonna' });
    const area = svg('rect', { x: M.sx + slot * i, y: M.su, width: slot, height: hh, classe: 'bersaglio', tabindex: '0', 'aria-label': `${categorie[i]}: ${formato(v)}` });
    const riga = () => [h('div', { classe: 'tip-valore' }, formato(v)), h('div', { classe: 'tip-etichetta' }, categorie[i])];
    const attiva = (e) => { colonna.classList.add('attiva'); const b = e.target.getBoundingClientRect(); mostra(e.clientX || b.left + b.width / 2, e.clientY || b.top, riga()); };
    area.addEventListener('pointermove', attiva);
    area.addEventListener('focus', attiva);
    area.addEventListener('pointerleave', () => { colonna.classList.remove('attiva'); nascondi(); });
    area.addEventListener('blur', () => { colonna.classList.remove('attiva'); nascondi(); });
    lienzo.append(colonna, area, testo(M.sx + slot * i + slot / 2, A - 10, categorie[i], { classe: 'tick', 'text-anchor': 'middle' }));
  });

  figura.prepend(h('figcaption', null, h('strong', null, titolo), descrizione ? h('div', { classe: 'tenue' }, descrizione) : null), lienzo);
  figura.append(tabella(['Periodo', 'Valore'], categorie.map((c, i) => [c, formato(valori[i])])));
  return figura;
}

/**
 * Grafico a linee con asse x numerico.
 * @param {{titolo:string, descrizione?:string, x:number[], serie:{nome:string, valori:number[], colore:string}[],
 *   formatoX?:Function, formatoY?:Function, riferimentoY?:{valore:number, etichetta:string},
 *   riferimentoX?:{valore:number, etichetta:string}, titoloX?:string}} o
 */
export function graficoLinee({ titolo, descrizione, x, serie, formatoX = (n) => String(n), formatoY = euro, riferimentoY, riferimentoX, titoloX = '' }) {
  const tutti = serie.flatMap((s) => s.valori).concat(riferimentoY ? [riferimentoY.valore] : []);
  const min = Math.min(0, ...tutti), max = Math.max(...tutti, 0);
  const { cima, passo } = scalaY(Math.max(max, -min));
  const base = min < 0 ? -Math.ceil(-min / passo) * passo : 0;
  const campo = cima - base;
  const xMin = x[0], xMax = x[x.length - 1];
  const px = (v) => M.sx + ((v - xMin) / (xMax - xMin || 1)) * w;
  const py = (v) => M.su + hh - ((v - base) / campo) * hh;

  const figura = h('figure', { classe: 'grafico' });
  const { mostra, nascondi } = tooltipBase(figura);
  const lienzo = svg('svg', { viewBox: `0 0 ${L} ${A}`, role: 'img', 'aria-label': `${titolo}. ${descrizione ?? ''}` });

  for (let v = base; v <= cima + 1e-9; v += passo) {
    lienzo.append(svg('line', { x1: M.sx, x2: L - M.dx, y1: py(v), y2: py(v), classe: v === 0 ? 'asse' : 'griglia' }), testo(M.sx - 8, py(v) + 4, compatto(v), { classe: 'tick', 'text-anchor': 'end' }));
  }
  const passiX = Math.min(x.length - 1, 5);
  for (let i = 0; i <= passiX; i++) {
    const v = xMin + ((xMax - xMin) * i) / passiX;
    lienzo.append(testo(px(v), A - 10, formatoX(v), { classe: 'tick', 'text-anchor': i === 0 ? 'start' : i === passiX ? 'end' : 'middle' }));
  }
  if (riferimentoY) {
    lienzo.append(svg('line', { x1: M.sx, x2: L - M.dx, y1: py(riferimentoY.valore), y2: py(riferimentoY.valore), classe: 'riferimento' }),
      testo(L - M.dx - 4, py(riferimentoY.valore) - 5, riferimentoY.etichetta, { classe: 'etichetta-rif', 'text-anchor': 'end' }));
  }
  if (riferimentoX && riferimentoX.valore >= xMin && riferimentoX.valore <= xMax) {
    lienzo.append(svg('line', { x1: px(riferimentoX.valore), x2: px(riferimentoX.valore), y1: M.su, y2: M.su + hh, classe: 'riferimento' }),
      testo(px(riferimentoX.valore) + 4, M.su + 12, riferimentoX.etichetta, { classe: 'etichetta-rif' }));
  }

  for (const s of serie) {
    lienzo.append(svg('path', { d: s.valori.map((v, i) => `${i ? 'L' : 'M'}${px(x[i])},${py(v)}`).join(' '), classe: 'linea', style: `stroke: var(${s.colore})` }));
    const u = s.valori.length - 1;
    lienzo.append(svg('circle', { cx: px(x[u]), cy: py(s.valori[u]), r: 4, classe: 'punto', style: `fill: var(${s.colore})` }));
  }

  const guida = svg('line', { classe: 'guida', y1: M.su, y2: M.su + hh, hidden: 'hidden' });
  const area = svg('rect', { x: M.sx, y: M.su, width: w, height: hh, classe: 'bersaglio', tabindex: '0', 'aria-label': `${titolo}: usa le frecce per scorrere i punti` });
  let corrente = 0;
  const vai = (i, clientX, clientY) => {
    corrente = Math.max(0, Math.min(x.length - 1, i));
    guida.removeAttribute('hidden');
    guida.setAttribute('x1', px(x[corrente])); guida.setAttribute('x2', px(x[corrente]));
    const r = area.getBoundingClientRect();
    mostra(clientX ?? r.left + (px(x[corrente]) / L) * r.width, clientY ?? r.top + 20, [
      h('div', { classe: 'tip-etichetta' }, titoloX ? `${titoloX}: ${formatoX(x[corrente])}` : formatoX(x[corrente])),
      ...serie.map((s) => h('div', { classe: 'tip-riga' }, h('span', { classe: 'chiave', style: `background: var(${s.colore})` }), h('span', { classe: 'tip-valore' }, formatoY(s.valori[corrente])), h('span', { classe: 'tip-etichetta' }, s.nome))),
    ]);
  };
  area.addEventListener('pointermove', (e) => {
    const r = area.getBoundingClientRect();
    const vx = xMin + ((e.clientX - r.left) / r.width) * (xMax - xMin);
    vai(x.reduce((m, v, i) => (Math.abs(v - vx) < Math.abs(x[m] - vx) ? i : m), 0), e.clientX, e.clientY);
  });
  area.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); vai(corrente + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); vai(corrente - 1); } });
  area.addEventListener('focus', () => vai(corrente));
  const esci = () => { guida.setAttribute('hidden', 'hidden'); nascondi(); };
  area.addEventListener('pointerleave', esci);
  area.addEventListener('blur', esci);
  lienzo.append(guida, area);

  const legenda = serie.length > 1 ? h('ul', { classe: 'legenda' }, serie.map((s) => h('li', null, h('span', { classe: 'chiave', style: `background: var(${s.colore})` }), s.nome))) : null;
  figura.prepend(...[h('figcaption', null, h('strong', null, titolo), descrizione ? h('div', { classe: 'tenue' }, descrizione) : null), legenda, lienzo].filter(Boolean));
  figura.append(tabella([titoloX || 'x', ...serie.map((s) => s.nome)], x.map((v, i) => [formatoX(v), ...serie.map((s) => formatoY(s.valori[i]))])));
  return figura;
}
