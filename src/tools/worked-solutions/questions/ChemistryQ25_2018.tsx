// 2018 Chemistry Exam, MCQ 25. VCAA examination report: 57% correct — tied for fifth-hardest
// MCQ on the 2018 paper. Find the mass of fuel needed to release a given amount of energy, in
// tonnes rather than grams — a straightforward calculation with an easy unit slip.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 57, C: 16, D: 18 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <>ΔH = 3329 kJ mol⁻¹, <Chem eq="M(C5H11OH) = 88.0" /> g mol⁻¹. Energy needed: 10 800 MJ = 10 800 000 kJ.</>,
    reason: 'Convert everything to the same energy unit (kJ) before dividing.',
  },
  {
    working: <>n(C₅H₁₁OH) = 10 800 000 / 3329 = <b>3244.5 mol</b></>,
  },
  {
    working: <>mass = 3244.5 × 88.0 = <b>285 516 g</b></>,
  },
  {
    working: <>285 516 g ÷ 1 000 000 g/tonne = <b>0.286 tonnes</b></>,
    reason: <>Matches option <b>B</b> — the wrong-order-of-magnitude options (A, C, D) all come from a slipped factor of 10 somewhere in the gram-to-tonne conversion.</>,
  },
]

export default function ChemistryQ25_2018() {
  return (
    <MCQShell
      question={
        <p>
          The molar heat of combustion of pentan-1-ol, <Chem eq="C5H11OH" />, is 3329 kJ mol⁻¹.{' '}
          <Chem eq="M(C5H11OH) = 88.0" /> g mol⁻¹. The mass of <Chem eq="C5H11OH" />, in tonnes,
          required to produce 10 800 MJ of energy is closest to
        </p>
      }
      options={[
        { letter: 'A', content: '0.0286' },
        { letter: 'B', content: '0.286', isAnswer: true },
        { letter: 'C', content: '2.86' },
        { letter: 'D', content: '286' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
