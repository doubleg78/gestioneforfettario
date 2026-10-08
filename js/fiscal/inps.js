import { round2, clamp0 } from './utils.js';

/**
 * Contributi INPS Gestione Separata (nessun minimale da versare).
 * @param {number} reddito reddito di lavoro autonomo (compensi - costi o reddito forfettario lordo)
 */
export function contributiGestioneSeparata(reddito, params, { altraCopertura = false } = {}) {
  const gs = params.gestioneSeparata;
  const aliquota = altraCopertura ? gs.aliquotaConAltraCopertura : gs.aliquotaProfessionistaSenzaCopertura;
  const base = Math.min(clamp0(reddito), gs.massimale);
  return { base, aliquota, totale: round2(base * aliquota) };
}

/**
 * Contributi IVS artigiani/commercianti: fissi sul minimale + eccedenza.
 * @param {'artigiani'|'commercianti'} gestione
 * @param {{riduzione35?: boolean}} opzioni riduzione 35% prevista per i forfettari
 */
export function contributiIvs(reddito, params, gestione, { riduzione35 = false } = {}) {
  const { ivs, forfettario } = params;
  const aliquota = ivs.aliquote[gestione];
  if (aliquota === undefined) throw new Error(`Gestione IVS sconosciuta: ${gestione}`);

  const redditoBase = clamp0(reddito);
  const fisso = round2(ivs.minimale * aliquota + ivs.contributoMaternitaAnnuo);

  const baseOltreMinimale = Math.min(redditoBase, ivs.massimale) - ivs.minimale;
  let eccedenza = 0;
  if (baseOltreMinimale > 0) {
    const soglia = ivs.maggiorazione.sogliaReddito;
    const fasciaBassa = Math.min(Math.min(redditoBase, ivs.massimale), soglia) - ivs.minimale;
    const fasciaAlta = Math.min(redditoBase, ivs.massimale) - soglia;
    eccedenza = clamp0(fasciaBassa) * aliquota + clamp0(fasciaAlta) * (aliquota + ivs.maggiorazione.punti);
  }

  const lordo = round2(fisso + eccedenza);
  const riduzione = riduzione35 ? round2(lordo * forfettario.riduzioneContributiIvs) : 0;
  return { fisso, eccedenza: round2(eccedenza), riduzione, totale: round2(lordo - riduzione) };
}

/** Cassa professionale: aliquota soggettiva su reddito, con eventuale minimo. */
export function contributiCassa(reddito, cassa) {
  const calcolato = clamp0(reddito) * cassa.aliquotaSoggettiva;
  return { totale: round2(Math.max(calcolato, cassa.contributoMinimo ?? 0)) };
}

/** Dispatcher in base alla tipologia previdenziale del cliente. */
export function contributiPrevidenziali(reddito, params, previdenza, opzioni = {}) {
  switch (previdenza.tipo) {
    case 'gestione-separata':
      return contributiGestioneSeparata(reddito, params, previdenza);
    case 'artigiani':
    case 'commercianti':
      return contributiIvs(reddito, params, previdenza.tipo, opzioni);
    case 'cassa':
      return contributiCassa(reddito, previdenza.cassa ?? params.cassa.predefinita);
    default:
      throw new Error(`Tipologia previdenziale sconosciuta: ${previdenza.tipo}`);
  }
}
