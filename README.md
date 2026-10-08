# Gestione Forfettario

Webapp per studi che gestiscono contribuenti in regime forfettario. Solo HTML, CSS e JavaScript (moduli ES), nessun server né build.

## Avvio

I moduli ES richiedono un server HTTP locale (non funzionano da `file://`):

```
npm start        # python3 -m http.server 8080
# apri http://localhost:8080
```

## Test

```
npm test         # node --test, nessuna dipendenza
```

## Dati e sicurezza

- Tutti i dati restano nel browser (IndexedDB), cifrati con AES-256-GCM; la chiave deriva dalla password con PBKDF2-SHA256 (600.000 iterazioni).
- La password non è recuperabile. Esporta regolarmente il backup cifrato dalla sezione *Backup*.
- Blocco automatico dopo 15 minuti di inattività.

## Struttura

Vedi `BRIEFING.md` per decisioni, piano e stato delle verifiche normative.
