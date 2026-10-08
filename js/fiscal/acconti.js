import { round2 } from './utils.js';

/**
 * Acconti imposta sostitutiva (metodo storico): 100% dell'imposta dell'anno precedente.
 * - fino a 51,65 € : nessun acconto
 * - fino a 257,52 € : rata unica a novembre
 * - oltre: due rate (50% a giugno, 50% a novembre)
 */
export function accontiSostitutiva(params, impostaAnnoPrecedente, percentualeRata1) {
  const a = { ...params.forfettario.acconto, ...(percentualeRata1 !== undefined ? { percentualeRata1 } : {}) };
  if (impostaAnnoPrecedente <= a.sogliaMinima) return { prima: 0, seconda: 0, totale: 0 };
  if (impostaAnnoPrecedente <= a.sogliaRataUnica) {
    return { prima: 0, seconda: round2(impostaAnnoPrecedente), totale: round2(impostaAnnoPrecedente) };
  }
  const prima = round2(impostaAnnoPrecedente * a.percentualeRata1);
  const seconda = round2(impostaAnnoPrecedente - prima);
  return { prima, seconda, totale: round2(prima + seconda) };
}

/** Saldo = imposta dovuta per l'anno - acconti versati. Negativo = credito. */
export function saldoSostitutiva(impostaDovuta, accontiVersati) {
  return round2(impostaDovuta - accontiVersati);
}
