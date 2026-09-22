// 2024 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 53% correct.
// A hybrid density: find k from total area 1, then integrate only as far as 0.5. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 53, C: 30, D: 7 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-3}^{0}\left(\frac{x}{6}+k\right)dx+\int_{0}^{1}\left(-\frac{x}{2}+k\right)dx = 1" />,
    reason: 'Total area under any density is 1 — this is what fixes k.',
  },
  {
    working: <Katex display tex="\left[\frac{x^2}{12}+kx\right]_{-3}^{0}+\left[-\frac{x^2}{4}+kx\right]_{0}^{1} = \left(-\frac34+3k\right)+\left(-\frac14+k\right)" />,
    reason: 'Two straight-line pieces, so this is just two trapezium areas if you prefer to do it geometrically.',
  },
  {
    working: <Katex display tex="4k-1 = 1 \implies k = \frac12" />,
    reason: 'Positive, as required.',
  },
  {
    working: <Katex display tex="\Pr(X<0.5) = \int_{-3}^{0}\left(\frac{x}{6}+\frac12\right)dx+\int_{0}^{0.5}\left(-\frac{x}{2}+\frac12\right)dx" />,
    reason: <>Both branches contribute — <Katex tex="0.5" /> is in the <em>second</em> branch, so the whole of the first is included.</>,
  },
  {
    working: <Katex display tex="= \left(-\frac34+\frac32\right)+\left(-\frac{1}{16}+\frac14\right) = \frac34+\frac{3}{16}" />,
    reason: 'The most common error is to stop after the second piece and answer 3/16 — option C, chosen by 30%.',
  },
  {
    working: <Katex display tex="\boxed{\frac{12}{16}+\frac{3}{16} = \frac{15}{16}}" />,
    reason: <>Option <b>B</b>. A sanity check: the interval <Katex tex="[-3,0)" /> is six times as wide as <Katex tex="[0,0.5)" />, so a probability well above <Katex tex="\tfrac12" /> is exactly what to expect.</>,
  },
]

export default function MethodsQ14_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Let <Katex tex="h" /> be the probability density function for a continuous random
            variable <Katex tex="X" />, where
          </p>
          <Katex
            display
            tex="h(x)=\begin{cases}\dfrac{x}{6}+k & -3\le x<0\\[6pt] -\dfrac{x}{2}+k & 0\le x\le1\\[6pt] 0 & \text{elsewhere}\end{cases}"
          />
          <p>
            and <Katex tex="k" /> is a positive real number.
          </p>
          <p>
            The value of <Katex tex="\Pr(X<0.5)" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac12" /> },
        { letter: 'B', content: <Katex tex="\frac{15}{16}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\frac{3}{16}" /> },
        { letter: 'D', content: <Katex tex="\frac{49}{48}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
