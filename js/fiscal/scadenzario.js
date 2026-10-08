import { round2, clamp0 } from './utils.js';
import { accontiSostitutiva } from './acconti.js';
import { contributiIvs } from './inps.js';

// --- Calendario: scadenze che cadono di sabato, domenica o festivo slittano al primo giorno lavorativo ---

function pasqua(anno) {
  const a = anno % 19, b = Math.floor(anno / 100), c = anno % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mese = Math.floor((h + l - 7 * m + 114) / 31), giorno = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(anno, mese - 1, giorno));
}

const FESTIVI_FISSI = ['01-01', '01-06', '04-25', '05-01', '06-02', '08-15', '11-01', '12-08', '12-25', '12-26'];
const iso = (d) => d.toISOString().slice(0, 10);

export function eFestivo(isoData) {
  const d = new Date(`${isoData}T00:00:00Z`);
  const g = d.getUTCDay();
  if (g === 0 || g === 6) return true;
  if (FESTIVI_FISSI.includes(isoData.slice(5))) return true;
  const lunediAngelo = new Date(pasqua(d.getUTCFullYear()).getTime() + 86400000);
  return iso(lunediAngelo) === isoData;
}

export function prossimoLavorativo(isoData) {
  let d = new Date(`${isoData}T00:00:00Z`);
  while (eFestivo(iso(d))) d = new Date(d.getTime() + 86400000);
  return iso(d);
}

const scadenza = (anno, mmgg) => prossimoLavorativo(`${anno}-${mmgg}`);

/**
 * Acconto complessivo dei contributi INPS per l'anno dei parametri, calcolato sul reddito dell'anno precedente.
 * - Gestione Separata: aliquota dell'anno sull'80% del reddito (istruzioni Redditi PF), nel limite del massimale.
 * - Artigiani/commercianti: contributi sulla sola quota eccedente il minimale, ridotti del 35% se dovuto.
 */
export function accontoInpsTotale(params, previdenza, redditoPrec) {
  const reddito = clamp0(redditoPrec ?? 0);
  if (previdenza.tipo === 'gestione-separata') {
    const gs = params.gestioneSeparata;
    const aliquota = previdenza.altraCopertura ? gs.aliquotaConAltraCopertura : gs.aliquotaProfessionistaSenzaCopertura;
    return round2(Math.min(reddito, gs.massimale) * gs.acconto.percentuale * aliquota);
  }
  if (previdenza.tipo === 'artigiani' || previdenza.tipo === 'commercianti') {
    const r = previdenza.riduzione35 ? 1 - params.forfettario.riduzioneContributiIvs : 1;
    const c = contributiIvs(reddito, params, previdenza.tipo, { iscrittoDal1996: previdenza.iscrittoDal1996 ?? true });
    return round2(c.eccedenza * r * params.ivs.acconto.percentuale);
  }
  return 0;
}

/**
 * Scadenzario dei versamenti dell'anno `annoPagamento` (imposta sostitutiva e INPS).
 * Saldo e primo acconto riguardano i redditi dell'anno precedente.
 *
 * @param {object} d
 * @param {number} d.annoPagamento
 * @param {number} d.impostaAnnoPrec imposta sostitutiva dovuta per l'anno precedente
 * @param {number} d.accontiSostitutivaVersati acconti già versati per l'anno precedente
 * @param {{totale:number, fisso?:number}} d.contributiAnnoPrec contributi dovuti per l'anno precedente
 * @param {number} d.accontiInpsVersati acconti INPS (eccedenza) già versati per l'anno precedente
 * @param {object} d.previdenza
 * @param {boolean} [d.prorogaEstate2026] applica la proroga del 20 luglio
 * @param {number} [d.redditoAnnoPrec] reddito dell'anno precedente (base degli acconti INPS)
 * @param {number} [d.percentualeRata1] quota della prima rata di acconto dell'imposta sostitutiva (0,4 o 0,5)
 * @param {{precQ4:number, q:number[]}} [d.bollo] bollo dovuto sulle fatture: quarto trimestre dell'anno precedente e primi tre dell'anno
 * @param {boolean} [d.bolloDifferito] usa il differimento consentito (30/9 o 30/11) quando l'importo è sotto 5.000 €
 * @param {{data:string, descrizione:string, importo:number, nota?:string}[]} [d.scadenzeManuali] versamenti inseriti dall'utente (casse professionali)
 */
export function calcolaScadenzario(params, d) {
  const P = d.annoPagamento;
  const voci = [];
  const fp = params.forfettario;

  const dataGiugno = d.prorogaEstate2026 && P === 2026 ? scadenza(P, fp.scadenze.saldoEPrimoAccontoProroga2026) : scadenza(P, fp.scadenze.saldoEPrimoAcconto);
  const dataNovembre = scadenza(P, fp.scadenze.secondoAcconto);

  // Imposta sostitutiva
  const saldo = round2(d.impostaAnnoPrec - d.accontiSostitutivaVersati);
  const acc = accontiSostitutiva(params, d.impostaAnnoPrec, d.percentualeRata1);
  voci.push({ id: 'sost-saldo', tipo: 'imposta', data: dataGiugno, descrizione: `Saldo imposta sostitutiva ${P - 1}`,
    importo: clamp0(saldo), codiceTributo: fp.codiciTributo.saldo, annoRiferimento: P - 1,
    nota: saldo < 0 ? `Credito di ${Math.abs(saldo).toFixed(2)} € utilizzabile in compensazione` : '' });
  if (acc.prima > 0) voci.push({ id: 'sost-acc1', tipo: 'imposta', data: dataGiugno, descrizione: `Primo acconto imposta sostitutiva ${P}`,
    importo: acc.prima, codiceTributo: fp.codiciTributo.accontoPrimaRata, annoRiferimento: P, nota: 'Metodo storico' });
  if (acc.seconda > 0) voci.push({ id: 'sost-acc2', tipo: 'imposta', data: dataNovembre,
    descrizione: acc.prima > 0 ? `Secondo acconto imposta sostitutiva ${P}` : `Acconto in unica soluzione imposta sostitutiva ${P}`,
    importo: acc.seconda, codiceTributo: fp.codiciTributo.accontoSecondaRataOUnica, annoRiferimento: P, nota: 'Metodo storico' });

  // Bollo sulle fatture elettroniche (versamento trimestrale)
  if (d.bollo) {
    const b = fp.bollo.trimestri;
    const [q1, q2, q3] = d.bollo.q;
    const differisci = d.bolloDifferito !== false;
    let dataQ1 = scadenza(P, b.scadenze[0]), dataQ2 = scadenza(P, b.scadenze[1]);
    if (differisci && q1 + q2 <= b.sogliaDifferimento) dataQ1 = dataQ2 = scadenza(P, b.scadenze[2]);
    else if (differisci && q1 <= b.sogliaDifferimento) dataQ1 = dataQ2;
    const bolloVoce = (id, trimestre, anno, data, importo) => importo > 0 && voci.push({ id, tipo: 'imposta', data, descrizione: `Imposta di bollo sulle fatture, ${trimestre}° trimestre ${anno}`, importo: round2(importo), codiceTributo: b.codici[trimestre - 1], annoRiferimento: anno, nota: 'Versamento con F24 (bollo su fatture elettroniche)' });
    bolloVoce('bollo-q4', 4, P - 1, scadenza(P, b.scadenze[3]), d.bollo.precQ4);
    bolloVoce('bollo-q1', 1, P, dataQ1, q1);
    bolloVoce('bollo-q2', 2, P, dataQ2, q2);
    bolloVoce('bollo-q3', 3, P, scadenza(P, b.scadenze[2]), q3);
  }

  // INPS
  const prev = d.previdenza;
  const inps = d.contributiAnnoPrec;
  if (prev.tipo === 'gestione-separata') {
    const gs = params.gestioneSeparata;
    const a = gs.acconto;
    const aliquota = prev.altraCopertura ? gs.aliquotaConAltraCopertura : gs.aliquotaProfessionistaSenzaCopertura;
    const causale = prev.altraCopertura ? gs.causaliF24.altraCopertura : gs.causaliF24.standard;
    const saldoInps = round2(inps.totale - d.accontiInpsVersati);
    const totaleAcc = accontoInpsTotale(params, prev, d.redditoAnnoPrec ?? inps.totale / aliquota);
    const rata1 = round2(totaleAcc / a.rate);
    const rata2 = round2(totaleAcc - rata1);
    voci.push({ id: 'inps-saldo', tipo: 'inps', data: dataGiugno, descrizione: `Saldo contributi Gestione Separata ${P - 1}`, importo: clamp0(saldoInps), annoRiferimento: P - 1, causaleInps: causale,
      nota: saldoInps < 0 ? 'Credito' : '' });
    voci.push({ id: 'inps-acc1', tipo: 'inps', data: dataGiugno, descrizione: `Primo acconto contributi Gestione Separata ${P}`, importo: rata1, annoRiferimento: P, causaleInps: causale, nota: `${(aliquota * 100).toFixed(2).replace('.', ',')}% sull'80% del reddito ${P - 1}, in due rate uguali` });
    voci.push({ id: 'inps-acc2', tipo: 'inps', data: dataNovembre, descrizione: `Secondo acconto contributi Gestione Separata ${P}`, importo: rata2, annoRiferimento: P, causaleInps: causale, nota: 'Seconda rata di pari importo' });
  } else if (prev.tipo === 'artigiani' || prev.tipo === 'commercianti') {
    const ivs = params.ivs;
    const riduzione = prev.riduzione35 ? 1 - fp.riduzioneContributiIvs : 1;
    const fisso = d.contributiFissiAnno ?? round2((ivs.minimale * ivs.aliquote[prev.tipo] + ivs.contributoMaternitaAnnuo) * riduzione);
    ivs.scadenzeFissi.forEach((mmgg, i) => {
      const anno = mmgg === '02-16' ? P + 1 : P;
      voci.push({ id: `inps-fisso-${i + 1}`, tipo: 'inps', data: scadenza(anno, mmgg), descrizione: `Contributi fissi IVS ${P}, rata ${i + 1} di 4`, importo: round2(fisso / 4), annoRiferimento: P, causaleInps: ivs.causaliF24[prev.tipo].minimale, nota: 'Versamento con F24 INPS' });
    });
    const fissoPrec = d.contributiFissiAnnoPrec ?? (inps.fisso !== undefined ? round2(inps.fisso * riduzione) : fisso);
    const eccedenzaPrec = clamp0(round2(inps.totale - fissoPrec));
    const saldoEcc = round2(eccedenzaPrec - d.accontiInpsVersati);
    const totaleAcc = accontoInpsTotale(params, prev, d.redditoAnnoPrec ?? 0);
    const rataEcc = round2(totaleAcc / ivs.acconto.rate);
    voci.push({ id: 'inps-saldo', tipo: 'inps', data: dataGiugno, descrizione: `Saldo contributi sul reddito eccedente il minimale ${P - 1}`, importo: clamp0(saldoEcc), annoRiferimento: P - 1, causaleInps: ivs.causaliF24[prev.tipo].eccedenza, nota: saldoEcc < 0 ? 'Credito' : '' });
    if (rataEcc > 0) {
      const nota = 'Due rate uguali sul reddito dell’anno precedente: importi ufficiali nel Cassetto previdenziale INPS';
      voci.push({ id: 'inps-acc1', tipo: 'inps', data: dataGiugno, descrizione: `Primo acconto contributi sul reddito eccedente ${P}`, importo: rataEcc, annoRiferimento: P, causaleInps: ivs.causaliF24[prev.tipo].eccedenza, nota });
      voci.push({ id: 'inps-acc2', tipo: 'inps', data: dataNovembre, descrizione: `Secondo acconto contributi sul reddito eccedente ${P}`, importo: round2(totaleAcc - rataEcc), annoRiferimento: P, causaleInps: ivs.causaliF24[prev.tipo].eccedenza, nota });
    }
  } else {
    const manuali = d.scadenzeManuali ?? [];
    if (manuali.length === 0) {
      voci.push({ id: 'inps-cassa', tipo: 'inps', data: null, descrizione: 'Contributi alla cassa professionale', importo: 0, nota: 'Scadenze e importi definiti dalla cassa di appartenenza: inseriscili a mano nella sezione dedicata.' });
    }
    manuali.forEach((m, i) => voci.push({ id: `cassa-${i}`, tipo: 'inps', data: m.data ? prossimoLavorativo(m.data) : null, descrizione: m.descrizione || 'Contributo cassa professionale', importo: round2(m.importo ?? 0), nota: m.nota ?? 'Inserito manualmente' }));
  }

  voci.push({ id: 'dichiarazione', tipo: 'adempimento', data: scadenza(P, fp.scadenze.dichiarazione), descrizione: `Invio dichiarazione dei redditi (anno d'imposta ${P - 1})`, importo: 0, annoRiferimento: P - 1, nota: '' });

  return voci.sort((a, b) => (a.data ?? '9999').localeCompare(b.data ?? '9999') || a.id.localeCompare(b.id));
}
