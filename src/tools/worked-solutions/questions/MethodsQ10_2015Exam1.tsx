// 2015 Mathematical Methods (CAS) — Exam 1, Question 10 (7 marks).
// A tangent to a circle in parametric form, then minimising the area of a trapezium. The
// hardest question on the paper: 80% scored zero on part (a), 84% on part (b) and 68% on part (d).
// Question text transcribed from the original paper; the figure is a crop of VCAA's own
// artwork. Answers checked with sympy and against the VCAA examination report. Solution
// is original.
// Interactives (Detailed view; qualifying parts a, b, d, each under 40% full marks):
//   a — meth-2015e1-q10a-plus-two: the triangle at C, x = 2 + 2cos θ; toggle shows the no-+2 answer.
//   b — meth-2015e1-q10b-radius-vs-tangent: radius vs tangent gradients, product −1, θ = π/2 case.
//   d — meth-2015e1-q10d-trapezium-area: the trapezium and the graph of A(θ), minimum 2√3 at π/3.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import circleSrc from './meth-2015e1-q10-circle.png'

const PlusTwoWidget = lazyWidget(() => import('../interactives/meth-2015e1-q10a-plus-two'))
const RadiusTangentWidget = lazyWidget(() => import('../interactives/meth-2015e1-q10b-radius-vs-tangent'))
const TrapeziumAreaWidget = lazyWidget(() => import('../interactives/meth-2015e1-q10d-trapezium-area'))

const EXAM_A: SAExaminerStats = {
  marks: [80, 20],
  average: 0.2,
  comment: (
    <>
      The most common error in responses to this question was the oversight of the{' '}
      <Katex tex="+2" /> for the <Katex tex="x" /> coordinate.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [84, 16],
  average: 0.2,
  comment: (
    <>
      Equivalent expressions such as <Katex tex="m_{XY}=-\tfrac{\cos(\theta)}{\sin(\theta)}" />{' '}
      were accepted. Some students included the variables of <Katex tex="b" /> or{' '}
      <Katex tex="d" /> in their final answer. Many students found the gradient of the
      radius <Katex tex="CT" /> rather than the gradient of the line segment{' '}
      <Katex tex="XT" />.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [46, 54],
  average: 0.6,
  comment: (
    <>
      Many students who had no success with parts a. and b. managed to attain full marks for
      this question. The most efficient method was to substitute the relevant points into the given
      equation then transpose for the variable specified.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = { marks: [53, 47], average: 0.5 }

const EXAM_D: SAExaminerStats = {
  marks: [68, 18, 3, 11],
  average: 0.6,
  comment: (
    <>
      Students found this question challenging. The first step required an expression for
      the area of a trapezium in terms of only <Katex tex="\theta" />, use of calculus to
      determine the value of <Katex tex="\theta" /> for which the minimum area occurred, and
      finally to find this minimum area. Many students did not attempt this question or had
      difficulty in deriving the area function.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{from } C:\quad \text{across } 2\cos(\theta),\ \ \text{up } 2\sin(\theta)" />,
    reason: <>Drop a perpendicular from <Katex tex="T" /> to the <Katex tex="x" />-axis: a right triangle with hypotenuse <Katex tex="CT=2" /> and angle <Katex tex="\theta" /> at <Katex tex="C" />.</>,
    more: <>Adjacent side <Katex tex="=2\cos\theta" />, opposite side <Katex tex="=2\sin\theta" /> (cos and sin of <Katex tex="\theta" /> in that triangle).</>,
  },
  {
    working: <Katex display tex="\boxed{T = \bigl(2+2\cos(\theta),\ 2\sin(\theta)\bigr)}" />,
    reason: <>Add <Katex tex="C" />&apos;s coordinates <Katex tex="(2,0)" />: <Katex tex="O" /> to <Katex tex="C" /> is already 2 across, so the <Katex tex="x" />-coordinate is <Katex tex="2+2\cos\theta" />.</>,
    more: <>Dropping this <Katex tex="+2" /> was the report&apos;s most common error, and 80% of students scored zero on this part. The answer <Katex tex="(2\cos\theta,\ 2\sin\theta)" /> is a point on the circle of radius 2 centred at the <em>origin</em>. Check: at <Katex tex="\theta=\tfrac{\pi}{2}" /> the formula gives <Katex tex="(2,2)" />, the top of the circle directly above <Katex tex="C" /> ✓; as <Katex tex="\theta\to0" /> it approaches <Katex tex="(4,0)" />, the point <Katex tex="E" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="m_{CT} = \frac{2\sin\theta-0}{(2+2\cos\theta)-2} = \frac{\sin\theta}{\cos\theta} = \tan(\theta)" />,
    reason: <>First the gradient of the radius: rise over run from <Katex tex="C(2,0)" /> to <Katex tex="T" /> (part a). This is not yet the answer.</>,
    more: <>The report says many students found the gradient of the radius <Katex tex="CT" /> rather than of the tangent. The figure is the check: <Katex tex="CT" /> rises to the right (positive gradient), the tangent falls (negative gradient).</>,
  },
  {
    working: <Katex display tex="\text{tangent} \perp \text{radius} \implies m_{XY}\times m_{CT} = -1" />,
    reason: <>The question says the tangent is perpendicular to <Katex tex="CT" />, and perpendicular gradients multiply to <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m_{XY} = -\frac{1}{\tan(\theta)} = -\frac{\cos(\theta)}{\sin(\theta)}}" />,
    reason: <>Rearrange: <Katex tex="m_{XY}=-\tfrac{1}{m_{CT}}" />, and <Katex tex="\tfrac{1}{\tan\theta}=\tfrac{\cos\theta}{\sin\theta}" />. Negative, matching the falling tangent in the figure.</>,
    more: <>The report notes some students included <Katex tex="b" /> or <Katex tex="d" /> in their final answer; the question asks for the gradient in terms of <Katex tex="\theta" />. The report accepted equivalent expressions; of the two forms here, <Katex tex="-\tfrac{\cos\theta}{\sin\theta}" /> is the safer one: at <Katex tex="\theta=\tfrac{\pi}{2}" /> the radius is vertical and the tangent horizontal, and it correctly gives gradient <Katex tex="0" /> where <Katex tex="\tan\theta" /> is undefined. Check against the equation given after this part: <Katex tex="\cos(\theta)x+\sin(\theta)y=2+2\cos(\theta)" /> rearranges to <Katex tex="y=-\tfrac{\cos\theta}{\sin\theta}x+\tfrac{2+2\cos\theta}{\sin\theta}" /> ✓.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(\theta)x+\sin(\theta)y = 2+2\cos(\theta)" />,
    reason: <>The tangent&apos;s equation is given, and <Katex tex="B" /> lies on it, so parts a and b are not needed.</>,
    more: <>This is why, as the report says, many students who had no success with parts a and b still scored full marks here.</>,
  },
  {
    working: <Katex display tex="B(2,b): \quad 2\cos(\theta)+b\sin(\theta) = 2+2\cos(\theta)" />,
    reason: <>Substitute <Katex tex="x=2" />, <Katex tex="y=b" />.</>,
  },
  {
    working: <Katex display tex="b\sin(\theta) = 2" />,
    reason: <>Subtract <Katex tex="2\cos\theta" /> from both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \frac{2}{\sin(\theta)}}" />,
    reason: <>Divide by <Katex tex="\sin\theta" />, which is positive because <Katex tex="0<\theta\le\tfrac{\pi}{2}" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="D(4,d): \quad 4\cos(\theta)+d\sin(\theta) = 2+2\cos(\theta)" />,
    reason: <>Substitute <Katex tex="x=4" />, <Katex tex="y=d" /> into the given tangent equation.</>,
  },
  {
    working: <Katex display tex="d\sin(\theta) = 2-2\cos(\theta)" />,
    reason: <>Subtract <Katex tex="4\cos\theta" /> from both sides: <Katex tex="2+2\cos\theta-4\cos\theta=2-2\cos\theta" />.</>,
  },
  {
    working: <Katex display tex="\boxed{d = \frac{2-2\cos(\theta)}{\sin(\theta)}}" />,
    reason: <>Divide by <Katex tex="\sin\theta>0" />.</>,
    more: <>Check: <Katex tex="d" /> is smaller than <Katex tex="b=\tfrac{2}{\sin\theta}" /> (smaller numerator), as the figure shows, with <Katex tex="D" /> below <Katex tex="B" /> on a falling line. At <Katex tex="\theta=\tfrac{\pi}{2}" /> the tangent is <Katex tex="y=2" />, and both formulas give <Katex tex="2" /> ✓.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="A = \frac{b+d}{2}\times CE = \frac{b+d}{2}\times2 = b+d" />,
    reason: <>Trapezium area = average of the parallel sides × the distance between them. Sides <Katex tex="CB=b" /> and <Katex tex="ED=d" /> are vertical, at <Katex tex="x=2" /> and <Katex tex="x=4" />, so <Katex tex="CE=2" /> apart.</>,
  },
  {
    working: <Katex display tex="A(\theta) = \frac{2}{\sin\theta}+\frac{2-2\cos\theta}{\sin\theta} = \frac{4-2\cos\theta}{\sin\theta}" />,
    reason: <>Substitute <Katex tex="b" /> and <Katex tex="d" /> from part c. They share the denominator <Katex tex="\sin\theta" />, so add the numerators.</>,
    more: <>This area function in terms of <Katex tex="\theta" /> only is the first step the report describes, and it says many students did not attempt this question or had difficulty deriving the area function. Once you have it, the rest is a standard minimum problem.</>,
  },
  {
    working: <Katex display tex="A'(\theta) = \frac{2\sin\theta\cdot\sin\theta-(4-2\cos\theta)\cos\theta}{\sin^2\theta}" />,
    reason: <>Quotient rule, with <Katex tex="u=4-2\cos\theta" /> (<Katex tex="u'=2\sin\theta" />) and <Katex tex="v=\sin\theta" /> (<Katex tex="v'=\cos\theta" />).</>,
  },
  {
    working: <Katex display tex="= \frac{2\sin^2\theta+2\cos^2\theta-4\cos\theta}{\sin^2\theta} = \frac{2-4\cos\theta}{\sin^2\theta}" />,
    reason: <>Expand, then <Katex tex="2\sin^2\theta+2\cos^2\theta=2" /> by the Pythagorean identity.</>,
  },
  {
    working: <Katex display tex="2-4\cos\theta = 0 \implies \cos\theta = \frac12 \implies \boxed{\theta = \frac{\pi}{3}}" />,
    reason: <>Set <Katex tex="A'(\theta)=0" />. The sign of <Katex tex="A'" /> is the sign of <Katex tex="2-4\cos\theta" />: negative before <Katex tex="\tfrac{\pi}{3}" />, positive after, so this is a minimum.</>,
    more: <><Katex tex="\theta=\tfrac{\pi}{3}" /> is the only solution of <Katex tex="\cos\theta=\tfrac12" /> in <Katex tex="\left(0,\tfrac{\pi}{2}\right]" />. The denominator <Katex tex="\sin^2\theta" /> is positive here, so it never makes <Katex tex="A'" /> zero or changes its sign: for <Katex tex="\theta<\tfrac{\pi}{3}" />, <Katex tex="\cos\theta>\tfrac12" /> and <Katex tex="A'<0" />; for <Katex tex="\theta>\tfrac{\pi}{3}" />, <Katex tex="\cos\theta<\tfrac12" /> and <Katex tex="A'>0" />. The endpoint does not beat it either: <Katex tex="A\!\left(\tfrac{\pi}{2}\right)=\tfrac{4-0}{1}=4" />, and <Katex tex="A" /> grows without bound as <Katex tex="\theta\to0" />.</>,
  },
  {
    working: <Katex display tex="A\!\left(\frac{\pi}{3}\right) = \frac{4-2\times\frac12}{\frac{\sqrt3}{2}} = \frac{3}{\frac{\sqrt3}{2}} = \frac{6}{\sqrt3}" />,
    reason: <>The question also asks for the minimum area: substitute <Katex tex="\cos\tfrac{\pi}{3}=\tfrac12" />, <Katex tex="\sin\tfrac{\pi}{3}=\tfrac{\sqrt3}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A_{\min} = 2\sqrt3}" />,
    reason: <>Rationalise: <Katex tex="\tfrac{6}{\sqrt3}=\tfrac{6\sqrt3}{3}=2\sqrt3" />.</>,
    more: <>Plausibility check: at <Katex tex="\theta=\tfrac{\pi}{3}" />, <Katex tex="b=\tfrac{4}{\sqrt3}\approx2.31" /> and <Katex tex="d=\tfrac{2}{\sqrt3}\approx1.15" />, and their sum is <Katex tex="2\sqrt3\approx3.46" /> ✓.</>,
  },
]

export default function MethodsQ10_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 10 (7 marks)</p>
        <p className="mb-3">
          The diagram below shows a point, <Katex tex="T" />, on a circle. The circle has
          radius <Katex tex="2" /> and centre at the point <Katex tex="C" /> with
          coordinates <Katex tex="(2,0)" />. The angle <Katex tex="ECT" /> is{' '}
          <Katex tex="\theta" />, where <Katex tex="0<\theta\le\tfrac{\pi}{2}" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={circleSrc}
            alt="A circle of radius 2 centred at C(2, 0), with a point T on the upper right of the circle, the tangent at T falling from Y on the y-axis through B(2, b) and D(4, d) down to X on the x-axis, and the angle theta marked at C between CE and CT — from the original 2015 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
        <p className="mt-3">
          The diagram also shows the tangent to the circle at <Katex tex="T" />. This tangent
          is perpendicular to <Katex tex="CT" /> and intersects the <Katex tex="x" />-axis at
          point <Katex tex="X" /> and the <Katex tex="y" />-axis at point <Katex tex="Y" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Coordinates"
        marks={1}
        statement={
          <>
            Find the coordinates of <Katex tex="T" /> in terms of <Katex tex="\theta" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Points on a circle not centred at the origin">
          <p>
            A circle of radius <Katex tex="r" /> centred at <Katex tex="(h,k)" /> has points{' '}
            <Katex tex="(h+r\cos\theta,\ k+r\sin\theta)" />, where <Katex tex="\theta" /> is
            measured at the centre from the horizontal. The <Katex tex="r\cos\theta" /> and{' '}
            <Katex tex="r\sin\theta" /> are the steps from the centre, so the centre&apos;s
            coordinates must be added on.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title={<>The <Katex tex="x" />-coordinate of <Katex tex="T" /> is 2 to reach <Katex tex="C" />, then <Katex tex="2\cos\theta" /> more</>}>
          <PlusTwoWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b"
        topic="Tangent Gradient"
        marks={1}
        statement={
          <>
            Find the gradient of the tangent to the circle at <Katex tex="T" /> in terms of{' '}
            <Katex tex="\theta" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="The radius rises, the tangent falls: their gradients multiply to −1">
          <RadiusTangentWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The equation of the tangent to the circle at <Katex tex="T" /> can be expressed as{' '}
          <Katex tex="\cos(\theta)x+\sin(\theta)y = 2+2\cos(\theta)" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Tangent Line"
        marks={1}
        statement={
          <>
            Point <Katex tex="B" />, with coordinates <Katex tex="(2,b)" />, is on the line
            segment <Katex tex="XY" />. Find <Katex tex="b" /> in terms of{' '}
            <Katex tex="\theta" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Tangent Line"
        marks={1}
        statement={
          <>
            Point <Katex tex="D" />, with coordinates <Katex tex="(4,d)" />, is on the line
            segment <Katex tex="XY" />. Find <Katex tex="d" /> in terms of{' '}
            <Katex tex="\theta" />.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Optimisation"
        marks={3}
        statement={
          <>
            Consider the trapezium <Katex tex="CEDB" /> with parallel sides of length{' '}
            <Katex tex="b" /> and <Katex tex="d" />. Find the value of{' '}
            <Katex tex="\theta" /> for which the area of the trapezium <Katex tex="CEDB" />{' '}
            is a minimum. Also find the minimum value of the area.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="Three steps, three marks">
          <p>
            First, the area as a function of <Katex tex="\theta" /> alone, using{' '}
            <Katex tex="b" /> and <Katex tex="d" /> from part c. Then differentiate, solve{' '}
            <Katex tex="A'(\theta)=0" /> and confirm it is a minimum. Finally evaluate the
            area: the question asks for both <Katex tex="\theta" /> and the minimum area.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <Explore title={<>The area is <Katex tex="b+d" />, and it bottoms out at <Katex tex="2\sqrt3" /> when <Katex tex="\theta=\tfrac{\pi}{3}" /></>}>
          <TrapeziumAreaWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
