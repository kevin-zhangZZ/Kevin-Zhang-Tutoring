// 2025 Mathematical Methods NHT — Exam 2, Section B Question 4 (13 marks). The NHT report gives
// sample answers only, with no statistics. Insurance claims: a continuous random variable with
// density 8/(9x⁴) for x ≥ 2/3 (mean, a tail probability, a conditional probability, a binomial
// count of large claims, at least one large claim from two cars), then normal settlement times
// (a probability, an invNorm, a confidence interval for a proportion) and a sketch of a second
// normal density on the axes of the first. Question text transcribed from the original paper (the
// 2025 NHT paper has no text layer, so it was read from rendered pages). The axes with the T_A
// density are cropped from the original VCAA exam PDF (300 dpi), and the c.iv. answer is an SVG
// overlay on that crop (never a redrawing). Calibration measured from the crop: t = 0 at
// x = 102.28 px, 32.044 px per day (from the tick marks 5–50); y = 0 at row 896.5, and the printed
// N(32, 7²) peak fixes 8835 px per unit of density; checked with a PIL composite — the calibrated
// N(32, 7²) curve lies on VCAA's printed one. Answers checked with sympy/scipy and against the VCAA
// report's sample answers: a. 1; b.i. 1/27; b.ii. 1/8; b.iii. 0.051; b.iv. 0.0148; c.i. 0.968;
// c.ii. 50; c.iii. (0.902, 0.998). The WrongMethod in b.iv. is a verified slip, not taken from the
// report, which has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { functionToPath } from '../graphUtils'
import axesSrc from './meth-2025nhte2-q4civ-axes.png'

const ORANGE = '#f97316'
const LABEL = { fontSize: 44, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const
const normal = (t: number, m: number, s: number) => Math.exp(-((t - m) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI))
const gx = (t: number) => 102.28 + t * 32.044
const gy = (y: number) => 896.5 - y * 8835

// Part c.iv.: the N(25, 5²) density drawn on VCAA's axes beside the printed N(32, 7²) one.
function DensityOverlay() {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[560px]">
        <img loading="lazy" decoding="async" src={axesSrc} alt="VCAA's axes with the N(32, 7²) density, with the answer drawn over it: an orange bell curve centred at t = 25, about 1.4 times as tall and visibly narrower, crossing the printed curve near t = 29.5" className="w-full block" />
        <svg viewBox="0 0 1857 1047" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <path d={functionToPath((t) => normal(t, 25, 5), 0, 53, gx, gy, 400)} fill="none" stroke={ORANGE} strokeWidth={8} />
          <line x1={gx(25)} y1={gy(0)} x2={gx(25)} y2={gy(normal(25, 25, 5))} stroke={ORANGE} strokeWidth={4} strokeDasharray="14 10" />
          <text x={gx(25) - 40} y={gy(normal(25, 25, 5)) + 10} textAnchor="end" {...LABEL}>
            T<tspan baselineShift="sub" fontSize={32}>B</tspan>
          </text>
        </svg>
      </div>
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm E(X) = \int_{2/3}^{\infty} x\times\frac{8}{9x^4}\,dx = \frac89\int_{2/3}^{\infty} x^{-3}\,dx" />,
    reason: <>The mean of a continuous random variable is <Katex tex="\int x f(x)\,dx" /> over the region where <Katex tex="f" /> is non-zero.</>,
  },
  {
    working: <Katex display tex="= \frac89\left[-\frac{1}{2x^2}\right]_{2/3}^{\infty} = \frac89\left(0+\frac{1}{2\times\frac49}\right) = \frac89\times\frac98" />,
    reason: <><Katex tex="-\tfrac{1}{2x^2}\to0" /> as <Katex tex="x\to\infty" />.</>,
    more: <>On CAS: <Cas fn="nInt">∫(x·f(x), x, 2/3, ∞)</Cas> gives the same.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm E(X) = 1}" />,
    reason: <>That is, $1000. Plausible: the smallest possible claim is <Katex tex="\tfrac23" /> (about $667), and the density falls away fast, so the mean sits not far above it.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X>2) = \int_2^{\infty}\frac{8}{9x^4}\,dx = \frac89\left[-\frac{1}{3x^3}\right]_2^{\infty}" />,
    reason: <>A probability for a continuous random variable is the area under the density.</>,
  },
  {
    working: <Katex display tex="= \frac89\times\frac{1}{24} = \boxed{\frac{1}{27}}" />,
    reason: <>VCAA also accepts <Katex tex="0.\overline{037}" />. Large claims are rare: under 4%.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \Pr(X>4 \mid X>2) &= \frac{\Pr(X>4 \cap X>2)}{\Pr(X>2)} \\ &= \frac{\Pr(X>4)}{\Pr(X>2)} \end{aligned}" />,
    reason: <>Conditional probability. Every claim over $4000 is also over $2000, so the intersection is just <Katex tex="X>4" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X>4) = \frac89\left[-\frac{1}{3x^3}\right]_4^{\infty} = \frac89\times\frac{1}{192} = \frac{1}{216}" />,
  },
  {
    working: <Katex display tex="\frac{1/216}{1/27} = \frac{27}{216} = \boxed{\frac18}" />,
    reason: <>The denominator is part b.i. VCAA also accepts 0.125.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="L \sim \mathrm{Bi}\!\left(10,\ \tfrac{1}{27}\right)" />,
    reason: <>Let <Katex tex="L" /> be the number of large claims among the 10. A random sample gives independent claims, each large or not, each with probability <Katex tex="\tfrac1{27}" /> from part b.i.: binomial.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \Pr(L\ge2) &= 1-\Pr(L=0)-\Pr(L=1) \\ &= 1-\left(\tfrac{26}{27}\right)^{10} \\ &\quad -10\left(\tfrac1{27}\right)\left(\tfrac{26}{27}\right)^{9} \end{aligned}" />,
    reason: <>&ldquo;More than one&rdquo; means at least 2; the complement is quicker than adding <Katex tex="\Pr(L=2)" /> to <Katex tex="\Pr(L=10)" />.</>,
    more: <>On CAS: <Cas fn="binomCdf">binomCdf(10, 1/27, 2, 10)</Cas></>,
  },
  {
    working: <Katex display tex="= 0.05065\ldots \approx \boxed{0.051}" />,
    reason: <>Correct to three decimal places. Small, as it should be with only a 1 in 27 chance per claim.</>,
  },
]

const ROWS_BIV: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{a car has a large claim}) = 0.2\times\tfrac1{27} = \tfrac1{135}" />,
    reason: <>For one car to produce a large claim, a claim must be made (0.2) <em>and</em> it must be large (<Katex tex="\tfrac1{27}" />). These are independent, so multiply.</>,
  },
  {
    working: <Katex display tex="C \sim \mathrm{Bi}\!\left(2,\ \tfrac1{135}\right)" />,
    reason: <>Let <Katex tex="C" /> be the number of the two cars with a large claim. The cars are independent, with the same probability each.</>,
  },
  {
    working: <Katex display tex="\Pr(C\ge1) = 1-\Pr(C=0) = 1-\left(\tfrac{134}{135}\right)^2" />,
    reason: <>&ldquo;At least one&rdquo;: one minus &ldquo;none&rdquo;.</>,
  },
  {
    working: <Katex display tex="= 0.014759\ldots \approx \boxed{0.0148}" />,
    reason: <>Correct to four decimal places.</>,
    more: <>VCAA also shows the long way: add the probabilities of one large claim and no claim, one large and one not large, and two large: <Katex tex="0.01185\ldots+0.00285\ldots+0.000054\ldots=0.0148" />.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="T_A \sim \mathrm N\!\left(32,\ 7^2\right)" />,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 45, 32, 7)</Cas>,
    reason: <>The area to the left of 45 under the normal curve.</>,
  },
  {
    working: <Katex display tex="\Pr(T_A<45) = 0.96835\ldots \approx \boxed{0.968}" />,
    reason: <>45 is <Katex tex="\tfrac{45-32}{7}\approx1.86" /> standard deviations above the mean, so a probability a little under 0.975 (the value at 2 standard deviations) is right.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T_A\le k) = 0.995" />,
    reason: <>&ldquo;99.5% of claims within <Katex tex="k" /> days&rdquo;: the area to the left of <Katex tex="k" /> is 0.995.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.995, 32, 7)</Cas>,
  },
  {
    working: <Katex display tex="k = 50.03\ldots \approx \boxed{50}" />,
    reason: <>Correct to the nearest whole number. About 2.58 standard deviations above the mean.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = \tfrac{76}{80} = 0.95" />,
    reason: <>The sample proportion of claims paid.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\hat p \pm 1.96\sqrt{\frac{\hat p(1-\hat p)}{n}} \\ &= 0.95 \pm 1.96\sqrt{\frac{0.95\times0.05}{80}} \end{aligned}" />,
    reason: <>Approximate 95% confidence interval for a population proportion, with <Katex tex="z\approx1.96" /> and <Katex tex="n=80" />.</>,
  },
  {
    working: <Katex display tex="= 0.95 \pm 0.04776\ldots" />,
  },
  {
    working: <Katex display tex="\boxed{(0.902,\ 0.998)}" />,
    reason: <>Each end correct to three decimal places. The interval is centred on 0.95 and stays below 1, as a proportion must.</>,
  },
]

const ROWS_CIV: WorkingRow[] = [
  {
    working: <Katex display tex="T_B \sim \mathrm N\!\left(25,\ 5^2\right): \text{ centre at } t=25" />,
    reason: <>A normal density is symmetric about its mean, so the peak is at <Katex tex="t=25" />, 7 days to the left of <Katex tex="T_A" />'s peak at 32.</>,
  },
  {
    working: <Katex display tex="\frac{\text{peak of } T_B}{\text{peak of } T_A} = \frac{1/(5\sqrt{2\pi})}{1/(7\sqrt{2\pi})} = \frac75" />,
    reason: <>The peak height of <Katex tex="\mathrm N(\mu,\sigma^2)" /> is <Katex tex="\tfrac{1}{\sigma\sqrt{2\pi}}" />. A smaller standard deviation squeezes the curve narrower, and since the total area must stay 1, it gets taller: 1.4 times as tall.</>,
  },
  {
    working: <DensityOverlay />,
    reason: <>The <Katex tex="T_B" /> curve: peak above <Katex tex="t=25" />, 1.4 times the height of the printed peak, narrower (most of it within <Katex tex="25\pm15" />, from about 10 to 40), and close to the axis by about <Katex tex="t=10" /> and <Katex tex="t=40" />.</>,
    more: <>The two curves cross where the densities are equal, near <Katex tex="t\approx29.5" />. VCAA's sample sketch shows the same features: centred at 25, higher and narrower than <Katex tex="T_A" />.</>,
  },
]

export default function MethodsQ4_2025NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (13 marks)</p>
        <p>
          A claim is a request to an insurance company for payment after an incident.
          <br />
          Company A offers car insurance. Let <Katex tex="X" /> be a random variable representing the
          claim amount, in thousands of dollars, for each claim to insurance company A.
          <br />
          The probability density function of <Katex tex="X" /> is given by
        </p>
        <Katex display tex="f(x)=\begin{cases} \dfrac{8}{9x^4} & x\ge\dfrac23 \\[2mm] 0 & \text{otherwise}\end{cases}" />
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Part b. builds up in layers: one probability from the density (b.i.), then that
              probability reused as the &ldquo;success&rdquo; chance in a conditional (b.ii.) and two
              binomial settings (b.iii., b.iv.). Get <Katex tex="\Pr(X>2)=\tfrac1{27}" /> right
              and carry it through exactly.
            </p>
            <p>
              Part c. is standard normal and proportion work, finishing with what the two parameters
              of a normal distribution <em>do</em> to its graph: the mean moves it, the standard
              deviation stretches it.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Expected Value"
        marks={1}
        statement={<>Find the mean claim amount, <Katex tex="\mathrm E(X)" />, in thousands of dollars.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          A claim of more than $2000 (that is, <Katex tex="X>2" />) is classified as large.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Continuous Probability"
        marks={1}
        statement={<>Find the probability that a claim is classified as large.</>}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Conditional Probability"
        marks={2}
        statement={<>Given that a claim is classified as large, find the probability that it is more than $4000.</>}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Binomial Probability"
        marks={2}
        statement={
          <>
            In a random sample of 10 claims, find the probability that more than one claim is
            classified as large.
            <br />
            Give your answer correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard
        letter="b.iv"
        topic="Binomial Probability"
        marks={2}
        statement={
          <>
            A household has two cars insured with company A.
            <br />
            For each car, there is a 20% chance that a claim will be made next year, independent of the
            other car. The claim amounts are also independent.
            <br />
            At most one claim can be made per car next year.
            <br />
            Find the probability that next year in this household there is <b>at least one</b> claim
            classified as large (that is, <Katex tex="X>2" />).
            <br />
            Give your answer correct to four decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_BIV} />
        <WrongMethod
          title="Forget that a claim might not be made at all"
          working={<Katex display tex="1-\left(\tfrac{26}{27}\right)^2 \approx 0.0727" />}
        >
          <Katex tex="\tfrac1{27}" /> is the chance a claim is large <em>given</em> that a claim is
          made. Each car only claims with probability 0.2, so a car produces a large claim with
          probability <Katex tex="0.2\times\tfrac1{27}" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">c.</p>
        <p>
          Let <Katex tex="T_A" /> be a random variable that approximates the time taken, in days, for
          company A to settle a claim.
          <br />
          Suppose <Katex tex="T_A" /> follows a normal distribution with a mean of 32 days and a
          standard deviation of 7 days.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Normal Probability"
        marks={1}
        statement={
          <>
            Find <Katex tex="\Pr(T_A<45)" />.
            <br />
            Give your answer correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Inverse Normal"
        marks={1}
        statement={
          <>
            Company A settles 99.5% of claims within <Katex tex="k" /> days.
            <br />
            Find the value of <Katex tex="k" />.
            <br />
            Give your answer correct to the nearest whole number.
          </>
        }
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            Company B also offers car insurance. In a random sample of 80 claims to company B, 76 were
            paid.
            <br />
            Find the approximate 95% confidence interval for the proportion of claims paid by company B.
            <br />
            Give your answer correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_CIII} />
      </PartCard>

      <PartCard
        letter="c.iv"
        topic="Normal Distribution Graph"
        marks={2}
        statement={
          <>
            Let <Katex tex="T_B" /> be a random variable that approximates the time taken, in days, for
            company B to settle a claim.
            <br />
            Suppose <Katex tex="T_B" /> follows a normal distribution with a mean of 25 days and a
            standard deviation of 5 days.
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit my-3">
              <img
                loading="lazy"
                decoding="async"
                src={axesSrc}
                alt="Axes with t in days from 0 to 50 and a bell-shaped curve, the N(32, 7²) density, peaking at t = 32 — from the original 2025 NHT VCAA exam paper"
                className="w-full max-w-[560px]"
              />
            </div>
            The probability density function for <Katex tex="T_A\sim\mathrm N\!\left(32,7^2\right)" /> is
            shown on the axes above.
            <br />
            Sketch the probability density function for <Katex tex="T_B\sim\mathrm N\!\left(25,5^2\right)" /> on
            the same set of axes.
          </>
        }
      >
        <WorkingTable rows={ROWS_CIV} />
      </PartCard>
    </div>
  )
}
