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
    reason: <>This integral is the definition of the expected value of <Katex tex="X^2" />. Since <Katex tex="p(x)" /> is never given, it can't be evaluated directly.</>,
    more: <>In general <Katex tex="\mathrm{E}\big(g(X)\big)=\int_{-\infty}^{\infty}g(x)\,p(x)\,dx" />. With <Katex tex="g(x)=x" /> this is the mean, <Katex tex="\mathrm{E}(X)=2" />; with <Katex tex="g(x)=x^2" /> it is <Katex tex="\mathrm{E}\!\left(X^2\right)" />, which is <em>not</em> <Katex tex="\bigl(\mathrm{E}(X)\bigr)^2=4" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(X) = \mathrm{E}\!\left(X^2\right)-\bigl(\mathrm{E}(X)\bigr)^2" />,
    reason: <>The variance formula links <Katex tex="\mathrm{E}\!\left(X^2\right)" /> to the two numbers given, the mean and the variance.</>,
  },
  {
    working: <Katex display tex="5 = \mathrm{E}\!\left(X^2\right)-2^2" />,
    reason: <>Substitute variance 5 and mean 2, then add 4 to both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}\!\left(X^2\right) = 9}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Check: <Katex tex="\mathrm{E}\!\left(X^2\right)=\mathrm{Var}(X)+\bigl(\mathrm{E}(X)\bigr)^2" /> can never be less than <Katex tex="\bigl(\mathrm{E}(X)\bigr)^2=4" />, since a variance is never negative. The distractors: A, 1, is <Katex tex="5-4" /> (subtracting instead of adding); B, 7, is <Katex tex="5+2" /> (forgetting to square the mean); E, 29, is <Katex tex="5^2+4" /> (treating 5 as the standard deviation and squaring it); D, 21, the most common wrong answer, is <Katex tex="5^2-4" />, which makes that slip <em>and</em> A's sign error.</>,
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
