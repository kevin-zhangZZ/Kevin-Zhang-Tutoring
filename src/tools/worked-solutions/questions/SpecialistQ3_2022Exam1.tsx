// 2022 Specialist Mathematics — Exam 1 Question 3 (4 marks). The sum of four independent
// normal variables, done without technology. Part b. was redacted by VCAA following the
// Independent Review. Question text transcribed from the original paper. Answer checked
// with scipy and against the VCAA examination report. Solution is original.
// Widget (part a): interactives/spec-2022e1-q3a-four-cups — pour rounds of four separate cups
// and watch the totals fit an sd-3 curve, not the wrong sd-6 (4 × 1.5) curve.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const FourCupsWidget = lazyWidget(() => import('../interactives/spec-2022e1-q3a-four-cups'))

const EXAM_A: SAExaminerStats = {
  marks: [59, 9, 31],
  average: 0.7,
  comment: (
    <>
      A large number of students did not find the correct standard deviation and so were
      unable to move towards evaluating <Katex tex="\Pr(Z>-2)" /> while others were unable to
      determine <Katex tex="\Pr(Z>-2)" />. Students who successfully evaluated{' '}
      <Katex tex="\Pr(Z>-2)" /> often drew
      diagrams of the probability density function and were aware of the approximate
      probabilities for a normal distribution.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X_i \sim \mathrm{N}\!\left(10,\,1.5^2\right), \quad T = X_1+X_2+X_3+X_4" />,
    reason: (
      <>
        Let <Katex tex="X_i" /> be the time for cup <Katex tex="i" /> and <Katex tex="T" /> the total. Assume
        the four cups are independent: one cup's time doesn't affect the next. Write <Katex tex="T" /> as a sum of
        four separate cups, <strong>not</strong> <Katex tex="4X" />, which would mean one cup's time multiplied by
        four (all four cups taking exactly the same time).
      </>
    ),
  },
  {
    working: <Katex display tex="\mathrm{E}(T) = 4\times10 = 40" />,
    reason: <>Means add: <Katex tex="\mathrm{E}(T)=\mathrm{E}(X_1)+\cdots+\mathrm{E}(X_4)" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(T) = 4\times1.5^2 = 9 \implies \mathrm{sd}(T) = 3" />,
    reason: (
      <>
        For independent variables, <strong>variances</strong> add, not standard deviations, so take the square
        root at the end. The answer is <Katex tex="3" />, not <Katex tex="4\times1.5=6" /> — the report notes a
        large number of students did not find the correct standard deviation. <Katex tex="6" /> is the sd
        of <Katex tex="4X" />, since <Katex tex="\mathrm{Var}(4X)=4^2\times1.5^2=36" />.
      </>
    ),
  },
  {
    working: <Katex display tex="T \sim \mathrm{N}\!\left(40,\,3^2\right)" />,
    reason: <>A sum of independent normal variables is itself normal, so we can standardise.</>,
  },
  {
    working: <Katex display tex="\Pr(T>34) = \Pr\!\left(Z > \frac{34-40}{3}\right) = \Pr(Z>-2)" />,
    reason: (
      <>
        Standardise with <Katex tex="z=\frac{x-\mu}{\sigma}" />: <Katex tex="34" /> seconds is exactly two
        standard deviations below the mean.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(-2<Z<2) \approx 0.95" />,
    reason: (
      <>
        Exam 1 has no CAS, so use the 68–95–99.7 rule: about 95% of a normal distribution lies within two standard
        deviations of the mean.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(Z<-2) \approx \frac{1-0.95}{2} = 0.025" />,
    reason: (
      <>
        The other 5% is split equally between the two tails (the curve is symmetric), so each tail holds 2.5%. A
        quick sketch of the bell curve with the region right of <Katex tex="-2" /> shaded makes this clear.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(Z>-2) = 1-0.025 = 0.975" />,
    reason: <>Everything except the small left tail.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(T>34) \approx 0.98}" />,
    reason: (
      <>
        Correct to two decimal places, as asked: <Katex tex="0.975" /> rounds up to <Katex tex="0.98" />. The
        rule's 95% is really about 95.45%, so the exact value is <Katex tex="0.9772\ldots" />, which also rounds
        to <Katex tex="0.98" />.
      </>
    ),
  },
]

export default function SpecialistQ3_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (4 marks)</p>
        <p>
          The time taken by a coffee machine to dispense a cup of coffee varies normally with
          a mean of 10 seconds and a standard deviation of 1.5 seconds.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            "A total of four cups" means the <em>sum</em> of four separate cup times, which we treat as
            independent normal variables. A sum of independent normal variables is itself normal: add the
            means, and add the <em>variances</em>. So the standard deviation of the total is{' '}
            <Katex tex="\sqrt{4\times1.5^2}=3" />, not <Katex tex="4\times1.5=6" />. Why smaller? Four separate
            cups are rarely all slow together: a slow cup is usually offset by a faster one, so the total strays
            less than four times one cup's spread.
          </p>
          <p>
            This is Exam 1, so there is no <Katex tex="\mathrm{normCdf}" /> available. The question is set up so
            the <Katex tex="z" />-score is a whole number, and the 68–95–99.7 rule finishes it: about 68%, 95% and
            99.7% of a normal distribution lies within 1, 2 and 3 standard deviations of the mean.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Sum of Normals"
        marks={2}
        statement={
          <>
            Find the probability that more than 34 seconds is needed to dispense a total of
            four cups of coffee. Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <Explore title="Slow and fast cups partly cancel, so the total's sd is 3, not 6">
          <FourCupsWidget />
        </Explore>
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">b. (2 marks)</p>
        <p>
          This question has been redacted following the findings of the Independent Review
          into the VCAA's Examination-Setting Policies, Processes and Procedures for the VCE.
          It does not appear in the published paper or the examination report, so there is
          nothing to solve.
        </p>
      </div>
    </div>
  )
}
