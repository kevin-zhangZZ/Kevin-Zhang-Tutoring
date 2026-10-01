// 2022 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 66% correct.
// Integration by recognition, from a given derivative. Question text transcribed from the
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
    reason: <>The question gives a derivative so you can use it backwards (integration by recognition). Differentiating <Katex tex="x\sin(x)" /> gives <Katex tex="\sin(x)+x\cos(x)" />, so <Katex tex="x\sin(x)" /> is an antiderivative of <Katex tex="\sin(x)+x\cos(x)" />, and the <Katex tex="x\cos(x)" /> you need is part of it.</>,
  },
  {
    working: <Katex display tex="\int\bigl(\sin(x)+x\cos(x)\bigr)dx = x\sin(x)+c" />,
    reason: <>Antidifferentiate both sides of the given result.</>,
  },
  {
    working: <Katex display tex="\int\sin(x)\,dx+\int x\cos(x)\,dx = x\sin(x)+c" />,
    reason: <>The integral of a sum is the sum of the integrals.</>,
  },
  {
    working: <Katex display tex="\int x\cos(x)\,dx = x\sin(x)-\int\sin(x)\,dx" />,
    reason: <>Subtract <Katex tex="\int\sin(x)\,dx" /> from both sides to get the integral you want on its own. Leave <Katex tex="\int\sin(x)\,dx" /> unevaluated, because every option keeps it that way. It already stands for a family of antiderivatives, so the <Katex tex="c" /> is not needed here; it goes back in at the end, as in the options.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\frac{1}{k}\int x\cos(x)\,dx\\ &= \frac1k\left(x\sin(x)-\int\sin(x)\,dx\right)+c\end{aligned}"
      />
    ),
    reason: <>Multiply both sides by <Katex tex="\tfrac1k" />. It multiplies the <em>whole</em> right side, so the brackets are needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac1k\left(x\sin(x)-\int\sin(x)\,dx\right)+c}" />,
    reason: <>Matches option <b>C</b>. Option A multiplies by <Katex tex="k" /> instead of dividing by <Katex tex="k" />. Option B applies the <Katex tex="\tfrac1k" /> to the <Katex tex="x\sin(x)" /> term only. Option D replaces <Katex tex="\int\sin(x)\,dx" /> with <Katex tex="\sin(x)" />, but the antiderivative of <Katex tex="\sin(x)" /> is <Katex tex="-\cos(x)" />, not <Katex tex="\sin(x)" />. Option E puts <Katex tex="x\sin(x)" /> back inside an integral, but <Katex tex="x\sin(x)" /> is already the antiderivative.</>,
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
