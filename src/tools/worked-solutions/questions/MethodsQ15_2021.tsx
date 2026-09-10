// 2021 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 48% correct.
// Conditional probability of an equal split of heads and tails, given at least one head, when
// four fair coins are tossed. Question text transcribed from the original paper. Solution is
// original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 11, C: 18, D: 48, E: 8 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="X\sim\mathrm{Bi}\big(4,\tfrac12\big),\quad \Pr(X=2\mid X\geq1) = \dfrac{\Pr(X=2)}{\Pr(X\geq1)} = \dfrac{0.375}{0.9375} = \dfrac25" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X = \text{number of heads}, \quad X\sim\mathrm{Bi}\big(4,\tfrac12\big)" />,
    reason: '4 independent fair-coin tosses.',
  },
  {
    working: <>"Equal number of heads and tails" out of 4 coins means exactly 2 heads and 2 tails.</>,
    reason: 'Translate the event into a statement about X.',
  },
  {
    working: <Katex display tex="\Pr(X=2) = \binom{4}{2}\left(\tfrac12\right)^4 = \frac{6}{16} = \frac38" />,
    reason: 'Binomial probability formula.',
  },
  {
    working: <Katex display tex="\Pr(X\geq1) = 1-\Pr(X=0) = 1-\left(\tfrac12\right)^4 = 1-\tfrac{1}{16} = \tfrac{15}{16}" />,
    reason: 'Complement of "no heads at all".',
  },
  {
    working: <>The event <Katex tex="\{X=2\}" /> is entirely contained within <Katex tex="\{X\geq1\}" /> (2 heads certainly means at least 1 head).</>,
    reason: <>So <Katex tex="\Pr(X=2 \text{ and } X\geq1) = \Pr(X=2)" /> — no extra work needed for the intersection.</>,
  },
  {
    working: <Katex display tex="\Pr(X=2\mid X\geq1) = \frac{\Pr(X=2)}{\Pr(X\geq1)} = \frac{3/8}{15/16}" />,
    reason: 'Definition of conditional probability.',
  },
  {
    working: <Katex display tex="\boxed{\frac38\times\frac{16}{15} = \frac{48}{120} = \frac25}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function MethodsQ15_2021() {
  return (
    <MCQShell
      question={
        <p>
          Four fair coins are tossed at the same time.
          <br />
          The outcome for each coin is independent of the outcome for any other coin.
          <br />
          The probability that there is an equal number of heads and tails, given that there is at least one head,
          is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac12" /> },
        { letter: 'B', content: <Katex tex="\tfrac13" /> },
        { letter: 'C', content: <Katex tex="\tfrac34" /> },
        { letter: 'D', content: <Katex tex="\tfrac25" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\tfrac47" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
