// 2018 Mathematical Methods — Exam 2, Section B, Question 1 (13 marks). A quartic, its
// minimum, a tangent and the area it cuts off, then the same quartic generalised with a
// parameter a. Question text transcribed from the original paper; both figures are cropped
// directly from the original VCAA exam PDF, not redrawings. Every answer re-derived
// independently in sympy and checked against the VCAA examination report.
// Solution is original.
//
// Interactive widgets (interactives/meth-2018e2-q1*): b. lift the quartic by b and count the
// x-intercepts (b = 32 still touches); d. rotate a line through P until the neighbouring
// intersection merges into P (the double root), with the report's f'(x) = 80/9 slip as a toggle;
// (the lower graph zooms in on f − line near P, where the neighbouring root is only ~0.1 high);
// e. sweep a strip across both regions (the height l − f never goes negative), with the report's
// minus-sign-below-the-axis slip as a toggle (it gives 0, since the lobes are equal); f. equal at
// two points versus equal for all x; h.i. the stationary points of p and the zeros of p' as a
// varies, merging at a = 1; h.iii. the graph of p beside its minimum height p(1) = a² − 6a − 5
// as a function of a.
//
// Sources: one tutor video (LMK) says the two regions in e. are not symmetric. They are equal
// (392√42/135 each, sympy): with u = x + 1/3, l(x) − f(x) = 14u² − 3u⁴, an even function of u.
// Marty Ross's list of VCAA errors notes that d. and e. have infinitely many answers of the required
// form (e.g. (−2 ± √168)/6, 1568√42/270); we give the simplest form, as the report does.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const LiftWidget = lazyWidget(() => import('../interactives/meth-2018e2-q1b-lift'))
const DoubleWidget = lazyWidget(() => import('../interactives/meth-2018e2-q1d-double'))
const StripsWidget = lazyWidget(() => import('../interactives/meth-2018e2-q1e-strips'))
const MatchWidget = lazyWidget(() => import('../interactives/meth-2018e2-q1f-match'))
const StationaryWidget = lazyWidget(() => import('../interactives/meth-2018e2-q1hi-stationary'))
const ClearWidget = lazyWidget(() => import('../interactives/meth-2018e2-q1hiii-clear'))
import quarticSrc from './meth-2018e2-q1-quartic.png'
import tangentSrc from './meth-2018e2-q1-tangent.png'

const EXAM_A: SAExaminerStats = {
  marks: [5, 95],
  average: 1.0,
  comment: <>This question was answered well. Some students only gave the <Katex tex="x" /> value when coordinates were required.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: (
    <>
      This question was answered well. Common incorrect answers were{' '}
      <Katex tex="(-\infty,32)" />, <Katex tex="b=32" />, <Katex tex="b\ge32" />,{' '}
      <Katex tex="[33,\infty)" /> and <Katex tex="b=33" />. Others used the{' '}
      <Katex tex="x" />-coordinate and gave <Katex tex="x>2" /> as their answer.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: <>An equation and exact values were required.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [20, 13, 67],
  average: 1.5,
  comment: (
    <>
      Exact values were required. There were many sign errors, for example{' '}
      <Katex tex="x=\tfrac{1\pm\sqrt{42}}{3}" />. Some students found the values of{' '}
      <Katex tex="x" /> where the gradient of <Katex tex="l" /> was equal to the gradient of{' '}
      <Katex tex="f" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [38, 13, 49],
  average: 1.1,
  comment: (
    <>
      Students who answered Question 1d. correctly were generally able to answer this question
      correctly. Some students split the integral, which was unnecessary. Others put a
      negative sign in front of the integral for the bounded area below the{' '}
      <Katex tex="x" />-axis. Some had their terminals or expressions the reverse of what was
      required.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [51, 49],
  average: 0.5,
  comment: (
    <>
      Some students gave an additional expression <Katex tex="a=-6x(x-2)" />, which was
      obtained if technology was used rather than equating coefficients.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: (
    <>
      A common error was <Katex tex="x=1\pm\sqrt{1-a}" />.{' '}
      <Katex tex="x=\dfrac{-1\pm\sqrt{9-4a}}{2},\ x=0" /> was often given. This comes from
      forgetting to differentiate <Katex tex="-12ax" /> when differentiating{' '}
      <Katex tex="p(x)" />.
    </>
  ),
}

const EXAM_HI: SAExaminerStats = {
  marks: [82, 18],
  average: 0.2,
  comment: (
    <>
      This question was not answered well. Common incorrect answers were{' '}
      <Katex tex="a=1" />, <Katex tex="a=0" /> or <Katex tex="a>0" />.
    </>
  ),
}

const EXAM_HII: SAExaminerStats = {
  marks: [47, 53],
  average: 0.6,
  comment: (
    <>
      This question was answered well. The minimum value needed to be stated, not just the
      coordinates of the turning point.
    </>
  ),
}

const EXAM_HIII: SAExaminerStats = {
  marks: [92, 4, 4],
  average: 0.2,
  comment: (
    <>
      This question was not answered well. Many students did not attempt this question. Some
      students solved <Katex tex="p(x)=0" /> or <Katex tex="p'(x)=0" /> for <Katex tex="x" />.
      Others tried to apply the discriminant to a cubic equation. Others, who used a correct
      method, sometimes gave an incorrect inequality, for example{' '}
      <Katex tex="a<\sqrt{14}+3" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}f'(x) &= 12x^3+12x^2-24x \\ &= 12x\left(x^2+x-2\right) \\ &= 12x(x+2)(x-1)\end{aligned}" />,
    reason: <>Differentiate and factorise fully. Taking out <Katex tex="12x" /> first leaves an easy quadratic.</>,
  },
  {
    working: <Katex display tex="f'(x)=0 \implies x = -2,\ 0,\ 1" />,
    reason: <>Three stationary points, so they must be compared — the question asks for the <em>minimum</em>, not just any turning point.</>,
  },
  {
    working: <Katex display tex="f(-2) = -32, \quad f(0) = 0, \quad f(1) = -5" />,
    reason: <>Substituting each back. The graph confirms the shape: a deep trough on the left, a local maximum at the origin, a shallower trough on the right.</>,
  },
  {
    working: <Katex display tex="\boxed{M = (-2,\ -32)}" />,
    reason: <>The lowest of the three. Give <em>coordinates</em> — the report notes some students only gave the <Katex tex="x" /> value.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="y = f(x)+b \ \text{ is } \ y=f(x) \text{ shifted up by } b" />,
    reason: <>No <Katex tex="x" />-intercepts means the whole curve sits strictly above the axis, so the shift must lift the <em>lowest</em> point clear of it.</>,
  },
  {
    working: <Katex display tex="\text{Minimum of } f(x)+b \ = \ -32+b" />,
    reason: <>From part a. Everything else on the curve is higher, so this one value decides it.</>,
  },
  {
    working: <Katex display tex="-32+b>0 \implies \boxed{b>32}" />,
    reason: <>Strictly greater. At <Katex tex="b=32" /> exactly, the minimum sits <em>on</em> the axis — that is an <Katex tex="x" />-intercept, so <Katex tex="b=32" /> must be excluded. The report lists <Katex tex="b=32" /> and <Katex tex="b\ge32" /> among the common incorrect answers, along with answers in terms of <Katex tex="x" /> from students who used the <Katex tex="x" />-coordinate instead.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f\!\left(-\tfrac13\right) = \frac{1}{27}-\frac{4}{27}-\frac{36}{27} = -\frac{13}{9}" />,
    reason: <>Any straight line needs a point and a gradient, so a tangent question is always these two calculations. First the point of contact. Everything over <Katex tex="27" /> keeps it exact — the report stresses that exact values were required.</>,
  },
  {
    working: <Katex display tex="f'\!\left(-\tfrac13\right) = -\frac49+\frac{12}{9}+8 = \frac{80}{9}" />,
    reason: <>Then the gradient: the tangent has the same gradient as the curve at the point of contact, so substitute into the derivative from part a.</>,
  },
  {
    working: <Katex display tex="y+\frac{13}{9} = \frac{80}{9}\left(x+\frac13\right)" />,
    reason: <>Point–gradient form.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{80x}{9}+\frac{41}{27}}" />,
    reason: <><Katex tex="\tfrac{80}{27}-\tfrac{13}{9}=\tfrac{80-39}{27}=\tfrac{41}{27}" />. Write it as an <em>equation</em> — the report says an equation and exact values were required.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="3x^4+4x^3-12x^2 = \frac{80x}{9}+\frac{41}{27}" />,
    reason: <>Intersections of the curve and its tangent. Solve for <Katex tex="x" /> — the report warns against instead solving <Katex tex="f'(x)=\tfrac{80}{9}" />, which finds where the gradients match, a different question.</>,
  },
  {
    working: <Katex display tex="x = -\frac13 \ \text{ is a repeated root (tangency)}" />,
    reason: <>A tangent touches rather than crosses, so <Katex tex="x=-\tfrac13" /> appears <em>twice</em> among the four roots of this quartic. That leaves exactly two others, which is what the question says.</>,
  },
  {
    working: <Cas fn="solve">solve(3x^4+4x^3-12x^2 = 80x/9+41/27, x)</Cas>,
    reason: <>Technology handles the quartic directly. By hand you would divide out <Katex tex="\left(x+\tfrac13\right)^2" /> and solve the remaining quadratic <Katex tex="3x^2+2x-\tfrac{41}{3}=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{-1-\sqrt{42}}{3} \ \text{ and } \ x = \frac{-1+\sqrt{42}}{3}}" />,
    reason: <>In the required form <Katex tex="\tfrac{a\pm\sqrt b}{c}" /> with <Katex tex="a=-1" />, <Katex tex="b=42" />, <Katex tex="c=3" />. The sign matters: the report names <Katex tex="\tfrac{1\pm\sqrt{42}}{3}" /> as a frequent slip. (<Katex tex="\approx-2.49" /> and <Katex tex="\approx1.83" /> — either side of the contact point, as the figure shows.)</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{On } \left(\frac{-1-\sqrt{42}}{3},\ \frac{-1+\sqrt{42}}{3}\right): \ l \ \text{ lies above } f" />,
    reason: <>Before integrating, decide which graph is on top. Between the two outer intersections the tangent runs above the curve, touching it at <Katex tex="x=-\tfrac13" /> without crossing. If you are not sure, test one point in each region: at <Katex tex="x=-1" />, <Katex tex="l=-\tfrac{199}{27}\approx-7.4" /> and <Katex tex="f=-13" />; at <Katex tex="x=1" />, <Katex tex="l=\tfrac{281}{27}\approx10.4" /> and <Katex tex="f=-5" />. The tangent is on top in both, so a single integral covers both regions.</>,
  },
  {
    working: <Katex display tex="A = \int_{\frac{-1-\sqrt{42}}{3}}^{\frac{-1+\sqrt{42}}{3}} \left(\frac{80x}{9}+\frac{41}{27} - \left(3x^4+4x^3-12x^2\right)\right)dx" />,
    reason: <>Upper minus lower, across the whole span, with the terminals from part d. The report is explicit that splitting the integral was unnecessary and that inserting a negative sign for the part below the <Katex tex="x" />-axis was wrong — the axis is irrelevant here, only which of the two graphs is on top. On CAS, enter it with the definite-integral template in exact mode, typing the exact terminals and bracketing all of <Katex tex="f(x)" />; that returns the surd form. (<Cas fn="nInt">nInt</Cas> only gives the decimal <Katex tex="37.636\ldots" />, which is a useful check but not the required form.)</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{784\sqrt{42}}{135}}" />,
    reason: <>The required form <Katex tex="\tfrac{a\sqrt b}{c}" /> with <Katex tex="a=784" />, <Katex tex="b=42" />, <Katex tex="c=135" />. (<Katex tex="\approx37.6" /> square units. The two regions are equal, <Katex tex="\tfrac{392\sqrt{42}}{135}\approx18.8" /> each: writing <Katex tex="u=x+\tfrac13" />, the height is <Katex tex="l(x)-f(x)=14u^2-3u^4" />, which is symmetric about the touching point.)</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}p(x)-f(x) &= 6(a-2)x^2+12x^2 - 12ax + a^2 \\ &= 6a x^2 - 12ax + a^2\end{aligned}" />,
    reason: <>Subtracting term by term: the <Katex tex="3x^4" /> and <Katex tex="4x^3" /> cancel, and <Katex tex="6(a-2)x^2-(-12x^2)=6ax^2" />.</>,
  },
  {
    working: <Katex display tex="6a = 0, \quad -12a = 0, \quad a^2 = 0" />,
    reason: <>"For all <Katex tex="x" />" means the difference must be zero at <em>every</em> <Katex tex="x" />. If any coefficient were non-zero, <Katex tex="6ax^2-12ax+a^2" /> would be a genuine parabola or a non-zero constant, which is zero at two points at most. So every coefficient must vanish — equate coefficients rather than solving an equation in <Katex tex="x" />. The report notes that students who used technology instead got the additional expression <Katex tex="a=-6x(x-2)" />, which is not a constant and so cannot be the value of <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 0}" />,
    reason: <>All three conditions agree.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="p'(x) = 12x^3+12x^2+12(a-2)x-12a" />,
    reason: <>Differentiating. The <Katex tex="-12ax" /> term contributes <Katex tex="-12a" /> — the report says forgetting to differentiate it is what produced the often-given <Katex tex="x=0" /> and <Katex tex="x=\tfrac{-1\pm\sqrt{9-4a}}{2}" />.</>,
  },
  {
    working: <Katex display tex="= \left(12x^3+12x^2-24x\right) + 12a(x-1)" />,
    reason: <>How would you see a factor here? Separate the terms containing <Katex tex="a" /> from the rest. The rest is exactly <Katex tex="f'(x)" />, and the <Katex tex="a" />-terms <Katex tex="12ax-12a" /> share the factor <Katex tex="(x-1)" />.</>,
  },
  {
    working: <Katex display tex="= 12x(x+2)(x-1) + 12a(x-1)" />,
    reason: <><Katex tex="f'(x)" /> was already factorised in part a., and it also contains <Katex tex="(x-1)" />.</>,
  },
  {
    working: <Katex display tex="= 12(x-1)\left(x^2+2x+a\right)" />,
    reason: <>Take out the common factor <Katex tex="12(x-1)" />. So <Katex tex="x=1" /> is a stationary point for <em>every</em> value of <Katex tex="a" />. On CAS, <Cas fn="solve">solve(p&apos;(x)=0, x)</Cas> gives the same solutions directly, though you may have to tidy its form.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 1 \quad \text{or} \quad x = -1\pm\sqrt{1-a}}" />,
    reason: <>Completing the square on <Katex tex="x^2+2x+a" /> gives <Katex tex="(x+1)^2 = 1-a" />. The second pair exists only when <Katex tex="1-a\ge0" />, which sets up part h. Check with <Katex tex="a=0" />: then <Katex tex="p=f" />, whose stationary points from part a. are <Katex tex="x=-2,\ 0,\ 1" />, and <Katex tex="-1\pm\sqrt1" /> gives <Katex tex="-2" /> and <Katex tex="0" /> ✓. The report&apos;s common error <Katex tex="x=1\pm\sqrt{1-a}" /> fails this check: it gives <Katex tex="0" /> and <Katex tex="2" />.</>,
  },
]

const ROWS_HI: WorkingRow[] = [
  {
    working: <Katex display tex="x=1 \text{ is always a stationary point}" />,
    reason: <>From part g. So "only one stationary point" means the other two must fail to exist.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&x^2+2x+a = 0 \text{ has no real solutions} \\ &\iff \Delta = 4-4a < 0\end{aligned}" />,
    reason: <>Any other stationary point has to come from the quadratic factor of <Katex tex="p'(x)" />. For there to be none, that quadratic must have no real solutions, which is a discriminant condition.</>,
  },
  {
    working: <Katex display tex="4-4a<0 \implies \boxed{a>1}" />,
    reason: <>Strict. At <Katex tex="a=1" /> the quadratic has the repeated root <Katex tex="x=-1" />, which is a genuine second stationary point — so <Katex tex="a=1" /> gives two, not one. The report lists <Katex tex="a=1" /> among the common incorrect answers; only <Katex tex="18\%" /> scored this mark.</>,
  },
]

const ROWS_HII: WorkingRow[] = [
  {
    working: <Katex display tex="a=2>1 \implies \text{the only stationary point is } x=1" />,
    reason: <>Part h.i. applies, so there is nothing to compare — the single turning point of a positive quartic must be its minimum.</>,
  },
  {
    working: <Katex display tex="p(x) = 3x^4+4x^3+0\cdot x^2-24x+4" />,
    reason: <>Substituting <Katex tex="a=2" />: the <Katex tex="x^2" /> coefficient <Katex tex="6(a-2)" /> vanishes.</>,
  },
  {
    working: <Katex display tex="p(1) = 3+4-24+4" />,
    reason: <>Evaluating at the stationary point.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Minimum value} = -13}" />,
    reason: <>State the <em>value</em> — the report says the minimum value needed to be stated, not just the coordinates of the turning point <Katex tex="(1,-13)" />.</>,
  },
]

const ROWS_HIII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}a>1 &\implies \text{one stationary point, at } x=1 \\ &\implies \text{it is the minimum}\end{aligned}" />,
    reason: <>Carrying part h.i. forward. A quartic with a positive leading coefficient and a single turning point has that point as its global minimum.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&p(x)=0 \text{ has no solutions} \\ &\iff \text{minimum} > 0 \\ &\iff p(1)>0\end{aligned}" />,
    reason: <>This is the idea from part b. again: a graph with a single lowest point misses the axis exactly when that lowest point is above it. The report says some students instead solved <Katex tex="p(x)=0" /> or <Katex tex="p'(x)=0" /> for <Katex tex="x" />, and others tried to apply the discriminant to a cubic, which does not work.</>,
  },
  {
    working: <Katex display tex="p(1) = 3+4+6(a-2)-12a+a^2 = a^2-6a-5" />,
    reason: <>Substituting <Katex tex="x=1" /> into the general rule and collecting.</>,
  },
  {
    working: <Katex display tex="a^2-6a-5 = 0 \implies a = \frac{6\pm\sqrt{56}}{2} = 3\pm\sqrt{14}" />,
    reason: <>Quadratic formula; <Katex tex="\sqrt{56}=2\sqrt{14}" />.</>,
  },
  {
    working: <Katex display tex="a^2-6a-5>0 \implies a<3-\sqrt{14} \ \text{ or } \ a>3+\sqrt{14}" />,
    reason: <>An upward parabola in <Katex tex="a" /> is positive outside its roots.</>,
  },
  {
    working: <Katex display tex="3-\sqrt{14}\approx-0.74 \ \text{ fails } a>1" />,
    reason: <>The left branch is entirely below <Katex tex="1" />, so the constraint from part h.i. removes it. Both conditions have to hold at once — and the inequality must point the right way: the report's example of an incorrect inequality is <Katex tex="a<\sqrt{14}+3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a > 3+\sqrt{14}}" />,
    reason: <>(<Katex tex="3+\sqrt{14}\approx6.74" />.) Spot-check: at <Katex tex="a=7" /> the minimum of <Katex tex="p" /> is <Katex tex="+2" />, so the curve clears the axis ✓; at <Katex tex="a=6.7" /> it is <Katex tex="-0.31" />, so it still cuts ✓. Only <Katex tex="4\%" /> of students scored both marks.</>,
  },
]

export default function MethodsQ1_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (13 marks)</p>
        <p className="mb-3">
          Consider the quartic{' '}
          <Katex tex="f:R\to R,\ f(x)=3x^4+4x^3-12x^2" /> and part of the
          graph of <Katex tex="y=f(x)" /> below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={quarticSrc} alt="Part of the graph of y = 3x⁴+4x³−12x²: a deep minimum M on the left, a local maximum at the origin and a shallower minimum on the right, from the original 2018 VCAA exam paper" className="w-full max-w-[420px]" />
        </div>
      </div>

      <PartCard letter="a" topic="Minimum Point" marks={1} statement={<>Find the coordinates of the point <Katex tex="M" />, at which the minimum value of the function <Katex tex="f" /> occurs.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Vertical Translation" marks={1} statement={<>State the values of <Katex tex="b\in R" /> for which the graph of <Katex tex="y=f(x)+b" /> has no <Katex tex="x" />-intercepts.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Lifting the curve: why b = 32 is not enough">
          <LiftWidget />
        </Explore>
        <WrongMethod
          title="The minimum just needs to reach the axis, so b ≥ 32"
          source="Examiner's report"
          working={<Katex tex="-32+b\ge0 \implies b\ge32" />}
        >
          At <Katex tex="b=32" /> the lowest point is <Katex tex="(-2,\ 0)" />, which is <em>on</em> the{' '}
          <Katex tex="x" />-axis, so the graph still has one <Katex tex="x" />-intercept. &ldquo;No{' '}
          <Katex tex="x" />-intercepts&rdquo; needs the minimum strictly above the axis. Test the boundary value
          every time: substitute it back and ask whether it satisfies the original condition.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          Part of the tangent, <Katex tex="l" />, to <Katex tex="y=f(x)" /> at{' '}
          <Katex tex="x=-\dfrac13" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={tangentSrc} alt="The same quartic with the tangent line l drawn through it, crossing the curve at two further points either side of the contact point, from the original 2018 VCAA exam paper" className="w-full max-w-[420px]" />
        </div>
      </div>

      <PartCard letter="c" topic="Tangent Line" marks={1} statement={<>Find the equation of the tangent <Katex tex="l" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" topic="Intersections" marks={2} statement={<>The tangent <Katex tex="l" /> intersects <Katex tex="y=f(x)" /> at <Katex tex="x=-\dfrac13" /> and at two other points. State the <Katex tex="x" />-values of the two other points of intersection. Express your answers in the form <Katex tex="\dfrac{a\pm\sqrt{b}}{c}" />, where <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are integers.</>} examinerReport={EXAM_D}>
        <Background>
          <p>
            A tangent meets its curve at a <em>repeated</em> root. So{' '}
            <Katex tex="f(x)-l(x)" /> is a quartic with <Katex tex="\left(x+\tfrac13\right)^2" />{' '}
            as a factor, leaving a quadratic — which is why the answers come out in the
            surd form the question prescribes.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <Explore title="Why the point of contact is a repeated root">
          <DoubleWidget />
        </Explore>
        <WrongMethod
          title="Find where the curve has the same gradient as l"
          source="Examiner's report"
          working={<Katex tex="f'(x)=\tfrac{80}{9} \implies x=-\tfrac13,\ \tfrac{-1\pm\sqrt{21}}{3}" />}
        >
          These are points where the curve runs <em>parallel</em> to <Katex tex="l" />, not points on{' '}
          <Katex tex="l" />. Check one: at <Katex tex="x=\tfrac{-1+\sqrt{21}}{3}\approx1.19" />, <Katex tex="f\approx-4.2" />{' '}
          but <Katex tex="l\approx12.1" />. &ldquo;Intersect&rdquo; always means equal <Katex tex="y" />-values:
          solve <Katex tex="f(x)=l(x)" />.
        </WrongMethod>
        <WrongMethod
          title="A sign slip: x = (1 ± √42)/3"
          source="Examiner's report"
          working={<Katex tex="x=\frac{6\pm\sqrt{1512}}{18}=\frac{1\pm\sqrt{42}}{3}" />}
        >
          One way this happens is dropping the minus from <Katex tex="-b" /> in the quadratic formula on{' '}
          <Katex tex="9x^2+6x-41=0" />; the numerator should be <Katex tex="-6\pm\sqrt{1512}" />. Another is
          misreading a CAS answer that has a negative factored out. A quick
          check catches it: the two roots of <Katex tex="9x^2+6x-41=0" /> must add to{' '}
          <Katex tex="-\tfrac69=-\tfrac23" />, and <Katex tex="\tfrac{1\pm\sqrt{42}}{3}" /> add to{' '}
          <Katex tex="+\tfrac23" />. The figure agrees: the left-hand intersection is further from the{' '}
          <Katex tex="y" />-axis than the right-hand one.
        </WrongMethod>
      </PartCard>

      <PartCard letter="e" topic="Area Between Curves" marks={2} statement={<>Find the total area of the regions bounded by the tangent <Katex tex="l" /> and <Katex tex="y=f(x)" />. Express your answer in the form <Katex tex="\dfrac{a\sqrt{b}}{c}" />, where <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are positive integers.</>} examinerReport={EXAM_E}>
        <Background>
          <p>
            "Total area of the regions" sounds like it needs splitting, but it does not. The
            tangent touches the curve at <Katex tex="x=-\tfrac13" /> without crossing, so{' '}
            <Katex tex="l" /> stays above <Katex tex="f" /> right across the interval between
            the two outer intersections. One integral of{' '}
            <Katex tex="(\text{upper}-\text{lower})" /> therefore collects both lobes with the
            correct sign already.
          </p>
          <p>
            Where the regions sit relative to the <Katex tex="x" />-axis is irrelevant — an
            area between two curves depends only on which is on top.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <Explore title="One integral covers both regions: the tangent is on top the whole way">
          <StripsWidget />
        </Explore>
        <WrongMethod
          title="The left region is below the x-axis, so it needs a minus sign"
          source="Examiner's report"
          working={
            <Katex tex="\begin{aligned}&-\int_{\frac{-1-\sqrt{42}}{3}}^{-\frac13}\!\big(l(x)-f(x)\big)dx\\&+\int_{-\frac13}^{\frac{-1+\sqrt{42}}{3}}\!\big(l(x)-f(x)\big)dx\\&=-\tfrac{392\sqrt{42}}{135}+\tfrac{392\sqrt{42}}{135}=0\end{aligned}" />
          }
        >
          The minus-sign rule is for the area between a curve and the <Katex tex="x" />-axis. Between two curves
          the height of each strip is top minus bottom, <Katex tex="l(x)-f(x)" />, which is already positive
          wherever the strip sits. Here the two regions happen to be exactly equal, so the extra minus sign makes
          them cancel to an &ldquo;area&rdquo; of <Katex tex="0" />, a sure sign something is wrong.
        </WrongMethod>
        <WrongMethod
          title="Integrate f(x) − l(x), or put the terminals the other way round"
          source="Examiner's report"
          working={<Katex tex="\begin{aligned}&\int_{\frac{-1-\sqrt{42}}{3}}^{\frac{-1+\sqrt{42}}{3}}\!\big(f(x)-l(x)\big)dx\\&=-\tfrac{784\sqrt{42}}{135}\end{aligned}" />}
        >
          Bottom minus top gives every strip a negative height, so the integral comes out negative; swapping
          the terminals does the same. An area can never be negative, so a minus sign on your CAS answer means
          the order is reversed: always integrate (top <Katex tex="-" /> bottom) from the left terminal to the
          right one.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let{' '}
          <Katex tex="p:R\to R,\ p(x)=3x^4+4x^3+6(a-2)x^2-12ax+a^2,\ a\in R" />.
        </p>
      </div>

      <PartCard letter="f" topic="Find Parameter" marks={1} statement={<>State the value of <Katex tex="a" /> for which <Katex tex="f(x)=p(x)" /> for all <Katex tex="x" />.</>} examinerReport={EXAM_F}>
        <WorkingTable rows={ROWS_F} />
        <Explore title="Equal at two points is not equal for all x">
          <MatchWidget />
        </Explore>
        <WrongMethod
          title="Solve f(x) = p(x) for a on CAS and copy down every answer"
          source="Examiner's report"
          working={<><Cas fn="solve">solve(f(x)=p(x), a)</Cas>{' '}<Katex tex="\implies a=0 \ \text{ or } \ a=-6x(x-2)" /></>}
        >
          CAS answers the question &ldquo;for which <Katex tex="a" /> are the graphs equal at <em>this</em>{' '}
          <Katex tex="x" />?&rdquo; The second answer changes with <Katex tex="x" />, so it is not a single value of{' '}
          <Katex tex="a" /> at all: it only makes the graphs meet at particular points. The question wants one{' '}
          <Katex tex="a" /> that works for every <Katex tex="x" /> at once, and only <Katex tex="a=0" /> does.
        </WrongMethod>
      </PartCard>

      <PartCard letter="g" topic="Stationary Points" marks={1} statement={<>Find all solutions to <Katex tex="p'(x)=0" />, in terms of <Katex tex="a" /> where appropriate.</>} examinerReport={EXAM_G}>
        <WorkingTable rows={ROWS_G} />
        <WrongMethod
          title="Differentiate term by term, but let −12ax disappear"
          source="Examiner's report"
          working={<Katex tex="\begin{aligned}p'(x)&=12x^3+12x^2+12(a-2)x\\&=12x\left(x^2+x+a-2\right)\\ \implies x&=0,\ \tfrac{-1\pm\sqrt{9-4a}}{2}\end{aligned}" />}
        >
          The derivative of <Katex tex="-12ax" /> is <Katex tex="-12a" />, not <Katex tex="0" />: <Katex tex="a" /> is
          a constant, so <Katex tex="-12ax" /> is just a linear term. Only <Katex tex="a^2" /> differentiates to{' '}
          <Katex tex="0" />. The <Katex tex="a=0" /> check can&apos;t catch this slip, because the missing term is
          zero then, so try <Katex tex="a=1" />: the true <Katex tex="p'(0)=-12a=-12\neq0" />, so <Katex tex="x=0" />{' '}
          is not a stationary point.
        </WrongMethod>
      </PartCard>

      <PartCard letter="h.i" topic="Stationary Points" marks={1} statement={<>Find the values of <Katex tex="a" /> for which <Katex tex="p" /> has only one stationary point.</>} examinerReport={EXAM_HI}>
        <Background>
          <p>
            A stationary point is any <Katex tex="x" /> where <Katex tex="p'(x)=0" />, whether or not the graph
            turns there. A stationary point of inflection, where the graph flattens and carries on in the same
            direction, still counts. So the question is simply how many different solutions{' '}
            <Katex tex="p'(x)=0" /> has.
          </p>
        </Background>
        <WorkingTable rows={ROWS_HI} />
        <Explore title="Why a = 1 still gives two stationary points">
          <StationaryWidget />
        </Explore>
        <WrongMethod
          title="One stationary point when the quadratic has one solution"
          source="Examiner's report"
          working={<Katex tex="\Delta=4-4a=0 \implies a=1" />}
        >
          At <Katex tex="a=1" />, <Katex tex="p'(x)=12(x-1)(x+1)^2" />, which is zero at <Katex tex="x=1" />{' '}
          <em>and</em> at <Katex tex="x=-1" />. The quadratic&apos;s single solution is an extra stationary point
          (a stationary point of inflection), on top of <Katex tex="x=1" />, which is always there. To have only
          one, the quadratic must contribute none: <Katex tex="\Delta<0" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="h.ii" topic="Minimum Value" marks={1} statement={<>Find the minimum value of <Katex tex="p" /> when <Katex tex="a=2" />.</>} examinerReport={EXAM_HII}>
        <WorkingTable rows={ROWS_HII} />
      </PartCard>

      <PartCard letter="h.iii" topic="Number of Solutions" marks={2} statement={<>If <Katex tex="p" /> has only one stationary point, find the values of <Katex tex="a" /> for which <Katex tex="p(x)=0" /> has no solutions.</>} examinerReport={EXAM_HIII}>
        <Background>
          <p>
            <Katex tex="92\%" /> scored zero here, and the report says many students did not
            attempt it. The wording carries two separate conditions and both must be imposed:
            "if <Katex tex="p" /> has only one stationary point" is part h.i.'s{' '}
            <Katex tex="a>1" />, and "<Katex tex="p(x)=0" /> has no solutions" is a statement
            about where the graph sits.
          </p>
          <p>
            The second condition is the one to translate carefully. A quartic with a single
            turning point misses the <Katex tex="x" />-axis exactly when that turning point is
            above it — so the whole thing reduces to the inequality{' '}
            <Katex tex="p(1)>0" />. No discriminant is involved; the report notes that some
            students tried to apply one to a cubic equation.
          </p>
        </Background>
        <WorkingTable rows={ROWS_HIII} />
        <Explore title="The lowest point has to clear the axis, and only one branch is allowed">
          <ClearWidget />
        </Explore>
        <WrongMethod
          title="Right method, but the inequality points the wrong way"
          source="Examiner's report"
          working={<Katex tex="a<\sqrt{14}+3" />}
        >
          Test a value it allows: <Katex tex="a=4" /> satisfies <Katex tex="a<\sqrt{14}+3" /> and <Katex tex="a>1" />,
          but <Katex tex="p(1)=16-24-5=-13" />. The minimum is below the axis, so <Katex tex="p(x)=0" /> has two
          solutions. Decide the direction from the condition itself: no solutions needs the minimum{' '}
          <em>above</em> the axis, <Katex tex="p(1)>0" />, and an upward parabola in <Katex tex="a" /> is positive
          outside its roots.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
