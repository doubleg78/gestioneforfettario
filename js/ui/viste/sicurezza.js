import { h, campo, scheda, testataPagina, bottone, avviso, chip, zonaRilascio, scarica, selezionaFile } from '../dom.js';
import { icona } from '../icone.js';
import { ErrorePassword } from '../../storage/crypto.js';

export function vistaSicurezza(ctx) {
  const { archivio } = ctx;
  const esitoImport = h('div');
  const esitoPw = h('div');
  let blobDaImportare = null;
  const nomeFile = h('span', { classe: 'muted' });
  const pwBackup = h('input', { type: 'password', autocomplete: 'current-password' });
  const attuale = h('input', { type: 'password', autocomplete: 'current-password', required: true });
  const nuova = h('input', { type: 'password', autocomplete: 'new-password', required: true, minlength: '10' });
  const nuova2 = h('input', { type: 'password', autocomplete: 'new-password', required: true });
  const min = h('select', { classe: 'input', onChange: async (e) => { await archivio.modifica((d) => { d.ui.bloccoMin = Number(e.target.value); }); ctx.toast('Blocco automatico aggiornato.'); } },
    [[5, '5 minuti'], [15, '15 minuti'], [30, '30 minuti'], [60, '1 ora'], [0, 'Mai']].map(([v, t]) => h('option', { value: v, selected: v === (ctx.dati.ui.bloccoMin ?? 15) }, t)));

  return h('div', { classe: 'pila' },
    testataPagina('Backup e sicurezza', 'I dati restano nel browser, cifrati con la tua password'),
    h('div', { classe: 'griglia-2' },
      scheda({ titolo: 'Esporta backup', sottotitolo: 'File cifrato con la password dell’archivio' },
        h('div', { classe: 'pila', style: 'gap:14px' },
          h('p', { classe: 'muted' }, 'Conserva una copia fuori dal browser (disco esterno, cloud personale). Solo chi conosce la password può leggerla.'),
          bottone('Scarica backup', { variante: 'primario', icona: 'scarica', onClick: async () => { const b = await archivio.esporta(); scarica(`gestione-forfettario-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(b)); ctx.toast('Backup scaricato.'); } }),
          h('div', null, chip('neutro', 'AES-256-GCM', 'scudo'), ' ', chip('neutro', 'PBKDF2 600.000 iterazioni')))),
      scheda({ titolo: 'Ripristina da backup', sottotitolo: 'Sostituisce tutti i dati attuali' },
        h('div', { classe: 'pila', style: 'gap:14px' },
          zonaRilascio({ testo: 'Scegli il file di backup', accept: '.json,application/json', multiplo: false, onFile: async ([file]) => { try { blobDaImportare = JSON.parse(await file.text()); nomeFile.textContent = file.name; esitoImport.replaceChildren(avviso('info', `File selezionato: ${file.name}.`, 'Inserisci la password del backup e conferma.')); } catch { esitoImport.replaceChildren(avviso('errore', 'File non valido.')); } } }),
          nomeFile, campo('Password del backup', pwBackup), esitoImport,
          bottone('Ripristina', { variante: 'pericolo', icona: 'ricarica', onClick: async () => {
            if (!blobDaImportare) return esitoImport.replaceChildren(avviso('errore', 'Scegli prima un file di backup.'));
            if (!(await ctx.conferma({ titolo: 'Sostituire tutti i dati?', testo: 'I dati attuali verranno sostituiti con quelli del backup.', etichetta: 'Ripristina', pericolo: true }))) return;
            try { await archivio.importa(blobDaImportare, pwBackup.value); ctx.toast('Backup ripristinato.'); } catch (e) { esitoImport.replaceChildren(avviso('errore', e instanceof ErrorePassword ? 'Password errata o file danneggiato.' : `Errore: ${e.message}`)); }
          } })))),
    h('div', { classe: 'griglia-2' },
      scheda({ titolo: 'Cambia password' },
        h('form', { classe: 'pila', style: 'gap:14px', onSubmit: async (e) => {
          e.preventDefault();
          if (nuova.value !== nuova2.value) return esitoPw.replaceChildren(avviso('errore', 'Le nuove password non coincidono.'));
          try { await archivio.cambiaPassword(attuale.value, nuova.value); attuale.value = nuova.value = nuova2.value = ''; esitoPw.replaceChildren(avviso('ok', 'Password cambiata.', 'Esporta un nuovo backup: quelli precedenti restano apribili solo con la vecchia password.')); }
          catch (err) { esitoPw.replaceChildren(avviso('errore', err instanceof ErrorePassword ? 'Password attuale errata.' : err.message)); }
        } },
        campo('Password attuale', attuale), campo('Nuova password (almeno 10 caratteri)', nuova), campo('Ripeti la nuova password', nuova2), esitoPw,
        h('div', null, bottone('Cambia password', { variante: 'primario', tipo: 'submit' })))),
      scheda({ titolo: 'Blocco automatico', sottotitolo: 'Richiede di nuovo la password dopo un periodo di inattività' },
        h('div', { classe: 'pila', style: 'gap:14px' }, campo('Blocca dopo', min),
          avviso('info', 'Password non recuperabile.', 'Non esiste un reset: senza la password i dati non si possono leggere. Conserva un backup e la password in luoghi sicuri.')))),
    scheda({ titolo: 'Zona pericolosa', sottotitolo: 'Azioni irreversibili', classe: 'scheda-pericolo' },
      h('div', { classe: 'riga-pericolo' },
        h('div', null, h('strong', null, 'Elimina tutto l’archivio e riparti da zero'),
          h('p', { classe: 'muted' }, 'Cancella dal browser clienti, fatture, spese, impostazioni e password. Dopo l’eliminazione l’app torna alla schermata di primo avvio. Scarica prima un backup se vuoi poter tornare indietro.')),
        h('div', { classe: 'gruppo-azioni' },
          bottone('Scarica backup', { icona: 'scarica', onClick: async () => { const b = await archivio.esporta(); scarica(`gestione-forfettario-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(b)); ctx.toast('Backup scaricato.'); } }),
          bottone('Elimina archivio…', { variante: 'pericolo', icona: 'cestino', onClick: () => ctx.eliminaArchivio() })))));
}
