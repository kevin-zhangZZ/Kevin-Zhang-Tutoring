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
    reason: <>Differentiating with <Katex tex="a" /> carried through as a constant.</>,
  },
  {
    working: <Katex display tex="\text{at } x=1: \ y = 2-a, \quad m = 3-2a" />,
    reason: <>Both the point and the gradient depend on the unknown.</>,
  },
  {
    working: <Katex display tex="y-(2-a) = (3-2a)(x-1)" />,
    reason: <>Point–gradient form for the tangent.</>,
  },
  {
    working: <Katex display tex="\text{through } (0,0): \ -(2-a) = (3-2a)(-1)" />,
    reason: <>Substituting the origin — the one extra condition that pins the unknown.</>,
  },
  {
    working: <Katex display tex="a-2 = 2a-3 \implies \boxed{a = 1}" />,
    reason: <>Matches option <b>B</b>. Check: at <Katex tex="a=1" /> the tangent is <Katex tex="y=x" />, which does pass through the origin, and touches <Katex tex="y=x^3-x^2+1" /> at <Katex tex="(1,1)" />.</>,
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
