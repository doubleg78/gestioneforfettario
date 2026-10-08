# Gestione Forfettario

Webapp per studi che gestiscono contribuenti in regime forfettario. Solo HTML, CSS e JavaScript (moduli ES), nessun server per usarla.

## Avvio

Apri `index.html` con un doppio clic: nessun server, nessuna installazione. L'app carica `dist/app.js` (già incluso nel repository). Alla creazione dell'archivio si possono caricare dati di esempio per una demo.

## Sviluppo

I sorgenti sono moduli ES in `js/`. Dopo ogni modifica rigenera il file unico che il browser carica:

```
npm install      # una volta sola (esbuild; jsPDF solo per i test)
npm run build    # js/ -> dist/app.js
```

## Test

```
npm test         # node --test, nessuna dipendenza
```

## PDF

I PDF si generano con jsPDF e AutoTable caricati da cdnjs al primo uso (richiede rete). Offline l'app propone "Stampa / PDF" del browser.

## Dati e sicurezza

- Tutti i dati restano nel browser (IndexedDB), cifrati con AES-256-GCM; la chiave deriva dalla password con PBKDF2-SHA256 (600.000 iterazioni).
- La password non è recuperabile. Esporta regolarmente il backup cifrato dalla sezione *Sicurezza*.
- Blocco automatico dopo 15 minuti di inattività.

## Struttura

Vedi `BRIEFING.md` per decisioni, piano e stato delle verifiche normative.
