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
    working: <Katex display tex="x = 0 \implies y = e^0 = 1, \text{ i.e. } (0,1)" />,
    reason: <>The vertical axis is the <Katex tex="y" />-axis, where every point has <Katex tex="x=0" /> (not <Katex tex="y=0" />).</>,
  },
  {
    working: <Katex display tex="y = e^{3x} \implies \frac{dy}{dx} = 3e^{3x}" />,
    reason: <>The derivative of <Katex tex="e^{kx}" /> is <Katex tex="ke^{kx}" /> (chain rule), here with <Katex tex="k=3" />.</>,
  },
  {
    working: <Katex display tex="\left.\frac{dy}{dx}\right|_{x=0} = 3e^0 = \boxed{3}" />,
    reason: <>Matches option <b>E</b>. Option C, 1, is the <Katex tex="y" />-value at <Katex tex="(0,1)" /> rather than the gradient there.</>,
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
