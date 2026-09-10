// 2016 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 65% correct.
// Trace a solution curve of dy/dx = -x - y through a given direction field. Question text
// transcribed from the original paper; the direction field diagram — both in the question
// and in the worked solution below — is the actual VCAA diagram (cropped from the official
// exam PDF), not a redrawing. The worked solution overlays the exact solved curve and the
// two marked points on top of that same real image (calibrated to its gridlines), rather
// than redrawing the field itself. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import directionFieldSrc from './spec-2016-mcq10-direction-field.png'

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
        <Katex display tex="\begin{aligned} \implies\; ye^x &= \int -xe^x\,dx \\ &= (1-x)e^x + C \end{aligned}" />
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
        <Katex display tex="\begin{aligned} (0,-1): \ -1 &= 1-0+Ce^0 \\ &= 1+C \end{aligned}" />
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

// Overlays the exact solution curve y = 1-x-2e^{-x} through (0,-1), extended out to x=3.5
// (where it reaches option B), on top of the *real* cropped VCAA direction-field image —
// rather than redrawing the field itself. Pixel calibration (ox, oy, scaleX, scaleY) was
// measured directly off spec-2016-mcq10-direction-field.png's own gridlines (1275×889px;
// gridlines every 0.5 units), so the overlay lines up with the real image, not an
// approximation of it.
function DirectionFieldDiagram() {
  const ox = 636
  const oy = 484
  const scaleX = 143.4
  const scaleY = 131
  const curvePts: string[] = []
  for (let i = 0; i <= 60; i++) {
    const x = -1.2 + (4.7 * i) / 60
    const y = 1 - x - 2 * Math.exp(-x)
    curvePts.push(`${ox + x * scaleX},${oy - y * scaleY}`)
  }
  return (
    <div className="relative w-full max-w-[300px]">
      <img
        src={directionFieldSrc}
        alt="Direction field for dy/dx + x + y = 0, from the original 2016 VCAA exam paper"
        className="w-full block"
      />
      <svg viewBox="0 0 1275 889" className="absolute inset-0 w-full h-full">
        <polyline points={curvePts.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={5} />
        <circle cx={ox} cy={oy - -1 * scaleY} r={8} fill="#dc2626" />
        <text x={ox + 14} y={oy - -1 * scaleY - 14} fontSize={26} className="fill-rose-600 dark:fill-rose-400">(0, −1)</text>

        <circle cx={ox + 3.5 * scaleX} cy={oy - -2.56 * scaleY} r={8} fill="#22c55e" />
        <text x={ox + 3.5 * scaleX - 190} y={oy - -2.56 * scaleY - 16} fontSize={26} className="fill-emerald-600 dark:fill-emerald-400">
          ≈ (3.5, −2.5)
        </text>
      </svg>
    </div>
  )
}
