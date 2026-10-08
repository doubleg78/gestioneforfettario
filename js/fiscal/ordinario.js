import { round2, clamp0, applicaScaglioni } from './utils.js';
import { contributiPrevidenziali } from './inps.js';

/**
 * Detrazione per redditi di lavoro autonomo (art. 13 c. 5 e 5-ter TUIR), calcolata sul reddito complessivo.
 */
export function detrazioneLavoroAutonomo(redditoComplessivo, params) {
  const d = params.irpef.detrazioneLavoroAutonomo;
  const r = redditoComplessivo;
  // Il quoziente si usa troncato alla quarta cifra decimale (specifiche tecniche AdE, Redditi PF 2026)
  const quoziente = (num, den) => Math.floor((num / den) * 10000 + 1e-9) / 10000;
  let importo = 0;
  if (r <= d.finoA) importo = d.importoFisso;
  else if (r <= d.finoA2) importo = d.base + d.extra * quoziente(d.finoA2 - r, d.divisore);
  else if (r <= d.finoA3) importo = d.base * quoziente(d.finoA3 - r, d.divisore3);
  if (importo > 0 && r > d.aumento.da && r <= d.aumento.a) importo += d.aumento.importo;
  return round2(importo);
}

/**
 * Calcolo in regime ordinario di un lavoratore autonomo.
 * @param {object} dati
 * @param {number} dati.ricavi
 * @param {number} dati.costi costi reali deducibili
 * @param {object} dati.previdenza
 * @param {number} [dati.addizionaleRegionale] aliquota (es. 0.0173)
 * @param {number} [dati.addizionaleComunale] aliquota
 * @param {number} [dati.detrazioni] altre detrazioni d'imposta spettanti (inserite dall'utente)
 * @param {boolean} [dati.senzaDetrazioneAutonomi] esclude la detrazione per lavoro autonomo (es. se si fruisce di quella da lavoro dipendente)
 * @param {number} [dati.perditePregresse] perdite di esercizi precedenti da portare in diminuzione
 * @param {number} [dati.altriRedditi] altri redditi imponibili IRPEF
 * @param {number} [dati.altreDeduzioni]
 * @param {boolean} [dati.soggettoIrap]
 */
export function calcolaOrdinario(params, dati) {
  const ricavi = dati.ricavi;
  const costi = dati.costi ?? 0;
  const redditoProfessionale = round2(clamp0(ricavi - costi));

  const contributi = contributiPrevidenziali(redditoProfessionale, params, dati.previdenza);

  const imponibile = round2(clamp0(
    redditoProfessionale + (dati.altriRedditi ?? 0) - contributi.totale - (dati.altreDeduzioni ?? 0) - (dati.perditePregresse ?? 0)
  ));
  const irpefLorda = applicaScaglioni(imponibile, params.irpef.scaglioni);
  const detrazioneAutonomi = dati.senzaDetrazioneAutonomi ? 0 : detrazioneLavoroAutonomo(imponibile, params);
  const irpef = round2(clamp0(irpefLorda - detrazioneAutonomi - (dati.detrazioni ?? 0)));

  const addizionali = round2(
    imponibile * ((dati.addizionaleRegionale ?? 0) + (dati.addizionaleComunale ?? 0))
  );
  const irap = dati.soggettoIrap ? round2(redditoProfessionale * params.irap.aliquota) : 0;

  return {
    ricavi,
    costi,
    redditoProfessionale,
    contributi,
    imponibile,
    irpefLorda,
    detrazioneAutonomi,
    irpef,
    addizionali,
    irap,
    totaleCarico: round2(irpef + addizionali + irap + contributi.totale),
  };
}
