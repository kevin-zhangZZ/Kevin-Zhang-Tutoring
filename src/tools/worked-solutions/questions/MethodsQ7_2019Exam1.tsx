// 2019 Mathematical Methods — Exam 1, Question 7 (4 marks).
// P is a point on y=√(1-x²), A=(-1,0), B=(x,0) — find PB in terms of x (part a), then the
// maximum area of triangle ABP (part b). Question text transcribed from the original paper;
// the diagram is cropped directly from the original VCAA exam PDF, not a redrawing. Cross-
// checked against the VCAA examination report and itute's independent solutions — both
// agree with the derivation below. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2019exam1-q7-semicircle.png'

const EXAM_A: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: <>Though mostly well done, some students left their answer as an incorrect and unsimplified form of the distance formula.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [41, 33, 15, 11],
  average: 1.0,
  comment: (
    <>
      The majority of students used calculus; some used geometry and trigonometry instead.
      Most found an expression for the area in terms of <Katex tex="x" />, but many who used
      calculus found the differentiation difficult, generally from poor setting out —
      particularly a lack of brackets, or mishandling negative terms.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="P=(x,y) \text{ is on } y=\sqrt{1-x^2}, \text{ and } B=(x,0)" />,
    reason: <><Katex tex="PB" /> is the vertical segment from <Katex tex="P" /> straight down to the <Katex tex="x" />-axis, so its length is just <Katex tex="P" />'s <Katex tex="y" />-coordinate.</>,
  },
  {
    working: <Katex display tex="\boxed{PB = \sqrt{1-x^2}}" />,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="AB = x-(-1) = x+1" />,
    reason: <>Base of the triangle, along the <Katex tex="x" />-axis from <Katex tex="A(-1,0)" /> to <Katex tex="B(x,0)" />.</>,
  },
  {
    working: <Katex display tex="A(x) = \tfrac12 \cdot AB \cdot PB = \tfrac12(x+1)\sqrt{1-x^2}" />,
    reason: <>Area of a right-angled triangle — <Katex tex="PB" /> is perpendicular to the base, as marked in the diagram.</>,
  },
  {
    working: <Katex display tex="A'(x) = \tfrac12\left[\sqrt{1-x^2} + (x+1)\cdot\dfrac{-x}{\sqrt{1-x^2}}\right]" />,
    reason: <>Product rule, with <Katex tex="\dfrac{d}{dx}\sqrt{1-x^2}=\dfrac{-x}{\sqrt{1-x^2}}" /> by the chain rule.</>,
  },
  {
    working: <Katex display tex="= \tfrac12\cdot\dfrac{(1-x^2) - x(x+1)}{\sqrt{1-x^2}} = \tfrac12\cdot\dfrac{1-2x^2-x}{\sqrt{1-x^2}}" />,
    reason: <>Combine over a common denominator: <Katex tex="(1-x^2)-x^2-x = 1-2x^2-x" />.</>,
  },
  {
    working: <Katex display tex="A'(x)=0 \;\implies\; 1-2x^2-x=0 \;\implies\; 2x^2+x-1=0 \;\implies\; (2x-1)(x+1)=0" />,
  },
  {
    working: <Katex display tex="x=\tfrac12 \text{ or } x=-1 \text{ (excluded — makes the area 0)}" />,
    reason: <>Maximum area occurs at <Katex tex="x=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="A\!\left(\tfrac12\right) = \tfrac12\left(\tfrac32\right)\sqrt{1-\tfrac14} = \tfrac12\left(\tfrac32\right)\left(\tfrac{\sqrt3}{2}\right)" />,
  },
  {
    working: <Katex display tex="\boxed{\text{Maximum area} = \dfrac{3\sqrt3}{8}}" />,
  },
]

export default function MethodsQ7_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (4 marks)</p>
        <p className="mb-2">
          The graph of the relation <Katex tex="y=\sqrt{1-x^2}" /> is shown on the axes below.{' '}
          <Katex tex="P" /> is a point on the graph of this relation, <Katex tex="A" /> is the
          point <Katex tex="(-1,0)" /> and <Katex tex="B" /> is the point <Katex tex="(x,0)" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={diagramSrc}
            alt="Upper semicircle y=√(1-x²) with A at (-1,0), B at (x,0), and P at (x,y) on the curve, with the right-angled triangle ABP shaded, from the original 2019 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard letter="a" marks={1} statement={<>Find an expression for the length <Katex tex="PB" /> in terms of <Katex tex="x" /> only.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={3} statement={<>Find the maximum area of the triangle <Katex tex="ABP" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
