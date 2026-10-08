import { h, iniziali, euro, dataIt } from './dom.js';
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
 * Guscio dell'applicazione: barra laterale, barra superiore con percorso, sottobarra a schede del cliente e contenuto.
 * @param {object} ctx contesto dell'app
 * @param {object} rotta voce di ROTTE attiva
 * @param {Node} contenuto vista già costruita
 * @param {{imminenti:object[], azioni:object}} extra
 */
export function costruisciShell(ctx, rotta, contenuto, { imminenti = [], azioni }) {
  const { cliente, dati } = ctx;
  let barra;
  const chiudiBarra = () => { barra.classList.remove('aperta'); document.querySelector('.velo-barra')?.remove(); };
  const apriBarra = () => {
    barra.classList.add('aperta');
    document.body.append(h('div', { classe: 'velo-barra', onClick: chiudiBarra }));
  };
  const nomeStudio = ctx.studio.nome || 'Studio professionale';
  const perCliente = rotta.gruppo === 'cliente';

  const voce = (r) => h('a', { classe: 'nav-voce', href: r.path, 'aria-current': r === rotta || (perCliente && r.path === '#/clienti') ? 'page' : null, onClick: chiudiBarra },
    icona(r.icona, 17), h('span', { classe: 'nav-testo' }, r.titolo),
    r.badge === 'agenda' && imminenti.length > 0 ? h('span', { classe: 'badge attenzione', title: 'Versamenti scaduti o in scadenza entro 14 giorni' }, imminenti.length) : null);

  barra = h('nav', { classe: 'barra-laterale', 'aria-label': 'Navigazione principale' },
    h('button', { classe: 'workspace', type: 'button', 'aria-haspopup': 'menu', onClick: (e) => apriMenu(e.currentTarget, menuUtente(ctx, azioni), { larghezza: 232 }) },
      h('div', { classe: 'logo' }, icona('bilancia', 16)),
      h('div', { classe: 'workspace-testi' }, h('strong', null, nomeStudio), h('span', null, 'Gestione Forfettario')),
      icona('su-giu', 14)),
    h('button', { classe: 'cerca-rapida', type: 'button', onClick: azioni.apriPalette }, icona('cerca', 15), 'Cerca…', h('kbd', null, navigator.platform?.includes('Mac') ? '⌘K' : 'Ctrl K')),
    ...Object.entries(GRUPPI).filter(([g]) => g !== 'cliente').map(([g, titolo]) => h('div', { classe: 'nav-gruppo' }, h('div', { classe: 'nav-titolo' }, titolo), ROTTE.filter((r) => r.gruppo === g).map(voce))),
    h('div', { classe: 'barra-fondo' },
      h('div', { classe: 'stato-sicuro' }, icona('lucchetto', 13), h('span', null, 'Cifrato in locale'), h('span', { classe: 'stato-salvato', id: 'stato-salvato' }, 'Salvato')),
      h('button', { classe: 'utente', type: 'button', 'aria-haspopup': 'menu', onClick: (e) => apriMenu(e.currentTarget, menuUtente(ctx, azioni), { larghezza: 232, sopra: true }) },
        h('span', { classe: 'avatar' }, iniziali(nomeStudio)), h('span', { classe: 'workspace-testi' }, h('strong', null, nomeStudio), h('span', null, ctx.studio.email || 'Account locale')), icona('su-giu', 14))));

  // Percorso: Clienti / <cliente ▾> / <pagina>
  const percorso = perCliente && cliente
    ? h('nav', { classe: 'percorso', 'aria-label': 'Percorso' },
      h('a', { href: '#/clienti' }, 'Clienti'), h('span', { classe: 'sep' }, '/'),
      h('button', { classe: 'cambia-cliente', type: 'button', 'aria-haspopup': 'menu', onClick: (e) => {
        const voci = dati.clienti.map((c) => ({ testo: c.nome || '(senza nome)', icona: c.id === cliente.id ? 'spunta' : 'utente', onClick: () => azioni.selezionaCliente(c.id) }));
        apriMenu(e.currentTarget, [...voci, 'sep', { testo: 'Tutti i clienti', icona: 'utenti', onClick: () => azioni.naviga('#/clienti') }, { testo: 'Nuovo cliente', icona: 'piu', onClick: () => azioni.nuovoCliente() }], { allinea: 'sinistra', larghezza: 260 });
      } }, h('span', { classe: 'avatar mini' }, iniziali(cliente.nome)), cliente.nome || '(senza nome)', icona('su-giu', 13)),
      h('span', { classe: 'sep' }, '/'), h('strong', null, rotta.titolo))
    : h('nav', { classe: 'percorso', 'aria-label': 'Percorso' }, h('strong', null, rotta.titolo));

  const anno = h('div', { classe: 'selezione-anno', role: 'group', 'aria-label': 'Anno di riferimento' },
    h('button', { type: 'button', 'aria-label': 'Anno precedente', onClick: () => azioni.impostaAnno(ctx.anno - 1) }, icona('chevronSx', 14)),
    h('strong', { title: 'Anno di riferimento' }, ctx.anno),
    h('button', { type: 'button', 'aria-label': 'Anno successivo', onClick: () => azioni.impostaAnno(ctx.anno + 1) }, icona('chevronDx', 14)));

  const campanella = h('button', { classe: 'bottone ghost icona-sola campanella', type: 'button', 'aria-label': `Notifiche${imminenti.length ? `, ${imminenti.length} da gestire` : ''}`, title: 'Scadenze imminenti', onClick: (e) => {
    const voci = imminenti.length
      ? imminenti.slice(0, 6).map((v) => ({ testo: `${dataIt(v.data)} · ${v.cliente.nome.split(' ')[0]} · ${v.descrizione}`, icona: v.data < ctx.oggi ? 'avviso' : 'calendario', onClick: () => azioni.naviga('#/agenda') }))
      : [{ testo: 'Nessun versamento in scadenza a breve', icona: 'spunta', onClick: () => {} }];
    apriMenu(e.currentTarget, [{ testo: 'Scadenze entro 14 giorni', intestazione: true }, ...voci, 'sep', { testo: 'Apri agenda scadenze', icona: 'calendario', onClick: () => azioni.naviga('#/agenda') }], { larghezza: 380 });
  } }, icona('campana', 18), imminenti.length ? h('span', { classe: 'punto-notifica' }) : null);

  const topbar = h('header', { classe: 'topbar' },
    h('button', { classe: 'bottone ghost icona-sola pulsante-menu', type: 'button', 'aria-label': 'Apri il menu', onClick: apriBarra }, icona('menu', 20)),
    percorso,
    h('span', { classe: 'spaziatore' }),
    h('button', { classe: 'pulsante-cerca-mobile bottone ghost icona-sola', type: 'button', 'aria-label': 'Cerca', onClick: azioni.apriPalette }, icona('cerca', 18)),
    anno, campanella,
    h('button', { classe: 'bottone ghost icona-sola', type: 'button', title: 'Cambia tema', 'aria-label': 'Cambia tema', onClick: azioni.cambiaTema }, icona(azioni.temaScuro() ? 'sole' : 'luna', 18)));

  const schede = perCliente && cliente
    ? h('div', { classe: 'sottobarra' }, h('nav', { classe: 'schede', 'aria-label': 'Sezioni del cliente' }, ROTTE.filter((r) => r.gruppo === 'cliente').map((r) =>
      h('a', { href: r.path, classe: 'scheda-nav', 'aria-current': r === rotta ? 'page' : null }, icona(r.icona, 15), r.titolo))))
    : null;

  return h('div', { classe: 'app' }, barra, h('div', { classe: 'colonna-principale' }, topbar, schede, h('main', { classe: 'contenuto', id: 'contenuto' }, contenuto)));
}

function menuUtente(ctx, azioni) {
  return [
    { testo: 'Impostazioni dello studio', icona: 'impostazioni', onClick: () => azioni.naviga('#/impostazioni') },
    { testo: 'Backup e sicurezza', icona: 'scudo', onClick: () => azioni.naviga('#/sicurezza') },
    { testo: azioni.temaScuro() ? 'Tema chiaro' : 'Tema scuro', icona: azioni.temaScuro() ? 'sole' : 'luna', onClick: azioni.cambiaTema },
    'sep',
    { testo: 'Blocca archivio', icona: 'lucchetto', onClick: azioni.blocca },
    { testo: 'Elimina archivio e riparti…', icona: 'cestino', pericolo: true, onClick: azioni.elimina },
  ];
}

export function etichettaPrevidenza(c) {
  const t = { 'gestione-separata': 'Gestione Separata', artigiani: 'Artigiani', commercianti: 'Commercianti', cassa: 'Cassa professionale' };
  return t[c.previdenza.tipo] ?? '';
}

export { euro };
