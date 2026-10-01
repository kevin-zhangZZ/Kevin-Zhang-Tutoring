// 2021 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 48% correct.
// Conditional probability of an equal split of heads and tails, given at least one head, when
// four fair coins are tossed. Question text transcribed from the original paper. Solution is
// original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 11, C: 18, D: 48, E: 8 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="X\sim\mathrm{Bi}\left(4,\tfrac12\right)" />
      <br />
      <Katex tex="\Pr(X=2\mid X\ge1)" />
      <br />
      <Katex tex="=\dfrac{\Pr(X=2)}{\Pr(X\ge1)}" />
      <br />
      <Katex tex="=\dfrac{0.375}{0.9375}" />
      <br />
      <Katex tex="=\dfrac25" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X = \text{number of heads}, \quad X\sim\mathrm{Bi}\big(4,\tfrac12\big)" />,
    reason: <>4 independent tosses (trials), each a head with probability <Katex tex="\tfrac12" />, so the number of heads is binomial.</>,
  },
  {
    working: <Katex display tex="\text{equal heads and tails} \iff X=2" />,
    reason: <>Translate the event into a statement about <Katex tex="X" />: an even split of 4 coins is 2 heads and 2 tails.</>,
  },
  {
    working: <Katex display tex="\Pr(X=2) = \binom{4}{2}\left(\tfrac12\right)^4 = \frac{6}{16} = \frac38" />,
    reason: <>Binomial probability formula: <Katex tex="\binom42=6" /> ways to place the 2 heads. On CAS, <Cas fn="binomPdf">binomPdf(4, 0.5, 2)</Cas> = 0.375.</>,
  },
  {
    working: <Katex display tex="\Pr(X\geq1) = 1-\Pr(X=0) = 1-\left(\tfrac12\right)^4 = \tfrac{15}{16}" />,
    reason: <>"At least one head" is everything except "no heads at all", so use the complement. On CAS, <Cas fn="binomCdf">binomCdf(4, 0.5, 1, 4)</Cas> = 0.9375.</>,
  },
  {
    working: <Katex display tex="\Pr(X=2\cap X\geq1) = \Pr(X=2)" />,
    reason: <>Every outcome with 2 heads already has at least 1 head, so the "and" event is just <Katex tex="X=2" /> — no extra work needed for the intersection.</>,
  },
  {
    working: <Katex display tex="\Pr(X=2\mid X\geq1) = \frac{\Pr(X=2)}{\Pr(X\geq1)} = \frac{3/8}{15/16}" />,
    reason: <>Definition of conditional probability, <Katex tex="\Pr(A\mid B)=\dfrac{\Pr(A\cap B)}{\Pr(B)}" />. Dividing by <Katex tex="\Pr(X\geq1)" /> is what "given at least one head" does: only the outcomes with a head are now counted.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac38\times\frac{16}{15} = \frac{48}{120} = \frac25}" />,
    reason: <>Matches option <b>D</b>. Check by listing: of the 16 equally likely outcomes, 15 have at least one head, and 6 of those (HHTT, HTHT, HTTH, THHT, THTH, TTHH) have two of each, giving <Katex tex="\tfrac{6}{15}=\tfrac25" />.</>,
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
