import test from 'node:test';
import assert from 'node:assert/strict';
import { parametriAnno } from '../js/fiscal/params/index.js';
import { applicaScaglioni } from '../js/fiscal/utils.js';
import { contributiGestioneSeparata, contributiIvs, contributiCassa } from '../js/fiscal/inps.js';
import { calcolaForfettario, aliquotaSostitutiva, bolloDovuto } from '../js/fiscal/forfettario.js';
import { calcolaOrdinario } from '../js/fiscal/ordinario.js';
import { confrontaRegimi, scenari } from '../js/fiscal/confronto.js';
import { verificaSoglieRicavi, verificaCauseEsclusione } from '../js/fiscal/requisiti.js';
import { accontiSostitutiva, saldoSostitutiva } from '../js/fiscal/acconti.js';

const p = parametriAnno(2026);

test('parametri: anno non disponibile genera errore', () => {
  assert.throws(() => parametriAnno(1999));
});

test('IRPEF 2026: esempio 60.000 € = 18.000 €', () => {
  assert.equal(applicaScaglioni(60000, p.irpef.scaglioni), 18000);
  assert.equal(applicaScaglioni(28000, p.irpef.scaglioni), 6440);
  assert.equal(applicaScaglioni(0, p.irpef.scaglioni), 0);
});

test('Gestione Separata: 26,07% sul reddito, con massimale', () => {
  assert.equal(contributiGestioneSeparata(30000, p).totale, 7821);
  assert.equal(contributiGestioneSeparata(500000, p).base, 122295);
  assert.equal(contributiGestioneSeparata(30000, p, { altraCopertura: true }).totale, 7200);
});

test('IVS 2026: contributi fissi come da circolare INPS 14/2026', () => {
  assert.equal(contributiIvs(0, p, 'artigiani').totale, 4521.36);
  assert.equal(contributiIvs(10000, p, 'commercianti').totale, 4611.64);
});

test('IVS: eccedenza oltre il minimale, maggiorazione sopra 56.224 €', () => {
  const a = contributiIvs(30000, p, 'artigiani');
  assert.equal(a.eccedenza, 2686.08); // (30000-18808)*24%
  const alto = contributiIvs(70000, p, 'artigiani');
  const atteso = (56224 - 18808) * 0.24 + (70000 - 56224) * 0.25;
  assert.equal(alto.eccedenza, Math.round(atteso * 100) / 100);
  assert.equal(contributiIvs(200000, p, 'artigiani').totale, contributiIvs(93707, p, 'artigiani').totale);
});

test('IVS: riduzione 35% forfettari', () => {
  const r = contributiIvs(20000, p, 'commercianti', { riduzione35: true });
  const n = contributiIvs(20000, p, 'commercianti');
  assert.equal(r.totale, Math.round(n.totale * 0.65 * 100) / 100);
});

test('Cassa: aliquota soggettiva con minimo', () => {
  assert.equal(contributiCassa(10000, { aliquotaSoggettiva: 0.1, contributoMinimo: 1500 }).totale, 1500);
  assert.equal(contributiCassa(40000, { aliquotaSoggettiva: 0.1 }).totale, 4000);
});

test('bollo: oltre 77,47 € dovuto, altrimenti no', () => {
  assert.equal(bolloDovuto(77.47, p), 0);
  assert.equal(bolloDovuto(77.48, p), 2);
});

test('aliquota startup: 5% per 5 anni, poi 15%', () => {
  const base = { annoInizioAttivita: 2024, requisitiStartup: true };
  assert.equal(aliquotaSostitutiva(p, { ...base, annoImposta: 2026 }).aliquota, 0.05);
  assert.equal(aliquotaSostitutiva(p, { ...base, annoImposta: 2028 }).aliquota, 0.05);
  assert.equal(aliquotaSostitutiva(p, { ...base, annoImposta: 2029 }).aliquota, 0.15);
  assert.equal(aliquotaSostitutiva(p, { annoInizioAttivita: 2024, requisitiStartup: false, annoImposta: 2026 }).aliquota, 0.15);
});

test('forfettario professionista GS: 50.000 € ricavi, coeff. 78%, 15%', () => {
  const r = calcolaForfettario(p, {
    ricavi: [{ importo: 50000, coefficiente: 0.78 }],
    previdenza: { tipo: 'gestione-separata' },
    aliquota: 0.15,
  });
  assert.equal(r.redditoLordo, 39000);
  assert.equal(r.contributi.totale, 10167.3);       // 39000 * 26,07%
  assert.equal(r.imponibile, 28832.7);
  assert.equal(r.imposta, 4324.91);                 // 28832,70 * 15%
});

test('forfettario: più ATECO con coefficienti diversi', () => {
  const r = calcolaForfettario(p, {
    ricavi: [{ importo: 20000, coefficiente: 0.78 }, { importo: 10000, coefficiente: 0.40 }],
    previdenza: { tipo: 'gestione-separata' },
    aliquota: 0.05,
  });
  assert.equal(r.ricavi, 30000);
  assert.equal(r.redditoLordo, 19600);
});

test('forfettario: contributi versati sostituiscono quelli di competenza nella deduzione', () => {
  const r = calcolaForfettario(p, {
    ricavi: [{ importo: 10000, coefficiente: 0.67 }],
    previdenza: { tipo: 'gestione-separata' },
    aliquota: 0.15,
    contributiVersati: 1000,
  });
  assert.equal(r.imponibile, 5700);
  assert.equal(r.imposta, 855);
});

test('ordinario: lavoratore autonomo GS 50.000 € ricavi, 10.000 € costi', () => {
  const r = calcolaOrdinario(p, { ricavi: 50000, costi: 10000, previdenza: { tipo: 'gestione-separata' } });
  assert.equal(r.redditoProfessionale, 40000);
  assert.equal(r.contributi.totale, 10428);
  assert.equal(r.imponibile, 29572);
  assert.equal(r.irpefLorda, 6440 + Math.round(1572 * 0.33 * 100) / 100);
  assert.equal(r.irap, 0);
});

test('ordinario: IRAP e addizionali', () => {
  const r = calcolaOrdinario(p, {
    ricavi: 100000, costi: 0, previdenza: { tipo: 'cassa', cassa: { aliquotaSoggettiva: 0.1 } },
    addizionaleRegionale: 0.02, addizionaleComunale: 0.008, soggettoIrap: true,
  });
  assert.equal(r.irap, 3900);
  assert.equal(r.addizionali, Math.round(r.imponibile * 0.028 * 100) / 100);
});

test('confronto: forfettario conviene con costi bassi', () => {
  const c = confrontaRegimi(p, {
    ricavi: 50000, costiReali: 5000,
    ricaviPerAteco: [{ importo: 50000, coefficiente: 0.78 }],
    aliquota: 0.15, previdenza: { tipo: 'gestione-separata' },
  });
  assert.equal(c.conveniente, 'forfettario');
  assert.ok(c.differenza > 0);
});

test('confronto: ordinario conviene con costi molto alti', () => {
  const c = confrontaRegimi(p, {
    ricavi: 50000, costiReali: 40000,
    ricaviPerAteco: [{ importo: 50000, coefficiente: 0.78 }],
    aliquota: 0.15, previdenza: { tipo: 'gestione-separata' },
  });
  assert.equal(c.conveniente, 'ordinario');
});

test('scenari what-if: ricavi crescenti aumentano il carico', () => {
  const base = {
    ricavi: 50000, costiReali: 5000,
    ricaviPerAteco: [{ importo: 50000, coefficiente: 0.78 }],
    aliquota: 0.15, previdenza: { tipo: 'gestione-separata' },
  };
  const s = scenari(p, base, [{ ricaviPct: -0.2 }, { ricaviPct: 0 }, { ricaviPct: 0.2 }]);
  assert.equal(s.length, 3);
  assert.ok(s[0].forfettario.totaleCarico < s[1].forfettario.totaleCarico);
  assert.ok(s[1].forfettario.totaleCarico < s[2].forfettario.totaleCarico);
});

test('soglie ricavi', () => {
  assert.equal(verificaSoglieRicavi(p, 40000).stato, 'ok');
  assert.equal(verificaSoglieRicavi(p, 80000).stato, 'attenzione');
  assert.equal(verificaSoglieRicavi(p, 85000).stato, 'attenzione');
  assert.equal(verificaSoglieRicavi(p, 85001).stato, 'esce-anno-successivo');
  assert.equal(verificaSoglieRicavi(p, 100001).stato, 'esce-subito');
});

test('cause di esclusione', () => {
  const ok = verificaCauseEsclusione(p, { ricaviAnnoPrecedente: 60000, redditoLavoroDipendente: 20000 });
  assert.equal(ok.ammesso, true);
  const ko = verificaCauseEsclusione(p, { ricaviAnnoPrecedente: 60000, redditoLavoroDipendente: 36000 });
  assert.deepEqual(ko.esclusioni, ['lavoro-dipendente']);
  const cessato = verificaCauseEsclusione(p, { ricaviAnnoPrecedente: 60000, redditoLavoroDipendente: 36000, rapportoLavoroCessato: true });
  assert.equal(cessato.ammesso, true);
});

test('acconti sostitutiva', () => {
  assert.deepEqual(accontiSostitutiva(p, 40), { prima: 0, seconda: 0, totale: 0 });
  assert.deepEqual(accontiSostitutiva(p, 200), { prima: 0, seconda: 200, totale: 200 });
  assert.deepEqual(accontiSostitutiva(p, 1001), { prima: 500.5, seconda: 500.5, totale: 1001 });
  assert.equal(saldoSostitutiva(4000, 3000), 1000);
  assert.equal(saldoSostitutiva(2000, 3000), -1000);
});
