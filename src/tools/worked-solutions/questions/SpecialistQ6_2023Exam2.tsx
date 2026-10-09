// 2023 Specialist Mathematics — Exam 2, Section B Question 6 (9 marks). Koala masses: a
// confidence interval, the sample size needed to shrink it, a one-tailed test, its critical
// value and the probability of a Type II error. Part h. was invalidated by VCAA. Question
// text transcribed from the original paper; the frequency-curve figure is a crop of VCAA's
// own artwork. Answers checked with scipy and against the VCAA examination report. Solution
// is original. Widgets: part c. (spec-2023e2-q6c-root-n — the width falls like 1/√n, so 40% of
// the width needs 6.25 times the sample) and part g. (spec-2023e2-q6g-type-two — the Type II
// area is under the true curve, on the keep-H₀ side of the cut-off). Concise/Detailed review
// (Oct 2026): checks, traps and longer explanations moved into rows' `more`; part g. working
// now shows the decision rule and Pr(X̄ ≥ 11.632) as their own lines.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import curvesSrc from './spec-2023e2-q6h-curves.png'

const RootNWidget = lazyWidget(() => import('../interactives/spec-2023e2-q6c-root-n'))
const TypeTwoWidget = lazyWidget(() => import('../interactives/spec-2023e2-q6g-type-two'))

const EXAM_A: SAExaminerStats = {
  marks: [16, 84],
  average: 0.8,
  comment: (
    <>
      This routine question was handled well. Many students recognised that the confidence
      interval should be expressed with brackets in the form <Katex tex="(a,b)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = { marks: [42, 58], average: 0.6 }

const EXAM_C: SAExaminerStats = {
  marks: [72, 28],
  average: 0.3,
  comment: <>This question was challenging for students.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [12, 88],
  average: 0.9,
  comment: (
    <>
      Students were generally successful with this question. Incorrect responses such as '
      <Katex tex="H_0=12,\ H_1<12" />' were occasionally seen.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = { marks: [20, 80], average: 0.8 }

const EXAM_EII: SAExaminerStats = {
  marks: [22, 78],
  average: 0.8,
  comment: (
    <>
      Some students stated a correct conclusion but did not give a reason by referencing the{' '}
      <Katex tex="p" /> value.
    </>
  ),
}

const EXAM_F: SAExaminerStats = { marks: [40, 60], average: 0.6 }

const EXAM_G: SAExaminerStats = { marks: [61, 39], average: 0.4 }

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\left(\bar x - z\frac{\sigma}{\sqrt n},\ \bar x + z\frac{\sigma}{\sqrt n}\right),\quad z = 1.96" />,
    reason: <>The formula sheet&apos;s interval for <Katex tex="\mu" />, with the known <Katex tex="\sigma = 1" /> in place of <Katex tex="s" />. For 95% confidence <Katex tex="z=1.96" />. Here <Katex tex="\bar x = 11.39" /> and <Katex tex="n = 20" />.</>,
    more: <>Why 1.96: the middle 95% of the standard normal lies between <Katex tex="-1.96" /> and <Katex tex="1.96" />, leaving 2.5% in each tail.</>,
  },
  {
    working: <Katex display tex="1.96\times\frac{1}{\sqrt{20}} \approx 0.4383" />,
    reason: <>The margin of error: how far each end of the interval sits from <Katex tex="\bar x" />.</>,
  },
  {
    working: <Katex display tex="(11.39 - 0.4383,\ 11.39 + 0.4383)" />,
    reason: <>Subtract and add the margin of error.</>,
  },
  {
    working: <Katex display tex="\boxed{(10.95,\ 11.83)}" />,
    reason: <>Two decimal places, written as an interval with brackets.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{interval contains } \mu) = 0.95" />,
    reason: <>The true mean <Katex tex="\mu" /> is one fixed number, but every sample gives a different interval. &ldquo;95% confidence&rdquo; means that 95% of intervals built this way contain <Katex tex="\mu" />, so 95% of the 60 intervals are expected to.</>,
    more: <>Why not &ldquo;a 95% chance that <Katex tex="\mu" /> is in my interval&rdquo;? Once one interval has been calculated, <Katex tex="\mu" /> is either in it or not, because <Katex tex="\mu" /> is not random. The 95% describes the method: over many samples, about 95% of the intervals it produces catch <Katex tex="\mu" />. That long-run reading is exactly what this question asks about.</>,
  },
  {
    working: <Katex display tex="0.95\times60 = 57" />,
    reason: <>The expected number.</>,
  },
  {
    working: <Katex display tex="\boxed{57 \text{ of the } 60 \text{ intervals}}" />,
    reason: <>Expected, not guaranteed — the actual number varies from one set of 60 samples to the next.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} = 2\times1.96\times\frac{1}{\sqrt n}" />,
    reason: <>The interval runs from <Katex tex="\bar x - 1.96\tfrac{\sigma}{\sqrt n}" /> to <Katex tex="\bar x + 1.96\tfrac{\sigma}{\sqrt n}" />, so its width is twice the margin of error, with <Katex tex="\sigma = 1" />. Only <Katex tex="n" /> can change, and it sits under a square root.</>,
    more: <>1.96 is fixed by the 95% level and <Katex tex="\sigma = 1" /> is known. The sample mean <Katex tex="\bar x" /> does not appear in the width at all: it only moves where the interval sits, not how wide it is.</>,
  },
  {
    working: (
      <>
        <p className="text-[13.5px] mb-1">“decrease by 60%” means:</p>
        <Katex display tex="\text{new width} = 0.4\times\text{old width}" />
      </>
    ),
    reason: <>Decreasing by 60% leaves 40% of the width, not 60%.</>,
    more: <>The phrasing is the first hurdle. Reading it as &ldquo;new width <Katex tex="= 0.6\times" /> old width&rdquo; is a decrease <em>by 40%</em>, and leads to <Katex tex="n = \tfrac{20}{0.6^2} \approx 55.6" />, so 56 koalas: the right method aimed at the wrong target.</>,
  },
  {
    working: (
      <>
        <Katex display tex="2\times1.96\times\frac{1}{\sqrt{n}} = 0.4\times2\times1.96\times\frac{1}{\sqrt{20}}" />
        <Katex display tex="\frac{1}{\sqrt{n}} = \frac{0.4}{\sqrt{20}} \implies \sqrt{n} = \frac{\sqrt{20}}{0.4}" />
      </>
    ),
    reason: <>The old width used <Katex tex="n = 20" />. Cancel <Katex tex="2\times1.96" /> from both sides, then flip both sides over.</>,
  },
  {
    working: <Katex display tex="n = \frac{20}{0.4^2} = \frac{20}{0.16} = 125" />,
    reason: <>Square both sides. Because <Katex tex="n" /> is under a square root, multiplying the width by <Katex tex="0.4" /> needs <Katex tex="1/0.4^2 = 6.25" /> times the sample.</>,
    more: (
      <>
        <p>
          The tempting shortcut is <Katex tex="20 \div 0.4 = 50" />, which is 2.5 times the sample. That treats the
          width as if it fell like <Katex tex="\tfrac{1}{n}" />. With <Katex tex="n = 50" /> the width only falls to{' '}
          <Katex tex="\sqrt{20/50} \approx 63\%" /> of the original, nowhere near 40%.
        </p>
        <p>
          A quick way to set the whole thing up: <Katex tex="\tfrac{\text{new width}}{\text{old width}} = \sqrt{\tfrac{20}{n}}" />,
          so <Katex tex="\sqrt{\tfrac{20}{n}} = 0.4" /> gives <Katex tex="\tfrac{20}{n} = 0.16" /> and <Katex tex="n = 125" />.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{n = 125 \text{ koalas}}" />,
    reason: <>125 is already a whole number, so no rounding is needed.</>,
    more: <>Had it not been whole, round <em>up</em>: a smaller sample would leave the interval slightly wider than the target.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \ \mu = 12}" />,
    reason: <>Hypotheses are statements about the population mean <Katex tex="\mu" />, so <Katex tex="\mu" /> must appear: <Katex tex="H_0" /> gives the claimed value, 12 kg.</>,
    more: <>Writing &lsquo;<Katex tex="H_0=12,\ H_1<12" />&rsquo;, the incorrect response the report mentions, leaves out <Katex tex="\mu" />, so it never says <em>what</em> equals 12.</>,
  },
  {
    working: <Katex display tex="\boxed{H_1: \ \mu < 12}" />,
    reason: <>&ldquo;The ranger thinks that the true mean mass is less than this&rdquo;, and the test is one-tailed, so the alternative points downwards.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X} \sim \mathrm{N}\!\left(12,\ \frac{1^2}{40}\right) \implies \mathrm{sd} = \frac{1}{\sqrt{40}} = 0.1581" />,
    reason: <>A <Katex tex="p" /> value is always worked out assuming <Katex tex="H_0" /> is true, so the mean is 12. The sample mean of <Katex tex="n=40" /> masses has standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n}" />.</>,
  },
  {
    working: <Katex display tex="p = \Pr\!\left(\overline{X} < 11.6\right)" />,
    reason: <>The <Katex tex="p" /> value is the chance of a sample mean at least as low as the one observed. Lower tail, because <Katex tex="H_1" /> says <Katex tex="\mu < 12" />.</>,
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(−∞, 11.6, 12, 1/√40)
      </Cas>
    ),
    reason: <>Lower bound <Katex tex="-\infty" />, upper bound 11.6, then the <Katex tex="H_0" /> mean 12 and the standard deviation <Katex tex="\tfrac{1}{\sqrt{40}}" /> from the first line.</>,
    more: <>As a check, <Katex tex="z=\tfrac{11.6-12}{0.1581}\approx-2.530" />, and <Katex tex="\Pr(Z<-2.530)\approx0.0057" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0.0057}" />,
    reason: <>Four decimal places.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.0057 < 0.01" />,
    reason: <>Compare the <Katex tex="p" /> value with the 1% significance level, 0.01.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{As } p < 0.01, \text{ reject } H_0.}" />,
    reason: <>The question asks for a reason, so write the comparison <Katex tex="p < 0.01" /> in the answer, not just the conclusion.</>,
    more: <>What it means: if the mean really were 12 kg, a sample mean as low as 11.6 kg would happen less than 1% of the time. That is strong enough evidence (at the 1% level) that the mean mass is less than 12 kg.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="H_0 \text{ not rejected} \iff p \ge 0.01 \iff \bar x \ge c" />
        <Katex display tex="\text{where } \Pr\!\left(\overline{X}<c\right) = 0.01" />
      </>
    ),
    reason: <>The lower the sample mean, the smaller its <Katex tex="p" /> value. So the critical value <Katex tex="c" /> is the sample mean whose <Katex tex="p" /> value is exactly 0.01: the value with 1% of the <Katex tex="H_0" /> distribution below it.</>,
  },
  {
    working: (
      <Cas fn="invNorm">
        invNorm(0.01, 12, 1/√40)
      </Cas>
    ),
    reason: <>Still assuming <Katex tex="H_0" />: <Katex tex="\overline{X}\sim\mathrm{N}\!\left(12,\ \tfrac{1}{40}\right)" /> as in part e.i. invNorm gives the value with area 0.01 to its left.</>,
    more: <>As a check, the standard normal has 1% below <Katex tex="-2.3263" />, so <Katex tex="c=12-2.3263\times0.15811\approx11.632" />.</>,
  },
  {
    working: <Katex display tex="\boxed{c \approx 11.632 \ \text{kg}}" />,
    reason: <>Three decimal places; <Katex tex="11.633" /> was also accepted.</>,
    more: <>Check: the observed <Katex tex="11.6" /> is below 11.632, so <Katex tex="H_0" /> is rejected, agreeing with part e.ii ✓</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Type II error} = \text{not rejecting } H_0 \text{ when } H_0 \text{ is false}" />,
    reason: <>Here <Katex tex="H_0" /> is false, because the true mean is 11.4, not 12.</>,
  },
  {
    working: <Katex display tex="H_0 \text{ not rejected when } \bar x \ge 11.632" />,
    reason: <>The decision rule from part f. It was set using <Katex tex="H_0" />, so it stays the same whatever the true mean is.</>,
    more: <>The critical value 11.632 is the cut-off between keeping and rejecting <Katex tex="H_0" />. The ranger never knows the true mean, so the cut-off can only come from <Katex tex="H_0" /> and the 1% level. What the true mean of 11.4 changes is how likely a sample mean is to land on each side of it.</>,
  },
  {
    working: <Katex display tex="\overline{X} \sim \mathrm{N}\!\left(11.4,\ \frac{1}{40}\right) \ \text{ under the true mean}" />,
    reason: <>Same sample size and standard deviation; only the centre moves. The probability is worked out with the <em>true</em> mean, not with <Katex tex="H_0" />&apos;s mean of 12.</>,
    more: <>Keeping <Katex tex="H_0" />&apos;s distribution <Katex tex="\mathrm{N}\!\left(12,\ \tfrac{1}{40}\right)" /> here would give <Katex tex="\Pr\!\left(\overline{X} \ge 11.632\right) = 0.990" />: the chance of keeping <Katex tex="H_0" /> when it is <em>true</em>, which is a correct decision, not an error. A Type II error can only happen when <Katex tex="H_0" /> is false, so it must use the true distribution.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{Type II error}) = \Pr\!\left(\overline{X} \ge 11.632\right)" />,
    reason: <>The upper tail, because <Katex tex="H_0" /> is kept when <Katex tex="\bar x \ge 11.632" />.</>,
    more: <>The other side, <Katex tex="\Pr\!\left(\overline{X} < 11.632\right) \approx 0.929" /> under the true mean, is the chance the test correctly rejects <Katex tex="H_0" />. The Type II probability is what is left: <Katex tex="1 - 0.929 = 0.071" />.</>,
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(11.632, ∞, 11.4, 1/√40)
      </Cas>
    ),
    reason: <>Lower bound 11.632, upper bound <Katex tex="\infty" />, now with the true mean 11.4; the standard deviation is still <Katex tex="\tfrac{1}{\sqrt{40}}" />.</>,
    more: <>As a check, <Katex tex="z=\tfrac{11.632-11.4}{0.15811}\approx1.467" />, and <Katex tex="\Pr(Z\ge1.467)\approx0.071" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(\text{Type II error}) \approx 0.071}" />,
    reason: <>Three decimal places; <Katex tex="0.070" /> was also accepted.</>,
    more: <>The unrounded critical value from part f. gives 0.0710 and 11.632 gives 0.0711, both 0.071; the accepted 0.070 is what 11.633 gives.</>,
  },
]

export default function SpecialistQ6_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (9 marks)</p>
        <p>
          A forest ranger wishes to investigate the mass of adult male koalas in a Victorian
          forest. A random sample of 20 such koalas has a sample mean of 11.39 kg.
          <br />
          It is known that the mass of adult male koalas in the forest is normally distributed with a
          standard deviation of 1 kg.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Two ideas carry the whole question. First, the width of a confidence interval goes
              like <Katex tex="1/\sqrt n" />, so shrinking it to a fraction <Katex tex="k" />{' '}
              costs <Katex tex="1/k^2" /> times the sample — that is part c., which the report
              notes was challenging for students.
            </p>
            <p>
              Second, a Type II error needs two distributions. <Katex tex="H_0" />&apos;s
              (mean 12) fixes the critical value in part f.; the <em>true</em> one (mean 11.4)
              gives the probability, in part g., that a sample mean lands on the wrong side of it.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            Find a 95% confidence interval for the population mean (the mean mass of all adult
            male koalas in the forest). Give your values correct to two decimal places.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            Sixty such random samples are taken and their confidence intervals are calculated.
            <br />
            In how many of these confidence intervals would the actual mean mass of all adult
            male koalas in the forest be expected to lie?
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The ranger wants to decrease the width of the 95% confidence interval by 60% to get a
          better estimate of the population mean.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="Sample Size"
        marks={1}
        statement={
          <>How many adult male koalas should be sampled to achieve this?</>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="The width falls like 1/√n — so 40% of the width needs 6.25 times the sample">
          <RootNWidget />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          It is thought that the mean mass of adult male koalas in the forest is 12 kg. The
          ranger thinks that the true mean mass is less than this and decides to apply a
          one-tailed statistical test. A random sample of 40 adult male koalas is taken and
          the sample mean is found to be 11.6 kg.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Hypotheses"
        marks={1}
        statement={
          <>
            Write down the null hypothesis, <Katex tex="H_0" />, and the alternative
            hypothesis, <Katex tex="H_1" />, for the test.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The ranger decides to apply the one-tailed test at the 1% level of significance and
          assumes the mass of adult male koalas in the forest is normally distributed with a
          mean of 12 kg and a standard deviation of 1 kg.
        </p>
      </div>

      <PartCard
        letter="e.i"
        topic="p-Value"
        marks={1}
        statement={
          <>
            Find the <Katex tex="p" /> value for the test correct to four decimal places.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Conclusion"
        marks={1}
        statement={
          <>
            Draw a conclusion about the null hypothesis in <b>part d.</b> from the{' '}
            <Katex tex="p" /> value found above, giving a reason for your conclusion.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Critical Value"
        marks={1}
        statement={
          <>
            What is the critical sample mean (the smallest sample mean for <Katex tex="H_0" />{' '}
            not to be rejected) in this test? Give your answer in kilograms correct to three
            decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Suppose that the true mean mass of adult male koalas in the forest is 11.4 kg, and the
          standard deviation is 1 kg. The level of significance of the test is still 1%.
        </p>
      </div>

      <PartCard
        letter="g"
        topic="Type II Error"
        marks={1}
        statement={
          <>
            What is the probability, correct to three decimal places, of the ranger making a
            type II error in the statistical test?
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
        <Explore title="A Type II error is the true curve's area on the 'keep H₀' side of the cut-off">
          <TypeTwoWidget />
        </Explore>
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-700 dark:text-gray-300">h. (1 mark)</p>
        <p>
          The frequency curves for the sampling distributions associated with{' '}
          <Katex tex="H_0" /> and <Katex tex="H_1" /> are shown below.
          <br />
          Label the critical sample mean on the diagram and shade the region that represents
          the type II error.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={curvesSrc}
            alt="Two overlapping bell curves on an x-bar axis: H1 centred near 11.4 and H0 centred at 12 — from the original 2023 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
        <p>
          <strong>VCAA invalidated this question.</strong> The report: 'Following the
          identification of an error in the question stimuli, this question was invalidated.'
          Every student was awarded the mark. Had it stood, the answer would
          have been to mark <Katex tex="11.632" /> from part f. on the axis and shade the area
          under the <Katex tex="H_1" /> curve to the <em>right</em> of it — the 0.071 computed
          in part g.
        </p>
      </div>
    </div>
  )
}
