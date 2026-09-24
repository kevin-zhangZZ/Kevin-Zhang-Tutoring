// 2020 Mathematical Methods — Exam 1, Question 8 (8 marks). The minimum of x·log_e(x), a
// show-that antiderivative, the area under the curve, and two conditions on a vertical
// translation. Question text transcribed from the original paper; the figure is a crop of
// VCAA's own artwork. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2020e1-q8-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [24, 17, 59],
  average: 1.3,
  comment: (
    <>
      The most common errors were incorrect differentiation of{' '}
      <Katex tex="f(x)=x\log_e(x)" /> or incorrect evaluation of{' '}
      <Katex tex="f\!\left(\tfrac1e\right)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: (
    <>
      Many students made-up their working as the answer was given, rather than clearly
      demonstrating progression to the answer.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [66, 23, 11],
  average: 0.5,
  comment: (
    <>
      Many students were unsure of which terminals to use for the definite integral, opting to
      use a generic 'a' and 'b'. A common oversight was the fact that the required area was
      below the <Katex tex="x" />-axis. Other errors occurred in evaluation.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [84, 16],
  average: 0.2,
  comment: (
    <>
      Many students did not attempt this question. Those who persisted recognised that the
      gradient was 2, though often gave the incorrect answer of <Katex tex="x=e" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [95, 2, 3],
  average: 0.1,
  comment: (
    <>
      Some students tried to algebraically find the point of intersection of the graphs of
      function and its inverse function, with limited progress. This question could also be solved
      by consideration of the point where the gradient of <Katex tex="g(x)" /> was equal to
      the gradient of <Katex tex="y=x" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x\log_e(x) \implies f'(x) = \log_e(x)+x\cdot\frac1x" />,
    reason: <>Product rule. The second term simplifies to 1.</>,
  },
  {
    working: <Katex display tex="f'(x) = \log_e(x)+1 = 0" />,
    reason: <>Stationary points.</>,
  },
  {
    working: <Katex display tex="\log_e(x) = -1 \implies x = e^{-1} = \tfrac1e" />,
    reason: <>So <Katex tex="a=\tfrac1e" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(\tfrac1e\right) = \tfrac1e\log_e\!\left(\tfrac1e\right) = \tfrac1e\times(-1)" />,
    reason: <><Katex tex="\log_e\!\left(e^{-1}\right)=-1" /> — the evaluation the report flags.</>,
  },
  {
    working: <Katex display tex="\boxed{Q = \left(\tfrac1e,\,-\tfrac1e\right)}" />,
    reason: <>Below the axis, matching the printed graph.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\!\left(x^2\log_e(x)\right) = 2x\log_e(x)+x" />,
    reason: <>The given result. Antidifferentiating both sides is what unlocks it.</>,
  },
  {
    working: <Katex display tex="x^2\log_e(x) = \int\bigl(2x\log_e(x)+x\bigr)dx" />,
    reason: <>Reading the derivative backwards (up to a constant, which can be taken as <Katex tex="0" /> since any one antiderivative will do).</>,
  },
  {
    working: <Katex display tex="x^2\log_e(x) = 2\int x\log_e(x)\,dx + \frac{x^2}{2}" />,
    reason: <>Splitting the integral; <Katex tex="\int x\,dx=\tfrac{x^2}2" />.</>,
  },
  {
    working: <Katex display tex="2\int x\log_e(x)\,dx = x^2\log_e(x)-\frac{x^2}{2}" />,
    reason: <>Rearranging for the term we want.</>,
  },
  {
    working: <Katex display tex="\boxed{\int x\log_e(x)\,dx = \frac{x^2\log_e(x)}{2}-\frac{x^2}{4}}" />,
    reason: <>Dividing by 2. As required. Differentiating the given answer back also works (the report's alternative), but the argument has to run one way or the other — the report notes many students made up their working because the answer was given.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x\log_e(x) = 0 \implies x = 1, \text{ so } b = 1" />,
    reason: <>On <Katex tex="(0,\infty)" />, <Katex tex="x\ne0" />, so the intercept comes from <Katex tex="\log_e(x)=0" />.</>,
  },
  {
    working: <Katex display tex="\tfrac1e \le x \le 1 \implies f(x) \le 0" />,
    reason: <>The region is below the axis, so the integral will be negative and the area is its negative — the oversight the report highlights.</>,
  },
  {
    working: <Katex display tex="A = -\int_{1/e}^{1}x\log_e(x)\,dx" />,
    reason: <>The terminals are <Katex tex="a=\tfrac1e" /> and <Katex tex="b=1" /> from part a. — actual numbers, not generic letters.</>,
  },
  {
    working: <Katex display tex="= -\left[\frac{x^2\log_e(x)}{2}-\frac{x^2}{4}\right]_{1/e}^{1}" />,
    reason: <>Using the antiderivative from part b.</>,
  },
  {
    working: <Katex display tex="x=1: \quad 0-\tfrac14 = -\tfrac14" />,
    reason: <><Katex tex="\log_e(1)=0" />.</>,
  },
  {
    working: <Katex display tex="x=\tfrac1e: \quad \frac{e^{-2}(-1)}{2}-\frac{e^{-2}}{4} = -\frac{3}{4e^2}" />,
    reason: <><Katex tex="-\tfrac1{2e^2}-\tfrac1{4e^2}=-\tfrac3{4e^2}" />.</>,
  },
  {
    working: <Katex display tex="A = -\left(-\tfrac14+\tfrac{3}{4e^2}\right) = \tfrac14-\tfrac{3}{4e^2}" />,
    reason: <>Subtracting and negating.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{e^2-3}{4e^2}}" />,
    reason: <>About <Katex tex="0.148" />, plausible for a sliver roughly <Katex tex="0.63" /> wide and at most <Katex tex="0.37" /> deep.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = x\log_e(x)+k \implies g'(x) = \log_e(x)+1" />,
    reason: <>A vertical shift does not change the gradient function.</>,
  },
  {
    working: <Katex display tex="g'(x) = 2 \implies \log_e(x) = 1 \implies x = e" />,
    reason: <>Where the gradient matches the line <Katex tex="y=2x" />. This is the <Katex tex="x" />-value, not <Katex tex="k" /> — the report's common wrong answer.</>,
  },
  {
    working: <Katex display tex="g(e) = e\log_e(e)+k = e+k" />,
    reason: <>The <Katex tex="y" />-coordinate of the point of tangency.</>,
  },
  {
    working: <Katex display tex="y = 2x \text{ at } x=e \text{ gives } y = 2e" />,
    reason: <>For tangency the point must lie on the line too, not merely share its gradient.</>,
  },
  {
    working: <Katex display tex="e+k = 2e \implies \boxed{k = e}" />,
    reason: <>Solving.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="g:\left(\tfrac1e,\infty\right)\to R \text{ is increasing}" />,
    reason: <>Past the minimum at <Katex tex="x=\tfrac1e" />, <Katex tex="g'(x)=\log_e(x)+1>0" />.</>,
  },
  {
    working: <Katex display tex="g \text{ increasing} \implies g \text{ and } g^{-1} \text{ can only meet on } y = x" />,
    reason: <>The standard fact for an increasing function: any intersection with its own inverse lies on the line <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="g(x) = x \iff x\log_e(x)+k = x \iff k = x-x\log_e(x)" />,
    reason: <>So the graphs meet exactly when <Katex tex="k" /> is a value taken by <Katex tex="h(x)=x-x\log_e(x)" /> on <Katex tex="\left(\tfrac1e,\infty\right)" />.</>,
  },
  {
    working: <Katex display tex="h'(x) = 1-\bigl(\log_e(x)+1\bigr) = -\log_e(x) = 0 \implies x = 1" />,
    reason: <>Finding the largest value <Katex tex="h" /> reaches. (Equivalently: the point where <Katex tex="g'(x)=1" />, the gradient of <Katex tex="y=x" /> — the report's alternative.)</>,
  },
  {
    working: <Katex display tex="h(1) = 1-0 = 1, \quad\text{a maximum}" />,
    reason: <><Katex tex="h'>0" /> before <Katex tex="x=1" /> and <Katex tex="h'<0" /> after, and <Katex tex="h\to-\infty" /> as <Katex tex="x\to\infty" />, so <Katex tex="h" /> takes every value up to 1 and none above it.</>,
  },
  {
    working: <Katex display tex="\boxed{k > 1}" />,
    reason: <>Above the maximum there is no solution, so the graphs never meet. Only 3% of students scored both marks.</>,
  },
]

export default function MethodsQ8_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (8 marks)</p>
        <p>
          Part of the graph of <Katex tex="y=f(x)" />, where{' '}
          <Katex tex="f:(0,\infty)\to R" />, <Katex tex="f(x)=x\log_e(x)" />, is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="The curve y = x log_e(x) starting at an open circle at O, dipping just below the x-axis to a minimum labelled Q(a, f(a)), crossing back at (b, 0) and then rising steeply — from the original 2020 VCAA exam paper"
            className="w-full max-w-[320px]"
          />
        </div>
        <p>
          The graph of <Katex tex="f" /> has a minimum at the point{' '}
          <Katex tex="Q\bigl(a,f(a)\bigr)" />, as shown above.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Minimum Point"
        marks={2}
        statement={<>Find the coordinates of the point <Katex tex="Q" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Antiderivative"
        marks={1}
        statement={
          <>
            Using{' '}
            <Katex tex="\dfrac{d}{dx}\!\left(x^2\log_e(x)\right)=2x\log_e(x)+x" />, show that{' '}
            <Katex tex="x\log_e(x)" /> has an antiderivative{' '}
            <Katex tex="\dfrac{x^2\log_e(x)}{2}-\dfrac{x^2}{4}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Area Under Curve"
        marks={2}
        statement={
          <>
            Find the area of the region that is bounded by <Katex tex="f" />, the line{' '}
            <Katex tex="x=a" /> and the horizontal axis for <Katex tex="x\in[a,b]" />, where{' '}
            <Katex tex="b" /> is the <Katex tex="x" />-intercept of <Katex tex="f" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

<div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="g:(a,\infty)\to R" />, <Katex tex="g(x)=f(x)+k" /> for{' '}
          <Katex tex="k\in R" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Tangent Line"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="k" /> for which <Katex tex="y=2x" /> is a tangent to
            the graph of <Katex tex="g" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Inverse Intersections"
        marks={2}
        statement={
          <>
            Find all values of <Katex tex="k" /> for which the graphs of <Katex tex="g" /> and{' '}
            <Katex tex="g^{-1}" /> do not intersect.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
