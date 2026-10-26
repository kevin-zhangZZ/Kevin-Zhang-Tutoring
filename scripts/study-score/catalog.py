"""Summarise parsed_all.json per study: exam GAs (not coursework / school-assessed), their titles
and GA max per year, and cohort sizes. Writes catalog.json and prints a table."""
import json, os, re, sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
D = sys.argv[1]  # work folder (outside the repo): index pages, PDFs, JSON
P = json.load(open(os.path.join(D, 'parsed_all.json')))
NOT_EXAM = re.compile(r'COURSEWORK|SCHOOL-ASSESSED|SCHOOL ASSESSED|SAT\b', re.I)

by = defaultdict(dict)  # study -> year -> entry
for e in P.values():
    y = e['year']
    prev = by[e['study']].get(y)
    # Two PDFs for one study-year (a reissue): keep the one with more tables.
    if prev is None or len(e['gas']) > len(prev['gas']):
        by[e['study']][y] = e

cat = {}
for s, years in sorted(by.items()):
    rows = {}
    for y, e in sorted(years.items()):
        exams = {int(g): d for g, d in e['gas'].items() if not NOT_EXAM.search(d['title'])}
        rows[y] = {'name': e['name'], 'url': e['url'], 'exams': {g: {'title': d['title'], 'max': d['max'], 'total': d['total'], 'bands': d['bands']} for g, d in exams.items()},
                   'all': {int(g): (d['title'], d['max']) for g, d in e['gas'].items()}}
    cat[s] = rows
json.dump(cat, open(os.path.join(D, 'catalog.json'), 'w'), indent=1)

for s, rows in cat.items():
    ys = sorted(rows)
    last = rows[ys[-1]]
    shapes = defaultdict(list)
    for y in ys:
        shapes[' + '.join(f"GA{g} {d['title']}/{d['max']}" for g, d in sorted(rows[y]['exams'].items()))].append(y)
    cohort = [rows[y]['exams'][max(rows[y]['exams'])]['total'] if rows[y]['exams'] else 0 for y in ys]
    print(f"{s}  [{last['name'][:45]}]  {ys[0]}-{ys[-1]} cohort {min(cohort)}-{max(cohort)}")
    for k, v in shapes.items():
        print(f"    {v[0]}-{v[-1]} ({len(v)}): {k or 'NO EXAM'}")
