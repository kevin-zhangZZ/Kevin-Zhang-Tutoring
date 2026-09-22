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
- `EXAMINER.comment` is VCAA's report text for that part, **copied verbatim and in full**
  — see §12.6. It is presented as VCAA's voice, not this site's analysis; original
  reasoning belongs in `ROWS`, never in `comment` (exception: §8's un-explained flagged
  questions).
- Use real Unicode characters directly in JSX text (e.g. `≡` for a triple bond, `⇌` for
  equilibrium, `°C`, `µg`) rather than escape sequences or HTML entities, except inside a
  `Chem`/`Katex` `eq` string where the component's own notation applies (§6, §7).

**How a solution is written** — audience, working vs reasoning columns, `Background`
boxes, CAS references, sanity checks, distractors — is set out in §12 (all subjects),
§13 (Mathematics) and §14 (Chemistry). Those sections are the authority on content;
this section covers source formatting only.

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
the figure is this site's own explanatory graph of something VCAA never printed. Three
limits: it must be a *different* function or view from any figure VCAA did print (never a
re-plot of the question's own given graph — crop that instead); the question's real
figure still appears, cropped, wherever the question itself relies on it; and — the rule
below — it never goes in the question stem.

**The question stem shows only what VCAA printed. If VCAA printed no diagram, the stem
gets no diagram.** An explanatory figure of our own belongs in the worked solution and
nowhere else: `MCQShell`'s `diagram` prop and the figure block inside a short-answer
question's stem card are reserved for cropped VCAA artwork. Putting an original sketch in
the stem misrepresents the paper twice over — it hands the reader information the real
candidates never had (often the answer, as when a graph of `f(x) = x + sin(x)` sits beside
five options that are all claims about the shape of that curve), and it contradicts the
file's own "question text transcribed from the original paper" claim. The stem a student
reads on this site should be the stem they would face in the exam room, so that attempting
it before opening the solution is worth something. Move the figure into the first
`WorkingRow`, or into a `<Background>`, where it reads as *our* explanation rather than
*VCAA's* given information.

This applies to the answer-sketch case too: where VCAA printed blank axes for a "sketch
the graph" part, the stem may show the blank axes (cropped), never the completed curve.

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
- Curve in the site's sky blue (`#0ea5e9`), marked points as small filled black dots with
  their coordinate labelled beside them.
- **An asymptote is drawn dashed in the same colour as the curve it belongs to** — sky
  blue for a curve in sky blue, orange for a second curve in orange. The dashes already
  say "this is not part of the graph"; matching the colour says *which* graph it belongs
  to, which is the information that actually matters once two functions share a set of
  axes. Reserve red `#ef4444` for a line that belongs to no curve (a boundary the question
  imposes, say). Earlier figures in this archive put every asymptote in red before this
  rule was written down; recolour one when you next touch its question.

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
- Commit message ends with the `Co-Authored-By:` line the session's system reminder
  specifies (the model name changes between sessions — don't hard-code one).
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

## 12. Solution-writing standards — all subjects

Approved 2026-09-22. These sections are the authority on *what a solution contains and how
it explains*; §3–§7 cover the mechanics of the codebase. Where anything above conflicts
with §12–§14, §12–§14 win.

### 12.1 Who this is for

A Year 12 student working through the paper alone, with no teacher to ask. A solution is
finished only when a student who got the question *wrong* could follow it unaided and
understand *why* each step happens. The site is a tutoring resource, not an answer key:
the explanation is the product, not the number at the end.

### 12.2 Sourcing and verification

- **Cover the whole paper.** When asked for an exam, every question is written up except
  those excluded under §12.8, and every exclusion is labelled, never silently dropped.
- **Cross-reference every question** against the VCAA examination report and (Maths only —
  Chemistry has no equivalent) itute's solutions, for both accuracy and completeness of the
  working.
- **Never trust a single source.** Re-derive every answer independently before comparing.
  itute has been wrong four times on this site (2020 Specialist MCQ 7 and 11; 2019
  Specialist Exam 1 Q4's factorisation; 2019 Specialist Exam 2 Q2(c)) and incomplete twice
  more (2019 Specialist Exam 2 Q3(a)(ii) and Q1(e)). Where itute and VCAA disagree, VCAA
  wins; where both are silent or unclear, our own derivation wins.
- **Verify every numeric or algebraic answer by computer algebra** (sympy/scipy) before
  writing it up — integrals, factorisations, probabilities, confidence intervals, all of it.
  Not as a substitute for the by-hand working shown to the student, but as a check on it.
- **`pdftotext` is unreliable on maths** — it drops π, primes, superscripts and roots.
  Anything consequential (a function's rule, an initial condition, a mark distribution) is
  confirmed against a rendered page image (`pdftoppm -r 200`) before it is transcribed or
  used.
- **Every discrepancy with a source is recorded in the file's top comment** ("itute gives X;
  VCAA gives Y; the solution follows Y because…") so it is never re-litigated.
- **If VCAA looks wrong, say so in chat.** VCAA is generally not wrong. Where a published
  answer looks incorrect or ambiguous (2019 Methods Exam 2 Q2(b)'s `(0,20]` is the
  archetype), present VCAA's published form as the answer to write in an exam, add a short
  note in the solution explaining the discrepancy, and **tell KZ in the chat** which
  question it is and why, so the accuracy can be rechecked. Never silently "correct" VCAA,
  and never present a non-VCAA form as the marked answer.

### 12.3 Transcribing the question

- Question text is transcribed from the original paper, verbatim, including the mark
  allocation per part and any stem text between parts (rendered as its own grey box between
  the relevant `PartCard`s).
- **Any diagram the question provides MUST be screenshotted — cropped from the exam PDF —
  never recreated** in any way. This is the hard rule of §7 restated: no SVG, no matplotlib,
  no "clean" redraw of a VCAA figure, however simple it looks.
- A diagram the question refers to ("as shown below", "on the axes above") appears **in the
  stem**, where the reference is, not only inside the working. It may also be repeated
  inside the working where a step needs it.
- The top comment states the provenance of every image: "cropped from the original VCAA
  exam PDF", "this site's own explanatory figure", or "SVG overlay on the cropped figure".

### 12.4 Anatomy of a solution

- **Short-answer question**: grey stem box → optional "Before You Start" `Background` →
  one `PartCard` per lettered part (statement, marks, `Background` if needed,
  `WorkingTable`, examiner's report, video slot). A question with no lettered parts uses
  the single-card layout (`WorkingTable` + `SAExaminerReport` + video slot), not a
  `PartCard` with a fake letter.
- **MCQ**: `MCQShell` with the question, optional `diagram`, the options with the correct
  one(s) flagged, a `WorkingTable`, and `MCQExaminerStats`. Options are A–E up to 2023 and
  **A–D from 2024 for Methods and Specialist**; Chemistry has always been A–D.
- Section labels in Title Case, never ALL CAPS in source.
- Every solution ends with a boxed final answer (`\boxed{…}`) or, for an MCQ, a boxed
  "Option X" whose reason reads "Matches option **X**" and names the distractors (§12.9).

### 12.5 Writing the working

- **The Working column is what a student writes on the exam page. The Reasoning column is
  everything else.** Every line in `working` must be something a student would actually
  write down — equations, substitutions, a sketch, the boxed answer. Any explanation *for*
  the student that should not appear in an exam answer (why this rule, what to watch for,
  what the examiner said) goes in `reason`, never in `working`.
- Every non-obvious step has a `reason` saying *why* that step, not just *what*. "Product
  rule" is a label; "f is a product of two functions of x, so use (uv)′ = u′v + uv′" is an
  explanation. Pure algebraic manipulation with nothing to explain may go without one.
- **Use the `Background` component** wherever a part quietly relies on theory the student
  may not have to hand — what "average rate of change" means, how a transformation acts on
  a graph, why an inverse's tangent is the reflected one, what a sample proportion is. Reach
  for it especially where the examiner's report shows students misread the *question*
  rather than fumbled the algebra.
- **Only VCE-level methods.** Every technique used must be in the relevant VCE study
  design. Nothing beyond VCE level — no university methods, no shortcuts the student can't
  be expected to know — even when they would be shorter.
- **"By CAS" is not working.** Where the algebra is doable by hand — an antiderivative, a
  factorisation, a substitution, a surd simplification — show it. Reserve technology for
  things with genuinely no by-hand route (and say why: "x²e^(−x²) has no elementary
  antiderivative").
- **Where technology is used, name the operation in TI-Nspire CAS syntax** — e.g.
  `normCdf(370, 375, 375, 15/√50)`, `invNorm(0.05, 14.1, 2.1)`, `binomCdf(36, 0.0527, 0, 2)`,
  `solve(…, a) | 10 ≤ a ≤ 20`, `nInt(…)` — and **every such reference carries a popup link**
  which, when clicked, explains that function's structure (argument order), purpose, and
  syntax. *(Implementation: a `CasRef` component with a per-function reference table —
  not yet built as of 2026-09-22; until it exists, write the syntax inline and note the
  popup is pending in the top comment.)*
- **"Show that" questions**: every line of the derivation appears; never start from the
  result and work backwards; end with "as required". The final row's reason reminds the
  student that a bare final line earns nothing.
- **Answer in the form the question asks for**, and say so: "in terms of a", "in the form
  (π − a√b)/…", "correct to three decimal places", "as an equation". Where VCAA's report
  notes that a different form lost marks (an expression instead of an equation, a decimal
  instead of exact), the reason on the final row repeats that warning.
- Later parts reference earlier ones explicitly ("from part (b)") and, where a later part
  uses an *unrounded* earlier value, say so — the report regularly flags early rounding.
- **Rejected solutions are shown and justified**, not omitted: "x = −1 is outside
  0 ≤ t ≤ 2", "a = −½ rejected since 0 < a < 1". Where a common wrong answer in the report
  *is* the rejected root, say that.
- The report's flagged errors are surfaced at the step where they happen (in that row's
  `reason`), not only in the examiner comment at the bottom.

### 12.6 Sanity checks

- The final row of every numeric or algebraic answer carries a one-line sanity check where
  one exists: sign (a falling graph has a negative gradient), magnitude (a volume ≈ πr²h
  estimate), consistency with a given graph ("the peak is drawn a little under 2 — ✓"),
  symmetry, substitution back into the original equation, or **real-world plausibility**
  (a human can't swim at 50 m/s; a probability can't exceed 1; a proportion can't be
  negative).
- Endpoints of a restricted domain are checked in optimisation questions, so the student
  sees that the interior stationary point really is the extremum.

### 12.7 The examiner's report

- Every part carries the report's mark distribution and average.
- **The report's feedback for each question is copied verbatim and in full.** Nothing is
  paraphrased, trimmed or reordered, and nothing is omitted. Where the report's own maths is
  mangled by text extraction, the prose stays verbatim and the maths is transcribed into
  Katex from the rendered page. Where the report has no comment for a part, `comment` is
  omitted — never invented.
- Percentages for MCQs are read from a rendered image of the report table, not from
  `pdftotext`, because column alignment in the text dump is unreliable.
- Where the report's sample answer is in a different but equivalent form to ours, the
  final row of the working says so ("VCAA writes this as …") so a student comparing the two
  isn't thrown.

### 12.8 Study-design exclusions and the skip guide

- Anything not on the current study design is labelled and skipped, not written up:
  Mechanics (Specialist), matrix transformations and transition matrices (Methods), arc
  length from a cartesian rule (Specialist), and the Chemistry items already in the skip
  guide.
- The test is the question's *mathematics*, not its vocabulary. "A force acts on the
  particle" as scene-setting for vector kinematics or a = v·dv/dx is still on the course;
  resolving forces is not. Likewise "matrix" in a report comment describing a wrong method
  doesn't make the question a matrix question.
- **The skip guide is the source of truth.** If `exam-skip-guide/audit.ts` already has rows
  for the year being written up, follow them exactly for what is in and out. If it has no
  rows for that year, make the additions yourself as the questions are reviewed. If it has
  rows and you disagree with any inclusion or exclusion, **flag it in chat** so KZ can make
  an explicit decision — don't act on the disagreement unilaterally.
- **Never delete or alter anything KZ has written in the skip guide without asking.**
  Additions (new rows, new notes, appended paragraphs to an item) are allowed without
  permission; deletions and rewrites of existing text are not.
- Every exclusion is also recorded in `data.ts` as a comment on the block explaining which
  question and why.

### 12.9 Multiple-choice specifics

- The correct option is flagged; VCAA-flagged questions with more than one accepted answer
  follow §8.
- The final row names the distractors: which wrong option corresponds to which specific
  slip, prioritising the ones the report's percentages show students actually chose.
- When the *options* are the discriminating part (five candidate graphs, five sets of
  equations), the working checks each option against the derived requirement in turn,
  rather than only justifying the right one.

### 12.10 Diagrams

- **VCAA's figures are cropped, never redrawn** (§7 and §12.3). Annotations go in an SVG
  overlay calibrated from the printed gridlines, with the calibration measured
  programmatically and the rendered registration verified by reading the element geometry
  back, not by eyeballing a screenshot.
- **Our own sketches** — a "sketch the graph" answer on VCAA's blank axes — are drawn with
  matplotlib, never hand-coded SVG, in the §7 house style.
- **Explanatory figures** the question never asked for (the shape of a function VCAA never
  printed, a gradient function, an inverse, a shaded region showing which area an integral
  measures) are encouraged wherever they help understanding — provided the figure is a
  different function or view from anything VCAA printed, and the real figure still appears
  wherever the question relies on it.
- **Never in the question stem** (§7). The stem carries cropped VCAA artwork only; if VCAA
  printed no figure, the stem has no figure. Our own graphs go in a `WorkingRow` or a
  `<Background>`, so the stem the reader attempts matches the real paper instead of
  handing them information — sometimes the answer — that the actual candidates never had.
- **Colour conventions**: the plotted function in sky blue `#0ea5e9`; a second function in
  orange `#f97316`; **each asymptote dashed in its own curve's colour** (§7), with red
  `#ef4444` left for a reference line that belongs to no curve; marked points
  as small black dots — or the curve's own colour when drawn as an overlay on a black VCAA
  figure, so the answer is distinguishable from the original.
- Every image has descriptive alt text stating what it shows and whether it is VCAA's or
  ours.

### 12.11 Quality gates before a commit

- `npx tsc -p tsconfig.app.json --noEmit` is clean apart from the known `monte-carlo`
  error.
- The new pages are opened in the browser and checked: Katex renders, images load, no
  console errors, no page-level horizontal scroll (split over-long equations into two
  `display` lines), `Background` boxes and tables lay out at the narrow pane width.
- A scan for the JSX whitespace bug — a text line ending immediately before a line
  starting with `<em>`/`<b>`/`<Katex>` collapses the space ("findany").
- Commit with a message that says what was built, what was excluded and why, and what the
  cross-check caught. Push and deploy only when asked, as separate steps.

## 13. Mathematics — Methods and Specialist

### 13.1 Exam 1 versus Exam 2

- **Exam 1 is technology-free.** An Exam 1 solution never says "by CAS" and never uses a
  decimal approximation except to sanity-check an exact answer in the reasoning column.
  Everything is done the way a student must do it on the day, including surd and log
  manipulation and exact trigonometric values.
- **Exam 2**: solutions say when technology is the expected tool and name the operation
  generically (solve, define and graph, normalCdf, invNorm, binomPdf/Cdf, numerical
  integral), and also give the specific CAS operation in TI-Nspire CAS syntax. Every such
  reference carries a popup link which, when clicked, explains the structure, purpose and
  syntax of that CAS function (§12.5). Where a by-hand route also exists and is short, show
  it as well — the report repeatedly rewards recognising a standard form over reaching for
  a substitution or a solver.

### 13.2 Exact form and rounding

- **Exact answers unless the question specifies decimal places.** Where a decimal is useful
  for intuition, add its value in the reasoning column in brackets ("= 15/π ≈ 4.77") along
  with an explanation of the intuitive understanding it gives (what size the number is,
  what it corresponds to on the graph, why it is plausible).
- Rounding is done once, at the end, and the required precision is stated on the boxed
  answer ("correct to four decimal places"). Intermediate values are shown unrounded or
  with a trailing ellipsis (0.4907889…) so the student sees that rounding early is the
  mistake.
- Trailing zeros are kept when the precision demands them (0.7380, not 0.738) — VCAA marks
  them.

### 13.3 Notation

- Matches VCAA's formula sheet and the site's Katex conventions: `\log_e` (never `\ln`),
  `\text{cis}`, `\Pr`, `\hat P`, `\overline{X}`, `\operatorname{Var}`, `\text{sd}`, vectors
  with a tilde beneath (`\underset{\sim}{a}`), `\overrightarrow{AB}`, `\mathbb{R}` /
  `\mathbb{Z}` / `\mathbb{C}`, intervals with round/square brackets, sets with braces.
- Transformations are described in mapping language (dilation by factor k from the y-axis,
  translation of c units in the positive x direction), never with a matrix, even where the
  original 2016–2022 question used one — the matrix is translated before the solution
  proceeds.

### 13.4 Domains, restrictions and rejected solutions

- Every solution to an equation is filtered against the stated domain or restriction, and
  the filtering is written down (§12.5). Open versus closed interval endpoints are
  justified ("strictly less than — at d = −1/e the peak touches the axis, and zero isn't
  negative").
- Implied domains are found by listing what can fail (division by zero, even roots of
  negatives, logs of non-positives, undefined trig ratios) and ruling each in or out.

### 13.5 Sketches and graphs

- House style in §7 and §12.10. An answer sketch labels exactly what the question asks
  for — turning points, endpoints (closed vs open), intercepts, asymptotes with their
  equations — and nothing that isn't asked for and would clutter.
- Where the sketch is on VCAA's *printed* graph (a reciprocal, a derivative, a transformed
  function), the working also names the points where the new curve meets the old one,
  since the reports repeatedly flag those as the accuracy checks students miss.
- Reading features off a given graph (zeros, turning points) is confirmed algebraically
  where the algebra is short, so the student sees both routes agree.

### 13.6 Topic conventions

- **Calculus** — name the rule used at each differentiation step (product, chain,
  quotient, implicit); for implicit differentiation, point out every `dy/dx` factor the
  chain rule produces; for definite integrals show the antiderivative, then the
  substitution of terminals as a separate line; for area between curves state which is the
  upper function and why; for volumes state the axis of rotation and why the radius is x
  or y.
- **Probability and statistics** — name the distribution with its parameters on its own
  line (`X ~ Bi(36, 0.0527)`, `X̄ ~ N(375, 15²/50)`); justify why that distribution applies
  (the four binomial conditions; the sample-mean result); write hypotheses in terms of μ;
  state whether a test is one- or two-tailed and why; give the decision *in context* with
  the p-value comparison; convert proportion intervals to counts before using a binomial.
- **Vectors** — name the property used (parallelogram: equal opposite sides as vectors;
  perpendicularity: zero dot product; height: scalar resolute on the unit normal); show
  magnitudes as explicit square roots.
- **Complex numbers** — always check the quadrant when finding an argument; show the
  modulus calculation for a "show that"; for powers use de Moivre and say the modulus
  scales while the argument rotates; for loci, state what shape the relation is before
  converting to cartesian form.
- **Differential equations** — write the separated form explicitly; keep the constant of
  integration and show the initial condition fixing it; name the `f′/f` form when it
  appears.

### 13.7 Subject-specific exclusions

- **Methods**: matrix transformations and transition matrices are excluded (the whole
  question, or the specific part, with a `data.ts` comment).
- **Specialist**: Mechanics — force analysis, connected particles, equilibrium, statics — is
  excluded; arc length from a cartesian rule is excluded; parametric/vector arc length is
  kept. Statistical inference, vector calculus, complex loci and differential equations are
  all current.

## 14. Chemistry

Chemistry has no third-party solutions to cross-reference and a different marking culture
(mark points for named ideas, units and significant figures). The rules that follow
replace the "own worked solution" model for short-answer questions and adapt the rest.

### 14.1 Sourcing

- The VCAA examination report is the only official key and is read from a rendered image,
  since the shaded correct option does not survive `pdftotext` (§4).
- Where a reputable second source exists (a tutoring company's published solutions, a
  textbook), use it as a cross-check but label it as unofficial in the top comment; where
  none exists, say "VCAA report only" so the confidence level is visible.
- Numeric answers in MCQ explanations are recomputed independently, including a molar-mass
  check against the Data Book.

### 14.2 Short-answer questions: the report, not our own solution

- **For short-answer questions, present the examination report's own answer and
  commentary — verbatim and complete — and do not write our own solution or explanation.**
  The report is the marking scheme; the value to the student is seeing exactly what earned
  the marks, in VCAA's words.
- **Highlight the key chemistry terms** in the presented answer (bold, via `<b>`) so the
  mark-carrying vocabulary stands out — "partially oppose", "equilibrium shifts to the
  left", "limiting reagent", "oxidant", "rate of the forward reaction" — for easier reading
  and revision.
- The report's calculations are shown as printed (formula → substitution → answer with
  units), transcribed into `Chem`/`Katex` where the text extraction mangles them.
- A `Background` box is still appropriate for the underlying principle in study-design
  language, kept short and clearly separate from the report's text.

### 14.3 Multiple-choice questions: our own explanation

MCQs get a self-made explanation, following the §12 rules and these conventions:

- **Three-line calculations**: the formula in symbols → the substitution with units → the
  answer with units. `n = m/M` → `n = 2.50 g / 58.44 g mol⁻¹` → `n = 0.04278 mol`.
- Units on every quantity, including intermediate ones; the answer's units on the boxed
  line.
- Significant figures follow the least precise datum in the question, and the final row
  says which datum set the limit. Intermediate values are carried unrounded.
- Every Data Book value is cited as such in the reason ("Data Book: M(Na) = 23.0 g mol⁻¹";
  "E° values from the electrochemical series").
- Ratio steps in stoichiometry are shown explicitly — the mole ratio from the balanced
  equation on its own line.
- Equations use the `Chem` component (§6), are balanced, and carry states (s)/(l)/(g)/(aq)
  wherever the question does or a marker would expect them. Half-equations show the
  electrons and are balanced in the conditions the question specifies — including basic
  conditions, which the current study design examines and old papers never did.
- Oxidant/reductant, oxidised/reduced, anode/cathode and electrode polarity are named
  explicitly and consistently; where students commonly swap them, the reason says so.
- Terminology precision is enforced: amount vs concentration vs mass; strong vs
  concentrated; rate vs extent; heat vs temperature.
- **Distractors are explained by misconception**, not arithmetic ("B assumes the strong
  acid is also concentrated"; "D reverses the anode and cathode"), because Chemistry
  distractors are written around misconceptions.

### 14.4 Data Book changes between years

- **The VCE Chemistry Data Book has changed specific values over the years, so some
  answers differ depending on whether the old or the current Data Book is used.** Known
  examples: the density of water was 0.997 g mL⁻¹ and is now taken as 1; several
  electrochemical-series E° values have been revised.
- **Flag every question this affects**, in the stem or the relevant part: state which value
  the original paper and report used, what the current Data Book gives, and what the answer
  becomes with the current value — so a student working with today's Data Book isn't
  confused by a mismatch with the report.

### 14.5 Diagrams and data

- Chromatograms, spectra, cell diagrams, energy profiles and tables are cropped from the
  exam PDF, never redrawn (§12.3). Annotations (a labelled peak, a highlighted region, the
  ¹³C environments marked on a structure) go in an overlay.
- Our own explanatory figures are appropriate for MCQ explanations where VCAA printed
  nothing and a picture carries the idea — an energy profile with and without a catalyst, a
  galvanic cell with electron and ion flow, a titration curve with the equivalence point —
  drawn with matplotlib in the house style and labelled as ours.
- Structures are drawn only where they are the point of the question, and then as an
  image (cropped or generated), never as ASCII in text.

### 14.6 Study design

- Excluded: alkynes; AAS and GC as named techniques (doable if translated to HPLC — say so);
  old nutrition/biomolecule content; the aspirin pathway; and the one-off flags in the skip
  guide. New content with no old-paper equivalent (medicinal chemistry, green chemistry,
  redox in basic conditions, bond enthalpies) is flagged as such when an old question
  brushes against it.
- Chemistry exclusions get the same `data.ts` comment and skip-guide audit row as the
  maths ones, under the same rules (§12.8), with the "still doable if translated" note
  where it applies.

### 14.7 Sanity checks (MCQ explanations)

- Sign of ΔH matches exothermic/endothermic; an equilibrium shift is consistent with the
  stated change and with K; a concentration or yield is physically plausible (not > 100%,
  not negative); stoichiometric amounts stay in proportion; a pH is in range for the acid
  strength described.
