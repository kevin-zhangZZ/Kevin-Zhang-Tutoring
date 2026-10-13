// 2016 Mathematical Methods — Exam 2, Section B, Question 2 (12 marks).
// An antiderivative g of a given cubic, then a tangent, a perpendicular, a triangle area,
// a second parallel tangent and a length. Question text transcribed from the original
// paper; both figures are crops of VCAA's own artwork. Answers verified with sympy.
// Solution is original. Interactive: c.ii (27% full marks), a three-step build of E and the
// 4 : 3 : 5 run/rise/length along AC. No other part qualifies (all have at least 40% full marks).

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import triangleSrc from './meth-2016e2-q2b-triangle.png'
import tangentsSrc from './meth-2016e2-q2c-tangents.png'

const GapWidget = lazyWidget(() => import('../interactives/meth-2016e2-q2cii-gap'))

const EXAM_AI: SAExaminerStats = {
  marks: [25, 75],
  average: 0.7,
  comment: (
    <>
      Often the <Katex tex="dx" /> and <Katex tex="+c" /> were missing from students'
      answers. Some students made sign errors when writing the equation for{' '}
      <Katex tex="g" />; for example,{' '}
      <Katex tex="g(x)=\dfrac{x^4}{12}+\dfrac{x^2}{2}-\dfrac{2x}{3}+1" />.
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
    reason: <>Expand first: <Katex tex="(x+2)(x^2-2x+1)=x^3-3x+2" />. A polynomial in expanded form can be antidifferentiated term by term.</>,
  },
  {
    working: <Katex display tex="g(x) = \int f(x)\,dx = -\frac{x^4}{12}+\frac{x^2}{2}-\frac{2x}{3}+c" />,
    reason: <>Term by term: <Katex tex="-\tfrac13\times\tfrac{x^4}{4}" />, <Katex tex="+\tfrac13\times3\times\tfrac{x^2}{2}" />, <Katex tex="-\tfrac13\times2x" />. Include the <Katex tex="dx" /> and the <Katex tex="+c" />.</>,
    more: <>The report notes the <Katex tex="dx" /> and the <Katex tex="+c" /> were often missing, and sign errors such as <Katex tex="+\tfrac{x^4}{12}" />. In a "show that" the mark is for the working, and the <Katex tex="+c" /> is what <Katex tex="g(0)=1" /> is there to find. The <Katex tex="-\tfrac13" /> multiplies every term of the bracket, so the <Katex tex="x^4" /> term keeps a minus sign while the <Katex tex="-3x" /> term becomes positive.</>,
  },
  {
    working: <Katex display tex="g(0) = c = 1" />,
    reason: <>Every other term is zero at <Katex tex="x=0" />, so the given condition <Katex tex="g(0)=1" /> gives <Katex tex="c" /> directly.</>,
  },
  {
    working: <Katex display tex="\boxed{g(x) = -\frac{x^4}{12}+\frac{x^2}{2}-\frac{2x}{3}+1}" />,
    reason: <>As required.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = f(x) = -\tfrac13(x+2)(x-1)^2 = 0" />,
    reason: <>Stationary points are where <Katex tex="g'(x)=0" />. We are told <Katex tex="g'=f" />, and <Katex tex="f" /> is already factorised.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -2 \text{ and } x = 1}" />,
    reason: <>Two values: the repeated factor <Katex tex="(x-1)^2" /> gives one <Katex tex="x" />-value, not two. Only <Katex tex="x" />-values were asked for.</>,
    more: <>The report notes some students gave three <Katex tex="x" />-values (counting <Katex tex="x=1" /> twice) and others gave coordinates, which was not necessary. The repeated root does change the <em>type</em> of point: <Katex tex="(x-1)^2\geq0" />, so <Katex tex="g'" /> has the same sign on both sides of <Katex tex="x=1" />, which makes it a stationary point of inflection. It is still a stationary point, so it counts.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="y = 3-\frac{4x}{3}, \quad x=0 \implies y=3" />,
    reason: <><Katex tex="B" /> is where the tangent cuts the <Katex tex="y" />-axis, so set <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{B = (0,3)}" />,
    reason: <>The question asks for coordinates, so give the point, not just the number <Katex tex="3" />.</>,
    more: <>The report notes some students wrote only <Katex tex="3" />, and others gave <Katex tex="(3,0)" />, which is a point on the <Katex tex="x" />-axis. On the <Katex tex="y" />-axis it is the <Katex tex="x" />-coordinate that is <Katex tex="0" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="m_{\text{tangent}} = -\frac43 \implies m_{\perp} = \frac34" />,
    reason: <>Read the tangent's gradient off <Katex tex="y=3-\tfrac{4x}{3}" />. Perpendicular gradients multiply to <Katex tex="-1" />, so take the negative reciprocal.</>,
  },
  {
    working: <Katex display tex="g(2) = -\frac{16}{12}+2-\frac43+1 = \frac13" />,
    reason: <>The line also needs a point: <Katex tex="A=\left(2,\tfrac13\right)" />. Check: the given tangent gives <Katex tex="3-\tfrac83=\tfrac13" /> too.</>,
  },
  {
    working: <Katex display tex="y-\frac13 = \frac34(x-2)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" /> through <Katex tex="A" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{3x}{4}-\frac76}" />,
    reason: <>Expand and collect the constants: <Katex tex="-\tfrac32+\tfrac13=-\tfrac96+\tfrac26=-\tfrac76" />.</>,
  },
  {
    working: <Katex display tex="\boxed{C = \left(0,-\tfrac76\right)}" />,
    reason: <><Katex tex="C" /> is on the <Katex tex="y" />-axis, so set <Katex tex="x=0" />. Leave it exact.</>,
    more: <>This is the "hence" half of the question, and the report notes some students found the equation but never gave the coordinates of <Katex tex="C" />. It also notes approximate answers (such as <Katex tex="-1.17" />): exact answers were required.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="BC = 3-\left(-\frac76\right) = \frac{25}{6}" />,
    reason: <>Take <Katex tex="BC" /> as the base: both ends are on the <Katex tex="y" />-axis, so its length is the difference of their <Katex tex="y" />-coordinates.</>,
    more: <>Subtract the lower <Katex tex="y" />-coordinate from the higher one, keeping the sign of <Katex tex="-\tfrac76" />: <Katex tex="3+\tfrac76" />, not <Katex tex="3-\tfrac76" />.</>,
  },
  {
    working: <Katex display tex="\text{height} = 2" />,
    reason: <>The height is the perpendicular distance from <Katex tex="A\left(2,\tfrac13\right)" /> to the <Katex tex="y" />-axis: its <Katex tex="x" />-coordinate.</>,
    more: <>Not <Katex tex="\tfrac13" />, the <Katex tex="y" />-coordinate of <Katex tex="A" />: the height is measured at right angles to the base, and this base is vertical, so the height is horizontal.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \frac12\times\frac{25}{6}\times2" />,
    reason: <>Area of a triangle <Katex tex="=\tfrac12\times\text{base}\times\text{height}" />.</>,
    more: <>The report notes many students knew the formula or another suitable method but had incorrect substitutions. The sign in <Katex tex="BC" /> and using <Katex tex="\tfrac13" /> as the height are the two slips to watch for here.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{25}{6}}" />,
    reason: <>The area is <Katex tex="\tfrac{25}{6}\approx4.17" /> square units.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = -\frac43" />,
    reason: <>Parallel tangents have equal gradients, and the tangent at <Katex tex="A" /> has gradient <Katex tex="-\tfrac43" />. A tangent's gradient is <Katex tex="g'(x)=f(x)" />.</>,
    more: <>Set the <em>derivative</em> equal to <Katex tex="-\tfrac43" />, not <Katex tex="g(x)" /> itself: <Katex tex="g(x)=-\tfrac43" /> finds where the curve is at height <Katex tex="-\tfrac43" />, which has nothing to do with the tangent's slope.</>,
  },
  {
    working: <Katex display tex="-\tfrac13\bigl(x^3-3x+2\bigr) = -\tfrac43 \implies x^3-3x-2 = 0" />,
    reason: <>Multiply both sides by <Katex tex="-3" />: <Katex tex="x^3-3x+2=4" />, then subtract <Katex tex="4" />.</>,
  },
  {
    working: <Katex display tex="(x+1)^2(x-2) = 0 \implies x = -1 \text{ or } x = 2" />,
    reason: <>We already know <Katex tex="x=2" /> works (it is <Katex tex="A" />), so <Katex tex="(x-2)" /> is a factor; dividing leaves <Katex tex="x^2+2x+1=(x+1)^2" />. <Katex tex="D" /> is the other point.</>,
    more: <>Check by expanding: <Katex tex="(x^2+2x+1)(x-2)=x^3-3x-2" />. This is Exam 2, so <Cas fn="solve">solve(f(x) = -4/3, x)</Cas>, with <Katex tex="f" /> defined first, does the same job in one line. Either way, discard <Katex tex="x=2" />: that is the tangent at <Katex tex="A" /> itself.</>,
  },
  {
    working: <Katex display tex="g(-1) = -\frac{1}{12}+\frac12+\frac23+1 = \frac{25}{12}" />,
    reason: <><Katex tex="D" /> is on the curve, so substitute into <Katex tex="g" /> (not <Katex tex="f" />). Over <Katex tex="12" />: <Katex tex="\tfrac{-1+6+8+12}{12}" />.</>,
    more: <>The report notes students who found <Katex tex="x=-1" /> but then gave the incorrect <Katex tex="y" />-coordinate. Watch the signs: <Katex tex="(-1)^4=1" />, so the first term is <Katex tex="-\tfrac{1}{12}" />, and <Katex tex="-\tfrac{2(-1)}{3}=+\tfrac23" />. Substituting into <Katex tex="f" /> instead just gives back the gradient <Katex tex="-\tfrac43" />.</>,
  },
  {
    working: <Katex display tex="\boxed{D = \left(-1,\ \frac{25}{12}\right)}" />,
    reason: <>About <Katex tex="(-1,2.08)" />, which matches where the figure puts <Katex tex="D" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="y-\frac{25}{12} = -\frac43(x+1)" />,
    reason: <>The tangent at <Katex tex="D\left(-1,\tfrac{25}{12}\right)" />: point–gradient form, with gradient <Katex tex="-\tfrac43" /> as at <Katex tex="A" />.</>,
  },
  {
    working: <Katex display tex="y = -\frac{4x}{3}+\frac34" />,
    reason: <>Expand and collect: <Katex tex="-\tfrac43+\tfrac{25}{12}=\tfrac{-16+25}{12}=\tfrac34" />.</>,
  },
  {
    working: <Katex display tex="-\frac{4x}{3}+\frac34 = \frac{3x}{4}-\frac76" />,
    reason: <><Katex tex="E" /> is where this tangent meets the line <Katex tex="AC" /> from part b.ii, so equate the two lines.</>,
    more: <><Katex tex="E" /> is on the <em>tangent</em> at <Katex tex="D" />, not on the curve, so <Katex tex="g" /> plays no part here. On CAS, <Cas fn="solve">solve(-4x/3 + 3/4 = 3x/4 - 7/6, x)</Cas> gives the same <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\frac{23}{12} = \frac{25x}{12} \implies x = \frac{23}{25}" />,
    reason: <>Constants to the left, <Katex tex="x" />-terms to the right, then multiply by <Katex tex="12" />: <Katex tex="9+14=16x+9x" />.</>,
  },
  {
    working: <Katex display tex="y = \frac34\times\frac{23}{25}-\frac76 = -\frac{143}{300}" />,
    reason: <>Substitute into either line: <Katex tex="\tfrac{69}{100}-\tfrac76=\tfrac{207-350}{300}" />. So <Katex tex="E=\left(\tfrac{23}{25},-\tfrac{143}{300}\right)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} AE &= \sqrt{\left(2-\tfrac{23}{25}\right)^2+\left(\tfrac13+\tfrac{143}{300}\right)^2} \\ &= \sqrt{\left(\tfrac{27}{25}\right)^2+\left(\tfrac{81}{100}\right)^2} \end{aligned}" />,
    reason: <>Distance formula from <Katex tex="A" /> to <Katex tex="E" />. <Katex tex="x" />-difference <Katex tex="\tfrac{50-23}{25}=\tfrac{27}{25}" />; <Katex tex="y" />-difference <Katex tex="\tfrac{100+143}{300}=\tfrac{81}{100}" />.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\frac{11664+6561}{10000}} = \sqrt{\frac{18225}{10000}}" />,
    reason: <>Write <Katex tex="\tfrac{27}{25}" /> as <Katex tex="\tfrac{108}{100}" /> so both squares are over <Katex tex="10000" />.</>,
  },
  {
    working: <Katex display tex="\boxed{AE = \frac{135}{100} = \frac{27}{20}}" />,
    reason: <>Since <Katex tex="135^2=18225" />, the length is exactly <Katex tex="\tfrac{27}{20}=1.35" />.</>,
    more: <>A quicker check: <Katex tex="A" /> and <Katex tex="E" /> both lie on <Katex tex="AC" />, gradient <Katex tex="\tfrac34" />, so across, up and along are in the ratio <Katex tex="4:3:5" />. The run is <Katex tex="\tfrac{27}{25}" />, so <Katex tex="AE=\tfrac54\times\tfrac{27}{25}=\tfrac{27}{20}" />. The report says only that this part was not answered well; it chains three steps (the tangent at <Katex tex="D" />, then <Katex tex="E" />, then the distance), so a wrong <Katex tex="D" /> from c.i or an early slip carries all the way through.</>,
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
        topic="Antiderivative"
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
        topic="Stationary Points"
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
          <img loading="lazy" decoding="async"
            src={triangleSrc}
            alt="The quartic y = g(x) with a tangent at A falling to the right and cutting the y-axis at B above the origin, and a perpendicular line through A rising to the right and cutting the y-axis at C below the origin — from the original 2016 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard letter="b.i" topic="Coordinates" marks={1} statement={<>Find the coordinates of <Katex tex="B" />.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Line Equation"
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
        topic="Triangle Area"
        marks={2}
        statement={<>Find the area of triangle <Katex tex="ABC" />.</>}
        examinerReport={EXAM_BIII}
      >
        <Background title="Pick the base on an axis">
          <p>
            For a triangle with two vertices on the same axis, take the side joining them as
            the base: its length is a simple difference of coordinates, and the height to it is a
            single coordinate of the third vertex.
          </p>
          <p>
            Here the triangle is also right-angled at <Katex tex="A" /> (<Katex tex="AC" /> is
            perpendicular to the tangent <Katex tex="AB" />), so{' '}
            <Katex tex="\tfrac12\,AB\cdot AC" /> works as well:{' '}
            <Katex tex="AB=\tfrac{10}{3}" /> and <Katex tex="AC=\tfrac52" /> give the same{' '}
            <Katex tex="\tfrac{25}{6}" />, but it takes two distance-formula calculations.
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
          <img loading="lazy" decoding="async"
            src={tangentsSrc}
            alt="The same quartic with a second tangent at D on the left branch, parallel to the tangent at A, meeting the line AC at E below the x-axis — from the original 2016 VCAA exam paper"
            className="w-full max-w-[320px]"
          />
        </div>
      </div>

      <PartCard letter="c.i" topic="Coordinates" marks={2} statement={<>Find the coordinates of <Katex tex="D" />.</>} examinerReport={EXAM_CI}>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard letter="c.ii" topic="Distance" marks={3} statement={<>Find the length of <Katex tex="AE" />.</>} examinerReport={EXAM_CII}>
        <WorkingTable rows={ROWS_CII} />
        <Explore title="AE runs along AC, at right angles to both parallel tangents">
          <GapWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
