// 2023 Specialist Mathematics — Exam 2, Section B Question 6 (9 marks). Koala masses: a
// confidence interval, the sample size needed to shrink it, a one-tailed test, its critical
// value and the probability of a Type II error. Part h. was invalidated by VCAA. Question
// text transcribed from the original paper; the frequency-curve figure is a crop of VCAA's
// own artwork. Answers checked with scipy and against the VCAA examination report. Solution
// is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import curvesSrc from './spec-2023e2-q6h-curves.png'

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
    working: <Katex display tex="\bar x\pm z\frac{\sigma}{\sqrt n} = 11.39\pm1.9600\cdot\frac{1}{\sqrt{20}}" />,
    reason: <>A 95% interval uses <Katex tex="z=1.96" />; the population standard deviation is known, so no <Katex tex="t" />-distribution is involved.</>,
  },
  {
    working: <Katex display tex="1.9600\times\frac{1}{4.4721} = 0.4383" />,
    reason: <>The margin of error.</>,
  },
  {
    working: <Katex display tex="\boxed{(10.95,\ 11.83)}" />,
    reason: <>Two decimal places, written as an interval with brackets.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{A 95\% interval captures } \mu \text{ in 95\% of samples, in the long run}" />,
    reason: <>That is what the confidence level means — it is a statement about the procedure, not about any one interval.</>,
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
    working: <Katex display tex="\text{width} = 2z\frac{\sigma}{\sqrt n} \propto \frac{1}{\sqrt n}" />,
    reason: <>With <Katex tex="z" /> and <Katex tex="\sigma" /> fixed, only <Katex tex="n" /> moves — and it sits under a square root.</>,
  },
  {
    working: (
      <>
        <p className="text-[13.5px] mb-1">“decrease by 60%” means:</p>
        <Katex display tex="\text{new width} = 0.4\times\text{old width}" />
      </>
    ),
    reason: <>Decreasing by 60% leaves 40%, not 60% — the phrasing is the first hurdle.</>,
  },
  {
    working: <Katex display tex="\frac{1}{\sqrt{n_{\text{new}}}} = 0.4\cdot\frac{1}{\sqrt{20}} \implies \sqrt{n_{\text{new}}} = \frac{\sqrt{20}}{0.4}" />,
    reason: <>Rearranging.</>,
  },
  {
    working: <Katex display tex="n_{\text{new}} = \frac{20}{0.4^2} = \frac{20}{0.16}" />,
    reason: <>Squaring both sides. Shrinking a width by a factor costs the square of that factor in sample size.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 125 \text{ koalas}}" />,
    reason: <>More than six times the original sample for an interval less than half as wide — the usual price of precision.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{H_0: \ \mu = 12}" />,
    reason: <>The hypothesis being tested is about the population mean <Katex tex="\mu" />, so write <Katex tex="\mu=12" /> — the report notes responses such as '<Katex tex="H_0=12" />' were occasionally seen.</>,
  },
  {
    working: <Katex display tex="\boxed{H_1: \ \mu < 12}" />,
    reason: <>"The ranger thinks the true mean is less than this", and the test is one-tailed, so the alternative points downwards.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\overline{X} \sim \mathrm{N}\!\left(12,\ \frac{1^2}{40}\right) \implies \mathrm{sd} = \frac{1}{\sqrt{40}} = 0.1581" />,
    reason: <>Assuming <Katex tex="H_0" />, with <Katex tex="n=40" />.</>,
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(−∞, 11.6, 12, 1/√40)
      </Cas>
    ),
    reason: <>The lower tail, matching <Katex tex="H_1" />. By hand, <Katex tex="z=\tfrac{11.6-12}{0.1581}=-2.530" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0.0057}" />,
    reason: <>Four decimal places.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="p = 0.0057 < 0.01" />,
    reason: <>Compare the p value with the stated significance level — that comparison is the whole argument.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Reject } H_0.}" />,
    reason: <>A sample mean this low would arise under <Katex tex="H_0" /> less than 1% of the time. The reason must cite the <Katex tex="p" /> value — the report notes some students stated a correct conclusion without referencing it.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="H_0 \text{ not rejected} \iff p \ge 0.01 \iff \bar x \ge c, \text{ where } \Pr\!\left(\overline{X}<c\right) = 0.01" />,
    reason: <>The critical value is the boundary sample mean whose p value is exactly 1%.</>,
  },
  {
    working: (
      <Cas fn="invNorm">
        invNorm(0.01, 12, 1/√40)
      </Cas>
    ),
    reason: <>By hand: <Katex tex="c=12-2.3263\times0.15811" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\bar x \approx 11.632 \ \text{kg}}" />,
    reason: <>Three decimal places; <Katex tex="11.633" /> was also accepted. The observed <Katex tex="11.6" /> is below it, agreeing with part e.ii ✓</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Type II error} = \text{not rejecting } H_0 \text{ when } H_1 \text{ is true}" />,
    reason: <>So it asks for <Katex tex="\Pr\!\left(\overline{X}>11.632\right)" /> computed under the <em>true</em> mean, not under <Katex tex="H_0" />.</>,
  },
  {
    working: <Katex display tex="\overline{X} \sim \mathrm{N}\!\left(11.4,\ \frac{1}{40}\right) \ \text{ under the true mean}" />,
    reason: <>Same sample size and standard deviation; only the centre moves.</>,
  },
  {
    working: (
      <Cas fn="normCdf">
        normCdf(11.632, ∞, 11.4, 1/√40)
      </Cas>
    ),
    reason: <>The upper tail above the critical value: <Katex tex="z=\tfrac{11.632-11.4}{0.15811}=1.467" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(\text{Type II error}) \approx 0.071}" />,
    reason: <>Three decimal places; <Katex tex="0.070" /> was also accepted, depending on how <Katex tex="11.632" /> was rounded in part f.</>,
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

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Two ideas carry the whole question. First, the width of a confidence interval goes
            like <Katex tex="1/\sqrt n" />, so shrinking it to a fraction <Katex tex="f" />{' '}
            costs <Katex tex="1/f^2" /> times the sample — that is part c., which the report
            notes was challenging for students.
          </p>
          <p>
            Second, a Type II error is computed under the <em>alternative</em>, not the null.
            Find the critical value from <Katex tex="H_0" /> (part f.), then ask how likely a
            sample from the true distribution is to land on the wrong side of it (part g.).
          </p>
        </Background>
      </div>

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
          <img
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
