import { round2 } from '../fiscal/utils.js';
import { fattureIncassateNellAnno } from './riepilogo.js';

export const MESI = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];

/** Ricavi incassati per mese (criterio di cassa). */
export function incassiMensili(fatture, clienteId, anno) {
  const mesi = Array(12).fill(0);
  for (const f of fattureIncassateNellAnno(fatture, clienteId, anno)) mesi[Number(f.dataIncasso.slice(5, 7)) - 1] += f.importo;
  return mesi.map(round2);
}

export function cumulato(valori) {
  let t = 0;
  return valori.map((v) => (t = round2(t + v)));
}

/** Somma del bollo delle fatture emesse in ciascun trimestre solare dell'anno (per data di emissione). */
export function bolloPerTrimestre(fatture, clienteId, anno) {
  const q = [0, 0, 0, 0];
  for (const f of fatture) {
    if (f.clienteId !== clienteId || !f.bollo || !f.data.startsWith(String(anno))) continue;
    q[Math.floor((Number(f.data.slice(5, 7)) - 1) / 3)] += f.bollo;
  }
  return q.map(round2);
}
