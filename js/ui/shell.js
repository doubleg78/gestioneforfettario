import { h, iniziali, euro } from './dom.js';
import { icona } from './icone.js';
import { apriMenu } from './overlay.js';

export const ROTTE = [
  { path: '#/studio', titolo: 'Panoramica studio', icona: 'studio', gruppo: 'studio' },
  { path: '#/clienti', titolo: 'Clienti', icona: 'utenti', gruppo: 'studio' },
  { path: '#/agenda', titolo: 'Agenda scadenze', icona: 'calendario', gruppo: 'studio', badge: 'agenda' },
  { path: '#/riepilogo', titolo: 'Riepilogo', icona: 'grafico', gruppo: 'cliente' },
  { path: '#/anagrafica', titolo: 'Anagrafica', icona: 'utente', gruppo: 'cliente' },
  { path: '#/fatture', titolo: 'Fatture', icona: 'documento', gruppo: 'cliente' },
  { path: '#/spese', titolo: 'Spese', icona: 'ricevuta', gruppo: 'cliente' },
  { path: '#/simulazione', titolo: 'Simulazione', icona: 'bilancia', gruppo: 'cliente' },
  { path: '#/scadenze', titolo: 'Scadenzario', icona: 'calendario', gruppo: 'cliente' },
  { path: '#/parametri', titolo: 'Parametri fiscali', icona: 'libro', gruppo: 'sistema' },
  { path: '#/sicurezza', titolo: 'Backup e sicurezza', icona: 'scudo', gruppo: 'sistema' },
  { path: '#/impostazioni', titolo: 'Impostazioni', icona: 'impostazioni', gruppo: 'sistema' },
];

const GRUPPI = { studio: 'Studio', cliente: 'Cliente', sistema: 'Sistema' };

/**
 * Guscio dell'applicazione: barra laterale, barra superiore e contenuto.
 * @param {object} ctx contesto dell'app
 * @param {object} rotta voce di ROTTE attiva
 * @param {Node} contenuto vista già costruita
 * @param {{badgeAgenda:number}} extra
 */
export function costruisciShell(ctx, rotta, contenuto, { badgeAgenda = 0, azioni }) {
  const { cliente, dati } = ctx;
  let barra;
  const chiudiBarra = () => { barra.classList.remove('aperta'); document.querySelector('.velo-barra')?.remove(); };
  const apriBarra = () => {
    barra.classList.add('aperta');
    document.body.append(h('div', { classe: 'velo-barra', onClick: chiudiBarra }));
  };

  const selettore = h('button', { classe: 'selettore-cliente', type: 'button', 'aria-haspopup': 'menu', onClick: (e) => {
    const voci = dati.clienti.map((c) => ({ testo: c.nome || '(senza nome)', icona: c.id === cliente?.id ? 'spunta' : 'utente', onClick: () => azioni.selezionaCliente(c.id) }));
    apriMenu(e.currentTarget, [...voci, ...(voci.length ? ['sep'] : []), { testo: 'Tutti i clienti', icona: 'utenti', onClick: () => azioni.naviga('#/clienti') }, { testo: 'Nuovo cliente', icona: 'piu', onClick: () => azioni.nuovoCliente() }]);
  } },
  h('span', { classe: 'avatar' }, cliente ? iniziali(cliente.nome) : '+'),
  h('span', { classe: 'testi' }, h('strong', null, cliente ? cliente.nome || '(senza nome)' : 'Nessun cliente'), h('span', null, cliente ? `${etichettaPrevidenza(cliente)}` : 'Aggiungi il primo')),
  icona('giu', 16));

  const voce = (r) => h('a', { classe: 'nav-voce', href: r.path, 'aria-current': r === rotta ? 'page' : null, onClick: chiudiBarra },
    icona(r.icona, 18), r.titolo,
    r.badge === 'agenda' && badgeAgenda > 0 ? h('span', { classe: 'badge attenzione', title: 'Versamenti scaduti o in scadenza entro 14 giorni' }, badgeAgenda) : null);

  barra = h('nav', { classe: 'barra-laterale', 'aria-label': 'Navigazione principale' },
    h('a', { classe: 'marchio', href: '#/studio', onClick: chiudiBarra }, h('div', { classe: 'logo' }, icona('bilancia', 19)), h('div', null, h('strong', null, 'Gestione Forfettario'), h('span', null, ctx.studio.nome || 'Studio professionale'))),
    selettore,
    ...Object.entries(GRUPPI).map(([g, titolo]) => h('div', { classe: 'nav-gruppo' }, h('div', { classe: 'nav-titolo' }, titolo), ROTTE.filter((r) => r.gruppo === g).map(voce))),
    h('div', { classe: 'barra-fondo' },
      h('div', { classe: 'stato-sicuro' }, icona('lucchetto', 14), 'Archivio cifrato in locale'),
      h('button', { classe: 'bottone', type: 'button', style: 'background:transparent;color:#c7d0e0;border-color:rgba(255,255,255,.18);box-shadow:none', onClick: azioni.blocca }, icona('lucchetto', 16), 'Blocca archivio')));

  const nomeRotta = rotta.gruppo === 'cliente' && cliente ? h('span', { classe: 'percorso' }, h('span', { classe: 'cliente-nome' }, `${cliente.nome} /`), h('strong', null, rotta.titolo)) : h('span', { classe: 'percorso' }, h('strong', null, rotta.titolo));

  const anno = h('div', { classe: 'selezione-anno', role: 'group', 'aria-label': 'Anno di riferimento' },
    h('button', { type: 'button', 'aria-label': 'Anno precedente', onClick: () => azioni.impostaAnno(ctx.anno - 1) }, icona('chevronSx', 14)),
    h('strong', { title: 'Anno di riferimento' }, ctx.anno),
    h('button', { type: 'button', 'aria-label': 'Anno successivo', onClick: () => azioni.impostaAnno(ctx.anno + 1) }, icona('chevronDx', 14)));

  const topbar = h('header', { classe: 'topbar' },
    h('button', { classe: 'bottone ghost icona-sola pulsante-menu', type: 'button', 'aria-label': 'Apri il menu', onClick: apriBarra }, icona('menu', 20)),
    nomeRotta,
    h('span', { classe: 'spaziatore' }),
    h('button', { classe: 'pulsante-cerca', type: 'button', onClick: azioni.apriPalette, 'aria-label': 'Cerca' }, icona('cerca', 16), h('span', { classe: 'testo-cerca' }, 'Cerca…'), h('kbd', null, navigator.platform?.includes('Mac') ? '⌘K' : 'Ctrl K')),
    anno,
    h('button', { classe: 'bottone ghost icona-sola', type: 'button', title: 'Cambia tema', 'aria-label': 'Cambia tema', onClick: azioni.cambiaTema }, icona(azioni.temaScuro() ? 'sole' : 'luna', 18)));

  return h('div', { classe: 'app' }, barra, h('div', { classe: 'colonna-principale' }, topbar, h('main', { classe: 'contenuto', id: 'contenuto' }, contenuto)));
}

export function etichettaPrevidenza(c) {
  const t = { 'gestione-separata': 'Gestione Separata', artigiani: 'Artigiani', commercianti: 'Commercianti', cassa: 'Cassa professionale' };
  return t[c.previdenza.tipo] ?? '';
}

export { euro };
