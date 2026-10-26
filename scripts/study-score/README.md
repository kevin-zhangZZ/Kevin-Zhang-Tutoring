# Study Score Projection data

`src/tools/study-score/subjects.gen.ts` is generated here from VCAA's grade-distribution PDFs. Don't
edit it by hand.

## Rebuild (e.g. when VCAA publishes a new year)

Use a work folder outside the repo (it fills with ~1,200 PDFs). Needs Python with `pdfplumber`, and
`pdftotext` and `curl` on the path.

```bash
W=/path/to/work/folder
python -I scripts/study-score/index_links.py "$W" 2026   # each year's index page -> links.json
python -I scripts/study-score/download.py "$W"           # PDFs for studies with recent results
python -I scripts/study-score/parse_all.py "$W"          # every graded assessment, checked -> parsed_all.json
python -I scripts/study-score/catalog.py "$W"            # per study: exams, GA scales, cohorts -> catalog.json
python -I scripts/study-score/build.py "$W/catalog.json" # -> src/tools/study-score/subjects.gen.ts
```

`parse_all.py` prints any table it couldn't read or that failed a check (counts must add up to the
total, ranges must run 0 to the maximum). Coursework failures don't matter; an exam failure needs a
look (see the hand-read tables in `parse_new`). `build.py` logs every year it leaves out and why.

## The hand-kept inputs

- `core-subjects.json`: the first eight subjects (Methods, Specialist, General Maths, Chemistry,
  English, Accounting, Economics, Japanese).
- `exam-totals.json`: every other study: what each exam is out of, its percentage of the study score,
  older papers' totals, the current study design's first year, with a source for each total. It was
  researched from VCAA's examination specifications in October 2026 (`merge_research.py` built it
  from the research notes). When a study design changes, update its entry here.
- `renamed.json`: VCAA file names that are the same study under an earlier name.

## Rules build.py applies

- A year counts only if at least 10 students sat the exam and the grades aren't all in one band.
- A study is listed with at least 3 such years, or with 1 when its newest year had 100+ students
  (a new study, like Politics in 2025).
- Exams combine by their stated percentage of the study score; without percentages (the first eight
  subjects), by VCAA's GA scales.
