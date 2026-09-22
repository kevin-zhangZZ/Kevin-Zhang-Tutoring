// 2024 Specialist Mathematics — Exam 2, Section B Question 6 (9 marks). A bottle-filling
// machine: a one-sided hypothesis test, a type II error, quality-control limits, then
// confidence intervals and sample size. Question text transcribed from the original paper
// (2024 papers are image-only, so read from rendered pages). Answers checked with scipy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [9, 91],
  average: 0.9,
}

const EXAM_BI: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: (
    <>
      Some students did not divide the standard deviation by 3 to account for the sample
      size.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [25, 75],
  average: 0.8,
  comment: (
    <>
      This question was generally well done; however, some students did not fully answer the
      question regarding whether or not the machine should be paused.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [45, 11, 44],
  average: 1.0,
  comment: (
    <>
      Common errors were: not finding the critical value for when <Katex tex="H_0" /> is
      true, and using the wrong tail.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
}

const EXAM_E: SAExaminerStats = {
  marks: [18, 82],
  average: 0.8,
}

const EXAM_F: SAExaminerStats = {
  marks: [49, 51],
  average: 0.5,
  comment: <>Some students incorrectly used 50 rather than 40 as the number of samples.</>,
}

const EXAM_G: SAExaminerStats = {
  marks: [54, 46],
  average: 0.5,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="H_0: \ \mu = 1000" />,
    reason: 'The null hypothesis is always the status quo — here, the machine working properly.',
  },
  {
    working: <Katex display tex="\boxed{H_1: \ \mu < 1000}" />,
    reason: <>One-sided and <em>below</em>, because the machine is paused only when the volume is significantly <em>less</em> than 1000 mL. Under-filling is the problem; over-filling is not.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X} \sim \mathrm{N}\!\left(1000,\ \left(\tfrac{4.2}{\sqrt9}\right)^2\right)" />,
    reason: <>The distribution of the <em>sample mean</em> of nine bottles: the standard deviation is divided by <Katex tex="\sqrt{n}" />, not left at 4.2.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}\!\left(\overline{X}\right) = \frac{4.2}{3} = 1.4" />,
    reason: <><Katex tex="\sqrt9=3" /> — a deliberately tidy sample size.</>,
  },
  {
    working: <Katex display tex="p = \Pr\!\left(\overline{X}<997.5\mid\mu=1000\right) = \text{normCdf}(-\infty,\,997.5,\,1000,\,1.4)" />,
    reason: <>The lower tail, matching <Katex tex="H_1" />. By <Cas fn="normCdf" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0.037}" />,
    reason: <>Three decimal places. Using 4.2 instead of 1.4 gives <Katex tex="0.276" />, which would reverse the conclusion.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.037 < 0.05" />,
    reason: 'Comparing the p value with the stated significance level.',
  },
  {
    working: <Katex display tex="\implies \text{reject } H_0 \text{ at the 5\% level}" />,
    reason: 'A p value below the significance level means the evidence against the null is strong enough.',
  },
  {
    working: <Katex display tex="\boxed{\text{yes — the machine should be paused and adjusted}}" />,
    reason: <>A conclusion in the context of the question was required, not just "reject <Katex tex="H_0" />" — a quarter of students stopped one line short.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Type II error} = \text{fail to reject } H_0 \text{ when } H_0 \text{ is false}" />,
    reason: <>Here that means the machine is really filling to 997 mL but the test does not catch it.</>,
  },
  {
    working: <Katex display tex="\text{critical value: } \Pr\!\left(\overline{X}<c\mid\mu=1000\right) = 0.05" />,
    reason: <>The rejection region is found under <Katex tex="H_0" />, using the <em>true</em> mean 1000 — not 997. This was the most common error.</>,
  },
  {
    working: <Katex display tex="c = \text{invNorm}(0.05,\,1000,\,1.4) = 997.697" />,
    reason: <>By <Cas fn="invNorm" />. The machine is paused when the sample mean falls below this.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{Type II}) = \Pr\!\left(\overline{X}\ge997.697\mid\mu=997\right)" />,
    reason: <>The <em>upper</em> tail now, since failing to reject means the sample mean came out too high to trigger the alarm. Using the lower tail was the other listed error.</>,
  },
  {
    working: <Katex display tex="= 1-\text{normCdf}(-\infty,\,997.697,\,997,\,1.4) = 0.3092" />,
    reason: 'Same standard deviation 1.4, different mean.',
  },
  {
    working: <Katex display tex="\boxed{0.31}" />,
    reason: <>Two decimal places. A 3 mL shortfall is only about two standard errors, so missing it roughly a third of the time is entirely plausible.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X}\sim\mathrm{N}\!\left(1000,\,1.4^2\right)" />,
    reason: 'Same sample-mean distribution as part b.i.',
  },
  {
    working: <Katex display tex="\Pr\!\left(\overline{X}<a\right) = 0.01 \implies a = \text{invNorm}(0.01,\,1000,\,1.4)" />,
    reason: 'The lower control limit.',
  },
  {
    working: <Katex display tex="\Pr\!\left(\overline{X}>b\right) = 0.01 \implies b = \text{invNorm}(0.99,\,1000,\,1.4)" />,
    reason: <>The upper limit — remember <Cas fn="invNorm" /> takes the area to the <em>left</em>, so 0.99 goes in, not 0.01.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 996.7, \qquad b = 1003.3}" />,
    reason: <>Symmetric about 1000, as they must be: <Katex tex="1000\pm2.3263(1.4)" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\bar{x} = 1005, \quad \sigma = 4, \quad n = 50" />,
    reason: 'The new machine, with the population standard deviation given.',
  },
  {
    working: <Katex display tex="\bar{x}\pm z\frac{\sigma}{\sqrt n} = 1005\pm1.96\times\frac{4}{\sqrt{50}}" />,
    reason: <>For 95% confidence, <Katex tex="z = \text{invNorm}(0.975,0,1) = 1.96" />.</>,
  },
  {
    working: <Katex display tex="1.96\times0.56569 = 1.1087" />,
    reason: 'The margin of error.',
  },
  {
    working: <Katex display tex="\boxed{(1003.9,\ 1006.1)}" />,
    reason: <>One decimal place. Note 1000 is <em>not</em> in the interval — the new machine is over-filling.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{a 95\% confidence interval captures } \mu \text{ in 95\% of samples}" />,
    reason: 'That frequency is the meaning of the confidence level — nothing to compute beyond a percentage.',
  },
  {
    working: <Katex display tex="0.95\times40 = 38" />,
    reason: <>Forty samples, not fifty. The 50 is the number of <em>bottles</em> in each sample, and mixing them up was the listed error.</>,
  },
  {
    working: <Katex display tex="\boxed{38 \text{ of the confidence intervals}}" />,
    reason: 'Expected value, so a whole number here by coincidence rather than by rounding.',
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{margin of error} = z\frac{\sigma}{\sqrt n} \le 1" />,
    reason: <>"Within 1 mL" means the half-width of the interval is at most 1.</>,
  },
  {
    working: <Katex display tex="1.96\times\frac{4}{\sqrt n} \le 1 \implies \sqrt n \ge 7.84" />,
    reason: 'Rearranging.',
  },
  {
    working: <Katex display tex="n \ge 61.46\ldots" />,
    reason: <>Squaring <Katex tex="7.8399" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 62}" />,
    reason: <>Rounding <em>up</em>: 61 would leave the margin just above 1 mL. Sample size always rounds up, whatever the decimal.</>,
  },
]

export default function SpecialistQ6_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (9 marks)</p>
        <p>
          A machine fills bottles with olive oil. The volume of olive oil dispensed into each
          bottle may be assumed to be normally distributed with mean <Katex tex="\mu" />{' '}
          millilitres (mL) and standard deviation <Katex tex="\sigma=4.2" /> mL. When the
          machine is working properly <Katex tex="\mu=1000" />.
        </p>
        <p>
          The volume dispensed is monitored regularly by taking a random sample of nine
          bottles and finding the mean volume dispensed. The machine will be paused and
          adjusted if the mean volume of olive oil in the nine bottles is significantly less
          than 1000 mL at the 5% level of significance.
        </p>
        <p>
          When checked, a random sample of nine bottles gave a mean volume of 997.5 mL. A
          one-sided statistical test is to be performed.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Every part of a. to d. uses the same distribution:{' '}
            <Katex tex="\overline{X}\sim\mathrm{N}\!\left(\mu,\left(\tfrac{4.2}{3}\right)^2\right)" />.
            The <Katex tex="\sqrt9=3" /> is the whole difficulty — leaving the standard
            deviation at 4.2 changes the p value from 0.037 to 0.276 and flips the
            conclusion.
          </p>
          <p>
            Part c. needs <em>two</em> different means. The critical value comes from{' '}
            <Katex tex="\mu=1000" /> (that is where the 5% rule lives), but the probability of
            missing the fault is computed with <Katex tex="\mu=997" /> (that is what is
            actually happening). Using one mean for both is why this part split the cohort in
            half.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Write down suitable null and alternative hypotheses <Katex tex="H_0" /> and{' '}
            <Katex tex="H_1" /> for the test.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        marks={1}
        statement={
          <>
            Find the <Katex tex="p" /> value for this test correct to three decimal places.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={1}
        statement={
          <>
            Using the <Katex tex="p" /> value found in <b>part b.i.</b>, state with a reason
            whether the machine should be paused.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            Assuming that the mean volume dispensed by the machine each time is in fact 997 mL
            and not 1000 mL, find the probability of a type II error for the test using nine
            bottles at the 5% level of significance. Assume that the population standard
            deviation is 4.2 mL, and give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={1}
        statement={
          <>
            Let <Katex tex="\overline{X}" /> denote the sample mean of a random sample of nine
            bottles. As a quality-control measure, the machine will be paused if{' '}
            <Katex tex="\overline{X}<a" /> or if <Katex tex="\overline{X}>b" />, where{' '}
            <Katex tex="\Pr\!\left(\overline{X}<a\right)=0.01" /> and{' '}
            <Katex tex="\Pr\!\left(\overline{X}>b\right)=0.01" />. Assume{' '}
            <Katex tex="\mu=1000" /> mL and <Katex tex="\sigma=4.2" /> mL. Find the values of{' '}
            <Katex tex="a" /> and <Katex tex="b" /> correct to one decimal place.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A new machine is purchased, and it is observed that the volume dispensed by the new
          machine in 50 randomly chosen bottles provided a sample mean of 1005 mL and a sample
          standard deviation of 4 mL.
        </p>
      </div>

      <PartCard
        letter="e"
        marks={1}
        statement={
          <>
            Find a 95% confidence interval for the population mean volume dispensed by the new
            machine, giving values correct to one decimal place. You may assume a population
            standard deviation of 4 mL.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={1}
        statement={
          <>
            Forty samples, each consisting of 50 randomly chosen bottles, are taken, and a 95%
            confidence interval is calculated for each sample. In how many of these confidence
            intervals would the population mean volume dispensed by the machine be expected to
            lie?
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        marks={1}
        statement={
          <>
            What minimum size sample should be used so that, with 95% confidence, the sample
            mean is within 1 mL of the population mean volume dispensed by the new machine?
            Assume a population standard deviation of 4 mL.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
