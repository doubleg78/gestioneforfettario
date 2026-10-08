import { h, tile, scheda, bottone, avviso, meter, tabella, vuoto, campo, euro, euroIntero, percentuale, dataIt } from '../dom.js';
import { testataCliente, statoMeter, esportaPdf, voceAgenda } from '../dominio-ui.js';
import { graficoColonne, graficoLinee } from '../grafici.js';
import { incassiMensili, cumulato, MESI } from '../../domain/serie.js';
import { scadenzarioCliente } from '../../domain/scadenze-cliente.js';
import { pdfRiepilogo } from '../../export/pdf.js';
import { apriDialogo } from '../overlay.js';

const MESSAGGI_SOGLIA = {
  ok: ['ok', 'Entro la soglia.', 'Puoi continuare a incassare senza limiti immediati.'],
  attenzione: ['attenzione', 'Ci si avvicina agli 85.000 €.', 'Valuta con attenzione i prossimi incassi.'],
  'esce-anno-successivo': ['attenzione', 'Superati 85.000 €.', 'Il regime forfettario cessa dall’anno successivo.'],
  'esce-subito': ['errore', 'Superati 100.000 €.', 'Uscita immediata dal regime: l’IVA è dovuta dalle operazioni che hanno comportato il superamento.'],
};

export function vistaRiepilogo(ctx) {
  const { dati, cliente: c, anno, params, esatto, annoUsato, archivio } = ctx;
  const r = ctx.riepilogo();
  const mensili = incassiMensili(dati.fatture, c.id, anno);
  const [tipo, titolo, testo] = MESSAGGI_SOGLIA[r.soglie.stato];
  const f = r.forfettario;
  const prossime = scadenzarioCliente(c, dati, anno, ctx.paramsPer).voci.filter((v) => v.importo > 0 && v.tipo !== 'adempimento' && !v.versata && v.data >= ctx.oggi).slice(0, 4);

  const modificaDeduzione = () => {
    const inp = h('input', { type: 'number', step: '0.01', min: '0', valore: r.deduzione.metodo === 'registrati' ? r.deduzione.importo : '', placeholder: r.deduzione.importo.toFixed(2) });
    const dlg = apriDialogo({
      titolo: 'Contributi versati nell’anno',
      corpo: h('div', { classe: 'pila', style: 'gap:14px' },
        h('p', { classe: 'muted' }, `I contributi previdenziali si deducono dal reddito forfettario nell’anno in cui sono versati (art. 1 c. 64 L. 190/2014). Senza dati registrati l’app li stima con i contributi di competenza del ${anno - 1}.`),
        campo(`Contributi INPS versati nel ${anno} (€)`, inp, 'Saldo dell’anno precedente più acconti dell’anno. Lascia vuoto per tornare alla stima.')),
      azioni: [
        bottone('Annulla', { onClick: () => dlg.chiudi() }),
        bottone('Salva', { variante: 'primario', onClick: async () => {
          const valore = inp.value === '' ? null : Number(inp.value);
          await archivio.modifica((d) => { const cl = d.clienti.find((x) => x.id === c.id); cl.versamenti ??= {}; cl.versamenti[anno] = { ...cl.versamenti[anno] }; if (valore === null) delete cl.versamenti[anno].contributiVersatiAnno; else cl.versamenti[anno].contributiVersatiAnno = valore; });
          dlg.chiudi(); ctx.toast('Contributi aggiornati.');
        } })],
    });
  };

  const barra = h('div', null, meter(Math.min(100, r.soglie.percentuale), statoMeter(r.soglie.stato), true));
  const etichettaMetodo = { registrati: 'versati nell’anno (registrati)', stima: 'stima per cassa', competenza: 'di competenza' }[r.deduzione.metodo];

  return h('div', { classe: 'pila' },
    testataCliente(ctx, r, [
      bottone('PDF', { icona: 'pdf', onClick: () => esportaPdf((J) => pdfRiepilogo(J, { riepilogo: r, cliente: c, anno, studio: ctx.studio, mensili }), `riepilogo-${anno}-${c.nome.replace(/\W+/g, '-')}.pdf`) }),
      bottone('Stampa', { icona: 'stampa', onClick: () => window.print() })]),
    esatto ? null : avviso('attenzione', 'Parametri non disponibili per questo anno.', `La stima usa i parametri ${annoUsato}.`),
    h('div', { classe: 'tiles' },
      tile(`Ricavi incassati ${anno}`, euro(r.ricavi), { evidenza: true, icona: 'grafico', nota: 'Criterio di cassa' }),
      tile('Fatturato da incassare', euro(r.daIncassare), { icona: 'orologio', nota: 'Fatture senza data di incasso' }),
      tile('Spese registrate', euro(r.spese), { icona: 'ricevuta', nota: 'Non deducibili nel forfettario' }),
      tile('Aliquota sostitutiva', percentuale(r.aliquota.aliquota), { icona: 'scudo', nota: r.aliquota.startup ? `Startup fino al ${r.aliquota.annoUltimoStartup}` : 'Aliquota ordinaria' })),
    h('div', { classe: 'griglia-2-1' },
      h('div', { classe: 'pila' },
        scheda({ titolo: 'Soglia di ricavi', sottotitolo: '85.000 € per restare nel regime, 100.000 € per l’uscita immediata' },
          h('div', { classe: 'pila', style: 'gap:12px' }, barra,
            h('div', { classe: 'riga-flex', style: 'justify-content:space-between' }, h('strong', null, euro(r.ricavi)), h('span', { classe: 'muted' }, `${r.soglie.percentuale.toLocaleString('it-IT')}% di 85.000 € · residuo ${euro(r.soglie.residuoSoglia)}`)),
            avviso(tipo, titolo, testo))),
        h('div', { classe: 'griglia-2' },
          scheda({}, graficoColonne({ titolo: `Incassi mensili ${anno}`, descrizione: 'Ricavi incassati per mese', categorie: MESI, valori: mensili })),
          scheda({}, graficoLinee({ titolo: `Ricavi cumulati ${anno}`, descrizione: 'Andamento rispetto alla soglia', x: MESI.map((_, i) => i + 1), formatoX: (v) => MESI[Math.round(v) - 1] ?? '', serie: [{ nome: 'Ricavi cumulati', valori: cumulato(mensili), colore: '--serie-1' }], riferimentoY: { valore: params.forfettario.soglie.ricaviEsclusione, etichetta: 'Soglia 85.000 €' } }))),
        scheda({ titolo: 'Ricavi per codice ATECO', senzaPadding: true },
          tabella({ righe: r.perAteco, colonne: [
            { chiave: 'a', titolo: 'Attività', cella: (v) => h('div', null, h('strong', null, v.codice || '—'), h('div', { classe: 'sotto' }, v.descrizione)) },
            { chiave: 'k', titolo: 'Coefficiente', numerica: true, cella: (v) => (v.coefficiente ? percentuale(v.coefficiente) : '—') },
            { chiave: 'r', titolo: 'Ricavi', numerica: true, cella: (v) => euro(v.importo) },
            { chiave: 'rf', titolo: 'Reddito forfettario', numerica: true, cella: (v) => euro(v.importo * v.coefficiente) },
          ] }))),
      h('div', { classe: 'pila' },
        f ? scheda({ titolo: 'Stima imposta e contributi', sottotitolo: 'Regime forfettario' },
          h('dl', { classe: 'dl' },
            h('dt', null, 'Reddito forfettario lordo'), h('dd', { classe: 'numero' }, euro(f.redditoLordo)),
            h('dt', null, 'Contributi dedotti'), h('dd', { classe: 'numero' }, euro(f.contributiDeducibili)),
            h('dt', null, 'Reddito imponibile'), h('dd', { classe: 'numero' }, euro(f.imponibile)),
            h('dt', null, `Imposta al ${percentuale(f.aliquota)}`), h('dd', { classe: 'numero' }, euro(f.imposta)),
            h('dt', null, 'Contributi di competenza'), h('dd', { classe: 'numero' }, euro(f.contributi.totale))),
          h('hr'),
          h('div', { classe: 'riga-flex', style: 'justify-content:space-between' }, h('strong', null, 'Imposta + contributi'), h('strong', { style: 'font-size:18px' }, euro(f.totaleCarico))),
          h('p', { classe: 'muted piccolo', style: 'margin-top:12px' }, `Contributi dedotti: ${etichettaMetodo}. `, h('a', { href: 'javascript:void(0)', onClick: modificaDeduzione }, 'Modifica')))
          : avviso('attenzione', 'Stima non disponibile.', 'Assegna un codice ATECO con coefficiente nell’anagrafica del cliente.'),
        scheda({ titolo: 'Prossimi versamenti', senzaPadding: true, azioni: [bottone('Scadenzario', { variante: 'ghost', piccolo: true, onClick: () => ctx.naviga('#/scadenze') })] },
          prossime.length ? h('ul', { classe: 'timeline' }, prossime.map((v) => voceAgenda(v))) : vuoto({ icona: 'spunta', titolo: 'Nessun versamento in sospeso' })))));
}
