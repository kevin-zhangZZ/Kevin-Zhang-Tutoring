// 2018 Mathematical Methods — Exam 2, Section B, Question 5 (10 marks). A parameterised
// cubic and a line, their intersections and enclosed area, then the same cubic restricted so
// that it has an inverse, and the geometry of g against g⁻¹. Question text transcribed from
// the original paper (VCAA printed no diagram for this question). Every answer re-derived
// independently in sympy and checked against the VCAA examination report.
//
// Note on (a) and (b): declaring x positive in a CAS silently drops the stationary point and
// the intersection at x = 0. Both matter — (c) depends on there being three intersections.
//
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [32, 19, 49],
  average: 1.2,
  comment: (
    <>
      This question was answered reasonably well. Some students also gave the coordinates of
      the local minimum, <Katex tex="(0,0)" />. Others just gave the <Katex tex="x" /> value
      of the local maximum. <Katex tex="\left(\tfrac{2a}{3},\ 3a\right)" /> was a common
      incorrect answer. This occurs if <Katex tex="4a^2" /> is used for the denominator of{' '}
      <Katex tex="f(x)" /> instead of <Katex tex="4a^4" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: (
    <>
      This question was generally well answered. Some students wrote <Katex tex="x=2" />,{' '}
      <Katex tex="x=1" /> or <Katex tex="x=0" /> only. As in Question 5a., errors occur if{' '}
      <Katex tex="4a^2" /> is used for the denominator of <Katex tex="f(x)" /> instead of{' '}
      <Katex tex="4a^4" />.
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
    reason: <>Expanding makes the differentiation routine. Everything outside the bracket is a constant, since <Katex tex="a" /> is a fixed positive number.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{81}{4a^4}\left(2ax-3x^2\right) = \frac{81x(2a-3x)}{4a^4}" />,
    reason: <>Differentiate, then factorise.</>,
  },
  {
    working: <Katex display tex="f'(x)=0 \implies x=0 \ \text{ or } \ x=\frac{2a}{3}" />,
    reason: <>Two stationary points. A cubic with a negative leading coefficient falls at both ends, so the left one is the minimum and the right one the maximum.</>,
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
    reason: <>Set the two rules equal.</>,
  },
  {
    working: <Katex display tex="81x^2(a-x) = 18a^2x \implies 81x^2(a-x)-18a^2x = 0" />,
    reason: <>Multiplying both sides by <Katex tex="4a^4" />: the right-hand side becomes <Katex tex="\tfrac{9x}{2a^2}\times4a^4=18a^2x" />.</>,
  },
  {
    working: <Katex display tex="9x\left(9x(a-x)-2a^2\right) = 0 \implies 9x\left(-9x^2+9ax-2a^2\right)=0" />,
    reason: <>Take out the common factor <Katex tex="9x" />. This is where <Katex tex="x=0" /> comes from — dividing through by <Katex tex="x" /> instead of factorising loses it.</>,
  },
  {
    working: <Katex display tex="9x^2-9ax+2a^2 = (3x-a)(3x-2a) = 0" />,
    reason: <>The quadratic factorises neatly.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 0, \quad x = \frac{a}{3}, \quad x = \frac{2a}{3}}" />,
    reason: <>Three intersections, and all three are needed for part (c). Note the second one coincides with the local maximum from part (a) — the line passes exactly through the crest of the cubic.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{On } \left(0,\tfrac{a}{3}\right): \ h>f; \qquad \text{On } \left(\tfrac{a}{3},\tfrac{2a}{3}\right): \ f>h" />,
    reason: <>The two curves swap order at the middle intersection, so the integrand must swap too. The report names getting this the wrong way round — or the same way on both intervals — as the common mistake.</>,
  },
  {
    working: <Katex display tex="A_1 = \int_0^{a/3}\bigl(h(x)-f(x)\bigr)dx = \frac{1}{16}" />,
    reason: <>Upper minus lower on the first region.</>,
  },
  {
    working: <Katex display tex="A_2 = \int_{a/3}^{2a/3}\bigl(f(x)-h(x)\bigr)dx = \frac{1}{16}" />,
    reason: <>Upper minus lower on the second. The two happen to be equal — a pleasant symmetry, but it must be shown, not assumed.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{1}{16}+\frac{1}{16} = \frac18}" />,
    reason: <>Both regions, so both integrals — the report notes students who found only one. Striking result: the total is a pure number with no <Katex tex="a" /> in it at all, so the area is the same whatever the value of <Katex tex="a" />. That is worth noticing as a check, and it is also why substituting a particular <Katex tex="a" /> (another approach the report mentions) happens to give the right number while not answering the question as asked.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g\!\left(\frac{2a}{3}\right) = \frac{3}{a}" />,
    reason: <><Katex tex="g" /> is the same rule as <Katex tex="f" />, restricted to <Katex tex="\left[0,\tfrac{2a}{3}\right]" />, so this is part (a)'s maximum value.</>,
  },
  {
    working: <Katex display tex="\frac{2a}{3}\times g\!\left(\frac{2a}{3}\right) = \frac{2a}{3}\times\frac{3}{a}" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="\boxed{2}" />,
    reason: <>The <Katex tex="a" />s cancel entirely. Geometrically this is the area of the rectangle with corners <Katex tex="(0,0)" /> and <Katex tex="\left(\tfrac{2a}{3},\tfrac{3}{a}\right)" /> — the box that exactly contains the graph of <Katex tex="g" />, and it has area <Katex tex="2" /> no matter what <Katex tex="a" /> is. That observation is what part (e) needs.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{2a/3} g(x)\,dx = 1" />,
    reason: <>The area under <Katex tex="g" /> itself. Like part (d), it is independent of <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\text{Reflecting in } y=x \text{ swaps the two regions of the rectangle}" />,
    reason: <>The graph of <Katex tex="g^{-1}" /> is the graph of <Katex tex="g" /> reflected in <Katex tex="y=x" />. That reflection maps the rectangle from part (d) onto itself (with the sides swapped), and maps the region <em>under</em> <Katex tex="g" /> onto the region <em>above</em> <Katex tex="g^{-1}" />.</>,
  },
  {
    working: <Katex display tex="\text{Area under } g^{-1} = \text{rectangle} - \text{area under } g" />,
    reason: <>Equivalently, the area under <Katex tex="g^{-1}" /> equals the area to the <em>left</em> of <Katex tex="g" />, which is the rectangle minus the area beneath it. This is the symmetry argument the report mentions; it avoids ever finding a rule for <Katex tex="g^{-1}" />, which would mean solving a cubic.</>,
  },
  {
    working: <Katex display tex="\boxed{2 - 1 = 1}" />,
    reason: <>Only <Katex tex="7\%" /> of the state scored both marks. Sensible: the two areas are <Katex tex="1" /> and <Katex tex="1" /> out of a rectangle of <Katex tex="2" />, so <Katex tex="g" /> divides its bounding box exactly in half — which is why the reflection leaves the area unchanged.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="g: \ (0,0) \to \left(\frac{2a}{3},\ \frac{3}{a}\right)" />,
    reason: <>The endpoints of <Katex tex="g" /> on its restricted domain.</>,
  },
  {
    working: <Katex display tex="g^{-1}: \ (0,0) \to \left(\frac{3}{a},\ \frac{2a}{3}\right)" />,
    reason: <>Reflecting in <Katex tex="y=x" /> swaps each coordinate pair. Both graphs already share the endpoint <Katex tex="(0,0)" />, so only the other one has to be matched.</>,
  },
  {
    working: <Katex display tex="\frac{2a}{3} = \frac{3}{a} \implies 2a^2 = 9" />,
    reason: <>The two far endpoints coincide exactly when the point lies on the line <Katex tex="y=x" />, i.e. when its coordinates are equal.</>,
  },
  {
    working: <Katex display tex="a^2 = \frac92 \implies a = \frac{3}{\sqrt2} = \frac{3\sqrt2}{2}" />,
    reason: <>Only the positive root, since <Katex tex="a" /> is given as a positive real number.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac{3\sqrt2}{2}}" />,
    reason: <>(<Katex tex="\approx2.12" />.) Then both endpoints sit at <Katex tex="\left(\sqrt2,\sqrt2\right)" /> on the line <Katex tex="y=x" />. Only <Katex tex="8\%" /> answered this.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{3\sqrt2}{2} \implies g(x) = x^2\left(\frac{3\sqrt2}{2}-x\right), \quad x\in\left[0,\sqrt2\right]" />,
    reason: <>Substituting part (f)'s value. The constant <Katex tex="\tfrac{81}{4a^4}" /> becomes <Katex tex="1" />, which is what makes the arithmetic manageable.</>,
  },
  {
    working: <Katex display tex="g(x) = x \implies x = 0, \ \frac{\sqrt2}{2}, \ \sqrt2" />,
    reason: <>Where <Katex tex="g" /> meets the line of reflection. It crosses <Katex tex="y=x" /> in the <em>middle</em> of the interval as well as at both ends, so <Katex tex="g" /> and <Katex tex="g^{-1}" /> cross there too — the enclosed region is two lobes, not one.</>,
  },
  {
    working: <Katex display tex="\int_0^{\frac{\sqrt2}{2}}\bigl(x-g(x)\bigr)dx = \frac{1}{16}, \qquad \int_{\frac{\sqrt2}{2}}^{\sqrt2}\bigl(x-g(x)\bigr)dx = -\frac{1}{16}" />,
    reason: <>Equal in size, opposite in sign — <Katex tex="g" /> is below <Katex tex="y=x" /> on the first stretch and above it on the second. Adding the signed values gives zero, so take magnitudes.</>,
  },
  {
    working: <Katex display tex="\text{Area} = 2\left(\frac{1}{16}+\frac{1}{16}\right)" />,
    reason: <>Each lobe between <Katex tex="g" /> and <Katex tex="y=x" /> has a mirror image between <Katex tex="y=x" /> and <Katex tex="g^{-1}" />, so the region enclosed by the two curves is double the region between <Katex tex="g" /> and the line.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \frac14}" />,
    reason: <>The least-answered question on the paper — <Katex tex="97\%" /> scored zero. (<Katex tex="0.25" /> square units, two small lobes of <Katex tex="0.0625" /> each and their reflections.)</>,
  },
]

export default function MethodsQ5_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (10 marks)</p>
        <p className="mb-2">Consider functions of the form</p>
        <p className="text-center mb-2">
          <Katex display tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=\frac{81x^2(a-x)}{4a^4}" />
        </p>
        <p className="mb-2">and</p>
        <p className="text-center mb-2">
          <Katex display tex="h:\mathbb{R}\to\mathbb{R},\ h(x)=\frac{9x}{2a^2}" />
        </p>
        <p>where <Katex tex="a" /> is a positive real number.</p>
      </div>

      <PartCard letter="a" marks={2} statement={<>Find the coordinates of the local maximum of <Katex tex="f" /> in terms of <Katex tex="a" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={1} statement={<>Find the <Katex tex="x" />-values of all of the points of intersection between the graphs of <Katex tex="f" /> and <Katex tex="h" />, in terms of <Katex tex="a" /> where appropriate.</>} examinerReport={EXAM_B}>
        <Background>
          <p>
            Factorise rather than divide. Both rules vanish at <Katex tex="x=0" />, so{' '}
            <Katex tex="x=0" /> is one of the intersections — cancelling an <Katex tex="x" />{' '}
            from both sides quietly throws it away, and part (c) then comes out wrong.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={2} statement={<>Determine the total area of the regions bounded by the graphs of <Katex tex="y=f(x)" /> and <Katex tex="y=h(x)" />.</>} examinerReport={EXAM_C}>
        <Background>
          <p>
            Three intersections means <em>two</em> enclosed regions, and the curves change
            places at the middle one. So the integrand flips between them: it is always
            (upper − lower), but which function is upper changes.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Consider the function{' '}
          <Katex tex="g:\left[0,\dfrac{2a}{3}\right]\to\mathbb{R},\ g(x)=\dfrac{81x^2(a-x)}{4a^4}" />,
          where <Katex tex="a" /> is a positive real number.
        </p>
      </div>

      <PartCard letter="d" marks={1} statement={<>Evaluate <Katex tex="\dfrac{2a}{3}\times g\!\left(\dfrac{2a}{3}\right)" />.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={2} statement={<>Find the area bounded by the graph of <Katex tex="g^{-1}" />, the <Katex tex="x" />-axis and the line <Katex tex="x=g\!\left(\dfrac{2a}{3}\right)" />.</>} examinerReport={EXAM_E}>
        <Background>
          <p>
            Do not try to find a rule for <Katex tex="g^{-1}" /> — that means solving a cubic
            for <Katex tex="x" />. Use the reflection instead.
          </p>
          <p>
            <Katex tex="g" /> runs from <Katex tex="(0,0)" /> to{' '}
            <Katex tex="\left(\tfrac{2a}{3},\tfrac3a\right)" />, so it sits inside a rectangle
            whose area part (d) just told you is <Katex tex="2" />. Reflecting in{' '}
            <Katex tex="y=x" /> turns that rectangle on its side and swaps "under the curve"
            with "left of the curve". The area under <Katex tex="g^{-1}" /> is therefore the
            rectangle minus the area under <Katex tex="g" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard letter="f" marks={1} statement={<>Find the value of <Katex tex="a" /> for which the graphs of <Katex tex="g" /> and <Katex tex="g^{-1}" /> have the same endpoints.</>} examinerReport={EXAM_F}>
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard letter="g" marks={1} statement={<>Find the area enclosed by the graphs of <Katex tex="g" /> and <Katex tex="g^{-1}" /> when they have the same endpoints.</>} examinerReport={EXAM_G}>
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
      </PartCard>
    </div>
  )
}
