import { round2, clamp0, applicaScaglioni } from './utils.js';
import { contributiPrevidenziali } from './inps.js';

/**
 * Calcolo in regime ordinario di un lavoratore autonomo.
 * @param {object} dati
 * @param {number} dati.ricavi
 * @param {number} dati.costi costi reali deducibili
 * @param {object} dati.previdenza
 * @param {number} [dati.addizionaleRegionale] aliquota (es. 0.0173)
 * @param {number} [dati.addizionaleComunale] aliquota
 * @param {number} [dati.detrazioni] detrazioni d'imposta spettanti (inserite dall'utente)
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
    redditoProfessionale + (dati.altriRedditi ?? 0) - contributi.totale - (dati.altreDeduzioni ?? 0)
  ));
  const irpefLorda = applicaScaglioni(imponibile, params.irpef.scaglioni);
  const irpef = round2(clamp0(irpefLorda - (dati.detrazioni ?? 0)));

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
    irpef,
    addizionali,
    irap,
    totaleCarico: round2(irpef + addizionali + irap + contributi.totale),
  };
}
