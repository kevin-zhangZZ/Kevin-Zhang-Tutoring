// 2025 Specialist NHT — Exam 2, MCQ 7. The NHT report gives the answer key only, with no
// statistics. Calculus: related rates for a draining inverted cone, net inflow 5 − k√h. Question
// text transcribed from the original paper (the 2025 NHT paper is image-only, so read from the
// rendered page); the cone diagram is cropped from the original VCAA exam PDF. Solution is
// original; the answer C agrees with the report's key (sympy: V = πh³/12, dh/dt = 4(5 − k√h)/(πh²)).
// Distractor B checked: using r = 2h (the ratio upside down) gives (5 − k√h)/(4πh²).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import coneSrc from './spec-2025nht-mcq7-cone.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async"
      src={coneSrc}
      alt="VCAA's diagram of an inverted right circular cone, vertex at the bottom, with top radius 10 cm and height 20 cm marked by dashed lines"
      className="w-full max-w-[300px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{r}{h}=\frac{10}{20}\ \Rightarrow\ r=\frac{h}{2}" />,
    reason: <>The water forms a smaller cone similar to the whole cone, so its radius and depth are in the same ratio, radius : height <Katex tex="=10:20" />.</>,
  },
  {
    working: <Katex display tex="V=\frac13\pi r^2h=\frac13\pi\left(\frac h2\right)^2h=\frac{\pi h^3}{12}" />,
    reason: <>Write the volume of water in terms of the depth alone, so it can be differentiated with respect to <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="\frac{dV}{dh}=\frac{\pi h^2}{4},\qquad \frac{dV}{dt}=5-k\sqrt h" />,
    reason: <>Differentiate <Katex tex="V=\tfrac{\pi}{12}h^3" /> with respect to <Katex tex="h" />. The volume changes at the rate in minus the rate out.</>,
  },
  {
    working: <Katex display tex="\frac{dh}{dt}=\frac{dV}{dt}\div\frac{dV}{dh}=\left(5-k\sqrt h\right)\times\frac{4}{\pi h^2}" />,
    reason: <>Chain rule: <Katex tex="\tfrac{dV}{dt}=\tfrac{dV}{dh}\cdot\tfrac{dh}{dt}" />, so divide the volume rate by <Katex tex="\tfrac{dV}{dh}" />.</>,
    more: <><Katex tex="\tfrac{dV}{dh}=\tfrac{\pi h^2}{4}" /> is the area of the water&apos;s surface, <Katex tex="\pi r^2" />. Each extra cubic centimetre spreads over that area, so the depth rises by volume rate ÷ surface area.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dh}{dt}=\frac{4\left(5-k\sqrt h\right)}{\pi h^2}}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Sense check: when <Katex tex="k\sqrt h=5" />, water leaves as fast as it arrives and the depth stops changing, and the bigger <Katex tex="h" /> is, the wider the surface and the slower the depth rises. Option <b>B</b> comes from writing <Katex tex="r=2h" />, the ratio upside down: then <Katex tex="V=\tfrac43\pi h^3" /> and <Katex tex="\tfrac{dV}{dh}=4\pi h^2" />.</>,
  },
]

export default function SpecialistQ7_2025NHT() {
  return (
    <MCQShell
      question={
        <>
          <p>
            Water is poured at a rate of <Katex tex="5\ \mathrm{cm^3\,s^{-1}}" /> into an inverted right circular cone of
            height 20 cm and radius 10 cm, as shown below.
            <br />
            Water flows through a hole at the vertex of the cone at a rate of <Katex tex="k\sqrt h\ \mathrm{cm^3\,s^{-1}}" />,
            where <Katex tex="h" /> cm is the depth of water in the cone at time <Katex tex="t" /> seconds, and{' '}
            <Katex tex="k" /> is an arbitrary positive constant.
          </p>
          <p className="mt-2">
            The rate at which the depth of water is increasing when the depth of water is <Katex tex="h" /> cm is
          </p>
        </>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{5-k\sqrt h}{3\pi h^2}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{5-k\sqrt h}{4\pi h^2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{4\left(5-k\sqrt h\right)}{\pi h^2}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{5-k\sqrt h}{\pi h^3}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
