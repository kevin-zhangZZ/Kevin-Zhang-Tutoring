// 2018 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 57% correct. The
// y-intercept of the tangent to y = log_e(2x) with gradient 2. Question text transcribed from
// the original paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Answer checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 9, C: 57, D: 11, E: 7 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = \log_e(2x) \implies \frac{dy}{dx} = \frac{2}{2x} = \frac1x" />,
    reason: <>Chain rule: the derivative of <Katex tex="\log_e(u)" /> is <Katex tex="\tfrac{u'}{u}" />, and here <Katex tex="u=2x" /> so the two <Katex tex="2" />s cancel. Worth noticing — <Katex tex="\log_e(2x)=\log_e(2)+\log_e(x)" /> differs from <Katex tex="\log_e(x)" /> only by a constant, so it must have the same derivative.</>,
  },
  {
    working: <Katex display tex="\frac1x = 2 \implies x = \frac12" />,
    reason: <>Setting the gradient to the required value locates the point of contact.</>,
  },
  {
    working: <Katex display tex="y = \log_e\!\left(2\times\tfrac12\right) = \log_e(1) = 0" />,
    reason: <>The point of tangency is <Katex tex="\left(\tfrac12,\,0\right)" /> — conveniently on the <Katex tex="x" />-axis, which is what keeps the arithmetic clean.</>,
  },
  {
    working: <Katex display tex="y - 0 = 2\left(x-\tfrac12\right)" />,
    reason: <>Point–gradient form with <Katex tex="m=2" /> through that point.</>,
  },
  {
    working: <Katex display tex="y = 2x - 1" />,
    reason: <>Expanding.</>,
  },
  {
    working: <Katex display tex="\boxed{y\text{-intercept} = -1}" />,
    reason: <>Setting <Katex tex="x=0" />. Matches option <b>C</b>. Option <b>A</b> <Katex tex="(0)" />, chosen by <Katex tex="15\%" />, is the <Katex tex="y" />-value at the point of tangency rather than at the <Katex tex="y" />-axis — the question asks where the tangent <em>crosses</em> the axis, which is a different place. Options <b>D</b> and <b>E</b> are what appear if the derivative is taken as <Katex tex="\tfrac{1}{2x}" />.</>,
  },
]

export default function MethodsQ9_2018() {
  return (
    <MCQShell
      question={
        <p>
          A tangent to the graph of <Katex tex="y=\log_e(2x)" /> has a gradient of{' '}
          <Katex tex="2" />. This tangent will cross the <Katex tex="y" />-axis at
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="-0.5" /> },
        { letter: 'C', content: <Katex tex="-1" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-1-\log_e(2)" /> },
        { letter: 'E', content: <Katex tex="-2\log_e(2)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
