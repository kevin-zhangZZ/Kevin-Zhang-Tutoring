// 2023 Specialist NHT — Exam 2, MCQ 10. The NHT report gives the answer key only, with no
// statistics. Calculus: related rates for a draining inverted cone — similar triangles give
// r = h/2, V = πh³/12, then dh/dt = (dV/dt)/(dV/dh). Question text transcribed from the original
// paper; the cone diagram is the actual VCAA figure, cropped from the official exam PDF at 300 dpi.
// Solution is original; the answer E agrees with the report's key (checked with sympy; option A
// is dV/dh × dV/dt, option C is dh/dV, option D drops the minus sign).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import coneSrc from './spec-2023nht-mcq10-cone.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async"
      src={coneSrc}
      alt="VCAA's diagram of an inverted cone of top radius 1 m and height 2 m, with water to a depth of h m"
      className="w-full max-w-[300px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{r}{h}=\frac{1}{2} \implies r=\frac{h}{2}" />,
    reason: <>The water forms a smaller cone similar to the whole cone, so its radius to height ratio is the same, <Katex tex="1:2" />.</>,
  },
  {
    working: <Katex display tex="V=\tfrac13\pi r^2h=\tfrac13\pi\left(\tfrac{h}{2}\right)^2h=\frac{\pi h^3}{12}" />,
    reason: <>Write the volume in terms of <Katex tex="h" /> alone, so it can be differentiated with respect to <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="\frac{dV}{dh}=\frac{3\pi h^2}{12}=\frac{\pi h^2}{4}" />,
    reason: <>Differentiate <Katex tex="V" /> with respect to <Katex tex="h" /> using the power rule.</>,
  },
  {
    working: <Katex display tex="\frac{dV}{dt}=-0.5\sqrt h" />,
    reason: <>The water flows <i>out</i>, so the volume is decreasing: the rate is negative.</>,
  },
  {
    working: <Katex display tex="\frac{dh}{dt}=\frac{dV}{dt}\times\frac{dh}{dV}=-0.5h^{0.5}\times\frac{4}{\pi h^2}=-\frac{2}{\pi h^{1.5}}" />,
    reason: <>Chain rule: <Katex tex="\tfrac{dh}{dV}" /> is the reciprocal of <Katex tex="\tfrac{dV}{dh}" />. Then <Katex tex="h^{0.5}\div h^2=h^{-1.5}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dh}{dt}=-\frac{2}{\pi h^{1.5}}}" />,
    reason: <>Matches option <b>E</b>. The rate is negative, as it must be for a cone that is emptying.</>,
    more: <>Option D drops the minus sign. Option B is the reciprocal of the answer: it divides the wrong way round, <Katex tex="\tfrac{dV}{dh}\div\tfrac{dV}{dt}=\tfrac{\pi h^2}{4}\div(-0.5\sqrt h)=-\tfrac{\pi h^{1.5}}{2}" />. Option A multiplies <Katex tex="\tfrac{dV}{dh}" /> by <Katex tex="\tfrac{dV}{dt}" /> instead of dividing: <Katex tex="\tfrac{\pi h^2}{4}\times(-0.5\sqrt h)=-\tfrac{\pi h^{2.5}}{8}" />. Option C, <Katex tex="\tfrac{4}{\pi h^2}" />, is <Katex tex="\tfrac{dh}{dV}" />, which leaves out the flow rate altogether.</>,
  },
]

export default function SpecialistQ10_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          An inverted right circular cone of radius 1 m and height 2 m is initially full of water, as shown below.
          <br />
          Water flows out through a hole at the bottom at a rate of <Katex tex="0.5\sqrt{h}\ \text{m}^3\,\text{h}^{-1}" />,
          where <Katex tex="h" /> metres is the depth of water remaining in the cone after <Katex tex="t" /> hours.
          <br />
          At time <Katex tex="t" /> hours, <Katex tex="\dfrac{dh}{dt}" /> is given by
        </p>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{\pi h^{2.5}}{8}" /> },
        { letter: 'B', content: <Katex tex="-\dfrac{\pi h^{1.5}}{2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{4}{\pi h^2}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{2}{\pi h^{1.5}}" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{2}{\pi h^{1.5}}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
