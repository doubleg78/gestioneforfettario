import TITOLI from './data/ateco2025-titoli.js';

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const INDICE = Object.entries(TITOLI).map(([codice, titolo]) => ({ codice, titolo, chiave: norm(`${codice} ${titolo}`) }));

export const titoloAteco2025 = (codice) => TITOLI[codice] ?? null;

/** Ricerca per codice (anche parziale) o per parole del titolo. */
export function cercaAteco(testo, limite = 12) {
  const q = norm(testo.trim());
  if (q.length < 2) return [];
  const parole = q.split(/\s+/);
  const trovati = INDICE.filter((r) => parole.every((p) => r.chiave.includes(p)));
  trovati.sort((a, b) => Number(b.codice.startsWith(q)) - Number(a.codice.startsWith(q)) || a.codice.localeCompare(b.codice));
  return trovati.slice(0, limite).map(({ codice, titolo }) => ({ codice, titolo }));
}
