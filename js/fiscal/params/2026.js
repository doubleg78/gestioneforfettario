// Parametri fiscali e previdenziali per l'anno d'imposta 2026.
// Ogni gruppo riporta la fonte. Voci con `daVerificare: true` NON sono state
// confermate su fonte primaria e vanno controllate prima dell'uso professionale.

export default {
  anno: 2026,

  forfettario: {
    // L. 190/2014 art. 1 c. 54-89, come modificata dalla L. 199/2025 (bilancio 2026)
    soglie: {
      ricaviEsclusione: 85000,        // superata: uscita dall'anno successivo
      ricaviUscitaImmediata: 100000,  // superata: uscita nell'anno stesso
      redditoLavoroDipendente: 35000, // prorogata a 35.000 per il 2026 (L. 199/2025 c. 27); ordinariamente 30.000
      alertPercentuale: 0.9,          // soglia di preallarme (scelta dell'app, non di legge)
    },
    aliquote: { ordinaria: 0.15, startup: 0.05, anniStartup: 5 },
    // VERIFICATO: AdE, guida "L'imposta di bollo sulle fatture elettroniche" (giugno 2026) e Circ. 19/E 2020.
    // Versamento trimestrale con F24 (codici 2521-2524): 31/5, 30/9, 30/11, 28/2; slittamenti a 30/9 e 30/11
    // se l'importo dovuto per il primo trimestre, o per i primi due, non supera 5.000 €.
    bollo: {
      sogliaImporto: 77.47, importo: 2,
      trimestri: { codici: ['2521', '2522', '2523', '2524'], scadenze: ['05-31', '09-30', '11-30', '02-28'], sogliaDifferimento: 5000 },
    },
    // VERIFICATO su Normattiva: L. 190/2014 art. 1 c. 77 (contribuzione ridotta del 35%,
    // solo gestioni artigiani/commercianti L. 233/1990; richiesta all'INPS)
    riduzioneContributiIvs: 0.35,
    // Acconto: 100% dell'imposta dell'anno precedente (metodo storico), 2 rate.
    // VERIFICATO: 50% + 50% per i forfettari con attività per cui è approvato un ISA e ricavi entro il limite ISA
    // (AdE, risoluzione 93/E del 12/11/2019, che estende l'art. 58 DL 124/2019 all'imposta sostitutiva);
    // negli altri casi 40% + 60% (art. 17 c. 3 DPR 435/2001).
    acconto: { sogliaMinima: 51.65, sogliaRataUnica: 257.52, percentualeRata1: 0.5 },
    // Codici tributo F24 (Risoluzione AdE 59/E del 11/6/2015)
    codiciTributo: { accontoPrimaRata: '1790', accontoSecondaRataOUnica: '1791', saldo: '1792' },
    // Soglia 35.000: L. 199/2025 c. 27 estende al 2026 il c. 12 art. 1 L. 207/2024 (fonti secondarie concordi).
    // Coefficienti: Allegato 4 L. 190/2014 nel testo pubblicato da AdE; codici ATECO 2007 (v. `atecoDivisioni`).
    // Scadenze: v. `scadenze` (DL 89/2026 art. 6 per la proroga 2026).
    daVerificare: [],
    // Coefficienti di redditività per gruppo di settore (Allegato 4 L. 190/2014)
    scadenze: {
      saldoEPrimoAcconto: '06-30',        // ordinaria; nel 2026 prorogata al 20/7 (art. 6 DL 89/2026,
      saldoEPrimoAccontoProroga2026: '07-20', // poi abrogato dalla L. 113/2026 con effetti fatti salvi),
                                          // con +0,80% fino al 20/8
      secondoAcconto: '11-30',
      dichiarazione: '10-31',
    },
    coefficienti: {
      'industrie-alimentari-bevande': 0.40,
      'commercio-ingrosso-dettaglio': 0.40,
      'commercio-ambulante-alimentare': 0.40,
      'commercio-ambulante-altri': 0.54,
      'intermediari-commercio': 0.62,
      'alloggio-ristorazione': 0.40,
      'attivita-professionali-sanitarie': 0.78,
      'altre-attivita': 0.67,
      'costruzioni-immobiliari': 0.86,
    },
  },

  // VERIFICATO su INPS: circolare n. 8 del 3/2/2026 (26,07% = 25% IVS + 0,72% + 0,35% ISCRO;
  // 24% con altra copertura; minimale 18.808 €; massimale 122.295 €).
  gestioneSeparata: {
    aliquotaProfessionistaSenzaCopertura: 0.2607, // 25% IVS + 0,72% + 0,35% ISCRO
    aliquotaConAltraCopertura: 0.24,
    minimale: 18808,
    massimale: 122295,
    // VERIFICATO (AdE, Redditi PF 2026 fasc. 2, Quadro RR): due acconti di pari importo, alle scadenze
    // degli acconti IRPEF; totale = aliquote dell'anno corrente sull'80% del reddito di lavoro autonomo
    // dell'anno precedente, nel limite del massimale dell'anno corrente.
    acconto: { percentuale: 0.8, rate: 2 },
    // Causali F24 INPS (circ. INPS 105/2025, istruzioni Redditi): PXX con aliquota 26,07%, P10 con aliquota 24%
    causaliF24: { standard: 'PXX', altraCopertura: 'P10' },
  },

  // VERIFICATO su INPS: circolare n. 14 del 9/2/2026 (aliquote, minimale, maggiorazione e massimale
  // da risultati di ricerca che citano la circolare; testo integrale non letto per intero).
  ivs: {
    minimale: 18808,
    aliquote: { artigiani: 0.24, commercianti: 0.2448 },
    maggiorazione: { sogliaReddito: 56224, punti: 0.01 }, // +1 punto oltre 56.224 €
    // Circ. INPS 14/2026 p. 4: 93.707 (56.224 + 37.483) per iscritti con anzianità al 31/12/1995;
    // 122.295 per chi è iscritto dal 1/1/1996 (non frazionabile).
    massimale: { ante1996: 93707, dal1996: 122295 },
    contributoMaternitaAnnuo: 7.44, // 0,62 €/mese
    // Acconti sulla quota eccedente il minimale: due rate di pari importo alle scadenze IRPEF, calcolati sul
    // reddito d'impresa dell'anno precedente con le aliquote dell'anno (INPS, scheda "Aliquote e contributi
    // artigiani"; per i forfettari importo "ordinariamente determinato e poi ridotto del 35%").
    // La misura (100% = 50% + 50%) è desunta da esempi di prassi (Fiscoetasse); gli importi ufficiali sono
    // nel Cassetto previdenziale ("Dati del mod. F24").
    acconto: { percentuale: 1, rate: 2, daVerificare: true },
    // Rate dei contributi sul minimale (circ. INPS 14/2026 p. 9: 18/5 [16/5 è sabato], 20/8, 16/11, 16/2/2027)
    scadenzeFissi: ['05-16', '08-20', '11-16', '02-16'],
    // Causali F24: AF/CF minimale, AP/CP quota eccedente (pagina INPS "F24 per artigiani e commercianti")
    causaliF24: { artigiani: { minimale: 'AF', eccedenza: 'AP' }, commercianti: { minimale: 'CF', eccedenza: 'CP' } },
  },

  // Casse professionali: i parametri variano per cassa, vengono inseriti dall'utente.
  cassa: { predefinita: { aliquotaSoggettiva: 0.1, contributoMinimo: 0 } },

  // Fonte: L. 199/2025 art. 1 c. 3 (aliquota del secondo scaglione ridotta al 33%).
  irpef: {
    scaglioni: [
      { fino: 28000, aliquota: 0.23 },
      { fino: 50000, aliquota: 0.33 },
      { fino: Infinity, aliquota: 0.43 },
    ],
    // Detrazione per redditi di lavoro autonomo, art. 13 c. 5 e 5-ter TUIR (non cumulabile con quelle dei c. 1-4).
    // VERIFICATO: AdE, specifiche tecniche Redditi PF 2026 (rigo RN7, par. 21.4), quoziente troncato a 4 decimali.
    detrazioneLavoroAutonomo: {
      importoFisso: 1265, finoA: 5500,
      base: 500, extra: 765, finoA2: 28000, divisore: 22500,
      finoA3: 50000, divisore3: 22000,
      aumento: { da: 11000, a: 17000, importo: 50 },
    },
  },
  irap: { aliquota: 0.039 }, // aliquota ordinaria; le regioni possono variarla
};
