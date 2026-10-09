// 2023 Mathematical Methods — Exam 2, Section B Question 5 (11 marks). A catenary built from
// e^x + e^(−x): transformations, two one-to-one branches and their inverses, and a family
// version whose turning point traces a hyperbola. Question text transcribed from the original
// paper; the figure is a crop of VCAA's own artwork. Answers checked with sympy/scipy and
// against the VCAA examination report. Solution is original.
// Widgets: q5a-order (the order of reflect/translate decides where the curve lands), q5cii-halves
// (y = x halves the region; what the report's incorrect integral misses), q5d-locus (the turning
// point slides along y = 2/x), q5e-touch (first contact is h touching y = x), q5f-terminals (only
// one crossing is on y = x). Skipped: b (39%) — the lost marks were reading g1⁻¹ as g1 (the
// notation), which the working's swap line fixes; there is nothing to manipulate, and VCAA's own
// figure just before c. already shows the inverse of g1 starting at (1, 2).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2023e2-q5-graph.png'

const OrderWidget = lazyWidget(() => import('../interactives/meth-2023e2-q5a-order'))
const HalvesWidget = lazyWidget(() => import('../interactives/meth-2023e2-q5cii-halves'))
const LocusWidget = lazyWidget(() => import('../interactives/meth-2023e2-q5d-locus'))
const TouchWidget = lazyWidget(() => import('../interactives/meth-2023e2-q5e-touch'))
const TerminalsWidget = lazyWidget(() => import('../interactives/meth-2023e2-q5f-terminals'))

const EXAM_A: SAExaminerStats = {
  marks: [18, 48, 35],
  average: 1.2,
  comment: (
    <>
      This question was done reasonably well. The order of the transformations needed to be
      correct, as well as the wording. A common incorrect answer was 'reflect in the{' '}
      <Katex tex="y" />-axis and then translate 2 units to the left'.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [40, 21, 39],
  average: 1.0,
  comment: (
    <>
      Often the domain and range were reversed. Students gave the domain and range of{' '}
      <Katex tex="g_1" />, not <Katex tex="g_1^{-1}" />. Many students appeared to find the
      notation confusing.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      This question was answered well. Some students did not realise that <Katex tex="P" /> and{' '}
      <Katex tex="Q" /> were points on the line <Katex tex="y=x" /> and had different values
      for <Katex tex="x" /> and <Katex tex="y" />. Others substituted their <Katex tex="x" />{' '}
      values back into the equation to find <Katex tex="y" /> and made rounding errors.{' '}
      <Katex tex="Q(4.09,4.10)" /> was sometimes seen.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [65, 6, 29],
  average: 0.6,
  comment: (
    <>
      Some students set up the correct definite integral but did not provide an answer. Others
      did not multiply the definite integral by 2, giving 2.78 as the answer. Some used{' '}
      <Katex tex="\int_{1.27\ldots}^{4.09\ldots}\left(g_1^{-1}-g(x)\right)dx" />, which is
      incorrect. Other students had the correct answer but set up the definite integral
      incorrectly.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [87, 13],
  average: 0.1,
  comment: (
    <>
      This question was not done well. A common incorrect answer was <Katex tex="n=1" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [96, 4],
  average: 0.0,
  comment: <>This question was not done well. Many students did not attempt the question.</>,
}

const EXAM_F: SAExaminerStats = {
  marks: [86, 2, 12],
  average: 0.3,
  comment: (
    <>
      There were some good attempts at this question. Those students who set up the correct
      definite integral generally gave the correct answer. Some students had incorrect
      terminals of integration. A common incorrect terminal was <Katex tex="x=2.468" />, which
      is the <Katex tex="x" /> value of the point of intersection of the graphs of{' '}
      <Katex tex="h" /> and <Katex tex="y=x" />, not <Katex tex="h_1^{-1}" /> and{' '}
      <Katex tex="h" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \tfrac12f(2-x) = \tfrac12f\bigl(-(x-2)\bigr)" />,
    reason: <>Take the coefficient of <Katex tex="x" /> (here <Katex tex="-1" />) out of the bracket: <Katex tex="2-x=-(x-2)" />. Now the two changes to <Katex tex="x" /> can be read off separately: a minus sign (a reflection) and <Katex tex="x-2" /> (a translation).</>,
  },
  {
    working: <Katex display tex="\text{Dilation of factor } \tfrac12 \text{ from the } x\text{-axis} \implies y = \tfrac12f(x)" />,
    reason: <>The first step, given in the question.</>,
  },
  {
    working: <Katex display tex="\text{Reflection in the } y\text{-axis} \implies y = \tfrac12f(-x)" />,
    reason: <>A reflection in the <Katex tex="y" />-axis replaces <Katex tex="x" /> with <Katex tex="-x" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{Translation 2 units right}\\ \implies y = \tfrac12f\bigl(-(x-2)\bigr) = g(x)\end{gathered}" />,
    reason: <>A translation 2 units in the positive <Katex tex="x" /> direction replaces <Katex tex="x" /> with <Katex tex="x-2" />, and doing that to <Katex tex="\tfrac12f(-x)" /> gives exactly <Katex tex="g" />.</>,
    more: <>The report&rsquo;s common incorrect answer, reflect and then translate 2 units <em>left</em>, gives <Katex tex="\tfrac12f\bigl(-(x+2)\bigr)=\tfrac12f(-x-2)" /> instead, whose minimum is at <Katex tex="(-2,1)" />, not <Katex tex="(2,1)" />. The <Katex tex="+2" /> in <Katex tex="\tfrac12f(-x+2)" /> does not mean &ldquo;2 left&rdquo;: that rule only works once the coefficient of <Katex tex="x" /> is <Katex tex="+1" />, which is why the first line takes the <Katex tex="-1" /> out. A quick check: the minimum of <Katex tex="g" /> is where <Katex tex="2-x=0" />, at <Katex tex="x=2" />, so the curve has to end up on the right.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{gathered}\text{Reflection in the } y\text{-axis, then a translation}\\ \text{of 2 units in the positive } x \text{ direction}\end{gathered}}"
      />
    ),
    reason: <>Name each transformation in full, in order: both the order and the wording count.</>,
    more: <>The report also lists: translate 2 units left, then reflect in the <Katex tex="y" />-axis (<Katex tex="\tfrac12f(x+2)\to\tfrac12f(-x+2)" />); or, because <Katex tex="f" /> is even (so reflecting it in the <Katex tex="y" />-axis changes nothing), a translation of 2 units right on its own. Its general comments add that the correct wording needed to be used, such as &ldquo;reflect in the <Katex tex="y" />-axis&rdquo;.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \tfrac12\left(e^{2-x}+e^{x-2}\right)" />,
    reason: <>Writing <Katex tex="f(2-x)" /> out in full, so it can be differentiated.</>,
  },
  {
    working: <Katex display tex="g'(x) = \tfrac12\left(-e^{2-x}+e^{x-2}\right) = 0" />,
    reason: <>To split <Katex tex="g" /> into an increasing part and a decreasing part, first find where it turns.</>,
  },
  {
    working: <Katex display tex="e^{x-2}=e^{2-x} \implies x-2=2-x \implies x=2" />,
    reason: <>Two powers of <Katex tex="e" /> are equal only when their exponents are equal.</>,
  },
  {
    working: <Katex display tex="g(2) = \tfrac12\left(e^0+e^0\right) = 1 \implies \text{minimum } (2,\,1)" />,
    reason: <><Katex tex="g" /> is a transformed copy of the U-shaped <Katex tex="f" /> (part a), so this is its minimum: <Katex tex="g" /> decreases to the left of <Katex tex="x=2" /> and increases to the right.</>,
  },
  {
    working: <Katex display tex="g_1: [2,\infty)\to R, \quad \text{range } [1,\infty)" />,
    reason: <><Katex tex="g_1" /> is strictly increasing, so it is the right-hand branch. Its outputs start at the minimum value <Katex tex="g(2)=1" /> and increase without bound.</>,
    more: <>Any domain inside <Katex tex="[2,\infty)" /> would also make <Katex tex="g_1" /> strictly increasing, and the report accepted the matching domain and range of the inverse for such a choice, because the question did not ask for the maximal domain. <Katex tex="[2,\infty)" /> is the natural choice.</>,
  },
  {
    working: <Katex display tex="\boxed{g_1^{-1}: \ \text{domain } [1,\infty), \ \text{range } [2,\infty)}" />,
    reason: <>The inverse takes <Katex tex="g_1" />&rsquo;s outputs as its inputs and gives back <Katex tex="g_1" />&rsquo;s inputs, so the domain and range swap.</>,
    more: <>The question asks about <Katex tex="g_1^{-1}" />, not <Katex tex="g_1" />: the report notes students often gave the domain and range of <Katex tex="g_1" />, and many appeared to find the notation confusing. The <Katex tex="-1" /> in <Katex tex="g_1^{-1}" /> means &ldquo;the inverse function&rdquo; (the function that undoes <Katex tex="g_1" />), not a reciprocal. A check with VCAA&rsquo;s figure below: the inverse of <Katex tex="g_1" /> starts at <Katex tex="(1,2)" /> and heads up to the right, so its <Katex tex="x" />-values start at 1 and its <Katex tex="y" />-values start at 2. The report adds that either bracket type was appropriate here, as the maximal domain was not required.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="P \text{ and } Q \text{ lie on } y=x" />,
    reason: <>The question says <Katex tex="P" /> and <Katex tex="Q" /> are where <Katex tex="y=x" />, <Katex tex="g" /> and the inverses all meet. So each point has equal <Katex tex="x" />- and <Katex tex="y" />-coordinates, and it is on <Katex tex="g" />: solve <Katex tex="g(x)=x" />.</>,
  },
  {
    working: (
      <Cas fn="solve">
        solve((e^(2−x)+e^(x−2))/2 = x, x)
      </Cas>
    ),
    reason: <>One equation, two roots.</>,
  },
  {
    working: <Katex display tex="x = 1.27474\ldots \ \text{ and } \ x = 4.08519\ldots" />,
    reason: <>One on each branch of <Katex tex="g" />: <Katex tex="P" /> is the smaller.</>,
  },
  {
    working: <Katex display tex="\boxed{P(1.27,\ 1.27), \quad Q(4.09,\ 4.09)}" />,
    reason: <>The <Katex tex="y" />-coordinate equals the <Katex tex="x" />-coordinate because the points are on <Katex tex="y=x" />.</>,
    more: <>The report notes students who substituted their <Katex tex="x" /> values back into the equation to find <Katex tex="y" /> made rounding errors: <Katex tex="Q(4.09,4.10)" /> was sometimes seen. That comes from <Katex tex="g(4.09)\approx4.104" />: <Katex tex="g" /> is steep at <Katex tex="Q" /> (gradient about 4), so rounding <Katex tex="x" /> by 0.005 moves <Katex tex="y" /> by about 0.02. Copying the <Katex tex="x" />-coordinate avoids the problem entirely.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{The region is symmetric about } y=x" />,
    reason: <>Together, the inverses of <Katex tex="g_1" /> and <Katex tex="g_2" /> are the whole of <Katex tex="g" /> reflected in <Katex tex="y=x" />. So <Katex tex="y=x" /> cuts the region into two mirror-image halves of equal area.</>,
  },
  {
    working: <Katex display tex="A = 2\int_{1.27474\ldots}^{4.08519\ldots}\bigl(x-g(x)\bigr)\,dx" />,
    reason: <>The half below the line runs from <Katex tex="P" /> to <Katex tex="Q" />, with <Katex tex="y=x" /> on top and <Katex tex="g" /> underneath (at <Katex tex="x=2" />: <Katex tex="2>1" />). Double it for the whole region.</>,
    more: <>The report notes some students did not multiply by 2, giving <Katex tex="2.78" />: that is only the half below the line. It also notes <Katex tex="\int_{1.27\ldots}^{4.09\ldots}\left(g_1^{-1}-g(x)\right)dx" /> is incorrect. That integral gives about <Katex tex="5.29" />, because the region pokes out to the left of <Katex tex="P" />, back to <Katex tex="(1,2)" /> where the two inverses join, and there its lower edge is the inverse of <Katex tex="g_2" />, not <Katex tex="g" />. Without the symmetry you would need that integral plus <Katex tex="\int_{1}^{1.27\ldots}\left(g_1^{-1}-g_2^{-1}\right)dx\approx0.27" /> for the sliver left of <Katex tex="P" /> (<Katex tex="5.29+0.27=5.56" />), and both inverse rules; doubling the half avoids all of that.</>,
  },
  {
    working: (
      <Cas fn="nInt">
        2·nInt(x − (e^(2−x)+e^(x−2))/2, x, 1.27474, 4.08519)
      </Cas>
    ),
    reason: <>Use the unrounded terminals from part c.i.</>,
    more: <>The report notes some students set up the correct integral but did not give an answer, and others had the correct answer from an incorrectly set-up integral. Both the integral and its value matter: write the integral as it should be, then evaluate it.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx 5.56 \ \text{square units}}" />,
    reason: <>Two decimal places.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = \tfrac1kf(k-x) = \tfrac1k\left(e^{k-x}+e^{x-k}\right)" />,
    reason: <>The same shape as <Katex tex="g" />, with <Katex tex="k" /> in place of 2, both inside and in the dilation factor.</>,
  },
  {
    working: <Katex display tex="h'(x) = \tfrac1k\left(-e^{k-x}+e^{x-k}\right) = 0 \implies x = k" />,
    reason: <>As in part b: <Katex tex="e^{x-k}=e^{k-x}" /> only when <Katex tex="x-k=k-x" />.</>,
  },
  {
    working: <Katex display tex="h(k) = \tfrac1k\left(e^0+e^0\right) = \frac2k \implies \text{turning point } \left(k,\ \tfrac2k\right)" />,
    reason: <>Substitute <Katex tex="x=k" />. &ldquo;Always lies on&rdquo; means for every value of <Katex tex="k" />, so keep <Katex tex="k" /> as a letter.</>,
    more: <>Don&rsquo;t test a single value of <Katex tex="k" />: at <Katex tex="k=1" /> the turning point is <Katex tex="(1,2)" />, and <Katex tex="2\times1^n=2" /> for every <Katex tex="n" />, so that value can&rsquo;t tell you anything.</>,
  },
  {
    working: <Katex display tex="x=k,\ \ y=\frac2k \implies y=\frac2x=2x^{-1}" />,
    reason: <>The turning point&rsquo;s <Katex tex="x" />-coordinate is <Katex tex="k" />, so replace <Katex tex="k" /> with <Katex tex="x" /> in its <Katex tex="y" />-coordinate. Compare with <Katex tex="y=2x^n" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = -1}" />,
    reason: <>The turning points lie on the hyperbola <Katex tex="y=\tfrac2x" />.</>,
    more: <>The report notes <Katex tex="n=1" /> was a common incorrect answer. That is the line <Katex tex="y=2x" />, which passes through the turning point <Katex tex="\left(k,\tfrac2k\right)" /> only when <Katex tex="2k=\tfrac2k" />, that is, only when <Katex tex="k=1" />. A check with another value: <Katex tex="k=2" /> gives the turning point <Katex tex="(2,1)" />, and <Katex tex="2\times2^{-1}=1" /> but <Katex tex="2\times2^{1}=4" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{For small } k\text{, } h(x) > x \text{ for all } x" />,
    reason: <>Start by picturing small <Katex tex="k" />. The lowest point of <Katex tex="h" /> is <Katex tex="\left(k,\tfrac2k\right)" /> (part d), which for small <Katex tex="k" /> is far above the line (<Katex tex="k=0.5" /> gives <Katex tex="(0.5,4)" />), and the U-shaped curve climbs steeply away from it, so the whole curve sits above <Katex tex="y=x" />.</>,
    more: <>Moving left from the minimum, <Katex tex="h" /> rises while the line falls; moving right, <Katex tex="e^{x-k}" /> soon grows much faster than the line, so for small <Katex tex="k" /> no part of the curve reaches it. Try <Katex tex="k=1" />: the minimum <Katex tex="(1,2)" /> is already above the line, and the closest the curve gets is about 0.75 above it (where <Katex tex="h'(x)=1" />). The report notes many students did not attempt this part; picturing what the graphs do as <Katex tex="k" /> changes is the way in.</>,
  },
  {
    working: <Katex display tex="\implies h_1^{-1}(x) < x \text{ for all } x \text{ in its domain}" />,
    reason: <>The inverse of <Katex tex="h_1" /> is part of <Katex tex="h" /> reflected in <Katex tex="y=x" />, so it sits entirely below the line. One graph above <Katex tex="y=x" /> and the other below cannot meet.</>,
  },
  {
    working: <Katex display tex="\text{First contact: } h(x) = x \ \text{ and } \ h'(x) = 1" />,
    reason: <>As <Katex tex="k" /> increases, the gap between <Katex tex="h" /> and <Katex tex="y=x" /> shrinks until <Katex tex="h" /> just touches the line. Touching means the curve and the line share a point and a gradient, and the line&rsquo;s gradient is 1.</>,
    more: <>So the first chance for the graphs to meet is when <Katex tex="h" /> reaches the line. Every larger <Katex tex="k" /> pushes <Katex tex="h" /> across it, and <Katex tex="h" /> then crosses back up through <Katex tex="y=x" /> on its right branch, a point the inverse also passes through. So the smallest <Katex tex="k" /> is the touching value.</>,
  },
  {
    working: (
      <Cas fn="solve">
        solve((e^(k−x)+e^(x−k))/k = x and (−e^(k−x)+e^(x−k))/k = 1, {'{'}x,k{'}'}) | k&gt;0
      </Cas>
    ),
    reason: <>Two equations, two unknowns. The second is <Katex tex="h'(x)=1" />, using the derivative from part d.</>,
  },
  {
    working: <Katex display tex="k = 1.26873\ldots, \quad x = 1.86680\ldots" />,
    reason: <>Check the touching point is on <Katex tex="h_1" />: <Katex tex="x\approx1.87\ge k\approx1.27" />. A point on <Katex tex="y=x" /> is its own reflection, so the inverse of <Katex tex="h_1" /> passes through it too: the graphs meet there for the first time.</>,
    more: <>The check matters because the inverse is of <Katex tex="h_1" />, the right-hand branch only (<Katex tex="x\ge k" />). A touching point on <Katex tex="h" />&rsquo;s left branch would not be on <Katex tex="h_1" />, so its reflection would not be on the inverse.</>,
  },
  {
    working: <Katex display tex="\boxed{k \approx 1.27}" />,
    reason: <>Two decimal places.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="k=5: \quad h(x) = \tfrac15\left(e^{5-x}+e^{x-5}\right)" />,
    reason: <>Substituting <Katex tex="k=5" /> into <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="h_1^{-1}(x) = \log_e\!\left(\tfrac52x+\tfrac12\sqrt{25x^2-4}\right)+5" />,
    reason: <>Substituting <Katex tex="k=5" /> into the given inverse rule. Its domain is the range of <Katex tex="h_1" />, <Katex tex="\left[\tfrac25,\infty\right)" />.</>,
  },
  {
    working: <Katex display tex="h(x) = h_1^{-1}(x)" />,
    reason: <>The region is bounded by <Katex tex="h" /> and the inverse of <Katex tex="h_1" />, so its terminals are where these two graphs meet. Solve this directly, not <Katex tex="h(x)=x" />: only <Katex tex="h" />&rsquo;s right branch <Katex tex="h_1" /> was inverted, so <Katex tex="h" />&rsquo;s left branch can meet the inverse away from <Katex tex="y=x" />.</>,
    more: <>The report notes a common incorrect terminal was where <Katex tex="h" /> meets <Katex tex="y=x" /> (it prints <Katex tex="x=2.468" />; solving <Katex tex="h(x)=x" /> gives <Katex tex="x=2.486\ldots" />).</>,
  },
  {
    working: (
      <Cas fn="solve">
        solve((e^(5−x)+e^(x−5))/5 = ln(5x/2+√(25x²−4)/2)+5, x)
      </Cas>
    ),
    reason: <>Two roots.</>,
  },
  {
    working: <Katex display tex="x = 1.45091\ldots \ \text{ and } \ x = 8.78157\ldots" />,
    reason: <>The terminals of the enclosed region.</>,
    more: <>The right one is on <Katex tex="y=x" />, where <Katex tex="h_1" /> meets its own inverse; the left one is not: <Katex tex="h(1.45091\ldots)\approx6.96" />. Solving <Katex tex="h(x)=x" /> would give the right terminal but the wrong left one, <Katex tex="2.486\ldots" />, cutting off the part of the region between <Katex tex="x\approx1.45" /> and <Katex tex="x\approx2.49" /> (the area would come out as about 40.89).</>,
  },
  {
    working: (
      <Cas fn="nInt">
        nInt(h₁⁻¹(x) − h(x), x, 1.45091, 8.78157)
      </Cas>
    ),
    reason: <>Define <Katex tex="h" /> and <Katex tex="h_1^{-1}" /> (with <Katex tex="k=5" />) on CAS first. The inverse is the top curve between the terminals: at <Katex tex="x=5" />, <Katex tex="h=0.4" /> while <Katex tex="h_1^{-1}\approx8.22" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx 43.91 \ \text{square units}}" />,
    reason: <>Two decimal places.</>,
  },
]

export default function MethodsQ5_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (11 marks)</p>
        <p>
          Let <Katex tex="f:R\to R" />,{' '}
          <Katex tex="f(x)=e^x+e^{-x}" /> and{' '}
          <Katex tex="g:R\to R" />,{' '}
          <Katex tex="g(x)=\tfrac12f(2-x)" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              <Katex tex="f(x)=e^x+e^{-x}" /> is an <em>even</em> function (
              <Katex tex="f(-x)=f(x)" />): a catenary, symmetric about the <Katex tex="y" />-axis,
              with minimum <Katex tex="(0,2)" />. So every part of this question is about a
              U-shaped curve with one turning point and two branches: one strictly decreasing,
              one strictly increasing.
            </p>
            <p>
              The graph of an inverse is the original graph reflected in <Katex tex="y=x" />, so
              any point of the graph that lies on <Katex tex="y=x" /> is on the inverse too: part
              e. relies on this. A strictly increasing function can meet its own inverse only on
              that line.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Transformations"
        marks={2}
        statement={
          <>
            <div className="flex flex-col gap-2">
              <p>
                Complete a possible sequence of transformations to map <Katex tex="f" /> to{' '}
                <Katex tex="g" />.
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-1">
                <li>
                  Dilation of factor <Katex tex="\tfrac12" /> from the <Katex tex="x" /> axis.
                </li>
                <li>______________________</li>
                <li>______________________</li>
              </ul>
            </div>
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <Explore title="The order decides where the curve lands">
          <OrderWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Two functions <Katex tex="g_1" /> and <Katex tex="g_2" /> are created, both with the
          same rule as <Katex tex="g" /> but with distinct domains, such that{' '}
          <Katex tex="g_1" /> is strictly increasing and <Katex tex="g_2" /> is strictly
          decreasing.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Inverse Function"
        marks={2}
        statement={
          <>Give the domain and range for the inverse of <Katex tex="g_1" />.</>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Shown below is the graph of <Katex tex="g" />, the inverses of <Katex tex="g_1" />{' '}
          and <Katex tex="g_2" />, and the line <Katex tex="y=x" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A U-shaped curve g with the reflections of its two branches in the dotted line y = x: the inverse of g1 arcing up to the right and the inverse of g2 falling away below, meeting g at P and Q on the line y = x — from the original 2023 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
        <p>
          The intersection points between the graphs of <Katex tex="y=x" />,{' '}
          <Katex tex="y=g(x)" /> and the inverses of <Katex tex="g_1" /> and <Katex tex="g_2" />,
          are labelled <Katex tex="P" /> and <Katex tex="Q" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Intersections"
        marks={1}
        statement={
          <>
            Find the coordinates of <Katex tex="P" /> and <Katex tex="Q" />, correct to two
            decimal places.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Find the area of the region bound by the graphs of <Katex tex="g" />, the inverse
            of <Katex tex="g_1" /> and the inverse of <Katex tex="g_2" />.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
        <Explore title="The line y = x cuts the region into two equal halves">
          <HalvesWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          Let <Katex tex="h:R\to R" />,{' '}
          <Katex tex="h(x)=\tfrac1kf(k-x)" />, where <Katex tex="k\in(0,\infty)" />.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Turning Point"
        marks={1}
        statement={
          <>
            The turning point of <Katex tex="h" /> always lies on the graph of the function{' '}
            <Katex tex="y=2x^n" />, where <Katex tex="n" /> is an integer.
            <br />
            Find the value of <Katex tex="n" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="The turning point slides along y = 2/x">
          <LocusWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          Let <Katex tex="h_1:[k,\infty)\to R" />,{' '}
          <Katex tex="h_1(x)=h(x)" />.
          <br />
          The rule for the <b>inverse</b> of <Katex tex="h_1" /> is{' '}
          <Katex tex="y=\log_e\!\left(\dfrac k2x+\dfrac12\sqrt{k^2x^2-4}\right)+k" />
        </p>
      </div>

      <PartCard
        letter="e"
        topic="Intersections"
        marks={1}
        statement={
          <>
            What is the smallest value of <Katex tex="k" /> such that <Katex tex="h" /> will
            intersect with the inverse of <Katex tex="h_1" />?
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
        <Explore title="The first meeting is h just touching y = x">
          <TouchWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          It is possible for the graphs of <Katex tex="h" /> and the inverse of{' '}
          <Katex tex="h_1" /> to intersect twice. This occurs when <Katex tex="k=5" />.
        </p>
      </div>

      <PartCard
        letter="f"
        topic="Area Between Curves"
        marks={2}
        statement={
          <>
            Find the area of the region bound by the graphs of <Katex tex="h" /> and the inverse
            of <Katex tex="h_1" />, when <Katex tex="k=5" />.
            <br />
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
        <Explore title="Only one of the two crossings is on y = x">
          <TerminalsWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
