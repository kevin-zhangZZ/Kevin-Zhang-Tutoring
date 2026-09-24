// 2019 Mathematical Methods — Exam 1, Question 4 (4 marks).
// f(x)=cos(x/2) on [-2π,π] — solve 1-cos(x/2)=cos(x/2) (part a), then sketch g(x)=1-f(x) on
// the same real axes (part b). Question text transcribed from the original paper; the
// diagram is cropped directly from the original VCAA exam PDF, not a redrawing. Cross-
// checked against the VCAA examination report and itute's independent solutions — both
// agree with the derivation below. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { functionToPath } from '../graphUtils'
import fAxesSrc from './meth-2019e1-q4b-f-axes.png'

const EXAM_A: SAExaminerStats = {
  marks: [23, 29, 48],
  average: 1.3,
  comment: (
    <>
      Most students were able to rearrange to form a correct expression. Some students did not
      identify the correct reference angle. Many students did not account for the restricted
      domain.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 27, 37],
  average: 1.0,
  comment: (
    <>
      Students who were successful with this question made a connection between part a. and
      what was expected in part b. Most students were able to generate a horizontally
      reflected version of the given graph; however, some students dilated it or did not
      correctly reflect it in every section. Some students forgot the translation or did not
      label the points specified by the question. Students are advised to practise sketching
      graphs, with attention to curvature.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="1-\cos\!\left(\tfrac{x}{2}\right) = \cos\!\left(\tfrac{x}{2}\right)" />,
    reason: <>Collect the cosines on one side.</>,
  },
  {
    working: <Katex display tex="1 = 2\cos\!\left(\tfrac{x}{2}\right) \;\implies\; \cos\!\left(\tfrac{x}{2}\right) = \tfrac12" />,
    reason: <>Reference angle <Katex tex="\tfrac{\pi}{3}" /> — the report notes some students did not identify it correctly.</>,
  },
  {
    working: <Katex display tex="x\in[-2\pi,\pi] \;\implies\; \tfrac{x}{2}\in[-\pi,\tfrac{\pi}{2}]" />,
    reason: <>Convert the domain restriction to one on <Katex tex="\tfrac x2" />, since that's the angle actually being solved for.</>,
  },
  {
    working: <Katex display tex="\cos\theta=\tfrac12 \text{ for } \theta\in[-\pi,\tfrac{\pi}{2}] \;\implies\; \theta = \pm\tfrac{\pi}{3}" />,
    reason: <>Reference angle <Katex tex="\tfrac{\pi}{3}" />; both <Katex tex="\tfrac{\pi}{3}" /> and <Katex tex="-\tfrac{\pi}{3}" /> lie inside <Katex tex="[-\pi,\tfrac{\pi}{2}]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -\dfrac{2\pi}{3},\ \dfrac{2\pi}{3}}" />,
    reason: <>Doubling each value of <Katex tex="\tfrac x2" />. Both lie in <Katex tex="[-2\pi,\pi]" />, and there are no others — the report says many students did not account for the restricted domain.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <GOverlay />
      </div>
    ),
    reason: (
      <>
        <Katex tex="g(x)=1-f(x)" /> is <Katex tex="f" /> reflected in the <Katex tex="x" />-axis
        then translated <Katex tex="1" /> unit up (orange, drawn over the real exam figure).
        Endpoints: <Katex tex="g(-2\pi)=1-(-1)=2" /> and <Katex tex="g(\pi)=1-0=1" />.
        Intersections with <Katex tex="f" /> (from part a., where <Katex tex="f=\tfrac12" />):{' '}
        <Katex tex="\left(-\tfrac{2\pi}{3},\ \tfrac12\right)" /> and{' '}
        <Katex tex="\left(\tfrac{2\pi}{3},\ \tfrac12\right)" />.
      </>
    ),
  },
]

export default function MethodsQ4_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Trig Equation"
        marks={2}
        statement={<>Solve <Katex tex="1-\cos\!\left(\tfrac{x}{2}\right) = \cos\!\left(\tfrac{x}{2}\right)" /> for <Katex tex="x\in[-2\pi,\pi]" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            <p className="mb-2">
              The function <Katex tex="f:[-2\pi,\pi]\to R,\ f(x)=\cos\!\left(\tfrac{x}{2}\right)" /> is shown on the axes below.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mb-2">
              <img
                src={fAxesSrc}
                alt="Axes with f(x)=cos(x/2) already drawn on them for -2π≤x≤π, from the original 2019 VCAA exam paper"
                className="w-full max-w-[420px]"
              />
            </div>
            <p>
              Let <Katex tex="g:[-2\pi,\pi]\to R,\ g(x)=1-f(x)" />. Sketch the graph of{' '}
              <Katex tex="g" /> on the axes above. Label all points of intersection of the
              graphs of <Katex tex="f" /> and <Katex tex="g" />, and the endpoints of{' '}
              <Katex tex="g" />, with their coordinates.
            </p>
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}

// Overlays g(x)=1-cos(x/2) (orange, computed exactly via functionToPath) on top of the
// *real* cropped VCAA figure, which already has f(x)=cos(x/2) drawn on it — rather than
// redrawing f itself. Pixel calibration (ox, oy, scaleX, scaleY) was measured directly off
// the real image's own gridlines (10 vertical gridlines at intervals of π/3, spanning
// -2π to π; 5 horizontal gridlines at intervals of 1, spanning -2 to 2), and re-checked
// against a PIL composite: the curve meets f exactly at x = ±2π/3.
function GOverlay() {
  const ox = 1406.5
  const oy = 472.5
  const scaleX = 611.7 / Math.PI // px per radian, measured from the 3-interval span -π to 0
  const scaleY = 136.75 // px per unit y
  const toSvgX = (x: number) => ox + x * scaleX
  const toSvgY = (y: number) => oy - y * scaleY
  const g = (x: number) => 1 - Math.cos(x / 2)
  return (
    <div className="relative w-full max-w-[420px]">
      <img
        src={fAxesSrc}
        alt="Axes with f(x)=cos(x/2) already drawn on them, from the original 2019 VCAA exam paper"
        className="w-full block"
      />
      <svg viewBox="0 0 2250 800" className="absolute inset-0 w-full h-full">
        <path d={functionToPath(g, -2 * Math.PI, Math.PI, toSvgX, toSvgY)} fill="none" stroke="#f97316" strokeWidth={5} />
        <circle cx={toSvgX(-2 * Math.PI)} cy={toSvgY(2)} r={9} className="fill-orange-500" />
        <circle cx={toSvgX(Math.PI)} cy={toSvgY(1)} r={9} className="fill-orange-500" />
        <circle cx={toSvgX((-2 * Math.PI) / 3)} cy={toSvgY(0.5)} r={9} fill="#16a34a" />
        <circle cx={toSvgX((2 * Math.PI) / 3)} cy={toSvgY(0.5)} r={9} fill="#16a34a" />
        <text x={toSvgX(-2 * Math.PI) + 20} y={toSvgY(2) - 22} fontSize={60} fill="#c2410c" stroke="white" strokeWidth={10} paintOrder="stroke">(−2π, 2)</text>
        <text x={toSvgX(Math.PI)} y={toSvgY(1) - 40} fontSize={60} textAnchor="end" fill="#c2410c" stroke="white" strokeWidth={10} paintOrder="stroke">(π, 1)</text>
        <text x={toSvgX((-2 * Math.PI) / 3) - 40} y={toSvgY(0.5) + 130} fontSize={60} textAnchor="start" fill="#15803d" stroke="white" strokeWidth={10} paintOrder="stroke">(−2π/3, 1/2)</text>
        <text x={toSvgX((2 * Math.PI) / 3) + 40} y={toSvgY(0.5) + 130} fontSize={60} textAnchor="end" fill="#15803d" stroke="white" strokeWidth={10} paintOrder="stroke">(2π/3, 1/2)</text>
      </svg>
    </div>
  )
}
