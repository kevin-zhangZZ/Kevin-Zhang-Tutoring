// 2024 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 72% correct.
// A product-to-sum identity is what makes the equation separable. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 15, C: 72, D: 6 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(x-y)-\cos(x+y) = 2\sin(x)\sin(y)" />,
    reason: <>Expanding both with the compound-angle formula: the <Katex tex="\cos x\cos y" /> terms cancel and the <Katex tex="\sin x\sin y" /> terms double. Without this the equation is not separable at all.</>,
  },
  {
    working: <Katex display tex="e^{x-y} = e^x e^{-y}" />,
    reason: 'Splitting the exponential is the other half of the separation.',
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2e^x e^{-y}\sin(x)\sin(y)" />,
    reason: 'Now every factor belongs to one variable or the other.',
  },
  {
    working: <Katex display tex="\frac{dy}{e^{-y}\sin(y)} = 2e^x\sin(x)\,dx" />,
    reason: <>Dividing both sides by <Katex tex="e^{-y}\sin(y)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int\frac{e^{y}}{\sin(y)}\,dy = 2\int e^x\sin(x)\,dx}" />,
    reason: <>Option <b>C</b>, since <Katex tex="\tfrac{1}{e^{-y}}=e^{y}" />. Option <b>B</b> makes the same start but flips the sign of the exponent on the right, and option <b>A</b> uses <Katex tex="\cos" /> where the identity gives <Katex tex="\sin" />.</>,
  },
]

export default function SpecialistQ7_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>A solution to the differential equation</p>
          <Katex display tex="\frac{dy}{dx} = e^{x-y}\bigl(\cos(x-y)-\cos(x+y)\bigr)" />
          <p>can be found using</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\int e^{y}\cos(y)\,dy = 2\int e^x\cos(x)\,dx" /> },
        { letter: 'B', content: <Katex tex="\int \frac{e^{y}}{\sin(y)}\,dy = 2\int e^{-x}\sin(x)\,dx" /> },
        { letter: 'C', content: <Katex tex="\int \frac{e^{y}}{\sin(y)}\,dy = 2\int e^{x}\sin(x)\,dx" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\int e^{-y}\sin(y)\,dy = 2\int \frac{e^{x}}{\cos(x)}\,dx" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
