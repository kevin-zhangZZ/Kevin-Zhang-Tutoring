// 2014 Mathematical Methods — Exam 2, MCQ 22.
// John throws 4 darts (P(hit)=1/4 each), Rebecca throws 2 darts (P(hit)=1/2 each) —
// find the ratio P(Rebecca hits at least once) : P(John hits at least once).
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow } from '../QuestionParts'

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P(\text{John misses all 4}) = \left(\dfrac34\right)^4 = \dfrac{81}{256}" />,
    reason: <>John hits with probability <Katex tex="\tfrac14" />, so misses with probability <Katex tex="\tfrac34" />, independently on each of 4 throws.</>,
  },
  {
    working: <Katex display tex="P(\text{John} \ge 1) = 1-\dfrac{81}{256} = \dfrac{175}{256}" />,
    reason: '"At least one hit" is the complement of "no hits".',
  },
  {
    working: <Katex display tex="P(\text{Rebecca misses both}) = \left(\dfrac12\right)^2 = \dfrac14" />,
    reason: <>Rebecca hits with probability <Katex tex="\tfrac12" /> on each of 2 throws.</>,
  },
  {
    working: <Katex display tex="P(\text{Rebecca} \ge 1) = 1-\dfrac14 = \dfrac34 = \dfrac{192}{256}" />,
    reason: <>Written over a denominator of 256 so it can be compared directly with John's result.</>,
  },
  {
    working: <Katex display tex="\boxed{P(\text{Rebecca}\ge 1) : P(\text{John}\ge 1) = 192:175}" />,
    reason: <>Ratio of the two numerators (common denominator cancels). Matches option <b>E</b>.</>,
  },
]

export default function MethodsQ22_2014() {
  return (
    <MCQShell
      question={
        <>
          <p>
            John and Rebecca are playing a game of darts. For each throw, the probability that John hits the
            target is <Katex tex="\tfrac14" /> and the probability that Rebecca hits the target is{' '}
            <Katex tex="\tfrac12" />. John has four throws at the target and Rebecca has two throws at the
            target. All throws are independent of each other.
          </p>
          <p className="mt-2">
            The ratio of the probability of Rebecca hitting the target at least once to the probability of
            John hitting the target at least once is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="1:2" /> },
        { letter: 'B', content: <Katex tex="2:1" /> },
        { letter: 'C', content: <Katex tex="3:4" /> },
        { letter: 'D', content: <Katex tex="175:192" /> },
        { letter: 'E', content: <Katex tex="192:175" />, isAnswer: true },
      ]}
      rows={ROWS}
    />
  )
}
