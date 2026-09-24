// 2021 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 67% correct.
// Linearity of the definite integral, with a constant term. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 67, B: 6, C: 5, D: 2, E: 20 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^a\bigl(3f(x)+2\bigr)dx = 3\int_0^a f(x)\,dx+\int_0^a 2\,dx" />,
    reason: <>Split the integral and pull the constant multiple out.</>,
  },
  {
    working: <Katex display tex="3\int_0^a f(x)\,dx = 3k" />,
    reason: <>Using the given value.</>,
  },
  {
    working: <Katex display tex="\int_0^a 2\,dx = \left[2x\right]_0^a = 2a" />,
    reason: <>A constant integrand gives a rectangle of height 2 and width <Katex tex="a" /> — so the answer depends on <Katex tex="a" />. Option E forgets this and writes just 2.</>,
  },
  {
    working: <Katex display tex="\boxed{3k+2a}" />,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function MethodsQ11_2021() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_0^a f(x)\,dx=k" />, then{' '}
          <Katex tex="\displaystyle\int_0^a\bigl(3f(x)+2\bigr)dx" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="3k+2a" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="3k" /> },
        { letter: 'C', content: <Katex tex="k+2a" /> },
        { letter: 'D', content: <Katex tex="k+2" /> },
        { letter: 'E', content: <Katex tex="3k+2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
