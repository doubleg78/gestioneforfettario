import { h } from './ui/dom.js';
import { Archivio } from './storage/vault.js';
import { adattatoreIndexedDB } from './storage/adapters.js';
import { parametriAnno } from './fiscal/params/index.js';
import { schermataSblocco } from './ui/sblocco.js';
import { vistaClienti } from './ui/clienti.js';
import { vistaAnagrafica } from './ui/anagrafica.js';
import { vistaFatture } from './ui/fatture.js';
import { vistaSpese } from './ui/spese.js';
import { vistaRiepilogo } from './ui/riepilogo.js';
import { vistaBackup } from './ui/backup.js';
import { vistaSimulazione } from './ui/simulazione.js';
import { vistaScadenze } from './ui/scadenze.js';

const ROTTE = [
  { path: '#/riepilogo', titolo: 'Riepilogo', vista: vistaRiepilogo },
  { path: '#/clienti', titolo: 'Clienti', vista: vistaClienti },
  { path: '#/anagrafica', titolo: 'Anagrafica', vista: vistaAnagrafica },
  { path: '#/fatture', titolo: 'Fatture', vista: vistaFatture },
  { path: '#/spese', titolo: 'Spese', vista: vistaSpese },
  { path: '#/simulazione', titolo: 'Simulazione', vista: vistaSimulazione },
  { path: '#/scadenze', titolo: 'Scadenzario', vista: vistaScadenze },
  { path: '#/backup', titolo: 'Backup', vista: vistaBackup },
];
const INATTIVITA_MS = 15 * 60 * 1000;

const radice = document.getElementById('app');
const archivio = new Archivio(adattatoreIndexedDB());
const stato = {}; // stato transitorio dell'interfaccia (filtri, modifica in corso)
let timerBlocco = null;

function params() { return parametriAnno(2026); }

function contesto() {
  const dati = archivio.dati;
  const cliente = dati.clienti.find((c) => c.id === dati.ui.clienteId) ?? dati.clienti[0] ?? null;
  return {
    archivio, dati, cliente, params: params(), stato,
    aggiorna: disegna,
    selezionaCliente: async (id, dest) => { await archivio.modifica((d) => { d.ui.clienteId = id; }); if (dest) location.hash = dest; },
  };
}

function disegna() {
  if (!archivio.sbloccato) return mostraSblocco();
  const ctx = contesto();
  const predefinita = ctx.cliente ? ROTTE[0] : ROTTE.find((r) => r.path === '#/clienti');
  const rotta = ROTTE.find((r) => r.path === location.hash) ?? predefinita;
  const selettore = h('select', { 'aria-label': 'Cliente attivo', onChange: (e) => ctx.selezionaCliente(e.target.value) },
    ctx.dati.clienti.length ? ctx.dati.clienti.map((c) => h('option', { value: c.id, selected: c.id === ctx.cliente?.id }, c.nome || '(senza nome)')) : h('option', null, 'Nessun cliente'));

  radice.replaceChildren(h('div', { classe: 'layout' },
    h('nav', { classe: 'barra', 'aria-label': 'Navigazione principale' },
      h('h1', null, 'Gestione Forfettario'),
      h('div', null, h('label', null, 'Cliente attivo'), selettore),
      h('div', { classe: 'menu' }, ROTTE.map((r) => h('a', { href: r.path, 'aria-current': r === rotta ? 'page' : null }, r.titolo))),
      h('div', { classe: 'fondo' }, h('button', { onClick: () => { archivio.blocca(); } }, 'Blocca archivio'))),
    h('main', null, rotta.vista(ctx))));
}

async function mostraSblocco() {
  clearTimeout(timerBlocco);
  const esiste = await archivio.esiste();
  radice.replaceChildren(schermataSblocco(archivio, esiste, () => { avviaTimerBlocco(); disegna(); }));
}

function avviaTimerBlocco() {
  const riparti = () => { clearTimeout(timerBlocco); timerBlocco = setTimeout(() => archivio.blocca(), INATTIVITA_MS); };
  for (const ev of ['click', 'keydown', 'pointerdown']) document.addEventListener(ev, riparti, { passive: true });
  riparti();
}

archivio.ascolta(() => { if (!archivio.sbloccato) mostraSblocco(); });
// Ridisegna dopo ogni modifica dei dati (le viste sono funzioni pure dello stato)
const modificaOriginale = archivio.modifica.bind(archivio);
archivio.modifica = async (fn) => { const r = await modificaOriginale(fn); disegna(); return r; };
window.addEventListener('hashchange', () => { if (archivio.sbloccato) disegna(); });
mostraSblocco();
