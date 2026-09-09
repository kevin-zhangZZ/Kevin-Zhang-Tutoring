// 2016 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 65% correct.
// Trace a solution curve of dy/dx = -x - y through a hand-drawn direction field.
// Question text transcribed from the original paper; the direction field is redrawn here by
// computing the exact slope -x-y at every grid point (rather than copying the original
// drawing), and the exact solution curve through (0,-1) is solved and overlaid.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 65, C: 14, D: 11, E: 4 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} + x + y = 0 \;\implies\; \frac{dy}{dx} = -x-y" />,
    reason: 'Rearrange the given differential equation into explicit form, ready to solve.',
  },
  {
    working: (
      <>
        <Katex display tex="\frac{dy}{dx} + y = -x" />
        <Katex display tex="\text{integrating factor: } e^{\int 1\,dx} = e^x" />
      </>
    ),
    reason: 'A first-order linear equation — solve it exactly rather than only reading the field by eye.',
  },
  {
    working: (
      <>
        <Katex display tex="\frac{d}{dx}\bigl(ye^x\bigr) = -xe^x" />
        <Katex display tex="\implies\; ye^x = \int -xe^x\,dx = (1-x)e^x + C" />
      </>
    ),
    reason: <>Integrate by parts: <Katex tex="\int -xe^x\,dx = -xe^x+\int e^x\,dx = (1-x)e^x+C" />.</>,
  },
  {
    working: <Katex display tex="y = 1-x + Ce^{-x}" />,
    reason: <>Divide through by <Katex tex="e^x" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="(0,-1): \ -1 = 1-0+Ce^0 = 1+C" />
        <Katex display tex="\implies\; C=-2" />
      </>
    ),
    reason: 'Use the given point to pin down the particular solution.',
  },
  {
    working: <Katex display tex="\boxed{y = 1-x-2e^{-x}}" />,
  },
  {
    working: (
      <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <DirectionFieldDiagram />
      </div>
    ),
    reason: (
      <>
        Checking each option against <Katex tex="y=1-x-2e^{-x}" />: <Katex tex="y(3)\approx-2.10" /> (not{' '}
        <Katex tex="-1" />), <Katex tex="y(-1.5)\approx-6.46" />, <Katex tex="y(2.5)\approx-1.66" /> — none of
        A, C, D, E lie on the curve. Only <Katex tex="y(3.5)\approx-2.56" /> is close to a listed point.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{y(3.5) \approx -2.56 \ \approx \ (3.5,\,-2.5)}" />,
    reason: <>Matches option <b>B</b> — the only point lying on (or extrapolating smoothly along) the solution curve through <Katex tex="(0,-1)" />.</>,
  },
]

export default function SpecialistQ10_2016() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit mb-3">
            <DirectionFieldDiagram />
          </div>
          <p className="mb-2">
            The direction field for the differential equation <Katex tex="\dfrac{dy}{dx}+x+y=0" /> is shown
            above.
          </p>
          <p>
            A solution to this differential equation that includes <Katex tex="(0,-1)" /> could also include
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="(3,\,-1)" /> },
        { letter: 'B', content: <Katex tex="(3.5,\,-2.5)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="(-1.5,\,-2)" /> },
        { letter: 'D', content: <Katex tex="(2.5,\,-1)" /> },
        { letter: 'E', content: <Katex tex="(2.5,\,1)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}

// Direction field for dy/dx = -x-y on x,y ∈ [-3,3], with a short tangent-line segment drawn at
// each integer grid point using the exact computed slope (not traced from the original
// drawing) — plus the actual solution curve y = 1-x-2e^{-x} through (0,-1), extended out to
// x=3.5 where it reaches option B.
function SlopeSegment({ x, y, scale, ox, oy }: { x: number; y: number; scale: number; ox: number; oy: number }) {
  const slope = -x - y
  const len = 0.35 // half-length in data units, before normalising by slope
  const norm = Math.sqrt(1 + slope * slope)
  const dx = len / norm
  const dy = (len * slope) / norm
  const cx = ox + x * scale
  const cy = oy - y * scale
  return (
    <line
      x1={cx - dx * scale}
      y1={cy + dy * scale}
      x2={cx + dx * scale}
      y2={cy - dy * scale}
      stroke="#9ca3af"
      strokeWidth={1.5}
    />
  )
}

function DirectionFieldDiagram() {
  const scale = 38
  const ox = 150
  const oy = 130
  const points: { x: number; y: number }[] = []
  for (let x = -3; x <= 3; x++) {
    for (let y = -2; y <= 2; y++) points.push({ x, y })
  }
  // Solution curve y = 1 - x - 2e^{-x}, sampled from x = -1.2 (leaves the visible box near the
  // top) to x = 3.5 (where option B sits).
  const curvePts: string[] = []
  for (let i = 0; i <= 60; i++) {
    const x = -1.2 + (4.7 * i) / 60
    const y = 1 - x - 2 * Math.exp(-x)
    curvePts.push(`${ox + x * scale},${oy - y * scale}`)
  }
  return (
    <svg viewBox="0 0 300 260" width={280} height={243}>
      <line x1={0} y1={oy} x2={300} y2={oy} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={ox} y1={0} x2={ox} y2={260} stroke="#9ca3af" strokeWidth={1.5} />
      {[-3, -2, -1, 1, 2, 3].map(n => (
        <text key={`xt${n}`} x={ox + n * scale - 3} y={oy + 14} fontSize={10} className="fill-gray-500 dark:fill-gray-400">{n}</text>
      ))}
      {[-2, -1, 1, 2].map(n => (
        <text key={`yt${n}`} x={ox + 6} y={oy - n * scale + 3} fontSize={10} className="fill-gray-500 dark:fill-gray-400">{n}</text>
      ))}

      {points.map((p, i) => (
        <SlopeSegment key={i} x={p.x} y={p.y} scale={scale} ox={ox} oy={oy} />
      ))}

      <polyline points={curvePts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.25} />
      <circle cx={ox} cy={oy - -1 * scale} r={4} fill="#dc2626" />
      <text x={ox + 6} y={oy - -1 * scale - 6} fontSize={11} className="fill-rose-600 dark:fill-rose-400">(0, −1)</text>

      <circle cx={ox + 3.5 * scale} cy={oy - -2.56 * scale} r={4} fill="#22c55e" />
      <text x={ox + 3.5 * scale - 60} y={oy - -2.56 * scale - 8} fontSize={11} className="fill-emerald-600 dark:fill-emerald-400">
        ≈ (3.5, −2.5)
      </text>
    </svg>
  )
}
