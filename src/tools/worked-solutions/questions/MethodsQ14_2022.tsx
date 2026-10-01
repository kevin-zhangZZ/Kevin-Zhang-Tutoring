// 2022 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 75% correct.
// The mean of a density function built from x·e^(−x²/9). Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 75, C: 7, D: 5, E: 2 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="E(X) = \int_{-\infty}^{\infty}x\,f(x)\,dx" />,
    reason: <>The expected value of a continuous random variable: multiply the density by <Katex tex="x" /> and integrate over every possible value of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="= \int_0^\infty x\cdot\frac29xe^{-\frac19x^2}\,dx" />,
    reason: <>The density is zero for <Katex tex="x<0" />, so that part adds nothing and the integral starts at 0. Note the extra factor of <Katex tex="x" /> — without it you are integrating <Katex tex="f(x)" /> itself, which always gives 1 (the total probability), option A.</>,
  },
  {
    working: <Katex display tex="= \frac29\int_0^\infty x^2e^{-\frac19x^2}\,dx" />,
    reason: <>Collecting the powers of <Katex tex="x" />.</>,
  },
  {
    working: <><Cas fn="nInt">nInt(2/9*x^2*e^(-x^2/9), x, 0, ∞)</Cas> <Katex tex="= 2.65868\ldots" /></>,
    reason: <><Katex tex="x^2e^{-\frac19x^2}" /> has no antiderivative you can find by hand in this course, so this is a technology step (Exam 2 allows it). Type <Katex tex="\infty" /> as the upper terminal. The integral template in exact mode gives <Katex tex="\tfrac{3\sqrt\pi}{2}" />, the same number.</>,
  },
  {
    working: <Katex display tex="\boxed{E(X) \approx 2.659}" />,
    reason: <>Matches option <b>B</b>. Option E, 9, is <Katex tex="\int_0^\infty x^2f(x)\,dx = E(X^2)" /> — multiplying <Katex tex="f(x)" /> by <Katex tex="x^2" /> instead of <Katex tex="x" />. Sanity check: the density peaks at <Katex tex="x=\tfrac{3}{\sqrt2}\approx2.12" /> and has a long tail to the right, which pulls the mean a little to the right of the peak.</>,
  },
]

export default function MethodsQ14_2022() {
  return (
    <MCQShell
      question={
        <>
          <p>
            A continuous random variable, <Katex tex="X" />, has a probability density
            function given by
          </p>
          <p className="py-1">
            <Katex
              display
              tex="f(x)=\begin{cases}\dfrac29xe^{-\frac19x^2} & x\ge0\\[6pt] 0 & x<0\end{cases}"
            />
          </p>
          <p>
            The expected value of <Katex tex="X" />, correct to three decimal places, is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="1.000" /> },
        { letter: 'B', content: <Katex tex="2.659" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="3.730" /> },
        { letter: 'D', content: <Katex tex="6.341" /> },
        { letter: 'E', content: <Katex tex="9.000" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
