// 2014 Specialist Mathematics — Exam 1, Question 1 (5 marks). A unit vector, the angle with
// the x-axis, and a perpendicularity condition. Question text transcribed from the original
// paper (no diagram given). Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      The most common errors involved finding the magnitude but not going on to find the unit
      vector. Some students made arithmetic errors and, finding the magnitude to be{' '}
      <Katex tex="\sqrt5" /> or <Katex tex="\sqrt7" />, obtained the correct form but then
      incorrectly rationalised the denominators.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [49, 9, 42],
  average: 1,
  comment: (
    <>
      Common errors included not using the dot product or direction cosines, but instead
      using a "tan" argument from a right-angled triangle. Many students simplified surds
      incorrectly, the most common error being{' '}
      <Katex tex="\tfrac{\sqrt3}{\sqrt6}=\tfrac12" />. Several errors were made with exact
      trigonometric values.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [10, 12, 78],
  average: 1.7,
  comment: (
    <>
      Most students answered this question well, although many equated the dot product to 1
      or <Katex tex="-1" />. Sign errors were quite common when rearranging the equation to
      find <Katex tex="m" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right| = \sqrt{\left(\sqrt3\right)^2+(-1)^2+\left(-\sqrt2\right)^2}" />,
    reason: <>The magnitude first. Squaring a surd removes it, so each term is a whole number.</>,
  },
  {
    working: <Katex display tex="= \sqrt{3+1+2} = \sqrt6" />,
    reason: <>A nice round <Katex tex="\sqrt6" /> — which is a sign the arithmetic is right.</>,
  },
  {
    working: <Katex display tex="\boxed{\hat{\underset{\sim}{a}} = \frac{1}{\sqrt6}\left(\sqrt3\,\underset{\sim}{i}-\underset{\sim}{j}-\sqrt2\,\underset{\sim}{k}\right)}" />,
    reason: <>Dividing the vector by its magnitude. Stopping at <Katex tex="\sqrt6" /> does not answer the question — a <em>unit vector</em> is wanted.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(\theta) = \frac{\underset{\sim}{a}\cdot\underset{\sim}{i}}{\left|\underset{\sim}{a}\right|\left|\underset{\sim}{i}\right|}" />,
    reason: <>The angle between a vector and an axis comes from the dot product with that axis's unit vector — the direction cosine. A right-angled-triangle "tan" argument does not work in three dimensions.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{i} = \sqrt3, \qquad \left|\underset{\sim}{i}\right| = 1" />,
    reason: <>The dot product with <Katex tex="\underset{\sim}{i}" /> just picks out the first component.</>,
  },
  {
    working: <Katex display tex="\cos(\theta) = \frac{\sqrt3}{\sqrt6} = \frac{1}{\sqrt2}" />,
    reason: <><Katex tex="\tfrac{\sqrt3}{\sqrt6}=\sqrt{\tfrac36}=\tfrac1{\sqrt2}" /> — not <Katex tex="\tfrac12" />, the report's most common slip.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \frac\pi4}" />,
    reason: <>Acute, as required. <Katex tex="45^\circ" /> is equally acceptable.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = 0" />,
    reason: <>Perpendicular vectors have a <em>zero</em> dot product — the report notes students setting it to <Katex tex="\pm1" />.</>,
  },
  {
    working: <Katex display tex="\left(\sqrt3\right)\left(2\sqrt3\right)+(-1)(m)+\left(-\sqrt2\right)(-5) = 0" />,
    reason: <>Componentwise. Two negatives in the last term make it positive.</>,
  },
  {
    working: <Katex display tex="6-m+5\sqrt2 = 0" />,
    reason: <><Katex tex="\sqrt3\times2\sqrt3=2\times3=6" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 6+5\sqrt2}" />,
    reason: <>Moving <Katex tex="m" /> across changes the sign of everything else — the report's other common error.</>,
  },
]

export default function SpecialistQ1_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (5 marks)</p>
        <p>
          Consider the vector{' '}
          <Katex tex="\underset{\sim}{a}=\sqrt3\,\underset{\sim}{i}-\underset{\sim}{j}-\sqrt2\,\underset{\sim}{k}" />
          , where <Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" /> and{' '}
          <Katex tex="\underset{\sim}{k}" /> are unit vectors in the positive directions of
          the <Katex tex="x" />, <Katex tex="y" /> and <Katex tex="z" /> axes respectively.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>Find the unit vector in the direction of <Katex tex="\underset{\sim}{a}" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Find the acute angle that <Katex tex="\underset{\sim}{a}" /> makes with the
            positive direction of the <Katex tex="x" />-axis.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            The vector{' '}
            <Katex tex="\underset{\sim}{b}=2\sqrt3\,\underset{\sim}{i}+m\underset{\sim}{j}-5\underset{\sim}{k}" />
            . Given that <Katex tex="\underset{\sim}{b}" /> is perpendicular to{' '}
            <Katex tex="\underset{\sim}{a}" />, find the value of <Katex tex="m" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
