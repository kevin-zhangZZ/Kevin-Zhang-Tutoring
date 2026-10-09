// 2020 Mathematical Methods — Exam 2, Section B Question 1 (11 marks). A quartic with two
// repeated roots, its derivative, the reflection h, and the areas between the two. Question
// text transcribed from the original paper; all four figures are crops of VCAA's own
// artwork. Answers checked with sympy and against the VCAA examination report. Solution is
// original.
//
// Sept 2026 teaching pass (§15), re-checked with sympy: every answer agrees with the report and
// with itute. itute's routes are borrowed where they are clearer: e.i via h = 2 − f (the curves meet
// where f = 1), and f via D = 2|f − 1| (so D ≤ 2 ⟺ f ≤ 2), shown as an alternative to the report's
// −2 ≤ h − f ≤ 2. The report's "2.71" in e.iii comes from no clean slip we could reproduce, so no
// cause is given for it. Interactive diagrams (this site's own, plotted from the question's rules):
//  a.   interactives/meth-2020e2-q1a-family.tsx — slide a: every member passes through (±2, 0), only
//       the y-intercept 16a moves, so (0, 4) is the point that fixes a.
//  c.ii interactives/meth-2020e2-q1cii-steepest.tsx — f with a sliding tangent above f′: the lowest
//       point of f′ on (0, 2) is where f falls most steeply; height f(x) vs gradient f′(x).
//  d.   interactives/meth-2020e2-q1d-routes.tsx — four two-step routes animated; both orders the
//       report accepts land on h, "up 2 then reflect" and "reflect in the y-axis" miss.
//  e.i  interactives/meth-2020e2-q1ei-mirror.tsx — drag P on f, its mirror P′ in y = 1 runs along h;
//       they coincide only on the mirror, where f = 1.
//  e.iii interactives/meth-2020e2-q1eiii-lobes.tsx — sweep one shaded region and its mirror image:
//       1.36 each, 2.72 in total; toggle f − h to see the negative "area".
//  f.   interactives/meth-2020e2-q1f-gap.tsx — a vertical ruler D swept across x, painting the answer
//       set; views for the graph of h − f against y = ±2 and for the mirror shortcut 0 ≤ f ≤ 2.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2020e2-q1-graph.png'
import fprimeSrc from './meth-2020e2-q1c-fprime.png'
import fhSrc from './meth-2020e2-q1d-fh.png'
import shadedSrc from './meth-2020e2-q1e-shaded.png'

const FamilyWidget = lazyWidget(() => import('../interactives/meth-2020e2-q1a-family'))
const SteepestWidget = lazyWidget(() => import('../interactives/meth-2020e2-q1cii-steepest'))
const RoutesWidget = lazyWidget(() => import('../interactives/meth-2020e2-q1d-routes'))
const MirrorWidget = lazyWidget(() => import('../interactives/meth-2020e2-q1ei-mirror'))
const LobesWidget = lazyWidget(() => import('../interactives/meth-2020e2-q1eiii-lobes'))
const GapWidget = lazyWidget(() => import('../interactives/meth-2020e2-q1f-gap'))

const EXAM_A: SAExaminerStats = {
  marks: [17, 83],
  average: 0.8,
  comment: (
    <>
      Some students assumed <Katex tex="a=\tfrac14" /> in their proof, rather than showing
      it. Others did not substitute <Katex tex="(0,4)" /> into the equation. Some incorrectly
      substituted <Katex tex="(2,0)" /> or <Katex tex="(-2,0)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
  comment: (
    <>
      Some students tried to expand the function by hand and made algebraic errors. Others did
      not put the expression in the correct form. A common incorrect answer was
      <br />
      <Katex tex="f(x)=\dfrac14x^4-8x^2+16" />
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [16, 84],
  average: 0.8,
  comment: (
    <>
      Some students did not write a rule. An equation was required. Others solved{' '}
      <Katex tex="f'(x)=0" /> for <Katex tex="x" />.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [19, 26, 55],
  average: 1.4,
  comment: (
    <>
      An exact value was required. Some students found the <Katex tex="x" /> value but did
      not find the minimum gradient. Others wrote the coordinates of the turning point,
      without specifying which value was the minimum gradient.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: (
    <>
      Most students were able to describe the transformations. Some were not able to provide a
      suitable written description for the transformations or did not have them in the correct
      order. A common incorrect answer was reflected in the <Katex tex="y" />-axis.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: <>Exact values were required.</>,
}

const EXAM_EII: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: (
    <>
      Some students used <Katex tex="f(x)-h(x)" />. Sometimes <Katex tex="dx" /> was missing or
      the functions were called by other names, such as <Katex tex="g(x)" />, without being
      defined.
      <br />
      There was some poor use of brackets, for example:{' '}
      <Katex tex="\displaystyle2\int_{\sqrt2}^{\sqrt6}h(x)\,dx-\int_{\sqrt2}^{\sqrt6}f(x)\,dx\ne2\int_{\sqrt2}^{\sqrt6}\bigl(h(x)-f(x)\bigr)dx" />.
      <br />
      There was no need to write out the full expressions for <Katex tex="f(x)" /> and{' '}
      <Katex tex="h(x)" />. This often led to transcription errors. Likewise, it was not
      necessary to substitute{' '}
      <Katex tex="h(x)-f(x)=-\tfrac12(x+2)^2(x-2)^2+2=-\tfrac{x^4}{2}+4x^2-6" />. This often led
      to algebraic errors.
    </>
  ),
}

const EXAM_EIII: SAExaminerStats = {
  marks: [28, 72],
  average: 0.7,
  comment: (
    <>
      Some students gave the response of 2.71. Some students forgot to multiply by 2, giving 1.36
      as the answer.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [71, 6, 23],
  average: 0.5,
  comment: (
    <>
      Some students gave exact values for their answers:{' '}
      <Katex tex="-\sqrt{4+2\sqrt2}\le x\le-\sqrt{4-2\sqrt2},\ \sqrt{4-2\sqrt2}\le x\le\sqrt{4+2\sqrt2}" />.
      <br />
      Others had incorrect inequality signs. Some had extra solutions or only gave the values of{' '}
      <Katex tex="x" /> for when <Katex tex="D=2" /> units.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="(0,4) \text{ on the graph} \implies f(0) = 4" />,
    reason: <>To find an unknown constant, substitute a point you know is on the graph. The graph labels three points, but <Katex tex="(\pm2,0)" /> are the roots that the brackets <Katex tex="(x+2)^2" /> and <Katex tex="(x-2)^2" /> already build in: they lie on the curve whatever <Katex tex="a" /> is, so substituting them gives <Katex tex="0=0" />. The <Katex tex="y" />-intercept is the one point whose height depends on <Katex tex="a" />.</>,
    more: <>Slide <Katex tex="a" /> in the diagram below.</>,
  },
  {
    working: <Katex display tex="a(0+2)^2(0-2)^2 = 4" />,
    reason: <>Substituting <Katex tex="x=0" /> into the rule. In a "show that", write this line out in full: the substitution is the step the mark is for.</>,
  },
  {
    working: <Katex display tex="a(4)(4) = 16a = 4" />,
    reason: <>Both squares are 4.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \tfrac14}" />,
    reason: <>As required. Shown, not assumed — the report notes some students assumed <Katex tex="a=\tfrac14" /> in their proof rather than showing it.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(x+2)^2(x-2)^2 = \bigl[(x+2)(x-2)\bigr]^2" />,
    reason: <>Pairing the brackets first turns this into one difference of squares, then one square — far less error-prone than expanding two quadratics.</>,
  },
  {
    working: <Katex display tex="= \left(x^2-4\right)^2 = x^4-8x^2+16" />,
    reason: <>The middle term is <Katex tex="2\times x^2\times(-4)" />.</>,
  },
  {
    working: <Katex display tex="f(x) = \tfrac14\left(x^4-8x^2+16\right)" />,
    reason: <>The <Katex tex="\tfrac14" /> must be distributed across <em>all three</em> terms — the report's common wrong answer keeps it on the first only.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = \tfrac14x^4-2x^2+4}" />,
    reason: <>So <Katex tex="b=-2" /> and <Katex tex="c=4" />, both integers ✓. The question doesn't ask you to state <Katex tex="b" /> and <Katex tex="c" /> separately; the rule in this form is the answer. Check: the constant term is <Katex tex="f(0)" />, and it is <Katex tex="4" />, the printed <Katex tex="y" />-intercept ✓.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \tfrac14x^4-2x^2+4" />,
    reason: <>Differentiating part b. is much quicker than the product rule on the factorised form.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = x^3-4x}" />,
    reason: <>Or, factorised, <Katex tex="x(x-2)(x+2)" />. Check it against the printed graph: <Katex tex="f'" /> must be zero wherever <Katex tex="f" /> has a turning point, at <Katex tex="x=-2" />, <Katex tex="0" /> and <Katex tex="2" />, and a positive <Katex tex="x^3" /> term makes it rise to the right ✓. Write it as a <em>rule</em>, <Katex tex="f'(x)=\ldots" />: the report notes some students did not write a rule, and others solved <Katex tex="f'(x)=0" /> instead.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{minimise } f'(x) \implies \text{solve } f''(x) = 0" />,
    reason: <>"The minimum value of the graph of <Katex tex="f'" />" is the lowest <Katex tex="y" />-value on the <em>derivative</em> graph: the bottom of its trough on <Katex tex="(0,2)" />. At the bottom of a trough a graph is momentarily flat, so its own gradient is zero, and the gradient of <Katex tex="f'" /> is <Katex tex="f''" />. So differentiate once more and set it to zero, exactly as you would to find a turning point of <Katex tex="f" />, just one level up.</>,
  },
  {
    working: <Katex display tex="f''(x) = 3x^2-4 = 0 \implies x = \pm\frac{2}{\sqrt3} = \pm\frac{2\sqrt3}{3}" />,
    reason: <>Only the positive root, <Katex tex="\tfrac{2\sqrt3}{3}\approx1.15" />, lies in <Katex tex="(0,2)" />. The negative one is the top of the printed hump on <Katex tex="(-2,0)" />.</>,
  },
  {
    working: <Katex display tex="f'\!\left(\tfrac{2\sqrt3}{3}\right) = \left(\tfrac{2\sqrt3}{3}\right)^3-4\left(\tfrac{2\sqrt3}{3}\right)" />,
    reason: <>The question wants a value <em>of</em> <Katex tex="f'" />, so substitute into <Katex tex="f'" />, not into <Katex tex="f" />. (Substituting into <Katex tex="f" /> gives <Katex tex="\tfrac{16}{9}" />, the height of the curve at that point, which is a different thing.)</>,
  },
  {
    working: <Katex display tex="= \tfrac{8\cdot3\sqrt3}{27}-\tfrac{8\sqrt3}{3} = \tfrac{8\sqrt3}{9}-\tfrac{24\sqrt3}{9}" />,
    reason: <><Katex tex="\left(2\sqrt3\right)^3=8\times3\sqrt3=24\sqrt3" />, over <Katex tex="27" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-\frac{16\sqrt3}{9}}" />,
    reason: <>An exact value, as the section's instructions require, and a <em>gradient</em>, not a coordinate pair or an <Katex tex="x" />-value. About <Katex tex="-3.08" />. Check: <Katex tex="f'" /> is <Katex tex="0" /> at both ends of <Katex tex="(0,2)" /> and dips below the axis in between, so this one turning point is the minimum; and it is negative, as it must be where <Katex tex="f" /> is going downhill.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = -f(x)+2" />,
    reason: <>Compare the two rules: <Katex tex="h" /> is the rule for <Katex tex="f" /> with a minus sign in front and <Katex tex="+2" /> on the end. Read the transformations off in the order the rule is built: first negate <Katex tex="f(x)" />, then add 2.</>,
  },
  {
    working: <Katex display tex="f(x) \to -f(x): \text{ reflection in the } x\text{-axis}" />,
    reason: <>Negating the <em>output</em> sends every point <Katex tex="(x,y)" /> to <Katex tex="(x,-y)" />: a flip over the <Katex tex="x" />-axis. Say "reflection <em>in</em> the <Katex tex="x" />-axis". A reflection in the <Katex tex="y" />-axis would negate the <em>input</em>, giving <Katex tex="f(-x)" />, which is just <Katex tex="f(x)" /> again because <Katex tex="f" /> is even.</>,
  },
  {
    working: <Katex display tex="-f(x) \to -f(x)+2: \text{ translation of } 2 \text{ units up}" />,
    reason: <>Adding 2 to every output lifts the whole graph 2 units (in the positive <Katex tex="y" /> direction). Call it a <em>translation</em>, not a "shift" or "move".</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned}&\text{reflection in the } x\text{-axis, then}\\&\text{translation of } 2 \text{ units up}\end{aligned}}" />,
    reason: <>The other valid order, which the report also gives, is translate 2 units <em>down</em> first, then reflect in the <Katex tex="x" />-axis: <Katex tex="-\bigl(f(x)-2\bigr)=-f(x)+2" />. The reflection flips the sign of anything already added, so the order and the direction go together, and "up 2, then reflect" lands on <Katex tex="-f(x)-2" /> instead.</>,
    more: <>Play all four routes in the diagram below.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = h(x) \iff f(x) = 2-f(x)" />,
    reason: <>Graphs intersect where their rules give the same output. From part d, <Katex tex="h(x)=2-f(x)" />, so there is only one unknown quantity, <Katex tex="f(x)" />. (On CAS, with <Katex tex="f" /> and <Katex tex="h" /> defined: <Cas fn="solve">solve(f(x) = h(x), x)</Cas>.)</>,
  },
  {
    working: <Katex display tex="2f(x) = 2 \implies f(x) = 1" />,
    reason: <>So the curves meet exactly where <Katex tex="f" /> crosses the line <Katex tex="y=1" />. That is no accident: <Katex tex="h" /> is <Katex tex="f" /> reflected in <Katex tex="y=1" />, and a point can only be its own mirror image if it is on the mirror.</>,
    more: <>Drag P in the diagram below.</>,
  },
  {
    working: <Katex display tex="\tfrac14\left(x^2-4\right)^2 = 1 \implies \left(x^2-4\right)^2 = 4" />,
    reason: <>Using <Katex tex="(x+2)^2(x-2)^2=\bigl[(x+2)(x-2)\bigr]^2=\left(x^2-4\right)^2" /> from part b.</>,
  },
  {
    working: <Katex display tex="x^2-4 = \pm2 \implies x^2 = 6 \text{ or } x^2 = 2" />,
    reason: <>Taking the square root gives <em>both</em> signs, and each case gives two values of <Katex tex="x" />: that is where the four solutions come from. (The line <Katex tex="y=1" /> cuts the W shape four times.)</>,
  },
  {
    working: <Katex display tex="\boxed{x = -\sqrt6,\ -\sqrt2,\ \sqrt2,\ \sqrt6}" />,
    reason: <>Exact values, as required. Numerically <Katex tex="\pm1.41" /> and <Katex tex="\pm2.45" />, matching the four crossings in the figure.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{in the shaded regions } h(x) > f(x)" />,
    reason: <>An area between curves is the integral of (upper − lower), so first decide which curve is on top. The shaded regions run between the crossings at <Katex tex="\sqrt2" /> and <Katex tex="\sqrt6" /> (part e.i), and there the M-shaped <Katex tex="h" /> is above: at <Katex tex="x=2" />, say, <Katex tex="h(2)=2" /> and <Katex tex="f(2)=0" />. So the integrand is <Katex tex="h-f" />, not <Katex tex="f-h" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{both regions are congruent}\\&\text{(both functions are even)}\end{aligned}" />,
    reason: <>Only <Katex tex="x^2" /> appears in <Katex tex="f" /> and <Katex tex="h" />, so <Katex tex="f(-x)=f(x)" /> and <Katex tex="h(-x)=h(x)" />: the whole picture is symmetric in the <Katex tex="y" />-axis, and the left-hand region is the mirror image of the right-hand one. So integrate over the right-hand one and double it.</>,
  },
  {
    working: <Katex display tex="\boxed{2\int_{\sqrt2}^{\sqrt6}\bigl(h(x)-f(x)\bigr)dx}" />,
    reason: <>Equivalently <Katex tex="\int_{-\sqrt6}^{-\sqrt2}(h-f)\,dx+\int_{\sqrt2}^{\sqrt6}(h-f)\,dx" />. Keep the brackets around <Katex tex="h(x)-f(x)" />, and there is no need to substitute the rules in — the report notes both led to errors.</>,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: <Cas fn="nInt">2·∫(h(x) - f(x), x, √2, √6)</Cas>,
    reason: <>Evaluate the integral from part e.ii, 2 and all, with <Katex tex="f" /> and <Katex tex="h" /> defined on the calculator so the rules don't have to be typed again. A decimal answer is asked for, so the calculator is the expected tool.</>,
  },
  {
    working: <Katex display tex="= \frac{112\sqrt2}{15}-\frac{16\sqrt6}{5} = 2.7210\ldots" />,
    reason: <>The exact form, though the question asks only for a decimal. Each region on its own is <Katex tex="1.3605\ldots" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2.72}" />,
    reason: <>To two decimal places. The report notes some students forgot to multiply by 2, giving <Katex tex="1.36" />, and some gave <Katex tex="2.71" />. Check: each region fits inside a box about <Katex tex="1" /> wide (<Katex tex="\sqrt6-\sqrt2\approx1.04" />) and <Katex tex="2" /> tall (the biggest gap, at <Katex tex="x=2" />), area about <Katex tex="2" />; a rounded lens filling about two-thirds of it, <Katex tex="\approx1.36" />, is plausible, and two of them make <Katex tex="2.72" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="D = |h(x)-f(x)|" />,
    reason: <>The vertical distance at <Katex tex="x" /> is the length of the vertical segment joining the two graphs: upper minus lower. But the upper curve changes at every crossing (<Katex tex="\pm\sqrt2" />, <Katex tex="\pm\sqrt6" />): <Katex tex="h" /> is on top inside the shaded regions, <Katex tex="f" /> everywhere else. The absolute value covers both cases at once.</>,
  },
  {
    working: <Katex display tex="D \le 2 \iff -2 \le h(x)-f(x) \le 2" />,
    reason: <>"At most 2" means <Katex tex="D\le2" />, with 2 itself allowed. <Katex tex="|u|\le2" /> means <Katex tex="u" /> is within 2 of zero on either side, so <Katex tex="h-f" /> may be anywhere from <Katex tex="-2" /> (where <Katex tex="f" /> is on top) to <Katex tex="2" /> (where <Katex tex="h" /> is on top). This is the report's method; on CAS, <Cas fn="solve">solve(−2 ≤ h(x) − f(x) ≤ 2, x)</Cas>.</>,
  },
  {
    working: <Katex display tex="h(x)-f(x) = 2-2f(x) = 2-\tfrac12\left(x^2-4\right)^2" />,
    reason: <>By hand: <Katex tex="h=2-f" /> (part d), and <Katex tex="f(x)=\tfrac14\left(x^2-4\right)^2" /> (part b).</>,
  },
  {
    working: <Katex display tex="\text{right inequality: } 2-\tfrac12\left(x^2-4\right)^2 \le 2 \text{, always true}" />,
    reason: <>A square is never negative, so <Katex tex="h-f" /> never exceeds 2. In the picture: inside the shaded regions the gap is at most 2 everywhere (it equals 2 only at <Katex tex="x=\pm2" />, where <Katex tex="f=0" /> and <Katex tex="h=2" />), so all of each shaded region is in the answer. Only the left inequality cuts anything off.</>,
  },
  {
    working: <Katex display tex="2-\tfrac12\left(x^2-4\right)^2 \ge -2 \implies \left(x^2-4\right)^2 \le 8" />,
    reason: <>The left inequality: where <Katex tex="f" /> is on top, the gap <Katex tex="f-h" /> must not exceed 2. (The same inequality drops out quicker from the mirror picture of e.i: <Katex tex="f" /> and <Katex tex="h" /> are equal distances from <Katex tex="y=1" />, so <Katex tex="D=2|f(x)-1|" />, and <Katex tex="D\le2 \iff 0\le f(x)\le2" />, i.e. <Katex tex="\tfrac14\left(x^2-4\right)^2\le2" />.)</>,
  },
  {
    working: <Katex display tex="\left|x^2-4\right| \le 2\sqrt2 \implies 4-2\sqrt2 \le x^2 \le 4+2\sqrt2" />,
    reason: <>Taking square roots: <Katex tex="x^2-4" /> lies between <Katex tex="-2\sqrt2" /> and <Katex tex="2\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="\sqrt{4-2\sqrt2} \le |x| \le \sqrt{4+2\sqrt2}" />,
    reason: <>A range of <Katex tex="x^2" /> that doesn't include 0 gives two separate, symmetric intervals in <Katex tex="x" />, one on each side of the <Katex tex="y" />-axis. The middle is excluded: at <Katex tex="x=0" />, <Katex tex="D=|{-2}-4|=6" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-2.61 \le x \le -1.08 \ \text{ or } \ 1.08 \le x \le 2.61}" />,
    reason: <>To two decimal places as asked, from <Katex tex="\pm\sqrt{4\pm2\sqrt2}" /> (the report notes some students gave exact values instead). Closed intervals, because "at most" includes 2. The answer runs past the shaded regions (<Katex tex="\sqrt2\approx1.41" /> to <Katex tex="\sqrt6\approx2.45" />) at both ends, because just outside a crossing the gap is still small. Only 23% of students scored both marks.</>,
  },
]

export default function MethodsQ1_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (11 marks)</p>
        <p>
          Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=a(x+2)^2(x-2)^2" />, where{' '}
          <Katex tex="a\in R" />. Part of the graph of <Katex tex="f" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="A W-shaped quartic touching the x-axis at (−2, 0) and (2, 0) with a local maximum at (0, 4) — from the original 2020 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard letter="a" topic="Find Parameter" marks={1} statement={<>Show that <Katex tex="a=\tfrac14" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Every value of a gives a curve through (±2, 0) — only the y-intercept can fix a" spoilerFree>
          <FamilyWidget />
        </Explore>
        <WrongMethod
          title="Substitute one of the x-intercepts, (2, 0)"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="0 = a(2+2)^2(2-2)^2" />
              <Katex display tex="0 = a(16)(0) \implies 0 = 0" />
            </>
          }
        >
          True for every value of <Katex tex="a" />, so it can't show that <Katex tex="a=\tfrac14" />. The factor{' '}
          <Katex tex="(x-2)^2" /> makes <Katex tex="f(2)=0" /> no matter what multiplies it: the roots were built into the
          rule before <Katex tex="a" /> was chosen. Pick a point on the graph that isn't a root.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Expansion"
        marks={1}
        statement={
          <>
            Express <Katex tex="f(x)=\tfrac14(x+2)^2(x-2)^2" /> in the form{' '}
            <Katex tex="f(x)=\tfrac14x^4+bx^2+c" />, where <Katex tex="b" /> and{' '}
            <Katex tex="c" /> are integers.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Multiply only the first term by ¼"
          source="Examiner's report"
          working={<Katex display tex="f(x) = \tfrac14x^4-8x^2+16" />}
        >
          The <Katex tex="\tfrac14" /> multiplies the whole bracket <Katex tex="x^4-8x^2+16" />, so every term gets it:{' '}
          <Katex tex="-8x^2\times\tfrac14=-2x^2" /> and <Katex tex="16\times\tfrac14=4" />. The quick catch: the constant
          term is <Katex tex="f(0)" />, the <Katex tex="y" />-intercept. This version gives <Katex tex="f(0)=16" />, but the
          graph (and part a) says <Katex tex="4" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>Part of the graph of the derivative function <Katex tex="f'" /> is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={fprimeSrc}
            alt="A cubic curve labelled f prime, crossing the x-axis at (−2, 0), the origin and (2, 0) — from the original 2020 VCAA exam paper"
            className="w-full max-w-[280px]"
          />
        </div>
      </div>

      <PartCard
        letter="c.i"
        topic="Derivative"
        marks={1}
        statement={<>Write the rule for <Katex tex="f'" /> in terms of <Katex tex="x" />.</>}
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Minimum Value"
        marks={2}
        statement={
          <>
            Find the minimum value of the graph of <Katex tex="f'" /> on the interval{' '}
            <Katex tex="x\in(0,2)" />.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
        <Explore title="The lowest point of the f′ graph is where f is falling most steeply">
          <SteepestWidget />
        </Explore>
        <WrongMethod
          title="Stop at x = 2√3/3, or give the point"
          source="Examiner's report"
          working={<Katex display tex="f''(x) = 0 \implies x = \tfrac{2\sqrt3}{3}" />}
        >
          That says <em>where</em> the minimum is, not what it is. The question asks for the minimum <em>value</em> of the
          graph of <Katex tex="f'" />: its <Katex tex="y" />-coordinate, <Katex tex="f'\!\left(\tfrac{2\sqrt3}{3}\right)=-\tfrac{16\sqrt3}{9}" />.
          Giving the point <Katex tex="\left(\tfrac{2\sqrt3}{3},-\tfrac{16\sqrt3}{9}\right)" /> without saying which number
          is the minimum doesn&apos;t answer the question either. Finish with the single number.
        </WrongMethod>
        <WrongMethod
          title="Substitute x = 2√3/3 back into f"
          working={<Katex display tex="f\!\left(\tfrac{2\sqrt3}{3}\right) = \tfrac14\left(\tfrac43-4\right)^2 = \tfrac14\cdot\tfrac{64}{9} = \tfrac{16}{9}" />}
        >
          This is the height of the point on <Katex tex="f" />, not the value of <Katex tex="f'" /> there. A sign check
          catches it: on <Katex tex="(0,2)" /> the graph of <Katex tex="f'" /> is below the axis (<Katex tex="f" /> is going
          downhill), so its minimum must be negative, and <Katex tex="\tfrac{16}{9}" /> isn&apos;t.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Let <Katex tex="h:R\to R" />, <Katex tex="h(x)=-\tfrac14(x+2)^2(x-2)^2+2" />. Parts
          of the graphs of <Katex tex="f" /> and <Katex tex="h" /> are shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={fhSrc}
            alt="The W-shaped quartic f together with its reflection h, an M-shaped curve, crossing at four points — from the original 2020 VCAA exam paper"
            className="w-full max-w-[320px]"
          />
        </div>
      </div>

      <PartCard
        letter="d"
        topic="Transformations"
        marks={1}
        statement={
          <>
            Write a sequence of two transformations that map the graph of <Katex tex="f" />{' '}
            onto the graph of <Katex tex="h" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="Order matters: which two-step routes really land on h?">
          <RoutesWidget />
        </Explore>
        <WrongMethod
          title="Reflect in the y-axis, then translate up 2"
          source="Examiner's report"
          working={<Katex display tex="f(x) \to f(-x) = f(x) \to f(x)+2" />}
        >
          A reflection in the <Katex tex="y" />-axis replaces <Katex tex="x" /> by <Katex tex="-x" />, and{' '}
          <Katex tex="f" /> is even, so it doesn&apos;t move the graph at all: you end with the W shape lifted by 2, not the
          upside-down shape of <Katex tex="h" />. To turn a graph upside down you negate the <em>outputs</em>, which is a
          reflection in the <Katex tex="x" />-axis.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={shadedSrc}
            alt="The graphs of f and h with the two regions between them shaded, one either side of the y-axis, each between the intersections near x = ±√2 and x = ±√6 — from the original 2020 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="e.i"
        topic="Intersections"
        marks={1}
        statement={
          <>
            State the values of <Katex tex="x" /> for which the graphs of <Katex tex="f" />{' '}
            and <Katex tex="h" /> intersect.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
        <Explore title="h is f reflected in the line y = 1, so the curves can only meet on that line">
          <MirrorWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Definite Integral"
        marks={1}
        statement={
          <>
            Write down a definite integral that will give the total area of the shaded regions
            in the graph above.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
        <WrongMethod
          title="Use f(x) − h(x) as the integrand"
          source="Examiner's report"
          working={<Katex display tex="2\int_{\sqrt2}^{\sqrt6}\bigl(f(x)-h(x)\bigr)dx \approx -2.72" />}
        >
          In the shaded regions <Katex tex="f" /> is the <em>lower</em> curve, so every strip{' '}
          <Katex tex="f(x)-h(x)" /> is negative and the integral comes out negative: an area can&apos;t be. Before writing
          the integrand, test one <Katex tex="x" /> inside the region (<Katex tex="x=2" />: <Katex tex="h=2" />,{' '}
          <Katex tex="f=0" />) to see which curve is on top, and put that one first.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="e.iii"
        topic="Area Between Curves"
        marks={1}
        statement={
          <>
            Find the total area of the shaded regions in the graph above. Give your answer
            correct to two decimal places.
          </>
        }
        examinerReport={EXAM_EIII}
      >
        <WorkingTable rows={ROWS_EIII} />
        <Explore title="One shaded region and its mirror image: why the total is 2 × 1.36">
          <LobesWidget />
        </Explore>
        <WrongMethod
          title="Evaluate the integral over one region and stop"
          source="Examiner's report"
          working={<Katex display tex="\int_{\sqrt2}^{\sqrt6}\bigl(h(x)-f(x)\bigr)dx \approx 1.36" />}
        >
          That is the right-hand region only. The question asks for the <em>total</em> of both shaded regions, and the
          left-hand one is its mirror image, so the answer is twice this. Writing the 2 in front of the integral in part
          e.ii, and then typing exactly that integral into the calculator, is the safest way not to lose it.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="f"
        topic="Vertical Distance"
        marks={2}
        statement={
          <>
            Let <Katex tex="D" /> be the vertical distance between the graphs of{' '}
            <Katex tex="f" /> and <Katex tex="h" />.
            <br />
            Find all values of <Katex tex="x" /> for
            which <Katex tex="D" /> is at most 2 units. Give your answers correct to two
            decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <Background title="What the Question Is Asking">
          <p>
            Pick an <Katex tex="x" />, go straight up or down from one graph to the other, and measure: that length is the
            vertical distance <Katex tex="D" /> at that <Katex tex="x" />. It is never negative, and it is zero where the
            graphs cross. &ldquo;Find all values of <Katex tex="x" /> for which <Katex tex="D" /> is at most 2&rdquo; asks
            for the whole set of such <Katex tex="x" />-values, which here is a pair of intervals, not a list of points.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <Explore title="Where is the gap between the curves at most 2? Sweep a ruler across and see">
          <GapWidget />
        </Explore>
        <WrongMethod
          title="Solve D = 2"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="h(x)-f(x) = 2 \implies x = \pm2" />
              <Katex display tex="h(x)-f(x) = -2 \implies x \approx \pm1.08,\ \pm2.61" />
            </>
          }
        >
          These are only the places where the gap is <em>exactly</em> 2. The question asks where it is <em>at most</em> 2,
          which is whole stretches of the <Katex tex="x" />-axis. The equation also throws up <Katex tex="x=\pm2" />, which
          isn&apos;t an end of anything: the gap touches 2 there and is smaller on both sides. Solve the inequality, or test
          an <Katex tex="x" /> between each pair of solutions to see which stretches work.
        </WrongMethod>
        <WrongMethod
          title="D = h(x) − f(x), because h is on top in the shaded regions"
          working={
            <>
              <Katex display tex="h(x)-f(x) \le 2" />
              <Katex display tex="2-\tfrac12\left(x^2-4\right)^2 \le 2 \implies x\in R" />
            </>
          }
        >
          This says every <Katex tex="x" /> works, but at <Katex tex="x=0" /> the gap is <Katex tex="4-(-2)=6" />. Outside
          the shaded regions <Katex tex="f" /> is on top, so <Katex tex="h(x)-f(x)" /> is <em>negative</em> there, and a
          negative number is always less than 2: the inequality lets through gaps of any size. A distance is the size of
          the difference, <Katex tex="|h(x)-f(x)|" />, so both inequalities in <Katex tex="-2\le h(x)-f(x)\le2" /> are
          needed. Patching it by keeping only the shaded regions (<Katex tex="\sqrt2\le|x|\le\sqrt6" />) fails too: it
          drops the stretches just outside each crossing, out to <Katex tex="\pm1.08" /> and <Katex tex="\pm2.61" />, where{' '}
          <Katex tex="f" /> is on top but the gap is still under 2.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
