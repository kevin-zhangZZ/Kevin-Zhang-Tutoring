// 2023 Mathematical Methods — Exam 1 Question 6 (4 marks). A confidence interval read
// backwards: the sample proportion, the sample size, and how the width scales. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.
// Widget: part c — interactives/meth-2023e1-q6c-sqrt-width (multiply n by k; the interval's width
// is divided by √k, with a toggle showing the common wrong answer of 1/4).
// Part b (26% full marks) — no widget: the report puts the lost marks down to arithmetic
// manipulation (n = 10 or n = 1000, one decimal place out), which the working's perfect-square
// route and the check in the last row's `more` address; a slider on n would only repeat part c's widget.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SqrtWidthWidget = lazyWidget(() => import('../interactives/meth-2023e1-q6c-sqrt-width'))

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
    reason: <>The approximate confidence interval for <Katex tex="p" /> on the formula sheet runs from <Katex tex="\hat p-E" /> to <Katex tex="\hat p+E" />, where the margin of error <Katex tex="E" /> is the same amount either side. So the interval is symmetric about <Katex tex="\hat p" />: <Katex tex="\hat p" /> is its centre.</>,
  },
  {
    working: <Katex display tex="\hat p = \frac{0.04+0.16}{2}" />,
    reason: <>The midpoint of the two endpoints — the average, not the sum.</>,
  },
  {
    working: <Katex display tex="\boxed{\hat p = 0.1}" />,
    reason: <>Check: it lies between 0 and 1, as any proportion must.</>,
    more: <>The report notes some responses gave <Katex tex="\hat p" /> values greater than 1. A proportion can never be more than 1, so an answer like that is a signal to go back and recheck. The centre must also lie <em>inside</em> the interval, between 0.04 and 0.16.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="E = \hat p-0.04 = 0.16-\hat p = 0.06" />,
    reason: <>The margin of error <Katex tex="E" /> is the distance from the centre <Katex tex="\hat p=0.1" /> to either end — half the width of the interval.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}E &= z\sqrt{\frac{\hat p\left(1-\hat p\right)}{n}}\\ 0.06 &= 2\sqrt{\frac{0.1\times0.9}{n}}\end{aligned}" />,
    reason: <>The formula sheet gives the interval as <Katex tex="\hat p\pm z\sqrt{\frac{\hat p(1-\hat p)}{n}}" />, so <Katex tex="E" /> is the part after the <Katex tex="\pm" />. Use <Katex tex="z=2" /> as the question directs, with <Katex tex="\hat p=0.1" /> from part a.</>,
  },
  {
    working: <Katex display tex="0.03 = \sqrt{\frac{0.09}{n}}" />,
    reason: <>Divide both sides by 2, and <Katex tex="0.1\times0.9=0.09" />.</>,
  },
  {
    working: <Katex display tex="0.03 = \frac{\sqrt{0.09}}{\sqrt n} = \frac{0.3}{\sqrt n}" />,
    reason: <>Split the square root over the top and bottom. <Katex tex="0.09" /> is a perfect square (<Katex tex="0.3^2=0.09" />), so this keeps the decimals short.</>,
    more: <>Squaring both sides instead also works, but needs care with decimal places: <Katex tex="0.03^2=0.0009" />, so <Katex tex="0.0009=\tfrac{0.09}{n}" /> and <Katex tex="n=\tfrac{0.09}{0.0009}=100" />. The report says arithmetic manipulation led to the most common errors, <Katex tex="n=10" /> or <Katex tex="n=1000" />. Each is out by a factor of 10, the size of error a slip with decimal places produces. For example, taking <Katex tex="0.03^2" /> as <Katex tex="0.009" /> gives <Katex tex="n=10" />, and taking it as <Katex tex="0.00009" /> gives <Katex tex="n=1000" />.</>,
  },
  {
    working: <Katex display tex="\sqrt n = \frac{0.3}{0.03} = 10" />,
    reason: <>Multiply both sides by <Katex tex="\sqrt n" /> and divide by <Katex tex="0.03" />. Multiplying top and bottom by 100 gives <Katex tex="\tfrac{30}{3}=10" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 10^2 = 100}" />,
    reason: <>That 10 is <Katex tex="\sqrt n" />, not <Katex tex="n" />: square both sides to get <Katex tex="n" />.</>,
    more: <>Check by putting <Katex tex="n=100" /> back into the margin of error: <Katex tex="2\sqrt{\tfrac{0.09}{100}}=2\sqrt{0.0009}=2(0.03)=0.06" />, the value from the first step ✓. The same check catches both common wrong answers: <Katex tex="n=10" /> gives <Katex tex="E=2\sqrt{0.009}\approx0.19" /> and <Katex tex="n=1000" /> gives <Katex tex="E=2\sqrt{0.00009}\approx0.019" />, neither of which is <Katex tex="0.06" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} = 2E = 2z\sqrt{\frac{\hat p\left(1-\hat p\right)}{n}}" />,
    reason: <>The interval runs from <Katex tex="\hat p-E" /> to <Katex tex="\hat p+E" />, so its width is <Katex tex="2E" />. The new sample has the same <Katex tex="\hat p" /> and the same <Katex tex="z" />, so only <Katex tex="n" /> changes.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{new width} &= 2z\sqrt{\frac{\hat p\left(1-\hat p\right)}{4n}}\\ &= \frac{1}{\sqrt4}\times2z\sqrt{\frac{\hat p\left(1-\hat p\right)}{n}}\end{aligned}" />,
    reason: <>Replace <Katex tex="n" /> with <Katex tex="4n" />. The 4 is <em>inside</em> the square root, so it comes out as <Katex tex="\sqrt4" />, not 4.</>,
  },
  {
    working: <Katex display tex="\text{new width} = \tfrac12\times\text{original width}" />,
    reason: <><Katex tex="\sqrt4=2" />, so the new width is half the original width.</>,
    more: <>The report notes <Katex tex="\tfrac14" /> was a common incorrect answer. That is what you get by dividing the width by 4 because <Katex tex="n" /> was multiplied by 4, forgetting that the width depends on <Katex tex="\sqrt n" />, not on <Katex tex="n" /> itself.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{the width is halved — a factor of } \tfrac12}" />,
    reason: <>The question asks for the factor on the width, so state it.</>,
    more: <>Check with numbers: <Katex tex="n=100" /> gave a width of <Katex tex="0.16-0.04=0.12" />; <Katex tex="n=400" /> gives <Katex tex="2\times2\sqrt{\tfrac{0.09}{400}}=4\times0.015=0.06" />, half of <Katex tex="0.12" /> ✓. The report&apos;s answer words this several ways (halved; reduced or decreased by a factor of 2; altered by a factor of <Katex tex="\tfrac12" />), so any of these is fine, as long as it is clear the width is halved rather than doubled.</>,
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

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Two numbers are hiding in the pair <Katex tex="(0.04,0.16)" />: its <em>centre</em> is{' '}
              <Katex tex="\hat p" /> and its <em>half-width</em>, the margin of error, is{' '}
              <Katex tex="E=z\sqrt{\hat p(1-\hat p)/n}" />. Read both off, and the whole
              question is arithmetic.
            </p>
            <p>
              Part c is the one worth remembering: <Katex tex="n" /> sits under a square root, so
              dividing the width by <Katex tex="m" /> takes <Katex tex="m^2" /> times the sample.
              Only 23% of students got this mark.
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
        <Explore title="Four times the sample, only half the width — because n sits under a square root">
          <SqrtWidthWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
