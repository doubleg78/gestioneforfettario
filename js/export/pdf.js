// Costruzione dei PDF (A4) con jsPDF + AutoTable. Le funzioni ricevono la classe jsPDF già caricata,
// così sono testabili in Node e indipendenti dal modo in cui la libreria arriva nel browser.

const MARGINE = 18;
const COLORI = { primario: [11, 95, 88], testo: [15, 23, 34], tenue: [99, 112, 134], linea: [227, 231, 238], wash: [229, 244, 241], errore: [180, 35, 24] };

const eur = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', useGrouping: 'always' });
export const eurPdf = (n) => eur.format(n ?? 0).replace(/ /g, ' ');
const dataIt = (iso) => (iso ? iso.split('-').reverse().join('/') : '');
const pct = (n) => `${(n * 100).toLocaleString('it-IT', { maximumFractionDigits: 2 })}%`;

/** Crea il documento con intestazione dello studio e titolo. */
function nuovoDocumento(JsPDF, { studio = {}, titolo, sottotitolo, righeMeta = [] }) {
  const doc = new JsPDF({ unit: 'mm', format: 'a4' });
  doc.setProperties({ title: titolo, subject: sottotitolo ?? '', creator: 'Gestione Forfettario' });
  const larghezza = doc.internal.pageSize.getWidth();

  doc.setFont('helvetica', 'bold').setFontSize(15).setTextColor(...COLORI.primario);
  doc.text((studio.nome || 'Studio').toUpperCase(), MARGINE, 20, { charSpace: 0.4 });
  doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(...COLORI.tenue);
  if (studio.descrizione) doc.text(studio.descrizione, MARGINE, 25);
  const contatti = [studio.indirizzo, [studio.telefono, studio.email].filter(Boolean).join(' · '), studio.pec ? `PEC ${studio.pec}` : '', studio.partitaIva ? `P.IVA ${studio.partitaIva}` : ''].filter(Boolean);
  contatti.forEach((riga, i) => doc.text(riga, larghezza - MARGINE, 18 + i * 4, { align: 'right' }));

  doc.setDrawColor(...COLORI.primario).setLineWidth(0.6).line(MARGINE, 31, larghezza - MARGINE, 31);
  doc.setDrawColor(...COLORI.wash).setLineWidth(1.4).line(MARGINE, 32.2, larghezza - MARGINE, 32.2);

  doc.setFont('helvetica', 'bold').setFontSize(18).setTextColor(...COLORI.testo);
  doc.text(titolo, MARGINE, 45);
  let y = 45;
  if (sottotitolo) { doc.setFont('helvetica', 'normal').setFontSize(10.5).setTextColor(...COLORI.tenue); y += 6; doc.text(sottotitolo, MARGINE, y); }
  righeMeta.forEach(([k, v]) => { y += 5; doc.setFontSize(9).setTextColor(...COLORI.tenue).text(`${k}: `, MARGINE, y); doc.setTextColor(...COLORI.testo).text(String(v), MARGINE + doc.getTextWidth(`${k}: `) + 0.5, y); });
  doc.__y = y + 8;
  return doc;
}

function titoloSezione(doc, testo) {
  const y = doc.__y;
  doc.setFont('helvetica', 'bold').setFontSize(11).setTextColor(...COLORI.testo).text(testo, MARGINE, y);
  doc.__y = y + 3;
}

function tabella(doc, { head, body, foot, colonneNumeriche = [], larghezze = {}, enfasiUltimaRiga = false }) {
  const stileNum = Object.fromEntries(colonneNumeriche.map((i) => [i, { halign: 'right' }]));
  const stiliLarghezza = Object.fromEntries(Object.entries(larghezze).map(([i, w]) => [i, { cellWidth: w }]));
  const colonne = {};
  for (const k of new Set([...Object.keys(stileNum), ...Object.keys(stiliLarghezza)])) colonne[k] = { ...stileNum[k], ...stiliLarghezza[k] };
  doc.autoTable({
    startY: doc.__y, head: head ? [head] : undefined, body, foot: foot ? [foot] : undefined,
    margin: { left: MARGINE, right: MARGINE, bottom: 22 },
    theme: 'plain',
    styles: { font: 'helvetica', fontSize: 9, textColor: COLORI.testo, cellPadding: { top: 2.4, bottom: 2.4, left: 2.5, right: 2.5 }, lineColor: COLORI.linea, lineWidth: { bottom: 0.2 }, overflow: 'linebreak' },
    headStyles: { fillColor: COLORI.wash, textColor: COLORI.primario, fontStyle: 'bold', fontSize: 8, lineWidth: 0 },
    footStyles: { fillColor: [255, 255, 255], textColor: COLORI.testo, fontStyle: 'bold', lineWidth: { top: 0.5 }, lineColor: COLORI.primario },
    columnStyles: colonne,
    didParseCell: (d) => {
      if (enfasiUltimaRiga && d.section === 'body' && d.row.index === body.length - 1) d.cell.styles.fontStyle = 'bold';
      if (d.section !== 'body' && colonneNumeriche.includes(d.column.index)) d.cell.styles.halign = 'right';
    },
  });
  doc.__y = doc.lastAutoTable.finalY + 8;
}

function nota(doc, testo) {
  const larghezza = doc.internal.pageSize.getWidth() - MARGINE * 2;
  doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(...COLORI.tenue);
  const righe = doc.splitTextToSize(testo, larghezza);
  doc.text(righe, MARGINE, doc.__y);
  doc.__y += righe.length * 3.8 + 3;
}

/** Piè di pagina su tutte le pagine: avvertenza e numerazione. */
function chiudi(doc, studio) {
  const pagine = doc.getNumberOfPages();
  const w = doc.internal.pageSize.getWidth(), h = doc.internal.pageSize.getHeight();
  for (let i = 1; i <= pagine; i++) {
    doc.setPage(i);
    doc.setDrawColor(...COLORI.linea).setLineWidth(0.2).line(MARGINE, h - 16, w - MARGINE, h - 16);
    doc.setFont('helvetica', 'normal').setFontSize(7.5).setTextColor(...COLORI.tenue);
    doc.text('Prospetto di stima a fini di pianificazione: non sostituisce la dichiarazione dei redditi né la consulenza professionale.', MARGINE, h - 11);
    doc.text(`${studio?.nome ?? 'Gestione Forfettario'} · generato il ${new Date().toLocaleDateString('it-IT')}`, MARGINE, h - 7);
    doc.text(`Pagina ${i} di ${pagine}`, w - MARGINE, h - 7, { align: 'right' });
  }
  return doc;
}

export function pdfSimulazione(JsPDF, { conf, cliente, anno, studio, ipotesi }) {
  const f = conf.forfettario, o = conf.ordinario;
  const doc = nuovoDocumento(JsPDF, { studio, titolo: 'Confronto forfettario e ordinario', sottotitolo: `${cliente.nome} · anno d'imposta ${anno}`, righeMeta: [['Gestione previdenziale', ipotesi.previdenza]] });
  titoloSezione(doc, 'Esito');
  const migliore = conf.conveniente === 'pari' ? 'I due regimi risultano equivalenti.' : `Il regime ${conf.conveniente === 'forfettario' ? 'forfettario' : 'ordinario'} lascia un netto superiore di ${eurPdf(Math.abs(conf.differenza))}.`;
  doc.setFont('helvetica', 'normal').setFontSize(10).setTextColor(...COLORI.testo).text(migliore, MARGINE, doc.__y + 3);
  doc.__y += 10;
  titoloSezione(doc, 'Confronto');
  tabella(doc, {
    head: ['Voce', 'Forfettario', 'Ordinario'],
    body: [
      ['Ricavi', eurPdf(f.ricavi), eurPdf(o.ricavi)],
      ['Costi reali sostenuti', eurPdf(o.costi), eurPdf(o.costi)],
      ['Reddito', eurPdf(f.redditoLordo), eurPdf(o.redditoProfessionale)],
      ['Contributi previdenziali', eurPdf(f.contributi.totale), eurPdf(o.contributi.totale)],
      ['Imponibile fiscale', eurPdf(f.imponibile), eurPdf(o.imponibile)],
      [`Imposta (${pct(f.aliquota)} sostitutiva / IRPEF netta)`, eurPdf(f.imposta), eurPdf(o.irpef)],
      ['Detrazione lavoro autonomo (art. 13 c. 5 TUIR)', '—', eurPdf(o.detrazioneAutonomi)],
      ['Addizionali regionale e comunale', '—', eurPdf(o.addizionali)],
      ['IRAP', '—', eurPdf(o.irap)],
      ['Totale imposte e contributi', eurPdf(f.totaleCarico), eurPdf(o.totaleCarico)],
      ['Netto disponibile', eurPdf(f.netto), eurPdf(o.netto)],
    ],
    colonneNumeriche: [1, 2], larghezze: { 0: 90 }, enfasiUltimaRiga: true,
  });
  titoloSezione(doc, 'Ipotesi di calcolo');
  tabella(doc, { body: ipotesi.righe, larghezze: { 0: 90 }, colonneNumeriche: [1] });
  nota(doc, 'Semplificazioni: nel regime ordinario l\'IVA è considerata neutra; ammortamenti e altre spese sono compresi nei costi inseriti; non sono modellate altre deduzioni oltre ai contributi né i limiti IRAP per i professionisti.');
  return chiudi(doc, studio);
}

export function pdfScadenzario(JsPDF, { voci, cliente, anno, studio, stime }) {
  const doc = nuovoDocumento(JsPDF, { studio, titolo: `Scadenzario versamenti ${anno}`, sottotitolo: `${cliente.nome}${cliente.partitaIva ? ` · P.IVA ${cliente.partitaIva}` : ''}`, righeMeta: [['Saldo e acconti', `anno d'imposta ${anno - 1} e ${anno}`]] });
  const f24 = (v) => (v.codiceTributo ? `Erario ${v.codiceTributo} / ${v.annoRiferimento}` : v.causaleInps ? `INPS ${v.causaleInps}` : v.tipo === 'inps' ? 'INPS' : '');
  const totale = voci.filter((v) => v.tipo !== 'adempimento' && !v.versata).reduce((s, v) => s + v.importo, 0);
  titoloSezione(doc, 'Versamenti');
  tabella(doc, {
    head: ['Scadenza', 'Versamento', 'F24', 'Importo', 'Stato'],
    body: voci.map((v) => [v.data ? dataIt(v.data) : '—', v.nota ? `${v.descrizione}\n${v.nota}` : v.descrizione, f24(v), v.tipo === 'adempimento' ? '' : eurPdf(v.importo), v.versata ? `Versato il ${dataIt(v.versata)}` : '']),
    foot: ['', 'Totale da versare', '', eurPdf(totale), ''],
    colonneNumeriche: [3], larghezze: { 0: 22, 2: 30, 3: 26, 4: 28 },
  });
  if (stime) {
    titoloSezione(doc, `Base di calcolo (anno ${anno - 1})`);
    tabella(doc, { body: [
      ['Imposta sostitutiva dovuta', eurPdf(stime.imposta)],
      ['Acconti imposta già versati', eurPdf(stime.accSost)],
      ['Contributi INPS dovuti', eurPdf(stime.contributi)],
      ['Acconti INPS già versati', eurPdf(stime.accInps)],
    ], larghezze: { 0: 90 }, colonneNumeriche: [1] });
  }
  nota(doc, 'Importi stimati sui dati registrati. Per artigiani e commercianti gli importi ufficiali sono nel Cassetto previdenziale INPS. I versamenti scaduti e non registrati come versati vanno regolarizzati con ravvedimento operoso.');
  return chiudi(doc, studio);
}

export function pdfRiepilogo(JsPDF, { riepilogo: r, cliente, anno, studio, mensili }) {
  const doc = nuovoDocumento(JsPDF, { studio, titolo: `Riepilogo ${anno}`, sottotitolo: `${cliente.nome}${cliente.partitaIva ? ` · P.IVA ${cliente.partitaIva}` : ''}`, righeMeta: [['Aliquota imposta sostitutiva', `${pct(r.aliquota.aliquota)}${r.aliquota.startup ? ' (startup)' : ''}`]] });
  titoloSezione(doc, 'Ricavi e soglia');
  tabella(doc, { body: [
    ['Ricavi incassati nell\'anno (criterio di cassa)', eurPdf(r.ricavi)],
    ['Fatturato da incassare', eurPdf(r.daIncassare)],
    ['Spese registrate', eurPdf(r.spese)],
    ['Utilizzo della soglia di 85.000 €', `${r.soglie.percentuale.toLocaleString('it-IT')}% — residuo ${eurPdf(r.soglie.residuoSoglia)}`],
  ], larghezze: { 0: 100 }, colonneNumeriche: [1] });
  titoloSezione(doc, 'Ricavi per codice ATECO');
  tabella(doc, {
    head: ['Attività', 'Coeff.', 'Ricavi', 'Reddito forfettario'],
    body: r.perAteco.map((v) => [`${v.codice} ${v.descrizione}`.trim(), v.coefficiente ? pct(v.coefficiente) : '—', eurPdf(v.importo), eurPdf(v.importo * v.coefficiente)]),
    colonneNumeriche: [1, 2, 3], larghezze: { 1: 18 },
  });
  if (mensili) {
    titoloSezione(doc, 'Incassi mensili');
    const mesi = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
    tabella(doc, { head: mesi, body: [mensili.map((v) => eurPdf(v).replace(',00', ''))], colonneNumeriche: mesi.map((_, i) => i), styles: undefined });
  }
  if (r.forfettario) {
    const f = r.forfettario;
    titoloSezione(doc, 'Stima imposta e contributi (regime forfettario)');
    tabella(doc, { body: [
      ['Reddito forfettario lordo', eurPdf(f.redditoLordo)],
      [`Contributi previdenziali dedotti (${r.deduzione.metodo === 'registrati' ? 'versati' : r.deduzione.metodo === 'stima' ? 'stima per cassa' : 'di competenza'})`, eurPdf(f.contributiDeducibili)],
      ['Reddito imponibile', eurPdf(f.imponibile)],
      [`Imposta sostitutiva al ${pct(f.aliquota)}`, eurPdf(f.imposta)],
      ['Contributi previdenziali di competenza', eurPdf(f.contributi.totale)],
      ['Totale imposta e contributi', eurPdf(f.totaleCarico)],
    ], larghezze: { 0: 110 }, colonneNumeriche: [1], enfasiUltimaRiga: true });
  }
  return chiudi(doc, studio);
}

export function pdfAgenda(JsPDF, { voci, anno, studio }) {
  const doc = nuovoDocumento(JsPDF, { studio, titolo: `Agenda versamenti ${anno}`, sottotitolo: 'Tutti i clienti dello studio', righeMeta: [['Versamenti', String(voci.filter((v) => v.importo > 0).length)]] });
  tabella(doc, {
    head: ['Scadenza', 'Cliente', 'Versamento', 'F24', 'Importo'],
    body: voci.map((v) => [dataIt(v.data), v.cliente.nome, v.descrizione, v.codiceTributo ? `Erario ${v.codiceTributo}` : v.causaleInps ? `INPS ${v.causaleInps}` : '', v.tipo === 'adempimento' ? '' : eurPdf(v.importo)]),
    colonneNumeriche: [4], larghezze: { 0: 22, 1: 34, 3: 24, 4: 26 },
  });
  return chiudi(doc, studio);
}

export function scaricaPdf(doc, nomeFile) { doc.save(nomeFile); }
