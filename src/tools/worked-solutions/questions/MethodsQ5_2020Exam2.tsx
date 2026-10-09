// 2020 Mathematical Methods — Exam 2, Section B Question 5 (13 marks). Tangents to x³ − x
// and the x-intercept they land on, then the odd-function family x³ + wx and its image
// under a dilation-and-translation. The hardest question on the paper: parts g. and h.
// averaged 0.03 and 0.02 marks. Question text transcribed from the original paper; the
// figure is a crop of VCAA's own artwork. Answers checked with sympy and against the VCAA
// examination report and itute. Solution is original.
//
// Interactive diagrams (§15): part b.–c. slides the point of contact along f and shows the run
// f(a)/f′(a) from a to b, so b runs away as the tangent flattens and does not exist when it is
// horizontal (interactives/meth-2020e2-q5b-flat-tangent.tsx); part d.ii. pairs the tangent with a
// graph of b against a and the band 1 ≤ b < 1.1, with zoom views for the 0.005-wide left interval
// (interactives/meth-2020e2-q5dii-window.tsx); part e. shows g_a, g_b and the gradient parabola
// f′(x) = 3x² − 1, whose mirror symmetry is why parallel needs b = −a
// (interactives/meth-2020e2-q5e-parallel.tsx); part g. has w and t sliders showing no w ≥ 0 can
// work and each w < 0 has exactly one t (interactives/meth-2020e2-q5g-reach.tsx); part h. applies
// T to p with m, n, h, k sliders — only h breaks the parallel tangents
// (interactives/meth-2020e2-q5h-transform.tsx).
//
// Sources: part e. follows itute's route (f′(a) = f′(b) ⇒ b = ±a, then b = −a in the part a.
// formula); the report substitutes the formula straight into f′(a) = f′(b) and discards
// a = −1, 0, 1 afterwards — the working explains both. Part h.: itute answers "h = 0 and k ∈ R,
// otherwise h = k = 0", the second case being for a reading in which the tangent at t must also
// cut the axis at −t; the question asks only about parallel tangents, so this follows VCAA (h = 0,
// m, n, k unrestricted). The report's "(odd function)" note is loose — with k ≠ 0 the image is not
// odd but keeps the property (what survives is the even gradient function / half-turn symmetry
// about (0, k)); the working says so. Part h.'s statement bolds "all" as the paper does.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import tangentsSrc from './meth-2020e2-q5-tangents.png'

const FlatTangentWidget = lazyWidget(() => import('../interactives/meth-2020e2-q5b-flat-tangent'))
const WindowWidget = lazyWidget(() => import('../interactives/meth-2020e2-q5dii-window'))
const ParallelWidget = lazyWidget(() => import('../interactives/meth-2020e2-q5e-parallel'))
const ReachWidget = lazyWidget(() => import('../interactives/meth-2020e2-q5g-reach'))
const TransformWidget = lazyWidget(() => import('../interactives/meth-2020e2-q5h-transform'))

const EXAM_A: SAExaminerStats = {
  marks: [36, 7, 9, 49],
  average: 1.7,
  comment: (
    <>
      Most students were able to find the equation of the tangent. When finding the equation of
      the tangent, many students left out brackets when multiplying <Katex tex="(x-a)" /> by the
      gradient <Katex tex="\left(3a^2-1\right)" />, writing{' '}
      <Katex tex="3a^2-1(x-a)" /> instead of <Katex tex="\left(3a^2-1\right)(x-a)" />. Some
      students did not show suitable steps.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [54, 46],
  average: 0.5,
  comment: (
    <>
      Some students wrote down only one solution, generally <Katex tex="a=\dfrac{1}{\sqrt3}" /> or{' '}
      <Katex tex="\dfrac{\sqrt3}{3}" />. Other incorrect answers were{' '}
      <Katex tex="a=R\setminus\left\{\pm\dfrac1{\sqrt3}\right\}" />,{' '}
      <Katex tex="\left[-\dfrac1{\sqrt3},\dfrac1{\sqrt3}\right]" /> and{' '}
      <Katex tex="a<-\dfrac{\sqrt3}{3},\ a>\dfrac{\sqrt3}{3}" />. Some gave approximate answers.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [77, 23],
  average: 0.2,
  comment: (
    <>
      The concept of the "nature of a tangent line" was not obvious for many students. Common
      incorrect answers were undefined, asymptote, increasing, decreasing, inflection,
      maximum and minimum. Many described the curve of <Katex tex="f" /> and not the tangent.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [40, 60],
  average: 0.6,
  comment: (
    <>
      There were some decimal place errors such as <Katex tex="a=-0.5051" />,{' '}
      <Katex tex="a=1.3467" /> or <Katex tex="a=1.347" />.
      <br />
      Sometimes{' '}
      <Katex tex="a=-0.5052" /> was written as <Katex tex="a=0.5052" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [87, 13],
  average: 0.1,
  comment: (
    <>
      Some students had the values within the interval in the wrong order. Others had
      incorrect brackets.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [82, 3, 8, 7],
  average: 0.4,
  comment: (
    <>
      Many students did not use <Katex tex="b=\dfrac{2a^3}{3a^2-1}" />.
      <br />
      Others did not
      eliminate the values where <Katex tex="a=b" /> and included <Katex tex="a=-1" />,{' '}
      <Katex tex="0" /> and <Katex tex="1" />.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: (
    <>
      Some students did not expand the expression in brackets correctly. Others tried to show
      the required result by substitution.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [97, 3],
  average: 0.03,
  comment: (
    <>
      This question was attempted by a small number of students. Some students found{' '}
      <Katex tex="w=-5t^2" /> but were unable to write down the values of <Katex tex="w" />.
    </>
  ),
}

const EXAM_H: SAExaminerStats = {
  marks: [98, 2],
  average: 0.02,
  comment: (
    <>
      This question was attempted by only a small number of students. When the correct answer
      was given, it was sometimes accompanied with incorrect values of <Katex tex="m" /> and{' '}
      <Katex tex="n" />: for example, <Katex tex="m,n\in R" />. The key word in this part is{' '}
      <b>restrictions</b>. There were no
      restrictions on <Katex tex="m" />, <Katex tex="n" /> or <Katex tex="k" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^3-x \implies f'(x) = 3x^2-1" />,
    reason: <>A tangent needs a point and a gradient. The point is <Katex tex="\bigl(a,f(a)\bigr)=\left(a,\ a^3-a\right)" />; the gradient is the derivative there, <Katex tex="f'(a)=3a^2-1" />.</>,
  },
  {
    working: <Katex display tex="g_a: \ y-\left(a^3-a\right) = \left(3a^2-1\right)(x-a)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" />. The gradient is the <em>whole</em> of <Katex tex="3a^2-1" />, so it goes in brackets — the report notes many students left them out, writing <Katex tex="3a^2-1(x-a)" />.</>,
  },
  {
    working: <Katex display tex="\text{at } (b,0): \ -\left(a^3-a\right) = \left(3a^2-1\right)(b-a)" />,
    reason: <>&ldquo;<Katex tex="(b,0)" /> is the <Katex tex="x" />-intercept&rdquo; means this point is on the line, so its coordinates satisfy the line&apos;s equation: put <Katex tex="x=b" />, <Katex tex="y=0" />. That leaves one equation linking <Katex tex="a" /> and <Katex tex="b" />, to be solved for <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="-a^3+a = 3a^2b-3a^3-b+a" />,
    reason: <>Expanding. All four products of <Katex tex="\left(3a^2-1\right)(b-a)" /> are needed: <Katex tex="3a^2\cdot b" />, <Katex tex="3a^2\cdot(-a)" />, <Katex tex="-1\cdot b" /> and <Katex tex="-1\cdot(-a)" />.</>,
  },
  {
    working: <Katex display tex="-a^3+3a^3 = 3a^2b-b \implies 2a^3 = b\left(3a^2-1\right)" />,
    reason: <>The <Katex tex="+a" /> cancels from both sides. Collect the <Katex tex="a^3" /> terms on the left and the <Katex tex="b" /> terms on the right, then factor out <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \frac{2a^3}{3a^2-1}}" />,
    reason: (
      <>
        Dividing by <Katex tex="3a^2-1" />. As required. The report notes some students did not
        show suitable steps: in a &ldquo;show that&rdquo; every line above has to appear. A
        picture that gives the same result (and is a good check): the tangent drops a height{' '}
        <Katex tex="f(a)" /> at gradient <Katex tex="f'(a)" />, so it meets the axis a horizontal
        distance <Katex tex="\tfrac{f(a)}{f'(a)}" /> from <Katex tex="a" />:{' '}
        <Katex tex="b = a-\tfrac{a^3-a}{3a^2-1} = \tfrac{2a^3}{3a^2-1}" />.
      </>
    ),
    more: <>The diagram in part b. shows this run.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="b = \frac{2a^3}{3a^2-1} \text{ undefined} \iff 3a^2-1 = 0" />,
    reason: <>A fraction exists for every <Katex tex="a" /> except where its denominator is zero. And this denominator isn&apos;t just any expression: <Katex tex="3a^2-1" /> is <Katex tex="f'(a)" />, the gradient of the tangent. So <Katex tex="b" /> fails exactly where the tangent is flat — at the turning points of <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="a^2 = \tfrac13 \implies a = \pm\frac{1}{\sqrt3}" />,
    reason: <>Both square roots: the cubic has two turning points, so there are two flat tangents. The report notes some students wrote down only one solution.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \pm\frac{\sqrt3}{3}}" />,
    reason: <>Exact, and rationalised (<Katex tex="\pm\tfrac1{\sqrt3}" /> is the same number); about <Katex tex="\pm0.577" />. The answer is just these two numbers, not an interval — the report notes some gave approximate answers or intervals.</>,
    more: <>Drag the point to either one in the diagram below and watch the tangent flatten as <Katex tex="b" /> runs away.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="a = \pm\tfrac{\sqrt3}{3}: \ f'(a) = 3a^2-1 = 0" />,
    reason: <>Part b.&apos;s values are exactly where the tangent&apos;s gradient is zero.</>,
  },
  {
    working: <Katex display tex="g_a(x) = f\!\left(\pm\tfrac{\sqrt3}{3}\right) = \mp\tfrac{2\sqrt3}{9}" />,
    reason: <>A line with gradient <Katex tex="0" /> has the same height everywhere: the height of its point of contact, <Katex tex="f\!\left(\tfrac{\sqrt3}{3}\right)=\tfrac{\sqrt3}{9}-\tfrac{3\sqrt3}{9}=-\tfrac{2\sqrt3}{9}" /> (and <Katex tex="+\tfrac{2\sqrt3}{9}" /> at <Katex tex="-\tfrac{\sqrt3}{3}" />). That height isn&apos;t <Katex tex="0" />, so the line runs parallel to the <Katex tex="x" />-axis, above or below it, and never meets it. That is <em>why</em> <Katex tex="b" /> does not exist.</>,
  },
  {
    working: <Katex display tex="\boxed{g_a \text{ is a horizontal line}}" />,
    reason: <>The question asks about the graph of <Katex tex="g_a" />, the tangent, so describe the line. The report notes many described the curve of <Katex tex="f" /> instead: &ldquo;maximum&rdquo;, &ldquo;minimum&rdquo;, &ldquo;inflection&rdquo; and &ldquo;increasing/decreasing&rdquo; describe <Katex tex="f" /> near <Katex tex="x=a" />, not the tangent.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{2a^3}{3a^2-1} = 1.1" />,
    reason: <>&ldquo;<Katex tex="b=1.1" />&rdquo; means the tangent lands at <Katex tex="x=1.1" />; use part a.&apos;s formula for <Katex tex="b" />.</>,
  },
  {
    working: <Cas fn="solve">solve(2a³/(3a² − 1) = 1.1, a)</Cas>,
    reason: <>Clearing the fraction gives the cubic <Katex tex="2a^3-3.3a^2+1.1=0" />, so expect up to three values: three different tangents that all land at <Katex tex="1.1" />. <Katex tex="a" /> has no restriction here, so keep them all.</>,
    more: <>The graph of <Katex tex="b" /> against <Katex tex="a" /> in part d.ii.&apos;s diagram crosses <Katex tex="1.1" /> three times.</>,
  },
  {
    working: <Katex display tex="a = -0.50517\ldots,\ 0.80840\ldots,\ 1.34676\ldots" />,
    reason: <>Unrounded, so the rounding is done once.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -0.5052, \ 0.8084, \ 1.3468}" />,
    reason: <>All three, to four decimal places. Round, don&apos;t chop: the report lists <Katex tex="-0.5051" /> and <Katex tex="1.3467" /> (the first four decimals of <Katex tex="-0.50517\ldots" /> and <Katex tex="1.34676\ldots" />), <Katex tex="1.347" /> (too few decimals) and <Katex tex="-0.5052" /> written as <Katex tex="0.5052" />.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(1 ≤ 2a³/(3a² − 1) &lt; 1.1, a)</Cas>,
    reason: <>On a TI-Nspire the double inequality solves directly and returns two intervals (some calculators can&apos;t, and you then read the graph of <Katex tex="b" /> against <Katex tex="a" /> instead). The rows below show where the intervals come from, and why the left one is easy to lose: it is only about <Katex tex="0.005" /> wide.</>,
  },
  {
    working: <Katex display tex="b = 1: \ 2a^3 = 3a^2-1 \iff 2a^3-3a^2+1 = 0" />,
    reason: <>Find the edges of the window first. The reminder that <Katex tex="f" /> has an <Katex tex="x" />-intercept at <Katex tex="(1,0)" /> is a hint: the tangent at <Katex tex="(1,0)" /> crosses the axis right where it touches, so <Katex tex="a=1" /> gives <Katex tex="b=1" /> and <Katex tex="a-1" /> is a factor.</>,
  },
  {
    working: <Katex display tex="(a-1)^2(2a+1) = 0 \implies a = 1 \text{ or } a = -\tfrac12" />,
    reason: <>Dividing by <Katex tex="a-1" /> leaves <Katex tex="2a^2-a-1=(a-1)(2a+1)" />, so <Katex tex="a=1" /> is a <em>double</em> root: <Katex tex="b" /> touches <Katex tex="1" /> there without going below it. The other root, <Katex tex="a=-\tfrac12" />, is the tangent from the left-hand hump that passes through <Katex tex="(1,0)" />.</>,
  },
  {
    working: <Katex display tex="b = 1.1: \ a = -0.5052,\ 0.8084,\ 1.3468 \ \text{(d.i.)}" />,
    reason: <>The other edges. <Katex tex="b<1.1" /> is strict, so these ends are excluded: round brackets.</>,
  },
  {
    working: (
      <>
        <Katex display tex="-\tfrac{\sqrt3}{3}<a<0: \ b \text{ decreases from } {+\infty} \text{ to } 0" />
        <Katex display tex="\implies -0.5052 < a \le -0.5" />
      </>
    ),
    reason: <>Just right of the asymptote <Katex tex="a=-\tfrac{\sqrt3}{3}" /> the tangent is nearly flat and lands far to the right; as <Katex tex="a" /> increases, <Katex tex="b" /> falls, passing <Katex tex="1.1" /> first (<Katex tex="a\approx-0.5052" />, excluded) and then <Katex tex="1" /> (<Katex tex="a=-\tfrac12" />, included). Check a point inside: <Katex tex="a=-0.502" /> gives <Katex tex="b\approx1.037" /> ✓.</>,
  },
  {
    working: (
      <>
        <Katex display tex="a>\tfrac{\sqrt3}{3}: \ b \text{ falls from } {+\infty} \text{ to } b(1) = 1, \text{ then rises}" />
        <Katex display tex="\implies 0.8084 < a < 1.3468" />
      </>
    ),
    reason: <>Because of the double root, <Katex tex="b" /> touches <Katex tex="1" /> at <Katex tex="a=1" /> and turns back up, so the whole stretch between the two <Katex tex="1.1" />&apos;s is in the window — and <Katex tex="a=1" /> is <em>inside</em> it, not an end.</>,
  },
  {
    working: <Katex display tex="\text{otherwise } b<0 \text{ or } 0 \le b<1" />,
    reason: <>For <Katex tex="a<-\tfrac{\sqrt3}{3}" /> and <Katex tex="0<a<\tfrac{\sqrt3}{3}" /> the tangent lands at a negative <Katex tex="b" />; for <Katex tex="-\tfrac12<a\le0" /> it lands between <Katex tex="0" /> and <Katex tex="1" />. Nothing else qualifies.</>,
  },
  {
    working: <Katex display tex="\boxed{a\in(-0.505,\ -0.500\,] \cup (0.808,\ 1.347)}" />,
    reason: <>To three decimal places, smaller number first in each interval. Round brackets where <Katex tex="b=1.1" />; a square bracket only at <Katex tex="-0.500" />, where <Katex tex="b=1" /> is reached at an end. The report notes values within the interval in the wrong order, and incorrect brackets.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="g_a \parallel g_b \iff f'(a) = f'(b)" />,
    reason: <>Two lines are parallel exactly when their gradients are equal, and a tangent&apos;s gradient is the derivative at its point of contact.</>,
  },
  {
    working: (
      <>
        <Katex display tex="3a^2-1 = 3b^2-1 \implies a^2 = b^2" />
        <Katex display tex="\implies b = a \text{ or } b = -a" />
      </>
    ),
    reason: <>The gradient function <Katex tex="3x^2-1" /> is a parabola symmetric about the <Katex tex="y" />-axis: it takes the same value at <Katex tex="x" /> and <Katex tex="-x" /> and at no other pair. So the tangent at <Katex tex="b" /> can match the tangent at <Katex tex="a" /> only if <Katex tex="b=\pm a" />. The question excludes <Katex tex="b=a" />, so <Katex tex="b=-a" />.</>,
    more: <>See the lower graph in the diagram below.</>,
  },
  {
    working: <Katex display tex="b = -a: \ \frac{2a^3}{3a^2-1} = -a" />,
    reason: <><Katex tex="b" /> isn&apos;t free: it is where the tangent at <Katex tex="a" /> lands, so it must also satisfy part a.&apos;s formula. The report notes many students did not use <Katex tex="b=\tfrac{2a^3}{3a^2-1}" />.</>,
  },
  {
    working: <Katex display tex="2a^3 = -3a^3+a \implies a\left(5a^2-1\right) = 0" />,
    reason: <>Multiplying both sides by <Katex tex="3a^2-1" /> (not zero, since <Katex tex="b" /> exists), then collecting: <Katex tex="5a^3-a=0" />.</>,
  },
  {
    working: <Katex display tex="a = 0 \text{ or } a = \pm\tfrac{1}{\sqrt5}" />,
    reason: <><Katex tex="a=0" /> must go: the tangent there is <Katex tex="y=-x" />, which lands at <Katex tex="b=0=a" />, so it is a <Katex tex="b=a" /> case after all.</>,
  },
  {
    working: (
      <>
        <Katex display tex="b = a: \ \frac{2a^3}{3a^2-1} = a" />
        <Katex display tex="\implies a^3-a = 0 \implies a = 0,\ \pm1" />
      </>
    ),
    reason: <>If you instead substitute the formula straight into <Katex tex="f'(a)=f'(b)" /> (the report&apos;s route), CAS returns <Katex tex="a=-1,\ -\tfrac{\sqrt5}{5},\ 0,\ \tfrac{\sqrt5}{5},\ 1" />. The extras <Katex tex="-1,0,1" /> are these <Katex tex="b=a" /> cases: points of contact on the <Katex tex="x" />-axis, whose tangents land where they touch. Excluded by <Katex tex="b\ne a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \pm\frac{\sqrt5}{5}}" />,
    reason: <>About <Katex tex="\pm0.447" />. Check: <Katex tex="a=-\tfrac{\sqrt5}{5}" /> gives <Katex tex="b=\tfrac{\sqrt5}{5}=-a" />, and both tangents have gradient <Katex tex="3\cdot\tfrac15-1=-\tfrac25" /> ✓. That is the pair VCAA drew: <Katex tex="a" /> a little left of <Katex tex="0" />, <Katex tex="b" /> the same distance to the right.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="p(-x) = (-x)^3+w(-x)" />,
    reason: <>Substitute <Katex tex="-x" /> everywhere <Katex tex="x" /> appears, in brackets — the report notes some students did not expand the expression in brackets correctly.</>,
  },
  {
    working: <Katex display tex="= -x^3-wx" />,
    reason: <><Katex tex="(-x)^3=-x^3" /> because the power is odd.</>,
  },
  {
    working: <Katex display tex="= -\left(x^3+wx\right)" />,
    reason: <>Factor out <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p(-x) = -p(x) \ \text{ for all } w\in R}" />,
    reason: <>As required. <Katex tex="w" /> was never given a value, so the argument holds for every <Katex tex="w" />. What it means: the graph of <Katex tex="p" /> has half-turn symmetry about the origin, and a half-turn carries the tangent at <Katex tex="x=t" /> onto a <em>parallel</em> tangent at <Katex tex="x=-t" /> — the property stated after this part, which g. and h. use.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="p'(x) = 3x^2+w \implies p'(t) = 3t^2+w" />,
    reason: <>The same routine as part a., now with <Katex tex="p" />: a point <Katex tex="\bigl(t,p(t)\bigr)=\left(t,\ t^3+wt\right)" /> and a gradient <Katex tex="p'(t)" />.</>,
  },
  {
    working: <Katex display tex="y-\left(t^3+wt\right) = \left(3t^2+w\right)(x-t)" />,
    reason: <>Point–gradient form, with brackets round the whole gradient.</>,
  },
  {
    working: <Katex display tex="\text{at } (-t,0): \ -\left(t^3+wt\right) = \left(3t^2+w\right)(-2t)" />,
    reason: <>The tangent must pass through <Katex tex="(-t,0)" />: put <Katex tex="x=-t" />, <Katex tex="y=0" />. Then <Katex tex="x-t=-t-t=-2t" />.</>,
  },
  {
    working: <Katex display tex="-t^3-wt = -6t^3-2wt \implies 5t^3+wt = 0" />,
    reason: <>Expanding, then collecting everything on one side.</>,
  },
  {
    working: <Katex display tex="t\left(5t^2+w\right) = 0, \ t>0 \implies w = -5t^2" />,
    reason: <><Katex tex="t\ne0" />, so the bracket must be zero.</>,
  },
  {
    working: (
      <>
        <Katex display tex="t>0 \implies w = -5t^2 < 0" />
        <Katex display tex="w<0 \implies t = \sqrt{-w/5} > 0 \text{ works}" />
      </>
    ),
    reason: <>The question asks for the values of <Katex tex="w" /> for which <em>some</em> <Katex tex="t>0" /> works. Every such <Katex tex="w" /> is negative; and every negative <Katex tex="w" /> is reached, by <Katex tex="t=\sqrt{-w/5}" />. (A sketch of <Katex tex="w=-5t^2" /> for <Katex tex="t>0" /> says the same: a downward parabola whose values fill <Katex tex="(-\infty,0)" />.)</>,
  },
  {
    working: <Katex display tex="\boxed{w<0}" />,
    reason: <>A set of values, not a formula — the report notes some students found <Katex tex="w=-5t^2" /> but were unable to write down the values of <Katex tex="w" />. Check: <Katex tex="w=-1" /> makes <Katex tex="p" /> part a.&apos;s <Katex tex="f" />, and then <Katex tex="t=\sqrt{1/5}=\tfrac{\sqrt5}{5}" />: exactly part e.&apos;s answer, where the tangent at <Katex tex="a" /> lands at <Katex tex="b=-a" />.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="T: (x,y) \to (mx+h,\ ny+k)" />,
    reason: <>The matrix read as a mapping. <Katex tex="m" />: dilation by factor <Katex tex="|m|" /> from the <Katex tex="y" />-axis (and a reflection in the <Katex tex="y" />-axis if <Katex tex="m<0" />). <Katex tex="n" />: dilation by factor <Katex tex="|n|" /> from the <Katex tex="x" />-axis (reflection in the <Katex tex="x" />-axis if <Katex tex="n<0" />). <Katex tex="h" />, <Katex tex="k" />: translations of <Katex tex="h" /> units in the positive <Katex tex="x" /> direction and <Katex tex="k" /> units in the positive <Katex tex="y" /> direction.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x' = mx+h,\ y' = ny+k" />
        <Katex display tex="\implies x = \frac{x'-h}{m},\ y = \frac{y'-k}{n}" />
      </>
    ),
    reason: <>To get the image&apos;s rule, make <Katex tex="x" /> and <Katex tex="y" /> the subjects and substitute into <Katex tex="y=p(x)" />.</>,
  },
  {
    working: <Katex display tex="y' = n\,p\!\left(\frac{x'-h}{m}\right)+k" />,
    reason: <>The image of <Katex tex="p" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\frac{dy'}{dx'} = \frac{n}{m}\,p'\!\left(\frac{x'-h}{m}\right)" />
        <Katex display tex="= \frac{n}{m}\left(3\left(\frac{x'-h}{m}\right)^{\!2}+w\right)" />
      </>
    ),
    reason: <>Chain rule. <Katex tex="k" /> disappears when differentiating — moving a graph up or down changes no gradient — and <Katex tex="\tfrac nm" /> multiplies every gradient by the same amount.</>,
  },
  {
    working: <Katex display tex="\text{equal at } x' = \pm t \iff (t-h)^2 = (-t-h)^2" />,
    reason: <>The common factor <Katex tex="\tfrac nm" />, the <Katex tex="m^2" /> and the <Katex tex="+w" /> cancel from both sides.</>,
  },
  {
    working: <Katex display tex="-2th = 2th \iff th = 0 \iff h = 0" />,
    reason: <>Expanding: <Katex tex="t^2-2th+h^2=t^2+2th+h^2" />. It has to hold for <b>all</b> <Katex tex="t\ne0" />, which forces <Katex tex="h=0" />. Nothing restricts <Katex tex="m" />, <Katex tex="n" /> or <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h = 0; \ \text{no restrictions on } m, n \text{ or } k}" />,
    reason: (
      <>
        The picture: the graph of <Katex tex="p" /> has half-turn symmetry about the origin (part
        f.), which pairs the tangent at <Katex tex="t" /> with a parallel one at{' '}
        <Katex tex="-t" />. Stretches and reflections keep that centre at the origin; a vertical
        translation moves it to <Katex tex="(0,k)" />, still on the <Katex tex="y" />-axis; only a
        horizontal translation moves it off, and then the pairs sit either side of{' '}
        <Katex tex="x=h" /> instead of <Katex tex="x=0" />. The key word is{' '}
        <em>restrictions</em>: <Katex tex="m,n\in R\setminus\{0\}" /> and <Katex tex="k\in R" />{' '}
        as given, nothing more. The report writes &ldquo;<Katex tex="h=0" /> (odd
        function)&rdquo;; strictly, with <Katex tex="k\ne0" /> the image is not odd, yet it keeps
        the property — what survives is that its gradient function is even.
      </>
    ),
  },
]

export default function MethodsQ5_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (13 marks)</p>
        <p>
          Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=x^3-x" />.
          <br />
          Let <Katex tex="g_a:R\to R" /> be the function representing the tangent to the graph
          of <Katex tex="f" /> at <Katex tex="x=a" />, where <Katex tex="a\in R" />.
          <br />
          Let <Katex tex="(b,0)" /> be the <Katex tex="x" />-intercept of the graph of{' '}
          <Katex tex="g_a" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Tangent Intercept"
        marks={3}
        statement={<>Show that <Katex tex="b=\dfrac{2a^3}{3a^2-1}" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Leave the brackets off the gradient"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="y-\left(a^3-a\right) = 3a^2-1(x-a)" />
              <Katex display tex="-a^3+a = 3a^2-b+a \implies b = a^3+3a^2" />
            </>
          }
        >
          Without brackets, <Katex tex="3a^2-1(x-a)" /> multiplies only the <Katex tex="1" /> by{' '}
          <Katex tex="(x-a)" />, so the line is no longer the tangent. The algebra still runs smoothly
          and lands on <Katex tex="b=a^3+3a^2" />, which is not the result you were asked to show —
          the sign that something went wrong at the first line. Whenever a gradient has more than one
          term, bracket it.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Undefined Values"
        marks={1}
        statement={<>State the values of <Katex tex="a" /> for which <Katex tex="b" /> does not exist.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="As the tangent flattens, b runs away — and a flat tangent never reaches the axis at all">
          <FlatTangentWidget />
        </Explore>
        <WrongMethod
          title="Give the set of a where b is fine, or an interval"
          source="Examiner's report"
          working={<Katex display tex="a\in R\setminus\left\{\pm\tfrac{1}{\sqrt3}\right\} \quad\text{or}\quad a\in\left[-\tfrac{1}{\sqrt3},\tfrac{1}{\sqrt3}\right]" />}
        >
          <Katex tex="R\setminus\left\{\pm\tfrac1{\sqrt3}\right\}" /> is the set where <Katex tex="b" />{' '}
          <em>does</em> exist — the opposite of what was asked. An interval fails too: at{' '}
          <Katex tex="a=0" />, inside it, the tangent is <Katex tex="y=-x" />, which crosses the axis at{' '}
          <Katex tex="b=0" />. Only the two values that make the denominator zero stop <Katex tex="b" />{' '}
          existing.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Nature of Graph"
        marks={1}
        statement={
          <>
            State the nature of the graph of <Katex tex="g_a" /> when <Katex tex="b" /> does
            not exist.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="What “the Nature of the Graph” Asks">
          <p>
            The nature of a graph is what <em>kind</em> of graph it is. <Katex tex="g_a" /> is a
            tangent, so it is always a straight line; what is left to say is which kind of line:
            horizontal (gradient <Katex tex="0" />) or sloping. The question names{' '}
            <Katex tex="g_a" />, not <Katex tex="f" />, so words that describe <Katex tex="f" /> near{' '}
            <Katex tex="x=a" /> (maximum, minimum, inflection, increasing, decreasing) answer a
            different question.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="The point is a turning point, so the answer is “a maximum or minimum”"
          source="Examiner's report"
          working={<>The nature is a local maximum and a local minimum.</>}
        >
          That describes the point of contact on <Katex tex="f" />, not <Katex tex="g_a" />. The graph of{' '}
          <Katex tex="g_a" /> is a straight line, and the only thing to say about a line&apos;s nature is
          its direction: gradient <Katex tex="0" />, so horizontal. Check which graph the question names
          before answering. (The diagram in part b. shows the flat tangent.)
        </WrongMethod>
        <WrongMethod
          title="b doesn't exist, so g_a is undefined (or an asymptote)"
          source="Examiner's report"
          working={<><Katex tex="g_a" /> is undefined.</>}
        >
          <Katex tex="b" /> not existing only means the line has no <Katex tex="x" />-intercept.{' '}
          <Katex tex="g_a" /> itself is perfectly well defined: at <Katex tex="a=-\tfrac{\sqrt3}{3}" />,{' '}
          <Katex tex="g_a(x)=\tfrac{2\sqrt3}{9}" /> for every <Katex tex="x" />. And it isn&apos;t an
          asymptote — it touches <Katex tex="f" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d.i"
        topic="Solve Equation"
        marks={1}
        statement={
          <>
            State all values of <Katex tex="a" /> for which <Katex tex="b=1.1" />. Give your
            answers correct to four decimal places.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Parameter Range"
        marks={1}
        statement={
          <>
            The graph of <Katex tex="f" /> has an <Katex tex="x" />-intercept at{' '}
            <Katex tex="(1,0)" />.
            <br />
            State the values of <Katex tex="a" /> for which{' '}
            <Katex tex="1\le b<1.1" />. Give your answers correct to three decimal places.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
        <Explore title="Which tangents land between 1 and 1.1? Two groups — and one is only 0.005 wide">
          <WindowWidget />
        </Explore>
        <WrongMethod
          title="Copy the brackets from 1 ≤ b < 1.1"
          source="Report: incorrect brackets"
          working={<Katex display tex="a\in[-0.505,\ -0.500) \cup [0.808,\ 1.347)" />}
        >
          The brackets belong to the <Katex tex="a" />-interval, so decide each one by asking what{' '}
          <Katex tex="b" /> is at that end. On the left branch <Katex tex="b" /> <em>decreases</em>, so
          the included value <Katex tex="b=1" /> is at the right-hand end <Katex tex="a=-0.500" /> and
          the excluded <Katex tex="b=1.1" /> at the left. On the right branch both ends have{' '}
          <Katex tex="b=1.1" />, so both are round; <Katex tex="b=1" /> happens in the middle, at{' '}
          <Katex tex="a=1" />.
        </WrongMethod>
        <WrongMethod
          title="Only tangents to the right of the dip can reach x = 1"
          working={<Katex display tex="a\in(0.808,\ 1.347)" />}
        >
          Tangents from the left-hand hump slope gently down to the right, and just past the top of the
          hump they land very far away; as <Katex tex="a" /> increases their landing point sweeps back
          in, through the window, for <Katex tex="-0.5052<a\le-0.5" />. That sliver is only about{' '}
          <Katex tex="0.005" /> wide, so a sketch or a full-size graph of <Katex tex="b" /> hides it. The{' '}
          <Katex tex="b=1" /> equation gives it away: its root <Katex tex="a=-\tfrac12" /> is on that
          branch.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          The coordinate <Katex tex="(b,0)" /> is the horizontal axis intercept of{' '}
          <Katex tex="g_a" />.
          <br />
          Let <Katex tex="g_b" /> be the function representing the
          tangent to the graph of <Katex tex="f" /> at <Katex tex="x=b" />, as shown in the
          graph below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={tangentsSrc}
            alt="The cubic f with two straight lines labelled g sub a and g sub b drawn tangent to it, meeting the horizontal axis at b and a respectively — from the original 2020 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="e"
        topic="Parallel Tangents"
        marks={3}
        statement={
          <>
            Find the values of <Katex tex="a" /> for which the graphs of <Katex tex="g_a" />{' '}
            and <Katex tex="g_b" />, where <Katex tex="b" /> exists, are parallel and where{' '}
            <Katex tex="b\ne a" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
        <Explore title="Parallel means equal gradients — and the gradient parabola repeats a height only at x and −x">
          <ParallelWidget />
        </Explore>
        <WrongMethod
          title="Keep every value the calculator gives"
          source="Examiner's report"
          working={<Katex display tex="a = -1,\ -\tfrac{\sqrt5}{5},\ 0,\ \tfrac{\sqrt5}{5},\ 1" />}
        >
          At <Katex tex="a=-1,0,1" /> the point <Katex tex="\bigl(a,f(a)\bigr)" /> is on the{' '}
          <Katex tex="x" />-axis, so the tangent lands where it touches: <Katex tex="b=a" />, and{' '}
          <Katex tex="g_b" /> is the same line as <Katex tex="g_a" />, not a second parallel line. The
          question&apos;s <Katex tex="b\ne a" /> is there to exclude exactly these. After any CAS solve,
          test each answer against every condition in the question.
        </WrongMethod>
        <WrongMethod
          title="Stop at a² = b², so a = −b"
          source="Examiner's report"
          working={<Katex display tex="3a^2-1 = 3b^2-1 \implies a = -b" />}
        >
          That is a relationship, not values of <Katex tex="a" />. The two tangents aren&apos;t at any two
          points: <Katex tex="b" /> is fixed by <Katex tex="a" /> through{' '}
          <Katex tex="b=\tfrac{2a^3}{3a^2-1}" />, so <Katex tex="b=-a" /> becomes an equation in{' '}
          <Katex tex="a" /> alone.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="p:R\to R" />, <Katex tex="p(x)=x^3+wx" />, where{' '}
          <Katex tex="w\in R" />.
        </p>
      </div>

      <PartCard
        letter="f"
        topic="Odd Function"
        marks={1}
        statement={
          <>
            Show that <Katex tex="p(-x)=-p(x)" /> for all <Katex tex="w\in R" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
        <WrongMethod
          title="Check it with numbers"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="w=2,\ x=1:" />
              <Katex display tex="p(-1) = -1-2 = -3 = -p(1)" />
            </>
          }
        >
          That checks one <Katex tex="x" /> and one <Katex tex="w" />. &ldquo;For all{' '}
          <Katex tex="w\in R" />&rdquo; (and all <Katex tex="x" />) needs algebra with <Katex tex="w" />{' '}
          and <Katex tex="x" /> left as letters, as in the working above.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A property of the graphs of <Katex tex="p" /> is that two distinct parallel tangents
          will always occur at <Katex tex="\bigl(t,p(t)\bigr)" /> and{' '}
          <Katex tex="\bigl(-t,p(-t)\bigr)" /> for all <Katex tex="t\ne0" />.
        </p>
      </div>

      <PartCard
        letter="g"
        topic="Tangent Intercept"
        marks={1}
        statement={
          <>
            Find all values of <Katex tex="w" /> such that a tangent to the graph of{' '}
            <Katex tex="p" /> at <Katex tex="\bigl(t,p(t)\bigr)" />, for some{' '}
            <Katex tex="t>0" />, will have an <Katex tex="x" />-intercept at{' '}
            <Katex tex="(-t,0)" />.
          </>
        }
        examinerReport={EXAM_G}
      >
        <Background title="What “for Some t > 0” Asks">
          <p>
            The answer is a set of <Katex tex="w" />-values. A value of <Katex tex="w" /> belongs to
            it if <em>at least one</em> positive <Katex tex="t" /> works for that{' '}
            <Katex tex="w" />. So the job has two steps: find the condition linking{' '}
            <Katex tex="w" /> and <Katex tex="t" />, then ask which values of <Katex tex="w" /> that
            condition can produce as <Katex tex="t" /> runs over every positive number, the way you
            would find the range of a function.
          </p>
        </Background>
        <WorkingTable rows={ROWS_G} />
        <Explore title="For w ≥ 0 the tangent always lands between 0 and t; each w < 0 has exactly one t that reaches −t">
          <ReachWidget />
        </Explore>
        <WrongMethod
          title="Stop at w = −5t²"
          source="Examiner's report"
          working={<Katex display tex="w = -5t^2" />}
        >
          This links <Katex tex="w" /> to <Katex tex="t" />, but the question asks which values of{' '}
          <Katex tex="w" /> work. Finish the thought: as <Katex tex="t" /> runs over the positive numbers,{' '}
          <Katex tex="-5t^2" /> runs over every negative number, and no <Katex tex="w\ge0" /> ever appears.
          So <Katex tex="w<0" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="h"
        topic="Transformations"
        marks={1}
        statement={
          <>
            Let{' '}
            <Katex tex="T:R^2\to R^2,\ T\!\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}m&0\\0&n\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}h\\k\end{bmatrix}" />
            , where <Katex tex="m,n\in R\setminus\{0\}" /> and <Katex tex="h,k\in R" />.
            <br />
            State any restrictions on the values of <Katex tex="m" />, <Katex tex="n" />,{' '}
            <Katex tex="h" /> and <Katex tex="k" />, given that the image of <Katex tex="p" />{' '}
            under the transformation <Katex tex="T" /> always has the property that parallel
            tangents occur at <Katex tex="x=-t" /> and <Katex tex="x=t" /> for <b>all</b>{' '}
            <Katex tex="t\ne0" />.
          </>
        }
        examinerReport={EXAM_H}
      >
        <Background title="What Each Part of T Does to a Gradient">
          <p>
            <Katex tex="T" /> sends the point <Katex tex="(x,y)" /> to{' '}
            <Katex tex="(mx+h,\ ny+k)" />. Multiplying every <Katex tex="y" /> by{' '}
            <Katex tex="n" /> multiplies every rise by <Katex tex="n" />; multiplying every{' '}
            <Katex tex="x" /> by <Katex tex="m" /> multiplies every run by <Katex tex="m" />. So a
            gradient that was <Katex tex="G" /> becomes <Katex tex="\tfrac nm G" /> (a negative{' '}
            <Katex tex="m" /> or <Katex tex="n" /> adds a reflection, which only flips the sign).
          </p>
          <p>
            Translations change no gradient at all; they only move <em>where</em> each gradient
            occurs. The gradient that was at <Katex tex="x" /> ends up at <Katex tex="x'=mx+h" />.
            So the question is whether, after <Katex tex="T" />, the gradients at{' '}
            <Katex tex="x'=t" /> and <Katex tex="x'=-t" /> are still equal.
          </p>
        </Background>
        <WorkingTable rows={ROWS_H} />
        <Explore title="Stretch it, flip it or lift it and the tangents at ±t stay parallel — slide it sideways and they don't">
          <TransformWidget />
        </Explore>
        <WrongMethod
          title="The image has to stay odd, so h = 0 and k = 0"
          working={<Katex display tex="h = 0,\ k = 0" />}
        >
          Oddness is more than the property needs. The property is about gradients, and moving a graph
          up or down changes no gradient at all: lift the curve in the diagram and the tangents at{' '}
          <Katex tex="\pm t" /> stay parallel, even though <Katex tex="y=p(x)+k" /> is no longer odd.
          Writing <Katex tex="k=0" /> restricts <Katex tex="k" /> when the answer is that <Katex tex="k" />{' '}
          is free.
        </WrongMethod>
        <WrongMethod
          title="Add conditions on m and n"
          source="Examiner's report"
          working={<Katex display tex="h = 0,\ m,n\in R" />}
        >
          <Katex tex="m,n\in R" /> even lets back in <Katex tex="m=0" /> and <Katex tex="n=0" />, which
          the question has already excluded — and it isn&apos;t a restriction anyway. Stretching or
          reflecting multiplies every gradient by the same <Katex tex="\tfrac nm" />, so equal gradients
          stay equal: <Katex tex="m" /> and <Katex tex="n" /> need nothing beyond the given{' '}
          <Katex tex="m,n\ne0" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
