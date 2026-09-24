// 2021 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 63% correct.
// Matching two average values over the same interval. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 6, C: 14, D: 10, E: 63 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value} = \frac{1}{b-a}\int_a^b y\,dx" />,
    reason: <>Both averages are over <Katex tex="[0,\pi]" />, so the <Katex tex="\tfrac1\pi" /> is common and can be cancelled at the end.</>,
  },
  {
    working: <Katex display tex="\frac1\pi\int_0^\pi\sin(x)\,dx = \frac1\pi\left[-\cos(x)\right]_0^\pi = \frac{2}{\pi}" />,
    reason: <>The target value.</>,
  },
  {
    working: <Katex display tex="\frac1\pi\int_0^\pi\cos\!\left(kx-\tfrac\pi2\right)dx = \frac{1}{k\pi}\left[\sin\!\left(kx-\tfrac\pi2\right)\right]_0^\pi" />,
    reason: <>The chain rule contributes the <Katex tex="\tfrac1k" />.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{k\pi}\left(\sin\!\left(k\pi-\tfrac\pi2\right)+1\right)" />,
    reason: <><Katex tex="\sin\!\left(-\tfrac\pi2\right)=-1" />, so subtracting it adds 1.</>,
  },
  {
    working: <Katex display tex="\frac{1}{k}\left(\sin\!\left(k\pi-\tfrac\pi2\right)+1\right) = 2" />,
    reason: <>Setting the two averages equal and cancelling <Katex tex="\tfrac1\pi" />.</>,
  },
  {
    working: <Katex display tex="k = \tfrac12: \ 2\left(\sin(0)+1\right) = 2 \ \checkmark" />,
    reason: <>Substituting <Katex tex="k=\tfrac12" /> makes the argument <Katex tex="\tfrac\pi2-\tfrac\pi2=0" />. With five numeric options, testing beats solving.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \tfrac12}" />,
    reason: <>Matches option <b>E</b>. At <Katex tex="k=\tfrac12" /> the curve is <Katex tex="\cos\!\left(\tfrac x2-\tfrac\pi2\right)=\sin\!\left(\tfrac x2\right)" />, and no other option satisfies the equation.</>,
  },
]

export default function MethodsQ14_2021() {
  return (
    <MCQShell
      question={
        <p>
          A value of <Katex tex="k" /> for which the average value of{' '}
          <Katex tex="y=\cos\!\left(kx-\tfrac\pi2\right)" /> over the interval{' '}
          <Katex tex="[0,\pi]" /> is equal to the average value of{' '}
          <Katex tex="y=\sin(x)" /> over the same interval is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac16" /> },
        { letter: 'B', content: <Katex tex="\tfrac15" /> },
        { letter: 'C', content: <Katex tex="\tfrac14" /> },
        { letter: 'D', content: <Katex tex="\tfrac13" /> },
        { letter: 'E', content: <Katex tex="\tfrac12" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
