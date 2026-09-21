// 2015 Mathematical Methods (CAS) — Exam 1, Question 10 (7 marks).
// A tangent to a circle in parametric form, then minimising the area of a trapezium. The
// hardest question on the paper: 80% scored zero on part (a) and 68% on part (d).
// Question text transcribed from the original paper; the figure is a crop of VCAA's own
// artwork. Answers checked with sympy and against the VCAA examination report. Solution
// is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import circleSrc from './meth-2015exam1-q10-circle.png'

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
      Equivalent expressions such as <Katex tex="m_{XY}=-\tfrac{\cos\theta}{\sin\theta}" />{' '}
      were accepted. Some students included the variables <Katex tex="b" /> or{' '}
      <Katex tex="d" /> in their final answer. Many students found the gradient of the
      radius <Katex tex="CT" /> rather than the gradient of the line segment{' '}
      <Katex tex="XY" />.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [46, 54],
  average: 0.6,
  comment: (
    <>
      Many students who had no success with parts a. and b. managed to attain full marks
      here. The most efficient method was to substitute the relevant points into the given
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
    working: <Katex display tex="\text{circle: centre } (2,0), \text{ radius } 2" />,
    reason: <>So every point on it is <Katex tex="(2+2\cos\theta,\ 0+2\sin\theta)" /> — the standard parametrisation, translated to the centre.</>,
  },
  {
    working: <Katex display tex="\boxed{T = \bigl(2+2\cos(\theta),\ 2\sin(\theta)\bigr)}" />,
    reason: <>The <Katex tex="+2" /> on the <Katex tex="x" />-coordinate is the translation from the origin to <Katex tex="C" />, and forgetting it is the report's single named error — four-fifths of the state.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="m_{CT} = \frac{2\sin\theta-0}{(2+2\cos\theta)-2} = \frac{\sin\theta}{\cos\theta} = \tan(\theta)" />,
    reason: <>The gradient of the radius, from <Katex tex="C(2,0)" /> to <Katex tex="T" />. Note this is <em>not</em> the answer — the report says many students stopped here.</>,
  },
  {
    working: <Katex display tex="\text{tangent} \perp \text{radius} \implies m_{XY}\times m_{CT} = -1" />,
    reason: <>The right angle marked at <Katex tex="T" /> in the figure.</>,
  },
  {
    working: <Katex display tex="\boxed{m_{XY} = -\frac{1}{\tan(\theta)}}" />,
    reason: <>Equivalently <Katex tex="-\tfrac{\cos\theta}{\sin\theta}" /> or <Katex tex="-\cot\theta" />; all were accepted. Negative, matching the downward slope in the figure.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(\theta)x+\sin(\theta)y = 2+2\cos(\theta)" />,
    reason: <>The equation of the tangent, supplied by the question — so parts (a) and (b) are not needed here, which is why many students scored this after missing those.</>,
  },
  {
    working: <Katex display tex="B(2,b): \quad 2\cos(\theta)+b\sin(\theta) = 2+2\cos(\theta)" />,
    reason: <>Substituting <Katex tex="x=2" />, <Katex tex="y=b" />.</>,
  },
  {
    working: <Katex display tex="b\sin(\theta) = 2" />,
    reason: <>The <Katex tex="2\cos\theta" /> terms cancel — which is the whole reason <Katex tex="B" /> was placed at <Katex tex="x=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \frac{2}{\sin(\theta)}}" />,
    reason: <>Defined because <Katex tex="0<\theta<\tfrac{\pi}{2}" />, so <Katex tex="\sin\theta>0" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="D(4,d): \quad 4\cos(\theta)+d\sin(\theta) = 2+2\cos(\theta)" />,
    reason: <>Substituting <Katex tex="x=4" />, <Katex tex="y=d" />.</>,
  },
  {
    working: <Katex display tex="d\sin(\theta) = 2-2\cos(\theta)" />,
    reason: <>This time <Katex tex="4\cos\theta-2\cos\theta=2\cos\theta" /> moves across.</>,
  },
  {
    working: <Katex display tex="\boxed{d = \frac{2-2\cos(\theta)}{\sin(\theta)}}" />,
    reason: <>Smaller than <Katex tex="b" />, as the figure shows — <Katex tex="D" /> sits below <Katex tex="B" /> on a falling line.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="A = \frac{b+d}{2}\times CE = \frac{b+d}{2}\times2 = b+d" />,
    reason: <>A trapezium's area is the average of the parallel sides times the distance between them. Here <Katex tex="BC" /> and <Katex tex="DE" /> are the parallel sides, both vertical, and the distance between them is <Katex tex="CE=4-2=2" />.</>,
  },
  {
    working: <Katex display tex="A(\theta) = \frac{2}{\sin\theta}+\frac{2-2\cos\theta}{\sin\theta} = \frac{4-2\cos\theta}{\sin\theta}" />,
    reason: <>Both terms already share a denominator. Getting to a single function of <Katex tex="\theta" /> is the step the report says students struggled with.</>,
  },
  {
    working: <Katex display tex="A'(\theta) = \frac{2\sin\theta\cdot\sin\theta-(4-2\cos\theta)\cos\theta}{\sin^2\theta}" />,
    reason: <>Quotient rule.</>,
  },
  {
    working: <Katex display tex="= \frac{2\sin^2\theta+2\cos^2\theta-4\cos\theta}{\sin^2\theta} = \frac{2-4\cos\theta}{\sin^2\theta}" />,
    reason: <>The Pythagorean identity collapses the numerator — without it the derivative stays unmanageable.</>,
  },
  {
    working: <Katex display tex="2-4\cos\theta = 0 \implies \cos\theta = \frac12 \implies \boxed{\theta = \frac{\pi}{3}}" />,
    reason: <>The only solution in <Katex tex="\left(0,\tfrac{\pi}{2}\right)" />. The denominator is positive throughout, so the sign of <Katex tex="A'" /> is the numerator's: negative before <Katex tex="\tfrac{\pi}{3}" />, positive after — a minimum.</>,
  },
  {
    working: <Katex display tex="A\!\left(\frac{\pi}{3}\right) = \frac{4-2\times\frac12}{\frac{\sqrt3}{2}} = \frac{3}{\frac{\sqrt3}{2}} = \frac{6}{\sqrt3}" />,
    reason: <>Exact values at <Katex tex="\tfrac{\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A_{\min} = 2\sqrt3}" />,
    reason: <>Rationalising: <Katex tex="\tfrac{6}{\sqrt3}=\tfrac{6\sqrt3}{3}=2\sqrt3\approx3.46" />. Plausible from the figure: at that angle <Katex tex="b\approx2.31" /> and <Katex tex="d\approx1.15" />, and their sum is the area.</>,
  },
]

export default function MethodsQ10_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 10 (7 marks)</p>
        <p className="mb-3">
          The diagram below shows a point <Katex tex="T" /> on a circle. The circle has
          radius <Katex tex="2" /> and centre at the point <Katex tex="C" /> with
          coordinates <Katex tex="(2,0)" />. The angle <Katex tex="ECT" /> is{' '}
          <Katex tex="\theta" />, where <Katex tex="0<\theta<\tfrac{\pi}{2}" />. The diagram
          also shows the tangent to the circle at <Katex tex="T" />. This tangent is
          perpendicular to <Katex tex="CT" /> and intersects the <Katex tex="x" />-axis at
          point <Katex tex="X" /> and the <Katex tex="y" />-axis at point <Katex tex="Y" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={circleSrc}
            alt="A circle of radius 2 centred at C(2, 0), with a point T on the upper right of the circle, the tangent at T falling from Y on the y-axis through B(2, b) and D(4, d) down to X on the x-axis, and the angle theta marked at C between CE and CT — from the original 2015 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Find the coordinates of <Katex tex="T" /> in terms of <Katex tex="\theta" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Parametrising a translated circle">
          <p>
            A circle of radius <Katex tex="r" /> centred at <Katex tex="(h,k)" /> has points{' '}
            <Katex tex="(h+r\cos\theta,\ k+r\sin\theta)" />. The centre's coordinates are
            added, not forgotten — and here <Katex tex="h=2" /> is exactly what four-fifths
            of the state left out.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
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
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The equation of the tangent to the circle at <Katex tex="T" /> can be expressed as{' '}
          <Katex tex="\cos(\theta)x+\sin(\theta)y = 2+2\cos(\theta)" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
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
            First, an area function of <Katex tex="\theta" /> alone: substitute{' '}
            <Katex tex="b" /> and <Katex tex="d" /> from part (c) into the trapezium
            formula. The distance between the parallel sides is <Katex tex="CE=2" />, which
            makes the <Katex tex="\tfrac12" /> cancel and leaves simply{' '}
            <Katex tex="A=b+d" />.
          </p>
          <p>
            Then differentiate and solve <Katex tex="A'(\theta)=0" />. The Pythagorean
            identity does the heavy lifting in the numerator.
          </p>
          <p>
            Finally evaluate. The report notes that many students who derived the area
            function correctly then stopped before the last step — the question asks for
            both <Katex tex="\theta" /> and the area.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
