// 2019 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 75% correct. A definite
// integral of a linear combination of sin and cos. Question text transcribed from the
// original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 8, C: 75, D: 7, E: 3 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{\pi/6}\bigl(a\sin(x)+b\cos(x)\bigr)dx = \Bigl[-a\cos(x)+b\sin(x)\Bigr]_0^{\pi/6}" />,
  },
  {
    working: <Katex display tex="= \left(-a\cos\tfrac{\pi}{6}+b\sin\tfrac{\pi}{6}\right) - \left(-a\cos0+b\sin0\right)" />,
  },
  {
    working: <Katex display tex="= \left(-\dfrac{a\sqrt3}{2}+\dfrac{b}{2}\right) - (-a)" />,
  },
  {
    working: <Katex display tex="= a\left(1-\dfrac{\sqrt3}{2}\right)+\dfrac{b}{2} = \dfrac{(2-\sqrt3)a+b}{2}" />,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{(2-\sqrt3)a+b}{2}}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ4_2019() {
  return (
    <MCQShell
      question={<p><Katex tex="\displaystyle\int_0^{\pi/6}\bigl(a\sin(x)+b\cos(x)\bigr)\,dx" /> is equal to</p>}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{(2-\sqrt3)a-b}{2}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{b-(2-\sqrt3)a}{2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{(2-\sqrt3)a+b}{2}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{(2-\sqrt3)b-a}{2}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{(2-\sqrt3)b+a}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
