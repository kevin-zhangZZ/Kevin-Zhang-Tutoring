// 2021 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 56% correct.
// Force wording over a = v dv/dx, which is current rectilinear kinematics. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 10, C: 15, D: 56, E: 2 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v = 3+2x \implies \frac{dv}{dx} = 2" />,
    reason: <>Velocity is given as a function of <em>position</em> <Katex tex="x" />, not time <Katex tex="t" />, which is the signal to use <Katex tex="a=v\tfrac{dv}{dx}" />.</>,
  },
  {
    working: <Katex display tex="a = v\frac{dv}{dx} = (3+2x)(2) = 6+4x" />,
    reason: <>By the chain rule, <Katex tex="a=\tfrac{dv}{dt}=\tfrac{dv}{dx}\cdot\tfrac{dx}{dt}=v\tfrac{dv}{dx}" /> (this is on the formula sheet). You can't differentiate <Katex tex="v" /> with respect to <Katex tex="t" /> directly, because it is written in terms of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="x = 2: \ a = 6+8 = 14\ \text{m s}^{-2}" />,
    reason: <>Option B stops here, giving the acceleration rather than the force.</>,
  },
  {
    working: <Katex display tex="F = ma = 5\times14" />,
    reason: <>Newton's second law: net force = mass × acceleration. With mass in kg and acceleration in <Katex tex="\text{m s}^{-2}" />, the force is in newtons.</>,
  },
  {
    working: <Katex display tex="\boxed{F = 70\ \text{N}}" />,
    reason: <>Matches option <b>D</b>. Option A, 10, is <Katex tex="5\times2" />: it uses <Katex tex="a=\tfrac{dv}{dx}" /> and drops the factor <Katex tex="v" />. Option C, 35, is <Katex tex="5\times7=mv" /> (the momentum) rather than <Katex tex="ma" />.</>,
  },
]

export default function SpecialistQ14_2021() {
  return (
    <MCQShell
      question={
        <p>
          A body of mass 5 kg is acted on by a net force of magnitude <Katex tex="F" />{' '}
          newtons. This force causes the body to move so that its velocity,{' '}
          <Katex tex="v\text{ m s}^{-1}" />, along a straight line of motion is given by{' '}
          <Katex tex="v=3+2x" />, where <Katex tex="x" /> metres is the position of the body
          at time <Katex tex="t" /> seconds.
          <br />
          When <Katex tex="x=2" />, <Katex tex="F" /> is equal to
        </p>
      }
      background={
        <Background title="Force wording, rectilinear kinematics">
          <p>
            Mechanics (force analysis) is off the current Specialist study design, but the
            mathematics here is not: <Katex tex="a=v\tfrac{dv}{dx}" /> is standard
            rectilinear motion, still on the course. The only force idea needed is the very
            last line, Newton's second law: net force = mass × acceleration,{' '}
            <Katex tex="F=ma" />.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="10" /> },
        { letter: 'B', content: <Katex tex="14" /> },
        { letter: 'C', content: <Katex tex="35" /> },
        { letter: 'D', content: <Katex tex="70" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="175" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
