import test from 'node:test';
import assert from 'node:assert/strict';
import { parametriAnno } from '../js/fiscal/params/index.js';
import { riepilogoAnno } from '../js/domain/riepilogo.js';
import { nuovoCliente } from '../js/domain/modello.js';

const p = parametriAnno(2026);

function scenario() {
  const c = nuovoCliente();
  c.id = 'c1';
  c.annoInizioAttivita = 2020;
  c.ateco = [
    { codice: '70.22.09', descrizione: 'Consulenza', gruppo: 'attivita-professionali-sanitarie' },
    { codice: '47.91.10', descrizione: 'Vendita online', gruppo: 'commercio-ingrosso-dettaglio' },
  ];
  const dati = {
    fatture: [
      { id: '1', clienteId: 'c1', data: '2025-12-20', dataIncasso: '2026-01-15', importo: 10000, atecoCodice: '70.22.09' },
      { id: '2', clienteId: 'c1', data: '2026-03-01', dataIncasso: '2026-03-10', importo: 5000, atecoCodice: '47.91.10' },
      { id: '3', clienteId: 'c1', data: '2026-04-01', dataIncasso: '', importo: 2000, atecoCodice: '70.22.09' },
      { id: '4', clienteId: 'c1', data: '2026-05-01', dataIncasso: '2027-01-10', importo: 900, atecoCodice: '70.22.09' },
      { id: '5', clienteId: 'altro', data: '2026-05-01', dataIncasso: '2026-05-02', importo: 7000, atecoCodice: '' },
    ],
    spese: [{ id: 's', clienteId: 'c1', data: '2026-02-02', importo: 300 }],
  };
  return { c, dati };
}

test('criterio di cassa: conta l’anno di incasso, non quello di emissione', () => {
  const { c, dati } = scenario();
  const r = riepilogoAnno(c, dati, 2026, p);
  assert.equal(r.ricavi, 15000);
  assert.equal(r.daIncassare, 2000);
  assert.equal(r.spese, 300);
  assert.equal(r.perAteco[0].importo, 10000);
  assert.equal(r.perAteco[1].importo, 5000);
});

test('forfettario calcolato sui coefficienti delle voci ATECO', () => {
  const { c, dati } = scenario();
  const r = riepilogoAnno(c, dati, 2026, p);
  assert.equal(r.forfettario.redditoLordo, 10000 * 0.78 + 5000 * 0.4);
  assert.equal(r.aliquota.aliquota, 0.15);
  assert.equal(r.soglie.stato, 'ok');
});

test('startup 5% e fatture senza ATECO assegnate alla prima voce', () => {
  const { c, dati } = scenario();
  c.annoInizioAttivita = 2024;
  c.startup = true;
  dati.fatture[1].atecoCodice = '';
  const r = riepilogoAnno(c, dati, 2026, p);
  assert.equal(r.aliquota.aliquota, 0.05);
  assert.equal(r.perAteco[0].importo, 15000);
});

test('nessuna voce ATECO: nessun calcolo forfettario', () => {
  const { c, dati } = scenario();
  c.ateco = [];
  const r = riepilogoAnno(c, dati, 2026, p);
  assert.equal(r.forfettario, null);
  assert.equal(r.ricavi, 15000);
});
