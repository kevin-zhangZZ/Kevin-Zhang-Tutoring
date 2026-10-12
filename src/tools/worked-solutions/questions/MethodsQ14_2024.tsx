// 2024 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 53% correct.
// A hybrid density: find k from total area 1, then integrate only as far as 0.5. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 53, C: 30, D: 7 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-3}^{0}\left(\frac{x}{6}+k\right)dx+\int_{0}^{1}\left(-\frac{x}{2}+k\right)dx = 1" />,
    reason: <>The total area under any density is 1, and <Katex tex="k" /> is the only unknown — so find it first, integrating each branch over its own interval.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\left[\frac{x^2}{12}+kx\right]_{-3}^{0}\\ &\quad+\left[-\frac{x^2}{4}+kx\right]_{0}^{1}\\ &= \left(-\frac34+3k\right)+\left(-\frac14+k\right)\end{aligned}" />,
    reason: <>Antidifferentiate each branch and substitute the limits; the first bracket is <Katex tex="0-\left(\tfrac{9}{12}-3k\right)" />.</>,
    more: <>Both branches are straight lines, so each integral is also a trapezium area if you prefer geometry. On CAS, define the piecewise function and solve the total-area equation for <Katex tex="k" /> directly.</>,
  },
  {
    working: <Katex display tex="4k-1 = 1 \implies k = \frac12" />,
    reason: <>Positive, as the question requires.</>,
    more: <>With <Katex tex="k=\tfrac12" /> the density is <Katex tex="0" /> at <Katex tex="x=-3" />, rises to <Katex tex="\tfrac12" /> at <Katex tex="x=0" /> and falls back to <Katex tex="0" /> at <Katex tex="x=1" />: its graph is a single triangle of base 4 and height <Katex tex="\tfrac12" />, area 1. Sketching it makes the next step obvious.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr(X<0.5)\\ &= \int_{-3}^{0}\left(\frac{x}{6}+\frac12\right)dx\\ &\quad+\int_{0}^{0.5}\left(-\frac{x}{2}+\frac12\right)dx\end{aligned}" />,
    reason: <><Katex tex="X<0.5" /> covers all of the first branch, <Katex tex="[-3,0)" />, plus the second branch from <Katex tex="0" /> to <Katex tex="0.5" /> — so both integrals are needed, each with its own rule.</>,
    more: <>The two common slips are dropping one branch, or using one rule across the whole interval. Integrating the first rule all the way from <Katex tex="-3" /> to <Katex tex="0.5" /> gives <Katex tex="\tfrac{49}{48}" />, option <b>D</b> — more than 1, so it cannot be a probability. The rule <Katex tex="\tfrac{x}{6}+k" /> only applies for <Katex tex="x<0" />.</>,
  },
  {
    working: <Katex display tex="= \left(-\frac34+\frac32\right)+\left(-\frac{1}{16}+\frac14\right) = \frac34+\frac{3}{16}" />,
    reason: <>Evaluating each integral with <Katex tex="k=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{12}{16}+\frac{3}{16} = \frac{15}{16}}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Check with the complement: <Katex tex="\Pr(X\ge0.5)" /> is the small triangle from <Katex tex="0.5" /> to <Katex tex="1" />, base <Katex tex="\tfrac12" /> and height <Katex tex="h(0.5)=\tfrac14" />, so area <Katex tex="\tfrac12\times\tfrac12\times\tfrac14=\tfrac{1}{16}" />, and <Katex tex="1-\tfrac{1}{16}=\tfrac{15}{16}" />. Option <b>A</b>, <Katex tex="\tfrac12" />, is too small: <Katex tex="\Pr(X<0)=\tfrac34" /> already. Option <b>C</b>, <Katex tex="\tfrac{3}{16}" />, is the second piece alone — it forgets the first branch. Option <b>D</b> is the single-rule slip described above.</>,
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
