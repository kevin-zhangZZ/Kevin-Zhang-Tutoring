// 2018 Specialist Mathematics — Exam 2, Section B, Question 1 (11 marks). The composite
// f(x) = 2arcsin(x²−1): its maximal domain and range, its graph, and a derivative that
// splits either side of x = 0. Question text transcribed from the original paper. VCAA
// supplied blank axes for parts b. and e.iii. (−4.5 to 4.5 on both axes, gridlines every 0.5),
// so both curves are this site's own answer-sketches (matplotlib), drawn to VCAA's printed
// grid and living in the solution
// rather than the stem (guide §7). Answers checked in sympy (f′(±1/2) = ±8√7/7 from both the
// chain rule and the A/√(2−x²) forms; one-sided derivative limits ±2√2 at x = 0) and against
// the VCAA examination report and itute. Solution is original.
//
// Interactives: a. the parabola u = x² − 1 inside arcsin's band −1 ≤ u ≤ 1 (domain closed at
// ±√2, range [−π, π]); b. zoom in on (0, −π) and (√2, π) against a smooth U through the same
// points — the corner never flattens, the ends are vertical; e.i. a tangent sliding along f,
// splitting into two at x = 0 and turning vertical at ±√2, with dom f′ drawn as a strip;
// e.iii. g = f′·√(2 − x²) read off as a product at any x, with f′ toggled on to show it is a
// different graph. WrongMethod boxes carry the report's named errors (round brackets in a.,
// the turning point in b., the form in c., x = 0 and ±√2 in e.i., sketching f′ in e.iii.).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import arcsinSrc from './spec-2018e2-q1b-arcsin.png'
import piecewiseSrc from './spec-2018e2-q1e-piecewise.png'

const BandWidget = lazyWidget(() => import('../interactives/spec-2018e2-q1a-band'))
const CornerWidget = lazyWidget(() => import('../interactives/spec-2018e2-q1b-corner'))
const TangentWidget = lazyWidget(() => import('../interactives/spec-2018e2-q1ei-tangent'))
const ProductWidget = lazyWidget(() => import('../interactives/spec-2018e2-q1eiii-product'))

const EXAM_A: SAExaminerStats = {
  marks: [16, 16, 68],
  average: 1.5,
  comment: (
    <>
      This question was generally handled well. Common errors included: giving open endpoints
      with round brackets on the intervals, decimal approximations rather than exact values
      and failing to state the range. Students should read questions carefully and ensure
      that all required information is supplied in their responses.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [6, 13, 32, 50],
  average: 2.3,
  comment: (
    <>
      This question required students to label any endpoints and the{' '}
      <Katex tex="y" />-intercept with their coordinates. Not doing this or giving incorrect
      coordinates frequently caused students to miss out on marks.
      <br />
      Students' graphs were not always precise and accurate as required. For example, many
      graphs had an obvious turning point at the <Katex tex="y" />-intercept rather than the
      required shape. Other incorrect responses had endpoints in the incorrect location.
      <br />
      Students are advised to set viewing windows on technology to a scale that closely
      matches the scale provided on the examination.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
  comment: (
    <>
      Parts c. and d. of Question 1 were generally answered well. Some students did not
      express the derivatives in the required form with a real number in the numerator.
    </>
  ),
}

const EXAM_D: SAExaminerStats = { marks: [19, 81], average: 0.8 }

const EXAM_EI: SAExaminerStats = {
  marks: [79, 21],
  average: 0.2,
  comment: (
    <>
      This question was not answered well. The most common error was to include{' '}
      <Katex tex="x=0" /> in the domain. Another common error was to include the endpoints{' '}
      <Katex tex="x=\pm\sqrt2" />.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [51, 49],
  average: 0.5,
  comment: <>Some graphs were not graphs of functions.</>,
}

const EXAM_EIII: SAExaminerStats = {
  marks: [43, 18, 39],
  average: 1.0,
  comment: (
    <>
      The majority of students who answered Question 1eii. correctly were also able to
      sketch a correct graph in this question. Attempts to sketch graphs of{' '}
      <Katex tex="f'(x)" />, rather than <Katex tex="g(x)" />, were frequently made.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le x^2-1 \le 1" />,
    reason: <><Katex tex="\sin^{-1}" /> only accepts inputs in <Katex tex="[-1,1]" />, so the inner expression <Katex tex="x^2-1" /> must lie there.</>,
    more: <>For a composite, the domain comes from what the <em>outer</em> function will accept. <Katex tex="\sin^{-1}(u)" /> asks &ldquo;which angle has sine <Katex tex="u" />?&rdquo;, and sine never leaves <Katex tex="[-1,1]" />.</>,
  },
  {
    working: <Katex display tex="0 \le x^2 \le 2 \implies -\sqrt2 \le x \le \sqrt2" />,
    reason: <>Add <Katex tex="1" /> throughout. <Katex tex="x^2\ge0" /> always holds, so only <Katex tex="x^2\le2" /> restricts <Katex tex="x" />.</>,
    more: <>The parabola <Katex tex="x^2-1" /> never dips below <Katex tex="-1" />, so the bottom of the band never bites. Picture <Katex tex="y=x^2" /> under the line <Katex tex="y=2" /> rather than &ldquo;square-rooting both sides&rdquo;, which is where signs get lost.</>,
  },
  {
    working: <Katex display tex="\boxed{D = \left[-\sqrt2,\ \sqrt2\right]}" />,
    reason: <><em>Closed</em> brackets: at <Katex tex="x=\pm\sqrt2" /> the input is <Katex tex="1" />, and <Katex tex="\sin^{-1}(1)" /> is defined.</>,
    more: <>Keep the exact surd. Besides round brackets, the report names decimal approximations rather than exact values as a common error (e.g. writing <Katex tex="\pm1.41" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &x^2-1 \text{ covers } [-1,1] \\ \implies\ &\sin^{-1}(x^2-1) \text{ covers } \left[-\frac{\pi}{2},\frac{\pi}{2}\right] \end{aligned}" />,
    reason: <>As <Katex tex="x" /> goes from <Katex tex="0" /> to <Katex tex="\sqrt2" />, <Katex tex="x^2-1" /> runs continuously over all of <Katex tex="[-1,1]" />, and <Katex tex="\sin^{-1}" /> is increasing.</>,
    more: <>Range comes from the inside out: find the values the inner function takes on the domain, then push them through the outer function. Negative <Katex tex="x" /> gives the same values again, since only <Katex tex="x^2" /> matters.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Range} = \left[-\pi,\ \pi\right]}" />,
    reason: <>The factor of <Katex tex="2" /> doubles the interval. The question asks for both domain and range.</>,
    more: <>The report lists failing to state the range among the common errors.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = 2\sin^{-1}(-1) = 2\left(-\frac{\pi}{2}\right) = -\pi" />,
    reason: <>The <Katex tex="y" />-intercept, and also the minimum: <Katex tex="x^2-1" /> is smallest at <Katex tex="x=0" />, and <Katex tex="\sin^{-1}" /> is increasing.</>,
    more: <>Also worth a moment: <Katex tex="f(\pm1)=2\sin^{-1}(0)=0" />, so the graph crosses the <Katex tex="x" />-axis at <Katex tex="x=\pm1" /> — two more points to place on the grid.</>,
  },
  {
    working: <Katex display tex="f\!\left(\pm\sqrt2\right) = 2\sin^{-1}(1) = \pi" />,
    reason: <>The endpoints. Both give <Katex tex="\pi" />: the graph is symmetric about the <Katex tex="y" />-axis, since <Katex tex="f" /> depends on <Katex tex="x" /> only through <Katex tex="x^2" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={arcsinSrc} alt="Graph of y = 2arcsin(x²−1) on a grid from −4.5 to 4.5: a symmetric curve from (−√2, π) down to a sharp corner at (0, −π) and back up to (√2, π)" className="w-full max-w-[380px]" />
      </div>
    ),
    reason: <>Label all three points. The slopes <Katex tex="\tfrac{\pm4}{\sqrt{2-x^2}}" /> from parts c. and d. tend to <Katex tex="\mp2\sqrt2" /> either side of <Katex tex="x=0" /> (a sharp corner, not a turning point) and blow up as <Katex tex="x\to\pm\sqrt2" /> (vertical ends).</>,
    more: <>At <Katex tex="x=0" /> the slope tends to <Katex tex="\tfrac{4}{\sqrt2}=2\sqrt2" /> from the right and <Katex tex="-2\sqrt2" /> from the left. Place the endpoints carefully on VCAA's grid (<Katex tex="\sqrt2\approx1.41" />, <Katex tex="\pi\approx3.14" />) — the report notes endpoints in the incorrect location.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}f'(x) &= 2\cdot\frac{1}{\sqrt{1-\left(x^2-1\right)^2}}\cdot 2x \\ &= \frac{4x}{\sqrt{1-\left(x^2-1\right)^2}}\end{aligned}" />,
    reason: <>Chain rule, with <Katex tex="\tfrac{d}{du}\sin^{-1}(u)=\tfrac{1}{\sqrt{1-u^2}}" /> and <Katex tex="\tfrac{du}{dx}=2x" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 1-\left(x^2-1\right)^2 &= 1-\left(x^4-2x^2+1\right) \\ &= 2x^2-x^4 \\ &= x^2\left(2-x^2\right) \end{aligned}" />,
    reason: <>Expand and factorise under the root. Pulling out <Katex tex="x^2" /> is what lets the <Katex tex="x" /> on top cancel.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \sqrt{x^2\left(2-x^2\right)} &= |x|\sqrt{2-x^2} \\ \implies f'(x) &= \frac{4x}{|x|\sqrt{2-x^2}} \end{aligned}" />,
    reason: <><Katex tex="\sqrt{x^2}=|x|" />, not <Katex tex="x" />. This is why parts c. and d. have different answers.</>,
    more: <>That single fact is also what gives the graph in part b. its corner on the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="x>0 \implies |x|=x \implies f'(x) = \frac{4x}{x\sqrt{2-x^2}}" />,
    reason: <>For positive <Katex tex="x" />, <Katex tex="|x|=x" />, so the <Katex tex="x" />s cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{4}{\sqrt{2-x^2}}, \quad A = 4}" />,
    reason: <>A real number in the numerator, as the required form demands.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="x<0 \implies |x| = -x" />,
    reason: <>Part c.&rsquo;s working up to <Katex tex="\tfrac{4x}{|x|\sqrt{2-x^2}}" /> holds for any <Katex tex="x\ne0" />. For negative <Katex tex="x" />, <Katex tex="|x|" /> is the positive number <Katex tex="-x" />.</>,
    more: <>For example, <Katex tex="|-0.5|=0.5=-(-0.5)" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{4x}{-x\sqrt{2-x^2}}" />,
    reason: <>Substituting into that expression; <Katex tex="\tfrac{x}{-x}=-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{-4}{\sqrt{2-x^2}}, \quad B = -4}" />,
    reason: <>Negative, as it must be: the graph is falling for <Katex tex="x<0" />.</>,
    more: <>This sign flip either side of <Katex tex="x=0" /> is what makes the point at <Katex tex="x=0" /> a corner rather than a smooth minimum.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{4x}{|x|\sqrt{2-x^2}}" />,
    reason: <>Parts c. and d. in one expression. List every <Katex tex="x" /> in dom <Katex tex="f" /> where this fails to be a real number.</>,  },
  {
    working: <Katex display tex="|x| \ne 0 \implies x \ne 0" />,
    reason: <><Katex tex="f'(0)" /> does not exist: the slopes from the left and right tend to <Katex tex="-2\sqrt2" /> and <Katex tex="2\sqrt2" />, which disagree. That is the corner in part b.</>,
    more: <>Let <Katex tex="x\to0" /> in parts d. and c.: <Katex tex="\tfrac{-4}{\sqrt2}=-2\sqrt2" /> and <Katex tex="\tfrac{4}{\sqrt2}=2\sqrt2" />. <Katex tex="f" /> itself is fine there: <Katex tex="f(0)=-\pi" />.</>,
  },
  {
    working: <Katex display tex="2-x^2 > 0 \implies -\sqrt2 < x < \sqrt2" />,
    reason: <>Strict: at <Katex tex="x=\pm\sqrt2" /> the denominator is zero (a vertical tangent), so <Katex tex="f'" /> is undefined there, even though <Katex tex="f" /> is defined.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(-\sqrt2,\ 0\right)\cup\left(0,\ \sqrt2\right)}" />,
    reason: <>Dom <Katex tex="f" /> with the three points <Katex tex="x=0" /> and <Katex tex="x=\pm\sqrt2" /> removed.</>,
    more: <>Only <Katex tex="21\%" /> of students got this mark. The routine for next time: start from dom <Katex tex="f" />, then remove every point where the graph has a corner or a vertical tangent — you can see both on the graph from part b.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = f'(x)\sqrt{2-x^2} = \frac{4x}{|x|}" />,
    reason: <><Katex tex="g" /> is the numerator when <Katex tex="f'" /> is written over <Katex tex="\sqrt{2-x^2}" />, so multiply the root back: it cancels from <Katex tex="\tfrac{4x}{|x|\sqrt{2-x^2}}" />.</>,
    more: <><Katex tex="\tfrac{4x}{|x|}" /> is <Katex tex="4" /> times the sign of <Katex tex="x" />, so <Katex tex="g" /> can only take two values.</>,
  },
  {
    working: <Katex display tex="x>0: \ \frac{4x}{x} = 4, \qquad x<0: \ \frac{4x}{-x} = -4" />,
    reason: <>These are exactly the numerators <Katex tex="A=4" /> and <Katex tex="B=-4" /> from parts c. and d.</>,
  },
  {
    working: <Katex display tex="\boxed{g(x) = \begin{cases} 4 & 0<x<\sqrt2 \\[2pt] -4 & -\sqrt2<x<0 \end{cases}}" />,
    reason: <>Each branch's interval is the matching piece of dom <Katex tex="f'" /> from part e.i.: <Katex tex="x=0" /> is in neither branch.</>,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={piecewiseSrc} alt="Graph of g: a horizontal segment at y = −4 from x = −√2 to 0 and another at y = 4 from 0 to √2, with open circles at all four endpoints" className="w-full max-w-[380px]" />
      </div>
    ),
    reason: <>Two horizontal segments from part e.ii., with <em>open</em> circles at all four ends: <Katex tex="g" /> is only defined on dom <Katex tex="f'" /> (part e.i.), which excludes <Katex tex="x=0" /> and <Katex tex="x=\pm\sqrt2" />.</>,
    more: <>The circles at <Katex tex="(0,4)" /> and <Katex tex="(0,-4)" /> are open because <Katex tex="f'(0)" /> does not exist (corner); those at <Katex tex="(\sqrt2,4)" /> and <Katex tex="(-\sqrt2,-4)" /> because <Katex tex="f'(\pm\sqrt2)" /> does not exist (vertical tangent), even though <Katex tex="\tfrac{4x}{|x|}" /> itself could be evaluated there.</>,
  },
]

export default function SpecialistQ1_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p>
          Consider the function <Katex tex="f:D\to R" />, where{' '}
          <Katex tex="f(x)=2\arcsin\!\left(x^2-1\right)" />.
        </p>
      </div>

      <PartCard letter="a" topic="Domain & Range" marks={2} statement={<>Determine the maximal domain <Katex tex="D" /> and the range of <Katex tex="f" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why the domain stops at ±√2 — and includes it">
          <BandWidget />
        </Explore>
        <WrongMethod
          title="Use round brackets: D = (−√2, √2)"
          source="Examiner's report"
          working={<Katex display tex="D = \left(-\sqrt2,\ \sqrt2\right)" />}
        >
          Round brackets say <Katex tex="x=\pm\sqrt2" /> is left out. But there the input is{' '}
          <Katex tex="(\sqrt2)^2-1=1" />, on the edge of <Katex tex="[-1,1]" />, not outside it:{' '}
          <Katex tex="\sin^{-1}(1)=\tfrac{\pi}{2}" /> exists, so <Katex tex="f(\pm\sqrt2)=\pi" />. The
          inequality was <Katex tex="\le" />, so the brackets are square. Check an endpoint by
          substituting it: if the function gives a real number there, it belongs.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Sketch Graph" marks={3} statement={<>Sketch the graph of <Katex tex="y=f(x)" /> on the axes below, labelling any endpoints and the <Katex tex="y" />-intercept with their coordinates.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Zoom in: a corner never flattens into a turning point">
          <CornerWidget />
        </Explore>
        <WrongMethod
          title="It's a U shape, so draw a smooth turning point at (0, −π)"
          source="Examiner's report"
          working={<Katex display tex="f'(0)=0 \implies \text{smooth minimum}" />}
        >
          A turning point needs a slope of <Katex tex="0" />, but the slopes either side of{' '}
          <Katex tex="x=0" /> tend to <Katex tex="-2\sqrt2" /> and <Katex tex="2\sqrt2" /> (parts d. and
          c.), nowhere near <Katex tex="0" />. The curve comes down to <Katex tex="(0,-\pi)" /> and goes
          straight back up: a sharp point. The same check fixes the ends, where the slope blows up
          and the curve meets <Katex tex="x=\pm\sqrt2" /> vertically. On CAS, set the window to the
          exam's scale (the report's advice), then zoom in on the <Katex tex="y" />-intercept: a smooth
          minimum flattens out, a corner never does.
        </WrongMethod>
      </PartCard>

      <PartCard letter="c" topic="Chain Rule" marks={1} statement={<>Find <Katex tex="f'(x)" /> for <Katex tex="x>0" />, expressing your answer in the form <Katex tex="f'(x)=\dfrac{A}{\sqrt{2-x^2}}" />, <Katex tex="A\in R" />.</>} examinerReport={EXAM_C}>
        <Background>
          <p>
            The prescribed answer form is doing you a favour: it tells you the{' '}
            <Katex tex="\sqrt{2-x^2}" /> will appear and that everything else cancels.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Stop once the chain rule is done"
          source="Examiner's report"
          working={<Katex display tex="f'(x)=\frac{4x}{\sqrt{2x^2-x^4}}" />}
        >
          Correct, but not in the form <Katex tex="\tfrac{A}{\sqrt{2-x^2}}" /> with a real number on
          top, which the report notes some students did not reach. Finish by factoring{' '}
          <Katex tex="x^2" /> out of the root:{' '}
          <Katex tex="\sqrt{x^2(2-x^2)}=|x|\sqrt{2-x^2}" />, and for <Katex tex="x>0" /> that{' '}
          <Katex tex="|x|" /> is just <Katex tex="x" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="d" topic="Derivative" marks={1} statement={<>Write down <Katex tex="f'(x)" /> for <Katex tex="x<0" />, expressing your answer in the form <Katex tex="f'(x)=\dfrac{B}{\sqrt{2-x^2}}" />, <Katex tex="B\in R" />.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
        <WrongMethod
          title="√(x²) = x, so the answer is the same as part c."
          working={<Katex display tex="f'(x)=\frac{4x}{x\sqrt{2-x^2}}=\frac{4}{\sqrt{2-x^2}}" />}
        >
          That gives a positive slope for every negative <Katex tex="x" />, but the graph in part b. is{' '}
          <em>falling</em> to the left of the <Katex tex="y" />-axis — your sketch catches the slip.{' '}
          <Katex tex="\sqrt{x^2}" /> is never negative, so here it equals <Katex tex="|x|=-x" />, and{' '}
          <Katex tex="B=-4" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="e.i" topic="Maximal Domain" marks={1} statement={<>The derivative <Katex tex="f'(x)" /> can be expressed in the form <Katex tex="f'(x)=\dfrac{g(x)}{\sqrt{2-x^2}}" /> over its maximal domain. Find the maximal domain of <Katex tex="f'" />.</>} examinerReport={EXAM_EI}>
        <Background>
          <p>
            <Katex tex="f'(a)" /> is the slope of the single tangent line at <Katex tex="x=a" />, so it
            exists only when the slopes approaching from the left and from the right settle on the{' '}
            <em>same, finite</em> number. Two things break this: a <b>corner</b>, where the two sides
            give different slopes, and a <b>vertical tangent</b>, where the slope grows without bound.
            By VCE convention a derivative is also not defined at an endpoint of the function's domain;
            at <Katex tex="x=\pm\sqrt2" /> both reasons apply.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EI} />
        <Explore title="The derivative exists only where there is one non-vertical tangent">
          <TangentWidget />
        </Explore>
        <WrongMethod
          title="The only danger is the square root, so the domain is (−√2, √2)"
          source="Examiner's report"
          working={<Katex display tex="2-x^2>0 \implies \left(-\sqrt2,\ \sqrt2\right)" />}
        >
          The most common error. The form <Katex tex="\tfrac{g(x)}{\sqrt{2-x^2}}" /> shows only the
          root, but <Katex tex="g(x)=\tfrac{4x}{|x|}" /> hides a division by <Katex tex="|x|" />. At{' '}
          <Katex tex="x=0" /> the graph has a corner — slopes <Katex tex="-2\sqrt2" /> and{' '}
          <Katex tex="2\sqrt2" /> either side — so there is no single value of <Katex tex="f'(0)" />.
          Catch it by noticing that parts c. and d. needed <em>different</em> formulas either side of{' '}
          <Katex tex="x=0" />: whenever that happens, check the join separately.
        </WrongMethod>
        <WrongMethod
          title="The derivative has the same domain as f: [−√2, √2]"
          source="Examiner's report"
          working={<Katex display tex="\text{dom}\, f' = \text{dom}\, f = \left[-\sqrt2,\ \sqrt2\right]" />}
        >
          The report's other common error was including <Katex tex="x=\pm\sqrt2" />. The function
          value <Katex tex="f(\pm\sqrt2)=\pi" /> exists, but <Katex tex="f'(\pm\sqrt2)=\tfrac{\pm4}{\sqrt0}" />{' '}
          does not: the tangent there is vertical. A function can be defined at a point where its
          derivative is not — dom <Katex tex="f'" /> is never bigger than dom <Katex tex="f" />, and often
          smaller.
        </WrongMethod>
      </PartCard>

      <PartCard letter="e.ii" topic="Hybrid Function" marks={1} statement={<>Find <Katex tex="g(x)" />, expressing your answer as a piecewise (hybrid) function.</>} examinerReport={EXAM_EII}>
        <WorkingTable rows={ROWS_EII} />
        <WrongMethod
          title="Put x = 0 in both branches"
          working={<Katex display tex="g(x)=\begin{cases}4 & 0\le x<\sqrt2\\ -4 & -\sqrt2<x\le0\end{cases}" />}
        >
          Now <Katex tex="g(0)" /> is both <Katex tex="4" /> and <Katex tex="-4" />, so this is not a
          function — and <Katex tex="0" /> was never in the domain anyway (part e.i.). Each branch's
          interval should match the domain of <Katex tex="f'" /> exactly: strict at <Katex tex="0" /> and
          at <Katex tex="\pm\sqrt2" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="e.iii" topic="Sketch Graph" marks={2} statement={<>Sketch the graph of <Katex tex="g" /> on the axes below.</>} examinerReport={EXAM_EIII}>
        <WorkingTable rows={ROWS_EIII} />
        <Explore title="g is f′ with the root multiplied back: only the sign survives">
          <ProductWidget />
        </Explore>
        <WrongMethod
          title="Sketch the derivative"
          source="Examiner's report"
          working={<Katex display tex="y=\frac{\pm4}{\sqrt{2-x^2}}" />}
        >
          That is the graph of <Katex tex="f'" />, which the report says was frequently sketched instead
          of <Katex tex="g" />. It starts from open circles at <Katex tex="(0,\pm2\sqrt2)" /> and curves
          away to vertical asymptotes at <Katex tex="x=\pm\sqrt2" />. Reread what is being graphed:{' '}
          <Katex tex="g=f'\sqrt{2-x^2}" /> is just <Katex tex="\pm4" /> — two flat segments.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
