// 2023 Mathematical Methods NHT — Exam 2, Section B Question 4 (10 marks). The NHT report gives
// sample answers only, with no statistics. A bakery: the sample proportion of vanilla cupcakes
// (mean, standard deviation, the effect of a larger sample, a binomial probability for the
// count), a symmetric interval about the mean of a normal muffin count, and a binomial
// probability for on-time deliveries. Question text transcribed from the original paper (no
// diagram). Answers checked with scipy and against the VCAA report's sample answers: a. 0.7;
// b. √21/100; c. mean unchanged, sd decreases to √21/(100√6) ≈ 0.0187; d. 0.402; e. 6.408;
// f. 0.957. Oct 30 2026 pass: added the missing b. row-2 reason, c. split step, d. count-vs-
// proportion note, e. explicit subtraction of 69. The WrongMethods in d., e. and f. are verified slips (0.541, 2.509, 0.989), not
// taken from the report, which has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}\big(\hat P\big) = p" />,
    reason: <>The sample proportion is centred on the population proportion: on average, samples get it right.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}\big(\hat P\big) = 0.7}" />,
    reason: <>70% of all the cupcakes are vanilla, so <Katex tex="p=0.7" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{sd}\big(\hat P\big) = \sqrt{\frac{p(1-p)}{n}} = \sqrt{\frac{0.7 \times 0.3}{100}}" />,
    reason: <>The standard formula for the spread of a sample proportion, with <Katex tex="p=0.7" /> and sample size <Katex tex="n=100" />.</>,
  },
  {
    working: <Katex display tex="= \sqrt{\frac{0.21}{100}} = \frac{\sqrt{0.21}}{10}" />,
    reason: <><Katex tex="0.7\times0.3=0.21" />, and <Katex tex="\sqrt{100}=10" /> comes out of the square root on the bottom.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd}\big(\hat P\big) = \frac{\sqrt{21}}{100}}" />,
    reason: <><Katex tex="\sqrt{0.21}=\tfrac{\sqrt{21}}{10}" />. Exact, since no rounding was asked for.</>,
    more: <>About 0.046: a typical sample of 100 has a proportion within roughly 0.05 of 0.7.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}\big(\hat P\big) = p = 0.7" />,
    reason: <>The mean of <Katex tex="\hat P" /> does not depend on <Katex tex="n" /> at all.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\mathrm{sd}\big(\hat P\big) &= \sqrt{\frac{0.21}{600}} = \frac{1}{\sqrt6}\sqrt{\frac{0.21}{100}} \\ &= \frac{1}{\sqrt6} \times \frac{\sqrt{21}}{100} \approx 0.0187\end{aligned}" />,
    reason: <><Katex tex="n" /> is in the denominator under the square root. Six times the sample size divides the standard deviation by <Katex tex="\sqrt6\approx2.45" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{The mean is unchanged } (0.7). \\ \text{The standard deviation} \\ \text{decreases to } \tfrac{\sqrt{21}}{100\sqrt6} \approx 0.0187.\end{gathered}}" />,
    reason: <>Two marks, so state both what happens to each and give the new standard deviation.</>,
    more: <>Larger samples are more consistent: their proportions cluster more tightly around 0.7. Note it is not divided by 6: because of the square root, halving the standard deviation takes four times the sample.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}(100,\ 0.7)" />,
    reason: <>This part asks about a <em>count</em> of cupcakes, not a proportion, so work with the count rather than <Katex tex="\hat P" />. Let <Katex tex="X" /> be the number of vanilla cupcakes in the sample. Each of the 100 is vanilla or not, with probability 0.7 each, and the bakery makes thousands, so the trials are effectively independent: binomial.</>,
  },
  {
    working: <Katex display tex="\Pr(66 < X < 72) = \Pr(67 \le X \le 71)" />,
    reason: <><Katex tex="X" /> is a whole number, so &ldquo;more than 66 and fewer than 72&rdquo; is 67, 68, 69, 70 or 71. Both endpoints are excluded.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(100, 0.7, 67, 71)</Cas>,
    reason: <>Lower and upper bounds are both included in binomCdf, so use 67 and 71.</>,
  },
  {
    working: <Katex display tex="\boxed{0.402}" />,
    reason: <><Katex tex="0.4024\ldots" />, correct to three decimal places.</>,
    more: <>Plausible: 70 is the most likely count and the five values 67–71 sit around it; each has a probability of about 0.08.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}X \sim \mathrm{N}\left(69,\ 7^2\right) \\ \Pr(69 - a \le X \le 69 + a) = 0.64\end{gathered}" />,
    reason: <>Here <Katex tex="\mu=69" />, so the interval runs from <Katex tex="69-a" /> to <Katex tex="69+a" />: it is centred on the mean.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \Pr(X < 69 - a) &= \Pr(X > 69 + a) \\ &= \frac{1 - 0.64}{2} = 0.18\end{aligned}" />,
    reason: <>The normal curve is symmetric about its mean, so the 0.36 outside the interval splits equally into two tails.</>,
  },
  {
    working: <Katex display tex="\Pr(X \le 69 + a) = 0.64 + 0.18 = 0.82" />,
    reason: <>Everything to the left of the upper endpoint: the lower tail plus the interval.</>,
  },
  {
    working: (
      <>
        <Cas fn="invNorm">invNorm(0.82, 69, 7)</Cas>
        <Katex display tex="69 + a = 75.4075\ldots" />
      </>
    ),
    reason: <>invNorm takes the area to the left.</>,
    more: <>Or standardise: <Katex tex="\Pr(Z\le\tfrac a7)=0.82" /> gives <Katex tex="\tfrac a7=0.91536\ldots" />, so <Katex tex="a=7\times0.91536\ldots" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}a = 75.4075\ldots - 69 = 6.4075\ldots \\ \boxed{a = 6.408}\end{gathered}" />,
    reason: <>Subtract the mean, then round to three decimal places.</>,
    more: <>Plausible: within one standard deviation (7) of the mean is about 0.68, and 0.64 is a little less, so <Katex tex="a" /> should be a little under 7.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="W \sim \mathrm{Bi}(20,\ 0.9)" />,
    reason: <>Let <Katex tex="W" /> be the number of the 20 deliveries on time or earlier. Each is on time with probability 0.9, independently: binomial.</>,
  },
  {
    working: <Katex display tex="\Pr(W > 15) = \Pr(W \ge 16)" />,
    reason: <>&ldquo;More than 15&rdquo; starts at 16.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(20, 0.9, 16, 20)</Cas>,
    reason: <>Sum the probabilities from 16 up to 20.</>,
  },
  {
    working: <Katex display tex="\boxed{0.957}" />,
    reason: <><Katex tex="0.9568\ldots" />, correct to three decimal places.</>,
    more: <>Plausible: the expected number on time is <Katex tex="20\times0.9=18" />, well above 15, so a probability close to 1 makes sense.</>,
  },
]

export default function MethodsQ4_2023NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (10 marks)</p>
        <p>
          A bakery makes thousands of cupcakes during their morning shift. On average, 70% of the
          cupcakes are vanilla flavoured. A large random sample of 100 cupcakes was inspected by
          the manager to calculate the proportion, <Katex tex="\hat p" />, that were vanilla
          flavoured during the morning shift.
        </p>
        <p>
          Let <Katex tex="\hat P" /> be the random variable representing the sample proportion of
          vanilla-flavoured cupcakes.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Three different random variables appear. <Katex tex="\hat P" /> is a proportion
              between 0 and 1 (parts a.–c.); the <em>count</em> of vanilla cupcakes in the same
              sample is binomial, <Katex tex="\mathrm{Bi}(100,0.7)" />, and part d. is about the
              count. The muffins (e.) are a normal variable, and the deliveries (f.) are binomial
              again.
            </p>
            <p>
              For any binomial count, read the inequality words carefully: &ldquo;more than
              66&rdquo; starts at 67, &ldquo;fewer than 72&rdquo; stops at 71.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Sample Proportion"
        marks={1}
        statement={<>State the mean of <Katex tex="\hat P" />.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Standard Deviation"
        marks={1}
        statement={<>Calculate the standard deviation of <Katex tex="\hat P" />.</>}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sample Size"
        marks={2}
        statement={
          <>
            If the sample size were 600 instead of 100, what changes, if any, would occur to the
            mean and standard deviation of the sampling distribution?
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Binomial Probability"
        marks={1}
        statement={
          <>
            What is the probability, in a sample of 100 cupcakes, that more than 66 and fewer than
            72 of the cupcakes are vanilla flavoured? Give your answer correct to three decimal
            places.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
        <WrongMethod
          title="Include 66 and 72"
          working={<Cas fn="binomCdf">binomCdf(100, 0.7, 66, 72) = 0.541</Cas>}
        >
          &ldquo;More than 66&rdquo; and &ldquo;fewer than 72&rdquo; are strict. For a whole-number
          count, a strict inequality moves the bound in by one before it goes into binomCdf.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          During the afternoon shift, the bakery makes a batch of muffins. The number of muffins
          made per batch may be modelled by a normal distribution, <Katex tex="X" />, with a mean
          of 69 and a standard deviation of 7.
        </p>
        <p>
          There is a real number, <Katex tex="a" />, such that{' '}
          <Katex tex="\Pr(\mu-a\le X\le\mu+a)=0.64" />.
        </p>
      </div>

      <PartCard
        letter="e"
        topic="Inverse Normal"
        marks={3}
        statement={<>Calculate <Katex tex="a" />. Give your answer correct to three decimal places.</>}
      >
        <WorkingTable rows={ROWS_E} />
        <WrongMethod
          title="Put 0.64 straight into invNorm"
          working={<Katex display tex="7 \times \mathrm{invNorm}(0.64) = 2.509" />}
        >
          invNorm needs the area to the <em>left</em> of a point. 0.64 is the area of a band in the
          middle, so first add the lower tail (0.18) to get the area to the left of the upper
          endpoint, 0.82.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          A local delivery company claims that there is a 90% probability that each delivery it
          makes from the bakery will arrive on time or earlier.
        </p>
        <p>Assume that each delivery is independent of all other deliveries.</p>
      </div>

      <PartCard
        letter="f"
        topic="Binomial Probability"
        marks={2}
        statement={
          <>
            Find the probability that on a day in which the delivery company makes 20 deliveries
            from the bakery, more than 15 deliveries are on time or earlier. Give your answer
            correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
        <WrongMethod
          title="Start the sum at 15"
          working={<Cas fn="binomCdf">binomCdf(20, 0.9, 15, 20) = 0.989</Cas>}
        >
          That is <Katex tex="\Pr(W\ge15)" />, &ldquo;at least 15&rdquo;. &ldquo;More than 15&rdquo;
          excludes 15 itself.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
