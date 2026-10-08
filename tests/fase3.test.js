import test from 'node:test';
import assert from 'node:assert/strict';
import { parametriAnno } from '../js/fiscal/params/index.js';
import { calcolaScadenzario, prossimoLavorativo, eFestivo } from '../js/fiscal/scadenzario.js';
import { incassiMensili, cumulato } from '../js/domain/serie.js';
import { generaCsv, csvFatture, csvScadenzario } from '../js/export/csv.js';

const p = parametriAnno(2026);

test('giorni lavorativi: weekend, festivi e lunedì dell’Angelo', () => {
  assert.equal(eFestivo('2026-06-30'), false);           // martedì
  assert.equal(prossimoLavorativo('2026-11-30'), '2026-11-30'); // lunedì
  assert.equal(prossimoLavorativo('2026-11-17'), '2026-11-17'); // martedì
  assert.equal(prossimoLavorativo('2026-08-15'), '2026-08-17'); // sabato Ferragosto -> lunedì
  assert.equal(prossimoLavorativo('2026-04-06'), '2026-04-07'); // lunedì dell'Angelo 2026
  assert.equal(prossimoLavorativo('2027-02-16'), '2027-02-16');
  assert.equal(prossimoLavorativo('2026-05-18'), '2026-05-18');
});

const base = {
  annoPagamento: 2026, impostaAnnoPrec: 4000, accontiSostitutivaVersati: 3000,
  contributiAnnoPrec: { totale: 10000 }, accontiInpsVersati: 8000,
  previdenza: { tipo: 'gestione-separata' },
};

test('scadenzario Gestione Separata: saldo e acconti imposta e contributi', () => {
  const v = calcolaScadenzario(p, base);
  const per = (id) => v.find((x) => x.id === id);
  assert.equal(per('sost-saldo').importo, 1000);
  assert.equal(per('sost-saldo').codiceTributo, '1792');
  assert.equal(per('sost-acc1').importo, 2000);
  assert.equal(per('sost-acc1').codiceTributo, '1790');
  assert.equal(per('sost-acc2').importo, 2000);
  assert.equal(per('sost-acc2').codiceTributo, '1791');
  assert.equal(per('sost-acc2').data, '2026-11-30');
  assert.equal(per('sost-saldo').data, '2026-06-30');
  assert.equal(per('inps-saldo').importo, 2000);
  assert.equal(per('inps-acc1').importo, 4000);          // 80% / 2
  assert.equal(per('dichiarazione').data, '2026-11-02'); // 31/10 sabato, 1/11 festivo: slitta a lunedì 2/11
});

test('scadenzario: proroga 2026 al 20 luglio solo se richiesta', () => {
  const v = calcolaScadenzario(p, { ...base, prorogaEstate2026: true });
  assert.equal(v.find((x) => x.id === 'sost-saldo').data, '2026-07-20');
  assert.equal(v.find((x) => x.id === 'sost-acc2').data, '2026-11-30');
});

test('scadenzario: saldo a credito non genera versamento', () => {
  const v = calcolaScadenzario(p, { ...base, impostaAnnoPrec: 1000, accontiSostitutivaVersati: 1500 });
  const s = v.find((x) => x.id === 'sost-saldo');
  assert.equal(s.importo, 0);
  assert.match(s.nota, /Credito/);
});

test('scadenzario: imposta anno precedente sotto soglia, nessun acconto', () => {
  const v = calcolaScadenzario(p, { ...base, impostaAnnoPrec: 40, accontiSostitutivaVersati: 0 });
  assert.equal(v.some((x) => x.id.startsWith('sost-acc')), false);
});

test('scadenzario artigiani: 4 rate dei contributi fissi', () => {
  const v = calcolaScadenzario(p, { ...base, previdenza: { tipo: 'artigiani' }, contributiAnnoPrec: { totale: 6000 } });
  const fissi = v.filter((x) => x.id.startsWith('inps-fisso'));
  assert.equal(fissi.length, 4);
  assert.equal(fissi[0].importo, 1130.34);      // 4521,36 / 4
  assert.equal(fissi[3].data, '2027-02-16');
});

test('scadenzario cassa professionale: non calcolato', () => {
  const v = calcolaScadenzario(p, { ...base, previdenza: { tipo: 'cassa' } });
  assert.ok(v.find((x) => x.id === 'inps-cassa'));
});

test('incassi mensili e cumulato', () => {
  const f = [
    { clienteId: 'c', dataIncasso: '2026-01-10', importo: 100 },
    { clienteId: 'c', dataIncasso: '2026-01-25', importo: 50.5 },
    { clienteId: 'c', dataIncasso: '2026-03-02', importo: 200 },
    { clienteId: 'c', dataIncasso: '2025-03-02', importo: 999 },
    { clienteId: 'x', dataIncasso: '2026-03-02', importo: 999 },
  ];
  const m = incassiMensili(f, 'c', 2026);
  assert.equal(m[0], 150.5);
  assert.equal(m[2], 200);
  assert.equal(cumulato(m)[11], 350.5);
});

test('CSV: formato italiano, virgolette e neutralizzazione formule', () => {
  const csv = generaCsv(['A', 'B'], [['x;y', 1234.5], ['=CMD()', 'ok "q"']]);
  assert.ok(csv.startsWith('﻿'));
  assert.match(csv, /"x;y";1234,50/);
  assert.match(csv, /'=CMD\(\);"ok ""q"""/);
  assert.match(csvFatture([{ numero: '1', data: '2026-01-05', controparte: 'A', importo: 10, dataIncasso: '', bollo: 2, atecoCodice: '' }]), /1;05\/01\/2026;A;10,00;;2,00;/);
  assert.match(csvScadenzario([{ data: '2026-06-30', descrizione: 'S', importo: 1, codiceTributo: '1792', annoRiferimento: 2025, nota: '' }]), /30\/06\/2026;S;1,00;1792;2025/);
});
