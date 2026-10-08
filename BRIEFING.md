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
| Acconti | **Corretto**: 40% + 60%, non 50/50. Il 50/50 dell'art. 58 DL 124/2019 vale per i soggetti ISA (art. 12-quinquies DL 34/2019). Il c. 64 rinvia alle regole IRPEF. Alcune guide parlano di 50/50 anche per i forfettari: da riconfermare su prassi AdE prima dell'uso | Normattiva |
| IVS 2026 | Aliquote, minimale e massimali coerenti tra INPS e fonti secondarie; testo integrale della circolare 14/2026 non letto per intero | INPS circ. 14/2026 |
| Soglia 35.000 € lavoro dipendente | Solo fonti secondarie (L. 199/2025 c. 27); Normattiva riporta ancora 30.000 € nel testo base | da confermare |
| Coefficienti di redditività | Allegato 4 non presente nel testo estratto; valori noti, da confrontare con la tabella ufficiale | da confermare |
| Scadenze 2026 e proroghe (es. 20 luglio) | Riferite da fonti secondarie, non verificate | da confermare |
