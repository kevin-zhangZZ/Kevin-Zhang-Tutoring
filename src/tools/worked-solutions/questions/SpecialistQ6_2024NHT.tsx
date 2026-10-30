// 2024 Specialist NHT — Exam 2, MCQ 6. The NHT report gives the answer key only, with no
// statistics. Complex numbers: the ray Arg(z + 2 − i) = π/3 starts at −2 + i with gradient
// tan(π/3) = √3. Question text transcribed from the original paper. Solution is original; the
// answer D agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{Arg}\big(z-(-2+i)\big)=\tfrac{\pi}{3}" />,
    reason: <><Katex tex="\mathrm{Arg}(z-z_0)=\theta" /> is the ray starting at <Katex tex="z_0" /> (not including it) that makes angle <Katex tex="\theta" /> with the positive real direction. Write <Katex tex="z+2-i" /> as <Katex tex="z-(-2+i)" /> to read off <Katex tex="z_0=-2+i" />, the point <Katex tex="(-2,\,1)" />.</>,
    more: <>The common slip is reading the start point straight from the signs in <Katex tex="z+2-i" /> as <Katex tex="(2,\,1)" /> or <Katex tex="(2,-1)" />. The start point is whatever makes the bracket zero: <Katex tex="z=-2+i" />.</>,
  },
  {
    working: <Katex display tex="m=\tan\tfrac{\pi}{3}=\sqrt3" />,
    reason: <>The ray points at angle <Katex tex="\tfrac{\pi}{3}" /> above the horizontal, so its gradient is <Katex tex="\tan\tfrac\pi3" />.</>,
  },
  {
    working: <Katex display tex="y-1=\sqrt3\,(x+2)\implies y=\sqrt3\,x+1+2\sqrt3" />,
    reason: <>The ray lies on the line through its start point <Katex tex="(-2,\,1)" /> with gradient <Katex tex="\sqrt3" />. Use point–gradient form <Katex tex="y-y_1=m(x-x_1)" />, then expand and collect the constants.</>,
    more: <>Check: at <Katex tex="x=-2" />, <Katex tex="y=-2\sqrt3+1+2\sqrt3=1" />, the start point.</>,
  },
  {
    working: <Katex display tex="\boxed{m=\sqrt3,\ \ c=1+2\sqrt3}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option <b>B</b> uses the start point <Katex tex="(2,\,1)" />: <Katex tex="y-1=\sqrt3(x-2)" /> gives <Katex tex="c=1-2\sqrt3" />. Option <b>A</b> keeps the right <Katex tex="c" /> but takes the gradient as <Katex tex="\tfrac{1}{\sqrt3}=\tan\tfrac\pi6" />.</>,
  },
]

export default function SpecialistQ6_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          The equation <Katex tex="\mathrm{Arg}(z+2-i)=\dfrac{\pi}{3}" /> defines a ray in the complex plane. Identifying
          complex numbers <Katex tex="x+yi" /> with the points <Katex tex="(x,\,y)" />, this ray lies on the line with
          equation <Katex tex="y=mx+c" />.
          <br />
          The values of <Katex tex="m" /> and <Katex tex="c" /> are respectively
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\dfrac{1}{\sqrt3}" /> and <Katex tex="1+2\sqrt3" /></> },
        { letter: 'B', content: <><Katex tex="\sqrt3" /> and <Katex tex="1-2\sqrt3" /></> },
        { letter: 'C', content: <><Katex tex="\dfrac{1}{\sqrt3}" /> and <Katex tex="2+\sqrt3" /></> },
        { letter: 'D', content: <><Katex tex="\sqrt3" /> and <Katex tex="1+2\sqrt3" /></>, isAnswer: true },
        { letter: 'E', content: <><Katex tex="\sqrt3" /> and <Katex tex="2+\sqrt3" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
