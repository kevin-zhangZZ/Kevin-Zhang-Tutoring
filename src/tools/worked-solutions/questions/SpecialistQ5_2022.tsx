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
    reason: <>Write <Katex tex="z=x+yi" /> and subtract <Katex tex="i" />, collecting the real part <Katex tex="x" /> and the imaginary part <Katex tex="y-1" />.</>,
  },
  {
    working: <Katex display tex="x<0 \ \text{ and } \ y-1>0" />,
    reason: <><Katex tex="\tfrac{3\pi}{4}" /> lies between <Katex tex="\tfrac{\pi}{2}" /> and <Katex tex="\pi" />, so the complex number <Katex tex="z-i" /> is in the second quadrant of the Argand plane: negative real part and positive imaginary part. Write this down now: the gradient alone cannot tell options A and B apart, but the quadrant can.</>,
  },
  {
    working: <Katex display tex="\frac{y-1}{x} = \tan\!\left(\tfrac{3\pi}{4}\right) = -1" />,
    reason: <>For a complex number <Katex tex="a+bi" /> with <Katex tex="a\ne0" />, <Katex tex="\tan(\mathrm{Arg})=\tfrac{b}{a}" /> (rise over run from the origin). Here <Katex tex="a=x" /> and <Katex tex="b=y-1" />.</>,
  },
  {
    working: <Katex display tex="y-1=-x \;\implies\; y = 1-x" />,
    reason: <>Multiply both sides by <Katex tex="x" /> (allowed, since <Katex tex="x\ne0" />).</>,
  },
  {
    working: <Katex display tex="y-1>0 \iff -x>0 \iff x<0" />,
    reason: <>With <Katex tex="y=1-x" />, both quadrant conditions reduce to the single restriction <Katex tex="x<0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 1-x,\ \ x<0}" />,
    reason: <>Matches option <b>A</b>. Geometrically this is the ray from the point <Katex tex="(0,1)" /> (that is, <Katex tex="i" />) heading up and to the left at <Katex tex="135^\circ" />, with <Katex tex="(0,1)" /> itself left out because <Katex tex="\mathrm{Arg}(0)" /> is undefined. Option B is the other half of the same line: there <Katex tex="z-i=x-xi" /> with <Katex tex="x>0" />, whose argument is <Katex tex="-\tfrac{\pi}{4}" />. Options C–E have gradient <Katex tex="1" />, not <Katex tex="-1" />: D is the ray <Katex tex="\mathrm{Arg}(z-i)=\tfrac{\pi}{4}" />, E is the ray <Katex tex="\mathrm{Arg}(z-i)=-\tfrac{3\pi}{4}" />, and C is the whole line through both.</>,
  },
]

export default function SpecialistQ5_2022() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="z=x+yi" />, where <Katex tex="x,y\in R" /> and <Katex tex="z\in C" />.
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
