// 2020 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 44% correct.
// A normal distribution whose mean is tied to its standard deviation. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 44, B: 8, C: 18, D: 18, E: 11 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mu = 2\sigma" />,
    reason: <>One unknown, not two — which is what makes the question solvable.</>,
  },
  {
    working: <Katex display tex="\Pr(X>5.2) = 0.9 \implies \Pr(Z>z) = 0.9" />,
    reason: <>Standardising. Since more than 90% of the distribution lies above <Katex tex="5.2" />, that value sits well <em>below</em> the mean, so <Katex tex="z" /> is negative.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.1, 0, 1)</Cas>,
    reason: <><Katex tex="\Pr(Z>z)=0.9" /> is the same as <Katex tex="\Pr(Z<z)=0.1" />.</>,
  },
  {
    working: <Katex display tex="z = -1.2816\ldots" />,
    reason: <>Negative, as expected.</>,
  },
  {
    working: <Katex display tex="\frac{5.2-2\sigma}{\sigma} = -1.2816\ldots" />,
    reason: <>Substituting <Katex tex="\mu=2\sigma" /> into <Katex tex="z=\tfrac{x-\mu}{\sigma}" />.</>,
  },
  {
    working: <Katex display tex="5.2 = 2\sigma-1.2816\ldots\sigma = 0.7184\ldots\sigma" />,
    reason: <>Multiplying through by <Katex tex="\sigma" /> and collecting.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 7.238}" />,
    reason: <>Option A. Using <Katex tex="z=+1.2816" /> instead gives <Katex tex="1.585" />, option D — the sign of <Katex tex="z" /> is the whole question.</>,
  },
]

export default function MethodsQ14_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The random variable <Katex tex="X" /> is normally distributed. The mean of{' '}
            <Katex tex="X" /> is twice the standard deviation of <Katex tex="X" />.
          </p>
          <p>
            If <Katex tex="\Pr(X>5.2)=0.9" />, then the standard deviation of{' '}
            <Katex tex="X" /> is closest to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="7.238" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="14.476" /> },
        { letter: 'C', content: <Katex tex="3.327" /> },
        { letter: 'D', content: <Katex tex="1.585" /> },
        { letter: 'E', content: <Katex tex="3.169" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
