// 2015 Specialist Mathematics — Exam 2, MCQ 22. VCAA examination report: 42% correct —
// the third-hardest MCQ in the 2014-2016 Specialist Exam 2 papers.
// A ball thrown upward against gravity and air resistance; find the time to reach maximum height.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 3, C: 8, D: 42, E: 11 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex
        display
        tex="\frac{dt}{dv} = \frac{-1}{9.8+0.1v^2}, \qquad t=-\frac{10}{\sqrt{98}}\tan^{-1}\!\left(\frac{v}{\sqrt{98}}\right)+c"
      />
      <Katex display tex="t=0,\,v=0 \;\implies\; c=\frac{10}{\sqrt{98}}\times\frac{\pi}{3} \ \text{— the required time, option D}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dv}{dt} = -\bigl(9.8+0.1v^2\bigr) = -0.1\bigl(98+v^2\bigr)" />,
    reason: <>Acceleration is <Katex tex="\dot v" />; factor out <Katex tex="0.1" /> to make the integral a standard <Katex tex="\arctan" /> form.</>,
  },
  {
    working: <Katex display tex="dt = \frac{-dv}{0.1(98+v^2)} = \frac{-10\,dv}{98+v^2}" />,
    reason: 'Separate variables (t on one side, v on the other) to integrate.',
  },
  {
    working: (
      <Katex
        display
        tex="t = -10\int_{7\sqrt6}^{0} \frac{dv}{98+v^2} = -\frac{10}{\sqrt{98}}\Bigl[\arctan\!\Bigl(\frac{v}{\sqrt{98}}\Bigr)\Bigr]_{7\sqrt6}^{0}"
      />
    ),
    reason: <>Integrate from the initial velocity <Katex tex="v=7\sqrt6" /> down to <Katex tex="v=0" /> (maximum height, momentarily at rest), using <Katex tex="\int \tfrac{dv}{a^2+v^2}=\tfrac1a\arctan\!\bigl(\tfrac{v}{a}\bigr)" /> with <Katex tex="a=\sqrt{98}" />.</>,
  },
  {
    working: <Katex display tex="\frac{7\sqrt6}{\sqrt{98}} = \frac{7\sqrt6}{7\sqrt2} = \sqrt3 \;\implies\; \arctan(\sqrt3)=\frac{\pi}{3}" />,
    reason: <>Simplify the argument first — <Katex tex="98=49\times2" />, so <Katex tex="\sqrt{98}=7\sqrt2" />, and the <Katex tex="7" />'s cancel.</>,
  },
  {
    working: <Katex display tex="t = -\frac{10}{\sqrt{98}}\Bigl[0-\frac{\pi}{3}\Bigr] = \frac{10}{\sqrt{98}}\cdot\frac{\pi}{3}" />,
  },
  {
    working: <Katex display tex="\boxed{t = \dfrac{10\pi}{21\sqrt2}}" />,
    reason: <>Since <Katex tex="\sqrt{98}=7\sqrt2" />, the denominator becomes <Katex tex="3\times7\sqrt2=21\sqrt2" />. Matches option <b>D</b>.</>,
  },
]

export default function SpecialistQ22_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A ball is thrown vertically up with an initial velocity of <Katex tex="7\sqrt6" /> m/s, and is
            subject to gravity and air resistance.
          </p>
          <p className="mb-2">
            The acceleration of the ball is given by <Katex tex="\ddot x = -\bigl(9.8+0.1v^2\bigr)" />, where{' '}
            <Katex tex="x" /> metres is its vertical displacement, and <Katex tex="v" /> m/s is its velocity
            at time <Katex tex="t" /> seconds.
          </p>
          <p>The time taken for the ball to reach its maximum height is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{\pi}{3}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{5\pi}{21\sqrt2}" /> },
        { letter: 'C', content: <Katex tex="\log_e(4)" /> },
        { letter: 'D', content: <Katex tex="\dfrac{10\pi}{21\sqrt2}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="10\log_e(4)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
