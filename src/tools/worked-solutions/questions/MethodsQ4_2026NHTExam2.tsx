// 2026 Mathematical Methods NHT — Exam 2, Section B Question 4 (17 marks). The NHT report gives
// sample answers only, with no statistics. A function f on [0, 5] known only from its graph
// (stationary points (1, 2), (2, 0), (3, 3), (4, 1); endpoints (0, −1), (5, 4)): where f′ = 0,
// how many solutions f(x) = k has, reflections (and the half-turn symmetry that makes −f(−x) a
// translation of f), inverses of f restricted to [m, m + 1], and the composite f(g(x)) with the
// cubic g(x) = x³ − x² − x + 3 on (−0.8, 1.8): its range, minimum and stationary points by the chain
// rule. Question text transcribed from the original paper; the graph of f (printed twice, at the
// start and in part d.) is cropped from the original VCAA exam PDF, and the horizontal lines and
// bands in part b. are an SVG overlay on that crop, calibrated from its gridlines (origin
// (659.5, 591), 118.1 px per unit; the crossings at x ≈ 0.19 and x ≈ 4.82 are measured from the
// printed curve). Answers checked with sympy and against the VCAA report's sample answers: a. 1, 2,
// 3, 4; b.i. k = 0, 3; b.ii. (0, 1) ∪ (2, 3); c.i. (2, 0), (4, −1); c.ii. b = 5, c = −3; d.i. [0, 2];
// d.ii. 1; e.ii. m = 3, 4; f.i. [2, 474/125); f.ii. 0 at x = 1; f.iii. x = −1/3, 0, 1, (1 ± √5)/2.
// The WrongMethod in b.i. is a verified miscount, not taken from the report, which has no comments.
// Solution is original.

import type { ReactNode } from 'react'
import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2026nhte2-q4-graph.png'

// Calibration of the cropped graph (1359 × 1133 px), measured from its printed gridlines.
const OX = 659.5
const OY = 591
const S = 118.1
const px = (x: number) => OX + x * S
const py = (y: number) => OY - y * S
const ORANGE = '#f97316'
const LABEL = { fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' as const, fontSize: 44, fontStyle: 'italic' as const }

function GraphImg({ alt }: { alt: string }) {
  return <img loading="lazy" decoding="async" src={graphSrc} alt={alt} className="block w-full max-w-[460px]" />
}

const GRAPH_ALT =
  'The graph of y = f(x) on [0, 5] from the original 2026 NHT VCAA exam paper: a closed point at (0, −1), up to a local maximum at (1, 2), down to touch the x-axis at (2, 0), up to (3, 3), down to (4, 1) and up to a closed point at (5, 4), on a grid from −5 to 5 in both directions'

function Overlay({ alt, children }: { alt: string; children: ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[460px]">
        <GraphImg alt={alt} />
        <svg viewBox="0 0 1359 1133" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {children}
        </svg>
      </div>
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 0 \ \text{ at the stationary points}" />,
    reason: <>A stationary point is exactly where the gradient is zero. The stem lists all four of them, and says there are exactly four.</>,
    more: <>The endpoints <Katex tex="(0,-1)" /> and <Katex tex="(5,4)" /> are not stationary points: the curve is still climbing steeply there.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 1,\ 2,\ 3,\ 4}" />,
    reason: <>The <Katex tex="x" />-coordinates only: the question asks for values of <Katex tex="x" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>Number of solutions of <Katex tex="f(x)=k" /> = number of times the line <Katex tex="y=k" /> meets the graph</>,
    reason: <>Count where the horizontal line <Katex tex="y=k" /> meets the graph as <Katex tex="k" /> increases. The count only changes at the heights of turning points and endpoints: <Katex tex="-1,0,1,2,3,4" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} k=0&:\ x\in(0,1) \text{ and } x=2 \\ k=3&:\ x=3 \text{ and } x\in(4,5) \end{aligned}" />,
    reason: <>At <Katex tex="k=0" /> the line touches the minimum at <Katex tex="(2,0)" /> and crosses the first rise once. At <Katex tex="k=3" /> it touches the maximum at <Katex tex="(3,3)" /> and crosses the last rise once.</>,
    more: <>Every other height gives a different count: 1 for <Katex tex="-1\le k<0" /> and <Katex tex="3<k\le4" />; 3 for <Katex tex="0<k<1" /> and <Katex tex="2<k<3" />; 4 at <Katex tex="k=1" /> and <Katex tex="k=2" />; 5 for <Katex tex="1<k<2" />.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-3">
        <Katex display tex="\boxed{k = 0 \ \text{ or } \ k = 3}" />
        <Overlay alt="The graph of f with the horizontal lines y = 0 and y = 3 drawn in orange, each meeting the graph at exactly two orange points">
          <line x1={px(0)} y1={py(0)} x2={px(5)} y2={py(0)} stroke={ORANGE} strokeWidth={7} />
          <line x1={px(0)} y1={py(3)} x2={px(5)} y2={py(3)} stroke={ORANGE} strokeWidth={7} />
          {[[0.19, 0], [2, 0], [3, 3], [4.82, 3]].map(([x, y]) => (
            <circle key={`${x}`} cx={px(x)} cy={py(y)} r={13} fill={ORANGE} stroke="white" strokeWidth={3} />
          ))}
          <text x={px(0.3)} y={py(3) - 18} {...LABEL}>k = 3</text>
          <text x={px(4.1)} y={py(0) - 18} {...LABEL}>k = 0</text>
        </Overlay>
      </div>
    ),
    reason: <>Each orange line meets the graph at exactly two points.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} 0<k<1: \text{ one solution each on} \\ (0,1),\ (1,2),\ (2,3) \end{gathered}" />,
    reason: <>A line just above the <Katex tex="x" />-axis crosses the first rise, the fall to <Katex tex="(2,0)" /> and the next rise. It is below the minimum at <Katex tex="(4,1)" />, so the right-hand part of the graph isn&apos;t reached.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} 2<k<3: \text{ one solution each on} \\ (2,3),\ (3,4),\ (4,5) \end{gathered}" />,
    reason: <>Above the first peak at height 2 but below the second at height 3: the line crosses either side of <Katex tex="(3,3)" /> and the final rise.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-3">
        <Katex display tex="\boxed{k \in (0,1) \cup (2,3)}" />
        <Overlay alt="The graph of f with two horizontal orange bands shaded, between y = 0 and y = 1 and between y = 2 and y = 3">
          <rect x={px(-5.5)} y={py(1)} width={px(5.4) - px(-5.5)} height={S} fill={ORANGE} opacity={0.22} />
          <rect x={px(-5.5)} y={py(3)} width={px(5.4) - px(-5.5)} height={S} fill={ORANGE} opacity={0.22} />
          <text x={px(-4.6)} y={py(0.5) + 15} {...LABEL}>0 &lt; k &lt; 1</text>
          <text x={px(-4.6)} y={py(2.5) + 15} {...LABEL}>2 &lt; k &lt; 3</text>
        </Overlay>
      </div>
    ),
    reason: <>Open intervals: the boundary heights 0 and 3 give two solutions (part b.i.), and 1 and 2 give four.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="(x, y) \ \to\ (x, -y)" />,
    reason: <>Reflecting in the <Katex tex="x" />-axis keeps <Katex tex="x" /> and negates <Katex tex="y" />. It turns every local minimum into a local maximum, and vice versa.</>,
  },
  {
    working: <Katex display tex="\text{Minima } (2,0),\ (4,1) \ \to\ (2,0),\ (4,-1)" />,
    reason: <>So the image&apos;s local maxima come from <Katex tex="f" />&apos;s local <em>minima</em>.</>,
  },
  {
    working: <Katex display tex="\boxed{(2, 0) \text{ and } (4, -1)}" />,
    reason: <>The point <Katex tex="(2,0)" /> is on the axis of reflection, so it stays where it is.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} (x, y) \ \to\ (-x, -y) \\ y = -f(-x), \quad x \in [-5, 0] \end{gathered}" />,
    reason: <>Reflecting in the <Katex tex="x" />-axis and then the <Katex tex="y" />-axis negates both coordinates (a half-turn about the origin). The domain <Katex tex="[0,5]" /> becomes <Katex tex="[-5,0]" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} (0,-1) &\to (0,1) & (1,2) &\to (-1,-2) \\ (2,0) &\to (-2,0) & (3,3) &\to (-3,-3) \\ (4,1) &\to (-4,-1) & (5,4) &\to (-5,-4) \end{aligned}" />,
    reason: <>Track the six key points of <Katex tex="f" />: its endpoints and stationary points.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} y = f(x+b)+c \text{ has domain } [-b,\ 5-b] \\ [-b,\ 5-b] = [-5, 0] \ \Rightarrow\ b = 5 \end{gathered}" />,
    reason: <>A translation keeps the shape and order, so the image&apos;s left endpoint <Katex tex="(-5,-4)" /> must come from <Katex tex="f" />&apos;s left endpoint <Katex tex="(0,-1)" />: 5 units left.</>,
  },
  {
    working: <Katex display tex="-1 + c = -4 \ \Rightarrow\ c = -3" />,
    reason: <>The same point moves from height <Katex tex="-1" /> to <Katex tex="-4" />: 3 units down.</>,
  },
  {
    working: <Katex display tex="\boxed{b = 5, \quad c = -3}" />,
    reason: <>Check the rest: shifting <Katex tex="f" />&apos;s points left 5 and down 3 gives <Katex tex="(-4,-1)" />, <Katex tex="(-3,-3)" />, <Katex tex="(-2,0)" />, <Katex tex="(-1,-2)" />, <Katex tex="(0,1)" />, exactly the reflected points above.</>,
    more: <>This only works because the graph of <Katex tex="f" /> has half-turn symmetry about <Katex tex="(2.5,1.5)" />: <Katex tex="f(x)+f(5-x)=3" /> at every key point (for example <Katex tex="f(1)+f(4)=2+1" />). A half-turn about that point is the same as a half-turn about the origin followed by the translation found here.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} f \text{ on } [1,2] \text{ decreases} \\ \text{from } f(1)=2 \text{ to } f(2)=0 \end{gathered}" />,
    reason: <>Between the maximum at <Katex tex="(1,2)" /> and the minimum at <Katex tex="(2,0)" />, <Katex tex="f" /> is strictly decreasing, so it is one-to-one and has an inverse. Its range is <Katex tex="[0,2]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{dom} h_1 = [0, 2]}" />,
    reason: <>The domain of an inverse is the range of the original function.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="f(1) = 2 \ \Rightarrow\ h_1(2) = 1" />,
    reason: <><Katex tex="h_1(2)" /> asks: which <Katex tex="x" /> in <Katex tex="[1,2]" /> has <Katex tex="f(x)=2" />? That is the maximum, <Katex tex="x=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h_1(2) = 1}" />,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <>
      <p><Katex tex="f" /> has turning points at <Katex tex="x=1,2,3,4" />.</p>
      <p className="mt-1">If <Katex tex="m" /> is not an integer, <Katex tex="[m,m+1]" /> contains one of them strictly inside it, so <Katex tex="f" /> is not one-to-one there and has no inverse.</p>
    </>,
    reason: <>An inverse function needs a one-to-one function. Either side of a turning point the graph goes up then down (or down then up), so a horizontal line hits it twice.</>,
  },
  {
    working: <>
      <p>If <Katex tex="m" /> is an integer, the turning points can only be at the endpoints of <Katex tex="[m,m+1]" />, so <Katex tex="f" /> is strictly monotonic there and the inverse exists.</p>
    </>,
    reason: <>An interval of length 1 always contains an integer; it avoids having one strictly inside only when both endpoints are integers.</>,
    more: <>For example, <Katex tex="m=1.5" /> gives <Katex tex="[1.5,2.5]" />, which contains the minimum at <Katex tex="x=2" />: the values just either side of 2 repeat.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="h_m(1) = \text{the } x \in [m, m+1] \text{ with } f(x) = 1" />,
    reason: <>By definition of the inverse.</>,
  },
  {
    working: <Katex display tex="f(0),f(1),\ldots,f(5) = -1, 2, 0, 3, 1, 4" />,
    reason: <>For <Katex tex="h_m(1)" /> to be an integer, the solution of <Katex tex="f(x)=1" /> must be a whole number. Reading the graph at the integers, only <Katex tex="f(4)=1" />. The other solutions of <Katex tex="f(x)=1" /> (in <Katex tex="(0,1)" />, <Katex tex="(1,2)" />, <Katex tex="(2,3)" />) aren&apos;t integers.</>,
  },
  {
    working: <Katex display tex="4 \in [m, m+1] \text{ for } m = 3 \text{ and } m = 4" />,
    reason: <>The intervals <Katex tex="[3,4]" /> and <Katex tex="[4,5]" /> both contain <Katex tex="x=4" />, at an endpoint.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 3 \ \text{ or } \ m = 4}" />,
    reason: <>In both cases <Katex tex="h_m(1)=4" />.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 3x^2 - 2x - 1 = (3x+1)(x-1)" />,
    reason: <>To find the range of a cubic on an interval, find its turning points and compare them with the endpoints.</>,
  },
  {
    working: <Katex display tex="g'(x) = 0 \ \Rightarrow\ x = -\tfrac13 \ \text{ or } \ x = 1" />,
    reason: <>Both are inside <Katex tex="(-0.8,1.8)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} g(-0.8) &= 2.648 & g\!\left(-\tfrac13\right) &= \tfrac{86}{27} \approx 3.185 \\ g(1) &= 2 & g(1.8) &= 3.792 \end{aligned}" />,
    reason: <>The endpoint values are limits, not attained, because the domain is open. The local minimum <Katex tex="g(1)=2" /> is the lowest value; the highest is approached at <Katex tex="x\to1.8" />, above the local maximum.</>,
    more: <><Katex tex="g(-0.8)=2.648" /> is between 2 and 3.792, so the open left end doesn&apos;t affect the range.</>,
  },
  {
    working: <Katex display tex="\operatorname{ran} g = [2,\ 3.792) = \left[2,\ \tfrac{474}{125}\right)" />,
    reason: <>Closed at 2 (attained at <Katex tex="x=1" />) and open at 3.792 (only approached).</>,
  },
  {
    working: <Katex display tex="\boxed{\left[2,\ \tfrac{474}{125}\right) \subseteq [0, 5] = \operatorname{dom} f}" />,
    reason: <>For <Katex tex="f(g(x))" /> to be defined, every output of <Katex tex="g" /> must be a valid input of <Katex tex="f" />. The range of <Katex tex="g" /> lies inside the domain of <Katex tex="f" />, so <Katex tex="f(g(x))" /> is defined for all <Katex tex="x\in(-0.8,1.8)" />. As required.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="\min\{f(u) : u \in [2, 3.792)\} = f(2) = 0" />,
    reason: <>As <Katex tex="x" /> runs through <Katex tex="(-0.8,1.8)" />, <Katex tex="u=g(x)" /> runs through <Katex tex="[2,3.792)" />. On that stretch of the graph, <Katex tex="f" /> rises from 0 at <Katex tex="u=2" /> to 3 at <Katex tex="u=3" />, then falls but stays above 1 (the next minimum, <Katex tex="f(4)=1" />, is beyond 3.792).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} g(x) = 2 \ \Rightarrow\ x^3 - x^2 - x + 1 &= 0 \\ (x-1)^2(x+1) &= 0 \end{aligned}" />,
    reason: <>Find where the minimum happens: where <Katex tex="g(x)=2" />. Factorise by spotting <Katex tex="x=1" /> as a root.</>,
  },
  {
    working: <Katex display tex="x = 1 \quad (x = -1 \notin (-0.8, 1.8))" />,
    reason: <>Reject <Katex tex="x=-1" />: it is outside the domain of <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Minimum value } 0, \text{ when } x = 1}" />,
    reason: <>Both pieces are needed for the two marks.</>,
  },
]

const ROWS_FIII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\,f(g(x)) = f'(g(x))\,g'(x)" />,
    reason: <>Chain rule. We have no rule for <Katex tex="f" />, but we know exactly where <Katex tex="f'" /> is zero (part a.), and that is all a stationary point needs.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} f'(g(x))\,g'(x) = 0 \\ g'(x) = 0 \ \text{ or } \ f'(g(x)) = 0 \end{gathered}" />,
    reason: <>A product is zero when either factor is. Missing one of the two cases is the easiest way to lose marks here.</>,
  },
  {
    working: <Katex display tex="g'(x) = 0: \quad x = -\tfrac13 \ \text{ or } \ x = 1" />,
    reason: <>From part f.i.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} f'(g(x)) = 0: \\ g(x) \in \{1,2,3,4\} \cap \left[2, \tfrac{474}{125}\right) = \{2, 3\} \end{gathered}" />,
    reason: <><Katex tex="f'(u)=0" /> at <Katex tex="u=1,2,3,4" /> (part a.), but <Katex tex="g(x)" /> only takes values in its range from part f.i., which contains 2 and 3 but not 1 or 4.</>,
  },
  {
    working: <Katex display tex="g(x) = 2: \quad x = 1" />,
    reason: <>From part f.ii. (again rejecting <Katex tex="x=-1" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} g(x) = 3: \quad x^3 - x^2 - x &= 0 \\ x(x^2 - x - 1) &= 0 \\ x &= 0, \ \tfrac{1 \pm \sqrt5}{2} \end{aligned}" />,
    reason: <>Take out the common factor <Katex tex="x" />, then the quadratic formula. Both <Katex tex="\tfrac{1-\sqrt5}{2}\approx-0.618" /> and <Katex tex="\tfrac{1+\sqrt5}{2}\approx1.618" /> lie in <Katex tex="(-0.8,1.8)" />, so both are kept.</>,
    more: <>On CAS: <Cas fn="solve">solve(x³ − x² − x + 3 = 3, x) | −0.8 &lt; x &lt; 1.8</Cas></>,
  },
  {
    working: <Katex display tex="\boxed{x = -\tfrac13,\ \ \tfrac{1-\sqrt5}{2},\ \ 0,\ \ 1,\ \ \tfrac{1+\sqrt5}{2}}" />,
    reason: <>Five stationary points; <Katex tex="x=1" /> comes up in both cases but is listed once. Exact values, since no rounding was asked for.</>,
    more: <>At <Katex tex="x=-\tfrac13" /> the composite is stationary only because <Katex tex="g" /> is: <Katex tex="g(-\tfrac13)=\tfrac{86}{27}\approx3.19" /> is not one of <Katex tex="f" />&apos;s stationary inputs. At the other four, <Katex tex="g" /> lands on a stationary point of <Katex tex="f" />.</>,
  },
]

export default function MethodsQ4_2026NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (17 marks)</p>
        <p>
          Let <Katex tex="f" /> be a differentiable function with domain <Katex tex="[0,5]" />.
        </p>
        <p>
          The graph of <Katex tex="y=f(x)" /> is shown below. It has exactly four stationary
          points, which have coordinates <Katex tex="(1,2)" />, <Katex tex="(2,0)" />,{' '}
          <Katex tex="(3,3)" /> and <Katex tex="(4,1)" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <GraphImg alt={GRAPH_ALT} />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              There is no rule for <Katex tex="f" /> anywhere in this question, and none is needed.
              Everything comes from six points: the endpoints <Katex tex="(0,-1)" /> and{' '}
              <Katex tex="(5,4)" />, and the four stationary points. Between consecutive key points
              the graph is strictly increasing or strictly decreasing.
            </p>
            <p>
              Each part uses that list in a different way: counting crossings of a horizontal line
              (b.), moving the points (c.), restricting to a piece where <Katex tex="f" /> is
              one-to-one (d., e.), and the chain rule, which only needs to know where{' '}
              <Katex tex="f'=0" /> (f.).
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Stationary Points"
        marks={1}
        statement={<>State the values of <Katex tex="x" /> for which <Katex tex="f'(x)=0" />.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Number of Solutions"
        marks={1}
        statement={
          <>
            Find all real values of <Katex tex="k" /> for which <Katex tex="f(x)=k" /> has exactly
            two solutions for <Katex tex="x" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_BI} />
        <WrongMethod
          title="Use the heights of all the turning points"
          working={<Katex display tex="k = 0,\ 1,\ 2,\ 3" />}
        >
          At <Katex tex="k=1" /> the line touches the minimum at <Katex tex="(4,1)" /> but also crosses
          the graph three more times on the left, and at <Katex tex="k=2" /> it touches the peak at{' '}
          <Katex tex="(1,2)" /> and crosses three more times on the right: four solutions each. Count
          every crossing along the whole line, not just the touching point.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Number of Solutions"
        marks={1}
        statement={
          <>
            Find all real values of <Katex tex="k" /> for which <Katex tex="f(x)=k" /> has exactly
            three solutions for <Katex tex="x" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Reflection"
        marks={1}
        statement={
          <>
            When the graph of <Katex tex="y=f(x)" /> is reflected in the <Katex tex="x" />-axis, its
            image has two local maximum turning points.
            <br />
            State the coordinates of these two turning points.
          </>
        }
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Transformations"
        marks={1}
        statement={
          <>
            The function <Katex tex="f" /> has the property that when its graph is reflected in the{' '}
            <Katex tex="x" />-axis and then reflected in the <Katex tex="y" />-axis, its image can be
            expressed in the form <Katex tex="y=f(x+b)+c" />, for some <Katex tex="b,c\in R" />.
            <br />
            Find the values of <Katex tex="b" /> and <Katex tex="c" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          The graph of <Katex tex="y=f(x)" /> is shown again below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <GraphImg alt={GRAPH_ALT} />
        </div>
        <p>
          Let <Katex tex="h_1" /> be the inverse function of <Katex tex="f" /> when{' '}
          <Katex tex="f" /> is restricted to have domain <Katex tex="[1,2]" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Inverse Function"
        marks={1}
        statement={<>State the domain of <Katex tex="h_1" />.</>}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Inverse Function"
        marks={1}
        statement={<>Find <Katex tex="h_1(2)" />.</>}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">e.</p>
        <p>
          Let <Katex tex="h_m" /> be the inverse function of <Katex tex="f" /> when <Katex tex="f" />{' '}
          is restricted to have domain <Katex tex="[m,m+1]" /> for particular values of{' '}
          <Katex tex="m\in[0,4]" />.
        </p>
      </div>

      <PartCard
        letter="e.i"
        topic="Inverse Existence"
        marks={1}
        statement={
          <>
            Explain why <Katex tex="m" /> must be an integer for the inverse function{' '}
            <Katex tex="h_m" /> to exist.
          </>
        }
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Inverse Function"
        marks={1}
        statement={<>Find the value(s) of <Katex tex="m" /> such that <Katex tex="h_m(1)" /> is an integer.</>}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">f.</p>
        <p>
          Let <Katex tex="g:(-0.8,1.8)\to R,\ g(x)=x^3-x^2-x+3" />.
        </p>
      </div>

      <PartCard
        letter="f.i"
        topic="Composite Function"
        marks={2}
        statement={
          <>
            Find the range of <Katex tex="g" /> and, hence, show that <Katex tex="f\big(g(x)\big)" />{' '}
            is defined for all <Katex tex="x\in(-0.8,1.8)" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Composite Minimum"
        marks={2}
        statement={
          <>
            Find the minimum value of <Katex tex="f\big(g(x)\big)" /> and the value of{' '}
            <Katex tex="x" /> for which the minimum occurs.
          </>
        }
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>

      <PartCard
        letter="f.iii"
        topic="Chain Rule"
        marks={4}
        statement={
          <>
            Find the <Katex tex="x" />-values of the stationary points of{' '}
            <Katex tex="f\big(g(x)\big)" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_FIII} />
      </PartCard>
    </div>
  )
}
