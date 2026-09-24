// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 8. VCAA examination report: 59% correct.
// Linearity of the definite integral. Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 59, B: 11, C: 13, D: 9, E: 7 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_1^4\bigl(5-2f(x)\bigr)dx = \int_1^4 5\,dx - 2\int_1^4 f(x)\,dx" />,
    reason: <>Splitting the integral and pulling the constant out — the only two rules this question needs.</>,
  },
  {
    working: <Katex display tex="\int_1^4 5\,dx = 5\times(4-1) = 15" />,
    reason: <>A constant integrand gives a rectangle: height 5, width 3. Forgetting this term entirely leaves <Katex tex="-12" />.</>,
  },
  {
    working: <Katex display tex="2\int_1^4 f(x)\,dx = 2\times6 = 12" />,
    reason: <>Using the given value.</>,
  },
  {
    working: <Katex display tex="\boxed{15-12 = 3}" />,
    reason: <>Matches option <b>A</b>. Note the answer does not depend on what <Katex tex="f" /> actually is.</>,
  },
]

export default function MethodsQ8_2014() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_1^4 f(x)\,dx=6" />, then{' '}
          <Katex tex="\displaystyle\int_1^4\bigl(5-2f(x)\bigr)dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="4" /> },
        { letter: 'C', content: <Katex tex="5" /> },
        { letter: 'D', content: <Katex tex="6" /> },
        { letter: 'E', content: <Katex tex="16" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
