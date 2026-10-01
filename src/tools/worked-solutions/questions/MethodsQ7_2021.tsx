// 2021 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 56% correct.
// A tangent through the origin fixes an unknown coefficient. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 56, C: 20, D: 16, E: 3 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^3-ax^2+1 \implies \frac{dy}{dx} = 3x^2-2ax" />,
    reason: <>A tangent needs a gradient, so differentiate. <Katex tex="a" /> is just a number we don't know yet, so treat it like any other constant: <Katex tex="ax^2" /> becomes <Katex tex="2ax" /> and the <Katex tex="+1" /> disappears.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x=1:\quad y &= 1-a+1 = 2-a \\ m &= 3-2a \end{aligned}" />,
    reason: <>Substitute <Katex tex="x=1" /> into <Katex tex="y" /> for the point of contact <Katex tex="(1,\ 2-a)" />, and into <Katex tex="\frac{dy}{dx}" /> for the gradient. Both still contain the unknown <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="y-(2-a) = (3-2a)(x-1)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" /> for the tangent.</>,
  },
  {
    working: <Katex display tex="\text{through } (0,0): \ -(2-a) = (3-2a)(-1)" />,
    reason: <>"Passes through the origin" means <Katex tex="(0,0)" /> satisfies the tangent's equation, so substitute <Katex tex="x=0" /> and <Katex tex="y=0" />. This is the one extra equation needed to find <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="a-2 = 2a-3 \implies \boxed{a = 1}" />,
    reason: <>Matches option <b>B</b>. Check: at <Katex tex="a=1" /> the tangent is <Katex tex="y=x" />, which does pass through the origin, and touches <Katex tex="y=x^3-x^2+1" /> at <Katex tex="(1,1)" />. Option C, <Katex tex="a=\tfrac32" />, is the value that makes the gradient <Katex tex="3-2a" /> zero, but that tangent is the horizontal line <Katex tex="y=\tfrac12" />, which misses the origin. Option D, <Katex tex="a=2" />, comes from dropping the <Katex tex="+1" /> when finding the <Katex tex="y" />-coordinate (<Katex tex="1-a" /> instead of <Katex tex="2-a" />).</>,
  },
]

export default function MethodsQ7_2021() {
  return (
    <MCQShell
      question={
        <p>
          The tangent to the graph of <Katex tex="y=x^3-ax^2+1" /> at <Katex tex="x=1" />{' '}
          passes through the origin.
          <br />
          The value of <Katex tex="a" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac12" /> },
        { letter: 'B', content: <Katex tex="1" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac32" /> },
        { letter: 'D', content: <Katex tex="2" /> },
        { letter: 'E', content: <Katex tex="\tfrac52" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
