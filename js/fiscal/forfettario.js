import { round2, clamp0 } from './utils.js';
import { contributiPrevidenziali } from './inps.js';

/** Bollo da 2 € sulle fatture esenti IVA con importo superiore a 77,47 €. */
export function bolloDovuto(importo, params) {
  const { sogliaImporto, importo: bollo } = params.forfettario.bollo;
  return importo > sogliaImporto ? bollo : 0;
}

/**
 * Aliquota dell'imposta sostitutiva: 5% per i primi 5 anni di attività se i requisiti
 * startup sono rispettati, altrimenti 15%.
 */
export function aliquotaSostitutiva(params, { annoInizioAttivita, requisitiStartup = false, annoImposta = params.anno }) {
  const { startup, ordinaria, anniStartup } = params.forfettario.aliquote;
  const annoUltimo = annoInizioAttivita + anniStartup - 1;
  const inPeriodo = requisitiStartup && annoImposta >= annoInizioAttivita && annoImposta <= annoUltimo;
  return { aliquota: inPeriodo ? startup : ordinaria, startup: inPeriodo, annoUltimoStartup: annoUltimo };
}

/**
 * Calcolo del regime forfettario.
 * @param {object} dati
 * @param {{descrizione?: string, importo: number, coefficiente: number}[]} dati.ricavi ricavi incassati per codice ATECO
 * @param {object} dati.previdenza {tipo, altraCopertura?, cassa?}
 * @param {number} dati.aliquota aliquota imposta sostitutiva
 * @param {number} [dati.contributiVersatiAnnoPrec] contributi versati nell'anno, deducibili (criterio di cassa)
 * @param {boolean} [dati.riduzione35]
 */
export function calcolaForfettario(params, dati) {
  const ricavi = round2(dati.ricavi.reduce((s, r) => s + r.importo, 0));
  const redditoLordo = round2(dati.ricavi.reduce((s, r) => s + r.importo * r.coefficiente, 0));

  const contributi = contributiPrevidenziali(redditoLordo, params, dati.previdenza, { riduzione35: dati.riduzione35 });
  const contributiDeducibili = dati.contributiVersati ?? contributi.totale;

  const imponibile = round2(clamp0(redditoLordo - contributiDeducibili));
  const imposta = round2(imponibile * dati.aliquota);

  return {
    ricavi,
    redditoLordo,
    contributi,
    contributiDeducibili: round2(contributiDeducibili),
    imponibile,
    aliquota: dati.aliquota,
    imposta,
    totaleCarico: round2(imposta + contributi.totale),
  };
}
