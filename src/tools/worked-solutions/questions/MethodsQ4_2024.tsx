// 2024 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 70% correct.
// Splitting an integral, then pulling out the constant factor. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 70, C: 12, D: 9 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_a^{c}f(x)\,dx = \int_a^{b}f(x)\,dx+\int_b^{c}f(x)\,dx" />,
    reason: <>Splitting at the interior point <Katex tex="b" />, which is what the given values are set up for.</>,
  },
  {
    working: <Katex display tex="3 = -5+\int_b^{c}f(x)\,dx" />,
    reason: 'Substituting the two given integrals.',
  },
  {
    working: <Katex display tex="\int_b^{c}f(x)\,dx = 8" />,
    reason: <>Adding 5 to both sides. Watch the sign — the first integral is <em>negative</em>.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_b^{c}2f(x)\,dx = 2\times8 = 16}" />,
    reason: <>Option <b>B</b>. A constant factor pulls straight out of an integral; forgetting to double it gives 8, and getting the subtraction the wrong way round gives <Katex tex="-4" /> (option <b>C</b>).</>,
  },
]

export default function MethodsQ4_2024() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_a^{b}f(x)\,dx=-5" /> and{' '}
          <Katex tex="\displaystyle\int_a^{c}f(x)\,dx=3" />, where{' '}
          <Katex tex="a<b<c" />, then{' '}
          <Katex tex="\displaystyle\int_b^{c}2f(x)\,dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-16" /> },
        { letter: 'B', content: <Katex tex="16" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="-4" /> },
        { letter: 'D', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
