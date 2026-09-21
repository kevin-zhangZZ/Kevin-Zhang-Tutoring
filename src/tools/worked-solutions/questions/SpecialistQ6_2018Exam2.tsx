// 2018 Specialist Mathematics — Exam 2, Section B, Question 6 (8 marks). A one-tailed
// hypothesis test on the mean height of water buffaloes, then the rejection boundary, the
// probability of a Type II error, and a confidence interval. Question text transcribed from
// the original paper (VCAA printed no diagram for this question). Answers checked with
// scipy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      The question was answered well. Common errors included poor notation such as{' '}
      <Katex tex="H_0=150" /> or similar, and not understanding the nature of a one-tailed
      test.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [16, 84],
  average: 0.9,
  comment: <>This question was generally well answered. A variety of correct, exact forms were accepted.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [22, 18, 60],
  average: 1.4,
  comment: (
    <>
      Most students obtained the correct value of <Katex tex="p" />. A small number of these
      did not write <Katex tex="p" /> to the required four decimal places. Some students
      inappropriately used calculator syntax in place of correct working or notation.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: (
    <>
      Most students were able to draw the appropriate conclusion. Some students did not
      supply a reason for their conclusion as required by the question.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [52, 48],
  average: 0.5,
  comment: <>In this instance, both values were accepted.</>,
}

const EXAM_F: SAExaminerStats = {
  marks: [89, 11],
  average: 0.1,
  comment: <>Only a small number of students attempted this question.</>,
}

const EXAM_G: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      While many students answered this correctly and concisely, arithmetic errors caused
      some students to miss out on the mark. Some students appeared to use a{' '}
      <Katex tex="95\%" /> confidence interval rather than the required{' '}
      <Katex tex="99\%" /> one.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \mu = 150 \qquad H_1: \mu < 150}" />,
    reason: <>Hypotheses are always about the <em>population</em> mean <Katex tex="\mu" />, never about <Katex tex="\overline{X}" /> or a number on its own — the report names <Katex tex="H_0=150" /> as poor notation. One-tailed, and pointing <em>downwards</em> because the sample mean of <Katex tex="145" /> fell below the claim.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{sd}\!\left(\overline{X}\right) = \frac{\sigma}{\sqrt n} = \frac{15}{\sqrt{50}}" />,
    reason: <>The standard deviation of a sample mean shrinks with sample size — this is the single most important formula in the topic.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{15}{\sqrt{50}} = \frac{3}{\sqrt2} = \frac{3\sqrt2}{2} \approx 2.1213}" />,
    reason: <>Any of these exact forms is accepted. Much smaller than the population's <Katex tex="15" /> cm, which is why a <Katex tex="5" /> cm gap turns out to be significant.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="p = \Pr\!\left(\overline{X} \le 145 \mid \mu = 150\right)" />,
    reason: <>The <Katex tex="p" /> value is the probability of a result at least this extreme <em>assuming <Katex tex="H_0" /> is true</em>. One tail only, because <Katex tex="H_1" /> is one-sided — no doubling. Write this expression down: the report notes calculator syntax being offered in place of it.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(-∞, 145, 150, 15/√50)</Cas>,
    reason: <>The last argument is the standard deviation of the <em>sample mean</em> from part (b), not the population's <Katex tex="15" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.0092}" />,
    reason: <>Four decimal places, as asked. (<Katex tex="145" /> sits about <Katex tex="2.36" /> standard errors below <Katex tex="150" />, so a <Katex tex="p" /> just under <Katex tex="1\%" /> is the right size.)</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="p \approx 0.0092 < 0.05" />,
    reason: <>Compare the <Katex tex="p" /> value with the significance level. The comparison <em>is</em> the reason, and the report says a conclusion without one did not score.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Reject } H_0 \text{ at the } 5\% \text{ level}}" />,
    reason: <>In context: there is evidence that the mean height of mature water buffaloes is less than the claimed <Katex tex="150" /> cm. A sample this low would occur under <Katex tex="H_0" /> less than once in a hundred times.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="H_0 \text{ not rejected} \iff p \ge 0.05 \iff \overline{x} \ge \overline{x}_{\text{crit}}" />,
    reason: <>The boundary of the rejection region. Larger sample means give larger <Katex tex="p" /> values here, since the test is lower-tailed.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\overline{X} < \overline{x}_{\text{crit}} \mid \mu=150\right) = 0.05" />,
    reason: <>All <Katex tex="5\%" /> in the lower tail — no halving, because the test is one-tailed.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.05, 150, 15/√50)</Cas>,
    reason: <>Running the distribution backwards from the area to the boundary value.</>,
  },
  {
    working: <Katex display tex="\boxed{\overline{x} \approx 146.51 \text{ cm}}" />,
    reason: <>Two decimal places. (Equivalently <Katex tex="150-1.6449\times2.1213" />.) Consistent with part (d): the observed <Katex tex="145" /> is below this boundary, which is exactly why <Katex tex="H_0" /> was rejected.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{True } \mu = 145 \implies \overline{X} \sim N\!\left(145,\ \left(\tfrac{15}{\sqrt{50}}\right)^2\right)" />,
    reason: <>The distribution of the sample mean is re-centred on the <em>true</em> mean. The spread is unchanged, since it depends only on <Katex tex="\sigma" /> and <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(H_0 \text{ accepted}\right) = \Pr\!\left(\overline{X} > 146.51\right)" />,
    reason: <>Using the boundary from part (e): <Katex tex="H_0" /> survives whenever the sample mean lands above it. This is the probability of a Type II error — failing to reject a false <Katex tex="H_0" />.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(146.51, ∞, 145, 15/√50)</Cas>,
    reason: <>Note the mean is now <Katex tex="145" />, not <Katex tex="150" /> — that swap is the whole question.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.24}" />,
    reason: <>Two decimal places. So even when the true mean really is <Katex tex="145" />, this test misses it about a quarter of the time. Only <Katex tex="11\%" /> of the state attempted it.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{CI} = \overline{x} \pm z\,\frac{\sigma}{\sqrt n}" />,
    reason: <>The standard form, using the observed sample mean of <Katex tex="145" />.</>,
  },
  {
    working: <Katex display tex="99\% \implies z = 2.5758" />,
    reason: <>Not <Katex tex="1.96" /> — the report notes students defaulting to the <Katex tex="95\%" /> value. From <Katex tex="\operatorname{invNorm}(0.995,0,1)" />.</>,
  },
  {
    working: <Katex display tex="145 \pm 2.5758\times\frac{15}{\sqrt{50}} = 145 \pm 5.4642" />,
    reason: <>The margin of error.</>,
  },
  {
    working: <Katex display tex="\boxed{(139.5,\ 150.5)}" />,
    reason: <>One decimal place. Worth noticing: at <Katex tex="99\%" /> confidence the interval <em>does</em> contain <Katex tex="150" />, even though the test rejected <Katex tex="\mu=150" /> at the <Katex tex="5\%" /> level. There is no contradiction — a <Katex tex="99\%" /> interval corresponds to a <Katex tex="1\%" /> two-tailed test, a stricter standard than the one-tailed <Katex tex="5\%" /> test used earlier.</>,
  },
]

export default function SpecialistQ6_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (8 marks)</p>
        <p className="mb-2">
          The heights of mature water buffaloes in northern Australia are known to be normally
          distributed with a standard deviation of <Katex tex="15" /> cm. It is claimed that
          the mean height of the water buffaloes is <Katex tex="150" /> cm.
        </p>
        <p className="mb-2">
          To decide whether the claim about the mean height is true, rangers selected a random
          sample of <Katex tex="50" /> mature water buffaloes. The mean height of this sample
          was found to be <Katex tex="145" /> cm. A one-tailed statistical test is to be
          carried out to see if the sample mean height of <Katex tex="145" /> cm differs
          significantly from the claimed population mean of <Katex tex="150" /> cm.
        </p>
        <p>
          Let <Katex tex="\overline{X}" /> denote the mean height of a random sample of{' '}
          <Katex tex="50" /> mature water buffaloes.
        </p>
      </div>

      <PartCard letter="a" marks={1} statement={<>State suitable hypotheses <Katex tex="H_0" /> and <Katex tex="H_1" /> for the statistical test.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={1} statement={<>Find the standard deviation of <Katex tex="\overline{X}" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={2} statement={<>Write down an expression for the <Katex tex="p" /> value of the statistical test and evaluate your answer correct to four decimal places.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={1} statement={<>State with a reason whether <Katex tex="H_0" /> should be rejected at the <Katex tex="5\%" /> level of significance.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={1} statement={<>What is the smallest value of the sample mean height that could be observed for <Katex tex="H_0" /> to be not rejected? Give your answer in centimetres, correct to two decimal places.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard letter="f" marks={1} statement={<>If the true mean height of all mature water buffaloes in northern Australia is in fact <Katex tex="145" /> cm, what is the probability that <Katex tex="H_0" /> will be accepted at the <Katex tex="5\%" /> level of significance? Give your answer correct to two decimal places.</>} examinerReport={EXAM_F}>
        <Background title="The question changes which distribution you are in">
          <p>
            Every part up to here assumed <Katex tex="H_0" /> was true and worked with{' '}
            <Katex tex="\overline{X}\sim N(150,\dots)" />. This part says "if the true mean is
            in fact <Katex tex="145" />", so the sample mean is now distributed about{' '}
            <Katex tex="145" /> instead.
          </p>
          <p>
            What does <em>not</em> change is the decision rule: the test still rejects{' '}
            <Katex tex="H_0" /> below the boundary found in part (e), because that boundary
            was fixed in advance. So the answer is the area above that boundary under the new
            distribution — the probability of a Type II error.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard letter="g" marks={1} statement={<>Using the observed sample mean of <Katex tex="145" /> cm, find a <Katex tex="99\%" /> confidence interval for the mean height of all mature water buffaloes in northern Australia. Express the values in your confidence interval in centimetres, correct to one decimal place.</>} examinerReport={EXAM_G}>
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
