import { riepilogoAnno } from './riepilogo.js';
import { calcolaScadenzario, accontoInpsTotale } from '../fiscal/scadenzario.js';
import { accontiSostitutiva } from '../fiscal/acconti.js';
import { bolloPerTrimestre } from './serie.js';

/**
 * Scadenzario dei versamenti dell'anno `P` per un cliente: saldo P-1 e acconti P.
 * Le stime derivano dai dati registrati; `over` permette di correggerle (valori dalla dichiarazione).
 * @param {(anno:number)=>{params:object, esatto:boolean, annoUsato:number}} paramsPer
 */
export function scadenzarioCliente(cliente, dati, P, paramsPer, over = {}) {
  const pP = paramsPer(P), pPrec = paramsPer(P - 1), pPrec2 = paramsPer(P - 2);
  const prec = riepilogoAnno(cliente, dati, P - 1, pPrec.params, { paramsPrec: pPrec2.params });
  const prec2 = riepilogoAnno(cliente, dati, P - 2, pPrec2.params, { senzaStima: true });
  const versati = cliente.versamenti?.[P - 1] ?? {};

  const stima = {
    imposta: prec.forfettario?.imposta ?? 0,
    reddito: prec.forfettario?.redditoLordo ?? 0,
    contributi: prec.forfettario?.contributi ?? { totale: 0 },
    // acconti dell'anno precedente stimati con la regola storica sull'anno ancora prima
    accSost: accontiSostitutiva(pPrec.params, prec2.forfettario?.imposta ?? 0, over.rata1 ?? 0.5).totale,
    accInps: accontoInpsTotale(pPrec.params, cliente.previdenza, prec2.forfettario?.redditoLordo ?? 0),
  };
  const usa = (chiave, salvato) => over[chiave] ?? salvato ?? stima[chiave];
  const effettivi = {
    imposta: usa('imposta'),
    reddito: usa('reddito'),
    contributi: over.contributi ?? stima.contributi.totale,
    accSost: usa('accSost', versati.sostitutiva),
    accInps: usa('accInps', versati.inps),
  };

  const voci = calcolaScadenzario(pP.params, {
    annoPagamento: P,
    impostaAnnoPrec: effettivi.imposta,
    accontiSostitutivaVersati: effettivi.accSost,
    contributiAnnoPrec: { ...stima.contributi, totale: effettivi.contributi },
    redditoAnnoPrec: effettivi.reddito,
    accontiInpsVersati: effettivi.accInps,
    previdenza: cliente.previdenza,
    prorogaEstate2026: over.proroga ?? P === 2026,
    percentualeRata1: over.rata1 ?? 0.5,
    bollo: { precQ4: bolloPerTrimestre(dati.fatture, cliente.id, P - 1)[3], q: bolloPerTrimestre(dati.fatture, cliente.id, P).slice(0, 3) },
    bolloDifferito: over.bolloDifferito ?? true,
    scadenzeManuali: (cliente.scadenzeCassa ?? []).filter((m) => m.anno === P),
  }).map((v) => ({ ...v, versata: cliente.pagati?.[`${P}:${v.id}`] ?? null }));

  return { voci, stima, effettivi, paramsInfo: pP, paramsPrecInfo: pPrec };
}
