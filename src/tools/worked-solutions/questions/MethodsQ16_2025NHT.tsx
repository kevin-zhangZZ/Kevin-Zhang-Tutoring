// 2025 Mathematical Methods NHT — Exam 2, MCQ 16. The NHT report gives the answer key only for
// this question, with no statistics or comment. Probability: the mean from normal symmetry, then
// the standard deviation from a standardised value. Question text transcribed from the original
// paper (image-only, read from the rendered page). Solution is original; the answer C agrees with
// the report's key (μ = 7 by symmetry; (8 − 7)/σ = 0.5 gives σ = 2).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X>6)=\Pr(X<8)\ \Rightarrow\ \mu=\frac{6+8}{2}=7" />,
    reason: <>The upper tail beyond 6 and the lower tail below 8 are equal, so 6 and 8 sit the same distance either side of the mean.</>,
    more: <>Picture the bell curve: <Katex tex="\Pr(X>6)" /> is everything right of 6, <Katex tex="\Pr(X<8)" /> is everything left of 8. These are mirror images only if the curve is centred halfway between 6 and 8.</>,
  },
  {
    working: <Katex display tex="\Pr(X<8)=\Pr\!\left(Z<\frac{8-7}{\sigma}\right)=\Pr(Z<0.5)" />,
    reason: <>Standardise: <Katex tex="z=\tfrac{x-\mu}{\sigma}" />.</>,
  },
  {
    working: <Katex display tex="\frac{1}{\sigma}=0.5" />,
    reason: <>Equal probabilities for <Katex tex="Z" /> mean equal <Katex tex="z" />-values.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma=2}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>A</b>, 0.5, is the <Katex tex="z" />-value itself, not the standard deviation: 8 is half a standard deviation above the mean, and that half is 1 unit, so a whole standard deviation is 2.</>,
  },
]

export default function MethodsQ16_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="X" /> be a normal random variable that satisfies{' '}
          <Katex tex="\Pr(X>6)=\Pr(X<8)=\Pr(Z<0.5)" />, where <Katex tex="Z\sim\mathrm{N}(0,1)" /> is the standard normal
          random variable.
          <br />
          The standard deviation of <Katex tex="X" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <>0.5</> },
        { letter: 'B', content: <>1</> },
        { letter: 'C', content: <>2</>, isAnswer: true },
        { letter: 'D', content: <>4</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
