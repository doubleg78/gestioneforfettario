import { h, campo, avviso, euro, dataIt, scarica } from './dom.js';
import { riepilogoAnno } from '../domain/riepilogo.js';
import { calcolaScadenzario } from '../fiscal/scadenzario.js';
import { csvScadenzario } from '../export/csv.js';
import { round2 } from '../fiscal/utils.js';

const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);
const oggi = () => new Date().toISOString().slice(0, 10);

export function vistaScadenze(ctx) {
  const { archivio, dati, cliente: c, params } = ctx;
  if (!c) return h('div', null, h('h1', null, 'Scadenzario'), avviso('attenzione', 'Nessun cliente selezionato.'));

  const P = ctx.stato.annoScadenze ?? new Date().getFullYear();
  const prec = riepilogoAnno(c, dati, P - 1, params);
  const versati = c.versamenti?.[P - 1] ?? {};
  const stimaImposta = prec.forfettario?.imposta ?? 0;
  const stimaContributi = prec.forfettario?.contributi ?? { totale: 0 };

  const s = ctx.stato.scad ??= {};
  if (s.anno !== P) Object.assign(s, { anno: P, imposta: null, contributi: null, accSost: null, accInps: null, proroga: P === 2026 });
  const val = (chiave, predefinito) => s[chiave] ?? predefinito;

  const risultati = h('div');
  const esito = h('div');

  function ricalcola() {
    const contributi = { ...stimaContributi, totale: val('contributi', stimaContributi.totale) };
    const voci = calcolaScadenzario(params, {
      annoPagamento: P,
      impostaAnnoPrec: val('imposta', stimaImposta),
      accontiSostitutivaVersati: val('accSost', versati.sostitutiva ?? 0),
      contributiAnnoPrec: contributi,
      accontiInpsVersati: val('accInps', versati.inps ?? 0),
      previdenza: c.previdenza,
      prorogaEstate2026: s.proroga,
    });
    const futuri = voci.filter((v) => v.data && v.data >= oggi() && v.importo > 0);
    const totale = round2(voci.reduce((t, v) => t + v.importo, 0));
    const prossima = futuri[0];

    risultati.replaceChildren(
      prossima ? avviso('attenzione', `Prossima scadenza: ${dataIt(prossima.data)}.`, `${prossima.descrizione} — ${euro(prossima.importo)}`) : avviso('ok', 'Nessuna scadenza futura con importo per questo anno.'),
      h('div', { classe: 'scheda' },
        h('div', { classe: 'tabella-contenitore' }, h('table', null,
          h('thead', null, h('tr', null, h('th', null, 'Scadenza'), h('th', null, 'Versamento'), h('th', null, 'F24'), h('th', { classe: 'numero' }, 'Importo'))),
          h('tbody', null, voci.map((v) => h('tr', null,
            h('td', null, v.data ? dataIt(v.data) : '—', v.data && v.data < oggi() ? h('div', { classe: 'tenue' }, 'scaduta') : null),
            h('td', null, v.descrizione, v.nota ? h('div', { classe: 'tenue' }, v.nota) : null),
            h('td', null, v.codiceTributo ? `Erario ${v.codiceTributo} / ${v.annoRiferimento}` : v.tipo === 'inps' ? 'INPS' : ''),
            h('td', { classe: 'numero' }, v.tipo === 'adempimento' ? '' : euro(v.importo))))),
          h('tfoot', null, h('tr', null, h('td', { colspan: '3' }, 'Totale versamenti'), h('td', { classe: 'numero' }, euro(totale)))))),
        h('div', { classe: 'azioni' },
          h('button', { onClick: () => scarica(`scadenzario-${P}.csv`, csvScadenzario(voci), 'text/csv;charset=utf-8') }, 'Esporta CSV'),
          h('button', { onClick: () => window.print() }, 'Stampa / PDF'))));
  }

  const numero = (chiave, predefinito) => h('input', { type: 'number', step: '0.01', min: '0', valore: val(chiave, predefinito), onInput: (e) => { s[chiave] = num(e.target.value); ricalcola(); } });
  const inpsEtichetta = c.previdenza.tipo === 'artigiani' || c.previdenza.tipo === 'commercianti' ? 'Contributi INPS dovuti per l’anno precedente, fissi inclusi (€)' : 'Contributi INPS dovuti per l’anno precedente (€)';
  ricalcola();

  return h('div', null,
    h('div', { classe: 'solo-stampa' }, h('strong', null, `${c.nome} — scadenzario ${P}`), h('div', null, `Stampato il ${new Date().toLocaleDateString('it-IT')}`)),
    h('h1', null, 'Scadenzario'),
    h('p', { classe: 'tenue' }, `${c.nome}. Versamenti dell’anno ${P}: saldo ${P - 1} e acconti ${P}.`),
    h('div', { classe: 'scheda' },
      h('div', { classe: 'griglia' },
        campo('Anno dei versamenti', h('input', { type: 'number', min: '2000', max: '2100', valore: P, onChange: (e) => { ctx.stato.annoScadenze = Number(e.target.value); ctx.aggiorna(); } })),
        campo(`Imposta sostitutiva dovuta per il ${P - 1} (€)`, numero('imposta', stimaImposta), `Stima dai dati registrati: ${euro(stimaImposta)}. Correggila con il valore della dichiarazione.`),
        campo(`Acconti imposta già versati per il ${P - 1} (€)`, numero('accSost', versati.sostitutiva ?? 0)),
        campo(inpsEtichetta, numero('contributi', stimaContributi.totale), `Stima: ${euro(stimaContributi.totale)}.`),
        campo(`Acconti INPS già versati per il ${P - 1} (€)`, numero('accInps', versati.inps ?? 0))),
      P === 2026 ? h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: s.proroga, onChange: (e) => { s.proroga = e.target.checked; ricalcola(); } }), 'Saldo e primo acconto prorogati al 20 luglio (art. 6 DL 89/2026, con effetti fatti salvi dalla L. 113/2026)') : null,
      h('div', { classe: 'azioni' }, h('button', { onClick: async () => {
        await archivio.modifica((d) => { const cl = d.clienti.find((x) => x.id === c.id); cl.versamenti = { ...cl.versamenti, [P - 1]: { sostitutiva: val('accSost', 0), inps: val('accInps', 0) } }; });
      } }, 'Salva acconti versati'))),
    esito,
    risultati,
    avviso('attenzione', 'Stima indicativa.', `Gli importi dell’anno ${P - 1} sono ricavati dai dati registrati con i parametri 2026. I codici tributo F24 sono quelli dell’imposta sostitutiva; per i contributi INPS i codici e le causali vanno verificati. L’acconto della Gestione Separata (80% in due rate) e quello sul reddito eccedente IVS sono da verificare.`));
}
