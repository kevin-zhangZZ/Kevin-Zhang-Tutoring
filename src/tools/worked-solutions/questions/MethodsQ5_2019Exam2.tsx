// 2019 Mathematical Methods — Exam 2, Question 5 (12 marks).
// f(x) = 1-x³ — the tangent at x = a and where it meets the curve again at P and the axis at
// Q (parts a-c), the area of the two shaded regions bounded by f, its tangent, and the axis,
// minimised over a (parts d-e), the mirror problem for f⁻¹ (part f), and the acute angle
// between the two curves' tangents at x = 1 (part g). The diagram is VCAA's own, cropped
// directly from the exam paper. Question text transcribed from the original paper.
// Cross-checked against the VCAA examination report and itute's independent solutions, and
// independently re-derived (the area formula and every minimisation confirmed exactly by
// computer algebra). Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2019exam2-q5-tangent-diagram.png'

const EXAM_A: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: (
    <>
      This question was done reasonably well. An equation was required — some students
      substituted <Katex tex="x=a" /> into the tangent's rule, giving just{' '}
      <Katex tex="y=1-a^3" /> (the point, not the line). There appeared to be some
      transcription errors: <Katex tex="y=3a^2x+2a^3+1" /> was sometimes seen.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: <>This question was done reasonably well. There appeared to be some transcription errors.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [28, 15, 57],
  average: 1.3,
  comment: (
    <>
      This question was answered well. Most students were able to equate their tangent line
      with <Katex tex="f(x)" />. Some students gave the answer without showing any working.
      Other students unsuccessfully tried to solve the cubic by hand.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [39, 31, 8, 22],
  average: 1.2,
  comment: (
    <>
      A common incorrect definite integral used the wrong bounds or the wrong pair of
      functions on part of the interval.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [53, 30, 17],
  average: 0.7,
  comment: (
    <>
      Many students knew they needed to solve the derivative equal to zero but gave an
      incorrect minimum. Common incorrect answers were <Katex tex="a=-\tfrac12" /> and{' '}
      <Katex tex="a=\tfrac12" />.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [95, 1, 4],
  average: 0.1,
  comment: <>This question was not answered well. Many students attempted a direct (non-symmetry) method but were not successful.</>,
}

const EXAM_G: SAExaminerStats = {
  marks: [95, 5],
  average: 0.1,
  comment: <>This question was not answered well. Many students did not attempt this question. Some students rounded their answer to <Katex tex="18°" />. An exact answer was required.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = -3x^2 \;\implies\; f'(a) = -3a^2" />,
  },
  {
    working: <Katex display tex="y - (1-a^3) = -3a^2(x-a)" />,
    reason: <>Point-gradient form at <Katex tex="\bigl(a,\ 1-a^3\bigr)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -3a^2x+2a^3+1}" />,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="0 = -3a^2x+2a^3+1" />,
    reason: <><Katex tex="Q" /> is where the tangent (part a) meets <Katex tex="y=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x_Q = \dfrac{2a^3+1}{3a^2}}" />,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="-3a^2x+2a^3+1 = 1-x^3" />,
    reason: <>Where the tangent meets the curve again.</>,
  },
  {
    working: <Katex display tex="x^3-3a^2x+2a^3=0" />,
  },
  {
    working: <Katex display tex="(x-a)^2(x+2a) = 0" />,
    reason: <><Katex tex="x=a" /> is a repeated root (the point of tangency); factorising out <Katex tex="(x-a)^2" /> leaves the other root.</>,
  },
  {
    working: <Katex display tex="\boxed{x_P = -2a}" />,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={diagramSrc} alt="Graph of f(x)=1-x³ with the tangent at (a,1-a³), meeting the curve again at P and the x-axis at Q, and the two shaded regions between them" className="w-full max-w-[440px]" />
      </div>
    ),
  },
  {
    working: <Katex display tex="A = \int_{-2a}^{1}\Bigl[\bigl(-3a^2x+2a^3+1\bigr)-\bigl(1-x^3\bigr)\Bigr]dx \;+\; \int_{1}^{x_Q}\bigl(-3a^2x+2a^3+1\bigr)\,dx" />,
    reason: <>The first region (from <Katex tex="P" /> to where <Katex tex="f" /> meets the axis at <Katex tex="x=1" />) is bounded above by the tangent and below by <Katex tex="f" />; the second (from there to <Katex tex="Q" />) is bounded above by the tangent and below by the axis itself, since <Katex tex="f" /> has already dropped below it.</>,
  },
  {
    working: <Katex display tex="\boxed{A(a) = \dfrac{80a^6+8a^3-9a^2+2}{12a^2}}" />,
    reason: <>Confirmed by direct computer-algebra integration.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="A'(a) = \dfrac{80a^6+2a^3-1}{3a^3} = 0" />,
  },
  {
    working: <Katex display tex="80a^6+2a^3-1=0 \;\implies\; a^3 = \dfrac{1}{10}" />,
    reason: <>Quadratic in <Katex tex="a^3" />; the other root is negative and rejected since <Katex tex="0<a<1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \dfrac{1}{\sqrt[3]{10}} \approx 0.464}" />,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="f^{-1} \text{ is the reflection of } f \text{ in the line } y=x" />,
    reason: <>Swapping the roles of the axes turns "regions bounded by <Katex tex="f" />, its tangent, and the <Katex tex="x" />-axis" into "regions bounded by <Katex tex="f^{-1}" />, its tangent, and the <Katex tex="y" />-axis" — the identical minimisation, reflected.</>,
  },
  {
    working: <Katex display tex="b = 1-a^3\Big|_{a=1/\sqrt[3]{10}} = 1-\dfrac{1}{10}" />,
    reason: <>The minimising point <Katex tex="\bigl(a,1-a^3\bigr)" /> reflects to <Katex tex="\bigl(1-a^3,\,a\bigr)" />, so the minimising <Katex tex="b" /> is the reflected point's <Katex tex="x" />-coordinate, <Katex tex="1-a^3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \dfrac{9}{10} = 0.9}" />,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="f'(0) = -3(0)^2 = 0 \;\implies\; \text{tangent to } f \text{ at } x=0 \text{ is horizontal}" />,
    reason: <><Katex tex="f^{-1}(1)=0" /> since <Katex tex="f(0)=1" />.</>,
  },
  {
    working: <Katex display tex="\implies \text{tangent to } f^{-1} \text{ at } x=1 \text{ is vertical}" />,
    reason: <>Reflecting a horizontal tangent in <Katex tex="y=x" /> gives a vertical one.</>,
  },
  {
    working: <Katex display tex="\text{Tangent to } f \text{ at } x=1 \text{ has gradient } f'(1)=-3" />,
  },
  {
    working: <Katex display tex="\text{Angle between a vertical line and a line of slope } -3 \;=\; \tan^{-1}\!\left(\dfrac13\right)" />,
    reason: <>The acute angle a line of slope <Katex tex="m" /> makes with the vertical is <Katex tex="\tan^{-1}\bigl(1/|m|\bigr)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\tan^{-1}\!\left(\dfrac13\right)}" />,
  },
]

export default function MethodsQ5_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (12 marks)</p>
        <p>
          Let <Katex tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=1-x^3" />. The tangent to the graph of{' '}
          <Katex tex="f" /> at <Katex tex="x=a" />, where <Katex tex="0<a<1" />, intersects the
          graph of <Katex tex="f" /> again at <Katex tex="P" /> and intersects the horizontal
          axis at <Katex tex="Q" />. The shaded regions shown in the diagram below are bounded
          by the graph of <Katex tex="f" />, its tangent at <Katex tex="x=a" /> and the
          horizontal axis.
        </p>
      </div>

      <PartCard letter="a" marks={1} statement={<>Find the equation of the tangent to the graph of <Katex tex="f" /> at <Katex tex="x=a" />, in terms of <Katex tex="a" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={1} statement={<>Find the <Katex tex="x" />-coordinate of <Katex tex="Q" />, in terms of <Katex tex="a" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={2} statement={<>Find the <Katex tex="x" />-coordinate of <Katex tex="P" />, in terms of <Katex tex="a" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={3} statement={<>Let <Katex tex="A" /> be the function that determines the total area of the shaded regions. Find the rule of <Katex tex="A" />, in terms of <Katex tex="a" />.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={2} statement={<>Find the value of <Katex tex="a" /> for which <Katex tex="A" /> is a minimum.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Consider the regions bounded by the graph of <Katex tex="f^{-1}" />, the tangent to
          the graph of <Katex tex="f^{-1}" /> at <Katex tex="x=b" />, where <Katex tex="0<b<1" />
          , and the <Katex tex="y" />-axis.
        </p>
      </div>

      <PartCard letter="f" marks={2} statement={<>Find the value of <Katex tex="b" /> for which the total area of these regions is a minimum.</>} examinerReport={EXAM_F}>
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard letter="g" marks={1} statement={<>Find the value of the acute angle between the tangent to the graph of <Katex tex="f" /> and the tangent to the graph of <Katex tex="f^{-1}" /> at <Katex tex="x=1" />.</>} examinerReport={EXAM_G}>
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
