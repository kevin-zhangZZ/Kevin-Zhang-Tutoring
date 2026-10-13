// 2016 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 37% correct.
// Maximise the area of a rectangle inscribed under a parabola, using one corner on the curve.
// Question text transcribed from the original paper; the diagram is cropped directly from
// the original VCAA exam PDF, not a redrawing. Solution is original.
// Interactive (37% correct): slide the corner along the parabola to see the area rise and fall,
// with options B and D shown as the width and height at the peak, and a "forget to square" toggle
// showing where A (maximising u(4 − u)) and C (right u, unsquared height) come from.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2016-mcq14-parabola-rectangle.png'

const RectangleWidget = lazyWidget(() => import('../interactives/meth-2016-mcq14-rectangle'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 21, C: 20, D: 14, E: 37 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      Area of the rectangle <Katex tex="=x(4-x^2)" />
      <br />
      Let <Katex tex="A(x)=x(4-x^2)" />
      <br />
      Solve <Katex tex="A'(x)=-3x^2+4=0,\ x=\dfrac{2\sqrt3}{3}" />
      <br />
      <Katex tex="A\!\left(\dfrac{2\sqrt3}{3}\right)=\dfrac{16\sqrt3}{9}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{corners } (0,0),\ (u,0),\ (u,v),\ (0,v)" />,
    reason: <>The rectangle sits on the axes, with its top-right corner <Katex tex="(u,v)" /> on the parabola.</>,
  },
  {
    working: <Katex display tex="v = 4-u^2, \qquad 0<u<2" />,
    reason: <>The corner <Katex tex="(u,v)" /> lies on <Katex tex="y=4-x^2" />, so its height is <Katex tex="4-u^2" />. A real rectangle needs <Katex tex="v>0" />, so <Katex tex="u<2" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} A(u) &= u \cdot v \\ &= u(4-u^2) \end{aligned}" />
        <Katex display tex="= 4u - u^3" />
      </>
    ),
    reason: <>Area is width <Katex tex="u" /> times height <Katex tex="v" />; replacing <Katex tex="v" /> leaves a function of <Katex tex="u" /> alone, which we can maximise.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} A'(u) &= 4-3u^2 \\ &= 0 \end{aligned}" />
        <Katex display tex="\implies\; u^2 = \frac43" />
        <Katex display tex="\implies\; u = \frac{2}{\sqrt3} = \frac{2\sqrt3}{3}" />
      </>
    ),
    reason: <>The maximum is at a stationary point, so set <Katex tex="A'(u)=0" />. Take the positive root, since <Katex tex="u>0" />.</>,
    more: <>It is a maximum: <Katex tex="A'(u)=4-3u^2" /> is positive just left of <Katex tex="u=\tfrac{2\sqrt3}{3}" /> and negative just right of it. Also <Katex tex="A=0" /> at both ends, <Katex tex="u=0" /> and <Katex tex="u=2" />, so the area rises to this peak and falls away. On CAS, <Cas fn="fMax">fMax(u·(4−u^2), u) | 0 ≤ u ≤ 2</Cas> gives the same <Katex tex="u" />; remember it returns the <Katex tex="u" />-value, not the area.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} v &= 4-\frac43 \\ &= \frac83 \end{aligned}" />,
    reason: <>The height at this <Katex tex="u" />, from <Katex tex="v=4-u^2" /> with <Katex tex="u^2=\tfrac43" />.</>,
    more: <>Square <Katex tex="u" /> here. Using <Katex tex="4-u" /> for the height gives an area of <Katex tex="\tfrac{2\sqrt3}{3}\bigl(4-\tfrac{2\sqrt3}{3}\bigr)=\tfrac{8\sqrt3-4}{3}\approx3.29" />, which is option C (20%).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} A_{\max} &= \frac{2\sqrt3}{3}\times\frac83 \\ &= \frac{16\sqrt3}{9} \end{aligned}" />,
    reason: <>The maximum area is width times height for this rectangle.</>,
  },
  {
    working: <Katex display tex="\boxed{A_{\max} = \dfrac{16\sqrt3}{9}}" />,
    reason: <>Matches option <b>E</b> (about <Katex tex="3.08" />).</>,
    more: <>The question asks for the maximum <b>area</b>. Option B (21%) is the width <Katex tex="u=\tfrac{2\sqrt3}{3}" /> and option D (14%) is the height <Katex tex="v=\tfrac83" /> of the biggest rectangle; both stop one step short. Option C (20%) is the unsquared height, explained above. Option A, <Katex tex="4" />, is what you get by forgetting to square throughout: <Katex tex="u(4-u)" /> peaks at <Katex tex="4" /> when <Katex tex="u=2" />. It is also the parabola's highest point, a height rather than an area.</>,
  },
]

export default function MethodsQ14_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A rectangle is formed by using part of the coordinate axes and a point{' '}
            <Katex tex="(u,v)" />, where <Katex tex="u>0" />, on the parabola <Katex tex="y=4-x^2" />.
          </p>
          <p>Which one of the following is the maximum area of the rectangle?</p>
        </>
      }
      diagram={<img loading="lazy" decoding="async" src={diagramSrc} alt="Rectangle with corner (u,v) inscribed under y = 4 - x², from the original 2016 VCAA exam paper" className="w-full max-w-[260px]" />}
      options={[
        { letter: 'A', content: <Katex tex="4" /> },
        { letter: 'B', content: <Katex tex="\dfrac{2\sqrt3}{3}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{8\sqrt3-4}{3}" /> },
        { letter: 'D', content: <Katex tex="\dfrac83" /> },
        { letter: 'E', content: <Katex tex="\dfrac{16\sqrt3}{9}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="The area peaks at u = 2√3/3, but the answer is the area, not u or v">
          <RectangleWidget />
        </Explore>
      }
    />
  )
}
