// 2024 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 36% correct. This
// year's paper used four options (A–D) rather than five. Gradient of √f(x) at a point, given
// f and f′ there — a chain-rule application without knowing f's actual rule. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 14, C: 27, D: 36 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <Katex tex="\frac{dy}{dx} = \tfrac12\big(f(x)\big)^{-1/2}f'(x) = \tfrac12(f(4))^{-1/2}f'(4) = \frac{15}{2\sqrt{25}} = \frac32" />
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(4)=25,\qquad f'(4)=15" />,
    reason: 'Given values — the actual rule for f is never needed.',
  },
  {
    working: <Katex display tex="y = \sqrt{f(x)} = \big(f(x)\big)^{1/2}" />,
    reason: 'Rewrite as a power for the chain rule.',
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac12\big(f(x)\big)^{-1/2}\cdot f'(x)" />,
    reason: 'Chain rule.',
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\bigg|_{x=4} = \frac12\big(25\big)^{-1/2}\times15 = \frac{15}{2\sqrt{25}}" />,
    reason: 'Substitute the given values.',
  },
  {
    working: <Katex display tex="\boxed{\frac{15}{2\times5} = \frac{15}{10} = \frac32}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function MethodsQ16_2024() {
  return (
    <MCQShell
      question={
        <p>
          Suppose that a differentiable function <Katex tex="f:\mathbb{R}\to\mathbb{R}" /> and its derivative{' '}
          <Katex tex="f':\mathbb{R}\to\mathbb{R}" /> satisfy <Katex tex="f(4)=25" /> and <Katex tex="f'(4)=15" />.
          <br />
          Determine the gradient of the tangent line to the graph of <Katex tex="y=\sqrt{f(x)}" /> at{' '}
          <Katex tex="x=4" />.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt{15}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{1}{10}" /> },
        { letter: 'C', content: <Katex tex="\tfrac{15}{2}" /> },
        { letter: 'D', content: <Katex tex="\tfrac32" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
