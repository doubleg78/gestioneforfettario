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
2. **Interfaccia e dati**: struttura, sidebar, storage cifrato, anagrafica, fatture, spese, import.
3. **Simulazione, controlli, scadenzario, output e dashboard.**

## Punti aperti da verificare in fase 1

- Parametri 2025/2026: aliquote Gestione Separata, minimali e contributi IVS, scaglioni IRPEF, addizionali, soglie di esclusione.
- Gestione dei contribuenti con casse professionali proprie (serve una tabella parametrizzata per cassa).
- Regole di acconto e saldo, e codici tributo F24 aggiornati.

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
