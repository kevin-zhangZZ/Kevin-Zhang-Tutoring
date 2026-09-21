// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 13. VCAA examination report: 63% correct.
// Finding the constant in a two-piece probability density function. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 4, C: 14, D: 11, E: 63 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-\infty}^{\infty} f(x)\,dx = 1" />,
    reason: <>The defining property of a probability density function. Outside <Katex tex="[0,2]" /> the function is zero, so only two pieces contribute.</>,
  },
  {
    working: <Katex display tex="\int_0^1 ae^x\,dx = a\Bigl[e^x\Bigr]_0^1 = a(e-1)" />,
    reason: <>The first branch.</>,
  },
  {
    working: <Katex display tex="\int_1^2 ae\,dx = ae\times(2-1) = ae" />,
    reason: <>The second branch is a constant, so its integral is just a rectangle of height <Katex tex="ae" /> and width <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="a(e-1)+ae = a(2e-1) = 1" />,
    reason: <>Adding the two pieces.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac{1}{2e-1}}" />,
    reason: <>Option E, about <Katex tex="0.226" />. Option C, <Katex tex="\tfrac1e" />, is what you get from the first branch alone.</>,
  },
]

export default function MethodsQ13_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The function <Katex tex="f" /> is a probability density function with rule
          </p>
          <div className="mb-2">
            <Katex
              display
              tex="f(x)=\begin{cases}ae^{x} & 0\le x\le1\\ ae & 1<x\le2\\ 0 & \text{otherwise}\end{cases}"
            />
          </div>
          <p>
            The value of <Katex tex="a" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="e" /> },
        { letter: 'C', content: <Katex tex="\dfrac1e" /> },
        { letter: 'D', content: <Katex tex="\dfrac{1}{2e}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{1}{2e-1}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
