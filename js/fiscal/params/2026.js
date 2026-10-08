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
    bollo: { sogliaImporto: 77.47, importo: 2 },
    riduzioneContributiIvs: 0.35,     // L. 190/2014 c. 77, su richiesta; daVerificare
    daVerificare: ['riduzioneContributiIvs'],
    // Acconto: 100% dell'imposta dell'anno precedente (metodo storico), 2 rate
    acconto: { sogliaMinima: 51.65, sogliaRataUnica: 257.52, percentualeRata1: 0.5, daVerificare: true },
    // Coefficienti di redditività per gruppo di settore (Allegato 4 L. 190/2014)
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

  // Fonti: circolare INPS n. 8 del 3/2/2026 (Gestione Separata); minimale/massimale riportati
  // da fonti secondarie concordi (18.808 / 122.295).
  gestioneSeparata: {
    aliquotaProfessionistaSenzaCopertura: 0.2607, // 25% IVS + 0,72% + 0,35% ISCRO
    aliquotaConAltraCopertura: 0.24,
    minimale: 18808,
    massimale: 122295,
  },

  // Fonte: circolare INPS n. 14 del 9/2/2026.
  ivs: {
    minimale: 18808,
    aliquote: { artigiani: 0.24, commercianti: 0.2448 },
    maggiorazione: { sogliaReddito: 56224, punti: 0.01 }, // +1 punto oltre 56.224 €
    massimale: 93707,           // 56.224 + 37.483, per iscritti dopo il 1/1/1996
    contributoMaternitaAnnuo: 7.44, // 0,62 €/mese
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
  },
  irap: { aliquota: 0.039 }, // aliquota ordinaria; le regioni possono variarla
};
