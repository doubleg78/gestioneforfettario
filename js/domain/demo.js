// Dati di esempio per le dimostrazioni: clienti inventati, deterministici (stesso input, stesso risultato).
import { nuovoCliente, nuovaFattura, nuovaSpesa } from './modello.js';
import { partitaIvaValida } from './validazione.js';
import { coefficienteAteco2025 } from '../fiscal/ateco.js';
import { titoloAteco2025 } from '../fiscal/ateco-ricerca.js';
import { parametriPerAnno } from '../fiscal/params/index.js';

function prng(seme) {
  let a = [...seme].reduce((h, c) => (Math.imul(h ^ c.charCodeAt(0), 2654435761) >>> 0), 0x9e3779b9);
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function pivaDa(n) {
  const base = String(10000000 + n * 7919).padStart(10, '0').slice(0, 10);
  for (let k = 0; k < 10; k++) { const p = `${base}${k}`; if (partitaIvaValida(p)) return p; }
  return `${base}0`;
}

const PROFILI = [
  { nome: 'Marta Conti', mestiere: 'Consulente software', previdenza: { tipo: 'gestione-separata' }, ateco: '62.20.10', inizio: 2023, startup: true, mensile: [4700, 5500], clienti: ['Nexa Srl', 'Orbis SpA', 'Lumen Tech', 'Argo Systems'], spese: [['Hosting e licenze', 90], ['Hardware', 140], ['Formazione', 80]] },
  { nome: 'Luca Ferri', mestiere: 'Elettricista', previdenza: { tipo: 'artigiani', iscrittoDal1996: true, riduzione35: true }, ateco: '43.21.01', inizio: 2021, mensile: [3700, 4300], clienti: ['Condominio Aurora', 'Immobiliare Bianchi', 'Fam. Monti', 'Studio Dentistico Neri'], spese: [['Materiali', 500], ['Carburante', 160], ['Assicurazione furgone', 90]] },
  { nome: 'Giulia Bernardi', mestiere: 'Graphic designer', previdenza: { tipo: 'gestione-separata' }, ateco: '74.12.01', inizio: 2025, startup: true, mensile: [2300, 3200], clienti: ['Caffè Fiorino', 'Studio Legale Ferrero', 'Moda Verde Srl'], spese: [['Software di grafica', 60], ['Coworking', 180]] },
  { nome: 'Paolo Mancini', mestiere: 'E-commerce di abbigliamento', previdenza: { tipo: 'commercianti', iscrittoDal1996: true }, ateco: '47.91.10', inizio: 2020, mensile: [6200, 8300], clienti: ['Vendite online (marketplace)', 'Ordini sito web'], spese: [['Merce e magazzino', 1800], ['Spedizioni', 450], ['Pubblicità online', 300]] },
  { nome: 'Elena Rizzi', mestiere: 'Architetto', previdenza: { tipo: 'cassa', cassa: { aliquotaSoggettiva: 0.145, contributoMinimo: 0 } }, ateco: '71.11.09', inizio: 2019, mensile: [3500, 4800], clienti: ['Famiglia Costa', 'Comune di Valmora', 'Costruzioni Alfa'], spese: [['Software CAD', 120], ['Assicurazione professionale', 70]],
    cassa: [['2026-06-30', 'Contributi alla cassa — acconto'], ['2026-09-30', 'Contributi alla cassa — saldo']] },
  { nome: 'Andrea Sala', mestiere: 'Traduttore', previdenza: { tipo: 'gestione-separata' }, ateco: '74.30.00', inizio: 2018, mensile: [8200, 10300], clienti: ['Edizioni Meridiana', 'Global Docs Srl', 'Agenzia Lingue'], spese: [['Strumenti di traduzione', 80]] },
  { nome: 'Sara Villa', mestiere: 'Consulente HR', previdenza: { tipo: 'gestione-separata', altraCopertura: true }, ateco: '74.99.32', inizio: 2022, mensile: [2000, 2700], clienti: ['Officine Riva', 'Studio Tecnico Pini'], spese: [['Abbonamenti professionali', 50]] },
];

const iso = (a, m, g) => `${a}-${String(m).padStart(2, '0')}-${String(g).padStart(2, '0')}`;
const aggiungiGiorni = (isoData, n) => { const d = new Date(`${isoData}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const arrotonda = (n) => Math.round(n / 10) * 10;

/**
 * @param {string} oggi data ISO "di oggi": nessuna fattura è incassata dopo questa data
 * @returns {{clienti: object[], fatture: object[], spese: object[]}}
 */
export function generaDemo(oggi) {
  const annoCorrente = Number(oggi.slice(0, 4));
  const meseCorrente = Number(oggi.slice(5, 7));
  const params = parametriPerAnno(annoCorrente).params;
  const clienti = [], fatture = [], spese = [];

  PROFILI.forEach((pf, idx) => {
    const rnd = prng(pf.nome);
    const c = nuovoCliente();
    c.id = `demo-${idx + 1}`;
    c.demo = true;
    c.nome = pf.nome;
    c.partitaIva = pivaDa(idx + 1);
    c.annoInizioAttivita = pf.inizio;
    c.startup = Boolean(pf.startup);
    c.previdenza = { ...c.previdenza, ...pf.previdenza };
    const r = coefficienteAteco2025(pf.ateco, params);
    c.ateco = [{ codice: pf.ateco, descrizione: titoloAteco2025(pf.ateco) ?? pf.mestiere, gruppo: r.candidati[0].gruppo }];
    c.note = pf.mestiere;
    if (pf.cassa) c.scadenzeCassa = pf.cassa.map(([data, descrizione]) => ({ anno: annoCorrente, data, descrizione, importo: Math.round(1500 + rnd() * 900) }));
    clienti.push(c);

    for (const anno of [annoCorrente - 1, annoCorrente]) {
      const ultimo = anno === annoCorrente ? meseCorrente : 12;
      const [minimo, massimo] = pf.mensile;
      const base = anno === annoCorrente ? massimo : minimo + (massimo - minimo) * 0.35;
      let n = 1;
      for (let m = 1; m <= ultimo; m++) {
        const emissioni = pf.clienti.length > 2 ? 2 : 1;
        for (let e = 0; e < emissioni; e++) {
          const f = nuovaFattura(c.id);
          f.id = `${c.id}-f-${anno}-${m}-${e}`;
          f.numero = `${n++}/${anno}`;
          const giorno = e === 0 ? 3 + Math.floor(rnd() * 9) : 14 + Math.floor(rnd() * 12);
          f.data = iso(anno, m, giorno);
          f.controparte = pf.clienti[(m + e + idx) % pf.clienti.length];
          f.importo = arrotonda((base / emissioni) * (0.85 + rnd() * 0.3));
          f.bollo = f.importo > 77.47 ? 2 : 0;
          f.atecoCodice = pf.ateco;
          const incasso = aggiungiGiorni(f.data, 12 + Math.floor(rnd() * 34));
          f.dataIncasso = incasso <= oggi && f.data < oggi ? incasso : '';
          if (f.data > oggi) continue;
          fatture.push(f);
        }
        for (const [descrizione, importoBase] of pf.spese) {
          if ((m + descrizione.length) % 2) continue;
          const s = nuovaSpesa(c.id);
          s.id = `${c.id}-s-${anno}-${m}-${descrizione.length}`;
          s.data = iso(anno, m, 5 + Math.floor(rnd() * 20));
          if (s.data > oggi) continue;
          s.descrizione = descrizione;
          s.categoria = descrizione.split(' ')[0];
          s.importo = Math.round(importoBase * (0.7 + rnd() * 0.6));
          spese.push(s);
        }
      }
    }
  });
  return { clienti, fatture, spese };
}

export const eDemo = (cliente) => cliente.demo === true;
