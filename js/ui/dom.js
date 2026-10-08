// Costruzione del DOM senza innerHTML: ogni stringa dell'utente passa da textContent.

export function h(tag, attrs, ...figli) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'classe') el.className = v;
    else if (k === 'valore') el.value = v;
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  aggiungi(el, figli);
  return el;
}

function aggiungi(el, figli) {
  for (const f of figli.flat(Infinity)) {
    if (f === null || f === undefined || f === false) continue;
    el.append(f instanceof Node ? f : document.createTextNode(String(f)));
  }
}

const eur = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });
export const euro = (n) => eur.format(n ?? 0);
export const dataIt = (iso) => (iso ? iso.split('-').reverse().join('/') : '');
export const percentuale = (n) => `${(n * 100).toLocaleString('it-IT', { maximumFractionDigits: 2 })}%`;

/** Campo di form con etichetta; `ctrl` è l'elemento input/select già costruito. */
export function campo(etichetta, ctrl, nota) {
  const id = `c-${Math.random().toString(36).slice(2, 9)}`;
  ctrl.id = id;
  return h('div', { classe: 'campo' }, h('label', { for: id }, etichetta), ctrl, nota ? h('small', null, nota) : null);
}

export function avviso(tipo, titolo, testo) {
  return h('div', { classe: `avviso ${tipo}`, role: tipo === 'errore' ? 'alert' : 'status' }, h('strong', null, titolo), testo ? ` ${testo}` : '');
}

export function selezionaFile(accept, multiplo = false) {
  return new Promise((ok) => {
    const inp = h('input', { type: 'file', accept, multiple: multiplo });
    inp.addEventListener('change', () => ok([...inp.files]));
    inp.addEventListener('cancel', () => ok([]));
    inp.click();
  });
}

export function scarica(nomeFile, contenuto, tipo = 'application/json') {
  const url = URL.createObjectURL(new Blob([contenuto], { type: tipo }));
  const a = h('a', { href: url, download: nomeFile });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
