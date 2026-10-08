import { round2 } from '../fiscal/utils.js';
import { verificaSoglieRicavi } from '../fiscal/requisiti.js';
import { calcolaForfettario, aliquotaSostitutiva } from '../fiscal/forfettario.js';

const anno = (iso) => (iso ? Number(iso.slice(0, 4)) : null);

/** Criterio di cassa: una fattura concorre ai ricavi nell'anno in cui è incassata. */
export function fattureIncassateNellAnno(fatture, clienteId, annoRif) {
  return fatture.filter((f) => f.clienteId === clienteId && f.dataIncasso && anno(f.dataIncasso) === annoRif);
}

/** Ricavi incassati nell'anno raggruppati per voce ATECO del cliente (con il coefficiente). */
export function ricaviPerAteco(cliente, fatture, annoRif, params) {
  const voci = cliente.ateco.map((v) => ({ ...v, coefficiente: params.forfettario.coefficienti[v.gruppo] ?? 0, importo: 0 }));
  const senzaAteco = { codice: '', descrizione: 'Senza codice ATECO', gruppo: null, coefficiente: 0, importo: 0 };
  for (const f of fattureIncassateNellAnno(fatture, cliente.id, annoRif)) {
    const voce = voci.find((v) => v.codice && v.codice === f.atecoCodice) ?? voci[0] ?? senzaAteco;
    voce.importo = round2(voce.importo + f.importo);
  }
  return voci.length ? voci : [senzaAteco];
}

export function riepilogoAnno(cliente, dati, annoRif, params) {
  const perAteco = ricaviPerAteco(cliente, dati.fatture, annoRif, params);
  const ricavi = round2(perAteco.reduce((s, v) => s + v.importo, 0));
  const daIncassare = round2(dati.fatture
    .filter((f) => f.clienteId === cliente.id && !f.dataIncasso && anno(f.data) === annoRif)
    .reduce((s, f) => s + f.importo, 0));
  const spese = round2(dati.spese.filter((s) => s.clienteId === cliente.id && anno(s.data) === annoRif).reduce((s, x) => s + x.importo, 0));
  const soglie = verificaSoglieRicavi(params, ricavi);
  const alq = aliquotaSostitutiva(params, { annoInizioAttivita: cliente.annoInizioAttivita, requisitiStartup: cliente.startup, annoImposta: annoRif });
  const senzaCoefficienti = perAteco.some((v) => v.importo > 0 && !v.coefficiente);
  const forfettario = senzaCoefficienti ? null : calcolaForfettario(params, {
    ricavi: perAteco.filter((v) => v.importo !== 0).map((v) => ({ importo: v.importo, coefficiente: v.coefficiente })),
    previdenza: cliente.previdenza,
    aliquota: alq.aliquota,
    riduzione35: cliente.previdenza.riduzione35,
  });
  return { annoRif, perAteco, ricavi, daIncassare, spese, soglie, aliquota: alq, forfettario };
}
