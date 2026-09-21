// 2014 Mathematical Methods (CAS) — Exam 1, Question 5 (7 marks). Stationary points of a
// restricted cubic, its graph, and the area between it and a horizontal line. Question text
// transcribed from the original paper; VCAA supplied blank axes for the sketch, so both
// figures are this site's own matplotlib work. Answers checked with sympy and against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './meth-2014e1-q5b-cubic.png'
import areaSrc from './meth-2014e1-q5c-area.png'

const EXAM_A: SAExaminerStats = {
  marks: [14, 20, 66],
  average: 1.5,
  comment: (
    <>
      Students must be vigilant in ensuring they answer the specific question. In this
      question, <em>coordinates</em> were required and not simply <Katex tex="x" /> values.
      Some students omitted the turning point <Katex tex="(0,0)" /> and others incorrectly
      found <Katex tex="x" />-intercepts.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [21, 15, 63],
  average: 1.4,
  comment: (
    <>
      The correct response to this question required a smooth curve (not V shapes at turning
      points) and endpoints clearly labelled with their coordinates.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [25, 27, 27, 21],
  average: 1.5,
  comment: (
    <>
      Most students knew to seek a difference of two areas and were adept with basic
      integration; however, quite often arithmetic errors in evaluations or the incorrect use
      of negative signs marred their progress. Some students unnecessarily "overworked" the
      problem by creating three or four integrations, increasing the likelihood of an error.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 3x^2-x^3 \implies f'(x) = 6x-3x^2" />,
    reason: <>Stationary points are where the derivative is zero.</>,
  },
  {
    working: <Katex display tex="3x(2-x) = 0 \implies x = 0 \text{ or } x = 2" />,
    reason: <>Factorise rather than use the quadratic formula. Both values lie in the domain <Katex tex="[-1,3]" />.</>,
  },
  {
    working: <Katex display tex="f(0) = 0, \qquad f(2) = 12-8 = 4" />,
    reason: <>Substitute back to get the <Katex tex="y" />-values.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,0) \text{ and } (2,4)}" />,
    reason: <>As <em>coordinates</em> — the report is emphatic that bare <Katex tex="x" /> values scored nothing.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(-1) = 3(1)-(-1) = 4, \qquad f(3) = 27-27 = 0" />,
    reason: <>The endpoints, which the question asks to be labelled. Careful with <Katex tex="-x^3" /> at <Katex tex="x=-1" />: it is <Katex tex="+1" />.</>,
  },
  {
    working: <Katex display tex="(0,0) \text{ local minimum}, \qquad (2,4) \text{ local maximum}" />,
    reason: <>From part a. Between them <Katex tex="f'>0" />, so the curve rises; outside, it falls.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={sketchSrc}
          alt="The cubic y = 3x² − x³ drawn on [−1, 3]: starting at (−1, 4), falling to a local minimum at the origin, rising to a local maximum at (2, 4), then falling to (3, 0)"
          className="w-full max-w-[360px]"
        />
      </div>
    ),
    reason: <>Smooth curves at both turning points, and all four labelled points marked. Note the endpoints happen to share their heights with the turning points — <Katex tex="4" /> and <Katex tex="0" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="3x^2-x^3 = 4 \implies x^3-3x^2+4 = 0" />,
    reason: <>Find where the curve meets the line first — that fixes the terminals.</>,
  },
  {
    working: <Katex display tex="(x+1)(x-2)^2 = 0 \implies x = -1 \text{ or } x = 2" />,
    reason: <><Katex tex="x=-1" /> is a root by inspection; the repeated factor at <Katex tex="x=2" /> is the line touching the local maximum, which is why the region closes there.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <img
          src={areaSrc}
          alt="The same cubic with the horizontal line y = 4 drawn across it, and the region between the line and the curve from x = −1 to x = 2 shaded"
          className="w-full max-w-[360px]"
        />
      </div>
    ),
    reason: <>The line is above the curve throughout <Katex tex="(-1,2)" />, so one integral does it — no need for the three or four the report says students often set up.</>,
  },
  {
    working: <Katex display tex="A = \int_{-1}^{2}\Bigl(4-\left(3x^2-x^3\right)\Bigr)dx" />,
    reason: <>Upper function minus lower.</>,
  },
  {
    working: <Katex display tex="= \left[4x-x^3+\tfrac{x^4}4\right]_{-1}^{2}" />,
    reason: <>Antidifferentiating term by term.</>,
  },
  {
    working: <Katex display tex="= (8-8+4)-\left(-4+1+\tfrac14\right) = 4+\tfrac{11}4" />,
    reason: <>The lower terminal is where the sign errors happen: <Katex tex="-(-1)^3=+1" /> and <Katex tex="\tfrac{(-1)^4}4=\tfrac14" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \tfrac{27}4 = 6.75}" />,
    reason: <>A sanity check: the region sits inside a <Katex tex="3\times4" /> rectangle, and covers a bit over half of it.</>,
  },
]

export default function MethodsQ5_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (7 marks)</p>
        <p>
          Consider the function <Katex tex="f:[-1,3]\to R" />,{' '}
          <Katex tex="f(x)=3x^2-x^3" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={<>Find the coordinates of the stationary points of the function.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            On the axes below, sketch the graph of <Katex tex="f" />. Label any end points
            with their coordinates.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={3}
        statement={
          <>
            Find the area enclosed by the graph of the function and the horizontal line given
            by <Katex tex="y=4" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
