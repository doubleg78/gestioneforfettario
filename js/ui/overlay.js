// Drawer, dialoghi, menu contestuali, toast e palette comandi (con trappola del focus e chiusura con Esc).
import { h } from './dom.js';
import { icona } from './icone.js';

let pila = []; // overlay aperti, l'ultimo è in primo piano

function trappola(contenitore) {
  const focalizzabili = () => [...contenitore.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter((e) => e.offsetParent !== null);
  contenitore.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = focalizzabili();
    if (!f.length) return;
    const primo = f[0], ultimo = f[f.length - 1];
    if (e.shiftKey && document.activeElement === primo) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primo.focus(); }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && pila.length) { e.preventDefault(); pila[pila.length - 1].chiudi(); }
});

function montaOverlay(nodi, { chiudiSuVelo = true, onChiudi } = {}) {
  const precedente = document.activeElement;
  const velo = h('div', { classe: 'velo', onClick: chiudiSuVelo ? () => voce.chiudi() : null });
  document.body.append(velo, ...nodi);
  const voce = {
    chiudi() {
      pila = pila.filter((v) => v !== voce);
      velo.remove(); nodi.forEach((n) => n.remove());
      onChiudi?.();
      precedente?.focus?.();
    },
  };
  pila.push(voce);
  trappola(nodi[0]);
  (nodi[0].querySelector('[autofocus], input:not([type=hidden]), select, textarea') ?? nodi[0].querySelector('button'))?.focus();
  return voce;
}

/** Pannello laterale per moduli e dettagli. `corpo` e `azioni` sono nodi; restituisce {chiudi}. */
export function apriDrawer({ titolo, sottotitolo, corpo, azioni, onChiudi }) {
  const pannello = h('aside', { classe: 'drawer', role: 'dialog', 'aria-modal': 'true', 'aria-label': titolo },
    h('div', { classe: 'drawer-testa' },
      h('div', null, h('h2', null, titolo), sottotitolo ? h('p', { classe: 'muted piccolo' }, sottotitolo) : null),
      h('button', { classe: 'bottone ghost icona-sola', type: 'button', 'aria-label': 'Chiudi', onClick: () => v.chiudi() }, icona('chiudi', 18))),
    h('div', { classe: 'drawer-corpo' }, corpo),
    azioni ? h('div', { classe: 'drawer-piede' }, azioni) : null);
  const v = montaOverlay([pannello], { onChiudi });
  return v;
}

export function apriDialogo({ titolo, corpo, azioni, largo = false, onChiudi }) {
  const d = h('div', { classe: `dialogo ${largo ? 'largo' : ''}`, role: 'dialog', 'aria-modal': 'true', 'aria-label': titolo },
    h('div', { classe: 'dialogo-corpo' }, h('h2', null, titolo), corpo),
    azioni ? h('div', { classe: 'dialogo-piede' }, azioni) : null);
  return montaOverlay([d], { onChiudi });
}

/** Conferma modale (sostituisce window.confirm). Restituisce una Promise<boolean>. */
export function conferma({ titolo, testo, etichetta = 'Conferma', pericolo = false }) {
  return new Promise((ok) => {
    let risolto = false;
    const fine = (v) => { if (!risolto) { risolto = true; ok(v); } };
    const dlg = apriDialogo({
      titolo, corpo: h('p', { classe: 'muted' }, testo), onChiudi: () => fine(false),
      azioni: [
        h('button', { classe: 'bottone', type: 'button', onClick: () => dlg.chiudi() }, 'Annulla'),
        h('button', { classe: `bottone ${pericolo ? 'pericolo pieno' : 'primario'}`, type: 'button', onClick: () => { fine(true); dlg.chiudi(); } }, etichetta),
      ],
    });
  });
}

/** Menu contestuale ancorato a un elemento. voci: [{testo, icona, onClick, pericolo}] o 'sep'. */
export function apriMenu(ancora, voci) {
  document.querySelectorAll('.menu-contestuale').forEach((m) => m.remove());
  const r = ancora.getBoundingClientRect();
  const menu = h('div', { classe: 'menu-contestuale', role: 'menu' }, voci.map((v) => (v === 'sep' ? h('hr') : h('button', {
    type: 'button', role: 'menuitem', classe: v.pericolo ? 'pericolo' : '',
    onClick: () => { chiudi(); v.onClick(); },
  }, v.icona ? icona(v.icona, 16) : null, v.testo))));
  document.body.append(menu);
  const larghezza = menu.offsetWidth;
  menu.style.top = `${Math.min(r.bottom + 6, window.innerHeight - menu.offsetHeight - 8)}px`;
  menu.style.left = `${Math.max(8, Math.min(r.right - larghezza, window.innerWidth - larghezza - 8))}px`;
  const chiudi = () => { menu.remove(); document.removeEventListener('pointerdown', fuori, true); document.removeEventListener('keydown', tasto, true); };
  const fuori = (e) => { if (!menu.contains(e.target)) chiudi(); };
  const tasto = (e) => { if (e.key === 'Escape') { e.stopPropagation(); chiudi(); ancora.focus(); } if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); const b = [...menu.querySelectorAll('button')]; const i = b.indexOf(document.activeElement); b[(i + (e.key === 'ArrowDown' ? 1 : -1) + b.length) % b.length].focus(); } };
  setTimeout(() => { document.addEventListener('pointerdown', fuori, true); document.addEventListener('keydown', tasto, true); }, 0);
  menu.querySelector('button')?.focus();
}

let contenitoreToast;
export function toast(messaggio, tipo = 'ok') {
  if (!contenitoreToast || !document.body.contains(contenitoreToast)) {
    contenitoreToast = h('div', { classe: 'toasts', 'aria-live': 'polite' });
    document.body.append(contenitoreToast);
  }
  const t = h('div', { classe: `toast ${tipo}`, role: 'status' }, icona(tipo === 'errore' ? 'avviso' : 'spunta', 18), h('div', null, messaggio));
  contenitoreToast.append(t);
  setTimeout(() => { t.style.transition = 'opacity .25s'; t.style.opacity = '0'; setTimeout(() => t.remove(), 260); }, tipo === 'errore' ? 6000 : 3200);
}

/** Palette comandi (Ctrl/Cmd+K). `comandi`: [{testo, gruppo, icona, esegui}] fornita da una funzione, ricalcolata a ogni apertura. */
export function apriPalette(fornisciComandi) {
  const comandi = fornisciComandi();
  let filtrati = comandi, sel = 0;
  const input = h('input', { type: 'text', placeholder: 'Cerca una pagina, un cliente o un’azione…', 'aria-label': 'Cerca comandi', autocomplete: 'off' });
  const lista = h('ul', { role: 'listbox' });
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const disegna = () => {
    lista.replaceChildren(...(filtrati.length ? filtrati.map((c, i) => h('li', {
      role: 'option', 'aria-selected': i === sel ? 'true' : 'false',
      onClick: () => esegui(c), onPointermove: () => { if (sel !== i) { sel = i; disegna(); } },
    }, icona(c.icona ?? 'freccia', 18), c.testo, h('span', { classe: 'gruppo' }, c.gruppo))) : [h('div', { classe: 'vuoto-palette' }, 'Nessun risultato')]));
    lista.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  };
  const esegui = (c) => { v.chiudi(); setTimeout(() => c.esegui(), 0); };
  const box = h('div', { classe: 'palette', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Palette comandi' }, input, lista);
  const v = montaOverlay([box]);
  input.addEventListener('input', () => { const q = norm(input.value); filtrati = comandi.filter((c) => norm(`${c.testo} ${c.gruppo}`).includes(q)); sel = 0; disegna(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, filtrati.length - 1); disegna(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); disegna(); }
    if (e.key === 'Enter' && filtrati[sel]) { e.preventDefault(); esegui(filtrati[sel]); }
  });
  disegna();
  return v;
}
