// 2023 Mathematical Methods — Exam 1 Question 6 (4 marks). A confidence interval read
// backwards: the sample proportion, the sample size, and how the width scales. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      This question was well answered by students. Some errors included{' '}
      <Katex tex="\hat p" /> values greater than 1; students are reminded that{' '}
      <Katex tex="0\le\hat p\le1" /> and that the span of the confidence interval is
      symmetric about <Katex tex="\hat p" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [51, 23, 26],
  average: 0.7,
  comment: (
    <>
      Many students were able to set up an equation involving <Katex tex="n" /> by using
      either the lower or upper bound of the 95% confidence interval for the proportion,{' '}
      <Katex tex="p" />. Issues with arithmetic manipulation led to the most common errors of{' '}
      <Katex tex="n=10" /> or <Katex tex="n=1000" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [77, 23],
  average: 0.2,
  comment: (
    <>
      This question was not responded to well. The correct answer of <Katex tex="\tfrac12" />{' '}
      was often given, with a number of students able to show rigorous working out. A
      significant number of students gave incorrect answers. A factor of{' '}
      <Katex tex="\tfrac14" /> was a common incorrect answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\left(\hat p-E,\ \hat p+E\right) = (0.04,\ 0.16)" />,
    reason: <>A confidence interval is always symmetric about <Katex tex="\hat p" />, so <Katex tex="\hat p" /> is its centre.</>,
  },
  {
    working: <Katex display tex="\hat p = \frac{0.04+0.16}{2}" />,
    reason: <>The midpoint of the two endpoints — the average, not the sum.</>,
  },
  {
    working: <Katex display tex="\boxed{\hat p = 0.1}" />,
    reason: <>Between 0 and 1, as any proportion must be — the report notes some responses gave <Katex tex="\hat p" /> values greater than 1.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="E = \hat p-0.04 = 0.16-\hat p = 0.06" />,
    reason: <>Half the width of the interval — the margin of error.</>,
  },
  {
    working: <Katex display tex="E = z\sqrt{\frac{\hat p\left(1-\hat p\right)}{n}} \implies 0.06 = 2\sqrt{\frac{0.1\times0.9}{n}}" />,
    reason: <>Using <Katex tex="z=2" /> as the question directs, with <Katex tex="\hat p=0.1" /> from part a.</>,
  },
  {
    working: <Katex display tex="0.03 = \sqrt{\frac{0.09}{n}}" />,
    reason: <>Dividing by 2 first keeps the numbers small; <Katex tex="0.1\times0.9=0.09" />.</>,
  },
  {
    working: <Katex display tex="0.0009 = \frac{0.09}{n}" />,
    reason: <>Squaring both sides. <Katex tex="0.03^2=0.0009" />, not <Katex tex="0.009" /> — the report notes arithmetic manipulation led to the most common errors, <Katex tex="n=10" /> or <Katex tex="n=1000" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = \frac{0.09}{0.0009} = 100}" />,
    reason: <>Check: <Katex tex="2\sqrt{\tfrac{0.09}{100}}=2(0.03)=0.06" /> ✓.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} = 2z\sqrt{\frac{\hat p\left(1-\hat p\right)}{n}}" />,
    reason: <>With <Katex tex="\hat p" /> and <Katex tex="z" /> both unchanged, everything except <Katex tex="n" /> is a constant.</>,
  },
  {
    working: <Katex display tex="\text{width} \propto \frac{1}{\sqrt n}" />,
    reason: <>The <Katex tex="n" /> sits <em>inside</em> a square root. Forgetting the root gives <Katex tex="\tfrac14" />, which the report notes was a common incorrect answer.</>,
  },
  {
    working: <Katex display tex="n \to 4n \implies \sqrt{4n} = 2\sqrt n" />,
    reason: <>Quadrupling the sample doubles the square root.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{the width is halved — a factor of } \tfrac12}" />,
    reason: <>Concretely: <Katex tex="n=100" /> gave a width of <Katex tex="0.12" />; <Katex tex="n=400" /> gives <Katex tex="2\times2\sqrt{\tfrac{0.09}{400}}=0.06" /> ✓. Quadrupling the effort buys only half the width — the usual bargain in sampling.</>,
  },
]

export default function MethodsQ6_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (4 marks)</p>
        <p>
          Let <Katex tex="\hat P" /> be the random variable that represents the sample
          proportion of households in a given suburb that have solar panels installed.
          <br />
          From a sample of randomly selected households in a given suburb, an approximate 95%
          confidence interval for the proportion <Katex tex="p" /> of households having solar
          panels installed was determined to be <Katex tex="(0.04,\,0.16)" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Every confidence interval is <Katex tex="\hat p\pm E" />, so two numbers are
            hiding in the pair <Katex tex="(0.04,0.16)" />: its <em>centre</em> is{' '}
            <Katex tex="\hat p" /> and its <em>half-width</em> is{' '}
            <Katex tex="E=z\sqrt{\hat p(1-\hat p)/n}" />. Read both off, and the whole
            question is arithmetic.
          </p>
          <p>
            Part c. is the one worth remembering: the width goes like{' '}
            <Katex tex="1/\sqrt n" />, so shrinking it by a factor <Katex tex="m" /> costs{' '}
            <Katex tex="m^2" /> times the sample. Only 23% of the state got this.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="\hat p" /> that was used to obtain this approximate
            95% confidence interval.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Use <Katex tex="z=2" /> to approximate the 95% confidence interval.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Sample Size"
        marks={2}
        statement={
          <>Find the size of the sample from which this 95% confidence interval was obtained.</>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            <div className="flex flex-col gap-3">
              <p>
                A larger sample of households is selected, with a sample size four times the
                original sample.
                <br />
                The sample proportion of households having solar panels installed is found to
                be the same.
              </p>
              <p>
                By what factor will the increased sample size affect the width of the
                confidence interval?
              </p>
            </div>
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
