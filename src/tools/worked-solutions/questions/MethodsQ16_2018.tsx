// 2018 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 49% correct.
// Compare a right-endpoint rectangle approximation of an area to the exact integral.
// Question text/diagram transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 49, C: 18, D: 9, E: 15 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      Area of the rectangles <Katex tex="=\dfrac{\pi}{6}\Bigl[f(\tfrac{\pi}{6})+f(\tfrac{\pi}{3})+f(\tfrac{\pi}{2})\Bigr]" />.
      Actual area <Katex tex="=\displaystyle\int_0^{\pi/2} f(x)\,dx" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <RectangleApproxDiagram />
      </div>
    ),
    reason: <>Three rectangles of equal width <Katex tex="\tfrac{\pi}{6}" />, each using the function's value at its <em>right</em> edge as the height.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f\!\left(\tfrac{\pi}{6}\right) = 2\cos\!\left(\tfrac{\pi}{3}\right)+3 = 2(0.5)+3 = 4" />
        <Katex display tex="f\!\left(\tfrac{\pi}{3}\right) = 2\cos\!\left(\tfrac{2\pi}{3}\right)+3 = 2(-0.5)+3 = 2" />
        <Katex display tex="f\!\left(\tfrac{\pi}{2}\right) = 2\cos(\pi)+3 = 2(-1)+3 = 1" />
      </>
    ),
    reason: 'The heights of the three rectangles.',
  },
  {
    working: <Katex display tex="\text{Jamie's area} = \frac{\pi}{6}(4+2+1) = \frac{7\pi}{6}" />,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Exact area} = \int_0^{\pi/2}\bigl(2\cos(2x)+3\bigr)dx" />
        <Katex display tex="= \Bigl[\sin(2x)+3x\Bigr]_0^{\pi/2} = \bigl(\sin\pi+\tfrac{3\pi}{2}\bigr)-0 = \frac{3\pi}{2}" />
      </>
    ),
  },
  {
    working: <Katex display tex="\text{ratio} = \frac{7\pi/6}{3\pi/2} = \frac{7}{6}\times\frac{2}{3} = \frac{14}{18}" />,
    reason: "Jamie's approximation, as a fraction of the exact area.",
  },
  {
    working: <Katex display tex="\boxed{\frac{7}{9}}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function MethodsQ16_2018() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit mb-3">
            <RectangleApproxDiagram />
          </div>
          <p className="mb-2">
            Jamie approximates the area between the <Katex tex="x" />-axis and the graph of{' '}
            <Katex tex="y=2\cos(2x)+3" />, over the interval <Katex tex="\left[0,\tfrac{\pi}{2}\right]" />,
            using the three rectangles shown above.
          </p>
          <p>Jamie's approximation as a fraction of the exact area is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac59" /> },
        { letter: 'B', content: <Katex tex="\dfrac79" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{9}{11}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{11}{18}" /> },
        { letter: 'E', content: <Katex tex="\dfrac73" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}

// y = 2cos(2x)+3 on [0, π/2], with three right-endpoint rectangles of width π/6.
function RectangleApproxDiagram() {
  const ox = 30
  const oy = 140
  const scaleX = 220 / (Math.PI / 2)
  const scaleY = 18
  const f = (x: number) => 2 * Math.cos(2 * x) + 3
  const curvePts: string[] = []
  for (let i = 0; i <= 50; i++) {
    const x = (Math.PI / 2) * (i / 50)
    curvePts.push(`${ox + x * scaleX},${oy - f(x) * scaleY}`)
  }
  const edges = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2]
  return (
    <svg viewBox="0 0 270 150" width={270} height={150}>
      <line x1={0} y1={oy} x2={260} y2={oy} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={ox} y1={5} x2={ox} y2={oy} stroke="#9ca3af" strokeWidth={1.5} />

      {[0, 1, 2].map(i => {
        const x0 = edges[i]
        const x1 = edges[i + 1]
        const h = f(x1)
        return (
          <rect
            key={i}
            x={ox + x0 * scaleX}
            y={oy - h * scaleY}
            width={(x1 - x0) * scaleX}
            height={h * scaleY}
            fill="#38bdf8"
            fillOpacity={0.2}
            stroke="#38bdf8"
            strokeWidth={1.25}
          />
        )
      })}

      <polyline points={curvePts.join(' ')} fill="none" stroke="#f97316" strokeWidth={2} />

      <text x={ox + (Math.PI / 6) * scaleX - 6} y={oy + 14} fontSize={10} className="fill-gray-500 dark:fill-gray-400">π/6</text>
      <text x={ox + (Math.PI / 3) * scaleX - 6} y={oy + 14} fontSize={10} className="fill-gray-500 dark:fill-gray-400">π/3</text>
      <text x={ox + (Math.PI / 2) * scaleX - 6} y={oy + 14} fontSize={10} className="fill-gray-500 dark:fill-gray-400">π/2</text>
    </svg>
  )
}
