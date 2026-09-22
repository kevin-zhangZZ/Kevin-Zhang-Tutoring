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
    reason: <>Velocity is given as a function of <em>position</em>, not time, which is the signal to use <Katex tex="a=v\tfrac{dv}{dx}" />.</>,
  },
  {
    working: <Katex display tex="a = v\frac{dv}{dx} = (3+2x)(2) = 6+4x" />,
    reason: <>The chain-rule form from the formula sheet. Differentiating with respect to <Katex tex="t" /> directly is not possible here.</>,
  },
  {
    working: <Katex display tex="x = 2: \ a = 6+8 = 14\ \text{m s}^{-2}" />,
    reason: <>Option B stops here, giving the acceleration rather than the force.</>,
  },
  {
    working: <Katex display tex="F = ma = 5\times14" />,
    reason: 'Now the mass enters.',
  },
  {
    working: <Katex display tex="\boxed{F = 70\ \text{N}}" />,
    reason: <>Matches option <b>D</b>. Option C, 35, comes from using <Katex tex="a=\tfrac{dv}{dx}\cdot" /> something without the factor <Katex tex="v" />; option E squares the velocity.</>,
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
          at time <Katex tex="t" /> seconds. When <Katex tex="x=2" />, <Katex tex="F" /> is
          equal to
        </p>
      }
      background={
        <Background title="Force wording, rectilinear kinematics">
          <p>
            Mechanics is off the current Specialist study design, but the mathematics here is
            not: <Katex tex="a=v\tfrac{dv}{dx}" /> is standard rectilinear motion, still on
            the course. Only the very last line, <Katex tex="F=ma" />, is Mechanics, and the
            units in the question hand it to you.
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
