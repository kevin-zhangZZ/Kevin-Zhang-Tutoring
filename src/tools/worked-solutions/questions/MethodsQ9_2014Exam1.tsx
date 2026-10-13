// 2014 Mathematical Methods (CAS) — Exam 1, Question 9 (6 marks). Total probability and a
// Bayes-style conditional, framed as walking a dog in pleasant or unpleasant weather.
// Question text transcribed from the original paper (no diagram given). Answers checked with
// sympy and against the VCAA examination report. Solution is original.
// Interactive (b.ii, 27% full marks): an area diagram of April mornings showing Pr(P | W) as the
// pleasant share of the walked region, with the report's "incorrect numerator" tried both ways.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const ShareWidget = lazyWidget(() => import('../interactives/meth-2014e1-q9bii-share'))

const EXAM_A: SAExaminerStats = {
  marks: [42, 8, 50],
  average: 1.1,
  comment: (
    <>
      Many students attempted to use matrices but did not recognise the basic nature of the
      problem. A tree diagram or listing the sample space were the best options.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [40, 17, 44],
  average: 1.1,
  comment: (
    <>
      Many students made a good attempt at this question. Most students correctly identified
      the required sum of two products; however, made errors in the evaluation of the final
      fraction.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [52, 21, 27],
  average: 0.8,
  comment: (
    <>
      Many students were able to identify the conditional probability and use their answer to
      part bi. in the denominator; however, used an incorrect numerator.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \Pr(\text{walk}\mid\text{pleasant}) &= \tfrac34 \\ \Pr(\text{walk}\mid\text{unpleasant}) &= \tfrac13 \end{aligned}" />,
    reason: <>Monday is pleasant and Tuesday unpleasant, so the two mornings use different probabilities.</>,
    more: (
      <>
        The weather on both mornings is already given, so nothing about it is random here, and no
        weather probability (or matrix) is needed. The report notes many students reached for
        matrices: there is no chain of days to follow, just two separate mornings, so a two-stage
        tree (walked or not on Monday, then on Tuesday) or a list of the four outcomes is all it
        takes.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(\text{at least one}) = 1-\Pr(\text{neither})" />,
    reason: <>"At least one" over two trials is quickest through the complement — one product rather than adding three cases (both days, Monday only, Tuesday only).</>,
  },
  {
    working: <Katex display tex="\Pr(\text{neither}) = \left(1-\tfrac34\right)\left(1-\tfrac13\right) = \tfrac14\times\tfrac23" />,
    reason: <>Not walking has probability <Katex tex="1-\tfrac34" /> on Monday and <Katex tex="1-\tfrac13" /> on Tuesday; separate mornings are independent, so multiply.</>,
  },
  {
    working: <Katex display tex="= \tfrac{2}{12} = \tfrac16" />,
    reason: <>Simplifying.</>,
  },
  {
    working: <Katex display tex="\boxed{1-\tfrac16 = \tfrac56}" />,
    reason: <>Subtract from 1 to get "at least one".</>,
    more: (
      <>
        Check by listing the three outcomes with at least one walk (both days, Monday only,
        Tuesday only):{' '}
        <Katex tex="\tfrac34\cdot\tfrac13+\tfrac34\cdot\tfrac23+\tfrac14\cdot\tfrac13=\tfrac{3+6+1}{12}=\tfrac56" /> ✓.
      </>
    ),
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(P) = \tfrac58, \qquad \Pr(P') = \tfrac38" />,
    reason: <>The weather splits into two cases, and the walking probability depends on which.</>,
  },
  {
    working: <Katex display tex="\Pr(W) = \Pr(P)\Pr(W\mid P)+\Pr(P')\Pr(W\mid P')" />,
    reason: <>She walks on a pleasant morning or on an unpleasant one: add the two branches of the tree, each a product.</>,
    more: (
      <>
        This is the law of total probability, the &ldquo;sum of two products&rdquo; in the report.
        On a tree, the first branch is the weather (<Katex tex="\tfrac58" /> or{' '}
        <Katex tex="\tfrac38" />) and the second is whether she walks; multiply along each path
        ending in &ldquo;walk&rdquo;, then add the paths.
      </>
    ),
  },
  {
    working: <Katex display tex="= \tfrac58\times\tfrac34 + \tfrac38\times\tfrac13" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="= \tfrac{15}{32}+\tfrac{1}{8} = \tfrac{15}{32}+\tfrac{4}{32}" />,
    reason: <><Katex tex="\tfrac38\times\tfrac13=\tfrac18" /> (the 3s cancel); then a common denominator of 32.</>,
    more: (
      <>
        The report says most students set up the right sum but made errors evaluating the final
        fraction, so take this line slowly: cancel before multiplying where you can, and convert{' '}
        <Katex tex="\tfrac18 = \tfrac{4}{32}" /> before adding.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr(W) = \tfrac{19}{32}}" />,
    reason: <>Add the fractions.</>,
    more: (
      <>
        Check: <Katex tex="\Pr(W)" /> is a weighted average of <Katex tex="\tfrac34" /> and{' '}
        <Katex tex="\tfrac13" /> (weights <Katex tex="\tfrac58" /> and <Katex tex="\tfrac38" />), so
        it must lie between them, and <Katex tex="\tfrac{19}{32}\approx 0.59" /> does.
      </>
    ),
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(P\mid W) = \frac{\Pr(P\cap W)}{\Pr(W)}" />,
    reason: <>The conditional formula. The denominator is part b.i; the numerator is the <em>first term only</em> of that sum.</>,
  },
  {
    working: <Katex display tex="\Pr(P\cap W) = \tfrac58\times\tfrac34 = \tfrac{15}{32}" />,
    reason: <>Pleasant <em>and</em> walked: the pleasant branch times walking given pleasant.</>,
    more: (
      <>
        The report says many students had the right denominator but an incorrect numerator. The
        likely slips are <Katex tex="\Pr(W\mid P)=\tfrac34" /> (the reverse conditional) or{' '}
        <Katex tex="\Pr(P)=\tfrac58" /> (which includes mornings she didn&apos;t walk). Either
        one divided by <Katex tex="\tfrac{19}{32}" /> gives <Katex tex="\tfrac{24}{19}" /> or{' '}
        <Katex tex="\tfrac{20}{19}" />, more than 1, so the answer itself shows the numerator is
        wrong. The numerator must be part of the denominator&apos;s event.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(P\mid W) = \frac{15/32}{19/32}" />,
    reason: <>Both over 32.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{15}{19}}" />,
    reason: <>The denominators (32) cancel.</>,
    more: (
      <>
        Check: this is bigger than <Katex tex="\Pr(P)=\tfrac58" />. Knowing she walked makes
        pleasant weather more likely, as it should, since she walks more often when it is pleasant.
      </>
    ),
  },
]

export default function MethodsQ9_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (6 marks)</p>
        <p>
          Sally aims to walk her dog, Mack, most mornings. If the weather is pleasant, the
          probability that she will walk Mack is <Katex tex="\tfrac34" />, and if the weather
          is unpleasant, the probability that she will walk Mack is <Katex tex="\tfrac13" />.
        </p>
        <p>
          Assume that pleasant weather on any morning is independent of pleasant weather on
          any other morning.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="At Least One"
        marks={2}
        statement={
          <>
            In a particular week, the weather was pleasant on Monday morning and unpleasant on
            Tuesday morning. Find the probability that Sally walked Mack on at least one of
            these two mornings.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        In the month of April, the probability of pleasant weather in the morning was{' '}
        <Katex tex="\tfrac58" />.
      </div>

      <PartCard
        letter="b.i"
        topic="Total Probability"
        marks={2}
        statement={
          <>
            Find the probability that on a particular morning in April, Sally walked Mack.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Conditional Probability"
        marks={2}
        statement={
          <>
            Using your answer from part b.i., or otherwise, find the probability that on a
            particular morning in April, the weather was pleasant, given that Sally walked
            Mack that morning.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
        <Explore title="Given she walked, the whole is the walked mornings only">
          <ShareWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
