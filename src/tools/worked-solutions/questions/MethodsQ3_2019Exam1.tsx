// 2019 Mathematical Methods — Exam 1, Question 3 (3 marks).
// Jo picks one of three coins (two fair, one biased 1/3 for heads) and tosses it — find
// Pr(head), then Pr(unbiased | head). Question text transcribed from the original paper (no
// diagram given). Cross-checked against the VCAA examination report and itute's independent
// solutions — both agree with the derivation below. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [17, 15, 68],
  average: 1.5,
  comment: (
    <>
      As this question was worth two marks appropriate working was required to be shown. This
      could include computations or a probability tree diagram with relevant branches clearly
      identified. In some instances, it was not clear which fractions were being manipulated or
      how they were manipulated.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [55, 45],
  average: 0.5,
  comment: (
    <>
      Most students correctly identified the conditional nature of this probability problem.
      It was noted that many students who did not simplify their answer to part a. did not
      carry out the subsequent calculation successfully.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(H) = \Pr(U)\Pr(H\mid U) + \Pr(B)\Pr(H\mid B)" />,
    reason: <>Condition on which coin was picked (law of total probability) — <Katex tex="U" /> = unbiased coin picked, <Katex tex="B" /> = biased coin picked.</>,
  },
  {
    working: <Katex display tex="\Pr(U) = \tfrac23, \quad \Pr(B) = \tfrac13, \quad \Pr(H\mid U) = \tfrac12, \quad \Pr(H\mid B) = \tfrac13" />,
    reason: <>Two of the three coins are unbiased; the biased coin lands heads with probability <Katex tex="\tfrac13" />.</>,
  },
  {
    working: <Katex display tex="\Pr(H) = \tfrac23\cdot\tfrac12 + \tfrac13\cdot\tfrac13 = \tfrac13 + \tfrac19" />,
    reason: <>Multiply along each branch of the tree, then add the branches.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(H) = \dfrac{4}{9}}" />,
    reason: <>Simplified — the report notes that students who did not simplify this often went wrong in part b. It is a little under <Katex tex="\tfrac12" />, as it should be: the biased coin pulls the chance of a head down.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(U\mid H) = \dfrac{\Pr(U\cap H)}{\Pr(H)} = \dfrac{\Pr(U)\Pr(H\mid U)}{\Pr(H)}" />,
    reason: <>Definition of conditional probability.</>,
  },
  {
    working: <Katex display tex="= \dfrac{\tfrac23\cdot\tfrac12}{\tfrac49} = \dfrac{\tfrac13}{\tfrac49}" />,
    reason: <>Numerator is exactly the first term computed in part a.; denominator is part a.'s final answer.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(U\mid H) = \dfrac34}" />,
    reason: <><Katex tex="\tfrac13\times\tfrac94=\tfrac34" />. Higher than the prior <Katex tex="\tfrac23" />: a head is slightly more likely from an unbiased coin, so seeing one nudges the probability up.</>,
  },
]

export default function MethodsQ3_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (3 marks)</p>
        <p className="mb-2">
          The only possible outcomes when a coin is tossed are a head or a tail. When an
          unbiased coin is tossed, the probability of tossing a head is the same as the
          probability of tossing a tail.
        </p>
        <p className="mb-2">
          Jo has three coins in her pocket; two are unbiased and one is biased. When the biased
          coin is tossed, the probability of tossing a head is <Katex tex="\tfrac13" />.
        </p>
        <p>Jo randomly selects a coin from her pocket and tosses it.</p>
      </div>

      <PartCard letter="a" topic="Total Probability" marks={2} statement={<>Find the probability that she tosses a head.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Conditional Probability" marks={1} statement={<>Find the probability that she selected an unbiased coin, given that she tossed a head.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
