// 2021 Specialist Mathematics — Exam 2, Section B Question 6 (10 marks). A lift's load
// limit, a queue of hot drinks, then a one-sided test on daily sales with its critical
// value and the probability of a Type II error. Question text transcribed from the original
// paper. Answers checked with scipy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [73, 13, 14],
  average: 0.4,
  comment: (
    <>
      Successful students used a trial-and-error approach or used a standardised value to
      solve for <Katex tex="n" />. A common error was to approach this as a sampling problem
      with <Katex tex="\tfrac{8}{\sqrt n}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [73, 3, 24],
  average: 0.5,
  comment: (
    <>
      There was evidence of confusion between the correct sum of four random variables and
      incorrectly scaling a random variable by a factor of four.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [25, 75],
  average: 0.8,
  comment: <>Most students correctly stated the hypotheses for a one-sided test.</>,
}

const EXAM_CII: SAExaminerStats = { marks: [30, 70], average: 0.7 }

const EXAM_CIII: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      Some students stated a correct conclusion but did not give a reason by referencing the{' '}
      <Katex tex="p" /> value.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [84, 16],
  average: 0.2,
  comment: (
    <>
      Some students calculated <Katex tex="63\,108.7" /> but did not proceed to answer the
      question correctly as a range of values.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [89, 2, 9],
  average: 0.2,
  comment: (
    <>
      Most students who found <Katex tex="\bar x = 62\,198.03" /> were able to go on to find
      the required probability.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="W_n = X_1+X_2+\cdots+X_n \sim \mathrm{N}\!\left(75n,\ 8^2n\right)" />,
    reason: <>The <em>total</em> mass of <Katex tex="n" /> people, not their mean — so the variances add and the standard deviation is <Katex tex="8\sqrt n" />, not <Katex tex="\tfrac{8}{\sqrt n}" />. That confusion is the report's named error.</>,
  },
  {
    working: <Katex display tex="\Pr(W_n>1000) < 0.01" />,
    reason: 'The lift exceeds its load only if the total mass does.',
  },
  {
    working: <Katex display tex="n=13: \ \Pr(W_{13}>1000) = 0.193" />,
    reason: <>Far too big — the mean total for 13 people is 975 kg, already close to the limit.</>,
  },
  {
    working: <Katex display tex="n=12: \ \Pr(W_{12}>1000) = 0.00015" />,
    reason: <>Comfortably under 1%. The mean is 900 kg with a standard deviation of <Katex tex="8\sqrt{12}\approx27.7" />, so 1000 kg is 3.6 standard deviations out.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 12}" />,
    reason: 'The maximum possible value — trial and error is the practical route, because n sits inside both the mean and the standard deviation.',
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{available time} = 9{:}00-8{:}52-0.5 = 7.5 \text{ minutes}" />,
    reason: 'Eight minutes until the meeting, less the half minute to walk there.',
  },
  {
    working: <Katex display tex="T_4 = T_1+T_2+T_3+T_4 \sim \mathrm{N}\!\left(4\times2,\ 4\times0.5^2\right) = \mathrm{N}(8,\ 1)" />,
    reason: <>Fourth in the queue means four drinks must be dispensed. Summing four independent variables adds the variances — it is not the same as <Katex tex="4T" />, which would have variance 4.</>,
  },
  {
    working: <Katex display tex="\Pr(T_4 \le 7.5) = \Pr\!\left(Z \le \frac{7.5-8}{1}\right) = \Pr(Z\le-0.5)" />,
    reason: <>The standard deviation is <Katex tex="\sqrt{4\times0.25}=1" />, which makes this clean.</>,
  },
  {
    working: <Katex display tex="\boxed{0.3085}" />,
    reason: <>To four decimal places. Less than a one-in-three chance — the mean wait alone is 8 minutes, already over her budget.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \mu = 60\,000}" />,
    reason: 'The pre-campaign mean, stated with an equals sign.',
  },
  {
    working: <Katex display tex="\boxed{H_1: \mu > 60\,000}" />,
    reason: <>"Whether the campaign was effective" means sales <em>increased</em>, so the test is one-sided to the right.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(60\,000,\ \frac{5000^2}{14}\right) \implies \mathrm{sd} = \frac{5000}{\sqrt{14}} = 1336.3" />,
    reason: <>A sample of 14 days, so divide by <Katex tex="\sqrt{14}" />.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(63500, ∞, 60000, 5000/√14)</Cas>,
    reason: <>The <Katex tex="p" /> value is the chance of a sample mean at least as extreme as the one observed, <em>assuming</em> <Katex tex="H_0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0.0044}" />,
    reason: <>To four decimal places. The observed mean is about 2.6 standard errors above 60 000.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.0044 < 0.01" />,
    reason: 'Compare against the stated significance level — the comparison itself is what earns the mark.',
  },
  {
    working: <Katex display tex="\boxed{\text{reject } H_0: \text{ the campaign was effective}}" />,
    reason: 'A conclusion without the p-value reference was not accepted.',
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{reject } H_0 \iff p \le 0.01 \iff \bar x \ge \text{the } 99\text{th percentile of } \bar X" />,
    reason: <>Working backwards from the significance level to a critical value for <Katex tex="\bar x" />.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.99, 60000, 5000/√14)</Cas>,
    reason: <>Gives <Katex tex="63\,108.71\ldots" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\bar x \ge 63\,109}" />,
    reason: <>To the nearest integer, and stated as a <em>range</em> — the report notes students who found 63 108.7 and stopped there.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{5\% level} \implies \text{critical value} = \text{the } 95\text{th percentile under } H_0" />,
    reason: <>"Incorrectly accepted" means the sample mean falls <em>below</em> the critical value even though <Katex tex="H_0" /> is false — a Type II error.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.95, 60000, 5000/√14)</Cas>,
    reason: <>Gives <Katex tex="\bar x_{\text{crit}} = 62\,198.03" />.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\bar X < 62\,198.03 \mid \mu = 63\,000\right)" />,
    reason: <>Now recompute the probability under the <em>true</em> mean of 63 000, not under <Katex tex="H_0" />.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 62198.03, 63000, 5000/√14)</Cas>,
    reason: 'The same standard error, a different centre.',
  },
  {
    working: <Katex display tex="\boxed{0.274}" />,
    reason: <>To three decimal places. Roughly a one-in-four chance of missing a real effect of this size with only 14 days of data.</>,
  },
]

export default function SpecialistQ6_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (10 marks)</p>
        <p>
          The maximum load of a lift in a chocolate company's office building is 1000 kg. The
          masses of the employees who use the lift are normally distributed with a mean of 75
          kg and a standard deviation of 8 kg. On a particular morning there are{' '}
          <Katex tex="n" /> employees about to use the lift.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            What is the maximum possible value of <Katex tex="n" /> for there to be less than
            a 1% chance of the lift exceeding the maximum load?
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        <p>
          Clare, who is one of the employees, likes to have a hot drink after she exits the
          lift. The time taken for the drink machine to dispense a hot drink is normally
          distributed with a mean of 2 minutes and a standard deviation of 0.5 minutes. Times
          taken to dispense successive hot drinks are independent.
        </p>
      </div>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Clare has a meeting at 9.00 am and at 8.52 am she is fourth in the queue for a
            hot drink. Assume that the waiting time between hot drinks dispensed is
            negligible and that it takes Clare 0.5 minutes to get from the drink machine to
            the meeting room. What is the probability, correct to four decimal places, that
            Clare will get to her meeting on time?
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        <p>
          Clare is a statistician for the chocolate company. The number of chocolate bars
          sold daily is normally distributed with a mean of 60 000 and a standard deviation
          of 5000. To increase sales, the company decides to run an advertising campaign.
          After the campaign, the mean daily sales from 14 randomly selected days was found
          to be 63 500. Clare has been asked to investigate whether the advertising campaign
          was effective, so she decides to perform a one-sided statistical test at the 1%
          level of significance.
        </p>
      </div>

      <PartCard
        letter="c.i"
        marks={1}
        statement={<>Write down suitable null and alternative hypotheses for this test.</>}
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        marks={1}
        statement={
          <>
            Determine the <Katex tex="p" /> value, correct to four decimal places, for this
            test.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="c.iii"
        marks={1}
        statement={<>State the conclusion of the test, giving a reason for your answer.</>}
        examinerReport={EXAM_CIII}
      >
        <WorkingTable rows={ROWS_CIII} />
      </PartCard>

      <PartCard
        letter="d"
        marks={1}
        statement={
          <>
            Find the values of the mean daily sales that would lead to the null hypothesis
            being rejected when tested at the 1% level of significance. Give your answer
            correct to the nearest integer.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        marks={2}
        statement={
          <>
            The advertising campaign has been successful to the extent that the mean daily
            sales is now 63 000. A statistical test is applied at the 5% level of
            significance. Find the probability that the null hypothesis would be incorrectly
            accepted, based on the sales of another 14 randomly selected days and assuming a
            standard deviation of 5000. Give your answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
