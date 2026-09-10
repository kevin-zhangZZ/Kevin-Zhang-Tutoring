// 2020 Chemistry Exam, MCQ 10. VCAA examination report: 26% correct. What is true of a solution
// calorimeter, by elimination against what's actually true of bomb calorimeters. Question text
// transcribed from the original paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 16, C: 54, D: 26 },
  answer: 'D',
  comment: (
    <>
      In both types of calorimeter, the instrument measures temperature changes that reflect the
      energy changes occurring during calibration or during the reaction under investigation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A: the temperature graph itself shows heat loss — the temperature <b>drops</b> back down slightly from its 21.2 °C peak.</>,
    reason: 'Ruled out — no calorimeter is perfectly insulated.',
  },
  {
    working: <>B: solution calorimeters aren't suitable for the combustion reactions bomb calorimetry is built for — combustion needs a sealed, pressurised environment (a "bomb"), which an open solution calorimeter doesn't provide.</>,
    reason: 'Ruled out.',
  },
  {
    working: <>C: both types of calorimeter <i>can</i> be calibrated either electrically or using a reaction with a known heat of reaction — calibration isn't restricted to one method.</>,
    reason: 'Ruled out — this restricts calibration more than is actually true.',
  },
  {
    working: <>D: whichever type of calorimeter is used, and whatever it's measuring (a calibration or the actual reaction of interest), the underlying principle is the same — a measured temperature change is used to infer an energy change.</>,
    reason: 'This is the one thing genuinely common to both designs.',
  },
  {
    working: <b>Both types share the same core principle: temperature change reflects energy change.</b>,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ10_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A solution calorimeter containing 350 mL of water was calibrated electrically, as
            described in the previous question.
          </p>
          <p>This type of calorimeter</p>
        </>
      }
      options={[
        { letter: 'A', content: 'has no heat loss.' },
        { letter: 'B', content: 'can be used for bomb calorimetry.' },
        { letter: 'C', content: 'requires electrical calibration in order to determine the calibration factor.' },
        { letter: 'D', content: 'measures energy changes that can be measured in a bomb calorimeter.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
