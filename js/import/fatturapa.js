// Lettura dei file XML FatturaPA (fatture emesse). Parser a espressioni regolari volutamente minimale:
// funziona identico in browser e Node, ignora i prefissi di namespace e non esegue mai markup.

const decodifica = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

function senzaNamespace(xml) {
  return xml.replace(/<(\/?)[A-Za-z0-9_.-]+:/g, '<$1');
}

function primo(blocco, tag) {
  const m = blocco.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
  return m ? decodifica(m[1].trim()) : '';
}

function tutti(blocco, tag) {
  return [...blocco.matchAll(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'g'))].map((m) => decodifica(m[1].trim()));
}

/**
 * @returns {{fatture: object[], errori: string[]}} ricavo = somma degli imponibili (bollo escluso).
 * Le note di credito (TD04) hanno importo negativo.
 */
export function fattureDaXml(xmlGrezzo, nomeFile = '') {
  const xml = senzaNamespace(xmlGrezzo);
  const corpi = [...xml.matchAll(/<FatturaElettronicaBody(?:\s[^>]*)?>([\s\S]*?)<\/FatturaElettronicaBody>/g)].map((m) => m[1]);
  if (corpi.length === 0) return { fatture: [], errori: [`${nomeFile || 'File'}: non è una FatturaPA valida`] };

  const cessionario = primo(xml, 'CessionarioCommittente');
  const controparte = primo(cessionario, 'Denominazione')
    || [primo(cessionario, 'Nome'), primo(cessionario, 'Cognome')].filter(Boolean).join(' ');

  const fatture = [], errori = [];
  for (const corpo of corpi) {
    const generali = primo(corpo, 'DatiGeneraliDocumento');
    const data = primo(generali, 'Data');
    const numero = primo(generali, 'Numero');
    const tipo = primo(generali, 'TipoDocumento');
    const imponibili = tutti(primo(corpo, 'DatiBeniServizi'), 'ImponibileImporto').map(Number);
    let importo = imponibili.length ? imponibili.reduce((a, b) => a + b, 0) : Number(primo(generali, 'ImportoTotaleDocumento'));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data) || !Number.isFinite(importo)) {
      errori.push(`${nomeFile || 'File'} n. ${numero || '?'}: data o importo non leggibili`);
      continue;
    }
    if (tipo === 'TD04') importo = -Math.abs(importo);
    fatture.push({
      numero,
      data,
      controparte,
      importo: Math.round(importo * 100) / 100,
      dataIncasso: '',
      atecoCodice: '',
      bollo: primo(generali, 'BolloVirtuale') === 'SI' ? Number(primo(generali, 'ImportoBollo')) || 2 : 0,
      tipoDocumento: tipo,
    });
  }
  return { fatture, errori };
}
