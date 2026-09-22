// 2025 Mathematical Methods — Exam 1 Question 3 (6 marks). A cosine with a doubled
// frequency: range, all four zeros, then one period sketched. Question text transcribed
// from the original paper; the graph is our own drawing of the answer. Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './meth-2025e1-q3c-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: (
    <>
      The most common errors were to write the interval with curved brackets or with
      incorrectly signed values. It is important to note that stating the range in terms of{' '}
      <Katex tex="x" /> is not acceptable notation.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [18, 13, 18, 51],
  average: 2.0,
  comment: (
    <>
      Some students could not identify the correct angle or quadrant for the initial angle.
      Some students only gave two of the solutions, not taking into account the period of the
      function. Some students gave a general solution without indicating the particular
      solutions.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [34, 32, 33],
  average: 1.0,
  comment: (
    <>
      Common errors included labelling the endpoints incorrectly, sketching a graph over the
      range <Katex tex="[0,2\pi]" />, extending the graph beyond the domain, or not passing
      through the maximum point. Some students incorrectly sketched an inverted version of
      the graph.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le \cos(2x) \le 1" />,
    reason: <>The inner factor 2 changes the period but never the range of the cosine itself.</>,
  },
  {
    working: <Katex display tex="-2 \le 2\cos(2x) \le 2 \implies -1 \le 2\cos(2x)+1 \le 3" />,
    reason: <>Amplitude 2 about a centre of 1. The domain <Katex tex="[0,2\pi]" /> spans four full periods, so both extremes are actually reached.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f) = [-1,\ 3]}" />,
    reason: <>Square brackets, in increasing order, and in terms of <Katex tex="y" />-values — writing <Katex tex="-1\le x\le3" /> was explicitly marked wrong.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="2\cos(2x)+1 = 0 \implies \cos(2x) = -\tfrac12" />,
    reason: 'Isolating the cosine.',
  },
  {
    working: <Katex display tex="0 \le x \le 2\pi \implies 0 \le 2x \le 4\pi" />,
    reason: 'Doubling the domain first — this is what makes the count of solutions obvious.',
  },
  {
    working: <Katex display tex="\cos^{-1}\!\left(\tfrac12\right) = \tfrac{\pi}{3} \implies 2x = \pi\pm\tfrac{\pi}{3} \ \text{ in the first revolution}" />,
    reason: <>Cosine is negative in the second and third quadrants, so the solutions sit <Katex tex="\tfrac{\pi}{3}" /> either side of <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex="2x = \tfrac{2\pi}{3},\ \tfrac{4\pi}{3},\ \tfrac{8\pi}{3},\ \tfrac{10\pi}{3}" />,
    reason: <>Adding <Katex tex="2\pi" /> gives the second revolution — four values in <Katex tex="[0,4\pi]" />, not two.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac{\pi}{3},\ \tfrac{2\pi}{3},\ \tfrac{4\pi}{3},\ \tfrac{5\pi}{3}}" />,
    reason: 'Halving. Particular solutions were required, not a general solution formula.',
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{2} = \pi \implies \left[\tfrac{\pi}{2},\tfrac{3\pi}{2}\right] \text{ is exactly one period}" />,
    reason: 'So the curve starts and finishes at the same height, with one full oscillation in between.',
  },
  {
    working: <Katex display tex="f\!\left(\tfrac{\pi}{2}\right) = 2\cos(\pi)+1 = -1, \qquad f\!\left(\tfrac{3\pi}{2}\right) = 2\cos(3\pi)+1 = -1" />,
    reason: 'Both endpoints are at the minimum — they must be labelled with their coordinates.',
  },
  {
    working: <Katex display tex="f(\pi) = 2\cos(2\pi)+1 = 3" />,
    reason: <>The maximum, exactly halfway between the endpoints. The examiner noted graphs that missed this point.</>,
  },
  {
    working: <Katex display tex="\text{crosses } y=0 \text{ at } x = \tfrac{2\pi}{3} \text{ and } \tfrac{4\pi}{3}" />,
    reason: <>Two of the zeros from part b. lie in this window, and they sit symmetrically either side of <Katex tex="x=\pi" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{see the sketch below}}" />,
    reason: <>Symmetric about <Katex tex="x=\pi" />, drawn only on <Katex tex="\left[\tfrac{\pi}{2},\tfrac{3\pi}{2}\right]" />, and not inverted — the three things the report flagged.</>,
  },
]

export default function MethodsQ3_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (6 marks)</p>
        <p>
          Let <Katex tex="f:[0,2\pi]\to\mathbb{R}" />, <Katex tex="f(x)=2\cos(2x)+1" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The inner 2 halves the period to <Katex tex="\pi" />, which is the fact behind
            both b. and c.: over <Katex tex="[0,2\pi]" /> there are four periods and so four
            zeros, and the window <Katex tex="\left[\tfrac{\pi}{2},\tfrac{3\pi}{2}\right]" />{' '}
            in part c. is exactly one of them.
          </p>
          <p>
            The reliable way to handle part b. is to transform the domain before solving:
            substitute <Katex tex="\theta=2x" />, find every <Katex tex="\theta" /> in{' '}
            <Katex tex="[0,4\pi]" />, then halve. Solving in <Katex tex="x" /> directly is
            where the missing solutions came from.
          </p>
        </Background>
      </div>

      <PartCard letter="a" marks={1} statement={<>State the range of <Katex tex="f" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={3}
        statement={<>Solve <Katex tex="f(x)=0" /> for <Katex tex="x" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" /> for{' '}
            <Katex tex="x\in\left[\tfrac{\pi}{2},\tfrac{3\pi}{2}\right]" />. Label the
            endpoints with their coordinates.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="One full period of a cosine curve from the labelled endpoint (π/2, −1) up to the maximum (π, 3) and back down to the labelled endpoint (3π/2, −1)"
            className="w-full max-w-[520px]"
          />
        </div>
      </PartCard>
    </div>
  )
}
