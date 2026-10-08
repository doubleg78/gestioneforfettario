// Fabbriche dei record dell'archivio.

const id = () => (globalThis.crypto?.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`);

export const TIPI_PREVIDENZA = [
  { valore: 'gestione-separata', etichetta: 'Gestione Separata INPS (professionista senza cassa)' },
  { valore: 'artigiani', etichetta: 'INPS Artigiani' },
  { valore: 'commercianti', etichetta: 'INPS Commercianti' },
  { valore: 'cassa', etichetta: 'Cassa professionale' },
];

export function nuovoCliente() {
  return {
    id: id(),
    nome: '',
    codiceFiscale: '',
    partitaIva: '',
    annoInizioAttivita: new Date().getFullYear(),
    ateco: [],
    previdenza: { tipo: 'gestione-separata', altraCopertura: false, iscrittoDal1996: true, riduzione35: false, cassa: { aliquotaSoggettiva: 0.1, contributoMinimo: 0 } },
    startup: false,
    scadenzeCassa: [], // versamenti alla cassa professionale inseriti a mano {anno, data, descrizione, importo}
    versamenti: {}, // per anno d'imposta: { sostitutiva, inps } acconti già versati
    note: '',
  };
}

export function nuovaVoceAteco() {
  return { codice: '', descrizione: '', gruppo: 'altre-attivita' };
}

export function nuovaFattura(clienteId) {
  return { id: id(), clienteId, numero: '', data: '', controparte: '', importo: 0, dataIncasso: '', atecoCodice: '', bollo: 0, note: '' };
}

export function nuovaSpesa(clienteId) {
  return { id: id(), clienteId, data: '', descrizione: '', importo: 0, categoria: '' };
}
