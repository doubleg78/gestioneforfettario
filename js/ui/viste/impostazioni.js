import { h, campo, scheda, testataPagina, bottone, avviso, chip } from '../dom.js';
import { eDemo } from '../../domain/demo.js';

export function vistaImpostazioni(ctx) {
  const { archivio, dati } = ctx;
  const studio = structuredClone(dati.impostazioni.studio);
  const testo = (chiave, etichetta, props = {}) => campo(etichetta, h('input', { classe: 'input', type: 'text', valore: studio[chiave] ?? '', onInput: (e) => { studio[chiave] = e.target.value; }, ...props }));
  const nDemo = dati.clienti.filter(eDemo).length;
  const tema = dati.ui.tema ?? 'auto';

  const salva = async () => { await archivio.modifica((d) => { d.impostazioni.studio = studio; }); ctx.toast('Dati dello studio salvati.'); };

  return h('div', { classe: 'pila' },
    testataPagina('Impostazioni'),
    scheda({ titolo: 'Dati dello studio', sottotitolo: 'Compaiono nell’intestazione dei PDF e nel menu' },
      h('form', { classe: 'pila', style: 'gap:16px', onSubmit: (e) => { e.preventDefault(); salva(); } },
        h('div', { classe: 'griglia-campi' }, testo('nome', 'Nome dello studio', { placeholder: 'Studio Rossi & Associati' }), testo('descrizione', 'Descrizione', { placeholder: 'Dottori commercialisti' }), testo('partitaIva', 'Partita IVA')),
        h('div', { classe: 'griglia-campi' }, testo('indirizzo', 'Indirizzo'), testo('telefono', 'Telefono'), testo('email', 'Email', { type: 'email' }), testo('pec', 'PEC', { type: 'email' })),
        h('div', null, bottone('Salva', { variante: 'primario', tipo: 'submit', icona: 'spunta' })))),
    scheda({ titolo: 'Aspetto' },
      h('div', { classe: 'riga-flex' },
        h('div', { classe: 'segmenti', role: 'group', 'aria-label': 'Tema' }, [['auto', 'Automatico'], ['chiaro', 'Chiaro'], ['scuro', 'Scuro']].map(([v, t]) => h('button', { type: 'button', 'aria-pressed': String(tema === v), onClick: async () => {
          if (v === 'auto') delete document.documentElement.dataset.tema; else document.documentElement.dataset.tema = v;
          try { localStorage.setItem('gf-tema', v); } catch { /* ignora */ }
          await archivio.modifica((d) => { d.ui.tema = v; });
        } }, t))))),
    scheda({ titolo: 'Dati di esempio', sottotitolo: 'Per dimostrazioni e prove' },
      h('div', { classe: 'pila', style: 'gap:14px' },
        h('p', { classe: 'muted' }, nDemo ? `Sono presenti ${nDemo} clienti di esempio (fatture, spese e scadenze incluse).` : 'Aggiungi sette clienti inventati, con fatture e spese del periodo corrente, per esplorare l’app.'),
        h('div', { classe: 'gruppo-azioni' },
          bottone('Carica dati di esempio', { icona: 'carica', onClick: ctx.caricaDemo, disabled: nDemo > 0 }),
          nDemo ? bottone('Rimuovi i dati di esempio', { variante: 'pericolo', icona: 'cestino', onClick: async () => {
            if (!(await ctx.conferma({ titolo: 'Rimuovere i dati di esempio?', testo: 'Verranno eliminati solo i clienti di esempio con le loro fatture e spese.', etichetta: 'Rimuovi', pericolo: true }))) return;
            await archivio.modifica((d) => { const ids = new Set(d.clienti.filter(eDemo).map((c) => c.id)); d.clienti = d.clienti.filter((c) => !ids.has(c.id)); d.fatture = d.fatture.filter((f) => !ids.has(f.clienteId)); d.spese = d.spese.filter((s) => !ids.has(s.clienteId)); if (ids.has(d.ui.clienteId)) d.ui.clienteId = d.clienti[0]?.id ?? null; });
            ctx.toast('Dati di esempio rimossi.');
          } }) : null))));
}
