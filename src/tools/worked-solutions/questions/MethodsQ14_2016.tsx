// 2016 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 37% correct.
// Maximise the area of a rectangle inscribed under a parabola, using one corner on the curve.
// Question text transcribed from the original paper; the diagram is cropped directly from
// the original VCAA exam PDF, not a redrawing. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2016-mcq14-parabola-rectangle.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 21, C: 20, D: 14, E: 37 },
  answer: 'E',
  noAnswer: 1,
  comment: <>Area of the rectangle <Katex tex="=uv" />. Solve <Katex tex="A'(u)=-3u^2+4=0" />, <Katex tex="u=\tfrac{2\sqrt3}{3}" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <img src={diagramSrc} alt="Rectangle with corner (u,v) inscribed under y = 4 - x², from the original 2016 VCAA exam paper" className="w-full max-w-[260px]" />
      </div>
    ),
    reason: <>The rectangle's corners are <Katex tex="(0,0)" />, <Katex tex="(u,0)" />, <Katex tex="(u,v)" /> and <Katex tex="(0,v)" />, with <Katex tex="(u,v)" /> on the parabola.</>,
  },
  {
    working: <Katex display tex="v = 4-u^2, \qquad u>0" />,
    reason: <>The corner <Katex tex="(u,v)" /> lies on <Katex tex="y=4-x^2" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} A(u) &= u \cdot v \\ &= u(4-u^2) \end{aligned}" />
        <Katex display tex="= 4u - u^3" />
      </>
    ),
    reason: 'Area of a rectangle is width times height.',
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} A'(u) &= 4-3u^2 \\ &= 0 \end{aligned}" />
        <Katex display tex="\implies\; u^2 = \frac43 \implies u = \frac{2}{\sqrt3} = \frac{2\sqrt3}{3}" />
      </>
    ),
    reason: <>Maximise by setting the derivative to zero (taking the positive root, since <Katex tex="u>0" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} v &= 4-\frac43 \\ &= \frac83 \end{aligned}" />,
    reason: 'The corresponding height.',
  },
  {
    working: <Katex display tex="\begin{aligned} A_{\max} &= \frac{2\sqrt3}{3}\times\frac83 \\ &= \frac{16\sqrt3}{9} \end{aligned}" />,
  },
  {
    working: <Katex display tex="\boxed{A_{\max} = \dfrac{16\sqrt3}{9}}" />,
    reason: <>Matches option <b>E</b>.</>,
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
      diagram={<img src={diagramSrc} alt="Rectangle with corner (u,v) inscribed under y = 4 - x², from the original 2016 VCAA exam paper" className="w-full max-w-[260px]" />}
      options={[
        { letter: 'A', content: <Katex tex="4" /> },
        { letter: 'B', content: <Katex tex="\dfrac{2\sqrt3}{3}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{8\sqrt3-4}{3}" /> },
        { letter: 'D', content: <Katex tex="\dfrac83" /> },
        { letter: 'E', content: <Katex tex="\dfrac{16\sqrt3}{9}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
