// 2020 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 58% correct.
// Acceleration of a particle from a = v dv/dx, given v as a function of position x. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 21, B: 58, C: 11, D: 5, E: 5 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v = \frac{1}{x}" />,
    reason: 'Velocity as a function of position.',
  },
  {
    working: <Katex display tex="\frac{dv}{dx} = -\frac{1}{x^2}" />,
    reason: 'Differentiate with respect to x.',
  },
  {
    working: <Katex display tex="a = v\frac{dv}{dx} = \frac1x\cdot\left(-\frac{1}{x^2}\right) = -\frac{1}{x^3}" />,
    reason: <>Chain rule for motion described in terms of position: <Katex tex="a=v\,dv/dx" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\frac{1}{2^3} = -\frac18}" />,
    reason: <>Substitute <Katex tex="x=2" /> — matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ17_2020() {
  return (
    <MCQShell
      question={
        <p>
          The velocity, <Katex tex="v\text{ m s}^{-1}" />, of a particle at time <Katex tex="t\geq0" /> seconds and at
          position <Katex tex="x\geq1" /> m from the origin is <Katex tex="v=\dfrac1x" />.
          <br />
          The acceleration of the particle, in <Katex tex="\text{m s}^{-2}" />, when <Katex tex="x=2" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\tfrac14" /> },
        { letter: 'B', content: <Katex tex="-\tfrac18" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac18" /> },
        { letter: 'D', content: <Katex tex="\tfrac12" /> },
        { letter: 'E', content: <Katex tex="\tfrac14" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
