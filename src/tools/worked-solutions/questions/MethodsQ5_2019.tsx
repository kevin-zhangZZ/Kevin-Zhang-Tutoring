// 2019 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 90% correct. Recovering
// f from its derivative and one function value. Question text transcribed from the original
// paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 5, C: 90, D: 1, E: 1 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \int(3x^2-2x)\,dx = x^3-x^2+c" />,
  },
  {
    working: <Katex display tex="f(4) = 64-16+c = 48+c = 0" />,
  },
  {
    working: <Katex display tex="\boxed{c=-48 \implies f(x)=x^3-x^2-48}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ5_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f'(x)=3x^2-2x" /> such that <Katex tex="f(4)=0" />. The rule of{' '}
          <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=x^3-x^2" /> },
        { letter: 'B', content: <Katex tex="f(x)=x^3-x^2+48" /> },
        { letter: 'C', content: <Katex tex="f(x)=x^3-x^2-48" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="f(x)=6x-2" /> },
        { letter: 'E', content: <Katex tex="f(x)=6x-24" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
