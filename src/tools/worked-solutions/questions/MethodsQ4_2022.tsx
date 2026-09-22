// 2022 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 68% correct.
// Which of five functions fails to be continuous on a closed interval. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 4, C: 7, D: 68, E: 11 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{A: } \frac{1}{(x+3)^2} \ \text{ breaks only at } x=-3" />,
    reason: <>Outside <Katex tex="[0,5]" />, so continuous there.</>,
  },
  {
    working: <Katex display tex="\text{B: } \sqrt{x+3} \ \text{ needs } x\ge-3" />,
    reason: <>The whole interval satisfies this, and a square root is continuous on its domain.</>,
  },
  {
    working: <Katex display tex="\text{C: } x^{1/3} \ \text{ is continuous everywhere}" />,
    reason: <>Cube roots are defined for negative inputs too — the vertical tangent at 0 is not a discontinuity.</>,
  },
  {
    working: <Katex display tex="\text{D: } \tan\!\left(\frac{\pi x}{3}\right) \ \text{ breaks where } \frac{\pi x}{3} = \frac\pi2+k\pi" />,
    reason: <>That is <Katex tex="x=\tfrac32+3k" />.</>,
  },
  {
    working: <Katex display tex="x = \tfrac32 \in [0,5] \ \text{ and } \ x = \tfrac92 \in [0,5]" />,
    reason: <>Two asymptotes inside the interval, so <Katex tex="\tan" /> is the one that fails.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{D}}" />,
    reason: <>Option E, <Katex tex="\sin^2\!\left(\tfrac{\pi x}{3}\right)" />, is continuous everywhere — squaring does not introduce breaks.</>,
  },
]

export default function MethodsQ4_2022() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following functions is <b>not</b> continuous over the interval{' '}
          <Katex tex="x\in[0,5]" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=\frac{1}{(x+3)^2}" /> },
        { letter: 'B', content: <Katex tex="f(x)=\sqrt{x+3}" /> },
        { letter: 'C', content: <Katex tex="f(x)=x^{1/3}" /> },
        { letter: 'D', content: <Katex tex="f(x)=\tan\!\left(\tfrac{\pi x}{3}\right)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="f(x)=\sin^2\!\left(\tfrac{\pi x}{3}\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
