// 2025 Mathematical Methods NHT — Exam 1, Question 3 (7 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// f(x) = ½tan(x) + ½: a. the general solution of f(x) = 0; b.i. solving ½tan(x) + ½ = sin(x) + ½
// on (−π, π) by factorising sin(x)(1 − 2cos(x)) = 0; b.ii. sketching f on (−π/2, π/2) over VCAA's
// printed graph of g(x) = sin(x) + ½. Question text transcribed from the original paper (read from
// the page images — the 2025 paper has no text layer); the printed axes and graph of g are cropped
// from the original VCAA exam PDF, and the b.ii answer is an SVG overlay on that crop (never a
// redrawing of it). Calibration measured from the crop's own gridlines (300 dpi): x-gridlines
// every π/6 at 327.67 px per radian, origin x = 701.7; y-gridlines every 0.5 at 328.2 px per unit,
// y = 0 at 833.0 (fitted to the gridlines; VCAA's printed x-axis sits about 4 px lower). Checked
// with a PIL composite: the calibrated sin(x) + ½ lies exactly on VCAA's printed curve. Answers
// checked with sympy and against the VCAA report's sample answers (a. x = −π/4 + nπ, n ∈ Z;
// b.i. x = 0, ±π/3). The report's second form for a., "x = π/4(−1 + 4nπ)", has a stray π (it
// should be π/4(4n − 1)); the working says so. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { functionToPath } from '../graphUtils'
import graphSrc from './meth-2025nhte1-q3bii-graph.png'

const OX = 701.7
const OY = 833.0
const SX = 327.67
const SY = 328.2
const toX = (x: number) => OX + x * SX
const toY = (y: number) => OY - y * SY
const f = (x: number) => 0.5 * Math.tan(x) + 0.5
const ORANGE = '#f97316'
const LABEL = { fontSize: 38, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke', fontFamily: '"Times New Roman", Times, serif' } as const
// f is clipped to VCAA's grid, which runs from about y = −1.42 to y = 2.25.
const X_LO = Math.atan(2 * -1.4 - 1)
const X_HI = Math.atan(2 * 2.22 - 1)

function SketchOverlay() {
  const pts: [number, number][] = [
    [0, 0.5],
    [Math.PI / 3, (1 + Math.sqrt(3)) / 2],
    [-Math.PI / 3, (1 - Math.sqrt(3)) / 2],
  ]
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[520px]">
        <img loading="lazy" decoding="async"
          src={graphSrc}
          alt="VCAA's axes with the printed graph of y = g(x) = sin(x) + 1/2, and the answer drawn over them: y = f(x) = ½tan(x) + ½ rising between dashed asymptotes x = −π/2 and x = π/2, meeting g at (−π/3, (1 − √3)/2), (0, 1/2) and (π/3, (1 + √3)/2)"
          className="w-full block"
        />
        <svg viewBox="0 0 1439 1365" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line x1={toX(-Math.PI / 2)} y1={95} x2={toX(-Math.PI / 2)} y2={1300} stroke={ORANGE} strokeWidth={5} strokeDasharray="22 16" />
          <line x1={toX(Math.PI / 2)} y1={95} x2={toX(Math.PI / 2)} y2={1300} stroke={ORANGE} strokeWidth={5} strokeDasharray="22 16" />
          <path d={functionToPath(f, X_LO, X_HI, toX, toY)} fill="none" stroke={ORANGE} strokeWidth={7} />
          {pts.map(([x, y]) => (
            <circle key={x} cx={toX(x)} cy={toY(y)} r={12} fill={ORANGE} />
          ))}
          <text x={205} y={150} {...LABEL}>x = −π/2</text>
          <text x={1232} y={1255} {...LABEL}>x = π/2</text>
          <text x={1010} y={300} textAnchor="end" {...LABEL}>(π/3, (1 + √3)/2)</text>
          <text x={680} y={630} textAnchor="end" {...LABEL}>(0, 1/2)</text>
          <text x={385} y={1068} {...LABEL}>(−π/3, (1 − √3)/2)</text>
        </svg>
      </div>
    </div>
  )
}

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      This question required general solutions to be found. The general solution needed to include multiples of{' '}
      <Katex tex="\pi" />. It is expected that students will have a way of remembering the exact values of{' '}
      <Katex tex="\sin\theta,\ \cos\theta" /> and <Katex tex="\tan\theta" /> for values of <Katex tex="\theta" /> between 0
      and <Katex tex="\tfrac{\pi}{2}" /> inclusive, as specified in the key knowledge of the study design.
    </>
  ),
}

const REPORT_BI: SAExaminerStats = {
  comment: <>There were multiple ways in which this question could be attempted.</>,
}

const REPORT_BII: SAExaminerStats = {
  comment: (
    <>
      Graph lines should be smooth, single-stroke constructions and display appropriate asymptotic behaviour. Asymptotes
      should be marked in as dashed or dotted lines and labelled with their equation.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac12\tan(x)+\frac12=0 \implies \tan(x)=-1" />,
    reason: <>Subtract <Katex tex="\tfrac12" />, then multiply by 2, to isolate <Katex tex="\tan(x)" />.</>,
  },
  {
    working: <Katex display tex="\tan\!\left(\frac{\pi}{4}\right)=1 \implies x=-\frac{\pi}{4}\ \text{is one solution}" />,
    reason: <>
      The reference angle is <Katex tex="\tfrac\pi4" />, an exact value to know by heart. <Katex tex="\tan" /> is an odd
      function (<Katex tex="\tan(-\theta)=-\tan(\theta)" />), so <Katex tex="\tan\left(-\tfrac\pi4\right)=-1" />.
    </>,
  },
  {
    working: <Katex display tex="\boxed{x=-\frac{\pi}{4}+n\pi,\quad n\in Z}" />,
    reason: <>
      <Katex tex="\tan" /> has period <Katex tex="\pi" />, so it takes each value exactly once in every interval of length{' '}
      <Katex tex="\pi" />: every solution is <Katex tex="-\tfrac\pi4" /> plus a whole number of periods. State that{' '}
      <Katex tex="n" /> is an integer.
    </>,
    more: <>
      VCAA also accepts <Katex tex="x=\tfrac{3\pi}{4}+n\pi" /> (the same set of angles, starting from a different
      member) and <Katex tex="x=\tfrac\pi4(4n-1)" />. The report prints that last form as{' '}
      <Katex tex="\tfrac\pi4\left(-1+4n\pi\right)" />, which is a slip: the stray <Katex tex="\pi" /> would give{' '}
      <Katex tex="-\tfrac\pi4+n\pi^2" />. None of these solutions is excluded from the maximal domain, which only removes{' '}
      <Katex tex="x=\tfrac\pi2+n\pi" />.
    </>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \frac12\tan(x)+\frac12&=\sin(x)+\frac12 \\ \implies \frac{\sin(x)}{2\cos(x)}&=\sin(x) \end{aligned}" />,
    reason: <>The <Katex tex="\tfrac12" />s cancel. Write <Katex tex="\tan(x)=\tfrac{\sin(x)}{\cos(x)}" /> so the equation has only sines and cosines.</>,
  },
  {
    working: <Katex display tex="\sin(x)=2\sin(x)\cos(x)" />,
    reason: <>Multiply both sides by <Katex tex="2\cos(x)" />, which is non-zero wherever <Katex tex="f" /> is defined (<Katex tex="\cos(x)=0" /> only at <Katex tex="x=\pm\tfrac\pi2" />, where <Katex tex="\tan" /> doesn&apos;t exist).</>,
  },
  {
    working: <Katex display tex="\sin(x)\left(1-2\cos(x)\right)=0" />,
    reason: <>Move everything to one side and factorise out <Katex tex="\sin(x)" />. Don&apos;t divide by <Katex tex="\sin(x)" />: that would throw away the solutions where it is zero.</>,
  },
  {
    working: <Katex display tex="\sin(x)=0 \quad\text{or}\quad \cos(x)=\frac12" />,
    reason: <>Null factor law.</>,
  },
  {
    working: <Katex display tex="\sin(x)=0,\ x\in(-\pi,\pi) \implies x=0" />,
    reason: <><Katex tex="\sin(x)=0" /> at <Katex tex="x=0,\ \pm\pi" />, but the interval is open, so <Katex tex="\pm\pi" /> are rejected.</>,
  },
  {
    working: <Katex display tex="\cos(x)=\frac12,\ x\in(-\pi,\pi) \implies x=\pm\frac{\pi}{3}" />,
    reason: <>Reference angle <Katex tex="\tfrac\pi3" />. Cosine is positive in the first and fourth quadrants, which within <Katex tex="(-\pi,\pi)" /> gives <Katex tex="\tfrac\pi3" /> and <Katex tex="-\tfrac\pi3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x=-\frac{\pi}{3},\ 0,\ \frac{\pi}{3}}" />,
    reason: <>
      Collect the solutions from both factors. None of them is <Katex tex="\pm\tfrac\pi2" />, so all three are in the domain
      of <Katex tex="f" />.
    </>,
    more: <>
      Check <Katex tex="x=\tfrac\pi3" />: <Katex tex="\tfrac12\sqrt3+\tfrac12" /> on the left, <Katex tex="\tfrac{\sqrt3}{2}+\tfrac12" /> on the right ✓.
    </>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="x=-\frac\pi2,\quad x=\frac\pi2 \quad\text{(vertical asymptotes)}" />,
    reason: <>
      <Katex tex="\tan(x)" /> is undefined where <Katex tex="\cos(x)=0" />, which on the closed interval{' '}
      <Katex tex="\left[-\tfrac\pi2,\tfrac\pi2\right]" /> happens at both ends. The graph shoots off to <Katex tex="\pm\infty" /> there.
      Dilating by <Katex tex="\tfrac12" /> and moving up <Katex tex="\tfrac12" /> doesn&apos;t move vertical asymptotes.
    </>,
  },
  {
    working: <Katex display tex="\begin{gathered} \left(-\frac\pi3,\ \frac{1-\sqrt3}{2}\right),\quad \left(0,\ \frac12\right), \\ \left(\frac\pi3,\ \frac{1+\sqrt3}{2}\right) \end{gathered}" />,
    reason: <>
      The points where <Katex tex="f(x)=g(x)" /> are the three <Katex tex="x" />-values from part b.i, all inside{' '}
      <Katex tex="\left(-\tfrac\pi2,\tfrac\pi2\right)" />. The <Katex tex="y" />-values come from either function, e.g.{' '}
      <Katex tex="g\left(\tfrac\pi3\right)=\tfrac{\sqrt3}{2}+\tfrac12" />.
    </>,
    more: <>
      Roughly <Katex tex="(-1.05,\,-0.37)" />, <Katex tex="(0,\,0.5)" /> and <Katex tex="(1.05,\,1.37)" />. Since{' '}
      <Katex tex="\tfrac\pi3" /> is exactly two grid columns from the origin (the columns are <Katex tex="\tfrac\pi6" /> wide), the
      outer two points sit right on VCAA&apos;s printed curve at the second gridline either side of the <Katex tex="y" />-axis.
    </>,
  },
  {
    working: (
      <SketchOverlay />
    ),
    reason: <>
      <Katex tex="f" /> is increasing throughout. It crosses <Katex tex="g" /> three times: below <Katex tex="g" /> on{' '}
      <Katex tex="\left(-\tfrac\pi2,-\tfrac\pi3\right)" />, above it on <Katex tex="\left(-\tfrac\pi3,0\right)" />, below on{' '}
      <Katex tex="\left(0,\tfrac\pi3\right)" />, and above again near <Katex tex="\tfrac\pi2" />. Both asymptotes are dashed and
      labelled with their equations, and the three intersection points with their coordinates.
    </>,
    more: <>
      Two more checks for the shape: <Katex tex="f" /> crosses the <Katex tex="x" />-axis at <Katex tex="x=-\tfrac\pi4" /> (part a.,
      the solution in this interval), halfway between the first two gridlines left of the origin; and since{' '}
      <Katex tex="f(-x)+f(x)=1" />, the curve is symmetric about the point <Katex tex="\left(0,\tfrac12\right)" />, where it is at its
      flattest (gradient <Katex tex="\tfrac12" />). The curve never touches the asymptotes, as the report&apos;s note on
      asymptotic behaviour asks.
    </>,
  },
]

export default function MethodsQ3_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (7 marks)</p>
        <p>
          Let <Katex tex="f:D\to R,\ f(x)=\dfrac12\tan(x)+\dfrac12" />, where <Katex tex="D" /> is the maximal domain.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="General Solution"
        marks={2}
        statement={
          <>
            Find the general solution for <Katex tex="f(x)=0" />.
          </>
        }
        examinerReport={REPORT_A}
      >
        <Background>
          <p>
            A <b>general solution</b> lists every solution, not just those in one interval. Find one solution, then use the
            period: <Katex tex="\tan" /> repeats every <Katex tex="\pi" /> (not <Katex tex="2\pi" /> like <Katex tex="\sin" /> and{' '}
            <Katex tex="\cos" />), so <Katex tex="\tan(x)=k" /> has the general solution{' '}
            <Katex tex="x=\tan^{-1}(k)+n\pi,\ n\in Z" />, one family rather than two.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Add 2nπ, as for sine and cosine"
          working={<Katex display tex="x=-\frac\pi4+2n\pi,\quad n\in Z" />}
        >
          This misses half the solutions, for example <Katex tex="x=\tfrac{3\pi}{4}" />, where{' '}
          <Katex tex="\tan\left(\tfrac{3\pi}{4}\right)=-1" /> too. The period of <Katex tex="\tan" /> is <Katex tex="\pi" />, so the
          step between solutions is <Katex tex="\pi" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          Let <Katex tex="g:R\to R,\ g(x)=\sin(x)+\dfrac12" />.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Trig Equation"
        marks={2}
        statement={
          <>
            Find all values of <Katex tex="x" /> such that <Katex tex="f(x)=g(x)" /> for <Katex tex="x\in(-\pi,\pi)" />.
          </>
        }
        examinerReport={REPORT_BI}
      >
        <WorkingTable rows={ROWS_BI} />
        <WrongMethod
          title="Divide both sides by sin(x)"
          working={<Katex display tex="\begin{aligned} \frac{\sin(x)}{2\cos(x)}&=\sin(x) \\ \implies \frac{1}{2\cos(x)}&=1 \\ \implies x&=\pm\frac\pi3 \end{aligned}" />}
        >
          Dividing by <Katex tex="\sin(x)" /> assumes it isn&apos;t zero, and so loses <Katex tex="x=0" />, where both graphs pass
          through <Katex tex="\left(0,\tfrac12\right)" />. Move everything to one side and factorise instead; each factor then gives
          its own solutions.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Sketch Tangent"
        marks={3}
        statement={
          <>
            The graph of <Katex tex="y=g(x)" /> is shown below.
            <br />
            On the set of axes below, sketch the graph of <Katex tex="y=f(x)" /> over the interval{' '}
            <Katex tex="\left(-\dfrac{\pi}{2},\dfrac{\pi}{2}\right)" />, labelling all points where <Katex tex="f(x)=g(x)" /> with
            their coordinates and all asymptotes with their equations.
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-3">
              <img loading="lazy" decoding="async"
                src={graphSrc}
                alt="From the original 2025 NHT VCAA exam paper: a grid from about −2π/3 to 2π/3 (gridlines every π/6, with −π/2 and π/2 marked) and from about −1.4 to 2.2 (gridlines every 0.5), showing y = g(x) = sin(x) + 1/2 with a minimum of −1/2 at x = −π/2 and a maximum of 3/2 at x = π/2"
                className="w-full max-w-[520px]"
              />
            </div>
          </>
        }
        examinerReport={REPORT_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>
    </div>
  )
}
