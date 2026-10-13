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
      the rectangle + area of the triangle. Hence,{' '}
      <Katex tex="10\times\text{average value} = 10\times4+5\times6" />
      <br />
      average value = 7
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\bar h = \frac{1}{b-a}\int_a^b h(x)\,dx" />,
    reason: <>The average value of a function over its domain. The graph runs from <Katex tex="x=1" /> to <Katex tex="x=11" />, so the domain is <Katex tex="[1,11]" />.</>,
  },
  {
    working: <Katex display tex="b-a = 11-1 = 10" />,
    reason: <>Divide by the width of the domain, measured from the left endpoint <Katex tex="x=1" />, not from the origin.</>,
    more: <>Dividing the area 70 by 11 instead (measuring from <Katex tex="x=0" />) gives about 6.4, which rounds to option C, the most popular wrong answer (30%).</>,
  },
  {
    working: <Katex display tex="\int_1^{11}h(x)\,dx = \text{area under the graph}" />,
    reason: <><Katex tex="h" /> is two straight segments and never below the <Katex tex="x" />-axis, so the integral is an area. Split it with the line <Katex tex="y=4" /> into a rectangle below and a triangle above.</>,
    more: <>No rule for <Katex tex="h" /> is needed. The split at <Katex tex="y=4" /> is the report's method. Alternatively, cut it at <Katex tex="x=6" /> into two trapeziums, each <Katex tex="\tfrac12(4+10)\times5=35" />, total 70.</>,
  },
  {
    working: <Katex display tex="\text{rectangle: } 10\times4 = 40" />,
    reason: <>Width 10 (from <Katex tex="x=1" /> to <Katex tex="x=11" />), height 4 (the height of <Katex tex="h" /> at both ends).</>,
  },
  {
    working: <Katex display tex="\text{triangle: } \tfrac12\times10\times6 = 30" />,
    reason: <>Base 10 along <Katex tex="y=4" />; the apex <Katex tex="(6,10)" /> is <Katex tex="10-4=6" /> above it.</>,
    more: <>The report writes this triangle as <Katex tex="5\times6" />, which is the same as <Katex tex="\tfrac12\times10\times6" />.</>,
  },
  {
    working: <Katex display tex="\bar h = \frac{40+30}{10} = \frac{70}{10}" />,
    reason: <>Total area divided by the width of the domain.</>,
  },
  {
    working: <Katex display tex="\boxed{7}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>
      A check: the average must lie between the minimum 4 and the maximum 10. Option <b>C</b>{' '}
      (6) is what you get by averaging the three labelled heights,{' '}
      <Katex tex="\tfrac{4+10+4}{3}=6" /> — but the
      average value of a function weights every <Katex tex="x" /> in the domain, not just the
      marked points. Options <b>A</b> (4) and <b>E</b> (10) are just the minimum and maximum
      values of <Katex tex="h" />. Option <b>B</b> (5) is far too low: <Katex tex="h\ge7" /> from{' '}
      <Katex tex="x=3.5" /> to <Katex tex="x=8.5" />, half the domain, and <Katex tex="h\ge4" />{' '}
      everywhere else, so the average is at least <Katex tex="\tfrac{7+4}{2}=5.5" />. In the same way it is at
      most <Katex tex="\tfrac{10+7}{2}=8.5" />, which rules out E. A quick estimate like this
      leaves only 6 or 7, as the report says &ldquo;from inspection&rdquo;.
    </>,
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
        <img loading="lazy" decoding="async"
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
