// 2021 Mathematical Methods — Exam 1 Question 9 (8 marks). A tangent to the unit circle
// from an external point, then a vertical dilation of that tangent and the triangle it cuts
// out. The hardest question on the paper: parts b.i. and b.ii. averaged 0.1 marks each.
// Question text transcribed from the original paper; both figures are crops of VCAA's own
// artwork. Answers checked with sympy and against the VCAA examination report. Solution is
// original. Methods-only methods throughout: b.i. uses the discriminant of the intersection
// quadratic (not the point–line distance formula) and b.ii. the y-intercept of h (not sum/product
// of roots). Interactive diagrams (§15): b.i. drags q so h pivots about A, with Δ = 36(1 − q²)
// deciding the intersections (meth-2021e1-q9bi-pivot); b.ii. finds where both intersections are in
// the first quadrant via h(0) against 1 (meth-2021e1-q9bii-first-quadrant); c.i. sweeps q to show θ
// filling (0, π/3] (meth-2021e1-q9ci-theta-range); c.ii. graphs g on its domain against the
// g′(θ) = 0 trap (meth-2021e1-q9cii-endpoint-max). Part a. has none: its marks were lost on
// setting out.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import circleSrc from './meth-2021e1-q9-circle.png'
import triangleSrc from './meth-2021e1-q9c-triangle.png'

const PivotWidget = lazyWidget(() => import('../interactives/meth-2021e1-q9bi-pivot'))
const FirstQuadrantWidget = lazyWidget(() => import('../interactives/meth-2021e1-q9bii-first-quadrant'))
const ThetaRangeWidget = lazyWidget(() => import('../interactives/meth-2021e1-q9ci-theta-range'))
const EndpointMaxWidget = lazyWidget(() => import('../interactives/meth-2021e1-q9cii-endpoint-max'))

const EXAM_A: SAExaminerStats = {
  marks: [78, 9, 13],
  average: 0.4,
  comment: (
    <>
      It is important to remember that for 'show that' questions, the working needs to be clear
      and logically structured, with a well-defined progression from start to finish. This was
      not the case for many students. There were many different ways of approaching this
      question and those who could see the question as a right-angle triangle tended to fare
      better. It was clear that some students knew what they were doing; however, they{' '}
      <b>did not show</b> how they got to find the angle leading to the gradient of the tangent
      or how they found <Katex tex="P\left(\tfrac12,\tfrac{\sqrt3}{2}\right)" />. Many
      differentiated the equation of the semi-circle, but then tried to evaluate the derivative at <Katex tex="x=2" />, a point that is not in
      the domain of the derivative. For most students, angles were not defined or labelled on
      diagrams, nor were side lengths indicated.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [94, 6],
  average: 0.1,
  comment: (
    <>
      This question was poorly answered. Most students could not find <Katex tex="q" />,
      while some students gave <Katex tex="q\in[-1,1]" />, forgetting to exclude zero.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [96, 4],
  average: 0.1,
  comment: (
    <>
      This question was poorly done. There were students who correctly identified the
      endpoints, but then wrote an incorrect interval. This question involves visualisation
      of the problem, and students are encouraged to practise this skill.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [82, 17, 1],
  average: 0.2,
  comment: (
    <>
      Students are reminded of the need to consider domains when defining functions. Many
      were able to write <Katex tex="g(\theta)=\sin(\theta)" />, but very few stated the
      domain of the function. Some wrote the function incorrectly as{' '}
      <Katex tex="g(x)=\sin\theta" />.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [81, 15, 4],
  average: 0.3,
  comment: (
    <>
      Because many students overlooked the domain in their definition of the function{' '}
      <Katex tex="g(\theta)" />, they did not realise that the maximum occurs at an endpoint (
      <Katex tex="\theta=\tfrac\pi3" />). Instead, many attempted this question by
      differentiation and then solved <Katex tex="\tfrac{d}{d\theta}(\sin\theta)=0" /> to get
      the incorrect maximum of <Katex tex="A=1" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="OP \perp AP \quad \text{(tangent} \perp \text{radius)}" />,
    reason: <>A tangent always meets the radius at the point of contact at right angles, and the diagram marks this at <Katex tex="P" />. So triangle <Katex tex="OPA" /> is right-angled at <Katex tex="P" />, and right-angle trigonometry can find the angle at <Katex tex="O" />. Draw the triangle and label its sides and angle: the report notes that most students did not.</>,
  },
  {
    working: <Katex display tex="OP = 1, \quad OA = 2 \implies \cos(\angle AOP) = \frac{OP}{OA} = \frac12" />,
    reason: <><Katex tex="OP" /> is a radius of the unit circle, so <Katex tex="OP=1" />, and <Katex tex="OA=2" /> because <Katex tex="A" /> is <Katex tex="(2,0)" />. Seen from the angle at <Katex tex="O" />, <Katex tex="OP" /> is the adjacent side and <Katex tex="OA" /> (opposite the right angle) is the hypotenuse, so use cosine.</>,
  },
  {
    working: <Katex display tex="\angle AOP = \cos^{-1}\!\left(\tfrac12\right) = \tfrac\pi3" />,
    reason: <>An exact value. Since <Katex tex="OA" /> lies along the positive <Katex tex="x" />-axis, this is the angle <Katex tex="OP" /> makes with the positive <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="P = \left(\cos\tfrac\pi3,\ \sin\tfrac\pi3\right) = \left(\tfrac12,\ \tfrac{\sqrt3}{2}\right)" />,
    reason: <>A point on the unit circle at angle <Katex tex="\theta" /> from the positive <Katex tex="x" />-axis has coordinates <Katex tex="(\cos\theta,\sin\theta)" />.</>,
  },
  {
    working: <Katex display tex="m_{AP} = \frac{\tfrac{\sqrt3}{2}-0}{\tfrac12-2} = \frac{\tfrac{\sqrt3}{2}}{-\tfrac32} = -\frac{1}{\sqrt3}" />,
    reason: <>The gradient formula with <Katex tex="A(2,0)" /> and <Katex tex="P" />. (Or: <Katex tex="m_{OP}=\tan\tfrac\pi3=\sqrt3" />, and <Katex tex="AP\perp OP" />, so take the negative reciprocal.) Don't differentiate <Katex tex="y=\sqrt{1-x^2}" /> and substitute <Katex tex="x=2" />: its derivative only exists for <Katex tex="-1<x<1" />, and the gradient you want is at <Katex tex="P" />, not at <Katex tex="A" />. The report flags this error.</>,
  },
  {
    working: <Katex display tex="y-0 = -\frac{1}{\sqrt3}(x-2)" />,
    reason: <>Point–gradient form, <Katex tex="y-y_1=m(x-x_1)" />, through <Katex tex="A(2,0)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -\frac{x}{\sqrt3}+\frac{2}{\sqrt3}}" />,
    reason: <>Expanding the bracket. Every step is written out, with the angle named and found: the report notes many students did not show how they found the angle or <Katex tex="P" />. As required.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="T\!\begin{bmatrix}x\\y\end{bmatrix} = \begin{bmatrix}x\\qy\end{bmatrix}" />,
    reason: <>Multiplying out the matrix: the <Katex tex="x" />-coordinate is unchanged and the <Katex tex="y" />-coordinate is multiplied by <Katex tex="q" />. This is a dilation by factor <Katex tex="q" /> from the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="x' = x,\ \ y' = qy \implies x = x',\ \ y = \frac{y'}{q}" />,
    reason: <>Call the image point <Katex tex="(x',y')" />, then make the original <Katex tex="x" /> and <Katex tex="y" /> the subjects: they are what satisfy the line's equation. Dividing by <Katex tex="q" /> is fine because <Katex tex="q\ne0" />.</>,
  },
  {
    working: <Katex display tex="\frac{y'}{q} = -\frac{x'}{\sqrt3}+\frac{2}{\sqrt3} \implies h(x) = \frac{q}{\sqrt3}(2-x)" />,
    reason: <>Substitute into the line from part a, make <Katex tex="y'" /> the subject, then drop the dashes. Notice <Katex tex="h(2)=0" /> for every <Katex tex="q" />: <Katex tex="A(2,0)" /> never moves, so as <Katex tex="q" /> changes the line <b>pivots about <Katex tex="A" /></b>. Drag <Katex tex="q" /> in the diagram below to see it.</>,
  },
  {
    working: <Katex display tex="x^2+\frac{q^2}{3}(2-x)^2 = 1" />,
    reason: <>An intersection is a point on both graphs, so substitute <Katex tex="y=h(x)" /> into <Katex tex="x^2+y^2=1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} 3x^2+q^2\left(4-4x+x^2\right) &= 3 \\ \left(3+q^2\right)x^2-4q^2x+\left(4q^2-3\right) &= 0 \end{aligned}" />,
    reason: <>Multiply both sides by 3, expand <Katex tex="(2-x)^2" /> and collect powers of <Katex tex="x" />. This is a quadratic in <Katex tex="x" />, and each real solution gives one intersection point.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \Delta &= \left(-4q^2\right)^2-4\left(3+q^2\right)\left(4q^2-3\right) \\ &= 16q^4-4\left(4q^4+9q^2-9\right) \\ &= 36\left(1-q^2\right) \end{aligned}" />,
    reason: <>The discriminant <Katex tex="b^2-4ac" /> with <Katex tex="a=3+q^2" />, <Katex tex="b=-4q^2" /> and <Katex tex="c=4q^2-3" />. The <Katex tex="q^4" /> terms cancel.</>,
  },
  {
    working: <Katex display tex="\Delta \ge 0 \iff 1-q^2 \ge 0 \iff -1 \le q \le 1" />,
    reason: <>A quadratic has at least one real solution exactly when <Katex tex="\Delta\ge0" />. In the picture: <Katex tex="q=\pm1" /> gives gradient <Katex tex="\mp\tfrac{1}{\sqrt3}" />, the tangent from part a and its reflection in the <Katex tex="x" />-axis. Any steeper line through <Katex tex="A" /> misses the circle.</>,
  },
  {
    working: <Katex display tex="\boxed{q \in [-1,0) \cup (0,1]}" />,
    reason: <>The question says <Katex tex="q\in R\setminus\{0\}" />, so <Katex tex="0" /> must be removed from <Katex tex="[-1,1]" />. Leaving it in is the slip the report names.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="x \le 1 \text{ on the circle} \implies 2-x > 0 \implies q > 0" />,
    reason: <>For the <Katex tex="y" />-coordinates <Katex tex="h(x)=\tfrac{q}{\sqrt3}(2-x)" /> to be positive: every point on the unit circle has <Katex tex="x\le1" />, so <Katex tex="2-x" /> is positive there, and the sign of <Katex tex="h(x)" /> is the sign of <Katex tex="q" />.</>,
  },
  {
    working: <Katex display tex="\text{two intersections} \iff \Delta > 0 \iff -1 < q < 1" />,
    reason: <>From part b.i. At <Katex tex="q=1" />, <Katex tex="\Delta=0" />: the line is the tangent at <Katex tex="P" />, which meets the circle only once. So far, <Katex tex="0<q<1" />.</>,
  },
  {
    working: <Katex display tex="h(0) = \frac{2q}{\sqrt3}" />,
    reason: <>Now the <Katex tex="x" />-coordinates. Look at where the line crosses the <Katex tex="y" />-axis. If <Katex tex="h(0)<1" />, that crossing is inside the circle, so heading left the line must leave the circle at a point with <Katex tex="x<0" />. If <Katex tex="h(0)>1" />, then (since <Katex tex="h" /> is decreasing) <Katex tex="h(x)>1" /> for every <Katex tex="x\le0" />, so the line is above the circle there and both intersections have <Katex tex="x>0" />.</>,
  },
  {
    working: <Katex display tex="h(0) > 1 \iff \frac{2q}{\sqrt3} > 1 \iff q > \frac{\sqrt3}{2}" />,
    reason: <>Multiply both sides by <Katex tex="\tfrac{\sqrt3}{2}" />. At <Katex tex="q=\tfrac{\sqrt3}{2}" /> exactly, <Katex tex="h(0)=1" />: the line passes through <Katex tex="(0,1)" />, an intersection with <Katex tex="x=0" />, which is not positive. (Check: <Katex tex="q^2=\tfrac34" /> makes <Katex tex="c=4q^2-3=0" />, so <Katex tex="x=0" /> solves the quadratic.)</>,
  },
  {
    working: <Katex display tex="\boxed{q \in \left(\tfrac{\sqrt3}{2},\ 1\right)}" />,
    reason: <>Combining <Katex tex="q>\tfrac{\sqrt3}{2}" /> with <Katex tex="0<q<1" />. Both ends are open: at <Katex tex="q=\tfrac{\sqrt3}{2}" /> one intersection is <Katex tex="(0,1)" />, and at <Katex tex="q=1" /> there is only one intersection. The report says some students found these endpoints but wrote the wrong interval, so test each endpoint like this.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="P' = (\cos\theta,\ \sin\theta)" />,
    reason: <><Katex tex="P'" /> is on the unit circle, and <Katex tex="\theta" /> is the angle <Katex tex="OP'" /> makes with the positive <Katex tex="x" />-axis (marked on the diagram), just as for <Katex tex="P" /> in part a.</>,
  },
  {
    working: <Katex display tex="\text{area} = \tfrac12\times OA\times\text{height} = \tfrac12\times2\times\sin\theta = \sin\theta" />,
    reason: <>Take <Katex tex="OA" /> (along the <Katex tex="x" />-axis, length 2) as the base. The perpendicular height is the distance from <Katex tex="P'" /> down to the <Katex tex="x" />-axis, which is its <Katex tex="y" />-coordinate, <Katex tex="\sin\theta" />.</>,
  },
  {
    working: <Katex display tex="q\to0^+:\ P'\to(1,0),\ \theta\to0" />,
    reason: <>The domain is every value <Katex tex="\theta" /> can take while <Katex tex="0<q\le1" />, so check the two ends of the range of <Katex tex="q" />. As <Katex tex="q\to0^+" /> the line flattens toward the <Katex tex="x" />-axis. But <Katex tex="q=0" /> is not allowed, so <Katex tex="\theta=0" /> is never reached: open bracket.</>,
  },
  {
    working: <Katex display tex="q=1:\ P'=P,\ \theta=\tfrac\pi3" />,
    reason: <>At <Katex tex="q=1" />, <Katex tex="h" /> is the original tangent, so <Katex tex="P'=P" /> from part a. <Katex tex="q=1" /> is allowed, so <Katex tex="\tfrac\pi3" /> is included: closed bracket. In between, as <Katex tex="q" /> increases the line steepens about <Katex tex="A" /> and <Katex tex="P'" /> slides up the arc from <Katex tex="(1,0)" /> to <Katex tex="P" />, so <Katex tex="\theta" /> takes every value between.</>,
  },
  {
    working: <Katex display tex="\boxed{g:\left(0,\tfrac\pi3\right]\to R, \ g(\theta) = \sin(\theta)}" />,
    reason: <>Defining a function means giving its domain, codomain and rule: the report notes very few students stated the domain. Keep <Katex tex="\theta" /> as the variable throughout. <Katex tex="g(x)=\sin\theta" /> is another error the report names.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="g'(\theta) = \cos\theta > 0 \ \text{ for } \theta\in\left(0,\tfrac\pi3\right]" />,
    reason: <><Katex tex="\cos\theta" /> is positive for every <Katex tex="\theta" /> between <Katex tex="0" /> and <Katex tex="\tfrac\pi2" />, which covers the whole domain from part c.i. So <Katex tex="g" /> is strictly increasing on its domain and has no stationary point inside it. (Solving <Katex tex="\cos\theta=0" /> gives <Katex tex="\theta=\tfrac\pi2" />, which is outside the domain.)</>,
  },
  {
    working: <Katex display tex="\text{maximum at the right endpoint } \theta = \tfrac\pi3" />,
    reason: <>An increasing function is largest at the largest <Katex tex="\theta" /> in its domain, and <Katex tex="\tfrac\pi3" /> is included (closed bracket).</>,
  },
  {
    working: <Katex display tex="\boxed{\text{maximum area} = \sin\!\left(\tfrac\pi3\right) = \tfrac{\sqrt3}{2}}" />,
    reason: <>About 0.866 square units. Solving <Katex tex="g'(\theta)=0" /> instead gives <Katex tex="\theta=\tfrac\pi2" /> and <Katex tex="A=1" />, the report's common wrong answer: that would need <Katex tex="P'" /> at the top of the circle, <Katex tex="(0,1)" />, but <Katex tex="P'" /> never gets past <Katex tex="P" />.</>,
  },
]

export default function MethodsQ9_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (8 marks)</p>
        <p>
          Consider the unit circle <Katex tex="x^2+y^2=1" /> and the tangent to the circle at
          the point <Katex tex="P" />, shown in the diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={circleSrc}
            alt="The unit circle with a tangent touching it at P in the first quadrant, the radius OP drawn with a right angle marked, and the tangent meeting the x-axis at A(2, 0) — from the original 2021 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Line Equation"
        marks={2}
        statement={
          <>
            Show that the equation of the line that passes through the points{' '}
            <Katex tex="A" /> and <Katex tex="P" /> is given by{' '}
            <Katex tex="y=-\dfrac{x}{\sqrt3}+\dfrac{2}{\sqrt3}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let{' '}
          <Katex tex="T:R^2\to R^2,\ T\!\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}1&0\\0&q\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}" />
          , where <Katex tex="q\in R\setminus\{0\}" />, and let the graph of the function{' '}
          <Katex tex="h" /> be the transformation of the line that passes through the points{' '}
          <Katex tex="A" /> and <Katex tex="P" /> under <Katex tex="T" />.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Intersections"
        marks={1}
        statement={
          <>
            Find the values of <Katex tex="q" /> for which the graph of <Katex tex="h" />{' '}
            intersects with the unit circle at least once.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
        <Explore title="Why |q| stops at 1: the line pivots about A">
          <PivotWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Intersections"
        marks={1}
        statement={
          <>
            Let the graph of <Katex tex="h" /> intersect the unit circle twice.
            <br />
            Find the values of <Katex tex="q" /> for which the coordinates of the points of
            intersection have only positive values.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
        <Explore title="Where both intersections are in the first quadrant">
          <FirstQuadrantWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          For <Katex tex="0<q\le1" />, let <Katex tex="P'" /> be the point of intersection of
          the graph of <Katex tex="h" /> with the unit circle, where <Katex tex="P'" /> is
          always the point of intersection that is closest to <Katex tex="A" />, as shown in
          the diagram below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={triangleSrc}
            alt="The same unit circle with a shallower line through A(2, 0) meeting the circle at P′, and the shaded triangle OAP′ with the angle θ marked at O — from the original 2021 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
        <p>
          Let <Katex tex="g" /> be the function that gives the area of triangle{' '}
          <Katex tex="OAP'" /> in terms of <Katex tex="\theta" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Dilation"
        marks={2}
        statement={<>Define the function <Katex tex="g" />.</>}
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
        <Explore title="Where θ can go: the domain of g">
          <ThetaRangeWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Optimisation"
        marks={2}
        statement={
          <>
            Determine the maximum possible area of the triangle <Katex tex="OAP'" />.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
        <Explore title="Why the maximum is at the endpoint, not where g′(θ) = 0">
          <EndpointMaxWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
