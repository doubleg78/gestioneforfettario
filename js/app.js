import { h } from './ui/dom.js';
import { Archivio } from './storage/vault.js';
import { adattatoreIndexedDB } from './storage/adapters.js';
import { parametriPerAnno } from './fiscal/params/index.js';
import { riepilogoAnno } from './domain/riepilogo.js';
import { agendaStudio } from './domain/studio.js';
import { scadenzarioCliente } from './domain/scadenze-cliente.js';
import { generaDemo } from './domain/demo.js';
import { nuovoCliente } from './domain/modello.js';
import { costruisciShell, ROTTE } from './ui/shell.js';
import { apriPalette, toast, conferma, confermaDigitando } from './ui/overlay.js';
import { schermataSblocco } from './ui/viste/sblocco.js';
import { vistaStudio } from './ui/viste/studio.js';
import { vistaClienti } from './ui/viste/clienti.js';
import { vistaAgenda } from './ui/viste/agenda.js';
import { vistaRiepilogo } from './ui/viste/riepilogo.js';
import { vistaAnagrafica } from './ui/viste/anagrafica.js';
import { vistaFatture } from './ui/viste/fatture.js';
import { vistaSpese } from './ui/viste/spese.js';
import { vistaSimulazione } from './ui/viste/simulazione.js';
import { vistaScadenze } from './ui/viste/scadenze.js';
import { vistaParametri } from './ui/viste/parametri.js';
import { vistaSicurezza } from './ui/viste/sicurezza.js';
import { vistaImpostazioni } from './ui/viste/impostazioni.js';

const VISTE = {
  '#/studio': vistaStudio, '#/clienti': vistaClienti, '#/agenda': vistaAgenda,
  '#/riepilogo': vistaRiepilogo, '#/anagrafica': vistaAnagrafica, '#/fatture': vistaFatture, '#/spese': vistaSpese,
  '#/simulazione': vistaSimulazione, '#/scadenze': vistaScadenze,
  '#/parametri': vistaParametri, '#/sicurezza': vistaSicurezza, '#/impostazioni': vistaImpostazioni,
};

const radice = document.getElementById('app');
const archivio = new Archivio(adattatoreIndexedDB());
const stato = {}; // stato transitorio dell'interfaccia (filtri, ordinamenti, form in corso)
let timerBlocco = null;
let listenerBloccoAttivi = false;

const oggiIso = () => new Date().toISOString().slice(0, 10);
const annoOggi = () => Number(oggiIso().slice(0, 4));

// ---- Tema ----
function leggiTemaLocale() { try { return localStorage.getItem('gf-tema') || 'auto'; } catch { return 'auto'; } }
function applicaTema(tema) {
  if (tema === 'chiaro' || tema === 'scuro') document.documentElement.dataset.tema = tema; else delete document.documentElement.dataset.tema;
  try { localStorage.setItem('gf-tema', tema); } catch { /* ambiente senza storage */ }
}
const temaScuroAttivo = () => document.documentElement.dataset.tema === 'scuro' || (!document.documentElement.dataset.tema && matchMedia('(prefers-color-scheme: dark)').matches);

// ---- Normalizzazione dei dati (archivi creati da versioni precedenti) ----
function normalizza(d) {
  d.ui ??= {};
  d.ui.tema ??= 'auto';
  d.ui.bloccoMin ??= 15;
  d.impostazioni ??= {};
  d.impostazioni.studio ??= { nome: '', descrizione: '', indirizzo: '', telefono: '', email: '', pec: '', partitaIva: '' };
  d.impostazioni.ripartizioneAcconti ??= 0.5;
  for (const c of d.clienti) { c.scadenzeCassa ??= []; c.versamenti ??= {}; c.pagati ??= {}; }
}

/** Eliminazione totale: cancella l'archivio cifrato e riporta l'app al primo avvio. */
async function eliminaArchivio() {
  const ok = await confermaDigitando({
    titolo: 'Eliminare tutto l’archivio?',
    testo: 'Verranno cancellati definitivamente clienti, fatture, spese, impostazioni e la password. L’operazione non si può annullare: se non hai un backup, i dati sono persi.',
  });
  if (!ok) return false;
  await archivio.elimina();
  try { localStorage.removeItem('gf-tema'); } catch { /* ambiente senza storage */ }
  for (const k of Object.keys(stato)) delete stato[k];
  history.replaceState(null, '', location.pathname + location.search);
  toast('Archivio eliminato. Puoi ripartire da zero.');
  return true;
}

// ---- Contesto passato alle viste ----
function costruisciCtx() {
  const dati = archivio.dati;
  const anno = dati.ui.anno ?? new Date().getFullYear();
  const cliente = dati.clienti.find((c) => c.id === dati.ui.clienteId) ?? dati.clienti[0] ?? null;
  const ctx = {
    archivio, dati, cliente, anno, oggi: oggiIso(), stato, studio: dati.impostazioni.studio,
    paramsPer: parametriPerAnno,
    ...parametriPerAnno(anno),
    aggiorna: disegna,
    naviga: (p) => { location.hash = p; },
    toast, conferma, eliminaArchivio,
    /** Riepilogo di un cliente per un anno, con i parametri corretti per anno. */
    riepilogo: (c = cliente, a = anno) => riepilogoAnno(c, dati, a, parametriPerAnno(a).params, { paramsPrec: parametriPerAnno(a - 1).params }),
    selezionaCliente: async (id, dest) => { await archivio.modifica((d) => { d.ui.clienteId = id; }); if (dest) location.hash = dest; },
    impostaAnno: (a) => archivio.modifica((d) => { d.ui.anno = a; }),
    nuovoCliente: async () => {
      const c = nuovoCliente();
      await archivio.modifica((d) => { d.clienti.push(c); d.ui.clienteId = c.id; });
      location.hash = '#/anagrafica';
    },
    caricaDemo: async () => {
      const demo = generaDemo(oggiIso());
      // Stato realistico: i versamenti già scaduti risultano versati, tranne una rata di esempio rimasta aperta
      for (const c of demo.clienti) {
        c.pagati = {};
        for (const v of scadenzarioCliente(c, demo, annoOggi(), parametriPerAnno).voci) {
          if (v.data && v.data < oggiIso() && v.importo > 0 && v.tipo !== 'adempimento' && !(c.nome === 'Luca Ferri' && v.id === 'inps-fisso-2')) c.pagati[`${annoOggi()}:${v.id}`] = v.data;
        }
      }
      await archivio.modifica((d) => {
        d.clienti.push(...demo.clienti); d.fatture.push(...demo.fatture); d.spese.push(...demo.spese);
        d.ui.clienteId ??= demo.clienti[0].id;
        if (!d.impostazioni.studio.nome) d.impostazioni.studio.nome = 'Studio Demo';
      });
      toast('Dati di esempio caricati.');
    },
  };
  return ctx;
}

const azioniShell = () => ({
  naviga: (p) => { location.hash = p; },
  selezionaCliente: async (id) => { await archivio.modifica((d) => { d.ui.clienteId = id; }); },
  nuovoCliente: () => costruisciCtx().nuovoCliente(),
  impostaAnno: (a) => archivio.modifica((d) => { d.ui.anno = a; }),
  blocca: () => archivio.blocca(),
  elimina: () => eliminaArchivio(),
  apriPalette: () => apriPalette(comandiPalette),
  cambiaTema: async () => { const nuovo = temaScuroAttivo() ? 'chiaro' : 'scuro'; applicaTema(nuovo); await archivio.modifica((d) => { d.ui.tema = nuovo; }); },
  temaScuro: temaScuroAttivo,
});

function comandiPalette() {
  const d = archivio.dati;
  const pagine = ROTTE.map((r) => ({ testo: r.titolo, gruppo: r.gruppo === 'cliente' ? 'Cliente' : r.gruppo === 'studio' ? 'Studio' : 'Sistema', icona: r.icona, esegui: () => { location.hash = r.path; } }));
  const clienti = d.clienti.map((c) => ({ testo: c.nome || '(senza nome)', gruppo: 'Apri cliente', icona: 'utente', esegui: async () => { await archivio.modifica((x) => { x.ui.clienteId = c.id; }); location.hash = '#/riepilogo'; } }));
  const azioni = [
    { testo: 'Nuovo cliente', gruppo: 'Azione', icona: 'piu', esegui: () => costruisciCtx().nuovoCliente() },
    { testo: 'Nuova fattura', gruppo: 'Azione', icona: 'documento', esegui: () => { stato.nuovaFattura = true; location.hash = '#/fatture'; disegna(); } },
    { testo: 'Cambia tema chiaro / scuro', gruppo: 'Azione', icona: 'luna', esegui: azioniShell().cambiaTema },
    { testo: 'Blocca archivio', gruppo: 'Azione', icona: 'lucchetto', esegui: () => archivio.blocca() },
    { testo: 'Elimina tutto l’archivio e riparti da zero', gruppo: 'Azione', icona: 'cestino', esegui: eliminaArchivio },
  ];
  return [...pagine, ...clienti, ...azioni];
}

// ---- Disegno ----
function disegna() {
  if (!archivio.sbloccato) return mostraSblocco();
  const ctx = costruisciCtx();
  const rotta = ROTTE.find((r) => r.path === location.hash) ?? ROTTE[0];
  const contenuto = rotta.gruppo === 'cliente' && !ctx.cliente
    ? h('div', null, VISTE['#/clienti'](ctx))
    : VISTE[rotta.path](ctx);
  const imminenti = agendaStudio(archivio.dati, ctx.anno, parametriPerAnno, { soloFuture: false, oggi: ctx.oggi })
    .filter((v) => v.importo > 0 && !v.versata && v.tipo !== 'adempimento' && v.data <= aggiungiGiorni(ctx.oggi, 14) && v.data >= `${ctx.anno}-01-01`);
  const scrollY = window.scrollY;
  const cambiaRotta = location.hash !== stato.ultimaRotta;
  radice.replaceChildren(costruisciShell(ctx, rotta, contenuto, { imminenti, azioni: azioniShell() }));
  if (cambiaRotta) document.getElementById('contenuto')?.classList.add('entra');
  window.scrollTo(0, cambiaRotta ? 0 : scrollY);
  stato.ultimaRotta = location.hash;
  const etSalvato = document.getElementById('stato-salvato');
  if (etSalvato && stato.salvatoAlle) etSalvato.textContent = `Salvato ${stato.salvatoAlle.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`;
  document.title = `${rotta.titolo} · Gestione Forfettario`;
}

const aggiungiGiorni = (iso, n) => { const x = new Date(`${iso}T00:00:00Z`); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };

async function mostraSblocco() {
  clearTimeout(timerBlocco);
  applicaTema(leggiTemaLocale());
  const esiste = await archivio.esiste();
  radice.replaceChildren(schermataSblocco(archivio, esiste, avviaSessione, {
    alEliminare: eliminaArchivio,
    alCreare: async ({ conDemo }) => { normalizza(archivio.dati); if (conDemo) await costruisciCtx().caricaDemo(); },
  }));
  document.title = 'Gestione Forfettario';
}

function avviaSessione() {
  normalizza(archivio.dati);
  applicaTema(archivio.dati.ui.tema);
  riparti();
  if (!listenerBloccoAttivi) {
    listenerBloccoAttivi = true;
    for (const ev of ['click', 'keydown', 'pointerdown']) document.addEventListener(ev, riparti, { passive: true });
  }
  if (!location.hash) location.hash = '#/studio';
  disegna();
}

function riparti() {
  clearTimeout(timerBlocco);
  if (!archivio.sbloccato) return;
  const min = archivio.dati.ui?.bloccoMin ?? 15;
  if (min > 0) timerBlocco = setTimeout(() => archivio.blocca(), min * 60 * 1000);
}

// ---- Avvio ----
archivio.ascolta(() => { if (!archivio.sbloccato) mostraSblocco(); });
const modificaOriginale = archivio.modifica.bind(archivio);
archivio.modifica = async (fn) => { const r = await modificaOriginale(fn); stato.salvatoAlle = new Date(); disegna(); return r; };
window.addEventListener('hashchange', () => { if (archivio.sbloccato) disegna(); });
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && archivio.sbloccato) { e.preventDefault(); apriPalette(comandiPalette); }
});
mostraSblocco();
