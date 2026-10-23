// 2023 Mathematical Methods NHT — Exam 2, Section B Question 3 (11 marks). The NHT report gives
// sample answers only, with no statistics. The cubic f(x) = x³ − ax with turning points A and C:
// the shaded area between the curve and the x-axis, the rectangle ABCD on the turning points
// (its area for a = 4, why a > 0, the general area 8(a/3)²), the length of the diagonal AC, and
// the x-values where the tangent is perpendicular to AC. Question text transcribed from the
// original paper; both figures cropped from the original VCAA exam PDF. Answers checked with
// sympy and against the VCAA report's sample answers: a. a²/2; b. 128/9; c. turning points need
// a > 0; d. as required; e. 2√(3(4a³ + 9a))/9; f. x = ±√(6(2a² + 3))/(6√a). The WrongMethod in
// a. is a verified slip (it gives 0), not taken from the report, which has no comments.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import graphSrc from './meth-2023nhte2-q3-graph.png'
import rectSrc from './meth-2023nhte2-q3-rectangle.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \int_{-\sqrt a}^{0} f(x)\,dx - \int_{0}^{\sqrt a} f(x)\,dx" />,
    reason: <>The left region is above the <Katex tex="x" />-axis, so its integral is positive; the right region is below, so its integral is negative and must be subtracted to count as positive area. Split at the <Katex tex="x" />-intercept 0.</>,
  },
  {
    working: <Katex display tex="= 2\int_{-\sqrt a}^{0} \left(x^3 - ax\right)dx" />,
    reason: <><Katex tex="f(-x)=-f(x)" />: <Katex tex="f" /> is odd, so its graph has rotational symmetry about the origin and the two shaded regions are the same size.</>,
  },
  {
    working: <Katex display tex="= 2\left[\frac{x^4}{4} - \frac{ax^2}{2}\right]_{-\sqrt a}^{0}" />,
    reason: <>Antidifferentiate term by term.</>,
  },
  {
    working: <Katex display tex="= 2\left[0 - \left(\frac{a^2}{4} - \frac{a^2}{2}\right)\right] = 2 \times \frac{a^2}{4}" />,
    reason: <>At <Katex tex="x=-\sqrt a" />: <Katex tex="x^4=a^2" /> and <Katex tex="x^2=a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \frac{a^2}{2}}" />,
    reason: <>Positive for any <Katex tex="a>0" />, as an area must be.</>,
    more: <>Check with <Katex tex="a=1" />: each region is <Katex tex="\int_{-1}^0(x^3-x)\,dx=\tfrac14" />, total <Katex tex="\tfrac12" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="AB = 2\left(\frac{a}{3}\right)^{\frac32} - \left(-2\left(\frac{a}{3}\right)^{\frac32}\right) = 4\left(\frac{a}{3}\right)^{\frac32}" />,
    reason: <>The rectangle&apos;s height is the vertical distance from <Katex tex="A" /> down to the level of <Katex tex="C" />: the difference of their <Katex tex="y" />-coordinates.</>,
  },
  {
    working: <Katex display tex="BC = \sqrt{\frac{a}{3}} - \left(-\sqrt{\frac{a}{3}}\right) = 2\sqrt{\frac{a}{3}}" />,
    reason: <>The width is the horizontal distance between the <Katex tex="x" />-coordinates of <Katex tex="A" /> and <Katex tex="C" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{Area} &= 2\sqrt{\frac43} \times 4\left(\frac43\right)^{\frac32} \\ &= \frac{4}{\sqrt3} \times \frac{32}{3\sqrt3}\end{aligned}" />,
    reason: <><Katex tex="\left(\tfrac43\right)^{3/2}=\tfrac{4}{3}\sqrt{\tfrac43}=\tfrac{8}{3\sqrt3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \frac{128}{9}}" />,
    reason: <><Katex tex="\sqrt3\times\sqrt3=3" />, so the denominator is 9.</>,
    more: <>About 14.2: the rectangle is about 2.31 wide and 6.16 high. Part d.&apos;s formula gives the same: <Katex tex="8\left(\tfrac43\right)^2=\tfrac{128}{9}" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 3x^2 - a = 0 \implies x^2 = \frac{a}{3}" />,
    reason: <>The corners <Katex tex="A" /> and <Katex tex="C" /> are the turning points, where the gradient is zero.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{gathered}\text{Two turning points need} \\ \tfrac{a}{3} > 0, \text{ i.e. } a > 0. \\[4pt] a = 0: \ y = x^3 \text{ has one} \\ \text{stationary point, so area} = 0. \\[4pt] a < 0: \ \sqrt{\tfrac a3} \text{ is not real,} \\ \text{so there are no turning points.}\end{gathered}}"
      />
    ),
    reason: <>The rectangle is built on the two turning points, so they must exist and be different. That happens only when <Katex tex="x^2=\tfrac a3" /> has two distinct real solutions.</>,
    more: <>When <Katex tex="a=0" /> the two corners merge at the origin, a stationary point of inflection, and the &ldquo;rectangle&rdquo; collapses to a point. When <Katex tex="a<0" />, <Katex tex="f'(x)=3x^2+|a|>0" /> everywhere: the cubic is strictly increasing with no turning points at all.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = 2\sqrt{\frac{a}{3}} \times 4\left(\frac{a}{3}\right)^{\frac32}" />,
    reason: <>Width times height, from part b.</>,
  },
  {
    working: <Katex display tex="= 8\left(\frac{a}{3}\right)^{\frac12}\left(\frac{a}{3}\right)^{\frac32} = 8\left(\frac{a}{3}\right)^{\frac12+\frac32}" />,
    reason: <>Write the square root as a power <Katex tex="\tfrac12" />, then add the indices.</>,
  },
  {
    working: <Katex display tex="\boxed{= 8\left(\frac{a}{3}\right)^{2}}" />,
    reason: <><Katex tex="\tfrac12+\tfrac32=2" />. As required.</>,
    more: <>VCAA also writes this as <Katex tex="\tfrac{8a^2}{9}" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="AC = \sqrt{\left(2\sqrt{\frac{a}{3}}\right)^2 + \left(4\left(\frac{a}{3}\right)^{\frac32}\right)^2}" />,
    reason: <><Katex tex="AC" /> is the diagonal of the rectangle, so by Pythagoras it is the square root of width² plus height², both from part b.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\frac{4a}{3} + \frac{16a^3}{27}} = \sqrt{\frac{36a + 16a^3}{27}}" />,
    reason: <><Katex tex="\left(\tfrac a3\right)^{3/2}" /> squared is <Katex tex="\left(\tfrac a3\right)^3=\tfrac{a^3}{27}" />. Put both terms over 27.</>,
  },
  {
    working: <Katex display tex="= \frac{2\sqrt{4a^3 + 9a}}{3\sqrt3} = \frac{2\sqrt{3\left(4a^3+9a\right)}}{9}" />,
    reason: <>Take the 4 out of the root as 2, and <Katex tex="\sqrt{27}=3\sqrt3" />; then rationalise by multiplying top and bottom by <Katex tex="\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{AC = \frac{2\sqrt{3\left(4a^3+9a\right)}}{9}}" />,
    reason: <>Any equivalent form, such as <Katex tex="\sqrt{\tfrac{4a}{3}+\tfrac{16a^3}{27}}" />, is correct.</>,
    more: <>Check with <Katex tex="a=4" />: width 2.309…, height 6.158…, so <Katex tex="AC=\sqrt{5.333+37.926}\approx6.577" />, and the formula gives <Katex tex="\tfrac{2\sqrt{876}}{9}\approx6.577" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} m_{AC} &= \frac{y_C - y_A}{x_C - x_A} \\ &= \frac{-4\left(\frac{a}{3}\right)^{\frac32}}{2\left(\frac{a}{3}\right)^{\frac12}} \\ &= -\frac{2a}{3}\end{aligned}" />,
    reason: <>Gradient of <Katex tex="AC" />: rise over run from <Katex tex="A" /> to <Katex tex="C" />. The rise is minus the height and the run is the width, both from part b. Dividing the powers leaves <Katex tex="-2\left(\tfrac a3\right)^1" />.</>,
  },
  {
    working: <Katex display tex="m_{\perp} = -\frac{1}{m_{AC}} = \frac{3}{2a}" />,
    reason: <>Perpendicular lines have gradients whose product is <Katex tex="-1" />: take the negative reciprocal.</>,
  },
  {
    working: <Katex display tex="f'(x) = 3x^2 - a = \frac{3}{2a}" />,
    reason: <>The tangent at <Katex tex="x" /> has gradient <Katex tex="f'(x)" />, so set it equal to the perpendicular gradient.</>,
  },
  {
    working: <Katex display tex="x^2 = \frac{1}{3}\left(a + \frac{3}{2a}\right) = \frac{2a^2+3}{6a}" />,
    reason: <>Add <Katex tex="a" />, divide by 3 and combine over the common denominator <Katex tex="6a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \pm\sqrt{\frac{2a^2+3}{6a}} = \pm\frac{\sqrt{6\left(2a^2+3\right)}}{6\sqrt a}}" />,
    reason: <>Both signs are valid: <Katex tex="\tfrac{2a^2+3}{6a}>0" /> since <Katex tex="a>0" /> (part c.), and the graph has a matching point on each side by its symmetry about the origin.</>,
    more: <>VCAA writes the second form. Check with <Katex tex="a=3" />: <Katex tex="m_{AC}=-2" />, so the tangent needs gradient <Katex tex="\tfrac12" />; the formula gives <Katex tex="x^2=\tfrac{21}{18}=\tfrac76" />, and <Katex tex="3\times\tfrac76-3=\tfrac12" />.</>,
  },
]

export default function MethodsQ3_2023NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (11 marks)</p>
        <p>
          Consider the graph of <Katex tex="f(x)=x^3-ax" />, where <Katex tex="a" /> is a real
          number, with its turning points, <Katex tex="A" /> and <Katex tex="C" />, as shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="The cubic f with x-intercepts (−√a, 0), (0, 0) and (√a, 0), local maximum A(−√(a/3), 2(a/3)^(3/2)) and local minimum C(√(a/3), −2(a/3)^(3/2)); the region above the axis between −√a and 0 and the region below the axis between 0 and √a are shaded — from the original VCAA exam paper"
            className="w-full max-w-[500px]"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              <Katex tex="f(x)=x^3-ax" /> is an odd function: <Katex tex="f(-x)=-f(x)" />. Its graph
              looks the same after a half-turn about the origin, which is why the two shaded
              regions are equal and why <Katex tex="A" /> and <Katex tex="C" /> have opposite
              coordinates.
            </p>
            <p>
              The turning points are given on the graph, so parts b.–f. need no new calculus until
              f.: the rectangle&apos;s width and height are just differences of those coordinates.
              Keeping <Katex tex="\tfrac a3" /> together and using index laws keeps the algebra
              short.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Area Under Curve"
        marks={2}
        statement={
          <>
            Find, using calculus, an expression for the shaded area, in terms of <Katex tex="a" />,
            bounded by the function <Katex tex="f" /> and the horizontal axis on the graph above.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Integrate from −√a to √a in one go"
          working={<Katex display tex="\int_{-\sqrt a}^{\sqrt a}\left(x^3-ax\right)dx = \left[\tfrac{x^4}{4}-\tfrac{ax^2}{2}\right]_{-\sqrt a}^{\sqrt a} = 0" />}
        >
          A definite integral is a <em>signed</em> area: the region below the axis counts as negative
          and exactly cancels the region above. An area of 0 for a region that is visibly shaded is
          the signal. Split at the <Katex tex="x" />-intercept and subtract the part below the axis.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          The turning points of the graph of <Katex tex="f" /> are also the vertices of a rectangle{' '}
          <Katex tex="ABCD" />, as shown below.
          <br />
          The line segment <Katex tex="AC" /> is a diagonal of the rectangle.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={rectSrc}
            alt="The graph of f(x) = x³ − ax with a shaded rectangle ABCD: A is the local maximum (−√(a/3), 2(a/3)^(3/2)), C is the local minimum (√(a/3), −2(a/3)^(3/2)), D is directly above C and B directly below A — from the original VCAA exam paper"
            className="w-full max-w-[500px]"
          />
        </div>
      </div>

      <PartCard
        letter="b"
        topic="Rectangle Area"
        marks={2}
        statement={
          <>
            Calculate the area of the rectangle <Katex tex="ABCD" /> when <Katex tex="a=4" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Turning Points"
        marks={1}
        statement={
          <>
            Explain why the value of <Katex tex="a" /> must be greater than zero for the area of the
            rectangle <Katex tex="ABCD" /> to be positive.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Show That"
        marks={1}
        statement={
          <>
            Show that the area of rectangle <Katex tex="ABCD" /> can be written in the form{' '}
            <Katex tex="8\left(\dfrac{a}{3}\right)^2" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Distance"
        marks={2}
        statement={
          <>
            Find, in terms of <Katex tex="a" />, an expression for the length of <Katex tex="AC" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Perpendicular Tangents"
        marks={3}
        statement={
          <>
            Find the <Katex tex="x" />-values of the points on the graph of <Katex tex="f" /> in
            terms of <Katex tex="a" />, where the tangent to the graph of <Katex tex="f" /> is
            perpendicular to <Katex tex="AC" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
