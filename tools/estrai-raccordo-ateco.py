"""Estrae le coppie (ATECO 2025, ATECO 2022) dalla tavola di raccordo ISTAT in formato JSON.

Uso: python3 tools/estrai-raccordo-ateco.py raccordo.xlsx coppie.json
File sorgente: https://www.istat.it/classificazione/ateco-2025/ (Tavola di raccordo bidirezionale ATECO 2025-2022)
"""
import json
import sys

import openpyxl

xlsx, out = sys.argv[1], sys.argv[2]
ws = openpyxl.load_workbook(xlsx, read_only=True)['ATECO 2025 vs ATECO 2022']
coppie = set()
for r in list(ws.iter_rows(values_only=True))[1:]:
    c25, c22 = r[1], r[5]
    if c25 and c22 and c25[0].isdigit() and c22[0].isdigit():
        coppie.add((c25, c22))
json.dump(sorted(coppie), open(out, 'w'))
print(len(coppie), 'coppie')
