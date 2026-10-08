// Esportazione CSV in formato italiano (separatore ';', virgola decimale, BOM per Excel).

const cella = (v) => {
  if (v === null || v === undefined) return '';
  const s = typeof v === 'number' ? v.toFixed(2).replace('.', ',') : String(v);
  // Neutralizza le formule (CSV injection) quando il testo inizia con = + - @
  const sicura = typeof v === 'string' && /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return /[;"\n\r]/.test(sicura) ? `"${sicura.replace(/"/g, '""')}"` : sicura;
};

export function generaCsv(intestazioni, righe) {
  return '﻿' + [intestazioni, ...righe].map((r) => r.map(cella).join(';')).join('\r\n') + '\r\n';
}

const dataIt = (iso) => (iso ? iso.split('-').reverse().join('/') : '');

export function csvFatture(fatture) {
  return generaCsv(
    ['Numero', 'Data', 'Controparte', 'Importo', 'Data incasso', 'Bollo', 'ATECO'],
    fatture.map((f) => [f.numero, dataIt(f.data), f.controparte, f.importo, dataIt(f.dataIncasso), f.bollo || 0, f.atecoCodice]),
  );
}

export function csvScadenzario(voci) {
  return generaCsv(
    ['Scadenza', 'Descrizione', 'Importo', 'Codice tributo F24', 'Anno di riferimento', 'Note'],
    voci.map((v) => [dataIt(v.data), v.descrizione, v.importo, v.codiceTributo ?? '', v.annoRiferimento ?? '', v.nota ?? '']),
  );
}

export function csvConfronto(confronto) {
  const f = confronto.forfettario, o = confronto.ordinario;
  return generaCsv(['Voce', 'Forfettario', 'Ordinario'], [
    ['Ricavi', f.ricavi, o.ricavi],
    ['Costi reali', o.costi, o.costi],
    ['Reddito', f.redditoLordo, o.redditoProfessionale],
    ['Contributi previdenziali', f.contributi.totale, o.contributi.totale],
    ['Imponibile', f.imponibile, o.imponibile],
    ['Imposta (sostitutiva / IRPEF netta)', f.imposta, o.irpef],
    ['Addizionali', 0, o.addizionali],
    ['IRAP', 0, o.irap],
    ['Totale imposte e contributi', f.totaleCarico, o.totaleCarico],
    ['Netto disponibile', f.netto, o.netto],
  ]);
}
