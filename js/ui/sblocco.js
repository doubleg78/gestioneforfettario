import { h, campo, avviso } from './dom.js';
import { ErrorePassword } from '../storage/crypto.js';

/** Schermata iniziale: creazione dell'archivio (prima volta) o sblocco con password. */
export function schermataSblocco(archivio, esiste, alSbloccato) {
  const pw = h('input', { type: 'password', autocomplete: esiste ? 'current-password' : 'new-password', required: true, minlength: esiste ? null : 10 });
  const pw2 = h('input', { type: 'password', autocomplete: 'new-password', required: true });
  const messaggio = h('div');
  const bottone = h('button', { type: 'submit', classe: 'primario' }, esiste ? 'Sblocca' : 'Crea archivio');

  const form = h('form', {
    onSubmit: async (e) => {
      e.preventDefault();
      messaggio.replaceChildren();
      if (!esiste && pw.value !== pw2.value) return messaggio.append(avviso('errore', 'Le password non coincidono.'));
      bottone.disabled = true;
      bottone.textContent = 'Attendere…';
      try {
        if (esiste) await archivio.sblocca(pw.value);
        else await archivio.crea(pw.value);
        alSbloccato();
      } catch (err) {
        messaggio.append(avviso('errore', err instanceof ErrorePassword ? 'Password errata.' : `Errore: ${err.message}`));
        bottone.disabled = false;
        bottone.textContent = esiste ? 'Sblocca' : 'Crea archivio';
      }
    },
  },
  campo(esiste ? 'Password' : 'Scegli una password (almeno 10 caratteri)', pw),
  esiste ? null : campo('Ripeti la password', pw2),
  esiste ? null : avviso('attenzione', 'Attenzione.', 'I dati sono cifrati nel browser con questa password. Se la dimentichi non è possibile recuperarli: conserva un backup e la password in un luogo sicuro.'),
  messaggio,
  h('div', { classe: 'azioni' }, bottone));

  return h('div', { classe: 'sblocco' },
    h('div', { classe: 'scheda' },
      h('h1', null, 'Gestione Forfettario'),
      h('p', { classe: 'tenue' }, esiste ? 'Inserisci la password per aprire l’archivio.' : 'Primo avvio: crea l’archivio cifrato che conterrà i dati dei clienti.'),
      form));
}
