// 2023 Mathematical Methods — Exam 1 Question 9 (6 marks). Two walking tracks sharing a
// turning point, then the largest triangle that fits under one of them. Question text
// transcribed from the original paper; the figures are crops of VCAA's own artwork. Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import tracksSrc from './meth-2023e1-q9-tracks.png'
import triangleSrc from './meth-2023e1-q9c-triangle.png'

const EXAM_A: SAExaminerStats = {
  marks: [10, 90],
  average: 0.9,
  comment: (
    <>
      This question was frequently attempted successfully. Most students knew that in order to
      "verify" the values they needed to show working to support this.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [34, 36, 30],
  average: 1.0,
  comment: (
    <>
      It was not sufficient to assume by inspection that the tracks met at <Katex tex="P" />.
      Some students misinterpreted the question and solved{' '}
      <Katex tex="f(x)=g(x)" />, stopping short of showing that the point of intersection was
      a turning point for both curves. Some students just showed that <Katex tex="g(x)" /> had
      a turning point at <Katex tex="x=2" />, not addressing <Katex tex="f(x)" />. Some
      incorrectly used the product rule and gave{' '}
      <Katex tex="f'(x)=x(x-2)^2" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [65, 5, 17, 13],
  average: 0.8,
  comment: (
    <>
      This question was not well attempted. Many students were able to differentiate to get{' '}
      <Katex tex="A'(k)=0" />, although some incorrectly wrote this as{' '}
      <Katex tex="A'(x)" /> when the variable they were using was <Katex tex="k" />. Many
      arithmetic mistakes occurred when students substituted <Katex tex="k=\tfrac83" /> back
      into their expression.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = a-0\,(0-2)^2 = a-0 = a" />,
    reason: <>Substituting <Katex tex="x=0" /> into track 1's rule. The whole second term vanishes because of its factor of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="f(0) = 12 \implies \boxed{a = 12} \ \checkmark" />,
    reason: 'The given condition.',
  },
  {
    working: <Katex display tex="g(1) = 12(1)+b(1)^2 = 12+b" />,
    reason: "Substituting x = 1 into track 2's rule.",
  },
  {
    working: <Katex display tex="12+b = 9 \implies \boxed{b = -3} \ \checkmark" />,
    reason: '"Verify" means show the working that produces the stated values — asserting them is not enough.',
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 12-x(x-2)^2 = 12-x\left(x^2-4x+4\right) = -x^3+4x^2-4x+12" />,
    reason: 'Expand before differentiating — the product rule here is what produced the report\u2019s wrong derivative.',
  },
  {
    working: <Katex display tex="f'(x) = -3x^2+8x-4 = -(3x-2)(x-2)" />,
    reason: 'Factorising makes the roots visible.',
  },
  {
    working: <Katex display tex="f'(2) = -3(4)+16-4 = 0 \ \checkmark" />,
    reason: <>So track 1 has a stationary point at <Katex tex="x=2" />. (The other, <Katex tex="x=\tfrac23" />, is the small dip on the left of the diagram.)</>,
  },
  {
    working: <Katex display tex="g(x) = 12x-3x^2 \implies g'(x) = 12-6x" />,
    reason: 'Track 2.',
  },
  {
    working: <Katex display tex="g'(2) = 12-12 = 0 \ \checkmark" />,
    reason: <>Both curves are stationary at <Katex tex="x=2" />. Showing only one of them is worth at most half the marks.</>,
  },
  {
    working: <Katex display tex="f(2) = 12-2(0)^2 = 12, \qquad g(2) = 24-12 = 12" />,
    reason: 'Equal heights as well, so it really is the same point.',
  },
  {
    working: <Katex display tex="\boxed{P = (2,\,12)}" />,
    reason: <>A maximum for both — <Katex tex="f'" /> and <Katex tex="g'" /> each change from positive to negative there, matching the peak in the diagram.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="OA = k \ \text{ (along the } x\text{-axis)}, \qquad AB = g(k) = 12k-3k^2" />,
    reason: <><Katex tex="A" /> is at <Katex tex="(k,0)" /> and <Katex tex="B" /> is directly above it on track 2, so <Katex tex="AB" /> is vertical and the triangle is right-angled at <Katex tex="A" />.</>,
  },
  {
    working: <Katex display tex="A(k) = \frac12\,k\left(12k-3k^2\right) = 6k^2-\frac32k^3" />,
    reason: <>Half base times height. Name the function in the variable the question uses — <Katex tex="A(k)" />, not <Katex tex="A(x)" />.</>,
  },
  {
    working: <Katex display tex="A'(k) = 12k-\frac92k^2 = \frac{3k}{2}\left(8-3k\right)" />,
    reason: 'Differentiate and factorise.',
  },
  {
    working: <Katex display tex="A'(k) = 0 \implies k = 0 \ \text{ or } \ k = \frac83" />,
    reason: <><Katex tex="k=0" /> gives a degenerate triangle and is outside <Katex tex="(0,4)" /> anyway.</>,
  },
  {
    working: <Katex display tex="A''(k) = 12-9k, \quad A''\!\left(\tfrac83\right) = 12-24 = -12 < 0" />,
    reason: 'Confirming a maximum rather than a minimum.',
  },
  {
    working: <Katex display tex="A\!\left(\frac83\right) = 6\cdot\frac{64}{9}-\frac32\cdot\frac{512}{27} = \frac{384}{9}-\frac{768}{27}" />,
    reason: <><Katex tex="\left(\tfrac83\right)^2=\tfrac{64}{9}" /> and <Katex tex="\left(\tfrac83\right)^3=\tfrac{512}{27}" />. This substitution is where the report says the arithmetic broke down.</>,
  },
  {
    working: <Katex display tex="\boxed{A_{\max} = \frac{1152-768}{27} = \frac{384}{27} = \frac{128}{9} \ \mathrm{km^2}}" />,
    reason: <>About <Katex tex="14.2\ \mathrm{km^2}" />. Sanity check: <Katex tex="g\!\left(\tfrac83\right)=\tfrac{32}{3}\approx10.7" />, so the triangle is roughly <Katex tex="\tfrac12\times2.67\times10.7" /> ✓.</>,
  },
]

export default function MethodsQ9_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (6 marks)</p>
        <p>The shapes of two walking tracks are shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={tracksSrc}
            alt="Two curves from near the y-axis rising to a shared peak P and falling to the x-axis: track 1 a solid cubic starting high on the y-axis with a small dip, and track 2 a dashed parabola starting at the origin — from the original 2023 VCAA exam paper"
            className="w-full max-w-[500px]"
          />
        </div>
        <p>
          Track 1 is described by the function <Katex tex="f(x)=a-x(x-2)^2" />. Track 2 is
          defined by the function <Katex tex="g(x)=12x+bx^2" />. The unit of length is
          kilometres.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The command words here do real work. "Verify" (parts a. and b.) means the answer
            is given and the marks are for the working that produces it — and in part b. that
            means showing <Katex tex="f'(2)=0" /> <em>and</em> <Katex tex="g'(2)=0" />, not
            just that the curves meet. Solving <Katex tex="f(x)=g(x)" /> proves they touch,
            which is not what was asked.
          </p>
          <p>
            Part c. is an ordinary optimisation once the triangle is read correctly:{' '}
            <Katex tex="B" /> sits directly above <Katex tex="A" /> on track 2, so the base is{' '}
            <Katex tex="k" /> and the height is <Katex tex="g(k)" />.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Given that <Katex tex="f(0)=12" /> and <Katex tex="g(1)=9" />, verify that{' '}
            <Katex tex="a=12" /> and <Katex tex="b=-3" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Verify that <Katex tex="f(x)" /> and <Katex tex="g(x)" /> both have a turning point
            at <Katex tex="P" />. Give the coordinates of <Katex tex="P" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">c.</p>
        <p>
          A theme park is planned whose boundaries will form the triangle{' '}
          <Katex tex="OAB" /> where <Katex tex="O" /> is the origin, <Katex tex="A" /> is at{' '}
          <Katex tex="(k,0)" /> and <Katex tex="B" /> is at{' '}
          <Katex tex="\bigl(k,\,g(k)\bigr)" />, as shown below, where{' '}
          <Katex tex="k\in(0,4)" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={triangleSrc}
            alt="The same two tracks with a triangle drawn from the origin to A on the x-axis and up to B on track 2 directly above A, the right angle at A marked — from the original 2023 VCAA exam paper"
            className="w-full max-w-[500px]"
          />
        </div>
      </div>

      <PartCard
        letter="c"
        marks={3}
        statement={
          <>
            Find the maximum possible area of the theme park, in{' '}
            <Katex tex="\mathrm{km^2}" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
