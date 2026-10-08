import test from 'node:test';
import assert from 'node:assert/strict';
import { parametriAnno } from '../js/fiscal/params/index.js';
import { calcolaScadenzario, prossimoLavorativo, eFestivo, accontoInpsTotale } from '../js/fiscal/scadenzario.js';
import { incassiMensili, cumulato, bolloPerTrimestre } from '../js/domain/serie.js';
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
  assert.deepEqual(fissi.map((x) => x.data), ['2026-05-18', '2026-08-20', '2026-11-16', '2027-02-16']);
  assert.equal(fissi[0].causaleInps, 'AF');
  const comm = calcolaScadenzario(p, { ...base, previdenza: { tipo: 'commercianti' }, contributiAnnoPrec: { totale: 6000 } });
  assert.equal(comm.find((x) => x.id === 'inps-fisso-1').causaleInps, 'CF');
  assert.equal(comm.find((x) => x.id === 'inps-saldo').causaleInps, 'CP');
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

test('Gestione Separata: acconto = aliquota sull\'80% del reddito, due rate uguali, causale PXX/P10', () => {
  const v = calcolaScadenzario(p, { ...base, redditoAnnoPrec: 40000, contributiAnnoPrec: { totale: 10428 } });
  const a1 = v.find((x) => x.id === 'inps-acc1'), a2 = v.find((x) => x.id === 'inps-acc2');
  assert.equal(a1.importo + a2.importo, 8342.4);          // 40000 * 80% * 26,07%
  assert.equal(a1.importo, a2.importo);
  assert.equal(a1.causaleInps, 'PXX');
  const p10 = calcolaScadenzario(p, { ...base, redditoAnnoPrec: 40000, contributiAnnoPrec: { totale: 9600 }, previdenza: { tipo: 'gestione-separata', altraCopertura: true } });
  assert.equal(p10.find((x) => x.id === 'inps-acc1').causaleInps, 'P10');
  assert.equal(p10.find((x) => x.id === 'inps-acc1').importo * 2, 7680);   // 40000 * 80% * 24%
  const capped = calcolaScadenzario(p, { ...base, redditoAnnoPrec: 500000, contributiAnnoPrec: { totale: 31881 } });
  assert.equal(Math.round((capped.find((x) => x.id === 'inps-acc1').importo + capped.find((x) => x.id === 'inps-acc2').importo) * 100) / 100, 25505.85); // massimale 122.295 * 80% * 26,07%
});

test('ripartizione acconti 40/60 su richiesta', () => {
  const v = calcolaScadenzario(p, { ...base, percentualeRata1: 0.4 });
  assert.equal(v.find((x) => x.id === 'sost-acc1').importo, 1600);
  assert.equal(v.find((x) => x.id === 'sost-acc2').importo, 2400);
});

test('cassa professionale: versamenti manuali', () => {
  const v = calcolaScadenzario(p, { ...base, previdenza: { tipo: 'cassa' }, scadenzeManuali: [{ data: '2026-10-31', descrizione: 'Rata cassa', importo: 1200 }] });
  assert.equal(v.some((x) => x.id === 'inps-cassa'), false);
  const m = v.find((x) => x.id === 'cassa-0');
  assert.equal(m.importo, 1200);
  assert.equal(m.data, '2026-11-02');
});

test('acconto INPS: Gestione Separata 80% del reddito, IVS 100% dell\'eccedenza (con riduzione 35%)', () => {
  assert.equal(accontoInpsTotale(p, { tipo: 'gestione-separata' }, 40000), 8342.4);
  assert.equal(accontoInpsTotale(p, { tipo: 'artigiani' }, 30000), 2686.08);          // (30.000 − 18.808) × 24%
  assert.equal(accontoInpsTotale(p, { tipo: 'commercianti' }, 30000), 2739.8);        // × 24,48%
  assert.equal(accontoInpsTotale(p, { tipo: 'artigiani', riduzione35: true }, 30000), 1745.95); // × 0,65
  assert.equal(accontoInpsTotale(p, { tipo: 'artigiani' }, 10000), 0);                // sotto il minimale
  assert.equal(accontoInpsTotale(p, { tipo: 'cassa' }, 50000), 0);
});

test('scadenzario IVS: acconto in due rate uguali sul reddito dell\'anno precedente', () => {
  const v = calcolaScadenzario(p, { ...base, previdenza: { tipo: 'artigiani' }, redditoAnnoPrec: 30000, contributiAnnoPrec: { totale: 7207.44, fisso: 4521.36 }, accontiInpsVersati: 0 });
  const a1 = v.find((x) => x.id === 'inps-acc1'), a2 = v.find((x) => x.id === 'inps-acc2');
  assert.equal(a1.importo, 1343.04);
  assert.equal(a2.importo, 1343.04);
  assert.equal(a1.causaleInps, 'AP');
  assert.equal(v.find((x) => x.id === 'inps-saldo').importo, 2686.08);   // eccedenza dell'anno precedente, nessun acconto versato
});

test('bollo: somma per trimestre di emissione', () => {
  const f = [
    { clienteId: 'c', data: '2026-01-10', bollo: 2 }, { clienteId: 'c', data: '2026-03-31', bollo: 2 },
    { clienteId: 'c', data: '2026-04-01', bollo: 2 }, { clienteId: 'c', data: '2026-12-31', bollo: 2 },
    { clienteId: 'c', data: '2026-05-01', bollo: 0 }, { clienteId: 'x', data: '2026-05-01', bollo: 2 },
  ];
  assert.deepEqual(bolloPerTrimestre(f, 'c', 2026), [4, 2, 0, 2]);
});

test('scadenzario: bollo trimestrale con differimento e codici 2521-2524', () => {
  const b = { precQ4: 10, q: [20, 30, 40] };
  const v = calcolaScadenzario(p, { ...base, bollo: b });
  const per = (id) => v.find((x) => x.id === id);
  assert.equal(per('bollo-q4').data, '2026-03-02');
  assert.equal(per('bollo-q4').codiceTributo, '2524');
  assert.equal(per('bollo-q4').importo, 10);
  // Q1+Q2 <= 5.000 €: Q1 e Q2 slittano al 30/11
  assert.equal(per('bollo-q1').data, '2026-11-30');
  assert.equal(per('bollo-q1').codiceTributo, '2521');
  assert.equal(per('bollo-q2').data, '2026-11-30');
  assert.equal(per('bollo-q2').codiceTributo, '2522');
  assert.equal(per('bollo-q3').data, '2026-11-30');
  assert.equal(per('bollo-q3').codiceTributo, '2523');
  const w = calcolaScadenzario(p, { ...base, bollo: b, bolloDifferito: false });
  assert.equal(w.find((x) => x.id === 'bollo-q1').data, '2026-06-01');
  assert.equal(w.find((x) => x.id === 'bollo-q2').data, '2026-09-30');
});
