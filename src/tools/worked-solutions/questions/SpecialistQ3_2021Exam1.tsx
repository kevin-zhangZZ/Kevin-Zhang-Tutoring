// 2021 Specialist Mathematics — Exam 1 Question 3 (5 marks). A one-tailed hypothesis test
// on a sample mean, then a confidence interval. Question text transcribed from the original
// paper. Answers checked against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [28, 72],
  average: 0.7,
  comment: (
    <>
      Most students were able to write down the null and alternative hypotheses correctly.
      The alternative hypothesis was sometimes written with the incorrect inequality (
      <Katex tex="\mu>200" /> or <Katex tex="\mu\ne200" />) and some idiosyncratic notation
      was observed.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [47, 13, 41],
  average: 1,
  comment: (
    <>
      Students were required to use the given information that{' '}
      <Katex tex="\Pr(-3<Z<3)=0.9973" />. From this it is found that{' '}
      <Katex tex="\Pr(Z<-3)=\tfrac{1-0.9973}{2}=0.00135" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [51, 49],
  average: 0.5,
  comment: (
    <>
      A number of students drew an incorrect conclusion from the <Katex tex="p" /> value.
      This was sometimes due to students confusing the <Katex tex="p" /> value (0.001) with
      the significance level (0.01).
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [44, 56],
  average: 0.6,
  comment: (
    <>
      Students frequently used <Katex tex="\mu=200" /> rather than 250. Arithmetic errors
      were also observed, as was the use of <Katex tex="z=2" /> rather than 1.96 as
      instructed.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="H_0: \mu = 200" />,
    reason: <>The null hypothesis always asserts the claimed value, with an equals sign.</>,
  },
  {
    working: <Katex display tex="\boxed{H_1: \mu < 200}" />,
    reason: <>The complaint is that globes last <em>less</em> than 200 weeks, so the test is one-tailed to the left — not <Katex tex="\ne" /> (two-tailed) and not <Katex tex=">" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(200,\ \frac{10^2}{36}\right) \implies \mathrm{sd}\!\left(\bar X\right) = \frac{10}{6} = \frac53" />,
    reason: <>The <em>sample mean</em> has standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n}" />, not <Katex tex="\sigma" />.</>,
  },
  {
    working: <Katex display tex="p = \Pr\!\left(\bar X \le 195 \mid \mu = 200\right) = \Pr\!\left(Z \le \frac{195-200}{5/3}\right)" />,
    reason: <>Standardising the observed sample mean.</>,
  },
  {
    working: <Katex display tex="= \Pr(Z \le -3)" />,
    reason: <><Katex tex="\tfrac{-5}{5/3}=-3" /> exactly — which is why the question supplies <Katex tex="\Pr(-3<Z<3)" />.</>,
  },
  {
    working: <Katex display tex="\Pr(Z\le-3) = \frac{1-0.9973}{2} = 0.00135" />,
    reason: <>The two tails outside ±3 share the leftover probability equally.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0.001}" />,
    reason: <>To three decimal places.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.001 < 0.01" />,
    reason: <>Compare the <Katex tex="p" /> value with the significance level — the report notes students who confused the two, since 0.001 and 0.01 look alike.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{reject } H_0 \text{ at the } 1\% \text{ level}}" />,
    reason: <>There is significant evidence that the mean lifetime is less than 200 weeks, so the company should be told the complaints are supported.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\bar x \pm z\frac{\sigma}{\sqrt n} \ \text{ with } \bar x = 250, \ \sigma = 10, \ n = 25" />,
    reason: <>This is the <em>new</em> globe, so the sample mean is 250 — the report notes students frequently used 200.</>,
  },
  {
    working: <Katex display tex="\frac{\sigma}{\sqrt n} = \frac{10}{5} = 2" />,
    reason: <>The standard error.</>,
  },
  {
    working: <Katex display tex="250 \pm 1.96\times2 = 250 \pm 3.92" />,
    reason: <>The question tells you to use <Katex tex="1.96" /> via <Katex tex="\Pr(-1.96<Z<1.96)=0.95" />, so rounding it to 2 is not acceptable.</>,
  },
  {
    working: <Katex display tex="\boxed{(246.08,\ 253.92)}" />,
    reason: <>To two decimal places.</>,
  },
]

export default function SpecialistQ3_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (5 marks)</p>
        <p>
          A company produces a particular type of light globe called Shiny. The company
          claims that the lifetime of these globes is normally distributed with a mean of 200
          weeks and it is known that the standard deviation of the lifetime of Shiny globes
          is 10 weeks. Customers have complained, saying Shiny globes were lasting less than
          the claimed 200 weeks. It was decided to investigate the complaints. A random
          sample of 36 Shiny globes was tested and it was found that the mean lifetime of the
          sample was 195 weeks.
        </p>
        <p>
          Use <Katex tex="\Pr(-1.96<Z<1.96)=0.95" /> and{' '}
          <Katex tex="\Pr(-3<Z<3)=0.9973" /> to answer the following questions.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Hypotheses"
        marks={1}
        statement={
          <>
            Write down the null and alternative hypotheses for the one-tailed test that was
            conducted to investigate the complaints.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="p-Value"
        marks={2}
        statement={
          <>
            Determine the <Katex tex="p" /> value, correct to three decimal places, for the
            test.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Conclusion"
        marks={1}
        statement={
          <>
            What should the company be told if the test was carried out at the 1% level of
            significance?
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            The company decided to produce a new type of light globe called Globeplus.
            <br />
            Find an approximate 95% confidence interval for the mean lifetime of the new globes if
            a random sample of 25 Globeplus globes is tested and the sample mean is found to
            be 250 weeks. Assume that the standard deviation of the population is 10 weeks.
            Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
