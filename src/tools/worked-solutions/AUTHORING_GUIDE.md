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

**Exclusion category — Specialist**: any question on a **Mechanics** (force-analysis) topic
— forces, equilibrium, tension, pulleys, friction, connected particles, projectile/incline
motion, Newton's second law (F = ma) — is excluded from the hardest-6 pool, confirmed via
the actual question text, not just a report comment mentioning "g", masses, or the word
"force" in passing (a question can say "a variable force acts on a particle..." as flavour
text for what is actually a pure calculus/kinematics question — e.g. finding acceleration
from `a = v dv/dx` given `v` as a function of position — with no force analysis anywhere in
the actual mathematics; that's still fully on the current study design and should be kept).
The real test is whether *solving* the question requires force analysis, not whether the
word "force" appears anywhere in it. Confirmed clean as of this exclusion pass — grepped
every Specialist file for the obvious mechanics vocabulary (force, tension, pulley,
equilibrium, friction, Newton, incline, projectile, weight, resultant, kg, 9.8, gravity)
and checked every hit by hand; none were genuine mechanics.

**Exclusion category — Methods**: any question whose content is a **matrix** (matrix
notation for a transformation, a transition matrix, etc.) is excluded — from the hardest-6
pool, from a full-exam buildout, anywhere — matrices aren't part of the current VCE
Mathematical Methods study design at all (transformations are examined via mapping
notation, not matrix algebra). As with Mechanics above, the test is whether the question's
own mathematics uses a matrix, not whether the word "matrix" appears anywhere in it — e.g.
an examiner-report comment describing a transition-matrix approach some students
*incorrectly* used as an alternative to a tree diagram doesn't make the question itself a
matrix question if the actual worked solution never needs one. Applied twice so far: Exam 1
2019 Q2(c) (a full-exam buildout) and Exam 2 2019 MCQ 9 (a full-exam buildout of the
remaining Section A questions). Chemistry has no equivalent exclusion category.

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

**Write for a student reading alone.** The audience is a Year 12 student working through
the paper by themselves with no teacher to ask, so a solution is only finished when
someone who got the question *wrong* could follow it unaided. In practice:

- Every non-obvious step gets a `.reason` saying *why* that step, not just what it is.
  "Product rule" is a label; "f is a product of two functions of x, so use (uv)′ = u′v +
  uv′" is an explanation.
- Don't leave `by CAS` standing alone where the algebra is doable — show the
  antiderivative, the factorisation, the substitution. Reserve "by CAS" for integrals and
  equations that genuinely have no by-hand route (and say so, e.g. `x²e^(−x²)` has no
  elementary antiderivative), which is a fair description of a real Exam 2.
- Use the **`Background`** component (exported from `QuestionParts`) for the theory a part
  quietly assumes — what "average rate of change" means, how a matrix transformation acts
  on a graph, why an inverse's tangent is the reflected one. It renders as a sky-tinted
  box above that part's `WorkingTable`, inside the `PartCard`. Reach for it wherever the
  examination report shows students misreading the question itself rather than fumbling
  the algebra (VCAA's 2019 Exam 2 Question 2b — 3% correct — is the archetype).
- Name the distractors. In an MCQ's final `.reason`, say which wrong option corresponds to
  which specific slip; the report's percentages tell you which mistake students actually
  made, so address that one.

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

**If the original VCAA question includes a diagram — a graph, direction field, figure,
geometric drawing, anything — crop it directly from the exam PDF and use that image.
Never hand-redraw it as an inline SVG (or recreate it any other way), no matter how
simple the figure looks or how well an SVG could plausibly reproduce it.**

This is a hard rule, not a judgement call to make per-question — a redrawn "schematic"
version is a second-hand rendering of what VCAA actually printed, and it has repeatedly
introduced real inaccuracies (subtly wrong curve shape, wrong proportions, a missed
feature of the original) that a direct crop can't. It also misrepresents the page's own
"question text transcribed from the original paper" claim if the figure isn't actually
from the original paper.

**How to crop one:**
1. Render the relevant exam-paper page(s) to PNG: `pdftoppm -r 150-200 -f N -l N
   {paper}.pdf out` (bump to `-r 200` or higher for a small or detail-heavy figure).
2. Crop just the diagram out of the rendered page — a small Python/PIL script cropping to
   the figure's pixel bounding box works well; re-render at higher DPI first if the crop
   looks soft.
3. Save as a `.png` asset next to the question file (naming — see §2), import it, and
   pass it as `diagram` (renders in a bordered card beside the options — no extra wrapper
   needed) or as an option's own `content` for the diagram-in-options case below.
4. The file's top comment should say the diagram is "cropped from the original paper" (or
   similar) — not "transcribed" or "redrawn", which implies it was recreated by hand.

**Diagram-in-options**: when the *options themselves* are diagrams (not just the question
stem) — e.g. 5 candidate slope-field graphs as options A–E — crop each option as its own
small PNG from the same rendered page and pass each as that option's `content`, rather
than one combined image.

**Annotating a cropped diagram** (e.g. tracing a solution curve through a direction
field, marking a point) is fine — but the annotation goes in an `<img>`/SVG *overlay* on
top of the real cropped image, or as a separate call-out next to it, never by redrawing
the underlying figure itself from scratch, even if the redrawing is computed exactly
rather than eyeballed (a real past mistake: SpecialistQ10_2016's worked solution redrew
an entire direction field with exactly-computed slope segments, just to overlay a solved
curve on top — still a violation, since the base figure itself was redrawn).

To build the overlay: `<div className="relative">` containing the real `<img>` plus a
sibling `<svg viewBox="0 0 {naturalWidth} {naturalHeight}" className="absolute inset-0
w-full h-full">` holding only the annotation (curve/points/labels), nothing that
reproduces the base image's own content. **Measure the pixel calibration from the image
itself — don't eyeball it.** A quick Python/PIL script does this reliably: threshold to
dark pixels (`arr < 128`), sum per row and per column, and keep the rows/columns whose
count exceeds ~50% of the image's width/height — those are the full-span gridlines.
Cluster consecutive hits and average each cluster to get one pixel coordinate per
gridline; the middle entry is the origin, and the spacing between entries is the
per-gridline-interval scale. Use those measured values (`ox`, `oy`, `scaleX`, `scaleY`)
in the overlay's coordinate math, not estimated ones. After building it, verify the
overlay lines up by reading the rendered SVG element's own attributes back out (e.g. via
the browser devtools/JS console) and checking they equal what the calibration math
predicts, rather than trusting a screenshot — screenshots of an overlay can look
"close enough" while actually being pixels off.

**An original sketch — plotted with matplotlib, not hand-drawn — is only appropriate when
there is no original diagram to crop at all**: a "sketch the graph of f" part where VCAA's
own axes are blank (nothing pre-drawn on them), so the finished curve is this site's own
answer, not a redrawing of anything VCAA printed. If VCAA printed a figure for the
question, crop it — full stop. This is a different case from the overlay above (annotating
a *real* cropped image) — here there is no real image at all, only a blank grid, so the
whole curve is original content.

**A third category — an explanatory figure the question never asked for.** Separate from
both the crop (VCAA's own figure) and the answer-sketch (VCAA's blank axes) is a graph
drawn purely to *teach* the solution: the shape of a function VCAA never printed, a
gradient function, an inverse, a transformed curve, a shaded region showing which area an
integral measures. These are legitimate and often the single most valuable thing on the
page — the 2019 Exam 2 report literally says errors in its Question 1 "could have been
avoided if a graph of the function had been sketched", so that solution now shows one.
Build them with matplotlib in the same house style, and say in the file's top comment that
the figure is this site's own explanatory graph of something VCAA never printed. Two
limits: it must be a *different* function or view from any figure VCAA did print (never a
re-plot of the question's own given graph — crop that instead), and the question's real
figure still appears, cropped, wherever the question itself relies on it.

**Build it with matplotlib (real graphing software), not hand-coded SVG.** Inline SVG
built by hand (waypoints, or even a `functionToPath`-style exact sampling) is harder to
lay out correctly and has produced real bugs (overflowing rows, mislabelled points) that
a proper plotting library avoids by construction. Generate a transparent-background PNG
and embed it exactly like a cropped diagram — same `bg-white border border-gray-200
dark:border-gray-800 rounded-xl p-3 w-fit` card, saved next to the question file (naming —
see §2, e.g. `meth-2019exam1-q5-truncus-sketch.png`). Python is at
`C:/Users/Kevin/AppData/Local/Programs/Python/Python310/python`.

**House style for these plots** (all of the below, every time):
- **Axes**: both the *x*- and *y*-axis drawn fully black, identical line thickness, with an
  arrowhead only at the positive end of each (`matplotlib.axes.Axes.annotate` with
  `arrowstyle="-|>"` from the negative extent to the positive extent — a plain
  `axhline`/`axvline` has no arrowhead). Axis *labels* (`x`/`y`, or whatever the question
  actually calls them — e.g. `t`/`S`) sit right next to each arrow tip, not at
  matplotlib's default centred/rotated position.
- **Nothing overlaps** — not axis labels, not coordinate labels on marked points, not the
  curve itself. Check the rendered PNG at full size before using it; nudge an
  `ax.annotate`'s `xytext` offset (or its `ha`/`va`) whenever a label sits on top of the
  axis line, another label, a tick number, or the curve.
- **The plotted curve never extends past the given axis range — including at an
  asymptote.** Sample the function only over the *x*-domain the question actually
  restricts it to (which may be narrower than the full axis range VCAA drew for
  framing/labelling purposes — don't sample past it just because the grid extends
  further). Then set `ax.set_xlim(xmin, xmax)` / `ax.set_ylim(ymin, ymax)` to the given
  range **exactly, with no extra padding** — matplotlib clips any plotted line to the
  axes' own limits automatically, so a strict `ylim` is what stops a vertical asymptote
  from visibly poking up past the top of the grid (padding the limits to make room for
  the arrowhead is exactly what lets the curve overshoot — don't do that). To keep the
  arrowhead itself from being clipped right at that same boundary, pass
  `annotation_clip=False` to the `ax.annotate(...)` calls that draw the two axis arrows;
  text labels don't need this (`clip_on=False` is matplotlib's default for text, so the
  `x`/`y` labels sitting just past the tip already render in full).
- **Gridlines**: shown, light grey, behind the curve (`zorder`) and behind nothing else.
- **Axis range and step size must match VCAA's own blank grid exactly** — re-open the
  source PDF page for that part and read off the printed range and tick spacing (the two
  axes are often on *different* steps, e.g. *x* every 1 but *y* every 2 — check both
  independently), rather than choosing a range that merely fits the curve. Getting this
  wrong is a real, repeatable mistake: it happened on the first pass of two of these three
  graphs before this rule was written down.
- **Coordinates in exact form**, matching the algebra in the worked solution — a fraction
  (`3/2`, via mathtext `\frac{3}{2}`) or exact expression (`2e^{5/3}+8e^{-10/3}`), never a
  rounded decimal, unless the question itself asked for a specific number of decimal
  places at that point.
- **Notation matches the site's own Katex convention** — natural log as `log_e(x)` (`e`
  subscript, parentheses around the argument, mathtext `\log_e(x)`), not `ln(x)` or
  `\ln_e`.
- Curve in the site's sky blue (`#0ea5e9`), any given asymptote as a dashed line in a
  colour distinct from the curve (e.g. red `#ef4444` for a vertical asymptote), marked
  points as small filled black dots with their coordinate labelled beside them.

If you find an existing question file with a hand-coded inline SVG sketch (look for
`functionToPath` imported for a *standalone* sketch, not an overlay), it should be
converted to a matplotlib PNG the next time you touch that file.

If you find an existing question file that redrew a diagram VCAA actually provided, fix
it: crop the real figure and replace the SVG, updating the top comment accordingly.

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
