// 2015 Chemistry Exam, MCQ 22. VCAA examination report: 49% correct — tied for sixth-hardest
// MCQ on the 2015 paper. Find the pH of a barium hydroxide solution — the trap is the 2 in
// Ba(OH)2, which doubles the hydroxide concentration relative to the stated molarity.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 15, C: 33, D: 49 },
  answer: 'D',
  comment: <>Many students ignored the fact that <Chem eq="[OH-] = 2 x [Ba(OH)2]" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="Ba(OH)2(aq) -> Ba2+(aq) + 2OH-(aq)" className="block text-[13.5px]" />,
    reason: <>Barium hydroxide is a strong base that fully dissociates — and every formula unit releases <b>two</b> hydroxide ions, not one.</>,
  },
  {
    working: <>[OH⁻] = 2 × 0.0500 = 0.100 M</>,
    reason: 'This factor of 2 is exactly what the wrong answers (calculated as if it were a 1:1 base) miss.',
  },
  {
    working: <>pOH = −log₁₀(0.100) = 1.00</>,
  },
  {
    working: <>pH = 14.00 − pOH = 14.00 − 1.00 = 13.0</>,
    reason: 'At 25°C, pH + pOH = 14.',
  },
  {
    working: <b>pH = 13.0</b>,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ22_2015() {
  return (
    <MCQShell
      question={<p>What is the pH of a 0.0500 M solution of barium hydroxide, <Chem eq="Ba(OH)2" />?</p>}
      options={[
        { letter: 'A', content: '1.00' },
        { letter: 'B', content: '1.30' },
        { letter: 'C', content: '12.7' },
        { letter: 'D', content: '13.0', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
