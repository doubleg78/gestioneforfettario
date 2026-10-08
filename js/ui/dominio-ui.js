// Pezzi di interfaccia che dipendono dal dominio fiscale (chip di stato, testata cliente, esportazioni).
import { h, chip, iniziali, percentuale, euro, dataIt } from './dom.js';
import { icona } from './icone.js';
import { caricaPdf } from '../export/pdf-loader.js';
import { toast } from './overlay.js';
import { etichettaPrevidenza } from './shell.js';

export const ETICHETTE_GRUPPI = {
  'industrie-alimentari-bevande': 'Industrie alimentari e bevande',
  'commercio-ingrosso-dettaglio': 'Commercio all’ingrosso e al dettaglio',
  'commercio-ambulante-alimentare': 'Commercio ambulante alimentare',
  'commercio-ambulante-altri': 'Commercio ambulante di altri prodotti',
  'intermediari-commercio': 'Intermediari del commercio',
  'alloggio-ristorazione': 'Alloggio e ristorazione',
  'attivita-professionali-sanitarie': 'Attività professionali, scientifiche, tecniche, sanitarie',
  'costruzioni-immobiliari': 'Costruzioni e attività immobiliari',
  'altre-attivita': 'Altre attività economiche',
};

const STATI_SOGLIA = {
  ok: ['ok', 'Entro la soglia', 'spunta'],
  attenzione: ['attenzione', 'Vicino alla soglia', 'avviso'],
  'esce-anno-successivo': ['attenzione', 'Soglia superata', 'avviso'],
  'esce-subito': ['errore', 'Uscita immediata', 'avviso'],
};
export const chipSoglia = (stato) => { const [t, e, i] = STATI_SOGLIA[stato]; return chip(t, e, i); };
export const statoMeter = (stato) => (stato === 'ok' ? '' : stato === 'attenzione' ? 'attenzione' : stato === 'esce-anno-successivo' ? 'attenzione' : 'errore');

export const chipAliquota = (r) => chip(r.aliquota.startup ? 'primario' : 'neutro', `Imposta ${percentuale(r.aliquota.aliquota)}${r.aliquota.startup ? ' · startup' : ''}`);

export function avatar(nome, grande = false) { return h('span', { classe: `avatar ${grande ? 'grande' : ''}` }, iniziali(nome)); }

/** Testata del cliente attivo, mostrata in cima alle pagine di dettaglio. */
export function testataCliente(ctx, riepilogo, azioni = []) {
  const c = ctx.cliente;
  return h('section', { classe: 'scheda testata-cliente' },
    avatar(c.nome, true),
    h('div', { classe: 'testata-info' },
      h('h1', null, c.nome || '(senza nome)'),
      h('div', { classe: 'chips' },
        c.partitaIva ? chip('neutro', `P.IVA ${c.partitaIva}`) : null,
        chip('neutro', etichettaPrevidenza(c), 'scudo'),
        riepilogo ? chipAliquota(riepilogo) : null,
        riepilogo ? chipSoglia(riepilogo.soglie.stato) : null,
        c.demo ? chip('info', 'Dati demo') : null)),
    azioni.length ? h('div', { classe: 'gruppo-azioni no-stampa' }, azioni) : null);
}

/** Genera e scarica un PDF; se le librerie non sono raggiungibili ripiega sulla stampa. */
export async function esportaPdf(costruisci, nomeFile) {
  try {
    toast('Preparo il PDF…');
    const JsPDF = await caricaPdf();
    const doc = costruisci(JsPDF);
    doc.save(nomeFile);
  } catch (e) {
    toast(`${e.message}. Uso la stampa del browser.`, 'errore');
    setTimeout(() => window.print(), 400);
  }
}

export function voceAgenda(v, { mostraCliente = false, onVersata } = {}) {
  const [anno, mese, giorno] = v.data.split('-');
  const MESI = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
  const scaduta = !v.versata && v.data < new Date().toISOString().slice(0, 10) && v.importo > 0;
  const f24 = v.codiceTributo ? `Erario ${v.codiceTributo} · ${v.annoRiferimento}` : v.causaleInps ? `INPS ${v.causaleInps}` : v.tipo === 'inps' ? 'INPS' : '';
  return h('li', { classe: `voce-agenda ${v.versata ? 'versata' : ''} ${scaduta ? 'scaduta' : ''}` },
    h('div', { classe: 'data-box' }, h('span', { classe: 'giorno' }, giorno), h('span', { classe: 'mese' }, `${MESI[Number(mese) - 1]} ${anno.slice(2)}`)),
    h('div', { style: 'min-width:0' },
      h('div', { classe: 'titolo-voce', style: 'font-weight:600' }, v.descrizione),
      h('div', { classe: 'muted piccolo', style: 'display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:3px' },
        mostraCliente ? h('span', { style: 'display:inline-flex;align-items:center;gap:6px;color:var(--ink-2);font-weight:550' }, icona('utente', 13), v.cliente.nome) : null,
        f24 ? h('span', null, f24) : null,
        v.nota ? h('span', null, v.nota) : null)),
    h('div', { style: 'display:flex;align-items:center;gap:12px;justify-content:flex-end;flex-wrap:wrap' },
      v.tipo === 'adempimento' ? chip('info', 'Adempimento', 'calendario')
        : [v.versata ? chip('ok', `Versato il ${dataIt(v.versata)}`, 'spunta') : scaduta ? chip('errore', 'Scaduta', 'avviso') : null,
          h('strong', { classe: 'numero', style: 'min-width:92px' }, euro(v.importo))],
      onVersata && v.tipo !== 'adempimento' && v.importo > 0 ? h('button', { classe: 'bottone piccolo', type: 'button', onClick: () => onVersata(v) }, v.versata ? 'Annulla' : 'Segna versato') : null));
}
