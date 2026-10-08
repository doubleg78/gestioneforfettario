import test from 'node:test';
import assert from 'node:assert/strict';
import { Archivio } from '../js/storage/vault.js';
import { adattatoreMemoria } from '../js/storage/adapters.js';
import { ErrorePassword } from '../js/storage/crypto.js';

const nuovo = (a = adattatoreMemoria()) => new Archivio(a, { iterazioni: 1000 });

test('crea, modifica, blocca e sblocca con la password', async () => {
  const a = adattatoreMemoria();
  const arch = nuovo(a);
  assert.equal(await arch.esiste(), false);
  await arch.crea('segreta');
  await arch.modifica((d) => d.clienti.push({ id: '1', nome: 'Mario Rossi' }));
  arch.blocca();
  assert.equal(arch.sbloccato, false);

  const arch2 = nuovo(a);
  assert.equal(await arch2.esiste(), true);
  await arch2.sblocca('segreta');
  assert.equal(arch2.dati.clienti[0].nome, 'Mario Rossi');
});

test('password errata', async () => {
  const a = adattatoreMemoria();
  const arch = nuovo(a);
  await arch.crea('giusta');
  await assert.rejects(() => nuovo(a).sblocca('sbagliata'), ErrorePassword);
});

test('i dati su disco sono cifrati', async () => {
  const a = adattatoreMemoria();
  const arch = nuovo(a);
  await arch.crea('pw');
  await arch.modifica((d) => d.clienti.push({ id: '1', nome: 'NomeRiconoscibile' }));
  const blob = await a.leggi('archivio');
  assert.ok(!JSON.stringify(blob).includes('NomeRiconoscibile'));
});

test('un blob alterato non si apre', async () => {
  const a = adattatoreMemoria();
  const arch = nuovo(a);
  await arch.crea('pw');
  const blob = await arch.esporta();
  const alterato = { ...blob, dati: blob.dati.slice(0, -4) + 'AAAA' };
  await assert.rejects(() => nuovo().importa(alterato, 'pw'), ErrorePassword);
});

test('backup: esporta e ripristina in un archivio vuoto', async () => {
  const arch = nuovo();
  await arch.crea('pw');
  await arch.modifica((d) => d.fatture.push({ id: 'f', importo: 100 }));
  const backup = await arch.esporta();

  const altro = nuovo();
  await altro.importa(backup, 'pw');
  assert.equal(altro.dati.fatture[0].importo, 100);
  assert.equal(await altro.esiste(), true);
});

test('salvataggi concorrenti non si perdono', async () => {
  const a = adattatoreMemoria();
  const arch = nuovo(a);
  await arch.crea('pw');
  await Promise.all([1, 2, 3, 4, 5].map((i) => arch.modifica((d) => d.spese.push({ id: String(i) }))));
  const lettura = nuovo(a);
  await lettura.sblocca('pw');
  assert.equal(lettura.dati.spese.length, 5);
});
