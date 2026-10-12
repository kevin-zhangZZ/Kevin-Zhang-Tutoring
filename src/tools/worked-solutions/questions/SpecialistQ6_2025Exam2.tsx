// 2025 Specialist Mathematics — Exam 2, Section B Question 6 (10 marks). Sampling
// distributions, a confidence interval and the sample size it implies, then a one-tailed test
// on a bottling line with its p value, critical value and Type II error probability. Question
// text transcribed from the original paper. Answers checked with scipy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_AI: SAExaminerStats = {
  marks: [13.82, 86.18],
  average: 0.86,
  comment: <>Some students wrote the variance rather than the standard deviation.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [14.17, 85.83],
  average: 0.85,
  comment: (
    <>
      Found using CAS and the mean and standard deviation found in part 6a.i.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [11.91, 88.09],
  average: 0.88,
}

const EXAM_C: SAExaminerStats = {
  marks: [23.09, 76.91],
  average: 0.76,
  comment: <>Found by seeking 95% of 300.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [46.89, 53.11],
  average: 0.53,
  comment: (
    <>
      Found solving the inequality <Katex tex="1\ge1.96\times\dfrac{5}{\sqrt{n}}" />
      <br />
      Some responses rounded down to quote 96, but this would have resulted in more than 1 mL.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [9.5, 90.5],
  average: 0.9,
}

const EXAM_FI: SAExaminerStats = {
  marks: [14.77, 85.23],
  average: 0.85,
}

const EXAM_FII: SAExaminerStats = {
  marks: [31.96, 68.04],
  average: 0.68,
  comment: <>Responses needed to comment on the company&rsquo;s claim and also quote the significance level.</>,
}

const EXAM_G: SAExaminerStats = {
  marks: [37.05, 62.95],
  average: 0.62,
  comment: <>Most responses identified the critical value for this significance level. Some responses used the wrong tail of the distribution.</>,
}

const EXAM_H: SAExaminerStats = {
  marks: [46.35, 53.65],
  average: 0.53,
  comment: <>Most students were able to find this Type II error if they were successful in part g.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{E}\left(\overline{X}\right) = \mu = 1000" />,
    reason: <>The sampling distribution of the mean is centred on the population mean, whatever the sample size.</>,
  },
  {
    working: <Katex display tex="\text{sd}\left(\overline{X}\right) = \frac{\sigma}{\sqrt{n}} = \frac{80}{\sqrt{25}} = \frac{80}{5} = 16" />,
    reason: <>The standard deviation of the sample mean (the standard error) is the population <Katex tex="\sigma" /> divided by <Katex tex="\sqrt{n}" />.</>,
    more: <>Writing the variance instead of the standard deviation is the common slip. The variance of <Katex tex="\overline{X}" /> is <Katex tex="\tfrac{\sigma^2}{n}=\tfrac{6400}{25}=256" />; the question asks for the standard deviation, its square root, 16. Averaging 25 students cuts the spread by a factor of <Katex tex="\sqrt{25}=5" />, not 25.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{mean } 1000 \text{ mL}, \quad \text{standard deviation } 16 \text{ mL}}" />,
    reason: <>Both in millilitres, as asked.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X}\sim\mathrm{N}\left(1000,\,16^2\right)" />,
    reason: <>Using part a.i. The population is normal, so the sample mean is exactly normal too.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr\left(\overline{X}>970\right) &= \Pr\left(Z>\frac{970-1000}{16}\right)\\ &= \Pr(Z>-1.875)\end{aligned}" />,
    reason: <>Standardising with the mean 1000 and standard deviation 16 from part a.i (not the population's 80).</>,
    more: <>Standardising is optional — CAS gives the probability directly from <Katex tex="\overline{X}" />'s distribution. The common slip is using <Katex tex="\sigma=80" />, which describes one student, not the average of 25: that gives <Katex tex="\Pr(Z>-0.375)\approx0.6462" />. A sample mean 30 mL below 1000 is almost 2 standard errors low, so a probability near 0.97 is sensible.</>,
  },
  {
    working: <Katex display tex="= 0.969604\ldots" />,
    reason: <>By <Cas fn="normCdf" /> with lower 970, upper ∞, μ = 1000, σ = 16.</>,
  },
  {
    working: <Katex display tex="\boxed{0.9696}" />,
    reason: <>Four decimal places, as asked.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\left(\overline{x}-z\frac{\sigma}{\sqrt{n}},\ \overline{x}+z\frac{\sigma}{\sqrt{n}}\right)" />,
    reason: <>The confidence-interval formula from the formula sheet.</>,
  },
  {
    working: <Katex display tex="z = 1.9599\ldots \text{ for } 95\%" />,
    reason: <>By <Cas fn="invNorm" /> with area 0.975 — the 5% left outside a 95% interval is split into two tails of 2.5%.</>,
    more: <>The middle 95% of <Katex tex="Z" /> runs from <Katex tex="-z" /> to <Katex tex="z" />, so the area to the left of <Katex tex="z" /> is <Katex tex="0.95+0.025=0.975" />. Using area 0.95 instead gives <Katex tex="z\approx1.645" />, the 90% value. The rounded 1.96 is the standard value for 95%; it gives the same interval to one decimal place.</>,
  },
  {
    working: <Katex display tex="750 \pm 1.96\times\frac{5}{\sqrt{30}} = 750\pm1.789\ldots" />,
    reason: <>Substituting the sample mean <Katex tex="\overline{x}=750" />, the known population <Katex tex="\sigma=5" /> and <Katex tex="n=30" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(748.2,\ 751.8)}" />,
    reason: <>One decimal place, in millilitres.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\text{a } 95\% \text{ interval captures } \mu\\ &\text{in } 95\% \text{ of samples, in the long run}\end{aligned}" />,
    reason: <>That is what the confidence level means — it is a property of the procedure, not of any one interval.</>,
  },
  {
    working: <Katex display tex="0.95\times300 = 285" />,
    reason: <>Each interval independently has probability 0.95 of containing μ, so the expected count is 95% of 300.</>,
    more: <>The number of intervals that capture μ is binomial with <Katex tex="n=300" /> and <Katex tex="p=0.95" />, so its expected value is <Katex tex="np=285" />. Tempting wrong answers are "all of them" or "95%": the true mean is fixed, and it is the intervals that change from sample to sample, so about 15 of the 300 are expected to miss it.</>,
  },
  {
    working: <Katex display tex="\boxed{285 \text{ of the intervals}}" />,
    reason: <>A whole number, since it is counting intervals.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{margin of error} = z\frac{\sigma}{\sqrt{n}} = 1.96\times\frac{5}{\sqrt{n}}" />,
    reason: <>Half the interval&rsquo;s width: with 95% confidence, the sample mean is within this distance of μ.</>,
  },
  {
    working: <Katex display tex="1.96\times\frac{5}{\sqrt{n}} \le 1" />,
    reason: <>The requirement: the margin of error is no more than 1 mL. σ = 5 is known and z = 1.96 as in part b., so n is the only unknown.</>,
  },
  {
    working: <Katex display tex="\sqrt{n} \ge 1.96\times5 = 9.8 \implies n \ge 96.04" />,
    reason: <>Multiplying both sides by <Katex tex="\sqrt{n}" />, then squaring (both sides positive).</>,
    more: <>With the unrounded <Katex tex="z=1.95996\ldots" /> the bound is <Katex tex="n\ge96.036\ldots" />; either way the answer is 97. CAS can also solve <Katex tex="1.96\times\tfrac{5}{\sqrt{n}}=1" /> for <Katex tex="n" /> directly.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 97}" />,
    reason: <>Sample sizes are whole numbers, and n must be <em>at least</em> 96.04, so round up.</>,
    more: <>Rounding down to 96 gives a margin of error over 1 mL: <Katex tex="1.96\times\tfrac{5}{\sqrt{96}}\approx1.0002>1" />, while <Katex tex="1.96\times\tfrac{5}{\sqrt{97}}\approx0.9950\le1" />. In a minimum-sample-size question always round up, whatever the decimal.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the company claims the mean is } \textit{less than } 750" />,
    reason: <>The claim of a change is what the test looks for evidence of, so it becomes the alternative hypothesis.</>,
  },
  {
    working: <Katex display tex="\boxed{H_0: \mu = 750}" />,
    reason: <>The null is the status quo — the stated mean of 750 — written as an equality about the population mean μ.</>,
    more: <>Hypotheses are always about the population parameter μ, never the sample mean: <Katex tex="H_1:\overline{x}<750" /> would be wrong, since we already know <Katex tex="\overline{x}=748" />.</>,
  },
  {
    working: <Katex display tex="\boxed{H_1: \mu < 750}" />,
    reason: <>One-tailed, on the lower side, matching the one-tailed test that is proposed.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X}\sim\mathrm{N}\left(750,\ \left(\tfrac{5}{\sqrt{50}}\right)^2\right) \text{ under } H_0" />,
    reason: <>A p value is calculated assuming the null hypothesis is true, so centre on 750. Standard error <Katex tex="\tfrac{5}{\sqrt{50}}\approx0.7071" />.</>,
  },
  {
    working: <Katex display tex="p = \Pr\left(\overline{X}\le748 \mid \mu = 750\right)" />,
    reason: <>The p value is the probability of a sample mean at least as extreme as 748 in the direction of <Katex tex="H_1" /> — here, 748 or lower.</>,
    more: <>Because <Katex tex="H_1" /> says <Katex tex="\mu<750" />, only the lower tail counts as "at least as extreme". A one-tailed test does not double the tail area; doubling would give 0.0047, the two-tailed p value.</>,
  },
  {
    working: <Katex display tex="z = \frac{748-750}{\frac{5}{\sqrt{50}}} = -2.8284\ldots" />,
    reason: <>Standardising the observed sample mean.</>,
  },
  {
    working: <Katex display tex="p = 0.0023389\ldots" />,
    reason: <>By <Cas fn="normCdf" /> with lower −∞, upper 748, μ = 750, σ = 5/√50 (or upper −2.8284…, μ = 0, σ = 1).</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.0023}" />,
    reason: <>Four decimal places, as asked.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.0023, \qquad \alpha = 0.01" />,
    reason: <>The p value from part f.i. against the stated 1% significance level.</>,
  },
  {
    working: <Katex display tex="0.0023 < 0.01 \implies \text{reject } H_0" />,
    reason: <>The p value is below the 1% significance level, so the result is too unlikely under <Katex tex="H_0" />; reject it in favour of <Katex tex="H_1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned}&\text{Yes — the claim is correct,}\\ &\text{since } 0.0023<0.01\end{aligned}}" />,
    reason: <>The answer must say whether the claim is supported <em>and</em> quote the comparison of p with 0.01.</>,
    more: <>A bare "reject <Katex tex="H_0" />", or "p is small" without quoting 0.01, is incomplete. A full answer: since <Katex tex="p=0.0023<0.01" />, reject <Katex tex="H_0" />; there is evidence at the 1% level that the mean volume is less than 750 mL, so the claim is supported.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr\left(\overline{X}<c\right) = 0.01 \text{ under } H_0" />,
    reason: <>The critical value cuts off 1% in the lower tail — the alternative is <Katex tex="\mu<750" />, so it is the lower tail, not the upper.</>,
  },
  {
    working: <Katex display tex="z_{0.01} = -2.32634\ldots" />,
    reason: <>By <Cas fn="invNorm" /> with area 0.01, μ = 0, σ = 1.</>,
    more: <>Or skip the z step: <Cas fn="invNorm" /> with area 0.01, μ = 750, σ = <Katex tex="\tfrac{5}{\sqrt{50}}" /> gives c directly. Store the unrounded value — part h. uses it.</>,
  },
  {
    working: <Katex display tex="c = 750-2.32634\times\frac{5}{\sqrt{50}} = 750-1.64498\ldots" />,
    reason: <>Unstandardising back to millilitres.</>,
  },
  {
    working: <Katex display tex="\boxed{c \approx 748.355 \text{ mL}}" />,
    reason: <>Three decimal places. A sample mean below this supports the conclusion that the mean has fallen.</>,
    more: <>Using the upper tail is the slip: area 0.99 gives <Katex tex="750+1.645=751.645" />, a value <em>above</em> 750 — that could never support a claim that the mean is <em>less</em> than 750. As a check, the observed 748 is below 748.355, consistent with rejecting <Katex tex="H_0" /> in part f.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\text{``service has not reduced the mean''}\\ &\iff H_0 \text{ is not rejected}\\ &\iff \overline{X} \ge 748.355\ldots\end{aligned}" />,
    reason: <>Concluding "not reduced" means not rejecting <Katex tex="H_0" />, which happens when the sample mean is not below part g.'s critical value.</>,
    more: <>Since the true mean really has fallen, this conclusion is wrong: not rejecting a false <Katex tex="H_0" /> is a <b>Type II error</b>.</>,
  },
  {
    working: <Katex display tex="\overline{X}\sim\mathrm{N}\left(747.5,\ \left(\tfrac{5}{\sqrt{50}}\right)^2\right)" />,
    reason: <>The probability is about what actually happens, so use the <em>true</em> mean 747.5, not the hypothesised 750. Same standard error.</>,
    more: <>The critical value 748.355 was set using 750 (part g.) and stays fixed; only the distribution the sample mean really comes from changes. Using 750 here would give <Katex tex="\Pr(\overline{X}\ge748.355\mid\mu=750)=0.99" />, which is just the non-rejection probability when <Katex tex="H_0" /> is true.</>,
  },
  {
    working: <Katex display tex="z = \frac{748.355\ldots-747.5}{\frac{5}{\sqrt{50}}} = 1.2091\ldots" />,
    reason: <>Standardising the critical value against the true distribution.</>,
  },
  {
    working: <Katex display tex="\Pr\left(\overline{X}\ge748.355\ldots\right) = 0.11329\ldots" />,
    reason: <>By <Cas fn="normCdf" /> with lower = the stored critical value, upper ∞, μ = 747.5, σ = 5/√50.</>,
    more: <>Typing the rounded 748.355 gives 0.11330…; both round to 0.113.</>,
  },
  {
    working: <Katex display tex="\boxed{0.113}" />,
    reason: <>Three decimal places — roughly a one-in-nine chance of missing a real 2.5 mL shortfall.</>,
  },
]

export default function SpecialistQ6_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (10 marks)</p>
        <p>
          The volume of water, <Katex tex="V" /> mL, consumed by a student during a school day
          may be assumed to be normally distributed with a mean of 1000 mL and a standard
          deviation of 80 mL.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              One quantity runs through the whole question: the standard error{' '}
              <Katex tex="\tfrac{\sigma}{\sqrt{n}}" />. It sets the spread of the sampling
              distribution in part a., the width of the confidence interval in part b., the sample
              size in part d., and the scale of the hypothesis test in parts f. to h.
            </p>
            <p>
              Part h. is the only place where the distribution changes. Parts e. to g. all work
              under <Katex tex="H_0" />, with <Katex tex="\mu=750" />; part h. asks what happens
              when the true mean is 747.5, so the same critical value is now measured against a
              different centre (part h. finds a Type II error probability).
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a.i"
        topic="Sample Mean"
        marks={1}
        statement={
          <>
            Write down the mean and standard deviation of the sampling distribution for the
            average volume of water consumed by randomly selected samples of 25 students.
            <br />
            Give your answers in millilitres.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Sample Mean"
        marks={1}
        statement={
          <>
            What is the probability, correct to four decimal places, that the average volume of
            water consumed by a random sample of 25 students on a particular school day is more
            than 970 mL?
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          The canteen at a particular school stocks two brands of water in bottles, Wasser and
          Apa.
        </p>
        <p>
          The manufacturer of Wasser bottled water knows that the volume of water dispensed
          into bottles may be assumed to be normally distributed with a standard deviation of
          5 mL. Engineers at the company take a random sample of 30 bottles and measure the
          volume of water in each bottle. The sample mean is found to be 750 mL.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            Find a 95% confidence interval for the mean volume of water dispensed into each
            Wasser bottle.
            <br />
            Give your values in millilitres, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            The engineers decide to take 300 random samples, each containing 30 bottles, and
            calculate the respective 95% confidence intervals. All samples are independent.
            <br />
            In how many of these confidence intervals would the engineers expect the value of the
            true mean volume dispensed to be included?
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Sample Size"
        marks={1}
        statement={
          <>
            What is the minimum size of the sample required to ensure that the difference
            between the sample mean and the mean volume dispensed is no more than 1 mL at the
            95% confidence level?
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          The volume of water dispensed into Apa water bottles may be assumed to be normally
          distributed with a mean of 750 mL and a standard deviation of 5 mL. After a service, a
          random sample of 50 bottles gave a sample mean of 748 mL. The company now claims that
          the mean volume of water dispensed is less than the stated mean of 750 mL.
        </p>
        <p>A one-tailed statistical test at the 1% level of significance is proposed.</p>
      </div>

      <PartCard
        letter="e"
        topic="Hypotheses"
        marks={1}
        statement={
          <>
            Write down the null and alternative hypotheses that will be used in testing the
            company&rsquo;s claim.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f.i"
        topic="p-Value"
        marks={1}
        statement={
          <>
            Determine the <Katex tex="p" /> value for this test.
            <br />
            Give your answer correct to four decimal places.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Conclusion"
        marks={1}
        statement={
          <>
            Is the company&rsquo;s claim correct?
            <br />
            Explain your conclusion in terms of the <Katex tex="p" /> value.
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Critical Value"
        marks={1}
        statement={
          <>
            At the 1% level of significance for a sample size of 50 bottles, find the critical
            value of the sample mean, below which a sample mean value would support the
            conclusion that the mean volume of water dispensed is now less than 750 mL.
            <br />
            Give your answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <PartCard
        letter="h"
        topic="Type II Error"
        marks={1}
        statement={
          <>
            Assume that, after the service, the true mean volume of water in the Apa bottles was
            found to be 747.5 mL and that the population standard deviation,{' '}
            <Katex tex="\sigma" />, is 5 mL.
            <br />
            At the 1% level of significance, for a sample size of 50, find the probability that
            the company will conclude that the service has not reduced the mean volume of water in
            an Apa bottle.
            <br />
            Give your answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_H}
      >
        <WorkingTable rows={ROWS_H} />
      </PartCard>
    </div>
  )
}
