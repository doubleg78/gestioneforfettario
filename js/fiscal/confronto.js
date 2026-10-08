import { round2 } from './utils.js';
import { calcolaForfettario } from './forfettario.js';
import { calcolaOrdinario } from './ordinario.js';

/**
 * Confronto forfettario vs ordinario a parità di ricavi e di costi reali.
 * Nel forfettario i costi non sono deducibili ma vengono comunque sostenuti,
 * quindi il netto di entrambi i regimi parte da ricavi - costi reali.
 */
export function confrontaRegimi(params, { ricavi, costiReali, ricaviPerAteco, aliquota, previdenza, riduzione35, ordinario = {} }) {
  const forf = calcolaForfettario(params, { ricavi: ricaviPerAteco, previdenza, aliquota, riduzione35 });
  const ord = calcolaOrdinario(params, { ricavi, costi: costiReali, previdenza, ...ordinario });

  const nettoForfettario = round2(ricavi - costiReali - forf.totaleCarico);
  const nettoOrdinario = round2(ricavi - costiReali - ord.totaleCarico);
  const differenza = round2(nettoForfettario - nettoOrdinario);

  return {
    forfettario: { ...forf, netto: nettoForfettario },
    ordinario: { ...ord, netto: nettoOrdinario },
    differenza,
    conveniente: differenza === 0 ? 'pari' : differenza > 0 ? 'forfettario' : 'ordinario',
  };
}

/** Scenari what-if: ripete il confronto variando ricavi e/o costi. */
export function scenari(params, base, variazioni) {
  return variazioni.map((v) => {
    const ricavi = base.ricavi * (1 + (v.ricaviPct ?? 0));
    const costiReali = base.costiReali * (1 + (v.costiPct ?? 0));
    const fattore = base.ricavi === 0 ? 0 : ricavi / base.ricavi;
    const ricaviPerAteco = base.ricaviPerAteco.map((r) => ({ ...r, importo: r.importo * fattore }));
    return { variazione: v, ...confrontaRegimi(params, { ...base, ricavi, costiReali, ricaviPerAteco }) };
  });
}
