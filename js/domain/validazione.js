// Validazioni formali dei dati anagrafici.

/** Partita IVA italiana: 11 cifre con cifra di controllo. */
export function partitaIvaValida(piva) {
  if (!/^\d{11}$/.test(piva)) return false;
  let somma = 0;
  for (let i = 0; i < 10; i++) {
    let d = Number(piva[i]);
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    somma += d;
  }
  return (10 - (somma % 10)) % 10 === Number(piva[10]);
}

const DISPARI = { 0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21, A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18, N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23 };

/** Codice fiscale persona fisica (16 caratteri) con carattere di controllo. */
export function codiceFiscaleValido(cf) {
  const v = String(cf).toUpperCase();
  if (!/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(v)) return false;
  let somma = 0;
  for (let i = 0; i < 15; i++) {
    const c = v[i];
    if (i % 2 === 0) somma += DISPARI[c];
    else somma += /\d/.test(c) ? Number(c) : c.charCodeAt(0) - 65;
  }
  return String.fromCharCode(65 + (somma % 26)) === v[15];
}

/** Codice fiscale numerico (11 cifre) di società: stessa verifica della partita IVA. */
export function codiceFiscaleSocietaValido(cf) { return partitaIvaValida(cf); }
