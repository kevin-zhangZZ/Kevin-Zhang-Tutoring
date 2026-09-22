// 2024 Mathematical Methods — Exam 1 Question 4 (3 marks). Standard deviation and a
// two-term binomial probability, both by hand. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      Some students found the variance instead of the standard deviation. Some made
      arithmetic errors in calculating the product of the decimals.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [38, 23, 39],
  average: 1.0,
  comment: (
    <>
      Many students correctly stated the binomial expansion with appropriate probability
      values and powers. However, some struggled to expand{' '}
      <Katex tex="\left(\tfrac{1}{10}\right)^3" /> and{' '}
      <Katex tex="\left(\tfrac{1}{10}\right)^4" /> into the correct decimal or fraction form;
      some responses included an extra zero or missed a zero. Some students only gave{' '}
      <Katex tex="\Pr(X=1)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}\!\left(4,\ \tfrac{9}{10}\right) \implies n = 4, \ p = \tfrac{9}{10}, \ 1-p = \tfrac{1}{10}" />,
    reason: 'Read off the two parameters.',
  },
  {
    working: <Katex display tex="\mathrm{Var}(X) = np(1-p) = 4\cdot\frac{9}{10}\cdot\frac{1}{10} = \frac{36}{100}" />,
    reason: 'The binomial variance, from the formula sheet.',
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd}(X) = \sqrt{\frac{36}{100}} = \frac{6}{10} = \frac35}" />,
    reason: <>The square root is the last step and the one the report says students forgot — <Katex tex="0.36" /> is the variance, not the standard deviation.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<2) = \Pr(X=0)+\Pr(X=1)" />,
    reason: <>Strictly less than 2, so <Katex tex="X=0" /> and <Katex tex="X=1" /> — two terms, not one.</>,
  },
  {
    working: <Katex display tex="\Pr(X=0) = \binom40\left(\frac{9}{10}\right)^0\left(\frac{1}{10}\right)^4 = \frac{1}{10\,000}" />,
    reason: <>Four failures in a row. <Katex tex="\left(\tfrac{1}{10}\right)^4=\tfrac{1}{10\,000}" /> — count the zeros.</>,
  },
  {
    working: <Katex display tex="\Pr(X=1) = \binom41\left(\frac{9}{10}\right)^1\left(\frac{1}{10}\right)^3 = 4\cdot\frac{9}{10}\cdot\frac{1}{1000} = \frac{36}{10\,000}" />,
    reason: <>The <Katex tex="\binom41=4" /> counts which of the four trials was the success.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X<2) = \frac{1+36}{10\,000} = \frac{37}{10\,000} = 0.0037}" />,
    reason: <>Tiny, as it should be: with <Katex tex="p=0.9" />, getting fewer than two successes out of four is very unlikely.</>,
  },
]

export default function MethodsQ4_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (3 marks)</p>
        <p>
          Let <Katex tex="X" /> be a binomial random variable where{' '}
          <Katex tex="X\sim\mathrm{Bi}\!\left(4,\dfrac{9}{10}\right)" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Two formula-sheet facts, both done by hand:{' '}
            <Katex tex="\mathrm{sd}=\sqrt{np(1-p)}" /> and{' '}
            <Katex tex="\Pr(X=k)=\binom nk p^k(1-p)^{n-k}" />. The numbers are chosen so that
            the variance is a perfect square and every probability is a whole number of
            ten-thousandths — so an answer that is not tidy is a signal to check the
            arithmetic.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>Find the standard deviation of <Katex tex="X" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={<>Find <Katex tex="\Pr(X<2)" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
