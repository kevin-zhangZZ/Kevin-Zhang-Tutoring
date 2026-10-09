// 2017 Mathematical Methods — Exam 1, Question 9 (9 marks).
// f(x) = √x(1 − x) on [0, 1]: area, a "show that" derivative, then the right-angled
// triangle whose two slant edges are tangents to the curve. Parts (c) and (d) were answered
// poorly (0.2 average on each). Question text transcribed from the
// original paper; both figures are crops of VCAA's own artwork. Answers verified with
// sympy (area 4/15; contact points x = 1 and x = 1/9; C = (11/27, 16/27)); they agree with the
// examiners' report and itute. The isosceles check in part (d) is itute's alternative route.
// Interactives: (a) strips of the gap between √x and x^{3/2} sliding down onto the hump, with a
// toggle for the report's multiply/add-the-areas errors; (b) a sliding tangent reading the gradient
// formula; (c) the gradient function, showing that squaring solves gradient −1 and +1 at once;
// (d) the family of triangles as θ varies, landing on B = (1, 0) at θ = 45°.
// WrongMethod boxes: the report's two area errors (a), skipped common-denominator step (b),
// squaring both sides and the line through A and C (c).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import curveSrc from './meth-2017e1-q9-curve.png'
import triangleSrc from './meth-2017e1-q9-triangle.png'

const GapWidget = lazyWidget(() => import('../interactives/meth-2017e1-q9a-gap'))
const TangentWidget = lazyWidget(() => import('../interactives/meth-2017e1-q9b-tangent'))
const SquaringWidget = lazyWidget(() => import('../interactives/meth-2017e1-q9c-squaring'))
const TriangleWidget = lazyWidget(() => import('../interactives/meth-2017e1-q9d-triangle'))

const EXAM_A: SAExaminerStats = {
  marks: [44, 9, 47],
  average: 0.6,
  comment: (
    <>
      Concise and correct solutions were produced by many students. Common incorrect
      approaches included{' '}
      <Katex tex="\int f(x)g(x)\,dx = \int f(x)\,dx\times\int g(x)\,dx" /> or splitting the
      expression into a sum, <Katex tex="\int\sqrt{x}\,dx+\int(1-x)\,dx" />, then
      anti-differentiating. Other students struggled with manipulation of rational exponents.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [65, 35],
  average: 0.3,
  comment: (
    <>
      When answering "show that" questions, students should include all steps to demonstrate
      exactly what was done, but many students often left steps out. A common pattern was to
      go straight from the first line of differentiation immediately to the final line, with
      no indication of obtaining a common denominator.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [77, 6, 17],
  average: 0.2,
  comment: (
    <>
      Many students recognised <Katex tex="m=-1" /> and gave the correct equation of tangent{' '}
      <Katex tex="BC" />, but were not able to fully determine <Katex tex="B(1,0)" /> due to
      insufficient working. Students had difficulty solving{' '}
      <Katex tex="\tfrac{1-3x}{2\sqrt{x}}=-1" />. The highest-scoring responses were where
      students used a pronumeral such as 'let <Katex tex="a=\sqrt{x}" />'. This created the
      correct answer version <Katex tex="a=-\tfrac13" /> or <Katex tex="a=1" />. Students should be
      made aware that squaring both sides introduces extra solutions. Some students found the
      equation of the line through <Katex tex="A" /> and <Katex tex="C" /> rather than through{' '}
      <Katex tex="B" /> and <Katex tex="C" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [75, 7, 5, 5, 9],
  average: 0.2,
  comment: (
    <>
      Many students did not attempt this question. There were, however, some successful
      responses. These students knew to equate the equation from part c. with their equation
      in this question and solve these equations simultaneously. A common error involved
      calculating the coordinates accurately.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sqrt{x}(1-x) = x^{\frac12}-x^{\frac32}" />,
    reason: <>How would I know to expand? The integrand is a product, and there is no product rule for integration. Multiplying out turns it into a difference of powers of <Katex tex="x" />, and each power can be antidifferentiated on its own. (<Katex tex="\sqrt{x}\times x=x^{\frac12}\times x^{1}=x^{\frac32}" />: add the indices.)</>,
  },
  {
    working: <Katex display tex="\text{Area}=\int_0^1\left(x^{\frac12}-x^{\frac32}\right)dx" />,
    reason: <>The graph shows the curve touching the axis only at <Katex tex="x=0" /> and <Katex tex="x=1" /> and sitting above it in between (<Katex tex="\sqrt{x}\ge0" /> and <Katex tex="1-x\ge0" /> there), so the area is just the integral, with no splitting.</>,
  },
  {
    working: <Katex display tex="=\left[\frac{2}{3}x^{\frac32}-\frac{2}{5}x^{\frac52}\right]_0^1" />,
    reason: <>Add one to each index and divide: <Katex tex="\tfrac12\to\tfrac32" /> so divide by <Katex tex="\tfrac32" />, which is multiplying by <Katex tex="\tfrac23" />.</>,
  },
  {
    working: <Katex display tex="=\frac{2}{3}-\frac{2}{5}=\frac{10-6}{15}" />,
    reason: <>At <Katex tex="x=1" /> every power is <Katex tex="1" />; at <Katex tex="x=0" /> everything vanishes.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area}=\frac{4}{15}}" />,
    reason: <>About <Katex tex="0.267" />. Sensible — the hump peaks a little below <Katex tex="0.4" /> and sits over an interval of width <Katex tex="1" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=x^{\frac12}-x^{\frac32}" />,
    reason: <>Same expansion as part (a). It turns the product into two power-rule terms. (The product rule works too: <Katex tex="\tfrac{1-x}{2\sqrt{x}}-\sqrt{x}" />, which needs the same common denominator.)</>,
  },
  {
    working: <Katex display tex="f'(x)=\frac12x^{-\frac12}-\frac32x^{\frac12}" />,
    reason: <>Power rule on each term: bring the index down, then subtract one from it (<Katex tex="\tfrac12-1=-\tfrac12" />, <Katex tex="\tfrac32-1=\tfrac12" />).</>,
  },
  {
    working: <Katex display tex="=\frac{1}{2\sqrt{x}}-\frac{3\sqrt{x}}{2}" />,
    reason: <>Rewriting the negative and fractional indices as surds.</>,
  },
  {
    working: <Katex display tex="=\frac{1}{2\sqrt{x}}-\frac{3\sqrt{x}}{2}\times\frac{\sqrt{x}}{\sqrt{x}}" />,
    reason: <>How would I know to do this? The target has a single fraction over <Katex tex="2\sqrt{x}" />, so put both terms over that denominator. The second term needs an extra <Katex tex="\sqrt{x}" /> on the bottom, so multiply top and bottom by <Katex tex="\sqrt{x}" />. This is the step the report says many students left out, and it is the whole of the working, so leaving it out costs the mark.</>,
  },
  {
    working: <Katex display tex="=\frac{1}{2\sqrt{x}}-\frac{3x}{2\sqrt{x}}=\boxed{\frac{1-3x}{2\sqrt{x}}}" />,
    reason: <>Using <Katex tex="\sqrt{x}\times\sqrt{x}=x" /> on top. In a "show that", finish on exactly the printed expression. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\theta=45^\circ \implies m_{AC}=\tan(45^\circ)=1" />,
    reason: <>How would I know where to start? The only information about <Katex tex="BC" /> is that it is perpendicular to <Katex tex="AC" />, and the only information about <Katex tex="AC" /> is its angle. An angle with the positive <Katex tex="x" />-direction turns into a gradient through <Katex tex="m=\tan\theta" />.</>,
  },
  {
    working: <Katex display tex="AC\perp BC \implies m_{BC}=-\frac{1}{1}=-1" />,
    reason: <>The triangle is right-angled at <Katex tex="C" />, and perpendicular gradients multiply to <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\frac{1-3x}{2\sqrt{x}}=-1" />,
    reason: <>We know the gradient of <Katex tex="BC" /> but not a point on it (<Katex tex="B" /> and <Katex tex="C" /> are both unknown). The point to find is where <Katex tex="BC" /> touches the curve: there the curve's gradient equals the line's, <Katex tex="-1" />, and part (b) gives that gradient.</>,
  },
  {
    working: <Katex display tex="1-3x=-2\sqrt{x} \;\Longrightarrow\; 3x-2\sqrt{x}-1=0" />,
    reason: <>Multiply through by <Katex tex="2\sqrt{x}" /> (non-zero for <Katex tex="x>0" />) and collect on one side. It mixes <Katex tex="x" /> and <Katex tex="\sqrt{x}" />, which is a quadratic in disguise.</>,
  },
  {
    working: <Katex display tex="\text{let } a=\sqrt{x}:\quad 3a^2-2a-1=0" />,
    reason: <>Since <Katex tex="x=(\sqrt{x})^2=a^2" />. The report is explicit that the top responses substituted a pronumeral like this rather than squaring both sides, which would have introduced a spurious solution.</>,
  },
  {
    working: <Katex display tex="(3a+1)(a-1)=0 \implies a=-\tfrac13 \text{ or } a=1" />,
    reason: <><Katex tex="a=\sqrt{x}\ge0" />, so <Katex tex="a=-\tfrac13" /> is rejected. (It would square to <Katex tex="x=\tfrac19" />, the point where the gradient is <Katex tex="+1" />: the same stray root that squaring both sides produces.)</>,
  },
  {
    working: <Katex display tex="\sqrt{x}=1 \implies x=1" />,
    reason: <>Sense check: gradient <Katex tex="-1" /> is downhill, so the contact point must be right of the peak at <Katex tex="x=\tfrac13" />, and <Katex tex="x=1" /> is. It is the end of <Katex tex="f" />'s domain; the rule <Katex tex="\sqrt{x}(1-x)" /> is still differentiable there, and the examiners' solution uses this point.</>,
  },
  {
    working: <Katex display tex="f(1)=\sqrt{1}\,(1-1)=0 \implies B=(1,0)" />,
    reason: <>The contact point <Katex tex="(1,0)" /> lies on <Katex tex="BC" /> and on the <Katex tex="x" />-axis, and <Katex tex="B" /> is where <Katex tex="BC" /> meets the <Katex tex="x" />-axis, so the contact point is <Katex tex="B" /> itself. Write this down: the report says many students did not fully establish <Katex tex="B(1,0)" />. (The figure is drawn for a general <Katex tex="\theta" />; only at <Katex tex="45^\circ" /> does <Katex tex="B" /> land on the curve's end.)</>,
  },
  {
    working: <Katex display tex="y-0=-1(x-1)" />,
    reason: <>Point–gradient form through <Katex tex="B(1,0)" /> with gradient <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y=-x+1}" />,
    reason: <>So <Katex tex="m=-1" /> and <Katex tex="c=1" />, in the required form.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1-3x}{2\sqrt{x}}=1" />,
    reason: <>The plan: <Katex tex="C" /> is where <Katex tex="AC" /> and <Katex tex="BC" /> cross, so we need both equations. <Katex tex="BC" /> came from part (c). For <Katex tex="AC" /> we know the gradient, <Katex tex="\tan 45^\circ=1" />, and find a point on it exactly as in part (c): where it touches the curve.</>,
  },
  {
    working: <Katex display tex="1-3x=2\sqrt{x} \;\Longrightarrow\; 3x+2\sqrt{x}-1=0" />,
    reason: <>The sign of the middle term is the only difference from part (c). Squaring would wipe out that difference and give part (c)'s quadratic again, which is why we substitute instead.</>,
  },
  {
    working: <Katex display tex="\text{let } a=\sqrt{x}:\quad 3a^2+2a-1=0" />,
    reason: <>Same substitution.</>,
  },
  {
    working: <Katex display tex="(3a-1)(a+1)=0 \implies a=\tfrac13 \text{ (rejecting } a=-1)" />,
    reason: <><Katex tex="\sqrt{x}" /> cannot be negative. Sense check: gradient <Katex tex="+1" /> is uphill, so the contact point must be left of the peak at <Katex tex="x=\tfrac13" />.</>,
  },
  {
    working: <Katex display tex="x=\left(\tfrac13\right)^2=\tfrac19" />,
    reason: <>The point of contact of <Katex tex="AC" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(\tfrac19\right)=\tfrac13\left(1-\tfrac19\right)=\tfrac13\times\tfrac89=\tfrac{8}{27}" />,
    reason: <>So <Katex tex="AC" /> touches the curve at <Katex tex="\left(\tfrac19,\tfrac8{27}\right)" />.</>,
  },
  {
    working: <Katex display tex="y-\tfrac{8}{27}=1\left(x-\tfrac19\right)" />,
    reason: <>Point–gradient form.</>,
  },
  {
    working: <Katex display tex="y=x-\tfrac{3}{27}+\tfrac{8}{27}=x+\tfrac{5}{27}" />,
    reason: <>Writing <Katex tex="\tfrac19=\tfrac3{27}" /> so the fractions combine. Its <Katex tex="x" />-intercept is <Katex tex="A=\left(-\tfrac5{27},0\right)" />, left of the origin as in the figure.</>,
  },
  {
    working: <Katex display tex="x+\tfrac{5}{27}=-x+1" />,
    reason: <><Katex tex="C" /> is where <Katex tex="AC" /> meets <Katex tex="BC" />, so set the two line equations equal.</>,
  },
  {
    working: <Katex display tex="2x=1-\tfrac{5}{27}=\tfrac{22}{27} \implies x=\tfrac{11}{27}" />,
    reason: <>Add <Katex tex="x" /> and subtract <Katex tex="\tfrac5{27}" /> on both sides, keeping everything over <Katex tex="27" />. The report says errors in calculating the coordinates were common, so go slowly here.</>,
  },
  {
    working: <Katex display tex="y=-\tfrac{11}{27}+1=\tfrac{16}{27}" />,
    reason: <>Back-substituting into <Katex tex="y=-x+1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{C=\left(\frac{11}{27},\ \frac{16}{27}\right)}" />,
    reason: <>Check without the algebra: the angles at <Katex tex="A" /> and <Katex tex="B" /> are both <Katex tex="45^\circ" />, so the triangle is isosceles and <Katex tex="C" /> sits above the midpoint of <Katex tex="AB" />, at a height of half of <Katex tex="AB" />. With <Katex tex="A=\left(-\tfrac5{27},0\right)" /> and <Katex tex="B=(1,0)" />: midpoint <Katex tex="x=\tfrac12\left(1-\tfrac5{27}\right)=\tfrac{11}{27}" />, height <Katex tex="\tfrac12\times\tfrac{32}{27}=\tfrac{16}{27}" /> ✓.</>,
  },
]

export default function MethodsQ9_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (9 marks)</p>
        <p className="mb-3">
          The graph of <Katex tex="f:[0,1]\to R" />, <Katex tex="f(x)=\sqrt{x}\,(1-x)" /> is
          shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={curveSrc}
            alt="Graph of y = √x(1 − x) on the interval from 0 to 1: a single hump rising steeply from the origin and coming back down to the axis at x = 1, from the original 2017 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Area Under Curve"
        marks={2}
        statement={
          <>
            Calculate the area between the graph of <Katex tex="f" /> and the{' '}
            <Katex tex="x" />-axis.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Rational indices, one line each">
          <p>
            <Katex tex="\sqrt{x}=x^{\frac12}" />, <Katex tex="\tfrac{1}{\sqrt{x}}=x^{-\frac12}" /> and{' '}
            <Katex tex="x\sqrt{x}=x^{1+\frac12}=x^{\frac32}" />. To antidifferentiate{' '}
            <Katex tex="x^n" /> (for <Katex tex="n\ne-1" />), add one to the index and divide by the new
            index: <Katex tex="\int x^n\,dx=\tfrac{x^{n+1}}{n+1}+c" />. Dividing by a fraction is
            multiplying by its reciprocal, so dividing by <Katex tex="\tfrac32" /> means multiplying
            by <Katex tex="\tfrac23" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why expanding works: the hump is the gap between √x and x√x">
          <GapWidget />
        </Explore>
        <WrongMethod
          title="Integrate √x and 1 − x separately, then multiply"
          source="Examiner's report"
          working={<Katex display tex="\int_0^1\sqrt{x}\,dx\times\int_0^1(1-x)\,dx=\tfrac23\times\tfrac12=\tfrac13" />}
        >
          There is no product rule for integration: the integral of a product is not the product of the
          integrals. The hump's height at each <Katex tex="x" /> is <Katex tex="\sqrt{x}" /> times{' '}
          <Katex tex="1-x" /> at that same <Katex tex="x" />, and multiplying the two totals gives{' '}
          <Katex tex="\tfrac13" /> instead of <Katex tex="\tfrac4{15}" />. When the integrand is a product
          you can expand, expand it first.
        </WrongMethod>
        <WrongMethod
          title="Split √x(1 − x) into √x + (1 − x)"
          source="Examiner's report"
          working={<Katex display tex="\int_0^1\sqrt{x}\,dx+\int_0^1(1-x)\,dx=\tfrac23+\tfrac12=\tfrac76" />}
        >
          <Katex tex="\sqrt{x}\,(1-x)" /> is a product, not a sum. A box estimate catches it: the hump
          fits inside a rectangle <Katex tex="1" /> wide and <Katex tex="0.4" /> high, so its area is less
          than <Katex tex="0.4" />, yet <Katex tex="\tfrac76" /> is more than the whole 1-by-1 square.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Derivative"
        marks={1}
        statement={
          <>
            For <Katex tex="x" /> in the interval <Katex tex="(0,1)" />, show that the
            gradient of the tangent to the graph of <Katex tex="f" /> is{' '}
            <Katex tex="\dfrac{1-3x}{2\sqrt{x}}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="What the gradient formula says about the curve">
          <TangentWidget />
        </Explore>
        <WrongMethod
          title="The algebra is obvious, so jump straight to the printed answer"
          source="Examiner's report"
          working={<Katex display tex="f'(x)=\frac{1}{2\sqrt{x}}-\frac{3\sqrt{x}}{2}=\frac{1-3x}{2\sqrt{x}}" />}
        >
          Nothing here is false, but in a "show that" the last line is printed on the paper, so writing it
          down earns nothing. The mark is for the link between the two: the common denominator,{' '}
          <Katex tex="\tfrac{3\sqrt{x}}{2}=\tfrac{3\sqrt{x}\sqrt{x}}{2\sqrt{x}}=\tfrac{3x}{2\sqrt{x}}" />.
          Write the line you would want to see if you were marking someone else's work.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          The edges of the <strong>right-angled</strong> triangle <Katex tex="ABC" /> are the
          line segments <Katex tex="AC" /> and <Katex tex="BC" />, which are tangent to the
          graph of <Katex tex="f" />, and the line segment <Katex tex="AB" />, which is part of
          the horizontal axis, as shown below.
        </p>
        <p className="mb-3">
          Let <Katex tex="\theta" /> be the angle that <Katex tex="AC" /> makes with the
          positive direction of the horizontal axis, where{' '}
          <Katex tex="45^\circ\le\theta<90^\circ" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={triangleSrc}
            alt="The same curve with a right-angled triangle above it: vertex A on the x-axis left of the origin, vertex B on the x-axis to the right, and the apex C above the curve, with AC and BC tangent to the curve and the right angle marked at C; the angle theta between AC and the x-axis is marked at A — from the original 2017 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="c"
        topic="Line Equation"
        marks={2}
        statement={
          <>
            Find the equation of the line through <Katex tex="B" /> and <Katex tex="C" /> in
            the form <Katex tex="y=mx+c" />, for <Katex tex="\theta=45^\circ" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="Why a pronumeral beats squaring">
          <p>
            <Katex tex="\tfrac{1-3x}{2\sqrt{x}}=\pm1" /> rearranges to something with both{' '}
            <Katex tex="x" /> and <Katex tex="\sqrt{x}" /> in it. Squaring both sides to
            clear the surd works, but it manufactures solutions that do not satisfy the
            original equation, and you then have to test each one.
          </p>
          <p>
            Substituting <Katex tex="a=\sqrt{x}" /> instead makes it an honest quadratic in{' '}
            <Katex tex="a" />, and the only thing to discard is a negative{' '}
            <Katex tex="a" /> — which is obviously impossible rather than subtly wrong. The
            examiners singled this out as what separated the full-mark responses.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title={'Squaring can’t tell gradient −1 from gradient +1'}>
          <SquaringWidget />
        </Explore>
        <WrongMethod
          title="Square both sides to get rid of the surd"
          source="Examiner's report"
          working={<Katex display tex="\begin{gathered}(1-3x)^2=4x\\ 9x^2-10x+1=0\\ x=\tfrac19\ \text{ or }\ x=1\end{gathered}" />}
        >
          Squaring is allowed, but it adds a solution. At <Katex tex="x=\tfrac19" />,{' '}
          <Katex tex="\tfrac{1-3x}{2\sqrt{x}}=\tfrac{2/3}{2/3}=+1" />, not <Katex tex="-1" />: squaring{' '}
          <Katex tex="1-3x=-2\sqrt{x}" /> gives the same as squaring <Katex tex="1-3x=+2\sqrt{x}" />, so it
          also finds the point where the gradient is <Katex tex="+1" /> (where <Katex tex="AC" /> touches).
          Keeping it gives the wrong line <Katex tex="y=-x+\tfrac{11}{27}" />. If you square, substitute
          every root back into the unsquared equation.
        </WrongMethod>
        <WrongMethod
          title="Find the line through A and C"
          source="Examiner's report"
          working={<Katex display tex="m_{AC}=\tan45^\circ=1\implies y=x+\tfrac{5}{27}" />}
        >
          That is the line through <Katex tex="A" /> and <Katex tex="C" /> (part (d) needs it), not the
          one asked for. Before starting, find <Katex tex="B" /> and <Katex tex="C" /> on the figure:{' '}
          <Katex tex="BC" /> runs downhill from <Katex tex="C" /> to the right-hand vertex, so its gradient
          must be negative.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d"
        topic="Coordinates"
        marks={4}
        statement={
          <>
            Find the coordinates of <Katex tex="C" /> when <Katex tex="\theta=45^\circ" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title={'How θ fixes the triangle, and why B is (1, 0) at 45°'}>
          <TriangleWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
