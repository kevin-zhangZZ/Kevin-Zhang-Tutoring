// 2021 Mathematical Methods — Exam 1 Question 4 (4 marks). Sketching a rectangular
// hyperbola, then reading an inequality straight off it. Question text transcribed from the
// original paper; the sketch is our own matplotlib drawing of the answer. Answers checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './meth-2021e1-q4a-sketch.png'

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
    reason: <>A rectangular hyperbola: the reciprocal graph dilated by <Katex tex="-2" />, shifted 2 right and 1 up.</>,
  },
  {
    working: <Katex display tex="\text{vertical asymptote: } x = 2" />,
    reason: <>Where the denominator vanishes.</>,
  },
  {
    working: <Katex display tex="\text{horizontal asymptote: } y = 1" />,
    reason: <>As <Katex tex="x\to\pm\infty" /> the fraction dies away, leaving the constant term.</>,
  },
  {
    working: <Katex display tex="y = 0: \ 1 = \frac{2}{x-2} \implies x-2 = 2 \implies x = 4" />,
    reason: <>So <Katex tex="(4,0)" /> — and it must be <em>drawn</em> at 4, not at 3.</>,
  },
  {
    working: <Katex display tex="x = 0: \ y = 1-\frac{2}{-2} = 1+1 = 2" />,
    reason: <>So <Katex tex="(0,2)" />. The double negative is where <Katex tex="(0,3)" /> creeps in.</>,
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
    reason: <>Because of the minus sign, the branches sit upper-left and lower-right of the asymptote crossing at <Katex tex="(2,1)" /> — the opposite of <Katex tex="y=\tfrac1x" /> shifted there.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="1-\frac{2}{x-2} \ge 3" />,
    reason: <>The graph answers this faster than algebra: find where the curve sits at or above the line <Katex tex="y=3" />.</>,
  },
  {
    working: <Katex display tex="\text{the curve only reaches } y=3 \text{ on the left branch}" />,
    reason: <>On the right branch <Katex tex="y<1" /> throughout, so it never gets near 3. The report notes most students solved algebraically instead of using the graph, and only obtained the lower bound.</>,
  },
  {
    working: <Katex display tex="1-\frac{2}{x-2} = 3 \implies \frac{-2}{x-2} = 2 \implies x-2 = -1 \implies x = 1" />,
    reason: <>The one crossing point.</>,
  },
  {
    working: <Katex display tex="\text{left branch is increasing towards } +\infty \text{ as } x\to2^-" />,
    reason: <>So from <Katex tex="x=1" /> rightwards the curve stays at or above 3, right up to the asymptote.</>,
  },
  {
    working: <Katex display tex="\boxed{x \in [1,\ 2)}" />,
    reason: <>Square bracket at 1 (equality is allowed), round bracket at 2 (the function is undefined there). Writing <Katex tex="x\ge1" /> alone wrongly includes the whole right branch.</>,
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
      </PartCard>
    </div>
  )
}
