// 2022 Mathematical Methods — Exam 1 Question 6 (8 marks). Reflecting a sine in the
// horizontal axis, finding its zeros, then recovering the translation and domain that map
// one onto the other. Question text transcribed from the original paper; the stem figure
// is a crop of VCAA's artwork and the answer sketch is our own. Answers checked with sympy
// and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2022e1-q6-graph.png'
import sketchSrc from './meth-2022e1-q6a-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [16, 27, 57],
  average: 1.4,
  comment: (
    <>
      Some students finished at the incorrect endpoint and some had the incorrect curvature.
      Many came close to, but not exactly at, the correct <Katex tex="x" />-intercepts. Many
      students sketched the reflection of <Katex tex="f" /> in its centre line{' '}
      <Katex tex="y=-1" />, rather than the reflection in the horizontal axis as required.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [11, 11, 31, 46],
  average: 2.1,
  comment: (
    <>
      This question required solutions for <Katex tex="k" /> (not <Katex tex="x" />) in the
      domain <Katex tex="[0,2\pi]" />, and most students recognised that they needed to find
      four solutions. The correct reference angle <Katex tex="\tfrac\pi6" /> was common,
      although some students gave <Katex tex="\tfrac\pi3" /> or <Katex tex="\tfrac\pi4" />.
      Errors included not finding the third and fourth angle correctly.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: (
    <>
      Some students seemed to confuse the vertical and horizontal translations. Common
      errors were <Katex tex="b=-2" /> or <Katex tex="b=\tfrac\pi2" />.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [54, 46],
  average: 0.5,
  comment: <>A common error was <Katex tex="a=\tfrac\pi4" />.</>,
}

const EXAM_CIII: SAExaminerStats = {
  marks: [88, 12],
  average: 0.1,
  comment: (
    <>
      This question was not answered well, with students commonly translating in the wrong
      direction. The incorrect answer of{' '}
      <Katex tex="\left[\tfrac\pi2,\tfrac{5\pi}{2}\right]" /> was common.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = -f(x) = -\bigl(2\sin(2x)-1\bigr) = 1-2\sin(2x)" />,
    reason: <>Reflection in the <em>horizontal axis</em> negates the whole output, including the <Katex tex="-1" />. Reflecting in the centre line <Katex tex="y=-1" /> instead would leave the graph oscillating about <Katex tex="y=-1" /> — the report's most common error.</>,
  },
  {
    working: <Katex display tex="\text{range } [-3,1] \to [-1,3]; \quad \text{maxima become minima}" />,
    reason: <>Every point flips: <Katex tex="f" /> peaks at 1 and troughs at <Katex tex="-3" />, so <Katex tex="g" /> troughs at <Katex tex="-1" /> and peaks at 3.</>,
  },
  {
    working: <Katex display tex="x\text{-intercepts are unchanged}" />,
    reason: <>A reflection in the <Katex tex="x" />-axis fixes every point on that axis — so the four zeros from part b. are shared.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="The original curve f dotted in blue oscillating about y = −1, and the answer g in orange oscillating about y = +1, the two crossing at the four shared x-intercepts"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <><Katex tex="g" /> ends at <Katex tex="x=2\pi" /> with <Katex tex="g(2\pi)=1" />, matching the domain of <Katex tex="f" />. The dotted curve is <Katex tex="f" />, shown only for comparison.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="2\sin(2k)-1 = 0 \implies \sin(2k) = \tfrac12" />,
    reason: 'Solving for k, not x — the question is explicit about that.',
  },
  {
    working: <Katex display tex="k\in[0,2\pi] \implies 2k\in[0,4\pi]" />,
    reason: 'Doubling the interval is what produces four solutions instead of two.',
  },
  {
    working: <Katex display tex="\text{reference angle } \tfrac\pi6; \quad 2k = \tfrac\pi6,\ \tfrac{5\pi}{6} \ \text{in the first revolution}" />,
    reason: <>Sine is positive in the first and second quadrants. <Katex tex="\sin\tfrac\pi6=\tfrac12" /> is the exact value to know.</>,
  },
  {
    working: <Katex display tex="2k = \tfrac\pi6,\ \tfrac{5\pi}{6},\ \tfrac{13\pi}{6},\ \tfrac{17\pi}{6}" />,
    reason: <>Adding <Katex tex="2\pi=\tfrac{12\pi}{6}" /> to each of the first two gives the second revolution, still inside <Katex tex="[0,4\pi]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \tfrac{\pi}{12},\ \tfrac{5\pi}{12},\ \tfrac{13\pi}{12},\ \tfrac{17\pi}{12}}" />,
    reason: <>Halving. The third and fourth are the ones the report says students most often missed.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{translated } h: \ y = h(x-a)+b = 2\sin\bigl(2(x-a)\bigr)-1+b" />,
    reason: <>Right by <Katex tex="a" />, up by <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="\text{this must equal } g(x) = -2\sin(2x)+1" />,
    reason: 'Comparing the two rules term by term.',
  },
  {
    working: <Katex display tex="\text{constant terms: } -1+b = 1" />,
    reason: <>The sine term can supply the sign flip, but only the translation can move the centre line from <Katex tex="y=-1" /> to <Katex tex="y=+1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = 2}" />,
    reason: <>Positive, as required — the centre line rises by 2. <Katex tex="b=-2" /> would push it to <Katex tex="y=-3" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\sin\bigl(2(x-a)\bigr) = -\sin(2x) \ \text{ for all } x" />,
    reason: <>What is left once <Katex tex="b=2" /> is fixed: the horizontal shift must flip the sine.</>,
  },
  {
    working: <Katex display tex="-\sin(\theta) = \sin(\theta+\pi) \implies 2x-2a = 2x+\pi+2k\pi" />,
    reason: <>A half-period shift is what negates a sine — so <Katex tex="a" /> is a multiple of a half period, not a quarter.</>,
  },
  {
    working: <Katex display tex="-2a = \pi+2k\pi \implies a = -\tfrac\pi2-k\pi" />,
    reason: <>The period of <Katex tex="\sin(2x)" /> is <Katex tex="\pi" />, so successive values of <Katex tex="a" /> differ by <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \tfrac\pi2}" />,
    reason: <>Taking <Katex tex="k=-1" />. Half of the period <Katex tex="\pi" /> — <Katex tex="\tfrac\pi4" /> is a quarter period, the report's named error, and shifts the sine into a cosine instead.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the translation maps } D \to \text{dom}(g) = [0,2\pi]" />,
    reason: <>Mapping "onto" <Katex tex="g" /> means the image must have exactly <Katex tex="g" />'s domain.</>,
  },
  {
    working: <Katex display tex="x \to x+a = x+\tfrac\pi2" />,
    reason: 'The domain moves right along with the graph.',
  },
  {
    working: <Katex display tex="D+\tfrac\pi2 = [0,2\pi] \implies D = \left[0-\tfrac\pi2,\ 2\pi-\tfrac\pi2\right]" />,
    reason: <>Subtract, do not add: the <em>starting</em> domain is the target shifted <em>back</em>. Adding gives <Katex tex="\left[\tfrac\pi2,\tfrac{5\pi}{2}\right]" />, the report's named wrong answer.</>,
  },
  {
    working: <Katex display tex="\boxed{D = \left[-\tfrac\pi2,\ \tfrac{3\pi}{2}\right]}" />,
    reason: 'Only 12% of students scored this mark.',
  },
]

export default function MethodsQ6_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (8 marks)</p>
        <p>
          The graph of <Katex tex="y=f(x)" />, where{' '}
          <Katex tex="f:[0,2\pi]\to R,\ f(x)=2\sin(2x)-1" />, is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="Two full cycles of y = 2sin(2x) − 1 on 0 ≤ x ≤ 2π, oscillating between 1 and −3 — from the original 2022 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            On the axes above, draw the graph of <Katex tex="y=g(x)" />, where{' '}
            <Katex tex="g(x)" /> is the reflection of <Katex tex="f(x)" /> in the horizontal
            axis.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={3}
        statement={
          <>
            Find all values of <Katex tex="k" /> such that <Katex tex="f(k)=0" /> and{' '}
            <Katex tex="k\in[0,2\pi]" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        <p>
          Let <Katex tex="h:D\to R" />, <Katex tex="h(x)=2\sin(2x)-1" />, where{' '}
          <Katex tex="h(x)" /> has the same rule as <Katex tex="f(x)" /> with a different
          domain. The graph of <Katex tex="y=h(x)" /> is translated <Katex tex="a" /> units
          in the positive horizontal direction and <Katex tex="b" /> units in the positive
          vertical direction so that it is mapped onto the graph of <Katex tex="y=g(x)" />,
          where <Katex tex="a,b\in(0,\infty)" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
        marks={1}
        statement={<>Find the value for <Katex tex="b" />.</>}
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        marks={1}
        statement={<>Find the smallest positive value for <Katex tex="a" />.</>}
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="c.iii"
        marks={1}
        statement={
          <>
            Hence, or otherwise, state the domain, <Katex tex="D" />, of{' '}
            <Katex tex="h(x)" />.
          </>
        }
        examinerReport={EXAM_CIII}
      >
        <WorkingTable rows={ROWS_CIII} />
      </PartCard>
    </div>
  )
}
