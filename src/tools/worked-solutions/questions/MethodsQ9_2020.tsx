// 2020 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 35% correct. Evaluating
// a definite integral of a dilated-and-translated function using a given base integral.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 17, C: 19, D: 12, E: 35 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\displaystyle\int_4^8 f(x)\,dx = 5" />
      <br />
      Dilate by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis.
      <br />
      <Katex tex="\displaystyle\int_2^4 f(2x)\,dx = \frac52" />
      <br />
      Translating 2 units to the left does not change the area.
      <br />
      <Katex tex="\displaystyle\int_0^2 f\bigl(2(x+2)\bigr)\,dx = \frac52" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_4^8 f(x)\,dx = 5" />,
    reason: <>The given integral.</>,
  },
  {
    working: <Katex display tex="u = 2(x+2) = 2x+4,\qquad du = 2\,dx" />,
    reason: <>Substitute to match the integrand <Katex tex="f\big(2(x+2)\big)" />.</>,
  },
  {
    working: <Katex display tex="x=0 \implies u=4 \qquad x=2 \implies u=8" />,
    reason: <>Transform the limits of integration.</>,
  },
  {
    working: <Katex display tex="\int_0^2 f\big(2(x+2)\big)\,dx = \int_4^8 f(u)\cdot\frac{du}{2} = \frac12\int_4^8 f(u)\,du" />,
    reason: <>Rewrite <Katex tex="dx = du/2" /> and substitute the new limits.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac12(5) = \frac52}" />,
    reason: <>Using the given value of the integral. Matches option <b>E</b>. Option <b>B</b> (<Katex tex="10" />) multiplies by <Katex tex="2" /> instead of dividing, and option <b>D</b> (<Katex tex="\tfrac12" />) is the scale factor without the <Katex tex="5" />. The report's alternative is geometric: a dilation by <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis halves the area, and the translation leaves it unchanged.</>,
  },
]

export default function MethodsQ9_2020() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_4^8 f(x)\,dx = 5" />, then{' '}
          <Katex tex="\displaystyle\int_0^2 f\big(2(x+2)\big)\,dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="12" /> },
        { letter: 'B', content: <Katex tex="10" /> },
        { letter: 'C', content: <Katex tex="8" /> },
        { letter: 'D', content: <Katex tex="\tfrac12" /> },
        { letter: 'E', content: <Katex tex="\tfrac52" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
