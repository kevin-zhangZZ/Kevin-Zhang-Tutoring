// 2021 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 66% correct.
// Counting the asymptotes of a reciprocal secant over an interval. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 66, C: 20, D: 5, E: 2 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{1}{\sec(3x)+\tfrac32}" />,
    reason: <>A vertical asymptote needs the <em>denominator</em> to vanish — and where <Katex tex="\sec(3x)" /> itself blows up, <Katex tex="f\to0" />, so those points are not asymptotes.</>,
  },
  {
    working: <Katex display tex="\sec(3x)+\tfrac32 = 0 \implies \sec(3x) = -\tfrac32 \implies \cos(3x) = -\tfrac23" />,
    reason: <><Katex tex="\sec" /> is the reciprocal of <Katex tex="\cos" />, so invert both sides.</>,
  },
  {
    working: <Katex display tex="x \in \left[-\tfrac\pi6,\ \pi\right] \implies 3x \in \left[-\tfrac\pi2,\ 3\pi\right]" />,
    reason: <>Transform the interval before counting.</>,
  },
  {
    working: <Katex display tex="\cos(u) = -\tfrac23, \ u\in\left[-\tfrac\pi2,3\pi\right]: \ u = 2.30,\ 3.98,\ 8.58" />,
    reason: <><Katex tex="\arccos\!\left(-\tfrac23\right)=2.3005" />; the others are <Katex tex="2\pi-2.3005" /> and <Katex tex="2\pi+2.3005" />. The fourth candidate <Katex tex="-2.30" /> falls below <Katex tex="-\tfrac\pi2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{3 \text{ asymptotes}}" />,
    reason: <>At <Katex tex="x\approx0.77,\ 1.33,\ 2.86" />. Matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ1_2021() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x)=\dfrac{1}{\sec(3x)+\tfrac32}" />.
          <br />
          The number of asymptotes
          that the graph of <Katex tex="f" /> has in the interval{' '}
          <Katex tex="\left[-\tfrac\pi6,\ \pi\right]" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="5" /> },
        { letter: 'E', content: <Katex tex="6" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
