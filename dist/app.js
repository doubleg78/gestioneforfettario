(() => {
  // js/ui/icone.js
  var P = {
    studio: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M9 11h.01M15 11h.01",
    utenti: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    calendario: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    utente: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
    documento: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8M8 9h2",
    ricevuta: "M4 2v20l3-2 3 2 3-2 3 2 3-2 1 1V2l-1 1-3-1-3 2-3-2-3 2zM8 8h8M8 12h8M8 16h5",
    grafico: "M3 3v18h18M7 15l4-4 3 3 5-6",
    bilancia: "M12 3v18M5 21h14M5 7l-3 8a4 4 0 0 0 6 0zM19 7l-3 8a4 4 0 0 0 6 0zM3 7h18",
    slider: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
    impostazioni: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    scudo: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
    lucchetto: "M5 11h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zM8 11V7a4 4 0 0 1 8 0v4",
    sole: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
    luna: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
    piu: "M12 5v14M5 12h14",
    cerca: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
    scarica: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
    carica: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
    stampa: "M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z",
    modifica: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
    campana: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
    "su-giu": "M7 15l5 5 5-5M7 9l5-5 5 5",
    cestino: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6",
    spunta: "M20 6L9 17l-5-5",
    avviso: "M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01",
    info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01",
    chiudi: "M18 6L6 18M6 6l12 12",
    giu: "M6 9l6 6 6-6",
    su: "M18 15l-6-6-6 6",
    chevronSx: "M15 18l-6-6 6-6",
    chevronDx: "M9 18l6-6-6-6",
    freccia: "M5 12h14M12 5l7 7-7 7",
    menu: "M3 6h18M3 12h18M3 18h18",
    comando: "M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
    pdf: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15h1.5a1.5 1.5 0 0 0 0-3H9v6M15 18v-6h2.5M15 15h2",
    altro: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
    copia: "M9 9h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2zM5 15H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1",
    orologio: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
    bandiera: "M4 22V4M4 4h13l-2 4 2 4H4",
    libro: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z",
    ricarica: "M23 4v6h-6M1 20v-6h6M3.5 9a9 9 0 0 1 15-3.4L23 10M1 14l4.5 4.4A9 9 0 0 0 20.5 15"
  };
  function icona(nome, dimensione = 18) {
    const ns = "http://www.w3.org/2000/svg";
    const svg2 = document.createElementNS(ns, "svg");
    svg2.setAttribute("viewBox", "0 0 24 24");
    svg2.setAttribute("width", dimensione);
    svg2.setAttribute("height", dimensione);
    svg2.setAttribute("fill", "none");
    svg2.setAttribute("stroke", "currentColor");
    svg2.setAttribute("stroke-width", "1.75");
    svg2.setAttribute("stroke-linecap", "round");
    svg2.setAttribute("stroke-linejoin", "round");
    svg2.setAttribute("aria-hidden", "true");
    svg2.setAttribute("focusable", "false");
    svg2.setAttribute("class", "icona");
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", P[nome] ?? P.info);
    svg2.append(path);
    return svg2;
  }
  var NOMI_ICONE = Object.keys(P);

  // js/ui/dom.js
  var pulisci = (nodi) => nodi.flat(Infinity).filter((n) => n !== null && n !== void 0 && n !== false);
  for (const nome of ["append", "prepend", "replaceChildren"]) {
    const originale = Element.prototype[nome];
    Element.prototype[nome] = function(...nodi) {
      return originale.apply(this, pulisci(nodi));
    };
  }
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
  var eur = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", useGrouping: "always" });
  var eurIntero = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0, useGrouping: "always" });
  var euro = (n) => eur.format(n ?? 0);
  var euroIntero = (n) => eurIntero.format(Math.round(n ?? 0));
  var dataIt = (iso3) => iso3 ? iso3.split("-").reverse().join("/") : "";
  var percentuale = (n) => `${(n * 100).toLocaleString("it-IT", { maximumFractionDigits: 2 })}%`;
  var MESI_LUNGHI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
  var iniziali = (nome) => (nome || "?").split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  function campo(etichetta, ctrl, aiuto) {
    const id2 = `c-${Math.random().toString(36).slice(2, 9)}`;
    ctrl.id = id2;
    const el = h("div", { classe: "campo" }, h("label", { for: id2 }, etichetta), ctrl, aiuto ? h("div", { classe: "aiuto" }, aiuto) : null);
    el.mostraErrore = (msg) => {
      el.querySelector(".errore-campo")?.remove();
      ctrl.removeAttribute("aria-invalid");
      if (msg) {
        ctrl.setAttribute("aria-invalid", "true");
        el.append(h("div", { classe: "errore-campo", role: "alert" }, icona("avviso", 14), msg));
      }
    };
    return el;
  }
  function bottone(testo2, { variante = "", icona: nomeIcona, onClick, tipo = "button", piccolo = false, titolo, disabled = false } = {}) {
    const solaIcona = !testo2;
    return h("button", {
      type: tipo,
      classe: `bottone ${variante} ${piccolo ? "piccolo" : ""} ${solaIcona ? "icona-sola" : ""}`.replace(/\s+/g, " ").trim(),
      onClick,
      title: titolo,
      "aria-label": solaIcona ? titolo : null,
      disabled
    }, nomeIcona ? icona(nomeIcona, piccolo ? 15 : 16) : null, testo2);
  }
  function chip(tipo, testo2, nomeIcona) {
    return h("span", { classe: `chip ${tipo}` }, nomeIcona ? icona(nomeIcona, 12) : null, testo2);
  }
  var ICONE_AVVISO = { ok: "spunta", attenzione: "avviso", errore: "avviso", info: "info" };
  function avviso(tipo, titolo, testo2) {
    return h(
      "div",
      { classe: `avviso ${tipo}`, role: tipo === "errore" ? "alert" : "status" },
      icona(ICONE_AVVISO[tipo] ?? "info", 18),
      h("div", null, h("strong", null, titolo), testo2 ? ` ${testo2}` : "")
    );
  }
  function tile(etichetta, valore, { nota: nota2, icona: nomeIcona, evidenza = false } = {}) {
    return h(
      "div",
      { classe: `tile ${evidenza ? "evidenza" : ""}` },
      h("div", { classe: "tile-etichetta" }, nomeIcona ? h("span", { classe: "icona-tile" }, icona(nomeIcona, 16)) : null, etichetta),
      h("div", { classe: "tile-valore" }, valore),
      nota2 ? h("div", { classe: "tile-nota" }, nota2) : null
    );
  }
  function meter(percentuale2, stato2 = "", grande = false) {
    const el = h("div", { classe: `meter ${stato2} ${grande ? "grande" : ""}`, role: "img", "aria-label": `${Math.round(percentuale2)}%` }, h("span"));
    el.firstChild.style.width = `${Math.max(0, Math.min(100, percentuale2))}%`;
    return el;
  }
  function vuoto({ icona: nomeIcona = "info", titolo, testo: testo2, azioni = [] }) {
    return h(
      "div",
      { classe: "vuoto" },
      h("div", { classe: "vuoto-icona" }, icona(nomeIcona, 26)),
      h("h3", null, titolo),
      testo2 ? h("p", null, testo2) : null,
      azioni.length ? h("div", { classe: "gruppo-azioni" }, azioni) : null
    );
  }
  function scheda({ titolo, sottotitolo, azioni, senzaPadding = false, classe = "" }, ...corpo) {
    return h(
      "section",
      { classe: `scheda ${classe}` },
      titolo ? h("div", { classe: "scheda-testa" }, h("div", null, h("h2", null, titolo), sottotitolo ? h("p", null, sottotitolo) : null), azioni ? h("div", { classe: "gruppo-azioni" }, azioni) : null) : null,
      h("div", { classe: `scheda-corpo ${senzaPadding ? "senza-padding" : ""}` }, corpo)
    );
  }
  function testataPagina(titolo, sottotitolo, azioni) {
    return h(
      "div",
      { classe: "testata-pagina" },
      h("div", null, h("h1", null, titolo), sottotitolo ? h("p", { classe: "sottotitolo" }, sottotitolo) : null),
      azioni ? h("div", { classe: "gruppo-azioni no-stampa" }, azioni) : null
    );
  }
  function tabella({ colonne, righe, ordinaIniziale, piede }) {
    const stato2 = { chiave: ordinaIniziale?.chiave ?? null, verso: ordinaIniziale?.verso ?? 1 };
    const contenitore = h("div", { classe: "tabella-contenitore" });
    const disegna2 = () => {
      let dati = [...righe];
      const col = colonne.find((c) => c.chiave === stato2.chiave);
      if (col?.ordina) dati.sort((a, b) => {
        const x = col.ordina(a), y = col.ordina(b);
        return (x < y ? -1 : x > y ? 1 : 0) * stato2.verso;
      });
      contenitore.replaceChildren(h(
        "table",
        { classe: "tabella" },
        h("thead", null, h("tr", null, colonne.map((c) => h("th", {
          classe: `${c.numerica ? "numero" : ""} ${c.ordina ? "ordinabile" : ""}`.trim(),
          "aria-sort": c.chiave === stato2.chiave ? stato2.verso === 1 ? "ascending" : "descending" : null,
          onClick: c.ordina ? () => {
            stato2.verso = stato2.chiave === c.chiave ? -stato2.verso : 1;
            stato2.chiave = c.chiave;
            disegna2();
          } : null
        }, c.titolo, c.chiave === stato2.chiave ? h("span", { classe: "freccia-ord" }, stato2.verso === 1 ? "\u2191" : "\u2193") : null)))),
        h("tbody", null, dati.map((r) => h("tr", null, colonne.map((c) => h("td", { classe: c.numerica ? "numero" : "" }, c.cella(r)))))),
        piede ? h("tfoot", null, piede) : null
      ));
    };
    disegna2();
    return contenitore;
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
  function zonaRilascio({ testo: testo2, accept, multiplo = true, onFile }) {
    const z = h("div", { classe: "zona-rilascio", tabindex: "0", role: "button" }, icona("carica", 26), h("div", null, h("strong", null, testo2), h("div", { classe: "piccolo" }, "Trascina qui i file oppure fai clic per sceglierli")));
    const apri2 = async () => {
      const f = await selezionaFile(accept, multiplo);
      if (f.length) onFile(f);
    };
    z.addEventListener("click", apri2);
    z.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        apri2();
      }
    });
    z.addEventListener("dragover", (e) => {
      e.preventDefault();
      z.classList.add("attiva");
    });
    z.addEventListener("dragleave", () => z.classList.remove("attiva"));
    z.addEventListener("drop", (e) => {
      e.preventDefault();
      z.classList.remove("attiva");
      if (e.dataTransfer.files.length) onFile([...e.dataTransfer.files]);
    });
    return z;
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
    /** Cambia la password: verifica quella attuale, poi risigilla l'archivio con salt e chiave nuovi. */
    async cambiaPassword(attuale, nuova) {
      if (!this.sbloccato) throw new Error("Archivio bloccato");
      if (nuova.length < 10) throw new Error("La nuova password deve avere almeno 10 caratteri");
      const blob = await this.adattatore.leggi(CHIAVE);
      try {
        await apri(blob, attuale);
      } catch {
        throw new ErrorePassword();
      }
      this.sessione = await nuovaSessione(nuova, this.iterazioni);
      await this.salva();
    }
    /**
     * Eliminazione totale: cancella dal database il blocco cifrato e tutto il resto, senza chiedere la password
     * (serve anche a chi l'ha dimenticata). Dopo la chiamata l'archivio è come al primo avvio.
     */
    async elimina() {
      await this._coda;
      await this.adattatore.svuota();
      this.sessione = null;
      this.dati = null;
      this._coda = Promise.resolve();
      this._notifica();
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
      elimina: (k) => tx("readwrite", (s) => s.delete(k)),
      svuota: () => tx("readwrite", (s) => s.clear())
    };
  }

  // js/fiscal/params/2025.js
  var __default = {
    anno: 2025,
    forfettario: {
      // L. 190/2014 art. 1 c. 54-89, come modificata dalla L. 199/2025 (bilancio 2026)
      soglie: {
        ricaviEsclusione: 85e3,
        // superata: uscita dall'anno successivo
        ricaviUscitaImmediata: 1e5,
        // superata: uscita nell'anno stesso
        redditoLavoroDipendente: 35e3,
        // 35.000 per il 2025 (L. 207/2024 c. 12); ordinariamente 30.000
        alertPercentuale: 0.9
        // soglia di preallarme (scelta dell'app, non di legge)
      },
      aliquote: { ordinaria: 0.15, startup: 0.05, anniStartup: 5 },
      // VERIFICATO: AdE, guida "L'imposta di bollo sulle fatture elettroniche" (giugno 2026) e Circ. 19/E 2020.
      // Versamento trimestrale con F24 (codici 2521-2524): 31/5, 30/9, 30/11, 28/2; slittamenti a 30/9 e 30/11
      // se l'importo dovuto per il primo trimestre, o per i primi due, non supera 5.000 €.
      bollo: {
        sogliaImporto: 77.47,
        importo: 2,
        trimestri: { codici: ["2521", "2522", "2523", "2524"], scadenze: ["05-31", "09-30", "11-30", "02-28"], sogliaDifferimento: 5e3 }
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
      codiciTributo: { accontoPrimaRata: "1790", accontoSecondaRataOUnica: "1791", saldo: "1792" },
      // Soglia 35.000: art. 1 c. 12 L. 207/2024 per il 2025 (fonti secondarie concordi).
      // Coefficienti: Allegato 4 L. 190/2014 nel testo pubblicato da AdE; codici ATECO 2007 (v. `atecoDivisioni`).
      // Scadenze: ordinarie. Nel 2025 il versamento di saldo e primo acconto per ISA/forfettari è stato prorogato
      // al 21 luglio (non modellato).
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
    // VERIFICATO su INPS: circolare n. 27 del 30/1/2025 (26,07% = 25% IVS + 0,72% + 0,35% ISCRO;
    // 24% con altra copertura; minimale 18.555 €; massimale 120.607 €).
    gestioneSeparata: {
      aliquotaProfessionistaSenzaCopertura: 0.2607,
      // 25% IVS + 0,72% + 0,35% ISCRO
      aliquotaConAltraCopertura: 0.24,
      minimale: 18555,
      massimale: 120607,
      // VERIFICATO (AdE, Redditi PF 2026 fasc. 2, Quadro RR): due acconti di pari importo, alle scadenze
      // degli acconti IRPEF; totale = aliquote dell'anno corrente sull'80% del reddito di lavoro autonomo
      // dell'anno precedente, nel limite del massimale dell'anno corrente.
      acconto: { percentuale: 0.8, rate: 2 },
      // Causali F24 INPS (circ. INPS 105/2025, istruzioni Redditi): PXX con aliquota 26,07%, P10 con aliquota 24%
      causaliF24: { standard: "PXX", altraCopertura: "P10" }
    },
    // VERIFICATO su INPS: circolare n. 38 del 7/2/2025 (minimale 18.555 €, aliquote 24% e 24,48%,
    // +1 punto oltre 55.448 €, massimali 92.413 € e 120.607 €, fissi 4.460,64 € e 4.549,70 €).
    ivs: {
      minimale: 18555,
      aliquote: { artigiani: 0.24, commercianti: 0.2448 },
      maggiorazione: { sogliaReddito: 55448, punti: 0.01 },
      // +1 punto oltre 55.448 €
      // Circ. INPS 38/2025 p. 4: 92.413 (55.448 + 36.965) per iscritti con anzianità al 31/12/1995;
      // 120.607 per chi è iscritto dal 1/1/1996.
      massimale: { ante1996: 92413, dal1996: 120607 },
      contributoMaternitaAnnuo: 7.44,
      // 0,62 €/mese
      // Acconti sulla quota eccedente il minimale: 80% in due rate uguali (stesse scadenze IRPEF).
      // L'INPS (circ. 38/2025, p. 9) prevede saldo, primo e secondo acconto; la misura dell'80% non è
      // riportata nelle circolari lette: da confermare nel Cassetto previdenziale ("Dati del mod. F24").
      acconto: { percentuale: 0.8, rate: 2, daVerificare: true },
      // Rate dei contributi sul minimale (circ. INPS 38/2025 p. 9: 16/5, 20/8, 17/11 [16/11 è domenica], 16/2/2026)
      scadenzeFissi: ["05-16", "08-20", "11-16", "02-16"],
      // circ. INPS 38/2025: 16/5, 20/8, 17/11 (16/11 domenica), 16/2/2026
      // Causali F24: AF/CF minimale, AP/CP quota eccedente (pagina INPS "F24 per artigiani e commercianti")
      causaliF24: { artigiani: { minimale: "AF", eccedenza: "AP" }, commercianti: { minimale: "CF", eccedenza: "CP" } }
    },
    // Casse professionali: i parametri variano per cassa, vengono inseriti dall'utente.
    cassa: { predefinita: { aliquotaSoggettiva: 0.1, contributoMinimo: 0 } },
    // 2025: secondo scaglione al 35% (la riduzione al 33% è della L. 199/2025, dal 2026).
    irpef: {
      scaglioni: [
        { fino: 28e3, aliquota: 0.23 },
        { fino: 5e4, aliquota: 0.35 },
        { fino: Infinity, aliquota: 0.43 }
      ],
      // Detrazione per redditi di lavoro autonomo, art. 13 c. 5 e 5-ter TUIR (non cumulabile con quelle dei c. 1-4).
      // VERIFICATO: AdE, specifiche tecniche Redditi PF 2026 (rigo RN7, par. 21.4), quoziente troncato a 4 decimali.
      detrazioneLavoroAutonomo: {
        importoFisso: 1265,
        finoA: 5500,
        base: 500,
        extra: 765,
        finoA2: 28e3,
        divisore: 22500,
        finoA3: 5e4,
        divisore3: 22e3,
        aumento: { da: 11e3, a: 17e3, importo: 50 }
      }
    },
    irap: { aliquota: 0.039 }
    // aliquota ordinaria; le regioni possono variarla
  };

  // js/fiscal/params/2026.js
  var __default2 = {
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
      // VERIFICATO: AdE, guida "L'imposta di bollo sulle fatture elettroniche" (giugno 2026) e Circ. 19/E 2020.
      // Versamento trimestrale con F24 (codici 2521-2524): 31/5, 30/9, 30/11, 28/2; slittamenti a 30/9 e 30/11
      // se l'importo dovuto per il primo trimestre, o per i primi due, non supera 5.000 €.
      bollo: {
        sogliaImporto: 77.47,
        importo: 2,
        trimestri: { codici: ["2521", "2522", "2523", "2524"], scadenze: ["05-31", "09-30", "11-30", "02-28"], sogliaDifferimento: 5e3 }
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
      // VERIFICATO (AdE, Redditi PF 2026 fasc. 2, Quadro RR): due acconti di pari importo, alle scadenze
      // degli acconti IRPEF; totale = aliquote dell'anno corrente sull'80% del reddito di lavoro autonomo
      // dell'anno precedente, nel limite del massimale dell'anno corrente.
      acconto: { percentuale: 0.8, rate: 2 },
      // Causali F24 INPS (circ. INPS 105/2025, istruzioni Redditi): PXX con aliquota 26,07%, P10 con aliquota 24%
      causaliF24: { standard: "PXX", altraCopertura: "P10" }
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
      // Acconti sulla quota eccedente il minimale: due rate di pari importo alle scadenze IRPEF, calcolati sul
      // reddito d'impresa dell'anno precedente con le aliquote dell'anno (INPS, scheda "Aliquote e contributi
      // artigiani"; per i forfettari importo "ordinariamente determinato e poi ridotto del 35%").
      // La misura (100% = 50% + 50%) è desunta da esempi di prassi (Fiscoetasse); gli importi ufficiali sono
      // nel Cassetto previdenziale ("Dati del mod. F24").
      acconto: { percentuale: 1, rate: 2, daVerificare: true },
      // Rate dei contributi sul minimale (circ. INPS 14/2026 p. 9: 18/5 [16/5 è sabato], 20/8, 16/11, 16/2/2027)
      scadenzeFissi: ["05-16", "08-20", "11-16", "02-16"],
      // Causali F24: AF/CF minimale, AP/CP quota eccedente (pagina INPS "F24 per artigiani e commercianti")
      causaliF24: { artigiani: { minimale: "AF", eccedenza: "AP" }, commercianti: { minimale: "CF", eccedenza: "CP" } }
    },
    // Casse professionali: i parametri variano per cassa, vengono inseriti dall'utente.
    cassa: { predefinita: { aliquotaSoggettiva: 0.1, contributoMinimo: 0 } },
    // Fonte: L. 199/2025 art. 1 c. 3 (aliquota del secondo scaglione ridotta al 33%).
    irpef: {
      scaglioni: [
        { fino: 28e3, aliquota: 0.23 },
        { fino: 5e4, aliquota: 0.33 },
        { fino: Infinity, aliquota: 0.43 }
      ],
      // Detrazione per redditi di lavoro autonomo, art. 13 c. 5 e 5-ter TUIR (non cumulabile con quelle dei c. 1-4).
      // VERIFICATO: AdE, specifiche tecniche Redditi PF 2026 (rigo RN7, par. 21.4), quoziente troncato a 4 decimali.
      detrazioneLavoroAutonomo: {
        importoFisso: 1265,
        finoA: 5500,
        base: 500,
        extra: 765,
        finoA2: 28e3,
        divisore: 22500,
        finoA3: 5e4,
        divisore3: 22e3,
        aumento: { da: 11e3, a: 17e3, importo: 50 }
      }
    },
    irap: { aliquota: 0.039 }
    // aliquota ordinaria; le regioni possono variarla
  };

  // js/fiscal/params/index.js
  var PARAMETRI = { 2025: __default, 2026: __default2 };
  function anniDisponibili() {
    return Object.keys(PARAMETRI).map(Number).sort();
  }
  function parametriPerAnno(anno2) {
    const anni = anniDisponibili();
    if (PARAMETRI[anno2]) return { params: PARAMETRI[anno2], esatto: true, annoUsato: anno2 };
    const usato = anni.filter((a) => a < anno2).pop() ?? anni[0];
    return { params: PARAMETRI[usato], esatto: false, annoUsato: usato };
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
  function verificaSoglieRicavi(params, ricaviAnno) {
    const s = params.forfettario.soglie;
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
  function contributiGestioneSeparata(reddito, params, { altraCopertura = false } = {}) {
    const gs = params.gestioneSeparata;
    const aliquota = altraCopertura ? gs.aliquotaConAltraCopertura : gs.aliquotaProfessionistaSenzaCopertura;
    const base = Math.min(clamp0(reddito), gs.massimale);
    return { base, aliquota, totale: round2(base * aliquota) };
  }
  function contributiIvs(reddito, params, gestione, { riduzione35 = false, iscrittoDal1996 = true } = {}) {
    const { ivs, forfettario } = params;
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
  function contributiPrevidenziali(reddito, params, previdenza, opzioni = {}) {
    switch (previdenza.tipo) {
      case "gestione-separata":
        return contributiGestioneSeparata(reddito, params, previdenza);
      case "artigiani":
      case "commercianti":
        return contributiIvs(reddito, params, previdenza.tipo, { iscrittoDal1996: previdenza.iscrittoDal1996 ?? true, ...opzioni });
      case "cassa":
        return contributiCassa(reddito, previdenza.cassa ?? params.cassa.predefinita);
      default:
        throw new Error(`Tipologia previdenziale sconosciuta: ${previdenza.tipo}`);
    }
  }

  // js/fiscal/forfettario.js
  function bolloDovuto(importo, params) {
    const { sogliaImporto, importo: bollo } = params.forfettario.bollo;
    return importo > sogliaImporto ? bollo : 0;
  }
  function aliquotaSostitutiva(params, { annoInizioAttivita, requisitiStartup = false, annoImposta = params.anno }) {
    const { startup, ordinaria, anniStartup } = params.forfettario.aliquote;
    const annoUltimo = annoInizioAttivita + anniStartup - 1;
    const inPeriodo = requisitiStartup && annoImposta >= annoInizioAttivita && annoImposta <= annoUltimo;
    return { aliquota: inPeriodo ? startup : ordinaria, startup: inPeriodo, annoUltimoStartup: annoUltimo };
  }
  function calcolaForfettario(params, dati) {
    const ricavi = round2(dati.ricavi.reduce((s, r) => s + r.importo, 0));
    const redditoLordo = round2(dati.ricavi.reduce((s, r) => s + r.importo * r.coefficiente, 0));
    const contributi = contributiPrevidenziali(redditoLordo, params, dati.previdenza, { riduzione35: dati.riduzione35 });
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
  var anno = (iso3) => iso3 ? Number(iso3.slice(0, 4)) : null;
  function fattureIncassateNellAnno(fatture, clienteId, annoRif) {
    return fatture.filter((f) => f.clienteId === clienteId && f.dataIncasso && anno(f.dataIncasso) === annoRif);
  }
  function ricaviPerAteco(cliente, fatture, annoRif, params) {
    const voci = cliente.ateco.map((v) => ({ ...v, coefficiente: params.forfettario.coefficienti[v.gruppo] ?? 0, importo: 0 }));
    const senzaAteco = { codice: "", descrizione: "Senza codice ATECO", gruppo: null, coefficiente: 0, importo: 0 };
    for (const f of fattureIncassateNellAnno(fatture, cliente.id, annoRif)) {
      const voce = voci.find((v) => v.codice && v.codice === f.atecoCodice) ?? voci[0] ?? senzaAteco;
      voce.importo = round2(voce.importo + f.importo);
    }
    return voci.length ? voci : [senzaAteco];
  }
  function riepilogoAnno(cliente, dati, annoRif, params, opzioni = {}) {
    const perAteco = ricaviPerAteco(cliente, dati.fatture, annoRif, params);
    const ricavi = round2(perAteco.reduce((s, v) => s + v.importo, 0));
    const daIncassare = round2(dati.fatture.filter((f) => f.clienteId === cliente.id && !f.dataIncasso && anno(f.data) === annoRif).reduce((s, f) => s + f.importo, 0));
    const spese = round2(dati.spese.filter((s) => s.clienteId === cliente.id && anno(s.data) === annoRif).reduce((s, x) => s + x.importo, 0));
    const soglie = verificaSoglieRicavi(params, ricavi);
    const alq = aliquotaSostitutiva(params, { annoInizioAttivita: cliente.annoInizioAttivita, requisitiStartup: cliente.startup, annoImposta: annoRif });
    const senzaCoefficienti = perAteco.some((v) => v.importo > 0 && !v.coefficiente);
    const datiForf = {
      ricavi: perAteco.filter((v) => v.importo !== 0).map((v) => ({ importo: v.importo, coefficiente: v.coefficiente })),
      previdenza: cliente.previdenza,
      aliquota: alq.aliquota,
      riduzione35: cliente.previdenza.riduzione35
    };
    let forfettario = senzaCoefficienti ? null : calcolaForfettario(params, datiForf);
    let deduzione = { metodo: "competenza", importo: forfettario?.contributi.totale ?? 0 };
    const registrati = cliente.versamenti?.[annoRif]?.contributiVersatiAnno;
    if (forfettario && Number.isFinite(registrati)) {
      deduzione = { metodo: "registrati", importo: registrati };
    } else if (forfettario && opzioni.paramsPrec && !opzioni.senzaStima) {
      const prec = riepilogoAnno(cliente, dati, annoRif - 1, opzioni.paramsPrec, { senzaStima: true });
      deduzione = { metodo: "stima", importo: prec.forfettario?.contributi.totale ?? 0 };
    }
    if (forfettario && deduzione.metodo !== "competenza") {
      forfettario = calcolaForfettario(params, { ...datiForf, contributiVersati: deduzione.importo });
    }
    return { annoRif, perAteco, ricavi, daIncassare, spese, soglie, aliquota: alq, forfettario, deduzione };
  }

  // js/fiscal/acconti.js
  function accontiSostitutiva(params, impostaAnnoPrecedente, percentualeRata1) {
    const a = { ...params.forfettario.acconto, ...percentualeRata1 !== void 0 ? { percentualeRata1 } : {} };
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
  function accontoInpsTotale(params, previdenza, redditoPrec) {
    const reddito = clamp0(redditoPrec ?? 0);
    if (previdenza.tipo === "gestione-separata") {
      const gs = params.gestioneSeparata;
      const aliquota = previdenza.altraCopertura ? gs.aliquotaConAltraCopertura : gs.aliquotaProfessionistaSenzaCopertura;
      return round2(Math.min(reddito, gs.massimale) * gs.acconto.percentuale * aliquota);
    }
    if (previdenza.tipo === "artigiani" || previdenza.tipo === "commercianti") {
      const r = previdenza.riduzione35 ? 1 - params.forfettario.riduzioneContributiIvs : 1;
      const c = contributiIvs(reddito, params, previdenza.tipo, { iscrittoDal1996: previdenza.iscrittoDal1996 ?? true });
      return round2(c.eccedenza * r * params.ivs.acconto.percentuale);
    }
    return 0;
  }
  function calcolaScadenzario(params, d) {
    const P3 = d.annoPagamento;
    const voci = [];
    const fp = params.forfettario;
    const dataGiugno = d.prorogaEstate2026 && P3 === 2026 ? scadenza(P3, fp.scadenze.saldoEPrimoAccontoProroga2026) : scadenza(P3, fp.scadenze.saldoEPrimoAcconto);
    const dataNovembre = scadenza(P3, fp.scadenze.secondoAcconto);
    const saldo = round2(d.impostaAnnoPrec - d.accontiSostitutivaVersati);
    const acc = accontiSostitutiva(params, d.impostaAnnoPrec, d.percentualeRata1);
    voci.push({
      id: "sost-saldo",
      tipo: "imposta",
      data: dataGiugno,
      descrizione: `Saldo imposta sostitutiva ${P3 - 1}`,
      importo: clamp0(saldo),
      codiceTributo: fp.codiciTributo.saldo,
      annoRiferimento: P3 - 1,
      nota: saldo < 0 ? `Credito di ${Math.abs(saldo).toFixed(2)} \u20AC utilizzabile in compensazione` : ""
    });
    if (acc.prima > 0) voci.push({
      id: "sost-acc1",
      tipo: "imposta",
      data: dataGiugno,
      descrizione: `Primo acconto imposta sostitutiva ${P3}`,
      importo: acc.prima,
      codiceTributo: fp.codiciTributo.accontoPrimaRata,
      annoRiferimento: P3,
      nota: "Metodo storico"
    });
    if (acc.seconda > 0) voci.push({
      id: "sost-acc2",
      tipo: "imposta",
      data: dataNovembre,
      descrizione: acc.prima > 0 ? `Secondo acconto imposta sostitutiva ${P3}` : `Acconto in unica soluzione imposta sostitutiva ${P3}`,
      importo: acc.seconda,
      codiceTributo: fp.codiciTributo.accontoSecondaRataOUnica,
      annoRiferimento: P3,
      nota: "Metodo storico"
    });
    if (d.bollo) {
      const b = fp.bollo.trimestri;
      const [q1, q2, q3] = d.bollo.q;
      const differisci = d.bolloDifferito !== false;
      let dataQ1 = scadenza(P3, b.scadenze[0]), dataQ2 = scadenza(P3, b.scadenze[1]);
      if (differisci && q1 + q2 <= b.sogliaDifferimento) dataQ1 = dataQ2 = scadenza(P3, b.scadenze[2]);
      else if (differisci && q1 <= b.sogliaDifferimento) dataQ1 = dataQ2;
      const bolloVoce = (id2, trimestre, anno2, data, importo) => importo > 0 && voci.push({ id: id2, tipo: "imposta", data, descrizione: `Imposta di bollo sulle fatture, ${trimestre}\xB0 trimestre ${anno2}`, importo: round2(importo), codiceTributo: b.codici[trimestre - 1], annoRiferimento: anno2, nota: "Versamento con F24 (bollo su fatture elettroniche)" });
      bolloVoce("bollo-q4", 4, P3 - 1, scadenza(P3, b.scadenze[3]), d.bollo.precQ4);
      bolloVoce("bollo-q1", 1, P3, dataQ1, q1);
      bolloVoce("bollo-q2", 2, P3, dataQ2, q2);
      bolloVoce("bollo-q3", 3, P3, scadenza(P3, b.scadenze[2]), q3);
    }
    const prev = d.previdenza;
    const inps = d.contributiAnnoPrec;
    if (prev.tipo === "gestione-separata") {
      const gs = params.gestioneSeparata;
      const a = gs.acconto;
      const aliquota = prev.altraCopertura ? gs.aliquotaConAltraCopertura : gs.aliquotaProfessionistaSenzaCopertura;
      const causale = prev.altraCopertura ? gs.causaliF24.altraCopertura : gs.causaliF24.standard;
      const saldoInps = round2(inps.totale - d.accontiInpsVersati);
      const totaleAcc = accontoInpsTotale(params, prev, d.redditoAnnoPrec ?? inps.totale / aliquota);
      const rata1 = round2(totaleAcc / a.rate);
      const rata2 = round2(totaleAcc - rata1);
      voci.push({
        id: "inps-saldo",
        tipo: "inps",
        data: dataGiugno,
        descrizione: `Saldo contributi Gestione Separata ${P3 - 1}`,
        importo: clamp0(saldoInps),
        annoRiferimento: P3 - 1,
        causaleInps: causale,
        nota: saldoInps < 0 ? "Credito" : ""
      });
      voci.push({ id: "inps-acc1", tipo: "inps", data: dataGiugno, descrizione: `Primo acconto contributi Gestione Separata ${P3}`, importo: rata1, annoRiferimento: P3, causaleInps: causale, nota: `${(aliquota * 100).toFixed(2).replace(".", ",")}% sull'80% del reddito ${P3 - 1}, in due rate uguali` });
      voci.push({ id: "inps-acc2", tipo: "inps", data: dataNovembre, descrizione: `Secondo acconto contributi Gestione Separata ${P3}`, importo: rata2, annoRiferimento: P3, causaleInps: causale, nota: "Seconda rata di pari importo" });
    } else if (prev.tipo === "artigiani" || prev.tipo === "commercianti") {
      const ivs = params.ivs;
      const riduzione = prev.riduzione35 ? 1 - fp.riduzioneContributiIvs : 1;
      const fisso = d.contributiFissiAnno ?? round2((ivs.minimale * ivs.aliquote[prev.tipo] + ivs.contributoMaternitaAnnuo) * riduzione);
      ivs.scadenzeFissi.forEach((mmgg, i) => {
        const anno2 = mmgg === "02-16" ? P3 + 1 : P3;
        voci.push({ id: `inps-fisso-${i + 1}`, tipo: "inps", data: scadenza(anno2, mmgg), descrizione: `Contributi fissi IVS ${P3}, rata ${i + 1} di 4`, importo: round2(fisso / 4), annoRiferimento: P3, causaleInps: ivs.causaliF24[prev.tipo].minimale, nota: "Versamento con F24 INPS" });
      });
      const fissoPrec = d.contributiFissiAnnoPrec ?? (inps.fisso !== void 0 ? round2(inps.fisso * riduzione) : fisso);
      const eccedenzaPrec = clamp0(round2(inps.totale - fissoPrec));
      const saldoEcc = round2(eccedenzaPrec - d.accontiInpsVersati);
      const totaleAcc = accontoInpsTotale(params, prev, d.redditoAnnoPrec ?? 0);
      const rataEcc = round2(totaleAcc / ivs.acconto.rate);
      voci.push({ id: "inps-saldo", tipo: "inps", data: dataGiugno, descrizione: `Saldo contributi sul reddito eccedente il minimale ${P3 - 1}`, importo: clamp0(saldoEcc), annoRiferimento: P3 - 1, causaleInps: ivs.causaliF24[prev.tipo].eccedenza, nota: saldoEcc < 0 ? "Credito" : "" });
      if (rataEcc > 0) {
        const nota2 = "Due rate uguali sul reddito dell\u2019anno precedente: importi ufficiali nel Cassetto previdenziale INPS";
        voci.push({ id: "inps-acc1", tipo: "inps", data: dataGiugno, descrizione: `Primo acconto contributi sul reddito eccedente ${P3}`, importo: rataEcc, annoRiferimento: P3, causaleInps: ivs.causaliF24[prev.tipo].eccedenza, nota: nota2 });
        voci.push({ id: "inps-acc2", tipo: "inps", data: dataNovembre, descrizione: `Secondo acconto contributi sul reddito eccedente ${P3}`, importo: round2(totaleAcc - rataEcc), annoRiferimento: P3, causaleInps: ivs.causaliF24[prev.tipo].eccedenza, nota: nota2 });
      }
    } else {
      const manuali = d.scadenzeManuali ?? [];
      if (manuali.length === 0) {
        voci.push({ id: "inps-cassa", tipo: "inps", data: null, descrizione: "Contributi alla cassa professionale", importo: 0, nota: "Scadenze e importi definiti dalla cassa di appartenenza: inseriscili a mano nella sezione dedicata." });
      }
      manuali.forEach((m, i) => voci.push({ id: `cassa-${i}`, tipo: "inps", data: m.data ? prossimoLavorativo(m.data) : null, descrizione: m.descrizione || "Contributo cassa professionale", importo: round2(m.importo ?? 0), nota: m.nota ?? "Inserito manualmente" }));
    }
    voci.push({ id: "dichiarazione", tipo: "adempimento", data: scadenza(P3, fp.scadenze.dichiarazione), descrizione: `Invio dichiarazione dei redditi (anno d'imposta ${P3 - 1})`, importo: 0, annoRiferimento: P3 - 1, nota: "" });
    return voci.sort((a, b) => (a.data ?? "9999").localeCompare(b.data ?? "9999") || a.id.localeCompare(b.id));
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
  function bolloPerTrimestre(fatture, clienteId, anno2) {
    const q = [0, 0, 0, 0];
    for (const f of fatture) {
      if (f.clienteId !== clienteId || !f.bollo || !f.data.startsWith(String(anno2))) continue;
      q[Math.floor((Number(f.data.slice(5, 7)) - 1) / 3)] += f.bollo;
    }
    return q.map(round2);
  }

  // js/domain/scadenze-cliente.js
  function scadenzarioCliente(cliente, dati, P3, paramsPer, over = {}) {
    const pP = paramsPer(P3), pPrec = paramsPer(P3 - 1), pPrec2 = paramsPer(P3 - 2);
    const prec = riepilogoAnno(cliente, dati, P3 - 1, pPrec.params, { paramsPrec: pPrec2.params });
    const prec2 = riepilogoAnno(cliente, dati, P3 - 2, pPrec2.params, { senzaStima: true });
    const versati = cliente.versamenti?.[P3 - 1] ?? {};
    const stima = {
      imposta: prec.forfettario?.imposta ?? 0,
      reddito: prec.forfettario?.redditoLordo ?? 0,
      contributi: prec.forfettario?.contributi ?? { totale: 0 },
      // acconti dell'anno precedente stimati con la regola storica sull'anno ancora prima
      accSost: accontiSostitutiva(pPrec.params, prec2.forfettario?.imposta ?? 0, over.rata1 ?? 0.5).totale,
      accInps: accontoInpsTotale(pPrec.params, cliente.previdenza, prec2.forfettario?.redditoLordo ?? 0)
    };
    const usa = (chiave, salvato) => over[chiave] ?? salvato ?? stima[chiave];
    const effettivi = {
      imposta: usa("imposta"),
      reddito: usa("reddito"),
      contributi: over.contributi ?? stima.contributi.totale,
      accSost: usa("accSost", versati.sostitutiva),
      accInps: usa("accInps", versati.inps)
    };
    const voci = calcolaScadenzario(pP.params, {
      annoPagamento: P3,
      impostaAnnoPrec: effettivi.imposta,
      accontiSostitutivaVersati: effettivi.accSost,
      contributiAnnoPrec: { ...stima.contributi, totale: effettivi.contributi },
      redditoAnnoPrec: effettivi.reddito,
      accontiInpsVersati: effettivi.accInps,
      previdenza: cliente.previdenza,
      prorogaEstate2026: over.proroga ?? P3 === 2026,
      percentualeRata1: over.rata1 ?? 0.5,
      bollo: { precQ4: bolloPerTrimestre(dati.fatture, cliente.id, P3 - 1)[3], q: bolloPerTrimestre(dati.fatture, cliente.id, P3).slice(0, 3) },
      bolloDifferito: over.bolloDifferito ?? true,
      scadenzeManuali: (cliente.scadenzeCassa ?? []).filter((m) => m.anno === P3)
    }).map((v) => ({ ...v, versata: cliente.pagati?.[`${P3}:${v.id}`] ?? null }));
    return { voci, stima, effettivi, paramsInfo: pP, paramsPrecInfo: pPrec };
  }

  // js/domain/studio.js
  function panoramicaStudio(dati, anno2, paramsPer, oggi) {
    const righe = dati.clienti.map((c) => {
      const r = riepilogoAnno(c, dati, anno2, paramsPer(anno2).params, { paramsPrec: paramsPer(anno2 - 1).params });
      const voci = scadenzarioCliente(c, dati, anno2, paramsPer).voci.filter((v) => v.importo > 0 && v.data && !v.versata);
      const prossima = voci.find((v) => v.data >= oggi) ?? null;
      const scadute = voci.filter((v) => v.data < oggi);
      return { cliente: c, riepilogo: r, prossima, scadute };
    });
    const totaleRicavi = righe.reduce((s, r) => s + r.riepilogo.ricavi, 0);
    const daMonitorare = righe.filter((r) => ["attenzione", "esce-anno-successivo", "esce-subito"].includes(r.riepilogo.soglie.stato));
    return { righe, totaleRicavi, daMonitorare, nScadute: righe.reduce((s, r) => s + r.scadute.length, 0) };
  }
  function agendaStudio(dati, anno2, paramsPer, { soloFuture = false, oggi } = {}) {
    const voci = [];
    for (const c of dati.clienti) {
      for (const v of scadenzarioCliente(c, dati, anno2, paramsPer).voci) {
        if (!v.data) continue;
        if (soloFuture && v.data < oggi) continue;
        voci.push({ ...v, cliente: c });
      }
    }
    return voci.sort((a, b) => a.data.localeCompare(b.data) || a.cliente.nome.localeCompare(b.cliente.nome));
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
      scadenzeCassa: [],
      // versamenti alla cassa professionale inseriti a mano {anno, data, descrizione, importo}
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

  // js/domain/validazione.js
  function partitaIvaValida(piva) {
    if (!/^\d{11}$/.test(piva)) return false;
    let somma = 0;
    for (let i = 0; i < 10; i++) {
      let d = Number(piva[i]);
      if (i % 2 === 1) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      somma += d;
    }
    return (10 - somma % 10) % 10 === Number(piva[10]);
  }
  var DISPARI = { 0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21, A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18, N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23 };
  function codiceFiscaleValido(cf) {
    const v = String(cf).toUpperCase();
    if (!/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(v)) return false;
    let somma = 0;
    for (let i = 0; i < 15; i++) {
      const c = v[i];
      if (i % 2 === 0) somma += DISPARI[c];
      else somma += /\d/.test(c) ? Number(c) : c.charCodeAt(0) - 65;
    }
    return String.fromCharCode(65 + somma % 26) === v[15];
  }
  function codiceFiscaleSocietaValido(cf) {
    return partitaIvaValida(cf);
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
  function coefficienteAteco2025(codice, params) {
    const indici = ateco2025_default[String(codice).trim()];
    if (!indici) return null;
    const nomi = Object.keys(params.forfettario.coefficienti);
    const candidati = [...indici].map((i) => ({ gruppo: nomi[Number(i)], coefficiente: params.forfettario.coefficienti[nomi[Number(i)]] }));
    return { univoco: candidati.length === 1, candidati };
  }

  // js/fiscal/data/ateco2025-titoli.js
  var ateco2025_titoli_default = { "01.11.00": "Coltivazione di cereali, legumi da granella e semi oleosi, escluso il riso", "01.12.00": "Coltivazione di riso", "01.13.11": "Coltivazione di ortaggi e meloni in piena aria", "01.13.12": "Coltivazione di ortaggi e meloni in colture protette fuori suolo", "01.13.13": "Coltivazione di ortaggi e meloni in altre colture protette, escluse colture fuori suolo", "01.13.20": "Coltivazione di radici, incluse barbabietole da zucchero", "01.13.30": "Coltivazione di tuberi, incluse patate", "01.14.00": "Coltivazione di canna da zucchero", "01.15.00": "Coltivazione di tabacco", "01.16.00": "Coltivazione di piante tessili", "01.19.11": "Coltivazione di fiori in piena aria", "01.19.12": "Coltivazione di fiori in colture protette fuori suolo", "01.19.13": "Coltivazione di fiori in altre colture protette, escluse colture fuori suolo", "01.19.90": "Coltivazione di piante da foraggio e di altre colture agricole non permanenti n.c.a.", "01.21.00": "Coltivazione di uva", "01.22.00": "Coltivazione di frutta di origine tropicale e subtropicale", "01.23.00": "Coltivazione di agrumi", "01.24.00": "Coltivazione di pomacee e frutta a nocciolo", "01.25.00": "Coltivazione di altri alberi da frutto, frutti di bosco e frutta in guscio", "01.26.00": "Coltivazione di frutti oleosi", "01.27.00": "Coltivazione di piante per la produzione di bevande", "01.28.00": "Coltivazione di spezie, piante aromatiche e farmaceutiche", "01.29.00": "Coltivazione di altre colture agricole permanenti", "01.30.00": "Riproduzione delle piante", "01.41.00": "Allevamento di bovini da latte", "01.42.00": "Allevamento di altri bovini e bufalini", "01.43.00": "Allevamento di cavalli e altri equini", "01.44.00": "Allevamento di cammelli e camelidi", "01.45.00": "Allevamento di ovini e caprini", "01.46.00": "Allevamento di suini", "01.47.00": "Allevamento di pollame", "01.48.10": "Allevamento di conigli", "01.48.20": "Allevamento di altri animali da pelliccia", "01.48.30": "Apicoltura", "01.48.40": "Bachicoltura", "01.48.91": "Allevamento di insetti", "01.48.99": "Allevamento di altri animali vari n.c.a.", "01.50.00": "Coltivazioni agricole associate all'allevamento di animali: attivit\xE0 mista", "01.61.10": "Manutenzione del terreno per mantenerlo in buone condizioni", "01.61.91": "Trattamenti fitosanitari", "01.61.99": "Altre attivit\xE0 di supporto alla produzione vegetale n.c.a.", "01.62.01": "Attivit\xE0 di maniscalchi", "01.62.09": "Altre attivit\xE0 di supporto alla produzione animale", "01.63.10": "Attivit\xE0 successive alla raccolta", "01.63.20": "Lavorazione delle sementi per la semina", "01.70.00": "Caccia, cattura di animali e servizi connessi", "02.10.00": "Silvicoltura e altre attivit\xE0 forestali", "02.20.00": "Utilizzo di aree forestali", "02.30.00": "Raccolta di prodotti selvatici non legnosi", "02.40.00": "Servizi di supporto per la silvicoltura", "03.11.00": "Pesca marina", "03.12.00": "Pesca in acque dolci", "03.21.01": "Coltivazione di alghe marine", "03.21.09": "Altre attivit\xE0 di acquacoltura marina", "03.22.01": "Coltivazione di alghe in acque dolci", "03.22.09": "Altre attivit\xE0 di acquacoltura in acque dolci", "03.30.00": "Attivit\xE0 di supporto alla pesca e all'acquacoltura", "05.10.00": "Estrazione di antracite", "05.20.00": "Estrazione di lignite", "06.10.00": "Estrazione di petrolio greggio", "06.20.00": "Estrazione di gas naturale", "07.10.00": "Estrazione di minerali metalliferi ferrosi", "07.21.00": "Estrazione di minerali di uranio e torio", "07.29.00": "Estrazione di altri minerali metalliferi non ferrosi", "08.11.00": "Estrazione di pietre ornamentali, calcare, pietra di gesso, ardesia e altre pietre", "08.12.00": "Estrazione di ghiaia, sabbia, argilla e caolino", "08.91.00": "Estrazione di minerali per l'industria chimica e per la produzione di fertilizzanti", "08.92.00": "Estrazione di torba", "08.93.01": "Estrazione di sale dal sottosuolo", "08.93.02": "Salicoltura marina", "08.93.03": "Produzione di sale da salamoia", "08.99.01": "Estrazione di asfalto e bitume naturale", "08.99.09": "Altre attivit\xE0 estrattive varie n.c.a.", "09.10.00": "Attivit\xE0 di supporto all'estrazione di petrolio e gas naturale", "09.90.00": "Attivit\xE0 di supporto ad altre attivit\xE0 estrattive", "10.11.00": "Lavorazione e conservazione di carne, esclusa la carne di volatili", "10.12.00": "Lavorazione e conservazione di carne di volatili", "10.13.00": "Produzione di prodotti a base di carne, inclusi prodotti a base di carne di volatili", "10.20.01": "Lavorazione di alghe", "10.20.09": "Altre attivit\xE0 di lavorazione e conservazione di pesce, crostacei e molluschi", "10.31.00": "Lavorazione e conservazione di patate", "10.32.00": "Produzione di succhi a base di frutta e ortaggi", "10.39.00": "Altre attivit\xE0 di lavorazione e conservazione di frutta e ortaggi", "10.41.10": "Produzione di olio di oliva", "10.41.20": "Produzione di altri oli vegetali", "10.41.30": "Produzione di oli e grassi animali", "10.42.00": "Produzione di margarina e di grassi alimentari simili", "10.51.10": "Trattamento igienico del latte", "10.51.20": "Produzione di derivati del latte", "10.52.00": "Produzione di gelati", "10.61.11": "Lavorazione di frumento", "10.61.19": "Lavorazione di altri cereali", "10.61.20": "Lavorazione del riso", "10.61.90": "Lavorazioni di altre granaglie", "10.62.00": "Produzione di amidi e di prodotti amidacei", "10.71.10": "Produzione di pane e prodotti di panetteria simili", "10.71.20": "Produzione di prodotti di pasticceria freschi", "10.72.00": "Produzione di fette biscottate, biscotti, prodotti di pasticceria conservati", "10.73.01": "Produzione di prodotti farinacei freschi", "10.73.02": "Produzione di prodotti farinacei conservati", "10.81.00": "Produzione di zucchero", "10.82.00": "Produzione di cacao, cioccolato, caramelle e confetterie", "10.83.01": "Lavorazione di t\xE8 e di altri preparati per infusi", "10.83.02": "Lavorazione di caff\xE8", "10.84.00": "Produzione di condimenti e spezie", "10.85.01": "Produzione di pasti e piatti preparati a base di carne, inclusi pasti e piatti preparati a base di carne di volatili", "10.85.02": "Produzione di pasti e piatti preparati a base di pesce", "10.85.03": "Produzione di pasti e piatti preparati a base di ortaggi", "10.85.04": "Produzione di pizza surgelata o altrimenti conservata", "10.85.05": "Produzione di pasti e piatti preparati a base di pasta", "10.85.09": "Produzione di altri pasti e piatti preparati", "10.86.00": "Produzione di preparati omogeneizzati e di alimenti dietetici", "10.89.01": "Produzione di integratori alimentari", "10.89.09": "Produzione di altri prodotti alimentari vari n.c.a.", "10.91.00": "Produzione di mangimi per l'alimentazione degli animali da allevamento", "10.92.00": "Produzione di prodotti per l'alimentazione degli animali da compagnia", "11.01.00": "Distillazione, rettifica e miscelatura di alcolici", "11.02.10": "Produzione di vini, esclusi vini spumanti e altri vini speciali", "11.02.20": "Produzione di vini spumanti e altri vini speciali", "11.03.00": "Produzione di sidro e di altre bevande fermentate a base di frutta", "11.04.00": "Produzione di altre bevande fermentate non distillate", "11.05.00": "Produzione di birra", "11.06.00": "Produzione di malto", "11.07.01": "Produzione di bibite analcoliche", "11.07.02": "Produzione di acque in bottiglia", "12.00.00": "Produzione di prodotti del tabacco", "13.10.00": "Preparazione e filatura di fibre tessili", "13.20.00": "Tessitura", "13.30.00": "Finissaggio dei tessili", "13.91.00": "Fabbricazione di tessuti a maglia e all'uncinetto", "13.92.10": "Fabbricazione di tessili per la casa", "13.92.20": "Fabbricazione di tessili per l'arredo", "13.93.00": "Fabbricazione di tappeti e moquette", "13.94.00": "Fabbricazione di spago, corde, funi e reti", "13.95.00": "Fabbricazione di tessuti non-tessuti e di articoli in tessuto non-tessuto", "13.96.00": "Fabbricazione di altri tessuti per uso tecnico e industriale", "13.99.10": "Fabbricazione di ricami, tulle, pizzi e merletti", "13.99.90": "Fabbricazione di feltro e altri prodotti tessili diversi n.c.a.", "14.10.10": "Fabbricazione di articoli di calzetteria a maglia e all'uncinetto", "14.10.20": "Fabbricazione di maglioni e altri articoli a maglia e all'uncinetto", "14.21.10": "Fabbricazione in serie di abbigliamento esterno", "14.21.20": "Sartoria e confezione su misura di abbigliamento esterno", "14.22.00": "Fabbricazione di biancheria intima", "14.23.00": "Fabbricazione di indumenti da lavoro", "14.24.00": "Fabbricazione di abbigliamento in pelle e in pelliccia", "14.29.00": "Fabbricazione di altri articoli di abbigliamento e accessori n.c.a.", "15.11.00": "Concia, tintura e rifinizione di pelli, cuoi e pellicce", "15.12.00": "Fabbricazione di articoli da viaggio, borse, pelletteria e selleria di qualsiasi materiale", "15.20.10": "Fabbricazione di calzature, escluse parti in cuoio per calzature", "15.20.20": "Fabbricazione di parti in cuoio per calzature", "16.11.00": "Taglio e piallatura del legno", "16.12.00": "Lavorazione e finitura del legno", "16.21.00": "Fabbricazione di fogli da impiallacciatura e di pannelli a base di legno", "16.22.00": "Fabbricazione di pavimenti di legno con elementi pre-assemblati", "16.23.01": "Fabbricazione di stand e strutture simili in legno per convegni e fiere", "16.23.09": "Fabbricazione di altri prodotti di carpenteria in legno e falegnameria per l'edilizia n.c.a.", "16.24.00": "Fabbricazione di imballaggi in legno", "16.25.00": "Fabbricazione di porte e finestre in legno", "16.26.00": "Produzione di combustibili solidi da biomassa vegetale", "16.27.00": "Finitura di prodotti in legno", "16.28.11": "Fabbricazione di cornici", "16.28.19": "Fabbricazione di altri prodotti in legno n.c.a.", "16.28.20": "Fabbricazione di articoli in sughero", "16.28.30": "Fabbricazione di articoli in paglia e materiali da intreccio", "17.11.00": "Fabbricazione di pasta-carta", "17.12.00": "Fabbricazione di carta e cartone", "17.21.00": "Fabbricazione di carta, cartone ondulato e di imballaggi di carta e cartone", "17.22.00": "Fabbricazione di prodotti igienico-sanitari e per uso domestico in carta e ovatta di cellulosa", "17.23.01": "Fabbricazione di prodotti cartotecnici scolastici e commerciali", "17.23.09": "Fabbricazione di altri prodotti cartotecnici", "17.24.00": "Fabbricazione di carta da parati", "17.25.00": "Fabbricazione di altri articoli di carta e cartone", "18.11.00": "Stampa di giornali", "18.12.00": "Altra stampa", "18.13.00": "Lavorazioni preliminari alla stampa e ai media", "18.14.00": "Legatoria e servizi connessi", "18.20.00": "Riproduzione di supporti registrati", "19.10.00": "Fabbricazione di prodotti di cokeria", "19.20.10": "Raffinazione di petrolio", "19.20.20": "Fabbricazione di derivati del petrolio", "19.20.30": "Miscelazione di gas petroliferi liquefatti (GPL) e loro imbottigliamento", "19.20.40": "Fabbricazione di prodotti di base per la copertura stradale", "19.20.90": "Fabbricazione di altri prodotti derivanti dalla raffinazione del petrolio e prodotti da combustibili fossili", "20.11.00": "Fabbricazione di gas industriali", "20.12.00": "Fabbricazione di coloranti e pigmenti", "20.13.00": "Fabbricazione di altri prodotti chimici di base inorganici", "20.14.00": "Fabbricazione di altri prodotti chimici di base organici", "20.15.00": "Fabbricazione di fertilizzanti e composti azotati", "20.16.00": "Fabbricazione di materie plastiche in forme primarie", "20.17.00": "Fabbricazione di gomma sintetica in forme primarie", "20.20.00": "Fabbricazione di fitofarmaci, disinfettanti e altri prodotti chimici per l'agricoltura", "20.30.00": "Fabbricazione di pitture, vernici e smalti, inchiostri da stampa e adesivi sintetici", "20.41.10": "Fabbricazione di saponi, detergenti e preparazioni tensioattive", "20.41.20": "Fabbricazione di glicerina e altri prodotti per la pulizia e la lucidatura", "20.42.00": "Fabbricazione di profumi e cosmetici", "20.51.00": "Produzione di biocarburanti liquidi", "20.59.11": "Fabbricazione di fiammiferi", "20.59.12": "Fabbricazione di articoli esplosivi", "20.59.20": "Fabbricazione di colle", "20.59.30": "Fabbricazione di oli essenziali", "20.59.91": "Fabbricazione di liquidi per inalazione per sigarette elettroniche", "20.59.99": "Fabbricazione di tutti gli altri prodotti chimici vari n.c.a.", "20.60.00": "Fabbricazione di fibre sintetiche e artificiali", "21.10.00": "Fabbricazione di prodotti farmaceutici di base", "21.20.01": "Fabbricazione di sostanze diagnostiche radioattive in vivo", "21.20.09": "Fabbricazione di medicinali e altri preparati farmaceutici", "22.11.10": "Fabbricazione di pneumatici e camere d'aria", "22.11.20": "Rigenerazione e ricostruzione di pneumatici", "22.12.00": "Fabbricazione di altri prodotti in gomma", "22.21.00": "Fabbricazione di lastre, fogli, tubi e profilati in materie plastiche", "22.22.00": "Fabbricazione di imballaggi in materie plastiche", "22.23.00": "Fabbricazione di porte e finestre in materie plastiche", "22.24.01": "Fabbricazione di rivestimenti per pareti e pavimenti in materie plastiche", "22.24.09": "Fabbricazione di altri articoli in materie plastiche per l'edilizia", "22.25.00": "Lavorazione e finitura di prodotti in materie plastiche", "22.26.11": "Fabbricazione di articoli e attrezzature per la pulizia per uso domestico in materie plastiche", "22.26.12": "Fabbricazione di articoli e attrezzature per la pulizia per uso non domestico in materie plastiche", "22.26.91": "Fabbricazione di articoli per l'ufficio e la scuola in materie plastiche", "22.26.99": "Fabbricazione di altri prodotti vari in materie plastiche n.c.a.", "23.11.00": "Fabbricazione di vetro piano", "23.12.00": "Lavorazione e trasformazione del vetro piano", "23.13.00": "Fabbricazione di vetro cavo", "23.14.00": "Fabbricazione di fibre di vetro", "23.15.10": "Lavorazione di vetro a mano e a soffio artistico", "23.15.90": "Altre attivit\xE0 di fabbricazione e lavorazione di altro vetro incluso il vetro per usi tecnici", "23.20.00": "Fabbricazione di prodotti refrattari", "23.31.00": "Fabbricazione di piastrelle in ceramica per pavimenti e rivestimenti", "23.32.00": "Fabbricazione di mattoni, tegole e altri prodotti per l'edilizia in terracotta", "23.41.00": "Fabbricazione di prodotti in ceramica per usi domestici e ornamentali", "23.42.00": "Fabbricazione di articoli sanitari in ceramica", "23.43.00": "Fabbricazione di isolatori e di pezzi isolanti in ceramica", "23.44.00": "Fabbricazione di altri prodotti in ceramica per uso tecnico e industriale", "23.45.00": "Fabbricazione di altri prodotti in ceramica", "23.51.00": "Produzione di cemento", "23.52.10": "Produzione di calce", "23.52.20": "Produzione di gesso", "23.61.01": "Fabbricazione di tubi prefabbricati in calcestruzzo per acqua potabile", "23.61.02": "Fabbricazione di caminetti prefabbricati in calcestruzzo", "23.61.03": "Fabbricazione di elementi prefabbricati in calcestruzzo per l'edilizia", "23.61.04": "Fabbricazione di strutture prefabbricate in calcestruzzo per l'edilizia", "23.61.09": "Fabbricazione di prodotti in calcestruzzo per l'edilizia n.c.a.", "23.62.00": "Fabbricazione di prodotti in gesso per l'edilizia", "23.63.00": "Produzione di calcestruzzo pronto per l'uso", "23.64.00": "Produzione di malta", "23.65.01": "Fabbricazione di prodotti in sostanze vegetali agglomerate con cemento, gesso o altri leganti minerali", "23.65.02": "Fabbricazione di prodotti in asbesto-cemento o cellulosa fibrocemento", "23.66.01": "Fabbricazione di statue, bassorilievi e altorilievi, vasi e fioriere", "23.66.09": "Fabbricazione di altri prodotti in calcestruzzo, cemento e gesso n.c.a.", "23.70.10": "Taglio e lavorazione di pietre e di marmo", "23.70.20": "Lavorazione artistica di marmo e di altre pietre affini", "23.70.30": "Frantumazione di pietre", "23.91.00": "Fabbricazione di prodotti abrasivi", "23.99.00": "Fabbricazione di altri prodotti in minerali non metalliferi n.c.a.", "24.10.00": "Fabbricazione di ferro, acciaio e ferroleghe", "24.20.10": "Fabbricazione di tubi, condotti, profilati cavi non saldati e relativi raccordi in acciaio", "24.20.20": "Fabbricazione di tubi, condotti, profilati cavi saldati e relativi raccordi in acciaio", "24.31.00": "Trafilatura a freddo di barre", "24.32.00": "Laminazione a freddo di nastri", "24.33.01": "Profilatura mediante formatura o piegatura a freddo di profilati aperti e lamiere grecate", "24.33.02": "Profilatura mediante formatura o piegatura a freddo di pannelli stratificati", "24.33.03": "Presagomatura dell'acciaio per cemento armato e attivit\xE0 simili", "24.34.00": "Trafilatura a freddo di fili", "24.41.00": "Produzione di metalli preziosi", "24.42.00": "Produzione di alluminio", "24.43.00": "Produzione di piombo, zinco e stagno", "24.44.00": "Produzione di rame", "24.45.00": "Produzione di altri metalli non ferrosi", "24.46.00": "Trattamento di combustibili nucleari", "24.51.01": "Fusione di getti in ghisa grigia o lamellare", "24.51.02": "Fusione di getti in ghisa duttile", "24.51.09": "Fusione di getti in ghisa n.c.a.", "24.52.00": "Fusione di getti in acciaio", "24.53.01": "Fusione di getti in alluminio", "24.53.02": "Fusione di getti in magnesio", "24.53.03": "Fusione di getti in superleghe a base cobalto", "24.53.09": "Fusione di getti in metalli leggeri n.c.a.", "24.54.01": "Fusione di getti in rame", "24.54.02": "Fusione di getti in zinco", "24.54.03": "Fusione di getti in nichel", "24.54.09": "Fusione di getti in altri metalli non ferrosi n.c.a.", "25.11.00": "Fabbricazione di strutture metalliche e di parti di strutture metalliche", "25.12.10": "Fabbricazione di porte, finestre e loro telai, imposte e cancelli in metallo", "25.12.20": "Fabbricazione di tende in metallo e prodotti simili", "25.21.10": "Fabbricazione di radiatori e contenitori in metallo per caldaie per il riscaldamento centrale", "25.21.20": "Fabbricazione di generatori di vapore", "25.22.00": "Fabbricazione di altre cisterne, serbatoi e contenitori in metallo", "25.30.10": "Fabbricazione di armi e munizioni per uso militare", "25.30.20": "Fabbricazione di armi e munizioni per uso sportivo e civile", "25.40.00": "Fucinatura e formatura dei metalli e metallurgia delle polveri", "25.51.00": "Rivestimento dei metalli", "25.52.00": "Trattamento termico dei metalli", "25.53.00": "Lavori di meccanica generale dei metalli", "25.61.00": "Fabbricazione di articoli di coltelleria e posateria", "25.62.00": "Fabbricazione di serrature e cerniere", "25.63.11": "Fabbricazione di utensileria ad azionamento manuale", "25.63.12": "Fabbricazione di parti intercambiabili per macchine utensili", "25.63.20": "Fabbricazione di stampi, portastampi, sagome, forme per macchine", "25.91.00": "Fabbricazione di bidoni in acciaio e di contenitori simili", "25.92.00": "Fabbricazione di imballaggi in metallo leggero", "25.93.10": "Fabbricazione di prodotti fabbricati con fili metallici", "25.93.20": "Fabbricazione di catene", "25.93.30": "Fabbricazione di molle", "25.94.00": "Fabbricazione di articoli di bulloneria", "25.99.10": "Fabbricazione di articoli domestici in metallo per la cucina e le stanze da bagno", "25.99.20": "Fabbricazione di casseforti, cassette di sicurezza e porte metalliche blindate", "25.99.90": "Fabbricazione di altri prodotti vari in metallo n.c.a.", "26.11.00": "Fabbricazione di componenti elettronici", "26.12.00": "Fabbricazione di schede elettroniche integrate", "26.20.00": "Fabbricazione di computer e unit\xE0 periferiche", "26.30.01": "Fabbricazione di apparecchiature trasmittenti radiotelevisive", "26.30.09": "Fabbricazione di altre apparecchiature per le comunicazioni", "26.40.01": "Fabbricazione di console per videogiochi", "26.40.09": "Fabbricazione di altri prodotti di elettronica di consumo", "26.51.10": "Fabbricazione di strumenti per navigazione, idrologia, geofisica e meteorologia", "26.51.21": "Fabbricazione di sistemi antifurto e antincendio", "26.51.29": "Fabbricazione di altri strumenti e apparecchi di misurazione e prova n.c.a.", "26.52.00": "Fabbricazione di orologi", "26.60.01": "Fabbricazione di apparecchiature per irradiazione, elettromedicali ed elettroterapeutiche per usi medici", "26.60.02": "Fabbricazione di apparecchiature per irradiazione, elettromedicali ed elettroterapeutiche per usi non medici", "26.70.11": "Fabbricazione di strumenti ottici e strumenti ottici di precisione", "26.70.12": "Fabbricazione di strumenti ottici di misurazione e controllo", "26.70.20": "Fabbricazione di supporti magnetici e ottici", "26.70.30": "Fabbricazione di apparecchiature fotografiche", "27.11.00": "Fabbricazione di motori, generatori e trasformatori elettrici", "27.12.00": "Fabbricazione di apparecchiature per la distribuzione e il controllo dell'elettricit\xE0", "27.20.00": "Fabbricazione di batterie e accumulatori", "27.31.00": "Fabbricazione di cavi in fibra ottica", "27.32.00": "Fabbricazione di altri fili e cavi elettronici ed elettrici", "27.33.00": "Fabbricazione di attrezzature per cablaggio", "27.40.01": "Fabbricazione di apparecchiature per l'illuminazione per mezzi di trasporto", "27.40.02": "Fabbricazione di luminarie per feste", "27.40.09": "Fabbricazione di altre apparecchiature per l'illuminazione", "27.51.00": "Fabbricazione di elettrodomestici", "27.52.00": "Fabbricazione di apparecchi non elettrici per uso domestico", "27.90.01": "Fabbricazione di apparecchiature elettriche per saldatura e brasatura", "27.90.02": "Fabbricazione di insegne elettriche e apparecchiature elettriche di segnalazione", "27.90.03": "Fabbricazione di capacitori, resistenze, condensatori elettrici e simili", "27.90.04": "Fabbricazione di apparecchiature elettriche per parrucchieri, solarium e centri estetici", "27.90.09": "Fabbricazione di altre apparecchiature elettriche n.c.a.", "28.11.10": "Fabbricazione di motori, esclusi motori per aeromobili, veicoli e motocicli", "28.11.20": "Fabbricazione di turbine", "28.12.00": "Fabbricazione di apparecchiature fluidodinamiche", "28.13.00": "Fabbricazione di altre pompe e compressori", "28.14.00": "Fabbricazione di altri rubinetti e valvole", "28.15.00": "Fabbricazione di cuscinetti, ingranaggi e organi di trasmissione", "28.21.10": "Fabbricazione di forni", "28.21.20": "Fabbricazione di caldaie e apparecchiature fisse per il riscaldamento domestico", "28.22.01": "Fabbricazione di ascensori, scale mobili e tappeti mobili", "28.22.09": "Fabbricazione di altri apparecchi di sollevamento e movimentazione", "28.23.00": "Fabbricazione di macchine e attrezzature per ufficio, esclusi computer e unit\xE0 periferiche", "28.24.00": "Fabbricazione di utensili portatili a motore", "28.25.00": "Fabbricazione di apparecchiature di climatizzazione per uso non domestico", "28.29.10": "Fabbricazione di bilance e distributori automatici", "28.29.20": "Fabbricazione di impianti di distillazione o rettificazione per raffinerie di petrolio e industrie chimiche", "28.29.30": "Fabbricazione di macchine per la dosatura, la confezione e per l'imballaggio", "28.29.41": "Fabbricazione di macchine per la pulizia di pavimenti, superfici e ambienti per uso non domestico", "28.29.49": "Fabbricazione di altre macchine per la pulizia per uso non domestico", "28.29.91": "Fabbricazione di apparecchi per depurare e filtrare liquidi", "28.29.92": "Fabbricazione di livelle, metri doppi a nastro e utensili simili, strumenti di precisione per meccanica", "28.29.99": "Fabbricazione di altre macchine varie di impiego generale n.c.a.", "28.30.10": "Fabbricazione di trattori per l'agricoltura e la silvicoltura", "28.30.91": "Fabbricazione di macchine per il giardinaggio e la cura del verde", "28.30.99": "Fabbricazione di altre macchine per l'agricoltura e la silvicoltura n.c.a.", "28.41.00": "Fabbricazione di macchine per la deformazione dei metalli e di altre macchine utensili per la lavorazione dei metalli", "28.42.00": "Fabbricazione di altre macchine utensili", "28.91.00": "Fabbricazione di macchine per la metallurgia", "28.92.00": "Fabbricazione di macchine da miniera, cava e cantiere", "28.93.00": "Fabbricazione di macchine per l'industria alimentare, delle bevande e del tabacco", "28.94.10": "Fabbricazione di macchine tessili", "28.94.20": "Fabbricazione di macchine per la lavorazione delle pelli e del cuoio", "28.94.30": "Fabbricazione di macchine per lavanderie e stirerie", "28.95.00": "Fabbricazione di macchine per l'industria della carta e del cartone", "28.96.00": "Fabbricazione di macchine per l'industria delle materie plastiche e della gomma", "28.97.01": "Fabbricazione di macchine per la produzione additiva per deposizione di materiali metallici", "28.97.02": "Fabbricazione di macchine per la produzione additiva per deposizione di materie plastiche o di gomma", "28.97.09": "Fabbricazione di macchine per la produzione additiva n.c.a.", "28.99.10": "Fabbricazione di macchine per la stampa e la legatoria", "28.99.20": "Fabbricazione di robot industriali con compiti multipli per scopi speciali", "28.99.91": "Fabbricazione di apparecchiature per il lancio di aeromobili, catapulte per portaerei e relative attrezzature", "28.99.92": "Fabbricazione di giostre, altalene e altre attrazioni di divertimento", "28.99.93": "Fabbricazione di apparecchiature per l'allineamento e il bilanciamento delle ruote e altre apparecchiature per il bilanciamento", "28.99.99": "Fabbricazione di tutte le altre macchine varie per impieghi speciali n.c.a.", "29.10.00": "Fabbricazione di autoveicoli", "29.20.00": "Fabbricazione di carrozzerie per autoveicoli; fabbricazione di rimorchi e semirimorchi", "29.31.00": "Fabbricazione di apparecchiature elettriche ed elettroniche per autoveicoli", "29.32.00": "Fabbricazione di altre parti e accessori per autoveicoli", "30.11.00": "Costruzione di navi e di strutture galleggianti per scopi civili", "30.12.00": "Costruzione di imbarcazioni da diporto e sportive", "30.13.00": "Costruzione di navi e imbarcazioni per scopi militari", "30.20.00": "Costruzione di locomotive e di materiale rotabile ferro-tranviario", "30.31.00": "Fabbricazione di aeromobili, veicoli spaziali e relativi equipaggiamenti per scopi civili", "30.32.00": "Fabbricazione di aeromobili, veicoli spaziali e relativi equipaggiamenti per scopi militari", "30.40.00": "Fabbricazione di veicoli militari da combattimento", "30.91.11": "Fabbricazione di motori per motocicli", "30.91.12": "Fabbricazione di motocicli, esclusi motori", "30.91.20": "Fabbricazione di parti e accessori per motocicli", "30.92.10": "Fabbricazione di biciclette, escluse parti e accessori", "30.92.20": "Fabbricazione di parti e accessori per biciclette", "30.92.30": "Fabbricazione di veicoli per disabili", "30.92.40": "Fabbricazione di carrozzine e passeggini", "30.99.00": "Fabbricazione di altri mezzi di trasporto n.c.a.", "31.00.11": "Fabbricazione di moduli dedicati al comfort acustico per negozi, uffici e altri spazi per collettivit\xE0", "31.00.12": "Fabbricazione di sedie e poltrone per negozi", "31.00.13": "Fabbricazione di altri mobili per negozi", "31.00.14": "Fabbricazione di sedie e poltrone per uffici e altri spazi per collettivit\xE0", "31.00.15": "Fabbricazione di altri mobili per uffici e altri spazi per collettivit\xE0", "31.00.20": "Fabbricazione di mobili da cucina", "31.00.31": "Fabbricazione di mobili per arredo interno, esclusi mobili da cucina, sedie, divani e prodotti simili", "31.00.32": "Fabbricazione di mobili per arredo esterno", "31.00.33": "Fabbricazione di sedie e sedili", "31.00.34": "Fabbricazione di divani, divani letto e poltrone", "31.00.35": "Fabbricazione di materassi", "31.00.36": "Fabbricazione di parti e accessori di mobili", "31.00.37": "Finitura di mobili", "31.00.39": "Fabbricazione di altri mobili n.c.a.", "32.11.00": "Coniazione di monete", "32.12.10": "Lavorazione di pietre preziose e semipreziose", "32.12.20": "Fabbricazione di gioielli e articoli di oreficeria in metalli preziosi", "32.13.00": "Fabbricazione di bigiotteria e articoli simili", "32.20.00": "Fabbricazione di strumenti musicali", "32.30.01": "Fabbricazione di attrezzature da palestra, per centri di fitness e per atletica", "32.30.09": "Fabbricazione di altri articoli sportivi", "32.40.10": "Fabbricazione di giochi", "32.40.20": "Fabbricazione di giocattoli", "32.50.10": "Fabbricazione di protesi dentarie", "32.50.20": "Fabbricazione di altre protesi e ausili", "32.50.30": "Fabbricazione di lenti oftalmiche", "32.50.40": "Fabbricazione di montature per occhiali", "32.50.51": "Fabbricazione di strumenti e apparecchiature mediche e dentistiche", "32.50.52": "Fabbricazione di forniture mediche e dentistiche", "32.50.53": "Fabbricazione di mobili per uso medico e dentistico", "32.91.00": "Fabbricazione di scope e spazzole", "32.99.10": "Fabbricazione di dispositivi protettivi di sicurezza", "32.99.20": "Fabbricazione di ombrelli, bottoni, chiusure lampo, parrucche e affini", "32.99.30": "Fabbricazione di articoli di cancelleria", "32.99.40": "Fabbricazione di casse funebri", "32.99.91": "Fabbricazione di sigarette elettroniche", "32.99.99": "Fabbricazione di altri articoli vari n.c.a.", "33.11.01": "Riparazione e manutenzione di cisterne, serbatoi e contenitori in metallo", "33.11.02": "Riparazione e manutenzione di utensileria ad azionamento manuale", "33.11.03": "Riparazione e manutenzione di stampi, portastampi, sagome, forme per macchine", "33.11.04": "Riparazione e manutenzione di casseforti, cassette di sicurezza, porte metalliche blindate", "33.11.05": "Riparazione e manutenzione di armi da fuoco militari, di ordinanza e artiglieria", "33.11.06": "Riparazione e manutenzione di armi per uso sportivo e civile", "33.11.09": "Riparazione e manutenzione di altri prodotti in metallo", "33.12.10": "Riparazione e manutenzione di motori, turbine, pompe, compressori e altri elementi simili", "33.12.20": "Riparazione e manutenzione di caldaie per processi industriali", "33.12.30": "Riparazione e manutenzione di apparecchi di sollevamento e movimentazione", "33.12.40": "Riparazione e manutenzione di impianti di refrigerazione industriale e di depurazione dell'aria", "33.12.51": "Riparazione e manutenzione di macchine e attrezzature per ufficio", "33.12.52": "Riparazione e manutenzione di bilance e distributori automatici", "33.12.53": "Riparazione e manutenzione di impianti di distillazione o rettificazione per raffinerie di petrolio e industrie chimiche", "33.12.54": "Riparazione e manutenzione di macchine per impacchettare e imballare", "33.12.59": "Riparazione e manutenzione di altre macchine di impiego generale n.c.a.", "33.12.60": "Riparazione e manutenzione di trattori agricoli", "33.12.70": "Riparazione e manutenzione di altre macchine per l'agricoltura e la silvicoltura", "33.12.91": "Affilatura di lame e seghe per macchinari", "33.12.92": "Riparazione e manutenzione di giostre, altalene e altre attrazioni di divertimento", "33.12.99": "Riparazione e manutenzione di altre macchine per impieghi speciali n.c.a.", "33.13.01": "Riparazione e manutenzione di apparecchiature per irradiazione, elettromedicali ed elettroterapeutiche", "33.13.02": "Riparazione e manutenzione di strumenti e apparecchiature ottiche", "33.13.09": "Riparazione e manutenzione di altre apparecchiature elettroniche e ottiche", "33.14.00": "Riparazione e manutenzione di apparecchiature elettriche", "33.15.00": "Riparazione e manutenzione di navi e imbarcazioni per scopi civili", "33.16.00": "Riparazione e manutenzione di aeromobili e veicoli spaziali per scopi civili", "33.17.00": "Riparazione e manutenzione di altri mezzi di trasporto per scopi civili", "33.18.10": "Riparazione e manutenzione di veicoli da combattimento per scopi militari", "33.18.20": "Riparazione e manutenzione di navi e imbarcazioni per scopi militari", "33.18.30": "Riparazione e manutenzione di aeromobili e veicoli spaziali per scopi militari", "33.19.00": "Riparazione e manutenzione di altre apparecchiature", "33.20.01": "Installazione di motori, generatori e trasformatori elettrici e di apparecchiature per la distribuzione e il controllo della elettricit\xE0", "33.20.02": "Installazione di apparecchiature per le comunicazioni e di apparecchiature radiotelevisive", "33.20.03": "Installazione di strumenti e apparecchi di misurazione e controllo", "33.20.04": "Installazione di cisterne, serbatoi e contenitori in metallo", "33.20.05": "Installazione di generatori di vapore", "33.20.06": "Installazione di macchinari e attrezzature per ufficio", "33.20.07": "Installazione di strumenti e apparecchiature mediche e dentistiche", "33.20.09": "Installazione di altre macchine e apparecchiature industriali", "35.11.00": "Produzione di energia elettrica da fonti non rinnovabili", "35.12.00": "Produzione di energia elettrica da fonti rinnovabili", "35.13.00": "Trasmissione di energia elettrica", "35.14.00": "Distribuzione di energia elettrica", "35.15.00": "Commercio di energia elettrica", "35.16.00": "Stoccaggio di energia elettrica", "35.21.00": "Produzione di gas", "35.22.00": "Distribuzione di combustibili gassosi mediante condotte", "35.23.00": "Commercio di gas distribuito mediante condotte", "35.24.00": "Stoccaggio di gas nell'ambito dei servizi di fornitura della rete", "35.30.00": "Fornitura di vapore e aria condizionata", "35.40.00": "Attivit\xE0 di servizi di intermediazione per l'energia elettrica e il gas naturale", "36.00.00": "Raccolta, trattamento e fornitura di acqua", "37.00.00": "Gestione delle reti fognarie", "38.11.00": "Raccolta di rifiuti non pericolosi", "38.12.00": "Raccolta di rifiuti pericolosi", "38.21.11": "Smantellamento di carcasse di navi per il recupero dei materiali", "38.21.12": "Smantellamento di altre carcasse", "38.21.20": "Recupero dei materiali da rifiuti metallici", "38.21.30": "Recupero dei materiali da rifiuti plastici", "38.21.40": "Recupero dei materiali da altri rifiuti", "38.22.00": "Recupero di energia", "38.23.00": "Altre attivit\xE0 di recupero dei rifiuti", "38.31.00": "Incenerimento senza recupero di energia", "38.32.00": "Conferimento in discarica o stoccaggio permanente", "38.33.00": "Altre attivit\xE0 di smaltimento dei rifiuti", "39.00.01": "Attivit\xE0 di rimozione di amianto, vernici a base di piombo e altri materiali tossici", "39.00.09": "Attivit\xE0 di risanamento e altri servizi di gestione dei rifiuti n.c.a.", "41.00.00": "Costruzione di edifici residenziali e non residenziali", "42.11.00": "Costruzione di strade e autostrade", "42.12.00": "Costruzione di linee ferroviarie e metropolitane", "42.13.00": "Costruzione di ponti e gallerie", "42.21.00": "Costruzione di opere di pubblica utilit\xE0 per il trasporto dei fluidi", "42.22.00": "Costruzione di opere di pubblica utilit\xE0 per l'energia elettrica e le telecomunicazioni", "42.91.00": "Costruzione di opere idrauliche", "42.99.00": "Costruzione di altre opere di ingegneria civile n.c.a.", "43.11.00": "Demolizione", "43.12.01": "Preparazione del sito per scavi archeologici", "43.12.09": "Altre attivit\xE0 di preparazione del cantiere edile", "43.13.00": "Trivellazioni e perforazioni", "43.21.01": "Installazione di impianti di illuminazione e fotovoltaici in edifici", "43.21.02": "Installazione di cablaggi per telecomunicazioni e altre reti", "43.21.03": "Installazione di impianti di illuminazione stradale e di piste aeroportuali", "43.21.04": "Installazione di insegne elettriche e luminarie per feste", "43.21.05": "Installazione di impianti di illuminazione elettrica votiva e cimiteriale", "43.22.01": "Installazione di impianti geotermici", "43.22.02": "Installazione di impianti di depurazione per piscine", "43.22.03": "Installazione di impianti di spegnimento di incendi", "43.22.04": "Installazione di impianti di irrigazione per giardini", "43.22.05": "Installazione di altri impianti termo-idraulici", "43.22.06": "Installazione di impianti per la distribuzione del gas", "43.22.07": "Installazione di impianti di riscaldamento e di condizionamento dell'aria", "43.23.00": "Installazione di sistemi per l'isolamento", "43.24.01": "Installazione di ascensori e scale mobili", "43.24.02": "Installazione di insegne non elettriche", "43.24.09": "Altri lavori di installazione edili n.c.a.", "43.31.01": "Posa in opera di cartongesso", "43.31.02": "Altri lavori di intonacatura", "43.32.01": "Posa in opera di porte blindate", "43.32.02": "Posa in opera di porte non blindate, finestre, arredi, controsoffitti, pareti mobili e simili", "43.33.00": "Rivestimento di pavimenti e di pareti", "43.34.01": "Tinteggiatura", "43.34.02": "Posa in opera di vetri", "43.35.00": "Altri lavori di completamento e finitura degli edifici", "43.41.00": "Realizzazione di coperture", "43.42.00": "Altri lavori di costruzione specializzati nella costruzione di edifici", "43.50.00": "Lavori di costruzione specializzati nell'ingegneria civile", "43.60.00": "Attivit\xE0 di servizi di intermediazione per servizi di costruzione specializzati", "43.91.00": "Lavori di muratura", "43.99.01": "Noleggio di gru e altre attrezzature edili con operatore", "43.99.02": "Interventi su siti ed edifici storici e archeologici", "43.99.09": "Altri lavori vari di costruzione specializzati n.c.a.", "46.11.01": "Attivit\xE0 di intermediari del commercio all'ingrosso di materie prime agricole", "46.11.02": "Attivit\xE0 di intermediari del commercio all'ingrosso di fiori e piante", "46.11.03": "Attivit\xE0 di intermediari del commercio all'ingrosso di animali vivi", "46.11.04": "Attivit\xE0 di intermediari del commercio all'ingrosso di materie prime tessili e semilavorati", "46.12.01": "Attivit\xE0 di intermediari del commercio all'ingrosso di combustibili liquidi e gassosi", "46.12.02": "Attivit\xE0 di intermediari del commercio all'ingrosso di combustibili solidi", "46.12.03": "Attivit\xE0 di intermediari del commercio all'ingrosso di minerali e metalli", "46.12.04": "Attivit\xE0 di intermediari del commercio all'ingrosso di fertilizzanti e altri prodotti chimici per l'agricoltura", "46.12.05": "Attivit\xE0 di intermediari del commercio all'ingrosso di prodotti chimici per l'industria", "46.13.01": "Attivit\xE0 di intermediari del commercio all'ingrosso di legname", "46.13.02": "Attivit\xE0 di intermediari del commercio all'ingrosso di pitture, vernici e lacche", "46.13.03": "Attivit\xE0 di intermediari del commercio all'ingrosso di altri materiali da costruzione", "46.14.01": "Attivit\xE0 di intermediari del commercio all'ingrosso di macchine e attrezzature per l'industria e il commercio", "46.14.02": "Attivit\xE0 di intermediari del commercio all'ingrosso di macchine e attrezzature per l'edilizia", "46.14.03": "Attivit\xE0 di intermediari del commercio all'ingrosso di macchine per ufficio, computer e apparecchiature per le comunicazioni", "46.14.04": "Attivit\xE0 di intermediari del commercio all'ingrosso di attrezzature agricole", "46.14.05": "Attivit\xE0 di intermediari del commercio all'ingrosso di navi e aeromobili", "46.15.01": "Attivit\xE0 di intermediari del commercio all'ingrosso di mobili in legno, metallo e materie plastiche", "46.15.02": "Attivit\xE0 di intermediari del commercio all'ingrosso di altri mobili e oggetti di arredamento per la casa", "46.15.03": "Attivit\xE0 di intermediari del commercio all'ingrosso di apparecchiature di riscaldamento, ventilazione e condizionamento domestico", "46.15.04": "Attivit\xE0 di intermediari del commercio all'ingrosso di altri articoli per la casa", "46.15.05": "Attivit\xE0 di intermediari del commercio all'ingrosso di ferramenta", "46.16.01": "Attivit\xE0 di intermediari del commercio all'ingrosso di tessuti per l'abbigliamento e l'arredamento", "46.16.02": "Attivit\xE0 di intermediari del commercio all'ingrosso di prodotti tessili per la casa e tappeti", "46.16.03": "Attivit\xE0 di intermediari del commercio all'ingrosso di camicie, biancheria intima e articoli simili", "46.16.04": "Attivit\xE0 di intermediari del commercio all'ingrosso di altri articoli di abbigliamento e accessori per l'abbigliamento", "46.16.05": "Attivit\xE0 di intermediari del commercio all'ingrosso di pellicce", "46.16.06": "Attivit\xE0 di intermediari del commercio all'ingrosso di calzature", "46.16.07": "Attivit\xE0 di intermediari del commercio all'ingrosso di articoli in pelle e articoli da viaggio", "46.17.01": "Attivit\xE0 di intermediari del commercio all'ingrosso di frutta e ortaggi", "46.17.02": "Attivit\xE0 di intermediari del commercio all'ingrosso di carne e prodotti a base di carne", "46.17.03": "Attivit\xE0 di intermediari del commercio all'ingrosso di pesce e prodotti a base di pesce", "46.17.04": "Attivit\xE0 di intermediari del commercio all'ingrosso di latte e prodotti lattiero-caseari", "46.17.05": "Attivit\xE0 di intermediari del commercio all'ingrosso di oli e grassi alimentari", "46.17.06": "Attivit\xE0 di intermediari del commercio all'ingrosso di bevande", "46.17.07": "Attivit\xE0 di intermediari del commercio all'ingrosso di altri prodotti alimentari e tabacchi", "46.18.11": "Attivit\xE0 di intermediari del commercio all'ingrosso di prodotti farmaceutici", "46.18.12": "Attivit\xE0 di intermediari del commercio all'ingrosso di articoli medicali", "46.18.13": "Attivit\xE0 di intermediari del commercio all'ingrosso di profumi e articoli di profumeria", "46.18.14": "Attivit\xE0 di intermediari del commercio all'ingrosso di prodotti per la pulizia", "46.18.21": "Attivit\xE0 di intermediari del commercio all'ingrosso di giochi e giocattoli", "46.18.22": "Attivit\xE0 di intermediari del commercio all'ingrosso di biciclette", "46.18.23": "Attivit\xE0 di intermediari del commercio all'ingrosso di altre attrezzature sportive", "46.18.24": "Attivit\xE0 di intermediari del commercio all'ingrosso di orologi e gioielli", "46.18.25": "Attivit\xE0 di intermediari del commercio all'ingrosso di oggetti di bigiotteria", "46.18.26": "Attivit\xE0 di intermediari del commercio all'ingrosso di apparecchiature fotografiche e strumenti ottici", "46.18.31": "Attivit\xE0 di intermediari del commercio all'ingrosso di libri", "46.18.32": "Attivit\xE0 di intermediari del commercio all'ingrosso di giornali e riviste", "46.18.33": "Attivit\xE0 di intermediari del commercio all'ingrosso di articoli di cancelleria", "46.18.41": "Attivit\xE0 di intermediari del commercio all'ingrosso di automobili e autoveicoli leggeri", "46.18.42": "Attivit\xE0 di intermediari del commercio all'ingrosso di altri autoveicoli", "46.18.43": "Attivit\xE0 di intermediari del commercio all'ingrosso di parti e accessori di autoveicoli", "46.18.44": "Attivit\xE0 di intermediari del commercio all'ingrosso di motocicli", "46.18.45": "Attivit\xE0 di intermediari del commercio all'ingrosso di parti e accessori di motocicli", "46.18.46": "Attivit\xE0 di intermediari del commercio all'ingrosso di materiale rotabile e di parti e accessori per materiale rotabile", "46.18.50": "Attivit\xE0 di intermediari del commercio all'ingrosso di apparecchiature audio e video", "46.18.91": "Attivit\xE0 di intermediari del commercio all'ingrosso di rifiuti", "46.18.92": "Attivit\xE0 di intermediari del commercio all'ingrosso di rivestimenti per pareti e per pavimenti", "46.18.93": "Attivit\xE0 di intermediari del commercio all'ingrosso di strumenti musicali", "46.18.99": "Attivit\xE0 di intermediari del commercio all'ingrosso di altri prodotti specifici vari n.c.a.", "46.19.00": "Attivit\xE0 di intermediari del commercio all'ingrosso non specializzato", "46.21.10": "Commercio all'ingrosso di cereali", "46.21.21": "Commercio all'ingrosso di tabacco grezzo", "46.21.22": "Commercio all'ingrosso di sementi e alimenti per il bestiame", "46.22.00": "Commercio all'ingrosso di fiori e piante", "46.23.00": "Commercio all'ingrosso di animali vivi", "46.24.01": "Commercio all'ingrosso di pelli per pellicceria", "46.24.02": "Commercio all'ingrosso di pelli non per pellicceria e cuoio", "46.31.10": "Commercio all'ingrosso di frutta e ortaggi freschi", "46.31.20": "Commercio all'ingrosso di frutta e ortaggi conservati o surgelati", "46.32.11": "Commercio all'ingrosso di carni fresche", "46.32.12": "Commercio all'ingrosso di carni conservate o surgelate", "46.32.20": "Commercio all'ingrosso di salumi e di altri prodotti a base di carne", "46.32.31": "Commercio all'ingrosso di pesci freschi", "46.32.32": "Commercio all'ingrosso di pesci conservati o surgelati e di prodotti a base di pesce", "46.33.10": "Commercio all'ingrosso di prodotti lattiero-caseari e uova", "46.33.20": "Commercio all'ingrosso di oli e grassi alimentari", "46.34.10": "Commercio all'ingrosso di bevande alcoliche", "46.34.20": "Commercio all'ingrosso di bevande analcoliche", "46.35.01": "Commercio all'ingrosso di sigarette elettroniche", "46.35.09": "Commercio all'ingrosso di prodotti del tabacco n.c.a.", "46.36.00": "Commercio all'ingrosso di zucchero, cioccolato e dolciumi", "46.37.01": "Commercio all'ingrosso di caff\xE8", "46.37.02": "Commercio all'ingrosso di t\xE8, cacao e spezie", "46.38.00": "Commercio all'ingrosso di altri prodotti alimentari", "46.39.00": "Commercio all'ingrosso non specializzato di prodotti alimentari, bevande e tabacchi", "46.41.10": "Commercio all'ingrosso di tessuti", "46.41.20": "Commercio all'ingrosso di filati e articoli di merceria", "46.41.90": "Commercio all'ingrosso di altri prodotti tessili", "46.42.10": "Commercio all'ingrosso di abbigliamento e di accessori per l'abbigliamento", "46.42.20": "Commercio all'ingrosso di articoli in pelliccia", "46.42.30": "Commercio all'ingrosso di calzature", "46.43.10": "Commercio all'ingrosso di articoli per fotografia e ottica", "46.43.20": "Commercio all'ingrosso di apparecchiature radiotelevisive", "46.43.30": "Commercio all'ingrosso di altri elettrodomestici", "46.44.10": "Commercio all'ingrosso di articoli di porcellana", "46.44.20": "Commercio all'ingrosso di articoli di vetro", "46.44.30": "Commercio all'ingrosso di altri utensili per la casa, stoviglie e vasellame", "46.44.40": "Commercio all'ingrosso di prodotti per la pulizia", "46.45.00": "Commercio all'ingrosso di profumi e cosmetici", "46.46.10": "Commercio all'ingrosso di prodotti farmaceutici di base e di preparati farmaceutici", "46.46.20": "Commercio all'ingrosso di rimedi erboristici", "46.46.31": "Commercio all'ingrosso di occhiali e lenti", "46.46.39": "Commercio all'ingrosso di prodotti medicali e ortopedici n.c.a.", "46.47.10": "Commercio all'ingrosso di mobili per la casa, l'ufficio e i negozi", "46.47.20": "Commercio all'ingrosso di tappeti per la casa, l'ufficio e i negozi", "46.47.30": "Commercio all'ingrosso di articoli per l'illuminazione per la casa, l'ufficio e i negozi", "46.48.00": "Commercio all'ingrosso di orologi e di gioielleria", "46.49.10": "Commercio all'ingrosso di carta, cartone e articoli di cartoleria", "46.49.21": "Commercio all'ingrosso di libri", "46.49.22": "Commercio all'ingrosso di riviste e giornali", "46.49.30": "Commercio all'ingrosso di giochi, giocattoli e attrezzature per bambini", "46.49.41": "Commercio all'ingrosso di biciclette", "46.49.49": "Commercio all'ingrosso di altre attrezzature e articoli sportivi", "46.49.50": "Commercio all'ingrosso di articoli in pelle e articoli da viaggio", "46.49.91": "Commercio all'ingrosso di articoli promozionali", "46.49.92": "Commercio all'ingrosso di bomboniere", "46.49.99": "Commercio all'ingrosso di altri beni di consumo vari n.c.a.", "46.50.10": "Commercio all'ingrosso di computer, unit\xE0 periferiche e software", "46.50.20": "Commercio all'ingrosso di apparecchiature per telecomunicazioni", "46.50.30": "Commercio all'ingrosso di altre macchine e attrezzature per ufficio", "46.61.00": "Commercio all'ingrosso di macchinari, attrezzature e forniture agricole", "46.62.00": "Commercio all'ingrosso di macchine utensili", "46.63.00": "Commercio all'ingrosso di macchinari per l'estrazione, l'edilizia e l'ingegneria civile", "46.64.11": "Commercio all'ingrosso di navi e imbarcazioni", "46.64.19": "Commercio all'ingrosso di altri mezzi di trasporto", "46.64.20": "Commercio all'ingrosso di materiale elettrico per impianti industriali", "46.64.30": "Commercio all'ingrosso di attrezzature per parrucchieri, palestre, solarium e centri estetici", "46.64.40": "Commercio all'ingrosso di macchine tessili, per la lavorazione delle pelli e del cuoio, per lavanderie e stirerie", "46.64.51": "Commercio all'ingrosso di macchine e attrezzature per ristoranti e bar", "46.64.59": "Commercio all'ingrosso di altri macchinari per l'industria alimentare e delle bevande", "46.64.60": "Commercio all'ingrosso di macchinari e attrezzature per la pulizia", "46.64.91": "Commercio all'ingrosso di strumenti e apparecchiature di misurazione", "46.64.92": "Commercio all'ingrosso di attrazioni per parchi divertimento e parchi tematici e videogiochi", "46.64.99": "Commercio all'ingrosso di altri macchinari e attrezzature varie n.c.a.", "46.71.10": "Commercio all'ingrosso di automobili e autoveicoli leggeri", "46.71.20": "Commercio all'ingrosso di altri autoveicoli", "46.72.00": "Commercio all'ingrosso di parti e accessori di autoveicoli", "46.73.10": "Commercio all'ingrosso di motocicli", "46.73.20": "Commercio all'ingrosso di parti e accessori di motocicli", "46.81.00": "Commercio all'ingrosso di combustibili solidi, liquidi, gassosi e di prodotti derivati", "46.82.10": "Commercio all'ingrosso di metalli e minerali metalliferi ferrosi", "46.82.21": "Attivit\xE0 di compro oro", "46.82.29": "Commercio all'ingrosso di altri metalli e minerali metalliferi non ferrosi", "46.83.10": "Commercio all'ingrosso di legname", "46.83.21": "Commercio all'ingrosso di pitture, vernici e lacche", "46.83.22": "Commercio all'ingrosso di carta da parati e rivestimenti per pavimenti", "46.83.23": "Commercio all'ingrosso di porte, finestre e persiane", "46.83.29": "Commercio all'ingrosso di altri materiali da costruzione", "46.83.30": "Commercio all'ingrosso di articoli igienico-sanitari", "46.84.10": "Commercio all'ingrosso di ferramenta", "46.84.20": "Commercio all'ingrosso di apparecchi e accessori per impianti idraulici e di riscaldamento", "46.85.01": "Commercio all'ingrosso di fertilizzanti e altri prodotti chimici per l'agricoltura", "46.85.02": "Commercio all'ingrosso di liquidi per inalazione per sigarette elettroniche", "46.85.09": "Commercio all'ingrosso di altri prodotti chimici", "46.86.10": "Commercio all'ingrosso di materie plastiche in forme primarie e gomma", "46.86.20": "Commercio all'ingrosso di fibre tessili", "46.86.30": "Commercio all'ingrosso di articoli per imballaggio", "46.86.90": "Commercio all'ingrosso di altri prodotti intermedi n.c.a.", "46.87.10": "Commercio all'ingrosso di rottami e cascami metallici", "46.87.90": "Commercio all'ingrosso di altri rottami e cascami", "46.89.00": "Commercio all'ingrosso specializzato di altri prodotti n.c.a.", "46.90.00": "Commercio all'ingrosso non specializzato", "47.11.01": "Commercio al dettaglio non specializzato con prevalenza di prodotti alimentari surgelati", "47.11.02": "Commercio al dettaglio non specializzato con prevalenza di altri prodotti alimentari, bevande o tabacchi", "47.12.10": "Commercio al dettaglio non specializzato con prevalenza di apparecchiature informatiche ed elettrodomestici", "47.12.20": "Commercio al dettaglio non specializzato con prevalenza di mobili e articoli per uso domestico", "47.12.30": "Commercio al dettaglio non specializzato con prevalenza di ferramenta, materiali da costruzione e piante", "47.12.40": "Commercio al dettaglio non specializzato con prevalenza di cosmetici, articoli di profumeria e detersivi, articoli di cancelleria e giochi", "47.12.50": "Commercio al dettaglio non specializzato con prevalenza di articoli di abbigliamento e calzature", "47.12.90": "Commercio al dettaglio non specializzato di altri prodotti n.c.a.", "47.21.01": "Commercio al dettaglio di frutta e verdura fresca", "47.21.02": "Commercio al dettaglio di frutta e verdura secca e conservata", "47.22.00": "Commercio al dettaglio di carne e di prodotti a base di carne", "47.23.00": "Commercio al dettaglio di pesce, crostacei e molluschi", "47.24.10": "Commercio al dettaglio di pane", "47.24.20": "Commercio al dettaglio di pasticceria e dolciumi", "47.25.00": "Commercio al dettaglio di bevande", "47.26.01": "Commercio al dettaglio di tabacco in qualsiasi forma", "47.26.02": "Commercio al dettaglio di sigarette elettroniche e di liquidi per inalazione per sigarette elettroniche", "47.26.09": "Commercio al dettaglio di altri accessori per fumatori", "47.27.10": "Commercio al dettaglio di latte e prodotti lattiero-caseari", "47.27.20": "Commercio al dettaglio di caff\xE8", "47.27.30": "Commercio al dettaglio di integratori alimentari e prodotti dietetici", "47.27.90": "Commercio al dettaglio di altri prodotti alimentari n.c.a.", "47.30.00": "Commercio al dettaglio di carburanti per autotrazione", "47.40.10": "Commercio al dettaglio di computer, unit\xE0 periferiche e software", "47.40.20": "Commercio al dettaglio di apparecchiature per telecomunicazioni", "47.40.30": "Commercio al dettaglio di apparecchiature radiotelevisive", "47.51.10": "Commercio al dettaglio di tessuti per abbigliamento e arredamento", "47.51.20": "Commercio al dettaglio di filati per maglieria e merceria", "47.52.10": "Commercio al dettaglio di ferramenta, vernici, vetro e materiale elettrico e termoidraulico", "47.52.20": "Commercio al dettaglio di articoli igienico-sanitari e per riscaldamento", "47.52.31": "Commercio al dettaglio di porte e finestre", "47.52.32": "Commercio al dettaglio di altri materiali da costruzione, mattoni e piastrelle n.c.a.", "47.52.40": "Commercio al dettaglio di attrezzature per il giardinaggio e la paesaggistica", "47.53.11": "Commercio al dettaglio di tappeti e moquette", "47.53.12": "Commercio al dettaglio di tende", "47.53.20": "Commercio al dettaglio di rivestimenti per pareti e pavimenti", "47.54.00": "Commercio al dettaglio di elettrodomestici", "47.55.10": "Commercio al dettaglio di mobili per la casa", "47.55.20": "Commercio al dettaglio di altri mobili", "47.55.30": "Commercio al dettaglio di articoli per l'illuminazione", "47.55.40": "Commercio al dettaglio di articoli per la tavola e la cucina", "47.55.90": "Commercio al dettaglio di attrezzature per bambini e altri articoli per la casa", "47.61.00": "Commercio al dettaglio di libri", "47.62.10": "Commercio al dettaglio di giornali e altre pubblicazioni periodiche", "47.62.20": "Commercio al dettaglio di articoli di cancelleria", "47.63.10": "Commercio al dettaglio di imbarcazioni", "47.63.21": "Commercio al dettaglio di biciclette", "47.63.29": "Commercio al dettaglio di altre attrezzature sportive", "47.64.00": "Commercio al dettaglio di giochi e giocattoli", "47.69.11": "Commercio al dettaglio di supporti registrati", "47.69.12": "Commercio al dettaglio di strumenti musicali", "47.69.20": "Commercio al dettaglio di articoli di filatelia, numismatica e da collezionismo", "47.69.30": "Commercio al dettaglio di articoli per disegno, pittura e scultura", "47.69.91": "Commercio al dettaglio di opere d'arte", "47.69.99": "Commercio al dettaglio di altri articoli vari culturali e ricreativi n.c.a.", "47.71.10": "Commercio al dettaglio di articoli di abbigliamento per adulti", "47.71.20": "Commercio al dettaglio di articoli di abbigliamento per neonati e bambini", "47.71.30": "Commercio al dettaglio di articoli di biancheria intima", "47.71.40": "Commercio al dettaglio di articoli di abbigliamento in pelle e pelliccia", "47.71.50": "Commercio al dettaglio di accessori per l'abbigliamento", "47.72.11": "Commercio al dettaglio di calzature e accessori per calzature per adulti", "47.72.12": "Commercio al dettaglio di calzature e accessori per calzature per neonati e bambini", "47.72.20": "Commercio al dettaglio di articoli in pelle e articoli da viaggio", "47.73.10": "Commercio al dettaglio di medicinali soggetti a prescrizione medica", "47.73.20": "Commercio al dettaglio di rimedi erboristici", "47.73.90": "Commercio al dettaglio di altri prodotti farmaceutici", "47.74.01": "Commercio al dettaglio di occhiali e lenti", "47.74.09": "Commercio al dettaglio di altri articoli medicali e ortopedici", "47.75.00": "Commercio al dettaglio di cosmetici e di articoli di profumeria", "47.76.10": "Commercio al dettaglio di fiori, piante e fertilizzanti", "47.76.20": "Commercio al dettaglio di animali da compagnia e alimenti per animali da compagnia", "47.77.00": "Commercio al dettaglio di orologi e articoli di gioielleria", "47.78.10": "Commercio al dettaglio di articoli per fotografia e ottica", "47.78.21": "Commercio al dettaglio di souvenir", "47.78.22": "Commercio al dettaglio di articoli di artigianato", "47.78.23": "Commercio al dettaglio di articoli religiosi", "47.78.24": "Commercio al dettaglio di bigiotteria", "47.78.25": "Commercio al dettaglio di bomboniere", "47.78.30": "Commercio al dettaglio di combustibile per uso domestico, bombole di gas, carbone e legna da ardere", "47.78.40": "Commercio al dettaglio di prodotti per la pulizia", "47.78.91": "Commercio al dettaglio di articoli per imballaggio", "47.78.92": "Commercio al dettaglio di articoli funerari e cimiteriali", "47.78.93": "Commercio al dettaglio di articoli per adulti", "47.78.99": "Commercio al dettaglio di altri prodotti vari non di seconda mano n.c.a.", "47.79.10": "Commercio al dettaglio di libri di seconda mano", "47.79.20": "Commercio al dettaglio di oggetti di antiquariato e mobili di seconda mano", "47.79.31": "Commercio al dettaglio di articoli di abbigliamento di seconda mano", "47.79.32": "Commercio al dettaglio di orologi e articoli di gioielleria di seconda mano", "47.79.39": "Commercio al dettaglio di altri articoli di seconda mano n.c.a.", "47.81.10": "Commercio al dettaglio di automobili e autoveicoli leggeri", "47.81.20": "Commercio al dettaglio di altri autoveicoli", "47.82.00": "Commercio al dettaglio di parti e accessori di autoveicoli", "47.83.10": "Commercio al dettaglio di motocicli", "47.83.20": "Commercio al dettaglio di parti e accessori di motocicli", "47.91.10": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio non specializzato di articoli di seconda mano", "47.91.20": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio non specializzato di prodotti nuovi", "47.92.10": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio specializzato di prodotti alimentari e bevande", "47.92.21": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio specializzato di autoveicoli e motocicli di seconda mano", "47.92.22": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio specializzato di parti e accessori di autoveicoli e motocicli di seconda mano", "47.92.29": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio specializzato di altri articoli di seconda mano", "47.92.31": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio specializzato di autoveicoli, esclusi articoli di seconda mano", "47.92.32": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio specializzato di parti e accessori di autoveicoli, esclusi articoli di seconda mano", "47.92.33": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio specializzato di motocicli, parti e accessori di motocicli, esclusi articoli di seconda mano", "47.92.34": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio specializzato di elettrodomestici e altri articoli per la casa, esclusi articoli di seconda mano", "47.92.35": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio specializzato di prodotti tessili, articoli di abbigliamento e calzature, esclusi articoli di seconda mano", "47.92.36": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio specializzato di cosmetici e di articoli di profumeria, esclusi articoli di seconda mano", "47.92.39": "Attivit\xE0 di servizi di intermediazione per il commercio al dettaglio specializzato di prodotti nuovi n.c.a.", "49.11.00": "Trasporto di passeggeri su ferrovia pesante", "49.12.00": "Altri trasporti ferroviari di passeggeri", "49.20.00": "Trasporto ferroviario di merci", "49.31.01": "Trasporto di linea di passeggeri su strada specializzato per visite turistiche", "49.31.02": "Altri trasporti di linea di passeggeri su strada", "49.32.01": "Trasporto non di linea di passeggeri su strada specializzato per visite turistiche", "49.32.02": "Altri trasporti non di linea di passeggeri su strada", "49.33.10": "Trasporto su taxi", "49.33.20": "Trasporto su veicoli a noleggio con conducente", "49.34.00": "Trasporto di passeggeri mediante funivie e sciovie", "49.39.00": "Altri trasporti terrestri di passeggeri n.c.a.", "49.41.00": "Trasporto di merci su strada", "49.42.00": "Servizi di trasloco", "49.50.10": "Trasporto mediante condotte di gas", "49.50.20": "Trasporto mediante condotte di liquidi", "50.10.00": "Trasporto marittimo e costiero di passeggeri", "50.20.00": "Trasporto marittimo e costiero di merci", "50.30.00": "Trasporto per vie d'acqua interne di passeggeri", "50.40.00": "Trasporto per vie d'acqua interne di merci", "51.10.10": "Trasporto aereo di linea di passeggeri", "51.10.20": "Trasporto aereo non di linea di passeggeri", "51.21.00": "Trasporto aereo di merci", "51.22.00": "Trasporto spaziale", "52.10.10": "Magazzinaggio e deposito non refrigerato", "52.10.20": "Magazzinaggio e deposito refrigerato", "52.21.10": "Gestione di infrastrutture ferroviarie", "52.21.20": "Gestione e manutenzione di strade", "52.21.30": "Gestione di stazioni per autobus", "52.21.40": "Gestione di centri di movimentazione merci", "52.21.50": "Gestione di parcheggi e autorimesse", "52.21.60": "Attivit\xE0 di traino e soccorso stradale", "52.21.90": "Altri servizi di supporto al trasporto terrestre", "52.22.01": "Liquefazione e rigassificazione di gas a scopo di trasporto marittimo e per vie d'acqua interne", "52.22.09": "Altri servizi di supporto al trasporto marittimo e per vie d'acqua interne", "52.23.00": "Servizi di supporto al trasporto aereo", "52.24.10": "Movimentazione merci relativa a trasporti aerei", "52.24.20": "Movimentazione merci relativa a trasporti marittimi e per vie d'acqua interne", "52.24.30": "Movimentazione merci relativa a trasporti ferroviari", "52.24.40": "Movimentazione merci relativa ad altri trasporti terrestri", "52.25.01": "Servizi di logistica per opere d'arte", "52.25.09": "Altri servizi di logistica", "52.26.01": "Attivit\xE0 di agenti e agenzie di dogana", "52.26.02": "Attivit\xE0 di spedizione merci", "52.31.00": "Attivit\xE0 di servizi di intermediazione per il trasporto di merci", "52.32.00": "Attivit\xE0 di servizi di intermediazione per il trasporto di passeggeri", "53.10.00": "Attivit\xE0 postali con obbligo di servizio universale", "53.20.00": "Altre attivit\xE0 postali e di corriere", "53.30.00": "Attivit\xE0 di servizi di intermediazione per attivit\xE0 postali e di corriere", "55.10.00": "Servizi di alloggio di alberghi e simili", "55.20.10": "Ostelli", "55.20.20": "Rifugi e baite di montagna", "55.20.31": "Case religiose di ospitalit\xE0", "55.20.32": "Altre case sociali di ospitalit\xE0", "55.20.41": "Bed and breakfast", "55.20.42": "Servizi di alloggio in camere, case e appartamenti per vacanze", "55.20.51": "Servizi di alloggio in aziende agricole", "55.20.52": "Servizi di alloggio in aziende ittiche", "55.30.01": "Campeggi", "55.30.02": "Villaggi turistici e alloggi glamping", "55.30.03": "Aree attrezzate per veicoli ricreazionali", "55.30.04": "Marina resort", "55.40.00": "Attivit\xE0 di servizi di intermediazione per servizi di alloggio", "55.90.00": "Altri servizi di alloggio", "56.11.11": "Attivit\xE0 di ristoranti con servizio al tavolo, escluse gelaterie e pasticcerie ", "56.11.12": "Attivit\xE0 di ristoranti senza servizio al tavolo o da asporto, escluse gelaterie e pasticcerie", "56.11.21": "Attivit\xE0 di gelaterie con servizio al tavolo", "56.11.22": "Attivit\xE0 di gelaterie senza servizio al tavolo o da asporto", "56.11.23": "Attivit\xE0 di pasticcerie con servizio al tavolo", "56.11.24": "Attivit\xE0 di pasticcerie senza servizio al tavolo o da asporto", "56.11.91": "Attivit\xE0 di ristoranti connesse alle aziende agricole", "56.11.92": "Attivit\xE0 di ristoranti connesse alle aziende ittiche", "56.11.93": "Attivit\xE0 di ristoranti a bordo di mezzi di trasporto", "56.12.01": "Attivit\xE0 di servizi di ristorazione mobile di ristoranti e altri esercizi di ristorazione simili", "56.12.02": "Attivit\xE0 di servizi di ristorazione mobile di gelaterie", "56.12.03": "Attivit\xE0 di servizi di ristorazione mobile di pasticcerie", "56.21.01": "Attivit\xE0 di catering per eventi presso location dei clienti", "56.21.02": "Attivit\xE0 di catering per eventi presso sale per banchetti", "56.22.01": "Attivit\xE0 di servizi di catering su base contrattuale", "56.22.02": "Altri servizi di ristorazione", "56.30.01": "Attivit\xE0 di somministrazione di bevande in bar e caffetterie", "56.30.02": "Attivit\xE0 di somministrazione di bevande in lounge cocktail bar", "56.30.03": "Attivit\xE0 di somministrazione mobile di bevande", "56.30.04": "Attivit\xE0 di somministrazione di bevande a bordo di mezzi di trasporto", "56.40.00": "Attivit\xE0 di servizi di intermediazione per servizi di ristorazione", "58.11.00": "Edizione di libri", "58.12.00": "Edizione di quotidiani", "58.13.00": "Edizione di riviste e periodici", "58.19.00": "Altre attivit\xE0 editoriali, esclusa l'edizione di software", "58.21.00": "Edizione di videogiochi", "58.29.00": "Edizione di altri software", "59.11.00": "Attivit\xE0 di produzione cinematografica, di video e programmi televisivi", "59.12.00": "Attivit\xE0 di post-produzione cinematografica, di video e programmi televisivi", "59.13.00": "Attivit\xE0 di distribuzione cinematografica, di video e programmi televisivi", "59.14.00": "Attivit\xE0 di proiezione cinematografica", "59.20.10": "Attivit\xE0 di registrazione sonora", "59.20.20": "Editoria musicale", "60.10.00": "Attivit\xE0 di trasmissione radiofonica e distribuzione di audio", "60.20.00": "Attivit\xE0 di programmazione e trasmissione televisive e di distribuzione di video", "60.31.00": "Attivit\xE0 delle agenzie di stampa", "60.39.00": "Altre attivit\xE0 di distribuzione di contenuti", "61.10.01": "Attivit\xE0 di telecomunicazioni fisse", "61.10.02": "Attivit\xE0 di telecomunicazioni mobili", "61.10.03": "Attivit\xE0 di telecomunicazioni satellitari", "61.20.00": "Attivit\xE0 di rivendita di telecomunicazioni e attivit\xE0 di servizi di intermediazione per telecomunicazioni", "61.90.10": "Erogazione di servizi di accesso a Internet", "61.90.20": "Erogazione di servizi di messaggistica e di notifica", "61.90.90": "Altre attivit\xE0 di telecomunicazioni n.c.a.", "62.10.00": "Attivit\xE0 di programmazione informatica", "62.20.10": "Attivit\xE0 di consulenza informatica", "62.20.20": "Attivit\xE0 di gestione di strutture informatiche", "62.90.01": "Configurazione di personal computer", "62.90.09": "Altre attivit\xE0 dei servizi connessi alle tecnologie dell'informazione e dell'informatica n.c.a.", "63.10.10": "Fornitura di infrastrutture informatiche, hosting e attivit\xE0 connesse", "63.10.21": "Elaborazione dati contabili", "63.10.29": "Elaborazione altri dati", "63.91.00": "Attivit\xE0 dei portali di ricerca sul web", "63.92.00": "Altre attivit\xE0 dei servizi di informazione", "64.11.00": "Attivit\xE0 delle banche centrali", "64.19.10": "Altre intermediazioni monetarie fornite da istituti monetari diversi dalla banca centrale", "64.19.20": "Altre intermediazioni monetarie fornite da istituti di moneta elettronica", "64.19.30": "Altre intermediazioni monetarie fornite da Cassa Depositi e Prestiti (CDP)", "64.21.00": "Attivit\xE0 delle societ\xE0 di partecipazione (holding)", "64.22.00": "Attivit\xE0 dei conduit di finanziamento", "64.31.00": "Attivit\xE0 dei fondi di investimento del mercato monetario e del mercato non monetario", "64.32.00": "Attivit\xE0 di conti fiduciari, per la gestione dell'eredit\xE0 e di agenzia", "64.91.00": "Leasing finanziario", "64.92.10": "Attivit\xE0 di factoring", "64.92.91": "Altre attivit\xE0 di concessione del credito fornite dai consorzi di garanzia collettiva fidi", "64.92.99": "Altre attivit\xE0 varie di concessione del credito n.c.a.", "64.99.00": "Altre attivit\xE0 di servizi finanziari, ad esclusione di assicurazioni e fondi pensione n.c.a.", "65.11.00": "Assicurazioni sulla vita", "65.12.00": "Assicurazioni diverse da quelle sulla vita", "65.20.00": "Riassicurazioni", "65.30.00": "Fondi pensione", "66.11.00": "Amministrazione di mercati finanziari", "66.12.00": "Attivit\xE0 di negoziazione di contratti relativi a titoli e merci", "66.19.10": "Attivit\xE0 di elaborazione e liquidazione delle transazioni finanziarie tramite carta di credito", "66.19.21": "Attivit\xE0 di consulenza finanziaria fornite da consulenti finanziari abilitati all'offerta fuori sede", "66.19.22": "Altre attivit\xE0 di consulenza finanziaria", "66.19.90": "Altre attivit\xE0 ausiliarie dei servizi finanziari n.c.a., escluse assicurazioni e fondi pensione", "66.21.00": "Valutazione dei rischi e dei danni", "66.22.00": "Attivit\xE0 di agenti e intermediari delle assicurazioni", "66.29.01": "Attivit\xE0 di vigilanza su assicurazioni e fondi pensione", "66.29.09": "Altre attivit\xE0 ausiliarie delle assicurazioni e dei fondi pensione n.c.a.", "66.30.01": "Gestione di organismi di investimento collettivo del risparmio, fondi pensione e portafogli", "66.30.02": "Servizi di gestione di trust", "66.30.03": "Servizi fiduciari e di custodia", "68.11.00": "Compravendita di beni immobili effettuata su beni propri", "68.12.00": "Sviluppo di progetti immobiliari", "68.20.01": "Affitto e gestione di terreni per telecomunicazioni propri o in locazione", "68.20.02": "Affitto e gestione di altri terreni ed edifici non residenziali, impianti e fabbriche propri o in locazione", "68.20.09": "Affitto e gestione di beni immobili propri o in locazione n.c.a.", "68.31.00": "Attivit\xE0 di servizi di intermediazione per attivit\xE0 immobiliari", "68.32.01": "Gestione di beni immobili per conto terzi", "68.32.09": "Altre attivit\xE0 immobiliari per conto terzi n.c.a.", "69.10.10": "Attivit\xE0 legali e giuridiche", "69.10.20": "Attivit\xE0 notarili", "69.10.30": "Attivit\xE0 di supporto alle attivit\xE0 legali, giuridiche e notarili", "69.20.01": "Attivit\xE0 di commercialisti", "69.20.02": "Attivit\xE0 di revisori legali in ambito contabile", "69.20.03": "Attivit\xE0 di esperti contabili", "69.20.04": "Attivit\xE0 di consulenti del lavoro", "69.20.05": "Attivit\xE0 di altri soggetti simili in materia di contabilit\xE0 delle retribuzioni e buste paga", "69.20.06": "Attivit\xE0 di altri consulenti, periti e altri soggetti simili in ambito tributario e contabile", "69.20.07": "Attivit\xE0 di centri di assistenza fiscale", "70.10.00": "Attivit\xE0 di sedi centrali", "70.20.01": "Attivit\xE0 di consulenza in materia di logistica", "70.20.02": "Attivit\xE0 di certificazione di processi", "70.20.09": "Consulenza imprenditoriale e altre attivit\xE0 di consulenza gestionale n.c.a.", "71.11.01": "Progettazione, pianificazione e supervisione di scavi archeologici", "71.11.09": "Attivit\xE0 di architettura n.c.a.", "71.12.10": "Attivit\xE0 di ingegneria", "71.12.20": "Gestione di progetti relativi a opere di ingegneria integrata", "71.12.30": "Elaborazione e supervisione di progetti da parte di geometri", "71.12.40": "Attivit\xE0 di cartografia e aerofotogrammetria", "71.12.50": "Attivit\xE0 di geologia, di prospezione geognostica e mineraria", "71.20.11": "Collaudi e analisi tecniche per indagini archeologiche", "71.20.19": "Altri collaudi e analisi tecniche di prodotti", "71.20.21": "Attivit\xE0 di riconoscimento dell'origine dei prodotti", "71.20.22": "Revisione periodica a norma di legge dell'idoneit\xE0 alla circolazione di autoveicoli e motocicli", "71.20.29": "Altre attivit\xE0 di controllo di qualit\xE0 e certificazione di prodotti", "72.10.10": "Ricerca e sviluppo sperimentale nel campo delle biotecnologie", "72.10.21": "Ricerca e sviluppo sperimentale nel campo della geologia", "72.10.22": "Ricerca e sviluppo sperimentale nel campo della diagnostica per la conservazione dei beni culturali", "72.10.29": "Ricerca e sviluppo sperimentale nel campo delle altre scienze naturali e dell'ingegneria n.c.a.", "72.20.01": "Ricerca e sviluppo sperimentale nel campo dell'archeologia", "72.20.09": "Ricerca e sviluppo sperimentale nel campo delle altre scienze sociali e umanistiche", "73.11.01": "Ideazione di campagne pubblicitarie", "73.11.02": "Conduzione di campagne di marketing e altri servizi pubblicitari", "73.11.03": "Attivit\xE0 di influencer marketing", "73.12.00": "Attivit\xE0 di concessionarie pubblicitarie", "73.20.00": "Ricerche di mercato e sondaggi di opinione", "73.30.01": "Attivit\xE0 di rappresentanza di interessi", "73.30.02": "Attivit\xE0 di informazione scientifica inerente prodotti farmaceutici e articoli medicali per scopi promozionali", "73.30.03": "Attivit\xE0 di promozione di altri prodotti", "73.30.09": "Pubbliche relazioni e comunicazione n.c.a.", "74.11.10": "Attivit\xE0 di progettazione di prodotti industriali", "74.11.20": "Attivit\xE0 di progettazione di moda", "74.12.01": "Grafica di pagine web", "74.12.09": "Altre attivit\xE0 di progettazione grafica e di comunicazione visiva", "74.13.00": "Attivit\xE0 di progettazione di interni", "74.14.01": "Attivit\xE0 di progettazione specializzata fornite da disegnatori tecnici", "74.14.09": "Altre attivit\xE0 di progettazione specializzata n.c.a.", "74.20.11": "Attivit\xE0 fotografiche fornite da fotoreporter", "74.20.12": "Attivit\xE0 fotografiche aeree e subacquee", "74.20.19": "Altre attivit\xE0 fotografiche specializzate", "74.20.20": "Attivit\xE0 di sviluppo e stampa e altre attivit\xE0 fotografiche", "74.30.00": "Attivit\xE0 di traduzione e interpretariato", "74.91.00": "Attivit\xE0 di servizi di intermediazione e marketing di brevetti", "74.99.11": "Attivit\xE0 di consulenza agraria fornite da agronomi", "74.99.12": "Attivit\xE0 di consulenza agraria fornite da agrotecnici", "74.99.13": "Attivit\xE0 di consulenza agraria fornite da periti agrari", "74.99.14": "Attivit\xE0 di consulenza agraria fornite da altri economisti specializzati in agricoltura", "74.99.15": "Attivit\xE0 di consulenza agraria viticolo enologica fornite da enologi", "74.99.16": "Attivit\xE0 di consulenza agraria viticolo enologica fornite da enotecnici", "74.99.19": "Altre attivit\xE0 di consulenza agraria n.c.a.", "74.99.21": "Attivit\xE0 di consulenza in materia di sicurezza e salute dei posti di lavoro", "74.99.29": "Altre attivit\xE0 di consulenza in materia di sicurezza", "74.99.31": "Attivit\xE0 di consulenza in materia di prevenzione e riduzione dell'inquinamento e di gestione dei rifiuti", "74.99.32": "Attivit\xE0 di consulenza in materia di gestione delle risorse energetiche, energie rinnovabili ed efficienza energetica", "74.99.33": "Attivit\xE0 di consulenza in materia di gestione delle risorse idriche, minerali e altre risorse naturali per usi differenti da quelli energetici", "74.99.41": "Attivit\xE0 di consulenza fornite da enotecari e sommelier", "74.99.42": "Attivit\xE0 di consulenza in gastronomia", "74.99.91": "Attivit\xE0 tecniche svolte da periti industriali", "74.99.92": "Attivit\xE0 di previsione meteorologica", "74.99.93": "Attivit\xE0 di agenzie, agenti e procuratori per lo spettacolo e lo sport", "74.99.94": "Attivit\xE0 di consulenza tecnica in ambito grafologico", "74.99.99": "Tutte le altre attivit\xE0 varie professionali, scientifiche e tecniche n.c.a.", "75.00.00": "Servizi veterinari", "77.11.00": "Noleggio e leasing operativo di automobili e autoveicoli leggeri", "77.12.00": "Noleggio e leasing operativo di autocarri", "77.21.01": "Noleggio e leasing operativo di biciclette", "77.21.02": "Noleggio e leasing operativo di imbarcazioni da diporto senza operatore", "77.21.09": "Noleggio e leasing operativo di altre attrezzature e articoli sportivi e ricreativi", "77.22.10": "Noleggio e leasing operativo di tessili, articoli di abbigliamento e calzature", "77.22.90": "Noleggio e leasing operativo di altri beni per uso personale e per la casa n.c.a.", "77.31.00": "Noleggio e leasing operativo di macchine e attrezzature agricole", "77.32.00": "Noleggio e leasing operativo di macchine e attrezzature per lavori edili e di ingegneria civile", "77.33.00": "Noleggio e leasing operativo di macchine, attrezzature e computer per ufficio", "77.34.00": "Noleggio e leasing operativo di mezzi di trasporto marittimi, fluviali e lacustri", "77.35.00": "Noleggio e leasing operativo di mezzi di trasporto aereo", "77.39.10": "Noleggio e leasing operativo di altri mezzi di trasporto terrestre", "77.39.91": "Noleggio e leasing operativo di apparecchi di sollevamento e movimentazione merci", "77.39.92": "Noleggio e leasing operativo di strutture e attrezzature per manifestazioni e spettacoli", "77.39.99": "Noleggio e leasing operativo di altre macchine, attrezzature e beni materiali vari n.c.a.", "77.40.00": "Concessione dei diritti di sfruttamento di propriet\xE0 intellettuale, escluse le opere soggette a diritto d'autore", "77.51.00": "Attivit\xE0 di servizi di intermediazione per il noleggio e il leasing operativo di automobili, autocaravan e rimorchi", "77.52.00": "Attivit\xE0 di servizi di intermediazione per il noleggio e il leasing operativo di altri beni materiali e beni immateriali non finanziari", "78.10.00": "Attivit\xE0 di agenzie di collocamento", "78.20.00": "Attivit\xE0 di agenzie di lavoro interinale e altre attivit\xE0 di fornitura di risorse umane", "79.11.00": "Attivit\xE0 di agenzie di viaggio", "79.12.00": "Attivit\xE0 di tour operator", "79.90.01": "Servizi di guida turistica", "79.90.02": "Servizi di accompagnamento in ambiente naturale", "79.90.03": "Altri servizi di accompagnamento turistico", "79.90.04": "Altre attivit\xE0 di assistenza turistica", "80.01.11": "Attivit\xE0 di investigazione in ambito privato", "80.01.12": "Attivit\xE0 di investigazione in ambito aziendale e commerciale", "80.01.13": "Attivit\xE0 di investigazione in ambito assicurativo", "80.01.14": "Attivit\xE0 di investigazione in ambito legale", "80.01.21": "Attivit\xE0 di vigilanza privata non armata", "80.01.29": "Altre attivit\xE0 di vigilanza privata", "80.09.00": "Attivit\xE0 di vigilanza n.c.a.", "81.10.00": "Attivit\xE0 di servizi integrati agli edifici", "81.21.00": "Attivit\xE0 di pulizia generale di edifici", "81.22.01": "Attivit\xE0 di sterilizzazione di attrezzature mediche", "81.22.09": "Altre attivit\xE0 di pulizia di edifici e pulizia industriale n.c.a.", "81.23.10": "Attivit\xE0 di sanificazione, disinfezione e disinfestazione", "81.23.91": "Pulitura delle strade e rimozione di neve e ghiaccio", "81.23.99": "Altre attivit\xE0 di pulizia varie n.c.a.", "81.30.00": "Attivit\xE0 di servizi per la cura del paesaggio", "82.10.00": "Attivit\xE0 amministrative e di supporto per le funzioni di ufficio", "82.20.00": "Attivit\xE0 dei call center", "82.30.01": "Organizzazione di conferenze e congressi", "82.30.02": "Organizzazione di fiere commerciali e di affari", "82.30.03": "Organizzazione di convegni ed eventi aziendali", "82.30.04": "Organizzazione di mercati agricoli e fiere dell'artigianato", "82.30.09": "Organizzazione di altri eventi", "82.40.01": "Attivit\xE0 di servizi di prenotazione di biglietti per spettacoli teatrali, sportivi e altri spettacoli di intrattenimento e divertimento", "82.40.09": "Altre attivit\xE0 di servizi di intermediazione per servizi di supporto alle imprese n.c.a.", "82.91.10": "Attivit\xE0 di recupero crediti", "82.91.20": "Attivit\xE0 di raccolta e fornitura di informazioni commerciali e di rating", "82.92.10": "Attivit\xE0 di imballaggio di generi alimentari", "82.92.20": "Attivit\xE0 di imballaggio di generi non alimentari", "82.99.11": "Fornitura di assistenza per la registrazione di autoveicoli", "82.99.19": "Richiesta certificati e disbrigo pratiche n.c.a.", "82.99.91": "Rilevamento del consumo di calore e acqua calda", "82.99.99": "Tutti gli altri servizi vari di supporto alle imprese n.c.a.", "84.11.10": "Attivit\xE0 degli organi legislativi ed esecutivi e delle amministrazioni centrali e locali", "84.11.20": "Servizi di gestione esattoriale per conto terzi", "84.11.30": "Attivit\xE0 di pianificazione generale e servizi statistici generali", "84.12.10": "Regolamentazione dei servizi di assistenza sanitaria", "84.12.20": "Regolamentazione dei servizi di istruzione", "84.12.30": "Regolamentazione dei servizi per l'edilizia abitativa e la tutela dell'ambiente", "84.12.40": "Regolamentazione dei servizi culturali e di altri servizi sociali", "84.13.10": "Regolamentazione dei servizi connessi a agricoltura, silvicoltura, caccia e pesca", "84.13.20": "Regolamentazione dei servizi connessi a combustibili ed energia", "84.13.30": "Regolamentazione dei servizi connessi a industrie estrattive e risorse minerarie, industrie manifatturiere e di costruzione", "84.13.40": "Regolamentazione dei servizi connessi a trasporti e comunicazioni", "84.13.50": "Regolamentazione dei servizi connessi a commercio, servizi di alloggio e ristorazione", "84.13.60": "Regolamentazione dei servizi connessi al turismo", "84.13.90": "Regolamentazione di altri servizi", "84.21.00": "Affari esteri", "84.22.00": "Difesa nazionale", "84.23.00": "Giustizia e attivit\xE0 giudiziarie", "84.24.10": "Ordine pubblico e sicurezza nazionale delle Forze dell'Ordine", "84.24.20": "Attivit\xE0 di supporto all'ordine pubblico e alla sicurezza nazionale fornite dalla Protezione Civile", "84.25.00": "Servizi antincendio", "84.30.00": "Assicurazione sociale obbligatoria", "85.10.00": "Istruzione prescolastica", "85.20.00": "Istruzione primaria", "85.31.10": "Istruzione secondaria di formazione generale di primo grado", "85.31.20": "Istruzione secondaria di formazione generale di secondo grado", "85.32.01": "Istruzione secondaria professionale erogata da scuole di vela e navigazione", "85.32.02": "Istruzione secondaria professionale erogata da scuole di volo", "85.32.03": "Istruzione secondaria professionale erogata da scuole di guida", "85.32.09": "Altra istruzione secondaria professionale n.c.a.", "85.33.00": "Istruzione post-secondaria non terziaria", "85.40.10": "Istruzione terziaria non universitaria professionale", "85.40.20": "Istruzione terziaria universitaria di primo, secondo e terzo ciclo e a ciclo unico", "85.51.01": "Insegnamento di pilates fornito da insegnanti e istruttori indipendenti", "85.51.09": "Formazione sportiva e ricreativa n.c.a.", "85.52.01": "Corsi di danza", "85.52.02": "Attivit\xE0 di educazione al patrimonio culturale", "85.52.09": "Altra formazione culturale", "85.53.00": "Attivit\xE0 di scuole guida", "85.59.10": "Corsi di lingua straniera", "85.59.20": "Corsi di formazione e corsi di aggiornamento professionale", "85.59.30": "Altri servizi di istruzione e formazione n.c.a. forniti da universit\xE0 popolari", "85.59.91": "Corsi di educazione consapevole attraverso il movimento", "85.59.99": "Tutti gli altri servizi vari di istruzione e formazione n.c.a.", "85.61.00": "Attivit\xE0 di servizi di intermediazione per corsi e tutor", "85.69.01": "Consulenza scolastica e servizi di orientamento scolastico", "85.69.09": "Altri servizi vari di supporto all'istruzione e formazione n.c.a.", "86.10.00": "Attivit\xE0 ospedaliere", "86.21.00": "Attivit\xE0 di medicina generale", "86.22.01": "Trattamenti di chirurgia estetica", "86.22.02": "Altre attivit\xE0 di medicina specialistica svolte da medici specialisti indipendenti", "86.22.03": "Altre attivit\xE0 di medicina specialistica svolte presso cliniche e centri specialistici", "86.23.00": "Attivit\xE0 odontoiatriche", "86.91.01": "Attivit\xE0 di diagnostica per immagini", "86.91.02": "Attivit\xE0 di laboratorio medico", "86.92.00": "Trasporto di pazienti in ambulanza", "86.93.00": "Attivit\xE0 di psicologi e psicoterapeuti, esclusi i medici", "86.94.01": "Attivit\xE0 infermieristiche", "86.94.02": "Attivit\xE0 ostetriche", "86.95.00": "Attivit\xE0 di fisioterapia", "86.96.01": "Chinesiologia", "86.96.09": "Attivit\xE0 di medicine complementari e alternative n.c.a.", "86.97.00": "Attivit\xE0 di servizi di intermediazione per attivit\xE0 mediche, odontoiatriche e altri servizi per la salute umana", "86.99.01": "Tecniche di trattamento del corpo", "86.99.02": "Danza-movimento terapia", "86.99.03": "Attivit\xE0 di psicomotricit\xE0", "86.99.09": "Altre attivit\xE0 varie per la salute umana n.c.a.", "87.10.00": "Attivit\xE0 di assistenza infermieristica residenziale", "87.20.00": "Attivit\xE0 di assistenza residenziale per persone affette da disturbi mentali o abuso di sostanze", "87.30.00": "Attivit\xE0 di assistenza residenziale per anziani o persone con disabilit\xE0 fisiche", "87.91.00": "Attivit\xE0 di servizi di intermediazione per attivit\xE0 di assistenza residenziale", "87.99.00": "Altre attivit\xE0 di assistenza residenziale n.c.a.", "88.10.00": "Attivit\xE0 di assistenza sociale non residenziale per anziani o persone con disabilit\xE0", "88.91.00": "Attivit\xE0 di assistenza diurna per l'infanzia", "88.99.01": "Servizi di counselling", "88.99.02": "Consulenza familiare", "88.99.03": "Mediazione culturale e interculturale", "88.99.04": "Altre attivit\xE0 di assistenza sociale non residenziale fornite da pedagogisti", "88.99.09": "Altre attivit\xE0 varie di assistenza sociale non residenziale n.c.a.", "90.11.01": "Attivit\xE0 di giornalisti indipendenti", "90.11.02": "Attivit\xE0 di blogger indipendenti", "90.11.09": "Altre attivit\xE0 di creazione letteraria e composizione musicale", "90.12.00": "Attivit\xE0 di creazione di arti visive", "90.13.00": "Altre attivit\xE0 di creazione artistica", "90.20.01": "Attivit\xE0 nel campo della recitazione", "90.20.09": "Altre attivit\xE0 di arti performative e rappresentazioni artistiche", "90.31.00": "Gestione di strutture e spazi per le arti", "90.39.01": "Attivit\xE0 nel campo della regia", "90.39.09": "Altre attivit\xE0 di supporto alle arti performative e alle rappresentazioni artistiche n.c.a.", "91.11.00": "Attivit\xE0 di biblioteche", "91.12.00": "Attivit\xE0 di archivi", "91.21.00": "Attivit\xE0 di musei e collezioni", "91.22.00": "Attivit\xE0 di luoghi e monumenti storici", "91.30.01": "Conservazione e restauro del patrimonio culturale", "91.30.02": "Creazione e gestione di apparecchiature multimediali per l'accompagnamento alle visite in musei e altri siti culturali", "91.30.09": "Altre attivit\xE0 di supporto al patrimonio culturale", "91.41.00": "Attivit\xE0 di orti botanici e giardini zoologici", "91.42.00": "Attivit\xE0 di riserve e parchi naturali", "92.00.01": "Gestione di apparecchi che consentono vincite in denaro funzionanti a moneta o a gettone", "92.00.09": "Altre attivit\xE0 di scommesse, lotterie e altri giochi d'azzardo", "93.11.10": "Gestione di piscine", "93.11.90": "Gestione di altri impianti sportivi", "93.12.00": "Attivit\xE0 dei club sportivi", "93.13.01": "Attivit\xE0 di studi di yoga, pilates e Tai Chi", "93.13.09": "Altre attivit\xE0 dei centri di fitness", "93.19.10": "Attivit\xE0 di organizzazioni ed enti sportivi e promozione di eventi sportivi", "93.19.91": "Attivit\xE0 di ricarica di bombole per attivit\xE0 subacquee", "93.19.92": "Attivit\xE0 di guida alpina", "93.19.93": "Attivit\xE0 di guida di pesca", "93.19.99": "Altre attivit\xE0 sportive varie n.c.a.", "93.21.00": "Attivit\xE0 dei parchi di divertimento e dei parchi tematici", "93.29.10": "Gestione di piste e sale da ballo", "93.29.20": "Gestione di stabilimenti balneari", "93.29.30": "Gestione di apparecchi da intrattenimento che non consentono vincite in denaro funzionanti a moneta o a gettone", "93.29.91": "Gestione di attrazioni e attivit\xE0 di spettacolo in forma itinerante", "93.29.99": "Altre attivit\xE0 varie di intrattenimento e divertimento n.c.a.", "94.11.00": "Attivit\xE0 di organizzazioni di imprese e dei datori di lavoro", "94.12.10": "Attivit\xE0 di ordini e collegi professionali", "94.12.20": "Attivit\xE0 di associazioni professionali", "94.20.00": "Attivit\xE0 dei sindacati di lavoratori", "94.91.00": "Attivit\xE0 delle organizzazioni religiose", "94.92.00": "Attivit\xE0 delle organizzazioni politiche", "94.99.10": "Attivit\xE0 di organizzazioni associative per la tutela degli interessi e dei diritti dei cittadini", "94.99.20": "Attivit\xE0 di organizzazioni associative culturali e ricreative", "94.99.30": "Attivit\xE0 di organizzazioni associative a scopo patriottico", "94.99.40": "Attivit\xE0 di organizzazioni associative per la cooperazione internazionale", "94.99.50": "Attivit\xE0 di organizzazioni associative filantropiche", "94.99.60": "Attivit\xE0 di organizzazioni associative per la promozione e la difesa degli animali e dell'ambiente", "94.99.90": "Attivit\xE0 di altre organizzazioni associative varie n.c.a.", "95.10.10": "Riparazione e manutenzione di computer e periferiche", "95.10.21": "Riparazione e manutenzione di telefoni e tablet", "95.10.29": "Riparazione e manutenzione di altre apparecchiature per le comunicazioni", "95.21.00": "Riparazione e manutenzione di prodotti di elettronica di consumo", "95.22.01": "Riparazione e manutenzione di elettrodomestici", "95.22.02": "Riparazione e manutenzione di articoli per la casa e il giardinaggio", "95.23.00": "Riparazione e manutenzione di calzature e articoli in pelle", "95.24.01": "Rivestimento di mobili e oggetti di arredamento per la casa imbottiti", "95.24.09": "Altre attivit\xE0 di riparazione e manutenzione di mobili e di oggetti di arredamento per la casa", "95.25.00": "Riparazione e manutenzione di orologi e gioielli", "95.29.10": "Riparazione e accordatura di strumenti musicali non storici", "95.29.21": "Riparazione e manutenzione di biciclette", "95.29.22": "Riparazione e manutenzione di articoli sportivi e attrezzature da campeggio", "95.29.30": "Riparazione e modifica di articoli di abbigliamento", "95.29.91": "Affilatura di coltelli, servizi di duplicazione di chiavi e di incisione rapida", "95.29.99": "Riparazione e manutenzione di altri beni vari per uso personale e per la casa n.c.a.", "95.31.10": "Riparazione e manutenzione meccanica, elettrica ed elettronica di autoveicoli", "95.31.20": "Riparazione e manutenzione di carrozzerie di autoveicoli", "95.31.30": "Riparazione, montaggio o sostituzione di pneumatici e camere d'aria di autoveicoli", "95.31.91": "Lavaggio di autoveicoli", "95.31.92": "Riparazione e manutenzione di cellule abitative per caravan e autocaravan", "95.31.99": "Altre attivit\xE0 di riparazione e manutenzione di autoveicoli n.c.a.", "95.32.00": "Riparazione e manutenzione di motocicli", "95.40.00": "Attivit\xE0 di servizi di intermediazione per la riparazione e la manutenzione di computer, beni per uso personale e per la casa, autoveicoli e motocicli", "96.10.11": "Lavaggio e pulitura di prodotti tessili forniti da lavanderie industriali per industrie, ospedali e altre strutture simili", "96.10.12": "Lavaggio e pulitura di prodotti tessili forniti da lavanderie industriali per ristorazione, alberghi e altri servizi di alloggio", "96.10.21": "Lavaggio e pulitura di prodotti tessili e pellicce forniti da lavanderie e tintorie tradizionali", "96.10.22": "Lavaggio e pulitura di prodotti tessili e pellicce forniti da lavanderie self-service", "96.21.00": "Servizi di parrucchieri e barbieri", "96.22.01": "Servizi di manicure e pedicure", "96.22.09": "Altri servizi di cura della bellezza e altri trattamenti di bellezza n.c.a.", "96.23.10": "Servizi di centri termali", "96.23.91": "Terapia del sale", "96.23.99": "Altri servizi di centri benessere, sauna e bagno di vapore n.c.a.", "96.30.01": "Servizi di pompe funebri", "96.30.02": "Servizi di sepoltura", "96.30.09": "Servizi funerari e attivit\xE0 connesse n.c.a.", "96.40.00": "Attivit\xE0 di servizi di intermediazione per servizi alla persona", "96.91.00": "Fornitura di servizi domestici", "96.99.11": "Servizi di presa in pensione e custodia per animali da compagnia", "96.99.12": "Servizi di toelettatura per animali da compagnia", "96.99.13": "Servizi di addestramento per animali da compagnia", "96.99.14": "Gestione di rifugi per animali", "96.99.19": "Servizi di cura per animali da compagnia n.c.a.", "96.99.91": "Attivit\xE0 di studi di tatuaggi e piercing", "96.99.92": "Servizi di incontro ed eventi simili", "96.99.93": "Servizi di organizzazione di feste e cerimonie", "96.99.94": "Servizi di consulenza di immagine", "96.99.99": "Tutte le altre attivit\xE0 varie di servizi alla persona n.c.a.", "97.00.10": "Attivit\xE0 di condomini come datori di lavoro per personale domestico", "97.00.90": "Attivit\xE0 di famiglie e convivenze come datori di lavoro per personale domestico n.c.a.", "98.10.00": "Produzione di beni indifferenziati per uso proprio da parte di famiglie e convivenze", "98.20.00": "Produzione di servizi indifferenziati per uso proprio da parte di famiglie e convivenze", "99.00.00": "Attivit\xE0 di organizzazioni e organismi extraterritoriali" };

  // js/fiscal/ateco-ricerca.js
  var norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  var INDICE = Object.entries(ateco2025_titoli_default).map(([codice, titolo]) => ({ codice, titolo, chiave: norm(`${codice} ${titolo}`) }));
  var titoloAteco2025 = (codice) => ateco2025_titoli_default[codice] ?? null;
  function cercaAteco(testo2, limite = 12) {
    const q = norm(testo2.trim());
    if (q.length < 2) return [];
    const parole = q.split(/\s+/);
    const trovati = INDICE.filter((r) => parole.every((p) => r.chiave.includes(p)));
    trovati.sort((a, b) => Number(b.codice.startsWith(q)) - Number(a.codice.startsWith(q)) || a.codice.localeCompare(b.codice));
    return trovati.slice(0, limite).map(({ codice, titolo }) => ({ codice, titolo }));
  }

  // js/domain/demo.js
  function prng(seme) {
    let a = [...seme].reduce((h2, c) => Math.imul(h2 ^ c.charCodeAt(0), 2654435761) >>> 0, 2654435769);
    return () => {
      a |= 0;
      a = a + 1831565813 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function pivaDa(n) {
    const base = String(1e7 + n * 7919).padStart(10, "0").slice(0, 10);
    for (let k = 0; k < 10; k++) {
      const p = `${base}${k}`;
      if (partitaIvaValida(p)) return p;
    }
    return `${base}0`;
  }
  var PROFILI = [
    { nome: "Marta Conti", mestiere: "Consulente software", previdenza: { tipo: "gestione-separata" }, ateco: "62.20.10", inizio: 2023, startup: true, mensile: [4700, 5500], clienti: ["Nexa Srl", "Orbis SpA", "Lumen Tech", "Argo Systems"], spese: [["Hosting e licenze", 90], ["Hardware", 140], ["Formazione", 80]] },
    { nome: "Luca Ferri", mestiere: "Elettricista", previdenza: { tipo: "artigiani", iscrittoDal1996: true, riduzione35: true }, ateco: "43.21.01", inizio: 2021, mensile: [3700, 4300], clienti: ["Condominio Aurora", "Immobiliare Bianchi", "Fam. Monti", "Studio Dentistico Neri"], spese: [["Materiali", 500], ["Carburante", 160], ["Assicurazione furgone", 90]] },
    { nome: "Giulia Bernardi", mestiere: "Graphic designer", previdenza: { tipo: "gestione-separata" }, ateco: "74.12.01", inizio: 2025, startup: true, mensile: [2300, 3200], clienti: ["Caff\xE8 Fiorino", "Studio Legale Ferrero", "Moda Verde Srl"], spese: [["Software di grafica", 60], ["Coworking", 180]] },
    { nome: "Paolo Mancini", mestiere: "E-commerce di abbigliamento", previdenza: { tipo: "commercianti", iscrittoDal1996: true }, ateco: "47.91.10", inizio: 2020, mensile: [6200, 8300], clienti: ["Vendite online (marketplace)", "Ordini sito web"], spese: [["Merce e magazzino", 1800], ["Spedizioni", 450], ["Pubblicit\xE0 online", 300]] },
    {
      nome: "Elena Rizzi",
      mestiere: "Architetto",
      previdenza: { tipo: "cassa", cassa: { aliquotaSoggettiva: 0.145, contributoMinimo: 0 } },
      ateco: "71.11.09",
      inizio: 2019,
      mensile: [3500, 4800],
      clienti: ["Famiglia Costa", "Comune di Valmora", "Costruzioni Alfa"],
      spese: [["Software CAD", 120], ["Assicurazione professionale", 70]],
      cassa: [["2026-06-30", "Contributi alla cassa \u2014 acconto"], ["2026-09-30", "Contributi alla cassa \u2014 saldo"]]
    },
    { nome: "Andrea Sala", mestiere: "Traduttore", previdenza: { tipo: "gestione-separata" }, ateco: "74.30.00", inizio: 2018, mensile: [8200, 10300], clienti: ["Edizioni Meridiana", "Global Docs Srl", "Agenzia Lingue"], spese: [["Strumenti di traduzione", 80]] },
    { nome: "Sara Villa", mestiere: "Consulente HR", previdenza: { tipo: "gestione-separata", altraCopertura: true }, ateco: "74.99.32", inizio: 2022, mensile: [2e3, 2700], clienti: ["Officine Riva", "Studio Tecnico Pini"], spese: [["Abbonamenti professionali", 50]] }
  ];
  var iso2 = (a, m, g) => `${a}-${String(m).padStart(2, "0")}-${String(g).padStart(2, "0")}`;
  var aggiungiGiorni = (isoData, n) => {
    const d = /* @__PURE__ */ new Date(`${isoData}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  };
  var arrotonda = (n) => Math.round(n / 10) * 10;
  function generaDemo(oggi) {
    const annoCorrente = Number(oggi.slice(0, 4));
    const meseCorrente = Number(oggi.slice(5, 7));
    const params = parametriPerAnno(annoCorrente).params;
    const clienti = [], fatture = [], spese = [];
    PROFILI.forEach((pf, idx) => {
      const rnd = prng(pf.nome);
      const c = nuovoCliente();
      c.id = `demo-${idx + 1}`;
      c.demo = true;
      c.nome = pf.nome;
      c.partitaIva = pivaDa(idx + 1);
      c.annoInizioAttivita = pf.inizio;
      c.startup = Boolean(pf.startup);
      c.previdenza = { ...c.previdenza, ...pf.previdenza };
      const r = coefficienteAteco2025(pf.ateco, params);
      c.ateco = [{ codice: pf.ateco, descrizione: titoloAteco2025(pf.ateco) ?? pf.mestiere, gruppo: r.candidati[0].gruppo }];
      c.note = pf.mestiere;
      if (pf.cassa) c.scadenzeCassa = pf.cassa.map(([data, descrizione]) => ({ anno: annoCorrente, data, descrizione, importo: Math.round(1500 + rnd() * 900) }));
      clienti.push(c);
      for (const anno2 of [annoCorrente - 1, annoCorrente]) {
        const ultimo = anno2 === annoCorrente ? meseCorrente : 12;
        const [minimo, massimo] = pf.mensile;
        const base = anno2 === annoCorrente ? massimo : minimo + (massimo - minimo) * 0.35;
        let n = 1;
        for (let m = 1; m <= ultimo; m++) {
          const emissioni = pf.clienti.length > 2 ? 2 : 1;
          for (let e = 0; e < emissioni; e++) {
            const f = nuovaFattura(c.id);
            f.id = `${c.id}-f-${anno2}-${m}-${e}`;
            f.numero = `${n++}/${anno2}`;
            const giorno = e === 0 ? 3 + Math.floor(rnd() * 9) : 14 + Math.floor(rnd() * 12);
            f.data = iso2(anno2, m, giorno);
            f.controparte = pf.clienti[(m + e + idx) % pf.clienti.length];
            f.importo = arrotonda(base / emissioni * (0.85 + rnd() * 0.3));
            f.bollo = f.importo > 77.47 ? 2 : 0;
            f.atecoCodice = pf.ateco;
            const incasso = aggiungiGiorni(f.data, 12 + Math.floor(rnd() * 34));
            f.dataIncasso = incasso <= oggi && f.data < oggi ? incasso : "";
            if (f.data > oggi) continue;
            fatture.push(f);
          }
          for (const [descrizione, importoBase] of pf.spese) {
            if ((m + descrizione.length) % 2) continue;
            const s = nuovaSpesa(c.id);
            s.id = `${c.id}-s-${anno2}-${m}-${descrizione.length}`;
            s.data = iso2(anno2, m, 5 + Math.floor(rnd() * 20));
            if (s.data > oggi) continue;
            s.descrizione = descrizione;
            s.categoria = descrizione.split(" ")[0];
            s.importo = Math.round(importoBase * (0.7 + rnd() * 0.6));
            spese.push(s);
          }
        }
      }
    });
    return { clienti, fatture, spese };
  }
  var eDemo = (cliente) => cliente.demo === true;

  // js/ui/overlay.js
  var pila = [];
  function trappola(contenitore) {
    const focalizzabili = () => [...contenitore.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter((e) => e.offsetParent !== null);
    contenitore.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const f = focalizzabili();
      if (!f.length) return;
      const primo2 = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primo2) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primo2.focus();
      }
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pila.length) {
      e.preventDefault();
      pila[pila.length - 1].chiudi();
    }
  });
  function montaOverlay(nodi, { chiudiSuVelo = true, onChiudi } = {}) {
    const precedente = document.activeElement;
    const velo = h("div", { classe: "velo", onClick: chiudiSuVelo ? () => voce.chiudi() : null });
    document.body.append(velo, ...nodi);
    const voce = {
      chiudi() {
        pila = pila.filter((v) => v !== voce);
        velo.remove();
        nodi.forEach((n) => n.remove());
        onChiudi?.();
        precedente?.focus?.();
      }
    };
    pila.push(voce);
    trappola(nodi[0]);
    (nodi[0].querySelector("[autofocus], input:not([type=hidden]), select, textarea") ?? nodi[0].querySelector("button"))?.focus();
    return voce;
  }
  function apriDrawer({ titolo, sottotitolo, corpo, azioni, onChiudi }) {
    const pannello = h(
      "aside",
      { classe: "drawer", role: "dialog", "aria-modal": "true", "aria-label": titolo },
      h(
        "div",
        { classe: "drawer-testa" },
        h("div", null, h("h2", null, titolo), sottotitolo ? h("p", { classe: "muted piccolo" }, sottotitolo) : null),
        h("button", { classe: "bottone ghost icona-sola", type: "button", "aria-label": "Chiudi", onClick: () => v.chiudi() }, icona("chiudi", 18))
      ),
      h("div", { classe: "drawer-corpo" }, corpo),
      azioni ? h("div", { classe: "drawer-piede" }, azioni) : null
    );
    const v = montaOverlay([pannello], { onChiudi });
    return v;
  }
  function apriDialogo({ titolo, corpo, azioni, largo = false, onChiudi }) {
    const d = h(
      "div",
      { classe: `dialogo ${largo ? "largo" : ""}`, role: "dialog", "aria-modal": "true", "aria-label": titolo },
      h("div", { classe: "dialogo-corpo" }, h("h2", null, titolo), corpo),
      azioni ? h("div", { classe: "dialogo-piede" }, azioni) : null
    );
    return montaOverlay([d], { onChiudi });
  }
  function conferma({ titolo, testo: testo2, etichetta = "Conferma", pericolo = false }) {
    return new Promise((ok) => {
      let risolto = false;
      const fine = (v) => {
        if (!risolto) {
          risolto = true;
          ok(v);
        }
      };
      const dlg = apriDialogo({
        titolo,
        corpo: h("p", { classe: "muted" }, testo2),
        onChiudi: () => fine(false),
        azioni: [
          h("button", { classe: "bottone", type: "button", onClick: () => dlg.chiudi() }, "Annulla"),
          h("button", { classe: `bottone ${pericolo ? "pericolo pieno" : "primario"}`, type: "button", onClick: () => {
            fine(true);
            dlg.chiudi();
          } }, etichetta)
        ]
      });
    });
  }
  function confermaDigitando({ titolo, testo: testo2, parola = "ELIMINA", etichetta = "Elimina definitivamente" }) {
    return new Promise((ok) => {
      let risolto = false;
      const fine = (v) => {
        if (!risolto) {
          risolto = true;
          ok(v);
        }
      };
      const input = h("input", { type: "text", autocomplete: "off", spellcheck: "false", "aria-label": `Scrivi ${parola} per confermare`, placeholder: parola, classe: "input" });
      const vai = h("button", { classe: "bottone pericolo pieno", type: "button", disabled: true, onClick: () => {
        fine(true);
        dlg.chiudi();
      } }, etichetta);
      input.addEventListener("input", () => {
        vai.disabled = input.value.trim() !== parola;
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !vai.disabled) vai.click();
      });
      const dlg = apriDialogo({
        titolo,
        onChiudi: () => fine(false),
        corpo: h("div", { classe: "pila", style: "gap:14px" }, h("p", { classe: "muted" }, testo2), h("label", { classe: "etichetta" }, `Per confermare scrivi ${parola}`), input),
        azioni: [h("button", { classe: "bottone", type: "button", onClick: () => dlg.chiudi() }, "Annulla"), vai]
      });
    });
  }
  function apriMenu(ancora, voci, { larghezza, allinea = "destra", sopra = false } = {}) {
    document.querySelectorAll(".menu-contestuale").forEach((m) => m.remove());
    const r = ancora.getBoundingClientRect();
    const menu = h("div", { classe: "menu-contestuale", role: "menu" }, voci.map((v) => v === "sep" ? h("hr") : v.intestazione ? h("div", { classe: "menu-titolo" }, v.testo) : h("button", {
      type: "button",
      role: "menuitem",
      classe: v.pericolo ? "pericolo" : "",
      onClick: () => {
        chiudi2();
        v.onClick();
      }
    }, v.icona ? icona(v.icona, 16) : null, v.testo)));
    if (larghezza) menu.style.width = `${Math.min(larghezza, window.innerWidth - 16)}px`;
    document.body.append(menu);
    const w2 = menu.offsetWidth;
    const alto = sopra ? r.top - menu.offsetHeight - 6 : r.bottom + 6;
    menu.style.top = `${Math.max(8, Math.min(alto, window.innerHeight - menu.offsetHeight - 8))}px`;
    const x = allinea === "sinistra" ? r.left : r.right - w2;
    menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - w2 - 8))}px`;
    const chiudi2 = () => {
      menu.remove();
      document.removeEventListener("pointerdown", fuori, true);
      document.removeEventListener("keydown", tasto, true);
    };
    const fuori = (e) => {
      if (!menu.contains(e.target)) chiudi2();
    };
    const tasto = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        chiudi2();
        ancora.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const b = [...menu.querySelectorAll("button")];
        const i = b.indexOf(document.activeElement);
        b[(i + (e.key === "ArrowDown" ? 1 : -1) + b.length) % b.length].focus();
      }
    };
    setTimeout(() => {
      document.addEventListener("pointerdown", fuori, true);
      document.addEventListener("keydown", tasto, true);
    }, 0);
    menu.querySelector("button")?.focus();
  }
  var contenitoreToast;
  function toast(messaggio, tipo = "ok") {
    if (!contenitoreToast || !document.body.contains(contenitoreToast)) {
      contenitoreToast = h("div", { classe: "toasts", "aria-live": "polite" });
      document.body.append(contenitoreToast);
    }
    const t = h("div", { classe: `toast ${tipo}`, role: "status" }, icona(tipo === "errore" ? "avviso" : "spunta", 18), h("div", null, messaggio));
    contenitoreToast.append(t);
    setTimeout(() => {
      t.style.transition = "opacity .25s";
      t.style.opacity = "0";
      setTimeout(() => t.remove(), 260);
    }, tipo === "errore" ? 6e3 : 3200);
  }
  function apriPalette(fornisciComandi) {
    const comandi = fornisciComandi();
    let filtrati = comandi, sel = 0;
    const input = h("input", { type: "text", placeholder: "Cerca una pagina, un cliente o un\u2019azione\u2026", "aria-label": "Cerca comandi", autocomplete: "off" });
    const lista = h("ul", { role: "listbox" });
    const norm2 = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const disegna2 = () => {
      lista.replaceChildren(...filtrati.length ? filtrati.map((c, i) => h("li", {
        role: "option",
        "aria-selected": i === sel ? "true" : "false",
        onClick: () => esegui(c),
        onPointermove: () => {
          if (sel !== i) {
            sel = i;
            disegna2();
          }
        }
      }, icona(c.icona ?? "freccia", 18), c.testo, h("span", { classe: "gruppo" }, c.gruppo))) : [h("div", { classe: "vuoto-palette" }, "Nessun risultato")]);
      lista.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
    };
    const esegui = (c) => {
      v.chiudi();
      setTimeout(() => c.esegui(), 0);
    };
    const box = h("div", { classe: "palette", role: "dialog", "aria-modal": "true", "aria-label": "Palette comandi" }, input, lista);
    const v = montaOverlay([box]);
    input.addEventListener("input", () => {
      const q = norm2(input.value);
      filtrati = comandi.filter((c) => norm2(`${c.testo} ${c.gruppo}`).includes(q));
      sel = 0;
      disegna2();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        sel = Math.min(sel + 1, filtrati.length - 1);
        disegna2();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        sel = Math.max(sel - 1, 0);
        disegna2();
      }
      if (e.key === "Enter" && filtrati[sel]) {
        e.preventDefault();
        esegui(filtrati[sel]);
      }
    });
    disegna2();
    return v;
  }

  // js/ui/shell.js
  var ROTTE = [
    { path: "#/studio", titolo: "Panoramica studio", icona: "studio", gruppo: "studio" },
    { path: "#/clienti", titolo: "Clienti", icona: "utenti", gruppo: "studio" },
    { path: "#/agenda", titolo: "Agenda scadenze", icona: "calendario", gruppo: "studio", badge: "agenda" },
    { path: "#/riepilogo", titolo: "Riepilogo", icona: "grafico", gruppo: "cliente" },
    { path: "#/anagrafica", titolo: "Anagrafica", icona: "utente", gruppo: "cliente" },
    { path: "#/fatture", titolo: "Fatture", icona: "documento", gruppo: "cliente" },
    { path: "#/spese", titolo: "Spese", icona: "ricevuta", gruppo: "cliente" },
    { path: "#/simulazione", titolo: "Simulazione", icona: "bilancia", gruppo: "cliente" },
    { path: "#/scadenze", titolo: "Scadenzario", icona: "calendario", gruppo: "cliente" },
    { path: "#/parametri", titolo: "Parametri fiscali", icona: "libro", gruppo: "sistema" },
    { path: "#/sicurezza", titolo: "Backup e sicurezza", icona: "scudo", gruppo: "sistema" },
    { path: "#/impostazioni", titolo: "Impostazioni", icona: "impostazioni", gruppo: "sistema" }
  ];
  var GRUPPI = { studio: "Studio", cliente: "Cliente", sistema: "Sistema" };
  function costruisciShell(ctx, rotta, contenuto, { imminenti = [], azioni }) {
    const { cliente, dati } = ctx;
    let barra;
    const chiudiBarra = () => {
      barra.classList.remove("aperta");
      document.querySelector(".velo-barra")?.remove();
    };
    const apriBarra = () => {
      barra.classList.add("aperta");
      document.body.append(h("div", { classe: "velo-barra", onClick: chiudiBarra }));
    };
    const nomeStudio = ctx.studio.nome || "Studio professionale";
    const perCliente = rotta.gruppo === "cliente";
    const voce = (r) => h(
      "a",
      { classe: "nav-voce", href: r.path, "aria-current": r === rotta || perCliente && r.path === "#/clienti" ? "page" : null, onClick: chiudiBarra },
      icona(r.icona, 17),
      h("span", { classe: "nav-testo" }, r.titolo),
      r.badge === "agenda" && imminenti.length > 0 ? h("span", { classe: "badge attenzione", title: "Versamenti scaduti o in scadenza entro 14 giorni" }, imminenti.length) : null
    );
    barra = h(
      "nav",
      { classe: "barra-laterale", "aria-label": "Navigazione principale" },
      h(
        "button",
        { classe: "workspace", type: "button", "aria-haspopup": "menu", onClick: (e) => apriMenu(e.currentTarget, menuUtente(ctx, azioni), { larghezza: 232 }) },
        h("div", { classe: "logo" }, icona("bilancia", 16)),
        h("div", { classe: "workspace-testi" }, h("strong", null, nomeStudio), h("span", null, "Gestione Forfettario")),
        icona("su-giu", 14)
      ),
      h("button", { classe: "cerca-rapida", type: "button", onClick: azioni.apriPalette }, icona("cerca", 15), "Cerca\u2026", h("kbd", null, navigator.platform?.includes("Mac") ? "\u2318K" : "Ctrl K")),
      ...Object.entries(GRUPPI).filter(([g]) => g !== "cliente").map(([g, titolo]) => h("div", { classe: "nav-gruppo" }, h("div", { classe: "nav-titolo" }, titolo), ROTTE.filter((r) => r.gruppo === g).map(voce))),
      h(
        "div",
        { classe: "barra-fondo" },
        h("div", { classe: "stato-sicuro" }, icona("lucchetto", 13), h("span", null, "Cifrato in locale"), h("span", { classe: "stato-salvato", id: "stato-salvato" }, "Salvato")),
        h(
          "button",
          { classe: "utente", type: "button", "aria-haspopup": "menu", onClick: (e) => apriMenu(e.currentTarget, menuUtente(ctx, azioni), { larghezza: 232, sopra: true }) },
          h("span", { classe: "avatar" }, iniziali(nomeStudio)),
          h("span", { classe: "workspace-testi" }, h("strong", null, nomeStudio), h("span", null, ctx.studio.email || "Account locale")),
          icona("su-giu", 14)
        )
      )
    );
    const percorso = perCliente && cliente ? h(
      "nav",
      { classe: "percorso", "aria-label": "Percorso" },
      h("a", { href: "#/clienti" }, "Clienti"),
      h("span", { classe: "sep" }, "/"),
      h("button", { classe: "cambia-cliente", type: "button", "aria-haspopup": "menu", onClick: (e) => {
        const voci = dati.clienti.map((c) => ({ testo: c.nome || "(senza nome)", icona: c.id === cliente.id ? "spunta" : "utente", onClick: () => azioni.selezionaCliente(c.id) }));
        apriMenu(e.currentTarget, [...voci, "sep", { testo: "Tutti i clienti", icona: "utenti", onClick: () => azioni.naviga("#/clienti") }, { testo: "Nuovo cliente", icona: "piu", onClick: () => azioni.nuovoCliente() }], { allinea: "sinistra", larghezza: 260 });
      } }, h("span", { classe: "avatar mini" }, iniziali(cliente.nome)), cliente.nome || "(senza nome)", icona("su-giu", 13)),
      h("span", { classe: "sep" }, "/"),
      h("strong", null, rotta.titolo)
    ) : h("nav", { classe: "percorso", "aria-label": "Percorso" }, h("strong", null, rotta.titolo));
    const anno2 = h(
      "div",
      { classe: "selezione-anno", role: "group", "aria-label": "Anno di riferimento" },
      h("button", { type: "button", "aria-label": "Anno precedente", onClick: () => azioni.impostaAnno(ctx.anno - 1) }, icona("chevronSx", 14)),
      h("strong", { title: "Anno di riferimento" }, ctx.anno),
      h("button", { type: "button", "aria-label": "Anno successivo", onClick: () => azioni.impostaAnno(ctx.anno + 1) }, icona("chevronDx", 14))
    );
    const campanella = h("button", { classe: "bottone ghost icona-sola campanella", type: "button", "aria-label": `Notifiche${imminenti.length ? `, ${imminenti.length} da gestire` : ""}`, title: "Scadenze imminenti", onClick: (e) => {
      const voci = imminenti.length ? imminenti.slice(0, 6).map((v) => ({ testo: `${dataIt(v.data)} \xB7 ${v.cliente.nome.split(" ")[0]} \xB7 ${v.descrizione}`, icona: v.data < ctx.oggi ? "avviso" : "calendario", onClick: () => azioni.naviga("#/agenda") })) : [{ testo: "Nessun versamento in scadenza a breve", icona: "spunta", onClick: () => {
      } }];
      apriMenu(e.currentTarget, [{ testo: "Scadenze entro 14 giorni", intestazione: true }, ...voci, "sep", { testo: "Apri agenda scadenze", icona: "calendario", onClick: () => azioni.naviga("#/agenda") }], { larghezza: 380 });
    } }, icona("campana", 18), imminenti.length ? h("span", { classe: "punto-notifica" }) : null);
    const topbar = h(
      "header",
      { classe: "topbar" },
      h("button", { classe: "bottone ghost icona-sola pulsante-menu", type: "button", "aria-label": "Apri il menu", onClick: apriBarra }, icona("menu", 20)),
      percorso,
      h("span", { classe: "spaziatore" }),
      h("button", { classe: "pulsante-cerca-mobile bottone ghost icona-sola", type: "button", "aria-label": "Cerca", onClick: azioni.apriPalette }, icona("cerca", 18)),
      anno2,
      campanella,
      h("button", { classe: "bottone ghost icona-sola", type: "button", title: "Cambia tema", "aria-label": "Cambia tema", onClick: azioni.cambiaTema }, icona(azioni.temaScuro() ? "sole" : "luna", 18))
    );
    const schede = perCliente && cliente ? h("div", { classe: "sottobarra" }, h("nav", { classe: "schede", "aria-label": "Sezioni del cliente" }, ROTTE.filter((r) => r.gruppo === "cliente").map((r) => h("a", { href: r.path, classe: "scheda-nav", "aria-current": r === rotta ? "page" : null }, icona(r.icona, 15), r.titolo)))) : null;
    return h("div", { classe: "app" }, barra, h("div", { classe: "colonna-principale" }, topbar, schede, h("main", { classe: "contenuto", id: "contenuto" }, contenuto)));
  }
  function menuUtente(ctx, azioni) {
    return [
      { testo: "Impostazioni dello studio", icona: "impostazioni", onClick: () => azioni.naviga("#/impostazioni") },
      { testo: "Backup e sicurezza", icona: "scudo", onClick: () => azioni.naviga("#/sicurezza") },
      { testo: azioni.temaScuro() ? "Tema chiaro" : "Tema scuro", icona: azioni.temaScuro() ? "sole" : "luna", onClick: azioni.cambiaTema },
      "sep",
      { testo: "Blocca archivio", icona: "lucchetto", onClick: azioni.blocca },
      { testo: "Elimina archivio e riparti\u2026", icona: "cestino", pericolo: true, onClick: azioni.elimina }
    ];
  }
  function etichettaPrevidenza(c) {
    const t = { "gestione-separata": "Gestione Separata", artigiani: "Artigiani", commercianti: "Commercianti", cassa: "Cassa professionale" };
    return t[c.previdenza.tipo] ?? "";
  }

  // js/ui/viste/sblocco.js
  function schermataSblocco(archivio2, esiste, alSbloccato, { alCreare, alEliminare } = {}) {
    const pw = h("input", { type: "password", autocomplete: esiste ? "current-password" : "new-password", required: true, minlength: esiste ? null : 10, autofocus: true });
    const pw2 = h("input", { type: "password", autocomplete: "new-password", required: true });
    const demo = h("input", { type: "checkbox", checked: true });
    const messaggio = h("div");
    const bottone2 = h("button", { type: "submit", classe: "bottone primario", style: "height:42px" }, esiste ? "Sblocca archivio" : "Crea archivio");
    const form = h(
      "form",
      {
        classe: "pila",
        style: "gap:16px",
        onSubmit: async (e) => {
          e.preventDefault();
          messaggio.replaceChildren();
          if (!esiste && pw.value !== pw2.value) return messaggio.append(avviso("errore", "Le password non coincidono."));
          bottone2.disabled = true;
          bottone2.textContent = "Attendere\u2026";
          try {
            if (esiste) await archivio2.sblocca(pw.value);
            else {
              await archivio2.crea(pw.value);
              await alCreare?.({ conDemo: demo.checked });
            }
            alSbloccato();
          } catch (err) {
            messaggio.append(avviso("errore", err instanceof ErrorePassword ? "Password errata." : `Errore: ${err.message}`));
            bottone2.disabled = false;
            bottone2.textContent = esiste ? "Sblocca archivio" : "Crea archivio";
          }
        }
      },
      campo(esiste ? "Password" : "Scegli una password (almeno 10 caratteri)", pw),
      esiste ? null : campo("Ripeti la password", pw2),
      esiste ? null : h("label", { classe: "spunta" }, demo, h("span", null, "Carica dati di esempio ", h("span", { classe: "muted" }, "(sette clienti inventati, utili per una dimostrazione)"))),
      esiste ? null : avviso("attenzione", "Conserva la password.", "I dati sono cifrati nel browser: se la dimentichi non \xE8 possibile recuperarli."),
      messaggio,
      bottone2
    );
    return h(
      "div",
      { classe: "schermata-sblocco" },
      h(
        "div",
        { classe: "sblocco-vetrina" },
        h("div", { classe: "vetrina-marchio" }, h("div", { classe: "logo" }, icona("bilancia", 16)), "Gestione Forfettario"),
        h(
          "div",
          null,
          h("h1", null, "Il regime forfettario, sotto controllo."),
          h("p", { classe: "lead" }, "Soglie, acconti e scadenze di tutti i clienti dello studio in un\u2019unica vista, con parametri fiscali verificati sulle fonti ufficiali."),
          h(
            "div",
            { classe: "anteprima", "aria-hidden": "true", style: "margin-top:28px" },
            h(
              "div",
              { classe: "anteprima-kpi" },
              h("div", null, h("span", null, "Clienti seguiti"), h("strong", null, "7")),
              h("div", null, h("span", null, "Ricavi incassati"), h("strong", null, "361.780 \u20AC")),
              h("div", null, h("span", null, "Prossima scadenza"), h("strong", null, "16/11"))
            ),
            [["Andrea Sala", 100], ["Paolo Mancini", 95], ["Marta Conti", 64], ["Elena Rizzi", 54]].map(([n, v]) => h("div", { classe: "anteprima-riga" }, h("span", null, n), h("i", null, h("b", { style: `width:${v}%` })), h("span", null, `${v}%`)))
          )
        ),
        h(
          "div",
          { classe: "vetrina-punti" },
          h("span", null, icona("lucchetto", 14), "Cifratura AES-256 nel browser"),
          h("span", null, icona("scudo", 14), "Nessun server, nessun invio di dati"),
          h("span", null, icona("documento", 14), "CSV, XML FatturaPA e PDF")
        )
      ),
      h(
        "div",
        { classe: "sblocco-form" },
        h(
          "div",
          { classe: "scheda" },
          h(
            "div",
            null,
            h("h1", { style: "font-size:22px" }, esiste ? "Bentornato" : "Crea il tuo archivio"),
            h("p", { classe: "muted", style: "margin-top:6px" }, esiste ? "Inserisci la password per aprire i dati dello studio." : "Primo avvio: scegli una password per proteggere i dati dei clienti.")
          ),
          form,
          esiste && alEliminare ? h("div", { classe: "recupero" }, h("span", null, "Password dimenticata? Non \xE8 recuperabile."), h("button", { classe: "link-pericolo", type: "button", onClick: alEliminare }, "Elimina l\u2019archivio e riparti da zero")) : null,
          h("div", null, chip("neutro", "AES-256-GCM", "scudo"), " ", chip("neutro", "PBKDF2 600.000 iterazioni"))
        )
      )
    );
  }

  // js/export/pdf-loader.js
  var LIBRERIE = [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/4.0.0/jspdf.umd.min.js", integrity: "sha384-O5lMb4MDjtn5zz9DSqizqf3JK5ne6jnTbRh523aaJiE4fpejSlmaEaksvdfbbCiC" },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/5.0.7/jspdf.plugin.autotable.min.js", integrity: "sha384-dIbnedacRYRBIEfq+CpuVaJ/+MlG7QkNfYqMqLEdaL2nTsyRxcF6vGZdsnvQpeWR" }
  ];
  function caricaScript({ src, integrity }) {
    return new Promise((ok, ko) => {
      const s = document.createElement("script");
      s.src = src;
      s.integrity = integrity;
      s.crossOrigin = "anonymous";
      s.async = false;
      s.onload = ok;
      s.onerror = () => ko(new Error("Impossibile caricare le librerie PDF: controlla la connessione"));
      document.head.append(s);
    });
  }
  var promessa;
  function caricaPdf() {
    if (!promessa) {
      promessa = (async () => {
        if (!window.jspdf) for (const l of LIBRERIE) await caricaScript(l);
        return window.jspdf.jsPDF;
      })().catch((e) => {
        promessa = null;
        throw e;
      });
    }
    return promessa;
  }

  // js/ui/dominio-ui.js
  var ETICHETTE_GRUPPI = {
    "industrie-alimentari-bevande": "Industrie alimentari e bevande",
    "commercio-ingrosso-dettaglio": "Commercio all\u2019ingrosso e al dettaglio",
    "commercio-ambulante-alimentare": "Commercio ambulante alimentare",
    "commercio-ambulante-altri": "Commercio ambulante di altri prodotti",
    "intermediari-commercio": "Intermediari del commercio",
    "alloggio-ristorazione": "Alloggio e ristorazione",
    "attivita-professionali-sanitarie": "Attivit\xE0 professionali, scientifiche, tecniche, sanitarie",
    "costruzioni-immobiliari": "Costruzioni e attivit\xE0 immobiliari",
    "altre-attivita": "Altre attivit\xE0 economiche"
  };
  var STATI_SOGLIA = {
    ok: ["ok", "Entro la soglia", "spunta"],
    attenzione: ["attenzione", "Vicino alla soglia", "avviso"],
    "esce-anno-successivo": ["attenzione", "Soglia superata", "avviso"],
    "esce-subito": ["errore", "Uscita immediata", "avviso"]
  };
  var chipSoglia = (stato2) => {
    const [t, e, i] = STATI_SOGLIA[stato2];
    return chip(t, e, i);
  };
  var statoMeter = (stato2) => stato2 === "ok" ? "" : stato2 === "attenzione" ? "attenzione" : stato2 === "esce-anno-successivo" ? "attenzione" : "errore";
  var chipAliquota = (r) => chip(r.aliquota.startup ? "primario" : "neutro", `Imposta ${percentuale(r.aliquota.aliquota)}${r.aliquota.startup ? " \xB7 startup" : ""}`);
  function avatar(nome, grande = false) {
    return h("span", { classe: `avatar ${grande ? "grande" : ""}` }, iniziali(nome));
  }
  function testataCliente(ctx, riepilogo, azioni = []) {
    const c = ctx.cliente;
    return h(
      "section",
      { classe: "scheda testata-cliente" },
      avatar(c.nome, true),
      h(
        "div",
        { classe: "testata-info" },
        h("h1", null, c.nome || "(senza nome)"),
        h(
          "div",
          { classe: "chips" },
          c.partitaIva ? chip("neutro", `P.IVA ${c.partitaIva}`) : null,
          chip("neutro", etichettaPrevidenza(c), "scudo"),
          riepilogo ? chipAliquota(riepilogo) : null,
          riepilogo ? chipSoglia(riepilogo.soglie.stato) : null,
          c.demo ? chip("info", "Dati demo") : null
        )
      ),
      azioni.length ? h("div", { classe: "gruppo-azioni no-stampa" }, azioni) : null
    );
  }
  async function esportaPdf(costruisci, nomeFile) {
    try {
      toast("Preparo il PDF\u2026");
      const JsPDF = await caricaPdf();
      const doc = costruisci(JsPDF);
      doc.save(nomeFile);
    } catch (e) {
      toast(`${e.message}. Uso la stampa del browser.`, "errore");
      setTimeout(() => window.print(), 400);
    }
  }
  function voceAgenda(v, { mostraCliente = false, onVersata } = {}) {
    const [anno2, mese, giorno] = v.data.split("-");
    const MESI2 = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
    const scaduta = !v.versata && v.data < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) && v.importo > 0;
    const f24 = v.codiceTributo ? `Erario ${v.codiceTributo} \xB7 ${v.annoRiferimento}` : v.causaleInps ? `INPS ${v.causaleInps}` : v.tipo === "inps" ? "INPS" : "";
    return h(
      "li",
      { classe: `voce-agenda ${v.versata ? "versata" : ""} ${scaduta ? "scaduta" : ""}` },
      h("div", { classe: "data-box" }, h("span", { classe: "giorno" }, giorno), h("span", { classe: "mese" }, `${MESI2[Number(mese) - 1]} ${anno2.slice(2)}`)),
      h(
        "div",
        { style: "min-width:0" },
        h("div", { classe: "titolo-voce", style: "font-weight:600" }, v.descrizione),
        h(
          "div",
          { classe: "muted piccolo", style: "display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:3px" },
          mostraCliente ? h("span", { style: "display:inline-flex;align-items:center;gap:6px;color:var(--ink-2);font-weight:550" }, icona("utente", 13), v.cliente.nome) : null,
          f24 ? h("span", null, f24) : null,
          v.nota ? h("span", null, v.nota) : null
        )
      ),
      h(
        "div",
        { style: "display:flex;align-items:center;gap:12px;justify-content:flex-end;flex-wrap:wrap" },
        v.tipo === "adempimento" ? chip("info", "Adempimento", "calendario") : [
          v.versata ? chip("ok", `Versato il ${dataIt(v.versata)}`, "spunta") : scaduta ? chip("errore", "Scaduta", "avviso") : null,
          h("strong", { classe: "numero", style: "min-width:92px" }, euro(v.importo))
        ],
        onVersata && v.tipo !== "adempimento" && v.importo > 0 ? h("button", { classe: "bottone piccolo", type: "button", onClick: () => onVersata(v) }, v.versata ? "Annulla" : "Segna versato") : null
      )
    );
  }

  // js/ui/viste/studio.js
  function vistaStudio(ctx) {
    const { dati, anno: anno2, oggi } = ctx;
    if (dati.clienti.length === 0) {
      return h(
        "div",
        { classe: "pila" },
        testataPagina("Panoramica studio", `Anno ${anno2}`),
        scheda({}, vuoto({
          icona: "studio",
          titolo: "Ancora nessun cliente",
          testo: "Aggiungi il primo contribuente forfettario, oppure carica dati di esempio per vedere subito come funziona.",
          azioni: [bottone("Nuovo cliente", { variante: "primario", icona: "piu", onClick: ctx.nuovoCliente }), bottone("Carica dati di esempio", { icona: "carica", onClick: ctx.caricaDemo })]
        }))
      );
    }
    const p = panoramicaStudio(dati, anno2, ctx.paramsPer, oggi);
    const futuri = agendaStudio(dati, anno2, ctx.paramsPer, { soloFuture: true, oggi }).filter((v) => v.importo > 0 && !v.versata && v.tipo !== "adempimento");
    const prossima = futuri[0];
    const totaleDaVersare = futuri.reduce((s, v) => s + v.importo, 0);
    const righe = tabella({
      ordinaIniziale: { chiave: "incassi", verso: -1 },
      righe: p.righe,
      colonne: [
        { chiave: "cliente", titolo: "Cliente", ordina: (r) => r.cliente.nome.toLowerCase(), cella: (r) => h("div", { classe: "cella-persona" }, avatar(r.cliente.nome), h("div", null, h("a", { href: "#/riepilogo", style: "color:var(--ink);font-weight:600;text-decoration:none", onClick: () => ctx.selezionaCliente(r.cliente.id) }, r.cliente.nome), h("div", { classe: "sotto" }, etichettaPrevidenza(r.cliente)))) },
        { chiave: "regime", titolo: "Regime", cella: (r) => chipAliquota(r.riepilogo) },
        { chiave: "incassi", titolo: "Incassi", numerica: true, ordina: (r) => r.riepilogo.ricavi, cella: (r) => h("strong", null, euro(r.riepilogo.ricavi)) },
        { chiave: "soglia", titolo: "Soglia 85.000 \u20AC", ordina: (r) => r.riepilogo.soglie.percentuale, cella: (r) => h("div", { style: "min-width:150px" }, meter(r.riepilogo.soglie.percentuale, statoMeter(r.riepilogo.soglie.stato)), h("div", { classe: "sotto", style: "margin-top:4px" }, `${r.riepilogo.soglie.percentuale.toLocaleString("it-IT")}% \xB7 ${r.riepilogo.soglie.residuoSoglia >= 0 ? `residuo ${euroIntero(r.riepilogo.soglie.residuoSoglia)}` : `oltre di ${euroIntero(-r.riepilogo.soglie.residuoSoglia)}`}`)) },
        { chiave: "stato", titolo: "Stato", cella: (r) => chipSoglia(r.riepilogo.soglie.stato) },
        { chiave: "prossima", titolo: "Prossimo versamento", ordina: (r) => r.prossima?.data ?? "9999", cella: (r) => r.prossima ? h("div", null, h("strong", null, dataIt(r.prossima.data)), h("div", { classe: "sotto" }, euro(r.prossima.importo))) : h("span", { classe: "muted" }, "\u2014") }
      ]
    });
    const allarmi = p.daMonitorare;
    return h(
      "div",
      { classe: "pila" },
      testataPagina("Panoramica studio", `Situazione al ${dataIt(oggi)} \xB7 anno ${anno2}`, [bottone("Agenda scadenze", { icona: "calendario", onClick: () => ctx.naviga("#/agenda") }), bottone("Nuovo cliente", { variante: "primario", icona: "piu", onClick: ctx.nuovoCliente })]),
      h(
        "div",
        { classe: "tiles" },
        tile("Clienti seguiti", String(dati.clienti.length), { icona: "utenti", nota: `${dati.clienti.filter((c) => c.previdenza.tipo === "gestione-separata").length} in Gestione Separata` }),
        tile(`Ricavi incassati ${anno2}`, euroIntero(p.totaleRicavi), { icona: "grafico", nota: "Somma dei clienti, criterio di cassa" }),
        tile("Da monitorare", String(allarmi.length), { icona: "bandiera", nota: allarmi.length ? allarmi.map((a) => a.cliente.nome.split(" ")[0]).join(", ") : "Nessuno vicino alla soglia" }),
        tile("Prossimo versamento", prossima ? dataIt(prossima.data) : "\u2014", { icona: "calendario", nota: prossima ? `${prossima.cliente.nome} \xB7 ${euro(prossima.importo)}` : "Nessuna scadenza futura", evidenza: true })
      ),
      scheda({ titolo: "Clienti", sottotitolo: "Incassi dell\u2019anno e utilizzo della soglia", senzaPadding: true }, righe),
      h(
        "div",
        { classe: "griglia-2" },
        h(
          "div",
          { classe: "pila" },
          scheda(
            {
              titolo: "Prossime scadenze",
              sottotitolo: `${euro(totaleDaVersare)} ancora da versare nel ${anno2}`,
              senzaPadding: true,
              azioni: [bottone("Vedi tutte", { variante: "ghost", piccolo: true, onClick: () => ctx.naviga("#/agenda") })]
            },
            futuri.length ? h("ul", { classe: "timeline" }, futuri.slice(0, 5).map((v) => voceAgenda(v, { mostraCliente: true }))) : vuoto({ icona: "spunta", titolo: "Tutto versato", testo: "Nessuna scadenza in sospeso." })
          ),
          allarmi.length ? scheda({ titolo: "Attenzione alle soglie", senzaPadding: true }, h("ul", { classe: "timeline" }, allarmi.map((a) => h(
            "li",
            { classe: "riga-avviso" },
            avatar(a.cliente.nome),
            h("div", { classe: "testo" }, h("strong", null, a.cliente.nome), h("div", { classe: "muted piccolo" }, a.riepilogo.soglie.stato === "attenzione" ? `Residuo ${euroIntero(a.riepilogo.soglie.residuoSoglia)} prima degli 85.000 \u20AC` : a.riepilogo.soglie.stato === "esce-subito" ? "Oltre 100.000 \u20AC: uscita immediata dal regime" : "Oltre 85.000 \u20AC: uscita dal regime dall\u2019anno successivo")),
            chipSoglia(a.riepilogo.soglie.stato)
          )))) : null
        ),
        scheda({ titolo: "Distribuzione degli incassi", sottotitolo: `Ricavi ${anno2} per cliente` }, h("div", { classe: "pila", style: "gap:12px" }, p.righe.slice().sort((x, y) => y.riepilogo.ricavi - x.riepilogo.ricavi).map((r) => h("div", { style: "display:grid;grid-template-columns:120px 1fr 92px;gap:10px;align-items:center;font-size:13px" }, h("span", { style: "overflow:hidden;text-overflow:ellipsis;white-space:nowrap" }, r.cliente.nome), meter(p.totaleRicavi ? r.riepilogo.ricavi / Math.max(...p.righe.map((q) => q.riepilogo.ricavi), 1) * 100 : 0), h("strong", { classe: "numero" }, euroIntero(r.riepilogo.ricavi))))))
      )
    );
  }

  // js/ui/viste/clienti.js
  function vistaClienti(ctx) {
    const { dati, anno: anno2, archivio: archivio2 } = ctx;
    const q = (ctx.stato.cercaClienti ?? "").toLowerCase();
    const elenco = dati.clienti.filter((c) => !q || `${c.nome} ${c.partitaIva} ${c.note}`.toLowerCase().includes(q));
    const eliminaCliente = async (c) => {
      const ok = await ctx.conferma({ titolo: `Eliminare ${c.nome || "il cliente"}?`, testo: "Verranno eliminate anche tutte le sue fatture e spese. L\u2019operazione non \xE8 reversibile: esporta prima un backup se serve.", etichetta: "Elimina cliente", pericolo: true });
      if (!ok) return;
      await archivio2.modifica((d) => {
        d.clienti = d.clienti.filter((x) => x.id !== c.id);
        d.fatture = d.fatture.filter((x) => x.clienteId !== c.id);
        d.spese = d.spese.filter((x) => x.clienteId !== c.id);
        if (d.ui.clienteId === c.id) d.ui.clienteId = d.clienti[0]?.id ?? null;
      });
      ctx.toast("Cliente eliminato.");
    };
    const tab = tabella({
      ordinaIniziale: { chiave: "nome", verso: 1 },
      righe: elenco,
      colonne: [
        { chiave: "nome", titolo: "Cliente", ordina: (c) => c.nome.toLowerCase(), cella: (c) => h("div", { classe: "cella-persona" }, avatar(c.nome), h("div", null, h("a", { href: "#/riepilogo", style: "color:var(--ink);font-weight:600;text-decoration:none", onClick: () => ctx.selezionaCliente(c.id) }, c.nome || "(senza nome)"), h("div", { classe: "sotto" }, c.note || (c.partitaIva ? `P.IVA ${c.partitaIva}` : "")))) },
        { chiave: "prev", titolo: "Previdenza", cella: (c) => chip("neutro", etichettaPrevidenza(c)) },
        { chiave: "ricavi", titolo: `Incassi ${anno2}`, numerica: true, ordina: (c) => ctx.riepilogo(c).ricavi, cella: (c) => h("strong", null, euro(ctx.riepilogo(c).ricavi)) },
        { chiave: "soglia", titolo: "Soglia", ordina: (c) => ctx.riepilogo(c).soglie.percentuale, cella: (c) => {
          const r = ctx.riepilogo(c);
          return h("div", { style: "min-width:130px" }, meter(r.soglie.percentuale, statoMeter(r.soglie.stato)), h("div", { classe: "sotto", style: "margin-top:4px" }, `${r.soglie.percentuale.toLocaleString("it-IT")}%`));
        } },
        { chiave: "stato", titolo: "Stato", cella: (c) => chipSoglia(ctx.riepilogo(c).soglie.stato) },
        { chiave: "az", titolo: "", cella: (c) => h(
          "div",
          { classe: "azioni-riga" },
          bottone("Apri", { piccolo: true, onClick: () => ctx.selezionaCliente(c.id, "#/riepilogo") }),
          h("button", { classe: "bottone ghost icona-sola piccolo", type: "button", "aria-label": `Altre azioni per ${c.nome}`, onClick: (e) => apriMenu(e.currentTarget, [
            { testo: "Modifica anagrafica", icona: "modifica", onClick: () => ctx.selezionaCliente(c.id, "#/anagrafica") },
            { testo: "Vedi fatture", icona: "documento", onClick: () => ctx.selezionaCliente(c.id, "#/fatture") },
            "sep",
            { testo: "Elimina cliente", icona: "cestino", pericolo: true, onClick: () => eliminaCliente(c) }
          ]) }, icona("altro", 18))
        ) }
      ]
    });
    const cerca = h("div", { classe: "cerca" }, icona("cerca", 16), h("input", {
      classe: "input",
      type: "search",
      placeholder: "Cerca per nome, P.IVA o note\u2026",
      "aria-label": "Cerca clienti",
      valore: ctx.stato.cercaClienti ?? "",
      onInput: (e) => {
        ctx.stato.cercaClienti = e.target.value;
        const pos = e.target.selectionStart;
        ctx.aggiorna();
        const n = document.querySelector(".strumenti input");
        n?.focus();
        n?.setSelectionRange(pos, pos);
      }
    }));
    return h(
      "div",
      { classe: "pila" },
      testataPagina("Clienti", `${dati.clienti.length} contribuenti nello studio`, [bottone("Nuovo cliente", { variante: "primario", icona: "piu", onClick: ctx.nuovoCliente })]),
      scheda(
        { senzaPadding: true },
        dati.clienti.length === 0 ? vuoto({ icona: "utenti", titolo: "Nessun cliente", testo: "Crea il primo cliente per iniziare a registrare fatture e calcolare imposte e contributi.", azioni: [bottone("Nuovo cliente", { variante: "primario", icona: "piu", onClick: ctx.nuovoCliente }), bottone("Carica dati di esempio", { icona: "carica", onClick: ctx.caricaDemo })] }) : [h("div", { classe: "strumenti" }, cerca), elenco.length ? tab : vuoto({ icona: "cerca", titolo: "Nessun risultato", testo: "Prova con un altro termine di ricerca." })]
      )
    );
  }

  // js/export/pdf.js
  var MARGINE = 18;
  var COLORI = { primario: [11, 95, 88], testo: [15, 23, 34], tenue: [99, 112, 134], linea: [227, 231, 238], wash: [229, 244, 241], errore: [180, 35, 24] };
  var eur2 = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", useGrouping: "always" });
  var eurPdf = (n) => eur2.format(n ?? 0).replace(/ /g, " ");
  var dataIt2 = (iso3) => iso3 ? iso3.split("-").reverse().join("/") : "";
  var pct = (n) => `${(n * 100).toLocaleString("it-IT", { maximumFractionDigits: 2 })}%`;
  function nuovoDocumento(JsPDF, { studio = {}, titolo, sottotitolo, righeMeta = [] }) {
    const doc = new JsPDF({ unit: "mm", format: "a4" });
    doc.setProperties({ title: titolo, subject: sottotitolo ?? "", creator: "Gestione Forfettario" });
    const larghezza = doc.internal.pageSize.getWidth();
    doc.setFont("helvetica", "bold").setFontSize(15).setTextColor(...COLORI.primario);
    doc.text((studio.nome || "Studio").toUpperCase(), MARGINE, 20, { charSpace: 0.4 });
    doc.setFont("helvetica", "normal").setFontSize(8.5).setTextColor(...COLORI.tenue);
    if (studio.descrizione) doc.text(studio.descrizione, MARGINE, 25);
    const contatti = [studio.indirizzo, [studio.telefono, studio.email].filter(Boolean).join(" \xB7 "), studio.pec ? `PEC ${studio.pec}` : "", studio.partitaIva ? `P.IVA ${studio.partitaIva}` : ""].filter(Boolean);
    contatti.forEach((riga, i) => doc.text(riga, larghezza - MARGINE, 18 + i * 4, { align: "right" }));
    doc.setDrawColor(...COLORI.primario).setLineWidth(0.6).line(MARGINE, 31, larghezza - MARGINE, 31);
    doc.setDrawColor(...COLORI.wash).setLineWidth(1.4).line(MARGINE, 32.2, larghezza - MARGINE, 32.2);
    doc.setFont("helvetica", "bold").setFontSize(18).setTextColor(...COLORI.testo);
    doc.text(titolo, MARGINE, 45);
    let y = 45;
    if (sottotitolo) {
      doc.setFont("helvetica", "normal").setFontSize(10.5).setTextColor(...COLORI.tenue);
      y += 6;
      doc.text(sottotitolo, MARGINE, y);
    }
    righeMeta.forEach(([k, v]) => {
      y += 5;
      doc.setFontSize(9).setTextColor(...COLORI.tenue).text(`${k}: `, MARGINE, y);
      doc.setTextColor(...COLORI.testo).text(String(v), MARGINE + doc.getTextWidth(`${k}: `) + 0.5, y);
    });
    doc.__y = y + 8;
    return doc;
  }
  function titoloSezione(doc, testo2) {
    const y = doc.__y;
    doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(...COLORI.testo).text(testo2, MARGINE, y);
    doc.__y = y + 3;
  }
  function tabella2(doc, { head, body, foot, colonneNumeriche = [], larghezze = {}, enfasiUltimaRiga = false }) {
    const stileNum = Object.fromEntries(colonneNumeriche.map((i) => [i, { halign: "right" }]));
    const stiliLarghezza = Object.fromEntries(Object.entries(larghezze).map(([i, w2]) => [i, { cellWidth: w2 }]));
    const colonne = {};
    for (const k of /* @__PURE__ */ new Set([...Object.keys(stileNum), ...Object.keys(stiliLarghezza)])) colonne[k] = { ...stileNum[k], ...stiliLarghezza[k] };
    doc.autoTable({
      startY: doc.__y,
      head: head ? [head] : void 0,
      body,
      foot: foot ? [foot] : void 0,
      margin: { left: MARGINE, right: MARGINE, bottom: 22 },
      theme: "plain",
      styles: { font: "helvetica", fontSize: 9, textColor: COLORI.testo, cellPadding: { top: 2.4, bottom: 2.4, left: 2.5, right: 2.5 }, lineColor: COLORI.linea, lineWidth: { bottom: 0.2 }, overflow: "linebreak" },
      headStyles: { fillColor: COLORI.wash, textColor: COLORI.primario, fontStyle: "bold", fontSize: 8, lineWidth: 0 },
      footStyles: { fillColor: [255, 255, 255], textColor: COLORI.testo, fontStyle: "bold", lineWidth: { top: 0.5 }, lineColor: COLORI.primario },
      columnStyles: colonne,
      didParseCell: (d) => {
        if (enfasiUltimaRiga && d.section === "body" && d.row.index === body.length - 1) d.cell.styles.fontStyle = "bold";
        if (d.section !== "body" && colonneNumeriche.includes(d.column.index)) d.cell.styles.halign = "right";
      }
    });
    doc.__y = doc.lastAutoTable.finalY + 8;
  }
  function nota(doc, testo2) {
    const larghezza = doc.internal.pageSize.getWidth() - MARGINE * 2;
    doc.setFont("helvetica", "normal").setFontSize(8.5).setTextColor(...COLORI.tenue);
    const righe = doc.splitTextToSize(testo2, larghezza);
    doc.text(righe, MARGINE, doc.__y);
    doc.__y += righe.length * 3.8 + 3;
  }
  function chiudi(doc, studio) {
    const pagine = doc.getNumberOfPages();
    const w2 = doc.internal.pageSize.getWidth(), h2 = doc.internal.pageSize.getHeight();
    for (let i = 1; i <= pagine; i++) {
      doc.setPage(i);
      doc.setDrawColor(...COLORI.linea).setLineWidth(0.2).line(MARGINE, h2 - 16, w2 - MARGINE, h2 - 16);
      doc.setFont("helvetica", "normal").setFontSize(7.5).setTextColor(...COLORI.tenue);
      doc.text("Prospetto di stima a fini di pianificazione: non sostituisce la dichiarazione dei redditi n\xE9 la consulenza professionale.", MARGINE, h2 - 11);
      doc.text(`${studio?.nome ?? "Gestione Forfettario"} \xB7 generato il ${(/* @__PURE__ */ new Date()).toLocaleDateString("it-IT")}`, MARGINE, h2 - 7);
      doc.text(`Pagina ${i} di ${pagine}`, w2 - MARGINE, h2 - 7, { align: "right" });
    }
    return doc;
  }
  function pdfSimulazione(JsPDF, { conf, cliente, anno: anno2, studio, ipotesi }) {
    const f = conf.forfettario, o = conf.ordinario;
    const doc = nuovoDocumento(JsPDF, { studio, titolo: "Confronto forfettario e ordinario", sottotitolo: `${cliente.nome} \xB7 anno d'imposta ${anno2}`, righeMeta: [["Gestione previdenziale", ipotesi.previdenza]] });
    titoloSezione(doc, "Esito");
    const migliore = conf.conveniente === "pari" ? "I due regimi risultano equivalenti." : `Il regime ${conf.conveniente === "forfettario" ? "forfettario" : "ordinario"} lascia un netto superiore di ${eurPdf(Math.abs(conf.differenza))}.`;
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...COLORI.testo).text(migliore, MARGINE, doc.__y + 3);
    doc.__y += 10;
    titoloSezione(doc, "Confronto");
    tabella2(doc, {
      head: ["Voce", "Forfettario", "Ordinario"],
      body: [
        ["Ricavi", eurPdf(f.ricavi), eurPdf(o.ricavi)],
        ["Costi reali sostenuti", eurPdf(o.costi), eurPdf(o.costi)],
        ["Reddito", eurPdf(f.redditoLordo), eurPdf(o.redditoProfessionale)],
        ["Contributi previdenziali", eurPdf(f.contributi.totale), eurPdf(o.contributi.totale)],
        ["Imponibile fiscale", eurPdf(f.imponibile), eurPdf(o.imponibile)],
        [`Imposta (${pct(f.aliquota)} sostitutiva / IRPEF netta)`, eurPdf(f.imposta), eurPdf(o.irpef)],
        ["Detrazione lavoro autonomo (art. 13 c. 5 TUIR)", "\u2014", eurPdf(o.detrazioneAutonomi)],
        ["Addizionali regionale e comunale", "\u2014", eurPdf(o.addizionali)],
        ["IRAP", "\u2014", eurPdf(o.irap)],
        ["Totale imposte e contributi", eurPdf(f.totaleCarico), eurPdf(o.totaleCarico)],
        ["Netto disponibile", eurPdf(f.netto), eurPdf(o.netto)]
      ],
      colonneNumeriche: [1, 2],
      larghezze: { 0: 90 },
      enfasiUltimaRiga: true
    });
    titoloSezione(doc, "Ipotesi di calcolo");
    tabella2(doc, { body: ipotesi.righe, larghezze: { 0: 90 }, colonneNumeriche: [1] });
    nota(doc, "Semplificazioni: nel regime ordinario l'IVA \xE8 considerata neutra; ammortamenti e altre spese sono compresi nei costi inseriti; non sono modellate altre deduzioni oltre ai contributi n\xE9 i limiti IRAP per i professionisti.");
    return chiudi(doc, studio);
  }
  function pdfScadenzario(JsPDF, { voci, cliente, anno: anno2, studio, stime }) {
    const doc = nuovoDocumento(JsPDF, { studio, titolo: `Scadenzario versamenti ${anno2}`, sottotitolo: `${cliente.nome}${cliente.partitaIva ? ` \xB7 P.IVA ${cliente.partitaIva}` : ""}`, righeMeta: [["Saldo e acconti", `anno d'imposta ${anno2 - 1} e ${anno2}`]] });
    const f24 = (v) => v.codiceTributo ? `Erario ${v.codiceTributo} / ${v.annoRiferimento}` : v.causaleInps ? `INPS ${v.causaleInps}` : v.tipo === "inps" ? "INPS" : "";
    const totale = voci.filter((v) => v.tipo !== "adempimento" && !v.versata).reduce((s, v) => s + v.importo, 0);
    titoloSezione(doc, "Versamenti");
    tabella2(doc, {
      head: ["Scadenza", "Versamento", "F24", "Importo", "Stato"],
      body: voci.map((v) => [v.data ? dataIt2(v.data) : "\u2014", v.nota ? `${v.descrizione}
${v.nota}` : v.descrizione, f24(v), v.tipo === "adempimento" ? "" : eurPdf(v.importo), v.versata ? `Versato il ${dataIt2(v.versata)}` : ""]),
      foot: ["", "Totale da versare", "", eurPdf(totale), ""],
      colonneNumeriche: [3],
      larghezze: { 0: 22, 2: 30, 3: 26, 4: 28 }
    });
    if (stime) {
      titoloSezione(doc, `Base di calcolo (anno ${anno2 - 1})`);
      tabella2(doc, { body: [
        ["Imposta sostitutiva dovuta", eurPdf(stime.imposta)],
        ["Acconti imposta gi\xE0 versati", eurPdf(stime.accSost)],
        ["Contributi INPS dovuti", eurPdf(stime.contributi)],
        ["Acconti INPS gi\xE0 versati", eurPdf(stime.accInps)]
      ], larghezze: { 0: 90 }, colonneNumeriche: [1] });
    }
    nota(doc, "Importi stimati sui dati registrati. Per artigiani e commercianti gli importi ufficiali sono nel Cassetto previdenziale INPS. I versamenti scaduti e non registrati come versati vanno regolarizzati con ravvedimento operoso.");
    return chiudi(doc, studio);
  }
  function pdfRiepilogo(JsPDF, { riepilogo: r, cliente, anno: anno2, studio, mensili }) {
    const doc = nuovoDocumento(JsPDF, { studio, titolo: `Riepilogo ${anno2}`, sottotitolo: `${cliente.nome}${cliente.partitaIva ? ` \xB7 P.IVA ${cliente.partitaIva}` : ""}`, righeMeta: [["Aliquota imposta sostitutiva", `${pct(r.aliquota.aliquota)}${r.aliquota.startup ? " (startup)" : ""}`]] });
    titoloSezione(doc, "Ricavi e soglia");
    tabella2(doc, { body: [
      ["Ricavi incassati nell'anno (criterio di cassa)", eurPdf(r.ricavi)],
      ["Fatturato da incassare", eurPdf(r.daIncassare)],
      ["Spese registrate", eurPdf(r.spese)],
      ["Utilizzo della soglia di 85.000 \u20AC", `${r.soglie.percentuale.toLocaleString("it-IT")}% \u2014 residuo ${eurPdf(r.soglie.residuoSoglia)}`]
    ], larghezze: { 0: 100 }, colonneNumeriche: [1] });
    titoloSezione(doc, "Ricavi per codice ATECO");
    tabella2(doc, {
      head: ["Attivit\xE0", "Coeff.", "Ricavi", "Reddito forfettario"],
      body: r.perAteco.map((v) => [`${v.codice} ${v.descrizione}`.trim(), v.coefficiente ? pct(v.coefficiente) : "\u2014", eurPdf(v.importo), eurPdf(v.importo * v.coefficiente)]),
      colonneNumeriche: [1, 2, 3],
      larghezze: { 1: 18 }
    });
    if (mensili) {
      titoloSezione(doc, "Incassi mensili");
      const mesi = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
      tabella2(doc, { head: mesi, body: [mensili.map((v) => eurPdf(v).replace(",00", ""))], colonneNumeriche: mesi.map((_, i) => i), styles: void 0 });
    }
    if (r.forfettario) {
      const f = r.forfettario;
      titoloSezione(doc, "Stima imposta e contributi (regime forfettario)");
      tabella2(doc, { body: [
        ["Reddito forfettario lordo", eurPdf(f.redditoLordo)],
        [`Contributi previdenziali dedotti (${r.deduzione.metodo === "registrati" ? "versati" : r.deduzione.metodo === "stima" ? "stima per cassa" : "di competenza"})`, eurPdf(f.contributiDeducibili)],
        ["Reddito imponibile", eurPdf(f.imponibile)],
        [`Imposta sostitutiva al ${pct(f.aliquota)}`, eurPdf(f.imposta)],
        ["Contributi previdenziali di competenza", eurPdf(f.contributi.totale)],
        ["Totale imposta e contributi", eurPdf(f.totaleCarico)]
      ], larghezze: { 0: 110 }, colonneNumeriche: [1], enfasiUltimaRiga: true });
    }
    return chiudi(doc, studio);
  }
  function pdfAgenda(JsPDF, { voci, anno: anno2, studio }) {
    const doc = nuovoDocumento(JsPDF, { studio, titolo: `Agenda versamenti ${anno2}`, sottotitolo: "Tutti i clienti dello studio", righeMeta: [["Versamenti", String(voci.filter((v) => v.importo > 0).length)]] });
    tabella2(doc, {
      head: ["Scadenza", "Cliente", "Versamento", "F24", "Importo"],
      body: voci.map((v) => [dataIt2(v.data), v.cliente.nome, v.descrizione, v.codiceTributo ? `Erario ${v.codiceTributo}` : v.causaleInps ? `INPS ${v.causaleInps}` : "", v.tipo === "adempimento" ? "" : eurPdf(v.importo)]),
      colonneNumeriche: [4],
      larghezze: { 0: 22, 1: 34, 3: 24, 4: 26 }
    });
    return chiudi(doc, studio);
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
  var dataIt3 = (iso3) => iso3 ? iso3.split("-").reverse().join("/") : "";
  function csvFatture(fatture) {
    return generaCsv(
      ["Numero", "Data", "Controparte", "Importo", "Data incasso", "Bollo", "ATECO"],
      fatture.map((f) => [f.numero, dataIt3(f.data), f.controparte, f.importo, dataIt3(f.dataIncasso), f.bollo || 0, f.atecoCodice])
    );
  }
  function csvScadenzario(voci) {
    return generaCsv(
      ["Scadenza", "Descrizione", "Importo", "Codice F24 (tributo o causale INPS)", "Anno di riferimento", "Note"],
      voci.map((v) => [dataIt3(v.data), v.descrizione, v.importo, v.codiceTributo ?? (v.causaleInps ? `INPS ${v.causaleInps}` : ""), v.annoRiferimento ?? "", v.nota ?? ""])
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
      ["di cui detrazione lavoro autonomo", 0, o.detrazioneAutonomi],
      ["Addizionali", 0, o.addizionali],
      ["IRAP", 0, o.irap],
      ["Totale imposte e contributi", f.totaleCarico, o.totaleCarico],
      ["Netto disponibile", f.netto, o.netto]
    ]);
  }
  function csvAgenda(voci) {
    return generaCsv(
      ["Scadenza", "Cliente", "Versamento", "Importo", "Codice F24", "Stato"],
      voci.map((v) => [dataIt3(v.data), v.cliente.nome, v.descrizione, v.importo, v.codiceTributo ?? (v.causaleInps ? `INPS ${v.causaleInps}` : ""), v.versata ? `Versato il ${dataIt3(v.versata)}` : ""])
    );
  }

  // js/ui/viste/agenda.js
  function vistaAgenda(ctx) {
    const { dati, anno: anno2, oggi, archivio: archivio2 } = ctx;
    const filtro = ctx.stato.filtroAgenda ?? "da-versare";
    const tutte = agendaStudio(dati, anno2, ctx.paramsPer, { oggi });
    const conImporto = tutte.filter((v) => v.tipo === "adempimento" || v.importo > 0);
    const filtrate = conImporto.filter((v) => {
      if (filtro === "da-versare") return !v.versata && v.data >= oggi;
      if (filtro === "scadute") return !v.versata && v.data < oggi && v.tipo !== "adempimento";
      if (filtro === "versate") return Boolean(v.versata);
      return true;
    });
    const conteggi = {
      "da-versare": conImporto.filter((v) => !v.versata && v.data >= oggi).length,
      scadute: conImporto.filter((v) => !v.versata && v.data < oggi && v.tipo !== "adempimento").length,
      versate: conImporto.filter((v) => v.versata).length,
      tutte: conImporto.length
    };
    const importoDa = conImporto.filter((v) => !v.versata && v.data >= oggi && v.tipo !== "adempimento").reduce((s, v) => s + v.importo, 0);
    const importoScaduto = conImporto.filter((v) => !v.versata && v.data < oggi && v.tipo !== "adempimento").reduce((s, v) => s + v.importo, 0);
    const segna = async (v) => {
      await archivio2.modifica((d) => {
        const c = d.clienti.find((x) => x.id === v.cliente.id);
        const chiave = `${anno2}:${v.id}`;
        c.pagati ?? (c.pagati = {});
        if (c.pagati[chiave]) delete c.pagati[chiave];
        else c.pagati[chiave] = oggi;
      });
    };
    const gruppi = /* @__PURE__ */ new Map();
    for (const v of filtrate) {
      const k = v.data.slice(0, 7);
      (gruppi.get(k) ?? gruppi.set(k, []).get(k)).push(v);
    }
    const seg = (chiave, etichetta) => h("button", { type: "button", "aria-pressed": String(filtro === chiave), onClick: () => {
      ctx.stato.filtroAgenda = chiave;
      ctx.aggiorna();
    } }, `${etichetta} ${conteggi[chiave]}`);
    return h(
      "div",
      { classe: "pila" },
      testataPagina("Agenda scadenze", `Versamenti ${anno2} di tutti i clienti`, [
        bottone("CSV", { icona: "scarica", onClick: () => scarica(`agenda-${anno2}.csv`, csvAgenda(filtrate), "text/csv;charset=utf-8") }),
        bottone("PDF", { variante: "primario", icona: "pdf", onClick: () => esportaPdf((J) => pdfAgenda(J, { voci: filtrate, anno: anno2, studio: ctx.studio }), `agenda-versamenti-${anno2}.pdf`) })
      ]),
      h(
        "div",
        { classe: "tiles" },
        tile("Da versare", euro(importoDa), { nota: `${conteggi["da-versare"]} versamenti futuri`, icona: "calendario" }),
        tile("Scaduti non versati", euro(importoScaduto), { nota: conteggi.scadute ? "Valuta il ravvedimento operoso" : "Nessuno", icona: "avviso" }),
        tile("Gi\xE0 versati", String(conteggi.versate), { nota: "Segnati come versati", icona: "spunta" })
      ),
      scheda(
        { senzaPadding: true },
        h("div", { classe: "strumenti" }, h("div", { classe: "segmenti", role: "group", "aria-label": "Filtra le scadenze" }, seg("da-versare", "Da versare"), seg("scadute", "Scadute"), seg("versate", "Versate"), seg("tutte", "Tutte"))),
        filtrate.length === 0 ? vuoto({ icona: "calendario", titolo: "Nessuna scadenza", testo: "Non ci sono versamenti per questo filtro." }) : [...gruppi.entries()].map(([k, voci]) => h("div", null, h("div", { classe: "intestazione-mese" }, `${MESI_LUNGHI[Number(k.slice(5)) - 1]} ${k.slice(0, 4)}`), h("ul", { classe: "timeline" }, voci.map((v) => voceAgenda(v, { mostraCliente: true, onVersata: segna })))))
      )
    );
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
  var L = 560;
  var A = 260;
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
  function tabella3(intestazioni, righe) {
    return h(
      "details",
      { classe: "vista-tabella" },
      h("summary", null, "Mostra come tabella"),
      h("div", { classe: "tabella-contenitore" }, h(
        "table",
        { classe: "tabella" },
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
      const riga = () => [h("div", { classe: "tip-valore" }, formato(v)), h("div", { classe: "tip-etichetta" }, categorie[i])];
      const attiva = (e) => {
        colonna.classList.add("attiva");
        const b = e.target.getBoundingClientRect();
        mostra(e.clientX || b.left + b.width / 2, e.clientY || b.top, riga());
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
    figura.append(tabella3(["Periodo", "Valore"], categorie.map((c, i) => [c, formato(valori[i])])));
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
    figura.append(tabella3([titoloX || "x", ...serie.map((s) => s.nome)], x.map((v, i) => [formatoX(v), ...serie.map((s) => formatoY(s.valori[i]))])));
    return figura;
  }

  // js/ui/viste/riepilogo.js
  var MESSAGGI_SOGLIA = {
    ok: ["ok", "Entro la soglia.", "Puoi continuare a incassare senza limiti immediati."],
    attenzione: ["attenzione", "Ci si avvicina agli 85.000 \u20AC.", "Valuta con attenzione i prossimi incassi."],
    "esce-anno-successivo": ["attenzione", "Superati 85.000 \u20AC.", "Il regime forfettario cessa dall\u2019anno successivo."],
    "esce-subito": ["errore", "Superati 100.000 \u20AC.", "Uscita immediata dal regime: l\u2019IVA \xE8 dovuta dalle operazioni che hanno comportato il superamento."]
  };
  function vistaRiepilogo(ctx) {
    const { dati, cliente: c, anno: anno2, params, esatto, annoUsato, archivio: archivio2 } = ctx;
    const r = ctx.riepilogo();
    const mensili = incassiMensili(dati.fatture, c.id, anno2);
    const [tipo, titolo, testo2] = MESSAGGI_SOGLIA[r.soglie.stato];
    const f = r.forfettario;
    const prossime = scadenzarioCliente(c, dati, anno2, ctx.paramsPer).voci.filter((v) => v.importo > 0 && v.tipo !== "adempimento" && !v.versata && v.data >= ctx.oggi).slice(0, 4);
    const modificaDeduzione = () => {
      const inp = h("input", { type: "number", step: "0.01", min: "0", valore: r.deduzione.metodo === "registrati" ? r.deduzione.importo : "", placeholder: r.deduzione.importo.toFixed(2) });
      const dlg = apriDialogo({
        titolo: "Contributi versati nell\u2019anno",
        corpo: h(
          "div",
          { classe: "pila", style: "gap:14px" },
          h("p", { classe: "muted" }, `I contributi previdenziali si deducono dal reddito forfettario nell\u2019anno in cui sono versati (art. 1 c. 64 L. 190/2014). Senza dati registrati l\u2019app li stima con i contributi di competenza del ${anno2 - 1}.`),
          campo(`Contributi INPS versati nel ${anno2} (\u20AC)`, inp, "Saldo dell\u2019anno precedente pi\xF9 acconti dell\u2019anno. Lascia vuoto per tornare alla stima.")
        ),
        azioni: [
          bottone("Annulla", { onClick: () => dlg.chiudi() }),
          bottone("Salva", { variante: "primario", onClick: async () => {
            const valore = inp.value === "" ? null : Number(inp.value);
            await archivio2.modifica((d) => {
              const cl = d.clienti.find((x) => x.id === c.id);
              cl.versamenti ?? (cl.versamenti = {});
              cl.versamenti[anno2] = { ...cl.versamenti[anno2] };
              if (valore === null) delete cl.versamenti[anno2].contributiVersatiAnno;
              else cl.versamenti[anno2].contributiVersatiAnno = valore;
            });
            dlg.chiudi();
            ctx.toast("Contributi aggiornati.");
          } })
        ]
      });
    };
    const barra = h("div", null, meter(Math.min(100, r.soglie.percentuale), statoMeter(r.soglie.stato), true));
    const etichettaMetodo = { registrati: "versati nell\u2019anno (registrati)", stima: "stima per cassa", competenza: "di competenza" }[r.deduzione.metodo];
    return h(
      "div",
      { classe: "pila" },
      testataCliente(ctx, r, [
        bottone("PDF", { icona: "pdf", onClick: () => esportaPdf((J) => pdfRiepilogo(J, { riepilogo: r, cliente: c, anno: anno2, studio: ctx.studio, mensili }), `riepilogo-${anno2}-${c.nome.replace(/\W+/g, "-")}.pdf`) }),
        bottone("Stampa", { icona: "stampa", onClick: () => window.print() })
      ]),
      esatto ? null : avviso("attenzione", "Parametri non disponibili per questo anno.", `La stima usa i parametri ${annoUsato}.`),
      h(
        "div",
        { classe: "tiles" },
        tile(`Ricavi incassati ${anno2}`, euro(r.ricavi), { evidenza: true, icona: "grafico", nota: "Criterio di cassa" }),
        tile("Fatturato da incassare", euro(r.daIncassare), { icona: "orologio", nota: "Fatture senza data di incasso" }),
        tile("Spese registrate", euro(r.spese), { icona: "ricevuta", nota: "Non deducibili nel forfettario" }),
        tile("Aliquota sostitutiva", percentuale(r.aliquota.aliquota), { icona: "scudo", nota: r.aliquota.startup ? `Startup fino al ${r.aliquota.annoUltimoStartup}` : "Aliquota ordinaria" })
      ),
      h(
        "div",
        { classe: "griglia-2-1" },
        h(
          "div",
          { classe: "pila" },
          scheda(
            { titolo: "Soglia di ricavi", sottotitolo: "85.000 \u20AC per restare nel regime, 100.000 \u20AC per l\u2019uscita immediata" },
            h(
              "div",
              { classe: "pila", style: "gap:12px" },
              barra,
              h("div", { classe: "riga-flex", style: "justify-content:space-between" }, h("strong", null, euro(r.ricavi)), h("span", { classe: "muted" }, `${r.soglie.percentuale.toLocaleString("it-IT")}% di 85.000 \u20AC \xB7 residuo ${euro(r.soglie.residuoSoglia)}`)),
              avviso(tipo, titolo, testo2)
            )
          ),
          h(
            "div",
            { classe: "griglia-2" },
            scheda({}, graficoColonne({ titolo: `Incassi mensili ${anno2}`, descrizione: "Ricavi incassati per mese", categorie: MESI, valori: mensili })),
            scheda({}, graficoLinee({ titolo: `Ricavi cumulati ${anno2}`, descrizione: "Andamento rispetto alla soglia", x: MESI.map((_, i) => i + 1), formatoX: (v) => MESI[Math.round(v) - 1] ?? "", serie: [{ nome: "Ricavi cumulati", valori: cumulato(mensili), colore: "--serie-1" }], riferimentoY: { valore: params.forfettario.soglie.ricaviEsclusione, etichetta: "Soglia 85.000 \u20AC" } }))
          ),
          scheda(
            { titolo: "Ricavi per codice ATECO", senzaPadding: true },
            tabella({ righe: r.perAteco, colonne: [
              { chiave: "a", titolo: "Attivit\xE0", cella: (v) => h("div", null, h("strong", null, v.codice || "\u2014"), h("div", { classe: "sotto" }, v.descrizione)) },
              { chiave: "k", titolo: "Coefficiente", numerica: true, cella: (v) => v.coefficiente ? percentuale(v.coefficiente) : "\u2014" },
              { chiave: "r", titolo: "Ricavi", numerica: true, cella: (v) => euro(v.importo) },
              { chiave: "rf", titolo: "Reddito forfettario", numerica: true, cella: (v) => euro(v.importo * v.coefficiente) }
            ] })
          )
        ),
        h(
          "div",
          { classe: "pila" },
          f ? scheda(
            { titolo: "Stima imposta e contributi", sottotitolo: "Regime forfettario" },
            h(
              "dl",
              { classe: "dl" },
              h("dt", null, "Reddito forfettario lordo"),
              h("dd", { classe: "numero" }, euro(f.redditoLordo)),
              h("dt", null, "Contributi dedotti"),
              h("dd", { classe: "numero" }, euro(f.contributiDeducibili)),
              h("dt", null, "Reddito imponibile"),
              h("dd", { classe: "numero" }, euro(f.imponibile)),
              h("dt", null, `Imposta al ${percentuale(f.aliquota)}`),
              h("dd", { classe: "numero" }, euro(f.imposta)),
              h("dt", null, "Contributi di competenza"),
              h("dd", { classe: "numero" }, euro(f.contributi.totale))
            ),
            h("hr"),
            h("div", { classe: "riga-flex", style: "justify-content:space-between" }, h("strong", null, "Imposta + contributi"), h("strong", { style: "font-size:18px" }, euro(f.totaleCarico))),
            h("p", { classe: "muted piccolo", style: "margin-top:12px" }, `Contributi dedotti: ${etichettaMetodo}. `, h("a", { href: "javascript:void(0)", onClick: modificaDeduzione }, "Modifica"))
          ) : avviso("attenzione", "Stima non disponibile.", "Assegna un codice ATECO con coefficiente nell\u2019anagrafica del cliente."),
          scheda(
            { titolo: "Prossimi versamenti", senzaPadding: true, azioni: [bottone("Scadenzario", { variante: "ghost", piccolo: true, onClick: () => ctx.naviga("#/scadenze") })] },
            prossime.length ? h("ul", { classe: "timeline" }, prossime.map((v) => voceAgenda(v))) : vuoto({ icona: "spunta", titolo: "Nessun versamento in sospeso" })
          )
        )
      )
    );
  }

  // js/ui/viste/anagrafica.js
  var DESCRIZIONI_PREVIDENZA = {
    "gestione-separata": "Professionisti senza cassa propria. Aliquota 26,07% (24% se gi\xE0 pensionati o assicurati altrove), senza minimale.",
    artigiani: "Gestione IVS artigiani: contributi fissi sul minimale pi\xF9 quota sul reddito eccedente. Riduzione del 35% per i forfettari su domanda.",
    commercianti: "Gestione IVS commercianti: contributi fissi sul minimale pi\xF9 quota sul reddito eccedente. Riduzione del 35% per i forfettari su domanda.",
    cassa: "Cassa professionale propria (ingegneri, architetti, avvocati\u2026). Aliquota e minimo dipendono dalla cassa."
  };
  function vistaAnagrafica(ctx) {
    const { archivio: archivio2, cliente: c, params } = ctx;
    const bozza = structuredClone(c);
    let sporco = false;
    const barra = h("div", { classe: "barra-salvataggio no-stampa", hidden: true });
    const segnaModifica = () => {
      sporco = true;
      barra.hidden = false;
    };
    const input = (props = {}) => h("input", { classe: "input", ...props });
    const campoTesto = (etichetta, chiave, props = {}, aiuto) => campo(etichetta, input({ type: "text", valore: bozza[chiave] ?? "", onInput: (e) => {
      bozza[chiave] = e.target.value;
      segnaModifica();
    }, ...props }), aiuto);
    const nome = campoTesto("Nome o ragione sociale", "nome", { required: true, autocomplete: "off" });
    const cf = campoTesto("Codice fiscale", "codiceFiscale", { maxlength: "16", autocapitalize: "characters", placeholder: "RSSMRA85T10A562S" });
    const piva = campoTesto("Partita IVA", "partitaIva", { maxlength: "11", inputmode: "numeric", placeholder: "11 cifre" });
    const anno2 = campo("Anno di inizio attivit\xE0", input({ type: "number", min: "1950", max: "2100", valore: bozza.annoInizioAttivita, onInput: (e) => {
      bozza.annoInizioAttivita = Number(e.target.value);
      segnaModifica();
    } }));
    const sezPrev = h("div", { classe: "pila", style: "gap:14px" });
    const disegnaPrev = () => {
      const p = bozza.previdenza;
      sezPrev.replaceChildren(
        h("div", { classe: "opzioni-scelta", role: "radiogroup", "aria-label": "Gestione previdenziale" }, TIPI_PREVIDENZA.map((t) => h(
          "label",
          { classe: `opzione ${p.tipo === t.valore ? "scelta" : ""}` },
          h("input", { type: "radio", name: "previdenza", value: t.valore, checked: p.tipo === t.valore, onChange: () => {
            p.tipo = t.valore;
            segnaModifica();
            disegnaPrev();
          } }),
          h("div", null, h("strong", null, t.etichetta.replace(/ \(.*\)/, "")), h("div", { classe: "muted piccolo" }, DESCRIZIONI_PREVIDENZA[t.valore]))
        ))),
        p.tipo === "gestione-separata" ? h("label", { classe: "spunta" }, h("input", { type: "checkbox", checked: p.altraCopertura, onChange: (e) => {
          p.altraCopertura = e.target.checked;
          segnaModifica();
        } }), "Gi\xE0 pensionato o assicurato presso altra forma obbligatoria (aliquota 24%)") : null,
        p.tipo === "artigiani" || p.tipo === "commercianti" ? h(
          "div",
          { classe: "pila", style: "gap:10px" },
          h("label", { classe: "spunta" }, h("input", { type: "checkbox", checked: p.iscrittoDal1996, onChange: (e) => {
            p.iscrittoDal1996 = e.target.checked;
            segnaModifica();
          } }), "Iscritto dal 1\xB0 gennaio 1996 o dopo (massimale 122.295 \u20AC nel 2026)"),
          h("label", { classe: "spunta" }, h("input", { type: "checkbox", checked: p.riduzione35, onChange: (e) => {
            p.riduzione35 = e.target.checked;
            segnaModifica();
          } }), "Riduzione contributiva del 35% (regime forfettario, su domanda INPS)")
        ) : null,
        p.tipo === "cassa" ? h(
          "div",
          { classe: "griglia-campi" },
          campo("Aliquota contributo soggettivo (%)", input({ type: "number", step: "0.01", min: "0", max: "100", valore: +(p.cassa.aliquotaSoggettiva * 100).toFixed(3), onInput: (e) => {
            p.cassa.aliquotaSoggettiva = Number(e.target.value) / 100;
            segnaModifica();
          } }), "Dipende dalla cassa di appartenenza."),
          campo("Contributo minimo annuo (\u20AC)", input({ type: "number", step: "0.01", min: "0", valore: p.cassa.contributoMinimo, onInput: (e) => {
            p.cassa.contributoMinimo = Number(e.target.value);
            segnaModifica();
          } }))
        ) : null
      );
    };
    disegnaPrev();
    const elencoAteco = h("div", { classe: "pila", style: "gap:14px" });
    const disegnaAteco = () => {
      elencoAteco.replaceChildren(...bozza.ateco.length ? bozza.ateco.map((v, i) => rigaAteco(v, i)) : [avviso("info", "Nessun codice ATECO.", "Aggiungine almeno uno per calcolare il reddito forfettario.")]);
    };
    function rigaAteco(v, i) {
      const risultati = h("ul", { classe: "suggerimenti", role: "listbox", hidden: true });
      const stato2 = h("div", { classe: "pila", style: "gap:8px" });
      const ambiguo = () => v.codice ? coefficienteAteco2025(v.codice, params) : null;
      const aggiornaStato = () => {
        stato2.replaceChildren();
        const r2025 = v.codice ? coefficienteAteco2025(v.codice, params) : null;
        const r2007 = v.codice && !r2025 ? gruppoAteco(v.codice) : null;
        const coeff = params.forfettario.coefficienti[v.gruppo];
        if (r2025) stato2.append(h("div", { classe: "riga-flex", style: "gap:8px" }, chip("ok", "ATECO 2025 riconosciuto", "spunta"), h("span", { classe: "muted piccolo" }, titoloAteco2025(v.codice) ?? "")));
        else if (r2007) stato2.append(h("div", { classe: "riga-flex", style: "gap:8px" }, chip("info", "Codice ATECO 2007/2022", "info")));
        else if (v.codice) stato2.append(avviso("errore", "Codice non riconosciuto.", "Scegli il gruppo di settore manualmente."));
        if (r2025 && !r2025.univoco) stato2.append(avviso("attenzione", "Raccordo non univoco.", `L\u2019attivit\xE0 pu\xF2 rientrare in pi\xF9 gruppi: ${r2025.candidati.map((x) => `${ETICHETTE_GRUPPI[x.gruppo]} (${percentuale(x.coefficiente)})`).join(" oppure ")}. Scegli in base alla visura.`));
        stato2.append(
          h("div", { classe: "griglia-campi" }, campo("Gruppo di settore e coefficiente", h(
            "select",
            { classe: "input", onChange: (e) => {
              v.gruppo = e.target.value;
              segnaModifica();
              aggiornaStato();
            } },
            Object.entries(ETICHETTE_GRUPPI).map(([k, et]) => h("option", { value: k, selected: k === v.gruppo }, `${et} \u2014 ${percentuale(params.forfettario.coefficienti[k])}`))
          ))),
          coeff ? h("div", { classe: "riga-flex" }, chip("primario", `Coefficiente di redditivit\xE0 ${percentuale(coeff)}`)) : null
        );
      };
      const campoCerca = input({ type: "text", valore: v.codice ? `${v.codice}${v.descrizione ? ` \u2014 ${v.descrizione}` : ""}` : "", placeholder: "Cerca per attivit\xE0 o codice (es. programmazione, 62.10)", autocomplete: "off", role: "combobox", "aria-expanded": "false" });
      let cursore = -1, trovati = [];
      const scegli = (r) => {
        v.codice = r.codice;
        v.descrizione = r.titolo;
        const ris = coefficienteAteco2025(r.codice, params);
        if (ris) v.gruppo = ris.candidati[0].gruppo;
        campoCerca.value = `${r.codice} \u2014 ${r.titolo}`;
        risultati.hidden = true;
        segnaModifica();
        aggiornaStato();
      };
      const mostra = () => {
        risultati.replaceChildren(...trovati.map((r, k) => h("li", { role: "option", "aria-selected": String(k === cursore), onPointerdown: (e) => {
          e.preventDefault();
          scegli(r);
        } }, h("strong", null, r.codice), " ", r.titolo)));
        risultati.hidden = trovati.length === 0;
        campoCerca.setAttribute("aria-expanded", String(!risultati.hidden));
      };
      campoCerca.addEventListener("input", () => {
        const t = campoCerca.value;
        if (/^\d{2}\.\d{2}\.\d{2}$/.test(t.trim()) || /^\d{2}(\.\d{1,2})?$/.test(t.trim())) {
          v.codice = t.trim();
          v.descrizione = titoloAteco2025(v.codice) ?? "";
          const ris = coefficienteAteco2025(v.codice, params);
          if (ris) v.gruppo = ris.candidati[0].gruppo;
          else if (gruppoAteco(v.codice)) v.gruppo = gruppoAteco(v.codice);
        }
        trovati = cercaAteco(t);
        cursore = -1;
        mostra();
        segnaModifica();
        aggiornaStato();
      });
      campoCerca.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          cursore = Math.min(cursore + 1, trovati.length - 1);
          mostra();
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          cursore = Math.max(cursore - 1, 0);
          mostra();
        }
        if (e.key === "Enter" && cursore >= 0) {
          e.preventDefault();
          scegli(trovati[cursore]);
        }
        if (e.key === "Escape") {
          risultati.hidden = true;
        }
      });
      campoCerca.addEventListener("blur", () => setTimeout(() => {
        risultati.hidden = true;
      }, 120));
      aggiornaStato();
      return h(
        "div",
        { classe: "riga-ateco-nuova" },
        h("div", { style: "position:relative" }, campo(`Attivit\xE0 ${i + 1}`, campoCerca), risultati),
        stato2,
        h("div", null, bottone("Rimuovi", { variante: "ghost pericolo", piccolo: true, icona: "cestino", onClick: () => {
          bozza.ateco.splice(i, 1);
          segnaModifica();
          disegnaAteco();
        } }))
      );
    }
    disegnaAteco();
    const verifica = () => {
      const d = { attivitaNeiTreAnniPrecedenti: false, prosecuzioneAltraAttivita: false, proseguitaAttivitaAltroSoggetto: false, ricaviAttivitaRilevata: 0 };
      const esito = h("div");
      const casella = (et, k) => h("label", { classe: "spunta" }, h("input", { type: "checkbox", onChange: (e) => {
        d[k] = e.target.checked;
      } }), et);
      const dlg = apriDialogo({
        titolo: "Verifica requisiti per l\u2019aliquota del 5%",
        corpo: h(
          "div",
          { classe: "pila", style: "gap:12px" },
          h("p", { classe: "muted" }, "Art. 1 c. 65 L. 190/2014: aliquota del 5% per l\u2019anno di inizio e i quattro successivi, se ricorrono tutte le condizioni."),
          casella("Ho esercitato attivit\xE0 artistica, professionale o d\u2019impresa nei 3 anni precedenti", "attivitaNeiTreAnniPrecedenti"),
          casella("L\u2019attivit\xE0 \xE8 mera prosecuzione di un precedente lavoro dipendente o autonomo", "prosecuzioneAltraAttivita"),
          casella("Proseguo un\u2019attivit\xE0 svolta in precedenza da altro soggetto", "proseguitaAttivitaAltroSoggetto"),
          esito
        ),
        azioni: [bottone("Chiudi", { onClick: () => dlg.chiudi() }), bottone("Verifica e applica", { variante: "primario", onClick: () => {
          const r = verificaRequisitiStartup(d);
          bozza.startup = r.ammesso;
          segnaModifica();
          esito.replaceChildren(r.ammesso ? avviso("ok", "Requisiti soddisfatti.", "Applicata l\u2019aliquota del 5% (ricordati di salvare).") : avviso("errore", "Requisiti non soddisfatti.", "Si applica l\u2019aliquota del 15%."));
          disegnaStartup();
        } })]
      });
    };
    const sezStartup = h("div", { classe: "pila", style: "gap:12px" });
    const disegnaStartup = () => sezStartup.replaceChildren(
      h("label", { classe: "spunta" }, h("input", { type: "checkbox", checked: bozza.startup, onChange: (e) => {
        bozza.startup = e.target.checked;
        segnaModifica();
      } }), h("span", null, "Applica l\u2019aliquota del 5% ", h("span", { classe: "muted" }, "(nuova attivit\xE0, primi 5 anni)"))),
      h("div", null, bottone("Verifica guidata dei requisiti", { icona: "spunta", piccolo: true, onClick: verifica }))
    );
    disegnaStartup();
    const note = h("textarea", { classe: "input", rows: "3", style: "height:auto;padding:10px 12px", onInput: (e) => {
      bozza.note = e.target.value;
      segnaModifica();
    } }, bozza.note ?? "");
    const salva = async () => {
      nome.mostraErrore(bozza.nome.trim() ? null : "Il nome \xE8 obbligatorio.");
      const ivaOk = !bozza.partitaIva || partitaIvaValida(bozza.partitaIva);
      piva.mostraErrore(ivaOk ? null : "Partita IVA non valida (controlla la cifra di controllo).");
      const cfOk = !bozza.codiceFiscale || codiceFiscaleValido(bozza.codiceFiscale) || codiceFiscaleSocietaValido(bozza.codiceFiscale);
      cf.mostraErrore(cfOk ? null : "Codice fiscale non valido.");
      if (!bozza.nome.trim() || !ivaOk || !cfOk) {
        ctx.toast("Controlla i campi evidenziati.", "errore");
        return;
      }
      bozza.codiceFiscale = bozza.codiceFiscale.toUpperCase();
      await archivio2.modifica((d) => {
        Object.assign(d.clienti.find((x) => x.id === c.id), bozza);
      });
      ctx.toast("Anagrafica salvata.");
    };
    barra.append(
      h("div", { classe: "riga-flex", style: "gap:10px" }, icona("info", 16), "Modifiche non salvate"),
      h("div", { classe: "gruppo-azioni" }, bottone("Annulla", { onClick: () => ctx.aggiorna() }), bottone("Salva anagrafica", { variante: "primario", icona: "spunta", onClick: salva }))
    );
    return h(
      "div",
      { classe: "pila" },
      testataCliente(ctx, null),
      scheda({ titolo: "Dati del contribuente" }, h("div", { classe: "griglia-campi" }, nome, cf, piva, anno2)),
      scheda({ titolo: "Gestione previdenziale", sottotitolo: "Determina contributi, minimale e scadenze" }, sezPrev),
      scheda({
        titolo: "Attivit\xE0 e coefficiente di redditivit\xE0",
        sottotitolo: "Cerca per descrizione o codice ATECO 2025 (raccordo ISTAT) oppure inserisci un codice 2007/2022",
        azioni: [bottone("Aggiungi attivit\xE0", { icona: "piu", piccolo: true, onClick: () => {
          bozza.ateco.push(nuovaVoceAteco());
          segnaModifica();
          disegnaAteco();
        } })]
      }, elencoAteco),
      scheda({ titolo: "Aliquota imposta sostitutiva" }, sezStartup),
      scheda({ titolo: "Note" }, campo("Note interne", note)),
      barra
    );
  }

  // js/import/csv.js
  function parseCsv(testo2) {
    const t = testo2.replace(/^﻿/, "");
    const primaRiga = t.split(/\r?\n/, 1)[0] ?? "";
    const sep = (primaRiga.match(/;/g)?.length ?? 0) >= (primaRiga.match(/,/g)?.length ?? 0) ? ";" : ",";
    const righe = [];
    let riga = [], campo2 = "", tra = false;
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
        riga.push(campo2);
        campo2 = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && t[i + 1] === "\n") i++;
        riga.push(campo2);
        campo2 = "";
        if (riga.some((x) => x.trim() !== "")) righe.push(riga);
        riga = [];
      } else campo2 += c;
    }
    riga.push(campo2);
    if (riga.some((x) => x.trim() !== "")) righe.push(riga);
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

  // js/ui/viste/fatture.js
  function vistaFatture(ctx) {
    const { archivio: archivio2, dati, cliente: c, anno: anno2, params } = ctx;
    const filtro = ctx.stato.filtroFatture ?? "tutte";
    const q = (ctx.stato.cercaFatture ?? "").toLowerCase();
    const sue = dati.fatture.filter((f) => f.clienteId === c.id && (f.data.startsWith(String(anno2)) || (f.dataIncasso || "").startsWith(String(anno2))));
    const lista = sue.filter((f) => {
      if (filtro === "da-incassare" && f.dataIncasso) return false;
      if (filtro === "incassate" && !f.dataIncasso) return false;
      return !q || `${f.numero} ${f.controparte} ${f.note ?? ""}`.toLowerCase().includes(q);
    });
    const incassato = round2(sue.filter((f) => (f.dataIncasso || "").startsWith(String(anno2))).reduce((s, f) => s + f.importo, 0));
    const daIncassare = round2(sue.filter((f) => !f.dataIncasso).reduce((s, f) => s + f.importo, 0));
    const fatturato = round2(sue.filter((f) => f.data.startsWith(String(anno2))).reduce((s, f) => s + f.importo, 0));
    function apriForm(esistente) {
      const f = esistente ? structuredClone(esistente) : nuovaFattura(c.id);
      if (!esistente) f.data = ctx.oggi;
      const err = h("div");
      const bollo = h("input", { type: "number", step: "0.01", min: "0", valore: f.bollo });
      const importo = h("input", {
        type: "number",
        step: "0.01",
        required: true,
        valore: f.importo || "",
        autofocus: true,
        onInput: (e) => {
          f.importo = Number(e.target.value);
          f.bollo = bolloDovuto(f.importo, params);
          bollo.value = f.bollo;
        }
      });
      bollo.addEventListener("input", (e) => {
        f.bollo = Number(e.target.value);
      });
      const selAteco = h(
        "select",
        { onChange: (e) => {
          f.atecoCodice = e.target.value;
        } },
        h("option", { value: "" }, c.ateco.length ? "Prima attivit\xE0 (predefinita)" : "Nessun codice ATECO"),
        c.ateco.filter((v) => v.codice).map((v) => h("option", { value: v.codice, selected: v.codice === f.atecoCodice }, `${v.codice} \u2014 ${v.descrizione}`))
      );
      const corpo = h(
        "form",
        { id: "form-fattura", classe: "pila", style: "gap:16px", onSubmit: async (e) => {
          e.preventDefault();
          salva();
        } },
        h(
          "div",
          { classe: "griglia-campi stretta" },
          campo("Numero", h("input", { type: "text", valore: f.numero, placeholder: "es. 12/2026", onInput: (e) => {
            f.numero = e.target.value;
          } })),
          campo("Data fattura", h("input", { type: "date", required: true, valore: f.data, onInput: (e) => {
            f.data = e.target.value;
          } }))
        ),
        campo("Cliente (controparte)", h("input", { type: "text", valore: f.controparte, placeholder: "Denominazione del committente", onInput: (e) => {
          f.controparte = e.target.value;
        } })),
        h(
          "div",
          { classe: "griglia-campi stretta" },
          campo("Importo imponibile (\u20AC)", importo),
          campo("Bollo (\u20AC)", bollo, "Dovuto sopra 77,47 \u20AC.")
        ),
        campo("Data di incasso", h("input", { type: "date", valore: f.dataIncasso, onInput: (e) => {
          f.dataIncasso = e.target.value;
        } }), "Il ricavo concorre al reddito nell\u2019anno di incasso (criterio di cassa). Lascia vuoto se non ancora incassata."),
        campo("Attivit\xE0 (ATECO)", selAteco),
        campo("Note", h("input", { type: "text", valore: f.note ?? "", onInput: (e) => {
          f.note = e.target.value;
        } })),
        err
      );
      async function salva() {
        if (!corpo.reportValidity()) return;
        if (f.dataIncasso && f.dataIncasso < f.data) {
          err.replaceChildren(avviso("errore", "La data di incasso non pu\xF2 precedere la fattura."));
          return;
        }
        await archivio2.modifica((d) => {
          const i = d.fatture.findIndex((x) => x.id === f.id);
          if (i >= 0) d.fatture[i] = f;
          else d.fatture.push(f);
        });
        drawer.chiudi();
        ctx.toast(esistente ? "Fattura aggiornata." : "Fattura aggiunta.");
      }
      const drawer = apriDrawer({
        titolo: esistente ? "Modifica fattura" : "Nuova fattura",
        sottotitolo: c.nome,
        corpo,
        azioni: [bottone("Annulla", { onClick: () => drawer.chiudi() }), bottone(esistente ? "Salva modifiche" : "Aggiungi fattura", { variante: "primario", icona: "spunta", onClick: salva })]
      });
    }
    function apriImport(origine) {
      const area = h("div", { classe: "pila", style: "gap:14px" });
      const dlg = apriDialogo({ titolo: origine === "csv" ? "Importa da CSV" : "Importa da FatturaPA (XML)", largo: true, corpo: area, azioni: [bottone("Chiudi", { onClick: () => dlg.chiudi() })] });
      const esistenti = new Set(dati.fatture.filter((x) => x.clienteId === c.id).map((x) => `${x.numero}|${x.data}|${x.importo}`));
      area.append(
        origine === "csv" ? h("p", { classe: "muted" }, "Colonne obbligatorie: data e importo. Facoltative: numero, cliente, data incasso, ateco. Separatore ; o , \u2014 numeri e date all\u2019italiana.") : h("p", { classe: "muted" }, "Puoi selezionare pi\xF9 file XML. L\u2019importo \xE8 la somma degli imponibili; le note di credito (TD04) sono negative. La data di incasso va inserita dopo."),
        zonaRilascio({ testo: origine === "csv" ? "Scegli un file CSV" : "Scegli i file XML", accept: origine === "csv" ? ".csv,text/csv,text/plain" : ".xml,text/xml,application/xml", multiplo: origine === "xml", onFile: async (files) => {
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
          const nuove = fatture.filter((x) => !esistenti.has(`${x.numero}|${x.data}|${x.importo}`));
          const duplicate = fatture.length - nuove.length;
          area.querySelector(".anteprima")?.remove();
          area.append(h(
            "div",
            { classe: "anteprima pila", style: "gap:12px" },
            avviso(nuove.length ? "ok" : "attenzione", `${nuove.length} fatture da importare.`, duplicate ? `${duplicate} gi\xE0 presenti (stessi numero, data e importo) verranno ignorate.` : ""),
            errori.length ? avviso("errore", `${errori.length} righe scartate:`, errori.slice(0, 6).join(" \xB7 ") + (errori.length > 6 ? " \u2026" : "")) : null,
            nuove.length ? h("div", { classe: "tabella-contenitore", style: "max-height:220px;overflow:auto;border:1px solid var(--line);border-radius:8px" }, h("table", { classe: "tabella" }, h("thead", null, h("tr", null, ["N.", "Data", "Controparte", "Importo"].map((t, i) => h("th", { classe: i === 3 ? "numero" : "" }, t)))), h("tbody", null, nuove.slice(0, 50).map((x) => h("tr", null, h("td", null, x.numero), h("td", null, dataIt(x.data)), h("td", null, x.controparte), h("td", { classe: "numero" }, euro(x.importo))))))) : null,
            bottone(`Importa ${nuove.length} fatture`, { variante: "primario", icona: "carica", disabled: nuove.length === 0, onClick: async () => {
              await archivio2.modifica((d) => {
                for (const n of nuove) {
                  const rec = { ...nuovaFattura(c.id), ...n };
                  if (n.bollo === void 0) rec.bollo = bolloDovuto(n.importo, params);
                  d.fatture.push(rec);
                }
              });
              dlg.chiudi();
              ctx.toast(`${nuove.length} fatture importate.`);
            } })
          ));
        } })
      );
    }
    const elimina = async (f) => {
      if (!await ctx.conferma({ titolo: "Eliminare la fattura?", testo: `Fattura ${f.numero || ""} del ${dataIt(f.data)} (${euro(f.importo)}).`, etichetta: "Elimina", pericolo: true })) return;
      await archivio2.modifica((d) => {
        d.fatture = d.fatture.filter((y) => y.id !== f.id);
      });
      ctx.toast("Fattura eliminata.");
    };
    const incassaOggi = async (f) => {
      await archivio2.modifica((d) => {
        const x = d.fatture.find((y) => y.id === f.id);
        x.dataIncasso = x.dataIncasso ? "" : ctx.oggi >= x.data ? ctx.oggi : x.data;
      });
    };
    const seg = (k, et) => h("button", { type: "button", "aria-pressed": String(filtro === k), onClick: () => {
      ctx.stato.filtroFatture = k;
      ctx.aggiorna();
    } }, et);
    const cerca = h("div", { classe: "cerca" }, icona("cerca", 16), h("input", {
      classe: "input",
      type: "search",
      placeholder: "Cerca per numero o cliente\u2026",
      "aria-label": "Cerca fatture",
      valore: ctx.stato.cercaFatture ?? "",
      onInput: (e) => {
        ctx.stato.cercaFatture = e.target.value;
        const pos = e.target.selectionStart;
        ctx.aggiorna();
        const n = document.querySelector(".strumenti input");
        n?.focus();
        n?.setSelectionRange(pos, pos);
      }
    }));
    const tab = tabella({
      ordinaIniziale: { chiave: "data", verso: -1 },
      righe: lista,
      colonne: [
        { chiave: "numero", titolo: "Numero", ordina: (f) => f.numero, cella: (f) => h("strong", null, f.numero || "\u2014") },
        { chiave: "data", titolo: "Data", ordina: (f) => f.data, cella: (f) => dataIt(f.data) },
        { chiave: "cp", titolo: "Controparte", ordina: (f) => f.controparte.toLowerCase(), cella: (f) => f.controparte || h("span", { classe: "muted" }, "\u2014") },
        { chiave: "importo", titolo: "Importo", numerica: true, ordina: (f) => f.importo, cella: (f) => h("div", null, h("strong", null, euro(f.importo)), f.bollo ? h("div", { classe: "sotto" }, `bollo ${euro(f.bollo)}`) : null) },
        { chiave: "inc", titolo: "Incasso", ordina: (f) => f.dataIncasso || "9999", cella: (f) => f.dataIncasso ? chip("ok", dataIt(f.dataIncasso), "spunta") : chip("attenzione", "Da incassare", "orologio") },
        { chiave: "az", titolo: "", cella: (f) => h("div", { classe: "azioni-riga" }, h("button", { classe: "bottone ghost icona-sola piccolo", type: "button", "aria-label": `Azioni fattura ${f.numero}`, onClick: (e) => apriMenu(e.currentTarget, [
          { testo: "Modifica", icona: "modifica", onClick: () => apriForm(f) },
          { testo: f.dataIncasso ? "Segna da incassare" : "Segna incassata oggi", icona: "spunta", onClick: () => incassaOggi(f) },
          "sep",
          { testo: "Elimina", icona: "cestino", pericolo: true, onClick: () => elimina(f) }
        ]) }, icona("altro", 18))) }
      ]
    });
    if (ctx.stato.nuovaFattura) {
      ctx.stato.nuovaFattura = false;
      setTimeout(() => apriForm(), 50);
    }
    return h(
      "div",
      { classe: "pila" },
      testataCliente(ctx, ctx.riepilogo(), []),
      testataPagina("Fatture emesse", `Anno ${anno2}`, [
        bottone("Importa CSV", { icona: "carica", onClick: () => apriImport("csv") }),
        bottone("Importa XML", { icona: "carica", onClick: () => apriImport("xml") }),
        bottone("Esporta CSV", { icona: "scarica", onClick: () => scarica(`fatture-${c.nome.replace(/\W+/g, "_")}-${anno2}.csv`, csvFatture(lista), "text/csv;charset=utf-8") }),
        bottone("Nuova fattura", { variante: "primario", icona: "piu", onClick: () => apriForm() })
      ]),
      h(
        "div",
        { classe: "tiles" },
        tile(`Incassato nel ${anno2}`, euro(incassato), { icona: "spunta", nota: "Concorre ai ricavi dell\u2019anno" }),
        tile("Da incassare", euro(daIncassare), { icona: "orologio", nota: `${sue.filter((f) => !f.dataIncasso).length} fatture aperte` }),
        tile(`Fatturato ${anno2}`, euro(fatturato), { icona: "documento", nota: `${sue.filter((f) => f.data.startsWith(String(anno2))).length} fatture emesse` })
      ),
      scheda(
        { senzaPadding: true },
        sue.length === 0 ? vuoto({ icona: "documento", titolo: `Nessuna fattura per il ${anno2}`, testo: "Inserisci una fattura oppure importala da CSV o da file XML FatturaPA.", azioni: [bottone("Nuova fattura", { variante: "primario", icona: "piu", onClick: () => apriForm() }), bottone("Importa XML", { icona: "carica", onClick: () => apriImport("xml") })] }) : [
          h("div", { classe: "strumenti" }, cerca, h("div", { classe: "segmenti", role: "group", "aria-label": "Filtra" }, seg("tutte", "Tutte"), seg("da-incassare", "Da incassare"), seg("incassate", "Incassate"))),
          lista.length ? tab : vuoto({ icona: "cerca", titolo: "Nessun risultato", testo: "Nessuna fattura corrisponde ai filtri." })
        ]
      )
    );
  }

  // js/ui/viste/spese.js
  function vistaSpese(ctx) {
    const { archivio: archivio2, dati, cliente: c, anno: anno2 } = ctx;
    const sue = dati.spese.filter((x) => x.clienteId === c.id && x.data.startsWith(String(anno2)));
    const totale = round2(sue.reduce((t, x) => t + x.importo, 0));
    const categorie = [...new Set(dati.spese.filter((x) => x.clienteId === c.id).map((x) => x.categoria).filter(Boolean))];
    const perCategoria = /* @__PURE__ */ new Map();
    for (const s of sue) perCategoria.set(s.categoria || "Altro", round2((perCategoria.get(s.categoria || "Altro") ?? 0) + s.importo));
    function apriForm(esistente) {
      const s = esistente ? structuredClone(esistente) : nuovaSpesa(c.id);
      if (!esistente) s.data = ctx.oggi;
      const dl = h("datalist", { id: "cat-spese" }, categorie.map((k) => h("option", { value: k })));
      const corpo = h(
        "form",
        { classe: "pila", style: "gap:16px", onSubmit: (e) => {
          e.preventDefault();
          salva();
        } },
        campo("Data", h("input", { type: "date", required: true, valore: s.data, onInput: (e) => {
          s.data = e.target.value;
        } })),
        campo("Descrizione", h("input", { type: "text", required: true, valore: s.descrizione, autofocus: true, onInput: (e) => {
          s.descrizione = e.target.value;
        } })),
        campo("Categoria", h("input", { type: "text", list: "cat-spese", valore: s.categoria, onInput: (e) => {
          s.categoria = e.target.value;
        } })),
        dl,
        campo("Importo (\u20AC)", h("input", { type: "number", step: "0.01", min: "0", required: true, valore: s.importo || "", onInput: (e) => {
          s.importo = Number(e.target.value);
        } }))
      );
      async function salva() {
        if (!corpo.reportValidity()) return;
        await archivio2.modifica((d) => {
          const i = d.spese.findIndex((x) => x.id === s.id);
          if (i >= 0) d.spese[i] = s;
          else d.spese.push(s);
        });
        drawer.chiudi();
        ctx.toast(esistente ? "Spesa aggiornata." : "Spesa aggiunta.");
      }
      const drawer = apriDrawer({
        titolo: esistente ? "Modifica spesa" : "Nuova spesa",
        sottotitolo: c.nome,
        corpo,
        azioni: [bottone("Annulla", { onClick: () => drawer.chiudi() }), bottone("Salva", { variante: "primario", icona: "spunta", onClick: salva })]
      });
    }
    const tab = tabella({
      ordinaIniziale: { chiave: "data", verso: -1 },
      righe: sue,
      piede: h("tr", null, h("td", { colspan: "3" }, "Totale"), h("td", { classe: "numero" }, euro(totale)), h("td")),
      colonne: [
        { chiave: "data", titolo: "Data", ordina: (x) => x.data, cella: (x) => dataIt(x.data) },
        { chiave: "desc", titolo: "Descrizione", ordina: (x) => x.descrizione.toLowerCase(), cella: (x) => h("strong", null, x.descrizione) },
        { chiave: "cat", titolo: "Categoria", ordina: (x) => x.categoria.toLowerCase(), cella: (x) => x.categoria || h("span", { classe: "muted" }, "\u2014") },
        { chiave: "imp", titolo: "Importo", numerica: true, ordina: (x) => x.importo, cella: (x) => euro(x.importo) },
        { chiave: "az", titolo: "", cella: (x) => h("div", { classe: "azioni-riga" }, h("button", { classe: "bottone ghost icona-sola piccolo", type: "button", "aria-label": `Azioni spesa ${x.descrizione}`, onClick: (e) => apriMenu(e.currentTarget, [
          { testo: "Modifica", icona: "modifica", onClick: () => apriForm(x) },
          "sep",
          { testo: "Elimina", icona: "cestino", pericolo: true, onClick: async () => {
            if (await ctx.conferma({ titolo: "Eliminare la spesa?", testo: x.descrizione, etichetta: "Elimina", pericolo: true })) {
              await archivio2.modifica((d) => {
                d.spese = d.spese.filter((y) => y.id !== x.id);
              });
              ctx.toast("Spesa eliminata.");
            }
          } }
        ]) }, icona("altro", 18))) }
      ]
    });
    return h(
      "div",
      { classe: "pila" },
      testataCliente(ctx, ctx.riepilogo(), []),
      testataPagina("Spese", `Anno ${anno2}`, [bottone("Nuova spesa", { variante: "primario", icona: "piu", onClick: () => apriForm() })]),
      avviso("info", "Nel forfettario i costi non sono deducibili.", "Le spese servono a calcolare il netto reale e a confrontare la convenienza con il regime ordinario."),
      h(
        "div",
        { classe: "tiles" },
        tile(`Spese ${anno2}`, euro(totale), { icona: "ricevuta", nota: `${sue.length} voci` }),
        ...[...perCategoria.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k, v]) => tile(k, euro(v), { nota: `${Math.round(v / (totale || 1) * 100)}% del totale` }))
      ),
      scheda({ senzaPadding: true }, sue.length ? tab : vuoto({ icona: "ricevuta", titolo: `Nessuna spesa per il ${anno2}`, testo: "Registra le spese sostenute per calcolare il netto reale.", azioni: [bottone("Nuova spesa", { variante: "primario", icona: "piu", onClick: () => apriForm() })] }))
    );
  }

  // js/fiscal/ordinario.js
  function detrazioneLavoroAutonomo(redditoComplessivo, params) {
    const d = params.irpef.detrazioneLavoroAutonomo;
    const r = redditoComplessivo;
    const quoziente = (num3, den) => Math.floor(num3 / den * 1e4 + 1e-9) / 1e4;
    let importo = 0;
    if (r <= d.finoA) importo = d.importoFisso;
    else if (r <= d.finoA2) importo = d.base + d.extra * quoziente(d.finoA2 - r, d.divisore);
    else if (r <= d.finoA3) importo = d.base * quoziente(d.finoA3 - r, d.divisore3);
    if (importo > 0 && r > d.aumento.da && r <= d.aumento.a) importo += d.aumento.importo;
    return round2(importo);
  }
  function calcolaOrdinario(params, dati) {
    const ricavi = dati.ricavi;
    const costi = dati.costi ?? 0;
    const redditoProfessionale = round2(clamp0(ricavi - costi));
    const contributi = contributiPrevidenziali(redditoProfessionale, params, dati.previdenza);
    const imponibile = round2(clamp0(
      redditoProfessionale + (dati.altriRedditi ?? 0) - contributi.totale - (dati.altreDeduzioni ?? 0) - (dati.perditePregresse ?? 0)
    ));
    const irpefLorda = applicaScaglioni(imponibile, params.irpef.scaglioni);
    const detrazioneAutonomi = dati.senzaDetrazioneAutonomi ? 0 : detrazioneLavoroAutonomo(imponibile, params);
    const irpef = round2(clamp0(irpefLorda - detrazioneAutonomi - (dati.detrazioni ?? 0)));
    const addizionali = round2(
      imponibile * ((dati.addizionaleRegionale ?? 0) + (dati.addizionaleComunale ?? 0))
    );
    const irap = dati.soggettoIrap ? round2(redditoProfessionale * params.irap.aliquota) : 0;
    return {
      ricavi,
      costi,
      redditoProfessionale,
      contributi,
      imponibile,
      irpefLorda,
      detrazioneAutonomi,
      irpef,
      addizionali,
      irap,
      totaleCarico: round2(irpef + addizionali + irap + contributi.totale)
    };
  }

  // js/fiscal/confronto.js
  function confrontaRegimi(params, { ricavi, costiReali, ricaviPerAteco: ricaviPerAteco2, aliquota, previdenza, riduzione35, ordinario = {} }) {
    const forf = calcolaForfettario(params, { ricavi: ricaviPerAteco2, previdenza, aliquota, riduzione35 });
    const ord = calcolaOrdinario(params, { ricavi, costi: costiReali, previdenza, ...ordinario });
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
  function scenari(params, base, variazioni) {
    return variazioni.map((v) => {
      const ricavi = base.ricavi * (1 + (v.ricaviPct ?? 0));
      const costiReali = base.costiReali * (1 + (v.costiPct ?? 0));
      const fattore = base.ricavi === 0 ? 0 : ricavi / base.ricavi;
      const ricaviPerAteco2 = base.ricaviPerAteco.map((r) => ({ ...r, importo: r.importo * fattore }));
      return { variazione: v, ...confrontaRegimi(params, { ...base, ricavi, costiReali, ricaviPerAteco: ricaviPerAteco2 }) };
    });
  }

  // js/ui/viste/simulazione.js
  var num = (v) => Number.isFinite(Number(v)) ? Number(v) : 0;
  function vistaSimulazione(ctx) {
    var _a;
    const { cliente: c, anno: anno2, params, esatto, annoUsato } = ctx;
    const r = ctx.riepilogo();
    const voci = r.perAteco.filter((v) => v.coefficiente > 0);
    if (voci.length === 0) {
      return h("div", { classe: "pila" }, testataCliente(ctx, null), vuoto({ icona: "bilancia", titolo: "Servono i codici ATECO", testo: "Per simulare il regime forfettario assegna almeno un codice ATECO con coefficiente nell\u2019anagrafica del cliente.", azioni: [bottone("Vai all\u2019anagrafica", { variante: "primario", onClick: () => ctx.naviga("#/anagrafica") })] }));
    }
    const chiaveStato = `sim:${c.id}:${anno2}`;
    const s = (_a = ctx.stato)[chiaveStato] ?? (_a[chiaveStato] = { ricavi: null, costi: null, ricaviPct: 0, costiPct: 0, addReg: 1.73, addCom: 0.8, detrazioni: 0, altriRedditi: 0, perdite: 0, senzaDetrAut: false, irap: false });
    const ricaviBase = s.ricavi ?? r.ricavi;
    const costiBase = s.costi ?? r.spese;
    const risultati = h("div", { classe: "pila" });
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
        ordinario: { addizionaleRegionale: s.addReg / 100, addizionaleComunale: s.addCom / 100, detrazioni: s.detrazioni, altriRedditi: s.altriRedditi, perditePregresse: s.perdite, senzaDetrazioneAutonomi: s.senzaDetrAut, soggettoIrap: s.irap }
      };
      const conf = confrontaRegimi(params, input);
      const f = conf.forfettario, o = conf.ordinario;
      const soglia = verificaSoglieRicavi(params, ricavi);
      const conv = conf.conveniente;
      const x = [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50];
      const sc = scenari(params, { ...input }, x.map((p) => ({ ricaviPct: p / 100 })));
      const segmenti = (reg) => {
        const tot = Math.max(ricavi, 1);
        return [
          ["Costi", costi, "var(--asse)"],
          ["Contributi", reg.contributi.totale, "var(--serie-2)"],
          ["Imposte", reg === f ? f.imposta : o.irpef + o.addizionali + o.irap, "#475569"],
          ["Netto", reg.netto, "var(--serie-1)"]
        ].map(([et, val, col]) => ({ et, val: Math.max(val, 0), pct: Math.max(val, 0) / tot * 100, col }));
      };
      const barra = (titolo, reg, vince) => {
        const seg = segmenti(reg);
        return h(
          "div",
          { style: "display:grid;gap:8px" },
          h("div", { classe: "riga-flex", style: "justify-content:space-between" }, h("strong", null, titolo, vince ? h("span", { style: "margin-left:8px" }, h("span", { classe: "chip ok" }, icona("spunta", 12), "Pi\xF9 conveniente")) : null), h("strong", { classe: "numero" }, euro(reg.netto))),
          h(
            "div",
            { style: "display:flex;height:16px;border-radius:6px;overflow:hidden;gap:2px", role: "img", "aria-label": `Composizione dei ricavi: ${seg.map((q) => `${q.et} ${euro(q.val)}`).join(", ")}` },
            seg.map((q) => {
              const el = h("span", { title: `${q.et}: ${euro(q.val)}` });
              el.style.width = `${q.pct}%`;
              el.style.background = q.col;
              return el;
            })
          ),
          h("div", { classe: "muted piccolo", style: "display:flex;gap:14px;flex-wrap:wrap" }, seg.map((q) => h("span", { style: "display:inline-flex;align-items:center;gap:6px" }, (() => {
            const d = h("span", { style: "width:9px;height:9px;border-radius:3px;display:inline-block" });
            d.style.background = q.col;
            return d;
          })(), `${q.et} ${euro(q.val)}`)))
        );
      };
      const riga = (et, vf, vo, forte) => h("tr", null, h("td", null, et), h("td", { classe: "numero" }, forte ? h("strong", null, typeof vf === "number" ? euro(vf) : vf) : typeof vf === "number" ? euro(vf) : vf), h("td", { classe: "numero" }, forte ? h("strong", null, typeof vo === "number" ? euro(vo) : vo) : typeof vo === "number" ? euro(vo) : vo));
      const ipotesi = { previdenza: etichettaPrevidenza(c), righe: [
        ["Ricavi di partenza", euro(ricaviBase)],
        ["Variazione dei ricavi", `${s.ricaviPct > 0 ? "+" : ""}${s.ricaviPct}%`],
        ["Costi di partenza", euro(costiBase)],
        ["Variazione dei costi", `${s.costiPct > 0 ? "+" : ""}${s.costiPct}%`],
        ["Addizionali IRPEF (regionale + comunale)", `${(s.addReg + s.addCom).toLocaleString("it-IT")}%`],
        ["Altre detrazioni", euro(s.detrazioni)],
        ["Perdite pregresse", euro(s.perdite)],
        ["Soggetto a IRAP", s.irap ? "S\xEC" : "No"]
      ] };
      risultati.replaceChildren(
        soglia.stato === "esce-subito" ? avviso("errore", "Oltre 100.000 \u20AC.", "Il forfettario cessa subito e il reddito dell\u2019intero anno va determinato con le regole ordinarie: il confronto \xE8 solo indicativo.") : soglia.stato === "esce-anno-successivo" ? avviso("attenzione", "Oltre 85.000 \u20AC.", "Il regime forfettario cessa dall\u2019anno successivo.") : null,
        h(
          "div",
          { classe: "verdetto" },
          h("div", { classe: "verdetto-icona" }, icona(conv === "pari" ? "bilancia" : "spunta", 24)),
          h(
            "div",
            null,
            h("h2", null, conv === "pari" ? "I due regimi si equivalgono" : `Conviene il regime ${conv}`),
            h("p", null, conv === "pari" ? "Stesso netto con entrambi." : `Netto superiore di ${euro(Math.abs(conf.differenza))} (${Math.abs(conf.differenza / Math.max(Math.min(f.netto, o.netto), 1) * 100).toFixed(1).replace(".", ",")}%) rispetto all\u2019altro regime.`)
          )
        ),
        h(
          "div",
          { classe: "tiles" },
          tile("Netto forfettario", euro(f.netto), { icona: "scudo", nota: `Imposte e contributi ${euro(f.totaleCarico)}` }),
          tile("Netto ordinario", euro(o.netto), { icona: "bilancia", nota: `Imposte e contributi ${euro(o.totaleCarico)}` }),
          tile("Pressione complessiva", `${(f.totaleCarico / Math.max(ricavi, 1) * 100).toFixed(1).replace(".", ",")}% \xB7 ${(o.totaleCarico / Math.max(ricavi, 1) * 100).toFixed(1).replace(".", ",")}%`, { nota: "Forfettario \xB7 ordinario, sui ricavi" })
        ),
        scheda({ titolo: "Dove vanno i ricavi", sottotitolo: "Costi, contributi, imposte e netto a confronto" }, h("div", { classe: "pila", style: "gap:22px" }, barra("Forfettario", f, conv === "forfettario"), barra("Ordinario", o, conv === "ordinario"))),
        scheda(
          { titolo: "Dettaglio del calcolo", senzaPadding: true, azioni: [
            bottone("CSV", { piccolo: true, icona: "scarica", onClick: () => scarica(`confronto-regimi-${anno2}.csv`, csvConfronto(conf), "text/csv;charset=utf-8") }),
            bottone("PDF", { piccolo: true, variante: "primario", icona: "pdf", onClick: () => esportaPdf((J) => pdfSimulazione(J, { conf, cliente: c, anno: anno2, studio: ctx.studio, ipotesi }), `confronto-regimi-${anno2}-${c.nome.replace(/\W+/g, "-")}.pdf`) })
          ] },
          h("div", { classe: "tabella-contenitore" }, h(
            "table",
            { classe: "tabella" },
            h("thead", null, h("tr", null, h("th", null, "Voce"), h("th", { classe: "numero" }, "Forfettario"), h("th", { classe: "numero" }, "Ordinario"))),
            h(
              "tbody",
              null,
              riga("Ricavi", f.ricavi, o.ricavi),
              riga("Costi reali sostenuti", costi, costi),
              riga("Reddito", f.redditoLordo, o.redditoProfessionale),
              riga("Contributi previdenziali", f.contributi.totale, o.contributi.totale),
              riga("Imponibile fiscale", f.imponibile, o.imponibile),
              riga(`Imposta (${percentuale(f.aliquota)} sostitutiva / IRPEF netta)`, f.imposta, o.irpef),
              riga("di cui detrazione lavoro autonomo (art. 13 c. 5 TUIR)", "\u2014", o.detrazioneAutonomi),
              riga("Addizionali regionale e comunale", "\u2014", o.addizionali),
              riga("IRAP", "\u2014", o.irap),
              riga("Totale imposte e contributi", f.totaleCarico, o.totaleCarico, true),
              riga("Netto disponibile", f.netto, o.netto, true)
            )
          ))
        ),
        scheda({}, graficoLinee({
          titolo: "Netto al variare dei ricavi",
          descrizione: "Stessi costi, ricavi da \u221250% a +50% rispetto allo scenario. Il forfettario non \xE8 applicabile oltre 85.000 \u20AC.",
          x: sc.map((q) => q.forfettario.ricavi),
          titoloX: "Ricavi",
          formatoX: (v) => euro(Math.round(v)).replace(",00", ""),
          serie: [{ nome: "Forfettario", valori: sc.map((q) => q.forfettario.netto), colore: "--serie-1" }, { nome: "Ordinario", valori: sc.map((q) => q.ordinario.netto), colore: "--serie-2" }],
          riferimentoX: { valore: params.forfettario.soglie.ricaviEsclusione, etichetta: "Soglia 85.000 \u20AC" }
        })),
        h("p", { classe: "muted piccolo" }, "Semplificazioni: la detrazione per lavoro autonomo \xE8 calcolata in automatico; altre detrazioni e perdite pregresse sono importi da inserire. L\u2019IVA \xE8 neutra; ammortamenti e altre spese vanno inseriti tra i costi. Non sono modellati altre deduzioni oltre ai contributi n\xE9 i limiti IRAP per i professionisti. Stima indicativa.")
      );
    }
    const slider = (etichetta, chiave, min, max) => {
      const out = h("strong", null, `${s[chiave] > 0 ? "+" : ""}${s[chiave]}%`);
      return h(
        "div",
        { classe: "campo" },
        h("label", { style: "display:flex;justify-content:space-between" }, etichetta, out),
        h("input", { type: "range", min, max, step: "1", valore: s[chiave], "aria-label": etichetta, onInput: (e) => {
          s[chiave] = Number(e.target.value);
          out.textContent = `${s[chiave] > 0 ? "+" : ""}${s[chiave]}%`;
          ricalcola();
        } })
      );
    };
    const numero = (chiave, props = {}) => h("input", { type: "number", step: "0.01", min: "0", valore: s[chiave], onInput: (e) => {
      s[chiave] = num(e.target.value);
      ricalcola();
    }, ...props });
    const pannello = h(
      "aside",
      { classe: "pannello-ipotesi" },
      scheda(
        { titolo: "Ipotesi" },
        h(
          "div",
          { classe: "pila", style: "gap:16px" },
          campo("Ricavi (\u20AC)", h("input", { type: "number", step: "0.01", min: "0", valore: ricaviBase, onInput: (e) => {
            s.ricavi = num(e.target.value);
            ricalcola();
          } }), "Predefinito: incassi registrati nell\u2019anno."),
          campo("Costi reali (\u20AC)", h("input", { type: "number", step: "0.01", min: "0", valore: costiBase, onInput: (e) => {
            s.costi = num(e.target.value);
            ricalcola();
          } }), "Predefinito: spese registrate nell\u2019anno."),
          h("hr", { style: "margin:0" }),
          h("div", { classe: "etichetta" }, "Scenario what-if"),
          slider("Variazione dei ricavi", "ricaviPct", -50, 100),
          slider("Variazione dei costi", "costiPct", -50, 100),
          bottone("Azzera scenario", { variante: "ghost", piccolo: true, icona: "ricarica", onClick: () => {
            s.ricaviPct = 0;
            s.costiPct = 0;
            ctx.aggiorna();
          } })
        )
      ),
      scheda(
        { titolo: "Regime ordinario", sottotitolo: "Parametri per il confronto" },
        h(
          "div",
          { classe: "pila", style: "gap:14px" },
          h("div", { classe: "griglia-campi stretta" }, campo("Add. regionale (%)", numero("addReg", { step: "0.01" })), campo("Add. comunale (%)", numero("addCom", { step: "0.01" }))),
          campo("Altre detrazioni IRPEF (\u20AC)", numero("detrazioni"), "Quella per lavoro autonomo \xE8 automatica."),
          campo("Altri redditi imponibili (\u20AC)", numero("altriRedditi")),
          campo("Perdite pregresse (\u20AC)", numero("perdite")),
          h("label", { classe: "spunta" }, h("input", { type: "checkbox", checked: s.senzaDetrAut, onChange: (e) => {
            s.senzaDetrAut = e.target.checked;
            ricalcola();
          } }), "Escludi la detrazione per lavoro autonomo"),
          h("label", { classe: "spunta" }, h("input", { type: "checkbox", checked: s.irap, onChange: (e) => {
            s.irap = e.target.checked;
            ricalcola();
          } }), "Soggetto a IRAP (3,9%)")
        )
      )
    );
    ricalcola();
    return h(
      "div",
      { classe: "pila" },
      testataCliente(ctx, r, []),
      testataPagina("Simulazione forfettario e ordinario", `Anno ${anno2} \xB7 parti dai dati registrati e prova scenari diversi`),
      esatto ? null : avviso("attenzione", "Parametri non disponibili per questo anno.", `Il confronto usa i parametri ${annoUsato}.`),
      h("div", { classe: "layout-simulazione" }, pannello, risultati)
    );
  }

  // js/ui/viste/scadenze.js
  var num2 = (v) => Number.isFinite(Number(v)) ? Number(v) : 0;
  function vistaScadenze(ctx) {
    var _a, _b;
    const { archivio: archivio2, dati, cliente: c, anno: P3, oggi } = ctx;
    const eCassa = c.previdenza.tipo === "cassa";
    const ivs = c.previdenza.tipo === "artigiani" || c.previdenza.tipo === "commercianti";
    const s = (_a = ctx.stato)[_b = `scad:${c.id}:${P3}`] ?? (_a[_b] = { over: {}, proroga: P3 === 2026, rata1: dati.impostazioni?.ripartizioneAcconti ?? 0.5 });
    const risultato = scadenzarioCliente(c, dati, P3, ctx.paramsPer, { ...s.over, proroga: s.proroga, rata1: s.rata1 });
    const { voci, stima, effettivi, paramsInfo, paramsPrecInfo } = risultato;
    const sorgente = ctx.riepilogo();
    const segna = async (v) => {
      await archivio2.modifica((d) => {
        const cl = d.clienti.find((x) => x.id === c.id);
        cl.pagati ?? (cl.pagati = {});
        const k = `${P3}:${v.id}`;
        if (cl.pagati[k]) delete cl.pagati[k];
        else cl.pagati[k] = oggi;
      });
    };
    const daVersare = voci.filter((v) => v.tipo !== "adempimento" && !v.versata);
    const totaleDa = round2(daVersare.filter((v) => v.data && v.data >= oggi).reduce((t, v) => t + v.importo, 0));
    const scaduto = round2(daVersare.filter((v) => v.data && v.data < oggi).reduce((t, v) => t + v.importo, 0));
    const prossima = daVersare.find((v) => v.data && v.data >= oggi && v.importo > 0);
    const perData = /* @__PURE__ */ new Map();
    for (const v of voci) if (v.data && v.importo > 0 && v.tipo !== "adempimento" && !v.versata) perData.set(v.data, round2((perData.get(v.data) ?? 0) + v.importo));
    const gruppi = /* @__PURE__ */ new Map();
    for (const v of voci.filter((x) => x.data)) {
      const k = v.data.slice(0, 7);
      (gruppi.get(k) ?? gruppi.set(k, []).get(k)).push(v);
    }
    const senzaData = voci.filter((v) => !v.data);
    const ripartizione = h(
      "select",
      { classe: "input", onChange: (e) => {
        s.rata1 = Number(e.target.value);
        ctx.aggiorna();
      } },
      h("option", { value: "0.5", selected: s.rata1 === 0.5 }, "50% + 50% (attivit\xE0 con ISA)"),
      h("option", { value: "0.4", selected: s.rata1 === 0.4 }, "40% + 60% (attivit\xE0 senza ISA)")
    );
    const modifica = (chiave, valore) => {
      if (valore === "" || valore === null) delete s.over[chiave];
      else s.over[chiave] = num2(valore);
      ctx.aggiorna();
    };
    function apriBase() {
      const salvato = c.versamenti?.[P3 - 1] ?? {};
      const campoNum = (et, chiave, stimaVal, aiuto) => campo(et, h("input", { type: "number", step: "0.01", min: "0", valore: s.over[chiave] ?? "", placeholder: stimaVal.toFixed(2), onInput: (e) => modifica2(chiave, e.target.value) }), aiuto);
      const tmp = { ...s.over };
      const modifica2 = (chiave, v) => {
        if (v === "") delete tmp[chiave];
        else tmp[chiave] = num2(v);
      };
      const dlg = apriDialogo({
        titolo: `Base di calcolo ${P3 - 1}`,
        largo: true,
        corpo: h(
          "div",
          { classe: "pila", style: "gap:16px" },
          h("p", { classe: "muted" }, "Gli importi sono stimati dai dati registrati. Inserisci i valori della dichiarazione per sostituire le stime (il campo vuoto usa la stima)."),
          h(
            "div",
            { classe: "griglia-campi" },
            campoNum(`Imposta sostitutiva dovuta ${P3 - 1} (\u20AC)`, "imposta", stima.imposta),
            campoNum(`Acconti imposta versati per il ${P3 - 1} (\u20AC)`, "accSost", stima.accSost, `Stima: ${euro(stima.accSost)} (metodo storico).`),
            eCassa ? null : campoNum(`Contributi INPS dovuti ${P3 - 1} (\u20AC)`, "contributi", stima.contributi.totale),
            eCassa ? null : campoNum(`Acconti INPS versati per il ${P3 - 1} (\u20AC)`, "accInps", stima.accInps),
            c.previdenza.tipo === "gestione-separata" || ivs ? campoNum(`Reddito ${P3 - 1} per gli acconti INPS (\u20AC)`, "reddito", stima.reddito) : null
          )
        ),
        azioni: [
          bottone("Annulla", { onClick: () => dlg.chiudi() }),
          bottone("Applica", { onClick: () => {
            s.over = tmp;
            dlg.chiudi();
            ctx.aggiorna();
          } }),
          bottone("Applica e salva nel cliente", { variante: "primario", onClick: async () => {
            s.over = tmp;
            await archivio2.modifica((d) => {
              const cl = d.clienti.find((x) => x.id === c.id);
              cl.versamenti = { ...cl.versamenti, [P3 - 1]: { ...cl.versamenti[P3 - 1] ?? {}, sostitutiva: effettivi.accSost, inps: effettivi.accInps, ...tmp.accSost !== void 0 ? { sostitutiva: tmp.accSost } : {}, ...tmp.accInps !== void 0 ? { inps: tmp.accInps } : {} } };
            });
            dlg.chiudi();
            ctx.toast("Acconti versati salvati.");
          } })
        ]
      });
    }
    function apriCassa() {
      const nuova = { data: "", descrizione: "", importo: 0 };
      const dlg = apriDialogo({
        titolo: "Versamento alla cassa professionale",
        corpo: h(
          "form",
          { classe: "pila", style: "gap:14px", onSubmit: (e) => e.preventDefault() },
          h("p", { classe: "muted" }, "Importi e scadenze dipendono dalla cassa di appartenenza: inseriscili dal regolamento o dalla comunicazione ricevuta."),
          campo("Data", h("input", { type: "date", required: true, onInput: (e) => {
            nuova.data = e.target.value;
          } })),
          campo("Descrizione", h("input", { type: "text", required: true, onInput: (e) => {
            nuova.descrizione = e.target.value;
          } })),
          campo("Importo (\u20AC)", h("input", { type: "number", step: "0.01", min: "0", required: true, onInput: (e) => {
            nuova.importo = num2(e.target.value);
          } }))
        ),
        azioni: [bottone("Annulla", { onClick: () => dlg.chiudi() }), bottone("Aggiungi", { variante: "primario", onClick: async () => {
          if (!nuova.data || !nuova.descrizione) return;
          await archivio2.modifica((d) => {
            const cl = d.clienti.find((x) => x.id === c.id);
            cl.scadenzeCassa = [...cl.scadenzeCassa ?? [], { ...nuova, anno: P3 }];
          });
          dlg.chiudi();
          ctx.toast("Versamento aggiunto.");
        } })]
      });
    }
    return h(
      "div",
      { classe: "pila" },
      testataCliente(ctx, sorgente, []),
      testataPagina("Scadenzario", `Versamenti ${P3}: saldo ${P3 - 1} e acconti ${P3}`, [
        bottone("Base di calcolo", { icona: "impostazioni", onClick: apriBase }),
        eCassa ? bottone("Aggiungi versamento cassa", { icona: "piu", onClick: apriCassa }) : null,
        bottone("CSV", { icona: "scarica", onClick: () => scarica(`scadenzario-${P3}-${c.nome.replace(/\W+/g, "_")}.csv`, csvScadenzario(voci), "text/csv;charset=utf-8") }),
        bottone("PDF", { variante: "primario", icona: "pdf", onClick: () => esportaPdf((J) => pdfScadenzario(J, { voci, cliente: c, anno: P3, studio: ctx.studio, stime: { imposta: effettivi.imposta, accSost: effettivi.accSost, contributi: effettivi.contributi, accInps: effettivi.accInps } }), `scadenzario-${P3}-${c.nome.replace(/\W+/g, "-")}.pdf`) })
      ]),
      paramsInfo.esatto ? null : avviso("attenzione", "Parametri non disponibili per questo anno.", `Date e aliquote usano i parametri ${paramsInfo.annoUsato}.`),
      h(
        "div",
        { classe: "tiles" },
        tile("Da versare", euro(totaleDa), { icona: "calendario", nota: prossima ? `Prossima: ${dataIt(prossima.data)}` : "Nessuna scadenza futura", evidenza: true }),
        tile("Scaduto non versato", euro(scaduto), { icona: "avviso", nota: scaduto ? "Segna come versato o valuta il ravvedimento" : "Tutto in regola" }),
        tile(`Imposta sostitutiva ${P3 - 1}`, euro(effettivi.imposta), { icona: "scudo", nota: s.over.imposta !== void 0 ? "Valore inserito" : "Stima dai dati registrati" }),
        eCassa ? tile("Contributi cassa", "Manuali", { icona: "utente", nota: "Inseriti dall\u2019utente" }) : tile(`Contributi INPS ${P3 - 1}`, euro(effettivi.contributi), { icona: "utente", nota: s.over.contributi !== void 0 ? "Valore inserito" : "Stima dai dati registrati" })
      ),
      h(
        "div",
        { classe: "griglia-2-1" },
        scheda(
          { senzaPadding: true },
          voci.length === 0 ? vuoto({ icona: "calendario", titolo: "Nessun versamento" }) : [...gruppi.entries()].map(([k, vs]) => h("div", null, h("div", { classe: "intestazione-mese" }, `${MESI_LUNGHI[Number(k.slice(5)) - 1]} ${k.slice(0, 4)}`), h("ul", { classe: "timeline" }, vs.map((v) => voceAgenda(v, { onVersata: segna }))))).concat(senzaData.length ? [h("div", { classe: "intestazione-mese" }, "Senza data"), h("ul", { classe: "timeline" }, senzaData.map((v) => h("li", { classe: "voce-agenda", style: "grid-template-columns:1fr" }, h("div", null, h("strong", null, v.descrizione), h("div", { classe: "muted piccolo" }, v.nota)))))] : [])
        ),
        h(
          "div",
          { classe: "pila" },
          scheda(
            { titolo: "Totali per data", sottotitolo: "Per compilare un unico F24" },
            perData.size ? h("dl", { classe: "dl" }, [...perData.entries()].flatMap(([d, t]) => [h("dt", null, dataIt(d)), h("dd", { classe: "numero" }, euro(t))])) : h("p", { classe: "muted" }, "Nessun versamento in sospeso.")
          ),
          scheda(
            { titolo: "Impostazioni di calcolo" },
            h(
              "div",
              { classe: "pila", style: "gap:14px" },
              campo("Ripartizione degli acconti", ripartizione, "Risoluzione AdE 93/E del 12/11/2019: 50% + 50% per i forfettari con attivit\xE0 soggette a ISA; 40% + 60% negli altri casi."),
              P3 === 2026 ? h("label", { classe: "spunta" }, h("input", { type: "checkbox", checked: s.proroga, onChange: (e) => {
                s.proroga = e.target.checked;
                ctx.aggiorna();
              } }), h("span", null, "Saldo e primo acconto prorogati al 20 luglio ", h("span", { classe: "muted" }, "(art. 6 DL 89/2026, effetti fatti salvi dalla L. 113/2026)"))) : null,
              h("div", { classe: "muted piccolo" }, `Base di calcolo: anno ${P3 - 1} (parametri ${paramsPrecInfo.annoUsato}).`)
            )
          ),
          avviso("info", "Stima indicativa.", ivs ? "Per artigiani e commercianti gli importi ufficiali sono nel Cassetto previdenziale INPS (\u201CDati del mod. F24\u201D)." : "Verifica gli importi con la dichiarazione dei redditi.")
        )
      )
    );
  }

  // js/fiscal/params/fonti.js
  var V = "verificato";
  var P2 = "parziale";
  var D = "da-confermare";
  var COMUNI_FORFETTARIO = [
    ["Regime forfettario", "Soglia di ricavi o compensi per accesso e permanenza", "85.000 \u20AC", V, "L. 190/2014 art. 1 c. 54; AdE, istruzioni Redditi PF 2026 (fasc. 3)"],
    ["Regime forfettario", "Uscita nell\u2019anno stesso", "Oltre 100.000 \u20AC", V, "L. 190/2014 art. 1 c. 71 (L. 197/2022); il reddito dell\u2019intero anno si determina con le regole ordinarie (Circ. AdE 32/E 2023)"],
    ["Regime forfettario", "Aliquota dell\u2019imposta sostitutiva", "15%", V, "L. 190/2014 art. 1 c. 64 (Normattiva)"],
    ["Regime forfettario", "Aliquota startup", "5% per l\u2019anno di inizio e i quattro successivi", V, "L. 190/2014 art. 1 c. 65: tre condizioni (Normattiva)"],
    ["Regime forfettario", "Coefficienti di redditivit\xE0", "40% \xB7 54% \xB7 62% \xB7 67% \xB7 78% \xB7 86% per gruppo di settore", V, "Allegato 4 L. 190/2014 (testo AdE); per i codici ATECO 2025 vale il coefficiente del codice ATECO 2007 corrispondente (art. 1 D.Lgs. 81/2025, istruzioni Redditi PF 2026)"],
    ["Regime forfettario", "Raccordo ATECO 2025 \u2192 gruppo di settore", "Tavola ISTAT 2025\u20132022", P2, "ISTAT; in 142 codici su 1.289 il raccordo non \xE8 univoco: l\u2019app fa scegliere il gruppo"],
    ["Regime forfettario", "Contributi previdenziali deducibili", "Nell\u2019anno di versamento (cassa)", V, "L. 190/2014 art. 1 c. 64; l\u2019eccedenza \xE8 deducibile dal reddito complessivo"],
    ["Regime forfettario", "Bollo sulle fatture", "2 \u20AC oltre 77,47 \u20AC (fatture senza IVA)", V, "AdE, guida sul bollo delle fatture elettroniche (giugno 2026); Circ. 19/E 2020"],
    ["Versamenti", "Versamento del bollo", "Trimestrale con F24: 31/5, 30/9, 30/11, 28/2 (codici 2521\u20132524); differimento se l\u2019importo non supera 5.000 \u20AC", V, "AdE, guida sul bollo delle fatture elettroniche (giugno 2026)"],
    ["Regime forfettario", "Riduzione contributiva IVS", "35% su domanda", V, "L. 190/2014 art. 1 c. 77; INPS circ. 14/2026 (domanda entro il 28/2 per i nuovi iscritti)"]
  ];
  var FONTI = {
    2026: [
      ["Regime forfettario", "Limite di reddito da lavoro dipendente o assimilato", "35.000 \u20AC (2025\u20132026), poi 30.000 \u20AC", V, "L. 199/2025 art. 1 c. 27, citata nelle istruzioni Redditi PF 2026 (AdE)"],
      ...COMUNI_FORFETTARIO,
      ["Versamenti", "Acconti dell\u2019imposta sostitutiva", "50% + 50% (40% + 60% se l\u2019attivit\xE0 non ha un ISA)", V, "Risoluzione AdE 93/E del 12/11/2019 (art. 58 DL 124/2019); art. 17 c. 3 DPR 435/2001"],
      ["Versamenti", "Soglie degli acconti", "Nessun acconto fino a 51,65 \u20AC; rata unica sotto 257,52 \u20AC", P2, "Istruzioni Redditi PF 2026 (257,52 \u20AC; 52 \u20AC arrotondati)"],
      ["Versamenti", "Codici tributo F24", "1790 prima rata \xB7 1791 seconda rata o unica \xB7 1792 saldo", V, "Risoluzione AdE 59/E dell\u201911/6/2015; istruzioni Redditi PF 2026"],
      ["Versamenti", "Scadenze ordinarie", "30 giugno, 30 novembre, dichiarazione 31 ottobre", P2, "Se cadono in giorno festivo slittano al primo giorno lavorativo (implementato)"],
      ["Versamenti", "Proroga 2026 di saldo e primo acconto", "20 luglio; entro il 20 agosto con +0,80%", P2, "Art. 6 DL 89/2026 (abrogato dalla L. 113/2026 con effetti fatti salvi: art. 1 c. 2); scadenzario AdE; testo dell\u2019art. 6 non letto"],
      ["Gestione Separata", "Aliquote", "26,07% (25% + 0,72% + 0,35% ISCRO) \xB7 24% con altra copertura", V, "INPS, circolare 8 del 3/2/2026"],
      ["Gestione Separata", "Minimale e massimale", "18.808 \u20AC \xB7 122.295 \u20AC", V, "INPS, circolare 8 del 3/2/2026"],
      ["Gestione Separata", "Acconti", "Aliquota dell\u2019anno sull\u201980% del reddito dell\u2019anno precedente, due rate uguali", V, "AdE, istruzioni Redditi PF 2026 fasc. 2 (Quadro RR)"],
      ["Gestione Separata", "Causali F24", "PXX (26,07%) \xB7 P10 (24%)", V, "INPS circ. 105/2025; istruzioni Redditi PF 2026"],
      ["Artigiani e commercianti", "Aliquote IVS", "24% / 24,48%; +1 punto oltre 56.224 \u20AC", V, "INPS, circolare 14 del 9/2/2026"],
      ["Artigiani e commercianti", "Minimale e contributi fissi", "18.808 \u20AC \xB7 4.521,36 \u20AC artigiani \xB7 4.611,64 \u20AC commercianti", V, "INPS, circolare 14/2026 (maternit\xE0 7,44 \u20AC inclusa)"],
      ["Artigiani e commercianti", "Massimale", "93.707 \u20AC (anzianit\xE0 al 31/12/1995) \xB7 122.295 \u20AC (dal 1996)", V, "INPS, circolare 14/2026 p. 4"],
      ["Artigiani e commercianti", "Rate dei contributi fissi", "16 maggio (18/5 nel 2026), 20 agosto, 16 novembre, 16 febbraio", V, "INPS circ. 14/2026 p. 9. La scheda sul portale INPS riporta 17 novembre: discrepanza non risolta"],
      ["Artigiani e commercianti", "Acconti sulla quota eccedente il minimale", "100% del contributo sul reddito dell\u2019anno precedente, in due rate uguali", P2, "INPS (due acconti di pari importo sul reddito dell\u2019anno precedente) ed esempi di prassi; importi ufficiali nel Cassetto previdenziale"],
      ["Artigiani e commercianti", "Causali F24", "AF/CF minimale \xB7 AP/CP quota eccedente", V, 'INPS, scheda "F24 per artigiani e commercianti"'],
      ["IRPEF (regime ordinario)", "Scaglioni", "23% fino a 28.000 \u20AC \xB7 33% fino a 50.000 \u20AC \xB7 43% oltre", V, 'Art. 11 c. 1 TUIR come modificato dalla L. 199/2025 art. 1 c. 3; AdE, scheda "Aliquote e calcolo dell\u2019Irpef"; dossier Camera'],
      ["IRPEF (regime ordinario)", "Detrazione per lavoro autonomo", "1.265 \u20AC fino a 5.500 \u20AC \xB7 formule fino a 50.000 \u20AC \xB7 +50 \u20AC tra 11.000 e 17.000 \u20AC", V, "Art. 13 c. 5 e 5-ter TUIR; AdE, specifiche tecniche Redditi PF 2026 (quoziente a 4 decimali)"],
      ["IRPEF (regime ordinario)", "Aliquota IRAP ordinaria", "3,9%", V, "AdE, istruzioni IRAP 2026; le regioni possono variarla; i professionisti senza autonoma organizzazione ne sono esclusi"]
    ],
    2025: [
      ["Regime forfettario", "Limite di reddito da lavoro dipendente o assimilato", "35.000 \u20AC", P2, "L. 207/2024 art. 1 c. 12 (fonti secondarie concordi)"],
      ...COMUNI_FORFETTARIO,
      ["Versamenti", "Acconti dell\u2019imposta sostitutiva", "50% + 50% (40% + 60% se l\u2019attivit\xE0 non ha un ISA)", V, "Risoluzione AdE 93/E del 12/11/2019"],
      ["Versamenti", "Codici tributo F24", "1790 \xB7 1791 \xB7 1792", V, "Risoluzione AdE 59/E del 11/6/2015"],
      ["Gestione Separata", "Aliquote", "26,07% \xB7 24% con altra copertura", V, "INPS, circolare 27 del 30/1/2025"],
      ["Gestione Separata", "Minimale e massimale", "18.555 \u20AC \xB7 120.607 \u20AC", V, "INPS, circolare 27/2025"],
      ["Artigiani e commercianti", "Aliquote IVS", "24% / 24,48%; +1 punto oltre 55.448 \u20AC", V, "INPS, circolare 38 del 7/2/2025"],
      ["Artigiani e commercianti", "Minimale e contributi fissi", "18.555 \u20AC \xB7 4.460,64 \u20AC artigiani \xB7 4.549,70 \u20AC commercianti", V, "INPS, circolare 38/2025"],
      ["Artigiani e commercianti", "Massimale", "92.413 \u20AC (anzianit\xE0 al 31/12/1995) \xB7 120.607 \u20AC (dal 1996)", V, "INPS, circolare 38/2025"],
      ["Artigiani e commercianti", "Rate dei contributi fissi", "16 maggio, 20 agosto, 17 novembre (16/11 domenica), 16 febbraio 2026", V, "INPS, circolare 38/2025"],
      ["IRPEF (regime ordinario)", "Scaglioni", "23% fino a 28.000 \u20AC \xB7 35% fino a 50.000 \u20AC \xB7 43% oltre", P2, "Disciplina previgente alla L. 199/2025: fonti secondarie"],
      ["IRPEF (regime ordinario)", "Detrazione per lavoro autonomo", "Come 2026", V, "AdE, specifiche tecniche Redditi PF 2026"]
    ]
  };
  var STATI = { [V]: "Verificato", [P2]: "Parziale", [D]: "Da confermare" };

  // js/ui/viste/parametri.js
  function vistaParametri(ctx) {
    const anni = anniDisponibili();
    const selezionato = ctx.stato.annoParametri && anni.includes(ctx.stato.annoParametri) ? ctx.stato.annoParametri : anni.includes(ctx.anno) ? ctx.anno : anni[anni.length - 1];
    const voci = FONTI[selezionato] ?? [];
    const sezioni = /* @__PURE__ */ new Map();
    for (const v of voci) (sezioni.get(v[0]) ?? sezioni.set(v[0], []).get(v[0])).push(v);
    const conta = (stato2) => voci.filter((v) => v[3] === stato2).length;
    const tipo = { verificato: "ok", parziale: "attenzione", "da-confermare": "errore" };
    const icn = { verificato: "spunta", parziale: "info", "da-confermare": "avviso" };
    return h(
      "div",
      { classe: "pila" },
      testataPagina("Parametri fiscali", "Ogni valore usato nei calcoli, con la fonte e lo stato di verifica", [
        h("div", { classe: "segmenti", role: "group", "aria-label": "Anno dei parametri" }, anni.map((a) => h("button", { type: "button", "aria-pressed": String(a === selezionato), onClick: () => {
          ctx.stato.annoParametri = a;
          ctx.aggiorna();
        } }, String(a))))
      ]),
      avviso("info", "Trasparenza dei calcoli.", "I parametri sono in file separati per anno (js/fiscal/params). Sono stati letti su circolari INPS, istruzioni dell\u2019Agenzia delle Entrate e norme; dove la fonte \xE8 solo secondaria la voce \xE8 segnata come parziale o da confermare."),
      h(
        "div",
        { classe: "tiles" },
        h("div", { classe: "tile" }, h("div", { classe: "tile-etichetta" }, chip("ok", "Verificato", "spunta")), h("div", { classe: "tile-valore" }, String(conta("verificato"))), h("div", { classe: "tile-nota" }, "Letti sul testo ufficiale")),
        h("div", { classe: "tile" }, h("div", { classe: "tile-etichetta" }, chip("attenzione", "Parziale", "info")), h("div", { classe: "tile-valore" }, String(conta("parziale"))), h("div", { classe: "tile-nota" }, "Fonti ufficiali in parte o secondarie")),
        h("div", { classe: "tile" }, h("div", { classe: "tile-etichetta" }, chip("errore", "Da confermare", "avviso")), h("div", { classe: "tile-valore" }, String(conta("da-confermare"))), h("div", { classe: "tile-nota" }, "Da riscontrare con una fonte"))
      ),
      ...[...sezioni.entries()].map(([nome, righe]) => scheda(
        { titolo: nome, senzaPadding: true },
        h("div", { classe: "tabella-contenitore" }, h(
          "table",
          { classe: "tabella" },
          h("thead", null, h("tr", null, h("th", null, "Parametro"), h("th", null, "Valore"), h("th", null, "Stato"), h("th", null, "Fonte"))),
          h("tbody", null, righe.map(([, voce, valore, stato2, fonte]) => h(
            "tr",
            null,
            h("td", { style: "min-width:200px" }, h("strong", null, voce)),
            h("td", { style: "min-width:200px" }, valore),
            h("td", null, chip(tipo[stato2], STATI[stato2], icn[stato2])),
            h("td", { classe: "muted", style: "min-width:260px;font-size:13px" }, fonte)
          )))
        ))
      ))
    );
  }

  // js/ui/viste/sicurezza.js
  function vistaSicurezza(ctx) {
    const { archivio: archivio2 } = ctx;
    const esitoImport = h("div");
    const esitoPw = h("div");
    let blobDaImportare = null;
    const nomeFile = h("span", { classe: "muted" });
    const pwBackup = h("input", { type: "password", autocomplete: "current-password" });
    const attuale = h("input", { type: "password", autocomplete: "current-password", required: true });
    const nuova = h("input", { type: "password", autocomplete: "new-password", required: true, minlength: "10" });
    const nuova2 = h("input", { type: "password", autocomplete: "new-password", required: true });
    const min = h(
      "select",
      { classe: "input", onChange: async (e) => {
        await archivio2.modifica((d) => {
          d.ui.bloccoMin = Number(e.target.value);
        });
        ctx.toast("Blocco automatico aggiornato.");
      } },
      [[5, "5 minuti"], [15, "15 minuti"], [30, "30 minuti"], [60, "1 ora"], [0, "Mai"]].map(([v, t]) => h("option", { value: v, selected: v === (ctx.dati.ui.bloccoMin ?? 15) }, t))
    );
    return h(
      "div",
      { classe: "pila" },
      testataPagina("Backup e sicurezza", "I dati restano nel browser, cifrati con la tua password"),
      h(
        "div",
        { classe: "griglia-2" },
        scheda(
          { titolo: "Esporta backup", sottotitolo: "File cifrato con la password dell\u2019archivio" },
          h(
            "div",
            { classe: "pila", style: "gap:14px" },
            h("p", { classe: "muted" }, "Conserva una copia fuori dal browser (disco esterno, cloud personale). Solo chi conosce la password pu\xF2 leggerla."),
            bottone("Scarica backup", { variante: "primario", icona: "scarica", onClick: async () => {
              const b = await archivio2.esporta();
              scarica(`gestione-forfettario-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, JSON.stringify(b));
              ctx.toast("Backup scaricato.");
            } }),
            h("div", null, chip("neutro", "AES-256-GCM", "scudo"), " ", chip("neutro", "PBKDF2 600.000 iterazioni"))
          )
        ),
        scheda(
          { titolo: "Ripristina da backup", sottotitolo: "Sostituisce tutti i dati attuali" },
          h(
            "div",
            { classe: "pila", style: "gap:14px" },
            zonaRilascio({ testo: "Scegli il file di backup", accept: ".json,application/json", multiplo: false, onFile: async ([file]) => {
              try {
                blobDaImportare = JSON.parse(await file.text());
                nomeFile.textContent = file.name;
                esitoImport.replaceChildren(avviso("info", `File selezionato: ${file.name}.`, "Inserisci la password del backup e conferma."));
              } catch {
                esitoImport.replaceChildren(avviso("errore", "File non valido."));
              }
            } }),
            nomeFile,
            campo("Password del backup", pwBackup),
            esitoImport,
            bottone("Ripristina", { variante: "pericolo", icona: "ricarica", onClick: async () => {
              if (!blobDaImportare) return esitoImport.replaceChildren(avviso("errore", "Scegli prima un file di backup."));
              if (!await ctx.conferma({ titolo: "Sostituire tutti i dati?", testo: "I dati attuali verranno sostituiti con quelli del backup.", etichetta: "Ripristina", pericolo: true })) return;
              try {
                await archivio2.importa(blobDaImportare, pwBackup.value);
                ctx.toast("Backup ripristinato.");
              } catch (e) {
                esitoImport.replaceChildren(avviso("errore", e instanceof ErrorePassword ? "Password errata o file danneggiato." : `Errore: ${e.message}`));
              }
            } })
          )
        )
      ),
      h(
        "div",
        { classe: "griglia-2" },
        scheda(
          { titolo: "Cambia password" },
          h(
            "form",
            { classe: "pila", style: "gap:14px", onSubmit: async (e) => {
              e.preventDefault();
              if (nuova.value !== nuova2.value) return esitoPw.replaceChildren(avviso("errore", "Le nuove password non coincidono."));
              try {
                await archivio2.cambiaPassword(attuale.value, nuova.value);
                attuale.value = nuova.value = nuova2.value = "";
                esitoPw.replaceChildren(avviso("ok", "Password cambiata.", "Esporta un nuovo backup: quelli precedenti restano apribili solo con la vecchia password."));
              } catch (err) {
                esitoPw.replaceChildren(avviso("errore", err instanceof ErrorePassword ? "Password attuale errata." : err.message));
              }
            } },
            campo("Password attuale", attuale),
            campo("Nuova password (almeno 10 caratteri)", nuova),
            campo("Ripeti la nuova password", nuova2),
            esitoPw,
            h("div", null, bottone("Cambia password", { variante: "primario", tipo: "submit" }))
          )
        ),
        scheda(
          { titolo: "Blocco automatico", sottotitolo: "Richiede di nuovo la password dopo un periodo di inattivit\xE0" },
          h(
            "div",
            { classe: "pila", style: "gap:14px" },
            campo("Blocca dopo", min),
            avviso("info", "Password non recuperabile.", "Non esiste un reset: senza la password i dati non si possono leggere. Conserva un backup e la password in luoghi sicuri.")
          )
        )
      ),
      scheda(
        { titolo: "Zona pericolosa", sottotitolo: "Azioni irreversibili", classe: "scheda-pericolo" },
        h(
          "div",
          { classe: "riga-pericolo" },
          h(
            "div",
            null,
            h("strong", null, "Elimina tutto l\u2019archivio e riparti da zero"),
            h("p", { classe: "muted" }, "Cancella dal browser clienti, fatture, spese, impostazioni e password. Dopo l\u2019eliminazione l\u2019app torna alla schermata di primo avvio. Scarica prima un backup se vuoi poter tornare indietro.")
          ),
          h(
            "div",
            { classe: "gruppo-azioni" },
            bottone("Scarica backup", { icona: "scarica", onClick: async () => {
              const b = await archivio2.esporta();
              scarica(`gestione-forfettario-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, JSON.stringify(b));
              ctx.toast("Backup scaricato.");
            } }),
            bottone("Elimina archivio\u2026", { variante: "pericolo", icona: "cestino", onClick: () => ctx.eliminaArchivio() })
          )
        )
      )
    );
  }

  // js/ui/viste/impostazioni.js
  function vistaImpostazioni(ctx) {
    const { archivio: archivio2, dati } = ctx;
    const studio = structuredClone(dati.impostazioni.studio);
    const testo2 = (chiave, etichetta, props = {}) => campo(etichetta, h("input", { classe: "input", type: "text", valore: studio[chiave] ?? "", onInput: (e) => {
      studio[chiave] = e.target.value;
    }, ...props }));
    const nDemo = dati.clienti.filter(eDemo).length;
    const tema = dati.ui.tema ?? "auto";
    const salva = async () => {
      await archivio2.modifica((d) => {
        d.impostazioni.studio = studio;
      });
      ctx.toast("Dati dello studio salvati.");
    };
    return h(
      "div",
      { classe: "pila" },
      testataPagina("Impostazioni"),
      scheda(
        { titolo: "Dati dello studio", sottotitolo: "Compaiono nell\u2019intestazione dei PDF e nel menu" },
        h(
          "form",
          { classe: "pila", style: "gap:16px", onSubmit: (e) => {
            e.preventDefault();
            salva();
          } },
          h("div", { classe: "griglia-campi" }, testo2("nome", "Nome dello studio", { placeholder: "Studio Rossi & Associati" }), testo2("descrizione", "Descrizione", { placeholder: "Dottori commercialisti" }), testo2("partitaIva", "Partita IVA")),
          h("div", { classe: "griglia-campi" }, testo2("indirizzo", "Indirizzo"), testo2("telefono", "Telefono"), testo2("email", "Email", { type: "email" }), testo2("pec", "PEC", { type: "email" })),
          h("div", null, bottone("Salva", { variante: "primario", tipo: "submit", icona: "spunta" }))
        )
      ),
      scheda(
        { titolo: "Aspetto" },
        h(
          "div",
          { classe: "riga-flex" },
          h("div", { classe: "segmenti", role: "group", "aria-label": "Tema" }, [["auto", "Automatico"], ["chiaro", "Chiaro"], ["scuro", "Scuro"]].map(([v, t]) => h("button", { type: "button", "aria-pressed": String(tema === v), onClick: async () => {
            if (v === "auto") delete document.documentElement.dataset.tema;
            else document.documentElement.dataset.tema = v;
            try {
              localStorage.setItem("gf-tema", v);
            } catch {
            }
            await archivio2.modifica((d) => {
              d.ui.tema = v;
            });
          } }, t)))
        )
      ),
      scheda(
        { titolo: "Dati di esempio", sottotitolo: "Per dimostrazioni e prove" },
        h(
          "div",
          { classe: "pila", style: "gap:14px" },
          h("p", { classe: "muted" }, nDemo ? `Sono presenti ${nDemo} clienti di esempio (fatture, spese e scadenze incluse).` : "Aggiungi sette clienti inventati, con fatture e spese del periodo corrente, per esplorare l\u2019app."),
          h(
            "div",
            { classe: "gruppo-azioni" },
            bottone("Carica dati di esempio", { icona: "carica", onClick: ctx.caricaDemo, disabled: nDemo > 0 }),
            nDemo ? bottone("Rimuovi i dati di esempio", { variante: "pericolo", icona: "cestino", onClick: async () => {
              if (!await ctx.conferma({ titolo: "Rimuovere i dati di esempio?", testo: "Verranno eliminati solo i clienti di esempio con le loro fatture e spese.", etichetta: "Rimuovi", pericolo: true })) return;
              await archivio2.modifica((d) => {
                const ids = new Set(d.clienti.filter(eDemo).map((c) => c.id));
                d.clienti = d.clienti.filter((c) => !ids.has(c.id));
                d.fatture = d.fatture.filter((f) => !ids.has(f.clienteId));
                d.spese = d.spese.filter((s) => !ids.has(s.clienteId));
                if (ids.has(d.ui.clienteId)) d.ui.clienteId = d.clienti[0]?.id ?? null;
              });
              ctx.toast("Dati di esempio rimossi.");
            } }) : null
          )
        )
      )
    );
  }

  // js/app.js
  var VISTE = {
    "#/studio": vistaStudio,
    "#/clienti": vistaClienti,
    "#/agenda": vistaAgenda,
    "#/riepilogo": vistaRiepilogo,
    "#/anagrafica": vistaAnagrafica,
    "#/fatture": vistaFatture,
    "#/spese": vistaSpese,
    "#/simulazione": vistaSimulazione,
    "#/scadenze": vistaScadenze,
    "#/parametri": vistaParametri,
    "#/sicurezza": vistaSicurezza,
    "#/impostazioni": vistaImpostazioni
  };
  var radice = document.getElementById("app");
  var archivio = new Archivio(adattatoreIndexedDB());
  var stato = {};
  var timerBlocco = null;
  var listenerBloccoAttivi = false;
  var oggiIso = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  var annoOggi = () => Number(oggiIso().slice(0, 4));
  function leggiTemaLocale() {
    try {
      return localStorage.getItem("gf-tema") || "auto";
    } catch {
      return "auto";
    }
  }
  function applicaTema(tema) {
    if (tema === "chiaro" || tema === "scuro") document.documentElement.dataset.tema = tema;
    else delete document.documentElement.dataset.tema;
    try {
      localStorage.setItem("gf-tema", tema);
    } catch {
    }
  }
  var temaScuroAttivo = () => document.documentElement.dataset.tema === "scuro" || !document.documentElement.dataset.tema && matchMedia("(prefers-color-scheme: dark)").matches;
  function normalizza(d) {
    var _a, _b, _c, _d;
    d.ui ?? (d.ui = {});
    (_a = d.ui).tema ?? (_a.tema = "auto");
    (_b = d.ui).bloccoMin ?? (_b.bloccoMin = 15);
    d.impostazioni ?? (d.impostazioni = {});
    (_c = d.impostazioni).studio ?? (_c.studio = { nome: "", descrizione: "", indirizzo: "", telefono: "", email: "", pec: "", partitaIva: "" });
    (_d = d.impostazioni).ripartizioneAcconti ?? (_d.ripartizioneAcconti = 0.5);
    for (const c of d.clienti) {
      c.scadenzeCassa ?? (c.scadenzeCassa = []);
      c.versamenti ?? (c.versamenti = {});
      c.pagati ?? (c.pagati = {});
    }
  }
  async function eliminaArchivio() {
    const ok = await confermaDigitando({
      titolo: "Eliminare tutto l\u2019archivio?",
      testo: "Verranno cancellati definitivamente clienti, fatture, spese, impostazioni e la password. L\u2019operazione non si pu\xF2 annullare: se non hai un backup, i dati sono persi."
    });
    if (!ok) return false;
    await archivio.elimina();
    try {
      localStorage.removeItem("gf-tema");
    } catch {
    }
    for (const k of Object.keys(stato)) delete stato[k];
    history.replaceState(null, "", location.pathname + location.search);
    toast("Archivio eliminato. Puoi ripartire da zero.");
    return true;
  }
  function costruisciCtx() {
    const dati = archivio.dati;
    const anno2 = dati.ui.anno ?? (/* @__PURE__ */ new Date()).getFullYear();
    const cliente = dati.clienti.find((c) => c.id === dati.ui.clienteId) ?? dati.clienti[0] ?? null;
    const ctx = {
      archivio,
      dati,
      cliente,
      anno: anno2,
      oggi: oggiIso(),
      stato,
      studio: dati.impostazioni.studio,
      paramsPer: parametriPerAnno,
      ...parametriPerAnno(anno2),
      aggiorna: disegna,
      naviga: (p) => {
        location.hash = p;
      },
      toast,
      conferma,
      eliminaArchivio,
      /** Riepilogo di un cliente per un anno, con i parametri corretti per anno. */
      riepilogo: (c = cliente, a = anno2) => riepilogoAnno(c, dati, a, parametriPerAnno(a).params, { paramsPrec: parametriPerAnno(a - 1).params }),
      selezionaCliente: async (id2, dest) => {
        await archivio.modifica((d) => {
          d.ui.clienteId = id2;
        });
        if (dest) location.hash = dest;
      },
      impostaAnno: (a) => archivio.modifica((d) => {
        d.ui.anno = a;
      }),
      nuovoCliente: async () => {
        const c = nuovoCliente();
        await archivio.modifica((d) => {
          d.clienti.push(c);
          d.ui.clienteId = c.id;
        });
        location.hash = "#/anagrafica";
      },
      caricaDemo: async () => {
        const demo = generaDemo(oggiIso());
        for (const c of demo.clienti) {
          c.pagati = {};
          for (const v of scadenzarioCliente(c, demo, annoOggi(), parametriPerAnno).voci) {
            if (v.data && v.data < oggiIso() && v.importo > 0 && v.tipo !== "adempimento" && !(c.nome === "Luca Ferri" && v.id === "inps-fisso-2")) c.pagati[`${annoOggi()}:${v.id}`] = v.data;
          }
        }
        await archivio.modifica((d) => {
          var _a;
          d.clienti.push(...demo.clienti);
          d.fatture.push(...demo.fatture);
          d.spese.push(...demo.spese);
          (_a = d.ui).clienteId ?? (_a.clienteId = demo.clienti[0].id);
          if (!d.impostazioni.studio.nome) d.impostazioni.studio.nome = "Studio Demo";
        });
        toast("Dati di esempio caricati.");
      }
    };
    return ctx;
  }
  var azioniShell = () => ({
    naviga: (p) => {
      location.hash = p;
    },
    selezionaCliente: async (id2) => {
      await archivio.modifica((d) => {
        d.ui.clienteId = id2;
      });
    },
    nuovoCliente: () => costruisciCtx().nuovoCliente(),
    impostaAnno: (a) => archivio.modifica((d) => {
      d.ui.anno = a;
    }),
    blocca: () => archivio.blocca(),
    elimina: () => eliminaArchivio(),
    apriPalette: () => apriPalette(comandiPalette),
    cambiaTema: async () => {
      const nuovo = temaScuroAttivo() ? "chiaro" : "scuro";
      applicaTema(nuovo);
      await archivio.modifica((d) => {
        d.ui.tema = nuovo;
      });
    },
    temaScuro: temaScuroAttivo
  });
  function comandiPalette() {
    const d = archivio.dati;
    const pagine = ROTTE.map((r) => ({ testo: r.titolo, gruppo: r.gruppo === "cliente" ? "Cliente" : r.gruppo === "studio" ? "Studio" : "Sistema", icona: r.icona, esegui: () => {
      location.hash = r.path;
    } }));
    const clienti = d.clienti.map((c) => ({ testo: c.nome || "(senza nome)", gruppo: "Apri cliente", icona: "utente", esegui: async () => {
      await archivio.modifica((x) => {
        x.ui.clienteId = c.id;
      });
      location.hash = "#/riepilogo";
    } }));
    const azioni = [
      { testo: "Nuovo cliente", gruppo: "Azione", icona: "piu", esegui: () => costruisciCtx().nuovoCliente() },
      { testo: "Nuova fattura", gruppo: "Azione", icona: "documento", esegui: () => {
        stato.nuovaFattura = true;
        location.hash = "#/fatture";
        disegna();
      } },
      { testo: "Cambia tema chiaro / scuro", gruppo: "Azione", icona: "luna", esegui: azioniShell().cambiaTema },
      { testo: "Blocca archivio", gruppo: "Azione", icona: "lucchetto", esegui: () => archivio.blocca() },
      { testo: "Elimina tutto l\u2019archivio e riparti da zero", gruppo: "Azione", icona: "cestino", esegui: eliminaArchivio }
    ];
    return [...pagine, ...clienti, ...azioni];
  }
  function disegna() {
    if (!archivio.sbloccato) return mostraSblocco();
    const ctx = costruisciCtx();
    const rotta = ROTTE.find((r) => r.path === location.hash) ?? ROTTE[0];
    const contenuto = rotta.gruppo === "cliente" && !ctx.cliente ? h("div", null, VISTE["#/clienti"](ctx)) : VISTE[rotta.path](ctx);
    const imminenti = agendaStudio(archivio.dati, ctx.anno, parametriPerAnno, { soloFuture: false, oggi: ctx.oggi }).filter((v) => v.importo > 0 && !v.versata && v.tipo !== "adempimento" && v.data <= aggiungiGiorni2(ctx.oggi, 14) && v.data >= `${ctx.anno}-01-01`);
    const scrollY = window.scrollY;
    const cambiaRotta = location.hash !== stato.ultimaRotta;
    radice.replaceChildren(costruisciShell(ctx, rotta, contenuto, { imminenti, azioni: azioniShell() }));
    if (cambiaRotta) document.getElementById("contenuto")?.classList.add("entra");
    window.scrollTo(0, cambiaRotta ? 0 : scrollY);
    stato.ultimaRotta = location.hash;
    const etSalvato = document.getElementById("stato-salvato");
    if (etSalvato && stato.salvatoAlle) etSalvato.textContent = `Salvato ${stato.salvatoAlle.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}`;
    document.title = `${rotta.titolo} \xB7 Gestione Forfettario`;
  }
  var aggiungiGiorni2 = (iso3, n) => {
    const x = /* @__PURE__ */ new Date(`${iso3}T00:00:00Z`);
    x.setUTCDate(x.getUTCDate() + n);
    return x.toISOString().slice(0, 10);
  };
  async function mostraSblocco() {
    clearTimeout(timerBlocco);
    applicaTema(leggiTemaLocale());
    const esiste = await archivio.esiste();
    radice.replaceChildren(schermataSblocco(archivio, esiste, avviaSessione, {
      alEliminare: eliminaArchivio,
      alCreare: async ({ conDemo }) => {
        normalizza(archivio.dati);
        if (conDemo) await costruisciCtx().caricaDemo();
      }
    }));
    document.title = "Gestione Forfettario";
  }
  function avviaSessione() {
    normalizza(archivio.dati);
    applicaTema(archivio.dati.ui.tema);
    riparti();
    if (!listenerBloccoAttivi) {
      listenerBloccoAttivi = true;
      for (const ev of ["click", "keydown", "pointerdown"]) document.addEventListener(ev, riparti, { passive: true });
    }
    if (!location.hash) location.hash = "#/studio";
    disegna();
  }
  function riparti() {
    clearTimeout(timerBlocco);
    if (!archivio.sbloccato) return;
    const min = archivio.dati.ui?.bloccoMin ?? 15;
    if (min > 0) timerBlocco = setTimeout(() => archivio.blocca(), min * 60 * 1e3);
  }
  archivio.ascolta(() => {
    if (!archivio.sbloccato) mostraSblocco();
  });
  var modificaOriginale = archivio.modifica.bind(archivio);
  archivio.modifica = async (fn) => {
    const r = await modificaOriginale(fn);
    stato.salvatoAlle = /* @__PURE__ */ new Date();
    disegna();
    return r;
  };
  window.addEventListener("hashchange", () => {
    if (archivio.sbloccato) disegna();
  });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && archivio.sbloccato) {
      e.preventDefault();
      apriPalette(comandiPalette);
    }
  });
  mostraSblocco();
})();
