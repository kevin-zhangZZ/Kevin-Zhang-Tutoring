// 2022 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 73% correct.
// A gradient at the y-intercept. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 4, C: 15, D: 3, E: 73 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = e^{3x} \implies \frac{dy}{dx} = 3e^{3x}" />,
    reason: 'Chain rule.',
  },
  {
    working: <Katex display tex="\text{the vertical axis is } x = 0" />,
    reason: <>"Crosses the vertical axis" means <Katex tex="x=0" />, not <Katex tex="y=0" />.</>,
  },
  {
    working: <Katex display tex="\left.\frac{dy}{dx}\right|_{x=0} = 3e^0 = \boxed{3}" />,
    reason: <>Matches option <b>E</b>. Option C, 1, is the <Katex tex="y" />-value there rather than the gradient.</>,
  },
]

export default function MethodsQ3_2022() {
  return (
    <MCQShell
      question={
        <p>
          The gradient of the graph of <Katex tex="y=e^{3x}" /> at the point where the graph
          crosses the vertical axis is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\tfrac1e" /> },
        { letter: 'C', content: <Katex tex="1" /> },
        { letter: 'D', content: <Katex tex="e" /> },
        { letter: 'E', content: <Katex tex="3" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
