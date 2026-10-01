// 2023 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 60% correct.
// A percentile of a two-piece density, and deciding which piece it falls in. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 60, C: 14, D: 13, E: 5 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_1^{6}\frac{x-1}{20}\,dx = \left[\frac{(x-1)^2}{40}\right]_1^{6} = \frac{25}{40} = \frac58" />,
    reason: <>Before solving, find which piece of <Katex tex="g" /> the value <Katex tex="k" /> lies in. This is the probability held by the first piece, from <Katex tex="x=1" /> to <Katex tex="x=6" />.</>,
  },
  {
    working: <Katex display tex="0.35 < \tfrac58 = 0.625 \implies k \text{ lies in } [1,6)" />,
    reason: <>The first piece already holds more than <Katex tex="0.35" />, so an area of <Katex tex="0.35" /> is reached before <Katex tex="x=6" />. Only the first rule is needed.</>,
  },
  {
    working: <Katex display tex="\Pr(X<k) = \int_1^{k}\frac{x-1}{20}\,dx = \frac{(k-1)^2}{40}" />,
    reason: <>The area to the left of <Katex tex="k" />. It starts at <Katex tex="x=1" />, not <Katex tex="x=0" />, because <Katex tex="g(x)=0" /> for <Katex tex="x<1" />.</>,
  },
  {
    working: <Katex display tex="\frac{(k-1)^2}{40} = 0.35 \implies (k-1)^2 = 14" />,
    reason: <><Katex tex="0.35\times40=14" />.</>,
  },
  {
    working: <Katex display tex="k-1 = \pm\sqrt{14} \implies k = 1\pm\sqrt{14}" />,
    reason: <><Katex tex="k=1-\sqrt{14}\approx-2.74" /> is rejected: <Katex tex="k" /> must lie in <Katex tex="[1,6)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \sqrt{14}+1}" />,
    reason: <>Matches option <b>B</b>; about <Katex tex="4.74" />, inside <Katex tex="[1,6)" /> ✓. Option <b>D</b> (and <b>E</b>, its negative root) comes from integrating from <Katex tex="0" /> instead of <Katex tex="1" />: <Katex tex="\int_0^k\frac{x-1}{20}\,dx=\frac{k^2-2k}{40}=0.35" /> gives <Katex tex="(k-1)^2=15" />. Option <b>A</b>, <Katex tex="\sqrt{14}-1" />, would come from <Katex tex="(k+1)^2=14" />, the shift the wrong way.</>,
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
