// 2016 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 65% correct.
// Trace a solution curve of dy/dx = -x - y through a given direction field, starting at
// (0, -1) and following the field lines by eye. Three methods are worth distinguishing here:
// (1) solving dy/dx + y = -x exactly via an integrating factor — not a VCE Specialist
// Mathematics technique (only separable differential equations are solved analytically in
// this course); (2) Euler's method — genuinely in the course and fully rigorous, but more
// machinery than a multiple-choice question calls for; (3) the actual best approach for an
// MCQ like this: start at the given point and simply follow the arrows already drawn on the
// field to sketch the curve's approximate path. The solution below leads with (3), notes (1)
// and (2) only as context, and uses light numerical readings (which happen to coincide with
// an Euler's-method trace, since that's exactly what "stepping along the arrows" means made
// precise) only to distinguish between the five candidate points. Question text transcribed
// from the original paper; the direction field diagram — both in the question and in the
// worked solution below — is the actual VCAA diagram (cropped from the official exam PDF),
// not a redrawing. The worked solution overlays the traced path and the two marked points on
// top of that same real image (calibrated to its gridlines), rather than redrawing the field
// itself. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import directionFieldSrc from './spec-2016-mcq10-direction-field.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 65, C: 14, D: 11, E: 4 },
  answer: 'B',
  noAnswer: 0,
}

// Approximate points along the curve traced by eye from (0,-1), following the arrows already
// drawn on the field. (These happen to be exactly what Euler's method with step size 0.5 —
// matching the diagram's own grid — would also give, since "step along the local arrow,
// re-read the new arrow, repeat" is precisely what tracing the field by eye means made
// precise. Shown here only as a light numerical check, not as the primary method.)
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
    working: <>Rearranged, <Katex tex="\dfrac{dy}{dx}+y=-x" /> is a first-order linear differential equation — it <em>can</em> be solved exactly using an <b>integrating factor</b> (<Katex tex="e^{\int 1\,dx}=e^x" />), giving the closed form <Katex tex="y=1-x-2e^{-x}" /> through <Katex tex="(0,-1)" />.</>,
    reason: <>This technique is <b>not</b> in the VCE Specialist Mathematics study design — only separable differential equations are solved analytically in this course. It's mentioned only for context; it isn't the intended (or fastest) way to answer this question.</>,
  },
  {
    working: <>The fully rigorous graphical technique here is <b>Euler's method</b> — stepping along the local slope repeatedly and re-reading it at each new point — which <em>is</em> genuinely in the course.</>,
    reason: <>For a multiple-choice question, computing Euler steps by hand is more machinery than is actually needed. The practical approach: start at the given point and simply <b>follow the arrows already drawn</b> on the field.</>,
  },
  {
    working: (
      <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <DirectionFieldDiagram />
      </div>
    ),
    reason: <>Starting at <Katex tex="(0,-1)" />, the local arrows point up-and-right — the curve climbs gently at first. Following the arrows further right, they swing around: by about <Katex tex="x\approx1" /> they're close to horizontal, and beyond that they tilt increasingly down-and-right. The curve turns over, flattens briefly, then descends — bending down more and more steeply as <Katex tex="x" /> grows, exactly as sketched here.</>,
  },
  {
    working: STEPS_TABLE,
    reason: <>Reading a few approximate coordinates off the sketched curve is enough to tell the five candidate points apart — no need to solve anything, just follow where the traced curve actually sits at each <Katex tex="x" />.</>,
  },
  {
    working: (
      <>
        A: at <Katex tex="x=3" />, the curve sits at <Katex tex="y\approx-2.03" />, not <Katex tex="-1" />.
        <br />
        D: at <Katex tex="x=2.5" />, the curve sits at <Katex tex="y\approx-1.56" />, not <Katex tex="-1" />.
        <br />
        E: at <Katex tex="x=2.5" />, the curve sits at <Katex tex="y\approx-1.56" /> — not even the right sign for <Katex tex="+1" />.
      </>
    ),
    reason: 'Each of these sits well away from the traced curve — ruled out.',
  },
  {
    working: <>C: following the arrows <em>backward</em> from <Katex tex="(0,-1)" /> instead, the curve drops away sharply — by <Katex tex="x=-1.5" /> it's already well below <Katex tex="-4" />, nowhere near <Katex tex="-2" />.</>,
    reason: 'Ruled out.',
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
