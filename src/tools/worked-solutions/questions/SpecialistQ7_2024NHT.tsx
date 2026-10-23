// 2024 Specialist NHT — Exam 2, MCQ 7. The NHT report gives the answer key only, with no
// statistics. Differential equations: two steps of Euler's method for dy/dx = 1 + 2y, f(0) = 1,
// h = 0.5. Question text transcribed from the original paper. Solution is original; the answer E
// agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y_{n+1}=y_n+h\,\frac{dy}{dx}\Big|_{(x_n,\,y_n)},\quad h=0.5" />,
    reason: <>Euler&apos;s method: from the current point, move along the tangent line for a horizontal distance <Katex tex="h" />. Getting from <Katex tex="x=0" /> to <Katex tex="x=1" /> in steps of <Katex tex="0.5" /> takes <b>two</b> steps.</>,
    more: <>Here the gradient <Katex tex="\tfrac{dy}{dx}=1+2y" /> depends only on <Katex tex="y" />, so at each step substitute the current <Katex tex="y" />-value.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x_1=0.5:\quad y_1&=1+0.5(1+2\times1)\\&=1+1.5=2.5\end{aligned}" />,
    reason: <>Step 1 starts at <Katex tex="(0,\,1)" />, where the gradient is <Katex tex="1+2(1)=3" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x_2=1:\quad y_2&=2.5+0.5(1+2\times2.5)\\&=2.5+3=5.5\end{aligned}" />,
    reason: <>Step 2 starts at <Katex tex="(0.5,\,2.5)" />, where the gradient is <Katex tex="1+2(2.5)=6" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(1)\approx5.5}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Option <b>B</b> (2.5) stops after one step, which is only the estimate of <Katex tex="f(0.5)" />. Sanity check: the exact solution is <Katex tex="y=\tfrac32e^{2x}-\tfrac12" />, so <Katex tex="f(1)\approx10.6" />; the curve is concave up and getting steeper, so Euler&apos;s tangent steps underestimate, as expected.</>,
  },
]

export default function SpecialistQ7_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="y=f(x)" /> be the solution to the differential equation <Katex tex="\dfrac{dy}{dx}=1+2y" /> with
          the initial condition <Katex tex="f(0)=1" />.
          <br />
          What is the approximation for <Katex tex="f(1)" /> using Euler&apos;s method, starting at <Katex tex="x=0" /> with
          a step size of <Katex tex="0.5" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1.5" /> },
        { letter: 'B', content: <Katex tex="2.5" /> },
        { letter: 'C', content: <Katex tex="3.5" /> },
        { letter: 'D', content: <Katex tex="4.5" /> },
        { letter: 'E', content: <Katex tex="5.5" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
