// 2021 Mathematical Methods — Exam 1 Question 4 (4 marks). Sketching a rectangular
// hyperbola, then reading an inequality straight off it. Question text transcribed from the
// original paper; the sketch is our own matplotlib drawing of the answer. Answers checked
// with sympy and against the VCAA examination report. Solution is original.
// Interactive: (b) interactives/meth-2021e1-q4b-upper-bound.tsx — slide a test x across the
// asymptote; the curve clears y = 3 only on [1, 2), and a toggle shows x ≥ 1 wrongly taking the right branch.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import sketchSrc from './meth-2021e1-q4a-sketch.png'

const UpperBound = lazyWidget(() => import('../interactives/meth-2021e1-q4b-upper-bound'))

const EXAM_A: SAExaminerStats = {
  marks: [11, 9, 24, 56],
  average: 2.3,
  comment: (
    <>
      Most students recognised that the graph was a rectangular hyperbola and presented a
      neatly drawn curve with branches correctly positioned. Students generally paid attention
      to curvature and asymptotic behaviour. Asymptotes were sometimes correctly positioned but
      labelled inaccurately or not at all. The axial intercepts were generally given as
      coordinates with occasional errors seeing the <Katex tex="x" />-intercept labelled{' '}
      <Katex tex="(4,0)" /> but positioned at <Katex tex="(3,0)" /> or the{' '}
      <Katex tex="y" />-intercept given as{' '}
      <Katex tex="(0,3)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [69, 32],
  average: 0.3,
  comment: (
    <>
      This question, while well attempted, was not done well. Most students attempted to
      solve algebraically instead of using the graph, and only obtained the lower bound of
      inequality. Other errors saw students write the interval as{' '}
      <Katex tex="(2,1]" />. Others had the values but incorrect brackets.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = 1-\frac{2}{x-2}" />,
    reason: (
      <>
        This is <Katex tex="y=\frac{a}{x-h}+k" /> with <Katex tex="a=-2" />, <Katex tex="h=2" />,{' '}
        <Katex tex="k=1" />: a rectangular hyperbola. It is <Katex tex="y=\frac1x" /> dilated by a factor of 2
        from the <Katex tex="x" />-axis, reflected in the <Katex tex="x" />-axis, then translated 2 units right and
        1 unit up.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{vertical asymptote: } x = 2" />,
    reason: <>The function is undefined where the denominator <Katex tex="x-2" /> is zero.</>,
  },
  {
    working: <Katex display tex="\text{horizontal asymptote: } y = 1" />,
    reason: <>As <Katex tex="x\to\pm\infty" />, <Katex tex="\frac{2}{x-2}\to0" />, so <Katex tex="y\to1" />.</>,
  },
  {
    working: <Katex display tex="y = 0: \ 0 = 1-\frac{2}{x-2} \implies \frac{2}{x-2} = 1" />,
    reason: <>Set <Katex tex="y=0" /> to find the <Katex tex="x" />-intercept.</>,
  },
  {
    working: <Katex display tex="x-2 = 2 \implies x = 4" />,
    reason: (
      <>
        So <Katex tex="(4,0)" />. The report notes some students labelled it <Katex tex="(4,0)" /> but positioned
        it at <Katex tex="(3,0)" />: mark the point at 4 on the <Katex tex="x" />-axis.
      </>
    ),
  },
  {
    working: <Katex display tex="x = 0: \ y = 1-\frac{2}{-2} = 1-(-1) = 2" />,
    reason: (
      <>
        Set <Katex tex="x=0" /> to find the <Katex tex="y" />-intercept: <Katex tex="(0,2)" />. Watch the signs:{' '}
        <Katex tex="\frac{2}{-2}=-1" />, and subtracting <Katex tex="-1" /> adds 1. The report notes some students
        gave <Katex tex="(0,3)" />.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="The answer on VCAA's axes (−6 to 6): a rectangular hyperbola with dashed asymptotes x = 2 and y = 1, passing through (0, 2) and (4, 0), one branch above-left of the asymptotes' crossing and one below-right"
          className="w-full max-w-[380px]"
        />
      </div>
    ),
    reason: (
      <>
        Because <Katex tex="a=-2" /> is negative, the branches sit upper-left and lower-right of the point{' '}
        <Katex tex="(2,1)" /> where the asymptotes cross: the opposite of <Katex tex="y=\tfrac1x" /> moved there.
        The intercepts confirm it: <Katex tex="(0,2)" /> is left of <Katex tex="x=2" /> and above{' '}
        <Katex tex="y=1" />; <Katex tex="(4,0)" /> is right of <Katex tex="x=2" /> and below <Katex tex="y=1" />.
        Draw the asymptotes dashed and label them with their equations, and label both intercepts with
        coordinates.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="1-\frac{2}{x-2} \ge 3" />,
    reason: (
      <>
        The left side is the function you graphed in part a, so use that graph: find where the curve is on or
        above the horizontal line <Katex tex="y=3" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{the curve only reaches } y=3 \text{ on the left branch}" />,
    reason: (
      <>
        For <Katex tex="x>2" />, <Katex tex="x-2" /> is positive, so <Katex tex="\frac{2}{x-2}" /> is positive and{' '}
        <Katex tex="y = 1-(\text{a positive number})<1" />. The right branch never gets near 3.
      </>
    ),
  },
  {
    working: <Katex display tex="1-\frac{2}{x-2} = 3 \implies \frac{-2}{x-2} = 2" />,
    reason: <>Find where the curve meets the line <Katex tex="y=3" />.</>,
  },
  {
    working: <Katex display tex="x-2 = -1 \implies x = 1" />,
    reason: (
      <>
        Multiply both sides by <Katex tex="x-2" /> and divide by 2. Solving this equation gives only this one endpoint,
        the lower bound. The report notes most students solved algebraically instead of using the graph, and only
        obtained the lower bound.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{left branch is increasing towards } +\infty \text{ as } x\to2^-" />,
    reason: (
      <>
        On your sketch the left branch rises from just above <Katex tex="y=1" /> (far left) and shoots up the
        asymptote. So left of <Katex tex="x=1" /> it is below 3, and from <Katex tex="x=1" /> rightwards it stays at
        or above 3, right up to the asymptote. The upper
        bound is the asymptote <Katex tex="x=2" />: solving the equation can&apos;t find it, but the graph shows it.
      </>
    ),
    more: (
      <>
        Slide <Katex tex="x" /> past the asymptote in the diagram below.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x \in [1,\ 2)}" />,
    reason: (
      <>
        Square bracket at 1 (the inequality is <Katex tex="\ge" />, so <Katex tex="x=1" /> counts), round bracket
        at 2 (the function is undefined there). Write the smaller endpoint first: the report notes some students
        wrote <Katex tex="(2,1]" />. Writing <Katex tex="x\ge1" /> alone wrongly includes the whole right branch.
      </>
    ),
  },
]

export default function MethodsQ4_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Sketch Hyperbola"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y=1-\dfrac{2}{x-2}" /> on the axes below.
            Label asymptotes with their equations and axis intercepts with their coordinates.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Inequality"
        marks={1}
        statement={
          <>
            Find the values of <Katex tex="x" /> for which{' '}
            <Katex tex="1-\dfrac{2}{x-2}\ge3" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why the answer stops at the asymptote">
          <UpperBound />
        </Explore>
      </PartCard>
    </div>
  )
}
