"""Parse every graded assessment (GA) in every downloaded grade-distribution PDF.

Titles come from `pdftotext -layout` (the lines after 'Graded Assessment N').
Numbers: 2017+ from the text layout ('Total n' + 'Score Ranges' rows); 2014-2016 (older layout)
by word position with pdfplumber ('All n', 'Cumul n', 'Score Ranges' rows).
Every table is checked: counts sum to the total (where printed), the cumulative row (old layout),
and score ranges run 0..Max without gaps. Writes parsed_all.json and prints failures.
"""
import json, os, re, subprocess, sys
import pdfplumber

HERE = os.path.dirname(os.path.abspath(__file__))
D = sys.argv[1]  # work folder (outside the repo): index pages, PDFs, JSON
want = json.load(open(os.path.join(D, 'want.json')))
RENAMED = json.load(open(os.path.join(HERE, 'renamed.json')))
GRADES = ['UG', 'E', 'E+', 'D', 'D+', 'C', 'C+', 'B', 'B+', 'A', 'A+']


def text_of(pdf):
    txt = pdf[:-4] + '.txt'
    if not os.path.exists(txt):
        subprocess.run(['pdftotext', '-layout', pdf, txt], check=False)
    return open(txt, encoding='utf-8', errors='replace').read()


def titles(t):
    parts = re.split(r'Graded Assessment (\d+)', t)
    out = {}
    for i in range(1, len(parts), 2):
        lines = [l.strip() for l in parts[i + 1].split('\n') if l.strip()]
        tl = []
        for l in lines[:4]:
            if re.match(r'^\d{4}$', l) or l.startswith('Table') or l.startswith('Grade'):
                break
            tl.append(re.sub(r'\s+', ' ', l))
        out.setdefault(int(parts[i]), ' '.join(tl))
    return out


def check_ranges(ranges, mx):
    return len(ranges) == 11 and ranges[0][0] == 0 and ranges[-1][1] == mx and all(ranges[k + 1][0] == ranges[k][1] + 1 for k in range(10))


def parse_new(t, ga):
    parts = re.split(r'Graded Assessment (\d+)', t)
    i = parts.index(str(ga))
    b = parts[i + 1]
    tm = re.search(r'^\s*Total\s+n\s*(\d.*)$', b, re.M)
    sm = re.search(r'^\s*Score Ranges\s+(.*)$', b, re.M)
    mm = re.search(r'Max (\d+)', b)
    if not (tm and sm and mm):
        raise ValueError('rows missing')
    counts = [int(x.replace(',', '')) for x in re.findall(r'\d[\d,]*', tm.group(1))]
    ranges = [tuple(map(int, r)) for r in re.findall(r'(\d+)-(\d+)', sm.group(1))]
    mx = int(mm.group(1))
    n = counts[:11]
    # Two 2024 tables too scrambled for the fallback below, read by hand from the PDFs:
    # (A+ count = male + female A+, A+ range, NR, total); the check below still applies.
    HAND = {('spanish', 2024): (19, (312, 400), 1, 124), ('persian', 2024): (12, (374, 400), 1, 93)}
    key = next((k for k in HAND if k[0] in CURRENT[0] and k[1] == CURRENT[1]), None)
    if key and len(n) == 10:
        aplus, rng, nr, total = HAND[key]
        if sum(n) + aplus + nr != total:
            raise ValueError('hand A+ sum')
        n, ranges = n + [aplus], ranges + [rng]
    if len(n) == 10 and len(ranges) == 10:
        # The A+ column floated up out of the table: its count, NR and the total are the last
        # three-number line before the 'lo-hi N/A Max' line, which holds the A+ range.
        lines = b.split('\n')
        k = next(j for j, l in enumerate(lines) if re.search(r'\d+-\d+\s+N/A\s+Max', l))
        top = re.search(r'(\d+)-(\d+)\s+N/A\s+Max', lines[k])
        trip = [l for l in lines[:k] if re.fullmatch(r'\s*\d[\d,]*\s+\d[\d,]*\s+\d[\d,]*\s*', l)]
        aplus, nr, total = [int(x.replace(',', '')) for x in trip[-1].split()]
        if sum(n) + aplus + nr != total:
            raise ValueError(f'floated A+ sum {sum(n)}+{aplus}+{nr} != {total}')
        n = n + [aplus]
        ranges = ranges + [(int(top.group(1)), int(top.group(2)))]
    if len(n) < 11:
        raise ValueError(f'counts {counts}')
    if len(counts) >= 13 and sum(n) + counts[11] != counts[12]:
        raise ValueError(f'sum {sum(n)}+{counts[11]} != {counts[12]}')
    if not check_ranges(ranges, mx):
        raise ValueError(f'ranges {ranges} max {mx}')
    return {'max': mx, 'bands': [[lo, hi, k] for (lo, hi), k in zip(ranges, n)], 'total': sum(n)}


def num(s):
    return int(s.replace(',', ''))


def rows_at(words, y, tol=3):
    return sorted([w for w in words if abs(w['top'] - y) <= tol], key=lambda w: w['x0'])


def parse_old_page(page):
    words = page.extract_words()
    text = ' '.join(w['text'] for w in words)
    m = re.search(r'Graded Assessment (\d+)', text)
    if not m:
        return None
    ga = int(m.group(1))
    ug = next(w for w in words if w['text'] == 'UG')
    head = [w for w in rows_at(words, ug['top']) if w['text'] in GRADES + ['Total']]
    cols = {w['text']: (w['x0'] + w['x1']) / 2 for w in head}
    if [w['text'] for w in head] != GRADES + ['Total']:
        raise ValueError('header ' + str([w['text'] for w in head]))

    def row_after(label):
        for w in words:
            if w['text'] == label[0]:
                line = rows_at(words, w['top'])
                if [x['text'] for x in line][: len(label)] == label:
                    return line[len(label):]
        raise ValueError('no row ' + ' '.join(label))

    def by_column(line):
        out = {}
        for w in line:
            cx = (w['x0'] + w['x1']) / 2
            out[min(cols, key=lambda k: abs(cols[k] - cx))] = w['text']
        return out

    all_n = by_column(row_after(['All', 'n']))
    cumul = by_column(row_after(['Cumul', 'n']))
    ranges = by_column(row_after(['Score', 'Ranges']))
    mx = None
    for w in words:
        if w['text'] == 'Max':
            after = [x for x in rows_at(words, w['top']) if x['x0'] > w['x0']]
            if after:
                mx = num(after[0]['text'])
    n = [num(all_n[g]) for g in GRADES]
    total = num(all_n['Total'])
    bands = [[int(ranges[g].split('-')[0]), int(ranges[g].split('-')[1]), k] for g, k in zip(GRADES, n)]
    if sum(n) != total:
        raise ValueError('sum')
    if not all(num(cumul[g]) == sum(n[: i + 1]) for i, g in enumerate(GRADES)):
        raise ValueError('cumul')
    if not check_ranges([(b[0], b[1]) for b in bands], mx):
        raise ValueError('ranges')
    return ga, {'max': mx, 'bands': bands, 'total': total}


CURRENT = ['', 0]
res = {}
fails = []
done = set()
for l in want:
    key = l['local']
    if key in done:
        continue
    done.add(key)
    pdf = os.path.join(D, 'pdf', key)
    if not os.path.exists(pdf):
        fails.append((key, 'missing'))
        continue
    study = RENAMED.get(l['slug'], l['slug'])
    CURRENT[0], CURRENT[1] = key, l['year']
    t = text_of(pdf)
    tt = titles(t)
    entry = {'study': study, 'slug': l['slug'], 'name': l['name'], 'year': l['year'], 'url': l['url'], 'gas': {}}
    if l['year'] <= 2016:
        try:
            with pdfplumber.open(pdf) as p:
                for page in p.pages:
                    try:
                        r = parse_old_page(page)
                    except Exception as e:  # noqa
                        m = re.search(r'Graded Assessment (\d+)', page.extract_text() or '')
                        fails.append((key, f'GA{m.group(1) if m else "?"} {e}'))
                        continue
                    if r:
                        ga, d = r
                        d['title'] = tt.get(ga, '')
                        entry['gas'][ga] = d
        except Exception as e:  # noqa
            fails.append((key, f'open {e}'))
    else:
        for ga, title in tt.items():
            try:
                d = parse_new(t, ga)
                d['title'] = title
                entry['gas'][ga] = d
            except Exception as e:  # noqa
                fails.append((key, f'GA{ga} {title} {e}'))
    res[key] = entry
json.dump(res, open(os.path.join(D, 'parsed_all.json'), 'w'), indent=1)
print(len(res), 'files parsed;', sum(len(e['gas']) for e in res.values()), 'GA tables;', len(fails), 'failures')
for f in fails:
    print('FAIL', *f)
