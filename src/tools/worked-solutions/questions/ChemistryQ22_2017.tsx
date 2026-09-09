// 2017 Chemistry Exam, MCQ 22. VCAA examination report: 47% correct — tied for fourth-hardest
// MCQ on the 2017 paper. Read a caffeine concentration off an HPLC calibration curve, then
// correct for a dilution before scaling up to a real serving size.
// Question text/graph transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 29, B: 13, C: 47, D: 11 },
  answer: 'C',
  comment: 'Many students overlooked the dilution factor.',
}

const ROWS: WorkingRow[] = [
  {
    working: <>Peak area 2400 (arbitrary units) → reading off the calibration curve, <Chem eq="c(caffeine)" /> in the <em>diluted</em> sample = 0.040 g/L.</>,
    reason: 'The calibration curve directly converts HPLC peak area into concentration.',
  },
  {
    working: <>Dilution: 5.0 mL of coffee drink was diluted to 50.0 mL — a factor of <b>10</b>.</>,
    reason: 'This is the step most students skipped, using the diluted concentration directly.',
  },
  {
    working: <>c(caffeine) in the undiluted drink = 10 × 0.040 = <b>0.40 g/L</b></>,
  },
  {
    working: <>m(caffeine) in 350 mL = 0.40 × (350/1000) = <b>0.14 g</b></>,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function ChemistryQ22_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The mass of caffeine in a particular coffee drink was determined by high-performance
            liquid chromatography (HPLC). A 5.0 mL aliquot of the coffee drink was diluted to 50.0
            mL with de-ionised water and run through the HPLC column under the same conditions used
            to build the calibration curve. The peak area obtained for this diluted sample was 2400
            arbitrary units, corresponding to a concentration of 0.040 g/L on the calibration curve.
          </p>
          <p>The mass of caffeine, in grams, in 350 mL of the undiluted coffee drink is closest to</p>
        </>
      }
      options={[
        { letter: 'A', content: '0.014' },
        { letter: 'B', content: '0.070' },
        { letter: 'C', content: '0.14', isAnswer: true },
        { letter: 'D', content: '0.40' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
