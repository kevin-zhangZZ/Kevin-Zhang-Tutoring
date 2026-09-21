// 2019 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 55% correct. The
// derivative of an inverse function at a point, via the reciprocal-gradient relationship.
// Question text transcribed from the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 55, B: 26, C: 8, D: 5, E: 4 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(5)=7 \implies g(7)=5" />,
    reason: <><Katex tex="g=f^{-1}" />, so <Katex tex="g" /> undoes <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2x-4 \implies f'(5) = 6" />,
  },
  {
    working: <Katex display tex="g'(7) = \dfrac{1}{f'(g(7))} = \dfrac{1}{f'(5)}" />,
    reason: <>Standard inverse-function derivative rule.</>,
  },
  {
    working: <Katex display tex="\boxed{g'(7) = \dfrac16}" />,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function MethodsQ15_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:[2,\infty)\to\mathbb{R},\ f(x)=x^2-4x+2" /> and <Katex tex="f(5)=7" />.
          The function <Katex tex="g" /> is the inverse function of <Katex tex="f" />.{' '}
          <Katex tex="g'(7)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac16" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="5" /> },
        { letter: 'C', content: <Katex tex="\dfrac{\sqrt7}{14}" /> },
        { letter: 'D', content: <Katex tex="6" /> },
        { letter: 'E', content: <Katex tex="\dfrac17" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
