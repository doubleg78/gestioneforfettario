(() => {
  // js/ui/dom.js
  function h(tag, attrs, ...figli) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs ?? {})) {
      if (v === null || v === void 0 || v === false) continue;
      if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === "classe") el.className = v;
      else if (k === "valore") el.value = v;
      else if (v === true) el.setAttribute(k, "");
      else el.setAttribute(k, v);
    }
    aggiungi(el, figli);
    return el;
  }
  function aggiungi(el, figli) {
    for (const f of figli.flat(Infinity)) {
      if (f === null || f === void 0 || f === false) continue;
      el.append(f instanceof Node ? f : document.createTextNode(String(f)));
    }
  }
  var eur = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
  var euro = (n) => eur.format(n ?? 0);
  var dataIt = (iso2) => iso2 ? iso2.split("-").reverse().join("/") : "";
  var percentuale = (n) => `${(n * 100).toLocaleString("it-IT", { maximumFractionDigits: 2 })}%`;
  function campo(etichetta, ctrl, nota) {
    const id2 = `c-${Math.random().toString(36).slice(2, 9)}`;
    ctrl.id = id2;
    return h("div", { classe: "campo" }, h("label", { for: id2 }, etichetta), ctrl, nota ? h("small", null, nota) : null);
  }
  function avviso(tipo, titolo, testo2) {
    return h("div", { classe: `avviso ${tipo}`, role: tipo === "errore" ? "alert" : "status" }, h("strong", null, titolo), testo2 ? ` ${testo2}` : "");
  }
  function selezionaFile(accept, multiplo = false) {
    return new Promise((ok) => {
      const inp = h("input", { type: "file", accept, multiple: multiplo });
      inp.addEventListener("change", () => ok([...inp.files]));
      inp.addEventListener("cancel", () => ok([]));
      inp.click();
    });
  }
  function scarica(nomeFile, contenuto, tipo = "application/json") {
    const url = URL.createObjectURL(new Blob([contenuto], { type: tipo }));
    const a = h("a", { href: url, download: nomeFile });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  }

  // js/storage/crypto.js
  var ITERAZIONI = 6e5;
  var enc = new TextEncoder();
  var dec = new TextDecoder();
  function aBase64(bytes) {
    let s = "";
    for (let i = 0; i < bytes.length; i += 32768) s += String.fromCharCode(...bytes.subarray(i, i + 32768));
    return btoa(s);
  }
  function daBase64(b64) {
    const s = atob(b64);
    const out = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
    return out;
  }
  async function derivaChiave(password, salt, iterazioni) {
    const materiale = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: iterazioni, hash: "SHA-256" },
      materiale,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }
  async function nuovaSessione(password, iterazioni = ITERAZIONI) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    return { chiave: await derivaChiave(password, salt, iterazioni), salt, iterazioni };
  }
  async function sigilla(sessione, dati) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cifrato = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, sessione.chiave, enc.encode(JSON.stringify(dati)));
    return {
      v: 1,
      kdf: "PBKDF2-SHA256",
      iter: sessione.iterazioni,
      salt: aBase64(sessione.salt),
      iv: aBase64(iv),
      dati: aBase64(new Uint8Array(cifrato))
    };
  }
  async function apri(blob, password) {
    if (!blob || blob.v !== 1 || blob.kdf !== "PBKDF2-SHA256") throw new Error("Formato di archivio non riconosciuto");
    const salt = daBase64(blob.salt);
    const chiave = await derivaChiave(password, salt, blob.iter);
    try {
      const chiaro = await crypto.subtle.decrypt({ name: "AES-GCM", iv: daBase64(blob.iv) }, chiave, daBase64(blob.dati));
      return { sessione: { chiave, salt, iterazioni: blob.iter }, dati: JSON.parse(dec.decode(chiaro)) };
    } catch {
      throw new ErrorePassword();
    }
  }
  var ErrorePassword = class extends Error {
    constructor() {
      super("Password errata o archivio danneggiato");
      this.name = "ErrorePassword";
    }
  };

  // js/storage/vault.js
  var CHIAVE = "archivio";
  var DATI_INIZIALI = () => ({ versione: 1, clienti: [], fatture: [], spese: [], ui: {} });
  var Archivio = class {
    constructor(adattatore, { iterazioni } = {}) {
      this.adattatore = adattatore;
      this.iterazioni = iterazioni;
      this.sessione = null;
      this.dati = null;
      this._coda = Promise.resolve();
      this._ascoltatori = /* @__PURE__ */ new Set();
    }
    async esiste() {
      return await this.adattatore.leggi(CHIAVE) !== null;
    }
    get sbloccato() {
      return this.dati !== null;
    }
    async crea(password) {
      this.sessione = await nuovaSessione(password, this.iterazioni);
      this.dati = DATI_INIZIALI();
      await this.salva();
    }
    async sblocca(password) {
      const blob = await this.adattatore.leggi(CHIAVE);
      if (!blob) throw new Error("Nessun archivio presente");
      const { sessione, dati } = await apri(blob, password);
      this.sessione = sessione;
      this.dati = dati;
    }
    blocca() {
      this.sessione = null;
      this.dati = null;
      this._notifica();
    }
    /** Modifica i dati e salva (serializzato, nessun salvataggio perso). */
    async modifica(fn) {
      if (!this.sbloccato) throw new Error("Archivio bloccato");
      const risultato = fn(this.dati);
      this._notifica();
      await this.salva();
      return risultato;
    }
    salva() {
      this._coda = this._coda.then(async () => {
        if (!this.sessione) return;
        await this.adattatore.scrivi(CHIAVE, await sigilla(this.sessione, this.dati));
      });
      return this._coda;
    }
    /** Copia di backup: è lo stesso blob cifrato che sta nel database. */
    async esporta() {
      await this._coda;
      return this.adattatore.leggi(CHIAVE);
    }
    /** Ripristina un backup. Chiede la password con cui è stato creato e la adotta per la sessione. */
    async importa(blob, password) {
      const { sessione, dati } = await apri(blob, password);
      this.sessione = sessione;
      this.dati = dati;
      await this.salva();
      this._notifica();
    }
    ascolta(fn) {
      this._ascoltatori.add(fn);
      return () => this._ascoltatori.delete(fn);
    }
    _notifica() {
      for (const fn of this._ascoltatori) fn();
    }
  };

  // js/storage/adapters.js
  function adattatoreIndexedDB(nome = "gestione-forfettario") {
    const apri2 = () => new Promise((ok, ko) => {
      const r = indexedDB.open(nome, 1);
      r.onupgradeneeded = () => r.result.createObjectStore("kv");
      r.onsuccess = () => ok(r.result);
      r.onerror = () => ko(r.error);
    });
    const tx = async (modo, fn) => {
      const db = await apri2();
      return new Promise((ok, ko) => {
        const t = db.transaction("kv", modo);
        const req = fn(t.objectStore("kv"));
        t.oncomplete = () => {
          db.close();
          ok(req?.result ?? null);
        };
        t.onerror = () => {
          db.close();
          ko(t.error);
        };
      });
    };
    return {
      leggi: (k) => tx("readonly", (s) => s.get(k)),
      scrivi: (k, v) => tx("readwrite", (s) => s.put(v, k)),
      elimina: (k) => tx("readwrite", (s) => s.delete(k))
    };
  }

  // js/fiscal/params/2026.js
  var __default = {
    anno: 2026,
    forfettario: {
      // L. 190/2014 art. 1 c. 54-89, come modificata dalla L. 199/2025 (bilancio 2026)
      soglie: {
        ricaviEsclusione: 85e3,
        // superata: uscita dall'anno successivo
        ricaviUscitaImmediata: 1e5,
        // superata: uscita nell'anno stesso
        redditoLavoroDipendente: 35e3,
        // prorogata a 35.000 per il 2026 (L. 199/2025 c. 27); ordinariamente 30.000
        alertPercentuale: 0.9
        // soglia di preallarme (scelta dell'app, non di legge)
      },
      aliquote: { ordinaria: 0.15, startup: 0.05, anniStartup: 5 },
      bollo: { sogliaImporto: 77.47, importo: 2 },
      // VERIFICATO su Normattiva: L. 190/2014 art. 1 c. 77 (contribuzione ridotta del 35%,
      // solo gestioni artigiani/commercianti L. 233/1990; richiesta all'INPS)
      riduzioneContributiIvs: 0.35,
      // Acconto: 100% dell'imposta dell'anno precedente (metodo storico), 2 rate.
      // Ripartizione 50% + 50% (confermata dall'utente per i forfettari; art. 58 DL 124/2019 per i soggetti ISA).
      // Il testo letterale (c. 64 + art. 17 DPR 435/2001) porterebbe a 40% + 60%: v. BRIEFING.md.
      acconto: { sogliaMinima: 51.65, sogliaRataUnica: 257.52, percentualeRata1: 0.5 },
      // Codici tributo F24 (Risoluzione AdE 59/E del 11/6/2015)
      codiciTributo: { accontoPrimaRata: "1790", accontoSecondaRataOUnica: "1791", saldo: "1792" },
      // Soglia 35.000: L. 199/2025 c. 27 estende al 2026 il c. 12 art. 1 L. 207/2024 (fonti secondarie concordi).
      // Coefficienti: Allegato 4 L. 190/2014 nel testo pubblicato da AdE; codici ATECO 2007 (v. `atecoDivisioni`).
      // Scadenze: v. `scadenze` (DL 89/2026 art. 6 per la proroga 2026).
      daVerificare: [],
      // Coefficienti di redditività per gruppo di settore (Allegato 4 L. 190/2014)
      scadenze: {
        saldoEPrimoAcconto: "06-30",
        // ordinaria; nel 2026 prorogata al 20/7 (art. 6 DL 89/2026,
        saldoEPrimoAccontoProroga2026: "07-20",
        // poi abrogato dalla L. 113/2026 con effetti fatti salvi),
        // con +0,80% fino al 20/8
        secondoAcconto: "11-30",
        dichiarazione: "10-31"
      },
      coefficienti: {
        "industrie-alimentari-bevande": 0.4,
        "commercio-ingrosso-dettaglio": 0.4,
        "commercio-ambulante-alimentare": 0.4,
        "commercio-ambulante-altri": 0.54,
        "intermediari-commercio": 0.62,
        "alloggio-ristorazione": 0.4,
        "attivita-professionali-sanitarie": 0.78,
        "altre-attivita": 0.67,
        "costruzioni-immobiliari": 0.86
      }
    },
    // VERIFICATO su INPS: circolare n. 8 del 3/2/2026 (26,07% = 25% IVS + 0,72% + 0,35% ISCRO;
    // 24% con altra copertura; minimale 18.808 €; massimale 122.295 €).
    gestioneSeparata: {
      aliquotaProfessionistaSenzaCopertura: 0.2607,
      // 25% IVS + 0,72% + 0,35% ISCRO
      aliquotaConAltraCopertura: 0.24,
      minimale: 18808,
      massimale: 122295,
      // Acconto: 80% dei contributi dell'anno precedente in due rate uguali (40% + 40%). Regola da verificare.
      acconto: { percentuale: 0.8, rate: 2, daVerificare: true }
    },
    // VERIFICATO su INPS: circolare n. 14 del 9/2/2026 (aliquote, minimale, maggiorazione e massimale
    // da risultati di ricerca che citano la circolare; testo integrale non letto per intero).
    ivs: {
      minimale: 18808,
      aliquote: { artigiani: 0.24, commercianti: 0.2448 },
      maggiorazione: { sogliaReddito: 56224, punti: 0.01 },
      // +1 punto oltre 56.224 €
      // Circ. INPS 14/2026 p. 4: 93.707 (56.224 + 37.483) per iscritti con anzianità al 31/12/1995;
      // 122.295 per chi è iscritto dal 1/1/1996 (non frazionabile).
      massimale: { ante1996: 93707, dal1996: 122295 },
      contributoMaternitaAnnuo: 7.44,
      // 0,62 €/mese
      acconto: { percentuale: 0.8, rate: 2, daVerificare: true },
      // Rate dei contributi fissi (circ. INPS 14/2026): 18/5, 20/8, 17/11 dell'anno e 16/2 dell'anno successivo
      scadenzeFissi: ["05-18", "08-20", "11-17", "02-16"]
    },
    // Casse professionali: i parametri variano per cassa, vengono inseriti dall'utente.
    cassa: { predefinita: { aliquotaSoggettiva: 0.1, contributoMinimo: 0 } },
    // Fonte: L. 199/2025 art. 1 c. 3 (aliquota del secondo scaglione ridotta al 33%).
    irpef: {
      scaglioni: [
        { fino: 28e3, aliquota: 0.23 },
        { fino: 5e4, aliquota: 0.33 },
        { fino: Infinity, aliquota: 0.43 }
      ]
    },
    irap: { aliquota: 0.039 }
    // aliquota ordinaria; le regioni possono variarla
  };

  // js/fiscal/params/index.js
  var PARAMETRI = { 2026: __default };
  function parametriAnno(anno2) {
    const p = PARAMETRI[anno2];
    if (!p) throw new Error(`Parametri fiscali non disponibili per l'anno ${anno2}`);
    return p;
  }

  // js/ui/sblocco.js
  function schermataSblocco(archivio2, esiste, alSbloccato) {
    const pw = h("input", { type: "password", autocomplete: esiste ? "current-password" : "new-password", required: true, minlength: esiste ? null : 10 });
    const pw2 = h("input", { type: "password", autocomplete: "new-password", required: true });
    const messaggio = h("div");
    const bottone = h("button", { type: "submit", classe: "primario" }, esiste ? "Sblocca" : "Crea archivio");
    const form = h(
      "form",
      {
        onSubmit: async (e) => {
          e.preventDefault();
          messaggio.replaceChildren();
          if (!esiste && pw.value !== pw2.value) return messaggio.append(avviso("errore", "Le password non coincidono."));
          bottone.disabled = true;
          bottone.textContent = "Attendere\u2026";
          try {
            if (esiste) await archivio2.sblocca(pw.value);
            else await archivio2.crea(pw.value);
            alSbloccato();
          } catch (err) {
            messaggio.append(avviso("errore", err instanceof ErrorePassword ? "Password errata." : `Errore: ${err.message}`));
            bottone.disabled = false;
            bottone.textContent = esiste ? "Sblocca" : "Crea archivio";
          }
        }
      },
      campo(esiste ? "Password" : "Scegli una password (almeno 10 caratteri)", pw),
      esiste ? null : campo("Ripeti la password", pw2),
      esiste ? null : avviso("attenzione", "Attenzione.", "I dati sono cifrati nel browser con questa password. Se la dimentichi non \xE8 possibile recuperarli: conserva un backup e la password in un luogo sicuro."),
      messaggio,
      h("div", { classe: "azioni" }, bottone)
    );
    return h(
      "div",
      { classe: "sblocco" },
      h(
        "div",
        { classe: "scheda" },
        h("h1", null, "Gestione Forfettario"),
        h("p", { classe: "tenue" }, esiste ? "Inserisci la password per aprire l\u2019archivio." : "Primo avvio: crea l\u2019archivio cifrato che conterr\xE0 i dati dei clienti."),
        form
      )
    );
  }

  // js/domain/modello.js
  var id = () => globalThis.crypto?.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  var TIPI_PREVIDENZA = [
    { valore: "gestione-separata", etichetta: "Gestione Separata INPS (professionista senza cassa)" },
    { valore: "artigiani", etichetta: "INPS Artigiani" },
    { valore: "commercianti", etichetta: "INPS Commercianti" },
    { valore: "cassa", etichetta: "Cassa professionale" }
  ];
  function nuovoCliente() {
    return {
      id: id(),
      nome: "",
      codiceFiscale: "",
      partitaIva: "",
      annoInizioAttivita: (/* @__PURE__ */ new Date()).getFullYear(),
      ateco: [],
      previdenza: { tipo: "gestione-separata", altraCopertura: false, iscrittoDal1996: true, riduzione35: false, cassa: { aliquotaSoggettiva: 0.1, contributoMinimo: 0 } },
      startup: false,
      versamenti: {},
      // per anno d'imposta: { sostitutiva, inps } acconti già versati
      note: ""
    };
  }
  function nuovaVoceAteco() {
    return { codice: "", descrizione: "", gruppo: "altre-attivita" };
  }
  function nuovaFattura(clienteId) {
    return { id: id(), clienteId, numero: "", data: "", controparte: "", importo: 0, dataIncasso: "", atecoCodice: "", bollo: 0, note: "" };
  }
  function nuovaSpesa(clienteId) {
    return { id: id(), clienteId, data: "", descrizione: "", importo: 0, categoria: "" };
  }

  // js/fiscal/utils.js
  function round2(n) {
    return Math.sign(n) * Math.round((Math.abs(n) + Number.EPSILON) * 100) / 100;
  }
  function clamp0(n) {
    return n > 0 ? n : 0;
  }
  function applicaScaglioni(base, scaglioni) {
    let residuo = clamp0(base);
    let precedente = 0;
    let imposta = 0;
    for (const { fino, aliquota } of scaglioni) {
      if (residuo <= 0) break;
      const ampiezza = Math.min(fino - precedente, residuo);
      imposta += ampiezza * aliquota;
      residuo -= ampiezza;
      precedente = fino;
    }
    return round2(imposta);
  }

  // js/fiscal/requisiti.js
  function verificaSoglieRicavi(params2, ricaviAnno) {
    const s = params2.forfettario.soglie;
    let stato2 = "ok";
    if (ricaviAnno > s.ricaviUscitaImmediata) stato2 = "esce-subito";
    else if (ricaviAnno > s.ricaviEsclusione) stato2 = "esce-anno-successivo";
    else if (ricaviAnno >= s.ricaviEsclusione * s.alertPercentuale) stato2 = "attenzione";
    return {
      stato: stato2,
      ricaviAnno: round2(ricaviAnno),
      residuoSoglia: round2(s.ricaviEsclusione - ricaviAnno),
      percentuale: round2(ricaviAnno / s.ricaviEsclusione * 100)
    };
  }
  function verificaRequisitiStartup(dati) {
    const condizioni = [
      {
        codice: "nessuna-attivita-3-anni",
        ok: !dati.attivitaNeiTreAnniPrecedenti,
        descrizione: "Nessuna attivit\xE0 artistica, professionale o d\u2019impresa nei 3 anni precedenti"
      },
      {
        codice: "non-prosecuzione",
        ok: !dati.prosecuzioneAltraAttivita,
        descrizione: "L\u2019attivit\xE0 non \xE8 mera prosecuzione di lavoro dipendente/autonomo precedente (esclusa la pratica obbligatoria)"
      },
      {
        codice: "ricavi-attivita-rilevata",
        ok: !dati.proseguitaAttivitaAltroSoggetto || dati.ricaviAttivitaRilevata <= 85e3,
        descrizione: "Se si prosegue l\u2019attivit\xE0 di un altro soggetto, i suoi ricavi precedenti non superano 85.000 \u20AC"
      }
    ];
    return { condizioni, ammesso: condizioni.every((c) => c.ok) };
  }

  // js/fiscal/inps.js
  function contributiGestioneSeparata(reddito, params2, { altraCopertura = false } = {}) {
    const gs = params2.gestioneSeparata;
    const aliquota = altraCopertura ? gs.aliquotaConAltraCopertura : gs.aliquotaProfessionistaSenzaCopertura;
    const base = Math.min(clamp0(reddito), gs.massimale);
    return { base, aliquota, totale: round2(base * aliquota) };
  }
  function contributiIvs(reddito, params2, gestione, { riduzione35 = false, iscrittoDal1996 = true } = {}) {
    const { ivs, forfettario } = params2;
    const aliquota = ivs.aliquote[gestione];
    if (aliquota === void 0) throw new Error(`Gestione IVS sconosciuta: ${gestione}`);
    const redditoBase = clamp0(reddito);
    const fisso = round2(ivs.minimale * aliquota + ivs.contributoMaternitaAnnuo);
    const massimale = iscrittoDal1996 ? ivs.massimale.dal1996 : ivs.massimale.ante1996;
    const baseConsiderata = Math.min(redditoBase, massimale);
    let eccedenza = 0;
    if (baseConsiderata - ivs.minimale > 0) {
      const soglia = ivs.maggiorazione.sogliaReddito;
      const fasciaBassa = Math.min(baseConsiderata, soglia) - ivs.minimale;
      const fasciaAlta = baseConsiderata - soglia;
      eccedenza = clamp0(fasciaBassa) * aliquota + clamp0(fasciaAlta) * (aliquota + ivs.maggiorazione.punti);
    }
    const lordo = round2(fisso + eccedenza);
    const riduzione = riduzione35 ? round2(lordo * forfettario.riduzioneContributiIvs) : 0;
    return { fisso, eccedenza: round2(eccedenza), riduzione, totale: round2(lordo - riduzione) };
  }
  function contributiCassa(reddito, cassa) {
    const calcolato = clamp0(reddito) * cassa.aliquotaSoggettiva;
    return { totale: round2(Math.max(calcolato, cassa.contributoMinimo ?? 0)) };
  }
  function contributiPrevidenziali(reddito, params2, previdenza, opzioni = {}) {
    switch (previdenza.tipo) {
      case "gestione-separata":
        return contributiGestioneSeparata(reddito, params2, previdenza);
      case "artigiani":
      case "commercianti":
        return contributiIvs(reddito, params2, previdenza.tipo, { iscrittoDal1996: previdenza.iscrittoDal1996 ?? true, ...opzioni });
      case "cassa":
        return contributiCassa(reddito, previdenza.cassa ?? params2.cassa.predefinita);
      default:
        throw new Error(`Tipologia previdenziale sconosciuta: ${previdenza.tipo}`);
    }
  }

  // js/fiscal/forfettario.js
  function bolloDovuto(importo, params2) {
    const { sogliaImporto, importo: bollo } = params2.forfettario.bollo;
    return importo > sogliaImporto ? bollo : 0;
  }
  function aliquotaSostitutiva(params2, { annoInizioAttivita, requisitiStartup = false, annoImposta = params2.anno }) {
    const { startup, ordinaria, anniStartup } = params2.forfettario.aliquote;
    const annoUltimo = annoInizioAttivita + anniStartup - 1;
    const inPeriodo = requisitiStartup && annoImposta >= annoInizioAttivita && annoImposta <= annoUltimo;
    return { aliquota: inPeriodo ? startup : ordinaria, startup: inPeriodo, annoUltimoStartup: annoUltimo };
  }
  function calcolaForfettario(params2, dati) {
    const ricavi = round2(dati.ricavi.reduce((s, r) => s + r.importo, 0));
    const redditoLordo = round2(dati.ricavi.reduce((s, r) => s + r.importo * r.coefficiente, 0));
    const contributi = contributiPrevidenziali(redditoLordo, params2, dati.previdenza, { riduzione35: dati.riduzione35 });
    const contributiDeducibili = dati.contributiVersati ?? contributi.totale;
    const imponibile = round2(clamp0(redditoLordo - contributiDeducibili));
    const imposta = round2(imponibile * dati.aliquota);
    return {
      ricavi,
      redditoLordo,
      contributi,
      contributiDeducibili: round2(contributiDeducibili),
      imponibile,
      aliquota: dati.aliquota,
      imposta,
      totaleCarico: round2(imposta + contributi.totale)
    };
  }

  // js/domain/riepilogo.js
  var anno = (iso2) => iso2 ? Number(iso2.slice(0, 4)) : null;
  function fattureIncassateNellAnno(fatture, clienteId, annoRif) {
    return fatture.filter((f) => f.clienteId === clienteId && f.dataIncasso && anno(f.dataIncasso) === annoRif);
  }
  function ricaviPerAteco(cliente, fatture, annoRif, params2) {
    const voci = cliente.ateco.map((v) => ({ ...v, coefficiente: params2.forfettario.coefficienti[v.gruppo] ?? 0, importo: 0 }));
    const senzaAteco = { codice: "", descrizione: "Senza codice ATECO", gruppo: null, coefficiente: 0, importo: 0 };
    for (const f of fattureIncassateNellAnno(fatture, cliente.id, annoRif)) {
      const voce = voci.find((v) => v.codice && v.codice === f.atecoCodice) ?? voci[0] ?? senzaAteco;
      voce.importo = round2(voce.importo + f.importo);
    }
    return voci.length ? voci : [senzaAteco];
  }
  function riepilogoAnno(cliente, dati, annoRif, params2) {
    const perAteco = ricaviPerAteco(cliente, dati.fatture, annoRif, params2);
    const ricavi = round2(perAteco.reduce((s, v) => s + v.importo, 0));
    const daIncassare = round2(dati.fatture.filter((f) => f.clienteId === cliente.id && !f.dataIncasso && anno(f.data) === annoRif).reduce((s, f) => s + f.importo, 0));
    const spese = round2(dati.spese.filter((s) => s.clienteId === cliente.id && anno(s.data) === annoRif).reduce((s, x) => s + x.importo, 0));
    const soglie = verificaSoglieRicavi(params2, ricavi);
    const alq = aliquotaSostitutiva(params2, { annoInizioAttivita: cliente.annoInizioAttivita, requisitiStartup: cliente.startup, annoImposta: annoRif });
    const senzaCoefficienti = perAteco.some((v) => v.importo > 0 && !v.coefficiente);
    const forfettario = senzaCoefficienti ? null : calcolaForfettario(params2, {
      ricavi: perAteco.filter((v) => v.importo !== 0).map((v) => ({ importo: v.importo, coefficiente: v.coefficiente })),
      previdenza: cliente.previdenza,
      aliquota: alq.aliquota,
      riduzione35: cliente.previdenza.riduzione35
    });
    return { annoRif, perAteco, ricavi, daIncassare, spese, soglie, aliquota: alq, forfettario };
  }

  // js/ui/clienti.js
  function vistaClienti(ctx) {
    const { archivio: archivio2, dati, params: params2 } = ctx;
    const anno2 = (/* @__PURE__ */ new Date()).getFullYear();
    const righe = dati.clienti.map((c) => {
      const r = riepilogoAnno(c, dati, anno2, params2);
      return h(
        "tr",
        null,
        h("td", null, h("strong", null, c.nome || "(senza nome)"), h("div", { classe: "tenue" }, c.partitaIva ? `P.IVA ${c.partitaIva}` : "")),
        h("td", null, c.previdenza.tipo.replace("-", " ")),
        h("td", { classe: "numero" }, euro(r.ricavi)),
        h("td", { classe: "numero" }, `${r.soglie.percentuale.toLocaleString("it-IT")}%`),
        h(
          "td",
          null,
          h(
            "div",
            { classe: "azioni" },
            h("button", { onClick: () => ctx.selezionaCliente(c.id, "#/riepilogo") }, "Apri"),
            h("button", { classe: "pericolo", onClick: async () => {
              if (!confirm(`Eliminare ${c.nome || "il cliente"} con tutte le sue fatture e spese? L\u2019operazione non \xE8 reversibile.`)) return;
              await archivio2.modifica((d) => {
                d.clienti = d.clienti.filter((x) => x.id !== c.id);
                d.fatture = d.fatture.filter((x) => x.clienteId !== c.id);
                d.spese = d.spese.filter((x) => x.clienteId !== c.id);
                if (d.ui.clienteId === c.id) d.ui.clienteId = d.clienti[0]?.id ?? null;
              });
            } }, "Elimina")
          )
        )
      );
    });
    return h(
      "div",
      null,
      h("h1", null, "Clienti"),
      h("p", { classe: "tenue" }, `Ricavi incassati ${anno2} e utilizzo della soglia di 85.000 \u20AC.`),
      h(
        "div",
        { classe: "scheda" },
        dati.clienti.length === 0 ? h("div", { classe: "vuoto" }, "Nessun cliente. Crea il primo per iniziare.") : h("div", { classe: "tabella-contenitore" }, h(
          "table",
          null,
          h("thead", null, h("tr", null, h("th", null, "Cliente"), h("th", null, "Previdenza"), h("th", { classe: "numero" }, `Incassi ${anno2}`), h("th", { classe: "numero" }, "Soglia"), h("th", null, ""))),
          h("tbody", null, righe)
        )),
        h(
          "div",
          { classe: "azioni" },
          h("button", { classe: "primario", onClick: async () => {
            const c = nuovoCliente();
            await archivio2.modifica((d) => {
              d.clienti.push(c);
              d.ui.clienteId = c.id;
            });
            location.hash = "#/anagrafica";
          } }, "Nuovo cliente")
        )
      )
    );
  }

  // js/fiscal/data/ateco2025.js
  var ateco2025_default = { "10": "0", "11": "0", "12": "7", "13": "7", "14": "7", "15": "7", "16": "7", "17": "7", "18": "7", "19": "7", "20": "7", "21": "7", "22": "7", "23": "7", "24": "7", "25": "7", "26": "7", "27": "7", "28": "7", "29": "7", "30": "7", "31": "7", "32": "7", "33": "7", "35": "7", "36": "7", "37": "7", "38": "7", "39": "7", "41": "8", "42": "8", "43": "8", "46": "1", "47": "1", "49": "7", "50": "7", "51": "7", "52": "7", "53": "7", "55": "5", "56": "5", "58": "7", "59": "7", "60": "7", "61": "7", "62": "7", "63": "7", "64": "6", "65": "6", "66": "6", "68": "8", "69": "6", "70": "6", "71": "6", "72": "6", "73": "6", "74": "6", "75": "6", "77": "7", "78": "7", "79": "7", "80": "7", "81": "7", "82": "7", "84": "7", "85": "6", "86": "6", "87": "6", "88": "6", "90": "7", "91": "7", "92": "7", "93": "7", "94": "7", "95": "7", "96": "7", "97": "7", "98": "7", "99": "7", "01": "7", "01.1": "7", "01.11": "7", "01.11.0": "7", "01.11.00": "7", "01.12": "7", "01.12.0": "7", "01.12.00": "7", "01.13": "7", "01.13.1": "7", "01.13.11": "7", "01.13.12": "7", "01.13.13": "7", "01.13.2": "7", "01.13.20": "7", "01.13.3": "7", "01.13.30": "7", "01.14": "7", "01.14.0": "7", "01.14.00": "7", "01.15": "7", "01.15.0": "7", "01.15.00": "7", "01.16": "7", "01.16.0": "7", "01.16.00": "7", "01.19": "7", "01.19.1": "7", "01.19.11": "7", "01.19.12": "7", "01.19.13": "7", "01.19.9": "7", "01.19.90": "7", "01.2": "7", "01.21": "7", "01.21.0": "7", "01.21.00": "7", "01.22": "7", "01.22.0": "7", "01.22.00": "7", "01.23": "7", "01.23.0": "7", "01.23.00": "7", "01.24": "7", "01.24.0": "7", "01.24.00": "7", "01.25": "7", "01.25.0": "7", "01.25.00": "7", "01.26": "7", "01.26.0": "7", "01.26.00": "7", "01.27": "7", "01.27.0": "7", "01.27.00": "7", "01.28": "7", "01.28.0": "7", "01.28.00": "7", "01.29": "7", "01.29.0": "7", "01.29.00": "7", "01.3": "7", "01.30": "7", "01.30.0": "7", "01.30.00": "7", "01.4": "7", "01.41": "7", "01.41.0": "7", "01.41.00": "7", "01.42": "7", "01.42.0": "7", "01.42.00": "7", "01.43": "7", "01.43.0": "7", "01.43.00": "7", "01.44": "7", "01.44.0": "7", "01.44.00": "7", "01.45": "7", "01.45.0": "7", "01.45.00": "7", "01.46": "7", "01.46.0": "7", "01.46.00": "7", "01.47": "7", "01.47.0": "7", "01.47.00": "7", "01.48": "7", "01.48.1": "7", "01.48.10": "7", "01.48.2": "7", "01.48.20": "7", "01.48.3": "7", "01.48.30": "7", "01.48.4": "7", "01.48.40": "7", "01.48.9": "7", "01.48.91": "7", "01.48.99": "7", "01.5": "7", "01.50": "7", "01.50.0": "7", "01.50.00": "7", "01.6": "7", "01.61": "7", "01.61.1": "7", "01.61.10": "7", "01.61.9": "7", "01.61.91": "7", "01.61.99": "7", "01.62": "7", "01.62.0": "7", "01.62.01": "7", "01.62.09": "7", "01.63": "7", "01.63.1": "7", "01.63.10": "7", "01.63.2": "7", "01.63.20": "7", "01.7": "7", "01.70": "7", "01.70.0": "7", "01.70.00": "7", "02": "7", "02.1": "7", "02.10": "7", "02.10.0": "7", "02.10.00": "7", "02.2": "7", "02.20": "7", "02.20.0": "7", "02.20.00": "7", "02.3": "7", "02.30": "7", "02.30.0": "7", "02.30.00": "7", "02.4": "7", "02.40": "7", "02.40.0": "7", "02.40.00": "7", "03": "7", "03.1": "7", "03.11": "7", "03.11.0": "7", "03.11.00": "7", "03.12": "7", "03.12.0": "7", "03.12.00": "7", "03.2": "7", "03.21": "7", "03.21.0": "7", "03.21.01": "7", "03.21.09": "7", "03.22": "7", "03.22.0": "7", "03.22.01": "7", "03.22.09": "7", "03.3": "7", "03.30": "7", "03.30.0": "7", "03.30.00": "7", "05": "7", "05.1": "7", "05.10": "7", "05.10.0": "7", "05.10.00": "7", "05.2": "7", "05.20": "7", "05.20.0": "7", "05.20.00": "7", "06": "7", "06.1": "7", "06.10": "7", "06.10.0": "7", "06.10.00": "7", "06.2": "7", "06.20": "7", "06.20.0": "7", "06.20.00": "7", "07": "7", "07.1": "7", "07.10": "7", "07.10.0": "7", "07.10.00": "7", "07.2": "7", "07.21": "7", "07.21.0": "7", "07.21.00": "7", "07.29": "7", "07.29.0": "7", "07.29.00": "7", "08": "7", "08.1": "7", "08.11": "7", "08.11.0": "7", "08.11.00": "7", "08.12": "7", "08.12.0": "7", "08.12.00": "7", "08.9": "7", "08.91": "7", "08.91.0": "7", "08.91.00": "7", "08.92": "7", "08.92.0": "7", "08.92.00": "7", "08.93": "7", "08.93.0": "7", "08.93.01": "7", "08.93.02": "7", "08.93.03": "7", "08.99": "7", "08.99.0": "7", "08.99.01": "7", "08.99.09": "7", "09": "7", "09.1": "7", "09.10": "7", "09.10.0": "7", "09.10.00": "7", "09.9": "7", "09.90": "7", "09.90.0": "7", "09.90.00": "7", "10.1": "0", "10.11": "0", "10.11.0": "0", "10.11.00": "0", "10.12": "0", "10.12.0": "0", "10.12.00": "0", "10.13": "0", "10.13.0": "0", "10.13.00": "0", "10.2": "0", "10.20": "0", "10.20.0": "0", "10.20.01": "0", "10.20.09": "0", "10.3": "0", "10.31": "0", "10.31.0": "0", "10.31.00": "0", "10.32": "0", "10.32.0": "0", "10.32.00": "0", "10.39": "0", "10.39.0": "0", "10.39.00": "0", "10.4": "0", "10.41": "0", "10.41.1": "0", "10.41.10": "0", "10.41.2": "0", "10.41.20": "0", "10.41.3": "0", "10.41.30": "0", "10.42": "0", "10.42.0": "0", "10.42.00": "0", "10.5": "0", "10.51": "0", "10.51.1": "0", "10.51.10": "0", "10.51.2": "0", "10.51.20": "0", "10.52": "0", "10.52.0": "0", "10.52.00": "0", "10.6": "0", "10.61": "0", "10.61.1": "0", "10.61.11": "0", "10.61.19": "0", "10.61.2": "0", "10.61.20": "0", "10.61.9": "0", "10.61.90": "0", "10.62": "0", "10.62.0": "0", "10.62.00": "0", "10.7": "0", "10.71": "0", "10.71.1": "0", "10.71.10": "0", "10.71.2": "0", "10.71.20": "0", "10.72": "0", "10.72.0": "0", "10.72.00": "0", "10.73": "0", "10.73.0": "0", "10.73.01": "0", "10.73.02": "0", "10.8": "0", "10.81": "0", "10.81.0": "0", "10.81.00": "0", "10.82": "0", "10.82.0": "0", "10.82.00": "0", "10.83": "0", "10.83.0": "0", "10.83.01": "0", "10.83.02": "0", "10.84": "0", "10.84.0": "0", "10.84.00": "0", "10.85": "0", "10.85.0": "0", "10.85.01": "0", "10.85.02": "0", "10.85.03": "0", "10.85.04": "0", "10.85.05": "0", "10.85.09": "0", "10.86": "0", "10.86.0": "0", "10.86.00": "0", "10.89": "0", "10.89.0": "0", "10.89.01": "0", "10.89.09": "0", "10.9": "0", "10.91": "0", "10.91.0": "0", "10.91.00": "0", "10.92": "0", "10.92.0": "0", "10.92.00": "0", "11.0": "0", "11.01": "0", "11.01.0": "0", "11.01.00": "0", "11.02": "0", "11.02.1": "0", "11.02.10": "0", "11.02.2": "0", "11.02.20": "0", "11.03": "0", "11.03.0": "0", "11.03.00": "0", "11.04": "0", "11.04.0": "0", "11.04.00": "0", "11.05": "0", "11.05.0": "0", "11.05.00": "0", "11.06": "0", "11.06.0": "0", "11.06.00": "0", "11.07": "0", "11.07.0": "0", "11.07.01": "0", "11.07.02": "0", "12.0": "7", "12.00": "7", "12.00.0": "7", "12.00.00": "7", "13.1": "7", "13.10": "7", "13.10.0": "7", "13.10.00": "7", "13.2": "7", "13.20": "7", "13.20.0": "7", "13.20.00": "7", "13.3": "7", "13.30": "7", "13.30.0": "7", "13.30.00": "7", "13.9": "7", "13.91": "7", "13.91.0": "7", "13.91.00": "7", "13.92": "7", "13.92.1": "7", "13.92.10": "7", "13.92.2": "7", "13.92.20": "7", "13.93": "7", "13.93.0": "7", "13.93.00": "7", "13.94": "7", "13.94.0": "7", "13.94.00": "7", "13.95": "7", "13.95.0": "7", "13.95.00": "7", "13.96": "7", "13.96.0": "7", "13.96.00": "7", "13.99": "7", "13.99.1": "7", "13.99.10": "7", "13.99.9": "7", "13.99.90": "7", "14.1": "7", "14.10": "7", "14.10.1": "7", "14.10.10": "7", "14.10.2": "7", "14.10.20": "7", "14.2": "7", "14.21": "7", "14.21.1": "7", "14.21.10": "7", "14.21.2": "7", "14.21.20": "7", "14.22": "7", "14.22.0": "7", "14.22.00": "7", "14.23": "7", "14.23.0": "7", "14.23.00": "7", "14.24": "7", "14.24.0": "7", "14.24.00": "7", "14.29": "7", "14.29.0": "7", "14.29.00": "7", "15.1": "7", "15.11": "7", "15.11.0": "7", "15.11.00": "7", "15.12": "7", "15.12.0": "7", "15.12.00": "7", "15.2": "7", "15.20": "7", "15.20.1": "7", "15.20.10": "7", "15.20.2": "7", "15.20.20": "7", "16.1": "7", "16.11": "7", "16.11.0": "7", "16.11.00": "7", "16.12": "7", "16.12.0": "7", "16.12.00": "7", "16.2": "7", "16.21": "7", "16.21.0": "7", "16.21.00": "7", "16.22": "7", "16.22.0": "7", "16.22.00": "7", "16.23": "7", "16.23.0": "7", "16.23.01": "7", "16.23.09": "7", "16.24": "7", "16.24.0": "7", "16.24.00": "7", "16.25": "7", "16.25.0": "7", "16.25.00": "7", "16.26": "7", "16.26.0": "7", "16.26.00": "7", "16.27": "7", "16.27.0": "7", "16.27.00": "7", "16.28": "7", "16.28.1": "7", "16.28.11": "7", "16.28.19": "7", "16.28.2": "7", "16.28.20": "7", "16.28.3": "7", "16.28.30": "7", "17.1": "7", "17.11": "7", "17.11.0": "7", "17.11.00": "7", "17.12": "7", "17.12.0": "7", "17.12.00": "7", "17.2": "7", "17.21": "7", "17.21.0": "7", "17.21.00": "7", "17.22": "7", "17.22.0": "7", "17.22.00": "7", "17.23": "7", "17.23.0": "7", "17.23.01": "7", "17.23.09": "7", "17.24": "7", "17.24.0": "7", "17.24.00": "7", "17.25": "7", "17.25.0": "7", "17.25.00": "7", "18.1": "7", "18.11": "7", "18.11.0": "7", "18.11.00": "7", "18.12": "7", "18.12.0": "7", "18.12.00": "7", "18.13": "7", "18.13.0": "7", "18.13.00": "7", "18.14": "7", "18.14.0": "7", "18.14.00": "7", "18.2": "7", "18.20": "7", "18.20.0": "7", "18.20.00": "7", "19.1": "7", "19.10": "7", "19.10.0": "7", "19.10.00": "7", "19.2": "7", "19.20": "7", "19.20.1": "7", "19.20.10": "7", "19.20.2": "7", "19.20.20": "7", "19.20.3": "7", "19.20.30": "7", "19.20.4": "7", "19.20.40": "7", "19.20.9": "7", "19.20.90": "7", "20.1": "7", "20.11": "7", "20.11.0": "7", "20.11.00": "7", "20.12": "7", "20.12.0": "7", "20.12.00": "7", "20.13": "7", "20.13.0": "7", "20.13.00": "7", "20.14": "7", "20.14.0": "7", "20.14.00": "7", "20.15": "7", "20.15.0": "7", "20.15.00": "7", "20.16": "7", "20.16.0": "7", "20.16.00": "7", "20.17": "7", "20.17.0": "7", "20.17.00": "7", "20.2": "7", "20.20": "7", "20.20.0": "7", "20.20.00": "7", "20.3": "7", "20.30": "7", "20.30.0": "7", "20.30.00": "7", "20.4": "7", "20.41": "7", "20.41.1": "7", "20.41.10": "7", "20.41.2": "7", "20.41.20": "7", "20.42": "7", "20.42.0": "7", "20.42.00": "7", "20.5": "7", "20.51": "7", "20.51.0": "7", "20.51.00": "7", "20.59": "7", "20.59.1": "7", "20.59.11": "7", "20.59.12": "7", "20.59.2": "7", "20.59.20": "7", "20.59.3": "7", "20.59.30": "7", "20.59.9": "7", "20.59.91": "7", "20.59.99": "7", "20.6": "7", "20.60": "7", "20.60.0": "7", "20.60.00": "7", "21.1": "7", "21.10": "7", "21.10.0": "7", "21.10.00": "7", "21.2": "7", "21.20": "7", "21.20.0": "7", "21.20.01": "7", "21.20.09": "7", "22.1": "7", "22.11": "7", "22.11.1": "7", "22.11.10": "7", "22.11.2": "7", "22.11.20": "7", "22.12": "7", "22.12.0": "7", "22.12.00": "7", "22.2": "7", "22.21": "7", "22.21.0": "7", "22.21.00": "7", "22.22": "7", "22.22.0": "7", "22.22.00": "7", "22.23": "7", "22.23.0": "7", "22.23.00": "7", "22.24": "7", "22.24.0": "7", "22.24.01": "7", "22.24.09": "7", "22.25": "7", "22.25.0": "7", "22.25.00": "7", "22.26": "7", "22.26.1": "7", "22.26.11": "7", "22.26.12": "7", "22.26.9": "7", "22.26.91": "7", "22.26.99": "7", "23.1": "7", "23.11": "7", "23.11.0": "7", "23.11.00": "7", "23.12": "7", "23.12.0": "7", "23.12.00": "7", "23.13": "7", "23.13.0": "7", "23.13.00": "7", "23.14": "7", "23.14.0": "7", "23.14.00": "7", "23.15": "7", "23.15.1": "7", "23.15.10": "7", "23.15.9": "7", "23.15.90": "7", "23.2": "7", "23.20": "7", "23.20.0": "7", "23.20.00": "7", "23.3": "7", "23.31": "7", "23.31.0": "7", "23.31.00": "7", "23.32": "7", "23.32.0": "7", "23.32.00": "7", "23.4": "7", "23.41": "7", "23.41.0": "7", "23.41.00": "7", "23.42": "7", "23.42.0": "7", "23.42.00": "7", "23.43": "7", "23.43.0": "7", "23.43.00": "7", "23.44": "7", "23.44.0": "7", "23.44.00": "7", "23.45": "7", "23.45.0": "7", "23.45.00": "7", "23.5": "7", "23.51": "7", "23.51.0": "7", "23.51.00": "7", "23.52": "7", "23.52.1": "7", "23.52.10": "7", "23.52.2": "7", "23.52.20": "7", "23.6": "7", "23.61": "7", "23.61.0": "7", "23.61.01": "7", "23.61.02": "7", "23.61.03": "7", "23.61.04": "7", "23.61.09": "7", "23.62": "7", "23.62.0": "7", "23.62.00": "7", "23.63": "7", "23.63.0": "7", "23.63.00": "7", "23.64": "7", "23.64.0": "7", "23.64.00": "7", "23.65": "7", "23.65.0": "7", "23.65.01": "7", "23.65.02": "7", "23.66": "7", "23.66.0": "7", "23.66.01": "7", "23.66.09": "7", "23.7": "7", "23.70": "7", "23.70.1": "7", "23.70.10": "7", "23.70.2": "7", "23.70.20": "7", "23.70.3": "7", "23.70.30": "7", "23.9": "7", "23.91": "7", "23.91.0": "7", "23.91.00": "7", "23.99": "7", "23.99.0": "7", "23.99.00": "7", "24.1": "7", "24.10": "7", "24.10.0": "7", "24.10.00": "7", "24.2": "7", "24.20": "7", "24.20.1": "7", "24.20.10": "7", "24.20.2": "7", "24.20.20": "7", "24.3": "7", "24.31": "7", "24.31.0": "7", "24.31.00": "7", "24.32": "7", "24.32.0": "7", "24.32.00": "7", "24.33": "7", "24.33.0": "7", "24.33.01": "7", "24.33.02": "7", "24.33.03": "7", "24.34": "7", "24.34.0": "7", "24.34.00": "7", "24.4": "7", "24.41": "7", "24.41.0": "7", "24.41.00": "7", "24.42": "7", "24.42.0": "7", "24.42.00": "7", "24.43": "7", "24.43.0": "7", "24.43.00": "7", "24.44": "7", "24.44.0": "7", "24.44.00": "7", "24.45": "7", "24.45.0": "7", "24.45.00": "7", "24.46": "7", "24.46.0": "7", "24.46.00": "7", "24.5": "7", "24.51": "7", "24.51.0": "7", "24.51.01": "7", "24.51.02": "7", "24.51.09": "7", "24.52": "7", "24.52.0": "7", "24.52.00": "7", "24.53": "7", "24.53.0": "7", "24.53.01": "7", "24.53.02": "7", "24.53.03": "7", "24.53.09": "7", "24.54": "7", "24.54.0": "7", "24.54.01": "7", "24.54.02": "7", "24.54.03": "7", "24.54.09": "7", "25.1": "7", "25.11": "7", "25.11.0": "7", "25.11.00": "7", "25.12": "7", "25.12.1": "7", "25.12.10": "7", "25.12.2": "7", "25.12.20": "7", "25.2": "7", "25.21": "7", "25.21.1": "7", "25.21.10": "7", "25.21.2": "7", "25.21.20": "7", "25.22": "7", "25.22.0": "7", "25.22.00": "7", "25.3": "7", "25.30": "7", "25.30.1": "7", "25.30.10": "7", "25.30.2": "7", "25.30.20": "7", "25.4": "7", "25.40": "7", "25.40.0": "7", "25.40.00": "7", "25.5": "7", "25.51": "7", "25.51.0": "7", "25.51.00": "7", "25.52": "7", "25.52.0": "7", "25.52.00": "7", "25.53": "7", "25.53.0": "7", "25.53.00": "7", "25.6": "7", "25.61": "7", "25.61.0": "7", "25.61.00": "7", "25.62": "7", "25.62.0": "7", "25.62.00": "7", "25.63": "7", "25.63.1": "7", "25.63.11": "7", "25.63.12": "7", "25.63.2": "7", "25.63.20": "7", "25.9": "7", "25.91": "7", "25.91.0": "7", "25.91.00": "7", "25.92": "7", "25.92.0": "7", "25.92.00": "7", "25.93": "7", "25.93.1": "7", "25.93.10": "7", "25.93.2": "7", "25.93.20": "7", "25.93.3": "7", "25.93.30": "7", "25.94": "7", "25.94.0": "7", "25.94.00": "7", "25.99": "7", "25.99.1": "7", "25.99.10": "7", "25.99.2": "7", "25.99.20": "7", "25.99.9": "7", "25.99.90": "7", "26.1": "7", "26.11": "7", "26.11.0": "7", "26.11.00": "7", "26.12": "7", "26.12.0": "7", "26.12.00": "7", "26.2": "7", "26.20": "7", "26.20.0": "7", "26.20.00": "7", "26.3": "7", "26.30": "7", "26.30.0": "7", "26.30.01": "7", "26.30.09": "7", "26.4": "7", "26.40": "7", "26.40.0": "7", "26.40.01": "7", "26.40.09": "7", "26.5": "7", "26.51": "7", "26.51.1": "7", "26.51.10": "7", "26.51.2": "7", "26.51.21": "7", "26.51.29": "7", "26.52": "7", "26.52.0": "7", "26.52.00": "7", "26.6": "7", "26.60": "7", "26.60.0": "7", "26.60.01": "7", "26.60.02": "7", "26.7": "7", "26.70": "7", "26.70.1": "7", "26.70.11": "7", "26.70.12": "7", "26.70.2": "7", "26.70.20": "7", "26.70.3": "7", "26.70.30": "7", "27.1": "7", "27.11": "7", "27.11.0": "7", "27.11.00": "7", "27.12": "7", "27.12.0": "7", "27.12.00": "7", "27.2": "7", "27.20": "7", "27.20.0": "7", "27.20.00": "7", "27.3": "7", "27.31": "7", "27.31.0": "7", "27.31.00": "7", "27.32": "7", "27.32.0": "7", "27.32.00": "7", "27.33": "7", "27.33.0": "7", "27.33.00": "7", "27.4": "7", "27.40": "7", "27.40.0": "7", "27.40.01": "7", "27.40.02": "7", "27.40.09": "7", "27.5": "7", "27.51": "7", "27.51.0": "7", "27.51.00": "7", "27.52": "7", "27.52.0": "7", "27.52.00": "7", "27.9": "7", "27.90": "7", "27.90.0": "7", "27.90.01": "7", "27.90.02": "7", "27.90.03": "7", "27.90.04": "7", "27.90.09": "7", "28.1": "7", "28.11": "7", "28.11.1": "7", "28.11.10": "7", "28.11.2": "7", "28.11.20": "7", "28.12": "7", "28.12.0": "7", "28.12.00": "7", "28.13": "7", "28.13.0": "7", "28.13.00": "7", "28.14": "7", "28.14.0": "7", "28.14.00": "7", "28.15": "7", "28.15.0": "7", "28.15.00": "7", "28.2": "7", "28.21": "7", "28.21.1": "7", "28.21.10": "7", "28.21.2": "7", "28.21.20": "7", "28.22": "7", "28.22.0": "7", "28.22.01": "7", "28.22.09": "7", "28.23": "7", "28.23.0": "7", "28.23.00": "7", "28.24": "7", "28.24.0": "7", "28.24.00": "7", "28.25": "7", "28.25.0": "7", "28.25.00": "7", "28.29": "7", "28.29.1": "7", "28.29.10": "7", "28.29.2": "7", "28.29.20": "7", "28.29.3": "7", "28.29.30": "7", "28.29.4": "7", "28.29.41": "7", "28.29.49": "7", "28.29.9": "7", "28.29.91": "7", "28.29.92": "7", "28.29.99": "7", "28.3": "7", "28.30": "7", "28.30.1": "7", "28.30.10": "7", "28.30.9": "7", "28.30.91": "7", "28.30.99": "7", "28.4": "7", "28.41": "7", "28.41.0": "7", "28.41.00": "7", "28.42": "7", "28.42.0": "7", "28.42.00": "7", "28.9": "7", "28.91": "7", "28.91.0": "7", "28.91.00": "7", "28.92": "7", "28.92.0": "7", "28.92.00": "7", "28.93": "7", "28.93.0": "7", "28.93.00": "7", "28.94": "7", "28.94.1": "7", "28.94.10": "7", "28.94.2": "7", "28.94.20": "7", "28.94.3": "7", "28.94.30": "7", "28.95": "7", "28.95.0": "7", "28.95.00": "7", "28.96": "7", "28.96.0": "7", "28.96.00": "7", "28.97": "7", "28.97.0": "7", "28.97.01": "7", "28.97.02": "7", "28.97.09": "7", "28.99": "7", "28.99.1": "7", "28.99.10": "7", "28.99.2": "7", "28.99.20": "7", "28.99.9": "7", "28.99.91": "7", "28.99.92": "7", "28.99.93": "7", "28.99.99": "7", "29.1": "7", "29.10": "7", "29.10.0": "7", "29.10.00": "7", "29.2": "7", "29.20": "7", "29.20.0": "7", "29.20.00": "7", "29.3": "7", "29.31": "7", "29.31.0": "7", "29.31.00": "7", "29.32": "7", "29.32.0": "7", "29.32.00": "7", "30.1": "7", "30.11": "7", "30.11.0": "7", "30.11.00": "7", "30.12": "7", "30.12.0": "7", "30.12.00": "7", "30.13": "7", "30.13.0": "7", "30.13.00": "7", "30.2": "7", "30.20": "7", "30.20.0": "7", "30.20.00": "7", "30.3": "7", "30.31": "7", "30.31.0": "7", "30.31.00": "7", "30.32": "7", "30.32.0": "7", "30.32.00": "7", "30.4": "7", "30.40": "7", "30.40.0": "7", "30.40.00": "7", "30.9": "7", "30.91": "7", "30.91.1": "7", "30.91.11": "7", "30.91.12": "7", "30.91.2": "7", "30.91.20": "7", "30.92": "7", "30.92.1": "7", "30.92.10": "7", "30.92.2": "7", "30.92.20": "7", "30.92.3": "7", "30.92.30": "7", "30.92.4": "7", "30.92.40": "7", "30.99": "7", "30.99.0": "7", "30.99.00": "7", "31.0": "7", "31.00": "7", "31.00.1": "7", "31.00.11": "7", "31.00.12": "7", "31.00.13": "7", "31.00.14": "7", "31.00.15": "7", "31.00.2": "7", "31.00.20": "7", "31.00.3": "7", "31.00.31": "7", "31.00.32": "7", "31.00.33": "7", "31.00.34": "7", "31.00.35": "7", "31.00.36": "7", "31.00.37": "7", "31.00.39": "7", "32.1": "7", "32.11": "7", "32.11.0": "7", "32.11.00": "7", "32.12": "7", "32.12.1": "7", "32.12.10": "7", "32.12.2": "7", "32.12.20": "7", "32.13": "7", "32.13.0": "7", "32.13.00": "7", "32.2": "7", "32.20": "7", "32.20.0": "7", "32.20.00": "7", "32.3": "7", "32.30": "7", "32.30.0": "7", "32.30.01": "7", "32.30.09": "7", "32.4": "7", "32.40": "7", "32.40.1": "7", "32.40.10": "7", "32.40.2": "7", "32.40.20": "7", "32.5": "7", "32.50": "7", "32.50.1": "7", "32.50.10": "7", "32.50.2": "7", "32.50.20": "7", "32.50.3": "7", "32.50.30": "7", "32.50.4": "7", "32.50.40": "7", "32.50.5": "7", "32.50.51": "7", "32.50.52": "7", "32.50.53": "7", "32.9": "7", "32.91": "7", "32.91.0": "7", "32.91.00": "7", "32.99": "7", "32.99.1": "7", "32.99.10": "7", "32.99.2": "7", "32.99.20": "7", "32.99.3": "7", "32.99.30": "7", "32.99.4": "7", "32.99.40": "7", "32.99.9": "7", "32.99.91": "7", "32.99.99": "7", "33.1": "7", "33.11": "7", "33.11.0": "7", "33.11.01": "7", "33.11.02": "7", "33.11.03": "7", "33.11.04": "7", "33.11.05": "7", "33.11.06": "7", "33.11.09": "7", "33.12": "7", "33.12.1": "7", "33.12.10": "7", "33.12.2": "7", "33.12.20": "7", "33.12.3": "7", "33.12.30": "7", "33.12.4": "7", "33.12.40": "7", "33.12.5": "7", "33.12.51": "7", "33.12.52": "7", "33.12.53": "7", "33.12.54": "7", "33.12.59": "7", "33.12.6": "7", "33.12.60": "7", "33.12.7": "7", "33.12.70": "7", "33.12.9": "7", "33.12.91": "7", "33.12.92": "7", "33.12.99": "7", "33.13": "7", "33.13.0": "7", "33.13.01": "7", "33.13.02": "7", "33.13.09": "7", "33.14": "7", "33.14.0": "7", "33.14.00": "7", "33.15": "7", "33.15.0": "7", "33.15.00": "7", "33.16": "7", "33.16.0": "7", "33.16.00": "7", "33.17": "7", "33.17.0": "7", "33.17.00": "7", "33.18": "7", "33.18.1": "7", "33.18.10": "7", "33.18.2": "7", "33.18.20": "7", "33.18.3": "7", "33.18.30": "7", "33.19": "7", "33.19.0": "7", "33.19.00": "7", "33.2": "7", "33.20": "7", "33.20.0": "7", "33.20.01": "7", "33.20.02": "7", "33.20.03": "7", "33.20.04": "7", "33.20.05": "7", "33.20.06": "7", "33.20.07": "7", "33.20.09": "7", "35.1": "7", "35.11": "7", "35.11.0": "7", "35.11.00": "7", "35.12": "7", "35.12.0": "7", "35.12.00": "7", "35.13": "7", "35.13.0": "7", "35.13.00": "7", "35.14": "7", "35.14.0": "7", "35.14.00": "7", "35.15": "7", "35.15.0": "7", "35.15.00": "7", "35.16": "7", "35.16.0": "7", "35.16.00": "7", "35.2": "7", "35.21": "7", "35.21.0": "7", "35.21.00": "7", "35.22": "7", "35.22.0": "7", "35.22.00": "7", "35.23": "7", "35.23.0": "7", "35.23.00": "7", "35.24": "7", "35.24.0": "7", "35.24.00": "7", "35.3": "7", "35.30": "7", "35.30.0": "7", "35.30.00": "7", "35.4": "17", "35.40": "17", "35.40.0": "17", "35.40.00": "17", "36.0": "7", "36.00": "7", "36.00.0": "7", "36.00.00": "7", "37.0": "7", "37.00": "7", "37.00.0": "7", "37.00.00": "7", "38.1": "7", "38.11": "7", "38.11.0": "7", "38.11.00": "7", "38.12": "7", "38.12.0": "7", "38.12.00": "7", "38.2": "7", "38.21": "7", "38.21.1": "7", "38.21.11": "7", "38.21.12": "7", "38.21.2": "7", "38.21.20": "7", "38.21.3": "7", "38.21.30": "7", "38.21.4": "7", "38.21.40": "7", "38.22": "7", "38.22.0": "7", "38.22.00": "7", "38.23": "7", "38.23.0": "7", "38.23.00": "7", "38.3": "7", "38.31": "7", "38.31.0": "7", "38.31.00": "7", "38.32": "7", "38.32.0": "7", "38.32.00": "7", "38.33": "7", "38.33.0": "7", "38.33.00": "7", "39.0": "7", "39.00": "7", "39.00.0": "7", "39.00.01": "7", "39.00.09": "7", "41.0": "8", "41.00": "8", "41.00.0": "8", "41.00.00": "8", "42.1": "8", "42.11": "8", "42.11.0": "8", "42.11.00": "8", "42.12": "8", "42.12.0": "8", "42.12.00": "8", "42.13": "8", "42.13.0": "8", "42.13.00": "8", "42.2": "8", "42.21": "8", "42.21.0": "8", "42.21.00": "8", "42.22": "8", "42.22.0": "8", "42.22.00": "8", "42.9": "8", "42.91": "8", "42.91.0": "8", "42.91.00": "8", "42.99": "8", "42.99.0": "8", "42.99.00": "8", "43.1": "8", "43.11": "8", "43.11.0": "8", "43.11.00": "8", "43.12": "8", "43.12.0": "8", "43.12.01": "8", "43.12.09": "8", "43.13": "8", "43.13.0": "8", "43.13.00": "8", "43.2": "8", "43.21": "8", "43.21.0": "8", "43.21.01": "8", "43.21.02": "8", "43.21.03": "8", "43.21.04": "8", "43.21.05": "8", "43.22": "8", "43.22.0": "8", "43.22.01": "8", "43.22.02": "8", "43.22.03": "8", "43.22.04": "8", "43.22.05": "8", "43.22.06": "8", "43.22.07": "8", "43.23": "8", "43.23.0": "8", "43.23.00": "8", "43.24": "8", "43.24.0": "8", "43.24.01": "8", "43.24.02": "8", "43.24.09": "8", "43.3": "8", "43.31": "8", "43.31.0": "8", "43.31.01": "8", "43.31.02": "78", "43.32": "8", "43.32.0": "8", "43.32.01": "8", "43.32.02": "8", "43.33": "8", "43.33.0": "8", "43.33.00": "8", "43.34": "8", "43.34.0": "8", "43.34.01": "78", "43.34.02": "78", "43.35": "8", "43.35.0": "8", "43.35.00": "8", "43.4": "8", "43.41": "8", "43.41.0": "8", "43.41.00": "8", "43.42": "8", "43.42.0": "8", "43.42.00": "8", "43.5": "8", "43.50": "8", "43.50.0": "8", "43.50.00": "8", "43.6": "17", "43.60": "17", "43.60.0": "17", "43.60.00": "17", "43.9": "8", "43.91": "8", "43.91.0": "8", "43.91.00": "8", "43.99": "8", "43.99.0": "8", "43.99.01": "8", "43.99.02": "8", "43.99.09": "8", "46.1": "4", "46.11": "4", "46.11.0": "4", "46.11.01": "4", "46.11.02": "4", "46.11.03": "4", "46.11.04": "4", "46.12": "4", "46.12.0": "4", "46.12.01": "4", "46.12.02": "4", "46.12.03": "4", "46.12.04": "47", "46.12.05": "47", "46.13": "4", "46.13.0": "4", "46.13.01": "4", "46.13.02": "4", "46.13.03": "4", "46.14": "4", "46.14.0": "4", "46.14.01": "4", "46.14.02": "4", "46.14.03": "4", "46.14.04": "4", "46.14.05": "4", "46.15": "4", "46.15.0": "4", "46.15.01": "4", "46.15.02": "47", "46.15.03": "4", "46.15.04": "47", "46.15.05": "47", "46.16": "4", "46.16.0": "4", "46.16.01": "47", "46.16.02": "47", "46.16.03": "47", "46.16.04": "47", "46.16.05": "47", "46.16.06": "47", "46.16.07": "47", "46.17": "4", "46.17.0": "4", "46.17.01": "4", "46.17.02": "4", "46.17.03": "47", "46.17.04": "47", "46.17.05": "47", "46.17.06": "47", "46.17.07": "4", "46.18": "4", "46.18.1": "47", "46.18.11": "47", "46.18.12": "47", "46.18.13": "47", "46.18.14": "47", "46.18.2": "47", "46.18.21": "47", "46.18.22": "47", "46.18.23": "47", "46.18.24": "47", "46.18.25": "47", "46.18.26": "47", "46.18.3": "47", "46.18.31": "47", "46.18.32": "47", "46.18.33": "47", "46.18.4": "147", "46.18.41": "17", "46.18.42": "17", "46.18.43": "17", "46.18.44": "17", "46.18.45": "17", "46.18.46": "47", "46.18.5": "47", "46.18.50": "47", "46.18.9": "4", "46.18.91": "47", "46.18.92": "47", "46.18.93": "47", "46.18.99": "4", "46.19": "4", "46.19.0": "4", "46.19.00": "47", "46.2": "1", "46.21": "1", "46.21.1": "1", "46.21.10": "1", "46.21.2": "1", "46.21.21": "1", "46.21.22": "1", "46.22": "1", "46.22.0": "1", "46.22.00": "1", "46.23": "1", "46.23.0": "1", "46.23.00": "1", "46.24": "1", "46.24.0": "1", "46.24.01": "1", "46.24.02": "1", "46.3": "1", "46.31": "1", "46.31.1": "1", "46.31.10": "1", "46.31.2": "1", "46.31.20": "1", "46.32": "1", "46.32.1": "1", "46.32.11": "1", "46.32.12": "1", "46.32.2": "1", "46.32.20": "1", "46.32.3": "1", "46.32.31": "1", "46.32.32": "1", "46.33": "1", "46.33.1": "1", "46.33.10": "1", "46.33.2": "1", "46.33.20": "1", "46.34": "1", "46.34.1": "1", "46.34.10": "1", "46.34.2": "1", "46.34.20": "1", "46.35": "1", "46.35.0": "1", "46.35.01": "1", "46.35.09": "1", "46.36": "1", "46.36.0": "1", "46.36.00": "1", "46.37": "1", "46.37.0": "1", "46.37.01": "1", "46.37.02": "1", "46.38": "1", "46.38.0": "1", "46.38.00": "1", "46.39": "1", "46.39.0": "1", "46.39.00": "1", "46.4": "1", "46.41": "1", "46.41.1": "1", "46.41.10": "1", "46.41.2": "1", "46.41.20": "1", "46.41.9": "1", "46.41.90": "1", "46.42": "1", "46.42.1": "1", "46.42.10": "1", "46.42.2": "1", "46.42.20": "1", "46.42.3": "1", "46.42.30": "1", "46.43": "1", "46.43.1": "1", "46.43.10": "1", "46.43.2": "1", "46.43.20": "1", "46.43.3": "1", "46.43.30": "1", "46.44": "1", "46.44.1": "1", "46.44.10": "1", "46.44.2": "1", "46.44.20": "1", "46.44.3": "1", "46.44.30": "1", "46.44.4": "1", "46.44.40": "1", "46.45": "1", "46.45.0": "1", "46.45.00": "1", "46.46": "1", "46.46.1": "1", "46.46.10": "1", "46.46.2": "1", "46.46.20": "1", "46.46.3": "1", "46.46.31": "1", "46.46.39": "1", "46.47": "1", "46.47.1": "1", "46.47.10": "1", "46.47.2": "1", "46.47.20": "1", "46.47.3": "1", "46.47.30": "1", "46.48": "1", "46.48.0": "1", "46.48.00": "1", "46.49": "1", "46.49.1": "1", "46.49.10": "1", "46.49.2": "1", "46.49.21": "17", "46.49.22": "17", "46.49.3": "1", "46.49.30": "1", "46.49.4": "1", "46.49.41": "1", "46.49.49": "1", "46.49.5": "1", "46.49.50": "1", "46.49.9": "1", "46.49.91": "1", "46.49.92": "1", "46.49.99": "1", "46.5": "1", "46.50": "1", "46.50.1": "1", "46.50.10": "1", "46.50.2": "1", "46.50.20": "1", "46.50.3": "1", "46.50.30": "1", "46.6": "1", "46.61": "1", "46.61.0": "1", "46.61.00": "1", "46.62": "1", "46.62.0": "1", "46.62.00": "1", "46.63": "1", "46.63.0": "1", "46.63.00": "1", "46.64": "1", "46.64.1": "1", "46.64.11": "1", "46.64.19": "1", "46.64.2": "1", "46.64.20": "1", "46.64.3": "1", "46.64.30": "1", "46.64.4": "1", "46.64.40": "1", "46.64.5": "1", "46.64.51": "1", "46.64.59": "1", "46.64.6": "1", "46.64.60": "1", "46.64.9": "1", "46.64.91": "1", "46.64.92": "1", "46.64.99": "1", "46.7": "1", "46.71": "1", "46.71.1": "1", "46.71.10": "1", "46.71.2": "1", "46.71.20": "1", "46.72": "1", "46.72.0": "1", "46.72.00": "1", "46.73": "1", "46.73.1": "1", "46.73.10": "1", "46.73.2": "1", "46.73.20": "1", "46.8": "1", "46.81": "1", "46.81.0": "1", "46.81.00": "1", "46.82": "1", "46.82.1": "1", "46.82.10": "1", "46.82.2": "1", "46.82.21": "1", "46.82.29": "1", "46.83": "1", "46.83.1": "1", "46.83.10": "1", "46.83.2": "1", "46.83.21": "1", "46.83.22": "1", "46.83.23": "1", "46.83.29": "1", "46.83.3": "1", "46.83.30": "1", "46.84": "1", "46.84.1": "1", "46.84.10": "1", "46.84.2": "1", "46.84.20": "1", "46.85": "1", "46.85.0": "1", "46.85.01": "1", "46.85.02": "1", "46.85.09": "1", "46.86": "1", "46.86.1": "1", "46.86.10": "1", "46.86.2": "1", "46.86.20": "1", "46.86.3": "1", "46.86.30": "1", "46.86.9": "1", "46.86.90": "1", "46.87": "1", "46.87.1": "1", "46.87.10": "1", "46.87.9": "1", "46.87.90": "1", "46.9": "1", "46.90": "1", "46.90.0": "1", "46.90.00": "1", "47.1": "1", "47.11": "1", "47.11.0": "12", "47.11.01": "12", "47.11.02": "12", "47.12": "13", "47.12.1": "13", "47.12.10": "13", "47.12.2": "13", "47.12.20": "13", "47.12.3": "13", "47.12.30": "13", "47.12.4": "13", "47.12.40": "13", "47.12.5": "13", "47.12.50": "13", "47.12.9": "13", "47.12.90": "13", "47.2": "1", "47.21": "1", "47.21.0": "1", "47.21.01": "1", "47.21.02": "1", "47.22": "1", "47.22.0": "1", "47.22.00": "1", "47.23": "1", "47.23.0": "1", "47.23.00": "1", "47.24": "1", "47.24.1": "1", "47.24.10": "1", "47.24.2": "1", "47.24.20": "1", "47.25": "1", "47.25.0": "1", "47.25.00": "1", "47.26": "1", "47.26.0": "1", "47.26.01": "1", "47.26.02": "123", "47.26.09": "123", "47.27": "12", "47.27.1": "12", "47.27.10": "12", "47.27.2": "12", "47.27.20": "12", "47.27.3": "12", "47.27.30": "12", "47.27.9": "12", "47.27.90": "12", "47.3": "1", "47.30": "1", "47.30.0": "1", "47.30.00": "1", "47.4": "1", "47.40": "13", "47.40.1": "13", "47.40.10": "13", "47.40.2": "13", "47.40.20": "13", "47.40.3": "13", "47.40.30": "13", "47.5": "1", "47.51": "1", "47.51.1": "1", "47.51.10": "1", "47.51.2": "1", "47.51.20": "1", "47.52": "1", "47.52.1": "1", "47.52.10": "1", "47.52.2": "1", "47.52.20": "1", "47.52.3": "1", "47.52.31": "13", "47.52.32": "13", "47.52.4": "1", "47.52.40": "1", "47.53": "1", "47.53.1": "1", "47.53.11": "13", "47.53.12": "13", "47.53.2": "1", "47.53.20": "1", "47.54": "1", "47.54.0": "1", "47.54.00": "1", "47.55": "13", "47.55.1": "13", "47.55.10": "13", "47.55.2": "13", "47.55.20": "13", "47.55.3": "13", "47.55.30": "13", "47.55.4": "13", "47.55.40": "13", "47.55.9": "13", "47.55.90": "13", "47.6": "1", "47.61": "1", "47.61.0": "1", "47.61.00": "1", "47.62": "1", "47.62.1": "1", "47.62.10": "1", "47.62.2": "1", "47.62.20": "1", "47.63": "13", "47.63.1": "13", "47.63.10": "13", "47.63.2": "13", "47.63.21": "13", "47.63.29": "13", "47.64": "13", "47.64.0": "13", "47.64.00": "13", "47.69": "13", "47.69.1": "13", "47.69.11": "13", "47.69.12": "13", "47.69.2": "13", "47.69.20": "13", "47.69.3": "13", "47.69.30": "13", "47.69.9": "13", "47.69.91": "1", "47.69.99": "13", "47.7": "1", "47.71": "1", "47.71.1": "1", "47.71.10": "1", "47.71.2": "1", "47.71.20": "1", "47.71.3": "1", "47.71.30": "1", "47.71.4": "1", "47.71.40": "1", "47.71.5": "1", "47.71.50": "1", "47.72": "1", "47.72.1": "1", "47.72.11": "13", "47.72.12": "13", "47.72.2": "1", "47.72.20": "1", "47.73": "1", "47.73.1": "1", "47.73.10": "1", "47.73.2": "13", "47.73.20": "13", "47.73.9": "1", "47.73.90": "1", "47.74": "1", "47.74.0": "1", "47.74.01": "13", "47.74.09": "13", "47.75": "1", "47.75.0": "13", "47.75.00": "13", "47.76": "1", "47.76.1": "1", "47.76.10": "1", "47.76.2": "1", "47.76.20": "1", "47.77": "1", "47.77.0": "1", "47.77.00": "1", "47.78": "1", "47.78.1": "13", "47.78.10": "13", "47.78.2": "13", "47.78.21": "13", "47.78.22": "13", "47.78.23": "13", "47.78.24": "13", "47.78.25": "13", "47.78.3": "13", "47.78.30": "13", "47.78.4": "13", "47.78.40": "13", "47.78.9": "1", "47.78.91": "13", "47.78.92": "13", "47.78.93": "13", "47.78.99": "1", "47.79": "1", "47.79.1": "1", "47.79.10": "1", "47.79.2": "1", "47.79.20": "1", "47.79.3": "1", "47.79.31": "13", "47.79.32": "13", "47.79.39": "13", "47.8": "1", "47.81": "1", "47.81.1": "1", "47.81.10": "1", "47.81.2": "1", "47.81.20": "1", "47.82": "1", "47.82.0": "1", "47.82.00": "1", "47.83": "1", "47.83.1": "1", "47.83.10": "1", "47.83.2": "1", "47.83.20": "1", "47.9": "1", "47.91": "1", "47.91.1": "1", "47.91.10": "1", "47.91.2": "1", "47.91.20": "1", "47.92": "17", "47.92.1": "17", "47.92.10": "17", "47.92.2": "17", "47.92.21": "17", "47.92.22": "17", "47.92.29": "17", "47.92.3": "17", "47.92.31": "17", "47.92.32": "17", "47.92.33": "17", "47.92.34": "17", "47.92.35": "17", "47.92.36": "17", "47.92.39": "17", "49.1": "7", "49.11": "7", "49.11.0": "7", "49.11.00": "7", "49.12": "7", "49.12.0": "7", "49.12.00": "7", "49.2": "7", "49.20": "7", "49.20.0": "7", "49.20.00": "7", "49.3": "7", "49.31": "7", "49.31.0": "7", "49.31.01": "7", "49.31.02": "7", "49.32": "7", "49.32.0": "7", "49.32.01": "7", "49.32.02": "7", "49.33": "7", "49.33.1": "7", "49.33.10": "7", "49.33.2": "7", "49.33.20": "7", "49.34": "78", "49.34.0": "78", "49.34.00": "78", "49.39": "7", "49.39.0": "7", "49.39.00": "7", "49.4": "7", "49.41": "7", "49.41.0": "7", "49.41.00": "7", "49.42": "7", "49.42.0": "7", "49.42.00": "7", "49.5": "7", "49.50": "7", "49.50.1": "7", "49.50.10": "7", "49.50.2": "7", "49.50.20": "7", "50.1": "7", "50.10": "7", "50.10.0": "7", "50.10.00": "7", "50.2": "7", "50.20": "7", "50.20.0": "7", "50.20.00": "7", "50.3": "7", "50.30": "7", "50.30.0": "7", "50.30.00": "7", "50.4": "7", "50.40": "7", "50.40.0": "7", "50.40.00": "7", "51.1": "7", "51.10": "7", "51.10.1": "7", "51.10.10": "7", "51.10.2": "7", "51.10.20": "7", "51.2": "7", "51.21": "7", "51.21.0": "7", "51.21.00": "7", "51.22": "7", "51.22.0": "7", "51.22.00": "7", "52.1": "7", "52.10": "7", "52.10.1": "7", "52.10.10": "7", "52.10.2": "7", "52.10.20": "7", "52.2": "7", "52.21": "7", "52.21.1": "7", "52.21.10": "7", "52.21.2": "7", "52.21.20": "7", "52.21.3": "7", "52.21.30": "7", "52.21.4": "7", "52.21.40": "7", "52.21.5": "7", "52.21.50": "7", "52.21.6": "7", "52.21.60": "7", "52.21.9": "7", "52.21.90": "7", "52.22": "7", "52.22.0": "7", "52.22.01": "7", "52.22.09": "7", "52.23": "7", "52.23.0": "7", "52.23.00": "7", "52.24": "7", "52.24.1": "7", "52.24.10": "7", "52.24.2": "7", "52.24.20": "7", "52.24.3": "7", "52.24.30": "7", "52.24.4": "7", "52.24.40": "7", "52.25": "7", "52.25.0": "7", "52.25.01": "7", "52.25.09": "7", "52.26": "7", "52.26.0": "7", "52.26.01": "7", "52.26.02": "7", "52.3": "17", "52.31": "17", "52.31.0": "17", "52.31.00": "17", "52.32": "17", "52.32.0": "17", "52.32.00": "17", "53.1": "7", "53.10": "7", "53.10.0": "7", "53.10.00": "7", "53.2": "7", "53.20": "7", "53.20.0": "7", "53.20.00": "7", "53.3": "17", "53.30": "17", "53.30.0": "17", "53.30.00": "17", "55.1": "5", "55.10": "5", "55.10.0": "5", "55.10.00": "5", "55.2": "5", "55.20": "5", "55.20.1": "5", "55.20.10": "5", "55.20.2": "5", "55.20.20": "5", "55.20.3": "5", "55.20.31": "5", "55.20.32": "5", "55.20.4": "5", "55.20.41": "5", "55.20.42": "5", "55.20.5": "5", "55.20.51": "5", "55.20.52": "5", "55.3": "5", "55.30": "5", "55.30.0": "5", "55.30.01": "5", "55.30.02": "5", "55.30.03": "5", "55.30.04": "5", "55.4": "17", "55.40": "17", "55.40.0": "17", "55.40.00": "17", "55.9": "5", "55.90": "5", "55.90.0": "58", "55.90.00": "58", "56.1": "5", "56.11": "57", "56.11.1": "57", "56.11.11": "5", "56.11.12": "57", "56.11.2": "5", "56.11.21": "5", "56.11.22": "5", "56.11.23": "5", "56.11.24": "5", "56.11.9": "5", "56.11.91": "5", "56.11.92": "5", "56.11.93": "5", "56.12": "5", "56.12.0": "5", "56.12.01": "5", "56.12.02": "5", "56.12.03": "5", "56.2": "5", "56.21": "5", "56.21.0": "5", "56.21.01": "5", "56.21.02": "5", "56.22": "5", "56.22.0": "5", "56.22.01": "5", "56.22.02": "5", "56.3": "5", "56.30": "5", "56.30.0": "5", "56.30.01": "5", "56.30.02": "5", "56.30.03": "5", "56.30.04": "5", "56.4": "17", "56.40": "17", "56.40.0": "17", "56.40.00": "17", "58.1": "7", "58.11": "7", "58.11.0": "7", "58.11.00": "7", "58.12": "7", "58.12.0": "7", "58.12.00": "7", "58.13": "7", "58.13.0": "7", "58.13.00": "7", "58.19": "7", "58.19.0": "7", "58.19.00": "7", "58.2": "7", "58.21": "7", "58.21.0": "7", "58.21.00": "7", "58.29": "7", "58.29.0": "7", "58.29.00": "7", "59.1": "7", "59.11": "7", "59.11.0": "7", "59.11.00": "7", "59.12": "7", "59.12.0": "7", "59.12.00": "7", "59.13": "7", "59.13.0": "7", "59.13.00": "7", "59.14": "7", "59.14.0": "7", "59.14.00": "7", "59.2": "7", "59.20": "7", "59.20.1": "7", "59.20.10": "7", "59.20.2": "7", "59.20.20": "7", "60.1": "7", "60.10": "7", "60.10.0": "7", "60.10.00": "7", "60.2": "7", "60.20": "7", "60.20.0": "7", "60.20.00": "7", "60.3": "17", "60.31": "7", "60.31.0": "7", "60.31.00": "7", "60.39": "17", "60.39.0": "17", "60.39.00": "17", "61.1": "7", "61.10": "7", "61.10.0": "7", "61.10.01": "7", "61.10.02": "7", "61.10.03": "7", "61.2": "17", "61.20": "17", "61.20.0": "17", "61.20.00": "17", "61.9": "7", "61.90": "7", "61.90.1": "7", "61.90.10": "7", "61.90.2": "7", "61.90.20": "7", "61.90.9": "7", "61.90.90": "7", "62.1": "7", "62.10": "7", "62.10.0": "7", "62.10.00": "7", "62.2": "7", "62.20": "7", "62.20.1": "7", "62.20.10": "7", "62.20.2": "7", "62.20.20": "7", "62.9": "7", "62.90": "7", "62.90.0": "7", "62.90.01": "7", "62.90.09": "7", "63.1": "7", "63.10": "7", "63.10.1": "7", "63.10.10": "7", "63.10.2": "7", "63.10.21": "7", "63.10.29": "7", "63.9": "7", "63.91": "7", "63.91.0": "7", "63.91.00": "7", "63.92": "7", "63.92.0": "7", "63.92.00": "7", "64.1": "6", "64.11": "6", "64.11.0": "6", "64.11.00": "6", "64.19": "6", "64.19.1": "6", "64.19.10": "6", "64.19.2": "6", "64.19.20": "6", "64.19.3": "6", "64.19.30": "6", "64.2": "6", "64.21": "6", "64.21.0": "6", "64.21.00": "6", "64.22": "6", "64.22.0": "6", "64.22.00": "6", "64.3": "6", "64.31": "6", "64.31.0": "6", "64.31.00": "6", "64.32": "6", "64.32.0": "6", "64.32.00": "6", "64.9": "6", "64.91": "6", "64.91.0": "6", "64.91.00": "6", "64.92": "6", "64.92.1": "6", "64.92.10": "6", "64.92.9": "6", "64.92.91": "6", "64.92.99": "6", "64.99": "6", "64.99.0": "6", "64.99.00": "6", "65.1": "6", "65.11": "6", "65.11.0": "6", "65.11.00": "6", "65.12": "6", "65.12.0": "6", "65.12.00": "6", "65.2": "6", "65.20": "6", "65.20.0": "6", "65.20.00": "6", "65.3": "6", "65.30": "6", "65.30.0": "6", "65.30.00": "6", "66.1": "6", "66.11": "6", "66.11.0": "6", "66.11.00": "6", "66.12": "6", "66.12.0": "6", "66.12.00": "6", "66.19": "6", "66.19.1": "6", "66.19.10": "6", "66.19.2": "6", "66.19.21": "6", "66.19.22": "6", "66.19.9": "6", "66.19.90": "6", "66.2": "6", "66.21": "6", "66.21.0": "6", "66.21.00": "6", "66.22": "6", "66.22.0": "6", "66.22.00": "6", "66.29": "6", "66.29.0": "6", "66.29.01": "6", "66.29.09": "6", "66.3": "6", "66.30": "6", "66.30.0": "6", "66.30.01": "6", "66.30.02": "6", "66.30.03": "6", "68.1": "8", "68.11": "8", "68.11.0": "8", "68.11.00": "8", "68.12": "8", "68.12.0": "8", "68.12.00": "8", "68.2": "8", "68.20": "8", "68.20.0": "8", "68.20.01": "8", "68.20.02": "8", "68.20.09": "8", "68.3": "8", "68.31": "8", "68.31.0": "8", "68.31.00": "8", "68.32": "8", "68.32.0": "8", "68.32.01": "8", "68.32.09": "8", "69.1": "6", "69.10": "6", "69.10.1": "6", "69.10.10": "6", "69.10.2": "6", "69.10.20": "6", "69.10.3": "6", "69.10.30": "6", "69.2": "6", "69.20": "6", "69.20.0": "6", "69.20.01": "6", "69.20.02": "6", "69.20.03": "6", "69.20.04": "6", "69.20.05": "6", "69.20.06": "6", "69.20.07": "6", "70.1": "6", "70.10": "6", "70.10.0": "6", "70.10.00": "6", "70.2": "6", "70.20": "6", "70.20.0": "6", "70.20.01": "6", "70.20.02": "6", "70.20.09": "6", "71.1": "6", "71.11": "6", "71.11.0": "6", "71.11.01": "6", "71.11.09": "6", "71.12": "6", "71.12.1": "6", "71.12.10": "6", "71.12.2": "6", "71.12.20": "6", "71.12.3": "6", "71.12.30": "6", "71.12.4": "6", "71.12.40": "6", "71.12.5": "6", "71.12.50": "6", "71.2": "6", "71.20": "6", "71.20.1": "6", "71.20.11": "6", "71.20.19": "6", "71.20.2": "6", "71.20.21": "6", "71.20.22": "6", "71.20.29": "6", "72.1": "6", "72.10": "6", "72.10.1": "6", "72.10.10": "6", "72.10.2": "6", "72.10.21": "6", "72.10.22": "6", "72.10.29": "6", "72.2": "6", "72.20": "6", "72.20.0": "6", "72.20.01": "6", "72.20.09": "6", "73.1": "6", "73.11": "6", "73.11.0": "6", "73.11.01": "6", "73.11.02": "6", "73.11.03": "6", "73.12": "6", "73.12.0": "6", "73.12.00": "6", "73.2": "6", "73.20": "6", "73.20.0": "6", "73.20.00": "6", "73.3": "16", "73.30": "16", "73.30.0": "16", "73.30.01": "6", "73.30.02": "16", "73.30.03": "16", "73.30.09": "6", "74.1": "6", "74.11": "6", "74.11.1": "6", "74.11.10": "6", "74.11.2": "6", "74.11.20": "6", "74.12": "6", "74.12.0": "6", "74.12.01": "6", "74.12.09": "6", "74.13": "6", "74.13.0": "6", "74.13.00": "6", "74.14": "6", "74.14.0": "6", "74.14.01": "6", "74.14.09": "6", "74.2": "6", "74.20": "6", "74.20.1": "6", "74.20.11": "6", "74.20.12": "6", "74.20.19": "6", "74.20.2": "6", "74.20.20": "6", "74.3": "6", "74.30": "6", "74.30.0": "6", "74.30.00": "6", "74.9": "6", "74.91": "1678", "74.91.0": "1678", "74.91.00": "1678", "74.99": "6", "74.99.1": "6", "74.99.11": "6", "74.99.12": "6", "74.99.13": "6", "74.99.14": "6", "74.99.15": "6", "74.99.16": "6", "74.99.19": "6", "74.99.2": "6", "74.99.21": "6", "74.99.29": "6", "74.99.3": "6", "74.99.31": "6", "74.99.32": "6", "74.99.33": "6", "74.99.4": "6", "74.99.41": "6", "74.99.42": "6", "74.99.9": "6", "74.99.91": "6", "74.99.92": "6", "74.99.93": "6", "74.99.94": "6", "74.99.99": "6", "75.0": "6", "75.00": "6", "75.00.0": "6", "75.00.00": "6", "77.1": "7", "77.11": "7", "77.11.0": "7", "77.11.00": "7", "77.12": "7", "77.12.0": "7", "77.12.00": "7", "77.2": "7", "77.21": "7", "77.21.0": "7", "77.21.01": "7", "77.21.02": "7", "77.21.09": "7", "77.22": "7", "77.22.1": "7", "77.22.10": "7", "77.22.9": "7", "77.22.90": "7", "77.3": "7", "77.31": "7", "77.31.0": "7", "77.31.00": "7", "77.32": "7", "77.32.0": "7", "77.32.00": "7", "77.33": "7", "77.33.0": "7", "77.33.00": "7", "77.34": "7", "77.34.0": "7", "77.34.00": "7", "77.35": "7", "77.35.0": "7", "77.35.00": "7", "77.39": "7", "77.39.1": "7", "77.39.10": "7", "77.39.9": "7", "77.39.91": "7", "77.39.92": "7", "77.39.99": "7", "77.4": "7", "77.40": "7", "77.40.0": "7", "77.40.00": "7", "77.5": "17", "77.51": "17", "77.51.0": "17", "77.51.00": "17", "77.52": "17", "77.52.0": "17", "77.52.00": "17", "78.1": "7", "78.10": "7", "78.10.0": "7", "78.10.00": "7", "78.2": "7", "78.20": "7", "78.20.0": "7", "78.20.00": "7", "79.1": "7", "79.11": "7", "79.11.0": "7", "79.11.00": "7", "79.12": "7", "79.12.0": "7", "79.12.00": "7", "79.9": "7", "79.90": "7", "79.90.0": "7", "79.90.01": "7", "79.90.02": "7", "79.90.03": "7", "79.90.04": "7", "80.0": "67", "80.01": "7", "80.01.1": "7", "80.01.11": "7", "80.01.12": "7", "80.01.13": "7", "80.01.14": "7", "80.01.2": "7", "80.01.21": "7", "80.01.29": "7", "80.09": "67", "80.09.0": "67", "80.09.00": "67", "81.1": "7", "81.10": "7", "81.10.0": "7", "81.10.00": "7", "81.2": "7", "81.21": "7", "81.21.0": "7", "81.21.00": "7", "81.22": "7", "81.22.0": "7", "81.22.01": "7", "81.22.09": "78", "81.23": "7", "81.23.1": "7", "81.23.10": "7", "81.23.9": "7", "81.23.91": "7", "81.23.99": "7", "81.3": "7", "81.30": "7", "81.30.0": "7", "81.30.00": "7", "82.1": "7", "82.10": "67", "82.10.0": "67", "82.10.00": "67", "82.2": "7", "82.20": "7", "82.20.0": "7", "82.20.00": "7", "82.3": "7", "82.30": "7", "82.30.0": "7", "82.30.01": "7", "82.30.02": "7", "82.30.03": "7", "82.30.04": "7", "82.30.09": "7", "82.4": "17", "82.40": "17", "82.40.0": "17", "82.40.01": "7", "82.40.09": "17", "82.9": "7", "82.91": "7", "82.91.1": "7", "82.91.10": "7", "82.91.2": "7", "82.91.20": "7", "82.92": "7", "82.92.1": "7", "82.92.10": "7", "82.92.2": "7", "82.92.20": "7", "82.99": "7", "82.99.1": "7", "82.99.11": "7", "82.99.19": "7", "82.99.9": "7", "82.99.91": "7", "82.99.99": "7", "84.1": "7", "84.11": "7", "84.11.1": "7", "84.11.10": "7", "84.11.2": "7", "84.11.20": "7", "84.11.3": "7", "84.11.30": "7", "84.12": "7", "84.12.1": "7", "84.12.10": "7", "84.12.2": "7", "84.12.20": "7", "84.12.3": "7", "84.12.30": "7", "84.12.4": "7", "84.12.40": "7", "84.13": "7", "84.13.1": "7", "84.13.10": "7", "84.13.2": "7", "84.13.20": "7", "84.13.3": "7", "84.13.30": "7", "84.13.4": "7", "84.13.40": "7", "84.13.5": "7", "84.13.50": "7", "84.13.6": "7", "84.13.60": "7", "84.13.9": "7", "84.13.90": "7", "84.2": "7", "84.21": "7", "84.21.0": "7", "84.21.00": "7", "84.22": "7", "84.22.0": "7", "84.22.00": "7", "84.23": "7", "84.23.0": "7", "84.23.00": "7", "84.24": "7", "84.24.1": "7", "84.24.10": "7", "84.24.2": "7", "84.24.20": "7", "84.25": "7", "84.25.0": "7", "84.25.00": "7", "84.3": "7", "84.30": "7", "84.30.0": "7", "84.30.00": "7", "85.1": "6", "85.10": "6", "85.10.0": "6", "85.10.00": "6", "85.2": "6", "85.20": "6", "85.20.0": "6", "85.20.00": "6", "85.3": "6", "85.31": "6", "85.31.1": "6", "85.31.10": "6", "85.31.2": "6", "85.31.20": "6", "85.32": "6", "85.32.0": "6", "85.32.01": "6", "85.32.02": "6", "85.32.03": "6", "85.32.09": "6", "85.33": "6", "85.33.0": "6", "85.33.00": "6", "85.4": "6", "85.40": "6", "85.40.1": "6", "85.40.10": "6", "85.40.2": "6", "85.40.20": "6", "85.5": "6", "85.51": "6", "85.51.0": "6", "85.51.01": "6", "85.51.09": "6", "85.52": "6", "85.52.0": "6", "85.52.01": "6", "85.52.02": "6", "85.52.09": "6", "85.53": "6", "85.53.0": "6", "85.53.00": "6", "85.59": "6", "85.59.1": "6", "85.59.10": "6", "85.59.2": "6", "85.59.20": "6", "85.59.3": "6", "85.59.30": "6", "85.59.9": "6", "85.59.91": "6", "85.59.99": "6", "85.6": "6", "85.61": "17", "85.61.0": "17", "85.61.00": "17", "85.69": "6", "85.69.0": "6", "85.69.01": "6", "85.69.09": "6", "86.1": "6", "86.10": "6", "86.10.0": "6", "86.10.00": "6", "86.2": "6", "86.21": "6", "86.21.0": "6", "86.21.00": "6", "86.22": "6", "86.22.0": "6", "86.22.01": "6", "86.22.02": "6", "86.22.03": "6", "86.23": "6", "86.23.0": "6", "86.23.00": "6", "86.9": "6", "86.91": "6", "86.91.0": "6", "86.91.01": "6", "86.91.02": "6", "86.92": "6", "86.92.0": "6", "86.92.00": "6", "86.93": "6", "86.93.0": "6", "86.93.00": "6", "86.94": "6", "86.94.0": "6", "86.94.01": "6", "86.94.02": "6", "86.95": "6", "86.95.0": "6", "86.95.00": "6", "86.96": "6", "86.96.0": "6", "86.96.01": "6", "86.96.09": "6", "86.97": "17", "86.97.0": "17", "86.97.00": "17", "86.99": "67", "86.99.0": "67", "86.99.01": "67", "86.99.02": "67", "86.99.03": "67", "86.99.09": "67", "87.1": "6", "87.10": "6", "87.10.0": "6", "87.10.00": "6", "87.2": "6", "87.20": "6", "87.20.0": "6", "87.20.00": "6", "87.3": "6", "87.30": "6", "87.30.0": "6", "87.30.00": "6", "87.9": "6", "87.91": "17", "87.91.0": "17", "87.91.00": "17", "87.99": "6", "87.99.0": "6", "87.99.00": "6", "88.1": "6", "88.10": "6", "88.10.0": "6", "88.10.00": "6", "88.9": "6", "88.91": "6", "88.91.0": "6", "88.91.00": "6", "88.99": "6", "88.99.0": "6", "88.99.01": "6", "88.99.02": "6", "88.99.03": "6", "88.99.04": "6", "88.99.09": "6", "90.1": "7", "90.11": "7", "90.11.0": "7", "90.11.01": "7", "90.11.02": "7", "90.11.09": "7", "90.12": "7", "90.12.0": "7", "90.12.00": "7", "90.13": "7", "90.13.0": "7", "90.13.00": "7", "90.2": "7", "90.20": "7", "90.20.0": "7", "90.20.01": "7", "90.20.09": "7", "90.3": "7", "90.31": "7", "90.31.0": "7", "90.31.00": "7", "90.39": "7", "90.39.0": "7", "90.39.01": "7", "90.39.09": "7", "91.1": "7", "91.11": "7", "91.11.0": "7", "91.11.00": "7", "91.12": "7", "91.12.0": "7", "91.12.00": "7", "91.2": "7", "91.21": "7", "91.21.0": "7", "91.21.00": "7", "91.22": "7", "91.22.0": "7", "91.22.00": "7", "91.3": "78", "91.30": "78", "91.30.0": "78", "91.30.01": "78", "91.30.02": "7", "91.30.09": "7", "91.4": "7", "91.41": "7", "91.41.0": "7", "91.41.00": "7", "91.42": "7", "91.42.0": "7", "91.42.00": "7", "92.0": "7", "92.00": "7", "92.00.0": "7", "92.00.01": "7", "92.00.09": "7", "93.1": "7", "93.11": "7", "93.11.1": "7", "93.11.10": "7", "93.11.9": "7", "93.11.90": "7", "93.12": "7", "93.12.0": "7", "93.12.00": "7", "93.13": "7", "93.13.0": "7", "93.13.01": "6", "93.13.09": "7", "93.19": "7", "93.19.1": "7", "93.19.10": "7", "93.19.9": "7", "93.19.91": "7", "93.19.92": "7", "93.19.93": "7", "93.19.99": "7", "93.2": "7", "93.21": "7", "93.21.0": "7", "93.21.00": "7", "93.29": "7", "93.29.1": "7", "93.29.10": "7", "93.29.2": "7", "93.29.20": "7", "93.29.3": "7", "93.29.30": "7", "93.29.9": "7", "93.29.91": "7", "93.29.99": "7", "94.1": "7", "94.11": "7", "94.11.0": "7", "94.11.00": "7", "94.12": "7", "94.12.1": "7", "94.12.10": "7", "94.12.2": "7", "94.12.20": "7", "94.2": "7", "94.20": "7", "94.20.0": "7", "94.20.00": "7", "94.9": "7", "94.91": "7", "94.91.0": "7", "94.91.00": "7", "94.92": "7", "94.92.0": "7", "94.92.00": "7", "94.99": "7", "94.99.1": "7", "94.99.10": "7", "94.99.2": "7", "94.99.20": "7", "94.99.3": "7", "94.99.30": "7", "94.99.4": "7", "94.99.40": "7", "94.99.5": "7", "94.99.50": "7", "94.99.6": "7", "94.99.60": "7", "94.99.9": "7", "94.99.90": "7", "95.1": "7", "95.10": "7", "95.10.1": "7", "95.10.10": "7", "95.10.2": "7", "95.10.21": "7", "95.10.29": "7", "95.2": "7", "95.21": "7", "95.21.0": "7", "95.21.00": "7", "95.22": "7", "95.22.0": "7", "95.22.01": "7", "95.22.02": "7", "95.23": "7", "95.23.0": "7", "95.23.00": "7", "95.24": "7", "95.24.0": "7", "95.24.01": "7", "95.24.09": "7", "95.25": "7", "95.25.0": "7", "95.25.00": "7", "95.29": "7", "95.29.1": "7", "95.29.10": "7", "95.29.2": "7", "95.29.21": "7", "95.29.22": "7", "95.29.3": "7", "95.29.30": "7", "95.29.9": "7", "95.29.91": "7", "95.29.99": "7", "95.3": "1", "95.31": "1", "95.31.1": "1", "95.31.10": "1", "95.31.2": "1", "95.31.20": "1", "95.31.3": "1", "95.31.30": "1", "95.31.9": "1", "95.31.91": "1", "95.31.92": "1", "95.31.99": "1", "95.32": "1", "95.32.0": "1", "95.32.00": "1", "95.4": "17", "95.40": "17", "95.40.0": "17", "95.40.00": "17", "96.1": "7", "96.10": "7", "96.10.1": "7", "96.10.11": "7", "96.10.12": "7", "96.10.2": "7", "96.10.21": "7", "96.10.22": "7", "96.2": "7", "96.21": "7", "96.21.0": "7", "96.21.00": "7", "96.22": "7", "96.22.0": "7", "96.22.01": "7", "96.22.09": "7", "96.23": "7", "96.23.1": "7", "96.23.10": "7", "96.23.9": "7", "96.23.91": "7", "96.23.99": "7", "96.3": "7", "96.30": "7", "96.30.0": "7", "96.30.01": "7", "96.30.02": "7", "96.30.09": "7", "96.4": "17", "96.40": "17", "96.40.0": "17", "96.40.00": "17", "96.9": "7", "96.91": "7", "96.91.0": "7", "96.91.00": "7", "96.99": "7", "96.99.1": "7", "96.99.11": "7", "96.99.12": "7", "96.99.13": "7", "96.99.14": "7", "96.99.19": "7", "96.99.9": "7", "96.99.91": "7", "96.99.92": "7", "96.99.93": "7", "96.99.94": "7", "96.99.99": "7", "97.0": "7", "97.00": "7", "97.00.1": "7", "97.00.10": "7", "97.00.9": "7", "97.00.90": "7", "98.1": "7", "98.10": "7", "98.10.0": "7", "98.10.00": "7", "98.2": "7", "98.20": "7", "98.20.0": "7", "98.20.00": "7", "99.0": "7", "99.00": "7", "99.00.0": "7", "99.00.00": "7" };

  // js/fiscal/ateco.js
  var GRUPPI_PER_DIVISIONE = [
    ["industrie-alimentari-bevande", [10, 11]],
    ["commercio-ingrosso-dettaglio", [45]],
    ["costruzioni-immobiliari", [41, 42, 43, 68]],
    ["alloggio-ristorazione", [55, 56]],
    ["attivita-professionali-sanitarie", [64, 65, 66, 69, 70, 71, 72, 73, 74, 75, 85, 86, 87, 88]],
    ["altre-attivita", [
      1,
      2,
      3,
      5,
      6,
      7,
      8,
      9,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      35,
      36,
      37,
      38,
      39,
      49,
      50,
      51,
      52,
      53,
      58,
      59,
      60,
      61,
      62,
      63,
      77,
      78,
      79,
      80,
      81,
      82,
      84,
      90,
      91,
      92,
      93,
      94,
      95,
      96,
      97,
      98,
      99
    ]]
  ];
  function gruppoAteco(codice) {
    const parti = String(codice).trim().split(".");
    const divisione = Number(parti[0]);
    const gruppo = Number(parti[1]?.slice(0, 1) ?? NaN);
    const sottoGruppo = parti[1] ? Number(parti[1].padEnd(2, "0").slice(0, 2)) : NaN;
    if (!Number.isInteger(divisione)) return null;
    if (divisione === 46) return gruppo === 1 ? "intermediari-commercio" : "commercio-ingrosso-dettaglio";
    if (divisione === 47) {
      if (!parti[1]) return "commercio-ingrosso-dettaglio";
      if (sottoGruppo === 81) return "commercio-ambulante-alimentare";
      if (sottoGruppo >= 82 && sottoGruppo <= 89) return "commercio-ambulante-altri";
      return "commercio-ingrosso-dettaglio";
    }
    const trovato = GRUPPI_PER_DIVISIONE.find(([, divisioni]) => divisioni.includes(divisione));
    return trovato ? trovato[0] : null;
  }
  function coefficienteAteco2025(codice, params2) {
    const indici = ateco2025_default[String(codice).trim()];
    if (!indici) return null;
    const nomi = Object.keys(params2.forfettario.coefficienti);
    const candidati = [...indici].map((i) => ({ gruppo: nomi[Number(i)], coefficiente: params2.forfettario.coefficienti[nomi[Number(i)]] }));
    return { univoco: candidati.length === 1, candidati };
  }

  // js/ui/anagrafica.js
  var ETICHETTE_GRUPPI = {
    "industrie-alimentari-bevande": "Industrie alimentari e bevande",
    "commercio-ingrosso-dettaglio": "Commercio all\u2019ingrosso e al dettaglio",
    "commercio-ambulante-alimentare": "Commercio ambulante di prodotti alimentari e bevande",
    "commercio-ambulante-altri": "Commercio ambulante di altri prodotti",
    "intermediari-commercio": "Intermediari del commercio",
    "alloggio-ristorazione": "Servizi di alloggio e ristorazione",
    "attivita-professionali-sanitarie": "Attivit\xE0 professionali, scientifiche, tecniche, sanitarie, istruzione, finanza e assicurazioni",
    "costruzioni-immobiliari": "Costruzioni e attivit\xE0 immobiliari",
    "altre-attivita": "Altre attivit\xE0 economiche"
  };
  function vistaAnagrafica(ctx) {
    const { archivio: archivio2, cliente: c, params: params2 } = ctx;
    if (!c) return h("div", null, h("h1", null, "Anagrafica"), avviso("attenzione", "Nessun cliente selezionato.", "Creane uno dalla sezione Clienti."));
    const bozza = structuredClone(c);
    const testo2 = (chiave, props = {}) => h("input", { type: "text", valore: bozza[chiave] ?? "", onInput: (e) => {
      bozza[chiave] = e.target.value;
    }, ...props });
    const selPrev = h(
      "select",
      { onChange: (e) => {
        bozza.previdenza.tipo = e.target.value;
        aggiornaPrev();
      } },
      TIPI_PREVIDENZA.map((t) => h("option", { value: t.valore, selected: t.valore === bozza.previdenza.tipo }, t.etichetta))
    );
    const spunta = (etichetta, get, set) => h("label", { classe: "spunta" }, h("input", { type: "checkbox", checked: get(), onChange: (e) => set(e.target.checked) }), etichetta);
    const opzPrev = h("div", { classe: "griglia" });
    function aggiornaPrev() {
      const p = bozza.previdenza;
      opzPrev.replaceChildren();
      if (p.tipo === "gestione-separata") {
        opzPrev.append(spunta("Gi\xE0 pensionato o assicurato presso altra forma obbligatoria (aliquota 24%)", () => p.altraCopertura, (v) => {
          p.altraCopertura = v;
        }));
      } else if (p.tipo === "artigiani" || p.tipo === "commercianti") {
        opzPrev.append(
          spunta("Iscritto dal 1\xB0 gennaio 1996 o successivamente (massimale 122.295 \u20AC)", () => p.iscrittoDal1996, (v) => {
            p.iscrittoDal1996 = v;
          }),
          spunta("Riduzione contributiva del 35% (regime forfettario, su domanda INPS)", () => p.riduzione35, (v) => {
            p.riduzione35 = v;
          })
        );
      } else {
        opzPrev.append(
          campo("Aliquota contributo soggettivo (%)", h("input", { type: "number", step: "0.01", min: "0", max: "100", valore: p.cassa.aliquotaSoggettiva * 100, onInput: (e) => {
            p.cassa.aliquotaSoggettiva = Number(e.target.value) / 100;
          } }), "Dipende dalla cassa di appartenenza."),
          campo("Contributo minimo annuo (\u20AC)", h("input", { type: "number", step: "0.01", min: "0", valore: p.cassa.contributoMinimo, onInput: (e) => {
            p.cassa.contributoMinimo = Number(e.target.value);
          } }))
        );
      }
    }
    aggiornaPrev();
    const listaAteco = h("div");
    function disegnaAteco() {
      listaAteco.replaceChildren();
      if (bozza.ateco.length === 0) listaAteco.append(h("p", { classe: "tenue" }, "Nessun codice ATECO. Aggiungine almeno uno per calcolare il reddito forfettario."));
      bozza.ateco.forEach((v, i) => {
        const info = h("small", { classe: "tenue" }, descrizioneCoeff(v));
        const sel = h(
          "select",
          { onChange: (e) => {
            v.gruppo = e.target.value;
            info.textContent = descrizioneCoeff(v);
          } },
          Object.entries(ETICHETTE_GRUPPI).map(([k, et]) => h("option", { value: k, selected: k === v.gruppo }, `${et} \u2014 ${percentuale(params2.forfettario.coefficienti[k])}`))
        );
        const suggerimento = h("div");
        const cod = h("input", { type: "text", valore: v.codice, placeholder: "es. 62.10.00", onInput: (e) => {
          v.codice = e.target.value.trim();
        } });
        const cerca = h("button", { type: "button", onClick: () => {
          suggerimento.replaceChildren();
          const r2025 = coefficienteAteco2025(v.codice, params2);
          if (r2025?.univoco) {
            v.gruppo = r2025.candidati[0].gruppo;
            sel.value = v.gruppo;
            info.textContent = descrizioneCoeff(v);
            return suggerimento.append(avviso("ok", "Codice ATECO 2025 riconosciuto."));
          }
          if (r2025) return suggerimento.append(avviso("attenzione", "Codice ambiguo.", `Il raccordo ISTAT 2025\u20132022 prevede pi\xF9 gruppi: ${r2025.candidati.map((x) => ETICHETTE_GRUPPI[x.gruppo]).join(" oppure ")}. Scegli il gruppo corretto in base alla visura.`));
          const g = gruppoAteco(v.codice);
          if (g) {
            v.gruppo = g;
            sel.value = g;
            info.textContent = descrizioneCoeff(v);
            return suggerimento.append(avviso("ok", "Codice ATECO 2007/2022 riconosciuto."));
          }
          suggerimento.append(avviso("errore", "Codice non riconosciuto.", "Scegli il gruppo manualmente."));
        } }, "Suggerisci gruppo");
        listaAteco.append(h(
          "div",
          null,
          h(
            "div",
            { classe: "riga-ateco" },
            campo("Codice ATECO", cod),
            campo("Descrizione attivit\xE0", h("input", { type: "text", valore: v.descrizione, onInput: (e) => {
              v.descrizione = e.target.value;
            } })),
            campo("Gruppo di settore e coefficiente", sel),
            h("button", { type: "button", classe: "pericolo", onClick: () => {
              bozza.ateco.splice(i, 1);
              disegnaAteco();
            } }, "Rimuovi")
          ),
          h("div", { classe: "azioni" }, cerca, info),
          suggerimento
        ));
      });
    }
    function descrizioneCoeff(v) {
      const k = params2.forfettario.coefficienti[v.gruppo];
      return k ? `Coefficiente di redditivit\xE0 ${percentuale(k)}` : "";
    }
    disegnaAteco();
    const esitoStartup = h("div");
    const chkStartup = h("input", { type: "checkbox", checked: bozza.startup, onChange: (e) => {
      bozza.startup = e.target.checked;
    } });
    const datiStartup = { attivitaNeiTreAnniPrecedenti: false, prosecuzioneAltraAttivita: false, proseguitaAttivitaAltroSoggetto: false, ricaviAttivitaRilevata: 0 };
    const verStartup = h("button", { type: "button", onClick: () => {
      const r = verificaRequisitiStartup(datiStartup);
      esitoStartup.replaceChildren(
        r.ammesso ? avviso("ok", "Requisiti soddisfatti.", "Puoi applicare l\u2019aliquota del 5% per l\u2019anno di inizio e i quattro successivi.") : avviso("errore", "Requisiti non soddisfatti.", "Si applica l\u2019aliquota del 15%.")
      );
      chkStartup.checked = bozza.startup = r.ammesso;
    } }, "Verifica requisiti");
    const chk = (et, k) => h("label", { classe: "spunta" }, h("input", { type: "checkbox", onChange: (e) => {
      datiStartup[k] = e.target.checked;
    } }), et);
    const esito = h("div");
    if (ctx.stato.flash) {
      esito.append(avviso("ok", ctx.stato.flash));
      ctx.stato.flash = null;
    }
    const form = h(
      "form",
      { onSubmit: async (e) => {
        e.preventDefault();
        await archivio2.modifica((d) => {
          Object.assign(d.clienti.find((x) => x.id === c.id), bozza);
        });
        ctx.stato.flash = "Anagrafica salvata.";
        ctx.aggiorna();
      } },
      h(
        "div",
        { classe: "scheda" },
        h("h2", null, "Dati del contribuente"),
        h(
          "div",
          { classe: "griglia" },
          campo("Nome o ragione sociale", testo2("nome", { required: true })),
          campo("Codice fiscale", testo2("codiceFiscale", { maxlength: "16", autocapitalize: "characters" })),
          campo("Partita IVA", testo2("partitaIva", { maxlength: "11", inputmode: "numeric" })),
          campo("Anno di inizio attivit\xE0", h("input", { type: "number", min: "1950", max: "2100", valore: bozza.annoInizioAttivita, onInput: (e) => {
            bozza.annoInizioAttivita = Number(e.target.value);
          } }))
        )
      ),
      h(
        "div",
        { classe: "scheda" },
        h("h2", null, "Previdenza"),
        campo("Gestione previdenziale", selPrev),
        opzPrev
      ),
      h(
        "div",
        { classe: "scheda" },
        h("h2", null, "Codici ATECO e coefficiente di redditivit\xE0"),
        h("p", { classe: "tenue" }, "Accetta codici ATECO 2025 (tramite il raccordo ISTAT con l\u2019ATECO 2022) e codici 2007/2022."),
        listaAteco,
        h("div", { classe: "azioni" }, h("button", { type: "button", onClick: () => {
          bozza.ateco.push(nuovaVoceAteco());
          disegnaAteco();
        } }, "Aggiungi codice ATECO"))
      ),
      h(
        "div",
        { classe: "scheda" },
        h("h2", null, "Aliquota imposta sostitutiva"),
        h("label", { classe: "spunta" }, chkStartup, "Applica l\u2019aliquota del 5% (nuova attivit\xE0, primi 5 anni)"),
        h(
          "details",
          null,
          h("summary", null, "Verifica guidata dei requisiti (art. 1 c. 65 L. 190/2014)"),
          chk("Ho esercitato attivit\xE0 artistica, professionale o d\u2019impresa nei 3 anni precedenti", "attivitaNeiTreAnniPrecedenti"),
          chk("L\u2019attivit\xE0 \xE8 mera prosecuzione di precedente lavoro dipendente o autonomo", "prosecuzioneAltraAttivita"),
          chk("Proseguo un\u2019attivit\xE0 svolta da altro soggetto", "proseguitaAttivitaAltroSoggetto"),
          h("div", { classe: "azioni" }, verStartup),
          esitoStartup
        )
      ),
      h("div", { classe: "scheda" }, h(
        "div",
        { classe: "campo" },
        h("label", { for: "note" }, "Note"),
        h("textarea", { id: "note", rows: "3", onInput: (e) => {
          bozza.note = e.target.value;
        } }, bozza.note)
      )),
      esito,
      h("div", { classe: "azioni" }, h("button", { type: "submit", classe: "primario" }, "Salva anagrafica"))
    );
    return h("div", null, h("h1", null, "Anagrafica"), h("p", { classe: "tenue" }, c.nome || "Nuovo cliente"), form);
  }

  // js/export/csv.js
  var cella = (v) => {
    if (v === null || v === void 0) return "";
    const s = typeof v === "number" ? v.toFixed(2).replace(".", ",") : String(v);
    const sicura = typeof v === "string" && /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
    return /[;"\n\r]/.test(sicura) ? `"${sicura.replace(/"/g, '""')}"` : sicura;
  };
  function generaCsv(intestazioni, righe) {
    return "\uFEFF" + [intestazioni, ...righe].map((r) => r.map(cella).join(";")).join("\r\n") + "\r\n";
  }
  var dataIt2 = (iso2) => iso2 ? iso2.split("-").reverse().join("/") : "";
  function csvFatture(fatture) {
    return generaCsv(
      ["Numero", "Data", "Controparte", "Importo", "Data incasso", "Bollo", "ATECO"],
      fatture.map((f) => [f.numero, dataIt2(f.data), f.controparte, f.importo, dataIt2(f.dataIncasso), f.bollo || 0, f.atecoCodice])
    );
  }
  function csvScadenzario(voci) {
    return generaCsv(
      ["Scadenza", "Descrizione", "Importo", "Codice tributo F24", "Anno di riferimento", "Note"],
      voci.map((v) => [dataIt2(v.data), v.descrizione, v.importo, v.codiceTributo ?? "", v.annoRiferimento ?? "", v.nota ?? ""])
    );
  }
  function csvConfronto(confronto) {
    const f = confronto.forfettario, o = confronto.ordinario;
    return generaCsv(["Voce", "Forfettario", "Ordinario"], [
      ["Ricavi", f.ricavi, o.ricavi],
      ["Costi reali", o.costi, o.costi],
      ["Reddito", f.redditoLordo, o.redditoProfessionale],
      ["Contributi previdenziali", f.contributi.totale, o.contributi.totale],
      ["Imponibile", f.imponibile, o.imponibile],
      ["Imposta (sostitutiva / IRPEF netta)", f.imposta, o.irpef],
      ["Addizionali", 0, o.addizionali],
      ["IRAP", 0, o.irap],
      ["Totale imposte e contributi", f.totaleCarico, o.totaleCarico],
      ["Netto disponibile", f.netto, o.netto]
    ]);
  }

  // js/import/csv.js
  function parseCsv(testo2) {
    const t = testo2.replace(/^﻿/, "");
    const primaRiga = t.split(/\r?\n/, 1)[0] ?? "";
    const sep = (primaRiga.match(/;/g)?.length ?? 0) >= (primaRiga.match(/,/g)?.length ?? 0) ? ";" : ",";
    const righe = [];
    let riga2 = [], campo2 = "", tra = false;
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      if (tra) {
        if (c === '"' && t[i + 1] === '"') {
          campo2 += '"';
          i++;
        } else if (c === '"') tra = false;
        else campo2 += c;
      } else if (c === '"') tra = true;
      else if (c === sep) {
        riga2.push(campo2);
        campo2 = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && t[i + 1] === "\n") i++;
        riga2.push(campo2);
        campo2 = "";
        if (riga2.some((x) => x.trim() !== "")) righe.push(riga2);
        riga2 = [];
      } else campo2 += c;
    }
    riga2.push(campo2);
    if (riga2.some((x) => x.trim() !== "")) righe.push(riga2);
    return righe;
  }
  function parseImporto(s) {
    let v = String(s ?? "").trim().replace(/[€\s]/g, "");
    if (v === "") return NaN;
    if (v.includes(",")) v = v.replace(/\./g, "").replace(",", ".");
    else if ((v.match(/\./g) ?? []).length > 1) v = v.replace(/\./g, "");
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
  }
  function parseData(s) {
    const v = String(s ?? "").trim();
    let m = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
    let a, me, g;
    if (m) [, a, me, g] = m;
    else if (m = v.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/)) [, g, me, a] = m;
    else return null;
    const d = new Date(Date.UTC(+a, +me - 1, +g));
    if (d.getUTCFullYear() !== +a || d.getUTCMonth() !== +me - 1 || d.getUTCDate() !== +g) return null;
    return `${a}-${String(me).padStart(2, "0")}-${String(g).padStart(2, "0")}`;
  }
  var ALIAS = {
    numero: ["numero", "n", "n.", "fattura", "numero fattura"],
    data: ["data", "data fattura", "data emissione"],
    controparte: ["cliente", "controparte", "denominazione", "descrizione", "committente"],
    importo: ["importo", "totale", "imponibile", "compenso", "ricavo"],
    dataIncasso: ["incasso", "data incasso", "dataincasso", "data_incasso", "pagamento", "data pagamento"],
    ateco: ["ateco", "codice ateco"]
  };
  function fattureDaCsv(testo2) {
    const righe = parseCsv(testo2);
    if (righe.length < 2) return { fatture: [], errori: [{ riga: 1, messaggio: "File vuoto o senza righe di dati" }] };
    const intest = righe[0].map((x) => x.trim().toLowerCase());
    const col = {};
    for (const [campo2, nomi] of Object.entries(ALIAS)) col[campo2] = intest.findIndex((h2) => nomi.includes(h2));
    const mancanti = ["data", "importo"].filter((c) => col[c] < 0);
    if (mancanti.length) return { fatture: [], errori: [{ riga: 1, messaggio: `Colonne obbligatorie mancanti: ${mancanti.join(", ")}` }] };
    const fatture = [], errori = [];
    righe.slice(1).forEach((r, i) => {
      const n = i + 2;
      const data = parseData(r[col.data]);
      const importo = parseImporto(r[col.importo]);
      const incassoGrezzo = col.dataIncasso >= 0 ? (r[col.dataIncasso] ?? "").trim() : "";
      const dataIncasso = incassoGrezzo ? parseData(incassoGrezzo) : "";
      if (!data) return errori.push({ riga: n, messaggio: `Data non valida: "${r[col.data] ?? ""}"` });
      if (Number.isNaN(importo)) return errori.push({ riga: n, messaggio: `Importo non valido: "${r[col.importo] ?? ""}"` });
      if (dataIncasso === null) return errori.push({ riga: n, messaggio: `Data incasso non valida: "${incassoGrezzo}"` });
      fatture.push({
        numero: col.numero >= 0 ? (r[col.numero] ?? "").trim() : "",
        data,
        controparte: col.controparte >= 0 ? (r[col.controparte] ?? "").trim() : "",
        importo,
        dataIncasso,
        atecoCodice: col.ateco >= 0 ? (r[col.ateco] ?? "").trim() : ""
      });
    });
    return { fatture, errori };
  }

  // js/import/fatturapa.js
  var decodifica = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
  function senzaNamespace(xml) {
    return xml.replace(/<(\/?)[A-Za-z0-9_.-]+:/g, "<$1");
  }
  function primo(blocco, tag) {
    const m = blocco.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
    return m ? decodifica(m[1].trim()) : "";
  }
  function tutti(blocco, tag) {
    return [...blocco.matchAll(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "g"))].map((m) => decodifica(m[1].trim()));
  }
  function fattureDaXml(xmlGrezzo, nomeFile = "") {
    const xml = senzaNamespace(xmlGrezzo);
    const corpi = [...xml.matchAll(/<FatturaElettronicaBody(?:\s[^>]*)?>([\s\S]*?)<\/FatturaElettronicaBody>/g)].map((m) => m[1]);
    if (corpi.length === 0) return { fatture: [], errori: [`${nomeFile || "File"}: non \xE8 una FatturaPA valida`] };
    const cessionario = primo(xml, "CessionarioCommittente");
    const controparte = primo(cessionario, "Denominazione") || [primo(cessionario, "Nome"), primo(cessionario, "Cognome")].filter(Boolean).join(" ");
    const fatture = [], errori = [];
    for (const corpo of corpi) {
      const generali = primo(corpo, "DatiGeneraliDocumento");
      const data = primo(generali, "Data");
      const numero = primo(generali, "Numero");
      const tipo = primo(generali, "TipoDocumento");
      const imponibili = tutti(primo(corpo, "DatiBeniServizi"), "ImponibileImporto").map(Number);
      let importo = imponibili.length ? imponibili.reduce((a, b) => a + b, 0) : Number(primo(generali, "ImportoTotaleDocumento"));
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data) || !Number.isFinite(importo)) {
        errori.push(`${nomeFile || "File"} n. ${numero || "?"}: data o importo non leggibili`);
        continue;
      }
      if (tipo === "TD04") importo = -Math.abs(importo);
      fatture.push({
        numero,
        data,
        controparte,
        importo: Math.round(importo * 100) / 100,
        dataIncasso: "",
        atecoCodice: "",
        bollo: primo(generali, "BolloVirtuale") === "SI" ? Number(primo(generali, "ImportoBollo")) || 2 : 0,
        tipoDocumento: tipo
      });
    }
    return { fatture, errori };
  }

  // js/ui/fatture.js
  function vistaFatture(ctx) {
    const { archivio: archivio2, dati, cliente: c, params: params2 } = ctx;
    if (!c) return h("div", null, h("h1", null, "Fatture"), avviso("attenzione", "Nessun cliente selezionato."));
    const anni = [...new Set(dati.fatture.filter((f2) => f2.clienteId === c.id).flatMap((f2) => [f2.data, f2.dataIncasso]).filter(Boolean).map((d) => Number(d.slice(0, 4))))].sort();
    const annoCorrente = (/* @__PURE__ */ new Date()).getFullYear();
    if (!anni.includes(annoCorrente)) anni.push(annoCorrente);
    const filtro = ctx.stato.annoFatture ?? annoCorrente;
    const lista = dati.fatture.filter((f2) => f2.clienteId === c.id && (f2.data.startsWith(String(filtro)) || (f2.dataIncasso || "").startsWith(String(filtro)))).sort((a, b) => b.data.localeCompare(a.data));
    const incassato = round2(lista.filter((f2) => (f2.dataIncasso || "").startsWith(String(filtro))).reduce((s, f2) => s + f2.importo, 0));
    const daIncassare = round2(lista.filter((f2) => !f2.dataIncasso).reduce((s, f2) => s + f2.importo, 0));
    const f = ctx.stato.fatturaInModifica ? structuredClone(dati.fatture.find((x) => x.id === ctx.stato.fatturaInModifica)) : nuovaFattura(c.id);
    const inModifica = Boolean(ctx.stato.fatturaInModifica && f);
    const esitoForm = h("div");
    const bollo = h("input", { type: "number", step: "0.01", min: "0", valore: f.bollo, onInput: (e) => {
      f.bollo = Number(e.target.value);
    } });
    const importo = h("input", { type: "number", step: "0.01", required: true, valore: f.importo || "", onInput: (e) => {
      f.importo = Number(e.target.value);
      if (!inModifica || !f.bollo) {
        f.bollo = bolloDovuto(f.importo, params2);
        bollo.value = f.bollo;
      }
    } });
    const selAteco = h(
      "select",
      { onChange: (e) => {
        f.atecoCodice = e.target.value;
      } },
      h("option", { value: "" }, c.ateco.length ? "Prima voce ATECO (predefinita)" : "Nessun codice ATECO"),
      c.ateco.filter((v) => v.codice).map((v) => h("option", { value: v.codice, selected: v.codice === f.atecoCodice }, `${v.codice} ${v.descrizione}`))
    );
    const form = h(
      "form",
      { onSubmit: async (e) => {
        e.preventDefault();
        if (f.dataIncasso && f.dataIncasso < f.data) return esitoForm.replaceChildren(avviso("errore", "La data di incasso non pu\xF2 precedere la data della fattura."));
        await archivio2.modifica((d) => {
          const i = d.fatture.findIndex((x) => x.id === f.id);
          if (i >= 0) d.fatture[i] = f;
          else d.fatture.push(f);
        });
        ctx.stato.fatturaInModifica = null;
        ctx.aggiorna();
      } },
      h(
        "div",
        { classe: "griglia" },
        campo("Numero", h("input", { type: "text", valore: f.numero, onInput: (e) => {
          f.numero = e.target.value;
        } })),
        campo("Data fattura", h("input", { type: "date", required: true, valore: f.data, onInput: (e) => {
          f.data = e.target.value;
        } })),
        campo("Cliente (controparte)", h("input", { type: "text", valore: f.controparte, onInput: (e) => {
          f.controparte = e.target.value;
        } })),
        campo("Importo imponibile (\u20AC)", importo),
        campo("Data incasso", h("input", { type: "date", valore: f.dataIncasso, onInput: (e) => {
          f.dataIncasso = e.target.value;
        } }), "Il ricavo conta nell\u2019anno di incasso (criterio di cassa)."),
        campo("Bollo (\u20AC)", bollo, "Dovuto sopra 77,47 \u20AC."),
        campo("Attivit\xE0 (ATECO)", selAteco)
      ),
      esitoForm,
      h(
        "div",
        { classe: "azioni" },
        h("button", { type: "submit", classe: "primario" }, inModifica ? "Salva modifiche" : "Aggiungi fattura"),
        inModifica ? h("button", { type: "button", onClick: () => {
          ctx.stato.fatturaInModifica = null;
          ctx.aggiorna();
        } }, "Annulla") : null
      )
    );
    const areaImport = h("div");
    async function importa(origine) {
      const files = await selezionaFile(origine === "csv" ? ".csv,text/csv,text/plain" : ".xml,text/xml,application/xml", origine === "xml");
      if (!files.length) return;
      const fatture = [], errori = [];
      for (const file of files) {
        const testo2 = await file.text();
        if (origine === "csv") {
          const r = fattureDaCsv(testo2);
          fatture.push(...r.fatture);
          errori.push(...r.errori.map((x) => `Riga ${x.riga}: ${x.messaggio}`));
        } else {
          const r = fattureDaXml(testo2, file.name);
          fatture.push(...r.fatture);
          errori.push(...r.errori);
        }
      }
      const esistenti = new Set(dati.fatture.filter((x) => x.clienteId === c.id).map((x) => `${x.numero}|${x.data}|${x.importo}`));
      const nuove = fatture.filter((x) => !esistenti.has(`${x.numero}|${x.data}|${x.importo}`));
      const duplicate = fatture.length - nuove.length;
      areaImport.replaceChildren(
        h(
          "div",
          { classe: "scheda" },
          h("h2", null, "Anteprima importazione"),
          avviso(nuove.length ? "ok" : "attenzione", `${nuove.length} fatture da importare.`, duplicate ? `${duplicate} gi\xE0 presenti (stessi numero, data e importo) verranno ignorate.` : ""),
          errori.length ? avviso("errore", `${errori.length} righe scartate:`, errori.slice(0, 8).join(" \xB7 ") + (errori.length > 8 ? " \u2026" : "")) : null,
          origine === "xml" ? h("p", { classe: "tenue" }, "Le fatture XML non riportano la data di incasso: inseriscila dopo l\u2019importazione.") : null,
          h(
            "div",
            { classe: "azioni" },
            h("button", { classe: "primario", disabled: nuove.length === 0, onClick: async () => {
              await archivio2.modifica((d) => {
                for (const n of nuove) {
                  const rec = { ...nuovaFattura(c.id), ...n };
                  if (!n.bollo && n.bollo !== 0) rec.bollo = bolloDovuto(n.importo, params2);
                  d.fatture.push(rec);
                }
              });
              areaImport.replaceChildren();
              ctx.aggiorna();
            } }, "Importa"),
            h("button", { onClick: () => areaImport.replaceChildren() }, "Annulla")
          )
        )
      );
    }
    const righe = lista.map((x) => h(
      "tr",
      null,
      h("td", null, x.numero),
      h("td", null, dataIt(x.data)),
      h("td", null, x.controparte),
      h("td", { classe: "numero" }, euro(x.importo)),
      h("td", null, x.dataIncasso ? dataIt(x.dataIncasso) : h("span", { classe: "tenue" }, "da incassare")),
      h("td", { classe: "numero" }, x.bollo ? euro(x.bollo) : ""),
      h("td", null, x.atecoCodice),
      h("td", null, h(
        "div",
        { classe: "azioni" },
        h("button", { onClick: () => {
          ctx.stato.fatturaInModifica = x.id;
          ctx.aggiorna();
        } }, "Modifica"),
        h("button", { classe: "pericolo", onClick: async () => {
          if (confirm("Eliminare la fattura?")) await archivio2.modifica((d) => {
            d.fatture = d.fatture.filter((y) => y.id !== x.id);
          });
        } }, "Elimina")
      ))
    ));
    return h(
      "div",
      null,
      h("h1", null, "Fatture emesse"),
      h("p", { classe: "tenue" }, c.nome),
      h(
        "div",
        { classe: "statistiche" },
        h("div", { classe: "statistica" }, h("div", { classe: "valore" }, euro(incassato)), h("div", { classe: "etichetta" }, `Incassato nel ${filtro}`)),
        h("div", { classe: "statistica" }, h("div", { classe: "valore" }, euro(daIncassare)), h("div", { classe: "etichetta" }, "Da incassare"))
      ),
      h("div", { classe: "scheda" }, h("h2", null, inModifica ? "Modifica fattura" : "Nuova fattura"), form),
      h(
        "div",
        { classe: "scheda" },
        h(
          "div",
          { classe: "azioni" },
          h("strong", null, "Importa:"),
          h("button", { onClick: () => importa("csv") }, "File CSV"),
          h("button", { onClick: () => importa("xml") }, "XML FatturaPA"),
          h("span", { classe: "tenue" }, "CSV: colonne data, importo (obbligatorie), numero, cliente, data incasso, ateco."),
          h("strong", null, "Esporta:"),
          h("button", { onClick: () => scarica(`fatture-${c.nome.replace(/[^\w-]+/g, "_")}-${filtro}.csv`, csvFatture(lista), "text/csv;charset=utf-8") }, `CSV ${filtro}`)
        ),
        areaImport
      ),
      h(
        "div",
        { classe: "scheda" },
        h(
          "div",
          { classe: "azioni" },
          campo("Anno", h("select", { onChange: (e) => {
            ctx.stato.annoFatture = Number(e.target.value);
            ctx.aggiorna();
          } }, anni.map((a) => h("option", { value: a, selected: a === filtro }, a))))
        ),
        lista.length === 0 ? h("div", { classe: "vuoto" }, `Nessuna fattura per il ${filtro}.`) : h("div", { classe: "tabella-contenitore" }, h(
          "table",
          null,
          h("thead", null, h("tr", null, ["N.", "Data", "Controparte"].map((t) => h("th", null, t)), h("th", { classe: "numero" }, "Importo"), h("th", null, "Incasso"), h("th", { classe: "numero" }, "Bollo"), h("th", null, "ATECO"), h("th", null, ""))),
          h("tbody", null, righe)
        ))
      )
    );
  }

  // js/ui/spese.js
  function vistaSpese(ctx) {
    const { archivio: archivio2, dati, cliente: c } = ctx;
    if (!c) return h("div", null, h("h1", null, "Spese"), avviso("attenzione", "Nessun cliente selezionato."));
    const s = nuovaSpesa(c.id);
    const anno2 = ctx.stato.annoSpese ?? (/* @__PURE__ */ new Date()).getFullYear();
    const lista = dati.spese.filter((x) => x.clienteId === c.id && x.data.startsWith(String(anno2))).sort((a, b) => b.data.localeCompare(a.data));
    const totale = round2(lista.reduce((t, x) => t + x.importo, 0));
    const form = h(
      "form",
      { onSubmit: async (e) => {
        e.preventDefault();
        await archivio2.modifica((d) => d.spese.push(s));
      } },
      h(
        "div",
        { classe: "griglia" },
        campo("Data", h("input", { type: "date", required: true, onInput: (e) => {
          s.data = e.target.value;
        } })),
        campo("Descrizione", h("input", { type: "text", required: true, onInput: (e) => {
          s.descrizione = e.target.value;
        } })),
        campo("Categoria", h("input", { type: "text", onInput: (e) => {
          s.categoria = e.target.value;
        } })),
        campo("Importo (\u20AC)", h("input", { type: "number", step: "0.01", required: true, onInput: (e) => {
          s.importo = Number(e.target.value);
        } }))
      ),
      h("div", { classe: "azioni" }, h("button", { type: "submit", classe: "primario" }, "Aggiungi spesa"))
    );
    return h(
      "div",
      null,
      h("h1", null, "Spese"),
      h("p", { classe: "tenue" }, "Nel regime forfettario i costi non sono deducibili: servono per confrontare la convenienza con il regime ordinario."),
      h("div", { classe: "scheda" }, h("h2", null, "Nuova spesa"), form),
      h(
        "div",
        { classe: "scheda" },
        campo("Anno", h("input", { type: "number", min: "2000", max: "2100", valore: anno2, onChange: (e) => {
          ctx.stato.annoSpese = Number(e.target.value);
          ctx.aggiorna();
        } })),
        lista.length === 0 ? h("div", { classe: "vuoto" }, `Nessuna spesa per il ${anno2}.`) : h("div", { classe: "tabella-contenitore" }, h(
          "table",
          null,
          h("thead", null, h("tr", null, h("th", null, "Data"), h("th", null, "Descrizione"), h("th", null, "Categoria"), h("th", { classe: "numero" }, "Importo"), h("th", null, ""))),
          h("tbody", null, lista.map((x) => h(
            "tr",
            null,
            h("td", null, dataIt(x.data)),
            h("td", null, x.descrizione),
            h("td", null, x.categoria),
            h("td", { classe: "numero" }, euro(x.importo)),
            h("td", null, h("button", { classe: "pericolo", onClick: async () => {
              if (confirm("Eliminare la spesa?")) await archivio2.modifica((d) => {
                d.spese = d.spese.filter((y) => y.id !== x.id);
              });
            } }, "Elimina"))
          ))),
          h("tfoot", null, h("tr", null, h("td", { colspan: "3" }, "Totale"), h("td", { classe: "numero" }, euro(totale)), h("td")))
        ))
      )
    );
  }

  // js/domain/serie.js
  var MESI = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
  function incassiMensili(fatture, clienteId, anno2) {
    const mesi = Array(12).fill(0);
    for (const f of fattureIncassateNellAnno(fatture, clienteId, anno2)) mesi[Number(f.dataIncasso.slice(5, 7)) - 1] += f.importo;
    return mesi.map(round2);
  }
  function cumulato(valori) {
    let t = 0;
    return valori.map((v) => t = round2(t + v));
  }

  // js/ui/grafici.js
  var NS = "http://www.w3.org/2000/svg";
  var svg = (tag, attrs = {}, ...figli) => {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) if (v !== null && v !== void 0) el.setAttribute(k === "classe" ? "class" : k, v);
    el.append(...figli.flat().filter((f) => f !== null && f !== void 0));
    return el;
  };
  var testo = (x, y, t, attrs = {}) => {
    const el = svg("text", { x, y, ...attrs });
    el.textContent = t;
    return el;
  };
  var L = 520;
  var A = 250;
  var M = { sx: 64, dx: 16, su: 16, giu: 32 };
  var w = L - M.sx - M.dx;
  var hh = A - M.su - M.giu;
  function scalaY(massimo) {
    const grezzo = massimo > 0 ? massimo : 1;
    const mag = 10 ** Math.floor(Math.log10(grezzo));
    const passo = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((p) => grezzo / p <= 5) ?? mag * 10;
    const cima = Math.ceil(grezzo / passo) * passo;
    return { cima, passo };
  }
  var compatto = (n) => Math.abs(n) >= 1e3 ? `${(n / 1e3).toLocaleString("it-IT", { maximumFractionDigits: 1 })}k` : String(Math.round(n));
  function tooltipBase(figura) {
    const tip = h("div", { classe: "tooltip", role: "status", hidden: true });
    figura.append(tip);
    const mostra = (clientX, clientY, righe) => {
      tip.replaceChildren(...righe);
      tip.hidden = false;
      const r = figura.getBoundingClientRect();
      const x = Math.min(clientX - r.left + 12, r.width - tip.offsetWidth - 4);
      tip.style.left = `${Math.max(4, x)}px`;
      tip.style.top = `${Math.max(4, clientY - r.top - tip.offsetHeight - 10)}px`;
    };
    return { tip, mostra, nascondi: () => {
      tip.hidden = true;
    } };
  }
  function assiEGriglia(cima, passo, formatoY) {
    const g = svg("g");
    for (let v = 0; v <= cima + 1e-9; v += passo) {
      const y = M.su + hh - v / cima * hh;
      g.append(svg("line", { x1: M.sx, x2: L - M.dx, y1: y, y2: y, classe: v === 0 ? "asse" : "griglia" }));
      g.append(testo(M.sx - 8, y + 4, formatoY(v), { classe: "tick", "text-anchor": "end" }));
    }
    return g;
  }
  function tabella(intestazioni, righe) {
    return h(
      "details",
      { classe: "vista-tabella" },
      h("summary", null, "Mostra come tabella"),
      h("div", { classe: "tabella-contenitore" }, h(
        "table",
        null,
        h("thead", null, h("tr", null, intestazioni.map((t, i) => h("th", { classe: i ? "numero" : null }, t)))),
        h("tbody", null, righe.map((r) => h("tr", null, r.map((c, i) => h("td", { classe: i ? "numero" : null }, c)))))
      ))
    );
  }
  function graficoColonne({ titolo, descrizione, categorie, valori, formato = euro }) {
    const { cima, passo } = scalaY(Math.max(...valori, 0));
    const slot = w / valori.length;
    const spessore = Math.min(24, slot * 0.6);
    const figura = h("figure", { classe: "grafico" });
    const { mostra, nascondi } = tooltipBase(figura);
    const lienzo = svg("svg", { viewBox: `0 0 ${L} ${A}`, role: "img", "aria-label": `${titolo}. ${descrizione ?? ""}` }, assiEGriglia(cima, passo, compatto));
    valori.forEach((v, i) => {
      const x = M.sx + slot * i + (slot - spessore) / 2;
      const alt = v / cima * hh;
      const y = M.su + hh - alt;
      const r = Math.min(4, alt, spessore / 2);
      const d = alt > 0 ? `M${x},${y + alt} V${y + r} Q${x},${y} ${x + r},${y} H${x + spessore - r} Q${x + spessore},${y} ${x + spessore},${y + r} V${y + alt} Z` : "";
      const colonna = svg("path", { d, classe: "colonna" });
      const area = svg("rect", { x: M.sx + slot * i, y: M.su, width: slot, height: hh, classe: "bersaglio", tabindex: "0", "aria-label": `${categorie[i]}: ${formato(v)}` });
      const riga2 = () => [h("div", { classe: "tip-valore" }, formato(v)), h("div", { classe: "tip-etichetta" }, categorie[i])];
      const attiva = (e) => {
        colonna.classList.add("attiva");
        const b = e.target.getBoundingClientRect();
        mostra(e.clientX || b.left + b.width / 2, e.clientY || b.top, riga2());
      };
      area.addEventListener("pointermove", attiva);
      area.addEventListener("focus", attiva);
      area.addEventListener("pointerleave", () => {
        colonna.classList.remove("attiva");
        nascondi();
      });
      area.addEventListener("blur", () => {
        colonna.classList.remove("attiva");
        nascondi();
      });
      lienzo.append(colonna, area, testo(M.sx + slot * i + slot / 2, A - 10, categorie[i], { classe: "tick", "text-anchor": "middle" }));
    });
    figura.prepend(h("figcaption", null, h("strong", null, titolo), descrizione ? h("div", { classe: "tenue" }, descrizione) : null), lienzo);
    figura.append(tabella(["Periodo", "Valore"], categorie.map((c, i) => [c, formato(valori[i])])));
    return figura;
  }
  function graficoLinee({ titolo, descrizione, x, serie, formatoX = (n) => String(n), formatoY = euro, riferimentoY, riferimentoX, titoloX = "" }) {
    const tutti2 = serie.flatMap((s) => s.valori).concat(riferimentoY ? [riferimentoY.valore] : []);
    const min = Math.min(0, ...tutti2), max = Math.max(...tutti2, 0);
    const { cima, passo } = scalaY(Math.max(max, -min));
    const base = min < 0 ? -Math.ceil(-min / passo) * passo : 0;
    const campo2 = cima - base;
    const xMin = x[0], xMax = x[x.length - 1];
    const px = (v) => M.sx + (v - xMin) / (xMax - xMin || 1) * w;
    const py = (v) => M.su + hh - (v - base) / campo2 * hh;
    const figura = h("figure", { classe: "grafico" });
    const { mostra, nascondi } = tooltipBase(figura);
    const lienzo = svg("svg", { viewBox: `0 0 ${L} ${A}`, role: "img", "aria-label": `${titolo}. ${descrizione ?? ""}` });
    for (let v = base; v <= cima + 1e-9; v += passo) {
      lienzo.append(svg("line", { x1: M.sx, x2: L - M.dx, y1: py(v), y2: py(v), classe: v === 0 ? "asse" : "griglia" }), testo(M.sx - 8, py(v) + 4, compatto(v), { classe: "tick", "text-anchor": "end" }));
    }
    const passiX = Math.min(x.length - 1, 5);
    for (let i = 0; i <= passiX; i++) {
      const v = xMin + (xMax - xMin) * i / passiX;
      lienzo.append(testo(px(v), A - 10, formatoX(v), { classe: "tick", "text-anchor": i === 0 ? "start" : i === passiX ? "end" : "middle" }));
    }
    if (riferimentoY) {
      lienzo.append(
        svg("line", { x1: M.sx, x2: L - M.dx, y1: py(riferimentoY.valore), y2: py(riferimentoY.valore), classe: "riferimento" }),
        testo(L - M.dx - 4, py(riferimentoY.valore) - 5, riferimentoY.etichetta, { classe: "etichetta-rif", "text-anchor": "end" })
      );
    }
    if (riferimentoX && riferimentoX.valore >= xMin && riferimentoX.valore <= xMax) {
      lienzo.append(
        svg("line", { x1: px(riferimentoX.valore), x2: px(riferimentoX.valore), y1: M.su, y2: M.su + hh, classe: "riferimento" }),
        testo(px(riferimentoX.valore) + 4, M.su + 12, riferimentoX.etichetta, { classe: "etichetta-rif" })
      );
    }
    for (const s of serie) {
      lienzo.append(svg("path", { d: s.valori.map((v, i) => `${i ? "L" : "M"}${px(x[i])},${py(v)}`).join(" "), classe: "linea", style: `stroke: var(${s.colore})` }));
      const u = s.valori.length - 1;
      lienzo.append(svg("circle", { cx: px(x[u]), cy: py(s.valori[u]), r: 4, classe: "punto", style: `fill: var(${s.colore})` }));
    }
    const guida = svg("line", { classe: "guida", y1: M.su, y2: M.su + hh, hidden: "hidden" });
    const area = svg("rect", { x: M.sx, y: M.su, width: w, height: hh, classe: "bersaglio", tabindex: "0", "aria-label": `${titolo}: usa le frecce per scorrere i punti` });
    let corrente = 0;
    const vai = (i, clientX, clientY) => {
      corrente = Math.max(0, Math.min(x.length - 1, i));
      guida.removeAttribute("hidden");
      guida.setAttribute("x1", px(x[corrente]));
      guida.setAttribute("x2", px(x[corrente]));
      const r = area.getBoundingClientRect();
      mostra(clientX ?? r.left + px(x[corrente]) / L * r.width, clientY ?? r.top + 20, [
        h("div", { classe: "tip-etichetta" }, titoloX ? `${titoloX}: ${formatoX(x[corrente])}` : formatoX(x[corrente])),
        ...serie.map((s) => h("div", { classe: "tip-riga" }, h("span", { classe: "chiave", style: `background: var(${s.colore})` }), h("span", { classe: "tip-valore" }, formatoY(s.valori[corrente])), h("span", { classe: "tip-etichetta" }, s.nome)))
      ]);
    };
    area.addEventListener("pointermove", (e) => {
      const r = area.getBoundingClientRect();
      const vx = xMin + (e.clientX - r.left) / r.width * (xMax - xMin);
      vai(x.reduce((m, v, i) => Math.abs(v - vx) < Math.abs(x[m] - vx) ? i : m, 0), e.clientX, e.clientY);
    });
    area.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        vai(corrente + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        vai(corrente - 1);
      }
    });
    area.addEventListener("focus", () => vai(corrente));
    const esci = () => {
      guida.setAttribute("hidden", "hidden");
      nascondi();
    };
    area.addEventListener("pointerleave", esci);
    area.addEventListener("blur", esci);
    lienzo.append(guida, area);
    const legenda = serie.length > 1 ? h("ul", { classe: "legenda" }, serie.map((s) => h("li", null, h("span", { classe: "chiave", style: `background: var(${s.colore})` }), s.nome))) : null;
    figura.prepend(...[h("figcaption", null, h("strong", null, titolo), descrizione ? h("div", { classe: "tenue" }, descrizione) : null), legenda, lienzo].filter(Boolean));
    figura.append(tabella([titoloX || "x", ...serie.map((s) => s.nome)], x.map((v, i) => [formatoX(v), ...serie.map((s) => formatoY(s.valori[i]))])));
    return figura;
  }

  // js/ui/riepilogo.js
  var MESSAGGI_SOGLIA = {
    ok: ["ok", "Entro la soglia.", ""],
    attenzione: ["attenzione", "Ci si avvicina alla soglia di 85.000 \u20AC.", "Valuta con attenzione i prossimi incassi."],
    "esce-anno-successivo": ["attenzione", "Superati 85.000 \u20AC.", "Il regime forfettario cessa dall\u2019anno successivo."],
    "esce-subito": ["errore", "Superati 100.000 \u20AC.", "Uscita immediata dal regime: l\u2019IVA \xE8 dovuta dalle operazioni che hanno comportato il superamento."]
  };
  function vistaRiepilogo(ctx) {
    const { dati, cliente: c, params: params2 } = ctx;
    if (!c) return h("div", null, h("h1", null, "Riepilogo"), avviso("attenzione", "Nessun cliente selezionato.", "Creane uno dalla sezione Clienti."));
    const anno2 = ctx.stato.annoRiepilogo ?? (/* @__PURE__ */ new Date()).getFullYear();
    const r = riepilogoAnno(c, dati, anno2, params2);
    const [tipo, titolo, testo2] = MESSAGGI_SOGLIA[r.soglie.stato];
    const pct = Math.min(100, r.soglie.percentuale);
    const barra = h("div", { classe: `barra-soglia ${tipo === "ok" ? "" : tipo}`, role: "img", "aria-label": `${r.soglie.percentuale}% della soglia` }, h("span"));
    barra.firstChild.style.width = `${pct}%`;
    const f = r.forfettario;
    const mensili = incassiMensili(dati.fatture, c.id, anno2);
    return h(
      "div",
      null,
      h("div", { classe: "solo-stampa" }, h("strong", null, `${c.nome} \u2014 riepilogo ${anno2}`), h("div", null, `Stampato il ${(/* @__PURE__ */ new Date()).toLocaleDateString("it-IT")}`)),
      h("h1", null, "Riepilogo"),
      h("p", { classe: "tenue" }, c.nome),
      campo("Anno d\u2019imposta", h("input", { type: "number", min: "2000", max: "2100", valore: anno2, onChange: (e) => {
        ctx.stato.annoRiepilogo = Number(e.target.value);
        ctx.aggiorna();
      } })),
      h(
        "div",
        { classe: "statistiche" },
        h("div", { classe: "statistica" }, h("div", { classe: "valore" }, euro(r.ricavi)), h("div", { classe: "etichetta" }, `Ricavi incassati ${anno2}`)),
        h("div", { classe: "statistica" }, h("div", { classe: "valore" }, euro(r.daIncassare)), h("div", { classe: "etichetta" }, "Fatturato da incassare")),
        h("div", { classe: "statistica" }, h("div", { classe: "valore" }, euro(r.spese)), h("div", { classe: "etichetta" }, "Spese registrate")),
        h("div", { classe: "statistica" }, h("div", { classe: "valore" }, percentuale(r.aliquota.aliquota)), h("div", { classe: "etichetta" }, r.aliquota.startup ? `Aliquota startup (fino al ${r.aliquota.annoUltimoStartup})` : "Aliquota imposta sostitutiva"))
      ),
      h(
        "div",
        { classe: "scheda" },
        h("h2", null, "Soglia di ricavi"),
        barra,
        h("div", { classe: "tenue" }, `${euro(r.ricavi)} su 85.000 \u20AC (${r.soglie.percentuale.toLocaleString("it-IT")}%) \u2014 residuo ${euro(r.soglie.residuoSoglia)}`),
        avviso(tipo, titolo, testo2)
      ),
      h(
        "div",
        { classe: "griglia-2" },
        h("div", { classe: "scheda" }, graficoColonne({ titolo: `Incassi mensili ${anno2}`, descrizione: "Ricavi incassati per mese (criterio di cassa)", categorie: MESI, valori: mensili })),
        h("div", { classe: "scheda" }, graficoLinee({
          titolo: `Ricavi cumulati ${anno2}`,
          descrizione: "Andamento rispetto alla soglia di 85.000 \u20AC",
          x: MESI.map((_, i) => i + 1),
          formatoX: (v) => MESI[Math.round(v) - 1] ?? "",
          serie: [{ nome: "Ricavi cumulati", valori: cumulato(mensili), colore: "--serie-1" }],
          riferimentoY: { valore: params2.forfettario.soglie.ricaviEsclusione, etichetta: "Soglia 85.000 \u20AC" }
        }))
      ),
      h(
        "div",
        { classe: "scheda" },
        h("h2", null, "Ricavi per codice ATECO"),
        h("div", { classe: "tabella-contenitore" }, h(
          "table",
          null,
          h("thead", null, h("tr", null, h("th", null, "Attivit\xE0"), h("th", { classe: "numero" }, "Coefficiente"), h("th", { classe: "numero" }, "Ricavi"), h("th", { classe: "numero" }, "Reddito forfettario"))),
          h("tbody", null, r.perAteco.map((v) => h(
            "tr",
            null,
            h("td", null, `${v.codice} ${v.descrizione}`.trim()),
            h("td", { classe: "numero" }, v.coefficiente ? percentuale(v.coefficiente) : "\u2014"),
            h("td", { classe: "numero" }, euro(v.importo)),
            h("td", { classe: "numero" }, euro(v.importo * v.coefficiente))
          )))
        ))
      ),
      f ? h(
        "div",
        { classe: "scheda" },
        h("h2", null, "Stima imposta e contributi (regime forfettario)"),
        h("div", { classe: "tabella-contenitore" }, h("table", null, h(
          "tbody",
          null,
          riga("Reddito forfettario lordo", f.redditoLordo),
          riga("Contributi previdenziali (deducibili)", f.contributi.totale),
          riga("Reddito imponibile", f.imponibile),
          riga(`Imposta sostitutiva al ${percentuale(f.aliquota)}`, f.imposta),
          riga("Totale a carico (imposta + contributi)", f.totaleCarico, true)
        ))),
        h("p", { classe: "tenue" }, "Stima indicativa: i contributi sono considerati versati nell\u2019anno di competenza. Per acconti e saldo vedi lo Scadenzario, per il confronto con il regime ordinario la Simulazione.")
      ) : avviso("attenzione", "Stima non disponibile.", "Assegna un codice ATECO con coefficiente alle attivit\xE0 del cliente (sezione Anagrafica)."),
      h("div", { classe: "azioni" }, h("button", { onClick: () => window.print() }, "Stampa / PDF"))
    );
  }
  function riga(etichetta, valore, forte = false) {
    const el = h("tr", null, h("td", null, etichetta), h("td", { classe: "numero" }, euro(valore)));
    if (forte) el.style.fontWeight = "700";
    return el;
  }

  // js/ui/backup.js
  function vistaBackup(ctx) {
    const { archivio: archivio2 } = ctx;
    const esito = h("div");
    const pw = h("input", { type: "password", autocomplete: "current-password" });
    let blobDaImportare = null;
    const nomeFile = h("span", { classe: "tenue" });
    return h(
      "div",
      null,
      h("h1", null, "Backup e ripristino"),
      h("p", { classe: "tenue" }, "Il backup \xE8 un file cifrato con la stessa password dell\u2019archivio: solo chi la conosce pu\xF2 leggerlo."),
      h(
        "div",
        { classe: "scheda" },
        h("h2", null, "Esporta"),
        h("p", null, "Salva una copia dell\u2019archivio. Conservala fuori dal browser (disco esterno, cloud personale)."),
        h("div", { classe: "azioni" }, h("button", { classe: "primario", onClick: async () => {
          const blob = await archivio2.esporta();
          scarica(`gestione-forfettario-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, JSON.stringify(blob));
          esito.replaceChildren(avviso("ok", "Backup scaricato."));
        } }, "Scarica backup"))
      ),
      h(
        "div",
        { classe: "scheda" },
        h("h2", null, "Ripristina"),
        avviso("attenzione", "Attenzione.", "Il ripristino sostituisce tutti i dati attuali."),
        h("div", { classe: "azioni" }, h("button", { onClick: async () => {
          const [file] = await selezionaFile(".json,application/json");
          if (!file) return;
          try {
            blobDaImportare = JSON.parse(await file.text());
            nomeFile.textContent = file.name;
          } catch {
            esito.replaceChildren(avviso("errore", "File non valido."));
          }
        } }, "Scegli file di backup"), nomeFile),
        campo("Password del backup", pw),
        h("div", { classe: "azioni" }, h("button", { classe: "pericolo", onClick: async () => {
          if (!blobDaImportare) return esito.replaceChildren(avviso("errore", "Scegli prima un file di backup."));
          if (!confirm("Sostituire tutti i dati attuali con il backup?")) return;
          try {
            await archivio2.importa(blobDaImportare, pw.value);
            esito.replaceChildren(avviso("ok", "Backup ripristinato."));
          } catch (e) {
            esito.replaceChildren(avviso("errore", e instanceof ErrorePassword ? "Password errata o file danneggiato." : `Errore: ${e.message}`));
          }
        } }, "Ripristina"))
      ),
      esito
    );
  }

  // js/fiscal/ordinario.js
  function calcolaOrdinario(params2, dati) {
    const ricavi = dati.ricavi;
    const costi = dati.costi ?? 0;
    const redditoProfessionale = round2(clamp0(ricavi - costi));
    const contributi = contributiPrevidenziali(redditoProfessionale, params2, dati.previdenza);
    const imponibile = round2(clamp0(
      redditoProfessionale + (dati.altriRedditi ?? 0) - contributi.totale - (dati.altreDeduzioni ?? 0)
    ));
    const irpefLorda = applicaScaglioni(imponibile, params2.irpef.scaglioni);
    const irpef = round2(clamp0(irpefLorda - (dati.detrazioni ?? 0)));
    const addizionali = round2(
      imponibile * ((dati.addizionaleRegionale ?? 0) + (dati.addizionaleComunale ?? 0))
    );
    const irap = dati.soggettoIrap ? round2(redditoProfessionale * params2.irap.aliquota) : 0;
    return {
      ricavi,
      costi,
      redditoProfessionale,
      contributi,
      imponibile,
      irpefLorda,
      irpef,
      addizionali,
      irap,
      totaleCarico: round2(irpef + addizionali + irap + contributi.totale)
    };
  }

  // js/fiscal/confronto.js
  function confrontaRegimi(params2, { ricavi, costiReali, ricaviPerAteco: ricaviPerAteco2, aliquota, previdenza, riduzione35, ordinario = {} }) {
    const forf = calcolaForfettario(params2, { ricavi: ricaviPerAteco2, previdenza, aliquota, riduzione35 });
    const ord = calcolaOrdinario(params2, { ricavi, costi: costiReali, previdenza, ...ordinario });
    const nettoForfettario = round2(ricavi - costiReali - forf.totaleCarico);
    const nettoOrdinario = round2(ricavi - costiReali - ord.totaleCarico);
    const differenza = round2(nettoForfettario - nettoOrdinario);
    return {
      forfettario: { ...forf, netto: nettoForfettario },
      ordinario: { ...ord, netto: nettoOrdinario },
      differenza,
      conveniente: differenza === 0 ? "pari" : differenza > 0 ? "forfettario" : "ordinario"
    };
  }
  function scenari(params2, base, variazioni) {
    return variazioni.map((v) => {
      const ricavi = base.ricavi * (1 + (v.ricaviPct ?? 0));
      const costiReali = base.costiReali * (1 + (v.costiPct ?? 0));
      const fattore = base.ricavi === 0 ? 0 : ricavi / base.ricavi;
      const ricaviPerAteco2 = base.ricaviPerAteco.map((r) => ({ ...r, importo: r.importo * fattore }));
      return { variazione: v, ...confrontaRegimi(params2, { ...base, ricavi, costiReali, ricaviPerAteco: ricaviPerAteco2 }) };
    });
  }

  // js/ui/simulazione.js
  var num = (v) => Number.isFinite(Number(v)) ? Number(v) : 0;
  function vistaSimulazione(ctx) {
    var _a;
    const { dati, cliente: c, params: params2 } = ctx;
    if (!c) return h("div", null, h("h1", null, "Simulazione"), avviso("attenzione", "Nessun cliente selezionato."));
    const anno2 = ctx.stato.annoSim ?? (/* @__PURE__ */ new Date()).getFullYear();
    const r = riepilogoAnno(c, dati, anno2, params2);
    const voci = r.perAteco.filter((v) => v.coefficiente > 0);
    if (voci.length === 0) {
      return h("div", null, h("h1", null, "Simulazione"), avviso("attenzione", "Servono i codici ATECO.", "Assegna almeno un codice ATECO con coefficiente nell\u2019anagrafica del cliente."));
    }
    const s = (_a = ctx.stato).sim ?? (_a.sim = { ricavi: null, costi: null, ricaviPct: 0, costiPct: 0, addReg: 1.73, addCom: 0.8, detrazioni: 0, altriRedditi: 0, irap: false });
    const ricaviBase = s.ricavi ?? r.ricavi;
    const costiBase = s.costi ?? r.spese;
    const risultati = h("div");
    function ricalcola() {
      const ricavi = round2(ricaviBase * (1 + s.ricaviPct / 100));
      const costi = round2(costiBase * (1 + s.costiPct / 100));
      const somma = voci.reduce((t, v) => t + v.importo, 0);
      const ripartiti = voci.map((v, i) => ({ importo: somma > 0 ? v.importo / somma * ricavi : i === 0 ? ricavi : 0, coefficiente: v.coefficiente }));
      const input = {
        ricavi,
        costiReali: costi,
        ricaviPerAteco: ripartiti,
        aliquota: r.aliquota.aliquota,
        previdenza: c.previdenza,
        riduzione35: c.previdenza.riduzione35,
        ordinario: { addizionaleRegionale: s.addReg / 100, addizionaleComunale: s.addCom / 100, detrazioni: s.detrazioni, altriRedditi: s.altriRedditi, soggettoIrap: s.irap }
      };
      const conf = confrontaRegimi(params2, input);
      const f = conf.forfettario, o = conf.ordinario;
      const soglia = verificaSoglieRicavi(params2, ricavi);
      const riga2 = (et, vf, vo, evidenzia) => h("tr", null, h("td", null, et), h("td", { classe: "numero" }, evidenzia ? h("strong", null, euro(vf)) : euro(vf)), h("td", { classe: "numero" }, evidenzia ? h("strong", null, euro(vo)) : euro(vo)));
      const conv = conf.conveniente;
      const x = [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50];
      const sc = scenari(params2, { ...input }, x.map((p) => ({ ricaviPct: p / 100 })));
      const ricaviX = sc.map((q) => q.forfettario.ricavi);
      risultati.replaceChildren(
        soglia.stato === "esce-subito" ? avviso("errore", "Oltre 100.000 \u20AC.", "Il forfettario cessa subito: il confronto \xE8 solo indicativo.") : soglia.stato === "esce-anno-successivo" ? avviso("attenzione", "Oltre 85.000 \u20AC.", "Il regime forfettario cessa dall\u2019anno successivo.") : null,
        h(
          "div",
          { classe: "statistiche" },
          h("div", { classe: "statistica" }, h("div", { classe: `valore ${conv === "forfettario" ? "vince" : ""}` }, euro(f.netto)), h("div", { classe: "etichetta" }, "Netto con il forfettario")),
          h("div", { classe: "statistica" }, h("div", { classe: `valore ${conv === "ordinario" ? "vince" : ""}` }, euro(o.netto)), h("div", { classe: "etichetta" }, "Netto in regime ordinario")),
          h("div", { classe: "statistica" }, h("div", { classe: "valore" }, conv === "pari" ? "Pari" : `${conv === "forfettario" ? "Forfettario" : "Ordinario"} +${euro(Math.abs(conf.differenza))}`), h("div", { classe: "etichetta" }, "Regime pi\xF9 conveniente"))
        ),
        h(
          "div",
          { classe: "scheda" },
          h("div", { classe: "tabella-contenitore" }, h(
            "table",
            { classe: "confronto" },
            h("thead", null, h("tr", null, h("th", null, "Voce"), h("th", { classe: "numero" }, "Forfettario"), h("th", { classe: "numero" }, "Ordinario"))),
            h(
              "tbody",
              null,
              riga2("Ricavi", f.ricavi, o.ricavi),
              riga2("Costi reali sostenuti", costi, costi),
              riga2("Reddito", f.redditoLordo, o.redditoProfessionale),
              riga2("Contributi previdenziali", f.contributi.totale, o.contributi.totale),
              riga2("Imponibile fiscale", f.imponibile, o.imponibile),
              riga2(`Imposta (${percentuale(f.aliquota)} sostitutiva / IRPEF netta)`, f.imposta, o.irpef),
              riga2("Addizionali regionale e comunale", 0, o.addizionali),
              riga2("IRAP", 0, o.irap),
              riga2("Totale imposte e contributi", f.totaleCarico, o.totaleCarico, true),
              riga2("Netto disponibile (ricavi \u2212 costi \u2212 imposte \u2212 contributi)", f.netto, o.netto, true)
            )
          )),
          h(
            "div",
            { classe: "azioni" },
            h("button", { onClick: () => scarica(`confronto-regimi-${anno2}.csv`, csvConfronto(conf), "text/csv;charset=utf-8") }, "Esporta CSV"),
            h("button", { onClick: () => window.print() }, "Stampa / PDF")
          )
        ),
        h(
          "div",
          { classe: "scheda" },
          graficoLinee({
            titolo: "Netto al variare dei ricavi",
            descrizione: "Stessi costi, ricavi da \u221250% a +50% rispetto alla simulazione. Il forfettario non \xE8 applicabile oltre 85.000 \u20AC.",
            x: ricaviX,
            titoloX: "Ricavi",
            formatoX: (v) => euro(Math.round(v)).replace(",00", ""),
            serie: [
              { nome: "Forfettario", valori: sc.map((q) => q.forfettario.netto), colore: "--serie-1" },
              { nome: "Ordinario", valori: sc.map((q) => q.ordinario.netto), colore: "--serie-2" }
            ],
            riferimentoX: { valore: params2.forfettario.soglie.ricaviEsclusione, etichetta: "Soglia 85.000 \u20AC" }
          })
        ),
        h("p", { classe: "tenue" }, "Semplificazioni: nel regime ordinario le detrazioni IRPEF sono un importo da inserire, l\u2019IVA \xE8 considerata neutra, e non sono modellati ammortamenti, perdite pregresse, deduzioni oltre ai contributi, n\xE9 i limiti all\u2019IRAP per i professionisti. Stima indicativa, da verificare con il commercialista.")
      );
    }
    const slider = (etichetta, chiave, min, max) => {
      const out = h("span", { classe: "tenue" }, `${s[chiave] > 0 ? "+" : ""}${s[chiave]}%`);
      const inp = h("input", { type: "range", min, max, step: "1", valore: s[chiave], "aria-label": etichetta, onInput: (e) => {
        s[chiave] = Number(e.target.value);
        out.textContent = `${s[chiave] > 0 ? "+" : ""}${s[chiave]}%`;
        ricalcola();
      } });
      return h("div", { classe: "slider" }, h("label", null, etichetta, " ", out), inp);
    };
    const numero = (chiave, props = {}) => h("input", { type: "number", step: "0.01", min: "0", valore: s[chiave], onInput: (e) => {
      s[chiave] = num(e.target.value);
      ricalcola();
    }, ...props });
    ricalcola();
    return h(
      "div",
      null,
      h("div", { classe: "solo-stampa" }, h("strong", null, `${c.nome} \u2014 simulazione forfettario / ordinario ${anno2}`), h("div", null, `Stampato il ${(/* @__PURE__ */ new Date()).toLocaleDateString("it-IT")}`)),
      h("h1", null, "Simulazione forfettario vs ordinario"),
      h("p", { classe: "tenue" }, `${c.nome}. Parti dai dati registrati e prova scenari diversi con i cursori.`),
      h(
        "div",
        { classe: "scheda" },
        h("h2", null, "Punto di partenza"),
        h(
          "div",
          { classe: "griglia" },
          campo("Anno", h("input", { type: "number", min: "2000", max: "2100", valore: anno2, onChange: (e) => {
            ctx.stato.annoSim = Number(e.target.value);
            ctx.stato.sim.ricavi = null;
            ctx.stato.sim.costi = null;
            ctx.aggiorna();
          } })),
          campo("Ricavi (\u20AC)", h("input", { type: "number", step: "0.01", min: "0", valore: ricaviBase, onInput: (e) => {
            s.ricavi = num(e.target.value);
            ricalcola();
          } }), "Predefinito: incassi registrati nell\u2019anno."),
          campo("Costi reali (\u20AC)", h("input", { type: "number", step: "0.01", min: "0", valore: costiBase, onInput: (e) => {
            s.costi = num(e.target.value);
            ricalcola();
          } }), "Predefinito: spese registrate nell\u2019anno.")
        ),
        h("h2", null, "Scenario what-if"),
        h("div", { classe: "griglia" }, slider("Variazione dei ricavi", "ricaviPct", -50, 100), slider("Variazione dei costi", "costiPct", -50, 100)),
        h(
          "details",
          null,
          h("summary", null, "Parametri del regime ordinario"),
          h(
            "div",
            { classe: "griglia" },
            campo("Addizionale regionale (%)", numero("addReg", { step: "0.01" })),
            campo("Addizionale comunale (%)", numero("addCom", { step: "0.01" })),
            campo("Detrazioni IRPEF spettanti (\u20AC)", numero("detrazioni")),
            campo("Altri redditi imponibili (\u20AC)", numero("altriRedditi")),
            h("label", { classe: "spunta" }, h("input", { type: "checkbox", checked: s.irap, onChange: (e) => {
              s.irap = e.target.checked;
              ricalcola();
            } }), "Soggetto a IRAP (3,9%)")
          )
        )
      ),
      risultati
    );
  }

  // js/fiscal/acconti.js
  function accontiSostitutiva(params2, impostaAnnoPrecedente) {
    const a = params2.forfettario.acconto;
    if (impostaAnnoPrecedente <= a.sogliaMinima) return { prima: 0, seconda: 0, totale: 0 };
    if (impostaAnnoPrecedente <= a.sogliaRataUnica) {
      return { prima: 0, seconda: round2(impostaAnnoPrecedente), totale: round2(impostaAnnoPrecedente) };
    }
    const prima = round2(impostaAnnoPrecedente * a.percentualeRata1);
    const seconda = round2(impostaAnnoPrecedente - prima);
    return { prima, seconda, totale: round2(prima + seconda) };
  }

  // js/fiscal/scadenzario.js
  function pasqua(anno2) {
    const a = anno2 % 19, b = Math.floor(anno2 / 100), c = anno2 % 100;
    const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
    const h2 = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h2 - k) % 7, m = Math.floor((a + 11 * h2 + 22 * l) / 451);
    const mese = Math.floor((h2 + l - 7 * m + 114) / 31), giorno = (h2 + l - 7 * m + 114) % 31 + 1;
    return new Date(Date.UTC(anno2, mese - 1, giorno));
  }
  var FESTIVI_FISSI = ["01-01", "01-06", "04-25", "05-01", "06-02", "08-15", "11-01", "12-08", "12-25", "12-26"];
  var iso = (d) => d.toISOString().slice(0, 10);
  function eFestivo(isoData) {
    const d = /* @__PURE__ */ new Date(`${isoData}T00:00:00Z`);
    const g = d.getUTCDay();
    if (g === 0 || g === 6) return true;
    if (FESTIVI_FISSI.includes(isoData.slice(5))) return true;
    const lunediAngelo = new Date(pasqua(d.getUTCFullYear()).getTime() + 864e5);
    return iso(lunediAngelo) === isoData;
  }
  function prossimoLavorativo(isoData) {
    let d = /* @__PURE__ */ new Date(`${isoData}T00:00:00Z`);
    while (eFestivo(iso(d))) d = new Date(d.getTime() + 864e5);
    return iso(d);
  }
  var scadenza = (anno2, mmgg) => prossimoLavorativo(`${anno2}-${mmgg}`);
  function calcolaScadenzario(params2, d) {
    const P = d.annoPagamento;
    const voci = [];
    const fp = params2.forfettario;
    const dataGiugno = d.prorogaEstate2026 && P === 2026 ? scadenza(P, fp.scadenze.saldoEPrimoAccontoProroga2026) : scadenza(P, fp.scadenze.saldoEPrimoAcconto);
    const dataNovembre = scadenza(P, fp.scadenze.secondoAcconto);
    const saldo = round2(d.impostaAnnoPrec - d.accontiSostitutivaVersati);
    const acc = accontiSostitutiva(params2, d.impostaAnnoPrec);
    voci.push({
      id: "sost-saldo",
      tipo: "imposta",
      data: dataGiugno,
      descrizione: `Saldo imposta sostitutiva ${P - 1}`,
      importo: clamp0(saldo),
      codiceTributo: fp.codiciTributo.saldo,
      annoRiferimento: P - 1,
      nota: saldo < 0 ? `Credito di ${Math.abs(saldo).toFixed(2)} \u20AC utilizzabile in compensazione` : ""
    });
    if (acc.prima > 0) voci.push({
      id: "sost-acc1",
      tipo: "imposta",
      data: dataGiugno,
      descrizione: `Primo acconto imposta sostitutiva ${P}`,
      importo: acc.prima,
      codiceTributo: fp.codiciTributo.accontoPrimaRata,
      annoRiferimento: P,
      nota: "Metodo storico"
    });
    if (acc.seconda > 0) voci.push({
      id: "sost-acc2",
      tipo: "imposta",
      data: dataNovembre,
      descrizione: acc.prima > 0 ? `Secondo acconto imposta sostitutiva ${P}` : `Acconto in unica soluzione imposta sostitutiva ${P}`,
      importo: acc.seconda,
      codiceTributo: fp.codiciTributo.accontoSecondaRataOUnica,
      annoRiferimento: P,
      nota: "Metodo storico"
    });
    const prev = d.previdenza;
    const inps = d.contributiAnnoPrec;
    if (prev.tipo === "gestione-separata") {
      const a = params2.gestioneSeparata.acconto;
      const saldoInps = round2(inps.totale - d.accontiInpsVersati);
      const rata = round2(inps.totale * a.percentuale / a.rate);
      voci.push({
        id: "inps-saldo",
        tipo: "inps",
        data: dataGiugno,
        descrizione: `Saldo contributi Gestione Separata ${P - 1}`,
        importo: clamp0(saldoInps),
        annoRiferimento: P - 1,
        nota: saldoInps < 0 ? "Credito" : ""
      });
      voci.push({ id: "inps-acc1", tipo: "inps", data: dataGiugno, descrizione: `Primo acconto contributi Gestione Separata ${P}`, importo: rata, annoRiferimento: P, nota: `${a.percentuale * 100 / a.rate}% dei contributi ${P - 1}` });
      voci.push({ id: "inps-acc2", tipo: "inps", data: dataNovembre, descrizione: `Secondo acconto contributi Gestione Separata ${P}`, importo: rata, annoRiferimento: P, nota: `${a.percentuale * 100 / a.rate}% dei contributi ${P - 1}` });
    } else if (prev.tipo === "artigiani" || prev.tipo === "commercianti") {
      const ivs = params2.ivs;
      const fisso = d.contributiFissiAnno ?? round2((ivs.minimale * ivs.aliquote[prev.tipo] + ivs.contributoMaternitaAnnuo) * (prev.riduzione35 ? 1 - fp.riduzioneContributiIvs : 1));
      ivs.scadenzeFissi.forEach((mmgg, i) => {
        const anno2 = mmgg === "02-16" ? P + 1 : P;
        voci.push({ id: `inps-fisso-${i + 1}`, tipo: "inps", data: scadenza(anno2, mmgg), descrizione: `Contributi fissi IVS ${P}, rata ${i + 1} di 4`, importo: round2(fisso / 4), annoRiferimento: P, nota: "Versamento con F24 INPS" });
      });
      const fissoPrec = d.contributiFissiAnnoPrec ?? fisso;
      const eccedenzaPrec = clamp0(round2(inps.totale - fissoPrec));
      const saldoEcc = round2(eccedenzaPrec - d.accontiInpsVersati);
      const rataEcc = round2(eccedenzaPrec * ivs.acconto.percentuale / ivs.acconto.rate);
      voci.push({ id: "inps-saldo", tipo: "inps", data: dataGiugno, descrizione: `Saldo contributi sul reddito eccedente il minimale ${P - 1}`, importo: clamp0(saldoEcc), annoRiferimento: P - 1, nota: saldoEcc < 0 ? "Credito" : "" });
      if (rataEcc > 0) {
        voci.push({ id: "inps-acc1", tipo: "inps", data: dataGiugno, descrizione: `Primo acconto contributi sul reddito eccedente ${P}`, importo: rataEcc, annoRiferimento: P, nota: "Regola di acconto da verificare" });
        voci.push({ id: "inps-acc2", tipo: "inps", data: dataNovembre, descrizione: `Secondo acconto contributi sul reddito eccedente ${P}`, importo: rataEcc, annoRiferimento: P, nota: "Regola di acconto da verificare" });
      }
    } else {
      voci.push({ id: "inps-cassa", tipo: "inps", data: null, descrizione: "Contributi alla cassa professionale", importo: 0, nota: "Scadenze e importi definiti dalla cassa di appartenenza: non calcolati." });
    }
    voci.push({ id: "dichiarazione", tipo: "adempimento", data: scadenza(P, fp.scadenze.dichiarazione), descrizione: `Invio dichiarazione dei redditi (anno d'imposta ${P - 1})`, importo: 0, annoRiferimento: P - 1, nota: "" });
    return voci.sort((a, b) => (a.data ?? "9999").localeCompare(b.data ?? "9999") || a.id.localeCompare(b.id));
  }

  // js/ui/scadenze.js
  var num2 = (v) => Number.isFinite(Number(v)) ? Number(v) : 0;
  var oggi = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  function vistaScadenze(ctx) {
    var _a;
    const { archivio: archivio2, dati, cliente: c, params: params2 } = ctx;
    if (!c) return h("div", null, h("h1", null, "Scadenzario"), avviso("attenzione", "Nessun cliente selezionato."));
    const P = ctx.stato.annoScadenze ?? (/* @__PURE__ */ new Date()).getFullYear();
    const prec = riepilogoAnno(c, dati, P - 1, params2);
    const versati = c.versamenti?.[P - 1] ?? {};
    const stimaImposta = prec.forfettario?.imposta ?? 0;
    const stimaContributi = prec.forfettario?.contributi ?? { totale: 0 };
    const s = (_a = ctx.stato).scad ?? (_a.scad = {});
    if (s.anno !== P) Object.assign(s, { anno: P, imposta: null, contributi: null, accSost: null, accInps: null, proroga: P === 2026 });
    const val = (chiave, predefinito) => s[chiave] ?? predefinito;
    const risultati = h("div");
    const esito = h("div");
    function ricalcola() {
      const contributi = { ...stimaContributi, totale: val("contributi", stimaContributi.totale) };
      const voci = calcolaScadenzario(params2, {
        annoPagamento: P,
        impostaAnnoPrec: val("imposta", stimaImposta),
        accontiSostitutivaVersati: val("accSost", versati.sostitutiva ?? 0),
        contributiAnnoPrec: contributi,
        accontiInpsVersati: val("accInps", versati.inps ?? 0),
        previdenza: c.previdenza,
        prorogaEstate2026: s.proroga
      });
      const futuri = voci.filter((v) => v.data && v.data >= oggi() && v.importo > 0);
      const totale = round2(voci.reduce((t, v) => t + v.importo, 0));
      const prossima = futuri[0];
      risultati.replaceChildren(
        prossima ? avviso("attenzione", `Prossima scadenza: ${dataIt(prossima.data)}.`, `${prossima.descrizione} \u2014 ${euro(prossima.importo)}`) : avviso("ok", "Nessuna scadenza futura con importo per questo anno."),
        h(
          "div",
          { classe: "scheda" },
          h("div", { classe: "tabella-contenitore" }, h(
            "table",
            null,
            h("thead", null, h("tr", null, h("th", null, "Scadenza"), h("th", null, "Versamento"), h("th", null, "F24"), h("th", { classe: "numero" }, "Importo"))),
            h("tbody", null, voci.map((v) => h(
              "tr",
              null,
              h("td", null, v.data ? dataIt(v.data) : "\u2014", v.data && v.data < oggi() ? h("div", { classe: "tenue" }, "scaduta") : null),
              h("td", null, v.descrizione, v.nota ? h("div", { classe: "tenue" }, v.nota) : null),
              h("td", null, v.codiceTributo ? `Erario ${v.codiceTributo} / ${v.annoRiferimento}` : v.tipo === "inps" ? "INPS" : ""),
              h("td", { classe: "numero" }, v.tipo === "adempimento" ? "" : euro(v.importo))
            ))),
            h("tfoot", null, h("tr", null, h("td", { colspan: "3" }, "Totale versamenti"), h("td", { classe: "numero" }, euro(totale))))
          )),
          h(
            "div",
            { classe: "azioni" },
            h("button", { onClick: () => scarica(`scadenzario-${P}.csv`, csvScadenzario(voci), "text/csv;charset=utf-8") }, "Esporta CSV"),
            h("button", { onClick: () => window.print() }, "Stampa / PDF")
          )
        )
      );
    }
    const numero = (chiave, predefinito) => h("input", { type: "number", step: "0.01", min: "0", valore: val(chiave, predefinito), onInput: (e) => {
      s[chiave] = num2(e.target.value);
      ricalcola();
    } });
    const inpsEtichetta = c.previdenza.tipo === "artigiani" || c.previdenza.tipo === "commercianti" ? "Contributi INPS dovuti per l\u2019anno precedente, fissi inclusi (\u20AC)" : "Contributi INPS dovuti per l\u2019anno precedente (\u20AC)";
    ricalcola();
    return h(
      "div",
      null,
      h("div", { classe: "solo-stampa" }, h("strong", null, `${c.nome} \u2014 scadenzario ${P}`), h("div", null, `Stampato il ${(/* @__PURE__ */ new Date()).toLocaleDateString("it-IT")}`)),
      h("h1", null, "Scadenzario"),
      h("p", { classe: "tenue" }, `${c.nome}. Versamenti dell\u2019anno ${P}: saldo ${P - 1} e acconti ${P}.`),
      h(
        "div",
        { classe: "scheda" },
        h(
          "div",
          { classe: "griglia" },
          campo("Anno dei versamenti", h("input", { type: "number", min: "2000", max: "2100", valore: P, onChange: (e) => {
            ctx.stato.annoScadenze = Number(e.target.value);
            ctx.aggiorna();
          } })),
          campo(`Imposta sostitutiva dovuta per il ${P - 1} (\u20AC)`, numero("imposta", stimaImposta), `Stima dai dati registrati: ${euro(stimaImposta)}. Correggila con il valore della dichiarazione.`),
          campo(`Acconti imposta gi\xE0 versati per il ${P - 1} (\u20AC)`, numero("accSost", versati.sostitutiva ?? 0)),
          campo(inpsEtichetta, numero("contributi", stimaContributi.totale), `Stima: ${euro(stimaContributi.totale)}.`),
          campo(`Acconti INPS gi\xE0 versati per il ${P - 1} (\u20AC)`, numero("accInps", versati.inps ?? 0))
        ),
        P === 2026 ? h("label", { classe: "spunta" }, h("input", { type: "checkbox", checked: s.proroga, onChange: (e) => {
          s.proroga = e.target.checked;
          ricalcola();
        } }), "Saldo e primo acconto prorogati al 20 luglio (art. 6 DL 89/2026, con effetti fatti salvi dalla L. 113/2026)") : null,
        h("div", { classe: "azioni" }, h("button", { onClick: async () => {
          await archivio2.modifica((d) => {
            const cl = d.clienti.find((x) => x.id === c.id);
            cl.versamenti = { ...cl.versamenti, [P - 1]: { sostitutiva: val("accSost", 0), inps: val("accInps", 0) } };
          });
        } }, "Salva acconti versati"))
      ),
      esito,
      risultati,
      avviso("attenzione", "Stima indicativa.", `Gli importi dell\u2019anno ${P - 1} sono ricavati dai dati registrati con i parametri 2026. I codici tributo F24 sono quelli dell\u2019imposta sostitutiva; per i contributi INPS i codici e le causali vanno verificati. L\u2019acconto della Gestione Separata (80% in due rate) e quello sul reddito eccedente IVS sono da verificare.`)
    );
  }

  // js/app.js
  var ROTTE = [
    { path: "#/riepilogo", titolo: "Riepilogo", vista: vistaRiepilogo },
    { path: "#/clienti", titolo: "Clienti", vista: vistaClienti },
    { path: "#/anagrafica", titolo: "Anagrafica", vista: vistaAnagrafica },
    { path: "#/fatture", titolo: "Fatture", vista: vistaFatture },
    { path: "#/spese", titolo: "Spese", vista: vistaSpese },
    { path: "#/simulazione", titolo: "Simulazione", vista: vistaSimulazione },
    { path: "#/scadenze", titolo: "Scadenzario", vista: vistaScadenze },
    { path: "#/backup", titolo: "Backup", vista: vistaBackup }
  ];
  var INATTIVITA_MS = 15 * 60 * 1e3;
  var radice = document.getElementById("app");
  var archivio = new Archivio(adattatoreIndexedDB());
  var stato = {};
  var timerBlocco = null;
  function params() {
    return parametriAnno(2026);
  }
  function contesto() {
    const dati = archivio.dati;
    const cliente = dati.clienti.find((c) => c.id === dati.ui.clienteId) ?? dati.clienti[0] ?? null;
    return {
      archivio,
      dati,
      cliente,
      params: params(),
      stato,
      aggiorna: disegna,
      selezionaCliente: async (id2, dest) => {
        await archivio.modifica((d) => {
          d.ui.clienteId = id2;
        });
        if (dest) location.hash = dest;
      }
    };
  }
  function disegna() {
    if (!archivio.sbloccato) return mostraSblocco();
    const ctx = contesto();
    const predefinita = ctx.cliente ? ROTTE[0] : ROTTE.find((r) => r.path === "#/clienti");
    const rotta = ROTTE.find((r) => r.path === location.hash) ?? predefinita;
    const selettore = h(
      "select",
      { "aria-label": "Cliente attivo", onChange: (e) => ctx.selezionaCliente(e.target.value) },
      ctx.dati.clienti.length ? ctx.dati.clienti.map((c) => h("option", { value: c.id, selected: c.id === ctx.cliente?.id }, c.nome || "(senza nome)")) : h("option", null, "Nessun cliente")
    );
    radice.replaceChildren(h(
      "div",
      { classe: "layout" },
      h(
        "nav",
        { classe: "barra", "aria-label": "Navigazione principale" },
        h("h1", null, "Gestione Forfettario"),
        h("div", null, h("label", null, "Cliente attivo"), selettore),
        h("div", { classe: "menu" }, ROTTE.map((r) => h("a", { href: r.path, "aria-current": r === rotta ? "page" : null }, r.titolo))),
        h("div", { classe: "fondo" }, h("button", { onClick: () => {
          archivio.blocca();
        } }, "Blocca archivio"))
      ),
      h("main", null, rotta.vista(ctx))
    ));
  }
  async function mostraSblocco() {
    clearTimeout(timerBlocco);
    const esiste = await archivio.esiste();
    radice.replaceChildren(schermataSblocco(archivio, esiste, () => {
      avviaTimerBlocco();
      disegna();
    }));
  }
  function avviaTimerBlocco() {
    const riparti = () => {
      clearTimeout(timerBlocco);
      timerBlocco = setTimeout(() => archivio.blocca(), INATTIVITA_MS);
    };
    for (const ev of ["click", "keydown", "pointerdown"]) document.addEventListener(ev, riparti, { passive: true });
    riparti();
  }
  archivio.ascolta(() => {
    if (!archivio.sbloccato) mostraSblocco();
  });
  var modificaOriginale = archivio.modifica.bind(archivio);
  archivio.modifica = async (fn) => {
    const r = await modificaOriginale(fn);
    disegna();
    return r;
  };
  window.addEventListener("hashchange", () => {
    if (archivio.sbloccato) disegna();
  });
  mostraSblocco();
})();
