import { round2 } from './utils.js';

/**
 * Esito rispetto alle soglie di ricavi.
 * stati: ok | attenzione | esce-anno-successivo | esce-subito
 */
export function verificaSoglieRicavi(params, ricaviAnno) {
  const s = params.forfettario.soglie;
  let stato = 'ok';
  if (ricaviAnno > s.ricaviUscitaImmediata) stato = 'esce-subito';
  else if (ricaviAnno > s.ricaviEsclusione) stato = 'esce-anno-successivo';
  else if (ricaviAnno >= s.ricaviEsclusione * s.alertPercentuale) stato = 'attenzione';
  return {
    stato,
    ricaviAnno: round2(ricaviAnno),
    residuoSoglia: round2(s.ricaviEsclusione - ricaviAnno),
    percentuale: round2((ricaviAnno / s.ricaviEsclusione) * 100),
  };
}

/** Checklist delle cause di esclusione (art. 1 c. 54-57 L. 190/2014). */
export function verificaCauseEsclusione(params, dati) {
  const limite = params.forfettario.soglie.redditoLavoroDipendente;
  const cause = [
    { codice: 'ricavi-anno-precedente', ok: dati.ricaviAnnoPrecedente <= params.forfettario.soglie.ricaviEsclusione,
      descrizione: 'Ricavi/compensi dell’anno precedente entro 85.000 €' },
    { codice: 'lavoro-dipendente', ok: dati.redditoLavoroDipendente <= limite || dati.rapportoLavoroCessato === true,
      descrizione: `Redditi da lavoro dipendente/assimilati entro ${limite.toLocaleString('it-IT')} € (non rileva se il rapporto è cessato)` },
    { codice: 'partecipazioni', ok: !dati.partecipazioneSocietaControllate,
      descrizione: 'Nessun controllo di SRL o partecipazione in società di persone/associazioni/imprese familiari in attività riconducibili' },
    { codice: 'clienti-ex-datori', ok: !dati.attivitaVersoExDatoriLavoro,
      descrizione: 'Attività non prevalentemente verso datori di lavoro attuali o dei due anni precedenti (art. 1 c. 57 lett. d-bis)' },
    { codice: 'altri-regimi', ok: !dati.regimiSpeciali,
      descrizione: 'Non si applicano regimi speciali IVA o forfettari incompatibili' },
    { codice: 'non-residente', ok: !dati.nonResidente,
      descrizione: 'Residente in Italia o in Stato UE/SEE con almeno il 75% del reddito prodotto in Italia' },
    { codice: 'cessione-immobili', ok: !dati.cessioneImmobiliMezziNuovi,
      descrizione: 'Non effettua in via esclusiva o prevalente cessione di fabbricati, terreni edificabili o mezzi di trasporto nuovi' },
  ];
  return { cause, esclusioni: cause.filter((c) => !c.ok).map((c) => c.codice), ammesso: cause.every((c) => c.ok) };
}

/**
 * Condizioni per l'aliquota 5% (art. 1 c. 65 L. 190/2014): tutte devono valere.
 */
export function verificaRequisitiStartup(dati) {
  const condizioni = [
    { codice: 'nessuna-attivita-3-anni', ok: !dati.attivitaNeiTreAnniPrecedenti,
      descrizione: 'Nessuna attività artistica, professionale o d’impresa nei 3 anni precedenti' },
    { codice: 'non-prosecuzione', ok: !dati.prosecuzioneAltraAttivita,
      descrizione: 'L’attività non è mera prosecuzione di lavoro dipendente/autonomo precedente (esclusa la pratica obbligatoria)' },
    { codice: 'ricavi-attivita-rilevata', ok: !dati.proseguitaAttivitaAltroSoggetto || dati.ricaviAttivitaRilevata <= 85000,
      descrizione: 'Se si prosegue l’attività di un altro soggetto, i suoi ricavi precedenti non superano 85.000 €' },
  ];
  return { condizioni, ammesso: condizioni.every((c) => c.ok) };
}
