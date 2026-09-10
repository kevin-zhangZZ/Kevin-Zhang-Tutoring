// 2022 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 39% correct. What a
// positive average rate of change combined with a negative instantaneous rate of change at
// the midpoint implies about a function. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 39, B: 25, C: 16, D: 11, E: 8 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\dfrac{g(b)-g(a)}{b-a}>0 \;\implies\; g(b)>g(a)" />, but <Katex tex="g'\!\left(\dfrac{a+b}{2}\right)<0" /> —
      so <Katex tex="g" /> is a many-to-one function (e.g. <Katex tex="g(x)=(x-1)(x-2)(x-2.5)" />).
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{g(b)-g(a)}{b-a} > 0 \;\implies\; g(b) > g(a)" />,
    reason: 'The function ends higher than it starts, over [a, b].',
  },
  {
    working: <Katex display tex="g'\!\left(\frac{a+b}{2}\right) < 0" />,
    reason: <>But somewhere in the middle of the interval, <Katex tex="g" /> is momentarily <b>decreasing</b>.</>,
  },
  {
    working: <>Since <Katex tex="g" /> is a well-defined function, it can never be one-to-many.</>,
    reason: 'Rules out option B on definitional grounds alone.',
  },
  {
    working: <>If <Katex tex="g" /> were strictly increasing, one-to-one, or (obviously) strictly decreasing, it could never have a negative derivative partway through while still ending higher than it started.</>,
    reason: <>Rules out options C, D and E — each of those properties is incompatible with a dip in the middle of an overall rise.</>,
  },
  {
    working: <>So <Katex tex="g" /> must rise, then dip down (crossing back through some values it already reached), then rise again to finish above where it started.</>,
    reason: <>This "up-down-up" shape means some <Katex tex="y" />-value is reached more than once — many inputs sharing one output.</>,
  },
  {
    working: <Katex display tex="\boxed{g \text{ is many-to-one}}" />,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function MethodsQ17_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A function <Katex tex="g" /> is continuous on the domain <Katex tex="x\in[a,b]" /> and has the following
            properties:
          </p>
          <ul className="list-disc pl-5 mb-2 space-y-1">
            <li>The average rate of change of <Katex tex="g" /> between <Katex tex="x=a" /> and <Katex tex="x=b" /> is positive.</li>
            <li>The instantaneous rate of change of <Katex tex="g" /> at <Katex tex="x=\dfrac{a+b}{2}" /> is negative.</li>
          </ul>
          <p>Therefore, on the interval <Katex tex="x\in[a,b]" />, the function must be</p>
        </>
      }
      options={[
        { letter: 'A', content: 'many-to-one.', isAnswer: true },
        { letter: 'B', content: 'one-to-many.' },
        { letter: 'C', content: 'one-to-one.' },
        { letter: 'D', content: 'strictly decreasing.' },
        { letter: 'E', content: 'strictly increasing.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
