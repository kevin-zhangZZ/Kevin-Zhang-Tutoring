// 2022 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 91% correct.
// The period of a cosine with a phase shift. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 91, C: 2, D: 2, E: 1 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period of } a\cos(nx+c) = \frac{2\pi}{n}" />,
    reason: <>Only the coefficient of <Katex tex="x" /> changes the period. The amplitude 3 stretches the graph vertically, and the <Katex tex="+\pi" /> only slides it sideways (<Katex tex="2x+\pi = 2\left(x+\tfrac{\pi}{2}\right)" />, a translation of <Katex tex="\tfrac{\pi}{2}" /> left), so neither changes how long one cycle takes.</>,
  },
  {
    working: <Katex display tex="n = 2 \implies \text{period} = \frac{2\pi}{2}" />,
    reason: <>The coefficient of <Katex tex="x" /> inside the cosine is 2.</>,
  },
  {
    working: <Katex display tex="\boxed{\pi}" />,
    reason: <>Matches option <b>B</b>. Option A, <Katex tex="2\pi" />, is the period of <Katex tex="\cos(x)" /> (forgetting to divide by 2). Option C, <Katex tex="\tfrac{2\pi}{3}" />, divides <Katex tex="2\pi" /> by the amplitude instead of by the coefficient of <Katex tex="x" />. Options D and E are just the coefficient of <Katex tex="x" /> (2) and the amplitude (3).</>,
  },
]

export default function MethodsQ1_2022() {
  return (
    <MCQShell
      question={
        <p>
          The period of the function <Katex tex="f(x)=3\cos(2x+\pi)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2\pi" /> },
        { letter: 'B', content: <Katex tex="\pi" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac{2\pi}{3}" /> },
        { letter: 'D', content: <Katex tex="2" /> },
        { letter: 'E', content: <Katex tex="3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
