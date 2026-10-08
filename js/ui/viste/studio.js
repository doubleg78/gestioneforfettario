import { h, tile, scheda, testataPagina, bottone, tabella, vuoto, meter, euro, euroIntero, dataIt } from '../dom.js';
import { icona } from '../icone.js';
import { panoramicaStudio, agendaStudio } from '../../domain/studio.js';
import { chipSoglia, statoMeter, chipAliquota, avatar, voceAgenda } from '../dominio-ui.js';
import { etichettaPrevidenza } from '../shell.js';

export function vistaStudio(ctx) {
  const { dati, anno, oggi } = ctx;
  if (dati.clienti.length === 0) {
    return h('div', { classe: 'pila' },
      testataPagina('Panoramica studio', `Anno ${anno}`),
      scheda({}, vuoto({
        icona: 'studio', titolo: 'Ancora nessun cliente',
        testo: 'Aggiungi il primo contribuente forfettario, oppure carica dati di esempio per vedere subito come funziona.',
        azioni: [bottone('Nuovo cliente', { variante: 'primario', icona: 'piu', onClick: ctx.nuovoCliente }), bottone('Carica dati di esempio', { icona: 'carica', onClick: ctx.caricaDemo })],
      })));
  }

  const p = panoramicaStudio(dati, anno, ctx.paramsPer, oggi);
  const futuri = agendaStudio(dati, anno, ctx.paramsPer, { soloFuture: true, oggi }).filter((v) => v.importo > 0 && !v.versata && v.tipo !== 'adempimento');
  const prossima = futuri[0];
  const totaleDaVersare = futuri.reduce((s, v) => s + v.importo, 0);

  const righe = tabella({
    ordinaIniziale: { chiave: 'incassi', verso: -1 },
    righe: p.righe,
    colonne: [
      { chiave: 'cliente', titolo: 'Cliente', ordina: (r) => r.cliente.nome.toLowerCase(), cella: (r) => h('div', { classe: 'cella-persona' }, avatar(r.cliente.nome), h('div', null, h('a', { href: '#/riepilogo', style: 'color:var(--ink);font-weight:600;text-decoration:none', onClick: () => ctx.selezionaCliente(r.cliente.id) }, r.cliente.nome), h('div', { classe: 'sotto' }, etichettaPrevidenza(r.cliente)))) },
      { chiave: 'regime', titolo: 'Regime', cella: (r) => chipAliquota(r.riepilogo) },
      { chiave: 'incassi', titolo: 'Incassi', numerica: true, ordina: (r) => r.riepilogo.ricavi, cella: (r) => h('strong', null, euro(r.riepilogo.ricavi)) },
      { chiave: 'soglia', titolo: 'Soglia 85.000 €', ordina: (r) => r.riepilogo.soglie.percentuale, cella: (r) => h('div', { style: 'min-width:150px' }, meter(r.riepilogo.soglie.percentuale, statoMeter(r.riepilogo.soglie.stato)), h('div', { classe: 'sotto', style: 'margin-top:4px' }, `${r.riepilogo.soglie.percentuale.toLocaleString('it-IT')}% · ${r.riepilogo.soglie.residuoSoglia >= 0 ? `residuo ${euroIntero(r.riepilogo.soglie.residuoSoglia)}` : `oltre di ${euroIntero(-r.riepilogo.soglie.residuoSoglia)}`}`)) },
      { chiave: 'stato', titolo: 'Stato', cella: (r) => chipSoglia(r.riepilogo.soglie.stato) },
      { chiave: 'prossima', titolo: 'Prossimo versamento', ordina: (r) => r.prossima?.data ?? '9999', cella: (r) => (r.prossima ? h('div', null, h('strong', null, dataIt(r.prossima.data)), h('div', { classe: 'sotto' }, euro(r.prossima.importo))) : h('span', { classe: 'muted' }, '—')) },
    ],
  });

  const allarmi = p.daMonitorare;

  return h('div', { classe: 'pila' },
    testataPagina('Panoramica studio', `Situazione al ${dataIt(oggi)} · anno ${anno}`, [bottone('Agenda scadenze', { icona: 'calendario', onClick: () => ctx.naviga('#/agenda') }), bottone('Nuovo cliente', { variante: 'primario', icona: 'piu', onClick: ctx.nuovoCliente })]),
    h('div', { classe: 'tiles' },
      tile('Clienti seguiti', String(dati.clienti.length), { icona: 'utenti', nota: `${dati.clienti.filter((c) => c.previdenza.tipo === 'gestione-separata').length} in Gestione Separata` }),
      tile(`Ricavi incassati ${anno}`, euroIntero(p.totaleRicavi), { icona: 'grafico', nota: 'Somma dei clienti, criterio di cassa' }),
      tile('Da monitorare', String(allarmi.length), { icona: 'bandiera', nota: allarmi.length ? allarmi.map((a) => a.cliente.nome.split(' ')[0]).join(', ') : 'Nessuno vicino alla soglia' }),
      tile('Prossimo versamento', prossima ? dataIt(prossima.data) : '—', { icona: 'calendario', nota: prossima ? `${prossima.cliente.nome} · ${euro(prossima.importo)}` : 'Nessuna scadenza futura', evidenza: true })),
    scheda({ titolo: 'Clienti', sottotitolo: 'Incassi dell’anno e utilizzo della soglia', senzaPadding: true }, righe),
    h('div', { classe: 'griglia-2' },
      h('div', { classe: 'pila' },
        scheda({ titolo: 'Prossime scadenze', sottotitolo: `${euro(totaleDaVersare)} ancora da versare nel ${anno}`, senzaPadding: true,
          azioni: [bottone('Vedi tutte', { variante: 'ghost', piccolo: true, onClick: () => ctx.naviga('#/agenda') })] },
        futuri.length ? h('ul', { classe: 'timeline' }, futuri.slice(0, 5).map((v) => voceAgenda(v, { mostraCliente: true }))) : vuoto({ icona: 'spunta', titolo: 'Tutto versato', testo: 'Nessuna scadenza in sospeso.' })),
        allarmi.length ? scheda({ titolo: 'Attenzione alle soglie', senzaPadding: true }, h('ul', { classe: 'timeline' }, allarmi.map((a) => h('li', { classe: 'riga-avviso' },
          avatar(a.cliente.nome),
          h('div', { classe: 'testo' }, h('strong', null, a.cliente.nome), h('div', { classe: 'muted piccolo' }, a.riepilogo.soglie.stato === 'attenzione' ? `Residuo ${euroIntero(a.riepilogo.soglie.residuoSoglia)} prima degli 85.000 €` : a.riepilogo.soglie.stato === 'esce-subito' ? 'Oltre 100.000 €: uscita immediata dal regime' : 'Oltre 85.000 €: uscita dal regime dall’anno successivo')),
          chipSoglia(a.riepilogo.soglie.stato))))) : null),
      scheda({ titolo: 'Distribuzione degli incassi', sottotitolo: `Ricavi ${anno} per cliente` }, h('div', { classe: 'pila', style: 'gap:12px' }, p.righe.slice().sort((x, y) => y.riepilogo.ricavi - x.riepilogo.ricavi).map((r) => h('div', { style: 'display:grid;grid-template-columns:120px 1fr 92px;gap:10px;align-items:center;font-size:13px' }, h('span', { style: 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap' }, r.cliente.nome), meter(p.totaleRicavi ? (r.riepilogo.ricavi / Math.max(...p.righe.map((q) => q.riepilogo.ricavi), 1)) * 100 : 0), h('strong', { classe: 'numero' }, euroIntero(r.riepilogo.ricavi))))))));
}
