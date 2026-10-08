// Genera js/fiscal/data/ateco2025.js: per ogni codice ATECO 2025 i gruppi di settore forfettario
// (via codici ATECO 2022 corrispondenti, la cui articolazione per gruppo coincide con l'Allegato 4).
// Uso: node tools/genera-ateco2025.mjs coppie.json
import { readFileSync, writeFileSync } from 'node:fs';
import params from '../js/fiscal/params/2026.js';
import { gruppoAteco } from '../js/fiscal/ateco.js';

const gruppi = Object.keys(params.forfettario.coefficienti);
const coppie = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const mappa = {};
// Se il codice 2025 esiste identico nel 2022 si usa solo quella corrispondenza: le altre sono
// sovrapposizioni parziali dovute allo spostamento di attività tra codici.
const identici = new Set(coppie.filter(([a, b]) => a === b).map(([a]) => a));
for (const [c25, c22] of coppie) {
  if (identici.has(c25) && c25 !== c22) continue;
  const g = gruppoAteco(c22);
  if (!g) continue;
  (mappa[c25] ??= new Set()).add(gruppi.indexOf(g));
}
const out = Object.fromEntries(
  Object.entries(mappa).map(([k, v]) => [k, [...v].sort((a, b) => a - b).join('')]),
);
const corpo = `// File generato da tools/genera-ateco2025.mjs dalla tavola di raccordo ISTAT ATECO 2025 - 2022.
// Valore = indici (0-8) dei gruppi di settore in params.forfettario.coefficienti.
export default ${JSON.stringify(out)};\n`;
writeFileSync(new URL('../js/fiscal/data/ateco2025.js', import.meta.url), corpo);
console.log(Object.keys(out).length, 'codici ATECO 2025');
