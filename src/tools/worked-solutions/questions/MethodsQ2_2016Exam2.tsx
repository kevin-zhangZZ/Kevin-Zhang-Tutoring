// 2016 Mathematical Methods — Exam 2, Section B, Question 2 (12 marks).
// An antiderivative g of a given cubic, then a tangent, a perpendicular, a triangle area,
// a second parallel tangent and a length. Question text transcribed from the original
// paper; both figures are crops of VCAA's own artwork. Answers verified with sympy.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import triangleSrc from './meth-2016exam2-q2b-triangle.png'
import tangentsSrc from './meth-2016exam2-q2c-tangents.png'

const EXAM_AI: SAExaminerStats = {
  marks: [25, 75],
  average: 0.7,
  comment: (
    <>
      Often the <Katex tex="dx" /> and <Katex tex="+c" /> were missing from students'
      answers. Some students made sign errors when writing the equation for{' '}
      <Katex tex="g" />.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [18, 82],
  average: 0.8,
  comment: (
    <>
      This question was answered well. Some students gave three <Katex tex="x" /> values.
      Others gave the coordinates of the stationary points, which was not necessary.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: (
    <>
      This question was answered well. Some students did not give the coordinates of{' '}
      <Katex tex="B" /> and only wrote <Katex tex="3" />. Others gave the coordinate as{' '}
      <Katex tex="(3,0)" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [27, 18, 55],
  average: 1.3,
  comment: (
    <>
      Some students found the correct equation but then did not give the coordinates of{' '}
      <Katex tex="C" />. Others gave approximate answers. Exact answers were required.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [26, 25, 49],
  average: 1.2,
  comment: (
    <>
      Many students knew the formula for the area of the triangle or other suitable methods
      but had incorrect substitutions.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [53, 6, 40],
  average: 0.9,
  comment: (
    <>
      This question was not answered well. Some students found <Katex tex="x=-1" /> but then
      gave the incorrect <Katex tex="y" /> coordinate.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [62, 6, 5, 27],
  average: 1.0,
  comment: <>This question was not answered well.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = -\tfrac13(x+2)(x-1)^2 = -\tfrac13\bigl(x^3-3x+2\bigr)" />,
    reason: <>Expanding first: <Katex tex="(x+2)(x^2-2x+1)=x^3-3x+2" />. Much easier to antidifferentiate than the factorised form.</>,
  },
  {
    working: <Katex display tex="g(x) = \int f(x)\,dx = -\frac{x^4}{12}+\frac{x^2}{2}-\frac{2x}{3}+c" />,
    reason: <>Term by term: <Katex tex="-\tfrac13\times\tfrac{x^4}{4}" />, <Katex tex="+\tfrac13\times3\times\tfrac{x^2}{2}" />, <Katex tex="-\tfrac23x" />. The report notes the <Katex tex="dx" /> and the <Katex tex="+c" /> going missing.</>,
  },
  {
    working: <Katex display tex="g(0) = c = 1" />,
    reason: <>The given condition pins the constant.</>,
  },
  {
    working: <Katex display tex="\boxed{g(x) = -\frac{x^4}{12}+\frac{x^2}{2}-\frac{2x}{3}+1}" />,
    reason: <>As required.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = f(x) = -\tfrac13(x+2)(x-1)^2 = 0" />,
    reason: <>No need to differentiate <Katex tex="g" /> again — the question told us <Katex tex="g'=f" />, and <Katex tex="f" /> is already factorised.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -2 \text{ and } x = 1}" />,
    reason: <>Two values, not three: <Katex tex="x=1" /> is a repeated root of the cubic but only one place on the graph. The report says some students listed it twice. The question asks for <Katex tex="x" /> values only, so coordinates are not needed.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="y = 3-\frac{4x}{3}, \quad x=0 \implies y=3" />,
    reason: <><Katex tex="B" /> is where the tangent cuts the <Katex tex="y" />-axis, so set <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{B = (0,3)}" />,
    reason: <>As coordinates. The report notes answers given as just "<Katex tex="3" />" or as <Katex tex="(3,0)" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="m_{\text{tangent}} = -\frac43 \implies m_{\perp} = \frac34" />,
    reason: <>Perpendicular gradients multiply to <Katex tex="-1" />, so take the negative reciprocal.</>,
  },
  {
    working: <Katex display tex="g(2) = -\frac{16}{12}+2-\frac43+1 = \frac13" />,
    reason: <>So <Katex tex="A=\left(2,\tfrac13\right)" />. Check against the given tangent: <Katex tex="3-\tfrac83=\tfrac13" /> ✓.</>,
  },
  {
    working: <Katex display tex="y-\frac13 = \frac34(x-2)" />,
    reason: <>Point–gradient form through <Katex tex="A" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{3x}{4}-\frac76}" />,
    reason: <><Katex tex="-\tfrac32+\tfrac13=-\tfrac76" />.</>,
  },
  {
    working: <Katex display tex="\boxed{C = \left(0,-\tfrac76\right)}" />,
    reason: <>Setting <Katex tex="x=0" />. Exact, not <Katex tex="-1.17" /> — the report is explicit.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="BC = 3-\left(-\frac76\right) = \frac{25}{6}" />,
    reason: <>Both <Katex tex="B" /> and <Katex tex="C" /> are on the <Katex tex="y" />-axis, so take <Katex tex="BC" /> as the base and its length is just the difference of the <Katex tex="y" />-coordinates.</>,
  },
  {
    working: <Katex display tex="\text{height} = 2" />,
    reason: <>The perpendicular distance from <Katex tex="A" /> to the <Katex tex="y" />-axis is the <Katex tex="x" />-coordinate of <Katex tex="A" />. Choosing the base on an axis turns the area into one line.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \frac12\times\frac{25}{6}\times2" />,
    reason: <>The triangle is right-angled at <Katex tex="A" /> too, so <Katex tex="\tfrac12\,AB\cdot AC" /> also works — but this is quicker.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{25}{6}}" />,
    reason: <>About <Katex tex="4.17" /> square units.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = -\frac43" />,
    reason: <>Parallel tangents have equal gradients, and the tangent at <Katex tex="A" /> has gradient <Katex tex="-\tfrac43" />.</>,
  },
  {
    working: <Katex display tex="-\tfrac13\bigl(x^3-3x+2\bigr) = -\tfrac43 \implies x^3-3x-2 = 0" />,
    reason: <>Multiplying by <Katex tex="-3" /> and collecting.</>,
  },
  {
    working: <Katex display tex="(x+1)^2(x-2) = 0 \implies x = -1 \text{ or } x = 2" />,
    reason: <><Katex tex="x=2" /> is <Katex tex="A" /> itself, so <Katex tex="D" /> is at <Katex tex="x=-1" />.</>,
  },
  {
    working: <Katex display tex="g(-1) = -\frac{1}{12}+\frac12+\frac23+1 = \frac{25}{12}" />,
    reason: <>Common denominator <Katex tex="12" />: <Katex tex="\tfrac{-1+6+8+12}{12}" />. The report says finding <Katex tex="x=-1" /> and then miscomputing this was the usual failure.</>,
  },
  {
    working: <Katex display tex="\boxed{D = \left(-1,\ \frac{25}{12}\right)}" />,
    reason: <>About <Katex tex="(-1,2.08)" />, which matches where the figure puts <Katex tex="D" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="y-\frac{25}{12} = -\frac43(x+1)" />,
    reason: <>The tangent at <Katex tex="D" />, with the same gradient as the tangent at <Katex tex="A" />.</>,
  },
  {
    working: <Katex display tex="y = -\frac{4x}{3}+\frac34" />,
    reason: <><Katex tex="-\tfrac43+\tfrac{25}{12}=\tfrac{-16+25}{12}=\tfrac34" />.</>,
  },
  {
    working: <Katex display tex="-\frac{4x}{3}+\frac34 = \frac{3x}{4}-\frac76" />,
    reason: <><Katex tex="E" /> is where this tangent meets the line <Katex tex="AC" /> from part (b)(ii).</>,
  },
  {
    working: <Katex display tex="\frac{23}{12} = \frac{25x}{12} \implies x = \frac{23}{25}" />,
    reason: <>Multiplying through by <Katex tex="12" />: <Katex tex="9+14=9x+16x" />.</>,
  },
  {
    working: <Katex display tex="y = \frac34\times\frac{23}{25}-\frac76 = -\frac{143}{300}" />,
    reason: <>So <Katex tex="E=\left(\tfrac{23}{25},-\tfrac{143}{300}\right)" />.</>,
  },
  {
    working: <Katex display tex="AE = \sqrt{\left(2-\tfrac{23}{25}\right)^2+\left(\tfrac13+\tfrac{143}{300}\right)^2} = \sqrt{\left(\tfrac{27}{25}\right)^2+\left(\tfrac{81}{100}\right)^2}" />,
    reason: <>Distance formula from <Katex tex="A\left(2,\tfrac13\right)" />.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\frac{11664+6561}{10000}} = \sqrt{\frac{18225}{10000}}" />,
    reason: <>Common denominator <Katex tex="10000" />.</>,
  },
  {
    working: <Katex display tex="\boxed{AE = \frac{135}{100} = \frac{27}{20}}" />,
    reason: <>Exactly <Katex tex="1.35" /> — the surd is a perfect square, which is the sign the arithmetic is right.</>,
  },
]

export default function MethodsQ2_2016Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (12 marks)</p>
        <p>
          Consider the function <Katex tex="f(x)=-\tfrac13(x+2)(x-1)^2" />.
        </p>
      </div>

      <PartCard
        letter="a.i"
        marks={1}
        statement={
          <>
            Given that <Katex tex="g'(x)=f(x)" /> and <Katex tex="g(0)=1" />, show that{' '}
            <Katex tex="g(x)=-\dfrac{x^4}{12}+\dfrac{x^2}{2}-\dfrac{2x}{3}+1" />.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        marks={1}
        statement={
          <>
            Find the values of <Katex tex="x" /> for which the graph of{' '}
            <Katex tex="y=g(x)" /> has a stationary point.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          The diagram below shows part of the graph of <Katex tex="y=g(x)" />, the tangent to
          the graph at <Katex tex="x=2" /> and a straight line drawn perpendicular to the
          tangent to the graph at <Katex tex="x=2" />. The equation of the tangent at the
          point <Katex tex="A" /> with coordinates <Katex tex="(2,g(2))" /> is{' '}
          <Katex tex="y=3-\tfrac{4x}{3}" />. The tangent cuts the <Katex tex="y" />-axis at{' '}
          <Katex tex="B" />. The line perpendicular to the tangent cuts the{' '}
          <Katex tex="y" />-axis at <Katex tex="C" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={triangleSrc}
            alt="The quartic y = g(x) with a tangent at A falling to the right and cutting the y-axis at B above the origin, and a perpendicular line through A rising to the right and cutting the y-axis at C below the origin — from the original 2016 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard letter="b.i" marks={1} statement={<>Find the coordinates of <Katex tex="B" />.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={2}
        statement={
          <>
            Find the equation of the line that passes through <Katex tex="A" /> and{' '}
            <Katex tex="C" /> and, hence, find the coordinates of <Katex tex="C" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        marks={2}
        statement={<>Find the area of triangle <Katex tex="ABC" />.</>}
        examinerReport={EXAM_BIII}
      >
        <Background title="Pick the base on an axis">
          <p>
            Two of the three vertices lie on the <Katex tex="y" />-axis, so take{' '}
            <Katex tex="BC" /> as the base: its length is just the difference of the two{' '}
            <Katex tex="y" />-coordinates, and the height is the <Katex tex="x" />-coordinate
            of <Katex tex="A" />.
          </p>
          <p>
            The alternative — <Katex tex="\tfrac12\,AB\cdot AC" />, using the right angle at{' '}
            <Katex tex="A" /> — needs two distance-formula calculations with surds in them.
            Same answer, four times the arithmetic.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          The tangent at <Katex tex="D" /> is parallel to the tangent at <Katex tex="A" />.
          It intersects the line passing through <Katex tex="A" /> and <Katex tex="C" /> at{' '}
          <Katex tex="E" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={tangentsSrc}
            alt="The same quartic with a second tangent at D on the left branch, parallel to the tangent at A, meeting the line AC at E below the x-axis — from the original 2016 VCAA exam paper"
            className="w-full max-w-[320px]"
          />
        </div>
      </div>

      <PartCard letter="c.i" marks={2} statement={<>Find the coordinates of <Katex tex="D" />.</>} examinerReport={EXAM_CI}>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard letter="c.ii" marks={3} statement={<>Find the length of <Katex tex="AE" />.</>} examinerReport={EXAM_CII}>
        <WorkingTable rows={ROWS_CII} />
      </PartCard>
    </div>
  )
}
