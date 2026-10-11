// 2021 Specialist Mathematics — Exam 2, Section B Question 6 (10 marks). A lift's load
// limit, a queue of hot drinks, then a one-sided test on daily sales with its critical
// value and the probability of a Type II error. Question text transcribed from the original
// paper. Answers checked with scipy and against the VCAA examination report. Solution is
// original.
// Interactives: spec-2021e2-q6a-total-spread (step n; the total mass's curve widens as 8√n and
// the tail past 1000 kg jumps at n = 13; toggle the report's σ = 8/√n error), spec-2021e2-q6b-
// four-drinks (simulated queues: four separate drinks vs one drink × 4), spec-2021e2-q6d-reject-
// region (drag x̄; p = 0.01 at 63 108.7 and every larger x̄ rejects), spec-2021e2-q6e-type-two
// (the H₀ curve sets the cut-off, the μ = 63 000 curve gives the Type II probability; slide α).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const TotalSpreadWidget = lazyWidget(() => import('../interactives/spec-2021e2-q6a-total-spread'))
const FourDrinksWidget = lazyWidget(() => import('../interactives/spec-2021e2-q6b-four-drinks'))
const RejectRegionWidget = lazyWidget(() => import('../interactives/spec-2021e2-q6d-reject-region'))
const TypeTwoWidget = lazyWidget(() => import('../interactives/spec-2021e2-q6e-type-two'))

const EXAM_A: SAExaminerStats = {
  marks: [73, 13, 14],
  average: 0.4,
  comment: (
    <>
      Successful students used a trial-and-error approach or used a standardised value to
      solve for <Katex tex="n" />. A common error was to approach this as a sampling problem
      with <Katex tex="\sigma=\tfrac{8}{\sqrt n}" />.
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

const EXAM_CII: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: <>Students generally handled this question well.</>,
}

const EXAM_CIII: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      Some students stated a correct conclusion but did not give a reason by referencing the{' '}
      <Katex tex="p" />-value.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [84, 16],
  average: 0.2,
  comment: (
    <>
      Some students calculated <Katex tex="63{,}108.7" /> but did not proceed to answer the
      question correctly as a range of values.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [89, 2, 9],
  average: 0.2,
  comment: (
    <>
      Most students who found <Katex tex="\bar x = 62{,}198.03" /> were able to go on to find
      the required probability.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="W_n = X_1+X_2+\cdots+X_n \sim \mathrm{N}\!\left(75n,\ 8^2n\right)" />,
    reason: <>The lift carries the <em>total</em> mass <Katex tex="W_n" /> of the <Katex tex="n" /> people, not their average. For independent people the means add and the variances add, so the standard deviation is <Katex tex="8\sqrt n" />.</>,
    more: <>Each mass <Katex tex="X_i \sim \mathrm{N}(75,\ 8^2)" />. Treating them as independent, <Katex tex="\mathrm{E}(W_n) = 75n" /> and <Katex tex="\mathrm{Var}(W_n) = n\times8^2" />, and a sum of independent normal variables is itself normal. The report's common error was to use <Katex tex="\sigma = \tfrac{8}{\sqrt n}" />, the standard deviation of the sample <em>mean</em> mass, for the <em>total</em> mass. Working with the mean is fine if you stay consistent: <Katex tex="\Pr\!\left(\bar X > \tfrac{1000}{n}\right)" /> with <Katex tex="\bar X \sim \mathrm{N}\!\left(75,\ \tfrac{8^2}{n}\right)" /> gives exactly the same probabilities. The error is pairing the total's mean <Katex tex="75n" /> with the spread <Katex tex="\tfrac{8}{\sqrt n}" />: that spread is far too small (at <Katex tex="n = 13" /> the chance comes out essentially 0 instead of 0.193), so 13 people would wrongly look safe.</>,
  },
  {
    working: <Katex display tex="\Pr(W_n>1000) < 0.01" />,
    reason: <>The lift exceeds its maximum load exactly when the total mass is over 1000 kg. We want the largest <Katex tex="n" /> that keeps this chance under 1%.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(1000, ∞, 975, 8√13) = 0.193…</Cas>,
    reason: <>Start at <Katex tex="n = 13" />, whose mean total <Katex tex="75\times13 = 975" /> kg is just under the limit. <Katex tex="\Pr(W_{13}>1000) \approx 0.193" />, far more than 1%, so 13 is too many.</>,
    more: <>Why 13: <Katex tex="1000 \div 75 \approx 13.3" />, so 13 is the largest group whose mean total is under 1000 kg. With a mean of 975 kg and standard deviation <Katex tex="8\sqrt{13} \approx 28.8" /> kg, 1000 kg is only 0.87 standard deviations above the mean, so an overload is quite likely.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(1000, ∞, 900, 8√12) = 0.00015…</Cas>,
    reason: <>Try <Katex tex="n = 12" />: mean 900, standard deviation <Katex tex="8\sqrt{12}" />. <Katex tex="\Pr(W_{12}>1000) \approx 0.00015 < 0.01" />, so 12 people is allowed.</>,
    more: <>The standard deviation is <Katex tex="8\sqrt{12}\approx27.7" /> kg, so 1000 kg is 3.6 standard deviations above the mean of 900 kg, far out in the tail. The report rounds this probability to 0.0002.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 12}" />,
    reason: <>The maximum: 12 works and 13 does not, and for <Katex tex="n \ge 14" /> the mean total alone (1050 kg or more) is over the limit.</>,
    more: <>Trial and error is the practical route because <Katex tex="n" /> appears in both the mean and the standard deviation. The other route the report mentions is a standardised value: solve <Katex tex="\tfrac{1000-75n}{8\sqrt n} = 2.3263" /> (the <Katex tex="z" /> with 1% above it, from invNorm(0.99, 0, 1)) with CAS solve to get <Katex tex="n \approx 12.46" />, then round down, since a smaller <Katex tex="n" /> gives a smaller chance of overload.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\text{available time} &= 9{:}00-8{:}52-0.5 \\ &= 7.5 \text{ minutes}\end{aligned}" />,
    reason: <>From 8.52 am to 9.00 am is 8 minutes, and the last half minute is needed to walk to the meeting room. So her drink must be finished within 7.5 minutes of 8.52 am.</>,
  },
  {
    working: (
      <>
        <Katex display tex="T_4 = D_1+D_2+D_3+D_4" />
        <Katex display tex="T_4 \sim \mathrm{N}\!\left(4\times2,\ 4\times0.5^2\right) = \mathrm{N}(8,\ 1^2)" />
      </>
    ),
    reason: <>Fourth in the queue: three drinks are made before hers, then hers, each an independent <Katex tex="\mathrm{N}(2,\ 0.5^2)" />. The means add and the variances add, so the standard deviation is 1.</>,
    more: <>The four dispensing times <Katex tex="D_1,\ldots,D_4" /> are independent (the question says so), so <Katex tex="\mathrm{E}(T_4) = 4\times2 = 8" /> and <Katex tex="\mathrm{Var}(T_4) = 4\times0.5^2 = 1" />, and a sum of independent normal variables is normal. This is <em>not</em> <Katex tex="4D" />, one drink's time multiplied by 4, whose variance is <Katex tex="4^2\times0.5^2=4" /> (standard deviation 2): the confusion between a sum of four random variables and scaling one by four that the report describes. Four separate drinks partly cancel each other's slowness, so their sum spreads less than <Katex tex="4D" />. Using <Katex tex="4D" /> would give 0.4013.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{on time}) = \Pr(T_4 \le 7.5)" />,
    reason: <>She is on time when all four drinks are done within the 7.5 minutes.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 7.5, 8, 1)</Cas>,
    reason: <>Lower bound <Katex tex="-\infty" />, upper bound 7.5, mean 8, standard deviation 1 (not the variance).</>,
  },
  {
    working: <Katex display tex="\boxed{0.3085}" />,
    reason: <>Correct to four decimal places. Less than a one-in-three chance, because her expected wait of 8 minutes is already longer than the 7.5 minutes she has.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \mu = 60\,000}" />,
    reason: <>Let <Katex tex="\mu" /> be the mean daily sales after the campaign. The null hypothesis says the campaign changed nothing: <Katex tex="\mu" /> is still 60 000, written with an equals sign.</>,
  },
  {
    working: <Katex display tex="\boxed{H_1: \mu > 60\,000}" />,
    reason: <>"Effective" means sales <em>went up</em>, so the alternative is <Katex tex="\mu > 60\,000" />: the one-sided test the question asks for, looking only at the right-hand tail.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\bar X \sim \mathrm{N}\!\left(60\,000,\ \left(\tfrac{5000}{\sqrt{14}}\right)^{\!2}\right)" />
        <Katex display tex="\mathrm{sd}(\bar X) = \frac{5000}{\sqrt{14}} \approx 1336.3" />
      </>
    ),
    reason: <>Assume <Katex tex="H_0" /> is true. The mean <Katex tex="\bar X" /> of 14 days is then normal with mean 60 000 (the same as for one day) and standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n} = \tfrac{5000}{\sqrt{14}}" />.</>,
    more: <>Under <Katex tex="H_0" /> daily sales are <Katex tex="\mathrm{N}(60\,000,\ 5000^2)" />. The mean of a random sample from a normal population is exactly normal, so no large-sample approximation is needed even though only 14 days are sampled.</>,
  },
  {
    working: <Katex display tex="p = \Pr\!\left(\bar X \ge 63\,500 \mid \mu = 60\,000\right)" />,
    reason: <>The <Katex tex="p" /> value is the probability, assuming <Katex tex="H_0" />, of a sample mean at least as large as the 63 500 observed. "At least as large" because <Katex tex="H_1" /> is <Katex tex="\mu > 60\,000" />.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(63500, ∞, 60000, 5000/√14)</Cas>,
    reason: <>Lower bound 63 500, upper bound <Katex tex="\infty" />, mean 60 000, standard deviation <Katex tex="\tfrac{5000}{\sqrt{14}}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0.0044}" />,
    reason: <>Correct to four decimal places. 63 500 is about 2.6 standard deviations of <Katex tex="\bar X" /> above 60 000, far out in the tail.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.0044 < 0.01" />,
    reason: <>Compare the <Katex tex="p" /> value with the 1% significance level. If the campaign had changed nothing, a sample mean as high as 63 500 would happen less than 1% of the time.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{reject } H_0" />
        <Katex display tex="\boxed{\begin{gathered}\text{there is evidence that} \\ \text{the campaign was effective}\end{gathered}}" />
      </>
    ),
    reason: <>State the conclusion in context <em>and</em> the reason, <Katex tex="p < 0.01" />.</>,
    more: <>The report notes that some students stated a correct conclusion but did not give a reason by referencing the <Katex tex="p" /> value. "Reject <Katex tex="H_0" />" on its own also stops short: the question asks about the campaign, so say what rejecting means for it.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{reject } H_0 \iff p \le 0.01" />,
    reason: <>The same test as part c, so under <Katex tex="H_0" />, <Katex tex="\bar X \sim \mathrm{N}\big(60\,000,\ (\tfrac{5000}{\sqrt{14}})^2\big)" />. We want every sample mean that would reject <Katex tex="H_0" />.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\bar X \ge c \mid \mu = 60\,000\right) = 0.01" />,
    reason: <>A larger <Katex tex="\bar x" /> has a smaller <Katex tex="p" /> value, so <Katex tex="p \le 0.01" /> exactly when <Katex tex="\bar x" /> is at or beyond the critical value <Katex tex="c" /> with 1% to its right.</>,
    more: <>The <Katex tex="p" /> value of a sample mean <Katex tex="\bar x" /> is the area to its right under the <Katex tex="H_0" /> curve (right, because <Katex tex="H_1" /> is <Katex tex="\mu > 60\,000" />). That area shrinks as <Katex tex="\bar x" /> moves right, so the boundary <Katex tex="c" /> is the 99th percentile of the <Katex tex="H_0" /> distribution.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.99, 60000, 5000/√14) = 63108.71…</Cas>,
    reason: <>invNorm takes the area to the <em>left</em> of <Katex tex="c" />, so enter <Katex tex="1-0.01 = 0.99" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\bar x \ge 63\,109}" />,
    reason: <>Correct to the nearest integer, and given as a <em>range</em>: every sample mean of 63 109 or more rejects <Katex tex="H_0" />, not just one value.</>,
    more: <>The report notes that some students calculated 63 108.7 but did not go on to answer as a range of values, and its general comments flag this part for the same reason. Rounding up is safe here: 63 109 is past 63 108.71, so it does reject.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="H_0: \mu = 60\,000, \quad H_1: \mu > 60\,000" />,
    reason: <>The same one-sided test as part c, now at the 5% level of significance.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.95, 60000, 5000/√14) = 62198.03…</Cas>,
    reason: <>The rule for rejecting is always worked out assuming <Katex tex="H_0" />: reject when <Katex tex="\bar x" /> is in the top 5% of the <Katex tex="H_0" /> distribution, its 95th percentile.</>,
    more: <>So enter the <Katex tex="H_0" /> mean 60 000 (not the true 63 000), standard deviation <Katex tex="\tfrac{5000}{\sqrt{14}}" />, and 0.95 because this part uses 5%, not part d's 1%. The true mean only enters in the next steps. The report notes that most students who found this critical value went on to find the probability, so this is the step to get right.</>,
  },
  {
    working: <Katex display tex="H_0 \text{ accepted} \iff \bar x < 62\,198.03" />,
    reason: <>"Incorrectly accepted" is a Type II error: <Katex tex="H_0" /> is false (the true mean is now 63 000), but the sample mean falls below the critical value, so <Katex tex="H_0" /> is not rejected.</>,
    more: <>"Accepted" here means "not rejected": the test never proves <Katex tex="H_0" />, it only fails to find enough evidence against it. The other possible mistake, rejecting a true <Katex tex="H_0" />, is a Type I error, whose probability is the 5% significance level.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\bar X < 62\,198.03 \mid \mu = 63\,000\right)" />,
    reason: <>This probability uses the <em>true</em> distribution, <Katex tex="\bar X \sim \mathrm{N}\big(63\,000,\ (\tfrac{5000}{\sqrt{14}})^2\big)" />: the new mean, and the same standard deviation since the question says to assume <Katex tex="\sigma = 5000" />.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 62198.03, 63000, 5000/√14)</Cas>,
    reason: <>Lower bound <Katex tex="-\infty" />, upper bound the critical value, mean 63 000.</>,
  },
  {
    working: <Katex display tex="\boxed{0.274}" />,
    reason: <>Correct to three decimal places. With only 14 days of data there is about a one-in-four chance of missing a real rise to 63 000.</>,
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
        topic="Linear Combination"
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
        <Explore title="The total mass spreads out as n grows, so 13 people is one too many">
          <TotalSpreadWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Clare, who is one of the employees, likes to have a hot drink after she exits the
          lift. The time taken for the drink machine to dispense a hot drink is normally
          distributed with a mean of 2 minutes and a standard deviation of 0.5 minutes. Times
          taken to dispense successive hot drinks are independent.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Sum of Normals"
        marks={2}
        statement={
          <>
            Clare has a meeting at 9.00 am and at 8.52 am she is fourth in the queue for a
            hot drink.
            <br />
            Assume that the waiting time between hot drinks dispensed is negligible and that
            it takes Clare 0.5 minutes to get from the drink machine to the meeting room.
            <br />
            What is the probability, correct to four decimal places, that
            Clare will get to her meeting on time?
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Four separate drinks, not one drink four times">
          <FourDrinksWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Clare is a statistician for the chocolate company. The number of chocolate bars
          sold daily is normally distributed with a mean of 60000 and a standard deviation of
          5000. To increase sales, the company decides to run an advertising campaign. After
          the campaign, the mean daily sales from 14 randomly selected days was found to be
          63500.
          <br />
          Clare has been asked to investigate whether the advertising campaign
          was effective, so she decides to perform a one-sided statistical test at the 1%
          level of significance.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Hypotheses"
        marks={1}
        statement={<>Write down suitable null and alternative hypotheses for this test.</>}
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="p-Value"
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
        topic="Conclusion"
        marks={1}
        statement={
          <>
            Giving a reason, state whether there is any evidence for the success of the
            advertising campaign.
          </>
        }
        examinerReport={EXAM_CIII}
      >
        <WorkingTable rows={ROWS_CIII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Critical Region"
        marks={1}
        statement={
          <>
            Find the range of values for the mean daily sales of another 14 randomly selected
            days that would lead to the null hypothesis being rejected when tested at the 1%
            level of significance. Give your answer correct to the nearest integer.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <Explore title="Every x̄ past the critical value rejects too, so the answer is a range">
          <RejectRegionWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="e"
        topic="Type II Error"
        marks={2}
        statement={
          <>
            The advertising campaign has been successful to the extent that the mean daily
            sales is now 63000.
            <br />
            A statistical test is applied at the 5% level of significance.
            <br />
            Find the probability that the null hypothesis would be incorrectly
            accepted, based on the sales of another 14 randomly selected days and assuming a
            standard deviation of 5000. Give your answer correct to three decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
        <Explore title="Type II error: the cut-off comes from H₀, the probability from the true mean">
          <TypeTwoWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
