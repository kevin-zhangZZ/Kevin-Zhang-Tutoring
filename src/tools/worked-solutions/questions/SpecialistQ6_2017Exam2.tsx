// 2017 Specialist Mathematics — Exam 2, Section B, Question 6 (9 marks).
// Bottle-filling: a normal probability, the distribution of a sum of ten, a tolerance
// requirement solved backwards for the standard deviation, and a one-sided test on a
// sample mean. Question text transcribed from the original paper (no diagram given).
// Answers verified with scipy. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: (
    <>
      While responses indicated that this question was understood, many students either did
      not express their answer as a percentage or did not give the required level of
      accuracy.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [18, 28, 54],
  average: 1.4,
  comment: (
    <>
      The mean was calculated correctly by most students. Errors frequently occurred when
      calculating the variance, leading to students being unable to show the given standard
      deviation.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: <>A significant proportion of otherwise correct answers were not given in the required form.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [46, 14, 24, 16],
  average: 1.1,
  comment: (
    <>
      While some students were able to find <Katex tex="z=-3.090" />, many did not account
      for the sample size in subsequent calculations.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [35, 20, 45],
  average: 1.1,
  comment: (
    <>
      A majority of students obtained a correct <Katex tex="p" />-value and correctly
      completed the question. Some students not continue to explicitly answer the
      question or state a correct conclusion.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim N(2005,\,6^2)" />,
    reason: <>Let <Katex tex="X" /> mL be the volume in one bottle. The nominal volume is <Katex tex="2" /> L <Katex tex="=2000" /> mL, so work in millilitres throughout.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(2000, ∞, 2005, 6)</Cas>,
    reason: <>"At least the nominal volume" means <Katex tex="X\ge2000" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge2000) \approx 0.7977" />,
    reason: <>Equivalently <Katex tex="\Pr\!\left(Z\ge-\tfrac56\right)" />, since <Katex tex="2000" /> is <Katex tex="\tfrac56" /> of a standard deviation below the mean.</>,
  },
  {
    working: <Katex display tex="\boxed{79.8\%}" />,
    reason: <>Convert to a percentage and round to one decimal place — both are required.</>,
    more: <>The report says many students either did not express their answer as a percentage or did not give the required level of accuracy, so <Katex tex="0.7977" /> or <Katex tex="80\%" /> would not earn the mark.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="T = X_1+X_2+\cdots+X_{10}" />,
    reason: <>The crate total <Katex tex="T" /> is a <em>sum</em> of ten independent bottle volumes, each distributed like <Katex tex="X" />.</>,
    more: <>Note <Katex tex="T\ne10X" />: ten different bottles are ten independent variables, not one bottle's volume counted ten times.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(T) = 10\times2005 = 20050 \text{ mL}" />,
    reason: <>Expected values add: ten lots of <Katex tex="\mathrm{E}(X)=2005" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(T) = 10\times6^2 = 360" />,
    reason: <>For independent variables, variances (not standard deviations) add: ten lots of <Katex tex="\mathrm{Var}(X)=6^2" />.</>,
    more: <>The report says errors frequently occurred when calculating the variance. The two common slips are multiplying the <em>standard deviation</em> by <Katex tex="10" />, and treating <Katex tex="T" /> as <Katex tex="10X" />, which multiplies the variance by <Katex tex="10^2" />. Both give a standard deviation of <Katex tex="60" /> mL instead of <Katex tex="6\sqrt{10}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd}(T) = \sqrt{360} = \sqrt{36}\sqrt{10} = 6\sqrt{10} \text{ mL}}" />,
    reason: <>Square root of the variance, simplified exactly. As required.</>,
    more: <>Numerically <Katex tex="6\sqrt{10}\approx18.97" /> mL.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="T\sim N\!\left(20050,\,(6\sqrt{10})^2\right)" />,
    reason: <>A sum of independent normal variables is itself normal, with the mean and standard deviation from part b.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(20000, ∞, 20050, 6√10)</Cas>,
    reason: <><Katex tex="20" /> L <Katex tex="=20000" /> mL, and "at least" means <Katex tex="T\ge20000" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(T\ge20000) &= \Pr\!\left(Z\ge\frac{20000-20050}{6\sqrt{10}}\right)\\ &= \Pr(Z\ge-2.635) \approx 0.9958\end{aligned}" />,
    reason: <>The same probability found by standardising, which shows where the CAS value comes from.</>,
    more: <>Compare part a. One bottle's margin above the nominal volume is <Katex tex="5" /> mL against a standard deviation of <Katex tex="6" /> mL (<Katex tex="0.83" /> standard deviations). A crate's margin is <Katex tex="50" /> mL against only <Katex tex="18.97" /> mL (<Katex tex="2.64" /> standard deviations). The margin grows ten-fold but the spread only <Katex tex="\sqrt{10}" />-fold (the partial cancelling described in the part a. Background), so a crate is far safer than a bottle.</>,
  },
  {
    working: <Katex display tex="\boxed{99.6\%}" />,
    reason: <>As a percentage, to one decimal place.</>,
    more: <>The report says a significant proportion of otherwise correct answers were not given in the required form — <Katex tex="0.996" /> is not a percentage.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="T\sim N\!\left(20050,\,(\sigma\sqrt{10})^2\right)" />,
    reason: <>Let <Katex tex="\sigma" /> mL be the machine's standard deviation per bottle. As in part b, the crate's standard deviation is <Katex tex="\sigma\sqrt{10}" />.</>,
    more: <>The crate mean stays <Katex tex="10\times2005=20050" /> mL because the question says the machine's mean remains <Katex tex="2005" /> mL. Only the spread is unknown.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\Pr(T\ge20000) \ge 0.999 \\ &\iff \Pr(T<20000)\le0.001\end{aligned}" />,
    reason: <>Rewrite as a left-tail probability for inverse normal. The largest allowable <Katex tex="\sigma" /> makes this exactly <Katex tex="0.001" />.</>,
    more: <>A larger <Katex tex="\sigma" /> spreads the crates out and puts more of them below <Katex tex="20000" /> mL. Any <Katex tex="\sigma" /> above the one giving exactly <Katex tex="0.001" /> breaks the regulation and any below it meets it, so that boundary value is the maximum. Inverse normal on CAS works with the area to the left, hence the rewrite.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.001, 0, 1)</Cas>,
    reason: <>The standard normal value with <Katex tex="0.1\%" /> of the area to its left.</>,
  },
  {
    working: <Katex display tex="z = -3.0902" />,
    reason: <>Negative, since <Katex tex="20000" /> lies below the crate mean of <Katex tex="20050" />.</>,
  },
  {
    working: <Katex display tex="\frac{20000-20050}{\mathrm{sd}(T)} = -3.0902" />,
    reason: <>Standardise the boundary <Katex tex="20000" /> and set it equal to that <Katex tex="z" />-value.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(T) = \frac{50}{3.0902} \approx 16.18" />,
    reason: <>This is the largest allowable standard deviation of a <em>crate</em> total, not of a bottle.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\sigma\sqrt{10} &= 16.18\\ \sigma &= \frac{16.18}{\sqrt{10}} \approx 5.117\end{aligned}" />,
    reason: <>The question asks about the bottle-filling machine, so undo the <Katex tex="\sqrt{10}" /> from part b.</>,
    more: <>The report says many students did not account for the sample size in subsequent calculations — for example stopping at <Katex tex="16.18" />, or dividing by <Katex tex="10" /> instead of <Katex tex="\sqrt{10}" />. Divide the stored CAS value of <Katex tex="\mathrm{sd}(T)" /> (<Katex tex="16.1800\ldots" />) rather than a rounded one.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 5.1 \text{ mL}}" />,
    reason: <>In millilitres, to one decimal place.</>,
    more: <>Sense check: this is smaller than the current <Katex tex="6" /> mL, as it should be. Part c. showed that at <Katex tex="6" /> mL only <Katex tex="99.6\%" /> of crates reach the nominal volume, short of the required <Katex tex="99.9\%" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="H_0:\ \mu = 2005 \qquad H_1:\ \mu < 2005" />,
    reason: <>Let <Katex tex="\mu" /> mL be the nearby factory's mean fill. One-sided downwards: the authorities' concern is under-filling (and the sample mean is below <Katex tex="2005" />).</>,
    more: <>The null hypothesis is the claim being tested. The direction of <Katex tex="H_1" /> comes from the context, not from the sample: customers lose out only if bottles are under-filled.</>,
  },
  {
    working: <Katex display tex="\bar X \sim N\!\left(2005,\ \left(\tfrac{2}{\sqrt{10}}\right)^2\right)" />,
    reason: <>Assuming <Katex tex="H_0" />, the mean of a sample of <Katex tex="10" /> has standard deviation <Katex tex="\tfrac{2}{\sqrt{10}}\approx0.6325" /> (the claimed sd of <Katex tex="2" /> mL, divided by <Katex tex="\sqrt{n}" />).</>,
  },
  {
    working: <Katex display tex="p = \Pr(\bar X\le2004 \mid \mu=2005)" />,
    reason: <>The <Katex tex="p" />-value: the chance of a sample mean this low or lower, if the claim is true.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 2004, 2005, 2/√10)</Cas>,
    reason: <>The lower tail, because <Katex tex="H_1" /> is <Katex tex="\mu<2005" />.</>,
  },
  {
    working: <Katex display tex="p \approx 0.0569" />,
    reason: <>Equivalently <Katex tex="\Pr(Z\le-1.581)" />, since <Katex tex="\tfrac{2004-2005}{0.6325}\approx-1.581" />.</>,
  },
  {
    working: <Katex display tex="0.0569 > 0.05" />,
    reason: <>Compare the <Katex tex="p" />-value with the <Katex tex="5\%" /> significance level. It is close, but not below.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{Do not reject } H_0\text{:}\\ \text{accept the dairy's claim at the } 5\% \text{ level}\end{gathered}}" />,
    reason: <>Because <Katex tex="p>0.05" />, a sample mean of <Katex tex="2004" /> is not unusual enough to reject the claim. State the conclusion in words.</>,
    more: <>The report says some students did not go on to explicitly answer the question or state a correct conclusion. The question asks whether the claim should be accepted, so finish with that sentence and its reason (<Katex tex="p>0.05" />), not just the <Katex tex="p" />-value. "Do not reject" means the sample is not enough evidence against the claim, so, in the question's words, the claim is accepted.</>,
  },
]

export default function SpecialistQ6_2017Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (9 marks)</p>
        <p>
          A dairy factory produces milk in bottles with a nominal volume of <Katex tex="2" />{' '}
          L per bottle. To ensure most bottles contain at least the nominal volume, the
          machine that fills the bottles dispenses volumes that are normally distributed with
          a mean of <Katex tex="2005" /> mL and a standard deviation of <Katex tex="6" /> mL.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Normal Distribution"
        marks={1}
        statement={
          <>
            Find the percentage of bottles that contain at least the nominal volume of milk,
            correct to one decimal place.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Sum, or mean?">
          <p>
            This question uses both, and the difference decides three of its parts. For{' '}
            <Katex tex="n" /> independent copies of <Katex tex="X" />:
          </p>
          <p>
            the <strong>sum</strong> has mean <Katex tex="n\mu" /> and standard deviation{' '}
            <Katex tex="\sigma\sqrt n" /> — the spread grows, but only{' '}
            <Katex tex="\sqrt n" />-fold rather than <Katex tex="n" />-fold, because over- and
            under-fills partly cancel; the <strong>mean</strong> has mean <Katex tex="\mu" /> and
            standard deviation <Katex tex="\tfrac{\sigma}{\sqrt n}" /> — less spread than one
            bottle.
          </p>
          <p>
            Parts b.–d. are about a crate total, so <Katex tex="\times\sqrt{10}" />. Part e.
            is about a sample mean, so <Katex tex="\div\sqrt{10}" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Bottles of milk are packed in crates of <Katex tex="10" /> bottles, where the
          nominal total volume per crate is <Katex tex="20" /> L.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Linear Combination"
        marks={2}
        statement={
          <>
            Show that the total volume of milk contained in each crate varies with a mean of{' '}
            <Katex tex="20050" /> mL and a standard deviation of <Katex tex="6\sqrt{10}" />{' '}
            mL.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Normal Distribution"
        marks={1}
        statement={
          <>
            Find the percentage, correct to one decimal place, of crates that contain at
            least the nominal volume of <Katex tex="20" /> L.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Find Standard Deviation"
        marks={3}
        statement={
          <>
            Regulations require at least <Katex tex="99.9\%" /> of crates to contain at least
            the nominal volume of <Katex tex="20" /> L. Assuming the mean volume dispensed by
            the machine remains <Katex tex="2005" /> mL, find the maximum allowable standard
            deviation of the bottle-filling machine needed to achieve this outcome. Give your
            answer in millilitres, correct to one decimal place.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          A nearby dairy factory claims the milk dispensed into its <Katex tex="2" /> L
          bottles varies normally with a mean of <Katex tex="2005" /> mL and a standard
          deviation of <Katex tex="2" /> mL. When authorities visit the nearby dairy factory
          and check a random sample of <Katex tex="10" /> bottles of milk, they find the mean
          volume to be <Katex tex="2004" /> mL.
        </p>
      </div>

      <PartCard
        letter="e"
        topic="Hypothesis Test"
        marks={2}
        statement={
          <>
            Assuming that the standard deviation of <Katex tex="2" /> mL is correct, carry
            out a one-sided statistical test and determine, stating a reason, whether the
            nearby dairy's claim should be accepted at the <Katex tex="5\%" /> level of
            significance.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
