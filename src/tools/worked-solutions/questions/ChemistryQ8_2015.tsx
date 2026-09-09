// 2015 Chemistry Exam, MCQ 8. VCAA examination report: 42% correct — the third-hardest MCQ on
// the 2015 paper. Three statements about polarity and intermolecular attraction in HPLC — are
// they all true? Question text transcribed from the original paper; solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 21, C: 21, D: 42 },
  answer: 'D',
  comment: 'The spread of selected alternatives suggests a significant lack of understanding of the link between chromatography and chemical bonding.',
}

const ROWS: WorkingRow[] = [
  {
    working: 'Column: polar mobile phase (the solvent) + non-polar stationary phase.',
    reason: 'Set the scene — HPLC separates molecules based on how strongly each is attracted to the two competing phases.',
  },
  {
    working: 'Statement I: polar molecules ↔ solvent, by dipole-dipole attraction.',
    reason: <>Polar molecules attract other polar molecules via permanent dipole-dipole forces — and the solvent (mobile phase) here <em>is</em> polar. <b>True.</b></>,
  },
  {
    working: 'Statement II: non-polar molecules ↔ stationary phase, by dispersion forces.',
    reason: <>Non-polar molecules can only ever interact via (weaker) dispersion forces — and the stationary phase here is non-polar, so that's exactly what happens. <b>True.</b></>,
  },
  {
    working: 'Statement III: polar molecules travel through the column faster than non-polar molecules.',
    reason: <>Polar molecules are attracted to the <em>mobile</em> phase, so they spend more time moving <em>with</em> the flowing solvent. Non-polar molecules are attracted to the <em>stationary</em> phase, so they're repeatedly held back. <b>True.</b></>,
  },
  {
    working: <b>All three statements are true.</b>,
    reason: <>Matches option <b>D</b> — a molecule's overall retention time comes down to which phase it's more attracted to, and by which kind of force.</>,
  },
]

export default function ChemistryQ8_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Consider the following statements about a high-performance liquid chromatography
            (HPLC) column that uses a polar solvent and a non-polar stationary phase to analyse a
            solution:
          </p>
          <p className="mb-1"><b>Statement I</b> — Polar molecules in the solution will be attracted to the solvent particles by dipole-dipole attraction.</p>
          <p className="mb-1"><b>Statement II</b> — Non-polar molecules in the solution will be attracted to the stationary phase by dispersion forces.</p>
          <p className="mb-2"><b>Statement III</b> — Polar molecules in the solution will travel through the HPLC column more rapidly than non-polar molecules.</p>
          <p>Which of these statements are true?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'I and II only' },
        { letter: 'B', content: 'I and III only' },
        { letter: 'C', content: 'II and III only' },
        { letter: 'D', content: 'I, II and III', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
