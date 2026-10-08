import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, parseImporto, parseData, fattureDaCsv } from '../js/import/csv.js';
import { fattureDaXml } from '../js/import/fatturapa.js';

test('importi all’italiana e all’inglese', () => {
  assert.equal(parseImporto('1.234,56'), 1234.56);
  assert.equal(parseImporto('€ 1234,5'), 1234.5);
  assert.equal(parseImporto('1234.56'), 1234.56);
  assert.equal(parseImporto('1.234.567'), 1234567);
  assert.ok(Number.isNaN(parseImporto('abc')));
});

test('date', () => {
  assert.equal(parseData('05/03/2026'), '2026-03-05');
  assert.equal(parseData('2026-03-05'), '2026-03-05');
  assert.equal(parseData('31/02/2026'), null);
  assert.equal(parseData(''), null);
});

test('CSV con campi tra virgolette e separatore ;', () => {
  const r = parseCsv('a;b\n"x;y";"he said ""ok"""\n');
  assert.deepEqual(r, [['a', 'b'], ['x;y', 'he said "ok"']]);
});

test('fatture da CSV: righe valide ed errori', () => {
  const csv = 'Numero;Data;Cliente;Importo;Data incasso;ATECO\n1/2026;10/01/2026;Alfa Srl;1.000,00;20/02/2026;62.10.00\n2/2026;31/02/2026;Beta;50;;\n3/2026;01/03/2026;Gamma;x;;\n4/2026;05/03/2026;Delta;200,50;;';
  const { fatture, errori } = fattureDaCsv(csv);
  assert.equal(fatture.length, 2);
  assert.equal(fatture[0].importo, 1000);
  assert.equal(fatture[0].dataIncasso, '2026-02-20');
  assert.equal(fatture[1].dataIncasso, '');
  assert.deepEqual(errori.map((e) => e.riga), [3, 4]);
});

test('CSV senza colonne obbligatorie', () => {
  const { fatture, errori } = fattureDaCsv('foo;bar\n1;2');
  assert.equal(fatture.length, 0);
  assert.match(errori[0].messaggio, /mancanti/);
});

const XML = `<?xml version="1.0"?>
<p:FatturaElettronica xmlns:p="http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2" versione="FPR12">
 <FatturaElettronicaHeader>
  <CessionarioCommittente><DatiAnagrafici><Anagrafica><Denominazione>Alfa &amp; Beta S.r.l.</Denominazione></Anagrafica></DatiAnagrafici></CessionarioCommittente>
 </FatturaElettronicaHeader>
 <FatturaElettronicaBody>
  <DatiGenerali><DatiGeneraliDocumento>
    <TipoDocumento>TD01</TipoDocumento><Data>2026-03-10</Data><Numero>7/2026</Numero>
    <DatiBollo><BolloVirtuale>SI</BolloVirtuale><ImportoBollo>2.00</ImportoBollo></DatiBollo>
    <ImportoTotaleDocumento>1002.00</ImportoTotaleDocumento>
  </DatiGeneraliDocumento></DatiGenerali>
  <DatiBeniServizi><DatiRiepilogo><ImponibileImporto>1000.00</ImponibileImporto></DatiRiepilogo></DatiBeniServizi>
 </FatturaElettronicaBody>
</p:FatturaElettronica>`;

test('FatturaPA: imponibile, controparte, bollo', () => {
  const { fatture, errori } = fattureDaXml(XML, 'f.xml');
  assert.deepEqual(errori, []);
  assert.equal(fatture.length, 1);
  assert.equal(fatture[0].importo, 1000);
  assert.equal(fatture[0].controparte, 'Alfa & Beta S.r.l.');
  assert.equal(fatture[0].numero, '7/2026');
  assert.equal(fatture[0].bollo, 2);
});

test('FatturaPA: nota di credito negativa e file non valido', () => {
  const nc = XML.replace('TD01', 'TD04');
  assert.equal(fattureDaXml(nc).fatture[0].importo, -1000);
  assert.equal(fattureDaXml('<html></html>', 'x.xml').fatture.length, 0);
});
