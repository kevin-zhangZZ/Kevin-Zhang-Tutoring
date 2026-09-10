# Worked-Solutions Authoring Guide

Reference for adding a new worked-solution question (MCQ or short-answer) to this tool.
Consolidates every formatting, structure, and content requirement established while
building out the 2015–2025 Specialist / Methods / Chemistry question bank. Read this
before writing a new question file — it exists so every question stays consistent
without re-deriving these rules from scratch each session.

## 1. Scope

Covers VCE Mathematical Methods, Specialist Mathematics, and Chemistry — Exam 1 + Exam 2
for the two maths subjects, one Exam for Chemistry. Currently populated: the 6 hardest
multiple-choice questions (by VCAA-reported % correct) per subject per year, 2015–2025
(198 questions), plus a small set of "bonus" VCAA-flagged questions with no single
correct answer (§8).

## 2. File & ID naming

- File: `src/tools/worked-solutions/questions/{Subject}Q{code}_{year}.tsx`
  e.g. `SpecialistQ5_2019.tsx`, `MethodsQ19_2020.tsx`, `ChemistryQ13_2022.tsx`.
- Component function name matches the file name exactly (`export default function
  ChemistryQ13_2022() { ... }`).
- `data.ts` id: `{subj}-q{code}-{year}` — lowercase, e.g. `spec-q5-2019`, `meth-q19-2020`,
  `chem-q13-2022`. `subj` abbreviations: `spec`, `meth`, `chem`.
- Diagram image assets (if any) live next to the question file, named
  `{subj}-{year}-mcq{code}-{short-description}.png`.

## 3. Question file template

Every question file follows this shape:

```tsx
// {Year} {Subject} — Exam {N}, MCQ {code}. VCAA examination report: {pct}% correct[ — the
// hardest MCQ on this paper, if applicable]. {One-line topic description}. Question text
// transcribed from the original paper[; diagram note if applicable]. Solution is original.

import Katex from '../../../components/Katex'  // maths subjects — Specialist/Methods
// or: import Chem from '../Chem'               // Chemistry
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: .., B: .., C: .., D: .., /* E omitted for a 4-option year */ },
  answer: 'X',                 // or ['X', 'Y'] / all letters — see §8
  noAnswer: n,                 // optional
  comment: (<>...</>),         // optional — VCAA's own report prose, verbatim where possible
}

const ROWS: WorkingRow[] = [
  { working: <>...</>, reason: <>...</> },
  // ...several steps, ending in a boxed/bolded final-answer row
]

export default function {Subject}Q{code}_{year}() {
  return (
    <MCQShell
      question={<>...</>}
      diagram={...}          // optional — see §7
      options={[
        { letter: 'A', content: <>...</> },
        { letter: 'B', content: <>...</>, isAnswer: true },
        ...
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
```

The top-of-file comment is **required** on every question file and always states, in this
order: year/subject/exam/code, the VCAA % correct (and whether it's the hardest on that
paper), a one-line topic, a note that the question text is transcribed from the original
paper, and that the solution itself is original work (not VCAA's).

## 4. Content & sourcing discipline

**Never trust a single source — every answer is independently re-derived by hand**, then
cross-checked against whatever official/semi-official source exists for that year. This
has caught real errors: twice in itute.com's third-party answer key (2020 Specialist
MCQ 7 and MCQ 11 — itute was simply wrong both times), and once in this project's own
transcription (2022 Specialist MCQ 10, a copy-paste of the wrong year's percentages).

**VCAA report formats, by era:**
- **2021 onward** (Specialist; Chemistry mostly): the report has an explicit "Correct
  answer" column in the %-table, format `Q# Letter %A %B %C %D %E`. The 5 (or 4) numbers
  are **always in fixed A-B-C-D-E order** regardless of which letter is correct — the
  %-correct value is whichever number's *position* matches the correct letter, not
  necessarily the first number. Misreading this is a real, repeatable mistake.
- **2019–2020** (Specialist), **every year 2019–2025** (Methods), **2019–2020**
  (Chemistry): the report only shows raw %A–E with grey/bold shading marking the correct
  answer — shading is lost in plain-text extraction, so the correct letter must come from
  another source:
  - **Methods/Specialist**: itute.com's solutions PDF —
    `itute.com/wp-content/uploads/{year}-VCAA-{Subject}-Exam-2-Solutions.pdf` (2025 files
    have a `-1.pdf.pdf` double-extension quirk). **Itute can itself be wrong** — always
    independently re-derive the answer and cross-check against the VCAA %-table's
    plausibility (the correct answer is usually the plurality choice or close to it; a
    huge mismatch between a claimed answer's low % and another option's high % is a red
    flag worth re-deriving from scratch).
  - **Chemistry**: **no itute-equivalent third-party key exists at all.** Every Chemistry
    answer is derived from first-principles chemistry reasoning and cross-checked against
    the report's own explanatory prose. When that's not enough to resolve shading,
    render the report's actual pages to PNG (`pdftoppm -r 150-200`) — the grey shading
    survives visually even though it's lost in text extraction — and read the correct
    cell directly off the rendered image.

**The 2024 exam paper (all three subjects) has no extractable text** (outlined/curved
fonts — `pdftotext`/`pdffonts` return nothing), even though that same year's *report* PDF
extracts fine. Work around this every time by rendering pages to PNG
(`pdftoppm -r 150-200`) and transcribing the question/options directly from the image via
the Read tool. Confirmed isolated to 2024 — 2025 and all earlier years extract normally.

**Format transitions:**
- Specialist and Methods switched Section A from 5-option (A–E) to **4-option (A–D)**
  starting in **2024**. `MCQExaminerStats.percentages` simply omits `E`; the report table
  renders "—" for the missing column automatically — no code changes needed.
- **Chemistry has always used the 4-option (A–D) format**, every year 2015–2025. No
  transition to handle.

**Exclusion category — Specialist only**: any question on a **Mechanics** topic (forces,
equilibrium, tension, pulleys, projectile/incline motion — including mechanics dressed up
inside a stats/probability question, e.g. a pulley-and-mass probability setup) is excluded
from the hardest-6 pool, confirmed via the actual question text, not just a report comment
mentioning "g" or masses. Methods and Chemistry have no equivalent exclusion category.

**Diagram-in-options edge case**: when the *options themselves* are diagrams (not just the
question stem) — e.g. 5 candidate slope-field graphs as options A–E — crop each option as
its own small PNG (via a `pdftoppm`-rendered page + a PIL crop script) and pass each as
that option's `content`, rather than one combined image.

**One graphical technique worth knowing**: for a question like "identify (g∘f)(x) from
sketches of f and g with no algebraic rule given," substitute concrete functions with
matching qualitative shape (this mirrors VCAA's own report method), compute the composite
algebraically, and match its shape/root-pattern to the correct option.

## 5. Formatting conventions

- **Title Case, not ALL CAPS**, for section labels in source JSX/text — any visual
  uppercasing (e.g. the flagged-question banner heading) is done via a CSS `uppercase`
  class on normally-cased text, never by typing the label in caps.
- `WorkingRow.working` is what a student would actually write on the exam page
  (equations, substitutions, the final boxed/bolded answer); `.reason` is the "why" —
  omit `.reason` for a row that's pure algebraic manipulation with nothing to explain.
- The final `ROWS` entry should be a bolded conclusion (`<b>...</b>`) whose `.reason`
  reads `Matches option **X**.` (or, for a flagged question, the flaw's resolution — §8).
- `EXAMINER.comment` should quote/paraphrase VCAA's own report prose closely — it's
  presented as VCAA's voice, not this site's analysis. Original reasoning belongs in
  `ROWS`, not `comment` (exception: §8's un-explained flagged questions).
- Use real Unicode characters directly in JSX text (e.g. `≡` for a triple bond, `⇌` for
  equilibrium, `°C`, `µg`) rather than escape sequences or HTML entities, except inside a
  `Chem`/`Katex` `eq` string where the component's own notation applies (§6, §7).

## 6. Chemistry notation — the `Chem` component

Import from `'../Chem'`, use for all chemical formulas/equations in Chemistry questions
instead of Katex. Pass plain text via the `eq` prop:

- A run of digits immediately after a letter or `)`/`]` becomes a **subscript**
  (stoichiometric subscript, e.g. the 2 in `H2O`).
- A digit run immediately followed by a bare `+`/`-` becomes a **superscript** (an ionic
  charge, e.g. `Cu2+`). A lone `+`/`-` with no digit (e.g. after `Cl` or `e`) is also a
  superscript.
- A leading coefficient digit (nothing letter-like before it, e.g. the 2 in `2H2O`) stays
  normal-sized text.
- Type `->` for a one-way arrow (renders as `→`) and `<=>` for equilibrium (renders as
  `⇌`); typing the real Unicode arrows directly also works.
- **No special handling for `#`** — it passes through literally. Use the real Unicode `≡`
  character directly for a triple bond, not `#`.
- Example: `<Chem eq="2SO3(g) <=> 2SO2(g) + O2(g)" />`, `<Chem eq="Cu2+(aq) + 2e- -> Cu(s)" />`.

## 7. Diagrams

Two patterns, chosen by how much the solution logic depends on the figure's exact shape:

- **Real cropped PNG** — when fidelity to the original figure genuinely matters (e.g. a
  direction-field/slope-field graph students need to read precise details from). Crop
  from a `pdftoppm`-rendered page via a small Python/PIL script, save as a `.png` asset
  next to the question file (see §2 naming), import it, and pass it as `diagram` (or as
  an option's `content` for the diagram-in-options case, §4).
- **Hand-drawn inline SVG** — when only the qualitative shape/behaviour matters for the
  solution (domain, monotonicity, concavity, intercepts), not pixel-fidelity to the
  original. Preserves exactly the features the reasoning depends on without overstating
  precision. Used for e.g. a schematic f/f′ matching panel or a piecewise-linear PDF
  triangle.

`MCQShell`'s `diagram` prop renders in a bordered card to the left of the options on wide
screens, stacking above them on narrow ones — no extra wrapper needed.

## 8. VCAA-flagged questions (no single correct answer)

A small number of VCAA questions each year turn out to have **no single defensible
correct answer** — after review, VCAA itself retroactively accepts two, or all four/five,
of the options as correct (occasionally it withdraws the question entirely instead — see
below). These are added as clearly-labelled **bonus** questions, separate from the
hardest-6 pool for that year (which always excludes them — there's no meaningful "%
correct" for a question with no correct answer).

**How to build one:**
- `MCQExaminerStats.answer` accepts `MCQLetter[]` — list every VCAA-accepted letter. The
  `ExaminerReport` table highlights all of them green automatically.
- Set `MCQExaminerStats.flawed` (and/or `MCQShell`'s own `flawed` prop — pass the same
  content to both) to a `ReactNode` explaining VCAA's own stated reason, when VCAA
  published one (e.g. "there was no correct or best answer to this question and all
  students were awarded the mark", or an explanation of why a specific option's wording
  was ambiguous). `MCQShell`'s `flawed` prop renders as an **unmissable amber banner above
  the question itself** — this is the one that matters, since a reader shouldn't have to
  switch to the Examiner's Report tab to learn the question has no real answer.
- Mark **every** VCAA-accepted option `isAnswer: true` in `options`.
- **When VCAA gives no reasoning** (some reports say only "as a result of psychometric
  analysis and review, all four options were accepted as correct" with nothing further):
  the `ROWS` content is this site's own reconstruction of why each option is
  independently questionable. **Explicitly label this as independent analysis, not VCAA's
  own words**, both in the `flawed` banner text and, ideally, in the file's top comment —
  never present speculative reasoning as if VCAA said it.
- In `data.ts`, set `QuestionMeta.flagged: true` and **omit `percentCorrect`** (an "X%
  accuracy" badge would be misleading when there's no single correct answer). The
  `flagged` badge (⚠️) renders automatically in both the sidebar list row and the detail
  panel's header badge row.
- **If VCAA fully withdrew the question** (not just accepted multiple answers, but pulled
  it from both the published paper and the report — verbatim text like "This question is
  no longer available" appearing in both) — **do not write a page for it.** There is no
  question content anywhere to build from; fabricating one would misrepresent what VCAA
  actually published. Tell the user directly instead of inventing a question. (Real
  example: 2021 Chemistry MCQ 5.)

## 9. Registering a new question

Every new question file needs two more edits, always together:

1. **`data.ts`** — add a `QuestionMeta` row in the appropriate year block:
   ```ts
   { id: 'chem-q13-2022', subject: 'chemistry', year: 2022, exam: 'Exam', code: 'MCQ 13',
     topic: 'Electrochemistry — which electrolyte produces a gas at the cathode',
     type: 'mc', hasDetail: true, percentCorrect: 29 },
   ```
   `topic` is `"{Category} — {one-line description}"` — the sidebar splits on the em-dash
   to show category/subtopic. Use real `percentCorrect` (omit entirely for a flagged
   question, §8).
2. **`details.ts`** — add the import and the registry entry (both required, in the two
   separate blocks that already exist in the file):
   ```ts
   import ChemistryQ13_2022 from './questions/ChemistryQ13_2022'
   // ...
   'chem-q13-2022': ChemistryQ13_2022,
   ```

Exam paper/report links (Paper / Report / Report (PDF)) are wired automatically from
`examSources.ts` by subject+year+exam — no per-question edit needed there, as long as the
source PDF/DOCX already exists under `public/exams/{subject}/`.

## 10. Verification

- **Type-check**: `npx tsc -p tsconfig.app.json --noEmit` (the bare `tsc --noEmit` checks
  0 files — always pass `-p tsconfig.app.json`). One pre-existing, unrelated error in
  `src/tools/monte-carlo/index.tsx` appears in every run and is not a regression.
- **Browser spot-check** before committing a batch: open the worked-solutions tool
  (`#/worked-solutions`), select the subject/year, open the new question(s), and confirm:
  the question/options render correctly, `Chem`/`Katex` formulas display properly, the
  Examiner's Report tab shows the right highlighted letter(s), and (for a flagged
  question) the amber warning banner appears above the question.

## 11. Commit / push / deploy workflow

- Stage with `git add -A -- ':!scratch' ':!vite.config.ts.timestamp-*'` (both are
  session/build junk, never committed).
- Commit message ends with `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.
- **Commit locally once a whole batch is done** (e.g. all 7 years × 6 questions for one
  subject, or one batch of bonus questions) — don't push or deploy without the user
  asking.
- To deploy: `git push origin master`, then `npm run deploy` (builds + `gh-pages -d
  dist`). Transient Dropbox-lock errors (`EPERM`, "unable to write new index file",
  "Device or resource busy" on `dist/`) are common on this machine — just retry the same
  command, or `rm -rf dist` first if the build step itself fails to clear it.
- After deploying, GitHub Pages' CDN can take up to ~30–60s to propagate — verify with a
  poll loop (`curl` the live URL until the new build's JS hash appears) rather than
  checking immediately, and check in a **fresh browser tab** (an already-open tab can keep
  serving a cached bundle even after the CDN has updated).
