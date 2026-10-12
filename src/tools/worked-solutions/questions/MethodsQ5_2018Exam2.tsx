// 2018 Mathematical Methods — Exam 2, Section B, Question 5 (10 marks). A parameterised
// cubic and a line, their intersections and enclosed area, then the same cubic restricted so
// that it has an inverse, and the geometry of g against g⁻¹. Question text transcribed from
// the original paper (VCAA printed no diagram for this question). Every answer re-derived
// independently in sympy and checked against the VCAA examination report.
//
// Note on parts a. and b.: declaring x positive in a CAS silently drops the stationary point and
// the intersection at x = 0. Both matter — (c) depends on there being three intersections.
//
// Interactive widgets: c. strip sweep across the two regions, with the report's "same order on
// both intervals" mistake cancelling to 0, and a slider for a (meth-2018e2-q5c-two-regions);
// e. g in its box of area 2, then reflected in y = x so the part left of g lands under g⁻¹
// (meth-2018e2-q5e-reflect-box); f. the far endpoint P sliding along xy = 2 until it reaches
// y = x (meth-2018e2-q5f-endpoints); g. the four lobes between g and g⁻¹, and the single signed
// integral cancelling to 0 (meth-2018e2-q5g-lobes).
//
// Report text kept verbatim, with two slips in it: 5b.'s "As in Question 5b." evidently means
// 5a., and the wrong answer it quotes, (±√(9a² − 8) + 3)/3, is not what the 4a² misreading gives
// (that gives x = (3a ± √(9a² − 8))/6, checked in sympy). Explained in 5b.'s last-row `more`.
//
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const TwoRegionsWidget = lazyWidget(() => import('../interactives/meth-2018e2-q5c-two-regions'))
const ReflectBoxWidget = lazyWidget(() => import('../interactives/meth-2018e2-q5e-reflect-box'))
const EndpointsWidget = lazyWidget(() => import('../interactives/meth-2018e2-q5f-endpoints'))
const LobesWidget = lazyWidget(() => import('../interactives/meth-2018e2-q5g-lobes'))

const EXAM_A: SAExaminerStats = {
  marks: [32, 19, 49],
  average: 1.2,
  comment: (
    <>
      This question was answered reasonably well. Some students also gave the coordinates of
      the local minimum, <Katex tex="(0,0)" />. Others just gave the <Katex tex="x" /> value
      of the local maximum. <Katex tex="\left(\tfrac{2a}{3},\ 3a\right)" /> was a common
      incorrect answer. This occurs if <Katex tex="4a^2" /> is used for the denominator of{' '}
      <Katex tex="f(x)" /> instead of <Katex tex="4a^4" />. Some found <Katex tex="a" /> in terms of{' '}
      <Katex tex="x" /> and gave an answer of <Katex tex="a=\tfrac{3x}{2}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: (
    <>
      This question was generally well answered. Some students wrote{' '}
      <Katex tex="x=\tfrac23" />, <Katex tex="x=\tfrac13" /> or <Katex tex="x=0" />. A common
      incorrect answer was <Katex tex="x=\dfrac{\pm\sqrt{9a^2-8}+3}{3}" /> or{' '}
      <Katex tex="x=0" />. As in Question 5b., this occurs if <Katex tex="4a^2" /> is used for
      the denominator of <Katex tex="f(x)" /> instead of <Katex tex="4a^4" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [60, 6, 34],
  average: 0.8,
  comment: (
    <>
      Some students found only half of the area. Others had the correct expression for the
      area but did not have a correct answer. A common mistake was that students had the
      functions in the incorrect order, either both intervals were{' '}
      <Katex tex="h(x)-f(x)" /> or the other way around. Other students substituted a value
      for <Katex tex="a" /> and found the area.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [36, 64],
  average: 0.7,
  comment: <>This question was answered well.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [87, 6, 7],
  average: 0.2,
  comment: (
    <>
      There were a number of other approaches to this question, using symmetry. This question
      was not answered well.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [92, 8],
  average: 0.1,
  comment: <>This question was not answered well. Many students did not attempt this question.</>,
}

const EXAM_G: SAExaminerStats = {
  marks: [97, 3],
  average: 0.1,
  comment: <>This question was not answered well. Many students did not attempt this question.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{81x^2(a-x)}{4a^4} = \frac{81}{4a^4}\left(ax^2-x^3\right)" />,
    reason: <>Expand so the differentiation is routine. <Katex tex="a" /> is a fixed number, so treat <Katex tex="\tfrac{81}{4a^4}" /> like a constant in front.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{81}{4a^4}\left(2ax-3x^2\right) = \frac{81x(2a-3x)}{4a^4}" />,
    reason: <>Differentiate, then factorise to see both zeros of <Katex tex="f'" />. On CAS: <Cas fn="define">Define f(x)=81x^2(a-x)/(4a^4)</Cas>, then <Cas fn="derivative">d/dx(f(x))</Cas>.</>,
    more: <>Define <Katex tex="f" /> once at the start: every part of this question uses the same rule.</>,
  },
  {
    working: <Katex display tex="f'(x)=0 \implies x=0 \ \text{ or } \ x=\frac{2a}{3}" />,
    reason: <>Which is the maximum? <Katex tex="f(0)=f(a)=0" /> and <Katex tex="f(x)>0" /> for <Katex tex="0<x<a" />, so the curve rises then falls: <Katex tex="x=\tfrac{2a}{3}" /> is the local maximum.</>,
    more: <>Why positive: for <Katex tex="0<x<a" />, both <Katex tex="x^2" /> and <Katex tex="a-x" /> are positive. A sign check of <Katex tex="f'" /> agrees: <Katex tex="f'>0" /> just left of <Katex tex="\tfrac{2a}{3}" /> and <Katex tex="f'<0" /> just right. The <Katex tex="x^2" /> factor makes <Katex tex="x=0" /> a double root, where the graph touches the axis, so <Katex tex="(0,0)" /> is the local minimum. Solve <Katex tex="f'(x)=0" /> for <Katex tex="x" />, not for <Katex tex="a" />: the report notes some students gave <Katex tex="a=\tfrac{3x}{2}" />, which is not a point at all.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac{2a}{3}\right) = \frac{81\cdot\frac{4a^2}{9}\cdot\frac{a}{3}}{4a^4} = \frac{12a^3}{4a^4} = \frac{3}{a}" />,
    reason: <>Substitute <Katex tex="x=\tfrac{2a}{3}" />. The denominator is <Katex tex="4a^{\mathbf 4}" />, so <Katex tex="\tfrac{a^3}{a^4}" /> leaves <Katex tex="\tfrac1a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\frac{2a}{3},\ \frac{3}{a}\right)}" />,
    reason: <>Coordinates are asked for, so give both, and only the local maximum.</>,
    more: <>The report flags both of the other things students handed in: the <Katex tex="x" />-value alone, and the local minimum <Katex tex="(0,0)" /> added unasked.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{81x^2(a-x)}{4a^4} = \frac{9x}{2a^2}" />,
    reason: <>Intersections: set the rules equal. On CAS, <Cas fn="solve">solve(f(x)=h(x), x)</Cas> gives all three, but don&apos;t add a condition like <Katex tex="x>0" />: it drops <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}81x^2(a-x) &= 18a^2x\\\implies 81x^2(a-x)-18a^2x &= 0\end{aligned}" />,
    reason: <>Multiply both sides by <Katex tex="4a^4" />: <Katex tex="\tfrac{9x}{2a^2}\times4a^4=18a^2x" />.</>,
  },
  {
    working: <Katex display tex="9x\left(9ax-9x^2-2a^2\right) = 0" />,
    reason: <>Take out the common factor <Katex tex="9x" />, rather than dividing by <Katex tex="x" />. This factor gives <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="9x^2-9ax+2a^2 = (3x-a)(3x-2a) = 0" />,
    reason: <>Multiply the bracket by <Katex tex="-1" /> so the <Katex tex="x^2" /> term is positive, then factorise.</>,
    more: <>You want two brackets whose first terms multiply to <Katex tex="9x^2" />, last terms to <Katex tex="2a^2" />, and cross terms add to <Katex tex="-9ax" />: <Katex tex="(3x-a)(3x-2a)" /> does it. The quadratic formula works too: <Katex tex="x=\tfrac{9a\pm3a}{18}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 0, \quad x = \frac{a}{3}, \quad x = \frac{2a}{3}}" />,
    reason: <>All three intersections, in terms of <Katex tex="a" />. Part c. needs every one.</>,
    more: <>The last one, <Katex tex="x=\tfrac{2a}{3}" />, is the local maximum from part a.: the line passes exactly through the crest of the cubic, since <Katex tex="h\left(\tfrac{2a}{3}\right)=\tfrac3a" /> too. The report links its common incorrect answer to reading the denominator as <Katex tex="4a^2" /> instead of <Katex tex="4a^4" />. That slip gives <Katex tex="9x^2-9ax+2=0" />, so <Katex tex="x=\tfrac{3a\pm\sqrt{9a^2-8}}{6}" />: not exactly the report&apos;s printed form, but the same <Katex tex="\sqrt{9a^2-8}" />. The correct quadratic factorises neatly, so a surd here is a sign the denominator was misread.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} x=\tfrac a6&: \ h=\tfrac{24}{32a} > f=\tfrac{15}{32a} \\ x=\tfrac a2&: \ f=\tfrac{81}{32a} > h=\tfrac{72}{32a} \end{aligned}" />,
    reason: <>Which curve is on top? Test a point in each interval between the intersections <Katex tex="0" />, <Katex tex="\tfrac a3" /> and <Katex tex="\tfrac{2a}{3}" />.</>,
  },
  {
    working: <Katex display tex="\text{On } \left(0,\tfrac{a}{3}\right): \ h>f; \qquad \text{On } \left(\tfrac{a}{3},\tfrac{2a}{3}\right): \ f>h" />,
    reason: <>The curves swap order at <Katex tex="x=\tfrac a3" />, so the order of subtraction must swap too.</>,
  },
  {
    working: <Katex display tex="A_1 = \int_0^{a/3}\bigl(h(x)-f(x)\bigr)dx = \frac{1}{16}" />,
    reason: <>Upper minus lower on the first region. With <Katex tex="f" /> and <Katex tex="h" /> defined, the CAS definite-integral template gives this exactly, with <Katex tex="a" /> still a letter.</>,
  },
  {
    working: <Katex display tex="A_2 = \int_{a/3}^{2a/3}\bigl(f(x)-h(x)\bigr)dx = \frac{1}{16}" />,
    reason: <>Upper minus lower on the second region.</>,
    more: <>The two areas happen to be equal, but that has to be found by integrating, not assumed.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{1}{16}+\frac{1}{16} = \frac18}" />,
    reason: <>Add both regions. The <Katex tex="a" /> cancels completely, so the total area is a plain number.</>,
    more: <>The report notes some students found only half of the area, and others had the right integrals but not the right value: let CAS evaluate them exactly. Why no <Katex tex="a" />: changing <Katex tex="a" /> stretches the picture sideways by a factor of <Katex tex="a" /> and squashes it vertically by <Katex tex="\tfrac1a" />, which leaves every area unchanged. That is why substituting a particular <Katex tex="a" /> (which the report says some students did) gives the right number, but it does not answer the question for every <Katex tex="a" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g\!\left(\frac{2a}{3}\right) = \frac{3}{a}" />,
    reason: <><Katex tex="g" /> is the rule of <Katex tex="f" /> restricted to <Katex tex="\left[0,\tfrac{2a}{3}\right]" />, so this is part a.&apos;s maximum value.</>,
  },
  {
    working: <Katex display tex="\frac{2a}{3}\times g\!\left(\frac{2a}{3}\right) = \frac{2a}{3}\times\frac{3}{a}" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="\boxed{2}" />,
    reason: <>The <Katex tex="a" />s cancel entirely.</>,
    more: <>Geometrically, <Katex tex="\tfrac{2a}{3}\times g\left(\tfrac{2a}{3}\right)" /> is width × height of the rectangle with corners <Katex tex="(0,0)" /> and <Katex tex="\left(\tfrac{2a}{3},\tfrac{3}{a}\right)" />: the box the graph of <Katex tex="g" /> fits in exactly, since <Katex tex="g" /> rises from one corner to the other. Its area is <Katex tex="2" /> whatever <Katex tex="a" /> is. A one-mark &ldquo;evaluate&rdquo; like this is usually set up for the next part: part e. needs this box.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \int_0^{3/a} g^{-1}(x)\,dx" />,
    reason: <>The line is <Katex tex="x=g\left(\tfrac{2a}{3}\right)=\tfrac3a" />, and <Katex tex="g^{-1}" /> runs from <Katex tex="(0,0)" /> to <Katex tex="\left(\tfrac3a,\tfrac{2a}{3}\right)" />. <Katex tex="g^{-1}" /> has no easy rule, so reflect the region instead of integrating this.</>,
  },
  {
    working: <Katex display tex="= \frac{2a}{3}\times\frac{3}{a} - \int_0^{2a/3} g(x)\,dx" />,
    reason: <>Reflected in <Katex tex="y=x" /> (same area), the region is the part of <Katex tex="g" />&apos;s box, <Katex tex="\tfrac{2a}{3}" /> wide and <Katex tex="\tfrac3a" /> high, <em>above</em> (left of) <Katex tex="g" />: the box minus the area under <Katex tex="g" />.</>,
    more: <>Reflecting swaps <Katex tex="x" /> and <Katex tex="y" />: &ldquo;under <Katex tex="g^{-1}" />, for <Katex tex="0\le x\le\tfrac3a" />&rdquo; becomes &ldquo;left of <Katex tex="g" /> and right of the <Katex tex="y" />-axis, for <Katex tex="0\le y\le\tfrac3a" />&rdquo;. This is the report&apos;s expression.</>,
  },
  {
    working: <Katex display tex="\int_0^{2a/3} g(x)\,dx = \frac{81}{4a^4}\left[\frac{ax^3}{3}-\frac{x^4}{4}\right]_0^{2a/3}" />,
    reason: <>The area under <Katex tex="g" />, which does have a rule to integrate. On CAS, the definite-integral template gives <Katex tex="1" /> directly.</>,
  },
  {
    working: <Katex display tex="= \frac{81}{4a^4}\left(\frac{8a^4}{81}-\frac{4a^4}{81}\right) = 1" />,
    reason: <>By hand: every term carries <Katex tex="a^4" />, so the <Katex tex="a" />s cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 2 - 1 = 1}" />,
    reason: <>The box (part d.) minus the area under <Katex tex="g" />.</>,
    more: <>Only <Katex tex="7\%" /> of students scored both marks. Here <Katex tex="g" /> happens to cut its box exactly in half (<Katex tex="1" /> and <Katex tex="1" />), so the area under <Katex tex="g^{-1}" /> equals the area under <Katex tex="g" />. That is a coincidence of this function, not the method: it is always the part above <Katex tex="g" /> that reflects to the part under <Katex tex="g^{-1}" />. As the report says, other approaches using symmetry also work.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="g: \ (0,0) \to \left(\frac{2a}{3},\ \frac{3}{a}\right)" />,
    reason: <><Katex tex="g(0)=0" /> and <Katex tex="g\left(\tfrac{2a}{3}\right)=\tfrac3a" /> (part d.). <Katex tex="g" /> is increasing in between (its turning points are the two ends), which is why <Katex tex="g^{-1}" /> exists.</>,
  },
  {
    working: <Katex display tex="g^{-1}: \ (0,0) \to \left(\frac{3}{a},\ \frac{2a}{3}\right)" />,
    reason: <>Reflecting in <Katex tex="y=x" /> swaps the coordinates. <Katex tex="(0,0)" /> is already shared, so only the far endpoints must match.</>,
  },
  {
    working: <Katex display tex="\frac{2a}{3} = \frac{3}{a} \implies 2a^2 = 9" />,
    reason: <>A point equals its reflection exactly when it lies on the mirror line <Katex tex="y=x" />, i.e. its two coordinates are equal.</>,
  },
  {
    working: <Katex display tex="a^2 = \frac92 \implies a = \frac{3}{\sqrt2} = \frac{3\sqrt2}{2}" />,
    reason: <>Only the positive root, since <Katex tex="a" /> is given as a positive real number.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac{3\sqrt2}{2}}" />,
    reason: <>Both far endpoints are then <Katex tex="\left(\sqrt2,\sqrt2\right)" />.</>,
    more: <>(<Katex tex="a\approx2.12" />.) Only <Katex tex="8\%" /> of students scored this mark. Part d. gives a second view: the far endpoint of <Katex tex="g" /> always has <Katex tex="x\times y=2" />, so as <Katex tex="a" /> changes it slides along <Katex tex="y=\tfrac2x" />, which meets <Katex tex="y=x" /> at <Katex tex="\left(\sqrt2,\sqrt2\right)" />.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{3\sqrt2}{2} \implies a^4 = \frac{81}{4} \implies \frac{81}{4a^4} = 1" />,
    reason: <>Substitute part f.&apos;s value: the constant in front becomes <Katex tex="1" />, which keeps the arithmetic manageable.</>,
  },
  {
    working: <Katex display tex="g(x) = x^2\left(\frac{3\sqrt2}{2}-x\right), \quad x\in\left[0,\sqrt2\right]" />,
    reason: <>The domain is <Katex tex="\left[0,\tfrac{2a}{3}\right]=\left[0,\sqrt2\right]" />.</>,
  },
  {
    working: <Katex display tex="g(x) = x \implies x = 0, \ \frac{\sqrt2}{2}, \ \sqrt2" />,
    reason: <><Katex tex="g" /> is increasing, so <Katex tex="g" /> and <Katex tex="g^{-1}" /> meet only on <Katex tex="y=x" />: <Cas fn="solve">solve(g(x)=x, x)</Cas>. The middle crossing means the region between <Katex tex="g" /> and the line comes in two pieces.</>,
    more: <>By hand: <Katex tex="g(x)-x=-x\left(x^2-\tfrac{3\sqrt2}{2}x+1\right)" />. You already know <Katex tex="x=\sqrt2" /> (the shared endpoint) is a root, so <Katex tex="x-\sqrt2" /> is a factor: <Katex tex="x^2-\tfrac{3\sqrt2}{2}x+1=\left(x-\sqrt2\right)\left(x-\tfrac{\sqrt2}{2}\right)" />. So <Katex tex="g" /> crosses <Katex tex="y=x" /> in the middle of the interval as well as at both ends.</>,
  },
  {
    working: <Katex display tex="\int_0^{\frac{\sqrt2}{2}}\bigl(x-g(x)\bigr)dx = \frac{1}{16}" />,
    reason: <>On <Katex tex="\left(0,\tfrac{\sqrt2}{2}\right)" />, <Katex tex="g" /> is below <Katex tex="y=x" /> (at <Katex tex="x=\tfrac12" />, <Katex tex="g\approx0.41<0.5" />), so integrate line minus curve.</>,
  },
  {
    working: <Katex display tex="\int_{\frac{\sqrt2}{2}}^{\sqrt2}\bigl(g(x)-x\bigr)dx = \frac{1}{16}" />,
    reason: <>Here <Katex tex="g" /> is above <Katex tex="y=x" />, so swap to curve minus line.</>,
    more: <>Integrating <Katex tex="x-g(x)" /> over the whole of <Katex tex="\left[0,\sqrt2\right]" /> in one go gives <Katex tex="\tfrac1{16}-\tfrac1{16}=0" />: the two pieces cancel. Split at the crossing and take upper minus lower on each piece.</>,
  },
  {
    working: <Katex display tex="\text{Area} = 2\left(\frac{1}{16}+\frac{1}{16}\right)" />,
    reason: <>Each piece between <Katex tex="g" /> and <Katex tex="y=x" /> has a mirror image between <Katex tex="y=x" /> and <Katex tex="g^{-1}" />, so double.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \frac14}" />,
    reason: <>The area enclosed by <Katex tex="g" /> and <Katex tex="g^{-1}" />, in square units.</>,
    more: <>The hardest part on the paper: <Katex tex="97\%" /> scored zero.</>,
  },
]

export default function MethodsQ5_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (10 marks)</p>
        <p className="mb-2">Consider functions of the form</p>
        <p className="text-center mb-2">
          <Katex display tex="f:R\to R,\ f(x)=\frac{81x^2(a-x)}{4a^4}" />
        </p>
        <p className="mb-2">and</p>
        <p className="text-center mb-2">
          <Katex display tex="h:R\to R,\ h(x)=\frac{9x}{2a^2}" />
        </p>
        <p>where <Katex tex="a" /> is a positive real number.</p>
      </div>

      <PartCard letter="a" topic="Local Maximum" marks={2} statement={<>Find the coordinates of the local maximum of <Katex tex="f" /> in terms of <Katex tex="a" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Read the denominator as 4a²"
          source="Examiner's report"
          working={<Katex display tex="f\left(\tfrac{2a}{3}\right) = \frac{81\cdot\frac{4a^2}{9}\cdot\frac{a}{3}}{4a^2} = 3a" />}
        >
          The denominator is <Katex tex="4a^4" />. With <Katex tex="4a^2" />, only two of the four powers
          of <Katex tex="a" /> cancel, leaving <Katex tex="3a" /> instead of <Katex tex="\tfrac3a" />.
          Catch it with a quick numerical check on the rule as printed: with <Katex tex="a=2" />, the
          maximum is at <Katex tex="x=\tfrac43" /> and <Katex tex="f\left(\tfrac43\right)=\tfrac32" />,
          which is <Katex tex="\tfrac3a" />, not <Katex tex="3a=6" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Intersections" marks={1} statement={<>Find the <Katex tex="x" />-values of all of the points of intersection between the graphs of <Katex tex="f" /> and <Katex tex="h" />, in terms of <Katex tex="a" /> where appropriate.</>} examinerReport={EXAM_B}>
        <Background>
          <p>
            Both rules give <Katex tex="0" /> at <Katex tex="x=0" />, so the origin is always an
            intersection. It is the easy one to lose: cancelling an <Katex tex="x" /> from both
            sides divides by zero there, and part c. then comes out wrong.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Answers with no a in them: x = 0, 1/3, 2/3"
          source="Examiner's report"
          working={<Katex display tex="\frac{81x^2(1-x)}{4} = \frac{9x}{2} \implies x = 0,\ \tfrac13,\ \tfrac23" />}
        >
          The report lists these answers, and they are exactly the intersections for <Katex tex="a=1" />. The question asks for them in terms
          of <Katex tex="a" />, so the answer must work for every positive <Katex tex="a" />, and two of
          the three intersections move as <Katex tex="a" /> changes. If a CAS answer comes back with
          no <Katex tex="a" /> in it, check that <Katex tex="a" /> hasn&apos;t been given a value (it may
          still be stored from an earlier question).
        </WrongMethod>
      </PartCard>

      <PartCard letter="c" topic="Area Between Curves" marks={2} statement={<>Determine the total area of the regions bounded by the graphs of <Katex tex="y=f(x)" /> and <Katex tex="y=h(x)" />.</>} examinerReport={EXAM_C}>
        <Background>
          <p>
            Three intersections means <em>two</em> enclosed regions, each needing its own
            integral of (upper − lower).
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Why the area needs two integrals: the curves swap at x = a/3">
          <TwoRegionsWidget />
        </Explore>
        <WrongMethod
          title="Use h(x) − f(x) on both intervals"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\int_0^{a/3}\bigl(h-f\bigr)dx + \int_{a/3}^{2a/3}\bigl(h-f\bigr)dx" />
              <Katex display tex="= \frac1{16} - \frac1{16} = 0" />
            </>
          }
        >
          On <Katex tex="\left(\tfrac a3,\tfrac{2a}{3}\right)" /> the cubic is above the line, so{' '}
          <Katex tex="h-f" /> is negative there and that integral comes out as{' '}
          <Katex tex="-\tfrac1{16}" />, cancelling the first region (<Katex tex="f-h" /> on both gives{' '}
          <Katex tex="0" /> as well). An area of <Katex tex="0" />, or a negative integral for something
          you meant as an area, is the alarm: test a point in each interval to see which curve is on
          top, and swap the order where they cross.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Consider the function{' '}
          <Katex tex="g:\left[0,\dfrac{2a}{3}\right]\to R,\ g(x)=\dfrac{81x^2(a-x)}{4a^4}" />,
          where <Katex tex="a" /> is a positive real number.
        </p>
      </div>

      <PartCard letter="d" topic="Function Value" marks={1} statement={<>Evaluate <Katex tex="\dfrac{2a}{3}\times g\!\left(\dfrac{2a}{3}\right)" />.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" topic="Inverse Area" marks={2} statement={<>Find the area bounded by the graph of <Katex tex="g^{-1}" />, the <Katex tex="x" />-axis and the line <Katex tex="x=g\!\left(\dfrac{2a}{3}\right)" />.</>} examinerReport={EXAM_E}>
        <Background>
          <p>
            A rule for <Katex tex="g^{-1}" /> would mean solving{' '}
            <Katex tex="y=\tfrac{81x^2(a-x)}{4a^4}" /> for <Katex tex="x" />, a cubic: not
            practical. Two facts avoid it. Reflecting a region in <Katex tex="y=x" /> does not
            change its area, and part d. has already given the area of the box that{' '}
            <Katex tex="g" /> fits in.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <Explore title="Why the area under g⁻¹ is the box minus the area under g">
          <ReflectBoxWidget />
        </Explore>
      </PartCard>

      <PartCard letter="f" topic="Find Parameter" marks={1} statement={<>Find the value of <Katex tex="a" /> for which the graphs of <Katex tex="g" /> and <Katex tex="g^{-1}" /> have the same endpoints.</>} examinerReport={EXAM_F}>
        <WorkingTable rows={ROWS_F} />
        <Explore title="Why the endpoints match only when the corner lands on y = x">
          <EndpointsWidget />
        </Explore>
      </PartCard>

      <PartCard letter="g" topic="Area Between Curves" marks={1} statement={<>Find the area enclosed by the graphs of <Katex tex="g" /> and <Katex tex="g^{-1}" /> when they have the same endpoints.</>} examinerReport={EXAM_G}>
        <Background>
          <p>
            A curve and its inverse are mirror images in <Katex tex="y=x" />, so the region
            they enclose is symmetric about that line. Find the area between{' '}
            <Katex tex="g" /> and <Katex tex="y=x" />, then double it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_G} />
        <Explore title="Why the enclosed area is four lobes of 1/16, not zero">
          <LobesWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
