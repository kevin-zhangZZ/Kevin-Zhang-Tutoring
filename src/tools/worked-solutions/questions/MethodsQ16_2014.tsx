// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 16. VCAA examination report: 46% correct.
// Recovering E(X^2) from the mean and variance. Question text transcribed from the original
// paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 17, C: 46, D: 18, E: 4 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\mathrm{E}\!\left(X^2\right)=\displaystyle\int_{-\infty}^{\infty}x^2p(x)\,dx" />;{' '}
      <Katex tex="\mathrm{Var}(X)=\mathrm{E}\!\left(X^2\right)-\bigl(\mathrm{E}(X)\bigr)^2" />;{' '}
      <Katex tex="5=\mathrm{E}\!\left(X^2\right)-4" />;{' '}
      <Katex tex="\mathrm{E}\!\left(X^2\right)=9" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-\infty}^{\infty}x^2p(x)\,dx = \mathrm{E}\!\left(X^2\right)" />,
    reason: <>Recognising the integral: this is the definition of the expected value of <Katex tex="X^2" />, not of <Katex tex="X" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(X) = \mathrm{E}\!\left(X^2\right)-\bigl(\mathrm{E}(X)\bigr)^2" />,
    reason: <>The formula that connects the two given numbers to the one wanted.</>,
  },
  {
    working: <Katex display tex="5 = \mathrm{E}\!\left(X^2\right)-2^2" />,
    reason: <>Substituting the mean 2 and the variance 5.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}\!\left(X^2\right) = 9}" />,
    reason: <>Matches option <b>C</b>. Option A, 1, subtracts instead of adding; option E, 29, uses <Katex tex="5^2+4" />.</>,
  },
]

export default function MethodsQ16_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The continuous random variable <Katex tex="X" />, with probability density
            function <Katex tex="p(x)" />, has mean 2 and variance 5.
          </p>
          <p>
            The value of{' '}
            <Katex tex="\displaystyle\int_{-\infty}^{\infty}x^2p(x)\,dx" /> is
          </p>
        </>
      }
      background={
        <p>
          The integral in the question is not something to evaluate — <Katex tex="p" /> is
          never given. It is <Katex tex="\mathrm{E}\!\left(X^2\right)" /> written out in full,
          and the variance formula turns that into arithmetic.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="7" /> },
        { letter: 'C', content: <Katex tex="9" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="21" /> },
        { letter: 'E', content: <Katex tex="29" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
