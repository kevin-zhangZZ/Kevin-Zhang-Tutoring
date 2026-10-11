// 2021 Mathematical Methods — Exam 1 Question 3 (5 marks). Range and period of a sine, then
// a general solution. Question text transcribed from the original paper. Answers checked
// with sympy and against the VCAA examination report. Solution is original.
// Interactive: part c — meth-2021e1-q3c-every-solution (step k along g(x) = 2sin(2x) and y = √3;
// buttons for the report's common errors +2kπ, k ∈ Z⁺ and k ∈ R show the solutions they miss
// or the non-solutions they let in).

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EverySolution = lazyWidget(() => import('../interactives/meth-2021e1-q3c-every-solution'))

const EXAM_A: SAExaminerStats = {
  marks: [22, 78],
  average: 0.8,
  comment: (
    <>
      This question was well answered. Common errors were writing the interval as{' '}
      <Katex tex="(-2,2)" />, <Katex tex="[-2,2]" />, or simply just writing 2.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: <>Students were mostly successful with this question.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [15, 20, 48, 17],
  average: 1.7,
  comment: (
    <>
      Most students attempted to find more than one solution. Those who could find the
      initial reference angle generally knew they needed to find multiple angles. Some gave
      only specific solutions within a period. The construction of a general solution, while
      attempted, was not done well.
      <br />
      Common errors include: <Katex tex="+2k\pi" />, <Katex tex="k\in R" />,{' '}
      <Katex tex="k\in R^+" />, <Katex tex="k\in Z^+" /> or lacked a correct number
      categorisation of <Katex tex="k" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le \sin(2x) \le 1" />,
    reason: <>The sine of any angle lies between <Katex tex="-1" /> and <Katex tex="1" />. The <Katex tex="2" /> inside the sine only changes the period, not the height.</>,
  },
  {
    working: <Katex display tex="-2 \le 2\sin(2x) \le 2" />,
    reason: <>Multiply through by the amplitude <Katex tex="2" />. Both ends are reached: <Katex tex="g\left(\tfrac\pi4\right) = 2\sin\left(\tfrac\pi2\right) = 2" /> and <Katex tex="g\left(\tfrac{3\pi}4\right) = 2\sin\left(\tfrac{3\pi}2\right) = -2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{[-2,\ 2]}" />,
    reason: <>Square brackets, because <Katex tex="g" /> actually reaches <Katex tex="-2" /> and <Katex tex="2" />. A range is an interval of <Katex tex="y" />-values, not just the amplitude.</>,
    more: (
      <>
        Round brackets <Katex tex="(-2,2)" /> would leave out the endpoints that <Katex tex="g" /> does reach, and
        writing <Katex tex="2" /> on its own gives the amplitude, not a set of values. The report lists both among the
        common errors. Its list also shows <Katex tex="[-2,2]" />, the report&apos;s own answer, so that entry is a slip in the report: <Katex tex="[-2,2]" /> earns the mark.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{n} = \frac{2\pi}{2}" />,
    reason: <>For <Katex tex="y = a\sin(nx)" /> the period is <Katex tex="\tfrac{2\pi}{n}" />. Here <Katex tex="n = 2" />.</>,
    more: <>Why: the angle <Katex tex="nx" /> must grow by <Katex tex="2\pi" /> for one full cycle, and that takes <Katex tex="x" /> only <Katex tex="\tfrac{2\pi}{n}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\pi}" />,
    reason: <>The amplitude <Katex tex="2" /> is a vertical stretch, so it has no effect on the period.</>,
    more: <>Check: <Katex tex="g(x+\pi) = 2\sin(2x+2\pi) = 2\sin(2x) = g(x)" />, so <Katex tex="g" /> repeats every <Katex tex="\pi" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} 2\sin(2x) &= \sqrt3 \\ \sin(2x) &= \frac{\sqrt3}{2} \end{aligned}" />,
    reason: <>Divide both sides by <Katex tex="2" /> to get the sine on its own, so the equation reads sine of an angle equals a known exact value.</>,
  },
  {
    working: <Katex display tex="\text{reference angle} = \tfrac\pi3" />,
    reason: <>From the exact values, <Katex tex="\sin\left(\tfrac\pi3\right) = \tfrac{\sqrt3}{2}" />. The reference angle is the first-quadrant angle with this sine value.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} 2x &= \tfrac\pi3+2k\pi \\ \text{or} \ \ 2x &= \pi-\tfrac\pi3+2k\pi \\ &=\tfrac{2\pi}{3}+2k\pi, \quad k\in Z \end{aligned}"
      />
    ),
    reason: (
      <>
        <Katex tex="x\in R" />, so give every solution, not just a few. Solve for the whole angle <Katex tex="2x" /> first. Sine is positive in quadrants 1 and 2, giving{' '}
        <Katex tex="\tfrac\pi3" /> and <Katex tex="\pi-\tfrac\pi3" />; adding any number of full turns,{' '}
        <Katex tex="2k\pi" />, gives the same sine.
      </>
    ),
    more: (
      <>
        With no interval given there are infinitely many solutions, so you write this general form rather than
        listing a few; the report notes some students gave only specific solutions within a period.{' '}
        <Katex tex="k\in Z" /> means <Katex tex="k" /> is any integer: <Katex tex="\dots,-2,-1,0,1,2,\dots" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x = \tfrac\pi6+k\pi \ \text{ or } \ x = \tfrac\pi3+k\pi" />,
    reason: <>Divide everything by 2, including the <Katex tex="2k\pi" />, which becomes <Katex tex="k\pi" />.</>,
    more: (
      <>
        The report lists <Katex tex="+2k\pi" /> among the common errors. Leaving <Katex tex="+2k\pi" /> here makes each
        step of <Katex tex="k" /> jump <Katex tex="2\pi" />, two periods of <Katex tex="g" />, so every second pair of
        solutions is missed, e.g. <Katex tex="\tfrac{7\pi}6" /> and <Katex tex="\tfrac{4\pi}3" />. Press{' '}
        <Katex tex="+2k\pi" /> in the diagram below to see the solutions it skips.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x = \tfrac\pi6+k\pi \ \text{ or } \ x = \tfrac\pi3+k\pi, \quad k\in Z}" />,
    reason: (
      <>
        State <Katex tex="k\in Z" />: <Katex tex="k" /> can be any integer (positive, negative or 0), each step moving one
        period, <Katex tex="\pi" />. A fractional <Katex tex="k" /> gives non-solutions.
      </>
    ),
    more: (
      <>
        Check <Katex tex="k=0" />: <Katex tex="g\left(\tfrac\pi6\right) = 2\sin\left(\tfrac\pi3\right) = \sqrt3" /> and{' '}
        <Katex tex="g\left(\tfrac\pi3\right) = 2\sin\left(\tfrac{2\pi}3\right) = \sqrt3" />. The report lists{' '}
        <Katex tex="k\in R" />, <Katex tex="k\in R^+" /> and <Katex tex="k\in Z^+" /> among the common errors: a
        non-integer <Katex tex="k" /> such as <Katex tex="\tfrac12" /> gives <Katex tex="x = \tfrac{2\pi}3" />, where{' '}
        <Katex tex="g(x) = -\sqrt3" />, and positive-only <Katex tex="k" /> loses <Katex tex="\tfrac\pi6" />,{' '}
        <Katex tex="\tfrac\pi3" /> and every solution to their left.
      </>
    ),
  },
]

export default function MethodsQ3_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (5 marks)</p>
        <p>
          Consider the function <Katex tex="g:R\to R" />, <Katex tex="g(x)=2\sin(2x)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Range"
        marks={1}
        statement={<>State the range of <Katex tex="g" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Period"
        marks={1}
        statement={<>State the period of <Katex tex="g" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="General Solution"
        marks={3}
        statement={
          <>
            Solve <Katex tex="2\sin(2x)=\sqrt3" /> for <Katex tex="x\in R" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Why +kπ with k ∈ Z catches every solution, and nothing else">
          <EverySolution />
        </Explore>
      </PartCard>
    </div>
  )
}
