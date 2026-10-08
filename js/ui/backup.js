import { h, campo, avviso, selezionaFile, scarica } from './dom.js';
import { ErrorePassword } from '../storage/crypto.js';

export function vistaBackup(ctx) {
  const { archivio } = ctx;
  const esito = h('div');
  const pw = h('input', { type: 'password', autocomplete: 'current-password' });
  let blobDaImportare = null;
  const nomeFile = h('span', { classe: 'tenue' });

  return h('div', null,
    h('h1', null, 'Backup e ripristino'),
    h('p', { classe: 'tenue' }, 'Il backup è un file cifrato con la stessa password dell’archivio: solo chi la conosce può leggerlo.'),
    h('div', { classe: 'scheda' },
      h('h2', null, 'Esporta'),
      h('p', null, 'Salva una copia dell’archivio. Conservala fuori dal browser (disco esterno, cloud personale).'),
      h('div', { classe: 'azioni' }, h('button', { classe: 'primario', onClick: async () => {
        const blob = await archivio.esporta();
        scarica(`gestione-forfettario-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(blob));
        esito.replaceChildren(avviso('ok', 'Backup scaricato.'));
      } }, 'Scarica backup'))),
    h('div', { classe: 'scheda' },
      h('h2', null, 'Ripristina'),
      avviso('attenzione', 'Attenzione.', 'Il ripristino sostituisce tutti i dati attuali.'),
      h('div', { classe: 'azioni' }, h('button', { onClick: async () => {
        const [file] = await selezionaFile('.json,application/json');
        if (!file) return;
        try { blobDaImportare = JSON.parse(await file.text()); nomeFile.textContent = file.name; }
        catch { esito.replaceChildren(avviso('errore', 'File non valido.')); }
      } }, 'Scegli file di backup'), nomeFile),
      campo('Password del backup', pw),
      h('div', { classe: 'azioni' }, h('button', { classe: 'pericolo', onClick: async () => {
        if (!blobDaImportare) return esito.replaceChildren(avviso('errore', 'Scegli prima un file di backup.'));
        if (!confirm('Sostituire tutti i dati attuali con il backup?')) return;
        try {
          await archivio.importa(blobDaImportare, pw.value);
          esito.replaceChildren(avviso('ok', 'Backup ripristinato.'));
        } catch (e) {
          esito.replaceChildren(avviso('errore', e instanceof ErrorePassword ? 'Password errata o file danneggiato.' : `Errore: ${e.message}`));
        }
      } }, 'Ripristina'))),
    esito);
}
