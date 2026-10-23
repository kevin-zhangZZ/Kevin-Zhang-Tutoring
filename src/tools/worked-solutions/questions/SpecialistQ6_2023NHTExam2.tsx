// 2023 Specialist NHT — Exam 2, Section B Question 6 (9 marks). The NHT report gives sample
// answers only, with no statistics and no comments. Mineral-water bottles, volume N(750, 2²): the
// sampling distribution of the mean of 10 (sd √10/5), the chance a sample mean below 749 triggers
// a query when μ = 750 and the chance it doesn't when μ = 749.5, that second distribution sketched
// and shaded on VCAA's axes, then a one-tailed test (hypotheses, p value 0.04, conclusion) and the
// critical sample mean 748.96. Question text transcribed from the original paper. The normal curve
// is VCAA's own figure, cropped from page 23 of the original VCAA exam PDF at 300 dpi
// (spec-2023nhte2-q6c-curve.png); the c.i and c.ii answers are SVG overlays on it, calibrated from
// the tick marks measured on the crop (x̄ = 750 at 720.5 px, 228.6 px per mL, axis at y = 654.5,
// peak height 625.5 px). A PIL composite confirmed VCAA's printed curve is exactly the
// N(750, (2/√10)²) density at that scale, so the c.i curve is the same density centred at 749.5.
// Answers checked with scipy and against the report's sample answers, which agree: a. 750;
// b.i 0.0569; b.ii 0.7854; d. H0: μ = 750, H1: μ < 750; e.i 0.04; f. 748.96. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import curveSrc from './spec-2023nhte2-q6c-curve.png'

// Calibration of VCAA's axis in the crop's own pixels (1310 × 740).
const X750 = 720.5
const SX = 228.6
const BASE = 654.5
const PEAK = 625.5
const SD = 2 / Math.sqrt(10)
const ORANGE = '#f97316'
const LABEL = { fontSize: 40, fill: '#c2410c', stroke: 'white', strokeWidth: 10, paintOrder: 'stroke' } as const
const px = (x: number) => X750 + (x - 750) * SX
const py = (x: number, mu: number) => BASE - PEAK * Math.exp(-((x - mu) ** 2) / (2 * SD * SD))

function curvePoints(from: number, to: number, mu: number) {
  const pts: string[] = []
  const n = 160
  for (let i = 0; i <= n; i++) {
    const x = from + ((to - from) * i) / n
    pts.push(`${px(x).toFixed(1)},${py(x, mu).toFixed(1)}`)
  }
  return pts
}

function NewCurve({ shade }: { shade: boolean }) {
  const left = 746.95
  const right = 752.15
  const top = curvePoints(749, right, 749.5)
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
      <div className="relative w-full max-w-[440px]">
        <img loading="lazy" decoding="async" src={curveSrc}
          alt={shade
            ? "VCAA's normal curve centred at 750 with the answer drawn over it: a second, identical bell curve centred at 749.5, with the area under it to the right of 749 shaded"
            : "VCAA's normal curve centred at 750 with the answer drawn over it: a second bell curve of the same shape and height, shifted half a unit left so its peak is at 749.5"}
          className="w-full block" />
        <svg viewBox="0 0 1310 740" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {shade && (
            <>
              <polygon points={`${px(749)},${BASE} ${top.join(' ')} ${px(right)},${BASE}`} fill={ORANGE} fillOpacity={0.3} />
              <line x1={px(749)} y1={BASE} x2={px(749)} y2={py(749, 749.5)} stroke={ORANGE} strokeWidth={5} />
            </>
          )}
          <polyline points={curvePoints(left, right, 749.5).join(' ')} fill="none" stroke={ORANGE} strokeWidth={7} />
          <text x={px(749.5) - 30} y={60} textAnchor="end" {...LABEL}>μ = 749.5</text>
        </svg>
      </div>
    </div>
  )
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}\left(\bar X\right) = \mu = 750 \text{ mL}" />,
    reason: <>The mean of the sampling distribution of <Katex tex="\bar X" /> is the population mean.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}\left(\bar X\right) = \frac{\sigma}{\sqrt n} = \frac{2}{\sqrt{10}}" />,
    reason: <>The standard deviation of a sample mean is <Katex tex="\tfrac{\sigma}{\sqrt n}" />, with <Katex tex="\sigma=2" /> and <Katex tex="n=10" />.</>,
  },
  {
    working: <Katex display tex="\boxed{= \frac{2}{\sqrt{10}}\times\frac{\sqrt{10}}{\sqrt{10}} = \frac{2\sqrt{10}}{10} = \frac{\sqrt{10}}{5} \text{ mL}}" />,
    reason: <>Rationalise the denominator to reach the given form. As required.</>,
    more: <>As a decimal, <Katex tex="\tfrac{\sqrt{10}}{5}\approx0.632" /> mL: averaging 10 bottles shrinks the spread from 2 mL to under a third of that.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(750,\ \left(\tfrac{\sqrt{10}}{5}\right)^2\right)" />,
    reason: <>The volumes are normal, so the sample mean is exactly normal, with the mean and standard deviation from part a.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 749, 750, √10/5)</Cas>,
    reason: <>They query the claim when the sample mean is less than 749: the area to the left of 749.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\left(\bar X<749 \mid \mu=750\right) \approx 0.0569}" />,
    reason: <><Katex tex="0.05692\ldots" />, correct to four decimal places.</>,
    more: <>This is the chance of querying a claim that is actually true. 749 is about 1.58 standard deviations of <Katex tex="\bar X" /> below 750, so a tail of roughly 6% is the right size.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(749.5,\ \left(\tfrac{\sqrt{10}}{5}\right)^2\right)" />,
    reason: <>Now the true mean is 749.5 mL. The standard deviation of the bottles is unchanged, so the spread of <Katex tex="\bar X" /> is still <Katex tex="\tfrac{\sqrt{10}}{5}" />.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(749, ∞, 749.5, √10/5)</Cas>,
    reason: <>They do <b>not</b> query when the sample mean is at least 749: the area to the right of 749.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\left(\bar X\ge749 \mid \mu=749.5\right) \approx 0.7854}" />,
    reason: <><Katex tex="0.78540\ldots" />, correct to four decimal places.</>,
    more: <>The claim is false here, yet the inspectors would miss it nearly four times in five: a true mean only half a millilitre low is hard to detect with samples of 10. Whether the boundary 749 itself is included makes no difference for a continuous distribution.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(749.5,\ \left(\tfrac{\sqrt{10}}{5}\right)^2\right)" />,
    reason: <>The same distribution as part b.ii: the mean moves to 749.5, the standard deviation stays the same.</>,
  },
  {
    working: <NewCurve shade={false} />,
    reason: <>So the new curve is the printed one translated 0.5 to the left: the same shape and the same height, with its peak above 749.5, halfway between 749 and 750.</>,
    more: <>The height must match: the peak of a normal curve is <Katex tex="\tfrac{1}{\sigma\sqrt{2\pi}}" />, which depends only on the standard deviation. A taller or flatter curve would show a different standard deviation.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <NewCurve shade />,
    reason: <>Part b.ii found <Katex tex="\Pr\left(\bar X\ge749\right)" /> when <Katex tex="\mu=749.5" />: the area under the <b>new</b> curve to the right of 749. Shade from 749 to the right, under the curve from part c.i.</>,
    more: <>Shading under the printed curve centred at 750 would show a different probability, the chance of not querying when the claim is true. The shaded region covers most of the new curve, consistent with 0.7854.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \ \mu = 750, \qquad H_1: \ \mu < 750}" />,
    reason: <>Let <Katex tex="\mu" /> be the mean volume (in mL) of all bottles produced. <Katex tex="H_0" /> is the manufacturer&apos;s claim. The test is one-sided, and the concern throughout is bottles being under-filled (a sample mean below a cut-off triggers a query), so <Katex tex="H_1" /> is <Katex tex="\mu<750" />.</>,
    more: <>Hypotheses are statements about the population mean <Katex tex="\mu" />, never about <Katex tex="\bar x" />.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="p = \Pr\left(\bar X < 748.9 \mid \mu = 750\right)" />,
    reason: <>The <Katex tex="p" /> value is the probability, assuming <Katex tex="H_0" />, of a sample mean at least as extreme as the one observed. <Katex tex="H_1" /> is <Katex tex="\mu<750" />, so extreme means <em>low</em>: the lower tail.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 748.9, 750, √10/5)</Cas>,
    reason: <>The sampling distribution under <Katex tex="H_0" />, from part a.</>,
  },
  {
    working: <Katex display tex="\boxed{p \approx 0.04}" />,
    reason: <><Katex tex="0.04099\ldots" />, correct to two decimal places.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="p \approx 0.04 < 0.05" />,
    reason: <>Compare the <Katex tex="p" /> value with the 5% significance level.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{As } p<0.05, \text{ reject } H_0\text{: there is evidence} \\ \text{that the mean volume is less than } 750 \text{ mL}\end{gathered}}" />,
    reason: <>A sample mean this low would happen only about 4% of the time if the claim were true, which is less than the 5% the inspectors allow for, so there is evidence against the manufacturer&apos;s claim.</>,
    more: <>The conclusion should be in context, about the mean volume of mineral water, and should rest on the comparison of <Katex tex="p" /> with 0.05, which is what the question asks for.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr\left(\bar X < c \mid \mu = 750\right) = 0.05" />,
    reason: <>A sample mean is rejected when its lower-tail area is below 0.05. The cut-off <Katex tex="c" /> is the sample mean whose lower-tail area is exactly 0.05; any sample mean above it is not rejected.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.05, 750, √10/5)</Cas>,
    reason: <>invNorm takes the area to the left, which is exactly what we have.</>,
  },
  {
    working: <Katex display tex="\boxed{c \approx 748.96 \text{ mL}}" />,
    reason: <><Katex tex="748.9597\ldots" />, correct to two decimal places.</>,
    more: <>Consistent with part e.: the observed 748.9 is below 748.96, and it was rejected. This is <Katex tex="750-1.645\times\tfrac{\sqrt{10}}{5}" />.</>,
  },
]

export default function SpecialistQ6_2023NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (9 marks)</p>
        <p>
          A manufacturer produces bottles of mineral water. The volume of mineral water in each
          bottle is normally distributed with a claimed population mean of 750 mL and a known
          standard deviation of 2 mL. Quality control inspectors take random samples of 10 bottles.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Every part is about <Katex tex="\bar X" />, the mean volume of a sample of 10 bottles,
              whose distribution is <Katex tex="\mathrm{N}\!\left(\mu,\tfrac{\sigma^2}{n}\right)" />.
              Only the centre <Katex tex="\mu" /> changes from part to part: 750 when the claim is
              true, 749.5 in parts b.ii and c.
            </p>
            <p>
              Parts b. and c. look at a decision rule (query if <Katex tex="\bar x<749" />) from both
              sides: how often it wrongly queries a true claim, and how often it misses a false one.
              Parts d. to f. are a formal one-tailed test at the 5% level.
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
            For samples of 10 bottles, state the mean of the sampling distribution and show that
            the standard deviation of the sampling distribution is{' '}
            <Katex tex="\dfrac{\sqrt{10}}{5}" /> mL. Assume that the mean volume of mineral water in
            all bottles produced is 750 mL as claimed.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          The inspectors will query the manufacturer&apos;s claim that the mean volume of mineral
          water in all bottles produced is 750 mL if the mean volume in 10 randomly selected bottles
          is less than 749 mL.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Normal Probability"
        marks={1}
        statement={
          <>
            What is the probability that the inspectors will query the manufacturer&apos;s claim?
            Give your answer correct to four decimal places. Assume that the mean volume of mineral
            water in all bottles produced is 750 mL.
          </>
        }
      >
        <WorkingTable rows={ROWS_BI} />
        <WrongMethod
          title="Use the bottles' standard deviation, 2 mL"
          working={<Katex display tex="\Pr(X<749) \text{ with } \mathrm{sd}=2 \implies 0.3085" />}
        >
          That is the chance that a <em>single</em> bottle holds less than 749 mL. The query is
          triggered by the mean of 10 bottles, whose standard deviation is{' '}
          <Katex tex="\tfrac{\sqrt{10}}{5}" />, from part a.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Type II Error"
        marks={1}
        statement={
          <>
            What is the probability that the inspectors will <b>not</b> query the
            manufacturer&apos;s claim if the mean volume of mineral water in all bottles produced is
            in fact 749.5 mL and not the claimed 750 mL? Give your answer correct to four decimal
            places.
          </>
        }
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">c.</p>
        <p>
          The graph shown below represents the sampling distribution of the mean for samples of 10
          bottles, where the population mean is 750 mL and the standard deviation is 2 mL.
        </p>
        <img loading="lazy" decoding="async" src={curveSrc}
          alt="VCAA's graph: a normal bell curve over an x̄ axis marked 748 to 752 in steps of 1 with minor ticks every 0.25, peaking above 750"
          className="w-full max-w-[440px] mt-1 bg-white rounded-lg" />
      </div>

      <PartCard
        letter="c.i"
        topic="Sketch Distribution"
        marks={1}
        statement={
          <>
            On the axes above, for samples of 10 bottles, sketch the graph of the sampling
            distribution if the population mean is in fact 749.5 mL and the standard deviation is
            2 mL.
          </>
        }
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Shade Probability"
        marks={1}
        statement={<>On the axes above, shade the area that represents the probability found in <b>part b.ii.</b></>}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The inspectors decide to apply a one-sided statistical test at the 5% level of
          significance to determine whether to reject or not reject the manufacturer&apos;s claimed
          mean of 750 mL.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Hypotheses"
        marks={1}
        statement={<>Write down suitable null and alternative hypotheses for this test.</>}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          In applying the statistical test, the inspectors find that the mean volume of mineral
          water in a random sample of 10 bottles is 748.9 mL. Assume that the mean for the
          population is 750 mL and the standard deviation is 2 mL.
        </p>
      </div>

      <PartCard
        letter="e.i"
        topic="p-Value"
        marks={1}
        statement={<>Find the <Katex tex="p" /> value for the test, correct to two decimal places.</>}
      >
        <WorkingTable rows={ROWS_EI} />
        <WrongMethod
          title="Double the tail as if the test were two-sided"
          working={<Katex display tex="2\times\Pr\left(\bar X<748.9\right) \approx 0.08" />}
        >
          The test is one-sided (part d.), so only the lower tail counts. Doubling here would also
          flip the conclusion in part e.ii, since 0.08 is above 0.05.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Conclusion"
        marks={1}
        statement={<>Use the <Katex tex="p" /> value found in <b>part e.i.</b> to justify an appropriate conclusion about the claim.</>}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Critical Value"
        marks={1}
        statement={
          <>
            For samples of 10 bottles, find the smallest sample mean above which the inspectors
            would not reject the claim of 750 mL at the 5% level of significance. Give your answer
            in millilitres, correct to two decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
