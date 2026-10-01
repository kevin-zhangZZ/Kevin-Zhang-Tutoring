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
    reason: <>Here <Katex tex="\mu" /> is the mean lifetime of <em>all</em> Shiny globes (the population mean) — hypotheses are always about <Katex tex="\mu" />, never about the sample mean 195. The null hypothesis is the company's claim, written with an equals sign.</>,
  },
  {
    working: <Katex display tex="\boxed{H_1: \mu < 200}" />,
    reason: <>The alternative hypothesis is what the investigation looks for evidence of: the customers' complaint that globes last <em>less</em> than 200 weeks. So the test is one-tailed to the left — not <Katex tex="\mu\ne200" /> (that would be two-tailed) and not <Katex tex="\mu>200" /> (nobody is claiming the globes last longer).</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(200,\ \frac{10^2}{36}\right) \implies \mathrm{sd}\!\left(\bar X\right) = \frac{10}{6} = \frac53" />,
    reason: <>A <Katex tex="p" /> value is always worked out assuming <Katex tex="H_0" /> is true, so take <Katex tex="\mu = 200" />. The lifetimes are normal, so the sample mean <Katex tex="\bar X" /> of <Katex tex="n = 36" /> globes is normal with mean <Katex tex="\mu" /> and standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n}" /> — not <Katex tex="\sigma" />, because averages vary less than single globes.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} p &= \Pr\!\left(\bar X \le 195 \mid \mu = 200\right) \\ &= \Pr\!\left(Z \le \frac{195-200}{5/3}\right) \end{aligned}" />,
    reason: <>The <Katex tex="p" /> value is the chance, if <Katex tex="H_0" /> were true, of a sample mean at least as extreme as the one observed. Because <Katex tex="H_1" /> says <Katex tex="\mu < 200" />, &ldquo;extreme&rdquo; means <em>as low as or lower than</em> 195, so we want the left tail. Standardise with <Katex tex="z = \tfrac{\bar x - \mu}{\sigma/\sqrt n}" /> to use the given <Katex tex="Z" /> facts.</>,
  },
  {
    working: <Katex display tex="= \Pr(Z \le -3)" />,
    reason: <><Katex tex="\tfrac{-5}{5/3} = -5\times\tfrac35 = -3" /> exactly — which is why the question supplies <Katex tex="\Pr(-3<Z<3)" />.</>,
  },
  {
    working: <Katex display tex="\Pr(Z\le-3) = \frac{1-0.9973}{2} = 0.00135" />,
    reason: <>The middle region <Katex tex="-3<Z<3" /> holds 0.9973, so the two tails together hold <Katex tex="1-0.9973=0.0027" />. The normal curve is symmetric about 0, so each tail holds half of that. Only the left tail is wanted, since the test is one-tailed — 0.0027 would be the answer to a two-tailed test.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0.001}" />,
    reason: <>0.00135 rounded to three decimal places.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="p \approx 0.001 < 0.01" />,
    reason: <>The 1% level of significance is the cut-off <Katex tex="0.01" />. The rule: if <Katex tex="p" /> is less than the significance level, reject <Katex tex="H_0" />. Here a sample mean as low as 195 would happen only about 0.14% of the time (<Katex tex="p = 0.00135" />) if <Katex tex="\mu" /> really were 200 — rarer than the 1% cut-off, so we stop believing <Katex tex="H_0" />. Keep the two numbers apart: 0.001 is the <Katex tex="p" /> value, 0.01 is the significance level.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{array}{c} \text{Reject } H_0 \text{ at the } 1\% \text{ level.} \\ \text{There is evidence that the mean} \\ \text{lifetime is less than 200 weeks.} \end{array}}" />,
    reason: <>The question asks what the company should be told, so state the decision and then say what it means in context: the complaints are supported.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} \left(\bar x - z\frac{\sigma}{\sqrt n},\ \bar x + z\frac{\sigma}{\sqrt n}\right) \\ \bar x = 250, \ \sigma = 10, \ n = 25 \end{gathered}" />,
    reason: <>A confidence interval estimates the unknown <Katex tex="\mu" /> of the <em>new</em> globes, so it is always centred on this sample's mean, 250 — the report notes students frequently used 200, which was the old claim about Shiny globes and plays no part here. Likewise <Katex tex="n = 25" />, not the 36 Shiny globes from part b.</>,
  },
  {
    working: <Katex display tex="\frac{\sigma}{\sqrt n} = \frac{10}{\sqrt{25}} = \frac{10}{5} = 2" />,
    reason: <>The standard deviation of the sample mean.</>,
  },
  {
    working: <Katex display tex="250 \pm 1.96\times2 = 250 \pm 3.92" />,
    reason: <>For 95% confidence, <Katex tex="z" /> is the value with 95% of the standard normal between <Katex tex="-z" /> and <Katex tex="z" />. The question gives <Katex tex="\Pr(-1.96<Z<1.96)=0.95" />, so <Katex tex="z = 1.96" /> — rounding it to 2 is not acceptable.</>,
  },
  {
    working: <Katex display tex="\boxed{(246.08,\ 253.92)}" />,
    reason: <><Katex tex="250 - 3.92 = 246.08" /> and <Katex tex="250 + 3.92 = 253.92" />, already exact to two decimal places.</>,
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
