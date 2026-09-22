// 2022 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 75% correct.
// The mean of a density function built from x·e^(−x²/9). Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 75, C: 7, D: 5, E: 2 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="E(X) = \int_{-\infty}^{\infty}x\,f(x)\,dx = \int_0^\infty x\cdot\frac29xe^{-x^2/9}\,dx" />,
    reason: <>The density is zero for <Katex tex="x<0" />, so the integral starts at 0. Note the extra factor of <Katex tex="x" /> — without it the integral is 1, which is option A.</>,
  },
  {
    working: <Katex display tex="= \frac29\int_0^\infty x^2e^{-x^2/9}\,dx" />,
    reason: 'Collecting the powers of x.',
  },
  {
    working: <Katex display tex="\int_0^\infty x^2e^{-bx^2}dx = \frac14\sqrt{\frac{\pi}{b^3}}, \quad b = \tfrac19" />,
    reason: <>A CAS handles this directly; by hand it is a standard Gaussian moment. With <Katex tex="b=\tfrac19" /> it gives <Katex tex="\tfrac{27\sqrt\pi}{4}" />.</>,
  },
  {
    working: <Katex display tex="E(X) = \frac29\cdot\frac{27\sqrt\pi}{4} = \frac{3\sqrt\pi}{2}" />,
    reason: 'A surprisingly clean exact form.',
  },
  {
    working: <Katex display tex="\boxed{2.659}" />,
    reason: <>Matches option <b>B</b>. Sanity check: the density peaks near <Katex tex="x=2.1" />, so a mean just under 3 is plausible.</>,
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
              tex="f(x)=\begin{cases}\dfrac29xe^{-\frac19x^2}, & x\ge0\\[6pt] 0, & x<0\end{cases}"
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
