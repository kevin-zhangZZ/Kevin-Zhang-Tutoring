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
    working: <Katex display tex="\text{period of } \cos(nx+c) = \frac{2\pi}{n}" />,
    reason: <>Neither the amplitude 3 nor the phase shift <Katex tex="\pi" /> affects the period — only the coefficient of <Katex tex="x" /> does.</>,
  },
  {
    working: <Katex display tex="n = 2 \implies \text{period} = \frac{2\pi}{2}" />,
    reason: 'Reading the coefficient inside the cosine.',
  },
  {
    working: <Katex display tex="\boxed{\pi}" />,
    reason: <>Matches option <b>B</b>. Options D and E, 2 and 3, come from reading off the amplitude or the coefficient itself.</>,
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
