// 2022 Specialist Mathematics — Exam 1 Question 3 (4 marks). The sum of four independent
// normal variables, done without technology. Part b. was redacted by VCAA following the
// Independent Review. Question text transcribed from the original paper. Answer checked
// with scipy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
    reason: <>One cup at a time; the total for four cups is the sum of four independent copies.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(T) = 4\times10 = 40" />,
    reason: <>Means add.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(T) = 4\times1.5^2 = 9 \implies \mathrm{sd}(T) = 3" />,
    reason: <><strong>Variances</strong> add, not standard deviations. The answer is <Katex tex="3" />, not <Katex tex="4\times1.5=6" /> — the report notes a large number of students did not find the correct standard deviation.</>,
  },
  {
    working: <Katex display tex="\Pr(T>34) = \Pr\!\left(Z > \frac{34-40}{3}\right) = \Pr(Z>-2)" />,
    reason: <>Standardising. Thirty-four seconds is two standard deviations below the mean.</>,
  },
  {
    working: <Katex display tex="\Pr(-2<Z<2) \approx 0.95 \implies \Pr(Z<-2) \approx \frac{1-0.95}{2} = 0.025" />,
    reason: <>No technology is allowed, so the 68–95–99.7 rule plus the symmetry of the curve is the only route.</>,
  },
  {
    working: <Katex display tex="\Pr(Z>-2) = 1-0.025 = 0.975" />,
    reason: <>The complement of the small left tail.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(T>34) \approx 0.98}" />,
    reason: <>Correct to two decimal places, as asked. The exact value is <Katex tex="0.97725\ldots" />, so the rounding is safe.</>,
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
            "A total of four cups" means the <em>sum</em> of four independent normal
            variables, which is itself normal. Add the means; add the{' '}
            <em>variances</em>. The standard deviation of the total is{' '}
            <Katex tex="\sqrt{4\times1.5^2}=3" />, not <Katex tex="4\times1.5" /> — and
            notice the total's spread (3 s) is smaller relative to its mean (40 s) than one
            cup's is, which is exactly what averaging out should do.
          </p>
          <p>
            This is Exam 1, so there is no <Katex tex="\mathrm{normalCdf}" /> available. The
            question is engineered so the <Katex tex="z" />-score lands on a whole number and
            the 68–95–99.7 rule finishes it.
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
