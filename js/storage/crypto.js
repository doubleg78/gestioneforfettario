// Cifratura dei dati con Web Crypto: PBKDF2-SHA256 -> AES-256-GCM.
// La chiave derivata resta in memoria per la sessione, così ogni salvataggio costa un solo AES-GCM.

const ITERAZIONI = 600000;
const enc = new TextEncoder();
const dec = new TextDecoder();

function aBase64(bytes) {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

function daBase64(b64) {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

async function derivaChiave(password, salt, iterazioni) {
  const materiale = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: iterazioni, hash: 'SHA-256' },
    materiale,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

/** Nuova sessione di cifratura da una password (salt casuale). */
export async function nuovaSessione(password, iterazioni = ITERAZIONI) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return { chiave: await derivaChiave(password, salt, iterazioni), salt, iterazioni };
}

/** Cifra un oggetto JSON con la sessione; restituisce un blob serializzabile. */
export async function sigilla(sessione, dati) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cifrato = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, sessione.chiave, enc.encode(JSON.stringify(dati)));
  return {
    v: 1,
    kdf: 'PBKDF2-SHA256',
    iter: sessione.iterazioni,
    salt: aBase64(sessione.salt),
    iv: aBase64(iv),
    dati: aBase64(new Uint8Array(cifrato)),
  };
}

/** Apre un blob con la password. Lancia ErrorePassword se la password è errata o il blob è alterato. */
export async function apri(blob, password) {
  if (!blob || blob.v !== 1 || blob.kdf !== 'PBKDF2-SHA256') throw new Error('Formato di archivio non riconosciuto');
  const salt = daBase64(blob.salt);
  const chiave = await derivaChiave(password, salt, blob.iter);
  try {
    const chiaro = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: daBase64(blob.iv) }, chiave, daBase64(blob.dati));
    return { sessione: { chiave, salt, iterazioni: blob.iter }, dati: JSON.parse(dec.decode(chiaro)) };
  } catch {
    throw new ErrorePassword();
  }
}

export class ErrorePassword extends Error {
  constructor() {
    super('Password errata o archivio danneggiato');
    this.name = 'ErrorePassword';
  }
}
