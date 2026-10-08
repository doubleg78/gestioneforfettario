import { h, campo, avviso, chip } from '../dom.js';
import { icona } from '../icone.js';
import { ErrorePassword } from '../../storage/crypto.js';

/** Schermata iniziale: creazione dell'archivio (prima volta) o sblocco con password. */
export function schermataSblocco(archivio, esiste, alSbloccato, { alCreare } = {}) {
  const pw = h('input', { type: 'password', autocomplete: esiste ? 'current-password' : 'new-password', required: true, minlength: esiste ? null : 10, autofocus: true });
  const pw2 = h('input', { type: 'password', autocomplete: 'new-password', required: true });
  const demo = h('input', { type: 'checkbox', checked: true });
  const messaggio = h('div');
  const bottone = h('button', { type: 'submit', classe: 'bottone primario', style: 'height:42px' }, esiste ? 'Sblocca archivio' : 'Crea archivio');

  const form = h('form', {
    classe: 'pila', style: 'gap:16px',
    onSubmit: async (e) => {
      e.preventDefault();
      messaggio.replaceChildren();
      if (!esiste && pw.value !== pw2.value) return messaggio.append(avviso('errore', 'Le password non coincidono.'));
      bottone.disabled = true;
      bottone.textContent = 'Attendere…';
      try {
        if (esiste) await archivio.sblocca(pw.value);
        else { await archivio.crea(pw.value); await alCreare?.({ conDemo: demo.checked }); }
        alSbloccato();
      } catch (err) {
        messaggio.append(avviso('errore', err instanceof ErrorePassword ? 'Password errata.' : `Errore: ${err.message}`));
        bottone.disabled = false;
        bottone.textContent = esiste ? 'Sblocca archivio' : 'Crea archivio';
      }
    },
  },
  campo(esiste ? 'Password' : 'Scegli una password (almeno 10 caratteri)', pw),
  esiste ? null : campo('Ripeti la password', pw2),
  esiste ? null : h('label', { classe: 'spunta' }, demo, h('span', null, 'Carica dati di esempio ', h('span', { classe: 'muted' }, '(sette clienti inventati, utili per una dimostrazione)'))),
  esiste ? null : avviso('attenzione', 'Conserva la password.', 'I dati sono cifrati nel browser: se la dimentichi non è possibile recuperarli.'),
  messaggio,
  bottone);

  return h('div', { classe: 'schermata-sblocco' },
    h('div', { classe: 'sblocco-vetrina' },
      h('div', { classe: 'marchio' }, h('div', { classe: 'logo' }, icona('bilancia', 20)), h('div', null, h('strong', null, 'Gestione Forfettario'), h('span', null, 'per studi professionali'))),
      h('div', null,
        h('h1', null, 'Il regime forfettario sotto controllo.'),
        h('ul', null,
          ['Soglie, acconti e scadenze di tutti i clienti in un colpo d’occhio', 'Confronto forfettario e ordinario con scenari what-if', 'Fatture in CSV e XML FatturaPA, prospetti in PDF', 'Parametri fiscali verificati su fonti ufficiali, con la fonte accanto'].map((t) => h('li', null, icona('spunta', 18), t)))),
      h('div', { classe: 'piccolo', style: 'color:#7e8ba2;display:flex;gap:8px;align-items:center' }, icona('lucchetto', 14), 'I dati restano nel tuo browser, cifrati con AES-256. Nessun server.')),
    h('div', { classe: 'sblocco-form' },
      h('div', { classe: 'scheda' },
        h('div', null, h('h1', { style: 'font-size:22px' }, esiste ? 'Bentornato' : 'Crea il tuo archivio'),
          h('p', { classe: 'muted', style: 'margin-top:6px' }, esiste ? 'Inserisci la password per aprire i dati dello studio.' : 'Primo avvio: scegli una password per proteggere i dati dei clienti.')),
        form,
        h('div', null, chip('neutro', 'AES-256-GCM', 'scudo'), ' ', chip('neutro', 'PBKDF2 600.000 iterazioni')))));
}
