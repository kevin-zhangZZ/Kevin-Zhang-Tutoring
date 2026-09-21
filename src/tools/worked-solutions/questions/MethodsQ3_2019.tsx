// 2019 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 80% correct. The
// average rate of change of a hyperbola-type function over a given interval. Question text
// transcribed from the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 9, C: 2, D: 5, E: 80 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(6) = \dfrac{a}{6-4} = \dfrac{a}{2}, \qquad f(8) = \dfrac{a}{8-4} = \dfrac{a}{4}" />,
  },
  {
    working: <Katex display tex="\text{Average rate of change} = \dfrac{f(8)-f(6)}{8-6} = \dfrac{\tfrac{a}{4}-\tfrac{a}{2}}{2}" />,
  },
  {
    working: <Katex display tex="= \dfrac{-\tfrac{a}{4}}{2}" />,
  },
  {
    working: <Katex display tex="\boxed{-\dfrac{a}{8}}" />,
    reason: <>Matches option <b>E</b>.</>,
  },
]

export default function MethodsQ3_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:\mathbb{R}\setminus\{4\}\to\mathbb{R},\ f(x)=\dfrac{a}{x-4}" />, where{' '}
          <Katex tex="a>0" />. The average rate of change of <Katex tex="f" /> from{' '}
          <Katex tex="x=6" /> to <Katex tex="x=8" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a\ln_e(2)" /> },
        { letter: 'B', content: <Katex tex="\dfrac{a}{2}\ln_e(2)" /> },
        { letter: 'C', content: <Katex tex="2a" /> },
        { letter: 'D', content: <Katex tex="-\dfrac{a}{4}" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{a}{8}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
