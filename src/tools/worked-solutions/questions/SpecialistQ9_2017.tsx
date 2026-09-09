// 2017 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 45% correct.
// Euler's method stepping backward from x = 1 down to x = 0.8.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 45, C: 12, D: 9, E: 30 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{dy}{dx} = 2x^2+x+1, \qquad y_0=2 \ \text{at} \ x_0=1" />,
    reason: <>The target point <Katex tex="y(0.8)=y_2" /> is <em>below</em> the initial <Katex tex="x_0=1" />, so Euler's method must step <em>backward</em> — each step uses <Katex tex="h=-0.1" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="y_1 = y_0 + (-0.1)f(x_0) = 2 - 0.1f(1)" />
        <Katex display tex="f(1) = 2(1)^2+1+1 = 4 \;\implies\; y_1 = 2-0.1(4) = 1.6" />
      </>
    ),
    reason: <>First backward step, landing at <Katex tex="x_1=0.9" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="y_2 = y_1 + (-0.1)f(x_1) = 1.6 - 0.1f(0.9)" />
        <Katex display tex="f(0.9) = 2(0.9)^2+0.9+1 = 1.62+0.9+1 = 3.52" />
      </>
    ),
    reason: <>Second backward step, landing at <Katex tex="x_2=0.8" />.</>,
  },
  {
    working: <Katex display tex="y_2 = 1.6 - 0.1(3.52) = 1.6-0.352 = 1.248" />,
  },
  {
    working: <Katex display tex="\boxed{y(0.8) \approx 1.248}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ9_2017() {
  return (
    <MCQShell
      question={
        <p>
          Consider <Katex tex="\dfrac{dy}{dx} = 2x^2+x+1" />, where <Katex tex="y(1) = y_0 = 2" />. Using
          Euler's method with a step size of <Katex tex="0.1" />, an approximation to <Katex tex="y(0.8) = y_2" />{' '}
          is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.94" /> },
        { letter: 'B', content: <Katex tex="1.248" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="1.6" /> },
        { letter: 'D', content: <Katex tex="2.4" /> },
        { letter: 'E', content: <Katex tex="2.852" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
