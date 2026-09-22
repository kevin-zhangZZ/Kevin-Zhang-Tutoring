// 2023 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 18% correct — the
// hardest MCQ on this paper. If the sum of two unit vectors is a unit vector, find the
// magnitude of their difference. Question text transcribed from the original paper. Solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 24, C: 32, D: 18, E: 3 },
  answer: 'D',
  comment: (
    <>
      If the sum of two unit vectors is a unit vector, an equilateral triangle is formed. By the cosine rule,{' '}
      <Katex tex="|\underset{\sim}{a}-\underset{\sim}{b}|^2 = 1^2+1^2-2(1)(1)\cos(120^\circ) = 3" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|\underset{\sim}{a}| = |\underset{\sim}{b}| = |\underset{\sim}{a}+\underset{\sim}{b}| = 1" />,
    reason: 'Two unit vectors whose sum is also a unit vector.',
  },
  {
    working: <Katex display tex="|\underset{\sim}{a}+\underset{\sim}{b}|^2 = |\underset{\sim}{a}|^2+2\underset{\sim}{a}\cdot\underset{\sim}{b}+|\underset{\sim}{b}|^2 = 2+2\underset{\sim}{a}\cdot\underset{\sim}{b}" />,
    reason: 'Expand the square of the sum.',
  },
  {
    working: <Katex display tex="1 = 2+2\underset{\sim}{a}\cdot\underset{\sim}{b} \;\implies\; \underset{\sim}{a}\cdot\underset{\sim}{b} = -\tfrac12" />,
    reason: <>Set equal to <Katex tex="|\underset{\sim}{a}+\underset{\sim}{b}|^2=1^2=1" /> and solve.</>,
  },
  {
    working: <Katex display tex="|\underset{\sim}{a}-\underset{\sim}{b}|^2 = |\underset{\sim}{a}|^2-2\underset{\sim}{a}\cdot\underset{\sim}{b}+|\underset{\sim}{b}|^2 = 2-2\left(-\tfrac12\right) = 3" />,
    reason: 'Expand the square of the difference using the same dot product.',
  },
  {
    working: <Katex display tex="\boxed{|\underset{\sim}{a}-\underset{\sim}{b}| = \sqrt3}" />,
    reason: <>Matches option <b>D</b>. (Geometrically: two unit vectors summing to a third unit vector form an equilateral triangle of side 1, whose "short diagonal" — the difference — has length <Katex tex="\sqrt3" /> by the cosine rule with a <Katex tex="120^\circ" /> angle between <Katex tex="\underset{\sim}{a}" /> and <Katex tex="-\underset{\sim}{b}" />.)</>,
  },
]

export default function SpecialistQ15_2023() {
  return (
    <MCQShell
      question={<p>If the sum of two unit vectors is a unit vector, then the magnitude of the difference of the two vectors is</p>}
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\tfrac12" /> },
        { letter: 'C', content: <Katex tex="\sqrt2" /> },
        { letter: 'D', content: <Katex tex="\sqrt3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\sqrt5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
