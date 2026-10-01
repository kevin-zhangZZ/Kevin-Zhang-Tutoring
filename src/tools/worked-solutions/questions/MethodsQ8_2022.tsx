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
    working: <Katex display tex="\begin{aligned}\int_0^b f(x)\,dx &= \int_0^a f(x)\,dx \\ &\quad +\int_a^b f(x)\,dx\end{aligned}" />,
    reason: <>Since <Katex tex="0<a<b" />, the interval from 0 to <Katex tex="b" /> splits at <Katex tex="a" /> into two pieces, and the integral over the whole interval is the sum of the integrals over the two pieces.</>,
  },
  {
    working: <Katex display tex="10 = -4+\int_a^b f(x)\,dx" />,
    reason: <>Substituting the two given values.</>,
  },
  {
    working: <Katex display tex="\int_a^b f(x)\,dx = 10-(-4)" />,
    reason: <>Subtracting <Katex tex="-4" /> from both sides. Subtracting a negative makes the answer <em>larger</em> than 10: the integral from 0 to <Katex tex="a" /> is negative, so the piece from <Katex tex="a" /> to <Katex tex="b" /> must be more than 10 to bring the total back up to 10.</>,
  },
  {
    working: <Katex display tex="\boxed{14}" />,
    reason: <>Matches option <b>E</b>. Check: <Katex tex="-4+14=10" />. Options B and D are just the two given integrals, the one from 0 to <Katex tex="a" /> and the one from 0 to <Katex tex="b" />.</>,
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
