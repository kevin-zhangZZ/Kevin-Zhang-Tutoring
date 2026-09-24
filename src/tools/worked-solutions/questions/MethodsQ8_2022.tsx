// 2022 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 78% correct.
// Splitting a definite integral at an interior point. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 3, C: 3, D: 5, E: 78 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^b f = \int_0^a f+\int_a^b f" />,
    reason: <>The additivity of definite integrals over adjoining intervals, valid because <Katex tex="0<a<b" />.</>,
  },
  {
    working: <Katex display tex="\int_a^b f = \int_0^b f-\int_0^a f" />,
    reason: <>Rearranging.</>,
  },
  {
    working: <Katex display tex="= 10-(-4)" />,
    reason: <>Subtracting a negative — the step that turns 10 into something <em>larger</em>, not smaller.</>,
  },
  {
    working: <Katex display tex="\boxed{14}" />,
    reason: <>Matches option <b>E</b>. Option D ignores the second integral.</>,
  },
]

export default function MethodsQ8_2022() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_0^b f(x)\,dx=10" /> and{' '}
          <Katex tex="\displaystyle\int_0^a f(x)\,dx=-4" />, where{' '}
          <Katex tex="0<a<b" />, then <Katex tex="\displaystyle\int_a^b f(x)\,dx" /> is
          equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-6" /> },
        { letter: 'B', content: <Katex tex="-4" /> },
        { letter: 'C', content: <Katex tex="0" /> },
        { letter: 'D', content: <Katex tex="10" /> },
        { letter: 'E', content: <Katex tex="14" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
