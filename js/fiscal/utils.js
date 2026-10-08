// Utilità numeriche condivise dal motore di calcolo.

/** Arrotonda all'euro-centesimo (half away from zero). */
export function round2(n) {
  return Math.sign(n) * Math.round((Math.abs(n) + Number.EPSILON) * 100) / 100;
}

export function clamp0(n) {
  return n > 0 ? n : 0;
}

/** Applica una tabella di scaglioni [{fino, aliquota}] (ultimo fino = Infinity). */
export function applicaScaglioni(base, scaglioni) {
  let residuo = clamp0(base);
  let precedente = 0;
  let imposta = 0;
  for (const { fino, aliquota } of scaglioni) {
    if (residuo <= 0) break;
    const ampiezza = Math.min(fino - precedente, residuo);
    imposta += ampiezza * aliquota;
    residuo -= ampiezza;
    precedente = fino;
  }
  return round2(imposta);
}
