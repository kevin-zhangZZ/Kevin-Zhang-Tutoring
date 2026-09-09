// 2018 Chemistry Exam, MCQ 27. VCAA examination report: 59% correct — tied for fifth-hardest
// MCQ on the 2018 paper. Find Kc for a reaction that is both reversed AND doubled relative to a
// given equilibrium — both transformations must be applied to Kc, in the right way.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 20, C: 59, D: 6 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="Br2(g) + I2(g) <=> 2IBr(g), Kc = 1.2 × 10²" className="block text-[13.5px]" />,
    reason: 'The given equilibrium and its equilibrium constant, at 150°C.',
  },
  {
    working: <Chem eq="2Br2(g) + 2I2(g) <=> 4IBr(g)" className="block text-[13.5px]" />,
    reason: <>Doubling every coefficient in a reaction <b>squares</b> its equilibrium constant.</>,
  },
  {
    working: <>Kc(doubled) = (1.2 × 10²)² = <b>1.44 × 10⁴</b></>,
  },
  {
    working: <Chem eq="4IBr(g) <=> 2Br2(g) + 2I2(g)" className="block text-[13.5px]" />,
    reason: <>The target reaction is exactly the <b>reverse</b> of the doubled reaction above.</>,
  },
  {
    working: <>Reversing a reaction <b>inverts</b> its equilibrium constant: Kc(target) = 1 / (1.44 × 10⁴)</>,
  },
  {
    working: <b>Kc(target) ≈ 6.9 × 10⁻⁵</b>,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function ChemistryQ27_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            <Chem eq="Br2(g) + I2(g) <=> 2IBr(g), Kc = 1.2 × 10²" /> at 150°C.
          </p>
          <p>
            Given the information above, what is Kc for the reaction{' '}
            <Chem eq="4IBr(g) <=> 2Br2(g) + 2I2(g)" /> at 150°C?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '1.6 × 10⁻²' },
        { letter: 'B', content: '4.1 × 10⁻³' },
        { letter: 'C', content: '6.9 × 10⁻⁵', isAnswer: true },
        { letter: 'D', content: '8.03 × 10⁻⁵' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
