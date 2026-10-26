"""Download every grade-distribution PDF for studies with results in 2023-2025 (and their renamed
predecessors) into pdf/. Skips files already there. Prints failures."""
import json, os, subprocess, urllib.parse, sys

HERE = os.path.dirname(os.path.abspath(__file__))
D = sys.argv[1]  # work folder (outside the repo): index pages, PDFs, JSON
links = json.load(open(os.path.join(D, 'links.json')))
os.makedirs(os.path.join(D, 'pdf'), exist_ok=True)

recent = {l['slug'] for l in links if l['year'] >= 2023}
# Renamed studies: older slug -> current slug (same study, new name or file name).
RENAMED = json.load(open(os.path.join(HERE, 'renamed.json')))
want = [l for l in links if l['slug'] in recent or l['slug'] in RENAMED]
print(len(want), 'files')
seen = set()
bad = []
for l in want:
    # Some years list two PDFs under one slug (e.g. a re-issue); keep each by its own file name.
    name = os.path.basename(urllib.parse.unquote(l['url']))
    key = f"{l['year']}_{name}"
    path = os.path.join(D, 'pdf', key)
    l['local'] = key
    if key in seen:
        continue
    seen.add(key)
    if os.path.exists(path) and open(path, 'rb').read(4) == b'%PDF':
        continue
    subprocess.run(['curl', '-sL', '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '-o', path, l['url']])
    if not (os.path.exists(path) and open(path, 'rb').read(4) == b'%PDF'):
        bad.append(l)
json.dump(want, open(os.path.join(D, 'want.json'), 'w'), indent=1)
print('failed', len(bad))
for b in bad:
    print(b['year'], b['url'])
