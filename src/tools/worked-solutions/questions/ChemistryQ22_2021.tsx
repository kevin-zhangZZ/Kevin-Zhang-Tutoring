// 2021 Chemistry Exam, MCQ 22. VCAA examination report: 37% correct. Finding the volume of
// octane needed to deliver a given amount of usable energy, accounting for a combustion engine
// that is only 25% efficient. Question text transcribed from the original paper. The report's
// alternative method gives a mass in "mol" — kept verbatim and explained in the working.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 19, C: 34, D: 37 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      For 100% efficiency:
      <br />
      <i>m</i>(<Chem eq="C8H18" />) reacting = energy used / energy from 1 g
      <br />
      = 528 x 10³ kJ / 47.9 kJ g⁻¹
      <br />
      = 1.10 x 10⁴ g
      <br />
      Since <i>d</i> = <i>m</i> / <i>V</i>
      <br />
      <i>V</i>(<Chem eq="C8H18" />) = 1.10 x 10⁴ g / 703 g L⁻¹
      <br />
      = 15.7 L
      <br />
      Since the reaction when octane undergoes combustion is only 25% efficient, 15.7 L is only
      25% of the octane consumed.
      <br />
      15.7 = 0.25 x <i>V</i>(<Chem eq="C8H18" />) required.
      <br />
      <i>V</i>(<Chem eq="C8H18" />) = 15.7 / 0.25
      <br />
      = 62.7 L
      <br />
      Alternatively:
      <br />
      <i>n</i>(<Chem eq="C8H18" />) reacting = energy used / energy from 1 mol
      <br />
      = 528 x 10³ kJ / 5460 kJ mol⁻¹
      <br />
      = 96.7 mol
      <br />
      <i>m</i>(<Chem eq="C8H18" />) reacting = 96.7 mol x 114.0 g mol⁻¹
      <br />
      = 1.10 x 10⁴ mol
      <br />
      The main error in this question was not using the efficiency in the calculations; this was
      consistent with Option C.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Usable energy needed = 528 MJ = 528 000 kJ; efficiency = 25.0%.</>,
    reason: <>Given information.</>,
  },
  {
    working: <Chem eq="Total energy released = 528000 / 0.25 = 2112000" className="mr-1" />,
    reason: <>Only a quarter of the chemical energy released actually ends up as usable energy — the other three-quarters is lost. The engine has to release <b>four times</b> as much chemical energy as it delivers usefully.</>,
  },
  {
    working: <Chem eq="n(C8H18) = 2112000 / 5460 = 386.8" className="mr-1" />,
    reason: <>Divide by the molar heat of combustion of octane, 5460 kJ mol⁻¹ (Data Book).</>,
  },
  {
    working: <Chem eq="m(C8H18) = 386.8 x 114.0 = 4.41 x 10^4" className="mr-1" />,
    reason: <>Convert to mass using <Chem eq="M(C8H18) = 114.0" /> g mol⁻¹.</>,
  },
  {
    working: <Chem eq="V(C8H18) = 44100 / 703 = 62.7" className="mr-1" />,
    reason: <>Convert to volume using the given density, 703 g L⁻¹.</>,
  },
  {
    working: <b>62.7 L of octane is required.</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b>, 15.7 L, leaves out the efficiency (as the report says); option <b>A</b>, 3.92 L, multiplies 15.7 L by 0.25 instead of dividing by it. (The report&rsquo;s alternative method ends &ldquo;= 1.10 x 10⁴ mol&rdquo;; that is a mass, 1.10 × 10⁴ g, the same as in its first method, and 1.10 × 10⁴ g ÷ 703 g L⁻¹ ÷ 0.25 = 62.7 L again.)</>,
  },
]

export default function ChemistryQ22_2021() {
  return (
    <MCQShell
      question={
        <p>
          1 L of octane has a mass of 703 g at SLC. The efficiency of the reaction when octane
          undergoes combustion in the petrol engine of a car is 25.0%.
          <br />
          What volume of octane stored in a petrol tank at SLC is required to produce 528 MJ of
          usable energy in a combustion engine?
        </p>
      }
      options={[
        { letter: 'A', content: '3.92 L' },
        { letter: 'B', content: '11.8 L' },
        { letter: 'C', content: '15.7 L' },
        { letter: 'D', content: '62.7 L', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
