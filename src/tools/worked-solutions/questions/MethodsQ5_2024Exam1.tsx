// 2024 Mathematical Methods — Exam 1 Question 5 (6 marks). A hyperbolic population model,
// the transformations that halve its rate of decline, and a confidence interval. Question
// text transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
    reason: <>The rate of decline. "Decreases at half the rate" is a statement about <Katex tex="h'" />, so start there.</>,
  },
  {
    working: <Katex display tex="h_1'(t) = \tfrac12h'(t) = -\frac{1500}{(t+1)^2} \implies h_1(t) = \frac{1500}{t+1}+c" />,
    reason: <>Antidifferentiating. Halving the derivative halves the numerator and leaves an unknown constant.</>,
  },
  {
    working: <Katex display tex="h_1(0) = h(0) = 3000 \implies 1500+c = 3000 \implies c = 1500" />,
    reason: <>The second condition fixes the constant.</>,
  },
  {
    working: <Katex display tex="h_1(t) = \tfrac12h(t)+1500" />,
    reason: <>Now read the transformations off the rule.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Dilation by factor } \tfrac12 \text{ from the } t\text{-axis, then translation } 1500 \text{ units in the positive } h \text{ direction.}}" />,
    reason: <>Name the axis precisely: a dilation by <Katex tex="\tfrac12" /> <em>from</em> the <Katex tex="t" />-axis is the same as one <em>parallel to</em> the <Katex tex="h" />-axis — both wordings are accepted, but "from the <Katex tex="h" />-axis" is not. Reversing the order also works if the translation is <Katex tex="3000" /> instead: <Katex tex="\tfrac12\bigl(h(t)+3000\bigr)" />.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = \frac{60}{100} = \frac35" />,
    reason: <>The sample proportion.</>,
  },
  {
    working: <Katex display tex="\hat p\pm z\sqrt{\frac{\hat p(1-\hat p)}{n}} = \frac35\pm2\sqrt{\frac{\tfrac35\cdot\tfrac25}{100}}" />,
    reason: <>Using <Katex tex="z=2" /> as the question directs.</>,
  },
  {
    working: <Katex display tex="\frac35\cdot\frac25 = \frac{6}{25} \implies \sqrt{\frac{6}{2500}} = \frac{\sqrt6}{50}" />,
    reason: <><Katex tex="\sqrt{2500}=50" />, which is why the numbers were chosen this way.</>,
  },
  {
    working: <Katex display tex="2\cdot\frac{\sqrt6}{50} = \frac{\sqrt6}{25}" />,
    reason: <>The margin of error.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\frac35-\frac{\sqrt6}{25},\ \frac35+\frac{\sqrt6}{25}\right)}" />,
    reason: <>About <Katex tex="(0.502,\ 0.698)" />. The brackets are part of the answer — the report notes some students incorrectly omitted them.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{sd}\!\left(\hat P\right) = \sqrt{\frac{\hat p(1-\hat p)}{n}} = \sqrt{\frac{6/25}{n}}" />,
    reason: <>The same <Katex tex="\hat p=\tfrac35" />, since the new sample has the same proportion.</>,
  },
  {
    working: <Katex display tex="\sqrt{\frac{6}{25n}} = \frac{\sqrt2}{50}" />,
    reason: <>Setting it to the required value.</>,
  },
  {
    working: <Katex display tex="\frac{6}{25n} = \frac{2}{2500} \implies 25n\cdot2 = 6\cdot2500" />,
    reason: <>Squaring both sides and cross-multiplying.</>,
  },
  {
    working: <Katex display tex="\boxed{n = \frac{15\,000}{50} = 300}" />,
    reason: <>Three times the original sample, and the standard deviation shrinks by <Katex tex="\sqrt3" /> — check: <Katex tex="\tfrac{\sqrt6}{50}\div\sqrt3=\tfrac{\sqrt2}{50}" /> ✓.</>,
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

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Part b. is a transformation question hiding a calculus question. "Decreases at
            half the rate" is a condition on <Katex tex="h'" />, so differentiate, halve,
            antidifferentiate, and then use <Katex tex="h_1(0)=h(0)" /> to pin the constant.
            Only then are the transformations visible — and a halved derivative does{' '}
            <em>not</em> mean a halved function, because the constant has to come back.
          </p>
          <p>
            The wording matters as much as the mathematics. VCAA accepts "dilation by factor{' '}
            <Katex tex="\tfrac12" /> from the <Katex tex="t" />-axis" or "parallel to the{' '}
            <Katex tex="h" />-axis" — the two describe the same thing. The report notes the
            incorrect axis or direction was frequently specified.
          </p>
        </Background>
      </div>

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
