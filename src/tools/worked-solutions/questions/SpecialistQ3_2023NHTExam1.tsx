// 2023 Specialist NHT — Exam 1, Question 3 (5 marks). The NHT report gives sample answers only,
// with no statistics, and no notes. f(x) = 1/(3x) − 4x²/3: the second derivative, the point of
// inflection (4^(−1/3), 0) (which is also the x-intercept), then the left branch for x < 0 with its
// maximum (−1/2, −1) and the asymptote x = 0. Question text transcribed from the original paper; the
// graph is cropped from the original VCAA exam PDF (spec-2023nhte1-q3-graph.png) and both answers
// are SVG overlays on that crop, calibrated from its gridlines (x = −3…3 at 742.25 ± 204 px per
// unit, y = 3…−3 at 671.75 ∓ 169.4 px per unit; checked with a PIL composite of f(x) for x > 0 over
// VCAA's printed curve). Answers checked with sympy and against the report's sample answers.
// The report's a.ii working has a slip in its middle line, (1/4)·4^(1/3) − (1/3)·4^(1/3), which
// should read (1/3)·4^(1/3) − (1/3)·4^(1/3); its final value 0 is right. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'
import graphSrc from './spec-2023nhte1-q3-graph.png'

// Calibration of VCAA's grid in the crop's own pixels (1523 × 1292).
const OX = 742.25
const OY = 671.75
const SX = 204
const SY = 169.4
const px = (x: number) => OX + x * SX
const py = (y: number) => OY - y * SY
const f = (x: number) => 1 / (3 * x) - (4 * x * x) / 3
const ORANGE = '#f97316'
const LABEL = { fontSize: 46, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const
const XI = Math.pow(4, -1 / 3)

// x < 0 branch, from where it leaves the bottom of the printed grid (y = −3.4) on the left to
// where it leaves it again beside the asymptote.
function leftBranch() {
  const pts: string[] = []
  const a = -1.5454
  const b = -0.09841
  const n = 400
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n
    pts.push(`${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`)
  }
  return pts.join(' ')
}

function GraphAnswer({ part }: { part: 'aii' | 'b' }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[440px]">
        <img loading="lazy" decoding="async" src={graphSrc}
          alt={part === 'aii'
            ? "VCAA's graph of f for x > 0 with the answer drawn over it: the point of inflection marked on the x-axis at x = 4^(−1/3), about 0.63, and labelled (4^(−1/3), 0)"
            : "VCAA's graph of f with the answer drawn over it: the left branch for x < 0, rising from the bottom left to a maximum at (−1/2, −1) and then falling steeply towards the y-axis, which is marked as the dashed vertical asymptote x = 0; the point of inflection (4^(−1/3), 0) is still marked"}
          className="w-full block" />
        <svg viewBox="0 0 1523 1292" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {part === 'b' && (
            <>
              <line x1={px(0)} y1={92} x2={px(0)} y2={1250} stroke={ORANGE} strokeWidth={7} strokeDasharray="22 16" />
              <polyline points={leftBranch()} fill="none" stroke={ORANGE} strokeWidth={8} strokeLinejoin="round" />
              <circle cx={px(-0.5)} cy={py(-1)} r={13} fill={ORANGE} />
              <text x={px(-0.5) - 22} y={py(-1) - 34} textAnchor="end" {...LABEL}>(−½, −1)</text>
              <text x={px(0) + 22} y={1232} textAnchor="start" {...LABEL}>x = 0</text>
            </>
          )}
          <circle cx={px(XI)} cy={py(0)} r={13} fill={ORANGE} />
          <text x={px(XI) + 30} y={py(0) - 32} textAnchor="start" {...LABEL}>
            (4<tspan dy={-22} fontSize={32}>−1/3</tspan><tspan dy={22}>, 0)</tspan>
          </text>
        </svg>
      </div>
    </div>
  )
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\tfrac13x^{-1}-\tfrac43x^{2}" />,
    reason: <>Write the reciprocal as a negative power so that each term can be differentiated with the power rule.</>,
  },
  {
    working: <Katex display tex="f'(x)=-\tfrac13x^{-2}-\tfrac83x" />,
    reason: <>Power rule on each term: bring the power down and subtract one from it.</>,
  },
  {
    working: <Katex display tex="f''(x)=\tfrac23x^{-3}-\tfrac83" />,
    reason: <>Differentiate again: <Katex tex="-\tfrac13\times(-2)x^{-3}=\tfrac23x^{-3}" />, and <Katex tex="-\tfrac83x" /> differentiates to the constant <Katex tex="-\tfrac83" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f''(x)=\frac{2}{3x^3}-\frac83=\frac{2-8x^3}{3x^3}}" />,
    reason: <>Either form is fine. The single fraction is the useful one for part ii., because <Katex tex="f''(x)=0" /> then just means its numerator is zero.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="f''(x)=0\implies 2-8x^3=0\implies x^3=\frac14" />,
    reason: <>A point of inflection is where the concavity changes, so look where <Katex tex="f''(x)=0" />. The denominator <Katex tex="3x^3" /> is never zero on the domain, so only the numerator matters.</>,
  },
  {
    working: <Katex display tex="x=\sqrt[3]{\tfrac14}=4^{-\frac13}" />,
    reason: <>A cube root has exactly one real value, and it is positive here, so it lies on the part of the graph shown (<Katex tex="x>0" />).</>,
    more: <>Equivalent forms: <Katex tex="4^{-\frac13}=\tfrac{1}{\sqrt[3]4}=\tfrac{\sqrt[3]2}{2}\approx0.63" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}0<x<4^{-\frac13}&:\ f''(x)>0\\ x>4^{-\frac13}&:\ f''(x)<0\end{aligned}" />,
    reason: <>Check that the concavity really changes: for small positive <Katex tex="x" /> the numerator <Katex tex="2-8x^3" /> is positive, and for larger <Katex tex="x" /> it is negative, while <Katex tex="3x^3>0" /> throughout. So the graph changes from concave up to concave down, as the printed curve shows.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f(x)&=\frac{1-4x^3}{3x}\\ f\!\left(4^{-\frac13}\right)&=\frac{1-4\times\frac14}{3\times4^{-\frac13}}=0\end{aligned}" />,
    reason: <>Write <Katex tex="f(x)" /> over a common denominator: its numerator <Katex tex="1-4x^3" /> is zero exactly when <Katex tex="x^3=\tfrac14" />, so no messy powers of 4 are needed.</>,
    more: <>The report substitutes directly: <Katex tex="\tfrac13\cdot4^{\frac13}-\tfrac43\cdot4^{-\frac23}" />, and <Katex tex="\tfrac43\cdot4^{-\frac23}=\tfrac13\cdot4^{\frac13}" />, so the two terms cancel. (Its middle line prints the first coefficient as <Katex tex="\tfrac14" />; it should be <Katex tex="\tfrac13" />, and the answer 0 is right.)</>,
  },
  {
    working: <Katex display tex="\boxed{\left(4^{-\frac13},\ 0\right)}" />,
    reason: <>The point of inflection is also the <Katex tex="x" />-intercept. Sanity check: VCAA&apos;s curve crosses the <Katex tex="x" />-axis a little past <Katex tex="x=0.6" />, and that is where its bend changes direction ✓.</>,
  },
  {
    working: <GraphAnswer part="aii" />,
    reason: <>Mark the point on the graph and label it with its exact coordinates, as the question asks.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=-\frac{1}{3x^2}-\frac{8x}{3}=-\frac{1+8x^3}{3x^2}" />,
    reason: <>From part a.i. Over a common denominator, the stationary points are where the numerator is zero.</>,
  },
  {
    working: <Katex display tex="1+8x^3=0\implies x^3=-\frac18\implies x=-\frac12" />,
    reason: <>The only real solution is negative, which is why there is no stationary point on the printed <Katex tex="x>0" /> branch.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f\!\left(-\tfrac12\right)&=\frac{1}{3\left(-\frac12\right)}-\frac{4}{3}\left(-\tfrac12\right)^2\\ &=-\frac23-\frac43\cdot\frac14=-\frac23-\frac13=-1\end{aligned}" />,
    reason: <>Substitute back into <Katex tex="f(x)" /> for the <Katex tex="y" />-coordinate.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f''\!\left(-\tfrac12\right)&=\frac{2}{3\left(-\frac18\right)}-\frac83=-8<0\\ &\implies\text{local maximum}\end{aligned}" />,
    reason: <>Its nature, from part a.i.: a negative second derivative means concave down, so <Katex tex="\left(-\tfrac12,-1\right)" /> is a local maximum.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{as } x\to0^-,\ &f(x)\to-\infty\\ \text{as } x\to-\infty,\ &f(x)\to-\infty\end{aligned}" />,
    reason: <>Near zero the <Katex tex="\tfrac{1}{3x}" /> term dominates, and it is large and negative for small negative <Katex tex="x" />. So <Katex tex="x=0" /> is a vertical asymptote, approached downwards on the left. For large <Katex tex="|x|" /> the <Katex tex="-\tfrac43x^2" /> term dominates.</>,
    more: <>The left branch never meets the <Katex tex="x" />-axis: <Katex tex="f(x)=\tfrac{1-4x^3}{3x}" /> has a positive numerator and a negative denominator for every <Katex tex="x<0" />. And it never meets the right branch, since <Katex tex="x=0" /> is not in the domain.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{stationary point }\left(-\tfrac12,\,-1\right)\\ \text{asymptote } x=0\end{gathered}}" />,
    reason: <>Both are needed on the graph as well as in the working.</>,
  },
  {
    working: <GraphAnswer part="b" />,
    reason: <>The branch rises from the bottom of the grid near <Katex tex="x=-1.5" /> (where <Katex tex="f\approx-3.2" />), peaks at <Katex tex="\left(-\tfrac12,-1\right)" />, then plunges down beside the dashed asymptote <Katex tex="x=0" />. Label the stationary point and the asymptote&apos;s equation.</>,
    more: <>Accuracy checks: <Katex tex="f(-1)=-\tfrac13-\tfrac43=-\tfrac53" /> and <Katex tex="f\!\left(-\tfrac14\right)=-\tfrac43-\tfrac{1}{12}=-\tfrac{17}{12}" />, so the branch is lopsided: it falls much faster on the asymptote side of the maximum than on the far side.</>,
  },
]

export default function SpecialistQ3_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (5 marks)</p>
        <p>
          Part of the graph of <Katex tex="f" /> with rule <Katex tex="f(x)=\dfrac{1}{3x}-\dfrac{4x^2}{3}" /> is
          shown below where <Katex tex="x>0" />.
        </p>
        <div className="mt-1 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={graphSrc}
            alt="Graph from the original VCAA exam paper: x and y each from −3 to 3 on a grid with lines every 0.5; the curve for x > 0 comes down steeply from near the top of the y-axis, crosses the x-axis a little past 0.6, passes through (1, −1) and leaves the bottom of the grid near x = 1.6"
            className="w-full max-w-[420px]" />
        </div>
      </div>

      <PartCard letter="a.i" topic="Second Derivative" marks={1} statement={<>Find the second derivative of <Katex tex="f(x)" />.</>}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Point of Inflection"
        marks={2}
        statement={
          <>
            Hence, find the coordinates of the point of inflection. Label the point of inflection, with
            its coordinates, on the graph above.
          </>
        }
      >
        <Background>
          <p>
            A point of inflection is where the graph changes concavity: from bending up (
            <Katex tex="f''>0" />) to bending down (<Katex tex="f''<0" />), or the reverse. So solve{' '}
            <Katex tex="f''(x)=0" /> and then check that <Katex tex="f''" /> really changes sign there,
            since a zero of <Katex tex="f''" /> alone is not enough.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Graph Sketching"
        marks={2}
        statement={
          <>
            Complete the graph of <Katex tex="f" /> on the axes above by sketching the graph of{' '}
            <Katex tex="f" /> where <Katex tex="x<0" />. Find the coordinates of the stationary point and
            the equation of the vertical asymptote. Label both on the graph above.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
