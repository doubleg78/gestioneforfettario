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

/**
 * Riepilogo dell'anno d'imposta.
 * I contributi previdenziali si deducono nell'anno in cui sono versati (art. 1 c. 64 L. 190/2014):
 * se non è registrato l'importo versato, si stima con i contributi di competenza dell'anno precedente
 * (saldo + acconti dell'anno ≈ contributi dell'anno prima). Con `opzioni.paramsPrec` la stima è attiva.
 * @param {{paramsPrec?: object, senzaStima?: boolean}} [opzioni]
 */
export function riepilogoAnno(cliente, dati, annoRif, params, opzioni = {}) {
  const perAteco = ricaviPerAteco(cliente, dati.fatture, annoRif, params);
  const ricavi = round2(perAteco.reduce((s, v) => s + v.importo, 0));
  const daIncassare = round2(dati.fatture
    .filter((f) => f.clienteId === cliente.id && !f.dataIncasso && anno(f.data) === annoRif)
    .reduce((s, f) => s + f.importo, 0));
  const spese = round2(dati.spese.filter((s) => s.clienteId === cliente.id && anno(s.data) === annoRif).reduce((s, x) => s + x.importo, 0));
  const soglie = verificaSoglieRicavi(params, ricavi);
  const alq = aliquotaSostitutiva(params, { annoInizioAttivita: cliente.annoInizioAttivita, requisitiStartup: cliente.startup, annoImposta: annoRif });
  const senzaCoefficienti = perAteco.some((v) => v.importo > 0 && !v.coefficiente);
  const datiForf = {
    ricavi: perAteco.filter((v) => v.importo !== 0).map((v) => ({ importo: v.importo, coefficiente: v.coefficiente })),
    previdenza: cliente.previdenza,
    aliquota: alq.aliquota,
    riduzione35: cliente.previdenza.riduzione35,
  };
  let forfettario = senzaCoefficienti ? null : calcolaForfettario(params, datiForf);

  // Contributi dedotti per cassa: registrati, stimati dall'anno precedente, o (senza dati) di competenza
  let deduzione = { metodo: 'competenza', importo: forfettario?.contributi.totale ?? 0 };
  const registrati = cliente.versamenti?.[annoRif]?.contributiVersatiAnno;
  if (forfettario && Number.isFinite(registrati)) {
    deduzione = { metodo: 'registrati', importo: registrati };
  } else if (forfettario && opzioni.paramsPrec && !opzioni.senzaStima) {
    const prec = riepilogoAnno(cliente, dati, annoRif - 1, opzioni.paramsPrec, { senzaStima: true });
    deduzione = { metodo: 'stima', importo: prec.forfettario?.contributi.totale ?? 0 };
  }
  if (forfettario && deduzione.metodo !== 'competenza') {
    forfettario = calcolaForfettario(params, { ...datiForf, contributiVersati: deduzione.importo });
  }
  return { annoRif, perAteco, ricavi, daIncassare, spese, soglie, aliquota: alq, forfettario, deduzione };
}
