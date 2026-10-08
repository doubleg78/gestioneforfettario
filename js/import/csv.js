// Import CSV di fatture emesse. Accetta ';' o ',' come separatore, numeri e date all'italiana.

export function parseCsv(testo) {
  const t = testo.replace(/^﻿/, '');
  const primaRiga = t.split(/\r?\n/, 1)[0] ?? '';
  const sep = (primaRiga.match(/;/g)?.length ?? 0) >= (primaRiga.match(/,/g)?.length ?? 0) ? ';' : ',';
  const righe = [];
  let riga = [], campo = '', tra = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (tra) {
      if (c === '"' && t[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') tra = false;
      else campo += c;
    } else if (c === '"') tra = true;
    else if (c === sep) { riga.push(campo); campo = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && t[i + 1] === '\n') i++;
      riga.push(campo); campo = '';
      if (riga.some((x) => x.trim() !== '')) righe.push(riga);
      riga = [];
    } else campo += c;
  }
  riga.push(campo);
  if (riga.some((x) => x.trim() !== '')) righe.push(riga);
  return righe;
}

export function parseImporto(s) {
  let v = String(s ?? '').trim().replace(/[€\s]/g, '');
  if (v === '') return NaN;
  if (v.includes(',')) v = v.replace(/\./g, '').replace(',', '.');
  else if ((v.match(/\./g) ?? []).length > 1) v = v.replace(/\./g, '');
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

/** Restituisce una data ISO (AAAA-MM-GG) o null. */
export function parseData(s) {
  const v = String(s ?? '').trim();
  let m = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
  let a, me, g;
  if (m) [, a, me, g] = m;
  else if ((m = v.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/))) [, g, me, a] = m;
  else return null;
  const d = new Date(Date.UTC(+a, +me - 1, +g));
  if (d.getUTCFullYear() !== +a || d.getUTCMonth() !== +me - 1 || d.getUTCDate() !== +g) return null;
  return `${a}-${String(me).padStart(2, '0')}-${String(g).padStart(2, '0')}`;
}

const ALIAS = {
  numero: ['numero', 'n', 'n.', 'fattura', 'numero fattura'],
  data: ['data', 'data fattura', 'data emissione'],
  controparte: ['cliente', 'controparte', 'denominazione', 'descrizione', 'committente'],
  importo: ['importo', 'totale', 'imponibile', 'compenso', 'ricavo'],
  dataIncasso: ['incasso', 'data incasso', 'dataincasso', 'data_incasso', 'pagamento', 'data pagamento'],
  ateco: ['ateco', 'codice ateco'],
};

/**
 * Trasforma il CSV in fatture. Le righe non valide finiscono in `errori` con il numero di riga.
 * @returns {{fatture: object[], errori: {riga: number, messaggio: string}[]}}
 */
export function fattureDaCsv(testo) {
  const righe = parseCsv(testo);
  if (righe.length < 2) return { fatture: [], errori: [{ riga: 1, messaggio: 'File vuoto o senza righe di dati' }] };
  const intest = righe[0].map((x) => x.trim().toLowerCase());
  const col = {};
  for (const [campo, nomi] of Object.entries(ALIAS)) col[campo] = intest.findIndex((h) => nomi.includes(h));
  const mancanti = ['data', 'importo'].filter((c) => col[c] < 0);
  if (mancanti.length) return { fatture: [], errori: [{ riga: 1, messaggio: `Colonne obbligatorie mancanti: ${mancanti.join(', ')}` }] };

  const fatture = [], errori = [];
  righe.slice(1).forEach((r, i) => {
    const n = i + 2;
    const data = parseData(r[col.data]);
    const importo = parseImporto(r[col.importo]);
    const incassoGrezzo = col.dataIncasso >= 0 ? (r[col.dataIncasso] ?? '').trim() : '';
    const dataIncasso = incassoGrezzo ? parseData(incassoGrezzo) : '';
    if (!data) return errori.push({ riga: n, messaggio: `Data non valida: "${r[col.data] ?? ''}"` });
    if (Number.isNaN(importo)) return errori.push({ riga: n, messaggio: `Importo non valido: "${r[col.importo] ?? ''}"` });
    if (dataIncasso === null) return errori.push({ riga: n, messaggio: `Data incasso non valida: "${incassoGrezzo}"` });
    fatture.push({
      numero: col.numero >= 0 ? (r[col.numero] ?? '').trim() : '',
      data,
      controparte: col.controparte >= 0 ? (r[col.controparte] ?? '').trim() : '',
      importo,
      dataIncasso,
      atecoCodice: col.ateco >= 0 ? (r[col.ateco] ?? '').trim() : '',
    });
  });
  return { fatture, errori };
}
