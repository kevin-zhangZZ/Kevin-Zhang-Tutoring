// 2014 Specialist Mathematics — Exam 1, Question 3 (5 marks). Factorising a real quartic
// from one complex root. Question text transcribed from the original paper (no diagram
// given). Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [24, 9, 67],
  average: 1.5,
  comment: (
    <>
      Most students identified the need to use the conjugate root theorem but some then gave{' '}
      <Katex tex="z^2-1" /> as their answer. Confusion between solutions and factors was
      often evident. Some quoted <Katex tex="z=\pm1" /> as solutions rather than{' '}
      <Katex tex="z=\pm i" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 7, 9, 54],
  average: 1.9,
  comment: (
    <>
      Students made many sign errors and other algebraic errors in finding the second
      quadratic factor. Some students, having found this factor, gave{' '}
      <Katex tex="2\pm2\sqrt2 i" />, <Katex tex="-2\pm\sqrt2 i" /> or{' '}
      <Katex tex="2\pm\sqrt{10}i" /> as the solution.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(z) = z^4-4z^3+7z^2-4z+6 \text{ has real coefficients}" />,
    reason: <>Which is the condition the conjugate root theorem needs.</>,
  },
  {
    working: <Katex display tex="z = i \text{ a root} \implies z = -i \text{ a root}" />,
    reason: <>Non-real roots of a real polynomial come in conjugate pairs.</>,
  },
  {
    working: <Katex display tex="(z-i)(z+i) = z^2-i^2 = z^2+1" />,
    reason: <>Multiplying the two linear factors. Note <Katex tex="-i^2=+1" />, so the factor is <Katex tex="z^2+1" />, not <Katex tex="z^2-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z^2+1}" />,
    reason: <>A <em>factor</em>, which is what the question asks for — not the roots.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z^4-4z^3+7z^2-4z+6 = \left(z^2+1\right)\left(z^2+bz+c\right)" />,
    reason: <>Equating coefficients is quicker and safer than long division here.</>,
  },
  {
    working: <Katex display tex="\left(z^2+1\right)\left(z^2+bz+c\right) = z^4+bz^3+(c+1)z^2+bz+c" />,
    reason: <>Expanding the right-hand side.</>,
  },
  {
    working: <Katex display tex="b = -4, \qquad c = 6" />,
    reason: <>From the <Katex tex="z^3" /> and constant terms. Checking the <Katex tex="z^2" /> term: <Katex tex="c+1=7" /> ✓, and the <Katex tex="z" /> term: <Katex tex="b=-4" /> ✓.</>,
  },
  {
    working: <Katex display tex="z^2-4z+6 = 0 \implies z = \frac{4\pm\sqrt{16-24}}{2}" />,
    reason: <>The quadratic formula, with a negative discriminant as expected.</>,
  },
  {
    working: <Katex display tex="= \frac{4\pm\sqrt{-8}}{2} = \frac{4\pm2\sqrt2 i}{2} = 2\pm\sqrt2 i" />,
    reason: <><Katex tex="\sqrt{-8}=\sqrt{8}\,i=2\sqrt2\,i" />, and then <em>both</em> terms are divided by 2 — the step behind the report's wrong answers.</>,
  },
  {
    working: <Katex display tex="\boxed{z = i,\ -i,\ 2+\sqrt2 i,\ 2-\sqrt2 i}" />,
    reason: <>All four solutions in cartesian form. Check: the four roots sum to <Katex tex="0+4=4" />, matching the <Katex tex="-(-4)" /> from the <Katex tex="z^3" /> coefficient ✓.</>,
  },
]

export default function SpecialistQ3_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (5 marks)</p>
        <p>
          Let <Katex tex="f" /> be a function of a complex variable, defined by the rule{' '}
          <Katex tex="f(z)=z^4-4z^3+7z^2-4z+6" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Given that <Katex tex="z=i" /> is a solution of <Katex tex="f(z)=0" />, write down
            a quadratic factor of <Katex tex="f(z)" />.
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
            Given that the other quadratic factor of <Katex tex="f(z)" /> has the form{' '}
            <Katex tex="z^2+bz+c" />, find all solutions of{' '}
            <Katex tex="z^4-4z^3+7z^2-4z+6=0" /> in cartesian form.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
