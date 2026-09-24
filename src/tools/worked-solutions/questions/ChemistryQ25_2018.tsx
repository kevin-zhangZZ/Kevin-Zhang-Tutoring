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
  comment: (
    <>
      <i>n</i>(<Chem eq="C5H11OH" />) = 10800 × 10³ kJ / 3329 kJ mol⁻¹ = 3.244 × 10³ mol
      <br />
      <i>m</i>(<Chem eq="C5H11OH" />) = 3.244 × 10³ mol × 88.0 g mol⁻¹ = 2.85 × 10⁵ g = 285 kg =
      0.285 tonnes
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>ΔH = 3329 kJ mol⁻¹, <Chem eq="M(C5H11OH) = 88.0" /> g mol⁻¹. Energy needed: 10 800 MJ = 10 800 000 kJ.</>,
    reason: <>Convert everything to the same energy unit (kJ) before dividing.</>,
  },
  {
    working: <>n(C₅H₁₁OH) = 10 800 000 / 3329 = <b>3244.2 mol</b></>,
  },
  {
    working: <>mass = 3244.2 × 88.0 = <b>285 491 g</b></>,
  },
  {
    working: <>285 491 g ÷ 1 000 000 g/tonne = <b>0.285 tonnes</b></>,
    reason: <>Matches option <b>B</b>, 0.286, the option closest to 0.285 tonnes. Options <b>A</b> and <b>C</b> are a factor of 10 out; option <b>D</b>, 286, is the mass in <em>kilograms</em> rather than tonnes.</>,
  },
]

export default function ChemistryQ25_2018() {
  return (
    <MCQShell
      question={
        <p>
          The molar heat of combustion of pentan-1-ol, <Chem eq="C5H11OH" />, is 3329 kJ mol⁻¹.
          <br />
          <Chem eq="M(C5H11OH) = 88.0" /> g mol⁻¹
          <br />
          The mass of <Chem eq="C5H11OH" />, in tonnes, required to produce 10 800 MJ of energy is
          closest to
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
