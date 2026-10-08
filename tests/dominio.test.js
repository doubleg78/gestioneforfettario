import test from 'node:test';
import assert from 'node:assert/strict';
import { partitaIvaValida, codiceFiscaleValido } from '../js/domain/validazione.js';
import { cercaAteco, titoloAteco2025 } from '../js/fiscal/ateco-ricerca.js';
import { parametriPerAnno } from '../js/fiscal/params/index.js';
import { scadenzarioCliente } from '../js/domain/scadenze-cliente.js';
import { panoramicaStudio, agendaStudio } from '../js/domain/studio.js';
import { nuovoCliente } from '../js/domain/modello.js';

test('partita IVA: cifra di controllo', () => {
  assert.equal(partitaIvaValida('01234567897'), true);
  assert.equal(partitaIvaValida('01234567890'), false);
  assert.equal(partitaIvaValida('1234'), false);
  assert.equal(partitaIvaValida('0123456789a'), false);
});

test('codice fiscale: formato e carattere di controllo', () => {
  assert.equal(codiceFiscaleValido('RSSMRA85T10A562S'), true);
  assert.equal(codiceFiscaleValido('rssmra85t10a562s'), true);
  assert.equal(codiceFiscaleValido('RSSMRA85T10A562X'), false);
  assert.equal(codiceFiscaleValido('RSSMRA85T10A562'), false);
});

test('ricerca ATECO 2025 per codice e per parole', () => {
  assert.equal(titoloAteco2025('62.10.00'), 'Attività di programmazione informatica');
  assert.equal(cercaAteco('62.10')[0].codice, '62.10.00');
  assert.ok(cercaAteco('programmazione informatica').some((r) => r.codice === '62.10.00'));
  assert.ok(cercaAteco('grafica pagine web').some((r) => r.codice === '74.12.01'));
  assert.deepEqual(cercaAteco('x'), []);
});

function studio() {
  const c = nuovoCliente();
  c.id = 'c1'; c.nome = 'Marta'; c.annoInizioAttivita = 2020;
  c.ateco = [{ codice: '62.20.10', descrizione: 'Consulenza', gruppo: 'altre-attivita' }];
  const dati = {
    clienti: [c],
    fatture: [
      { id: 'a', clienteId: 'c1', data: '2025-03-01', dataIncasso: '2025-03-20', importo: 30000, atecoCodice: '' },
      { id: 'b', clienteId: 'c1', data: '2026-02-01', dataIncasso: '2026-02-15', importo: 70000, atecoCodice: '' },
    ],
    spese: [],
  };
  return { c, dati };
}

test('scadenzario cliente: stime dall\'anno precedente e override', () => {
  const { c, dati } = studio();
  const s = scadenzarioCliente(c, dati, 2026, parametriPerAnno);
  assert.equal(s.stima.reddito, 20100);                     // 30.000 × 67%
  assert.ok(s.voci.some((v) => v.id === 'sost-saldo'));
  const sovr = scadenzarioCliente(c, dati, 2026, parametriPerAnno, { imposta: 1000, accSost: 400 });
  assert.equal(sovr.voci.find((v) => v.id === 'sost-saldo').importo, 600);
  c.pagati = { '2026:sost-saldo': '2026-07-10' };
  assert.equal(scadenzarioCliente(c, dati, 2026, parametriPerAnno).voci.find((v) => v.id === 'sost-saldo').versata, '2026-07-10');
});

test('panoramica e agenda dello studio', () => {
  const { c, dati } = studio();
  const p = panoramicaStudio(dati, 2026, parametriPerAnno, '2026-10-08');
  assert.equal(p.righe.length, 1);
  assert.equal(p.totaleRicavi, 70000);
  assert.equal(p.righe[0].riepilogo.soglie.stato, 'ok');
  assert.ok(p.righe[0].prossima);
  assert.ok(p.righe[0].prossima.data >= '2026-10-08');
  const ag = agendaStudio(dati, 2026, parametriPerAnno, { soloFuture: true, oggi: '2026-10-08' });
  assert.ok(ag.length > 0 && ag.every((v) => v.data >= '2026-10-08' && v.cliente.id === 'c1'));
  c.ateco = [];
  assert.doesNotThrow(() => panoramicaStudio(dati, 2026, parametriPerAnno, '2026-10-08'));
});

import { generaDemo } from '../js/domain/demo.js';
import { riepilogoAnno } from '../js/domain/riepilogo.js';

test('dati demo: deterministici, coerenti e con casi significativi', () => {
  const a = generaDemo('2026-10-08');
  const b = generaDemo('2026-10-08');
  assert.deepEqual(a, b);
  assert.equal(a.clienti.length, 7);
  assert.ok(a.fatture.length > 100);
  assert.ok(a.fatture.every((f) => !f.dataIncasso || (f.dataIncasso <= '2026-10-08' && f.dataIncasso >= f.data)));
  assert.ok(a.clienti.every((c) => partitaIvaValida(c.partitaIva) && c.ateco[0].gruppo));
  const dati = { ...a };
  const stato = Object.fromEntries(a.clienti.map((c) => [c.nome, riepilogoAnno(c, dati, 2026, parametriPerAnno(2026).params).soglie.stato]));
  assert.equal(stato['Paolo Mancini'], 'attenzione');
  assert.equal(stato['Andrea Sala'], 'esce-anno-successivo');
  assert.equal(stato['Marta Conti'], 'ok');
});
