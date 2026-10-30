// 2025 Specialist NHT — Exam 2, Section B Question 6 (10 marks). The NHT report gives sample
// answers only, with no statistics. Bicycle manufacturing: a sum of three independent normal stage
// times (an unknown standard deviation, a tail probability), a 99% confidence interval for mean
// height, how many of 200 such intervals contain μ, the sample size that cuts the width by 60%, and
// a one-sided test on tyre life (hypotheses, p value, conclusion, the probability of a type II
// error when μ = 3350). Question text transcribed from the original paper (no diagram; the 2025 NHT
// paper has no text layer, so it was read from the page images). Part i.'s figure
// (spec-2025nhte2-q6i-type2.png) is this site's own explanatory graph, drawn with matplotlib — VCAA
// printed no figure. Answers checked with scipy and against the VCAA report's sample answers, which
// agree: a. 1.1; b. 0.0038; c. (166.9, 171.1); d. 198; e. 938; g. 0.0131; h. yes, p < 0.05;
// i. 0.046 (the report rounds the cut-off to 3274 first; unrounded it is 3274.018…, same answer).
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import typeTwoSrc from './spec-2025nhte2-q6i-type2.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="T = T_1 + T_2 + T_3" />,
    reason: <>The total processing time is the sum of the three stage times.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\operatorname{Var}(T) &= \operatorname{Var}(T_1) + \operatorname{Var}(T_2) + \operatorname{Var}(T_3) \\ &= 1^2 + a^2 + 0.2^2\end{aligned}" />,
    reason: <>The stages are independent, so their <em>variances</em> add. Standard deviations do not add.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}1.5^2 = 1 + a^2 + 0.04 \\ a^2 = 2.25 - 1.04 = 1.21\end{gathered}" />,
    reason: <>The total&apos;s standard deviation is 1.5, so its variance is <Katex tex="1.5^2=2.25" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 1.1}" />,
    reason: <><Katex tex="a=-1.1" /> is rejected: a standard deviation can&apos;t be negative.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{E}(T) = 5 + 8 + 3 = 16, \qquad T \sim \mathrm{N}\!\left(16,\ 1.5^2\right)" />,
    reason: <>Means always add, and a sum of independent normal variables is normal.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(20, ∞, 16, 1.5)</Cas>,
    reason: <><Katex tex="\Pr(T>20)" />: the upper tail beyond 20 hours.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(T > 20) \approx 0.0038}" />,
    reason: <><Katex tex="0.003830\ldots" />, correct to four decimal places.</>,
    more: <>Sanity check: 20 hours is <Katex tex="\tfrac{20-16}{1.5}\approx2.67" /> standard deviations above the mean, so a very small probability is expected.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\bar x \pm z\,\frac{\sigma}{\sqrt n}, \qquad z = 2.5758\ldots" />,
    reason: <>A 99% confidence interval leaves 0.5% in each tail, so <Katex tex="z" /> satisfies <Katex tex="\Pr(Z<z)=0.995" />: <Cas fn="invNorm">invNorm(0.995, 0, 1)</Cas>.</>,
  },
  {
    working: <Katex display tex="169 \pm 2.5758 \times \frac{10}{\sqrt{150}} = 169 \pm 2.103\ldots" />,
    reason: <>Sample mean 169, population standard deviation 10, sample size 150.</>,
  },
  {
    working: <Katex display tex="\boxed{(166.9,\ 171.1)}" />,
    reason: <>In centimetres, each end rounded to one decimal place.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="200 \times 0.99 = \boxed{198}" />,
    reason: <>99% confidence means that, in the long run, 99% of intervals built this way contain the population mean.</>,
    more: <>The interval from part c. either contains <Katex tex="\mu" /> or it doesn&apos;t; the 99% is about the method, not about any one interval. That is why the question asks about 200 samples.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} = 2 \times 2.5758 \times \frac{10}{\sqrt n}" />,
    reason: <>The width is twice the margin of error, and is proportional to <Katex tex="\tfrac{1}{\sqrt n}" />.</>,
  },
  {
    working: <Katex display tex="2 \times 2.5758 \times \frac{10}{\sqrt n} \le 0.4 \times 2 \times 2.5758 \times \frac{10}{\sqrt{150}}" />,
    reason: <>Decreasing the width by at least 60% leaves at most 40% of the width found in part c.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\frac{1}{\sqrt n} \le \frac{0.4}{\sqrt{150}} \implies \sqrt n \ge \frac{\sqrt{150}}{0.4} \\ \implies n \ge \frac{150}{0.16} = 937.5\end{gathered}" />,
    reason: <>Everything except <Katex tex="n" /> cancels. Square both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 938}" />,
    reason: <>The sample size must be a whole number and at least 937.5, so round <em>up</em>.</>,
    more: <>Rounding to 937 would leave the width just over 40% of the original. To cut a width to 40%, the sample size must grow by a factor of <Katex tex="\tfrac{1}{0.4^2}=6.25" />.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \ \mu = 3200, \qquad H_1: \ \mu > 3200}" />,
    reason: <>Let <Katex tex="\mu" /> be the mean life (km) of all the manufacturer&apos;s tyres. <Katex tex="H_0" /> is the claim; the customers&apos; reports suggest the mean is <em>more</em> than 3200, and the test is one-sided, so <Katex tex="H_1" /> is <Katex tex="\mu>3200" />.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\bar L \sim \mathrm{N}\!\left(3200,\ \left(\tfrac{450}{\sqrt{100}}\right)^2\right) = \mathrm{N}\!\left(3200,\ 45^2\right)" />,
    reason: <>Let <Katex tex="\bar L" /> be the mean life of a random sample of 100 tyres. Assuming <Katex tex="H_0" /> is true, <Katex tex="\bar L" /> is normal with mean 3200 and standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n}=45" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="p = \Pr\!\left(\bar L \ge 3300 \ \middle|\ \mu = 3200\right)" />
        <Cas fn="normCdf">normCdf(3300, ∞, 3200, 45)</Cas>
      </>
    ),
    reason: <><Katex tex="H_1" /> is <Katex tex="\mu>3200" />, so the <Katex tex="p" /> value is the upper tail from the observed 3300.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.0131}" />,
    reason: <><Katex tex="0.013134\ldots" />, correct to four decimal places.</>,
    more: <>3300 is <Katex tex="\tfrac{100}{45}\approx2.22" /> standard deviations of <Katex tex="\bar L" /> above 3200, so a small tail is expected.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.0131 < 0.05" />,
    reason: <>Compare the <Katex tex="p" /> value from part g. with the 5% significance level.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{Yes: as } p < 0.05, \text{ reject } H_0\text{.} \\ \text{There is evidence that the mean} \\ \text{tyre life is more than 3200 km}\end{gathered}}" />,
    reason: <>The reason must involve <Katex tex="p" />, as VCAA&apos;s sample answer does (&ldquo;Yes, as <Katex tex="p<0.05" />&rdquo;).</>,
  },
]

const ROWS_I: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr\!\left(\bar L > k \ \middle|\ \mu = 3200\right) = 0.05" />,
    reason: <>First find the cut-off <Katex tex="k" />: the smallest sample mean that would lead to rejecting <Katex tex="H_0" /> at the 5% level, using the <Katex tex="H_0" /> distribution from part g.</>,
  },
  {
    working: (
      <>
        <Cas fn="invNorm">invNorm(0.95, 3200, 45)</Cas>
        <Katex display tex="k = 3274.018\ldots" />
      </>
    ),
    reason: <>An upper tail of 0.05 leaves 0.95 to the left.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\bar L < k \ \middle|\ \mu = 3350\right)" />,
    reason: <>The manufacturer &ldquo;still concludes&rdquo; 3200 when the sample mean falls below the cut-off, so <Katex tex="H_0" /> isn&apos;t rejected. Now the true mean is 3350, so use <Katex tex="\bar L\sim\mathrm{N}(3350,\ 45^2)" />.</>,
    more: <>
      Not rejecting a false <Katex tex="H_0" /> is a type II error. The cut-off is fixed by the <Katex tex="\mu=3200" /> curve; the probability is then an area under the <Katex tex="\mu=3350" /> curve.
      <span className="block mt-2 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={typeTwoSrc}
          alt="This site's own explanatory graph, not from the VCAA paper: two normal curves for the sample mean, centred at 3200 (blue) and 3350 (orange), with a dashed cut-off at 3274. The blue area right of 3274 is 0.05; the orange area left of 3274 is 0.046"
          className="w-full max-w-[460px]" />
      </span>
    </>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 3274.018, 3350, 45)</Cas>,
    reason: <>Use the unrounded cut-off.</>,
  },
  {
    working: <Katex display tex="\boxed{0.046}" />,
    reason: <><Katex tex="0.04566\ldots" />, correct to three decimal places. VCAA&apos;s sample answer uses the cut-off rounded to 3274, which gives the same 0.046.</>,
    more: <>Plausible: 3350 is well above the cut-off (<Katex tex="\tfrac{3350-3274}{45}\approx1.69" /> standard deviations), so the test will usually detect the higher mean and only rarely miss it.</>,
  },
]

export default function SpecialistQ6_2025NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (10 marks)</p>
        <p>
          A manufacturer produces a bicycle in three stages. The times taken to complete each stage,{' '}
          <Katex tex="T_1" />, <Katex tex="T_2" /> and <Katex tex="T_3" /> hours, may be assumed to be
          independent and normally distributed. The mean and standard deviation of each stage are
          shown in the following table, where <Katex tex="a" /> is a real constant.
        </p>
        <div className="overflow-x-auto">
          <table className="border-collapse text-center text-[14px] bg-white dark:bg-gray-900">
            <thead>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 font-semibold">Stage</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 font-semibold">Mean (hours)</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-1.5 font-semibold">Standard deviation (hours)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">1</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">5</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">1</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">2</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">8</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5"><Katex tex="a" /></td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">3</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">3</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-1.5">0.2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>The standard deviation of the total processing time to produce a bicycle is 1.5 hours.</p>
      </div>

      <PartCard
        letter="a"
        topic="Sum of Normals"
        marks={1}
        statement={<>Find the value of <Katex tex="a" />.</>}
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Add the standard deviations"
          working={<Katex display tex="1 + a + 0.2 = 1.5 \implies a = 0.3" />}
        >
          Standard deviations of independent variables don&apos;t add; variances do. Square first,
          add, then take the square root at the end.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Normal Probability"
        marks={1}
        statement={
          <>
            What is the probability that the total time taken to produce a bicycle exceeds 20 hours?
            <br />
            Give your answer correct to four decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The heights of people in Australia may be assumed to be normally distributed, with a
          standard deviation of 10 cm. The bicycles are designed for people of varying heights. The
          manufacturer takes a random sample of 150 people, the mean height for which is 169 cm.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            Find an approximate 99% confidence interval for the mean height of people in Australia.
            <br />
            Give your answer in centimetres rounded to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Interpreting Confidence"
        marks={1}
        statement={
          <>
            If the manufacturer took 200 such samples, how many of the 99% confidence intervals would
            be expected to contain the value of the population mean?
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Sample Size"
        marks={1}
        statement={
          <>
            The manufacturer wants to get a better estimate of the population mean by decreasing the
            width of the confidence interval found in <b>part c</b> by at least 60%.
            <br />
            What minimum sample size should be taken to achieve this?
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
        <WrongMethod
          title="Make the width 60% of the original"
          working={<Katex display tex="\begin{gathered}\frac{1}{\sqrt n} \le \frac{0.6}{\sqrt{150}} \\ \implies n \ge 416.7 \implies n = 417\end{gathered}" />}
        >
          &ldquo;Decreasing by 60%&rdquo; removes 60% of the width and leaves 40%, so the factor is 0.4,
          not 0.6.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          Bicycle tyre life is defined as the number of kilometres for which a bicycle tyre is safe to
          use. The life of bicycle tyres may be assumed to be normally distributed.
        </p>
        <p>
          The manufacturer claims that the mean life of bicycle tyres is 3200 km and the standard
          deviation is 450 km. Over the years a large number of customers reported that their bicycle
          tyres had a tyre life of more than 3200 km. To assess these reports, the manufacturer
          performs a one-sided statistical test at the 5% level of significance.
        </p>
        <p>
          A random sample of 100 tyres is taken and the mean bicycle tyre life is found to be 3300 km.
          Assume that the standard deviation is still 450 km.
        </p>
      </div>

      <PartCard
        letter="f"
        topic="Hypotheses"
        marks={1}
        statement={<>Write down the null and alternative hypotheses for this test.</>}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="p-Value"
        marks={1}
        statement={
          <>
            Find the <Katex tex="p" /> value for the test. Give your answer correct to four decimal
            places.
          </>
        }
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <PartCard
        letter="h"
        topic="Conclusion"
        marks={1}
        statement={
          <>
            At the 5% level of significance, should the manufacturer change the claim that the mean
            bicycle tyre life is 3200 km? Give a reason for your conclusion.
          </>
        }
      >
        <WorkingTable rows={ROWS_H} />
      </PartCard>

      <PartCard
        letter="i"
        topic="Type II Error"
        marks={2}
        statement={
          <>
            Suppose that the true mean bicycle tyre life is 3350 km.
            <br />
            Find the probability, correct to three decimal places, that the manufacturer will still
            conclude that the mean bicycle tyre life is 3200 km.
            <br />
            Assume a 5% level of significance, a sample size of 100 and that{' '}
            <Katex tex="\sigma=450" /> km.
          </>
        }
      >
        <DetailOnly>
          <Background>
            <p>
              This is a two-step question. The decision rule (&ldquo;reject <Katex tex="H_0" /> if the
              sample mean is above <Katex tex="k" />&rdquo;) is set assuming <Katex tex="H_0" /> is
              true, so <Katex tex="k" /> comes from <Katex tex="\mu=3200" />. Then the question changes
              the truth to <Katex tex="\mu=3350" /> and asks how often that same rule fails to reject.
              Two different means, used for two different steps.
            </p>
          </Background>
        </DetailOnly>
        <WorkingTable rows={ROWS_I} />
        <WrongMethod
          title="Use μ = 3350 for the cut-off as well"
          working={<Katex display tex="\begin{gathered}k = \text{invNorm}(0.95,\ 3350,\ 45) \approx 3424 \\ \implies \Pr(\bar L<3424 \mid \mu=3350) = 0.95\end{gathered}" />}
        >
          The cut-off belongs to the test, and the test is designed under <Katex tex="H_0" />:{' '}
          <Katex tex="\mu=3200" />. Using 3350 for both steps just returns 0.95 (that is, 1 − 0.05),
          which can&apos;t be the chance of missing a real increase.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
