// 2024 Mathematical Methods — Exam 1 Question 4 (3 marks). Standard deviation and a
// two-term binomial probability, both by hand. Question text transcribed from the original
// paper. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: (
    <>
      This question was well attempted. Some students found the variance instead of the
      standard deviation. Some students made arithmetic errors in calculating the product of
      the decimals.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [38, 23, 39],
  average: 1.0,
  comment: (
    <>
      Many students correctly stated the binomial expansion with appropriate probability values
      and powers. However, some students struggled to expand{' '}
      <Katex tex="\left(\tfrac{1}{10}\right)^3" /> and{' '}
      <Katex tex="\left(\tfrac{1}{10}\right)^4" /> into the correct decimal or fraction form;
      some responses either included an extra zero or missed a zero. Some students only gave
      the <Katex tex="\Pr(X=1)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}\!\left(4,\ \tfrac{9}{10}\right) \implies n = 4, \ p = \tfrac{9}{10}, \ 1-p = \tfrac{1}{10}" />,
    reason: <>In <Katex tex="\mathrm{Bi}(n,p)" /> the first number is the number of trials and the second is the probability of success on each trial.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(X) = np(1-p) = 4\cdot\frac{9}{10}\cdot\frac{1}{10} = \frac{36}{100}" />,
    reason: <>The binomial variance <Katex tex="np(1-p)" /> is on the formula sheet. Multiply the fractions: numerators <Katex tex="4\cdot9\cdot1=36" />, denominators <Katex tex="10\cdot10=100" />.</>,
    more: <>The report notes some students made arithmetic errors in calculating the product of the decimals, <Katex tex="4\times0.9\times0.1" />. Keeping fractions avoids miscounting decimal places; as a check, <Katex tex="0.9\times0.1=0.09" /> (two decimal places) and <Katex tex="4\times0.09=0.36" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd}(X) = \sqrt{\frac{36}{100}} = \frac{6}{10} = \frac35 = 0.6}" />,
    reason: <>Standard deviation is the square root of the variance. Both 36 and 100 are perfect squares, so the root is exact: <Katex tex="\sqrt{36}=6" /> over <Katex tex="\sqrt{100}=10" />.</>,
    more: <>The report notes some students found the variance instead of the standard deviation, i.e. stopped at <Katex tex="0.36" />. Sanity check: almost every trial succeeds, so <Katex tex="X" /> is nearly always 3 or 4 — a small spread like <Katex tex="0.6" /> fits.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<2) = \Pr(X=0)+\Pr(X=1)" />,
    reason: <>A binomial variable takes only whole-number values, and strictly less than 2 means <Katex tex="X=0" /> or <Katex tex="X=1" /> — two terms, not one.</>,
    more: <>The report notes some students only gave the <Katex tex="\Pr(X=1)" />. The inequality excludes 2 itself but includes 0, so the values are <Katex tex="\{0,1\}" />. Compare <Katex tex="\Pr(X\le 2)" />, which would need three terms, <Katex tex="\{0,1,2\}" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X=0) = \binom40\left(\frac{9}{10}\right)^0\left(\frac{1}{10}\right)^4 = \frac{1}{10\,000}" />,
    reason: <>Formula sheet <Katex tex="\Pr(X=x)=\binom nx p^x(1-p)^{n-x}" /> with <Katex tex="x=0" />: all four trials fail. <Katex tex="\binom40" /> and <Katex tex="\left(\tfrac{9}{10}\right)^0" /> are both 1, leaving <Katex tex="\left(\tfrac{1}{10}\right)^4=\tfrac{1}{10\,000}" />.</>,
    more: <>The report notes some students added an extra zero or missed one when expanding <Katex tex="\left(\tfrac{1}{10}\right)^3" /> and <Katex tex="\left(\tfrac{1}{10}\right)^4" />. The power is the number of zeros: <Katex tex="10^3=1000" /> (needed for <Katex tex="\Pr(X=1)" /> next) and <Katex tex="10^4=10\,000" />; as decimals, <Katex tex="0.001" /> and <Katex tex="0.0001" /> (three and four decimal places).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \Pr(X=1) &= \binom41\left(\frac{9}{10}\right)^1\left(\frac{1}{10}\right)^3 \\ &= 4\cdot\frac{9}{10}\cdot\frac{1}{1000} = \frac{36}{10\,000} \end{aligned}" />,
    reason: <>Now <Katex tex="x=1" />: one success, three failures. <Katex tex="\binom41=4" /> counts which of the four trials was the success.</>,
    more: <>Write it over <Katex tex="10\,000" /> so it can be added to <Katex tex="\Pr(X=0)" />: <Katex tex="\tfrac{9}{10}\cdot\tfrac{1}{1000}=\tfrac{9}{10\,000}" />, then <Katex tex="4\cdot\tfrac{9}{10\,000}=\tfrac{36}{10\,000}" />. As a decimal, <Katex tex="0.0036" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X<2) = \frac{1+36}{10\,000} = \frac{37}{10\,000} = 0.0037}" />,
    reason: <>Same denominator, so add the numerators.</>,
    more: <>Decimal check: <Katex tex="0.0001+0.0036=0.0037" />. Both forms are exact, so either is a full answer. Tiny, as it should be: with <Katex tex="p=0.9" />, fewer than two successes out of four is very unlikely.</>,
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

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Two formula-sheet facts, both used by hand: the variance{' '}
              <Katex tex="\mathrm{Var}(X)=np(1-p)" /> (so{' '}
              <Katex tex="\mathrm{sd}(X)=\sqrt{np(1-p)}" />) and{' '}
              <Katex tex="\Pr(X=x)=\binom nx p^x(1-p)^{n-x}" />. The numbers are chosen so that
              the variance is a perfect square and every probability is a whole number of
              ten-thousandths — so an answer that is not tidy is a signal to check the
              arithmetic.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Binomial Distribution"
        marks={1}
        statement={<>Find the standard deviation of <Katex tex="X" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Binomial Distribution"
        marks={2}
        statement={<>Find <Katex tex="\Pr(X<2)" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
