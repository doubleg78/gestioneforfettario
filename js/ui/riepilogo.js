import { h, campo, avviso, euro, percentuale } from './dom.js';
import { riepilogoAnno } from '../domain/riepilogo.js';
import { incassiMensili, cumulato, MESI } from '../domain/serie.js';
import { graficoColonne, graficoLinee } from './grafici.js';

const MESSAGGI_SOGLIA = {
  ok: ['ok', 'Entro la soglia.', ''],
  attenzione: ['attenzione', 'Ci si avvicina alla soglia di 85.000 €.', 'Valuta con attenzione i prossimi incassi.'],
  'esce-anno-successivo': ['attenzione', 'Superati 85.000 €.', 'Il regime forfettario cessa dall’anno successivo.'],
  'esce-subito': ['errore', 'Superati 100.000 €.', 'Uscita immediata dal regime: l’IVA è dovuta dalle operazioni che hanno comportato il superamento.'],
};

export function vistaRiepilogo(ctx) {
  const { dati, cliente: c, params } = ctx;
  if (!c) return h('div', null, h('h1', null, 'Riepilogo'), avviso('attenzione', 'Nessun cliente selezionato.', 'Creane uno dalla sezione Clienti.'));
  const anno = ctx.stato.annoRiepilogo ?? new Date().getFullYear();
  const r = riepilogoAnno(c, dati, anno, params);
  const [tipo, titolo, testo] = MESSAGGI_SOGLIA[r.soglie.stato];
  const pct = Math.min(100, r.soglie.percentuale);
  const barra = h('div', { classe: `barra-soglia ${tipo === 'ok' ? '' : tipo}`, role: 'img', 'aria-label': `${r.soglie.percentuale}% della soglia` }, h('span'));
  barra.firstChild.style.width = `${pct}%`;

  const f = r.forfettario;
  const mensili = incassiMensili(dati.fatture, c.id, anno);
  return h('div', null,
    h('div', { classe: 'solo-stampa' }, h('strong', null, `${c.nome} — riepilogo ${anno}`), h('div', null, `Stampato il ${new Date().toLocaleDateString('it-IT')}`)),
    h('h1', null, 'Riepilogo'),
    h('p', { classe: 'tenue' }, c.nome),
    campo('Anno d’imposta', h('input', { type: 'number', min: '2000', max: '2100', valore: anno, onChange: (e) => { ctx.stato.annoRiepilogo = Number(e.target.value); ctx.aggiorna(); } })),
    h('div', { classe: 'statistiche' },
      h('div', { classe: 'statistica' }, h('div', { classe: 'valore' }, euro(r.ricavi)), h('div', { classe: 'etichetta' }, `Ricavi incassati ${anno}`)),
      h('div', { classe: 'statistica' }, h('div', { classe: 'valore' }, euro(r.daIncassare)), h('div', { classe: 'etichetta' }, 'Fatturato da incassare')),
      h('div', { classe: 'statistica' }, h('div', { classe: 'valore' }, euro(r.spese)), h('div', { classe: 'etichetta' }, 'Spese registrate')),
      h('div', { classe: 'statistica' }, h('div', { classe: 'valore' }, percentuale(r.aliquota.aliquota)), h('div', { classe: 'etichetta' }, r.aliquota.startup ? `Aliquota startup (fino al ${r.aliquota.annoUltimoStartup})` : 'Aliquota imposta sostitutiva'))),
    h('div', { classe: 'scheda' },
      h('h2', null, 'Soglia di ricavi'),
      barra,
      h('div', { classe: 'tenue' }, `${euro(r.ricavi)} su 85.000 € (${r.soglie.percentuale.toLocaleString('it-IT')}%) — residuo ${euro(r.soglie.residuoSoglia)}`),
      avviso(tipo, titolo, testo)),
    h('div', { classe: 'griglia-2' },
      h('div', { classe: 'scheda' }, graficoColonne({ titolo: `Incassi mensili ${anno}`, descrizione: 'Ricavi incassati per mese (criterio di cassa)', categorie: MESI, valori: mensili })),
      h('div', { classe: 'scheda' }, graficoLinee({
        titolo: `Ricavi cumulati ${anno}`, descrizione: 'Andamento rispetto alla soglia di 85.000 €',
        x: MESI.map((_, i) => i + 1), formatoX: (v) => MESI[Math.round(v) - 1] ?? '',
        serie: [{ nome: 'Ricavi cumulati', valori: cumulato(mensili), colore: '--serie-1' }],
        riferimentoY: { valore: params.forfettario.soglie.ricaviEsclusione, etichetta: 'Soglia 85.000 €' },
      }))),
    h('div', { classe: 'scheda' },
      h('h2', null, 'Ricavi per codice ATECO'),
      h('div', { classe: 'tabella-contenitore' }, h('table', null,
        h('thead', null, h('tr', null, h('th', null, 'Attività'), h('th', { classe: 'numero' }, 'Coefficiente'), h('th', { classe: 'numero' }, 'Ricavi'), h('th', { classe: 'numero' }, 'Reddito forfettario'))),
        h('tbody', null, r.perAteco.map((v) => h('tr', null,
          h('td', null, `${v.codice} ${v.descrizione}`.trim()),
          h('td', { classe: 'numero' }, v.coefficiente ? percentuale(v.coefficiente) : '—'),
          h('td', { classe: 'numero' }, euro(v.importo)),
          h('td', { classe: 'numero' }, euro(v.importo * v.coefficiente)))))))),
    f ? h('div', { classe: 'scheda' },
      h('h2', null, 'Stima imposta e contributi (regime forfettario)'),
      h('div', { classe: 'tabella-contenitore' }, h('table', null, h('tbody', null,
        riga('Reddito forfettario lordo', f.redditoLordo),
        riga('Contributi previdenziali (deducibili)', f.contributi.totale),
        riga('Reddito imponibile', f.imponibile),
        riga(`Imposta sostitutiva al ${percentuale(f.aliquota)}`, f.imposta),
        riga('Totale a carico (imposta + contributi)', f.totaleCarico, true)))),
      h('p', { classe: 'tenue' }, 'Stima indicativa: i contributi sono considerati versati nell’anno di competenza. Per acconti e saldo vedi lo Scadenzario, per il confronto con il regime ordinario la Simulazione.'))
      : avviso('attenzione', 'Stima non disponibile.', 'Assegna un codice ATECO con coefficiente alle attività del cliente (sezione Anagrafica).'),
    h('div', { classe: 'azioni' }, h('button', { onClick: () => window.print() }, 'Stampa / PDF')));
}

function riga(etichetta, valore, forte = false) {
  const el = h('tr', null, h('td', null, etichetta), h('td', { classe: 'numero' }, euro(valore)));
  if (forte) el.style.fontWeight = '700';
  return el;
}
