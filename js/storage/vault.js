import { nuovaSessione, sigilla, apri, ErrorePassword } from './crypto.js';

const CHIAVE = 'archivio';

export const DATI_INIZIALI = () => ({ versione: 1, clienti: [], fatture: [], spese: [], ui: {} });

/**
 * Archivio cifrato: tutti i dati vivono in memoria (`dati`) e vengono risigillati su ogni modifica.
 */
export class Archivio {
  constructor(adattatore, { iterazioni } = {}) {
    this.adattatore = adattatore;
    this.iterazioni = iterazioni;
    this.sessione = null;
    this.dati = null;
    this._coda = Promise.resolve();
    this._ascoltatori = new Set();
  }

  async esiste() { return (await this.adattatore.leggi(CHIAVE)) !== null; }
  get sbloccato() { return this.dati !== null; }

  async crea(password) {
    this.sessione = await nuovaSessione(password, this.iterazioni);
    this.dati = DATI_INIZIALI();
    await this.salva();
  }

  async sblocca(password) {
    const blob = await this.adattatore.leggi(CHIAVE);
    if (!blob) throw new Error('Nessun archivio presente');
    const { sessione, dati } = await apri(blob, password);
    this.sessione = sessione;
    this.dati = dati;
  }

  /** Cambia la password: verifica quella attuale, poi risigilla l'archivio con salt e chiave nuovi. */
  async cambiaPassword(attuale, nuova) {
    if (!this.sbloccato) throw new Error('Archivio bloccato');
    if (nuova.length < 10) throw new Error('La nuova password deve avere almeno 10 caratteri');
    const blob = await this.adattatore.leggi(CHIAVE);
    try { await apri(blob, attuale); } catch { throw new ErrorePassword(); }
    this.sessione = await nuovaSessione(nuova, this.iterazioni);
    await this.salva();
  }

  blocca() { this.sessione = null; this.dati = null; this._notifica(); }

  /** Modifica i dati e salva (serializzato, nessun salvataggio perso). */
  async modifica(fn) {
    if (!this.sbloccato) throw new Error('Archivio bloccato');
    const risultato = fn(this.dati);
    this._notifica();
    await this.salva();
    return risultato;
  }

  salva() {
    this._coda = this._coda.then(async () => {
      if (!this.sessione) return;
      await this.adattatore.scrivi(CHIAVE, await sigilla(this.sessione, this.dati));
    });
    return this._coda;
  }

  /** Copia di backup: è lo stesso blob cifrato che sta nel database. */
  async esporta() {
    await this._coda;
    return this.adattatore.leggi(CHIAVE);
  }

  /** Ripristina un backup. Chiede la password con cui è stato creato e la adotta per la sessione. */
  async importa(blob, password) {
    const { sessione, dati } = await apri(blob, password);
    this.sessione = sessione;
    this.dati = dati;
    await this.salva();
    this._notifica();
  }

  ascolta(fn) { this._ascoltatori.add(fn); return () => this._ascoltatori.delete(fn); }
  _notifica() { for (const fn of this._ascoltatori) fn(); }
}
