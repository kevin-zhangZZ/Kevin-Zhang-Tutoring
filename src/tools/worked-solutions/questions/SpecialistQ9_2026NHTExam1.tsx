// 2026 Specialist NHT — Exam 1, Question 9 (6 marks). The NHT report gives sample answers only,
// with no statistics, and no notes. f(x) = (2x³ − 3x² − 3x + 2)/(2x − 2): a. long division gives the
// parabolic asymptote y = x² − x/2 − 2 (remainder −2); b. the numerator factorises as
// (x + 1)(2x − 1)(x − 2), so the x-intercepts are −1, 1/2, 2; c. the sketch, with y-intercept
// (0, −1). Question text transcribed from the original paper; the asymptote graph is cropped from
// the original VCAA exam PDF (spec-2026nhte1-q9-graph.png) and the part c. answer is an SVG overlay
// on that crop, calibrated from its gridlines (x = −1…3 at 546.5 + 288.75 px per unit, y = 4…−6 at
// 622.5 − 92.5 px per unit; checked with a PIL composite of the parabola y = x² − x/2 − 2, which sat
// exactly on VCAA's dashed curve). Answers checked with sympy (only real stationary point
// x ≈ −0.1369, f ≈ −1.033, matching the given P) and against the report's sample answers and its
// sample sketch. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'
import graphSrc from './spec-2026nhte1-q9-graph.png'

// Calibration of VCAA's grid in the crop's own pixels (1735 × 1410).
const OX = 546.5
const OY = 622.5
const SX = 288.75
const SY = 92.5
const px = (x: number) => OX + x * SX
const py = (y: number) => OY - y * SY
const f = (x: number) => (2 * x ** 3 - 3 * x ** 2 - 3 * x + 2) / (2 * x - 2)
const ORANGE = '#f97316'
const LABEL = { fontSize: 46, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const

// Each branch runs between the edges of VCAA's printed grid (x = −1.8095 on the left; y = 5.746 at
// the top and y = −7.746 at the bottom, where the gridlines stop).
function branch(a: number, b: number) {
  const pts: string[] = []
  const n = 500
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n
    pts.push(`${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`)
  }
  return pts.join(' ')
}

function SketchAnswer() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[460px]">
        <img loading="lazy" decoding="async" src={graphSrc}
          alt="VCAA's graph of the asymptotes with the answer drawn over it: left of x = 1 the curve comes down from the top left above the dashed parabola, crosses the x-axis at −1, reaches the minimum P just left of the y-axis, passes through the labelled y-intercept (0, −1), crosses the x-axis at 1/2 and rises steeply up beside the asymptote x = 1; right of x = 1 it comes up from the bottom beside the asymptote, crosses the x-axis at 2 and runs up just below the dashed parabola"
          className="w-full block" />
        <svg viewBox="0 0 1735 1410" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <polyline points={branch(-1.8095, 0.86541)} fill="none" stroke={ORANGE} strokeWidth={8} strokeLinejoin="round" />
          <polyline points={branch(1.15384, 3.12724)} fill="none" stroke={ORANGE} strokeWidth={8} strokeLinejoin="round" />
          <circle cx={px(0)} cy={py(-1)} r={13} fill={ORANGE} />
          <text x={px(0) + 26} y={py(-1) + 58} textAnchor="start" {...LABEL}>(0, −1)</text>
        </svg>
      </div>
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{array}{r}x^2-\tfrac12x-2\phantom{)}\\ 2x-2\,\big)\overline{\,2x^3-3x^2-3x+2\,}\\ \underline{2x^3-2x^2\phantom{-3x+2}}\\ -x^2-3x\phantom{+2}\\ \underline{-x^2+\phantom{3}x\phantom{+2}}\\ -4x+2\\ \underline{-4x+4}\\ -2\end{array}"
      />
    ),
    reason: <>Divide the numerator by the denominator. At each step, divide the leading term by <Katex tex="2x" />: <Katex tex="\tfrac{2x^3}{2x}=x^2" />, <Katex tex="\tfrac{-x^2}{2x}=-\tfrac12x" />, <Katex tex="\tfrac{-4x}{2x}=-2" />. Multiply back and subtract.</>,
  },
  {
    working: <Katex display tex="f(x)=x^2-\frac12x-2-\frac{2}{2x-2}" />,
    reason: <>Quotient plus remainder over divisor. As <Katex tex="x\to\pm\infty" />, <Katex tex="\tfrac{2}{2x-2}\to0" />, so the graph approaches the quotient.</>,
    more: <>Check by multiplying back: <Katex tex="(2x-2)\left(x^2-\tfrac12x-2\right)-2=2x^3-x^2-4x-2x^2+x+4-2=2x^3-3x^2-3x+2" /> ✓.</>,
  },
  {
    working: <Katex display tex="\boxed{y=x^2-\frac12x-2}" />,
    reason: <>Give the asymptote as an equation, <Katex tex="y=\dots" />. Sanity check against the printed dashed parabola: its <Katex tex="y" />-intercept is <Katex tex="-2" />, and its vertex is at <Katex tex="x=\tfrac14" />, just right of the <Katex tex="y" />-axis, as drawn ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="2x^3-3x^2-3x+2=0" />,
    reason: <>The graph meets the <Katex tex="x" />-axis where <Katex tex="f(x)=0" />, i.e. where the numerator is zero (and the denominator isn&apos;t).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=-1:\ &2(-1)^3-3(-1)^2-3(-1)+2\\ &=-2-3+3+2=0\end{aligned}" />,
    reason: <>Factor theorem: try small values that divide the constant term. The printed graph also suggests looking near <Katex tex="x=-1" />. So <Katex tex="(x+1)" /> is a factor.</>,
  },
  {
    working: <Katex display tex="2x^3-3x^2-3x+2=(x+1)\left(2x^2+\alpha x+2\right)" />,
    reason: <>The quadratic factor must start with <Katex tex="2x^2" /> (to give <Katex tex="2x^3" />) and end with <Katex tex="2" /> (to give the constant 2).</>,
  },
  {
    working: <Katex display tex="x^2\text{ terms: }\ \alpha+2=-3\implies\alpha=-5" />,
    reason: <>Compare the <Katex tex="x^2" /> coefficients: expanding gives <Katex tex="\alpha x^2" /> from <Katex tex="x\cdot\alpha x" /> and <Katex tex="2x^2" /> from <Katex tex="1\cdot2x^2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&(x+1)\left(2x^2-5x+2\right)=0\\ &(x+1)(2x-1)(x-2)=0\end{aligned}" />,
    reason: <>Factorise the quadratic: two numbers multiplying to <Katex tex="2\times2=4" /> and adding to <Katex tex="-5" /> are <Katex tex="-1" /> and <Katex tex="-4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x=-1,\ x=\frac12,\ x=2}" />,
    reason: <>None of these is <Katex tex="x=1" />, so all three are genuine intercepts (the denominator <Katex tex="2x-2" /> is non-zero there). Sanity check: <Katex tex="f(2)=\tfrac{16-12-6+2}{2}=0" /> ✓.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(0)=\frac{2}{-2}=-1\implies(0,\,-1)" />,
    reason: <>The <Katex tex="y" />-intercept, which the question asks you to label.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x<1&:\ -\tfrac{2}{2x-2}>0\\ &\Rightarrow\ \text{above the parabola}\\ x>1&:\ -\tfrac{2}{2x-2}<0\\ &\Rightarrow\ \text{below the parabola}\end{aligned}" />,
    reason: <>From part a., <Katex tex="f(x)" /> is the parabola plus <Katex tex="-\tfrac{2}{2x-2}" />. Its sign says which side of the parabola the graph is on, and it never equals zero, so the graph never crosses the parabolic asymptote.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x\to1^-&:\ f(x)\to+\infty\\ x\to1^+&:\ f(x)\to-\infty\end{aligned}" />,
    reason: <>Near <Katex tex="x=1" /> the term <Katex tex="-\tfrac{2}{2x-2}" /> blows up: positive just left of 1, negative just right of 1.</>,
  },
  {
    working: <SketchAnswer />,
    reason: <>Left branch: from the top left (above the dashed parabola) through <Katex tex="(-1,0)" />, down to the turning point <Katex tex="P" />, through <Katex tex="(0,-1)" /> and <Katex tex="\left(\tfrac12,0\right)" />, then up beside <Katex tex="x=1" />. Right branch: up from the bottom beside <Katex tex="x=1" />, through <Katex tex="(2,0)" />, then hugging the parabola from below. Label the <Katex tex="y" />-intercept.</>,
    more: <>Accuracy checks: <Katex tex="P" /> is the only turning point, and it sits just left of and below <Katex tex="(0,-1)" />, so the curve is almost flat there. The right branch has no turning point: it rises the whole way. And far from <Katex tex="x=1" /> the gap to the parabola, <Katex tex="\left|\tfrac{2}{2x-2}\right|" />, is small (only 0.5 at <Katex tex="x=3" /> and <Katex tex="x=-1" />).</>,
  },
]

export default function SpecialistQ9_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (6 marks)</p>
        <p>
          The asymptotes of the graph of <Katex tex="f(x)=\dfrac{2x^3-3x^2-3x+2}{2x-2}" /> are shown below.
        </p>
        <div className="mt-1 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={graphSrc}
            alt="Graph from the original VCAA exam paper: x from about −1.8 to 3.8 with gridlines every 1, y from about −7.7 to 5.7 with gridlines every 2; a dashed parabola through about (−1.2, 0) and (1.7, 0) with its lowest point near (0.25, −2), the dashed vertical line x = 1, and a point P marked just left of the y-axis at about y = −1"
            className="w-full max-w-[440px]" />
        </div>
      </div>

      <PartCard letter="a" topic="Asymptotes" marks={2} statement={<>Find the equation of the parabolic asymptote.</>}>
        <Background>
          <p>
            When the numerator&apos;s degree is higher than the denominator&apos;s, divide: <Katex tex="f(x)" /> = quotient +{' '}
            <Katex tex="\tfrac{\text{remainder}}{\text{divisor}}" />. The fraction tends to 0 for large <Katex tex="|x|" />,
            so the graph approaches the quotient. A cubic over a linear gives a quadratic quotient: a parabolic
            asymptote.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Factor Theorem" marks={2} statement={<>Find the <Katex tex="x" />-intercepts of the graph of <Katex tex="f(x)" />.</>}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            Given that there is a turning point, <Katex tex="P" />, at approximately <Katex tex="(-0.14,\ -1.03)" /> as shown,
            sketch the graph of <Katex tex="y=f(x)" /> on the axes provided above, labelling the <Katex tex="y" />-intercept.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Draw the left branch below the parabola"
          working={<>A curve that runs under the dashed parabola for <Katex tex="x<1" /> and over it for <Katex tex="x>1" />.</>}
        >
          The sign of the remainder term decides the side: for <Katex tex="x<1" />, <Katex tex="2x-2<0" />, so{' '}
          <Katex tex="-\tfrac{2}{2x-2}>0" /> and the graph is <b>above</b> the parabola. The given points confirm it:{' '}
          <Katex tex="(0,-1)" /> and <Katex tex="P" /> are above the parabola&apos;s <Katex tex="y" />-intercept of <Katex tex="-2" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
