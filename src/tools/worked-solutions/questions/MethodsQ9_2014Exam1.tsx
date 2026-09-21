// 2014 Mathematical Methods (CAS) — Exam 1, Question 9 (6 marks). Total probability and a
// Bayes-style conditional, framed as walking a dog in pleasant or unpleasant weather.
// Question text transcribed from the original paper (no diagram given). Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
      Many students made a good attempt at this question. Most correctly identified the
      required sum of two products; however, they made errors in the evaluation of the final
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
      part b.i. in the denominator; however, they used an incorrect numerator.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{walk}\mid\text{pleasant}) = \tfrac34, \qquad \Pr(\text{walk}\mid\text{unpleasant}) = \tfrac13" />,
    reason: <>Monday is pleasant and Tuesday unpleasant, so the two mornings use different probabilities.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{at least one}) = 1-\Pr(\text{neither})" />,
    reason: <>"At least one" over two trials is quickest through the complement — one product instead of three.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{neither}) = \left(1-\tfrac34\right)\left(1-\tfrac13\right) = \tfrac14\times\tfrac23" />,
    reason: <>Independent mornings, so multiply.</>,
  },
  {
    working: <Katex display tex="= \tfrac{2}{12} = \tfrac16" />,
    reason: <>Simplifying.</>,
  },
  {
    working: <Katex display tex="\boxed{1-\tfrac16 = \tfrac56}" />,
    reason: <>Adding the three "at least one" cases directly gives <Katex tex="\tfrac34\cdot\tfrac13+\tfrac34\cdot\tfrac23+\tfrac14\cdot\tfrac13=\tfrac56" /> ✓.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(P) = \tfrac58, \qquad \Pr(P') = \tfrac38" />,
    reason: <>The weather splits into two cases, and the walking probability depends on which.</>,
  },
  {
    working: <Katex display tex="\Pr(W) = \Pr(P)\Pr(W\mid P)+\Pr(P')\Pr(W\mid P')" />,
    reason: <>The law of total probability — the sum of two products the report describes.</>,
  },
  {
    working: <Katex display tex="= \tfrac58\times\tfrac34 + \tfrac38\times\tfrac13" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="= \tfrac{15}{32}+\tfrac{1}{8} = \tfrac{15}{32}+\tfrac{4}{32}" />,
    reason: <>A common denominator of 32 — this is the arithmetic the report says went wrong most often.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(W) = \tfrac{19}{32}}" />,
    reason: <>Between <Katex tex="\tfrac13" /> and <Katex tex="\tfrac34" />, as any weighted average of the two must be.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(P\mid W) = \frac{\Pr(P\cap W)}{\Pr(W)}" />,
    reason: <>The conditional formula. The denominator is part b(i); the numerator is the <em>first term only</em> of that sum.</>,
  },
  {
    working: <Katex display tex="\Pr(P\cap W) = \tfrac58\times\tfrac34 = \tfrac{15}{32}" />,
    reason: <>Pleasant <em>and</em> walked — the report says the wrong numerator was the common error here.</>,
  },
  {
    working: <Katex display tex="\Pr(P\mid W) = \frac{15/32}{19/32}" />,
    reason: <>Both over 32.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{15}{19}}" />,
    reason: <>The denominators cancel outright. Note this is bigger than <Katex tex="\Pr(P)=\tfrac58" /> — knowing she walked makes pleasant weather more likely, as it should.</>,
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
      </PartCard>
    </div>
  )
}
