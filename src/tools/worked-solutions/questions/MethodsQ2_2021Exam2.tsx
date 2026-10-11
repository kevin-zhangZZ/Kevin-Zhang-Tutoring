// 2021 Mathematical Methods — Exam 2, Section B Question 2 (10 marks). Right-endpoint
// rectangles approximating an area, the exact integral, the same idea read off a printed
// graph, then an area between y = √x and y = ax² that has three solutions. Question text
// transcribed from the original paper; all three figures are crops of VCAA's own artwork.
// Answers checked with sympy/scipy and against the VCAA examination report. Solution is
// original.
// Interactive: part f has interactives/meth-2021e2-q2f-three-values (the strip [0, a] and the
// area A(a) crossing 1/3 three times, with a toggle for the one-integral error a = 1.46).
// Part d (16% full marks) has no widget: f is given only as a printed graph, and the one error
// the report names (adding magnitudes to get 18) is a sign convention the working addresses.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import rectSrc from './meth-2021e2-q2-rectangles.png'
import graphSrc from './meth-2021e2-q2d-graph.png'
import shadedSrc from './meth-2021e2-q2e-shaded.png'

const ThreeValuesWidget = lazyWidget(() => import('../interactives/meth-2021e2-q2f-three-values'))

const EXAM_A: SAExaminerStats = { marks: [4, 96], average: 1, comment: <>This question was done very well.</> }

const EXAM_B: SAExaminerStats = {
  marks: [40, 60],
  average: 0.6,
  comment: <>An exact answer was required. Some students rounded their answer to 0.47.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [14, 6, 80],
  average: 1.7,
  comment: (
    <>
      The definite integral was required to obtain full marks. Some students rounded their
      answer to 0.3.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [84, 16],
  average: 0.2,
  comment: <>A common incorrect answer was <Katex tex="6+2+4+6=18" />.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [12, 88],
  average: 0.9,
  comment: <>An exact answer was required.</>,
}

const EXAM_F: SAExaminerStats = {
  marks: [48, 42, 3, 5, 2],
  average: 0.7,
  comment: (
    <>
      Many students were able to find <Katex tex="a=0.77" /> or <Katex tex="a=1.13" /> but
      not both. Others found <Katex tex="x=a^{-\frac23}" /> but did not set up the definite
      integral properly.{' '}
      <Katex tex="\displaystyle\int_0^a\left(ax^2-\sqrt x\right)dx=\frac13" />,{' '}
      <Katex tex="a=1.46" /> was often seen.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} = \frac{1-0}{4}" />,
    reason: <>The four equal rectangles together cover <Katex tex="x=0" /> to <Katex tex="x=1" />, so divide that length by 4.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac14 = 0.25}" />,
    reason: <>Exact either way: no rounding is involved.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{right endpoints: } x = \tfrac14,\ \tfrac12,\ \tfrac34,\ 1" />,
    reason: <>The intervals are <Katex tex="[0,\tfrac14]" />, <Katex tex="[\tfrac14,\tfrac12]" />, <Katex tex="[\tfrac12,\tfrac34]" />, <Katex tex="[\tfrac34,1]" />; each rectangle&rsquo;s height is the curve&rsquo;s value at the right-hand end.</>,
  },
  {
    working: <Katex display tex="\text{heights: } \tfrac{1}{16},\ \tfrac14,\ \tfrac{9}{16},\ 1" />,
    reason: <>Square each endpoint, since <Katex tex="y=x^2" />.</>,
  },
  {
    working: <Katex display tex="A = \tfrac14\left(\tfrac{1}{16}+\tfrac{4}{16}+\tfrac{9}{16}+\tfrac{16}{16}\right) = \tfrac14\times\tfrac{30}{16}" />,
    reason: <>Each area is width &times; height. Take out the common width <Katex tex="\tfrac14" /> and add the heights over 16: <Katex tex="1+4+9+16=30" />.</>,
  },
  {
    working: <Katex display tex="= \boxed{\tfrac{15}{32}}" />,
    reason: <>Simplify <Katex tex="\tfrac{30}{64}" />. Leave it exact: the report says some students rounded to 0.47.</>,
    more: <>(<Katex tex="\tfrac{15}{32}" /> is exactly 0.46875.) This is more than the true area under the curve, because <Katex tex="y=x^2" /> is increasing on <Katex tex="[0,1]" />: the right edge is each rectangle&rsquo;s tallest point, so every rectangle pokes out above the curve (see the figure).</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_0^1 x^2\,dx" />,
    reason: <><Katex tex="y=x^2 \ge 0" /> on <Katex tex="[0,1]" />, so the area is this definite integral. Write it down: the report says it was required for full marks.</>,
  },
  {
    working: <Katex display tex="= \left[\frac{x^3}{3}\right]_0^1 = \frac13 - 0 = \boxed{\tfrac13}" />,
    reason: <>Power rule, then substitute the terminals. Leave it exact: some students rounded to 0.3.</>,
    more: <>Compare with part b: the four rectangles gave <Katex tex="\tfrac{15}{32}\approx0.469" />, an overestimate of about 40%. More, thinner rectangles would bring the total closer to <Katex tex="\tfrac13" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} = \frac{2-(-2)}{4} = 1" />,
    reason: <>Four equal rectangles across an interval of length 4.</>,
  },
  {
    working: <Katex display tex="\text{right endpoints: } x = -1,\ 0,\ 1,\ 2" />,
    reason: <>The intervals are <Katex tex="[-2,-1]" />, <Katex tex="[-1,0]" />, <Katex tex="[0,1]" />, <Katex tex="[1,2]" />; each height is <Katex tex="f" /> at the right-hand end.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f(-1) &= 6, & f(0) &= 2 \\ f(1) &= -4, & f(2) &= -6 \end{aligned}" />,
    reason: <>Read off the grid. The last two are negative: the graph is below the <Katex tex="x" />-axis there.</>,
    more: <>The graph crosses the <Katex tex="x" />-axis between <Katex tex="x=0" /> and <Katex tex="x=1" />.</>,
  },
  {
    working: <Katex display tex="\int_{-2}^{2} f(x)\,dx \approx 1\times\bigl(f(-1)+f(0)+f(1)+f(2)\bigr)" />,
    reason: <>Width &times; height for each rectangle. A definite integral gives <em>signed</em> area, so keep <Katex tex="f(1)=-4" /> and <Katex tex="f(2)=-6" /> negative.</>,
    more: <>&ldquo;Signed&rdquo; means a part below the <Katex tex="x" />-axis counts as negative in a definite integral.</>,
  },
  {
    working: <Katex display tex="= 6+2+(-4)+(-6) = \boxed{-2}" />,
    reason: <>Negative, because the rectangles below the axis (<Katex tex="4+6=10" />) outweigh those above it (<Katex tex="6+2=8" />). Adding sizes to get 18 finds area, not the integral.</>,
    more: <>The common incorrect answer <Katex tex="6+2+4+6=18" /> drops the signs, treating every rectangle as positive. That approximates the total <em>area</em> enclosed between the graph and the <Katex tex="x" />-axis on <Katex tex="[-2,2]" />, a different quantity from the signed integral asked for.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="y = \sqrt x \text{ and } y = x^2 \text{ meet at } x = 0 \text{ and } x = 1" />,
    reason: <>Set the curves equal and square both sides (both are non-negative for <Katex tex="x \ge 0" />): <Katex tex="x = x^4" />, so <Katex tex="x(x^3-1)=0" />, giving <Katex tex="x=0" /> or <Katex tex="x=1" />.</>,
  },
  {
    working: <Katex display tex="\sqrt x \ge x^2 \ \text{ on } [0,1]" />,
    reason: <>Test a point in between: at <Katex tex="x=\tfrac14" />, <Katex tex="\sqrt x=\tfrac12" /> but <Katex tex="x^2=\tfrac1{16}" />. The upper curve goes first (top minus bottom).</>,
  },
  {
    working: <Katex display tex="A = \int_0^1\left(\sqrt x-x^2\right)dx = \left[\tfrac23x^{3/2}-\tfrac13x^3\right]_0^1" />,
    reason: <>Write <Katex tex="\sqrt x" /> as <Katex tex="x^{1/2}" />; the power rule gives <Katex tex="\tfrac{x^{3/2}}{3/2}=\tfrac23x^{3/2}" />.</>,
  },
  {
    working: <Katex display tex="= \tfrac23-\tfrac13 = \boxed{\tfrac13}" />,
    reason: <>Exact, as required.</>,
    more: <>Neatly, this equals part c: the unit square splits into three regions of area <Katex tex="\tfrac13" /> &mdash; under <Katex tex="y=x^2" />, between the curves, and above <Katex tex="y=\sqrt x" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="ax^2 = \sqrt x \implies a^2x^4 = x \implies x\left(a^2x^3-1\right) = 0" />,
    reason: <>First find where the curves meet. Both sides are non-negative (<Katex tex="a>0" />, <Katex tex="x \ge 0" />), so squaring is safe; then factorise.</>,
  },
  {
    working: <Katex display tex="x = 0 \ \text{ or } \ x^3 = a^{-2} \implies x = a^{-2/3}" />,
    reason: <>Call this meeting point <Katex tex="c=a^{-2/3}" />. If <Katex tex="c" /> lies inside the strip from <Katex tex="x=0" /> to <Katex tex="x=a" />, the curves swap over part-way across.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} c \ge a &\iff a^{-2/3} \ge a \\ &\iff 1 \ge a^{5/3} \\ &\iff a \le 1 \end{aligned}" />,
    reason: <>Multiply both sides by <Katex tex="a^{2/3}>0" />; then, since <Katex tex="a>0" />, <Katex tex="a^{5/3}\le 1" /> means <Katex tex="a\le1" />. So the curves cross inside the strip only when <Katex tex="a>1" />: two cases.</>,
  },
  {
    working: <Katex display tex="a \le 1: \ \int_0^a\left(\sqrt x-ax^2\right)dx = \tfrac13" />,
    reason: <>Case 1. Here <Katex tex="c \ge a" />, so <Katex tex="\sqrt x" /> stays above <Katex tex="ax^2" /> across all of <Katex tex="[0,a]" />: one region, top minus bottom.</>,
  },
  {
    working: <Katex display tex="\tfrac23a^{3/2}-\tfrac13a^4 = \tfrac13" />,
    reason: <>Antidifferentiate with the power rule (<Katex tex="a" /> is a constant): <Katex tex="\left[\tfrac23x^{3/2}-\tfrac{a}{3}x^3\right]_0^a" />.</>,
  },
  {
    working: <Cas fn="solve">solve(∫(√x − a·x², x, 0, a) = 1/3, a) | 0 &lt; a ≤ 1</Cas>,
    reason: <>Two solutions: <Katex tex="a=0.7702\ldots" /> and <Katex tex="a=1" /> exactly.</>,
    more: <>Check <Katex tex="a=1" />: <Katex tex="\tfrac23-\tfrac13=\tfrac13" />. At <Katex tex="a=1" /> the strip ends exactly where the curves cross (<Katex tex="c=1" />), so this is the region from part e again.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} a > 1: \ &\int_0^{c}\left(\sqrt x-ax^2\right)dx \\ &+\int_{c}^{a}\left(ax^2-\sqrt x\right)dx = \tfrac13 \end{aligned}" />,
    reason: <>Case 2. Now <Katex tex="c<a" />: <Katex tex="\sqrt x" /> is on top from 0 to <Katex tex="c" />, <Katex tex="ax^2" /> from <Katex tex="c" /> to <Katex tex="a" />. Split at <Katex tex="c" /> and add both pieces as positive areas.</>,
    more: <>The report says some students found <Katex tex="x=a^{-\frac23}" /> but did not set up the definite integral properly. A single integral <Katex tex="\int_0^a\left(ax^2-\sqrt x\right)dx" /> counts the left piece (where <Katex tex="\sqrt x" /> is on top) as negative; setting it equal to <Katex tex="\tfrac13" /> gives <Katex tex="a=1.46" />, which the report says was often seen.</>,
  },
  {
    working: <Cas fn="solve">solve(∫(√x − a·x², x, 0, a^(−2/3)) + ∫(a·x² − √x, x, a^(−2/3), a) = 1/3, a) | 1 &lt; a ≤ 2</Cas>,
    reason: <>The same command as before, with the two integrals from the line above and this case&rsquo;s restriction.</>,
  },
  {
    working: <Katex display tex="\implies a = 1.1320\ldots" />,
    reason: <>The only solution with <Katex tex="1 < a \le 2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 0.77, \ 1.00, \ 1.13}" />,
    reason: <>All three, to two decimal places (<Katex tex="a=1" /> is written 1.00).</>,
    more: <>The report notes that many students found 0.77 or 1.13 but not both: working through both cases is what finds all three. Slide <Katex tex="a" /> in the diagram below to watch the area pass through <Katex tex="\tfrac13" /> three times.</>,
  },
]

export default function MethodsQ2_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (10 marks)</p>
        <p>
          Four rectangles of equal width are drawn and used to approximate the area under the
          parabola <Katex tex="y=x^2" /> from <Katex tex="x=0" /> to <Katex tex="x=1" />.
          <br />
          The heights of the rectangles are the values of the graph of <Katex tex="y=x^2" /> at
          the right endpoint of each rectangle, as shown in the graph below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={rectSrc}
            alt="Four rectangles of increasing height under the parabola y = x² between x = 0 and x = 1, each touching the curve at its right edge — from the original 2021 VCAA exam paper"
            className="w-full max-w-[280px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Rectangle Width"
        marks={1}
        statement={<>State the width of each of the rectangles shown above.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Rectangle Area"
        marks={1}
        statement={<>Find the total area of the four rectangles shown above.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Area Under Curve"
        marks={2}
        statement={
          <>
            Find the area between the graph of <Katex tex="y=x^2" />, the <Katex tex="x" />
            -axis and the line <Katex tex="x=1" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Right Endpoint Rule"
        marks={1}
        statement={
          <div className="flex flex-col gap-3">
            <p>The graph of <Katex tex="f" /> is shown below.</p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={graphSrc}
                alt="The graph of f on a grid from x = −3 to 3: rising from about 1 at x = −3 to a maximum of 6 at x = −1, crossing the y-axis at 2, then falling through −4 at x = 1 and −6 at x = 2 to about −7 at x = 3 — from the original 2021 VCAA exam paper"
                className="w-full max-w-[400px]"
              />
            </div>
            <p>
              Approximate <Katex tex="\displaystyle\int_{-2}^{2}f(x)\,dx" /> using four
              rectangles of equal width and the right endpoint of each rectangle.
            </p>
          </div>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Parts of the graphs of <Katex tex="y=x^2" /> and <Katex tex="y=\sqrt x" /> are
          shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={shadedSrc}
            alt="The lens-shaped region between y = √x and y = x² from x = 0 to x = 1, shaded — from the original 2021 VCAA exam paper"
            className="w-full max-w-[280px]"
          />
        </div>
      </div>

      <PartCard
        letter="e"
        topic="Area Between Curves"
        marks={1}
        statement={<>Find the area of the shaded region.</>}
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Area Between Curves"
        marks={4}
        statement={
          <>
            The graph of <Katex tex="y=x^2" /> is transformed to the graph of{' '}
            <Katex tex="y=ax^2" />, where <Katex tex="a\in(0,2]" />.
            <br />
            Find the values of <Katex tex="a" /> such that the area defined by the region(s) bounded by the
            graphs of <Katex tex="y=ax^2" /> and <Katex tex="y=\sqrt x" /> and the lines{' '}
            <Katex tex="x=0" /> and <Katex tex="x=a" /> is equal to <Katex tex="\tfrac13" />.
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
        <Explore title={<>The area passes through <Katex tex="\tfrac13" /> three times</>}>
          <ThreeValuesWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
