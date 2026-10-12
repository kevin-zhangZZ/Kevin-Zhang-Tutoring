// 2025 Mathematical Methods — Exam 1 Question 3 (6 marks). A cosine with a doubled
// frequency: range, all four zeros, then one period sketched. Question text transcribed
// from the original paper; the part c. graph is our own drawing of the answer on VCAA's
// exact grid (x from just left of O to 2.5π, gridlines at multiples of π/2; y from −2.5 to 4,
// gridlines every 1). Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import sketchSrc from './meth-2025e1-q3c-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: (
    <>
      This question was well answered. The most common errors were to write the interval with
      curved brackets <Katex tex="(-1,3)" /> or with incorrectly signed values as{' '}
      <Katex tex="[1,3]" />. Some students incorrectly wrote <Katex tex="[3,-1]" />. It is
      important to note that incorrectly stating the range of values in terms of{' '}
      <Katex tex="x" /> (as in <Katex tex="-1\le x\le3" />) is not acceptable notation.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [18, 13, 18, 51],
  average: 2.0,
  comment: (
    <>
      This question required particular solutions to be found to a trigonometric equation within
      the domain <Katex tex="0\le x\le2\pi" />. Some students could not identify the correct angle
      or quadrant for the initial angle. Students are reminded that the exact values of{' '}
      <Katex tex="\sin\theta" />, <Katex tex="\cos\theta" /> and <Katex tex="\tan\theta" /> for
      values of <Katex tex="\theta" /> between <Katex tex="0" /> and{' '}
      <Katex tex="\dfrac{\pi}{2}" /> are expected key knowledge for the study, as specified in the
      study design. Some students only gave two of the solutions, not taking into account the
      period of the function. Some students gave a general solution to the equation without
      indicating the particular solutions.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [34, 32, 33],
  average: 1.0,
  comment: (
    <>
      Most students presented cosine graphs that were drawn over the correct domain and range.
      Students generally included details and labels as required and produced smooth graph lines
      that displayed appropriate sinusoidal behaviour. Students are encouraged to pay attention to
      the symmetry of the curve and to use the grid lines to assist with accurately positioning the
      curve. Common errors included labelling the endpoints incorrectly as{' '}
      <Katex tex="\left(\dfrac{\pi}{2},0\right)" /> and{' '}
      <Katex tex="\left(\dfrac{3\pi}{2},0\right)" />, sketching a graph over the range{' '}
      <Katex tex="[-1,2]" />, extending the graph beyond the domain{' '}
      <Katex tex="\left[\dfrac{\pi}{2},\dfrac{3\pi}{2}\right]" />, or not passing the graph
      through the maximum point of <Katex tex="(\pi,3)" />. Some students incorrectly sketched an
      inverted version of the graph. Some students positioned their <Katex tex="x" />-intercepts
      incorrectly and/or asymmetrically and some students drew graphs that looked more like
      parabolas.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le \cos(2x) \le 1" />,
    reason: <>Start from the range of cosine itself. The inner factor 2 changes the period, never the range.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} -2 &\le 2\cos(2x) \le 2 \\ \implies -1 &\le 2\cos(2x)+1 \le 3 \end{aligned}" />,
    reason: <>Multiply through by 2, then add 1. The domain <Katex tex="[0,2\pi]" /> holds two full periods, so both extremes are actually reached.</>,
    more: <>Same result read as a transformation: amplitude 2 about the centre line <Katex tex="y=1" />, so <Katex tex="1-2" /> to <Katex tex="1+2" />. The check on the domain matters in general: on a domain shorter than a period, a maximum or minimum might not be reached and the range would be smaller.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f) = [-1,\ 3]}" />,
    reason: <>Square brackets because both ends are reached; smaller value first.</>,
    more: <>Round brackets would exclude <Katex tex="-1" /> and <Katex tex="3" />, but both are reached (row above). The range is a set of <Katex tex="y" />-values, so do not write it as an inequality in <Katex tex="x" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="2\cos(2x)+1 = 0 \implies \cos(2x) = -\tfrac12" />,
    reason: <>Isolate the cosine.</>,
  },
  {
    working: <Katex display tex="0 \le x \le 2\pi \implies 0 \le 2x \le 4\pi" />,
    reason: <>The equation is in <Katex tex="2x" />, so find every value of <Katex tex="2x" /> in its own interval: two full revolutions, not one.</>,
    more: <>This is the reliable way to get every solution: treat <Katex tex="2x" /> as a single angle <Katex tex="\theta" />, solve <Katex tex="\cos\theta=-\tfrac12" /> for all <Katex tex="\theta" /> in <Katex tex="[0,4\pi]" />, then halve at the end. Solving only in <Katex tex="[0,2\pi]" /> and halving would find just the solutions in <Katex tex="[0,\pi]" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \cos^{-1}\!\left(\tfrac12\right) &= \tfrac{\pi}{3} \\ \implies 2x &= \pi\pm\tfrac{\pi}{3} \quad \text{(first revolution)} \end{aligned}" />,
    reason: <>The basic angle uses the positive <Katex tex="\tfrac12" />. Cosine is negative in quadrants 2 and 3, so the angles sit <Katex tex="\tfrac{\pi}{3}" /> either side of <Katex tex="\pi" />.</>,
    more: <>Find the basic angle from the positive <Katex tex="\tfrac12" /> (an exact value you must know), then place it in the quadrants where cosine is negative. Quadrant 2 gives <Katex tex="\pi-\tfrac{\pi}{3}=\tfrac{2\pi}{3}" />; quadrant 3 gives <Katex tex="\pi+\tfrac{\pi}{3}=\tfrac{4\pi}{3}" />. The basic angle <Katex tex="\tfrac{\pi}{3}" /> is not itself a solution, since <Katex tex="\cos\tfrac{\pi}{3}" /> is positive.</>,
  },
  {
    working: <Katex display tex="2x = \tfrac{2\pi}{3},\ \tfrac{4\pi}{3},\ \tfrac{8\pi}{3},\ \tfrac{10\pi}{3}" />,
    reason: <>Add <Katex tex="2\pi" /> to each for the second revolution: four values in <Katex tex="[0,4\pi]" />, not two.</>,
    more: <>Stopping after the first revolution loses half the answers. Counting the zeros before solving (two periods in <Katex tex="[0,2\pi]" />, two zeros each), tells you to expect four.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac{\pi}{3},\ \tfrac{2\pi}{3},\ \tfrac{4\pi}{3},\ \tfrac{5\pi}{3}}" />,
    reason: <>Halve each value of <Katex tex="2x" />. List the particular solutions, not a general solution.</>,
    more: <>The domain is restricted, so the answer is these four values; a general solution on its own does not answer the question. Check one: <Katex tex="f\!\left(\tfrac{\pi}{3}\right)=2\cos\tfrac{2\pi}{3}+1=2\left(-\tfrac12\right)+1=0" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \text{period} &= \frac{2\pi}{2} = \pi \\ \tfrac{3\pi}{2}-\tfrac{\pi}{2} &= \pi \end{aligned}" />,
    reason: <>The period of <Katex tex="\cos(nx)" /> is <Katex tex="\tfrac{2\pi}{n}" />. The window is exactly one period, so the curve starts and finishes at the same height.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} f\!\left(\tfrac{\pi}{2}\right) &= 2\cos(\pi)+1 = -1 \\ f\!\left(\tfrac{3\pi}{2}\right) &= 2\cos(3\pi)+1 = -1 \end{aligned}" />,
    reason: <>Both endpoints are at the minimum. Label them <Katex tex="\left(\tfrac{\pi}{2},-1\right)" /> and <Katex tex="\left(\tfrac{3\pi}{2},-1\right)" />.</>,
    more: <>The endpoints are not <Katex tex="x" />-intercepts: substitute each <Katex tex="x" /> into <Katex tex="f" /> to get its height.</>,
  },
  {
    working: <Katex display tex="f(\pi) = 2\cos(2\pi)+1 = 3" />,
    reason: <>Halfway between the endpoints, <Katex tex="\cos(2\pi)=1" /> gives the maximum 3, the top of the range from part a.</>,
  },
  {
    working: <Katex display tex="\text{crosses } y=0 \text{ at } x = \tfrac{2\pi}{3} \text{ and } \tfrac{4\pi}{3}" />,
    reason: <>Two of the zeros from part b. lie in this window, symmetric about <Katex tex="x=\pi" />.</>,
    more: <>On VCAA's grid, <Katex tex="\tfrac{2\pi}{3}" /> is one third of the way from <Katex tex="\tfrac{\pi}{2}" /> to <Katex tex="\pi" /> (since <Katex tex="\tfrac{2\pi}{3}-\tfrac{\pi}{2}=\tfrac{\pi}{6}" />), and <Katex tex="\tfrac{4\pi}{3}" /> is its mirror image. Only the endpoints must be labelled; the intercepts help place the curve.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="The answer on VCAA's grid (x from 0 to 2.5π, y from −2.5 to 4): one full period of a cosine curve from the labelled endpoint (π/2, −1) up through the maximum (π, 3) and back down to the labelled endpoint (3π/2, −1), crossing the x-axis at 2π/3 and 4π/3"
          className="w-full max-w-[480px]"
        />
      </div>
    ),
    reason: <>One smooth cosine-shaped period: symmetric about <Katex tex="x=\pi" />, drawn only on <Katex tex="\left[\tfrac{\pi}{2},\tfrac{3\pi}{2}\right]" />, both endpoints labelled.</>,
    more: <>Stop exactly at the endpoints, and keep the cosine shape: low at both ends, high in the middle. The curve flattens into each endpoint (both are minimum points) and is rounded, not pointed, at <Katex tex="(\pi,3)" />.</>,
  },
]

export default function MethodsQ3_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (6 marks)</p>
        <p>
          Let <Katex tex="f:[0,2\pi]\to R" />, <Katex tex="f(x)=2\cos(2x)+1" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The inner 2 halves the period to <Katex tex="\pi" />, which is the fact behind
              both b. and c.: over <Katex tex="[0,2\pi]" /> there are two periods, each crossing{' '}
              <Katex tex="y=0" /> twice, so four zeros, and the window <Katex tex="\left[\tfrac{\pi}{2},\tfrac{3\pi}{2}\right]" />{' '}
              in part c. is exactly one period long.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard letter="a" topic="Range" marks={1} statement={<>State the range of <Katex tex="f" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Trig Equation"
        marks={3}
        statement={<>Solve <Katex tex="f(x)=0" /> for <Katex tex="x" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Graph"
        marks={2}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" /> for{' '}
            <Katex tex="x\in\left[\tfrac{\pi}{2},\tfrac{3\pi}{2}\right]" /> on the axes below.
            <br />
            Label the endpoints with their coordinates.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
