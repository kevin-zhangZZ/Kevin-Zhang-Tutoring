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
    reason: <>Both <Katex tex="x" /> and <Katex tex="y" /> are given in terms of <Katex tex="t" />, so differentiate each with respect to <Katex tex="t" /> and divide (the chain rule). There is no need to find the Cartesian equation first.</>,
  },
  {
    working: <Katex display tex="x = \frac{6t}{t+1} \implies \frac{dx}{dt} = \frac{6(t+1)-6t}{(t+1)^2} = \frac{6}{(t+1)^2}" />,
    reason: <>Quotient rule; the numerator collapses to a constant.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} y &= -8\left(t^2+4\right)^{-1} \\ \frac{dy}{dt} &= \frac{16t}{\left(t^2+4\right)^2} \end{aligned}" />,
    reason: <>Write <Katex tex="y" /> as a power, then use the chain rule: <Katex tex="-8\times(-1)\left(t^2+4\right)^{-2}\times2t" />. The two minus signs cancel, so the derivative is positive.</>,
  },
  {
    working: <Katex display tex="t=2: \quad \frac{dx}{dt} = \frac{6}{9} = \frac23, \qquad \frac{dy}{dt} = \frac{32}{64} = \frac12" />,
    reason: <>Substitute <Katex tex="t=2" />: <Katex tex="(t+1)^2=9" /> and <Katex tex="\left(t^2+4\right)^2=8^2=64" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{1/2}{2/3} = \frac34}" />,
    reason: <>Matches option <b>D</b>. Dividing the other way round (<Katex tex="\tfrac{dx}{dt}\div\tfrac{dy}{dt}" />) gives <Katex tex="\tfrac43" />, option <b>E</b>. Option <b>B</b>, <Katex tex="-\tfrac14" />, is <Katex tex="y\div x" /> at the particle's position <Katex tex="(4,-1)" />: the slope of the line from the origin to the particle, not the slope of the tangent.</>,
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
          <Katex tex="y(t)=\dfrac{-8}{t^2+4}" />, where <Katex tex="t\ge0" />.
          <br />
          What is the slope of the tangent to the path of the particle when{' '}
          <Katex tex="t=2" />?
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
