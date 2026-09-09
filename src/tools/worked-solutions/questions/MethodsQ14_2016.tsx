// 2016 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 37% correct.
// Maximise the area of a rectangle inscribed under a parabola, using one corner on the curve.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 21, C: 20, D: 14, E: 37 },
  answer: 'E',
  noAnswer: 1,
  comment: <>Area of the rectangle <Katex tex="=uv" />. Solve <Katex tex="A'(u)=-3u^2+4=0" />, <Katex tex="u=\tfrac{2\sqrt3}{3}" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <RectangleDiagram />
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
        <Katex display tex="A(u) = u \cdot v = u(4-u^2)" />
        <Katex display tex="= 4u - u^3" />
      </>
    ),
    reason: 'Area of a rectangle is width times height.',
  },
  {
    working: (
      <>
        <Katex display tex="A'(u) = 4-3u^2 = 0" />
        <Katex display tex="\implies\; u^2 = \frac43 \implies u = \frac{2}{\sqrt3} = \frac{2\sqrt3}{3}" />
      </>
    ),
    reason: <>Maximise by setting the derivative to zero (taking the positive root, since <Katex tex="u>0" />).</>,
  },
  {
    working: <Katex display tex="v = 4-\frac43 = \frac83" />,
    reason: 'The corresponding height.',
  },
  {
    working: <Katex display tex="A_{\max} = \frac{2\sqrt3}{3}\times\frac83 = \frac{16\sqrt3}{9}" />,
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
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit mb-3">
            <RectangleDiagram />
          </div>
          <p className="mb-2">
            A rectangle is formed by using part of the coordinate axes and a point{' '}
            <Katex tex="(u,v)" />, where <Katex tex="u>0" />, on the parabola <Katex tex="y=4-x^2" />.
          </p>
          <p>Which one of the following is the maximum area of the rectangle?</p>
        </>
      }
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

// y = 4 - x², with the maximising rectangle (u,v) = (2√3/3, 8/3) drawn in.
function RectangleDiagram() {
  const ox = 30
  const oy = 140
  const scale = 42
  const uMax = 2
  const curvePts: string[] = []
  for (let i = 0; i <= 40; i++) {
    const x = (uMax * i) / 40
    const y = 4 - x * x
    curvePts.push(`${ox + x * scale},${oy - y * scale}`)
  }
  const u = 2 / Math.sqrt(3)
  const v = 4 - u * u
  const ux = ox + u * scale
  const vy = oy - v * scale
  return (
    <svg viewBox="0 0 220 160" width={220} height={160}>
      <line x1={0} y1={oy} x2={210} y2={oy} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={ox} y1={10} x2={ox} y2={oy} stroke="#9ca3af" strokeWidth={1.5} />
      <text x={195} y={oy + 14} fontSize={11} className="fill-gray-500 dark:fill-gray-400">x</text>
      <text x={ox - 18} y={20} fontSize={11} className="fill-gray-500 dark:fill-gray-400">y</text>

      <polyline points={curvePts.join(' ')} fill="none" stroke="#f97316" strokeWidth={2} />

      <rect x={ox} y={vy} width={ux - ox} height={oy - vy} fill="#38bdf8" fillOpacity={0.15} stroke="#38bdf8" strokeWidth={1.5} />
      <circle cx={ux} cy={vy} r={3.5} fill="#dc2626" />
      <text x={ux + 5} y={vy - 4} fontSize={11} className="fill-rose-600 dark:fill-rose-400">(u, v)</text>
    </svg>
  )
}
