// 2021 Specialist Mathematics — Exam 1 Question 8 (4 marks). A quadratic in z, then the
// same quadratic with the conjugate in place of z — which is a different problem entirely.
// Question text transcribed from the original paper. Answers checked with sympy and against
// the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      Students could either complete the square or use the quadratic formula to solve the
      equation. This question was answered well.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [50, 27, 13, 10],
  average: 0.9,
  comment: (
    <>
      Students who were successful let <Katex tex="z=x+iy" />, leading to{' '}
      <Katex tex="x^2-y^2+2xyi+2(x-iy)+2=0" />. Algebraic errors were often seen in attempts
      to solve the resulting equations. A number of students assumed that the solutions to
      part a. were also solutions to part b., and some students confused the complex
      conjugate with the reciprocal.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="z^2+2z+2 = 0" />,
    reason: 'A quadratic with real coefficients, so the usual tools apply.',
  },
  {
    working: <Katex display tex="(z+1)^2+1 = 0" />,
    reason: <>Completing the square is quickest here: <Katex tex="z^2+2z+1=(z+1)^2" />, leaving <Katex tex="+1" />.</>,
  },
  {
    working: <Katex display tex="(z+1)^2 = -1 \implies z+1 = \pm i" />,
    reason: <>The square roots of <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z = -1\pm i}" />,
    reason: 'A conjugate pair, as real coefficients require.',
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z^2+2\bar z+2 = 0" />,
    reason: <>The conjugate makes this <em>not</em> a polynomial equation — the answers to part a. will not work here, and no amount of factorising will help.</>,
  },
  {
    working: <Katex display tex="z = x+iy \implies z^2 = x^2-y^2+2xyi, \quad \bar z = x-iy" />,
    reason: 'Going to components is the only reliable route.',
  },
  {
    working: <Katex display tex="\left(x^2-y^2+2x+2\right)+i\left(2xy-2y\right) = 0" />,
    reason: 'Collecting real and imaginary parts.',
  },
  {
    working: <Katex display tex="\text{imaginary: } 2y(x-1) = 0 \implies y = 0 \text{ or } x = 1" />,
    reason: 'A complex number is zero only when both parts are, so this gives two cases.',
  },
  {
    working: <Katex display tex="y = 0: \ x^2+2x+2 = 0 \implies \Delta = -4 < 0, \text{ no real } x" />,
    reason: <>So there are no purely real solutions — note this is exactly part a.'s equation, which is why its answers do not carry over.</>,
  },
  {
    working: <Katex display tex="x = 1: \ 1-y^2+2+2 = 0 \implies y^2 = 5" />,
    reason: 'The surviving case.',
  },
  {
    working: <Katex display tex="\boxed{z = 1\pm\sqrt5\,i}" />,
    reason: <>Check: <Katex tex="z^2=1-5+2\sqrt5i=-4+2\sqrt5i" />, and <Katex tex="2\bar z=2-2\sqrt5i" />, so the sum is <Katex tex="-4+2+0i=-2" />, and adding 2 gives 0 ✓.</>,
  },
]

export default function SpecialistQ8_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Solve <Katex tex="z^2+2z+2=0" /> for <Katex tex="z" />, where{' '}
            <Katex tex="z\in C" />.
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
            Solve <Katex tex="z^2+2\bar z+2=0" /> for <Katex tex="z" />, where{' '}
            <Katex tex="z\in C" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
