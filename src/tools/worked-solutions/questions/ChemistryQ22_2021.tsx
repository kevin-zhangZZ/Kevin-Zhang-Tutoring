// 2021 Chemistry Exam, MCQ 22. VCAA examination report: 37% correct. Finding the volume of
// octane needed to deliver a given amount of usable energy, accounting for a combustion engine
// that is only 25% efficient. Question text transcribed from the original paper. Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 19, C: 34, D: 37 },
  answer: 'D',
  comment: (
    <>
      Since the combustion of octane is only 25% efficient, the 528 MJ of usable energy is only a
      quarter of the total chemical energy that must actually be released. Not accounting for
      efficiency at all is consistent with option C.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Usable energy needed = 528 MJ = 528 000 kJ; efficiency = 25.0%.</>,
    reason: 'Given information.',
  },
  {
    working: <Chem eq="Total energy released = 528000 / 0.25 = 2112000" className="mr-1" />,
    reason: <>Only a quarter of the chemical energy released actually ends up as usable energy — the other three-quarters is lost. The engine has to release <b>four times</b> as much chemical energy as it delivers usefully.</>,
  },
  {
    working: <Chem eq="n(C8H18) = 2112000 / 5460 = 386.8" className="mr-1" />,
    reason: <>Divide by the molar heat of combustion of octane, 5460 kJ mol⁻¹.</>,
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
    reason: <>Matches option <b>D</b>.</>,
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
