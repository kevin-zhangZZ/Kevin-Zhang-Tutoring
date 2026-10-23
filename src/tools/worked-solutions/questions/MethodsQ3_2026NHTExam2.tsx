// 2026 Mathematical Methods NHT — Exam 2, Section B Question 3 (15 marks). The NHT report gives
// sample answers only, with no statistics. Hiking-trail lengths: app A's piecewise probability
// density function (sketch, mean), app B's normal model (a tail probability, the 85th-percentile
// cut-off for "difficult", a binomial count of difficult trails, the sample proportion P̂ for
// n = 10 as a binomial, and a normal-approximation minimum sample size), then choosing an app at
// random (total probability and Bayes). Question text transcribed from the original paper; the
// blank axes in a.i. are cropped from the original VCAA exam PDF and the answer sketch is drawn
// with matplotlib on VCAA's grid (x 0–50, lines every 10; y 0–0.10, lines every 0.02). Answers
// checked with sympy/scipy and against the VCAA report's sample answers: a.ii. 107/6 ≈ 17.8 km;
// b.i. 0.816; b.ii. 21.7 km; b.iii. 0.276; b.iv. 0.050; b.v. n = 138; c.i. 0.609; c.ii. 0.493.
// The WrongMethod in b.iv. (Pr(W ≥ 3) = 0.180) is a verified slip, not taken from the report,
// which has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import gridSrc from './meth-2026nhte2-q3ai-grid.png'
import sketchSrc from './meth-2026nhte2-q3ai-sketch.png'

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="f(5) = \tfrac{5}{250} = 0.02, \qquad f(15) = \tfrac{15}{250} = 0.06" />,
    reason: <>On <Katex tex="5\le x\le15" />, <Katex tex="f(x)=\tfrac{x}{250}" /> is a straight line, so its two endpoints are all you need.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} \frac{(15-45)^2}{15\,000} = \frac{900}{15\,000} = 0.06 \\ \frac{(45-45)^2}{15\,000} = 0 \end{gathered}" />,
    reason: <>The second piece is part of a parabola with its turning point at <Katex tex="x=45" />. It starts at 0.06, so the graph joins up at <Katex tex="x=15" /> with no gap, and curves down to touch the <Katex tex="x" />-axis at 45.</>,
  },
  {
    working: <Katex display tex="f(x) = 0 \ \text{ for } 0 \le x < 5 \ \text{ and } 45 < x \le 50" />,
    reason: <>&ldquo;Otherwise&rdquo; covers the rest of the requested domain <Katex tex="0\le x\le50" />. These pieces lie along the <Katex tex="x" />-axis and are part of the graph too.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="Answer sketch on VCAA's grid: y = 0 from x = 0 to an open circle at (5, 0); a closed point at (5, 0.02) and a straight line up to (15, 0.06); a curve down to (45, 0) that flattens onto the x-axis; then y = 0 to (50, 0)"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Mark the jump at <Katex tex="x=5" />: an open circle at <Katex tex="(5,0)" /> and a closed one at <Katex tex="(5,0.02)" />, since <Katex tex="f(5)=0.02" />. The curve meets the axis smoothly at <Katex tex="(45,0)" /> (a parabola&apos;s turning point), not at an angle.</>,
    more: <>Check it is a valid density: the first piece is a trapezium of area <Katex tex="\tfrac12(0.02+0.06)(10)=0.4" /> and the curved piece <Katex tex="\int_{15}^{45}\tfrac{(x-45)^2}{15\,000}dx=0.6" />, total 1.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(X) = \int_{5}^{15} x\cdot\frac{x}{250}\,dx + \int_{15}^{45} x\cdot\frac{(x-45)^2}{15\,000}\,dx" />,
    reason: <>The mean of a continuous random variable is <Katex tex="\int x\,f(x)\,dx" /> over where the density is non-zero. Each piece gets its own integral.</>,
    more: <>On CAS, after <Cas fn="define">Define f(x) = …</Cas> as a piecewise function, <Cas fn="nInt">nInt(x·f(x), x, 5, 45)</Cas> does it in one step.</>,
  },
  {
    working: <Katex display tex="= \frac{13}{3} + \frac{27}{2} = \frac{107}{6}" />,
    reason: <>The first is <Katex tex="\left[\tfrac{x^3}{750}\right]_5^{15}=\tfrac{3375-125}{750}" />; the second is easiest with <Katex tex="u=x-45" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X) \approx 17.8 \text{ km}}" />,
    reason: <>One decimal place, as asked (<Katex tex="17.83\ldots" />). Sanity check: the peak density is at 15 km and the long right tail out to 45 km pulls the mean a little to the right of it.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="Y \sim \mathrm{N}\!\left(16.5,\ 5^2\right)" />,
    reason: <>Let <Katex tex="Y" /> be the length, in km, of a randomly selected app B trail.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(12, ∞, 16.5, 5)</Cas>,
    reason: <>&ldquo;Longer than 12 km&rdquo; is the area to the right of 12.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(Y > 12) \approx 0.816}" />,
    reason: <><Katex tex="0.8159\ldots" />, to three decimal places. 12 is just under one standard deviation below the mean, so a probability a bit above 0.8 is about right.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(Y > y_{\min}) = 0.15 \ \Leftrightarrow\ \Pr(Y \le y_{\min}) = 0.85" />,
    reason: <>&ldquo;The longest 15%&rdquo; puts 0.15 in the upper tail. invNorm takes the area to the <em>left</em>, which is 0.85.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.85, 16.5, 5)</Cas>,
  },
  {
    working: <Katex display tex="\boxed{y_{\min} \approx 21.7 \text{ km}}" />,
    reason: <><Katex tex="21.68\ldots" />, to one decimal place. It must be above the mean: only the long trails are difficult.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="W \sim \mathrm{Bi}(10,\ 0.15)" />,
    reason: <>Let <Katex tex="W" /> be the number of difficult trails among the 10. Each trail is difficult or not, with probability 0.15 each (the definition of difficult), and the selections are independent: a binomial setting.</>,
  },
  {
    working: <Katex display tex="\Pr(W = 2) = \binom{10}{2}(0.15)^2(0.85)^8" />,
    reason: <>&ldquo;Exactly two&rdquo; is a single binomial probability.</>,
    more: <>On CAS: <Cas fn="binomPdf">binomPdf(10, 0.15, 2)</Cas></>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(W = 2) \approx 0.276}" />,
    reason: <><Katex tex="0.2758\ldots" />. Plausible: the expected number is <Katex tex="10\times0.15=1.5" />, so 1 or 2 are the most likely counts.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P = \frac{W}{10}, \qquad W \sim \mathrm{Bi}(10,\ 0.15)" />,
    reason: <>The sample proportion is the count from part b.iii. divided by the sample size. With <Katex tex="n=10" />, use the exact binomial, not a normal approximation.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\hat P > \tfrac13\right) = \Pr\!\left(W > \tfrac{10}{3}\right) = \Pr(W \ge 4)" />,
    reason: <><Katex tex="\tfrac{10}{3}=3.33\ldots" />, and <Katex tex="W" /> is a whole number, so <Katex tex="W>3.33" /> means 4 or more.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(10, 0.15, 4, 10)</Cas>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\!\left(\hat P > \tfrac13\right) \approx 0.050}" />,
    reason: <><Katex tex="0.04996\ldots" />, which is 0.050 to three decimal places: keep the trailing zero.</>,
  },
]

const ROWS_BV: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P \approx \mathrm{N}\!\left(0.15,\ \frac{0.15\times0.85}{n}\right)" />,
    reason: <>For large <Katex tex="n" />, <Katex tex="\hat P" /> is approximately normal with mean <Katex tex="p=0.15" /> and variance <Katex tex="\tfrac{p(1-p)}{n}" />. The question tells you to use this approximation.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\hat P \ge 0.1\right) \ge 0.95" />,
    reason: <>&ldquo;10% or more of the trails are difficult&rdquo; is <Katex tex="\hat P\ge0.1" />, and this probability must be at least 0.95.</>,
  },
  {
    working: <Katex display tex="\frac{0.1 - 0.15}{\sqrt{\dfrac{0.15\times0.85}{n}}} \le -1.6448\ldots" />,
    reason: <>Standardise. An upper-tail area of at least 0.95 means 0.1 must be at or below the point with 0.05 to its left: <Katex tex="z=" /> <Cas fn="invNorm">invNorm(0.05, 0, 1)</Cas> <Katex tex="=-1.6448\ldots" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} 0.05\sqrt n \ge 1.6448\ldots\times\sqrt{0.1275} \\ n \ge 137.98\ldots \end{gathered}" />,
    reason: <>Multiply both sides by <Katex tex="-\sqrt{0.1275/n}" /> (flipping the inequality) and square: <Katex tex="n\ge\tfrac{1.6448\ldots^2\times0.1275}{0.05^2}" />.</>,
    more: <>On CAS: <Cas fn="solve">solve((0.1 − 0.15)/√(0.15×0.85/n) = invNorm(0.05, 0, 1), n)</Cas> gives 137.98…, then think about which way to round.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 138}" />,
    reason: <><Katex tex="n" /> must be a whole number at least 137.98, so round <em>up</em>. Check: with <Katex tex="n=137" /> the probability is 0.9494, just short; with 138 it is 0.9500.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(D) = \tfrac12\Pr(X > 15) + \tfrac12\Pr(Y > 15)" />,
    reason: <>Let <Katex tex="D" /> be the event that the trail is longer than 15 km. Split by which app was chosen (each with probability <Katex tex="\tfrac12" />): the law of total probability, or the two branches of a tree.</>,
  },
  {
    working: <Katex display tex="\Pr(X > 15) = \int_{15}^{45} \frac{(x-45)^2}{15\,000}\,dx = \frac{3}{5}" />,
    reason: <>App A: only the second piece of the density lies beyond 15. (Equivalently, <Katex tex="1-\Pr(X\le15)=1-0.4" />.)</>,
  },
  {
    working: <Katex display tex="\Pr(Y > 15) = 0.6179\ldots" />,
    reason: <>App B: <Cas fn="normCdf">normCdf(15, ∞, 16.5, 5)</Cas></>,
  },
  {
    working: <Katex display tex="\Pr(D) = \tfrac12\times\tfrac35 + \tfrac12\times0.6179\ldots = 0.6089\ldots" />,
  },
  {
    working: <Katex display tex="\boxed{\Pr(D) \approx 0.609}" />,
    reason: <>Three decimal places. It is the average of 0.6 and 0.618, as it must be with a 50–50 choice of app.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A \mid D) = \frac{\Pr(A \cap D)}{\Pr(D)}" />,
    reason: <>Let <Katex tex="A" /> be the event that app A was chosen. &ldquo;Given that it is longer than 15 km&rdquo; makes <Katex tex="D" /> the condition: the denominator.</>,
  },
  {
    working: <Katex display tex="= \frac{\tfrac12\times\tfrac35}{0.6089\ldots} = \frac{0.3}{0.6089\ldots}" />,
    reason: <>The numerator is just the app A branch of part c.i.; the denominator is the whole of part c.i., unrounded.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(A \mid D) \approx 0.493}" />,
    reason: <><Katex tex="0.4926\ldots" />. Just under a half, because a long trail is slightly <em>more</em> likely to come from app B (0.618 against 0.6).</>,
    more: <>Using the rounded 0.609 in the denominator gives 0.4926… as well here, but carrying the unrounded value is the safe habit.</>,
  },
]

export default function MethodsQ3_2026NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (15 marks)</p>
        <p>Two hiking apps, app A and app B, provide information about hiking trails.</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Three different random variables are in play, and keeping them apart is most of the
              question. <Katex tex="X" /> (app A) is continuous with a given density, so its
              probabilities are integrals. <Katex tex="Y" /> (app B) is normal, so its probabilities
              come from normCdf and invNorm. <Katex tex="W" />, the number of difficult trails in a
              sample, is binomial, and the sample proportion is <Katex tex="\hat P=\tfrac Wn" />.
            </p>
            <p>
              Part c. then mixes the two apps: choose an app, then a trail. That is a two-stage tree,
              with total probability for c.i. and conditional probability for c.ii.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">a.</p>
        <p>
          For app A, the distance, in kilometres, of a randomly selected hiking trail can be
          modelled by a continuous random variable <Katex tex="X" /> with probability density
          function
        </p>
        <div className="py-1">
          <Katex display tex="f(x)=\begin{cases} \dfrac{x}{250} & 5\le x\le 15 \\[10pt] \dfrac{(x-45)^2}{15\,000} & 15<x\le 45 \\[10pt] 0 & \text{otherwise} \end{cases}" />
        </div>
      </div>

      <PartCard
        letter="a.i"
        topic="Sketch PDF"
        marks={2}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              Sketch the graph of <Katex tex="y=f(x)" /> for <Katex tex="0\le x\le50" /> on the axes
              below.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={gridSrc}
                alt="Blank axes from the original 2026 NHT VCAA exam paper: x from 0 to 50 with gridlines every 10, y from 0 to 0.10 with gridlines every 0.02"
                className="w-full max-w-[520px]"
              />
            </div>
          </div>
        }
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Mean of PDF"
        marks={1}
        statement={
          <>
            Find the mean distance of the hiking trails listed on app A.
            <br />
            Give your answer in kilometres, correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          App B contains a large list of hiking trails. The distance, in kilometres, of a randomly
          selected hiking trail from app B can be modelled by a normal distribution with a mean of
          16.5 and a standard deviation of 5.
        </p>
        <p>In app B, the hiking trails that are classified as difficult are the longest 15%.</p>
      </div>

      <PartCard
        letter="b.i"
        topic="Normal Probability"
        marks={1}
        statement={
          <>
            Find the probability that a randomly selected hiking trail from app B is longer than
            12 km.
            <br />
            Give your answer correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Inverse Normal"
        marks={1}
        statement={
          <>
            Find the minimum distance for a hiking trail from app B to be classified as difficult.
            <br />
            Give your answer in kilometres, correct to one decimal place.
          </>
        }
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Binomial Probability"
        marks={2}
        statement={
          <>
            A hiker randomly selects 10 hiking trails from app B. Assume that the 10 trails are
            selected independently.
            <br />
            Find the probability that exactly two hiking trails are classified as difficult.
            <br />
            Give your answer correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="b.iv"
        topic="Sample Proportion"
        marks={2}
        statement={
          <>
            In a random sample of 10 hiking trails from app B, let <Katex tex="\hat P" /> be the
            random variable that represents the proportion of hiking trails that are classified as
            difficult. Assume that the 10 trails are selected independently.
            <br />
            Find <Katex tex="\Pr\!\left(\hat P>\tfrac13\right)" />, correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_BIV} />
        <WrongMethod
          title="Round 10/3 down to 3 and include it"
          working={<Katex display tex="\Pr(W \ge 3) = 1 - \Pr(W \le 2) \approx 0.180" />}
        >
          <Katex tex="W=3" /> gives <Katex tex="\hat P=0.3" />, which is <em>less</em> than{' '}
          <Katex tex="\tfrac13" />, so it doesn&apos;t count. Convert the proportion to a count
          first (<Katex tex="\hat P>\tfrac13\Leftrightarrow W>3.33" />), then list the whole numbers
          that satisfy it: 4, 5, …, 10.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b.v"
        topic="Sample Size"
        marks={2}
        statement={
          <>
            Consider a random sample of <Katex tex="n" /> hiking trails from app B.
            <br />
            Use a normal approximation to find the minimum value of <Katex tex="n" />, such that the
            probability that 10% or more of the trails are classified as difficult is at least 0.95
          </>
        }
      >
        <WorkingTable rows={ROWS_BV} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">c.</p>
        <p>
          A hiker randomly selects either app A or app B with equal probability. They then randomly
          select a hiking trail from that app.
        </p>
        <p>
          The probability distributions for apps A and B are those defined in <b>part a</b> and{' '}
          <b>part b</b> respectively.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Total Probability"
        marks={2}
        statement={
          <>
            Find the probability that the selected trail is longer than 15 km.
            <br />
            Give your answer correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Conditional Probability"
        marks={2}
        statement={
          <>
            Given that the selected trail is longer than 15 km, find the probability that it was
            selected from app A.
            <br />
            Give your answer correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>
    </div>
  )
}
