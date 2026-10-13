// 2016 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 65% correct.
// Trace a solution curve of dy/dx = −x − y through a given direction field, starting at
// (0, −1) and following the arrows. Question text transcribed from the original paper; the
// direction field — in the question and in the worked solution — is VCAA's own diagram,
// cropped from the exam PDF. The worked solution overlays the traced path on that real
// image (calibrated to its gridlines) rather than redrawing the field. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import directionFieldSrc from './spec-2016-mcq10-direction-field.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 65, C: 14, D: 11, E: 4 },
  answer: 'B',
  noAnswer: 0,
}

// Points along the curve traced from (0,-1): Euler's method with step 0.5 (the diagram's own
// grid spacing), which is "follow the local arrow, re-read, repeat" made precise. Verified
// against the exact solution y = 1 - x - 2e^(-x) (e.g. y(3.5) = -2.56; Euler gives -2.516).
const STEPS: { x: number; y: number; yLabel: string }[] = [
  { x: 0, y: -1, yLabel: '−1' },
  { x: 0.5, y: -0.5, yLabel: '−0.5' },
  { x: 1, y: -0.5, yLabel: '−0.5' },
  { x: 1.5, y: -0.75, yLabel: '−0.75' },
  { x: 2, y: -1.125, yLabel: '−1.125' },
  { x: 2.5, y: -1.5625, yLabel: '−1.563' },
  { x: 3, y: -2.03125, yLabel: '−2.031' },
  { x: 3.5, y: -2.515625, yLabel: '−2.516' },
]

const STEPS_TABLE = (
  <div className="overflow-x-auto">
    <table className="w-full text-[13px] text-center border-collapse">
      <thead>
        <tr className="bg-gray-50 dark:bg-gray-800/60">
          <th className="px-3 py-1.5">x</th>
          <th className="px-3 py-1.5">approximate y on the traced curve</th>
        </tr>
      </thead>
      <tbody className="[&>tr]:border-t [&>tr]:border-gray-100 dark:[&>tr]:border-gray-800">
        {STEPS.map((s, i) => (
          <tr key={i}>
            <td className="px-3 py-1.5">{s.x}</td>
            <td className="px-3 py-1.5">{s.yLabel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = -x-y" />,
    reason: <>Rearrange for the slope at any point. At <Katex tex="(0,-1)" /> it is <Katex tex="-0-(-1)=+1" />, so the solution curve starts off rising.</>,
    more: <>The quickest route on a multiple-choice question is to start at the given point and <b>follow the arrows already drawn</b> on the field, stepping a little at a time and re-reading the slope at each new point — which is exactly Euler's method with a small step.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <DirectionFieldDiagram />
      </div>
    ),
    reason: <>Following the arrows right from <Katex tex="(0,-1)" />, the curve rises briefly, levels off where <Katex tex="-x-y=0" />, then falls ever more steeply.</>,
    more: <>The slope is zero on the line <Katex tex="y=-x" />, which this curve crosses near <Katex tex="x\approx0.7" />: that is its highest point. Past that point (above the line <Katex tex="y=-x" />) the slopes are negative and keep steepening, but never past <Katex tex="-1" />: the straight line <Katex tex="y=1-x" /> is itself a solution (its slope <Katex tex="-1" /> equals <Katex tex="-x-(1-x)" />), and our curve, which starts below it, bends towards it from below without crossing it.</>,
  },
  {
    working: STEPS_TABLE,
    reason: <>To put numbers on the traced curve, step along the arrows with the grid spacing <Katex tex="0.5" />: <Katex tex="y_{n+1}=y_n+0.5\left(-x_n-y_n\right)" /> (Euler's method).</>,
    more: <>
      For example, from <Katex tex="(0,-1)" /> the slope is <Katex tex="1" />, so <Katex tex="y(0.5)\approx-1+0.5(1)=-0.5" />. At <Katex tex="(0.5,-0.5)" /> the slope is <Katex tex="0" />, so <Katex tex="y(1)\approx-0.5" />. At <Katex tex="(1,-0.5)" /> the slope is <Katex tex="-0.5" />, so <Katex tex="y(1.5)\approx-0.75" />, and so on. These values are only approximate, but they are close enough to tell the five options apart.
    </>,
  },
  {
    working: (
      <>
        A: at <Katex tex="x=3" />, the curve sits at <Katex tex="y\approx-2.03" />, not <Katex tex="-1" />.
        <br />
        D: at <Katex tex="x=2.5" />, the curve sits at <Katex tex="y\approx-1.56" />, not <Katex tex="-1" />.
        <br />
        E: at <Katex tex="x=2.5" />, the curve is below the <Katex tex="x" />-axis, nowhere near <Katex tex="+1" />.
      </>
    ),
    reason: <>Each of these is well away from the traced curve, so ruled out.</>,
  },
  {
    working: <>C: going left from <Katex tex="(0,-1)" />, <Katex tex="y(-0.5)\approx-1.5" />, <Katex tex="y(-1)\approx-2.5" />, <Katex tex="y(-1.5)\approx-4.25" />, nowhere near <Katex tex="-2" />.</>,
    reason: <>Going left, positive slopes make the curve fall, and here they steepen (<Katex tex="2" />, then <Katex tex="3.5" />), so it drops below <Katex tex="-2" /> before <Katex tex="x=-1" />.</>,
    more: <>Stepping left, Euler's method runs backwards: <Katex tex="y(x-0.5)\approx y(x)-0.5\times\text{slope}" />. From <Katex tex="(0,-1)" /> (slope <Katex tex="1" />) to <Katex tex="(-0.5,-1.5)" /> (slope <Katex tex="0.5+1.5=2" />) to <Katex tex="(-1,-2.5)" /> (slope <Katex tex="1+2.5=3.5" />) to <Katex tex="(-1.5,-4.25)" />. The true curve is lower still. C (14%) was the most popular wrong answer. Tracing left needs the same care as tracing right: below the line <Katex tex="y=-x" /> on the left the segments are steep, so the curve plunges.</>,
  },
  {
    working: <Katex display tex="y(3.5) \approx -2.52, \ \text{so } \boxed{(3.5,\,-2.5)}" />,
    reason: <>Matches option <b>B</b> — the only option close to the traced curve through <Katex tex="(0,-1)" />.</>,
    more: <>
      A check you can do by hand: <Katex tex="y=1-x-2e^{-x}" /> satisfies the equation, since <Katex tex="\tfrac{dy}{dx}=-1+2e^{-x}" /> and <Katex tex="-x-y=-1+2e^{-x}" />, and it passes through <Katex tex="(0,-1)" />. It gives <Katex tex="y(3.5)\approx-2.56" />, so <Katex tex="(3.5,-2.5)" /> is very close to, though not exactly on, the solution: this question asks what a direction-field reading supports, and B is the only option within reach. The other options miss by <Katex tex="0.6" /> or more (exact <Katex tex="y" />-values: <Katex tex="-2.10" /> at <Katex tex="x=3" />, <Katex tex="-1.66" /> at <Katex tex="x=2.5" />, <Katex tex="-6.46" /> at <Katex tex="x=-1.5" />).
    </>,
  },
]

export default function SpecialistQ10_2016() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit mb-3">
            <img loading="lazy" decoding="async" src={directionFieldSrc} alt="Direction field for dy/dx + x + y = 0, from the original 2016 VCAA exam paper" className="w-full max-w-[300px]" />
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

// Overlays the traced path (the STEPS points above, read off the field by following its
// arrows from (0,-1) out to (3.5,-2.52)) on top of the *real* cropped VCAA direction-field
// image, rather than redrawing the field itself. Pixel calibration (ox, oy, scaleX, scaleY)
// was measured directly off spec-2016-mcq10-direction-field.png's own gridlines (1275×889px;
// gridlines every 0.5 units), so the overlay lines up with the real image, not an
// approximation of it.
function DirectionFieldDiagram() {
  const ox = 636
  const oy = 484
  const scaleX = 143.4
  const scaleY = 131
  const tracePts = STEPS.map(s => `${ox + s.x * scaleX},${oy - s.y * scaleY}`)
  return (
    <div className="relative w-full max-w-[300px]">
      <img loading="lazy" decoding="async"
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
