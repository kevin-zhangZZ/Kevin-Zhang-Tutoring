// 2014 Specialist Mathematics — Exam 1, Question 1 (5 marks). A unit vector, the angle with
// the x-axis, and a perpendicularity condition. Question text transcribed from the original
// paper (no diagram given). Answers checked with sympy and against the VCAA examination
// report. Solution is original.
// Review 2014–16 pass (Oct 2026): mode 'review' — no part qualifies, so no interactives.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      Students answered this question well. The most common errors involved finding the
      magnitude to be 6 or <Katex tex="\sqrt6" /> but not finding the unit vector. Some
      students made arithmetic errors and, finding the magnitude to be <Katex tex="\sqrt5" />{' '}
      or <Katex tex="\sqrt7" />, obtained the correct unit vector but then incorrectly
      rationalised the denominators.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [49, 9, 42],
  average: 1,
  comment: (
    <>
      Common errors included not using the dot product or direction cosines, but instead
      using a ‘tan’ argument from a right-angled triangle to get <Katex tex="\pm\tfrac\pi6" />{' '}
      or <Katex tex="\pm\tfrac\pi3" />. Many students simplified surds incorrectly, with the
      most common error being <Katex tex="\tfrac{\sqrt3}{\sqrt6}=\tfrac12" />. Several errors
      were made with exact trigonometric values.
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
    reason: <>Each squared component is <Katex tex="3" />, <Katex tex="1" /> and <Katex tex="2" />, which add to <Katex tex="6" />.</>,
    more: <>Check this sum carefully: the report says some students got <Katex tex="\sqrt5" /> or <Katex tex="\sqrt7" /> through arithmetic slips (for example, leaving out the <Katex tex="(-1)^2" /> term gives <Katex tex="\sqrt5" />). Squaring makes every term positive, so check you have all three: <Katex tex="3+1+2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\hat{\underset{\sim}{a}} = \frac{1}{\sqrt6}\left(\sqrt3\,\underset{\sim}{i}-\underset{\sim}{j}-\sqrt2\,\underset{\sim}{k}\right)}" />,
    reason: <>A unit vector is the vector divided by its own magnitude. Stopping at <Katex tex="\sqrt6" /> does not answer the question.</>,
    more: <>
      You can leave <Katex tex="\tfrac1{\sqrt6}" /> outside the bracket — rationalising is not required. If you do expand and
      rationalise, each coefficient simplifies separately:{' '}
      <Katex tex="\tfrac{\sqrt3}{\sqrt6}=\tfrac{\sqrt2}{2}" />, <Katex tex="\tfrac{1}{\sqrt6}=\tfrac{\sqrt6}{6}" />,{' '}
      <Katex tex="\tfrac{\sqrt2}{\sqrt6}=\tfrac{\sqrt3}{3}" />, giving{' '}
      <Katex tex="\tfrac{\sqrt2}{2}\underset{\sim}{i}-\tfrac{\sqrt6}{6}\underset{\sim}{j}-\tfrac{\sqrt3}{3}\underset{\sim}{k}" />.
      Check: the squares <Katex tex="\tfrac12+\tfrac16+\tfrac13" /> add to <Katex tex="1" />, as a unit vector's must. The report
      mentions incorrect rationalising of the denominators; leaving <Katex tex="\tfrac1{\sqrt6}" /> outside the bracket avoids that step entirely.
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(\theta) = \frac{\underset{\sim}{a}\cdot\underset{\sim}{i}}{\left|\underset{\sim}{a}\right|\left|\underset{\sim}{i}\right|}" />,
    reason: <>The angle between two vectors comes from their dot product. The positive <Katex tex="x" />-axis has direction <Katex tex="\underset{\sim}{i}" />, so use <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{i}" />.</>,
    more: <>
      A common wrong method in the report was a "tan" argument from a right-angled triangle, giving{' '}
      <Katex tex="\pm\tfrac\pi6" /> or <Katex tex="\pm\tfrac\pi3" />. That comes from using only the{' '}
      <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> components (<Katex tex="\tan\theta=\pm\tfrac{1}{\sqrt3}" /> or{' '}
      <Katex tex="\pm\sqrt3" />, depending on which side is taken as opposite; the sign comes from the{' '}
      <Katex tex="-\underset{\sim}{j}" />), which ignores the <Katex tex="-\sqrt2\,\underset{\sim}{k}" /> part — in three dimensions the vector
      does not lie in the <Katex tex="xy" />-plane, so that triangle is the wrong one. The dot product uses all three components
      automatically. (This ratio <Katex tex="\tfrac{a_x}{|\underset{\sim}{a}|}" /> is called the direction cosine of{' '}
      <Katex tex="\underset{\sim}{a}" /> for the <Katex tex="x" />-axis.)
    </>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{i} = \sqrt3, \qquad \left|\underset{\sim}{i}\right| = 1" />,
    reason: <>The dot product with <Katex tex="\underset{\sim}{i}" /> just picks out the first component.</>,
  },
  {
    working: <Katex display tex="\cos(\theta) = \frac{\sqrt3}{\sqrt6} = \frac{1}{\sqrt2}" />,
    reason: <>Using <Katex tex="\left|\underset{\sim}{a}\right|=\sqrt6" /> from part a. Then <Katex tex="\tfrac{\sqrt3}{\sqrt6}=\sqrt{\tfrac36}=\sqrt{\tfrac12}=\tfrac1{\sqrt2}" />.</>,
    more: <>The report's most common surd error was <Katex tex="\tfrac{\sqrt3}{\sqrt6}=\tfrac12" />, which simplifies <Katex tex="\tfrac36=\tfrac12" /> but forgets the square root: <Katex tex="\tfrac{\sqrt3}{\sqrt6}=\sqrt{\tfrac12}" />, not <Katex tex="\tfrac12" />. Put the whole fraction under one root first, then simplify inside it.</>,
  },
  {
    working: <Katex display tex="\boxed{\theta = \frac\pi4}" />,
    reason: <>The exact value: <Katex tex="\cos\tfrac\pi4=\tfrac1{\sqrt2}" />. This angle is acute, as required; <Katex tex="45^\circ" /> is equally acceptable.</>,
    more: <>The report also notes errors with exact trigonometric values. Keep the three apart: <Katex tex="\cos\tfrac\pi6=\tfrac{\sqrt3}2" />, <Katex tex="\cos\tfrac\pi4=\tfrac1{\sqrt2}" />, <Katex tex="\cos\tfrac\pi3=\tfrac12" />. Because the cosine is positive, the angle is already acute — no adjustment is needed.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = 0" />,
    reason: <>Perpendicular vectors have a <em>zero</em> dot product, because <Katex tex="\cos 90^\circ=0" />.</>,
    more: <>The report notes many students set the dot product equal to <Katex tex="1" /> or <Katex tex="-1" />. A dot product of <Katex tex="\pm1" /> has no special meaning here (it would only mean parallel if both vectors were unit vectors) — perpendicular always means exactly <Katex tex="0" />.</>,
  },
  {
    working: <Katex display tex="\left(\sqrt3\right)\left(2\sqrt3\right)+(-1)(m)+\left(-\sqrt2\right)(-5) = 0" />,
    reason: <>Multiply matching components and add. In the last term, <Katex tex="(-\sqrt2)(-5)=+5\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="6-m+5\sqrt2 = 0" />,
    reason: <><Katex tex="\sqrt3\times2\sqrt3=2\times3=6" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 6+5\sqrt2}" />,
    reason: <>Add <Katex tex="m" /> to both sides, so the <Katex tex="m" /> term has a plus sign and the other terms keep their signs.</>,
    more: <>The report says sign errors were common when rearranging. Adding <Katex tex="m" /> to both sides (rather than subtracting <Katex tex="6+5\sqrt2" />) avoids handling <Katex tex="-m" />. Check: <Katex tex="6-(6+5\sqrt2)+5\sqrt2=0" />.</>,
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
        topic="Unit Vector"
        marks={1}
        statement={<>Find the unit vector in the direction of <Katex tex="\underset{\sim}{a}" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Angle with Axis"
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
        topic="Perpendicular Vectors"
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
