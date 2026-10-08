import test from 'node:test';
import assert from 'node:assert/strict';
import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
import { pdfSimulazione, pdfScadenzario, pdfRiepilogo, pdfAgenda, eurPdf } from '../js/export/pdf.js';
import { parametriAnno } from '../js/fiscal/params/index.js';
import { confrontaRegimi } from '../js/fiscal/confronto.js';
import { scadenzarioCliente } from '../js/domain/scadenze-cliente.js';
import { riepilogoAnno } from '../js/domain/riepilogo.js';
import { generaDemo } from '../js/domain/demo.js';
import { parametriPerAnno } from '../js/fiscal/params/index.js';

applyPlugin(jsPDF);
const p = parametriAnno(2026);
const demo = generaDemo('2026-10-08');
const cliente = demo.clienti[0];
const studio = { nome: 'Studio Demo', descrizione: 'Consulenza fiscale', email: 'info@example.it' };

const intestazione = (doc) => new TextDecoder('latin1').decode(new Uint8Array(doc.output('arraybuffer')).slice(0, 5));

test('formato euro per PDF senza spazi non separabili', () => {
  assert.equal(eurPdf(1234.5), '1.234,50 €');
  assert.ok(!eurPdf(1).includes(' '));
});

test('PDF simulazione', () => {
  const conf = confrontaRegimi(p, { ricavi: 50000, costiReali: 3000, ricaviPerAteco: [{ importo: 50000, coefficiente: 0.67 }], aliquota: 0.15, previdenza: { tipo: 'gestione-separata' } });
  const doc = pdfSimulazione(jsPDF, { conf, cliente, anno: 2026, studio, ipotesi: { previdenza: 'Gestione Separata', righe: [['Ricavi', eurPdf(50000)]] } });
  assert.equal(intestazione(doc), '%PDF-');
  assert.ok(doc.getNumberOfPages() >= 1);
});

test('PDF scadenzario, riepilogo e agenda', () => {
  const s = scadenzarioCliente(cliente, demo, 2026, parametriPerAnno);
  const d1 = pdfScadenzario(jsPDF, { voci: s.voci, cliente, anno: 2026, studio, stime: { imposta: 1, accSost: 2, contributi: 3, accInps: 4 } });
  assert.equal(intestazione(d1), '%PDF-');
  const r = riepilogoAnno(cliente, demo, 2026, p, { paramsPrec: parametriAnno(2025) });
  const d2 = pdfRiepilogo(jsPDF, { riepilogo: r, cliente, anno: 2026, studio, mensili: Array(12).fill(1000) });
  assert.equal(intestazione(d2), '%PDF-');
  const voci = demo.clienti.flatMap((c) => scadenzarioCliente(c, demo, 2026, parametriPerAnno).voci.map((v) => ({ ...v, cliente: c }))).filter((v) => v.data);
  const d3 = pdfAgenda(jsPDF, { voci, anno: 2026, studio });
  assert.equal(intestazione(d3), '%PDF-');
  assert.ok(d3.getNumberOfPages() >= 2);
});
