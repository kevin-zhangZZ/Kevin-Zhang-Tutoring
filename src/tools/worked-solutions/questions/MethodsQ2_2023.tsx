// 2023 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 53% correct.
// The axis of symmetry when the linear coefficient is written as 2b. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 53, B: 29, C: 3, D: 6, E: 8 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = Ax^2+Bx+C \implies \text{axis of symmetry } x = -\frac{B}{2A}" />,
    reason: <>The standard result — halfway between the two roots given by the quadratic formula.</>,
  },
  {
    working: <Katex display tex="y = ax^2+2bx+c \implies A = a, \quad B = 2b" />,
    reason: <>The middle coefficient is <Katex tex="2b" />, not <Katex tex="b" />. Missing this gives option <b>B</b>, which 29% of students chose.</>,
  },
  {
    working: <Katex display tex="x = -\frac{2b}{2a}" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -\frac{b}{a}}" />,
    reason: <>Matches option <b>A</b>. Check with <Katex tex="y=x^2+4x" /> (so <Katex tex="a=1,b=2" />): the vertex is at <Katex tex="x=-2=-\tfrac21" /> ✓.</>,
  },
]

export default function MethodsQ2_2023() {
  return (
    <MCQShell
      question={
        <p>
          For the parabola with equation <Katex tex="y=ax^2+2bx+c" />, where{' '}
          <Katex tex="a,b,c\in R" />, the equation of the axis of symmetry is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=-\frac{b}{a}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="x=-\frac{b}{2a}" /> },
        { letter: 'C', content: <Katex tex="y=c" /> },
        { letter: 'D', content: <Katex tex="x=\frac{b}{a}" /> },
        { letter: 'E', content: <Katex tex="x=\frac{b}{2a}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
