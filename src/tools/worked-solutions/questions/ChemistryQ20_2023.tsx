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
      There was no correct or best answer to this question and all students were awarded the
      mark.
      <br />
      Water in the burette will dilute the liquid being added from the burette and cause a larger
      titre for a particular indicator.
      <br />
      For a specific titration, different indicators will show different endpoints and result in
      different titre volumes.
      <br />
      Using methyl red (pH 4.4–6.2) rather phenolphthalein (pH 8.3–10) for the titration of
      CH₃COOH(aq) by NaOH(aq) will require a smaller titre volume and lead to a less accurate
      result. Both indicators may lead to precise results but only the use of the correct indicator
      will produce an accurate result.
      <br />
      Water in the pipette reduces the concentration of the aliquot in the titration flask, causing
      a smaller titre to be used. So, in the titration of a base – in the aliquot – by an acid, the
      smaller titre volume will lead to an overestimation of the acid concentration.
      <br />
      According to the Royal Australian Chemical Institute (RACI; www.raci.org.au) – &lsquo;A Guide
      to Titration&rsquo;:
      <br />
      &lsquo;Insert the tip of the pipette well inside the titration flask, remove the filler, and
      allow the solution to drain with the pipette held vertically. Then touch the tip of the
      pipette against the side of the flask at the liquid/air interface for 10 seconds to complete
      the draining.&rsquo;
      <br />
      The distinction between touch and tap was considered too fine a distinction for students to
      make, and since there should be some contact between the tip of the burette and the inside of
      the conical flask, alternative D was also considered incorrect.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The question asks what is <b>always</b> correct — a strong word. For an option to survive, it has to hold in <i>every</i> accurate acid-base titration.</>,
    reason: <>Each option is either true only in some set-ups or false as worded — which is why VCAA found no correct answer.</>,
  },
  {
    working: <>A: &ldquo;Water in the burette will dilute the aliquot.&rdquo; The <b>aliquot</b> is the measured volume in the conical flask; water in the burette dilutes the <b>titrant</b>, the solution being added from the burette.</>,
    reason: <>False as worded: the report says water in the burette dilutes the liquid being added from the burette, making the titre larger.</>,
  },
  {
    working: <>B: &ldquo;Any acid-base indicator will give an accurate result.&rdquo; An indicator&rsquo;s colour-change range has to suit the pH at the equivalence point. The report&rsquo;s example: methyl red (pH 4.4–6.2) instead of phenolphthalein (pH 8.3–10) for CH₃COOH(aq) titrated with NaOH(aq) gives a smaller titre.</>,
    reason: <>False: a poorly chosen indicator can give precise but inaccurate results.</>,
  },
  {
    working: <>C: &ldquo;Water in the pipette causes an underestimate of the acid concentration.&rdquo; Water left in the pipette dilutes the aliquot, so it holds fewer mol and needs a smaller titre. If the aliquot is the acid being analysed, its concentration is <i>under</i>estimated; but if the aliquot is a base titrated with the acid (the report&rsquo;s example), the smaller titre leads to an <i>over</i>estimate of the acid concentration.</>,
    reason: <>True in some set-ups and false in others, so not &ldquo;always&rdquo; correct.</>,
  },
  {
    working: <>D: &ldquo;The pipette is not tapped against the conical flask to ensure accurate volume delivery.&rdquo; The RACI guide the report quotes says to <i>touch</i> the tip of the pipette against the side of the flask to complete the draining.</>,
    reason: <>The report judged the touch/tap distinction too fine for students, and since some contact is needed, it considered D incorrect too. (Its comment says &ldquo;the tip of the burette&rdquo; in that sentence; the RACI quote and option D are about the pipette.)</>,
  },
  {
    working: <b>No option is always correct, so VCAA awarded the mark to every student.</b>,
    reason: <>All four options are marked as accepted.</>,
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
