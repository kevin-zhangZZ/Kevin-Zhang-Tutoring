// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 20. VCAA examination report: 44% correct.
// The average value of a piecewise-linear function read off its graph. Question text
// transcribed from the original paper; the figure is a crop of VCAA's own artwork. Solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2014-mcq20-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 12, C: 30, D: 44, E: 6 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      From inspection, the average value of <Katex tex="h" /> is either 6 or 7.{' '}
      <Katex tex="(11-1)\times\text{average value} = \text{area under the curve}" /> = area of
      the rectangle + area of the triangle. Hence{' '}
      <Katex tex="10\times\text{average} = 10\times4+5\times6" />, average value = 7.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\bar h = \frac{1}{b-a}\int_a^b h(x)\,dx" />,
    reason: <>The average value of a function. Here the domain is <Katex tex="[1,11]" />, read off the endpoints of the graph.</>,
  },
  {
    working: <Katex display tex="b-a = 11-1 = 10" />,
    reason: <>The width. Using <Katex tex="11" /> or <Katex tex="12" /> here is what produces the other options.</>,
  },
  {
    working: <Katex display tex="\int_1^{11}h(x)\,dx = \text{area under the graph}" />,
    reason: <><Katex tex="h" /> is made of two straight segments and never goes below the axis, so the integral is just a piece of geometry — no antidifferentiation needed.</>,
  },
  {
    working: <Katex display tex="\text{rectangle: } 10\times4 = 40" />,
    reason: <>The whole shape sits on a base of height 4 running from <Katex tex="x=1" /> to <Katex tex="x=11" />.</>,
  },
  {
    working: <Katex display tex="\text{triangle: } \tfrac12\times10\times6 = 30" />,
    reason: <>On top sits a triangle of base 10 (from 1 to 11) rising a further <Katex tex="10-4=6" /> at its apex <Katex tex="(6,10)" />.</>,
  },
  {
    working: <Katex display tex="\bar h = \frac{40+30}{10} = \frac{70}{10}" />,
    reason: <>Total area over total width.</>,
  },
  {
    working: <Katex display tex="\boxed{7}" />,
    reason: <>Option D. A check: the average must lie between the minimum 4 and the maximum 10, and nearer the middle — 7 is plausible, 10 is not.</>,
  },
]

export default function MethodsQ20_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The graph of a function, <Katex tex="h" />, is shown below.</p>
          <p>The average value of <Katex tex="h" /> is</p>
        </>
      }
      diagram={
        <img
          src={graphSrc}
          alt="A piecewise-linear graph rising in a straight line from (1, 4) to a peak at (6, 10), then falling in a straight line to (11, 4) — from the original 2014 VCAA exam paper"
          className="w-full max-w-[340px]"
        />
      }
      options={[
        { letter: 'A', content: <Katex tex="4" /> },
        { letter: 'B', content: <Katex tex="5" /> },
        { letter: 'C', content: <Katex tex="6" /> },
        { letter: 'D', content: <Katex tex="7" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="10" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
