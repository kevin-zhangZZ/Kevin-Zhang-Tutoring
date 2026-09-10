// 2017 Mathematical Methods — Exam 1, Question 3 (4 marks).
// f : [-3, 0] → R, f(x) = (x+2)²(x-1) — expand the factorised form, then sketch f on its
// restricted domain. Question text transcribed from the original paper; the sketch axes
// VCAA supplied were blank (nothing pre-drawn to redraw), so the sketched curve below is
// this site's own original content, computed exactly rather than hand-waypointed. Solution
// is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { functionToPath } from '../graphUtils'

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      This question was answered well, although some students either did not fully expand the
      cubic or made notational errors by omitting the brackets on the quadratic. It should be
      noted that <Katex tex="(x^2+4x+4)(x-1)" /> is not equivalent to{' '}
      <Katex tex="x^3+4x^2+4x-x^2-4x-4" /> written without the grouping brackets.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [11, 10, 43, 36],
  average: 1.6,
  comment: (
    <>
      Some very good graphs were drawn by students. Common errors included using{' '}
      <Katex tex="\mathbb{R}" /> as the domain, or graphs that looked more like an inverted
      parabola rather than a cubic, due to a lack of recognition that there is a second
      stationary point located at the <Katex tex="y" />-intercept.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="(x+2)^2(x-1) = (x^2+4x+4)(x-1)" />,
    reason: <>Expand <Katex tex="(x+2)^2" /> first.</>,
  },
  {
    working: <Katex display tex="= x^3-x^2+4x^2-4x+4x-4" />,
    reason: <>Multiply <Katex tex="(x^2+4x+4)" /> by <Katex tex="(x-1)" /> term by term.</>,
  },
  {
    working: <Katex display tex="\boxed{= x^3+3x^2-4}" />,
    reason: 'The middle x-terms (−4x and +4x) cancel.',
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=0 \iff (x+2)^2(x-1)=0 \iff x=-2 \text{ (double root)} \text{ or } x=1" />,
    reason: <>Find the <Katex tex="x" />-intercepts from the factorised form — <Katex tex="x=1" /> lies outside the given domain <Katex tex="[-3,0]" />, so <Katex tex="x=-2" /> is the only one that counts here.</>,
  },
  {
    working: <Katex display tex="f'(x) = 3x^2+6x = 3x(x+2)" />,
    reason: <>Differentiate to find stationary points.</>,
  },
  {
    working: <Katex display tex="f'(x)=0 \iff x=0 \text{ or } x=-2" />,
    reason: <>Both lie inside the domain — <Katex tex="x=0" /> is the right-hand endpoint itself, which is still a genuine stationary point since <Katex tex="f'(0)=0" />.</>,
  },
  {
    working: <Katex display tex="f(-3)=-4,\quad f(-2)=0,\quad f(0)=-4" />,
    reason: <>Evaluate at the two endpoints and the interior stationary point. Since <Katex tex="x=-2" /> is a repeated root, the curve touches (doesn't cross) the <Katex tex="x" />-axis there.</>,
  },
  {
    working: <Katex display tex="f'(x)>0 \text{ on } (-3,-2), \quad f'(x)<0 \text{ on } (-2,0)" />,
    reason: <>Sign of <Katex tex="f'(x)=3x(x+2)" /> either side of <Katex tex="x=-2" />: <Katex tex="f" /> rises to a local maximum of <Katex tex="0" /> at <Katex tex="x=-2" />, then falls to a local minimum of <Katex tex="-4" /> at the endpoint <Katex tex="x=0" />.</>,
  },
  {
    working: (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <CubicSketch />
      </div>
    ),
    reason: <>Endpoints <Katex tex="(-3,-4)" /> and <Katex tex="(0,-4)" />, touching the axis at <Katex tex="(-2,0)" /> — a single hump entirely at or below the <Katex tex="x" />-axis, since <Katex tex="x=1" /> (the only place <Katex tex="f" /> would otherwise cross) isn't in the domain.</>,
  },
]

export default function MethodsQ3_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (4 marks)</p>
        <p>
          Let <Katex tex="f:[-3,0]\to\mathbb{R},\ f(x)=(x+2)^2(x-1)" />.
        </p>
      </div>

      <PartCard letter="a" marks={1} statement={<>Show that <Katex tex="(x+2)^2(x-1) = x^3+3x^2-4" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={3}
        statement={<>Sketch the graph of <Katex tex="f" /> on the axes below. Label the axis intercepts and any stationary points with their coordinates.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}

// f(x) = (x+2)²(x-1) on [-3,0] — sampled exactly via functionToPath, not hand-waypointed.
// VCAA's own axes for this part were blank (a "sketch it yourself" grid), so this curve is
// this site's own original content, not a redrawing of anything VCAA printed.
function CubicSketch() {
  const f = (x: number) => (x + 2) ** 2 * (x - 1)
  const toSvgX = (x: number) => 40 + (x - -3.5) * 60
  const toSvgY = (y: number) => 130 - y * 22
  return (
    <svg viewBox="0 0 300 220" width={280} height={205}>
      <line x1={20} y1={toSvgY(0)} x2={280} y2={toSvgY(0)} stroke="#9ca3af" strokeWidth={1} />
      <line x1={toSvgX(-3)} y1={10} x2={toSvgX(-3)} y2={200} stroke="#e5e7eb" strokeWidth={1} />
      <text x={264} y={toSvgY(0) - 6} fontSize={10} className="fill-gray-600 dark:fill-gray-400">x</text>

      <path d={functionToPath(f, -3, 0, toSvgX, toSvgY)} fill="none" stroke="#0ea5e9" strokeWidth={2.2} />

      {/* endpoints + touch point */}
      <circle cx={toSvgX(-3)} cy={toSvgY(-4)} r={3} className="fill-gray-800 dark:fill-gray-200" />
      <text x={toSvgX(-3) - 6} y={toSvgY(-4) + 16} fontSize={10} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300">(−3, −4)</text>

      <circle cx={toSvgX(-2)} cy={toSvgY(0)} r={3} className="fill-gray-800 dark:fill-gray-200" />
      <text x={toSvgX(-2)} y={toSvgY(0) - 8} fontSize={10} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300">(−2, 0)</text>

      <circle cx={toSvgX(0)} cy={toSvgY(-4)} r={3} className="fill-gray-800 dark:fill-gray-200" />
      <text x={toSvgX(0) + 20} y={toSvgY(-4) + 14} fontSize={10} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300">(0, −4)</text>

      <text x={toSvgX(-3) - 14} y={toSvgY(0) + 4} fontSize={10} className="fill-gray-500 dark:fill-gray-400">−3</text>
      <text x={toSvgX(0) - 4} y={toSvgY(0) + 16} fontSize={10} className="fill-gray-500 dark:fill-gray-400">O</text>
    </svg>
  )
}
