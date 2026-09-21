// 2019 Mathematical Methods — Exam 1, Question 5 (5 marks).
// f(x) = 2/(x-1)² + 1 — evaluate f(-1) and sketch f (part a), then find the area it bounds
// with the x-axis, x=-1 and x=0 (part b). Question text transcribed from the original paper;
// the sketch axes VCAA supplied were blank (nothing pre-drawn to redraw), so the sketched
// curve is this site's own original content — plotted with matplotlib (real graphing
// software, exact, not hand-waypointed), not cropped from anything VCAA printed.
// Cross-checked against the VCAA examination report and itute's independent solutions —
// both agree with the derivation below. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import fSketchSrc from './meth-2019exam1-q5-truncus-sketch.png'

const EXAM_AI: SAExaminerStats = {
  marks: [7, 93],
  average: 1.0,
  comment: <>This question was done well.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [9, 22, 69],
  average: 1.6,
  comment: (
    <>
      Most students correctly recognised that a truncus shape was required, and most located
      it correctly. Curvature was an issue for some, with graphs "turning away" from the
      asymptotes or crossing them. Students who found a <Katex tex="y" />-intercept were most
      successful in producing a correct graph.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [28, 40, 32],
  average: 1.1,
  comment: (
    <>
      Students were generally able to set up the correct definite integral, but often did not
      find the correct antiderivative or evaluated it incorrectly. The most common errors were
      an antiderivative involving a log component, or overlooking the <Katex tex="+1" /> constant
      when antidifferentiating.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="f(-1) = \dfrac{2}{(-1-1)^2}+1 = \dfrac{2}{4}+1" />,
  },
  {
    working: <Katex display tex="\boxed{f(-1) = \dfrac32}" />,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{Vertical asymptote: } x=1" />
        <Katex display tex="\text{Horizontal asymptote: } y=1" />
      </>
    ),
    reason: <>The denominator <Katex tex="(x-1)^2\to0" /> as <Katex tex="x\to1" />; and <Katex tex="\dfrac{2}{(x-1)^2}\to0" /> as <Katex tex="x\to\pm\infty" />, leaving <Katex tex="f\to1" />.</>,
  },
  {
    working: <Katex display tex="f(0) = \dfrac{2}{1}+1 = 3, \qquad f(-1)=\tfrac32 \text{ (part a)}" />,
    reason: <>A couple of extra points either side of the asymptote to pin down the truncus's curvature.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={fSketchSrc}
          alt="Truncus with vertical asymptote x=1 and horizontal asymptote y=1, passing through (-1, 1.5) and (0, 3) — this site's own sketch, not a VCAA diagram"
          className="w-full max-w-[320px]"
        />
      </div>
    ),
    reason: <>Two truncus branches either side of <Katex tex="x=1" />, both approaching <Katex tex="y=1" /> and curving away from (never crossing) either asymptote.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \int_{-1}^{0} \left(\dfrac{2}{(x-1)^2}+1\right) dx" />,
  },
  {
    working: <Katex display tex="\int \dfrac{2}{(x-1)^2}\,dx = -\dfrac{2}{x-1}" />,
    reason: <>Reverse power rule on <Katex tex="2(x-1)^{-2}" />.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \left[-\dfrac{2}{x-1}+x\right]_{-1}^{0}" />,
  },
  {
    working: <Katex display tex="= \left(-\dfrac{2}{-1}+0\right) - \left(-\dfrac{2}{-2}+(-1)\right) = (2) - (1-1)" />,
    reason: <>At <Katex tex="x=0" />: <Katex tex="-\tfrac{2}{-1}=2" />. At <Katex tex="x=-1" />: <Katex tex="-\tfrac{2}{-2}=1" />, then <Katex tex="1+(-1)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 2}" />,
  },
]

export default function MethodsQ5_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (5 marks)</p>
        <p>
          Let <Katex tex="f:\mathbb{R}\setminus\{1\}\to\mathbb{R},\ f(x)=\dfrac{2}{(x-1)^2}+1" />.
        </p>
      </div>

      <PartCard letter="a.i" marks={1} statement={<>Evaluate <Katex tex="f(-1)" />.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard letter="a.ii" marks={2} statement={<>Sketch the graph of <Katex tex="f" /> on the axes below, labelling all asymptotes with their equations.</>} examinerReport={EXAM_AII}>
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard letter="b" marks={2} statement={<>Find the area bounded by the graph of <Katex tex="f" />, the <Katex tex="x" />-axis, the line <Katex tex="x=-1" /> and the line <Katex tex="x=0" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
