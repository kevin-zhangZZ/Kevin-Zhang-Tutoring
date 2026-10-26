"""Merge the research batches (raw exam totals and weights from VCAA's examination specifications,
one JSON list per batch) into exam-totals.json, adding each subject's page id, short label, group
and search aliases. Run once after research; exam-totals.json is then the maintained source.

Usage: python -I scripts/study-score/merge_research.py <research dir>
"""
import glob, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
rows = []
for f in sorted(glob.glob(os.path.join(sys.argv[1], 'batch*.json'))):
    rows += json.load(open(f, encoding='utf-8'))

# Studies VCAA no longer examines (no 2025 results, replaced or withdrawn).
DROP = {'classical_greek', 'australian_politics', 'global_politics'}

GROUP = {
    'Mathematics': 'foundation_mathematics algorithmics_hess',
    'Sciences': 'biology physics psychology environmental_science agricultural_and_horticultural_studies',
    'English': 'english_as_an_additional_language english_language literature',
    'Humanities': 'australian_history history_revolutions ancient_history classical_studies geography legal_studies philosophy politics religion_and_society sociology texts_and_traditions',
    'Business and Economics': 'business_management industry_and_enterprise',
    'Health and PE': 'health_and_human_development physical_education outdoor_and_environmental_studies',
    'Technologies': 'systems_engineering applied_computing_data_analytics applied_computing_software_development food_studies product_design_and_technologies',
    'The Arts': 'media visual_communication_design art_creative_practice art_making_and_exhibiting dance drama theatre_studies music_composition music_contemporary_performance music_inquiry music_repertoire_performance',
    'Extended Investigation': 'extended_investigation',
}
group_of = {s: g for g, ss in GROUP.items() for s in ss.split()}

# Short labels and extra search words where the name alone won't do.
LABEL = {
    'english_as_an_additional_language': ('EAL', 'eal esl'),
    'english_language': ('English Language', 'el englang'),
    'history_revolutions': ('Revolutions', 'history revs'),
    'australian_history': ('Australian History', 'history aus'),
    'ancient_history': ('Ancient History', 'history'),
    'health_and_human_development': ('HHD', 'hhd health'),
    'physical_education': ('PE', 'pe phys ed'),
    'outdoor_and_environmental_studies': ('Outdoor Ed', 'oes outdoor'),
    'visual_communication_design': ('VCD', 'vcd visual comm design'),
    'business_management': ('Business Management', 'bm busman'),
    'legal_studies': ('Legal Studies', 'legal law'),
    'algorithmics_hess': ('Algorithmics', 'algo hess computing'),
    'applied_computing_data_analytics': ('Data Analytics', 'computing it'),
    'applied_computing_software_development': ('Software Development', 'computing it sd coding'),
    'agricultural_and_horticultural_studies': ('Agriculture', 'agri horticulture'),
    'product_design_and_technologies': ('Product Design', 'pdt design tech'),
    'systems_engineering': ('Systems Engineering', 'engineering'),
    'foundation_mathematics': ('Foundation Maths', 'maths math'),
    'environmental_science': ('Environmental Science', 'enviro science'),
    'psychology': ('Psychology', 'psych science'),
    'biology': ('Biology', 'bio science'),
    'physics': ('Physics', 'phys science'),
    'texts_and_traditions': ('Texts and Traditions', 'religion'),
    'religion_and_society': ('Religion and Society', 'rs'),
    'extended_investigation': ('Extended Investigation', 'ei'),
    'chinese_language,_culture_and_society': ('Chinese CLCS', 'clcs chinese'),
    'chinese_second_language_advanced': ('Chinese SLA', 'csla chinese'),
    'chinese_second_language': ('Chinese SL', 'csl chinese'),
    'chinese_first_language': ('Chinese FL', 'cfl chinese'),
    'japanese_first_language': ('Japanese FL', 'jfl japanese'),
    'korean_first_language': ('Korean FL', 'kfl korean'),
    'korean_second_language': ('Korean SL', 'ksl korean'),
    'vietnamese_first_language': ('Vietnamese FL', 'vietnamese'),
    'vietnamese_second_language': ('Vietnamese SL', 'vietnamese'),
    'indonesian_second_language': ('Indonesian', 'indo'),
    'music_contemporary_performance': ('Music Contemporary', 'music'),
    'music_repertoire_performance': ('Music Repertoire', 'music'),
    'music_composition': ('Music Composition', 'music'),
    'music_inquiry': ('Music Inquiry', 'music'),
    'art_creative_practice': ('Art Creative Practice', 'art'),
    'art_making_and_exhibiting': ('Art Making and Exhibiting', 'art studio arts'),
}


def page_id(study):
    s = study.replace(',', '').replace('_vce_vet', '').replace('vceVET', '')
    s = re.sub(r'cookeryvce_vet$', 'cookery', s)
    s = s.replace('vet_', 'vet-')
    return s.replace('_', '-')


def clean_label(l):
    l = re.sub(r'\s*\(.*\)$', '', l).strip()
    l = re.sub(r'^Written Exam(ination)?$', 'Written', l)
    return l


out = {'_about': 'Raw exam totals, weights (% of study score) and study design years from VCAA examination specifications, papers and reports (sources per input). Researched 26 Oct 2026. build.py reads this with core-subjects.json.'}
for r in rows:
    s = r['study']
    if s in DROP:
        continue
    vet = s.startswith('vet_')
    name = re.sub(r'\s*\(PDF.*$', '', r['name']).strip()
    # VCAA page titles: "VCE Geography", "VCE History: Revolutions".
    name = {'VCE History: Revolutions': 'History Revolutions'}.get(name, name)
    name = re.sub(r'^VCE (History: )?', '', name)
    if vet and 'VCE VET' not in name:
        name = re.sub(r'\s*\((VCE )?VET\)', '', name) + ' (VCE VET)'
    group = 'VCE VET' if vet else group_of.get(s, 'Languages')
    label, aliases = LABEL.get(s, (re.sub(r'\s*\(VCE VET\)', '', name), ''))
    label = re.sub(r'^VCE ', '', label)
    if vet:
        label = 'VET ' + label  # "VET Dance", apart from Dance
    if vet:
        aliases = (aliases + ' vet').strip()
    inputs = []
    for i in r['inputs']:
        lab = clean_label(i['label'])
        e = {'label': lab, 'ga': i['ga'], 'raw_max': i['raw_max'], 'source': i.get('source')}
        if i.get('percent') is not None:
            e['percent'] = i['percent']
        if i['raw_max'] is None:
            # No published raw total: entered as a percentage.
            e['raw_max'] = 100
            e['label'] = f'{lab} (%)'
            e['as_percent'] = True
        old = [o for o in (r.get('older') or []) if clean_label(o.get('label') or lab) == lab or len(r['inputs']) == 1]
        # VCE VET Dance: out of 100 up to 2023 except 70 in 2020 alone. Eras are read oldest first
        # (first era a year falls in), so the 2020 exception is its own era between two at 100.
        if s == 'vet_dance_vce_vet':
            old = [{'up_to': 2019, 'raw_max': 100}, {'up_to': 2020, 'raw_max': 70}, {'up_to': 2023, 'raw_max': 100}]
        if old:
            e['older'] = [{'up_to': o['up_to'], 'raw_max': o['raw_max']} for o in old if o.get('raw_max')]
        inputs.append(e)
    labels = [i['label'] for i in inputs]
    for k, e in enumerate(inputs):
        e['short'] = 'Exam' if e['label'] == 'Exam' else (e['label'].split()[0] if len({l.split()[0] for l in labels}) == len(labels) else e['label'])
    out[s] = {
        'id': page_id(s), 'name': name, 'label': label, 'group': group, 'aliases': aliases,
        'design_from': r.get('current_design_from'), 'confidence': r.get('confidence'), 'notes': r.get('notes', ''),
        'inputs': inputs,
    }
json.dump(out, open(os.path.join(HERE, 'exam-totals.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
print(len(out) - 1, 'studies')
