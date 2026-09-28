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
// (that gives x = (3a ± √(9a² − 8))/6, checked in sympy). Not relied on in our working.
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
    reason: <>Expanding makes the differentiation routine. Everything outside the bracket is a constant, since <Katex tex="a" /> is a fixed positive number: treat <Katex tex="\tfrac{81}{4a^4}" /> exactly as you would a plain number in front.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{81}{4a^4}\left(2ax-3x^2\right) = \frac{81x(2a-3x)}{4a^4}" />,
    reason: <>Differentiate, then factorise: the factorised form shows both zeros of <Katex tex="f'" /> at a glance. On CAS, store the rule once with <Cas fn="define">Define f(x)=81x^2(a-x)/(4a^4)</Cas> (every part of this question uses it), then take <Cas fn="derivative">d/dx(f(x))</Cas>.</>,
  },
  {
    working: <Katex display tex="f'(x)=0 \implies x=0 \ \text{ or } \ x=\frac{2a}{3}" />,
    reason: <>Two stationary points, so which is the maximum? The <Katex tex="x^2" /> factor makes <Katex tex="x=0" /> a double root, where the graph touches the axis, and <Katex tex="f(x)>0" /> for <Katex tex="0<x<a" /> (both <Katex tex="x^2" /> and <Katex tex="a-x" /> are positive). So the curve rises from <Katex tex="0" /> and comes back down to <Katex tex="0" /> at <Katex tex="x=a" />: the turning point in between, <Katex tex="x=\tfrac{2a}{3}" />, is the local maximum, and <Katex tex="(0,0)" /> is a local minimum.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac{2a}{3}\right) = \frac{81\cdot\frac{4a^2}{9}\cdot\frac{a}{3}}{4a^4} = \frac{12a^3}{4a^4} = \frac{3}{a}" />,
    reason: <>Substituting. The <Katex tex="a" />s reduce from <Katex tex="a^3/a^4" /> to <Katex tex="1/a" /> — note the denominator is <Katex tex="4a^{\mathbf 4}" />, and the report says reading it as <Katex tex="4a^2" /> is what produced the common wrong answer <Katex tex="\left(\tfrac{2a}{3},3a\right)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\frac{2a}{3},\ \frac{3}{a}\right)}" />,
    reason: <>The local <em>maximum</em>, and coordinates rather than just <Katex tex="x" /> — the report flags both of the other things students handed in: the <Katex tex="x" />-value alone, and the local minimum <Katex tex="(0,0)" /> added unasked.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{81x^2(a-x)}{4a^4} = \frac{9x}{2a^2}" />,
    reason: <>Intersections are the <Katex tex="x" />-values where both rules give the same <Katex tex="y" />, so set the rules equal. On CAS, <Cas fn="solve">solve(f(x)=h(x), x)</Cas> returns all three at once; just don&apos;t add a condition such as <Katex tex="x>0" />, which throws away <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="81x^2(a-x) = 18a^2x \implies 81x^2(a-x)-18a^2x = 0" />,
    reason: <>Multiplying both sides by <Katex tex="4a^4" />: the right-hand side becomes <Katex tex="\tfrac{9x}{2a^2}\times4a^4=18a^2x" />.</>,
  },
  {
    working: <Katex display tex="9x\left(9ax-9x^2-2a^2\right) = 0" />,
    reason: <>Take out the common factor <Katex tex="9x" />. This is where <Katex tex="x=0" /> comes from — dividing through by <Katex tex="x" /> instead of factorising loses it.</>,
  },
  {
    working: <Katex display tex="9x^2-9ax+2a^2 = (3x-a)(3x-2a) = 0" />,
    reason: <>Multiply the bracket by <Katex tex="-1" /> so the <Katex tex="x^2" /> term is positive, then factorise. You want two brackets whose first terms multiply to <Katex tex="9x^2" />, last terms to <Katex tex="2a^2" />, and cross terms add to <Katex tex="-9ax" />: <Katex tex="(3x-a)(3x-2a)" /> does it. The quadratic formula works too: <Katex tex="x=\tfrac{9a\pm3a}{18}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 0, \quad x = \frac{a}{3}, \quad x = \frac{2a}{3}}" />,
    reason: <>Three intersections, and all three are needed for part c. Note the last one, <Katex tex="x=\tfrac{2a}{3}" />, is the local maximum from part a. — the line passes exactly through the crest of the cubic, since <Katex tex="h\left(\tfrac{2a}{3}\right)=\tfrac3a" /> too.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{On } \left(0,\tfrac{a}{3}\right): \ h>f; \qquad \text{On } \left(\tfrac{a}{3},\tfrac{2a}{3}\right): \ f>h" />,
    reason: <>How do you know which is on top? Test a point in each interval. At <Katex tex="x=\tfrac a6" />, <Katex tex="h=\tfrac{24}{32a}" /> and <Katex tex="f=\tfrac{15}{32a}" />; at <Katex tex="x=\tfrac a2" />, <Katex tex="h=\tfrac{72}{32a}" /> and <Katex tex="f=\tfrac{81}{32a}" />. The curves swap order at the middle intersection, so the integrand must swap too. The report names having the functions in the incorrect order on both intervals as a common mistake.</>,
  },
  {
    working: <Katex display tex="A_1 = \int_0^{a/3}\bigl(h(x)-f(x)\bigr)dx = \frac{1}{16}" />,
    reason: <>Upper minus lower on the first region. With <Katex tex="f" /> and <Katex tex="h" /> defined, the CAS definite-integral template gives this exactly, still with <Katex tex="a" /> as a letter.</>,
  },
  {
    working: <Katex display tex="A_2 = \int_{a/3}^{2a/3}\bigl(f(x)-h(x)\bigr)dx = \frac{1}{16}" />,
    reason: <>Upper minus lower on the second. The two happen to be equal — a pleasant symmetry, but it must be shown, not assumed.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{1}{16}+\frac{1}{16} = \frac18}" />,
    reason: <>Both regions, so both integrals — the report notes some students found only half of the area. Striking result: the total is a pure number with no <Katex tex="a" /> in it at all. Changing <Katex tex="a" /> stretches the picture sideways by a factor of <Katex tex="a" /> and squashes it vertically by <Katex tex="\tfrac1a" />, which leaves every area unchanged. That is why substituting a particular <Katex tex="a" /> (another approach the report mentions) happens to give the right number while not answering the question as asked.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g\!\left(\frac{2a}{3}\right) = \frac{3}{a}" />,
    reason: <><Katex tex="g" /> is the same rule as <Katex tex="f" />, restricted to <Katex tex="\left[0,\tfrac{2a}{3}\right]" />, so this is part a.&apos;s maximum value.</>,
  },
  {
    working: <Katex display tex="\frac{2a}{3}\times g\!\left(\frac{2a}{3}\right) = \frac{2a}{3}\times\frac{3}{a}" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="\boxed{2}" />,
    reason: <>The <Katex tex="a" />s cancel entirely. Geometrically, <Katex tex="\tfrac{2a}{3}\times g\left(\tfrac{2a}{3}\right)" /> is width × height of the rectangle with corners <Katex tex="(0,0)" /> and <Katex tex="\left(\tfrac{2a}{3},\tfrac{3}{a}\right)" /> — the box the graph of <Katex tex="g" /> fits in exactly, since <Katex tex="g" /> rises from one corner to the other. Its area is <Katex tex="2" /> whatever <Katex tex="a" /> is. A one-mark &ldquo;evaluate&rdquo; like this is usually set up for the next part: part e. needs this box.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \int_0^{3/a} g^{-1}(x)\,dx" />,
    reason: <>The line is <Katex tex="x=g\left(\tfrac{2a}{3}\right)=\tfrac3a" /> (part d.). <Katex tex="g^{-1}" /> runs from <Katex tex="(0,0)" /> to <Katex tex="\left(\tfrac3a,\tfrac{2a}{3}\right)" />, so the region is everything under <Katex tex="g^{-1}" /> from <Katex tex="x=0" /> to <Katex tex="x=\tfrac3a" />. A rule for <Katex tex="g^{-1}" /> would mean solving a cubic for <Katex tex="x" />, so don&apos;t integrate it directly: reflect the region instead.</>,
  },
  {
    working: <Katex display tex="= \frac{2a}{3}\times\frac{3}{a} - \int_0^{2a/3} g(x)\,dx" />,
    reason: <>Reflect the region in <Katex tex="y=x" />, which does not change its area. It lands between the graph of <Katex tex="g" /> and the <Katex tex="y" />-axis: the part of <Katex tex="g" />&apos;s box (width <Katex tex="\tfrac{2a}{3}" />, height <Katex tex="\tfrac3a" />) that lies to the <em>left</em> of <Katex tex="g" />. That is the whole box minus the part under <Katex tex="g" />. This is the report&apos;s expression.</>,
  },
  {
    working: <Katex display tex="\int_0^{2a/3} g(x)\,dx = \frac{81}{4a^4}\left[\frac{ax^3}{3}-\frac{x^4}{4}\right]_0^{2a/3}" />,
    reason: <>The area under <Katex tex="g" />, which does have a rule you can integrate. On CAS, the definite-integral template gives <Katex tex="1" /> directly.</>,
  },
  {
    working: <Katex display tex="= \frac{81}{4a^4}\left(\frac{8a^4}{81}-\frac{4a^4}{81}\right) = 1" />,
    reason: <>By hand, every term carries <Katex tex="a^4" />, so the <Katex tex="a" />s cancel. Like part d., this is independent of <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 2 - 1 = 1}" />,
    reason: <>Only <Katex tex="7\%" /> of students scored both marks. Notice <Katex tex="g" /> cuts its box exactly in half (<Katex tex="1" /> and <Katex tex="1" />), which is why the area under <Katex tex="g^{-1}" /> equals the area under <Katex tex="g" /> here. That is a coincidence of this function: in general the region under <Katex tex="g" /> reflects to the region <em>beside</em> <Katex tex="g^{-1}" />, not under it.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="g: \ (0,0) \to \left(\frac{2a}{3},\ \frac{3}{a}\right)" />,
    reason: <>The endpoints of <Katex tex="g" />: <Katex tex="g(0)=0" /> and <Katex tex="g\left(\tfrac{2a}{3}\right)=\tfrac3a" /> (part d.). Between them <Katex tex="g" /> is increasing (its turning points are exactly at these two ends), which is why <Katex tex="g^{-1}" /> exists at all.</>,
  },
  {
    working: <Katex display tex="g^{-1}: \ (0,0) \to \left(\frac{3}{a},\ \frac{2a}{3}\right)" />,
    reason: <>Reflecting in <Katex tex="y=x" /> swaps each coordinate pair. Both graphs already share the endpoint <Katex tex="(0,0)" />, so only the other one has to be matched.</>,
  },
  {
    working: <Katex display tex="\frac{2a}{3} = \frac{3}{a} \implies 2a^2 = 9" />,
    reason: <>The far endpoint of <Katex tex="g" /> and its reflection are the same point exactly when that point lies on the mirror line <Katex tex="y=x" />, i.e. when its two coordinates are equal.</>,
  },
  {
    working: <Katex display tex="a^2 = \frac92 \implies a = \frac{3}{\sqrt2} = \frac{3\sqrt2}{2}" />,
    reason: <>Only the positive root, since <Katex tex="a" /> is given as a positive real number.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac{3\sqrt2}{2}}" />,
    reason: <>(<Katex tex="\approx2.12" />.) Then both endpoints sit at <Katex tex="\left(\sqrt2,\sqrt2\right)" /> on the line <Katex tex="y=x" />. Only <Katex tex="8\%" /> of students scored this mark. Part d. gives a second view: the far endpoint always has <Katex tex="x\times y=2" />, so as <Katex tex="a" /> changes it slides along <Katex tex="y=\tfrac2x" />, which meets <Katex tex="y=x" /> at <Katex tex="\left(\sqrt2,\sqrt2\right)" />.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{3\sqrt2}{2} \implies a^4 = \frac{81}{4} \implies \frac{81}{4a^4} = 1" />,
    reason: <>Substituting part f.&apos;s value. The constant in front becomes <Katex tex="1" />, which is what makes the arithmetic manageable.</>,
  },
  {
    working: <Katex display tex="g(x) = x^2\left(\frac{3\sqrt2}{2}-x\right), \quad x\in\left[0,\sqrt2\right]" />,
    reason: <>The domain is <Katex tex="\left[0,\tfrac{2a}{3}\right]=\left[0,\sqrt2\right]" />.</>,
  },
  {
    working: <Katex display tex="g(x) = x \implies x = 0, \ \frac{\sqrt2}{2}, \ \sqrt2" />,
    reason: <>Because <Katex tex="g" /> is increasing, <Katex tex="g" /> and <Katex tex="g^{-1}" /> can only meet on <Katex tex="y=x" />, so solving <Katex tex="g(x)=x" /> finds every intersection (<Cas fn="solve">solve(g(x)=x, x)</Cas>). By hand: <Katex tex="x\left(x^2-\tfrac{3\sqrt2}{2}x+1\right)=0" />, and the quadratic&apos;s roots multiply to <Katex tex="1" />; one is the known endpoint <Katex tex="\sqrt2" />, so the other is <Katex tex="\tfrac{1}{\sqrt2}" />. <Katex tex="g" /> crosses <Katex tex="y=x" /> in the <em>middle</em> of the interval as well as at both ends, so the enclosed region is two pieces, not one.</>,
  },
  {
    working: <Katex display tex="\int_0^{\frac{\sqrt2}{2}}\bigl(x-g(x)\bigr)dx = \frac{1}{16}" />,
    reason: <>Between <Katex tex="0" /> and <Katex tex="\tfrac{\sqrt2}{2}" />, <Katex tex="g" /> is below <Katex tex="y=x" /> (at <Katex tex="x=\tfrac12" />, <Katex tex="g\approx0.41" />), so the line minus the curve is positive.</>,
  },
  {
    working: <Katex display tex="\int_{\frac{\sqrt2}{2}}^{\sqrt2}\bigl(x-g(x)\bigr)dx = -\frac{1}{16}" />,
    reason: <>Equal in size, opposite in sign: <Katex tex="g" /> is above <Katex tex="y=x" /> on this stretch. Adding the two signed values would give zero, so take magnitudes.</>,
  },
  {
    working: <Katex display tex="\text{Area} = 2\left(\frac{1}{16}+\frac{1}{16}\right)" />,
    reason: <>Each lobe between <Katex tex="g" /> and <Katex tex="y=x" /> has a mirror image between <Katex tex="y=x" /> and <Katex tex="g^{-1}" />, so the region enclosed by the two curves is double the region between <Katex tex="g" /> and the line.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \frac14}" />,
    reason: <>The hardest part on the paper — <Katex tex="97\%" /> scored zero. (<Katex tex="0.25" /> square units: two small lobes of <Katex tex="0.0625" /> each and their reflections.)</>,
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
            Factorise rather than divide. Both rules vanish at <Katex tex="x=0" />, so{' '}
            <Katex tex="x=0" /> is one of the intersections — cancelling an <Katex tex="x" />{' '}
            from both sides quietly throws it away, and part c. then comes out wrong.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Give a a value (say a = 1) to make it easier"
          source="Examiner's report"
          working={<Katex display tex="\frac{81x^2(1-x)}{4} = \frac{9x}{2} \implies x = 0,\ \tfrac13,\ \tfrac23" />}
        >
          These are the intersections for <Katex tex="a=1" /> only. The question asks for them in terms
          of <Katex tex="a" />, so the answer must work for every positive <Katex tex="a" />, and two of
          the three intersections move as <Katex tex="a" /> changes. If a CAS answer comes back with
          no <Katex tex="a" /> in it, check that <Katex tex="a" /> hasn&apos;t been given a value (it may
          still be stored from an earlier question).
        </WrongMethod>
      </PartCard>

      <PartCard letter="c" topic="Area Between Curves" marks={2} statement={<>Determine the total area of the regions bounded by the graphs of <Katex tex="y=f(x)" /> and <Katex tex="y=h(x)" />.</>} examinerReport={EXAM_C}>
        <Background>
          <p>
            Three intersections means <em>two</em> enclosed regions, and the curves change
            places at the middle one. So the integrand flips between them: it is always
            (upper − lower), but which function is upper changes.
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
            Do not try to find a rule for <Katex tex="g^{-1}" /> — that means solving a cubic
            for <Katex tex="x" />. Use the reflection instead.
          </p>
          <p>
            <Katex tex="g" /> runs from <Katex tex="(0,0)" /> to{' '}
            <Katex tex="\left(\tfrac{2a}{3},\tfrac3a\right)" />, so it sits inside a rectangle
            whose area part d. just told you is <Katex tex="2" />. Reflecting in{' '}
            <Katex tex="y=x" /> turns that rectangle on its side and swaps "under the curve"
            with "left of the curve". The area under <Katex tex="g^{-1}" /> is therefore the
            rectangle minus the area under <Katex tex="g" />.
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
          <p>
            The catch is that <Katex tex="g" /> crosses <Katex tex="y=x" /> partway along, not
            only at the ends. That makes two separate lobes with opposite signs, so the signed
            integral over the whole interval is zero and magnitudes have to be taken lobe by
            lobe.
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
