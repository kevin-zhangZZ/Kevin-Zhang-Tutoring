// 2022 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 62% correct.
// Which Cartesian statement matches Arg(z − i) = 3π/4. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 62, B: 14, C: 4, D: 11, E: 9 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z-i = x + (y-1)i" />,
    reason: <>Write <Katex tex="z=x+yi" /> and subtract <Katex tex="i" />.</>,
  },
  {
    working: <>This is a ray starting at <Katex tex="(0,1)" /> in the direction of angle <Katex tex="\tfrac{3\pi}{4}=135^\circ" /> (up and to the left).</>,
    reason: <><Katex tex="\mathrm{Arg}(z-i)=\tfrac{3\pi}{4}" /> fixes both the gradient <i>and</i> which half of the line.</>,
  },
  {
    working: <Katex display tex="\text{gradient} = \tan\!\big(\tfrac{3\pi}{4}\big) = -1" />,
    reason: 'Gradient from the angle.',
  },
  {
    working: <Katex display tex="y - 1 = -1\cdot(x-0) \;\implies\; y = 1-x" />,
    reason: 'Point-gradient form through (0, 1).',
  },
  {
    working: <>Since the ray points up-and-left (second-quadrant direction from its start), every point on it has <Katex tex="x<0" />.</>,
    reason: <>This restriction is what separates the correct option from the plain line <Katex tex="y=1-x" /> (option C is for the whole underlying line, not just the ray).</>,
  },
  {
    working: <Katex display tex="\boxed{y = 1-x,\ \ x<0}" />,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ5_2022() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="z=x+yi" />, where <Katex tex="x,y\in\mathbb{R}" /> and <Katex tex="z\in\mathbb{C}" />.
          <br />
          If <Katex tex="\mathrm{Arg}(z-i)=\dfrac{3\pi}{4}" />, which one of the following is true?
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="y=1-x" />, <Katex tex="x<0" /></>, isAnswer: true },
        { letter: 'B', content: <><Katex tex="y=1-x" />, <Katex tex="x>0" /></> },
        { letter: 'C', content: <Katex tex="y=1+x" /> },
        { letter: 'D', content: <><Katex tex="y=1+x" />, <Katex tex="x>0" /></> },
        { letter: 'E', content: <><Katex tex="y=1+x" />, <Katex tex="x<0" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
