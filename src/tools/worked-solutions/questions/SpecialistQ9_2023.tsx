// 2023 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 65% correct.
// The chain rule in parametric form: divide the two rates. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 13, C: 13, D: 65, E: 5 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{dy/dt}{dx/dt}" />,
    reason: 'The parametric chain rule — never differentiate one with respect to the other directly.',
  },
  {
    working: <Katex display tex="x = \frac{6t}{t+1} \implies \frac{dx}{dt} = \frac{6(t+1)-6t}{(t+1)^2} = \frac{6}{(t+1)^2}" />,
    reason: 'Quotient rule; the numerator collapses to a constant.',
  },
  {
    working: <Katex display tex="y = \frac{-8}{t^2+4} = -8\left(t^2+4\right)^{-1} \implies \frac{dy}{dt} = \frac{16t}{\left(t^2+4\right)^2}" />,
    reason: <>Chain rule: <Katex tex="8\left(t^2+4\right)^{-2}\cdot2t" />. The two minus signs cancel.</>,
  },
  {
    working: <Katex display tex="t=2: \quad \frac{dx}{dt} = \frac{6}{9} = \frac23, \qquad \frac{dy}{dt} = \frac{32}{64} = \frac12" />,
    reason: 'Substituting.',
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{1/2}{2/3} = \frac34}" />,
    reason: <>Option <b>D</b>. Dividing the other way round gives <Katex tex="\tfrac43" />, option <b>E</b>.</>,
  },
]

export default function SpecialistQ9_2023() {
  return (
    <MCQShell
      question={
        <p>
          The position of a particle moving in the Cartesian plane, at time <Katex tex="t" />,
          is given by the parametric equations{' '}
          <Katex tex="x(t)=\dfrac{6t}{t+1}" /> and{' '}
          <Katex tex="y(t)=\dfrac{-8}{t^2+4}" />, where <Katex tex="t\ge0" />. What is the
          slope of the tangent to the path of the particle when <Katex tex="t=2" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\frac13" /> },
        { letter: 'B', content: <Katex tex="-\frac14" /> },
        { letter: 'C', content: <Katex tex="\frac13" /> },
        { letter: 'D', content: <Katex tex="\frac34" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\frac43" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
