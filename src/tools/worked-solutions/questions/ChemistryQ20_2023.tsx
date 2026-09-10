// 2023 Chemistry Exam, MCQ 20 — BONUS: a VCAA-flagged question with no single correct answer.
// VCAA's own report states "There was no correct or best answer to this question and all
// students were awarded the mark." Question text transcribed from the original paper. This page
// walks through why each of the four options fails to be defensibly "always correct" — solution
// and analysis are original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 28, B: 2, C: 49, D: 20 },
  answer: ['A', 'B', 'C', 'D'],
  flawed: (
    <>
      VCAA's report states plainly: "There was no correct or best answer to this question and
      all students were awarded the mark." Every option turned out to have a genuine flaw once
      examined closely — see the Worked Solution tab for why each one fails to be defensibly
      "always correct".
    </>
  ),
  comment: (
    <>
      Water in the burette will dilute the liquid being added from the burette and cause a
      larger titre for a particular indicator. For a specific titration, different indicators
      will show different endpoints and result in different titre volumes. Using methyl red
      (pH 4.4–6.2) rather than phenolphthalein (pH 8.3–10) for the titration of CH₃COOH(aq) by
      NaOH(aq) will require a smaller titre volume and lead to a less accurate result — both
      indicators may lead to precise results, but only the correct indicator produces an
      accurate result. Water in the pipette reduces the concentration of the aliquot in the
      titration flask, causing a smaller titre to be used — so, in the titration of a base (in
      the aliquot) by an acid, the smaller titre volume leads to an overestimation of the acid
      concentration. According to the RACI's "A Guide to Titration", the pipette tip should
      touch (not be tapped against) the flask wall — the distinction between touch and tap was
      considered too fine for students to make, and since there should be some contact between
      the burette tip and the flask, option D was also considered incorrect.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The question asks what is <b>always</b> correct — a strong word. For an option to survive, it has to hold in <i>every</i> accurate acid-base titration, not just the specific scenario VCAA had in mind when writing it.</>,
    reason: 'This is ultimately why the question fell apart: each option is true in a narrower sense than "always", or is simply wrong as worded.',
  },
  {
    working: <>A: "Water in the burette will dilute the aliquot." The <b>aliquot</b> is the measured volume sitting in the conical flask — it's entirely unaffected by anything happening inside the burette. Water in the burette dilutes the <b>titrant</b> (what's being added from the burette), not the aliquot.</>,
    reason: 'A factual mix-up between "titrant" and "aliquot" — the statement names the wrong solution. As worded, it is simply false, which is presumably why only 28% picked it despite the underlying titration-error idea being a genuinely common exam topic.',
  },
  {
    working: <>B: "Any acid-base indicator will give an accurate result." An indicator's colour-change range needs to sit close to the titration's equivalence-point pH — a mismatched indicator (e.g. methyl red for a titration whose equivalence point is strongly basic) gives a systematically wrong titre, even if it changes colour crisply every time.</>,
    reason: 'Clearly false on its face — indicator choice is one of the most commonly tested sources of titration error. Only 2% of students picked it, consistent with it being the most obviously wrong option.',
  },
  {
    working: <>C: "Water in the pipette causes an underestimate of the acid concentration." This is only true for a <i>specific</i> arrangement (e.g. a base in the pipette, titrated by an acid, where the diluted aliquot needs a smaller titre, leading to an <i>over</i>estimate of the acid's concentration, per VCAA's own worked example). Whether water in the pipette over- or under-estimates a concentration depends on which solution is in the pipette and which is the titrant.</>,
    reason: "Directionally inconsistent once you consider more than one titration setup — not something that's \"always\" true the way the stem demands.",
  },
  {
    working: <>D: "The pipette is not tapped against the conical flask to ensure accurate volume delivery." Correct laboratory technique (RACI's own guide) says to <i>touch</i> the pipette tip against the flask wall to complete delivery — not to avoid contact altogether. The touch-vs-tap distinction is real but far too fine for students to be expected to draw, and some contact between pipette and flask is actually required.</>,
    reason: "Technically closest to correct procedure, but VCAA judged the wording too easily misread as \"no contact at all\", which isn't accurate technique either.",
  },
  {
    working: <b>Every option contains a genuine flaw once checked carefully — none is defensibly "always correct". VCAA agreed and awarded the mark to everyone regardless of their answer.</b>,
    reason: 'This is a real example of a VCAA exam question being retracted after the fact, not a case of one "best" answer among four.',
  },
]

export default function ChemistryQ20_2023() {
  return (
    <MCQShell
      flawed={
        <p>
          VCAA's own report states there was <b>no correct or best answer</b> to this question,
          and every student was awarded the mark regardless of what they selected. All four
          options are marked below since VCAA accepted every one of them — this page instead
          explains why each option fails to hold up as "always correct", which is the interesting
          part of a flawed exam question like this one.
        </p>
      }
      question={<p>Which one of the following is always correct when performing an accurate acid-base titration?</p>}
      options={[
        { letter: 'A', content: 'Water in the burette will dilute the aliquot.', isAnswer: true },
        { letter: 'B', content: 'Any acid-base indicator will give an accurate result.', isAnswer: true },
        { letter: 'C', content: 'Water in the pipette causes an underestimate of the acid concentration.', isAnswer: true },
        { letter: 'D', content: 'The pipette is not tapped against the conical flask to ensure accurate volume delivery.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
