"""From the 12 yearly VCAA grade-distribution index pages, list every study PDF: year, link text, URL.
Writes links.json: [{year, name, url, slug}]  (slug = file name without _gaYY.pdf and vce_ / lote_ prefixes)."""
import html, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
D = sys.argv[1]  # work folder (outside the repo): index pages, PDFs, JSON
LAST = int(sys.argv[2]) if len(sys.argv) > 2 else 2025
BASE = 'https://www.vcaa.vic.edu.au/administration/school-administration/performance-senior-secondary/'
# Each year's index page; VCAA's page names vary between years.
NAMES = ['{y}-grade-distributions-graded-assessment-vce', '{y}-grade-distributions-vce-graded-assessments']
FILES = {}
for y in range(2014, LAST + 1):
    path = os.path.join(D, f'idx_{y}.html')
    if not (os.path.exists(path) and '.pdf' in open(path, encoding='utf-8', errors='replace').read()):
        for n in NAMES:
            subprocess.run(['curl', '-sL', '-A', 'Mozilla/5.0', '-o', path, BASE + n.format(y=y)])
            if '.pdf' in open(path, encoding='utf-8', errors='replace').read():
                break
    FILES[y] = f'idx_{y}.html'

out = []
for y, f in FILES.items():
    t = open(os.path.join(D, f), encoding='utf-8', errors='replace').read()
    for m in re.finditer(r'<a[^>]+href="([^"]+\.pdf)"[^>]*>(.*?)</a>', t, re.S):
        href, text = m.group(1), html.unescape(re.sub(r'<[^>]+>', '', m.group(2))).strip()
        text = re.sub(r'\s+', ' ', text)
        if href.startswith('/'):
            href = 'https://www.vcaa.vic.edu.au' + href
        elif not href.startswith('http'):
            href = 'https://www.vcaa.vic.edu.au/' + href
        href = href.replace('vcaacorporateprod.prod.acquia-sites.com', 'www.vcaa.vic.edu.au')
        base = os.path.basename(href)
        slug = re.sub(r'_ga\d\d.*\.pdf$', '', base)
        slug = re.sub(r'^vce_(lote_)?', '', slug)
        out.append({'year': y, 'name': text, 'url': href, 'slug': slug, 'file': f'{slug}_{y}.pdf'})
json.dump(out, open(os.path.join(D, 'links.json'), 'w'), indent=1)
slugs = sorted({o['slug'] for o in out})
print(len(out), 'links,', len(slugs), 'slugs')
for s in slugs:
    ys = sorted(o['year'] for o in out if o['slug'] == s)
    names = sorted({o['name'] for o in out if o['slug'] == s})
    print(f'{s:55s} {ys[0]}-{ys[-1]} n={len(ys):2d}  {names[0][:50]}')
