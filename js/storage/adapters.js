// Adattatori di persistenza chiave/valore: IndexedDB nel browser, memoria nei test.

export function adattatoreMemoria() {
  const m = new Map();
  return {
    async leggi(k) { return m.get(k) ?? null; },
    async scrivi(k, v) { m.set(k, structuredClone(v)); },
    async elimina(k) { m.delete(k); },
    async svuota() { m.clear(); },
  };
}

export function adattatoreIndexedDB(nome = 'gestione-forfettario') {
  const apri = () => new Promise((ok, ko) => {
    const r = indexedDB.open(nome, 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onsuccess = () => ok(r.result);
    r.onerror = () => ko(r.error);
  });
  const tx = async (modo, fn) => {
    const db = await apri();
    return new Promise((ok, ko) => {
      const t = db.transaction('kv', modo);
      const req = fn(t.objectStore('kv'));
      t.oncomplete = () => { db.close(); ok(req?.result ?? null); };
      t.onerror = () => { db.close(); ko(t.error); };
    });
  };
  return {
    leggi: (k) => tx('readonly', (s) => s.get(k)),
    scrivi: (k, v) => tx('readwrite', (s) => s.put(v, k)),
    elimina: (k) => tx('readwrite', (s) => s.delete(k)),
    svuota: () => tx('readwrite', (s) => s.clear()),
  };
}
