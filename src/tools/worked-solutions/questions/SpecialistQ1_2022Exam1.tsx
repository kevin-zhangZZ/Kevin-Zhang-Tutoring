// 2022 Specialist Mathematics — Exam 1 Question 1 (3 marks). Completing the square on a
// quadratic with an imaginary coefficient, then solving it. Question text transcribed from
// the original paper. Answers checked with sympy and against the VCAA examination report.
// Solution is original.
// Oct 2026 Concise/Detailed review: no interactive (both parts had at least 40% full marks: a 79%,
// b 70%); checks, the alternative methods and the conjugate trap sit in each row's `more`.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: (
    <>
      This question was answered well, with most students recognising the need to complete
      the square. Some arithmetic errors were observed.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [10, 19, 70],
  average: 1.6,
  comment: (
    <>
      Students could either use the result from Question 1a. as shown above or use the
      quadratic formula to find the solution to the equation.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}(z+ai)^2+b &= z^2+2aiz+a^2i^2+b \\ &= z^2+2aiz-a^2+b\end{aligned}" />,
    reason: <>The question hands you the target form, so expand it and match it to <Katex tex="p(z)" /> term by term (equating coefficients). Remember <Katex tex="i^2=-1" />, so the <Katex tex="a^2" /> term arrives negative.</>,
  },
  {
    working: <Katex display tex="2ai = 6i \implies a = 3" />,
    reason: <>Both sides are the same polynomial, so their coefficients of <Katex tex="z" /> must agree; divide both sides by <Katex tex="2i" />.</>,
    more: <>This is the usual completing-the-square step: halve the coefficient of <Katex tex="z" />, and half of <Katex tex="6i" /> is <Katex tex="3i" />. Done directly, without equating coefficients, it reads <Katex tex="p(z)=(z+3i)^2-(3i)^2-25=(z+3i)^2+9-25" />, which lands on the same answer.</>,
  },
  {
    working: <Katex display tex="-a^2+b = -25 \implies -9+b = -25 \implies b = -16" />,
    reason: <>Matching the constant term, using <Katex tex="a=3" /> from the line above.</>,
    more: <>The sign is the easy slip. If <Katex tex="i^2=-1" /> is forgotten, the constant becomes <Katex tex="+a^2+b" /> and you get <Katex tex="b=-34" />. But <Katex tex="(z+3i)^2-34" /> expands to <Katex tex="z^2+6iz-43" />, not <Katex tex="p(z)" />, so expanding your answer back out (below) catches it.</>,
  },
  {
    working: <Katex display tex="\boxed{p(z) = (z+3i)^2-16}" />,
    reason: <>Both <Katex tex="a=3" /> and <Katex tex="b=-16" /> are real, as the question requires.</>,
    more: <>Check by expanding: <Katex tex="(z+3i)^2-16=z^2+6iz-9-16=z^2+6iz-25" />, which is <Katex tex="p(z)" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="(z+3i)^2-16 = 0 \implies (z+3i)^2 = 16" />,
    reason: <>&lsquo;Hence&rsquo; points to part a., so set its completed-square form equal to <Katex tex="0" /> and move the <Katex tex="16" /> across.</>,
    more: <>&lsquo;Otherwise&rsquo; allows any valid method, such as the quadratic formula. With coefficients <Katex tex="1" />, <Katex tex="6i" /> and <Katex tex="-25" />, the discriminant is <Katex tex="(6i)^2-4(1)(-25)=-36+100=64" /> (note <Katex tex="(6i)^2=-36" />), so <Katex tex="z=\frac{-6i\pm\sqrt{64}}{2}=\frac{-6i\pm 8}{2}=\pm4-3i" />, the same two answers.</>,
  },
  {
    working: <Katex display tex="z+3i = \pm4" />,
    reason: <><Katex tex="16" /> is a positive real number, so its two square roots are <Katex tex="4" /> and <Katex tex="-4" />. Keep both: the question asks for the solutions, plural.</>,
    more: <>A quadratic always has two solutions over <Katex tex="C" /> (a repeated root counts twice). Writing only <Katex tex="z+3i=4" /> finds just one of them.</>,
  },
  {
    working: <Katex display tex="\boxed{z = 4-3i \quad\text{or}\quad z = -4-3i}" />,
    reason: <>Subtract <Katex tex="3i" /> from both sides, once for each sign.</>,
    more: (
      <>
        <p>
          Both solutions have imaginary part <Katex tex="-3" />, so they are <em>not</em> a
          conjugate pair. Conjugating{' '}
          <Katex tex="4-3i" /> to get a &lsquo;second root&rsquo; would fail:{' '}
          <Katex tex="p(4+3i)=-36+48i\neq0" />.
        </p>
        <p>
          Check <Katex tex="z=4-3i" />: <Katex tex="(4-3i)^2=7-24i" /> and{' '}
          <Katex tex="6i(4-3i)=18+24i" />, so <Katex tex="p(4-3i)=7-24i+18+24i-25=0" />. The
          root <Katex tex="-4-3i" /> checks the same way.
        </p>
      </>
    ),
  },
]

export default function SpecialistQ1_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
        <p>
          Consider the equation <Katex tex="p(z)=z^2+6iz-25" />, <Katex tex="z\in C" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The coefficients here are <em>not</em> all real — there is a <Katex tex="6i" /> in
              the middle. That single fact breaks a common habit with quadratics
              over <Katex tex="C" />. The conjugate root theorem (non-real roots come in
              conjugate pairs) only applies when every coefficient is real, so here you cannot
              get the second solution by conjugating the first, and the two solutions need not
              be conjugates. Completing the square, or the quadratic formula, still works
              exactly as usual.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Completing the Square"
        marks={1}
        statement={
          <>
            Express <Katex tex="p(z)" /> in the form{' '}
            <Katex tex="p(z)=(z+ai)^2+b" />, where <Katex tex="a,b\in R" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Complex Quadratic"
        marks={2}
        statement={
          <>
            Hence, or otherwise, find the solutions of the equation{' '}
            <Katex tex="p(z)=0" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
