import { riepilogoAnno } from './riepilogo.js';
import { scadenzarioCliente } from './scadenze-cliente.js';

/**
 * Quadro d'insieme dello studio per l'anno `anno`: una riga per cliente con incassi, soglia e prossima scadenza.
 * @param {string} oggi data ISO di riferimento
 */
export function panoramicaStudio(dati, anno, paramsPer, oggi) {
  const righe = dati.clienti.map((c) => {
    const r = riepilogoAnno(c, dati, anno, paramsPer(anno).params, { paramsPrec: paramsPer(anno - 1).params });
    const voci = scadenzarioCliente(c, dati, anno, paramsPer).voci.filter((v) => v.importo > 0 && v.data && !v.versata);
    const prossima = voci.find((v) => v.data >= oggi) ?? null;
    const scadute = voci.filter((v) => v.data < oggi);
    return { cliente: c, riepilogo: r, prossima, scadute };
  });
  const totaleRicavi = righe.reduce((s, r) => s + r.riepilogo.ricavi, 0);
  const daMonitorare = righe.filter((r) => ['attenzione', 'esce-anno-successivo', 'esce-subito'].includes(r.riepilogo.soglie.stato));
  return { righe, totaleRicavi, daMonitorare, nScadute: righe.reduce((s, r) => s + r.scadute.length, 0) };
}

/** Agenda dei versamenti dell'intero studio, ordinata per data, esclusi quelli già versati. */
export function agendaStudio(dati, anno, paramsPer, { soloFuture = false, oggi } = {}) {
  const voci = [];
  for (const c of dati.clienti) {
    for (const v of scadenzarioCliente(c, dati, anno, paramsPer).voci) {
      if (!v.data) continue;
      if (soloFuture && v.data < oggi) continue;
      voci.push({ ...v, cliente: c });
    }
  }
  return voci.sort((a, b) => a.data.localeCompare(b.data) || a.cliente.nome.localeCompare(b.cliente.nome));
}
