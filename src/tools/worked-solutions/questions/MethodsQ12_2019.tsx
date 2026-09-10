// 2019 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 38% correct.
// Combining two given definite integrals to evaluate a third. Question text transcribed from
// the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 26, C: 13, D: 13, E: 38 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_1^4 f(x)\,dx = 4 \qquad \int_2^4 f(x)\,dx = -2" />,
    reason: 'Given information.',
  },
  {
    working: <Katex display tex="\int_1^2 f(x)\,dx = \int_1^4 f(x)\,dx - \int_2^4 f(x)\,dx = 4-(-2) = 6" />,
    reason: <>Split the interval <Katex tex="[1,4]" /> at <Katex tex="x=2" />.</>,
  },
  {
    working: <Katex display tex="\int_1^2 (f(x)+x)\,dx = \int_1^2 f(x)\,dx + \int_1^2 x\,dx" />,
    reason: 'Linearity of the integral.',
  },
  {
    working: <Katex display tex="\int_1^2 x\,dx = \left[\frac{x^2}{2}\right]_1^2 = 2-\tfrac12 = \tfrac32" />,
    reason: 'Evaluate the second integral directly.',
  },
  {
    working: <Katex display tex="\boxed{6+\tfrac32 = \tfrac{15}{2}}" />,
    reason: <>Matches option <b>E</b>.</>,
  },
]

export default function MethodsQ12_2019() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_1^4 f(x)\,dx = 4" /> and <Katex tex="\displaystyle\int_2^4 f(x)\,dx = -2" />,
          then <Katex tex="\displaystyle\int_1^2 \big(f(x)+x\big)\,dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="6" /> },
        { letter: 'C', content: <Katex tex="8" /> },
        { letter: 'D', content: <Katex tex="\tfrac72" /> },
        { letter: 'E', content: <Katex tex="\tfrac{15}{2}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
