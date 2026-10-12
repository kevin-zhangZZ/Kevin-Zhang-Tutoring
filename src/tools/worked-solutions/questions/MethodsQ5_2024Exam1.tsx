// 2024 Mathematical Methods — Exam 1 Question 5 (6 marks). A hyperbolic population model,
// the transformations that halve its rate of decline, and a confidence interval. Question
// text transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [5, 95],
  average: 1.0,
  comment: <>This question was completed very well.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [69, 29, 2],
  average: 0.4,
  comment: (
    <>
      This question was not responded to well. Many students were able to list one
      transformation, usually the dilation; however, frequently the incorrect axis or
      direction was specified. Students are urged to use the correct language when referring
      to transformations.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [19, 37, 44],
  average: 1.3,
  comment: (
    <>
      Many students were able to find the standard deviation correctly. Students were not
      required to present their answer in a particular format. Some students encountered
      problems when they tried to simplify the surd expressions involving decimals and/or
      fractions. Some students incorrectly omitted brackets around the interval.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [67, 33],
  average: 0.4,
  comment: (
    <>
      This question was well attempted. Many students were able to set up an expression
      involving <Katex tex="n" /> for the standard deviation and equating that to the known
      value. Students who correctly set up the standard deviation formula were generally able
      to calculate the correct final answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="h(t) = \frac{3000}{t+1}" />,
    reason: <>The model, with t in years.</>,
  },
  {
    working: <Katex display tex="h(4) = \frac{3000}{4+1} = \frac{3000}{5}" />,
    reason: <>Four years after the start, so <Katex tex="t=4" />, not <Katex tex="t=5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{600 \ \text{people}}" />,
    reason: <>A population, so a whole number is expected.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="h'(t) = -\frac{3000}{(t+1)^2}" />,
    reason: <>"Decreases at half the rate" is a statement about the rate of change <Katex tex="h'" />, so differentiate first.</>,
    more: <>Write <Katex tex="h(t)=3000(t+1)^{-1}" /> and use the power rule (or the chain rule) to get this. It is negative because the population is falling.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} h_1'(t) &= \tfrac12h'(t) \\ &= -\frac{1500}{(t+1)^2} \\ \implies h_1(t) &= \frac{1500}{t+1}+c \end{aligned}" />,
    reason: <>Half the rate at every time means <Katex tex="h_1'=\tfrac12h'" />. Antidifferentiate, keeping the constant <Katex tex="c" />.</>,
    more: <>Reverse the power rule: <Katex tex="-1500(t+1)^{-2}" /> comes from differentiating <Katex tex="1500(t+1)^{-1}" /> (bring down the <Katex tex="-1" />, lower the power to <Katex tex="-2" />). The constant is the whole point of the question. Halving the derivative tells you the shape of <Katex tex="h_1" /> but not its height, and the tempting answer <Katex tex="h_1=\tfrac12h" /> (a dilation alone) starts at <Katex tex="1500" /> people instead of <Katex tex="3000" /> — it breaks the condition <Katex tex="h_1(0)=h(0)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} h_1(0) = h(0) &= 3000 \\ \implies 1500+c &= 3000 \\ \implies c &= 1500 \end{aligned}" />,
    reason: <><Katex tex="h(0)=\tfrac{3000}{0+1}=3000" />, and <Katex tex="h_1(0)=\tfrac{1500}{1}+c" />. The two must be equal, which fixes <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="h_1(t) = \tfrac12h(t)+1500" />,
    reason: <>Rewrite <Katex tex="h_1" /> in terms of <Katex tex="h" />: multiplying the output by <Katex tex="\tfrac12" /> is a dilation from the <Katex tex="t" />-axis; adding <Katex tex="1500" /> is a translation up.</>,
    more: <>Check: <Katex tex="h_1'(t)=\tfrac12h'(t)" /> (the <Katex tex="+1500" /> differentiates to zero) and <Katex tex="h_1(0)=1500+1500=3000" /> ✓. Both changes act on the <Katex tex="h" />-values (outside the function); nothing happens to <Katex tex="t" />. A change to <Katex tex="t" /> such as <Katex tex="h\!\left(\tfrac t2\right)" /> (a dilation by factor 2 from the <Katex tex="h" />-axis) does slow the decline, but not by exactly half at every time — its derivative is <Katex tex="\tfrac{2(t+1)^2}{(t+2)^2}" /> times <Katex tex="h'(t)" />, which is not constant.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} &\text{Dilation by factor } \tfrac12 \\ &\text{from the } t\text{-axis,} \\ &\text{then translation of } 1500 \\ &\text{units in the positive} \\ &h \text{ direction.} \end{aligned}}" />,
    reason: <>Dilate first, then translate — that order gives <Katex tex="\tfrac12h(t)+1500" />. Say which axis and which direction.</>,
    more: <>A dilation by <Katex tex="\tfrac12" /> <em>from</em> the <Katex tex="t" />-axis is the same as one <em>parallel to</em> (or in the direction of) the <Katex tex="h" />-axis, and the report accepts any of these wordings; "from the <Katex tex="h" />-axis" describes a different transformation. Order matters: translating up <Katex tex="1500" /> and then dilating would give <Katex tex="\tfrac12h(t)+750" />. The report's alternative is to translate up <Katex tex="3000" /> first, then dilate: <Katex tex="\tfrac12\bigl(h(t)+3000\bigr)=\tfrac12h(t)+1500" />. Mapping notation such as <Katex tex="(t,h)\to\left(t,\tfrac h2+1500\right)" /> is also accepted.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = \frac{60}{100} = \frac35" />,
    reason: <>The sample proportion: 60 unhappy out of <Katex tex="n=100" /> surveyed.</>,
  },
  {
    working: <Katex display tex="\hat p\pm z\sqrt{\frac{\hat p(1-\hat p)}{n}} = \frac35\pm2\sqrt{\frac{\tfrac35\cdot\tfrac25}{100}}" />,
    reason: <>The approximate confidence interval for <Katex tex="p" />: <Katex tex="\hat p" /> plus or minus <Katex tex="z" /> standard deviations, with <Katex tex="z=2" /> as the question directs.</>,
  },
  {
    working: <Katex display tex="\frac35\cdot\frac25 = \frac{6}{25} \implies \sqrt{\frac{6}{2500}} = \frac{\sqrt6}{50}" />,
    reason: <>Keep fractions: <Katex tex="\tfrac{6}{25}\div100=\tfrac{6}{2500}" />, and <Katex tex="\sqrt{2500}=50" />. This is the standard deviation of <Katex tex="\hat P" />.</>,
    more: <>The report notes that some students had trouble simplifying surd expressions involving decimals and/or fractions. In decimals this is <Katex tex="\sqrt{\tfrac{0.6\times0.4}{100}}=\sqrt{0.0024}" />, which is hard to simplify by hand; with fractions the denominator is a perfect square and the surd falls out at once.</>,
  },
  {
    working: <Katex display tex="2\cdot\frac{\sqrt6}{50} = \frac{\sqrt6}{25}" />,
    reason: <>The margin of error: <Katex tex="z" /> times the standard deviation.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\frac35-\frac{\sqrt6}{25},\ \frac35+\frac{\sqrt6}{25}\right)}" />,
    reason: <>Write the interval with brackets — the report notes some students incorrectly omitted them.</>,
    more: <>The report says no particular format was required, so <Katex tex="\left(\tfrac{15-\sqrt6}{25},\ \tfrac{15+\sqrt6}{25}\right)" /> is equally good. As a sense check, <Katex tex="\sqrt6\approx2.449" />, so the interval is about <Katex tex="(0.502,\ 0.698)" />, centred on <Katex tex="0.6" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{sd}\!\left(\hat P\right) = \sqrt{\frac{\hat p(1-\hat p)}{n}} = \sqrt{\frac{6/25}{n}}" />,
    reason: <>The same <Katex tex="\hat p=\tfrac35" />, so <Katex tex="\hat p(1-\hat p)=\tfrac{6}{25}" /> again; only <Katex tex="n" /> is unknown.</>,
  },
  {
    working: <Katex display tex="\sqrt{\frac{6}{25n}} = \frac{\sqrt2}{50}" />,
    reason: <>Set the standard deviation (not the margin of error, so no factor of <Katex tex="z" />) equal to the required value.</>,
  },
  {
    working: <Katex display tex="\frac{6}{25n} = \frac{2}{2500} \implies 25n\cdot2 = 6\cdot2500" />,
    reason: <>Square both sides to remove the surds, then cross-multiply.</>,
  },
  {
    working: <Katex display tex="\boxed{n = \frac{15\,000}{50} = 300}" />,
    reason: <>Larger samples give smaller standard deviations, so 300 is the smallest sample that brings it down to <Katex tex="\tfrac{\sqrt2}{50}" />.</>,
    more: <>Check: tripling the sample from 100 to 300 divides the standard deviation by <Katex tex="\sqrt3" />, and <Katex tex="\tfrac{\sqrt6}{50}\div\sqrt3=\tfrac{\sqrt2}{50}" /> ✓.</>,
  },
]

export default function MethodsQ5_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (6 marks)</p>
        <p>
          The function <Katex tex="h:[0,\infty)\to R" />,{' '}
          <Katex tex="h(t)=\dfrac{3000}{t+1}" />, models the population of a town after{' '}
          <Katex tex="t" /> years.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Part b. is a transformation question hiding a calculus question. "Decreases at
              half the rate" is a condition on <Katex tex="h'" />, so differentiate, halve,
              antidifferentiate, and then use <Katex tex="h_1(0)=h(0)" /> to pin the constant.
              Only then, with <Katex tex="h_1" /> written in terms of <Katex tex="h" />, are the
              transformations visible.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Function Value"
        marks={1}
        statement={
          <>
            Use the model <Katex tex="h(t)" /> to predict the population of the town after
            four years.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Transformations"
        marks={2}
        statement={
          <>
            A new function, <Katex tex="h_1" />, models a population where{' '}
            <Katex tex="h_1(0)=h(0)" /> but <Katex tex="h_1" /> decreases at half the rate of{' '}
            <Katex tex="h" /> at any point in time.
            <br />
            State a sequence of two transformations that maps <Katex tex="h" /> to this new
            model <Katex tex="h_1" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          In the town, 100 people were randomly selected and surveyed, with 60 people
          indicating that they were unhappy with the roads.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Confidence Interval"
        marks={2}
        statement={
          <>
            Determine an approximate 95% confidence interval for the proportion of people in
            the town who are unhappy with the roads. Use <Katex tex="z=2" /> for this
            confidence interval.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Sample Size"
        marks={1}
        statement={
          <>
            A new sample of <Katex tex="n" /> people results in the same sample proportion.
            <br />
            Find the smallest value of <Katex tex="n" /> to achieve a standard deviation of{' '}
            <Katex tex="\dfrac{\sqrt2}{50}" /> for the sample proportion.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>
    </div>
  )
}
