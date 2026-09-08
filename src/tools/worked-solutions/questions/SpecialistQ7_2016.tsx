// 2016 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 37% correct —
// the hardest MCQ in the 2014-2016 Specialist Exam 2 papers.
// Parametric differentiation: find dy/dx in terms of the parameter t.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 37, B: 8, C: 17, D: 16, E: 21 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <Katex
      display
      tex="\frac{dy}{dx} = \frac{dy/dt}{dx/dt} = \frac{\cos(2t)}{\cos(t)+\sin(t)} = \frac{\cos^2(t)-\sin^2(t)}{\cos(t)+\sin(t)} = \cos(t)-\sin(t)"
    />
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dx}{dt} = \cos(t)+\sin(t), \qquad \frac{dy}{dt} = \cos(2t)" />,
    reason: <>Differentiate <Katex tex="x=\sin(t)-\cos(t)" /> and <Katex tex="y=\tfrac12\sin(2t)" /> with respect to <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{dy/dt}{dx/dt} = \frac{\cos(2t)}{\cos(t)+\sin(t)}" />,
    reason: 'Chain rule for a parametric curve.',
  },
  {
    working: <Katex display tex="\cos(2t) = \cos^2(t)-\sin^2(t) = \bigl(\cos(t)-\sin(t)\bigr)\bigl(\cos(t)+\sin(t)\bigr)" />,
    reason: <>Factor the double-angle identity as a difference of two squares, since the denominator is exactly one of the factors.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{\bigl(\cos(t)-\sin(t)\bigr)\bigl(\cos(t)+\sin(t)\bigr)}{\cos(t)+\sin(t)}" />,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \cos(t)-\sin(t)}" />,
    reason: <>The <Katex tex="\bigl(\cos(t)+\sin(t)\bigr)" /> factor cancels. Matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ7_2016() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="x=\sin(t)-\cos(t)" /> and <Katex tex="y=\tfrac12\sin(2t)" />, then{' '}
          <Katex tex="\dfrac{dy}{dx}" /> in terms of <Katex tex="t" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\cos(t)-\sin(t)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\cos(t)+\sin(t)" /> },
        { letter: 'C', content: <Katex tex="\sec(t)+\mathrm{cosec}(t)" /> },
        { letter: 'D', content: <Katex tex="\sec(t)-\mathrm{cosec}(t)" /> },
        { letter: 'E', content: <Katex tex="\dfrac{\cos(2t)}{\cos(t)-\sin(t)}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
