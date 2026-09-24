// 2018 Mathematical Methods — Exam 1, Question 3 (5 marks). Solve 2cos(x)+1 = 0 on [0, 2π],
// then sketch f(x) = 2cos(x)+1 on VCAA's blank axes. Question text transcribed from the
// original paper. VCAA printed only an empty grid for part (b), so the finished curve is this
// site's own answer-sketch (matplotlib) drawn to VCAA's exact printed range and tick spacing.
// Answers checked independently with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './meth-2018e1-q3-cosine.png'

const EXAM_A: SAExaminerStats = {
  marks: [11, 17, 72],
  average: 1.6,
  comment: (
    <>
      This question was well answered. However, some students gave solutions beyond the given
      domain or incorrect values (confusing <Katex tex="\tfrac{\pi}{6}" /> with{' '}
      <Katex tex="\tfrac{\pi}{3}" /> as the reference angle).
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [11, 10, 13, 66],
  average: 2.4,
  comment: (
    <>
      This question was well answered, including by students who made little progress in part
      a. Some students did not label the three key points as directed by the question or drew
      graphs with more than one cycle. Students who took care with shape, especially at
      endpoints, and who linked part a. of this question to part b. were generally successful.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="2\cos(x)+1 = 0 \implies \cos(x) = -\frac12" />,
    reason: <>Isolate the cosine first — every trig equation starts here.</>,
  },
  {
    working: <Katex display tex="\text{Reference angle: } \cos^{-1}\!\left(\tfrac12\right) = \frac{\pi}{3}" />,
    reason: <>Take the <em>positive</em> value to get the reference angle. The report names <Katex tex="\tfrac{\pi}{6}" /> as the common slip: that is the reference angle for <Katex tex="\tfrac{\sqrt3}{2}" />, not <Katex tex="\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\cos(x)<0 \implies x \text{ in the 2nd or 3rd quadrant}" />,
    reason: <>Cosine is the <Katex tex="x" />-coordinate on the unit circle, so it is negative to the left of the vertical axis — quadrants 2 and 3.</>,
  },
  {
    working: <Katex display tex="x = \pi - \frac{\pi}{3} \ \text{ or } \ x = \pi + \frac{\pi}{3}" />,
    reason: <>The second-quadrant and third-quadrant angles built from the reference angle.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{2\pi}{3} \ \text{ or } \ x = \frac{4\pi}{3}}" />,
    reason: <>Both lie inside the required <Katex tex="0\le x\le 2\pi" />, and there are no others — the report notes some students gave solutions beyond the given domain.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = 2\cos(0)+1 = 3, \qquad f(2\pi) = 2\cos(2\pi)+1 = 3" />,
    reason: <>The two endpoints the question asks you to label. Both must be shown as closed points, since the domain <Katex tex="[0,2\pi]" /> includes them.</>,
  },
  {
    working: <Katex display tex="\text{Minimum where } \cos(x)=-1: \ x=\pi, \ f(\pi) = -1" />,
    reason: <>The local minimum, the third labelled point. Amplitude <Katex tex="2" /> about the line <Katex tex="y=1" /> puts the range at <Katex tex="[-1,3]" />.</>,
  },
  {
    working: <Katex display tex="x\text{-intercepts at } x=\frac{2\pi}{3},\ \frac{4\pi}{3} \quad \text{(part a.)}" />,
    reason: <>Part a. is not a separate question — it hands you exactly where the curve crosses the axis. The report singles out students who connected the two parts as the ones who did well.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={sketchSrc} alt="Graph of y = 2cos(x)+1 on [0, 2π]: starts at (0, 3), falls through the x-axis at 2π/3, reaches a minimum at (π, −1), rises back through 4π/3 and ends at (2π, 3)" className="w-full max-w-[420px]" />
      </div>
    ),
    reason: <>One full cycle and no more — the domain is exactly one period, and the report notes graphs drawn with extra cycles. Take care that the curve arrives at each endpoint <em>turning</em>, not as a straight run-in: <Katex tex="x=0" /> and <Katex tex="x=2\pi" /> are maximum points of the underlying cosine.</>,
  },
]

export default function MethodsQ3_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (5 marks)</p>
        <p>
          Let <Katex tex="f:[0,2\pi]\to R,\ f(x)=2\cos(x)+1" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Trig Equation"
        marks={2}
        statement={<>Solve the equation <Katex tex="2\cos(x)+1=0" /> for <Katex tex="0\le x\le 2\pi" />.</>}
        examinerReport={EXAM_A}
      >
        <Background>
          <p>
            The reference angle comes from the <em>size</em> of the cosine, ignoring its sign:
            here <Katex tex="\cos^{-1}\!\left(\tfrac12\right)=\tfrac{\pi}{3}" />. The sign then
            tells you which quadrants to place it in. Keeping those two steps separate is what
            stops <Katex tex="\tfrac{\pi}{3}" /> and <Katex tex="\tfrac{\pi}{6}" /> getting
            swapped.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={3}
        statement={<>Sketch the graph of the function <Katex tex="f" /> on the axes below. Label the endpoints and local minimum point with their coordinates.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
