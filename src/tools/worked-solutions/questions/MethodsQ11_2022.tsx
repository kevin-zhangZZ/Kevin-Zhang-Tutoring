// 2022 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 66% correct.
// Integration by parts in disguise, from a given derivative. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 9, C: 66, D: 7, E: 5 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\bigl(x\sin(x)\bigr) = \sin(x)+x\cos(x)" />,
    reason: <>The given result — read it as an antiderivative statement.</>,
  },
  {
    working: <Katex display tex="\int\bigl(\sin(x)+x\cos(x)\bigr)dx = x\sin(x)+c" />,
    reason: <>Integrating both sides.</>,
  },
  {
    working: <Katex display tex="\int x\cos(x)\,dx = x\sin(x)-\int\sin(x)\,dx" />,
    reason: <>Splitting the left side and moving the <Katex tex="\int\sin" /> across. The <Katex tex="\int\sin(x)\,dx" /> is left unevaluated because the options keep it that way.</>,
  },
  {
    working: <Katex display tex="\frac{1}{k}\int x\cos(x)\,dx = \frac1k\left(x\sin(x)-\int\sin(x)\,dx\right)+c" />,
    reason: <>The <Katex tex="\tfrac1k" /> multiplies the <em>whole</em> antiderivative, so the bracket matters — option B applies it to the first term only.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac1k\left(x\cdot\sin(x)-\int\sin(x)\,dx\right)+c}" />,
    reason: <>Matches option <b>C</b>. Option A multiplies by <Katex tex="k" /> instead of dividing; option D replaces <Katex tex="\int\sin(x)\,dx" /> with the integrand <Katex tex="\sin(x)" />.</>,
  },
]

export default function MethodsQ11_2022() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\dfrac{d}{dx}\bigl(x\cdot\sin(x)\bigr)=\sin(x)+x\cdot\cos(x)" />,
          then <Katex tex="\dfrac1k\displaystyle\int x\cos(x)\,dx" /> is equal to
        </p>
      }
      options={[
        {
          letter: 'A',
          content: <Katex tex="k\left(x\sin(x)-\int\sin(x)\,dx\right)+c" />,
        },
        { letter: 'B', content: <Katex tex="\frac1kx\sin(x)-\int\sin(x)\,dx+c" /> },
        {
          letter: 'C',
          content: <Katex tex="\frac1k\left(x\sin(x)-\int\sin(x)\,dx\right)+c" />,
          isAnswer: true,
        },
        { letter: 'D', content: <Katex tex="\frac1k\bigl(x\sin(x)-\sin(x)\bigr)+c" /> },
        {
          letter: 'E',
          content: <Katex tex="\frac1k\left(\int x\sin(x)\,dx-\int\sin(x)\,dx\right)+c" />,
        },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
