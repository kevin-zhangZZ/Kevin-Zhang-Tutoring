// 2023 Mathematical Methods — Exam 1 Question 7 (7 marks). A restricted parabola and its
// inverse: range, sketch, rule and domain, and the area the two curves cut off with y = −x.
// Question text transcribed from the original paper; the stem figure is a crop of VCAA's own
// artwork (300 dpi), and the part b. answer is an SVG overlay on that crop (never a redrawing
// of it). Calibration measured from the crop's own gridlines: origin at (380, 748), 186.5 px
// per unit across and 185.5 px per unit up; checked with a PIL composite — the calibrated
// f(x) = x² − 2x lies exactly on VCAA's printed curve. The part d. region figure is this
// site's own explanatory graph. Answers checked with sympy and against the VCAA
// examination report. Solution is original.
// Widgets: part c — interactives/meth-2023e1-q7c-which-root (slide a point along f; its mirror
// image always lands on the − root, and a toggle shows the + root is the mirror of the half of
// the parabola f's domain removed); part d — interactives/meth-2023e1-q7d-twin-strips (each
// vertical strip of one region reflects to an equal horizontal strip of the other, with a toggle
// showing the report's ∫₋₁¹(f − f⁻¹)dx error, a signed value between f and f⁻¹, not the area).
// Both re-audited 9 Oct 2026 for the Concise/Detailed split: kept; report commentary,
// alternatives and checks moved from row reasons into `more`. Final review 9 Oct: the part d.
// alternative now describes the report's actual other approach (curve to x-axis combined with
// line to x-axis) rather than crediting the report with a direct ∫₋₁⁰ method.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { functionToPath } from '../graphUtils'
import graphSrc from './meth-2023e1-q7-graph.png'
import regionSrc from './meth-2023e1-q7d-region.png'

const WhichRootWidget = lazyWidget(() => import('../interactives/meth-2023e1-q7c-which-root'))
const TwinStripsWidget = lazyWidget(() => import('../interactives/meth-2023e1-q7d-twin-strips'))

const OX = 380
const OY = 748
const SX = 186.5
const SY = 185.5
const toX = (x: number) => OX + x * SX
const toY = (y: number) => OY - y * SY
const fInv = (x: number) => 1 - Math.sqrt(x + 1)
const ORANGE = '#f97316'
const LABEL = { fontSize: 44, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const

// Part b.: y = f⁻¹(x) drawn on VCAA's own axes, which already carry y = f(x).
function InverseOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[380px]">
        <img loading="lazy" decoding="async" src={graphSrc} alt="VCAA's axes with y = f(x), and the answer y = f⁻¹(x) = 1 − √(x + 1) drawn over them: starting at the closed endpoint (−1, 1), falling through (0, 0) and flattening out to the right, the mirror image of f in the line y = x" className="w-full block" />
        <svg viewBox="0 0 1089 1113" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={functionToPath(fInv, -1, 3.55, toX, toY, 600)} fill="none" stroke={ORANGE} strokeWidth={6} />
          <circle cx={toX(-1)} cy={toY(1)} r={11} fill={ORANGE} />
          <circle cx={toX(0)} cy={toY(0)} r={11} fill={ORANGE} />
          <text x={toX(-1) - 14} y={toY(1) - 18} textAnchor="end" {...LABEL}>(−1, 1)</text>
          <text x={toX(0) + 18} y={toY(0) - 20} {...LABEL}>(0, 0)</text>
          <text x={toX(1.75)} y={toY(-1.45)} {...LABEL}>y = f⁻¹(x)</text>
        </svg>
      </div>
    </div>
  )
}

const EXAM_A: SAExaminerStats = {
  marks: [10, 90],
  average: 0.9,
  comment: (
    <>
      This question was largely well answered. The most common errors involved stating the
      correct range values with incorrect brackets or swapping the interval values, as in{' '}
      <Katex tex="(\infty,-1]" />. Students are reminded that mathematical notation is a
      precise language.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [33, 20, 47],
  average: 1.1,
  comment: (
    <>
      This question was generally well answered. Many students were able to sketch the graph
      with accuracy and give points, as required, correctly labelled. Most students knew the
      graph of the inverse function, <Katex tex="f^{-1}" />, was a reflection of{' '}
      <Katex tex="f" /> in the line <Katex tex="y=x" />. Students are reminded that the grid
      should serve as a guide to ensure the graph is correctly presented.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [26, 54, 21],
  average: 1.0,
  comment: (
    <>
      This question was generally handled well. Students frequently wrote responses correctly
      signposting the need to interchange <Katex tex="x" /> and <Katex tex="y" />, however,
      some students did not know how to proceed and solve for <Katex tex="y" /> once they had
      obtained <Katex tex="x=y^2-2y" />. Most students recognised the domain of the inverse
      function as the range of the original and were thus able to give this component of their
      answer correctly, independent of their work in obtaining the equation of the inverse
      function. The most common error was writing the function as{' '}
      <Katex tex="f^{-1}(x)=1+\sqrt{x+1}" />, the positive arm of the inverse. Students are
      reminded to use their graph drawn in part 7b. to assist. Students need to also use
      correct notation to denote the inverse function <Katex tex="f^{-1}(x)" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [71, 10, 19],
  average: 0.5,
  comment: (
    <>
      There were many ways to approach this question; however, in each case students needed to
      identify that there were two identical areas that needed to be calculated. Other
      approaches included making use of a modulus function or finding the area bounded by one
      of the curves, either <Katex tex="f^{-1}(x)" /> or <Katex tex="f(x)" />, and the{' '}
      <Katex tex="x" />-axis, and using this area with the area bounded by the line{' '}
      <Katex tex="y=-x" /> and the <Katex tex="x" />-axis. Using symmetry eliminated the need
      to evaluate an additional integration calculation, however, many students did not utilise
      this property. Most common errors arose from the signs of the terms: students intended to
      subtract <Katex tex="\left(x^2-2x\right)" /> from <Katex tex="-x" />; however, without
      appropriately using brackets they obtained <Katex tex="-x^2-3x" /> rather than{' '}
      <Katex tex="-x^2+x" />, and then proceeded to carry this error through subsequent
      calculations. Other errors involved finding{' '}
      <Katex tex="\int_{-1}^{1}\left(f(x)-f^{-1}(x)\right)dx" />, disregarding the mention
      of <Katex tex="y=-x" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2-2x = (x-1)^2-1" />,
    reason: <>Completing the square shows the vertex (turning point) is at <Katex tex="(1,-1)" />.</>,
  },
  {
    working: <Katex display tex="f(1) = -1, \qquad f(x)\to\infty \ \text{ as } \ x\to-\infty" />,
    reason: <>The domain <Katex tex="(-\infty,1]" /> stops exactly at the vertex, so the graph is the left half of the parabola, as in the figure: its lowest point is the endpoint <Katex tex="(1,-1)" />, and going left it rises without bound.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{range} = [-1,\,\infty)}" />,
    reason: <>Square bracket at <Katex tex="-1" /> because <Katex tex="x=1" /> is in the domain, so <Katex tex="-1" /> is reached; round bracket at <Katex tex="\infty" /> always. The smaller end goes first.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Reflect } y=f(x) \text{ in the line } y=x" />,
    reason: <>The inverse swaps every point <Katex tex="(a,b)" /> of <Katex tex="f" /> to <Katex tex="(b,a)" />, and on a graph that swap is a reflection in the line <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="(1,-1) \mapsto (-1,\,1)" />,
    reason: <>The endpoint of <Katex tex="f" /> becomes the endpoint of <Katex tex="f^{-1}" />, and it stays closed (a filled dot), because <Katex tex="x=1" /> is in the domain of <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="(0,0) \mapsto (0,\,0)" />,
    reason: <>The origin is on <Katex tex="y=x" />, so the reflection leaves it where it is. It is the only axial intercept of either curve: <Katex tex="f(x)=0" /> gives <Katex tex="x=0" /> or <Katex tex="x=2" />, but <Katex tex="2" /> is outside the domain of <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="(-1,3) \mapsto (3,\,-1)" />,
    reason: <>A third point to guide the shape: the grid shows <Katex tex="f" /> passing through <Katex tex="(-1,3)" />, so <Katex tex="f^{-1}" /> passes through <Katex tex="(3,-1)" />. After <Katex tex="(0,0)" /> the curve keeps falling but flattens out.</>,
  },
  {
    working: <InverseOverlay />,
    reason: <>Drawn on the printed axes, as the question asks, using the grid as a guide so the curve is a true mirror image of <Katex tex="f" /> in <Katex tex="y=x" />.</>,
    more: <>The report&apos;s general comments make the same point: graphs of inverse functions need to be symmetric about the line <Katex tex="y=x" />, and students are encouraged to use the grid provided to get this right.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Let } y = (x-1)^2-1" />,
    reason: <>Use the turning-point form from part a. In it, <Katex tex="x" /> appears only once (inside the square), so after <Katex tex="x" /> and <Katex tex="y" /> are swapped, <Katex tex="y" /> appears only once and can be made the subject.</>,
    more: <>The report notes that some students got stuck after writing <Katex tex="x=y^2-2y" />. There <Katex tex="y" /> appears twice, so it can&apos;t simply be rearranged: first complete the square, <Katex tex="x=(y-1)^2-1" />, or use the quadratic formula on <Katex tex="y^2-2y-x=0" />. Both lead to the same two roots below.</>,
  },
  {
    working: <Katex display tex="\text{Swap } x \leftrightarrow y: \quad x = (y-1)^2-1" />,
    reason: <>The inverse swaps the roles of <Katex tex="x" /> and <Katex tex="y" /> (part b.), so swap them and solve for <Katex tex="y" />. Writing &ldquo;swap&rdquo; shows the marker your method.</>,
  },
  {
    working: <Katex display tex="(y-1)^2 = x+1 \implies y-1 = \pm\sqrt{x+1}" />,
    reason: <>Add 1 to both sides, then take the square root of both sides. A square root gives two possibilities, <Katex tex="+" /> and <Katex tex="-" />; only one of them is <Katex tex="f^{-1}" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \text{range of } f^{-1} &= \text{domain of } f = (-\infty,1] \\ \implies y \le 1 &\implies y-1 = -\sqrt{x+1} \end{aligned}"
      />
    ),
    reason: <>The <Katex tex="y" />-values of <Katex tex="f^{-1}" /> are the <Katex tex="x" />-values of <Katex tex="f" />, so <Katex tex="y\le1" /> and <Katex tex="y-1" /> can&apos;t be positive: take the <em>negative</em> root.</>,
    more: (
      <>
        <p>Choosing <Katex tex="1+\sqrt{x+1}" /> was the report&apos;s most common error, and it reminds students to use their part b. graph. That sketch rules it out: <Katex tex="f^{-1}" /> falls from <Katex tex="(-1,1)" /> through <Katex tex="(0,0)" />, while <Katex tex="1+\sqrt{x+1}" /> rises from <Katex tex="(-1,1)" /> and is never below 1.</p>
        <p>Why does the algebra produce a wrong root at all? The equation <Katex tex="x=(y-1)^2-1" /> knows nothing about f&apos;s domain: it is the reflection of the <em>whole</em> parabola, both halves. The diagram below shows which half each root comes from.</p>
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = 1-\sqrt{x+1}, \quad \text{domain } [-1,\infty)}" />,
    reason: <>The domain of <Katex tex="f^{-1}" /> is the range of <Katex tex="f" /> from part a. Write the rule as <Katex tex="f^{-1}(x)=\dots" />, naming the inverse function.</>,
    more: <>The report reminds students to use this notation for the inverse function. Check with a point from part b.: <Katex tex="f^{-1}(3)=1-2=-1" />, and <Katex tex="f(-1)=1+2=3" /> ✓.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} -x &= x^2-2x \\ x^2-x &= 0 \\ x(x-1) &= 0 \\ x &= 0 \ \text{ or } \ x = 1 \end{aligned}" />,
    reason: <>Equate the line and <Katex tex="f" /> to find where they meet: the points <Katex tex="(0,0)" /> and <Katex tex="(1,-1)" />. Both <Katex tex="x" />-values are in the domain of <Katex tex="f" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={regionSrc}
          alt="The line y = −x cutting a lens-shaped region off the parabola between (0, 0) and (1, −1) and a congruent region off the inverse between (−1, 1) and (0, 0), both shaded"
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: <>Sketch the three curves on part b.&apos;s axes: there are two regions, one between the line and <Katex tex="f" />, one between the line and <Katex tex="f^{-1}" />. The line <Katex tex="y=-x" /> closes off both, so it must appear in the integral.</>,
    more: <>Integrating <Katex tex="f-f^{-1}" /> from <Katex tex="-1" /> to <Katex tex="1" />, an error the report mentions, leaves the line out altogether. It measures between <Katex tex="f" /> and <Katex tex="f^{-1}" />, and on <Katex tex="(0,1)" />, where <Katex tex="f^{-1}" /> is above <Katex tex="f" />, it counts that gap as negative, so it isn&apos;t the area of any region: it gives <Katex tex="\tfrac{4\sqrt2-4}{3}\approx0.55" />, not <Katex tex="\tfrac13" />.</>,
  },
  {
    working: <Katex display tex="(a,-a) \mapsto (-a,\,a): \ y=-x \text{ reflects onto itself}" />,
    reason: <>Swapping the coordinates of a point on <Katex tex="y=-x" /> gives another point on <Katex tex="y=-x" />. So reflecting in <Katex tex="y=x" /> takes <Katex tex="f" /> to <Katex tex="f^{-1}" /> and the line to itself: the two regions are mirror images, with the same area. One integral, doubled.</>,
    more: <>Without symmetry, the region cut off <Katex tex="f^{-1}" />, between <Katex tex="(-1,1)" /> and <Katex tex="(0,0)" />, needs its own integral. One of the report&apos;s other approaches combines a curve-to-<Katex tex="x" />-axis area with the line-to-<Katex tex="x" />-axis area: on <Katex tex="[-1,0]" /> the triangle under <Katex tex="y=-x" /> has area <Katex tex="\tfrac12" />, the area under <Katex tex="f^{-1}" /> is <Katex tex="\int_{-1}^{0}\left(1-\sqrt{x+1}\right)dx" /> <Katex tex="=\left[x-\tfrac23(x+1)^{3/2}\right]_{-1}^{0}=\tfrac13" />, and <Katex tex="\tfrac12-\tfrac13=\tfrac16" />, the same as the region cut off <Katex tex="f" />. It is correct but takes longer; the report notes that using symmetry removes this extra integral, yet many students did not use it.</>,
  },
  {
    working: <Katex display tex="A = 2\int_0^1\Bigl(-x-\left(x^2-2x\right)\Bigr)dx" />,
    reason: <>Upper curve minus lower: on <Katex tex="(0,1)" /> the line is above the parabola (at <Katex tex="x=\tfrac12" />, <Katex tex="-\tfrac12 > -\tfrac34" />). Keep the bracket round <Katex tex="x^2-2x" /> so the minus sign reaches both terms.</>,
    more: <>The report says the most common errors arose from these signs: without the bracket students obtained <Katex tex="-x^2-3x" /> rather than <Katex tex="-x^2+x" />, and carried that error through the rest of their working.</>,
  },
  {
    working: <Katex display tex="= 2\int_0^1\left(x-x^2\right)dx" />,
    reason: <>Expand the bracket: <Katex tex="-x-x^2+2x=x-x^2" />.</>,
  },
  {
    working: <Katex display tex="= 2\left[\frac{x^2}{2}-\frac{x^3}{3}\right]_0^1 = 2\left(\frac12-\frac13\right)" />,
    reason: <>Antidifferentiate, then substitute <Katex tex="x=1" /> and <Katex tex="x=0" /> (the lower limit gives 0).</>,
  },
  {
    working: <Katex display tex="\boxed{A = 2\times\frac16 = \frac13 \ \text{square units}}" />,
    reason: <>Each region is <Katex tex="\tfrac16" />, and there are two.</>,
    more: <>Sanity check: the region below the line fits inside the triangle with corners <Katex tex="(0,0)" />, <Katex tex="(0,-1)" /> and <Katex tex="(1,-1)" />, of area <Katex tex="\tfrac12" />, so <Katex tex="\tfrac16" /> each is reasonable.</>,
  },
]

export default function MethodsQ7_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (7 marks)</p>
        <p>
          Consider <Katex tex="f:(-\infty,1]\to R" />,{' '}
          <Katex tex="f(x)=x^2-2x" />. Part of the graph of <Katex tex="y=f(x)" /> is shown
          below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="The left half of a parabola on a grid, falling from above y = 3 near x = −1 through the origin to a closed endpoint at (1, −1) — from the original 2023 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Everything in this question comes out of one picture: <Katex tex="f" /> and{' '}
              <Katex tex="f^{-1}" /> are mirror images in <Katex tex="y=x" />. That swaps the
              domain and range (part a. feeds part c.), and it fixes which square root to keep in
              part c. In part d. the line <Katex tex="y=-x" />, perpendicular to{' '}
              <Katex tex="y=x" />, is its own mirror image, so it cuts matching pieces off the two
              curves and only one integral is needed.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Range"
        marks={1}
        statement={<>State the range of <Katex tex="f" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Inverse"
        marks={2}
        statement={
          <>
            Sketch the graph of the inverse function <Katex tex="y=f^{-1}(x)" /> on the axes
            above. Label any endpoints and axial intercepts with their coordinates.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Inverse Function"
        marks={2}
        statement={
          <>
            Determine the equation and the domain for the inverse function{' '}
            <Katex tex="f^{-1}" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Only the minus root is f reflected in y = x — the plus root reflects the half of the parabola that f's domain removed">
          <WhichRootWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="d"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Calculate the area of the regions enclosed by the curves of <Katex tex="f" />,{' '}
            <Katex tex="f^{-1}" /> and <Katex tex="y=-x" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="y = −x is its own mirror image, so every strip of one region has an equal twin in the other">
          <TwinStripsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
