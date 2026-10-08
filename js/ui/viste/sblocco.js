import { h, campo, avviso, chip } from '../dom.js';
import { icona } from '../icone.js';
import { ErrorePassword } from '../../storage/crypto.js';

/** Schermata iniziale: creazione dell'archivio (prima volta) o sblocco con password. */
export function schermataSblocco(archivio, esiste, alSbloccato, { alCreare, alEliminare } = {}) {
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
      h('div', { classe: 'vetrina-marchio' }, h('div', { classe: 'logo' }, icona('bilancia', 16)), 'Gestione Forfettario'),
      h('div', null,
        h('h1', null, 'Il regime forfettario, sotto controllo.'),
        h('p', { classe: 'lead' }, 'Soglie, acconti e scadenze di tutti i clienti dello studio in un’unica vista, con parametri fiscali verificati sulle fonti ufficiali.'),
        h('div', { classe: 'anteprima', 'aria-hidden': 'true', style: 'margin-top:28px' },
          h('div', { classe: 'anteprima-kpi' },
            h('div', null, h('span', null, 'Clienti seguiti'), h('strong', null, '7')),
            h('div', null, h('span', null, 'Ricavi incassati'), h('strong', null, '361.780 €')),
            h('div', null, h('span', null, 'Prossima scadenza'), h('strong', null, '16/11'))),
          [['Andrea Sala', 100], ['Paolo Mancini', 95], ['Marta Conti', 64], ['Elena Rizzi', 54]].map(([n, v]) => h('div', { classe: 'anteprima-riga' }, h('span', null, n), h('i', null, h('b', { style: `width:${v}%` })), h('span', null, `${v}%`))))),
      h('div', { classe: 'vetrina-punti' },
        h('span', null, icona('lucchetto', 14), 'Cifratura AES-256 nel browser'),
        h('span', null, icona('scudo', 14), 'Nessun server, nessun invio di dati'),
        h('span', null, icona('documento', 14), 'CSV, XML FatturaPA e PDF'))),
    h('div', { classe: 'sblocco-form' },
      h('div', { classe: 'scheda' },
        h('div', null, h('h1', { style: 'font-size:22px' }, esiste ? 'Bentornato' : 'Crea il tuo archivio'),
          h('p', { classe: 'muted', style: 'margin-top:6px' }, esiste ? 'Inserisci la password per aprire i dati dello studio.' : 'Primo avvio: scegli una password per proteggere i dati dei clienti.')),
        form,
        esiste && alEliminare ? h('div', { classe: 'recupero' }, h('span', null, 'Password dimenticata? Non è recuperabile.'), h('button', { classe: 'link-pericolo', type: 'button', onClick: alEliminare }, 'Elimina l’archivio e riparti da zero')) : null,
        h('div', null, chip('neutro', 'AES-256-GCM', 'scudo'), ' ', chip('neutro', 'PBKDF2 600.000 iterazioni')))));
}
