import p2026 from './2026.js';

const PARAMETRI = { 2026: p2026 };

export function parametriAnno(anno) {
  const p = PARAMETRI[anno];
  if (!p) throw new Error(`Parametri fiscali non disponibili per l'anno ${anno}`);
  return p;
}

export function anniDisponibili() {
  return Object.keys(PARAMETRI).map(Number).sort();
}
