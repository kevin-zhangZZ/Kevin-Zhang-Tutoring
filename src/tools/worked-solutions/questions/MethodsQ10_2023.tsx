// 2023 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 60% correct.
// A percentile of a two-piece density, and deciding which piece it falls in. Question text transcribed from the original paper.
// Solution is original.
// Oct 2026 Concise/Detailed pass (no widget: 60% correct, not a qualifying part): option analysis moved
// to the last row's `more`; row 3's `more` shows why a lower limit of 0 adds a negative area (C, D, E's 15);
// CAS line (row 5) and a second-piece note added as `more`; the last `more` says C is both slips at once.
// Numbers re-checked in sympy.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
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
    more: (
      <>
        Had the target been bigger than <Katex tex="\tfrac58" />, say <Katex tex="\Pr(X<k)=0.8" />, the whole first
        piece would be used up and <Katex tex="k" /> would lie in the second piece:{' '}
        <Katex tex="\tfrac58+\int_6^{k}\frac{9-x}{12}\,dx=0.8" />. Finding the first piece&apos;s total first tells you
        which equation to write.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(X<k) = \int_1^{k}\frac{x-1}{20}\,dx = \frac{(k-1)^2}{40}" />,
    reason: <>The area to the left of <Katex tex="k" />. It starts at <Katex tex="x=1" />, not <Katex tex="x=0" />, because <Katex tex="g(x)=0" /> for <Katex tex="x<1" />.</>,
    more: (
      <>
        The rule <Katex tex="\tfrac{x-1}{20}" /> only applies from <Katex tex="x=1" />. Between <Katex tex="0" /> and{' '}
        <Katex tex="1" /> it would be negative, and a density can never be negative, which is why <Katex tex="g" /> is{' '}
        <Katex tex="0" /> there. Integrating the rule from <Katex tex="0" /> adds that negative piece,{' '}
        <Katex tex="\int_0^1\frac{x-1}{20}\,dx=-\tfrac1{40}" />, so the equation becomes{' '}
        <Katex tex="\frac{(k-1)^2}{40}-\frac1{40}=0.35" />, i.e. <Katex tex="(k-1)^2=15" />: the{' '}
        <Katex tex="15" /> that appears in options C, D and E.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{(k-1)^2}{40} = 0.35 \implies (k-1)^2 = 14" />,
    reason: <><Katex tex="0.35\times40=14" />.</>,
  },
  {
    working: <Katex display tex="k-1 = \pm\sqrt{14} \implies k = 1\pm\sqrt{14}" />,
    reason: <><Katex tex="k=1-\sqrt{14}\approx-2.74" /> is rejected: <Katex tex="k" /> must lie in <Katex tex="[1,6)" />.</>,
    more: (
      <>
        On CAS, this line and the two before it are one command:{' '}
        <Cas fn="solve">solve(∫((x-1)/20, x, 1, k) = 0.35, k) | 1 ≤ k &lt; 6</Cas>. The restriction keeps only the
        solution inside the first piece.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{k = \sqrt{14}+1}" />,
    reason: <>Matches option <b>B</b>; about <Katex tex="4.74" />, inside <Katex tex="[1,6)" /> ✓.</>,
    more: (
      <>
        Options <b>D</b> and <b>E</b> are the two roots of <Katex tex="(k-1)^2=15" />, which comes from integrating
        from <Katex tex="0" /> (explained above); <b>E</b> is negative, so it can&apos;t even be a value of{' '}
        <Katex tex="X" />. Option <b>C</b>, the most popular wrong answer, makes that slip <em>and</em> a second one:
        from <Katex tex="(k-1)^2=15" /> it takes <Katex tex="k-1=\sqrt{15}" /> and then subtracts the{' '}
        <Katex tex="1" /> instead of adding it, giving <Katex tex="k=\sqrt{15}-1" />. Option <b>A</b> is the same sign
        slip on the correct <Katex tex="(k-1)^2=14" />. Substituting back catches a sign slip:{' '}
        <Katex tex="k=\sqrt{15}-1\approx2.87" /> gives <Katex tex="\Pr(X<k)=\tfrac{(2.87-1)^2}{40}\approx0.09" />, nowhere
        near <Katex tex="0.35" />.
      </>
    ),
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
