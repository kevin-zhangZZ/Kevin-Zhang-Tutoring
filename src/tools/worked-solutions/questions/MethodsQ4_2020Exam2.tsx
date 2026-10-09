// 2020 Mathematical Methods — Exam 2, Section B Question 4 (13 marks). Tangents to
// 2x·e^(1−x²): slope, obtuse angle, a perpendicular pair and their intersection, then two
// chords cutting equal areas. Question text transcribed from the original paper; both
// figures are crops of VCAA's own artwork. Answers checked with scipy and against the VCAA
// examination report; itute agrees on every part. Solution is original.
//
// Cross-checks (Sept 2026 review): f′(p) = ½ has roots ±0.65525… (the negative one is outside the
// domain); the report's slip f′(p) = 2 gives p = 0.511, tangents meeting at 53.13°. The tangents
// meet at (0.80352…, 2.39295…), and f(0.80352…) = 2.29044… is the report's wrong 2.29; rounding
// x to 0.80 first gives y = 2.40. The equal-area equation has roots n = 0.38667… and 1.08803…, so
// the restriction 1 < n < 3 matters. The report's triangle formula ½(3 − n)(f(n) − f(3)) gives
// n = 1.08690… (1.087), as the report says; a triangle with f(3) taken as 0 gives 1.08747… (also
// 1.087). The correct trapezium version gives 1.08803…, both areas 0.90115…
//
// Interactive diagrams (§15): part b. builds up the three angles at the tangent's x-intercept —
// 63.43°, the calculator's −63.43° and the obtuse 116.57° (interactives/meth-2020e2-q4b-angle.tsx);
// part d.i. slides the point of contact until the tangents are perpendicular, with the slope
// triangle turned through 90° and the report's f′(p) = 2 slip (meth-2020e2-q4di-perpendicular.tsx);
// part d.ii. builds the two tangents and their crossing above the curve, against f(0.80) = 2.29
// (meth-2020e2-q4dii-intersection.tsx); part e.i. plots the report's four common wrong rules
// against the segment OQ (meth-2020e2-q4ei-segment.tsx); part e.ii. zooms in ×1000 on (3, f(3))
// (meth-2020e2-q4eii-zoom.tsx); part e.iii. slides Q until the two areas balance, with the
// report's triangle version as a toggle (meth-2020e2-q4eiii-balance.tsx).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2020e2-q4-graph.png'
import segmentsSrc from './meth-2020e2-q4e-segments.png'

const AngleWidget = lazyWidget(() => import('../interactives/meth-2020e2-q4b-angle'))
const PerpendicularWidget = lazyWidget(() => import('../interactives/meth-2020e2-q4di-perpendicular'))
const IntersectionWidget = lazyWidget(() => import('../interactives/meth-2020e2-q4dii-intersection'))
const SegmentWidget = lazyWidget(() => import('../interactives/meth-2020e2-q4ei-segment'))
const ZoomWidget = lazyWidget(() => import('../interactives/meth-2020e2-q4eii-zoom'))
const BalanceWidget = lazyWidget(() => import('../interactives/meth-2020e2-q4eiii-balance'))

const EXAM_A: SAExaminerStats = {
  marks: [23, 77],
  average: 0.8,
  comment: <>Some students wrote the equation of the tangent instead of its gradient.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [63, 37],
  average: 0.4,
  comment: <><Katex tex="63^\circ" /> and <Katex tex="-63^\circ" /> were common incorrect answers.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: (
    <>
      Some responses contained transcription errors.
      <br />
      Instead of writing <Katex tex="2\left(1-2p^2\right)e^{-p^2+1}" />, some wrote{' '}
      <Katex tex="2\left(1-2p^2\right)e^{-p^2}+1" />.
      <br />
      Brackets were not used well, and some students wrote the equation of the tangent instead
      of its gradient.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [38, 8, 54],
  average: 1.2,
  comment: (
    <>
      Some students solved <Katex tex="2\left(1-2p^2\right)e^{1-p^2}=2" />. Others knew that{' '}
      <Katex tex="m_1m_2=-1" /> but were unable to connect this information to their previous
      answers. <Katex tex="p=0.656" /> was often seen.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [46, 11, 17, 26],
  average: 1.2,
  comment: (
    <>
      Many students successfully found that the point of intersection of the two tangents
      occurred at <Katex tex="x=0.80" /> but then substituted this into <Katex tex="f(x)" />,
      getting the value 2.29 instead of substituting it into one of the two tangent
      equations. Some students managed to find the equation of the tangent at <Katex tex="x=1" />{' '}
      but did not know what to do with this equation. Others rounded too early.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [56, 44],
  average: 0.4,
  comment: (
    <>
      Some students did not write a rule. Others left out <Katex tex="x" />, giving the gradient
      as the final answer: <Katex tex="y=2e^{1-n^2}" />.
      <br />
      A number of students wrote the rule in terms of <Katex tex="f(n)" /> and not{' '}
      <Katex tex="n" />. Other common incorrect answers were: <Katex tex="y=2xe^{1-x^2}" />,{' '}
      <Katex tex="y=2ne^{1-n^2}" /> and <Katex tex="y=2e^{1-x^2}" />.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [72, 28],
  average: 0.3,
  comment: (
    <>
      A rule was required. Some students only wrote down the gradient. Others assumed{' '}
      <Katex tex="f(3)=0" />.
      <br />
      There were a lot of transcription errors: <Katex tex="e^{n^2-8}" /> was often written as{' '}
      <Katex tex="e^{n^2}-8" />. The variable <Katex tex="x" /> sometimes looked like{' '}
      <Katex tex="n" /> and vice versa. Brackets were used poorly. Some students only wrote down
      part of the equation. Students need to make sure they scroll across the screen to ensure
      they identify a complete expression when using technology.
    </>
  ),
}

const EXAM_EIII: SAExaminerStats = {
  marks: [60, 7, 22, 11],
  average: 0.8,
  comment: (
    <>
      The majority of students who attempted this question were able to correctly set up the
      integrals. However, some were then unable to arrive at the final response. There was no
      need to write out entire expressions. This often led to transcription errors and misuse
      of brackets. Others used areas of triangles:{' '}
      <Katex tex="\displaystyle\int_0^n f(x)\,dx-\frac12nf(n)=\frac12(3-n)\bigl(f(n)-f(3)\bigr)-\int_n^3f(x)\,dx" />,
      which gave <Katex tex="n=1.087" />.
      <br />
      The area from <Katex tex="x=n" /> to <Katex tex="x=3" /> is a trapezium, not a triangle.
      So, the correct formulation is{' '}
      <Katex tex="\displaystyle\int_0^n f(x)\,dx-\frac12nf(n)=\frac12(3-n)\bigl(f(n)+f(3)\bigr)-\int_n^3f(x)\,dx" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 2xe^{1-x^2}" />,
    reason: <>The slope of the tangent at <Katex tex="x=1" /> is the derivative there, <Katex tex="f'(1)" />: the derivative <em>is</em> the gradient of the tangent at each point. And <Katex tex="f" /> is a product, <Katex tex="2x" /> times <Katex tex="e^{1-x^2}" />, so it needs the product rule.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2e^{1-x^2}+2x\cdot(-2x)e^{1-x^2} = 2\left(1-2x^2\right)e^{1-x^2}" />,
    reason: <>Product rule <Katex tex="(uv)'=u'v+uv'" /> with <Katex tex="u=2x" /> and <Katex tex="v=e^{1-x^2}" />. The chain rule gives <Katex tex="v'=-2x\,e^{1-x^2}" />: the same exponential, times the derivative of its power. Taking out the common factor <Katex tex="2e^{1-x^2}" /> now pays off in parts c. and d.</>,
  },
  {
    working: <Katex display tex="f'(1) = 2(1-2)e^{0}" />,
    reason: <><Katex tex="e^{1-1}=e^0=1" />, so this is clean by hand. On CAS, <Cas fn="define" /> <Katex tex="f(x)" /> first (every later part uses it), then <Cas fn="derivative">d/dx(f(x)) | x = 1</Cas>.</>,
  },
  {
    working: <Katex display tex="\boxed{-2}" />,
    reason: <>The question asks for the <em>slope</em>, a number — the report notes some students wrote the equation of the tangent instead. Check against the graph: at <Katex tex="x=1" /> the curve is past its peak and falling steeply, so a gradient of <Katex tex="-2" /> is believable.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\tan\theta = -2" />,
    reason: <>The gradient from part a. The tangent falls to the right, so the angle it makes with the positive <Katex tex="x" />-direction is obtuse, which is why the question says &ldquo;obtuse&rdquo;.</>,
  },
  {
    working: <Katex display tex="\tan^{-1}(-2) = -63.43\ldots^\circ" />,
    reason: <>In degree mode. The calculator only ever returns an angle between <Katex tex="-90^\circ" /> and <Katex tex="90^\circ" />. The minus sign means it turned 63.43° <em>clockwise</em>, down to the lower half of the line. That is not the angle asked for.</>,
  },
  {
    working: <Katex display tex="\theta = 180^\circ+(-63.43\ldots^\circ) = 116.56\ldots^\circ" />,
    reason: <>Turn anticlockwise from the positive <Katex tex="x" />-direction instead. The acute angle between the line and the axis is <Katex tex="\tan^{-1}(2)\approx63.43^\circ" />, and the two angles lie along the straight <Katex tex="x" />-axis, so they add to <Katex tex="180^\circ" />. Equivalently, <Katex tex="\tan" /> repeats every <Katex tex="180^\circ" />, so this angle has the same tangent, <Katex tex="-2" />.</>,
    more: <>Step through the diagram below.</>,
  },
  {
    working: <Katex display tex="\boxed{117^\circ}" />,
    reason: <>To the nearest degree. The report lists <Katex tex="63^\circ" /> and <Katex tex="-63^\circ" /> as common incorrect answers. Check: <Katex tex="117^\circ" /> is obtuse, and <Katex tex="\tan116.57^\circ\approx-2" />, the gradient.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2\left(1-2x^2\right)e^{1-x^2} \ \text{ from part a.}" />,
    reason: <>The slope at <em>any</em> point is the derivative there, and <Katex tex="p" /> is just a name for &ldquo;some <Katex tex="x" />-value&rdquo;. So reuse part a.&apos;s derivative with <Katex tex="p" /> in place of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(p) = 2\left(1-2p^2\right)e^{1-p^2}}" />,
    reason: <>VCAA also gives <Katex tex="\left(2e-4p^2e\right)e^{-p^2}" />, the form CAS tends to print, since <Katex tex="e^{1-p^2}=e\cdot e^{-p^2}" />. Keep the brackets: <Katex tex="2\left(1-2p^2\right)e^{-p^2+1}" /> is not the same as <Katex tex="2\left(1-2p^2\right)e^{-p^2}+1" />. Check: <Katex tex="p=1" /> must give part a.&apos;s answer, and <Katex tex="2(1-2)e^0=-2" />.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="m_1m_2 = -1 \text{ with } m_1 = -2 \implies m_2 = \tfrac12" />,
    reason: <>The tangent at <Katex tex="x=1" /> has gradient <Katex tex="-2" /> (part a.). Its perpendicular partner has the negative reciprocal, <Katex tex="-\tfrac{1}{-2}=\tfrac12" />: flip the fraction <em>and</em> change the sign. Not <Katex tex="2" />, which only changes the sign; the report notes some students solved <Katex tex="f'(p)=2" />.</>,
  },
  {
    working: <Katex display tex="2\left(1-2p^2\right)e^{1-p^2} = \tfrac12" />,
    reason: <>The gradient of the tangent at <Katex tex="x=p" /> is part c.&apos;s expression, so set it equal to <Katex tex="\tfrac12" />. This is the link to the earlier parts that the report says some students couldn&apos;t make.</>,
  },
  {
    working: <Cas fn="solve">solve(2(1 − 2p²)·e^(1 − p²) = 1/2, p) | 0 ≤ p ≤ 3</Cas>,
    reason: <><Katex tex="p" /> appears both outside and inside the exponential, so there is no way to isolate it by hand: this is a job for CAS. Restrict to the domain <Katex tex="0\le x\le3" />.</>,
  },
  {
    working: <Katex display tex="p = 0.655251\ldots" />,
    reason: <>Without the restriction CAS also gives <Katex tex="p=-0.655\ldots" /> (<Katex tex="f'" /> is an even function, so its solutions come in <Katex tex="\pm" /> pairs), which is outside the domain. Store the value: part d.ii. needs its full precision. Check: it is just left of the peak at <Katex tex="x=\tfrac1{\sqrt2}\approx0.707" />, where the curve is still rising gently, so a small positive gradient like <Katex tex="\tfrac12" /> fits.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0.655}" />,
    reason: <>To three decimal places: 0.65525… rounds down. The report notes <Katex tex="p=0.656" /> was often seen.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{at } x=1: \ f(1) = 2e^0 = 2, \quad m = -2" />,
    reason: <>&ldquo;Hence&rdquo; means use part d.i. Each tangent needs a point and a gradient. At <Katex tex="x=1" /> both are exact: <Katex tex="f(1)=2" /> and part a.&apos;s gradient <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="y = -2(x-1)+2 = -2x+4" />,
    reason: <>Point–gradient form, <Katex tex="y-y_1=m(x-x_1)" />.</>,
  },
  {
    working: <Katex display tex="\text{at } x=p: \ f(p) = 2.31881\ldots, \quad m = \tfrac12" />,
    reason: <>The second tangent touches at <Katex tex="x=p" /> from part d.i., where the gradient is <Katex tex="\tfrac12" /> by construction. Use the stored <Katex tex="p=0.655251\ldots" />, not 0.655; the report notes some students rounded too early.</>,
  },
  {
    working: <Katex display tex="y = \tfrac12(x-p)+f(p) \approx 0.5x+1.99119" />,
    reason: <>Point–gradient form again. The <Katex tex="y" />-intercept <Katex tex="f(p)-\tfrac p2" /> is only known as a decimal, so keep all its digits.</>,
  },
  {
    working: <Cas fn="solve">solve(−2x + 4 = (1/2)(x − p) + f(p), x)</Cas>,
    reason: <>Where two lines cross, they give the same <Katex tex="y" /> for the same <Katex tex="x" />: set the two rules equal.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x = 0.80352\ldots" />
        <Katex display tex="y = -2(0.80352\ldots)+4 = 2.39295\ldots" />
      </>
    ),
    reason: <>The crossing point is on both tangents, so get <Katex tex="y" /> from a tangent (the simpler one), not from <Katex tex="f" />. The curve bends downward here, so both tangents lie above it and so does their crossing: <Katex tex="f(0.80)\approx2.29" /> is the height of the curve underneath, the wrong answer the report describes. And use the unrounded <Katex tex="x" />: <Katex tex="-2(0.80)+4=2.40" /> is out in the second decimal place.</>,
    more: <>See the diagram below.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.80,\ 2.39)}" />,
    reason: <>To two decimal places; write the 0 in 0.80. Check: <Katex tex="x=0.80" /> lies between the two points of contact, <Katex tex="x=0.655" /> and <Katex tex="x=1" />, as it must for two tangents to a hump that meet above it.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = 2(0)e^{1} = 0" />,
    reason: <>First find the segment&apos;s two ends. <Katex tex="(0,f(0))" /> is the origin, so the line has no constant term: it is <Katex tex="y=mx" />.</>,
  },
  {
    working: <Katex display tex="m = \frac{f(n)-0}{n-0} = \frac{2ne^{1-n^2}}{n}" />,
    reason: <>Gradient is rise over run between <Katex tex="(0,0)" /> and <Katex tex="Q(n,f(n))" />. Write <Katex tex="f(n)" /> out in full: the question wants the answer in terms of <Katex tex="n" />, and the report notes students who left <Katex tex="f(n)" /> in it.</>,
  },
  {
    working: <Katex display tex="\boxed{y_1 = 2e^{1-n^2}x}" />,
    reason: <>The <Katex tex="n" /> cancels. The two letters do different jobs: <Katex tex="n" /> fixes where <Katex tex="Q" /> is, so for a given <Katex tex="Q" /> the gradient <Katex tex="2e^{1-n^2}" /> is just a number; <Katex tex="x" /> moves along the segment. The rule needs both. Check: <Katex tex="x=0" /> gives <Katex tex="y=0" />, and <Katex tex="x=n" /> gives <Katex tex="2ne^{1-n^2}=f(n)" />, so it passes through both ends.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="f(3) = 6e^{1-9} = 6e^{-8}" />,
    reason: <>The segment&apos;s right end is <Katex tex="(3,f(3))" />. On the graph <Katex tex="f(3)" /> looks like 0, but <Katex tex="6e^{-8}\approx0.002" /> is small, not zero. Always substitute rather than read an endpoint off a sketch; the report notes students who assumed <Katex tex="f(3)=0" />.</>,
    more: <>Zoom in on the diagram below.</>,
  },
  {
    working: <Katex display tex="m = \frac{f(3)-f(n)}{3-n} = \frac{2ne^{1-n^2}-6e^{-8}}{n-3}" />,
    reason: <>Rise over run between <Katex tex="Q(n,f(n))" /> and <Katex tex="(3,f(3))" />, with the same order on top and bottom. Multiplying top and bottom by <Katex tex="-1" /> just tidies the signs.</>,
  },
  {
    working: <Katex display tex="\boxed{y_2 = \left(\frac{2ne^{1-n^2}-6e^{-8}}{n-3}\right)(x-3)+6e^{-8}}" />,
    reason: <>Point–gradient form through <Katex tex="(3,f(3))" />. Anchoring at <Katex tex="Q(n,f(n))" /> instead is equally valid; the report accepts many forms. There&apos;s no need to expand it, which only invites transcription slips (the report names <Katex tex="e^{n^2-8}" /> copied as <Katex tex="e^{n^2}-8" />). Check: <Katex tex="x=3" /> gives <Katex tex="6e^{-8}" />, and <Katex tex="x=n" /> gives <Katex tex="2ne^{1-n^2}=f(n)" />.</>,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{on } [0,n]: \ f \text{ lies above the chord } y_1" />,
    reason: <>An area between a curve and a line is <Katex tex="\int(\text{upper}-\text{lower})\,dx" />, so first decide which is on top in each region. On the left the curve arches above its chord (it bends downward there), so that area is <Katex tex="\int_0^n(f-y_1)\,dx" />.</>,
  },
  {
    working: <Katex display tex="\text{on } [n,3]: \ y_2 \text{ lies above } f" />,
    reason: <>Past <Katex tex="Q" /> the curve drops away faster than the chord and sags beneath it, so the roles swap: <Katex tex="\int_n^3(y_2-f)\,dx" />. Upper minus lower in each, so both integrals are positive areas.</>,
  },
  {
    working: <Katex display tex="\int_0^n\bigl(f(x)-y_1\bigr)dx = \int_n^3\bigl(y_2-f(x)\bigr)dx" />,
    reason: <>&ldquo;Equal areas between the function <Katex tex="f" /> and each line segment.&rdquo;</>,
  },
  {
    working: <Cas fn="solve">solve(∫(f(x) − y1, x, 0, n) = ∫(y2 − f(x), x, n, 3), n) | 1 &lt; n &lt; 3</Cas>,
    reason: <><Cas fn="define" /> <Katex tex="y_1" /> and <Katex tex="y_2" /> from parts e.i. and e.ii. first rather than retyping them; the report notes that writing out entire expressions often led to transcription errors and misuse of brackets. <Katex tex="n" /> sits both inside and outside exponentials, so only a solver can finish it. Keep the restriction: without it CAS also returns <Katex tex="n\approx0.387" />.</>,
  },
  {
    working: <Katex display tex="n = 1.08803\ldots" />,
    reason: <>Inside <Katex tex="1<n<3" />. Check: both areas come to about <Katex tex="0.901" />. The left one is quick by hand, since <Katex tex="\int2xe^{1-x^2}dx=-e^{1-x^2}" />: it is <Katex tex="e-(1+n^2)e^{1-n^2}\approx0.901" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 1.088}" />,
    reason: <>To three decimal places. The report notes that treating the right-hand region as a triangle gave 1.087. It is a trapezium, because the chord ends at <Katex tex="(3,f(3))" />, which is <Katex tex="6e^{-8}" /> above the axis (part e.ii.).</>,
  },
]

export default function MethodsQ4_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (13 marks)</p>
        <p>
          The graph of the function <Katex tex="f(x)=2xe^{\left(1-x^2\right)}" />, where{' '}
          <Katex tex="0\le x\le3" />, is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="A curve rising from the origin to a peak just after x = 0.7 then decaying towards the x-axis at x = 3 — from the original 2020 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Tangent Gradient"
        marks={1}
        statement={<>Find the slope of the tangent to <Katex tex="f" /> at <Katex tex="x=1" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Tangent Angle"
        marks={1}
        statement={
          <>
            Find the obtuse angle that the tangent to <Katex tex="f" /> at <Katex tex="x=1" />{' '}
            makes with the positive direction of the horizontal axis. Give your answer correct
            to the nearest degree.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="The Angle a Line Makes with the x-Axis">
          <p>
            &ldquo;The angle with the positive direction of the horizontal axis&rdquo; means: stand
            where the line crosses the <Katex tex="x" />-axis, face along the positive{' '}
            <Katex tex="x" />-direction, and turn <em>anticlockwise</em> until you are facing along
            the line. That angle <Katex tex="\theta" /> is between <Katex tex="0^\circ" /> and{' '}
            <Katex tex="180^\circ" />, and its tangent is the line&apos;s gradient:{' '}
            <Katex tex="\tan\theta=m" />.
          </p>
          <p>
            A line rising to the right (<Katex tex="m>0" />) makes an acute angle; a line falling
            to the right (<Katex tex="m<0" />) makes an obtuse one.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Which angle does the question want? Three angles at one crossing">
          <AngleWidget />
        </Explore>
        <WrongMethod
          title="Take the calculator's answer to tan⁻¹(−2)"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\tan^{-1}(-2)\approx-63^\circ" />
              <Katex display tex="\text{or, dropping the sign, } 63^\circ" />
            </>
          }
        >
          Neither is obtuse, and the question hands you that check. <Katex tex="-63^\circ" /> is
          measured clockwise, down to the lower half of the line; <Katex tex="63^\circ" /> is the
          acute angle between the line and the axis, measured from the <em>negative</em>{' '}
          <Katex tex="x" />-direction. The angle asked for turns anticlockwise from the positive{' '}
          <Katex tex="x" />-direction, so it is <Katex tex="180^\circ-63.43^\circ\approx117^\circ" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Tangent Gradient"
        marks={1}
        statement={
          <>
            Find the slope of the tangent to <Katex tex="f" /> at a point <Katex tex="x=p" />.
            Give your answer in terms of <Katex tex="p" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Copy the CAS output as e^(−p²) + 1"
          source="Examiner's report"
          working={<Katex display tex="2\left(1-2p^2\right)e^{-p^2}+1 \ \xrightarrow{\ p=1\ } \ -2e^{-1}+1\approx0.26" />}
        >
          The <Katex tex="+1" /> has fallen out of the power and become a separate term, which
          makes a different function: at <Katex tex="p=1" /> it gives about 0.26, not part a.&apos;s{' '}
          <Katex tex="-2" />. Substituting a value you already know is a quick check on anything
          copied from the CAS screen.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Perpendicular Tangents"
        marks={2}
        statement={
          <>
            Find the value of <Katex tex="p" /> for which the tangent to <Katex tex="f" /> at{' '}
            <Katex tex="x=1" /> and the tangent to <Katex tex="f" /> at <Katex tex="x=p" />{' '}
            are perpendicular to each other. Give your answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <Background title="Perpendicular Gradients">
          <p>
            Two lines (neither vertical) are perpendicular exactly when their gradients multiply
            to <Katex tex="-1" />: <Katex tex="m_1m_2=-1" />, so <Katex tex="m_2=-\tfrac1{m_1}" />.
          </p>
          <p>
            Why: a line of gradient <Katex tex="m" /> goes 1 across and <Katex tex="m" /> up. Turn
            that step through a right angle and &ldquo;1 across, <Katex tex="m" /> up&rdquo; becomes
            &ldquo;<Katex tex="m" /> back, 1 up&rdquo;, a gradient of <Katex tex="\tfrac{1}{-m}" />. The
            numbers swap over (the reciprocal) and one direction reverses (the sign).
          </p>
        </Background>
        <WorkingTable rows={ROWS_DI} />
        <Explore title="Perpendicular means the gradients multiply to −1: slide p until the tangents meet at a right angle">
          <PerpendicularWidget />
        </Explore>
        <WrongMethod
          title="Perpendicular means the opposite gradient, so solve f′(p) = 2"
          source="Examiner's report"
          working={<Katex display tex="2\left(1-2p^2\right)e^{1-p^2}=2 \implies p\approx0.511" />}
        >
          Gradients <Katex tex="2" /> and <Katex tex="-2" /> give mirror-image lines, equally steep
          but leaning opposite ways, and they meet at about <Katex tex="53^\circ" />, not{' '}
          <Katex tex="90^\circ" />. Changing the sign isn&apos;t enough; you must also take the
          reciprocal. Test any answer with the product: <Katex tex="(-2)(2)=-4\ne-1" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Intersection Point"
        marks={3}
        statement={
          <>
            Hence, find the coordinates of the point where the tangents to the graph of{' '}
            <Katex tex="f" /> at <Katex tex="x=1" /> and <Katex tex="x=p" /> intersect when
            they are perpendicular. Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
        <Explore title="The tangents cross above the curve, so the y-coordinate comes from a tangent, not from f">
          <IntersectionWidget />
        </Explore>
        <WrongMethod
          title="Find where the tangents meet, then substitute that x into f"
          source="Examiner's report"
          working={<Katex display tex="f(0.80\ldots)\approx2.29 \implies (0.80,\ 2.29)" />}
        >
          <Katex tex="f" /> gives the height of the <em>curve</em>, but the tangents cross about 0.10
          above it. The point <Katex tex="(0.80,\ 2.29)" /> isn&apos;t on either tangent:{' '}
          <Katex tex="-2(0.80\ldots)+4\approx2.39" />. A point where two lines meet lies on the
          lines, so its <Katex tex="y" />-coordinate comes from a line&apos;s equation.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Two line segments connect the points <Katex tex="\bigl(0,f(0)\bigr)" /> and{' '}
          <Katex tex="\bigl(3,f(3)\bigr)" /> to a single point{' '}
          <Katex tex="Q\bigl(n,f(n)\bigr)" />, where <Katex tex="1<n<3" />, as shown in the
          graph below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={segmentsSrc}
            alt="The same curve with two straight chords joining the origin to Q(n, f(n)) and Q to the point (3, f(3)) — from the original 2020 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard
        letter="e.i"
        topic="Area Between Curves"
        marks={1}
        statement={
          <>
            The first line segment connects the point <Katex tex="\bigl(0,f(0)\bigr)" /> and
            the point <Katex tex="Q\bigl(n,f(n)\bigr)" />, where <Katex tex="1<n<3" />.
            <br />
            Find the equation of this line segment in terms of <Katex tex="n" />.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
        <Explore title="A segment's rule must be straight and pass through both ends: test the report's wrong answers">
          <SegmentWidget />
        </Explore>
        <WrongMethod
          title="Give the gradient as the answer"
          source="Examiner's report"
          working={<Katex display tex="y=2e^{1-n^2}" />}
        >
          With no <Katex tex="x" /> in it, this rule gives the same <Katex tex="y" /> at every point:
          it is a horizontal line, and it misses the origin. A line through the origin is{' '}
          <Katex tex="y=mx" />, and <Katex tex="2e^{1-n^2}" /> is only the <Katex tex="m" />.
        </WrongMethod>
        <WrongMethod
          title="Write x in place of n"
          source="Examiner's report"
          working={<Katex display tex="y=2xe^{1-x^2}" />}
        >
          That is <Katex tex="f" />&apos;s own rule, so it follows the curve from <Katex tex="O" /> to{' '}
          <Katex tex="Q" />, not the straight segment. In the rule of a line, <Katex tex="x" /> appears
          only to the first power; <Katex tex="n" /> (where <Katex tex="Q" /> is) belongs in the
          gradient.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Area Between Curves"
        marks={1}
        statement={
          <>
            The second line segment connects the point <Katex tex="Q\bigl(n,f(n)\bigr)" /> and
            the point <Katex tex="\bigl(3,f(3)\bigr)" />, where <Katex tex="1<n<3" />.
            <br />
            Find the equation of this line segment in terms of <Katex tex="n" />.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
        <Explore title="f(3) looks like 0 but isn't: zoom in on the end of the second segment">
          <ZoomWidget />
        </Explore>
        <WrongMethod
          title="Read f(3) off the graph as 0"
          source="Examiner's report"
          working={<Katex display tex="y=\frac{2ne^{1-n^2}}{n-3}(x-3)" />}
        >
          This line ends at <Katex tex="(3,0)" />, on the axis, but the segment ends at{' '}
          <Katex tex="(3,6e^{-8})" />. The gap is far too small to see at the printed scale, which
          is exactly why the slip is easy to make. Substituting <Katex tex="x=3" /> into{' '}
          <Katex tex="f" /> is the only safe way to find the endpoint.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="e.iii"
        topic="Equal Areas"
        marks={3}
        statement={
          <>
            Find the value of <Katex tex="n" />, where <Katex tex="1<n<3" />, if there are
            equal areas between the function <Katex tex="f" /> and each line segment. Give
            your answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_EIII}
      >
        <WorkingTable rows={ROWS_EIII} />
        <Explore title="Slide Q until the two shaded areas balance">
          <BalanceWidget />
        </Explore>
        <WrongMethod
          title="Use a triangle for the right-hand shape"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\int_0^n f(x)\,dx-\tfrac12nf(n)" />
              <Katex display tex="=\tfrac12(3-n)\bigl(f(n)-f(3)\bigr)-\int_n^3 f(x)\,dx" />
              <Katex display tex="\implies n\approx1.087" />
            </>
          }
        >
          The triangle <Katex tex="\tfrac12(3-n)\bigl(f(n)-f(3)\bigr)" /> only reaches down to the
          height <Katex tex="f(3)" />, but <Katex tex="\int_n^3f(x)\,dx" /> is measured all the way
          down to the <Katex tex="x" />-axis. So a thin strip of area{' '}
          <Katex tex="(3-n)f(3)\approx0.004" /> is taken away without ever having been included.
          Between the chord and the axis the shape is a trapezium with parallel sides{' '}
          <Katex tex="f(n)" /> and <Katex tex="f(3)" />, area{' '}
          <Katex tex="\tfrac12(3-n)\bigl(f(n)+f(3)\bigr)" />. The strip is tiny, but it moves the
          third decimal place. Integrating <Katex tex="y_2-f" /> directly avoids the problem.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
