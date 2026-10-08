"""Genera js/fiscal/data/ateco2025-titoli.js (codice a 6 cifre -> titolo) dalla struttura ISTAT ATECO 2025.

Uso: python3 tools/genera-ateco-titoli.py StrutturaATECO-2025-IT-EN-DE.xlsx
Sorgente: https://www.istat.it/classificazione/ateco-2025/
"""
import json
import sys

import openpyxl

ws = openpyxl.load_workbook(sys.argv[1], read_only=True)['ATECO 2025 Struttura']
titoli = {}
for r in list(ws.iter_rows(values_only=True))[1:]:
    codice, titolo = r[1], r[2]
    if codice and titolo and len(codice) == 8 and codice[2] == '.' and codice[5] == '.':
        titoli[codice] = titolo
corpo = ("// File generato da tools/genera-ateco-titoli.py dalla struttura ISTAT ATECO 2025.\n"
         "export default " + json.dumps(titoli, ensure_ascii=False, separators=(',', ':')) + ";\n")
open('js/fiscal/data/ateco2025-titoli.js', 'w', encoding='utf-8').write(corpo)
print(len(titoli), 'codici')
