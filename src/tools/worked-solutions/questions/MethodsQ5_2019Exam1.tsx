// 2019 Mathematical Methods — Exam 1, Question 5 (5 marks).
// f(x) = 2/(x-1)² + 1 — evaluate f(-1) and sketch f (part a), then find the area it bounds
// with the x-axis, x=-1 and x=0 (part b). Question text transcribed from the original paper;
// the sketch axes VCAA supplied were blank (nothing pre-drawn to redraw), so the sketched
// curve is this site's own original content, computed exactly rather than hand-waypointed.
// Cross-checked against the VCAA examination report and itute's independent solutions —
// both agree with the derivation below. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { functionToPath } from '../graphUtils'

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
    working: <Katex display tex="\text{Vertical asymptote: } x=1 \qquad \text{Horizontal asymptote: } y=1" />,
    reason: <>The denominator <Katex tex="(x-1)^2\to0" /> as <Katex tex="x\to1" />; and <Katex tex="\dfrac{2}{(x-1)^2}\to0" /> as <Katex tex="x\to\pm\infty" />, leaving <Katex tex="f\to1" />.</>,
  },
  {
    working: <Katex display tex="f(0) = \dfrac{2}{1}+1 = 3, \qquad f(-1)=\tfrac32 \text{ (part a)}" />,
    reason: <>A couple of extra points either side of the asymptote to pin down the truncus's curvature.</>,
  },
  {
    working: (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <FSketch />
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

// f(x) = 2/(x-1)² + 1 — sampled exactly via functionToPath on each branch. VCAA's own axes
// for this part were blank, so this curve is this site's own original content.
function FSketch() {
  const f = (x: number) => 2 / (x - 1) ** 2 + 1
  const toSvgX = (x: number) => 60 + (x + 5) * 26
  const toSvgY = (y: number) => 230 - y * 26
  return (
    <svg viewBox="0 0 340 250" width={330} height={243}>
      <line x1={20} y1={toSvgY(0)} x2={320} y2={toSvgY(0)} stroke="#9ca3af" strokeWidth={1} />
      <line x1={toSvgX(-5)} y1={10} x2={toSvgX(-5)} y2={240} stroke="#e5e7eb" strokeWidth={1} />
      <line x1={toSvgX(1)} y1={5} x2={toSvgX(1)} y2={245} stroke="#fca5a5" strokeWidth={1.3} strokeDasharray="4 3" />
      <line x1={20} y1={toSvgY(1)} x2={320} y2={toSvgY(1)} stroke="#93c5fd" strokeWidth={1.3} strokeDasharray="4 3" />
      <text x={toSvgX(1) + 4} y={16} fontSize={11} className="fill-rose-500">x = 1</text>
      <text x={24} y={toSvgY(1) - 5} fontSize={11} className="fill-sky-500">y = 1</text>

      <path d={functionToPath(f, -5, 0.85, toSvgX, toSvgY)} fill="none" stroke="#0ea5e9" strokeWidth={2.2} />
      <path d={functionToPath(f, 1.15, 5, toSvgX, toSvgY)} fill="none" stroke="#0ea5e9" strokeWidth={2.2} />

      <circle cx={toSvgX(-1)} cy={toSvgY(1.5)} r={3} className="fill-gray-800 dark:fill-gray-200" />
      <text x={toSvgX(-1) - 6} y={toSvgY(1.5) - 8} fontSize={10} textAnchor="end" className="fill-gray-700 dark:fill-gray-300">(−1, 1.5)</text>

      <circle cx={toSvgX(0)} cy={toSvgY(3)} r={3} className="fill-gray-800 dark:fill-gray-200" />
      <text x={toSvgX(0) + 4} y={toSvgY(3) - 6} fontSize={10} className="fill-gray-700 dark:fill-gray-300">(0, 3)</text>

      {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(v => (
        <text key={v} x={toSvgX(v)} y={toSvgY(0) + 13} fontSize={9} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400">{v}</text>
      ))}
    </svg>
  )
}
