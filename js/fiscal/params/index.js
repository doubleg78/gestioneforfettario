import p2025 from './2025.js';
import p2026 from './2026.js';

const PARAMETRI = { 2025: p2025, 2026: p2026 };

export function parametriAnno(anno) {
  const p = PARAMETRI[anno];
  if (!p) throw new Error(`Parametri fiscali non disponibili per l'anno ${anno}`);
  return p;
}

export function anniDisponibili() {
  return Object.keys(PARAMETRI).map(Number).sort();
}

/**
 * Parametri da usare per un anno: quelli esatti se presenti, altrimenti i più vicini
 * (`esatto: false` permette all'interfaccia di avvisare l'utente).
 */
export function parametriPerAnno(anno) {
  const anni = anniDisponibili();
  if (PARAMETRI[anno]) return { params: PARAMETRI[anno], esatto: true, annoUsato: anno };
  const usato = anni.filter((a) => a < anno).pop() ?? anni[0];
  return { params: PARAMETRI[usato], esatto: false, annoUsato: usato };
}
