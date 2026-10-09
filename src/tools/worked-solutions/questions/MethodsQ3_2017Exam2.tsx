// 2017 Mathematical Methods — Exam 2, Section B, Question 3 (19 marks).
// A triangular probability density function for homework time, then a binomial layered on
// top of it, ending with maximising a polynomial in p. Question text transcribed from the
// original paper. The blank axes in part a.'s stem are cropped from the original VCAA exam PDF
// (meth-2017e2-q3a-axes.png, 300 dpi); VCAA printed no curve on them, so the answer sketch is
// this site's own matplotlib figure (meth-2017e2-q3a-density.png). Answers verified with sympy
// and scipy, and cross-checked against the VCAA examination report, itute and two tutor
// videos (LMK Maths, NBEASTK Education): all agree. Forms differ only in part f.: VCAA writes
// 7p²(p − 1)⁴(2p + 3) and itute expands to 14p⁷ − 35p⁶ + 70p⁴ − 70p³ + 21p², both equivalent
// to ours. Every wrong method shown was computed and gives the stated wrong answer (b. split
// at 44 → 501/625; c. ÷ 4/5 → 1/40; d. → 50.6351; e.i. ≥ 3 → 0.3987; e.ii. → 0.5605 and
// 0.7625; g.ii. → 43 and 41). Solution is original.
// Interactive diagrams (§15): b. drags the ends of an interval under the density, split at the
// peak, with a "whole triangle minus the corners" view (interactives/meth-2017e2-q3b-area.tsx);
// c. shows the conditional probability as the event's share of the given area, with the 1/40
// slip (meth-2017e2-q3c-given.tsx); d. slides a until the right-hand area is 0.7, with the
// report's 50.6351 as its mirror image (meth-2017e2-q3d-quantile.tsx); e.ii. picks binomial bars
// for the conditional, with the > slip (meth-2017e2-q3eii-given.tsx); f. steps through the 21
// arrangements and the Bi(7, p) bars (meth-2017e2-q3f-arrangements.tsx); g.i. slides a tangent
// along q(p) to its flat top (meth-2017e2-q3gi-max.tsx); g.ii. links d → p → q on two graphs,
// with the report's two wrong values of d (meth-2017e2-q3gii-chain.tsx).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import axesSrc from './meth-2017e2-q3a-axes.png'
import densitySrc from './meth-2017e2-q3a-density.png'

const AreaWidget = lazyWidget(() => import('../interactives/meth-2017e2-q3b-area'))
const GivenAreaWidget = lazyWidget(() => import('../interactives/meth-2017e2-q3c-given'))
const QuantileWidget = lazyWidget(() => import('../interactives/meth-2017e2-q3d-quantile'))
const GivenBarsWidget = lazyWidget(() => import('../interactives/meth-2017e2-q3eii-given'))
const ArrangementsWidget = lazyWidget(() => import('../interactives/meth-2017e2-q3f-arrangements'))
const MaxWidget = lazyWidget(() => import('../interactives/meth-2017e2-q3gi-max'))
const ChainWidget = lazyWidget(() => import('../interactives/meth-2017e2-q3gii-chain'))

const EXAM_A: SAExaminerStats = {
  marks: [15, 12, 44, 29],
  average: 1.9,
  comment: (
    <>
      Many students did not draw their graphs along the <Katex tex="t" />-axis, ignoring{' '}
      <Katex tex="f(t)=0" />. Some had an open circle at <Katex tex="(45,0.04)" />. Others had
      an open circle over a closed circle at <Katex tex="(45,0.04)" />. Many students did not
      use rulers to draw the line segments. Some graphs looked like parabolas.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [24, 6, 70],
  average: 1.5,
  comment: (
    <>
      This question was answered well. Some students had the incorrect terminals.{' '}
      <Katex tex="44" /> instead of <Katex tex="45" /> was occasionally given, for example,{' '}
      <Katex tex="\int_{25}^{44}\bigl(f(t)\bigr)dt+\int_{44}^{55}\bigl(f(t)\bigr)dt" />. Others used{' '}
      <Katex tex="20" /> as the lower limit instead of <Katex tex="25" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [21, 30, 49],
  average: 1.3,
  comment: (
    <>
      Many students were able to use the conditional probability formula. A common incorrect
      answer was <Katex tex="\tfrac{1}{40}" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [59, 11, 30],
  average: 0.7,
  comment: (
    <>
      A number of correct approaches were used. <Katex tex="\int_{20}^a f(t)\,dt=0.7" />,{' '}
      <Katex tex="a=50.6351" /> was a common incorrect answer.{' '}
      <Katex tex="\int_a^{75}\tfrac{1}{625}(70-t)\,dt=0.7" /> was occasionally given. Some students
      attempted to use the inverse normal as a method.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [26, 16, 58],
  average: 1.3,
  comment: (
    <>
      Many students recognised that the distribution was binomial and gave the correct{' '}
      <Katex tex="n" /> and <Katex tex="p" /> values. Some used{' '}
      <Katex tex="\Pr(X\ge3)" />.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [31, 11, 59],
  average: 1.3,
  comment: (
    <>
      Many students were able to set up the conditional probability. Some wrote{' '}
      <Katex tex="\Pr(X\ge2\mid X\ge1)=\tfrac{\Pr(X>2)}{\Pr(X>1)}" />. Others rounded
      incorrectly, giving <Katex tex="0.7625" /> as the answer.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [60, 8, 32],
  average: 0.7,
  comment: (
    <>
      Of those who attempted this question, some students did not realise that the binomial
      distribution was required.
    </>
  ),
}

const EXAM_GI: SAExaminerStats = {
  marks: [64, 13, 23],
  average: 0.6,
  comment: (
    <>
      Some students knew to solve <Katex tex="q'(p)=0" /> if they had an equation in Question
      3f. Others found only <Katex tex="p" />. Some gave exact values for their answers.
    </>
  ),
}

const EXAM_GII: SAExaminerStats = {
  marks: [91, 3, 7],
  average: 0.2,
  comment: (
    <>
      Some students used <Katex tex="q" /> instead of <Katex tex="p" /> in their equation,
      solving <Katex tex="\int_d^{70}f(t)\,dt=0.56646\ldots" /> for <Katex tex="d" />. Others
      solved <Katex tex="\int_{20}^{d}f(t)\,dt=0.35388\ldots" />, obtaining{' '}
      <Katex tex="d=41" /> minutes.
    </>
  ),
}

// Part a.'s answer: this site's own matplotlib sketch on a copy of VCAA's grid.
function DensitySketch() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <img
        src={densitySrc}
        alt="Our sketch of the density function: zero along the t-axis up to t = 20, a straight line rising from (20, 0) to a peak at (45, 1/25), a straight line falling back to (70, 0), then zero along the axis again"
        className="w-full max-w-[420px]"
      />
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} f(20)&=\tfrac{1}{625}(20-20)=0\\ f(70)&=\tfrac{1}{625}(70-70)=0 \end{aligned}" />,
    reason: <>Each rule is a constant times <Katex tex="(t-20)" /> or <Katex tex="(70-t)" />, so each piece of the graph is a <em>straight line</em>. A straight line is fixed by its two ends, so find them and join them with a ruler. The report notes many students did not use rulers, and some graphs looked like parabolas.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \tfrac{1}{625}(45-20)&=\tfrac{25}{625}=\tfrac{1}{25}\\ \tfrac{1}{625}(70-45)&=\tfrac{25}{625}=\tfrac{1}{25} \end{aligned}" />,
    reason: <>Both rules give <Katex tex="\tfrac1{25}" /> at <Katex tex="t=45" />, so the two lines meet at the peak <Katex tex="\left(45,\tfrac1{25}\right)" />, exactly on the top gridline VCAA printed. It is one unbroken graph: a single closed point at the peak, with no open circle. The report notes some drew an open circle, or an open circle over a closed circle, at <Katex tex="(45,0.04)" />.</>,
  },
  {
    working: <Katex display tex="f(t)=0 \text{ for } t<20 \text{ and } t>70" />,
    reason: <>&ldquo;0 elsewhere&rdquo; is part of the function too, so the graph runs <em>along the <Katex tex="t" />-axis</em> on both sides of the triangle: it says she never spends less than 20 or more than 70 minutes. The report notes many students did not draw it.</>,
  },
  {
    working: <Katex display tex="\tfrac12\times50\times\tfrac{1}{25}=1 \ \checkmark" />,
    reason: <>A check: the triangle has base <Katex tex="70-20=50" /> and height <Katex tex="\tfrac1{25}" />, so its area is <Katex tex="1" />, as the total area under any probability density function must be.</>,
  },
  {
    working: <DensitySketch />,
    reason: <>The finished sketch: along the axis to <Katex tex="(20,0)" />, a ruled line up to <Katex tex="\left(45,\tfrac1{25}\right)" />, a ruled line down to <Katex tex="(70,0)" />, then along the axis again. Every probability in parts b.–d. is an area under this triangle.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(25\le T\le55)=\int_{25}^{55}f(t)\,dt" />,
    reason: <>For a continuous random variable, a probability is the <em>area under the density</em> between the two values.</>,
    more: <>Drag the ends of the interval in the diagram below to see it.</>,
  },
  {
    working: <Katex display tex="=\int_{25}^{45}\frac{t-20}{625}\,dt+\int_{45}^{55}\frac{70-t}{625}\,dt" />,
    reason: <>The interval crosses <Katex tex="t=45" />, where the rule for <Katex tex="f" /> changes, so split there: the first rule up to 45 and the second from 45. Split at exactly 45, because <Katex tex="t" /> is continuous, so <Katex tex="20\le t<45" /> runs right up to 45, not 44 (the report notes 44 was occasionally given). The lower terminal is the question&apos;s 25, not the 20 where the density starts (the report notes some used 20).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}=\;&\frac{1}{625}\left[\frac{(t-20)^2}{2}\right]_{25}^{45}\\ &+\frac{1}{625}\left[-\frac{(70-t)^2}{2}\right]_{45}^{55}\end{aligned}" />,
    reason: <>Antidifferentiating each linear piece with its bracket kept whole. The minus sign on the second is there because the derivative of <Katex tex="\tfrac{(70-t)^2}{2}" /> is <Katex tex="-(70-t)" /> (chain rule).</>,
  },
  {
    working: <Katex display tex="=\frac{1}{625}\cdot\frac{25^2-5^2}{2}+\frac{1}{625}\cdot\frac{25^2-15^2}{2}" />,
    reason: <>Substituting the terminals: <Katex tex="t-20" /> is 25 and 5 at the ends of the first integral, and <Katex tex="70-t" /> is 15 and 25 at the ends of the second.</>,
  },
  {
    working: <Katex display tex="=\frac{300}{625}+\frac{200}{625}=\frac{500}{625}" />,
    reason: <>Adding.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac45}" />,
    reason: <>A check by geometry, since both pieces are straight: the whole triangle has area 1, and the two corners left out are triangles of area <Katex tex="\tfrac12\times5\times\tfrac{5}{625}=0.02" /> (left of 25) and <Katex tex="\tfrac12\times15\times\tfrac{15}{625}=0.18" /> (right of 55), so the area is <Katex tex="1-0.02-0.18=0.8" /> ✓.</>,
    more: <>The diagram&apos;s &ldquo;corners&rdquo; toggle shows this.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\Pr(T\le25\mid T\le55)\\ &=\frac{\Pr(T\le25\,\cap\,T\le55)}{\Pr(T\le55)}\end{aligned}" />,
    reason: <>The conditional probability formula. Being told <Katex tex="T\le55" /> means only the part of the triangle left of 55 is still possible, so that area becomes the whole we divide by.</>,
  },
  {
    working: <Katex display tex="=\frac{\Pr(T\le25)}{\Pr(T\le55)}" />,
    reason: <>A time of at most 25 minutes is automatically at most 55 minutes, so &ldquo;both&rdquo; is just <Katex tex="T\le25" />. On a number line, the interval up to 25 sits inside the interval up to 55.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(T\le25)&=\int_{20}^{25}\frac{t-20}{625}\,dt\\ &=\frac{1}{625}\left[\frac{(t-20)^2}{2}\right]_{20}^{25}\\ &=\frac{25}{1250}=\frac{1}{50}\end{aligned}" />,
    reason: <>Only the rising branch is involved, and the density is zero below 20, so the lower terminal is 20. As a triangle: <Katex tex="\tfrac12\times5\times\tfrac5{625}=\tfrac1{50}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr(T\le55)\\ &=\int_{20}^{45}f(t)\,dt+\int_{45}^{55}f(t)\,dt\\ &=\frac12+\frac{200}{625}=\frac{41}{50}\end{aligned}" />,
    reason: <>The first branch is exactly half the triangle, by symmetry, and the second piece was found in part b. This denominator starts at 20, not 25: the condition <Katex tex="T\le55" /> rules out only the times above 55.</>,
  },
  {
    working: <Katex display tex="\frac{1/50}{41/50}" />,
    reason: <>The fiftieths cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{1}{41}}" />,
    reason: <>Small, as it should be: <Katex tex="T\le25" /> is a thin sliver at the far left of the triangle, about 2.4% of the area left of 55. The report&apos;s common wrong answer <Katex tex="\tfrac1{40}" /> is what you get by dividing by part b.&apos;s <Katex tex="\tfrac45" /> instead.</>,
    more: <>See the Common Mistake below.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T\ge a)=0.7" />,
    reason: <>Picture it first: <Katex tex="\Pr(T\ge a)" /> is the area to the <em>right</em> of <Katex tex="a" />. The peak at 45 splits the area in half, so for 70% of it to be on the right, <Katex tex="a" /> must be <em>left</em> of 45. <Katex tex="T" /> is not normal (its density is a triangle), so the inverse normal is no use here; the report notes some students attempted it.</>,
  },
  {
    working: <Katex display tex="\iff \Pr(T\le a)=0.3" />,
    reason: <>Switch to the left tail. The region left of <Katex tex="a" /> is one triangle on the rising branch, so one integral does it; the region right of <Katex tex="a" /> has a corner at the peak and would need two.</>,
  },
  {
    working: <Katex display tex="\int_{20}^{a}\frac{t-20}{625}\,dt=0.3" />,
    reason: <>Only the rising rule, which is valid as long as the answer turns out to be below 45.</>,
  },
  {
    working: <Katex display tex="\frac{(a-20)^2}{1250}=0.3" />,
    reason: <>Evaluating <Katex tex="\tfrac1{625}\left[\tfrac{(t-20)^2}{2}\right]_{20}^{a}" />. It is also the triangle&apos;s area, <Katex tex="\tfrac12\times\text{base}\times\text{height}=\tfrac12(a-20)\times\tfrac{a-20}{625}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&(a-20)^2=375\\ &\implies a=20+\sqrt{375}=20+5\sqrt{15}\end{aligned}" />,
    reason: <>Take the positive root, since <Katex tex="a" /> is a time above 20. The other root, <Katex tex="20-5\sqrt{15}\approx0.64" />, is where the density is zero, so it is rejected.</>,
  },
  {
    working: <Katex display tex="\boxed{a\approx39.3649}" />,
    reason: <>Four decimal places. It is below 45, as the picture said it must be, so using only the rising rule was valid ✓. The report&apos;s common wrong answer, <Katex tex="50.6351" />, comes from solving <Katex tex="\int_{20}^{a}f(t)\,dt=0.7" />; it is the mirror image of this answer in <Katex tex="t=45" />.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\mathrm{Bi}\!\left(7,\tfrac{8}{25}\right)" />,
    reason: <>Let <Katex tex="X" /> be the number of the seven days with more than 50 minutes. Each day is one trial with two outcomes, the probability <Katex tex="\tfrac8{25}" /> is the same every day, and the days are independent (the question says so): the conditions for a binomial. The question hands you the probability, so there is nothing to integrate.</>,
  },
  {
    working: <Katex display tex="\Pr(X>3)=\Pr(X\ge4)" />,
    reason: <><Katex tex="X" /> counts days, so it only takes whole numbers: &ldquo;more than three&rdquo; means 4, 5, 6 or 7. The report notes some students used <Katex tex="\Pr(X\ge3)" />.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(7, 8/25, 4, 7)</Cas>,
    reason: <>binomCdf includes both bounds, so the lower bound is 4, not 3.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.1534}" />,
    reason: <>Four decimal places. Plausible: the expected number of such days is <Katex tex="7\times0.32=2.24" />, so four or more is on the unlikely side but far from rare.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\Pr(X\ge2\mid X\ge1)\\ &=\frac{\Pr(X\ge2\,\cap\,X\ge1)}{\Pr(X\ge1)}\\ &=\frac{\Pr(X\ge2)}{\Pr(X\ge1)}\end{aligned}" />,
    reason: <>At least two days is automatically at least one, so &ldquo;both&rdquo; is just <Katex tex="X\ge2" />. &ldquo;At least two&rdquo; <em>includes</em> two: it is <Katex tex="X\ge2" />, not <Katex tex="X>2" /> (the report notes some wrote <Katex tex="\tfrac{\Pr(X>2)}{\Pr(X>1)}" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(X\ge1)&=1-\Pr(X=0)\\ &=1-\left(\tfrac{17}{25}\right)^7\approx0.93277\end{aligned}" />,
    reason: <>The complement is quicker: the only way to miss &ldquo;at least one&rdquo; is for all seven days to be 50 minutes or less, each with probability <Katex tex="1-\tfrac8{25}=\tfrac{17}{25}" />.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(7, 8/25, 2, 7)</Cas>,
    reason: <><Katex tex="\Pr(X\ge2)\approx0.71131" />: the bars from 2 to 7 inclusive.</>,
  },
  {
    working: <Katex display tex="\frac{0.71131\ldots}{0.93277\ldots}" />,
    reason: <>Divide the unrounded values. The report notes some rounded incorrectly, giving <Katex tex="0.7625" />. That is what <Katex tex="0.7113\div0.9328=0.76254\ldots" /> gives, and it is also what you get by chopping <Katex tex="0.76257\ldots" /> off after four places instead of rounding it up.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.7626}" />,
    reason: <>Four decimal places. Bigger than <Katex tex="\Pr(X\ge2)\approx0.7113" /> on its own, as it should be: knowing she had at least one long day makes &ldquo;at least two&rdquo; more likely.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="Y\sim\mathrm{Bi}(7,p)" />,
    reason: <>Let <Katex tex="Y" /> be the number of the seven days with more than <Katex tex="d" /> minutes. It is the same set-up as part e., with &ldquo;50&rdquo; replaced by <Katex tex="d" />: 7 independent days, each a success with the same probability <Katex tex="p" />. So <Katex tex="Y" /> is binomial, and every probability about it comes from the binomial formula. The report notes some students did not realise the binomial distribution was required.</>,
  },
  {
    working: <Katex display tex="q=\Pr(Y=2)+\Pr(Y=3)" />,
    reason: <>&ldquo;Two or three days&rdquo; is two outcomes that can&apos;t happen together, so add their probabilities. Read it exactly: 2 or 3, not 3 or 4, and not &ldquo;2 or more&rdquo;.</>,
  },
  {
    working: <Katex display tex="=\binom{7}{2}p^2(1-p)^5+\binom{7}{3}p^3(1-p)^4" />,
    reason: <>The binomial formula <Katex tex="\Pr(Y=k)=\binom{n}{k}p^k(1-p)^{n-k}" />, twice. For two days: <Katex tex="p^2" /> for the two long days, <Katex tex="(1-p)^5" /> for the other five, and <Katex tex="\binom72" /> ways to choose which two days they are.</>,
    more: <>Step through the arrangements in the diagram below.</>,
  },
  {
    working: <Katex display tex="=21p^2(1-p)^5+35p^3(1-p)^4" />,
    reason: <><Katex tex="\binom72=\tfrac{7\times6}{2}=21" /> and <Katex tex="\binom73=\tfrac{7\times6\times5}{6}=35" />.</>,
  },
  {
    working: <Katex display tex="=7p^2(1-p)^4\bigl(3(1-p)+5p\bigr)" />,
    reason: <>Optional, but it makes part g.i. much tidier: take out the common factor <Katex tex="7p^2(1-p)^4" /> (<Katex tex="21=7\times3" />, <Katex tex="35=7\times5" />).</>,
  },
  {
    working: <Katex display tex="\boxed{q=7p^2(1-p)^4(2p+3)}" />,
    reason: <>Any equivalent polynomial earns the marks: the unfactorised line above, this, or expanded, <Katex tex="14p^7-35p^6+70p^4-70p^3+21p^2" />. VCAA writes <Katex tex="7p^2(p-1)^4(2p+3)" />, the same thing because <Katex tex="(p-1)^4=(1-p)^4" />. Check with part e.: at <Katex tex="p=\tfrac8{25}" /> this gives <Katex tex="q\approx0.558" />, a sensible probability.</>,
  },
]

const ROWS_GI: WorkingRow[] = [
  {
    working: <Katex display tex="q(0)=0,\qquad q(1)=0" />,
    reason: <>Where to look: with <Katex tex="p=0" /> she never works more than <Katex tex="d" /> minutes and with <Katex tex="p=1" /> she always does, so either way exactly 2 or 3 days is impossible. <Katex tex="q" /> rises from 0 and falls back to 0, so its maximum is at a stationary point inside <Katex tex="(0,1)" />, where the tangent is flat. The report notes some students knew to solve <Katex tex="q'(p)=0" /> if they had an equation in part f.</>,
    more: <>Slide <Katex tex="p" /> in the diagram below.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}q'(p)=7\bigl[&2p(1-p)^4(2p+3)\\ &-4p^2(1-p)^3(2p+3)\\ &+2p^2(1-p)^4\bigr]\end{aligned}" />,
    reason: <>Differentiating the factorised form from part f. with the product rule: three factors, so three terms, each with one factor differentiated. The middle term&apos;s minus sign comes from the chain rule on <Katex tex="(1-p)^4" />.</>,
  },
  {
    working: <Katex display tex="=7p(1-p)^3\bigl[-14p^2-12p+6\bigr]" />,
    reason: <>Taking out the common factor <Katex tex="7p(1-p)^3" /> and expanding what is left in the bracket.</>,
  },
  {
    working: <Katex display tex="=-14p(1-p)^3(7p^2+6p-3)" />,
    reason: <>Taking <Katex tex="-2" /> out of the bracket. A CAS derivative followed by factor gives the same.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&q'(p)=0,\ 0<p<1\\ &\implies 7p^2+6p-3=0\end{aligned}" />,
    reason: <>The factors <Katex tex="p" /> and <Katex tex="(1-p)^3" /> are zero only at the ends, where <Katex tex="q=0" /> is the minimum. Inside <Katex tex="(0,1)" /> only the quadratic can be zero.</>,
  },
  {
    working: <Katex display tex="p=\frac{-6\pm\sqrt{36+84}}{14}=\frac{-3\pm\sqrt{30}}{7}" />,
    reason: <>The quadratic formula, with <Katex tex="\sqrt{120}=2\sqrt{30}" />.</>,
  },
  {
    working: <Katex display tex="p=\frac{\sqrt{30}-3}{7}=0.353889\ldots" />,
    reason: <>Reject <Katex tex="\tfrac{-3-\sqrt{30}}{7}\approx-1.21" />: a probability can&apos;t be negative. On CAS in one step: <Cas fn="solve">solve(d/dp(q(p)) = 0, p) | 0 &lt; p &lt; 1</Cas> after defining <Katex tex="q(p)" />, or <Cas fn="fMax">fMax(q(p), p) | 0 ≤ p ≤ 1</Cas>.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}q_{\max}&=q(0.353889\ldots)\\ &=0.566466\ldots\end{aligned}" />,
    reason: <>Substitute the unrounded <Katex tex="p" /> back in: the question asks for the maximum value of <Katex tex="q" /> as well. The report notes some students found only <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p\approx0.3539,\quad q_{\max}\approx0.5665}" />,
    reason: <>Both correct to four decimal places, as asked; the report notes some gave exact values. Sensible: at <Katex tex="p\approx0.354" /> the expected number of long days is <Katex tex="7\times0.354\approx2.5" />, right between the two counts being added.</>,
  },
]

const ROWS_GII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T>d)=p=0.353889\ldots" />,
    reason: <>Go back to the definition: <Katex tex="p" /> is the probability that on one day she works more than <Katex tex="d" /> minutes, which is the area under the density to the <em>right</em> of <Katex tex="d" />. The maximum of <Katex tex="q" /> happens at <Katex tex="p=0.353889\ldots" /> (part g.i.), so we need the <Katex tex="d" /> that gives this <Katex tex="p" />. Use <Katex tex="p" />, not <Katex tex="q" />, and use it unrounded.</>,
  },
  {
    working: <Katex display tex="\int_d^{70}\frac{70-t}{625}\,dt=0.353889\ldots" />,
    reason: <>Less than half the area is to the right of <Katex tex="d" />, so <Katex tex="d" /> is right of the peak at 45, and the region is one triangle on the falling branch, from <Katex tex="d" /> to 70. (Integrating from 20 to <Katex tex="d" /> would give the left-hand area instead.)</>,
  },
  {
    working: <Katex display tex="\frac{(70-d)^2}{1250}=0.353889\ldots" />,
    reason: <>Evaluating, or as a triangle: base <Katex tex="70-d" />, height <Katex tex="\tfrac{70-d}{625}" />, area <Katex tex="\tfrac12(70-d)\cdot\tfrac{70-d}{625}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&(70-d)^2=442.36\ldots\\ &\implies 70-d=21.0324\ldots\end{aligned}" />,
    reason: <>The positive root, since <Katex tex="d<70" />. The negative root gives <Katex tex="d\approx91.03" />, outside <Katex tex="[45,70]" />.</>,
  },
  {
    working: <Katex display tex="d=48.9676\ldots" />,
    reason: <>On CAS: <Cas fn="solve">solve(∫(f(t), t, d, 70) = 0.353889…, d)</Cas>, with the unrounded <Katex tex="p" /> pasted in.</>,
  },
  {
    working: <Katex display tex="\boxed{d\approx49 \text{ minutes}}" />,
    reason: <>To the nearest minute. A check against part e.: <Katex tex="\Pr(T>50)=\tfrac8{25}=0.32" />, and a slightly earlier cut-off should give a slightly bigger probability. It does: <Katex tex="\Pr(T>49)=\tfrac{21^2}{1250}\approx0.353" />, close to the <Katex tex="0.3539" /> we need ✓.</>,
  },
]

export default function MethodsQ3_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (19 marks)</p>
        <p className="mb-2">
          The time Jennifer spends on her homework each day varies, but she does some homework
          every day.
        </p>
        <p className="mb-2">
          The continuous random variable <Katex tex="T" />, which models the time,{' '}
          <Katex tex="t" />, in minutes, that Jennifer spends each day on her homework, has a
          probability density function <Katex tex="f" />, where
        </p>
        <Katex
          display
          tex="f(t)=\begin{cases}\dfrac{1}{625}(t-20) & 20\le t<45\\[4pt] \dfrac{1}{625}(70-t) & 45\le t\le 70\\[4pt] 0 & \text{elsewhere}\end{cases}"
        />
      </div>

      <PartCard
        letter="a"
        topic="Sketch PDF"
        marks={3}
        statement={
          <>
            <p>
              Sketch the graph of <Katex tex="f" /> on the axes provided below.
            </p>
            <div className="mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={axesSrc}
                alt="Blank axes from the original 2017 VCAA exam paper: t from 0 to 100 with dashed gridlines every 5, and y with dashed gridlines every 1/100 up to 1/25, labelled 1/50 and 1/25"
                className="w-full max-w-[400px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod title="Draw just the two sloping lines" source="Examiner's report">
          The rule has a third line, <Katex tex="0" /> elsewhere, and it is part of the graph too: for{' '}
          <Katex tex="t<20" /> and <Katex tex="t>70" /> the graph is the <Katex tex="t" />-axis itself, so draw along it.
          A density function is defined for every value of <Katex tex="t" />, and here it is zero outside{' '}
          <Katex tex="[20,70]" />. Before sketching any hybrid function, count its pieces and check your graph has
          all of them.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Continuous PDF" marks={2} statement={<>Find <Katex tex="\Pr(25\le T\le55)" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
        <Explore title="A probability is an area — and this one crosses the peak, so each branch gets its own integral">
          <AreaWidget />
        </Explore>
        <WrongMethod
          title="Split at 44, because the first rule is for t < 45"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}&\int_{25}^{44}\frac{t-20}{625}\,dt+\int_{44}^{55}\frac{70-t}{625}\,dt\\ &=\frac{551}{1250}+\frac{451}{1250}=\frac{501}{625}\\ &\approx0.8016\end{aligned}" />}
        >
          <Katex tex="t" /> is a time, not a whole number of minutes: <Katex tex="20\le t<45" /> takes in every time up
          to 45, including 44.5 and 44.99. Splitting at 44 uses the falling rule between 44 and 45, where the density
          is really the rising one, so the answer comes out slightly wrong. Split exactly where the rule changes. Whether 45
          itself belongs to the left or the right piece makes no difference to an area.
        </WrongMethod>
      </PartCard>

      <PartCard letter="c" topic="Conditional Probability" marks={2} statement={<>Find <Katex tex="\Pr(T\le25\mid T\le55)" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
        <Explore title="“Given T ≤ 55” shrinks the whole — 1/41 is the sliver's share of what is left">
          <GivenAreaWidget />
        </Explore>
        <WrongMethod
          title="Divide by the answer to part b."
          source="1/40: examiner's report"
          working={<Katex display tex="\frac{\Pr(T\le25)}{\Pr(25\le T\le55)}=\frac{1/50}{4/5}=\frac{1}{40}" />}
        >
          Part b.&apos;s <Katex tex="\tfrac45" /> is <Katex tex="\Pr(25\le T\le55)" />, but being told{' '}
          <Katex tex="T\le55" /> rules out only the times <em>above</em> 55: everything from 20 to 55 is still possible,
          so the whole you divide by is <Katex tex="\Pr(T\le55)=\tfrac{41}{50}" />. A quick check that catches this: the
          event on top must lie inside the event you divide by, and <Katex tex="T\le25" /> isn&apos;t even inside{' '}
          <Katex tex="25\le T\le55" />. This is one way to land on the report&apos;s common wrong answer{' '}
          <Katex tex="\tfrac1{40}" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d"
        topic="PDF Quantile"
        marks={2}
        statement={
          <>
            Find <Katex tex="a" /> such that <Katex tex="\Pr(T\ge a)=0.7" />, correct to four
            decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="Pr(T ≥ a) = 0.7 is the area to the right of a — so a sits left of the peak">
          <QuantileWidget />
        </Explore>
        <WrongMethod
          title="Solve ∫ from 20 to a of f(t) dt = 0.7"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}&\int_{20}^{a}f(t)\,dt=0.7\\ &\implies a\approx50.6351\end{aligned}" />}
        >
          An integral from 20 up to <Katex tex="a" /> is the area to the <em>left</em> of <Katex tex="a" />, which is{' '}
          <Katex tex="\Pr(T\le a)" />, so this finds the point with 0.7 on the wrong side. The giveaway: 70% of the area to
          the right of <Katex tex="a" /> puts <Katex tex="a" /> left of the peak at 45, and 50.6 is right of it. Before
          writing an integral, turn the probability into a picture: &ldquo;<Katex tex="T\ge a" />&rdquo; is the region
          to the right of <Katex tex="a" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">e.</p>
        <p>
          The probability that Jennifer spends more than <Katex tex="50" /> minutes on her
          homework on any given day is <Katex tex="\tfrac{8}{25}" />. Assume that the amount
          of time spent on her homework on any day is independent of the time spent on her
          homework on any other day.
        </p>
      </div>

      <PartCard
        letter="e.i"
        topic="Binomial Distribution"
        marks={2}
        statement={
          <>
            Find the probability that Jennifer spends more than <Katex tex="50" /> minutes on
            her homework on more than three of seven randomly chosen days, correct to four
            decimal places.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <Background title="A binomial on top of a continuous distribution">
          <p>
            Parts a.–d. are about one day and use the density function. From here on, each day
            is collapsed into a single yes/no (did she do more than 50 minutes?) and the seven
            days become a binomial.
          </p>
          <p>
            The density function&apos;s only job now is to supply the success probability. Here
            the question hands it to you as <Katex tex="\tfrac8{25}" />, which is the area under
            the triangle to the right of 50. In part g.ii. you have to go the other way: from a
            probability back to the cut-off time.
          </p>
        </Background>
        <WorkingTable rows={ROWS_EI} />
        <WrongMethod
          title="“More than three” means X ≥ 3"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}&\Pr(X\ge3)\\ &=\texttt{binomCdf}(7,\,8/25,\,3,\,7)\\ &\approx0.3987\end{aligned}" />}
        >
          For a count, &ldquo;more than three&rdquo; leaves three out: <Katex tex="X>3" /> is <Katex tex="X\ge4" />.
          binomCdf counts both of its bounds, so a lower bound of 3 adds the whole <Katex tex="X=3" /> bar (about
          0.245) and more than doubles the answer. Translate the words into a list of whole numbers (4, 5, 6, 7) before
          you reach for the calculator.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Conditional Binomial"
        marks={2}
        statement={
          <>
            Find the probability that Jennifer spends more than <Katex tex="50" /> minutes on
            her homework on at least two of seven randomly chosen days, given that she spends
            more than <Katex tex="50" /> minutes on her homework on at least one of those
            days, correct to four decimal places.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
        <Explore title="“Given at least one” throws away the X = 0 bar — the answer is a share of what is left">
          <GivenBarsWidget />
        </Explore>
        <WrongMethod
          title="Write “at least” with >"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}\frac{\Pr(X>2)}{\Pr(X>1)}&=\frac{\Pr(X\ge3)}{\Pr(X\ge2)}\\ &\approx\frac{0.3987}{0.7113}\approx0.5605\end{aligned}" />}
        >
          &ldquo;At least two&rdquo; means two or more, so it includes two: <Katex tex="X\ge2" />. With whole numbers,{' '}
          <Katex tex="X>2" /> skips straight to 3, so this answers a different question (at least three days, given at least
          two). Turn the toggle on in the diagram above to watch the bars at 1 and 2 drop out.
        </WrongMethod>
        <WrongMethod
          title="Round both probabilities first, then divide"
          source="Examiner's report"
          working={<Katex display tex="\frac{0.7113}{0.9328}=0.76254\ldots\approx0.7625" />}
        >
          Rounding each probability to four places before dividing changes the fourth decimal place of the answer. Keep
          the full values in the calculator (store them, or divide in one line) and round only once, at the end. Then
          round, don&apos;t chop: the full answer is <Katex tex="0.76257\ldots" />, and its fifth decimal place is 7, so it
          rounds up to <Katex tex="0.7626" />. Cutting it off after four places gives <Katex tex="0.7625" /> too.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          Let <Katex tex="p" /> be the probability that on any given day Jennifer spends more
          than <Katex tex="d" /> minutes on her homework.
        </p>
        <p>
          Let <Katex tex="q" /> be the probability that on two or three days out of seven
          randomly chosen days she spends more than <Katex tex="d" /> minutes on her homework.
        </p>
      </div>

      <PartCard
        letter="f"
        topic="Probability Expression"
        marks={2}
        statement={
          <>
            Express <Katex tex="q" /> as a polynomial in terms of <Katex tex="p" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <Background title="How d, p and q are linked">
          <p>
            Three new letters, chained together. The cut-off time <Katex tex="d" /> decides{' '}
            <Katex tex="p=\Pr(T>d)" />, the area under the density to the right of <Katex tex="d" />:
            one day&apos;s chance. Then <Katex tex="p" /> decides <Katex tex="q" />, a chance about
            seven days. Part e. was this same chain with <Katex tex="d=50" /> and{' '}
            <Katex tex="p=\tfrac8{25}" />.
          </p>
          <p>
            Part f. is the link from <Katex tex="p" /> to <Katex tex="q" />, part g.i. finds the best{' '}
            <Katex tex="p" />, and part g.ii. goes back to the density to find the <Katex tex="d" /> that
            gives it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <Explore title="Why q = 21p²(1 − p)⁵ + 35p³(1 − p)⁴: count the arrangements, times the chance of each">
          <ArrangementsWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="g.i"
        topic="Optimisation"
        marks={2}
        statement={
          <>
            Find the maximum value of <Katex tex="q" />, correct to four decimal places, and
            the value of <Katex tex="p" /> for which this maximum occurs, correct to four
            decimal places.
          </>
        }
        examinerReport={EXAM_GI}
      >
        <WorkingTable rows={ROWS_GI} />
        <Explore title="The maximum of q is where its tangent is flat">
          <MaxWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="g.ii"
        topic="Find Parameter"
        marks={2}
        statement={
          <>
            Find the value of <Katex tex="d" /> for which the maximum found in{' '}
            <strong>part g.i.</strong> occurs, correct to the nearest minute.
          </>
        }
        examinerReport={EXAM_GII}
      >
        <Background title="Going back up the chain">
          <p>
            Part g.i. answered &ldquo;which <Katex tex="p" /> makes <Katex tex="q" /> biggest?&rdquo;
            This part asks which cut-off time <Katex tex="d" /> produces that <Katex tex="p" />. So
            the value to use is <Katex tex="p" />, and it has to be turned back into a time using
            the density from parts a.–d.: <Katex tex="p" /> is the area to the right of{' '}
            <Katex tex="d" />, exactly as <Katex tex="\tfrac8{25}" /> is the area to the right of 50.
          </p>
        </Background>
        <WorkingTable rows={ROWS_GII} />
        <Explore title="d sets p, and p sets q — slide d until q is at its peak">
          <ChainWidget />
        </Explore>
        <WrongMethod
          title="Use the maximum value of q as the area"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}&\int_d^{70}f(t)\,dt=0.56646\ldots\\ &\implies d\approx43.28\approx43\end{aligned}" />}
        >
          <Katex tex="q" /> is the chance of 2 or 3 long days out of seven, not a one-day probability, so it is never an
          area under this density. The area to the right of <Katex tex="d" /> is <Katex tex="p" /> by definition, so this
          sets <Katex tex="p=0.5665" />, which gives <Katex tex="q\approx0.328" />, far from the maximum. Ask which letter
          the question defined as &ldquo;more than <Katex tex="d" /> minutes on one day&rdquo;: that is{' '}
          <Katex tex="p" />.
        </WrongMethod>
        <WrongMethod
          title="Integrate from 20 up to d"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned}&\int_{20}^{d}f(t)\,dt=0.35388\ldots\\ &\implies d\approx41\end{aligned}" />}
        >
          That is the area to the <em>left</em> of <Katex tex="d" />, the chance she works <em>less</em> than{' '}
          <Katex tex="d" /> minutes. <Katex tex="p" /> is &ldquo;more than <Katex tex="d" /> minutes&rdquo;, the area
          to the right, which here would be <Katex tex="1-0.3539=0.6461" /> and gives <Katex tex="q\approx0.197" />.
          The same slip as part d.: draw the region before choosing the terminals.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
