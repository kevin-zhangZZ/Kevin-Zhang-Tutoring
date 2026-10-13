// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 4. VCAA examination report: 77% correct.
// Which listed point lies on the tangent to y = x² at (2, 4). Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 77, C: 6, D: 6, E: 4 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = 2x \implies m = 2(2) = 4" />,
    reason: <>The tangent's gradient is the derivative at the point of contact, <Katex tex="x=2" />.</>,
  },
  {
    working: <Katex display tex="y-4 = 4(x-2)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" /> with <Katex tex="m=4" /> through <Katex tex="(2,4)" />.</>,
  },
  {
    working: <Katex display tex="y = 4x-4" />,
    reason: <>Expand and rearrange into <Katex tex="y=mx+c" />, which makes each option quick to test.</>,
  },
  {
    working: <Katex display tex="x=3: \quad y = 12-4 = 8 \ \checkmark" />,
    reason: <>Option B, <Katex tex="(3,8)" />, satisfies the equation, so it lies on the tangent.</>,
  },
  {
    working: <Katex display tex="\boxed{(3,8)}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>The others fail when substituted into <Katex tex="y=4x-4" />: at <Katex tex="x=1" /> the line gives <Katex tex="y=0" />, not <Katex tex="-4" /> (A) or <Katex tex="8" /> (D); at <Katex tex="x=-2" /> it gives <Katex tex="-12" />, not <Katex tex="6" /> (C); at <Katex tex="x=4" /> it gives <Katex tex="12" />, not <Katex tex="-4" /> (E). Make sure you test the points in the tangent, not in the curve <Katex tex="y=x^2" />.</>,
  },
]

export default function MethodsQ4_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Consider the tangent to the graph of <Katex tex="y=x^2" /> at the point{' '}
            <Katex tex="(2,4)" />.
          </p>
          <p>Which of the following points lies on this tangent?</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="(1,-4)" /> },
        { letter: 'B', content: <Katex tex="(3,8)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="(-2,6)" /> },
        { letter: 'D', content: <Katex tex="(1,8)" /> },
        { letter: 'E', content: <Katex tex="(4,-4)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
