// 2019 Specialist Mathematics — Exam 2, Section B, Question 6 (9 marks).
// Sample means of packets of noodles: the distribution of a sample mean, the difference of two
// independent sample means, and a two-tailed hypothesis test. Question text transcribed from
// the original paper (no diagram given). Cross-checked against the VCAA examination report and
// itute's independent solutions, and every probability verified numerically.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [40, 31, 29],
  average: 0.9,
  comment: <>Many students found the probability for a single sample but did not go on to handle "at least one" of the two samples.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [67, 15, 2, 15],
  average: 0.7,
  comment: <>This question was not well done. Students needed to define the difference of the two sample means as a new normally distributed random variable and find its standard deviation.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: <>Hypotheses must be written in terms of the population mean <Katex tex="\mu" />, not the sample mean.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: <>Some students gave the one-tailed <Katex tex="p" /> value, forgetting to double it for a two-tailed test.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: <>A conclusion needed to be stated in context, with justification by comparing the <Katex tex="p" /> value to the <Katex tex="5\%" /> significance level.</>,
}

const EXAM_F: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: <>Students needed to find the boundary of the rejection region rather than test further values by trial and error.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X} \sim N\!\left(375,\ \dfrac{15^2}{50}\right), \qquad \text{sd}\left(\overline{X}\right) = \dfrac{15}{\sqrt{50}} = \dfrac{3}{\sqrt2} \approx 2.1213" />,
    reason: <>The sample mean of <Katex tex="n" /> observations is itself normally distributed, centred on the population mean but with standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n}" /> — narrower than the population, because averaging cancels out extremes.</>,
  },
  {
    working: <Katex display tex="\Pr\left(370<\overline{X}<375\right) \approx 0.490789" />,
    reason: <>Technology: <Cas fn="normCdf">normCdf(370, 375, 375, 15/√50)</Cas> gives it. The last argument is the standard deviation of the <em>sample mean</em>, <Katex tex="\tfrac{\sigma}{\sqrt n}" />, not the population <Katex tex="\sigma=15" /> — using <Katex tex="15" /> here is the single most common error in this style of question. Sensible answer: <Katex tex="375" /> is the mean, so this is just under half the distribution.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{at least one of two}) = 1-\Pr(\text{neither})" />,
    reason: <>"At least one" almost always means: take the complement. The two samples are independent, so the probability neither qualifies is the product of the two individual failure probabilities.</>,
  },
  {
    working: <Katex display tex="= 1-(1-0.490789)^2 = 1-(0.509211)^2" />,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.741}" />,
    reason: <>Three decimal places, as asked.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Let } D = \overline{X}_1-\overline{X}_2" />,
    reason: <>Turn "the two means differ by less than 2" into a statement about a single new random variable — the difference. This is the step most students missed.</>,
  },
  {
    working: <Katex display tex="E(D) = E\left(\overline{X}_1\right)-E\left(\overline{X}_2\right) = 375-375 = 0" />,
  },
  {
    working: <Katex display tex="\operatorname{Var}(D) = \operatorname{Var}\left(\overline{X}_1\right)+\operatorname{Var}\left(\overline{X}_2\right) = \dfrac{225}{50}+\dfrac{225}{50} = 9" />,
    reason: <>Variances <em>add</em> for independent variables, even when you subtract the variables themselves — subtracting doesn't make things less variable.</>,
  },
  {
    working: <Katex display tex="\text{sd}(D) = \sqrt9 = 3, \qquad D \sim N(0,\ 3^2)" />,
  },
  {
    working: <Katex display tex="\Pr\left(|D|<2\right) = \Pr(-2<D<2)" />,
    reason: <>"Differ by less than 2 grams" means the difference is between <Katex tex="-2" /> and <Katex tex="2" /> — the sign doesn't matter, only the size.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.495}" />,
    reason: <><Cas fn="normCdf">normCdf(-2, 2, 0, 3)</Cas> finishes it. Sanity check: <Katex tex="2" /> g is only two-thirds of a standard deviation, so a shade under half is the right size of answer.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \mu = 375 \qquad H_1: \mu \ne 375}" />,
    reason: <>The null hypothesis is always the "nothing has changed" claim — the machine still produces a mean of <Katex tex="375" /> g. Because the question asks whether the machine is working properly (not specifically whether it under-fills), the alternative is two-sided. Both must be about the <em>population</em> mean <Katex tex="\mu" />, never the sample mean.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{sd}\left(\overline{X}\right) = \dfrac{15}{\sqrt{100}} = 1.5" />,
    reason: <>The combined sample has <Katex tex="n=100" />, so the sample mean is more tightly concentrated than in part (a).</>,
  },
  {
    working: <Katex display tex="p = 2\times\Pr\left(\overline{X}<372 \mid \mu=375\right)" />,
    reason: <>The <Katex tex="p" /> value is the probability of a result at least this extreme <em>if <Katex tex="H_0" /> is true</em>. For a two-tailed test the "equally extreme in the other direction" tail counts too, hence the factor of <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="= 2\times0.02275 \approx 0.0455" />,
    reason: <>The single tail is <Cas fn="normCdf">normCdf(-∞, 372, 375, 1.5)</Cas> on a CAS. On the handheld, type the lower bound as <Katex tex="-9\times10^{99}" /> if you would rather not use the <Katex tex="\infty" /> symbol; anything far enough below the mean gives the same answer.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.046}" />,
    reason: <>Three decimal places.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="p \approx 0.046 < 0.05" />,
    reason: <>Compare the <Katex tex="p" /> value with the significance level. A small <Katex tex="p" /> means a result this far from <Katex tex="375" /> g would be unlikely if the machine were fine.</>,
  },
  {
    working: <Katex display tex="\implies \text{reject } H_0" />,
  },
  {
    working: <Katex display tex="\boxed{\text{No — there is evidence at the } 5\% \text{ level that the machine is not working properly.}}" />,
    reason: <>The conclusion must be in context and justified by the comparison, not just "reject <Katex tex="H_0" />". Note it is a close call: <Katex tex="0.046" /> only just clears <Katex tex="0.05" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="H_0 \text{ not rejected} \iff p\ge0.05 \iff \overline{x} \text{ inside the two-tailed acceptance region}" />,
    reason: <>Rather than testing values one at a time, find the boundary directly — the smallest sample mean that is <em>not</em> far enough from <Katex tex="375" /> to be rejected.</>,
  },
  {
    working: <Katex display tex="2\times\Pr\left(\overline{X}<\overline{x}\right) = 0.05 \implies \Pr\left(\overline{X}<\overline{x}\right)=0.025" />,
    reason: <>Split the <Katex tex="5\%" /> evenly between the two tails.</>,
  },
  {
    working: <Katex display tex="\overline{x} \approx 372.06" />,
    reason: <>Run the distribution backwards from the area: <Cas fn="invNorm">invNorm(0.025, 375, 1.5)</Cas> does it. Equivalently by hand, <Katex tex="375-1.96\times1.5 = 372.06" /> — the boundary sits <Katex tex="1.96" /> standard deviations below the claimed mean.</>,
  },
  {
    working: <Katex display tex="\boxed{\overline{x} \approx 372.1 \text{ grams}}" />,
    reason: <>One decimal place. Consistent with part (e): the observed <Katex tex="372" /> g sits just below this boundary, which is exactly why <Katex tex="H_0" /> was (narrowly) rejected.</>,
  },
]

export default function SpecialistQ6_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (9 marks)</p>
        <p className="mb-2">
          A company produces packets of noodles. It is known from past experience that the mass
          of a packet of noodles produced by one of the company's machines is normally
          distributed with a mean of <Katex tex="375" /> grams and a standard deviation of{' '}
          <Katex tex="15" /> grams.
        </p>
        <p>
          To check the operation of the machine after some repairs, the company's quality control
          employees select two independent random samples of <Katex tex="50" /> packets and
          calculate the mean mass of the <Katex tex="50" /> packets for each random sample.
        </p>
      </div>

      <div className="text-[13px] leading-relaxed">
        <Background title="Before You Start">
          <p>
            The whole question rests on one fact: if individual packets are{' '}
            <Katex tex="N(\mu,\sigma^2)" />, then the <em>mean of a sample of n</em> is{' '}
            <Katex tex="N\!\left(\mu,\tfrac{\sigma^2}{n}\right)" />. Same centre, but the spread
            shrinks by a factor of <Katex tex="\sqrt n" /> — which is why a sample of{' '}
            <Katex tex="100" /> (parts c–f) detects a problem that a sample of <Katex tex="50" />{' '}
            might not.
          </p>
        </Background>
      </div>

      <PartCard letter="a" marks={2} statement="Assume that the machine is working properly. Find the probability that at least one random sample will have a mean mass between 370 grams and 375 grams. Give your answer correct to three decimal places." examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={3} statement="Assume that the machine is working properly. Find the probability that the means of the two random samples differ by less than 2 grams. Give your answer correct to three decimal places." examinerReport={EXAM_B}>
        <Background>
          <p>
            When a question asks about the <em>difference</em> of two independent normal
            variables, build a new normal variable for it. Its mean is the difference of the
            means, but its variance is the <b>sum</b> of the variances — never the difference.
            (Two noisy quantities subtracted give a result that is noisier than either, not
            quieter.)
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          To test whether the machine is working properly after the repairs and is still
          producing packets with a mean mass of <Katex tex="375" /> grams, the two random samples
          are combined and the mean mass of the <Katex tex="100" /> packets is found to be{' '}
          <Katex tex="372" /> grams. Assume that the standard deviation of the mass of the
          packets produced is still <Katex tex="15" /> grams. A two-tailed test at the{' '}
          <Katex tex="5\%" /> level of significance is to be carried out.
        </p>
      </div>

      <PartCard letter="c" marks={1} statement={<>Write down suitable hypotheses <Katex tex="H_0" /> and <Katex tex="H_1" /> for this test.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={1} statement={<>Find the <Katex tex="p" /> value for the test, correct to three decimal places.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={1} statement={<>Does the mean mass of the sample of 100 packets suggest that the machine is working properly at the <Katex tex="5\%" /> level of significance for a two-tailed test? Justify your answer.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard letter="f" marks={1} statement={<>What is the smallest value of the mean mass of the sample of 100 packets for <Katex tex="H_0" /> to be not rejected? Give your answer correct to one decimal place.</>} examinerReport={EXAM_F}>
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
