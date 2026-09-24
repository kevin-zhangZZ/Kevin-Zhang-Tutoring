// 2017 Specialist Mathematics — Exam 1, Question 8 (4 marks). A slope field, the solution
// curve through (−1, 1), and the separable equation behind it. Question text transcribed
// from the original paper; the slope-field figure is a crop of VCAA's own artwork, and the
// answer sketch overlays the solution curve on that same crop (calibrated to its axis ticks:
// origin (456, 461) px, 166 px per unit) rather than redrawing the field. Answers checked with sympy and against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2017e1-q8-slopefield.png'

const EXAM_A: SAExaminerStats = {
  marks: [54, 29, 17],
  average: 0.7,
  comment: (
    <>
      This question was not answered well. Several curves crossed the slope ticks rather than
      following them. Errors included:
      <ul className="list-disc pl-5 my-1">
        <li>the final curve not being symmetrical</li>
        <li>
          the curve not passing through <Katex tex="(-1,1)" />, giving the value for{' '}
          <Katex tex="x" /> as around 1.2 (the value of the <Katex tex="y" /> intercept)
        </li>
        <li>
          finding an approximate value from the solution in part b. even though this was
          inconsistent with the student's graph (part a. used the word 'hence').
        </li>
      </ul>
      Many graphs were almost flat between <Katex tex="x=-0.5" /> and <Katex tex="x=0.5" />,
      resulting in missing the desired <Katex tex="y" />-intercept. Some drew the graph just to
      the <Katex tex="x" />-intercepts rather than for the whole domain. Several graphs were not
      drawn smoothly with sufficient care.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [15, 49, 36],
  average: 1.2,
  comment: (
    <>
      This question was answered reasonably well. Most students were able to separate the
      variables (though some algebraic errors occurred) but several arrived at an incorrect
      value of the constant of integration <Katex tex="c" />, of which{' '}
      <Katex tex="\tfrac56" /> was most common. Most students had the correct integration after
      separating variables but made no attempt to express the answer with integers as
      required. Some students who attempted to express the answer in the form requested made
      arithmetic errors, finishing with +11 on the left side.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{start at }(-1,1)" />,
    reason: <>The initial condition <Katex tex="y(-1)=1" /> fixes one point the curve must pass through. Everything else follows the ticks.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}=\frac{-x}{1+y^2}" />,
    reason: <>The denominator is always positive, so the sign of the gradient is the sign of <Katex tex="-x" />: uphill to the left of the <Katex tex="y" />-axis, flat on it, downhill to the right. The curve therefore has a maximum on the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="x\to-x \implies \frac{dy}{dx}\to-\frac{dy}{dx}" />,
    reason: <>The field is symmetric about the <Katex tex="y" />-axis, so the solution curve must be too. The report says non-symmetric curves were a common error.</>,
  },
  {
    working: <Katex display tex="\boxed{x\approx 1.9}" />,
    reason: <>Reading off where the curve crosses the <Katex tex="x" />-axis on the right. VCAA accepted <Katex tex="1.7\le x\le1.9" />. Part (b) confirms it exactly: <Katex tex="\sqrt{\tfrac{11}{3}}\approx1.915" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(1+y^2)\,dy = -x\,dx" />,
    reason: <>Separating variables: all the <Katex tex="y" />s on one side, all the <Katex tex="x" />s on the other.</>,
  },
  {
    working: <Katex display tex="y+\frac{y^3}{3} = -\frac{x^2}{2}+c" />,
    reason: <>Integrating both sides. One constant is enough.</>,
  },
  {
    working: <Katex display tex="1+\frac13 = -\frac12+c" />,
    reason: <>Substituting <Katex tex="x=-1" />, <Katex tex="y=1" />. Note <Katex tex="(-1)^2=+1" />, so the right-hand side is <Katex tex="-\tfrac12" /> — the sign slip behind the report's popular wrong constant <Katex tex="\tfrac56" />.</>,
  },
  {
    working: <Katex display tex="c = \frac43+\frac12 = \frac{11}{6}" />,
    reason: <>Common denominator <Katex tex="6" />.</>,
  },
  {
    working: <Katex display tex="y+\frac{y^3}{3}+\frac{x^2}{2}-\frac{11}{6} = 0" />,
    reason: <>Everything on one side, ready to clear denominators.</>,
  },
  {
    working: <Katex display tex="\boxed{2y^3+6y+3x^2-11 = 0}" />,
    reason: <>Multiplying through by <Katex tex="6" /> gives integer coefficients as required: <Katex tex="a=2" />, <Katex tex="b=6" />, <Katex tex="c=3" />, <Katex tex="d=-11" />. Check the initial condition: <Katex tex="2+6+3-11=0" /> ✓. Setting <Katex tex="y=0" /> gives <Katex tex="x=\sqrt{\tfrac{11}{3}}\approx1.915" />, confirming the estimate in part a. — though part a. had to be read off the field, since it said "hence".</>,
  },
]

export default function SpecialistQ8_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (4 marks)</p>
        <p className="mb-3">
          A slope field representing the differential equation{' '}
          <Katex tex="\dfrac{dy}{dx}=\dfrac{-x}{1+y^2}" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={fieldSrc}
            alt="A slope field on axes from −2 to 2 in both directions: short line segments sloping up to the right on the left half of the plane, horizontal on the y-axis, and down to the right on the right half — from the original 2017 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Slope Field"
        marks={2}
        statement={
          <>
            Sketch the solution curve of the differential equation corresponding to the
            condition <Katex tex="y(-1)=1" /> on the slope field above and, hence, estimate
            the positive value of <Katex tex="x" /> when <Katex tex="y=0" />. Give your answer
            correct to one decimal place.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Reading a slope field">
          <p>
            Every tick is a tiny piece of tangent. A solution curve must be tangent to the
            ticks it passes through — it never cuts across them. Start at the given point and
            follow the ticks in both directions.
          </p>
          <p>
            Before drawing, extract what the equation tells you about shape.{' '}
            <Katex tex="1+y^2>0" /> always, so the sign of <Katex tex="\tfrac{dy}{dx}" /> is
            the sign of <Katex tex="-x" />: rising for <Katex tex="x<0" />, zero at{' '}
            <Katex tex="x=0" />, falling for <Katex tex="x>0" />. That gives a single maximum
            on the <Katex tex="y" />-axis and a curve symmetric about it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <SolutionOverlay />
        </div>
      </PartCard>

      <PartCard
        letter="b"
        topic="Separable DE"
        marks={2}
        statement={
          <>
            Solve the differential equation <Katex tex="\dfrac{dy}{dx}=\dfrac{-x}{1+y^2}" />{' '}
            with the condition <Katex tex="y(-1)=1" />. Express your answer in the form{' '}
            <Katex tex="ay^3+by+cx^2+d=0" />, where <Katex tex="a" />, <Katex tex="b" />,{' '}
            <Katex tex="c" /> and <Katex tex="d" /> are integers.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}

// The solution curve 2y³ + 6y + 3x² − 11 = 0 (part b.) drawn over the real cropped VCAA slope
// field, not a redrawing of it. Calibration measured from spec-2017e1-q8-slopefield.png
// (923×873 px): axes cross at (456, 461); the ticks at x = ±1, ±2 and y = ±1, ±2 are 166 px
// apart. For each x the cubic in y has exactly one real root (Cardano, since 6y² + 6 > 0).
const OX = 456
const OY = 461
const S = 166
function solY(x: number) {
  const q = (3 * x * x - 11) / 2 // y³ + 3y + q = 0
  const r = Math.sqrt((q * q) / 4 + 1)
  return Math.cbrt(-q / 2 + r) + Math.cbrt(-q / 2 - r)
}
const CURVE_PTS = Array.from({ length: 93 }, (_, i) => {
  const x = -2.3 + (4.6 * i) / 92
  return `${(OX + x * S).toFixed(1)},${(OY - solY(x) * S).toFixed(1)}`
}).join(' ')
const X_INT = Math.sqrt(11 / 3)

function SolutionOverlay() {
  return (
    <div className="relative w-full max-w-[380px]">
      <img
        src={fieldSrc}
        alt="The slope field with the solution curve through (−1, 1) drawn over it: a symmetric arch peaking on the y-axis just above y = 1 and crossing the x-axis near x = 1.9"
        className="w-full block"
      />
      <svg viewBox="0 0 923 873" className="absolute inset-0 w-full h-full">
        <polyline points={CURVE_PTS} fill="none" stroke="#0ea5e9" strokeWidth={7} strokeLinejoin="round" />
        <circle cx={OX - S} cy={OY - S} r={11} fill="#dc2626" />
        <text x={OX - S - 20} y={OY - S - 22} fontSize={34} textAnchor="end" className="fill-rose-600">(−1, 1)</text>
        <circle cx={OX + X_INT * S} cy={OY} r={11} fill="#16a34a" />
        <text x={OX + X_INT * S - 14} y={OY + 70} fontSize={34} textAnchor="end" className="fill-emerald-600">x ≈ 1.9</text>
      </svg>
    </div>
  )
}

