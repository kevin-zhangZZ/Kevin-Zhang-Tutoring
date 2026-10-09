// 2021 Specialist Mathematics — Exam 1 Question 8 (4 marks). A quadratic in z, then the
// same quadratic with the conjugate in place of z — which is a different problem entirely.
// Question text transcribed from the original paper. Answers checked with sympy and against
// the VCAA examination report. Solution is original.
// Interactive (b): interactives/spec-2021e1-q8b-two-curves.tsx — drag z; the solutions are where the
// curve Re(w) = 0 crosses the lines Im(w) = 0, and part a.'s answers sit on the curve but off the line.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TwoCurves = lazyWidget(() => import('../interactives/spec-2021e1-q8b-two-curves'))

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
      part a. were also solutions to part b. and some students confused the complex conjugate
      with the reciprocal. While it is possible to solve the equation beginning with the
      polar form <Katex tex="z=r\operatorname{cis}(\theta)" />, few students took this
      approach and those who did rarely made any significant progress.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="z^2+2z+2 = 0" />,
    reason: <>Every coefficient is real, so this is an ordinary quadratic: complete the square or use the quadratic formula.</>,
  },
  {
    working: <Katex display tex="(z+1)^2+1 = 0" />,
    reason: <>Complete the square: half the coefficient of <Katex tex="z" /> is 1, and <Katex tex="z^2+2z+1=(z+1)^2" />, so <Katex tex="z^2+2z+2=(z+1)^2+1" />.</>,
  },
  {
    working: <Katex display tex="(z+1)^2 = -1 \implies z+1 = \pm i" />,
    reason: <>The two square roots of <Katex tex="-1" /> are <Katex tex="i" /> and <Katex tex="-i" />, since <Katex tex="i^2=(-i)^2=-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z = -1\pm i}" />,
    reason: <>The roots are a conjugate pair, as they must be when every coefficient is real.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z^2+2\bar z+2 = 0" />,
    reason: (
      <>
        The middle term is <Katex tex="2\bar z" />, not <Katex tex="2z" />. The conjugate <Katex tex="\bar z" /> is not a
        power of <Katex tex="z" />, so this is not a polynomial equation: the quadratic formula and the conjugate root
        theorem do not apply, and part a.&apos;s answers do not work. For example, <Katex tex="z=-1+i" /> gives{' '}
        <Katex tex="(-1+i)^2+2(-1-i)+2 = -2i-2-2i+2 = -4i \neq 0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Let } z = x+iy, \text{ where } x, y \in R" />,
    reason: (
      <>
        When an equation mixes <Katex tex="z" /> and <Katex tex="\bar z" />, write <Katex tex="z" /> in Cartesian form:
        then both are written in the same two real unknowns, <Katex tex="x" /> and <Katex tex="y" />. (Starting from
        polar form is possible, but the report notes that those who tried it rarely made significant progress.)
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} z^2 &= x^2-y^2+2xyi \\ \bar z &= x-iy \end{aligned}" />,
    reason: (
      <>
        Expand <Katex tex="(x+iy)^2 = x^2+2xyi+i^2y^2" /> and use <Katex tex="i^2=-1" />. The conjugate{' '}
        <Katex tex="\bar z" /> just changes the sign of the imaginary part; it is <em>not</em> the reciprocal{' '}
        <Katex tex="\tfrac{1}{z}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x^2-y^2+2xyi+2(x-iy)+2 = 0" />,
    reason: <>Substitute both into the equation.</>,
  },
  {
    working: <Katex display tex="\left(x^2-y^2+2x+2\right)+(2xy-2y)\,i = 0" />,
    reason: <>Group the terms without <Katex tex="i" /> (the real part) and the terms with <Katex tex="i" /> (the imaginary part). Watch the sign: <Katex tex="2(x-iy)=2x-2yi" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x^2-y^2+2x+2 &= 0 \quad (1) \\ 2xy-2y &= 0 \quad (2) \end{aligned}" />,
    reason: (
      <>
        A complex number is <Katex tex="0" /> only when its real part and its imaginary part are both <Katex tex="0" />.
        So the one complex equation becomes two real equations, and <Katex tex="x" /> and <Katex tex="y" /> must satisfy
        both.
      </>
    ),
  },
  {
    working: <Katex display tex="(2):\ 2y(x-1) = 0 \implies y = 0 \text{ or } x = 1" />,
    reason: (
      <>
        Equation (2) is the simpler one, so start there. Factorise rather than dividing by <Katex tex="y" />, which would
        throw away the case <Katex tex="y=0" />. The null factor law gives two cases; test each one in (1).
      </>
    ),
    more: <>In the diagram below, the solutions are where the orange curve (1) crosses the blue lines (2).</>,
  },
  {
    working: <Katex display tex="\begin{gathered} y = 0 \text{ in } (1){:}\ x^2+2x+2 = 0 \\ \Delta = 2^2-4(1)(2) = -4 < 0 \end{gathered}" />,
    reason: (
      <>
        Substitute <Katex tex="y=0" /> into (1). Now <Katex tex="x" /> is the real part of <Katex tex="z" />, so it must be
        a real number, and a negative discriminant means
        there is no real <Katex tex="x" />, so this case gives no solutions. (It is part a.&apos;s equation again, but its
        roots <Katex tex="-1\pm i" /> are not real, so they cannot be values of <Katex tex="x" />.)
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{gathered} x = 1 \text{ in } (1){:}\ 1-y^2+2+2 = 0 \\ y^2 = 5 \implies y = \pm\sqrt5 \end{gathered}" />,
    reason: <>Substitute <Katex tex="x=1" /> into (1). Both values of <Katex tex="y" /> are real, so both give solutions.</>,
  },
  {
    working: <Katex display tex="\boxed{z = 1\pm\sqrt5\,i}" />,
    reason: (
      <>
        Put <Katex tex="x=1" /> and <Katex tex="y=\pm\sqrt5" /> back into <Katex tex="z=x+iy" />. Check{' '}
        <Katex tex="z=1+\sqrt5\,i" />: <Katex tex="z^2=1-5+2\sqrt5\,i=-4+2\sqrt5\,i" /> and{' '}
        <Katex tex="2\bar z=2-2\sqrt5\,i" />. Adding these and 2, the imaginary parts cancel and the real parts give{' '}
        <Katex tex="-4+2+2=0" /> ✓. The other root checks the same way.
      </>
    ),
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
        topic="Complex Quadratic"
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
        topic="Conjugate Equation"
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
        <Explore title="Both parts zero at once: where the real-part curve crosses the imaginary-part lines">
          <TwoCurves />
        </Explore>
      </PartCard>
    </div>
  )
}
