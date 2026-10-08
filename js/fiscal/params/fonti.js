// Stato di verifica dei parametri fiscali: ogni voce indica da quale fonte proviene e quanto è solida.
// stato: 'verificato' (letto sul testo ufficiale), 'parziale' (fonte ufficiale solo in parte o fonti secondarie concordi),
//        'da-confermare' (non verificato).

const V = 'verificato', P = 'parziale', D = 'da-confermare';

const COMUNI_FORFETTARIO = [
  ['Regime forfettario', 'Soglia di ricavi o compensi per accesso e permanenza', '85.000 €', V, 'L. 190/2014 art. 1 c. 54; AdE, istruzioni Redditi PF 2026 (fasc. 3)'],
  ['Regime forfettario', 'Uscita nell’anno stesso', 'Oltre 100.000 €', V, 'L. 190/2014 art. 1 c. 71 (L. 197/2022); il reddito dell’intero anno si determina con le regole ordinarie (Circ. AdE 32/E 2023)'],
  ['Regime forfettario', 'Aliquota dell’imposta sostitutiva', '15%', V, 'L. 190/2014 art. 1 c. 64 (Normattiva)'],
  ['Regime forfettario', 'Aliquota startup', '5% per l’anno di inizio e i quattro successivi', V, 'L. 190/2014 art. 1 c. 65: tre condizioni (Normattiva)'],
  ['Regime forfettario', 'Coefficienti di redditività', '40% · 54% · 62% · 67% · 78% · 86% per gruppo di settore', V, 'Allegato 4 L. 190/2014 (testo AdE); per i codici ATECO 2025 vale il coefficiente del codice ATECO 2007 corrispondente (art. 1 D.Lgs. 81/2025, istruzioni Redditi PF 2026)'],
  ['Regime forfettario', 'Raccordo ATECO 2025 → gruppo di settore', 'Tavola ISTAT 2025–2022', P, 'ISTAT; in 142 codici su 1.289 il raccordo non è univoco: l’app fa scegliere il gruppo'],
  ['Regime forfettario', 'Contributi previdenziali deducibili', 'Nell’anno di versamento (cassa)', V, 'L. 190/2014 art. 1 c. 64; l’eccedenza è deducibile dal reddito complessivo'],
  ['Regime forfettario', 'Bollo sulle fatture', '2 € oltre 77,47 € (fatture senza IVA)', V, 'AdE, guida sul bollo delle fatture elettroniche (giugno 2026); Circ. 19/E 2020'],
  ['Versamenti', 'Versamento del bollo', 'Trimestrale con F24: 31/5, 30/9, 30/11, 28/2 (codici 2521–2524); differimento se l’importo non supera 5.000 €', V, 'AdE, guida sul bollo delle fatture elettroniche (giugno 2026)'],
  ['Regime forfettario', 'Riduzione contributiva IVS', '35% su domanda', V, 'L. 190/2014 art. 1 c. 77; INPS circ. 14/2026 (domanda entro il 28/2 per i nuovi iscritti)'],
];

export const FONTI = {
  2026: [
    ['Regime forfettario', 'Limite di reddito da lavoro dipendente o assimilato', '35.000 € (2025–2026), poi 30.000 €', V, 'L. 199/2025 art. 1 c. 27, citata nelle istruzioni Redditi PF 2026 (AdE)'],
    ...COMUNI_FORFETTARIO,
    ['Versamenti', 'Acconti dell’imposta sostitutiva', '50% + 50% (40% + 60% se l’attività non ha un ISA)', V, 'Risoluzione AdE 93/E del 12/11/2019 (art. 58 DL 124/2019); art. 17 c. 3 DPR 435/2001'],
    ['Versamenti', 'Soglie degli acconti', 'Nessun acconto fino a 51,65 €; rata unica sotto 257,52 €', P, 'Istruzioni Redditi PF 2026 (257,52 €; 52 € arrotondati)'],
    ['Versamenti', 'Codici tributo F24', '1790 prima rata · 1791 seconda rata o unica · 1792 saldo', V, 'Risoluzione AdE 59/E dell’11/6/2015; istruzioni Redditi PF 2026'],
    ['Versamenti', 'Scadenze ordinarie', '30 giugno, 30 novembre, dichiarazione 31 ottobre', P, 'Se cadono in giorno festivo slittano al primo giorno lavorativo (implementato)'],
    ['Versamenti', 'Proroga 2026 di saldo e primo acconto', '20 luglio; entro il 20 agosto con +0,80%', P, 'Art. 6 DL 89/2026 (abrogato dalla L. 113/2026 con effetti fatti salvi: art. 1 c. 2); scadenzario AdE; testo dell’art. 6 non letto'],
    ['Gestione Separata', 'Aliquote', '26,07% (25% + 0,72% + 0,35% ISCRO) · 24% con altra copertura', V, 'INPS, circolare 8 del 3/2/2026'],
    ['Gestione Separata', 'Minimale e massimale', '18.808 € · 122.295 €', V, 'INPS, circolare 8 del 3/2/2026'],
    ['Gestione Separata', 'Acconti', 'Aliquota dell’anno sull’80% del reddito dell’anno precedente, due rate uguali', V, 'AdE, istruzioni Redditi PF 2026 fasc. 2 (Quadro RR)'],
    ['Gestione Separata', 'Causali F24', 'PXX (26,07%) · P10 (24%)', V, 'INPS circ. 105/2025; istruzioni Redditi PF 2026'],
    ['Artigiani e commercianti', 'Aliquote IVS', '24% / 24,48%; +1 punto oltre 56.224 €', V, 'INPS, circolare 14 del 9/2/2026'],
    ['Artigiani e commercianti', 'Minimale e contributi fissi', '18.808 € · 4.521,36 € artigiani · 4.611,64 € commercianti', V, 'INPS, circolare 14/2026 (maternità 7,44 € inclusa)'],
    ['Artigiani e commercianti', 'Massimale', '93.707 € (anzianità al 31/12/1995) · 122.295 € (dal 1996)', V, 'INPS, circolare 14/2026 p. 4'],
    ['Artigiani e commercianti', 'Rate dei contributi fissi', '16 maggio (18/5 nel 2026), 20 agosto, 16 novembre, 16 febbraio', V, 'INPS circ. 14/2026 p. 9. La scheda sul portale INPS riporta 17 novembre: discrepanza non risolta'],
    ['Artigiani e commercianti', 'Acconti sulla quota eccedente il minimale', '100% del contributo sul reddito dell’anno precedente, in due rate uguali', P, 'INPS (due acconti di pari importo sul reddito dell’anno precedente) ed esempi di prassi; importi ufficiali nel Cassetto previdenziale'],
    ['Artigiani e commercianti', 'Causali F24', 'AF/CF minimale · AP/CP quota eccedente', V, 'INPS, scheda "F24 per artigiani e commercianti"'],
    ['IRPEF (regime ordinario)', 'Scaglioni', '23% fino a 28.000 € · 33% fino a 50.000 € · 43% oltre', V, 'Art. 11 c. 1 TUIR come modificato dalla L. 199/2025 art. 1 c. 3; AdE, scheda "Aliquote e calcolo dell’Irpef"; dossier Camera'],
    ['IRPEF (regime ordinario)', 'Detrazione per lavoro autonomo', '1.265 € fino a 5.500 € · formule fino a 50.000 € · +50 € tra 11.000 e 17.000 €', V, 'Art. 13 c. 5 e 5-ter TUIR; AdE, specifiche tecniche Redditi PF 2026 (quoziente a 4 decimali)'],
    ['IRPEF (regime ordinario)', 'Aliquota IRAP ordinaria', '3,9%', V, 'AdE, istruzioni IRAP 2026; le regioni possono variarla; i professionisti senza autonoma organizzazione ne sono esclusi'],
  ],
  2025: [
    ['Regime forfettario', 'Limite di reddito da lavoro dipendente o assimilato', '35.000 €', P, 'L. 207/2024 art. 1 c. 12 (fonti secondarie concordi)'],
    ...COMUNI_FORFETTARIO,
    ['Versamenti', 'Acconti dell’imposta sostitutiva', '50% + 50% (40% + 60% se l’attività non ha un ISA)', V, 'Risoluzione AdE 93/E del 12/11/2019'],
    ['Versamenti', 'Codici tributo F24', '1790 · 1791 · 1792', V, 'Risoluzione AdE 59/E del 11/6/2015'],
    ['Gestione Separata', 'Aliquote', '26,07% · 24% con altra copertura', V, 'INPS, circolare 27 del 30/1/2025'],
    ['Gestione Separata', 'Minimale e massimale', '18.555 € · 120.607 €', V, 'INPS, circolare 27/2025'],
    ['Artigiani e commercianti', 'Aliquote IVS', '24% / 24,48%; +1 punto oltre 55.448 €', V, 'INPS, circolare 38 del 7/2/2025'],
    ['Artigiani e commercianti', 'Minimale e contributi fissi', '18.555 € · 4.460,64 € artigiani · 4.549,70 € commercianti', V, 'INPS, circolare 38/2025'],
    ['Artigiani e commercianti', 'Massimale', '92.413 € (anzianità al 31/12/1995) · 120.607 € (dal 1996)', V, 'INPS, circolare 38/2025'],
    ['Artigiani e commercianti', 'Rate dei contributi fissi', '16 maggio, 20 agosto, 17 novembre (16/11 domenica), 16 febbraio 2026', V, 'INPS, circolare 38/2025'],
    ['IRPEF (regime ordinario)', 'Scaglioni', '23% fino a 28.000 € · 35% fino a 50.000 € · 43% oltre', P, 'Disciplina previgente alla L. 199/2025: fonti secondarie'],
    ['IRPEF (regime ordinario)', 'Detrazione per lavoro autonomo', 'Come 2026', V, 'AdE, specifiche tecniche Redditi PF 2026'],
  ],
};

export const STATI = { [V]: 'Verificato', [P]: 'Parziale', [D]: 'Da confermare' };
