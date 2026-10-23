// 2024 Mathematical Methods NHT — Exam 2, MCQ 4. The NHT report gives the answer key only, with
// no statistics. Calculus: a cubic's point of inflection and the gradient of a line through it.
// Question text transcribed from the original paper. Solution is original; the answer A agrees
// with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}x^3-x^2-2x&=x(x^2-x-2)\\&=x(x-2)(x+1)\end{aligned}" />,
    reason: <>Take out the common factor <Katex tex="x" />, then factorise the quadratic. The <Katex tex="x" />-intercepts are at <Katex tex="x=-1,\,0,\,2" />, so the <b>positive</b> one is <Katex tex="(2,0)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{dy}{dx}&=3x^2-2x-2\\ \frac{d^2y}{dx^2}&=6x-2\end{aligned}" />,
    reason: <>A point of inflection is where the concavity changes: the second derivative is zero and changes sign.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}6x-2=0\ &\Rightarrow\ x=\tfrac13\\ y&=\tfrac1{27}-\tfrac19-\tfrac23=-\tfrac{20}{27}\end{aligned}" />,
    reason: <><Katex tex="6x-2" /> changes sign at <Katex tex="x=\tfrac13" />. Substitute into the cubic for the <Katex tex="y" />-coordinate: <Katex tex="\tfrac{1-3-18}{27}" />.</>,
  },
  {
    working: <Katex display tex="m=\frac{0-\left(-\tfrac{20}{27}\right)}{2-\tfrac13}=\frac{20}{27}\times\frac35=\frac49" />,
    reason: <>Gradient through <Katex tex="\left(\tfrac13,-\tfrac{20}{27}\right)" /> and <Katex tex="(2,0)" />: rise over run.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac49}" />,
    reason: <>Matches option <b>A</b>. Sanity check: the inflection point is below the axis and to the left of <Katex tex="(2,0)" />, so the line rises to the right and the gradient is positive.</>,
    more: <>Option E, <Katex tex="-\tfrac{20}{9}" />, is the gradient from the origin to the inflection point: it uses the intercept at <Katex tex="x=0" />, which isn&apos;t positive.</>,
  },
]

export default function MethodsQ4_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          A straight line passes through the positive <Katex tex="x" />-intercept of the curve of the cubic <Katex tex="y=x^3-x^2-2x" /> and also through its point of inflection.
          <br />
          The gradient of this line is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac49" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac23" /> },
        { letter: 'C', content: <Katex tex="\dfrac12" /> },
        { letter: 'D', content: <Katex tex="-\dfrac{15}{7}" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{20}{9}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
