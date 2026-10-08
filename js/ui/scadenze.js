import { h, campo, avviso, euro, dataIt, scarica } from './dom.js';
import { riepilogoAnno } from '../domain/riepilogo.js';
import { calcolaScadenzario } from '../fiscal/scadenzario.js';
import { csvScadenzario } from '../export/csv.js';
import { round2 } from '../fiscal/utils.js';

const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);
const oggi = () => new Date().toISOString().slice(0, 10);

export function vistaScadenze(ctx) {
  const { archivio, dati, cliente: c } = ctx;
  if (!c) return h('div', null, h('h1', null, 'Scadenzario'), avviso('attenzione', 'Nessun cliente selezionato.'));

  const P = ctx.stato.annoScadenze ?? new Date().getFullYear();
  const { params, esatto, annoUsato } = ctx.paramsAnno(P);
  const pPrec = ctx.paramsAnno(P - 1);
  const prec = riepilogoAnno(c, dati, P - 1, pPrec.params);
  const versati = c.versamenti?.[P - 1] ?? {};
  const stimaImposta = prec.forfettario?.imposta ?? 0;
  const stimaReddito = prec.forfettario?.redditoLordo ?? 0;
  const stimaContributi = prec.forfettario?.contributi ?? { totale: 0 };
  const eCassa = c.previdenza.tipo === 'cassa';

  const s = ctx.stato.scad ??= {};
  if (s.anno !== P) Object.assign(s, { anno: P, imposta: null, reddito: null, contributi: null, accSost: null, accInps: null, proroga: P === 2026, rata1: 0.5 });
  const val = (chiave, predefinito) => s[chiave] ?? predefinito;
  const manuali = c.scadenzeCassa ?? [];

  const risultati = h('div');

  function ricalcola() {
    const contributi = { ...stimaContributi, totale: val('contributi', stimaContributi.totale) };
    const voci = calcolaScadenzario(params, {
      annoPagamento: P,
      impostaAnnoPrec: val('imposta', stimaImposta),
      accontiSostitutivaVersati: val('accSost', versati.sostitutiva ?? 0),
      contributiAnnoPrec: contributi,
      redditoAnnoPrec: val('reddito', stimaReddito),
      accontiInpsVersati: val('accInps', versati.inps ?? 0),
      previdenza: c.previdenza,
      prorogaEstate2026: s.proroga,
      percentualeRata1: s.rata1,
      scadenzeManuali: manuali.filter((m) => m.anno === P),
    });
    const futuri = voci.filter((v) => v.data && v.data >= oggi() && v.importo > 0);
    const totale = round2(voci.reduce((t, v) => t + v.importo, 0));
    const prossima = futuri[0];
    const f24 = (v) => (v.codiceTributo ? `Erario ${v.codiceTributo} / ${v.annoRiferimento}` : v.causaleInps ? `INPS ${v.causaleInps}` : v.tipo === 'inps' ? 'INPS' : '');

    risultati.replaceChildren(
      prossima ? avviso('attenzione', `Prossima scadenza: ${dataIt(prossima.data)}.`, `${prossima.descrizione} — ${euro(prossima.importo)}`) : avviso('ok', 'Nessuna scadenza futura con importo per questo anno.'),
      h('div', { classe: 'scheda' },
        h('div', { classe: 'tabella-contenitore' }, h('table', null,
          h('thead', null, h('tr', null, h('th', null, 'Scadenza'), h('th', null, 'Versamento'), h('th', null, 'F24'), h('th', { classe: 'numero' }, 'Importo'))),
          h('tbody', null, voci.map((v) => h('tr', null,
            h('td', null, v.data ? dataIt(v.data) : '—', v.data && v.data < oggi() ? h('div', { classe: 'tenue' }, 'scaduta') : null),
            h('td', null, v.descrizione, v.nota ? h('div', { classe: 'tenue' }, v.nota) : null),
            h('td', null, f24(v)),
            h('td', { classe: 'numero' }, v.tipo === 'adempimento' ? '' : euro(v.importo))))),
          h('tfoot', null, h('tr', null, h('td', { colspan: '3' }, 'Totale versamenti'), h('td', { classe: 'numero' }, euro(totale)))))),
        h('div', { classe: 'azioni' },
          h('button', { onClick: () => scarica(`scadenzario-${P}.csv`, csvScadenzario(voci), 'text/csv;charset=utf-8') }, 'Esporta CSV'),
          h('button', { onClick: () => window.print() }, 'Stampa / PDF'))));
  }

  const numero = (chiave, predefinito) => h('input', { type: 'number', step: '0.01', min: '0', valore: val(chiave, predefinito), onInput: (e) => { s[chiave] = num(e.target.value); ricalcola(); } });
  const ivs = c.previdenza.tipo === 'artigiani' || c.previdenza.tipo === 'commercianti';
  const inpsEtichetta = ivs ? 'Contributi INPS dovuti per l’anno precedente, fissi inclusi (€)' : 'Contributi INPS dovuti per l’anno precedente (€)';

  // Versamenti alla cassa professionale inseriti a mano
  const nuovaManuale = { data: '', descrizione: '', importo: 0 };
  const sezioneCassa = !eCassa ? null : h('div', { classe: 'scheda' },
    h('h2', null, 'Versamenti alla cassa professionale'),
    h('p', { classe: 'tenue' }, 'Importi e scadenze dipendono dalla cassa di appartenenza: inseriscili dal regolamento o dalla comunicazione della cassa.'),
    manuali.filter((m) => m.anno === P).length === 0 ? null : h('ul', null, manuali.map((m, i) => (m.anno !== P ? null : h('li', null,
      `${dataIt(m.data)} — ${m.descrizione}: ${euro(m.importo)} `,
      h('button', { classe: 'pericolo', onClick: async () => { await archivio.modifica((d) => { d.clienti.find((x) => x.id === c.id).scadenzeCassa.splice(i, 1); }); } }, 'Rimuovi'))))),
    h('form', { onSubmit: async (e) => {
      e.preventDefault();
      await archivio.modifica((d) => { const cl = d.clienti.find((x) => x.id === c.id); cl.scadenzeCassa = [...(cl.scadenzeCassa ?? []), { ...nuovaManuale, anno: P }]; });
    } },
    h('div', { classe: 'griglia' },
      campo('Data', h('input', { type: 'date', required: true, onInput: (e) => { nuovaManuale.data = e.target.value; } })),
      campo('Descrizione', h('input', { type: 'text', required: true, onInput: (e) => { nuovaManuale.descrizione = e.target.value; } })),
      campo('Importo (€)', h('input', { type: 'number', step: '0.01', min: '0', required: true, onInput: (e) => { nuovaManuale.importo = num(e.target.value); } }))),
    h('div', { classe: 'azioni' }, h('button', { type: 'submit' }, 'Aggiungi versamento'))));

  ricalcola();
  return h('div', null,
    h('div', { classe: 'solo-stampa' }, h('strong', null, `${c.nome} — scadenzario ${P}`), h('div', null, `Stampato il ${new Date().toLocaleDateString('it-IT')}`)),
    h('h1', null, 'Scadenzario'),
    h('p', { classe: 'tenue' }, `${c.nome}. Versamenti dell’anno ${P}: saldo ${P - 1} e acconti ${P}.`),
    esatto ? null : avviso('attenzione', 'Parametri non disponibili per questo anno.', `Date e aliquote usano i parametri ${annoUsato}.`),
    h('div', { classe: 'scheda' },
      h('div', { classe: 'griglia' },
        campo('Anno dei versamenti', h('input', { type: 'number', min: '2000', max: '2100', valore: P, onChange: (e) => { ctx.stato.annoScadenze = Number(e.target.value); ctx.aggiorna(); } })),
        campo(`Imposta sostitutiva dovuta per il ${P - 1} (€)`, numero('imposta', stimaImposta), `Stima dai dati registrati: ${euro(stimaImposta)}. Correggila con il valore della dichiarazione.`),
        campo(`Acconti imposta già versati per il ${P - 1} (€)`, numero('accSost', versati.sostitutiva ?? 0)),
        c.previdenza.tipo === 'gestione-separata' ? campo(`Reddito ${P - 1} per l’acconto INPS (€)`, numero('reddito', stimaReddito), 'Base di calcolo degli acconti della Gestione Separata.') : null,
        eCassa ? null : campo(inpsEtichetta, numero('contributi', stimaContributi.totale), `Stima: ${euro(stimaContributi.totale)}.`),
        eCassa ? null : campo(`Acconti INPS già versati per il ${P - 1} (€)`, numero('accInps', versati.inps ?? 0)),
        campo('Ripartizione acconti imposta sostitutiva', h('select', { onChange: (e) => { s.rata1 = Number(e.target.value); ricalcola(); } },
          h('option', { value: '0.5', selected: s.rata1 === 0.5 }, '50% + 50%'),
          h('option', { value: '0.4', selected: s.rata1 === 0.4 }, '40% + 60%')),
        'Le istruzioni Redditi PF 2026 indicano il 50% solo per i soggetti ISA e il 40% negli altri casi.')),
      P === 2026 ? h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: s.proroga, onChange: (e) => { s.proroga = e.target.checked; ricalcola(); } }), 'Saldo e primo acconto prorogati al 20 luglio (art. 6 DL 89/2026, con effetti fatti salvi dalla L. 113/2026)') : null,
      h('div', { classe: 'azioni' }, h('button', { onClick: async () => {
        await archivio.modifica((d) => { const cl = d.clienti.find((x) => x.id === c.id); cl.versamenti = { ...cl.versamenti, [P - 1]: { sostitutiva: val('accSost', 0), inps: val('accInps', 0) } }; });
      } }, 'Salva acconti versati'))),
    sezioneCassa,
    risultati,
    avviso('attenzione', 'Stima indicativa.', `Gli importi dell’anno ${P - 1} sono ricavati dai dati registrati con i parametri ${pPrec.annoUsato}. Per artigiani e commercianti gli importi ufficiali sono nel Cassetto previdenziale INPS (“Dati del mod. F24”): la misura degli acconti sulla quota eccedente il minimale (80%) non è confermata nelle circolari lette. L’acconto della Gestione Separata segue le istruzioni Redditi PF (aliquota dell’anno sull’80% del reddito dell’anno precedente, in due rate uguali).`));
}
