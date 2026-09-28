// 2017 Specialist Mathematics — Exam 1, Question 8 (4 marks). A slope field, the solution
// curve through (−1, 1), and the separable equation behind it. Question text transcribed
// from the original paper; the slope-field figure is a crop of VCAA's own artwork, and the
// answer sketch overlays the solution curve on that same crop (calibrated to its axis ticks:
// origin (456, 461) px, 166 px per unit) rather than redrawing the field. Answers checked with
// sympy (c = 11/6; x-intercept √(11/3) ≈ 1.915; y-intercept ≈ 1.223) and against the VCAA
// examination report and itute (both 2y³ + 6y + 3x² − 11 = 0, x ≈ 1.9). Solution is original.
//
// Interactives: part a. — a pencil traced from (−1, 1) along the field, carrying its tangent,
// with a mirror toggle for the symmetry and markers at the y-intercept (the report's misread
// 1.2) and the x-intercept (interactives/spec-2017e1-q8a-trace.tsx); part b. — the constant c
// choosing one curve from the family, with the report's two slips c = 5/6 and "+11" as buttons
// (interactives/spec-2017e1-q8b-constant.tsx). Wrong-method boxes: reading the y-intercept 1.2
// as the answer, taking the estimate from part b. instead of the sketch, c = 5/6, and +11.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import fieldSrc from './spec-2017e1-q8-slopefield.png'

const TraceWidget = lazyWidget(() => import('../interactives/spec-2017e1-q8a-trace'))
const ConstantWidget = lazyWidget(() => import('../interactives/spec-2017e1-q8b-constant'))

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
    working: <Katex display tex="\text{At }(-1,1):\ \frac{dy}{dx}=\frac{-(-1)}{1+1^2}=\frac12" />,
    reason: <>The condition <Katex tex="y(-1)=1" /> is the point <Katex tex="x=-1" />, <Katex tex="y=1" />: put your pencil there. The equation gives the gradient at every point, and here it is <Katex tex="\tfrac12" />, so the curve leaves gently uphill to the right. Check that this matches the tick at <Katex tex="(-1,1)" /> before you draw anything.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\ \begin{cases}>0, & x<0\\ =0, & x=0\\ <0, & x>0\end{cases}" />,
    reason: <>How do you know the shape before drawing? Look at the signs. <Katex tex="1+y^2>0" /> always, so <Katex tex="\tfrac{dy}{dx}" /> has the sign of <Katex tex="-x" />: uphill left of the <Katex tex="y" />-axis, flat on it, downhill to the right. So the curve has a single maximum, on the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="x\to-x \implies \frac{dy}{dx}\to-\frac{dy}{dx}" />,
    reason: <>Swapping <Katex tex="x" /> for <Katex tex="-x" /> changes the gradient&apos;s sign but not its size, so every tick on the right is the mirror image of one on the left. The curve&apos;s mirror image in the <Katex tex="y" />-axis therefore follows the ticks too, and it passes through the same peak on the axis. Only one solution curve passes through a point, so the curve is its own mirror image. The report lists a non-symmetric curve among the errors.</>,
  },
  {
    working: <Katex display tex="\text{peak: }(0,\ \approx 1.2)" />,
    reason: <>The ticks flatten as you near the <Katex tex="y" />-axis: gradient <Katex tex="\tfrac12" /> at <Katex tex="x=-1" />, about <Katex tex="0.2" /> at <Katex tex="x=-0.5" />, <Katex tex="0" /> at <Katex tex="x=0" />. So the curve keeps rising, more and more gently, and peaks only about <Katex tex="0.2" /> above its start. The report says many graphs went almost flat between <Katex tex="x=-0.5" /> and <Katex tex="x=0.5" /> and missed this <Katex tex="y" />-intercept. This height is not the answer.</>,
  },
  {
    working: <Katex display tex="\boxed{x\approx 1.9}" />,
    reason: <>Past the peak, follow the ticks down: they steepen, to a gradient of about <Katex tex="-1.9" /> where the curve meets the <Katex tex="x" />-axis. Read the positive <Katex tex="x" />-intercept off your own sketch, because &ldquo;hence&rdquo; means the estimate comes from the graph. The report gives <Katex tex="1.7\le x\le1.9" />. Draw the curve right across the field on both sides, not just to the intercepts. Part b. confirms the estimate: <Katex tex="y=0" /> gives <Katex tex="x=\sqrt{\tfrac{11}{3}}\approx1.915" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(1+y^2)\,dy = -x\,dx" />,
    reason: <>The right side is a function of <Katex tex="x" /> divided by a function of <Katex tex="y" />, which is the signal to separate variables. Multiply both sides by <Katex tex="1+y^2" /> so every <Katex tex="y" /> sits with <Katex tex="dy" /> and every <Katex tex="x" /> with <Katex tex="dx" />.</>,
  },
  {
    working: <Katex display tex="y+\frac{y^3}{3} = -\frac{x^2}{2}+c" />,
    reason: <>Integrate each side with respect to its own variable. A constant from each side would combine into one, so a single <Katex tex="+c" /> is enough. Every value of <Katex tex="c" /> is a different curve in the slope field; the next step picks the one through <Katex tex="(-1,1)" />.</>,
  },
  {
    working: <Katex display tex="1+\frac13 = -\frac{(-1)^2}{2}+c" />,
    reason: <>Substitute <Katex tex="x=-1" />, <Katex tex="y=1" />. Square first, <Katex tex="(-1)^2=1" />, and the minus sign in front still applies, so the right side is <Katex tex="-\tfrac12+c" />. Getting <Katex tex="+\tfrac12" /> here is what produces the report&apos;s most common wrong constant, <Katex tex="\tfrac56" />.</>,
  },
  {
    working: <Katex display tex="c = \frac43+\frac12 = \frac{11}{6}" />,
    reason: <>Add <Katex tex="\tfrac12" /> to both sides, over the common denominator <Katex tex="6" />: <Katex tex="\tfrac86+\tfrac36=\tfrac{11}{6}" />.</>,
  },
  {
    working: <Katex display tex="y+\frac{y^3}{3}+\frac{x^2}{2}-\frac{11}{6} = 0" />,
    reason: <>The required form has everything on one side equal to <Katex tex="0" />. Moving <Katex tex="\tfrac{11}{6}" /> across makes it <Katex tex="-\tfrac{11}{6}" />; moving <Katex tex="-\tfrac{x^2}{2}" /> across makes it <Katex tex="+\tfrac{x^2}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2y^3+6y+3x^2-11 = 0}" />,
    reason: <>Multiply through by <Katex tex="6" />, the lowest common denominator, to clear the fractions and get the integer coefficients asked for: <Katex tex="a=2" />, <Katex tex="b=6" />, <Katex tex="c=3" />, <Katex tex="d=-11" />. The report says many students stopped before this step. Check with the initial condition: <Katex tex="2+6+3-11=0" /> ✓.</>,
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
        <Explore title="Let the ticks steer the pencil from (−1, 1)">
          <TraceWidget />
        </Explore>
        <WrongMethod
          title="The curve crosses an axis at about 1.2, so x ≈ 1.2"
          source="Examiner's report"
          working={<Katex display tex="y\text{-intercept}\approx1.2\ \Rightarrow\ x\approx1.2" />}
        >
          The report says some students gave <Katex tex="x" /> as around <Katex tex="1.2" />, the value of the{' '}
          <Katex tex="y" />-intercept. That is the height of the peak, where <Katex tex="x=0" />. The question asks for{' '}
          <Katex tex="x" /> when <Katex tex="y=0" />, which is where the curve meets the <Katex tex="x" />-axis. Before
          reading a value off a graph, say which axis you are on: <Katex tex="y=0" /> means the <Katex tex="x" />-axis.
        </WrongMethod>
        <WrongMethod
          title="Solve part b. first and use its equation for the estimate"
          source="Examiner's report"
          working={<Katex display tex="3x^2-11=0\ \Rightarrow\ x\approx1.9" />}
        >
          The number is right, but &ldquo;hence&rdquo; asks for the estimate from <em>your sketch</em>. The report notes
          answers taken from part b. that were inconsistent with the student&apos;s own graph. If your curve and your
          algebra disagree, that is a signal to redraw the curve along the ticks, not to quote the algebra.
        </WrongMethod>
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
        <Background title="Separable differential equations">
          <p>
            When <Katex tex="\tfrac{dy}{dx}" /> is a function of <Katex tex="x" /> times (or divided by) a function
            of <Katex tex="y" />, move all the <Katex tex="y" />-terms to the <Katex tex="dy" /> side and integrate
            both sides: <Katex tex="\tfrac{dy}{dx}=\tfrac{f(x)}{g(y)}" /> gives{' '}
            <Katex tex="\int g(y)\,dy=\int f(x)\,dx" />. The result is usually an implicit equation, and its
            constant <Katex tex="c" /> labels the whole family of solution curves; an initial condition picks one.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="The constant c chooses which curve passes through (−1, 1)">
          <ConstantWidget />
        </Explore>
        <WrongMethod
          title="Substitute (−1, 1) and get c = 5/6"
          source="Examiner's report"
          working={<Katex display tex="1+\tfrac13 = \tfrac12+c\ \Rightarrow\ c=\tfrac56" />}
        >
          The report names <Katex tex="\tfrac56" /> as the most common wrong constant. It needs the right side at{' '}
          <Katex tex="x=-1" /> to be <Katex tex="+\tfrac12" />, but{' '}
          <Katex tex="-\tfrac{(-1)^2}{2}=-\tfrac12" />. Catch it by substituting the point into your final
          equation: <Katex tex="2y^3+6y+3x^2-5=0" /> gives <Katex tex="2+6+3-5=6\ne0" />.
        </WrongMethod>
        <WrongMethod
          title="Move the constant across and finish with +11"
          source="Examiner's report"
          working={<Katex display tex="2y^3+6y+3x^2+11=0" />}
        >
          From <Katex tex="y+\tfrac{y^3}{3}+\tfrac{x^2}{2}=\tfrac{11}{6}" />, subtracting{' '}
          <Katex tex="\tfrac{11}{6}" /> from both sides leaves <Katex tex="-\tfrac{11}{6}" />, so times 6 it is{' '}
          <Katex tex="-11" />. The same check exposes it: <Katex tex="2+6+3+11=22\ne0" />, so this curve misses{' '}
          <Katex tex="(-1,1)" /> entirely.
        </WrongMethod>
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

