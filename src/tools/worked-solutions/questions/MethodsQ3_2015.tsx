// 2015 Mathematical Methods — Exam 2, MCQ 3.
// Identify the rule of a quartic from its graph: simple roots at b, d and a repeated (touching)
// root at c. Question text/diagram transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { functionToPath } from '../graphUtils'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 61, B: 14, C: 20, D: 2, E: 4 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      The rule for the graph is in the form <Katex tex="f(x)=a(x-b)(x-c)^2(x-d)" />, where <Katex tex="a" />{' '}
      is negative and could be <Katex tex="-2" />: <Katex tex="f(x)=-2(x-b)(x-c)^2(x-d)" />. <Katex tex="b" />{' '}
      is negative; for example if <Katex tex="b=-2" />, the factor is <Katex tex="(x-(-2))=(x+2)" />. Most
      students chose option A, <Katex tex="y=-2(x+b)(x-c)^2(x-d)" />, but the factor <Katex tex="(x+b)" /> is
      incorrect.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = k(x-b)(x-c)^2(x-d)" />,
    reason: (
      <>
        <Katex tex="b" /> and <Katex tex="d" /> are simple roots (the curve crosses the axis there);{' '}
        <Katex tex="c" /> is a turning point sitting ON the axis, so it's a repeated root — it needs a
        squared factor. That's degree <Katex tex="1+2+1=4" />, a quartic.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{option D} = 2(x-b)(x-c)(x-d) \ \text{— degree 3, and it } \textit{crosses} \text{ at } c \ \times" />,
    reason: <>D has no squared factor, so it's a cubic that cuts straight through the axis at <Katex tex="c" /> instead of touching it. Eliminated.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x\to\pm\infty" />
        <Katex display tex="\implies\; y\to-\infty" />
        <Katex display tex="\implies\; k<0" />
        <Katex display tex="\implies\; k=-2, \ \text{not } +2" />
      </>
    ),
    reason: <>Both tails of the graph point downwards, which for a quartic means a negative leading coefficient. That eliminates option B <Katex tex="(+2)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{root at } x=b" />
        <Katex display tex="\iff\; \text{factor } (x-b), \quad \text{whatever the sign of } b" />
      </>
    ),
    reason: (
      <>
        This is the step most students got wrong. <Katex tex="b" /> is negative <em>as a number</em>, but the
        factor for a root at <Katex tex="x=b" /> is always <Katex tex="(x-b)" />. Option A's{' '}
        <Katex tex="(x+b)" /> has its root where <Katex tex="x+b=0" />, i.e. at <Katex tex="x=-b" /> — a{' '}
        <em>positive</em> number, which is the wrong side of the origin.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{option E} = -2(x-b)(x+c)^2(x+d) \ \text{— roots at } b,\,-c,\,-d \ \times" />,
    reason: <>Same trap on the other two factors: E puts the repeated root at <Katex tex="-c" /> and the last root at <Katex tex="-d" />, neither of which matches the graph. Eliminated.</>,
  },
  {
    working: <Katex display tex="\boxed{y=-2(x-b)(x-c)^2(x-d)}" />,
    reason: (
      <>
        Option <b>C</b> is the only one with a negative leading coefficient, simple roots at exactly{' '}
        <Katex tex="x=b" /> and <Katex tex="x=d" />, and a squared factor at <Katex tex="x=c" />.
      </>
    ),
  },
]

export default function MethodsQ3_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">The rule for a function with the graph above could be:</p>
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3">
            <QuarticGraph />
          </div>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=-2(x+b)(x-c)^2(x-d)" /> },
        { letter: 'B', content: <Katex tex="y=2(x+b)(x-c)^2(x-d)" /> },
        { letter: 'C', content: <Katex tex="y=-2(x-b)(x-c)^2(x-d)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="y=2(x-b)(x-c)(x-d)" /> },
        { letter: 'E', content: <Katex tex="y=-2(x-b)(x+c)^2(x+d)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}

// Real quartic y = k(x-b)(x-c)²(x-d) with concrete stand-in values for b, c, d, k that
// reproduce the shape given in the original question (crosses at b and d, touches at c) —
// sampled via functionToPath rather than hand-drawn, so the touch at c is a true smooth
// tangency (zero slope) instead of an approximated kink.
const QB = -2
const QC = 1
const QD = 3
const QK = -0.15
const quartic = (x: number) => QK * (x - QB) * (x - QC) ** 2 * (x - QD)

const X_MIN = -2.6
const X_MAX = 3.6
const toSvgX = (x: number) => 30 + ((x - X_MIN) * 340) / (X_MAX - X_MIN)
const toSvgY = (y: number) => 100 - 20 * y
const AXIS_Y = toSvgY(0)

function QuarticGraph() {
  return (
    <svg viewBox="0 0 400 260" width={340} height={221}>
      <line x1={20} y1={AXIS_Y} x2={380} y2={AXIS_Y} stroke="#9ca3af" strokeWidth={1.5} />
      <line x1={toSvgX(0)} y1={20} x2={toSvgX(0)} y2={240} stroke="#9ca3af" strokeWidth={1.5} />
      <path d={functionToPath(quartic, X_MIN, X_MAX, toSvgX, toSvgY)} fill="none" stroke="#0ea5e9" strokeWidth={2.5} />
      <circle cx={toSvgX(QB)} cy={AXIS_Y} r={4} fill="#111827" className="dark:fill-gray-200" />
      <circle cx={toSvgX(QC)} cy={AXIS_Y} r={4} fill="#111827" className="dark:fill-gray-200" />
      <circle cx={toSvgX(QD)} cy={AXIS_Y} r={4} fill="#111827" className="dark:fill-gray-200" />
      <text x={toSvgX(QB) - 5} y={AXIS_Y + 20} fontSize={13} className="fill-gray-700 dark:fill-gray-300">b</text>
      <text x={toSvgX(QC) - 5} y={AXIS_Y + 20} fontSize={13} className="fill-gray-700 dark:fill-gray-300">c</text>
      <text x={toSvgX(QD) - 5} y={AXIS_Y + 20} fontSize={13} className="fill-gray-700 dark:fill-gray-300">d</text>
      <text x={toSvgX(0) + 8} y={AXIS_Y + 15} fontSize={13} className="fill-gray-700 dark:fill-gray-300">O</text>
      <text x={385} y={AXIS_Y + 4} fontSize={13} className="fill-gray-700 dark:fill-gray-300">x</text>
      <text x={toSvgX(0) - 13} y={30} fontSize={13} className="fill-gray-700 dark:fill-gray-300">y</text>
    </svg>
  )
}
