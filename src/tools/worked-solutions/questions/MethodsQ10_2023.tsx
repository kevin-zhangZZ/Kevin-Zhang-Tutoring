// 2023 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 60% correct.
// A percentile of a two-piece density, and deciding which piece it falls in. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 60, C: 14, D: 13, E: 5 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_1^{6}\frac{x-1}{20}\,dx = \left[\frac{(x-1)^2}{40}\right]_1^{6} = \frac{25}{40} = \frac58" />,
    reason: 'How much probability the first piece carries. Work this out before anything else.',
  },
  {
    working: <Katex display tex="0.35 < \tfrac58 = 0.625 \implies k \text{ lies in } [1,6)" />,
    reason: 'So only the first rule matters — using the second piece is what produces the other options.',
  },
  {
    working: <Katex display tex="\Pr(X<k) = \int_1^{k}\frac{x-1}{20}\,dx = \frac{(k-1)^2}{40}" />,
    reason: 'The cumulative area from the left endpoint.',
  },
  {
    working: <Katex display tex="\frac{(k-1)^2}{40} = 0.35 \implies (k-1)^2 = 14" />,
    reason: <><Katex tex="0.35\times40=14" />.</>,
  },
  {
    working: <Katex display tex="k-1 = \pm\sqrt{14} \implies k = 1\pm\sqrt{14}" />,
    reason: <><Katex tex="1-\sqrt{14}\approx-2.74" /> is outside the support, so it is rejected.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \sqrt{14}+1}" />,
    reason: <>Option <b>B</b>; about <Katex tex="4.74" />, comfortably inside <Katex tex="[1,6)" /> ✓.</>,
  },
]

export default function MethodsQ10_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            A continuous random variable <Katex tex="X" /> has the following probability
            density function.
          </p>
          <Katex
            display
            tex="g(x)=\begin{cases}\dfrac{x-1}{20} & 1\le x<6\\[6pt]\dfrac{9-x}{12} & 6\le x\le9\\[6pt]0 & \text{elsewhere}\end{cases}"
          />
          <p>
            The value of <Katex tex="k" /> such that <Katex tex="\Pr(X<k)=0.35" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt{14}-1" /> },
        { letter: 'B', content: <Katex tex="\sqrt{14}+1" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\sqrt{15}-1" /> },
        { letter: 'D', content: <Katex tex="\sqrt{15}+1" /> },
        { letter: 'E', content: <Katex tex="1-\sqrt{15}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
