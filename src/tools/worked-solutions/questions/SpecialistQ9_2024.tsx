// 2024 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 45% correct. This
// year's paper used four options (A–D) rather than five. Arc length of a cycloid. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 45, B: 11, C: 29, D: 14 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = 1-\cos(t),\quad y=t-\sin(t)" />,
    reason: 'The given parametric curve — a cycloid.',
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = \sin(t) \qquad \frac{dy}{dt} = 1-\cos(t)" />,
    reason: 'Differentiate each component.',
  },
  {
    working: <Katex display tex="\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2 = \sin^2(t)+\big(1-\cos(t)\big)^2 = 2-2\cos(t)" />,
    reason: <>Expand and simplify using <Katex tex="\sin^2(t)+\cos^2(t)=1" />.</>,
  },
  {
    working: <Katex display tex="2-2\cos(t) = 4\sin^2\!\big(\tfrac{t}{2}\big)" />,
    reason: <>Half-angle identity <Katex tex="1-\cos(t)=2\sin^2(t/2)" />.</>,
  },
  {
    working: <Katex display tex="\sqrt{4\sin^2(t/2)} = 2\sin\!\big(\tfrac{t}{2}\big)" />,
    reason: <>Since <Katex tex="t\in[0,2\pi] \implies t/2\in[0,\pi]" />, <Katex tex="\sin(t/2)\geq0" /> throughout, so no absolute value is needed.</>,
  },
  {
    working: <Katex display tex="\boxed{L = \int_0^{2\pi} 2\sin\!\big(\tfrac{t}{2}\big)\,dt}" />,
    reason: <>Arc length formula <Katex tex="L=\int\sqrt{(x')^2+(y')^2}\,dt" /> — matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ9_2024() {
  return (
    <MCQShell
      question={
        <p>
          The length of the curve specified by <Katex tex="x=1-\cos(t)" /> and <Katex tex="y=t-\sin(t)" />, where{' '}
          <Katex tex="t\in[0,2\pi]" />, is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^{2\pi} 2\sin\!\big(\tfrac{t}{2}\big)\,dt" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\displaystyle\int_0^{2\pi} \sqrt{\big(1-\cos(t)\big)^2+\big(t-\sin(t)\big)^2}\,dt" /> },
        { letter: 'C', content: <Katex tex="2\displaystyle\int_0^{2\pi} \big(1-\cos(t)\big)\,dt" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_0^{2\pi} 2\cos\!\big(\tfrac{t}{2}\big)\,dt" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
