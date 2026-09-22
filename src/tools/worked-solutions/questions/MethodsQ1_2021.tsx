// 2021 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 67% correct.
// The period of a tangent function. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 67, C: 22, D: 6, E: 2 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period of } \tan(nx) = \frac{\pi}{n}" />,
    reason: <>Tangent repeats every <Katex tex="\pi" />, not every <Katex tex="2\pi" /> — that is where options D and E come from.</>,
  },
  {
    working: <Katex display tex="y = \tan\!\left(\frac{\pi x}{2}\right) \implies n = \frac{\pi}{2}" />,
    reason: 'Reading the coefficient of x inside the function.',
  },
  {
    working: <Katex display tex="\text{period} = \frac{\pi}{\pi/2} = \boxed{2}" />,
    reason: <>The <Katex tex="\pi" /> cancels, which is why the answer is a plain number. Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ1_2021() {
  return (
    <MCQShell
      question={
        <p>
          The period of the function with rule{' '}
          <Katex tex="y=\tan\!\left(\dfrac{\pi x}{2}\right)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="2\pi" /> },
        { letter: 'E', content: <Katex tex="4\pi" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
