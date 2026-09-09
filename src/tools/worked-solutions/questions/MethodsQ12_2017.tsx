// 2017 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 45% correct.
// Find the upper endpoint d so that all solutions of sin(2x)=√3/2 on [-π,d] sum to -π.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 18, C: 45, D: 15, E: 11 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(2x) = \frac{\sqrt3}{2}" />,
    reason: <>The reference angle is <Katex tex="\tfrac{\pi}{3}" />, since <Katex tex="\sin\tfrac{\pi}{3}=\tfrac{\sqrt3}{2}" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="2x = \frac{\pi}{3}+2k\pi \quad \text{or} \quad 2x = \frac{2\pi}{3}+2k\pi" />
        <Katex display tex="\implies\; x = \frac{\pi}{6}+k\pi \quad \text{or} \quad x = \frac{\pi}{3}+k\pi" />
      </>
    ),
    reason: 'Sine is positive in the first and second quadrants.',
  },
  {
    working: (
      <>
        <Katex display tex="\text{on } [-\pi,\,\cdot\,]: \quad x = -\frac{5\pi}{6},\ -\frac{2\pi}{3},\ \frac{\pi}{6},\ \frac{\pi}{3},\ \frac{7\pi}{6},\ \dots" />
      </>
    ),
    reason: <>List the solutions in increasing order from each family (<Katex tex="k=-1,0,1,\dots" />), starting at <Katex tex="x=-\pi" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="-\frac{5\pi}{6}-\frac{2\pi}{3}+\frac{\pi}{6}+\frac{\pi}{3}" />
        <Katex display tex="= \frac{(-5-4+1+2)\pi}{6} = -\pi" />
      </>
    ),
    reason: <>Try summing just the first four solutions — up to and including <Katex tex="\tfrac{\pi}{3}" />, before the next one at <Katex tex="\tfrac{7\pi}{6}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-\pi} \ \checkmark" />,
    reason: <>This already matches the target sum of <Katex tex="-\pi" /> — so <Katex tex="d" /> must sit between the 4th solution <Katex tex="\tfrac{\pi}{3}" /> and the 5th, <Katex tex="\tfrac{7\pi}{6}" />, without including the 5th.</>,
  },
  {
    working: <Katex display tex="\boxed{d = \frac{3\pi}{4}} \qquad \left(\frac{\pi}{3} \le \frac{3\pi}{4} < \frac{7\pi}{6}\right)" />,
    reason: <>Matches option <b>C</b> — the only listed value in that range.</>,
  },
]

export default function MethodsQ12_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The sum of the solutions of <Katex tex="\sin(2x) = \dfrac{\sqrt3}{2}" /> over the interval{' '}
            <Katex tex="[-\pi,\,d]" /> is <Katex tex="-\pi" />.
          </p>
          <p>The value of <Katex tex="d" /> could be</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\pi}{6}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{3\pi}{4}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{7\pi}{6}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{3\pi}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
