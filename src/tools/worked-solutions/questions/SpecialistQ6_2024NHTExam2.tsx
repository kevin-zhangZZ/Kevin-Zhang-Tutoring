// 2024 Specialist NHT — Exam 2, Section B Question 6 (9 marks). The NHT report gives sample
// answers only, with no statistics. Sugar concentration of vinegar: the sampling distribution of
// the mean of nine bottles, the minimum sample size for a 90% confidence interval of half-width
// 0.05, then a one-tailed test of a shorter process (hypotheses, p value, conclusion, the largest
// sample mean that keeps H0) and the probability of a Type II error at the 5% level. Question text
// transcribed from the original paper (no diagram). The figure in f. is this site's own explanatory
// graph of the two sampling distributions (VCAA printed none). Answers checked with scipy and against
// the VCAA report's sample answers: a. 0.37, 0.04; b. 16 (n > 15.58); c. μ = 0.37, μ > 0.37;
// d.i 0.006; d.ii reject H0; e. 0.407; f. 0.4 (0.4106…). The WrongMethods in b. (z = 1.96 gives 23) and f. (the 1% cut-off gives 0.68)
// are verified slips, not taken from the report, which has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import typeIISrc from './spec-2024nhte2-q6f-type-ii.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(0.37,\ \frac{0.12^2}{9}\right)" />,
    reason: <>The concentrations are normal with <Katex tex="\mu=0.37" /> and <Katex tex="\sigma=0.12" />, so the mean of a random sample of <Katex tex="n=9" /> bottles is normal with the same mean and variance <Katex tex="\tfrac{\sigma^2}{n}" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\mathrm{E}\left(\bar X\right) = 0.37, \\ \mathrm{sd}\left(\bar X\right) = \frac{0.12}{\sqrt9} = \frac{0.12}{3} = 0.04\end{gathered}" />,
    reason: <>Sample means centre on the population mean; their standard deviation is <Katex tex="\tfrac{\sigma}{\sqrt n}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{mean } 0.37 \text{ g/L}, \quad \text{sd } 0.04 \text{ g/L}}" />,
    reason: <>Averaging nine bottles cuts the spread by a factor of <Katex tex="\sqrt9=3" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z = 1.6448\ldots" />,
    reason: <>A 90% interval leaves 5% in each tail, so <Katex tex="z" /> has 0.95 of the standard normal to its left: <Cas fn="invNorm">invNorm(0.95, 0, 1)</Cas></>,
  },
  {
    working: <Katex display tex="1.6448\ldots \times \frac{0.12}{\sqrt n} \le 0.05" />,
    reason: <>The interval is <Katex tex="\bar x \pm z\tfrac{\sigma}{\sqrt n}" />. &ldquo;Within <Katex tex="\pm0.05" /> of the sample mean&rdquo; means its half-width (the margin of error) is at most 0.05.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\sqrt n \ge \frac{1.6448\ldots\times0.12}{0.05} = 3.9476\ldots \\ \implies n \ge 15.58\ldots\end{gathered}" />,
    reason: <>Rearrange for <Katex tex="\sqrt n" />, then square both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 16}" />,
    reason: <>A sample size must be a whole number, and 15 would make the margin of error slightly too big, so round <em>up</em>, never to the nearest.</>,
    more: <>Check: with <Katex tex="n=16" />, <Katex tex="1.645\times\tfrac{0.12}{4}=0.049\le0.05" /> ✓; with <Katex tex="n=15" />, <Katex tex="1.645\times\tfrac{0.12}{\sqrt{15}}=0.051" />, just too wide.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \ \mu = 0.37, \qquad H_1: \ \mu > 0.37}" />,
    reason: <>Let <Katex tex="\mu" /> be the mean sugar concentration (g/L) of vinegar made by the shorter process. <Katex tex="H_0" /> says it is no different from the original process&apos;s 0.37. The test is for a <em>higher</em> concentration, so <Katex tex="H_1" /> is one-sided.</>,
    more: <>Hypotheses are about the population mean <Katex tex="\mu" />, never about the sample mean 0.41, which is already known.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}\bar X \sim \mathrm{N}\!\left(0.37,\ \left(\tfrac{0.12}{\sqrt{56}}\right)^2\right), \\ \mathrm{sd}\left(\bar X\right) = 0.016035\ldots\end{gathered}" />,
    reason: <>The <Katex tex="p" /> value is worked out assuming <Katex tex="H_0" /> is true, so the sample mean of 56 bottles is centred on 0.37.</>,
  },
  {
    working: <Katex display tex="p = \Pr\!\left(\bar X > 0.41 \ \middle|\ \mu = 0.37\right)" />,
    reason: <>The probability, if <Katex tex="H_0" /> is true, of a sample mean at least as high as the one observed. <Katex tex="H_1" /> is <Katex tex="\mu>0.37" />, so the upper tail.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(0.41, ∞, 0.37, 0.12/√56)</Cas>,
    reason: <>Upper tail from the observed 0.41.</>,
    more: <>Standardised: <Katex tex="z=\tfrac{0.41-0.37}{0.12/\sqrt{56}}=2.49" />, so 0.41 is about two and a half standard deviations above 0.37: unusual if <Katex tex="H_0" /> is true.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.006}" />,
    reason: <><Katex tex="p=0.00630\ldots" />, correct to three decimal places.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.006 < 0.01" />,
    reason: <>Compare the <Katex tex="p" /> value with the 1% significance level set in the stem (not the usual 5%).</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{As } p < 0.01, \text{ reject } H_0\text{:} \\ \text{there is evidence that the shorter} \\ \text{process gives a mean sugar} \\ \text{concentration greater than } 0.37 \text{ g/L}\end{gathered}}" />,
    reason: <>A <Katex tex="p" /> value below the significance level means a sample mean this high would be very unlikely if the process really gave 0.37, so <Katex tex="H_0" /> is rejected in favour of <Katex tex="H_1" />. VCAA writes &ldquo;reject <Katex tex="H_0" /> (mean is greater than 0.37)&rdquo;.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr\!\left(\bar X > c \ \middle|\ \mu = 0.37\right) = 0.01" />,
    reason: <>The higher the sample mean, the smaller its <Katex tex="p" /> value. <Katex tex="H_0" /> survives while <Katex tex="p\ge0.01" />, so the largest sample mean that keeps it is the one whose upper-tail area is exactly 0.01. Call it <Katex tex="c" />.</>,
    more: <>This is part d.i run backwards: there the sample mean was known and the tail area found; here the tail area is known and the sample mean is found.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.99, 0.37, 0.12/√56)</Cas>,
    reason: <>invNorm takes the area to the <em>left</em>, and an upper tail of 0.01 leaves 0.99 to the left.</>,
  },
  {
    working: <Katex display tex="c = 0.37 + 2.3263\ldots\times\frac{0.12}{\sqrt{56}} = 0.40730\ldots" />,
    reason: <>What the CAS gives: the cut-off sits 2.3263… standard deviations of <Katex tex="\bar X" /> above 0.37, where 2.3263… is the <Katex tex="z" /> value with 0.99 of the standard normal to its left.</>,
  },
  {
    working: <Katex display tex="\boxed{0.407 \text{ g/L}}" />,
    reason: <>Correct to three decimal places.</>,
    more: <>Consistent with part d.: the observed 0.41 is just above this cut-off, which is why <Katex tex="H_0" /> was rejected, and why the <Katex tex="p" /> value was only a little below 0.01.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr\!\left(\bar X > c \ \middle|\ \mu = 0.37\right) = 0.05" />,
    reason: <>First find where the test now draws the line. At the 5% level, <Katex tex="H_0" /> is rejected when the sample mean lands in the top 5% of its distribution under <Katex tex="H_0" />.</>,
  },
  {
    working: (
      <>
        <Cas fn="invNorm">invNorm(0.95, 0.37, 0.12/√56)</Cas>
        <Katex display tex="c = 0.39637\ldots" />
      </>
    ),
    reason: <>Keep this value unrounded for the next step.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr(\text{Type II error}) \\ &= \Pr\!\left(\bar X < 0.39637\ldots \ \middle|\ \mu = 0.40\right)\end{aligned}" />,
    reason: <>A Type II error is failing to reject <Katex tex="H_0" /> when it is false. Here <Katex tex="H_0" /> <em>is</em> false (the true mean is 0.40), and it is not rejected whenever the sample mean is below <Katex tex="c" />. So this probability uses the <em>true</em> distribution, centred on 0.40.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 0.39637…, 0.40, 0.12/√56)</Cas>,
    reason: <>Same standard deviation <Katex tex="\tfrac{0.12}{\sqrt{56}}" />; only the mean changes.</>,
  },
  {
    working: <Katex display tex="= 0.4106\ldots" />,
    reason: <>The cut-off is just below 0.40, the centre of the true distribution, so a little under half of the sample means fall below it.</>,
    more: (
      <>
        <span className="block">
          In the figure (this site&apos;s own), the blue curve is the distribution of <Katex tex="\bar X" /> if{' '}
          <Katex tex="H_0" /> were true and the orange one is the true distribution. The red line is the cut-off: the
          small blue tail beyond it (0.05) sets it, and the orange area to its left is the Type II error.
        </span>
        <span className="block mt-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={typeIISrc}
            alt="This site's own graph of two normal curves for the sample mean: blue centred at 0.37 (null hypothesis) and orange centred at 0.40 (true mean), with a dashed red cut-off at 0.3963; the blue area beyond the cut-off is 0.05 and the orange area to its left, about 0.41, is the Type II error"
            className="w-full max-w-[460px]"
          />
        </span>
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{0.4}" />,
    reason: <>Correct to one decimal place, as asked.</>,
    more: <>Plausible: a true mean of 0.40 is only about two standard deviations of <Katex tex="\bar X" /> above 0.37, so the two curves overlap a lot and the test often misses the difference. At the original 1% level the cut-off would be higher (0.407), and the Type II error larger (about 0.68).</>,
  },
]

export default function SpecialistQ6_2024NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (9 marks)</p>
        <p>
          A process to manufacture a particular type of vinegar involves the conversion of sugar. It is
          known that stopping the conversion process after four weeks results in the sugar concentration
          of the vinegar being approximately normally distributed, with a mean of 0.37 grams per litre and
          a standard deviation of 0.12 grams per litre. The vinegar is bottled for sale.
        </p>
        <p>Bottles of the vinegar are selected at random and tested for their sugar concentration.</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Every part is about <Katex tex="\bar X" />, the mean of a sample, which is normal with the same
              centre as one bottle but standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n}" />. Part b. turns
              that round to choose <Katex tex="n" />; parts c.–e. are one hypothesis test at the 1% level.
            </p>
            <p>
              Part f. changes two things at once: the level becomes 5%, which moves the cut-off, and the true
              mean is given as 0.40, which is what makes a Type II error possible to calculate. Find the cut-off
              under <Katex tex="H_0" />, then the probability under the true mean.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Sample Mean Distribution"
        marks={1}
        statement={
          <>
            Write down the mean and standard deviation of the sampling distribution for the concentration of
            sugar in a random sample of nine bottles.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Sample Size"
        marks={2}
        statement={
          <>
            What is the required minimum sample size so that there is 90% confidence that the true mean
            concentration of sugar is within <Katex tex="\pm0.05" /> of the sample mean?
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Use z = 1.96"
          working={<Katex display tex="\begin{gathered}1.96\times\frac{0.12}{\sqrt n}\le0.05 \\ \implies n\ge22.1 \implies n=23\end{gathered}" />}
        >
          1.96 belongs to a <em>95%</em> interval. For 90% confidence the middle 90% leaves 5% in each tail,
          so <Katex tex="z" /> is the 95th percentile, about 1.645.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>A shorter manufacturing process for the vinegar is proposed, which only requires three weeks.</p>
        <p>
          A random sample of 56 bottles containing the vinegar made by the shorter process has a mean sugar
          concentration of 0.41 grams per litre. A one-sided statistical test at the 1% level of significance
          will be conducted to determine whether the shorter process results in a higher sugar concentration
          than the original process. Assume that the population standard deviation is 0.12 grams per litre.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Hypotheses"
        marks={1}
        statement={<>Write down suitable null and alternative hypotheses for the statistical test.</>}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d.i"
        topic="p-Value"
        marks={1}
        statement={<>Find the <Katex tex="p" /> value for this test correct to three decimal places.</>}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Conclusion"
        marks={1}
        statement={
          <>
            Draw an appropriate conclusion about <Katex tex="H_0" /> from the <Katex tex="p" /> value found in{' '}
            <b>part d.i</b>. Give a reason involving <Katex tex="p" /> for your conclusion.
          </>
        }
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Critical Value"
        marks={1}
        statement={
          <>
            Find the largest mean concentration of sugar that could be observed from a sample of 56 bottles for
            the null hypothesis not to be rejected at the 1% level of significance.
            <br />
            Give your answer correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Type II Error"
        marks={2}
        statement={
          <>
            <p>
              Assume that the true mean concentration of sugar from the shorter process is 0.40 grams per litre
              and the standard deviation is 0.12 grams per litre. A sample of 56 bottles is taken.
            </p>
            <p className="mt-2">
              Find the probability of a Type II error for the one-sided test if the level of significance is
              changed to 5% for the test. Give your answer correct to one decimal place.
            </p>
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
        <WrongMethod
          title="Use the 1% cut-off from part e."
          working={<Katex display tex="\begin{gathered}\Pr\!\left(\bar X<0.4073\ldots \ \middle|\ \mu=0.40\right) \\ \approx0.68 \implies 0.7\end{gathered}" />}
        >
          The question changes the level to 5%, which moves the cut-off down to 0.3963…. A lower cut-off
          rejects <Katex tex="H_0" /> more easily, so the Type II error is smaller.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
