// 2023 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 29% correct. Number of
// local minima of sin(ax) on [−aπ, aπ], as a general pattern in a. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 9, C: 22, D: 26, E: 29 },
  answer: 'E',
  noAnswer: 1,
  comment: <>The number of local minima is <Katex tex="a^2" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\sin(ax) \text{ has period } \frac{2\pi}{a}" />,
    reason: <>Standard period of <Katex tex="\sin(ax)" />.</>,
  },
  {
    working: <Katex display tex="\text{Domain width} = a\pi-(-a\pi) = 2a\pi" />,
    reason: <>Total width of <Katex tex="[-a\pi,a\pi]" />.</>,
  },
  {
    working: <Katex display tex="\text{Number of full periods} = \frac{2a\pi}{2\pi/a} = a^2" />,
    reason: <>Divide the domain width by the period — this comes out to a whole number, so the domain contains exactly <Katex tex="a^2" /> complete cycles of the sine curve.</>,
  },
  {
    working: <>Each full period of a sine curve has exactly <b>one</b> local minimum.</>,
    reason: 'Standard property of sin.',
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><Katex tex="a=1" />: domain <Katex tex="[-\pi,\pi]" />, 1 period, 1 local minimum ✓</span>
        <span><Katex tex="a=2" />: domain <Katex tex="[-2\pi,2\pi]" />, 4 periods, 4 local minima ✓</span>
        <span><Katex tex="a=3" />: domain <Katex tex="[-3\pi,3\pi]" />, 9 periods, 9 local minima ✓</span>
      </div>
    ),
    reason: 'Check the pattern against small cases.',
  },
  {
    working: <Katex display tex="\boxed{a^2}" />,
    reason: <>Matches option <b>E</b>.</>,
  },
]

export default function MethodsQ18_2023() {
  return (
    <MCQShell
      question={
        <p>
          Consider the function <Katex tex="f:[-a\pi,a\pi]\to\mathbb{R}" />, <Katex tex="f(x)=\sin(ax)" />, where{' '}
          <Katex tex="a" /> is a positive integer.
          <br />
          The number of local minima in the graph of <Katex tex="y=f(x)" /> is always equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="4" /> },
        { letter: 'C', content: <Katex tex="a" /> },
        { letter: 'D', content: <Katex tex="2a" /> },
        { letter: 'E', content: <Katex tex="a^2" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
