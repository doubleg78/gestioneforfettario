# Gestione Forfettario – Briefing di progetto

Webapp per la gestione di contribuenti in regime forfettario, sviluppata solo con **HTML + CSS + JavaScript** (nessun server, nessun build step).

## Decisioni prese

| Area | Scelta |
|---|---|
| Utenti | Studio professionale, **più contribuenti** con dati separati e selettore cliente |
| Tipologie INPS | **Tutti i casi**: Gestione Separata, artigiani/commercianti (IVS, minimale, riduzione 35%), casse professionali. La tipologia è un campo dell'anagrafica |
| Persistenza | Browser (IndexedDB) + export/import JSON |
| Privacy | Password all'apertura e **cifratura AES-GCM** (Web Crypto) di dati e backup |
| Normativa | **File di parametri per anno d'imposta**, modificabili senza toccare il codice |
| Architettura | Multi-file modulare (moduli ES), sidebar con selettore cliente, pubblicabile su GitHub Pages |
| Lingua | Italiano |

## Moduli del MVP

1. **Anagrafica e regime**: dati cliente, uno o più codici ATECO con coefficiente di redditività, data inizio attività, aliquota 5% (startup) o 15%, tipologia previdenziale.
2. **Fatture e incassi**: inserimento manuale, import CSV, import XML FatturaPA; criterio di cassa (data incasso); bollo da 2 € sopra 77,47 €; numerazione.
3. **Registro spese**: serve alla simulazione in regime ordinario.
4. **Calcolo imposte e contributi**: reddito imponibile, imposta sostitutiva, contributi INPS, acconti e saldi.
5. **Simulazione forfettario vs ordinario** con **scenari what-if** (ricavi, costi e deduzioni variabili in tempo reale): affiancamento di forfettario (coefficiente, sostitutiva, INPS) e ordinario (costi analitici, IRPEF a scaglioni, addizionali, INPS, IRAP), con netto e convenienza.
6. **Controlli sui requisiti**:
   - soglie ricavi 85.000 € (uscita dall'anno successivo) e 100.000 € (uscita immediata);
   - checklist delle cause di esclusione;
   - aliquota 5% startup (requisiti e anni residui);
   - ripartizione dei ricavi tra più ATECO.
7. **Scadenzario** fiscale e contributivo.

## Output

- Stampa/PDF del prospetto di calcolo e simulazione
- Export Excel/CSV
- Dati per F24 (importi e codici tributo)
- Dashboard grafica (ricavi, soglie, imposte)

## Struttura proposta

```
index.html
css/            stili (base, layout, componenti, stampa)
js/
  app.js        avvio, router a hash, stato
  storage/      IndexedDB, backup JSON, cifratura
  fiscal/       motore di calcolo puro (testabile)
    params/     un file per anno (2025.js, 2026.js, ...)
    forfettario.js  ordinario.js  inps.js  soglie.js  scadenze.js
  import/       csv.js, fatturapa.js
  ui/           viste: clienti, anagrafica, fatture, spese, simulazione, scadenze, dashboard
  export/       csv.js, print.js, f24.js
tests/          test del motore di calcolo (pagina HTML o Node)
```

## Piano di sviluppo

1. **Motore di calcolo** (logica pura + parametri per anno + test). Tutti i parametri vanno verificati su fonti ufficiali (Normattiva, Agenzia Entrate, INPS) prima di essere fissati.
2. **Interfaccia e dati** (fatta): sidebar con selettore cliente, archivio cifrato in IndexedDB con backup, anagrafica, fatture (manuale, CSV, XML FatturaPA), spese, riepilogo annuale.
3. **Simulazione, scadenzario, output e dashboard** (fatta): confronto forfettario/ordinario con scenari what-if e grafico, scadenzario con codici F24, grafici nel riepilogo, export CSV e stampa/PDF.

## Fase 1 completata

Motore di calcolo in `js/fiscal/`, parametri 2026 verificati (v. sotto). Le casse professionali usano un'aliquota soggettiva inserita dall'utente: manca una tabella per cassa.

## Stato delle verifiche normative (parametri 2026)

| Punto | Esito | Fonte |
|---|---|---|
| Riduzione contributi 35% | Verificato. Vale solo per artigiani/commercianti, su richiesta | L. 190/2014 art. 1 c. 77 (Normattiva) |
| Imponibile forfettario meno contributi versati | Verificato; l'eccedenza è deducibile dal reddito complessivo | L. 190/2014 c. 64 (Normattiva) |
| Condizioni aliquota 5% | Verificato; tre condizioni, implementate in `verificaRequisitiStartup` | L. 190/2014 c. 65 (Normattiva) |
| Cause di esclusione | Verificato, compresa la lett. d-bis (clienti ex datori di lavoro) | L. 190/2014 c. 57 (Normattiva) |
| Gestione Separata 2026 | Verificato: 26,07%, 24%, minimale 18.808 €, massimale 122.295 € | INPS, circolare 8/2026 |
| Codici tributo F24 | Verificato: 1790 acconto I rata, 1791 acconto II rata o unica, 1792 saldo | AdE, Risoluzione 59/E/2015 |
| IVS 2026 | Verificato sul testo della circolare. Fissi 4.521,36 € (artigiani) e 4.611,64 € (commercianti); minimale 18.808 €; maggiorazione +1 punto oltre 56.224 €. **Corretto il massimale**: 93.707 € solo per iscritti con anzianità al 31/12/1995, 122.295 € per gli iscritti dal 1/1/1996 (campo `iscrittoDal1996`, predefinito sì). Riduzione 35%: nel 2026 resta ai beneficiari 2025 che non rinunciano; i nuovi iscritti devono fare domanda entro il 28 febbraio | INPS circ. 14/2026 |
| Soglia 35.000 € lavoro dipendente | Il c. 27 L. 199/2025 sostituisce "l'anno 2025" con "gli anni 2025 e 2026" nel c. 12 art. 1 L. 207/2024; torna a 30.000 € dal 2027. Fonti secondarie concordi e rimando nella circolare INPS 14/2026; testo di legge non letto direttamente (Normattiva non più raggiungibile in sessione) | fonti secondarie |
| Coefficienti di redditività | Verificati sul testo dell'Allegato 4 L. 190/2014 pubblicato da AdE: 40, 40, 40, 54, 86, 62, 40, 78, 67. Sono per ATECO 2007/2022. Per i codici ATECO 2025 vedi `data/ateco2025.js`, generato dalla tavola di raccordo ISTAT 2025-2022 con `tools/`. In 142 codici foglia su 1.289 il raccordo non è univoco: l'app deve far scegliere il gruppo all'utente | AdE (Allegato 4) |
| Scadenze 2026 | Saldo 2025 e primo acconto 2026 per ISA e forfettari prorogati al 20 luglio dall'art. 6 DL 22 maggio 2026 n. 89, con +0,80% fino al 20 agosto: già scaduti. **Il DL 89/2026 non è stato convertito**: è abrogato dalla L. 25 giugno 2026 n. 113 (che converte il DL 63/2026), con atti e rapporti giuridici validi e effetti fatti salvi. Il testo dell'art. 6 non è stato letto su Normattiva (la pagina riporta solo l'art. 1): data e maggiorazione vengono da fonti secondarie. Resta il secondo acconto al 30 novembre 2026; dichiarazione al 31 ottobre | Normattiva (stato di vigenza), fonti secondarie |
| Acconti | **Deciso dall'utente: 50% + 50%.** Il testo letterale (c. 64 + art. 17 DPR 435/2001) porterebbe a 40/60, ma l'art. 58 DL 124/2019 prevede il 50/50 per i soggetti ISA e la prassi lo applica ai forfettari. Parametro `percentualeRata1` = 0,5 | decisione utente |

## Voci ancora aperte

- Testo dell'art. 6 DL 89/2026 e verifica che la L. 113/2026 non lo riscriva: riguarda solo l'anno 2026 (scadenze già passate).
- Verifica che i gruppi per codici ATECO 2022 coincidano con la tabella AdE vigente (usata la classificazione dell'Allegato 4 per divisione/gruppo).

## Fase 2: cosa c'è e cosa no

Fatto: archivio cifrato (`js/storage/`), import CSV/XML (`js/import/`), riepilogo con criterio di cassa (`js/domain/`), viste (`js/ui/`).
Si apre con un doppio clic su `index.html` (bundle `dist/app.js` generato da `npm run build`, senza server). Provato nel browser con Chromium da `file://`: creazione archivio, cliente con ATECO 2025, fattura, import CSV, riepilogo, backup, blocco/sblocco con password errata, persistenza dopo reload, layout mobile.

Limiti noti:
- Un solo anno di parametri (2026): il riepilogo usa sempre i parametri 2026, anche per anni diversi.
- Le fatture XML non portano la data di incasso: va inserita a mano.
- I contributi del riepilogo sono quelli di competenza, non quelli effettivamente versati nell'anno.
- Il cambio password non è ancora previsto (workaround: backup, nuovo archivio, ripristino).

## Fase 3: cosa c'è e cosa no

Fatto:
- **Simulazione** (`js/ui/simulazione.js`): confronto affiancato, cursori su ricavi e costi, parametri del regime ordinario (addizionali, detrazioni, altri redditi, IRAP), grafico del netto al variare dei ricavi con soglia di 85.000 €, avvisi oltre 85.000/100.000 €.
- **Scadenzario** (`js/fiscal/scadenzario.js`): saldo e acconti dell'imposta sostitutiva con codici 1790/1791/1792, contributi Gestione Separata e IVS (rate fisse e acconti sull'eccedenza), dichiarazione; scadenze festive/weekend che slittano al giorno lavorativo successivo; acconti già versati salvabili per cliente.
- **Dashboard** nel Riepilogo: incassi mensili e ricavi cumulati contro la soglia, con tooltip, tastiera e vista tabella. Palette blu/arancio validata con lo script di dataviz (chiaro e scuro).
- **Output**: CSV (fatture, confronto, scadenzario; separatore `;`, virgola decimale, protezione da formule) e stampa/PDF dal browser.
- Provato in Chromium da `file://` con un cliente di esempio: i numeri di simulazione e scadenzario sono stati ricontrollati a mano.

## Approfondimento dei punti aperti (fase 3)

| Punto | Esito | Fonte |
|---|---|---|
| Acconto Gestione Separata | **Verificato**: due acconti di pari importo, alle scadenze degli acconti IRPEF; totale = aliquote dell'anno corrente sull'80% del reddito di lavoro autonomo dell'anno precedente, nel limite del massimale dell'anno corrente. Corretto il calcolo (prima usavo l'80% dei contributi dell'anno prima) | AdE, Redditi PF 2026 fasc. 2 (Quadro RR) |
| Causali F24 Gestione Separata | **Verificato**: PXX (aliquota 26,07%), P10 (aliquota 24%) | AdE Redditi PF 2026; INPS circ. 105/2025 |
| Causali F24 artigiani/commercianti | AF/CF (minimale), AP/CP (eccedenza), con rateazione APR/CPR e interessi API/CPI | INPS, pagina "F24 per artigiani e commercianti" |
| Rate contributi fissi IVS | **Corretto**: 16/5, 20/8, 16/11, 16/2 (nominali; nel 2026 18/5 perché 16/5 è sabato). Avevo 17/11 da fonte secondaria | INPS circ. 14/2026 p. 9 |
| Acconti IVS sulla quota eccedente | Date verificate (saldo, primo e secondo acconto alle scadenze IRPEF). Misura dell'80% in due rate **non confermata** nelle circolari: importi ufficiali nel Cassetto previdenziale INPS | INPS circ. 14/2026 |
| Acconti imposta sostitutiva forfettari | Le istruzioni Redditi PF 2026 indicano **40% + 60%** in generale e 50% + 50% solo per i soggetti ISA (art. 17 c. 3 DPR 435/2001); cedolare secca 40/60. Per i forfettari le istruzioni del quadro LM non specificano. Resta la scelta dell'utente (50/50): ora selezionabile nello Scadenzario | AdE, Redditi PF 2026 fasc. 1 (RN62) |
| Detrazione lavoro autonomo ordinario | Implementata: art. 13 c. 5 e 5-ter TUIR (1.265 € fino a 5.500; 500 + 765 × (28.000 − R) / 22.500 fino a 28.000; 500 × (50.000 − R) / 22.000 fino a 50.000; +50 € tra 11.000 e 17.000) | testo del TUIR da siti giuridici (Brocardi/Lexplain), non da Normattiva |
| Parametri 2025 | Aggiunti: Gestione Separata (circ. INPS 27/2025), IVS (circ. 38/2025), IRPEF con secondo scaglione al 35%. Per anni senza parametri l'app usa i più vicini e avvisa | INPS; fonti secondarie per IRPEF 2025 |
| Casse professionali | Inserimento manuale dei versamenti (data, descrizione, importo) per cliente e anno: nessuna tabella per cassa, perché importi e date variano e non sono stati verificati | — |
| Perdite pregresse, altre detrazioni | Campi di inserimento nella simulazione | — |
| Cambio password | Fatto (Backup → Cambia password) | — |
| PDF | Resta "Stampa / PDF" del browser | — |

Ancora fuori perimetro: IVA, ammortamenti, deduzioni diverse dai contributi, limiti IRAP per professionisti, tabella dati per cassa, conversione ATECO non univoca (l'app fa scegliere all'utente).

## Fase 4: interfaccia rifatta, demo, PDF, bollo

Interfaccia riprogettata da zero (la richiesta ammetteva di discostarsi dal brand: app pensata per una demo): palette teal, sidebar scura, tema chiaro/scuro/automatico, selettore anno globale, selettore cliente, palette comandi (Ctrl/Cmd+K), drawer per i moduli, tabelle ordinabili, grafici SVG accessibili (tastiera + vista tabella), layout mobile. Palette dei grafici validata con lo script dataviz.

Novità funzionali:
- **Studio multi-cliente**: panoramica, elenco clienti, agenda scadenze di tutto lo studio, segnalazione soglie 85.000 € / 100.000 € e requisiti.
- **Dati di esempio**: 7 clienti fittizi caricabili alla creazione dell'archivio o da Impostazioni.
- **PDF veri** (simulazione, scadenzario, riepilogo, agenda) con intestazione dello studio: jsPDF 4.0.0 e AutoTable 5.0.7 caricati da cdnjs con SRI al primo uso. Senza rete l'app ricade su "Stampa / PDF" del browser.
- **Scadenze segnabili come pagate**, base di calcolo consultabile, versamenti manuali per le casse.
- **Pagina Parametri** con fonti e stato di verifica di ogni valore.
- **Ricerca ATECO 2025** con titoli ISTAT e raccordo al 2022.
- **Bollo sulle fatture elettroniche**: versamento trimestrale con codici F24 2521–2524 (31/5, 30/9, 30/11, 28/2 successivo), con differimento al 30/9 o 30/11 se il primo (o primo+secondo) trimestre è ≤ 5.000 € (guida AdE, giugno 2026).

Esiti delle verifiche:
- Acconti imposta sostitutiva: **50% + 50% confermato**, coerente con la Risoluzione AdE 93/E del 12/11/2019 (soggetti con attività ISA). Il 40/60 resta selezionabile.
- Bollo, scaglioni IRPEF 2026 (23/33/43%) e IRAP 3,9%: verificati su fonti AdE.
- Soglia 35.000 € per il 2025–2026 (L. 199/2025 c. 27) e conversione ATECO (D.Lgs. 81/2025 art. 1): verificate.

Ancora aperto:
- Acconti IVS sull'eccedenza: assunto 100% in due rate uguali; gli importi ufficiali sono nel Cassetto previdenziale INPS.
- Testo dell'art. 6 DL 89/2026 non letto direttamente (riguarda solo scadenze 2026 già passate).
- Scadenze del regime ordinario segnalate come "parziali".
- Le date di differimento del bollo sono applicate in automatico: verificare caso per caso.

## Fase 5: eliminazione archivio e interfaccia "enterprise"

- **Eliminazione totale dell'archivio** (`Archivio.elimina()`): svuota il database IndexedDB senza chiedere la password, quindi funziona anche se è stata dimenticata. Si raggiunge da *Backup e sicurezza → Zona pericolosa*, dal menu dello studio (in basso a sinistra), dalla palette comandi e dal link "Elimina l'archivio e riparti da zero" nella schermata di blocco. Chiede di digitare ELIMINA; dopo la conferma l'app torna al primo avvio. Provato nel browser: record rimasti nel database = 0, annullamento senza effetti.
- **Interfaccia rivista sul modello delle app SaaS di grandi aziende** (Stripe, Linear, Vercel, Atlassian): barra laterale chiara con selettore dello studio, ricerca rapida e account in basso; percorso (breadcrumb) con cambio cliente; schede per le sezioni del cliente; campanella con le scadenze entro 14 giorni; menu account; indicatore "Salvato"; colore di marca indaco con neutri sobri; densità maggiore di tabelle, bottoni e schede; schermata di accesso con anteprima del prodotto; tema scuro dedicato. Palette dei grafici (indaco/arancio) ricontrollata con lo script dataviz per tema chiaro e scuro.
