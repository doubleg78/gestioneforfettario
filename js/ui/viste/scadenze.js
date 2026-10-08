import { h, campo, scheda, testataPagina, bottone, avviso, tile, vuoto, euro, dataIt, scarica, MESI_LUNGHI } from '../dom.js';
import { scadenzarioCliente } from '../../domain/scadenze-cliente.js';
import { csvScadenzario } from '../../export/csv.js';
import { pdfScadenzario } from '../../export/pdf.js';
import { round2 } from '../../fiscal/utils.js';
import { testataCliente, voceAgenda, esportaPdf } from '../dominio-ui.js';
import { apriDialogo } from '../overlay.js';

const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

export function vistaScadenze(ctx) {
  const { archivio, dati, cliente: c, anno: P, oggi } = ctx;
  const eCassa = c.previdenza.tipo === 'cassa';
  const ivs = c.previdenza.tipo === 'artigiani' || c.previdenza.tipo === 'commercianti';
  const s = ctx.stato[`scad:${c.id}:${P}`] ??= { over: {}, proroga: P === 2026, rata1: dati.impostazioni?.ripartizioneAcconti ?? 0.5 };
  const risultato = scadenzarioCliente(c, dati, P, ctx.paramsPer, { ...s.over, proroga: s.proroga, rata1: s.rata1 });
  const { voci, stima, effettivi, paramsInfo, paramsPrecInfo } = risultato;
  const sorgente = ctx.riepilogo();

  const segna = async (v) => {
    await archivio.modifica((d) => { const cl = d.clienti.find((x) => x.id === c.id); cl.pagati ??= {}; const k = `${P}:${v.id}`; if (cl.pagati[k]) delete cl.pagati[k]; else cl.pagati[k] = oggi; });
  };

  const daVersare = voci.filter((v) => v.tipo !== 'adempimento' && !v.versata);
  const totaleDa = round2(daVersare.filter((v) => v.data && v.data >= oggi).reduce((t, v) => t + v.importo, 0));
  const scaduto = round2(daVersare.filter((v) => v.data && v.data < oggi).reduce((t, v) => t + v.importo, 0));
  const prossima = daVersare.find((v) => v.data && v.data >= oggi && v.importo > 0);

  // Totali per data: servono per compilare un unico F24
  const perData = new Map();
  for (const v of voci) if (v.data && v.importo > 0 && v.tipo !== 'adempimento' && !v.versata) perData.set(v.data, round2((perData.get(v.data) ?? 0) + v.importo));

  const gruppi = new Map();
  for (const v of voci.filter((x) => x.data)) { const k = v.data.slice(0, 7); (gruppi.get(k) ?? gruppi.set(k, []).get(k)).push(v); }
  const senzaData = voci.filter((v) => !v.data);

  const ripartizione = h('select', { classe: 'input', onChange: (e) => { s.rata1 = Number(e.target.value); ctx.aggiorna(); } },
    h('option', { value: '0.5', selected: s.rata1 === 0.5 }, '50% + 50% (attività con ISA)'), h('option', { value: '0.4', selected: s.rata1 === 0.4 }, '40% + 60% (attività senza ISA)'));
  const modifica = (chiave, valore) => { if (valore === '' || valore === null) delete s.over[chiave]; else s.over[chiave] = num(valore); ctx.aggiorna(); };

  function apriBase() {
    const salvato = c.versamenti?.[P - 1] ?? {};
    const campoNum = (et, chiave, stimaVal, aiuto) => campo(et, h('input', { type: 'number', step: '0.01', min: '0', valore: s.over[chiave] ?? '', placeholder: stimaVal.toFixed(2), onInput: (e) => modifica2(chiave, e.target.value) }), aiuto);
    const tmp = { ...s.over };
    const modifica2 = (chiave, v) => { if (v === '') delete tmp[chiave]; else tmp[chiave] = num(v); };
    const dlg = apriDialogo({
      titolo: `Base di calcolo ${P - 1}`, largo: true,
      corpo: h('div', { classe: 'pila', style: 'gap:16px' },
        h('p', { classe: 'muted' }, 'Gli importi sono stimati dai dati registrati. Inserisci i valori della dichiarazione per sostituire le stime (il campo vuoto usa la stima).'),
        h('div', { classe: 'griglia-campi' },
          campoNum(`Imposta sostitutiva dovuta ${P - 1} (€)`, 'imposta', stima.imposta),
          campoNum(`Acconti imposta versati per il ${P - 1} (€)`, 'accSost', stima.accSost, `Stima: ${euro(stima.accSost)} (metodo storico).`),
          eCassa ? null : campoNum(`Contributi INPS dovuti ${P - 1} (€)`, 'contributi', stima.contributi.totale),
          eCassa ? null : campoNum(`Acconti INPS versati per il ${P - 1} (€)`, 'accInps', stima.accInps),
          c.previdenza.tipo === 'gestione-separata' || ivs ? campoNum(`Reddito ${P - 1} per gli acconti INPS (€)`, 'reddito', stima.reddito) : null)),
      azioni: [bottone('Annulla', { onClick: () => dlg.chiudi() }),
        bottone('Applica', { onClick: () => { s.over = tmp; dlg.chiudi(); ctx.aggiorna(); } }),
        bottone('Applica e salva nel cliente', { variante: 'primario', onClick: async () => {
          s.over = tmp;
          await archivio.modifica((d) => { const cl = d.clienti.find((x) => x.id === c.id); cl.versamenti = { ...cl.versamenti, [P - 1]: { ...(cl.versamenti[P - 1] ?? {}), sostitutiva: effettivi.accSost, inps: effettivi.accInps, ...(tmp.accSost !== undefined ? { sostitutiva: tmp.accSost } : {}), ...(tmp.accInps !== undefined ? { inps: tmp.accInps } : {}) } }; });
          dlg.chiudi(); ctx.toast('Acconti versati salvati.');
        } })],
    });
  }

  // Versamenti alla cassa professionale inseriti a mano
  function apriCassa() {
    const nuova = { data: '', descrizione: '', importo: 0 };
    const dlg = apriDialogo({ titolo: 'Versamento alla cassa professionale',
      corpo: h('form', { classe: 'pila', style: 'gap:14px', onSubmit: (e) => e.preventDefault() },
        h('p', { classe: 'muted' }, 'Importi e scadenze dipendono dalla cassa di appartenenza: inseriscili dal regolamento o dalla comunicazione ricevuta.'),
        campo('Data', h('input', { type: 'date', required: true, onInput: (e) => { nuova.data = e.target.value; } })),
        campo('Descrizione', h('input', { type: 'text', required: true, onInput: (e) => { nuova.descrizione = e.target.value; } })),
        campo('Importo (€)', h('input', { type: 'number', step: '0.01', min: '0', required: true, onInput: (e) => { nuova.importo = num(e.target.value); } }))),
      azioni: [bottone('Annulla', { onClick: () => dlg.chiudi() }), bottone('Aggiungi', { variante: 'primario', onClick: async () => {
        if (!nuova.data || !nuova.descrizione) return;
        await archivio.modifica((d) => { const cl = d.clienti.find((x) => x.id === c.id); cl.scadenzeCassa = [...(cl.scadenzeCassa ?? []), { ...nuova, anno: P }]; });
        dlg.chiudi(); ctx.toast('Versamento aggiunto.');
      } })] });
  }

  return h('div', { classe: 'pila' },
    testataCliente(ctx, sorgente, []),
    testataPagina('Scadenzario', `Versamenti ${P}: saldo ${P - 1} e acconti ${P}`, [
      bottone('Base di calcolo', { icona: 'impostazioni', onClick: apriBase }),
      eCassa ? bottone('Aggiungi versamento cassa', { icona: 'piu', onClick: apriCassa }) : null,
      bottone('CSV', { icona: 'scarica', onClick: () => scarica(`scadenzario-${P}-${c.nome.replace(/\W+/g, '_')}.csv`, csvScadenzario(voci), 'text/csv;charset=utf-8') }),
      bottone('PDF', { variante: 'primario', icona: 'pdf', onClick: () => esportaPdf((J) => pdfScadenzario(J, { voci, cliente: c, anno: P, studio: ctx.studio, stime: { imposta: effettivi.imposta, accSost: effettivi.accSost, contributi: effettivi.contributi, accInps: effettivi.accInps } }), `scadenzario-${P}-${c.nome.replace(/\W+/g, '-')}.pdf`) })]),
    paramsInfo.esatto ? null : avviso('attenzione', 'Parametri non disponibili per questo anno.', `Date e aliquote usano i parametri ${paramsInfo.annoUsato}.`),
    h('div', { classe: 'tiles' },
      tile('Da versare', euro(totaleDa), { icona: 'calendario', nota: prossima ? `Prossima: ${dataIt(prossima.data)}` : 'Nessuna scadenza futura', evidenza: true }),
      tile('Scaduto non versato', euro(scaduto), { icona: 'avviso', nota: scaduto ? 'Segna come versato o valuta il ravvedimento' : 'Tutto in regola' }),
      tile(`Imposta sostitutiva ${P - 1}`, euro(effettivi.imposta), { icona: 'scudo', nota: s.over.imposta !== undefined ? 'Valore inserito' : 'Stima dai dati registrati' }),
      eCassa ? tile('Contributi cassa', 'Manuali', { icona: 'utente', nota: 'Inseriti dall’utente' }) : tile(`Contributi INPS ${P - 1}`, euro(effettivi.contributi), { icona: 'utente', nota: s.over.contributi !== undefined ? 'Valore inserito' : 'Stima dai dati registrati' })),
    h('div', { classe: 'griglia-2-1' },
      scheda({ senzaPadding: true },
        voci.length === 0 ? vuoto({ icona: 'calendario', titolo: 'Nessun versamento' })
          : [...gruppi.entries()].map(([k, vs]) => h('div', null, h('div', { classe: 'intestazione-mese' }, `${MESI_LUNGHI[Number(k.slice(5)) - 1]} ${k.slice(0, 4)}`), h('ul', { classe: 'timeline' }, vs.map((v) => voceAgenda(v, { onVersata: segna })))))
            .concat(senzaData.length ? [h('div', { classe: 'intestazione-mese' }, 'Senza data'), h('ul', { classe: 'timeline' }, senzaData.map((v) => h('li', { classe: 'voce-agenda', style: 'grid-template-columns:1fr' }, h('div', null, h('strong', null, v.descrizione), h('div', { classe: 'muted piccolo' }, v.nota)))))] : [])),
      h('div', { classe: 'pila' },
        scheda({ titolo: 'Totali per data', sottotitolo: 'Per compilare un unico F24' },
          perData.size ? h('dl', { classe: 'dl' }, [...perData.entries()].flatMap(([d, t]) => [h('dt', null, dataIt(d)), h('dd', { classe: 'numero' }, euro(t))])) : h('p', { classe: 'muted' }, 'Nessun versamento in sospeso.')),
        scheda({ titolo: 'Impostazioni di calcolo' },
          h('div', { classe: 'pila', style: 'gap:14px' },
            campo('Ripartizione degli acconti', ripartizione, 'Risoluzione AdE 93/E del 12/11/2019: 50% + 50% per i forfettari con attività soggette a ISA; 40% + 60% negli altri casi.'),
            P === 2026 ? h('label', { classe: 'spunta' }, h('input', { type: 'checkbox', checked: s.proroga, onChange: (e) => { s.proroga = e.target.checked; ctx.aggiorna(); } }), h('span', null, 'Saldo e primo acconto prorogati al 20 luglio ', h('span', { classe: 'muted' }, '(art. 6 DL 89/2026, effetti fatti salvi dalla L. 113/2026)'))) : null,
            h('div', { classe: 'muted piccolo' }, `Base di calcolo: anno ${P - 1} (parametri ${paramsPrecInfo.annoUsato}).`))),
        avviso('info', 'Stima indicativa.', ivs ? 'Per artigiani e commercianti gli importi ufficiali sono nel Cassetto previdenziale INPS (“Dati del mod. F24”).' : 'Verifica gli importi con la dichiarazione dei redditi.')) ));
}
