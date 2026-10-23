// 2024 Mathematical Methods NHT — Exam 1, Question 6 (4 marks). The NHT report gives sample
// answers only, with no statistics; its notes on parts a. (the trapezium rule is on the formula
// sheet) and b. (calculus required) are quoted as those parts' examiner comments. The trapezium
// rule with three strips under a translated sine curve, then the constant k that makes k·g a
// probability density function on [π/6, 2π/3]. Question text transcribed from the original
// paper; the graph is cropped from the original VCAA exam PDF, and the three trapezia in part a.
// are an SVG overlay on that crop (calibrated from its gridlines). Answers checked with sympy
// and against the VCAA report's sample answers (π; k = 1/π). Both the trapezium estimate and
// the exact integral equal π. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2024nhte1-q6-graph.png'

const REPORT_A: SAExaminerStats = {
  comment: <>The formula for finding area using the trapezium rule approximation is on the formula sheet.</>,
}

const REPORT_B: SAExaminerStats = {
  comment: <>This question required that calculus be used.</>,
}

// Calibration of the 1307 × 1069 crop, measured from its gridlines: x = 0 at column 224.5 with
// π/6 every 201.3 px; y = 0 at row 900.5 with 0.5 every 116.7 px.
const PX = (x6: number) => 224.5 + 201.3 * x6 // x6 = x ÷ (π/6)
const PY = (y: number) => 900.5 - 233.4 * y
const NODES: [number, number][] = [[1, 1], [2, 1.5], [3, 2.5], [4, 3]]

function TrapeziaOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[420px]">
        <img loading="lazy" decoding="async" src={graphSrc} alt="VCAA's graph of y = g(x) with three trapezia drawn over it between x = π/6 and x = 2π/3: their parallel sides are the heights 1, 1.5, 2.5 and 3 at x = π/6, π/3, π/2 and 2π/3, and their slanted tops are chords joining those points on the curve" className="w-full block" />
        <svg viewBox="0 0 1307 1069" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {NODES.slice(0, 3).map(([x6, y], i) => {
            const [x6b, yb] = NODES[i + 1]
            const pts = `${PX(x6)},${PY(0)} ${PX(x6)},${PY(y)} ${PX(x6b)},${PY(yb)} ${PX(x6b)},${PY(0)}`
            return <polygon key={i} points={pts} fill="#f97316" fillOpacity={0.18} stroke="#f97316" strokeWidth={7} strokeLinejoin="round" />
          })}
          {NODES.map(([x6, y]) => (
            <circle key={x6} cx={PX(x6)} cy={PY(y)} r={13} fill="#f97316" />
          ))}
        </svg>
      </div>
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="h=\frac{\frac{2\pi}{3}-\frac{\pi}{6}}{3}=\frac{\frac{\pi}{2}}{3}=\frac{\pi}{6}" />,
    reason: <>Three trapezia of equal width across <Katex tex="\left[\tfrac\pi6,\tfrac{2\pi}3\right]" />: the strip edges are <Katex tex="x=\tfrac\pi6,\tfrac\pi3,\tfrac\pi2,\tfrac{2\pi}3" />, the gridlines on the graph.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} g\!\left(\tfrac\pi6\right)&=\sin\!\left(-\tfrac\pi2\right)+2=1\\ g\!\left(\tfrac\pi3\right)&=\sin\!\left(-\tfrac\pi6\right)+2=\tfrac32\\ g\!\left(\tfrac\pi2\right)&=\sin\!\left(\tfrac\pi6\right)+2=\tfrac52\\ g\!\left(\tfrac{2\pi}3\right)&=\sin\!\left(\tfrac\pi2\right)+2=3\end{aligned}" />,
    reason: <>The heights at the four strip edges. For example at <Katex tex="x=\tfrac\pi3" />: <Katex tex="2x-\tfrac{5\pi}6=\tfrac{4\pi}6-\tfrac{5\pi}6=-\tfrac\pi6" />.</>,
    more: <>These match the graph: the curve passes through grid intersections at heights 1, 1.5, 2.5 and 3.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}A&\approx\frac h2\left[g(x_0)+2g(x_1)+2g(x_2)+g(x_3)\right]\\ &=\frac{\pi}{12}\left[1+2\cdot\tfrac32+2\cdot\tfrac52+3\right]\end{aligned}" />,
    reason: <>The trapezium rule from the formula sheet. Each inner height is shared by two trapezia, so it counts twice; the two end heights count once.</>,
  },
  {
    working: <Katex display tex="=\frac{\pi}{12}(1+3+5+3)=\frac{\pi}{12}\times12" />,
  },
  {
    working: <TrapeziaOverlay />,
    reason: <>The three trapezia drawn on the graph: the region the estimate actually measures.</>,
    more: <>The first chord lies above the curve, where it bends upward; the last lies below it, where it bends downward; the middle chord crosses the curve at its point of inflection, <Katex tex="\left(\tfrac{5\pi}{12},2\right)" />. The curve and the trapezia are both symmetric about that point, so the overestimates and underestimates cancel exactly, which is why part b. gets <Katex tex="\pi" /> too.</>,
  },
  {
    working: <Katex display tex="\boxed{A\approx\pi\ \text{square units}}" />,
    reason: <>Sanity check: the height runs from 1 to 3 over a width of <Katex tex="\tfrac\pi2" />, so the area is between <Katex tex="\tfrac\pi2" /> and <Katex tex="\tfrac{3\pi}2" />. <Katex tex="\pi" /> is the middle of that range.</>,
    more: <>The report also shows three separate trapezia, <Katex tex="\tfrac12\times\tfrac\pi6\left(1+\tfrac32\right)+\tfrac12\times\tfrac\pi6\left(\tfrac32+\tfrac52\right)+\tfrac12\times\tfrac\pi6\left(\tfrac52+3\right)=\pi" />, which is the same calculation. Part b. shows the exact area is also <Katex tex="\pi" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}\int_{\pi/6}^{2\pi/3}k\,g(x)\,dx=1\\ \implies \int_{\pi/6}^{2\pi/3}\left(\sin\!\left(2x-\tfrac{5\pi}6\right)+2\right)dx=\frac1k\end{gathered}" />,
    reason: <>A probability density function must have total area 1 under it over its domain. <Katex tex="k" /> is a constant, so take it outside the integral.</>,
    more: <>The other condition, <Katex tex="h(x)\ge0" />, needs <Katex tex="k>0" />, since <Katex tex="g(x)\ge1" /> on this interval (its minimum on the graph is 1).</>,
  },
  {
    working: <Katex display tex="=\left[-\tfrac12\cos\!\left(2x-\tfrac{5\pi}6\right)+2x\right]_{\pi/6}^{2\pi/3}" />,
    reason: <><Katex tex="\int\sin(ax+b)\,dx=-\tfrac1a\cos(ax+b)" /> (on the formula sheet), here with <Katex tex="a=2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}=&\left(-\tfrac12\cos\!\left(\tfrac\pi2\right)+\tfrac{4\pi}3\right)\\ &-\left(-\tfrac12\cos\!\left(-\tfrac\pi2\right)+\tfrac\pi3\right)\end{aligned}" />,
    reason: <>Upper terminal: <Katex tex="2\cdot\tfrac{2\pi}3-\tfrac{5\pi}6=\tfrac{8\pi-5\pi}{6}=\tfrac\pi2" />. Lower terminal: <Katex tex="2\cdot\tfrac\pi6-\tfrac{5\pi}6=-\tfrac\pi2" />.</>,
  },
  {
    working: <Katex display tex="=\left(0+\tfrac{4\pi}3\right)-\left(0+\tfrac\pi3\right)=\pi" />,
    reason: <><Katex tex="\cos\!\left(\pm\tfrac\pi2\right)=0" />, so only the <Katex tex="2x" /> terms survive.</>,
  },
  {
    working: <Katex display tex="\frac1k=\pi \implies \boxed{k=\frac1\pi}" />,
    reason: <>Positive, as it must be for <Katex tex="h" /> to be non-negative. Check: <Katex tex="\tfrac1\pi\times\pi=1" />.</>,
    more: <>Here the trapezium estimate from part a. happens to equal the exact area. Using it would still not earn the marks: the question says &ldquo;using calculus&rdquo;, and the report notes that calculus was required.</>,
  },
]

export default function MethodsQ6_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (4 marks)</p>
        <p>
          Part of the graph of <Katex tex="g(x)=\sin\!\left(2x-\dfrac{5\pi}{6}\right)+2" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="Part of the graph of y = g(x) on a grid with x-gridlines at π/6, π/3, π/2 and 2π/3 and y-gridlines every 0.5 from −0.5 to 3: the curve falls from about 2.1 through (0, 1.5) to a minimum of 1 at x = π/6, rises through 1.5 at π/3 and 2.5 at π/2 to a maximum of 3 at 2π/3, then starts to fall — from the original VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Trapezium Rule"
        marks={2}
        statement={
          <>
            Using the trapezium rule approximation method and three trapeziums of equal width, estimate the area
            bounded by the graph of <Katex tex="y=g(x)" />, the <Katex tex="x" />-axis and the lines{' '}
            <Katex tex="x=\dfrac\pi6" /> and <Katex tex="x=\dfrac{2\pi}3" />.
          </>
        }
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Continuous PDF"
        marks={2}
        statement={
          <>
            Let <Katex tex="h:\left[\dfrac\pi6,\dfrac{2\pi}3\right]\to R,\ h(x)=kg(x)" />, where <Katex tex="k\in R" />.
            <br />
            Using calculus, find <Katex tex="k" />, such that <Katex tex="h" /> is a probability density function.
          </>
        }
        examinerReport={REPORT_B}
      >
        <Background>
          <p>
            A function is a probability density function on an interval when it is never negative there and the total
            area under it over the interval is exactly 1. Multiplying <Katex tex="g" /> by a constant{' '}
            <Katex tex="k" /> scales that area by <Katex tex="k" />, so <Katex tex="k" /> is 1 divided by the area under{' '}
            <Katex tex="g" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Forget the 2 when integrating the sine"
          working={<Katex display tex="\left[-\cos\!\left(2x-\tfrac{5\pi}6\right)+2x\right]" />}
        >
          The derivative of <Katex tex="-\cos(2x-\ldots)" /> is <Katex tex="2\sin(2x-\ldots)" />, twice the
          integrand. Divide by the coefficient of <Katex tex="x" />: <Katex tex="-\tfrac12\cos" />. Here the cosine
          terms happen to vanish at both terminals, so the slip doesn&apos;t change the answer, but on another interval
          it would.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
