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
      completed the question. Some students did not continue to explicitly answer the
      question or state a correct conclusion.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim N(2005,\,6^2)" />,
    reason: <>One bottle. The nominal volume is <Katex tex="2" /> L <Katex tex="=2000" /> mL — keep everything in millilitres.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(2000, ∞, 2005, 6)</Cas>,
    reason: <>"At least the nominal volume" means <Katex tex="X\ge2000" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge2000) \approx 0.7977" />,
    reason: <>Equivalently <Katex tex="\Pr\!\left(Z\ge-\tfrac56\right)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{79.8\%}" />,
    reason: <>As a percentage to one decimal place, as asked — the report says many students missed one or the other.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="T = X_1+X_2+\cdots+X_{10}" />,
    reason: <>The crate total is a <em>sum</em> of ten independent bottles, not a mean of them — which is why the standard deviation grows rather than shrinks.</>,
  },
  {
    working: <Katex display tex="\mathrm{E}(T) = 10\times2005 = 20050 \text{ mL}" />,
    reason: <>Expectation adds.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(T) = 10\times6^2 = 360" />,
    reason: <>Variances add for independent variables. The report says errors frequently occurred at this step — for example, multiplying the <em>standard deviation</em> by <Katex tex="10" />, or the variance by <Katex tex="10^2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd}(T) = \sqrt{360} = \sqrt{36}\sqrt{10} = 6\sqrt{10} \text{ mL}}" />,
    reason: <>As required, about <Katex tex="18.97" /> mL.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T\ge20000) = \Pr\!\left(Z\ge\frac{20000-20050}{6\sqrt{10}}\right)" />,
    reason: <><Katex tex="20" /> L <Katex tex="=20000" /> mL.</>,
  },
  {
    working: <Katex display tex="= \Pr(Z\ge-2.635)" />,
    reason: <><Katex tex="\tfrac{-50}{18.974}" />. Further into the tail than the single-bottle case in part a. — packing ten bottles averages out the variation.</>,
  },
  {
    working: <Katex display tex="\boxed{99.6\%}" />,
    reason: <><Katex tex="0.99580" /> to one decimal place as a percentage. A big jump from <Katex tex="79.8\%" />, and that is the point of the question.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T\ge20000) \ge 0.999 \iff \Pr(T<20000)\le0.001" />,
    reason: <>Turning the requirement into a left-tail statement makes the inverse-normal step direct.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.001, 0, 1)</Cas>,
    reason: <>The <Katex tex="z" />-value with <Katex tex="0.1\%" /> below it.</>,
  },
  {
    working: <Katex display tex="z = -3.0902" />,
    reason: <>Negative, since <Katex tex="20000" /> must sit well below the mean.</>,
  },
  {
    working: <Katex display tex="\frac{20000-20050}{\mathrm{sd}(T)} = -3.0902 \implies \mathrm{sd}(T) = \frac{50}{3.0902} \approx 16.18" />,
    reason: <>Solving for the standard deviation of the <em>crate</em>.</>,
  },
  {
    working: <Katex display tex="\mathrm{sd}(T) = \sigma\sqrt{10} \implies \sigma = \frac{16.18}{\sqrt{10}}" />,
    reason: <>This is the step the report says many students missed: the answer wanted is the standard deviation of a single <em>bottle</em>, and the sample size has to be undone.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma \approx 5.1 \text{ mL}}" />,
    reason: <>One decimal place. Tighter than the current <Katex tex="6" /> mL, which is exactly what a stricter tolerance should demand.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="H_0:\ \mu = 2005 \qquad H_1:\ \mu < 2005" />,
    reason: <>One-sided, and pointing down: the authorities' concern is under-filling, and the sample mean came in below the claim.</>,
  },
  {
    working: <Katex display tex="\bar X \sim N\!\left(2005,\ \frac{2^2}{10}\right), \qquad \mathrm{sd}(\bar X) = \frac{2}{\sqrt{10}} \approx 0.6325" />,
    reason: <>A sample <em>mean</em> this time, so divide by <Katex tex="\sqrt n" /> rather than multiplying — the opposite of part b.</>,
  },
  {
    working: <Katex display tex="p = \Pr(\bar X\le2004) = \Pr\!\left(Z\le\frac{2004-2005}{0.6325}\right)" />,
    reason: <>The <Katex tex="p" />-value: the chance of a sample mean this low or lower, assuming the claim is true.</>,
  },
  {
    working: <Katex display tex="= \Pr(Z\le-1.5811) \approx 0.0569" />,
    reason: <>From CAS, <Katex tex="\texttt{normCdf}(-\infty,\,2004,\,2005,\,2/\sqrt{10})" />.</>,
  },
  {
    working: <Katex display tex="0.0569 > 0.05" />,
    reason: <>Compare with the significance level. It is close — but the rule is the rule.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Do not reject } H_0: \text{ accept the dairy's claim at the } 5\% \text{ level}}" />,
    reason: <>State the conclusion in words as well as symbols, with the reason. The report notes some students did not go on to explicitly answer the question or state a correct conclusion.</>,
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
            <Katex tex="\sigma\sqrt n" /> — more spread, because errors accumulate; the{' '}
            <strong>mean</strong> has mean <Katex tex="\mu" /> and standard deviation{' '}
            <Katex tex="\tfrac{\sigma}{\sqrt n}" /> — less spread, because errors cancel.
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
