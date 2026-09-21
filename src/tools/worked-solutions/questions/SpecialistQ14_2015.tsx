// 2015 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 76% correct.
// Verifying which second-order differential equation y = x sin(x) satisfies. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 4, C: 8, D: 9, E: 76 },
  answer: 'E',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="\tfrac{d^2y}{dx^2}=-x\sin(x)+2\cos(x)" />, therefore option E was correct.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = x\sin(x)" />,
    reason: <>Every option involves <Katex tex="\tfrac{d^2y}{dx^2}+y" />, so differentiate twice and form that combination once.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \sin(x)+x\cos(x)" />,
    reason: <>Product rule.</>,
  },
  {
    working: <Katex display tex="\frac{d^2y}{dx^2} = \cos(x)+\bigl(\cos(x)-x\sin(x)\bigr)" />,
    reason: <>Product rule again on <Katex tex="x\cos(x)" />; the derivative of <Katex tex="\sin(x)" /> supplies the first <Katex tex="\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="\frac{d^2y}{dx^2} = 2\cos(x)-x\sin(x)" />,
    reason: <>The two <Katex tex="\cos(x)" /> terms combine — this is where the factor of 2 in the answer comes from.</>,
  },
  {
    working: <Katex display tex="\frac{d^2y}{dx^2}+y = 2\cos(x)-x\sin(x)+x\sin(x)" />,
    reason: <>Adding <Katex tex="y=x\sin(x)" /> back.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{d^2y}{dx^2}+y = 2\cos(x)}" />,
    reason: <>Option E. Option A would need <Katex tex="y=\sin(x)" /> or <Katex tex="\cos(x)" /> without the <Katex tex="x" />; option D has the sign wrong.</>,
  },
]

export default function SpecialistQ14_2015() {
  return (
    <MCQShell
      question={
        <p>
          A differential equation that has <Katex tex="y=x\sin(x)" /> as a solution is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{d^2y}{dx^2}+y = 0" /> },
        { letter: 'B', content: <Katex tex="x\tfrac{d^2y}{dx^2}+y = 0" /> },
        { letter: 'C', content: <Katex tex="\tfrac{d^2y}{dx^2}+y = -\sin(x)" /> },
        { letter: 'D', content: <Katex tex="\tfrac{d^2y}{dx^2}+y = -2\cos(x)" /> },
        { letter: 'E', content: <Katex tex="\tfrac{d^2y}{dx^2}+y = 2\cos(x)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
