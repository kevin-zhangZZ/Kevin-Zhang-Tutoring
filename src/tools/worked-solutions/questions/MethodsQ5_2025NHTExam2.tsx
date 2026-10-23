// 2025 Mathematical Methods NHT — Exam 2, Section B Question 5 (14 marks). The NHT report gives
// sample answers only, with no statistics. A vegetable garden against a wall with 12 m of timber:
// a rectangle (area 12w − 2w², maximum 18), then a rectangle under the boundary
// g(x) = 3 log_e(x) / 2 log_e(12 − x) (continuity gives k = 4, A(w) = w(12 − e^(w/2) − e^(w/3)),
// its maximum and whether it needs under 12 m of timber), and finally a pentagon with apex
// (4, g(4)) maximised subject to the 12 m timber limit. Question text transcribed from the original
// paper (the 2025 NHT paper has no text layer, so it was read from rendered pages); the three
// figures are cropped from the original VCAA exam PDF (300 dpi). Answers checked with sympy/scipy
// and against the VCAA report's sample answers: a.ii. 18; b.i. 4; b.iii. w = 2.49, A = 15.52;
// b.iv. yes, 11.21 m; c. 19.88. In c. the report solves the timber condition as
// 2.63831… ≤ w ≤ 4.60057…; the upper value lies outside the possible widths (w < 3 log_e(4) ≈ 4.159,
// where the formulas stop describing a pentagon), so the feasible widths are 2.638… ≤ w < 4.159…;
// the answer is unaffected and the working says so. The WrongMethod in c. is a verified slip, not
// taken from the report, which has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import gardenSrc from './meth-2025nhte2-q5a-garden.png'
import rectSrc from './meth-2025nhte2-q5b-graph.png'
import pentSrc from './meth-2025nhte2-q5c-graph.png'

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="2w + l = 12 \implies l = 12-2w" />,
    reason: <>The wall forms one length, so the timber covers the other length and both widths.</>,
  },
  {
    working: <Katex display tex="\text{Area} = l\times w = (12-2w)\,w = 12w-2w^2" />,
    reason: <>Area of a rectangle, with <Katex tex="l" /> written in terms of <Katex tex="w" />. As required.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dA}{dw} = 12-4w = 0 \implies w = 3" />,
    reason: <>The area is a downward parabola in <Katex tex="w" />, so its maximum is at the stationary point.</>,
    more: <>Or complete the square: <Katex tex="A=-2(w-3)^2+18" />, so the maximum is 18 at <Katex tex="w=3" />. The possible widths are <Katex tex="0<w<6" />, and the area tends to 0 at both ends, so the interior maximum really is the largest.</>,
  },
  {
    working: <Katex display tex="A = 12(3)-2(3)^2 = 36-18 = \boxed{18 \text{ m}^2}" />,
    reason: <>The garden is 6 m long and 3 m wide: the side parallel to the wall is twice each width.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="3\log_e(k) = 2\log_e(12-k)" />,
    reason: <>For <Katex tex="g" /> to be continuous, the two pieces must meet at <Katex tex="x=k" />: the left rule's value there equals the right rule's limit.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \log_e\!\left(k^3\right) = \log_e\!\left((12-k)^2\right) \\ k^3 = (12-k)^2 \end{gathered}" />,
    reason: <>Log law <Katex tex="n\log_e(x)=\log_e(x^n)" />, then <Katex tex="\log_e" /> is one-to-one, so the insides are equal.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} k^3-k^2+24k-144=0 \\ (k-4)\left(k^2+3k+36\right)=0 \end{gathered}" />,
    reason: <>Expand <Katex tex="(12-k)^2=144-24k+k^2" />; <Katex tex="k=4" /> is a root (<Katex tex="64-16+96-144=0" />), and the quadratic factor has discriminant <Katex tex="9-144<0" />, so no more.</>,
    more: <>On CAS: <Cas fn="solve">solve(3·ln(k) = 2·ln(12 − k), k)</Cas></>,
  },
  {
    working: <Katex display tex="\boxed{k=4}" />,
    reason: <>Matches the graph, whose corner <Katex tex="(k,g(k))" /> is drawn above <Katex tex="x=4" />. Both pieces give <Katex tex="g(4)=3\log_e(4)=2\log_e(8)\approx4.16" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="3\log_e(x) = w \implies x = e^{\frac w3}" />,
    reason: <>The top-left corner is at height <Katex tex="w" /> on the left piece of <Katex tex="g" />. Solve for its <Katex tex="x" />-coordinate by taking exponentials.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} 2\log_e(12-x) = w \implies 12-x = e^{\frac w2} \\ x = 12-e^{\frac w2} \end{gathered}" />,
    reason: <>The top-right corner is at the same height on the right piece.</>,
  },
  {
    working: <Katex display tex="l = \left(12-e^{\frac w2}\right) - e^{\frac w3} = 12-e^{\frac w2}-e^{\frac w3}" />,
    reason: <>The length is the horizontal distance between the two corners: right <Katex tex="x" /> minus left <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="A(w) = w\times l = w\left(12-e^{\frac w2}-e^{\frac w3}\right)" />,
    reason: <>Width times length. As required.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="A'(w) = 12-e^{\frac w2}-e^{\frac w3} - w\left(\tfrac12e^{\frac w2}+\tfrac13e^{\frac w3}\right)" />,
    reason: <>Product rule on <Katex tex="w\times l(w)" />. Setting this to 0 has no algebraic solution, so solve numerically.</>,
  },
  {
    working: <Cas fn="nSolve">nSolve(A′(w) = 0, w) | 0 &lt; w &lt; 3·ln(4)</Cas>,
    reason: <>The width can be at most the corner height <Katex tex="g(4)=3\log_e(4)\approx4.16" />.</>,
    more: <>Or <Cas fn="fMax">fMax(A(w), w, 0, 3·ln(4))</Cas> in one step.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} w = 2.4908\ldots \\ A(2.4908\ldots) = 15.5220\ldots \end{gathered}" />,
  },
  {
    working: <Katex display tex="\boxed{w = 2.49, \quad A_{\max} = 15.52 \text{ m}^2}" />,
    reason: <>Both correct to two decimal places. Less than part a.'s 18 m<sup>2</sup>, as it should be: the path boundary now limits the garden as well as the timber.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <Katex display tex="l = \frac{15.5220\ldots}{2.4908\ldots} = 6.2316\ldots" />,
    reason: <>The length of the maximum-area garden, from <Katex tex="A=wl" /> with the unrounded values from part b.iii. (Or directly <Katex tex="12-e^{w/2}-e^{w/3}" />.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{timber} &= 2w + l \\ &= 2(2.4908\ldots) + 6.2316\ldots \\ &= 11.213\ldots < 12 \end{aligned}" />,
    reason: <>Timber is needed for the two widths and the length; the wall is the fourth side.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{Yes: it needs only } 11.21 \text{ m} \\ \text{of timber, less than } 12 \text{ m}\end{gathered}}" />,
    reason: <>The justification is the timber calculation; a bare &ldquo;yes&rdquo; isn't enough.</>,
    more: <>It makes sense that there is timber to spare: here the path boundary, not the timber, is what stops the garden growing.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="l(w) = 12-e^{\frac w2}-e^{\frac w3}, \qquad g(4) = 3\log_e(4)" />,
    reason: <>The two vertical sides end at the same points as in part b., so the bottom part of the pentagon is the rectangle <Katex tex="w\times l" />, and the apex is at height <Katex tex="g(4)" />.</>,
  },
  {
    working: <Katex display tex="A_p(w) = wl + \tfrac12\,l\,\big(g(4)-w\big)" />,
    reason: <>Pentagon = rectangle + triangle on top. The triangle's base is the rectangle's top side, of length <Katex tex="l" />, and its height is from <Katex tex="y=w" /> up to the apex.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} T(w) = 2w &+ \sqrt{\left(4-e^{\frac w3}\right)^2+\big(g(4)-w\big)^2} \\ &+ \sqrt{\left(12-e^{\frac w2}-4\right)^2+\big(g(4)-w\big)^2} \end{aligned}"
      />
    ),
    reason: <>Timber: the two widths plus the two slanted sides, each found by the distance formula from a top corner, <Katex tex="\left(e^{w/3},w\right)" /> or <Katex tex="\left(12-e^{w/2},w\right)" />, to the apex <Katex tex="(4,g(4))" />.</>,
  },
  {
    working: <Cas fn="solve">solve(T(w) ≤ 12, w)</Cas>,
    reason: <>The pentagon must be built with 12 m of timber or less. This is the constraint that matters here, so find which widths satisfy it.</>,
  },
  {
    working: <Katex display tex="2.6383\ldots \le w < 3\log_e(4) \ (\approx4.159)" />,
    reason: <>Pentagons with short vertical sides need more than 12 m (their slanted sides are long); from <Katex tex="w=2.6383\ldots" /> upwards they need at most 12 m.</>,
    more: <>VCAA's sample answer gives <Katex tex="2.63831\ldots\le w\le4.60057\ldots" />. The upper value is beyond the largest possible width <Katex tex="3\log_e(4)\approx4.159" /> (the apex height), where the formulas no longer describe a pentagon, so it doesn't restrict anything and the answer is unaffected.</>,
  },
  {
    working: <Katex display tex="A_p \text{ is decreasing for } w \ge 2.6383\ldots" />,
    reason: <>Without the timber limit, <Katex tex="A_p" /> would peak at <Katex tex="w\approx1.38" />, which is not allowed. On the allowed widths, all to the right of that peak, the area only falls as <Katex tex="w" /> grows, so the maximum is at the smallest allowed width.</>,
    more: <>Check by evaluating: <Katex tex="A_p(2.64)\approx19.88" />, <Katex tex="A_p(3)\approx17.18" />, <Katex tex="A_p(3.5)\approx11.62" />.</>,
  },
  {
    working: <Katex display tex="A_p(2.6383\ldots) = 19.882\ldots" />,
    reason: <>Substitute the unrounded boundary width.</>,
  },
  {
    working: <Katex display tex="\boxed{19.88 \text{ m}^2}" />,
    reason: <>Correct to two decimal places. More than part b.'s rectangle (15.52 m<sup>2</sup>), because the triangle fills space under the path that the rectangle wasted, while still using exactly 12 m of timber.</>,
  },
]

export default function MethodsQ5_2025NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (14 marks)</p>
        <p>
          David is planning to build a vegetable garden in his backyard, using an existing wall for one
          side and up to 12 metres of timber for the remaining sides. Assume that David&apos;s backyard is
          modelled by a flat plane.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Three gardens, each with a different limit. In a. only the timber limits the
              rectangle. In b. the path boundary limits it, and the timber turns out to be enough. In
              c. the shape changes to a pentagon, and now the timber is what stops it growing, so the
              maximum is at the edge of the allowed widths rather than at a stationary point.
            </p>
            <p>
              The key move in b. and c. is turning &ldquo;a corner on the curve at height{' '}
              <Katex tex="w" />&rdquo; into an <Katex tex="x" />-coordinate: solve{' '}
              <Katex tex="g(x)=w" /> on each piece.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">a.</p>
        <p>
          David considers building a rectangular vegetable garden as shown below, with length{' '}
          <Katex tex="l" /> metres and width <Katex tex="w" /> metres.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={gardenSrc}
            alt="A shaded rectangle against an existing wall, with dashed sides: length l parallel to the wall and two widths w perpendicular to it — from the original 2025 NHT VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="a.i"
        topic="Area Model"
        marks={1}
        statement={
          <>
            David uses 12 metres of timber for the remaining three sides.
            <br />
            Show that the area of the rectangular vegetable garden, in square metres, can be expressed as{' '}
            <Katex tex="12w-2w^2" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Maximum Area"
        marks={2}
        statement={
          <>
            Find the maximum possible area of the rectangular vegetable garden.
            <br />
            Give your answer in square metres.
          </>
        }
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          David realises that his new vegetable garden must fit within the boundary created by his garden
          path.
          <br />
          Let the existing wall be defined by the <Katex tex="x" />-axis and the boundary of the garden
          path be defined by the continuous function <Katex tex="g" /> below.
        </p>
        <Katex display tex="g(x)=\begin{cases} 3\log_e(x) & 1\le x\le k \\ 2\log_e(12-x) & k<x\le 11\end{cases}" />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={rectSrc}
            alt="The curve y = g(x) rising from (1, 0) to a corner labelled (k, g(k)) above x = 4 at a height a little over 4, then falling to (11, 0); a shaded rectangle stands on the x-axis with its top corners on the curve, each vertical side labelled w — from the original 2025 NHT VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
        <p>
          Both <Katex tex="x" /> and <Katex tex="y" /> have units of metres.
          <br />
          David considers a rectangular vegetable garden, with two corners on the existing wall and two
          corners on the boundary of the garden path. Let <Katex tex="w" /> metres be the width of the
          rectangular vegetable garden, perpendicular to the existing wall, and <Katex tex="A(w)" /> square
          metres be the area of the rectangular vegetable garden.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Continuity"
        marks={2}
        statement={<>Given that <Katex tex="g" /> is continuous, find the value of <Katex tex="k" />.</>}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Area Model"
        marks={2}
        statement={
          <>
            Show that <Katex tex="A(w)=w\left(12-e^{\frac w2}-e^{\frac w3}\right)" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Maximum Area"
        marks={2}
        statement={
          <>
            Hence, find the value of <Katex tex="w" /> that gives the maximum area of this rectangular
            vegetable garden, and state the maximum of <Katex tex="A(w)" />.
            <br />
            Give your answers correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="b.iv"
        topic="Interpreting a Model"
        marks={1}
        statement={
          <>
            Can David build the rectangular vegetable garden of maximum area, as described in{' '}
            <b>part b.iii</b>, with less than 12 metres of timber?
            <br />
            Justify your answer.
          </>
        }
      >
        <WorkingTable rows={ROWS_BIV} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Constrained Optimisation"
        marks={4}
        statement={
          <>
            Finally, David considers a pentagonal vegetable garden, using the existing wall for one side
            and his 12 metres of timber for the remaining four sides.
            <br />
            He requires two sides of equal length <Katex tex="w" /> metres from the existing wall to the
            garden path <Katex tex="y=g(x)" />.
            <br />
            Both of these sides are perpendicular to the existing wall. The remaining two sides will meet
            at the point <Katex tex="(k,g(k))" />.
            <br />
            The function <Katex tex="g" /> and the value <Katex tex="k" /> are those defined in{' '}
            <b>part b</b>.
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit my-3">
              <img
                loading="lazy"
                decoding="async"
                src={pentSrc}
                alt="The same curve y = g(x) with a shaded pentagon: two vertical sides of length w from the x-axis up to the curve, and two dashed slanted sides meeting at the corner (k, g(k)) — from the original 2025 NHT VCAA exam paper"
                className="w-full max-w-[560px]"
              />
            </div>
            Find the maximum possible area for this pentagonal vegetable garden that David can build with
            12 metres of timber or less.
            <br />
            Give your answer in square metres, correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Maximise the pentagon's area and forget the timber"
          working={<Katex display tex="A_p'(w)=0 \implies w\approx1.38,\ A_p\approx23.32" />}
        >
          That pentagon would need about 13.06 m of timber, more than David has. Whenever a question
          says &ldquo;with 12 metres or less&rdquo;, check the stationary point against the constraint; if
          it fails, the best allowed value is at the edge of the allowed region.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
