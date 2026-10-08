// Carica jsPDF e jsPDF-AutoTable da CDN solo quando serve (con controllo di integrità SRI).
// Se la rete non è disponibile l'interfaccia ripiega sulla stampa del browser.

const LIBRERIE = [
  { src: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/4.0.0/jspdf.umd.min.js', integrity: 'sha384-O5lMb4MDjtn5zz9DSqizqf3JK5ne6jnTbRh523aaJiE4fpejSlmaEaksvdfbbCiC' },
  { src: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/5.0.7/jspdf.plugin.autotable.min.js', integrity: 'sha384-dIbnedacRYRBIEfq+CpuVaJ/+MlG7QkNfYqMqLEdaL2nTsyRxcF6vGZdsnvQpeWR' },
];

function caricaScript({ src, integrity }) {
  return new Promise((ok, ko) => {
    const s = document.createElement('script');
    s.src = src; s.integrity = integrity; s.crossOrigin = 'anonymous'; s.async = false;
    s.onload = ok;
    s.onerror = () => ko(new Error('Impossibile caricare le librerie PDF: controlla la connessione'));
    document.head.append(s);
  });
}

let promessa;
/** @returns {Promise<typeof import('jspdf').jsPDF>} */
export function caricaPdf() {
  if (!promessa) {
    promessa = (async () => {
      if (!window.jspdf) for (const l of LIBRERIE) await caricaScript(l);
      return window.jspdf.jsPDF;
    })().catch((e) => { promessa = null; throw e; });
  }
  return promessa;
}
