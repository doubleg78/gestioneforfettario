// Mappa codice ATECO 2007 -> gruppo di settore e coefficiente di redditività.
// Fonte: Allegato 4 L. 190/2014 (testo pubblicato dall'Agenzia delle Entrate).
// L'Allegato 4 è espresso in ATECO 2007, la cui articolazione per gruppo coincide con ATECO 2022.
// Per i codici ATECO 2025 si passa dalla tavola di raccordo ISTAT 2025-2022 (data/ateco2025.js).

import ATECO2025 from './data/ateco2025.js';

const GRUPPI_PER_DIVISIONE = [
  ['industrie-alimentari-bevande', [10, 11]],
  ['commercio-ingrosso-dettaglio', [45]],
  ['costruzioni-immobiliari', [41, 42, 43, 68]],
  ['alloggio-ristorazione', [55, 56]],
  ['attivita-professionali-sanitarie', [64, 65, 66, 69, 70, 71, 72, 73, 74, 75, 85, 86, 87, 88]],
  ['altre-attivita', [1, 2, 3, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 35, 36, 37, 38, 39, 49, 50, 51, 52, 53, 58, 59, 60, 61, 62, 63, 77, 78, 79, 80, 81, 82, 84,
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99]],
];

/** Restituisce il gruppo di settore per un codice ATECO 2007 (es. "62.01.00", "47.82", "70"), o null. */
export function gruppoAteco(codice) {
  const parti = String(codice).trim().split('.');
  const divisione = Number(parti[0]);
  const gruppo = Number(parti[1]?.slice(0, 1) ?? NaN); // 46.1 / 46.2..9, 47.1..7, 47.81, 47.82..89, 47.9
  const sottoGruppo = parti[1] ? Number(parti[1].padEnd(2, '0').slice(0, 2)) : NaN;
  if (!Number.isInteger(divisione)) return null;

  if (divisione === 46) return gruppo === 1 ? 'intermediari-commercio' : 'commercio-ingrosso-dettaglio';
  if (divisione === 47) {
    if (!parti[1]) return 'commercio-ingrosso-dettaglio';
    if (sottoGruppo === 81) return 'commercio-ambulante-alimentare';
    if (sottoGruppo >= 82 && sottoGruppo <= 89) return 'commercio-ambulante-altri';
    return 'commercio-ingrosso-dettaglio';
  }
  const trovato = GRUPPI_PER_DIVISIONE.find(([, divisioni]) => divisioni.includes(divisione));
  return trovato ? trovato[0] : null;
}

export function coefficienteAteco(codice, params) {
  const g = gruppoAteco(codice);
  return g ? { gruppo: g, coefficiente: params.forfettario.coefficienti[g] } : null;
}

/**
 * Coefficiente per un codice ATECO 2025. Il raccordo con l'ATECO 2022 non è sempre univoco
 * (alcune attività sono state ripartite tra più codici): in tal caso `univoco` è false e
 * `candidati` elenca i gruppi possibili, tra cui l'utente deve scegliere.
 */
export function coefficienteAteco2025(codice, params) {
  const indici = ATECO2025[String(codice).trim()];
  if (!indici) return null;
  const nomi = Object.keys(params.forfettario.coefficienti);
  const candidati = [...indici].map((i) => ({ gruppo: nomi[Number(i)], coefficiente: params.forfettario.coefficienti[nomi[Number(i)]] }));
  return { univoco: candidati.length === 1, candidati };
}
