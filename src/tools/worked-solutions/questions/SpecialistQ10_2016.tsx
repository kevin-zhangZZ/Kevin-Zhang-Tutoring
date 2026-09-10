// 2016 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 65% correct.
// Trace a solution curve of dy/dx = -x - y through a given direction field, starting at
// (0, -1) and following the field. This is genuinely a graphical/numerical question, not an
// algebraic one: solving dy/dx + y = -x by an integrating factor is not in the VCE Specialist
// Mathematics study design (only separable differential equations are solved analytically in
// this course) — the direction field is given precisely so the solution curve can be traced
// directly from it. The solution below does that using Euler's method (which is in the
// course) as a rigorous, reproducible way to "follow the field lines" numerically from
// (0, -1), matching the diagram's own 0.5-unit grid spacing, rather than solving the
// equation. Question text transcribed from the original paper; the direction field diagram —
// both in the question and in the worked solution below — is the actual VCAA diagram
// (cropped from the official exam PDF), not a redrawing. The worked solution overlays the
// traced path and the two marked points on top of that same real image (calibrated to its
// gridlines), rather than redrawing the field itself. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import directionFieldSrc from './spec-2016-mcq10-direction-field.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 65, C: 14, D: 11, E: 4 },
  answer: 'B',
  noAnswer: 0,
}

// Euler's-method trace of dy/dx = -x-y from (0,-1), step size h=0.5 (matching the diagram's
// own grid spacing) — computed with y_{n+1} = y_n + h·f(x_n,y_n). Numeric x/y used for the
// overlay's pixel calibration below; yLabel/fLabel are the same values pre-formatted (proper
// minus sign, 3 sig figs) for display in the table.
const STEPS: { x: number; y: number; yLabel: string; fLabel: string }[] = [
  { x: 0, y: -1, yLabel: '−1', fLabel: '1' },
  { x: 0.5, y: -0.5, yLabel: '−0.5', fLabel: '0' },
  { x: 1, y: -0.5, yLabel: '−0.5', fLabel: '−0.5' },
  { x: 1.5, y: -0.75, yLabel: '−0.75', fLabel: '−0.75' },
  { x: 2, y: -1.125, yLabel: '−1.125', fLabel: '−0.875' },
  { x: 2.5, y: -1.5625, yLabel: '−1.563', fLabel: '−0.938' },
  { x: 3, y: -2.03125, yLabel: '−2.031', fLabel: '−0.969' },
  { x: 3.5, y: -2.515625, yLabel: '−2.516', fLabel: '−0.984' },
]

const STEPS_TABLE = (
  <div className="overflow-x-auto">
    <table className="w-full text-[13px] text-center border-collapse">
      <thead>
        <tr className="bg-gray-50 dark:bg-gray-800/60">
          <th className="px-3 py-1.5 text-left">Step</th>
          <th className="px-3 py-1.5">x</th>
          <th className="px-3 py-1.5">y</th>
          <th className="px-3 py-1.5">f(x, y) = −x − y</th>
        </tr>
      </thead>
      <tbody className="[&>tr]:border-t [&>tr]:border-gray-100 dark:[&>tr]:border-gray-800">
        {STEPS.map((s, i) => (
          <tr key={i}>
            <td className="px-3 py-1.5 text-left">{i}</td>
            <td className="px-3 py-1.5">{s.x}</td>
            <td className="px-3 py-1.5">{s.yLabel}</td>
            <td className="px-3 py-1.5">{s.fLabel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const ROWS: WorkingRow[] = [
  {
    working: <>Rearrange: <Katex tex="\dfrac{dy}{dx} = -x-y" />.</>,
    reason: <>This is a first-order linear differential equation, but solving it by an integrating factor is <b>not</b> a VCE Specialist Mathematics technique — only separable differential equations are solved analytically in this course. The direction field is given precisely so the solution curve can be traced directly from it instead.</>,
  },
  {
    working: <>Start at the given point <Katex tex="(0,-1)" /> and follow the field: at each point, step a small distance <Katex tex="h" /> in the direction the local arrow points, then re-read the new local slope and repeat — this is <b>Euler's method</b>, a genuine VCE Specialist Mathematics technique for numerically tracing a solution curve.</>,
    reason: <>Using the diagram's own <Katex tex="0.5" />-unit grid spacing as the step size <Katex tex="h" /> keeps every step lined up with an arrow actually drawn on the field.</>,
  },
  {
    working: STEPS_TABLE,
    reason: <>Each row applies <Katex tex="y_{n+1} = y_n + h \cdot f(x_n,y_n)" /> with <Katex tex="f(x,y)=-x-y" /> and <Katex tex="h=0.5" />, starting from <Katex tex="(x_0,y_0)=(0,-1)" />.</>,
  },
  {
    working: (
      <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <DirectionFieldDiagram />
      </div>
    ),
    reason: <>The traced path, plotted directly on the real direction field, visibly follows the arrows all the way from <Katex tex="(0,-1)" /> out to <Katex tex="x=3.5" />.</>,
  },
  {
    working: (
      <>
        A: at <Katex tex="x=3" />, the trace gives <Katex tex="y\approx-2.03" />, not <Katex tex="-1" />.
        <br />
        D: at <Katex tex="x=2.5" />, the trace gives <Katex tex="y\approx-1.56" />, not <Katex tex="-1" />.
        <br />
        E: at <Katex tex="x=2.5" />, the trace gives <Katex tex="y\approx-1.56" /> — not even the right sign for <Katex tex="+1" />.
      </>
    ),
    reason: 'Each of these sits well away from the traced curve — ruled out.',
  },
  {
    working: <>C: tracing <em>backward</em> from <Katex tex="(0,-1)" /> with the same method (<Katex tex="h=-0.5" />) gives <Katex tex="y(-1)\approx-2.5" /> and <Katex tex="y(-1.5)\approx-4.25" /> — nowhere near <Katex tex="-2" />.</>,
    reason: <>The curve drops away much faster than option C suggests as <Katex tex="x" /> decreases below <Katex tex="0" /> — ruled out.</>,
  },
  {
    working: <Katex display tex="\boxed{y(3.5) \approx -2.52 \ \approx \ (3.5,\,-2.5)}" />,
    reason: <>Matches option <b>B</b> — the only point lying on (or extrapolating smoothly along) the traced curve through <Katex tex="(0,-1)" />.</>,
  },
]

export default function SpecialistQ10_2016() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit mb-3">
            <img src={directionFieldSrc} alt="Direction field for dy/dx + x + y = 0, from the original 2016 VCAA exam paper" className="w-full max-w-[300px]" />
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

// Overlays the Euler's-method trace (from the STEPS table above, step size 0.5) on top of the
// *real* cropped VCAA direction-field image — a piecewise-linear path following the arrows
// from (0,-1) out to (3.5,-2.52), rather than redrawing the field itself. Pixel calibration
// (ox, oy, scaleX, scaleY) was measured directly off spec-2016-mcq10-direction-field.png's own
// gridlines (1275×889px; gridlines every 0.5 units), so the overlay lines up with the real
// image, not an approximation of it.
function DirectionFieldDiagram() {
  const ox = 636
  const oy = 484
  const scaleX = 143.4
  const scaleY = 131
  const tracePts = STEPS.map(s => `${ox + s.x * scaleX},${oy - s.y * scaleY}`)
  return (
    <div className="relative w-full max-w-[300px]">
      <img
        src={directionFieldSrc}
        alt="Direction field for dy/dx + x + y = 0, from the original 2016 VCAA exam paper"
        className="w-full block"
      />
      <svg viewBox="0 0 1275 889" className="absolute inset-0 w-full h-full">
        <polyline points={tracePts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={5} />
        {STEPS.map((s, i) => (
          <circle key={i} cx={ox + s.x * scaleX} cy={oy - s.y * scaleY} r={6} className="fill-sky-500" />
        ))}
        <circle cx={ox} cy={oy - -1 * scaleY} r={9} fill="#dc2626" />
        <text x={ox + 14} y={oy - -1 * scaleY - 14} fontSize={26} className="fill-rose-600 dark:fill-rose-400">(0, −1)</text>

        <circle cx={ox + 3.5 * scaleX} cy={oy - -2.515625 * scaleY} r={9} fill="#22c55e" />
        <text x={ox + 3.5 * scaleX - 190} y={oy - -2.515625 * scaleY - 16} fontSize={26} className="fill-emerald-600 dark:fill-emerald-400">
          ≈ (3.5, −2.5)
        </text>
      </svg>
    </div>
  )
}
