// 2016 Mathematical Methods — Exam 1, Question 4 (3 marks).
// Four sampled sheep a day with replacement, then six independent days. Question text
// transcribed from the original paper (no diagram given). Answers checked against the
// VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: (
    <>
      Incorrect responses overlooked the stipulation "four times each day", thus not
      identifying a binomial distribution. Some students considered untagged sheep rather
      than tagged sheep.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: (
    <>
      Students identified that the answer to this part of the question was simply the
      complement of their previous answer. However, some students wasted time in finding the
      sum of four probabilities, and others made arithmetic errors.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: (
    <>
      The majority of students made the correct connection to part a. and the exponent{' '}
      <Katex tex="6" />. The most common incorrect answer was{' '}
      <Katex tex="\left(\tfrac23\right)^6" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{tagged}) = \frac{10}{30} = \frac13" />,
    reason: <><Katex tex="10" /> tagged out of <Katex tex="30" /> sheep in total.</>,
  },
  {
    working: <Katex display tex="X\sim\mathrm{Bi}\!\left(4,\tfrac13\right)" />,
    reason: <>The sheep is <em>returned to the paddock</em> each time, so the four selections are independent with a constant probability. That is what makes it binomial — the report says students who missed "four times each day" went wrong here.</>,
  },
  {
    working: <Katex display tex="\Pr(X=0) = \left(\frac23\right)^4" />,
    reason: <>All four selections must be untagged.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{16}{81}}" />,
    reason: <>About <Katex tex="0.198" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X\ge1) = 1-\Pr(X=0)" />,
    reason: <>"At least one" is always the complement of "none" — much quicker than adding four separate terms, which the report notes some students did.</>,
  },
  {
    working: <Katex display tex="= 1-\frac{16}{81}" />,
    reason: <>Straight from part (a).</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{65}{81}}" />,
    reason: <>About <Katex tex="0.802" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{zero on one day}) = \frac{16}{81}" />,
    reason: <>Part (a) again. The building block is a whole <em>day</em>, not a single selection.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{zero on all six days}) = \left(\frac{16}{81}\right)^6" />,
    reason: <>The days are independent, so multiply six copies. Writing <Katex tex="\left(\tfrac23\right)^6" /> is the report's common error — that would be six <em>selections</em>, not six days.</>,
  },
  {
    working: <Katex display tex="\left(\frac{16}{81}\right)^6 = \left(\left(\frac23\right)^4\right)^6" />,
    reason: <>Rewriting with the underlying fraction so the answer fits the required form.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\frac{2}{3}\right)^{24}}" />,
    reason: <>So <Katex tex="a=2" />, <Katex tex="b=3" />, <Katex tex="c=24" />. Twenty-four independent selections in all, which is the plain reading of the situation. About <Katex tex="5.9\times10^{-5}" />.</>,
  },
]

export default function MethodsQ4_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (3 marks)</p>
        <p>
          A paddock contains <Katex tex="10" /> tagged sheep and <Katex tex="20" /> untagged
          sheep. Four times each day, one sheep is selected at random from the paddock,
          placed in an observation area and studied, and then returned to the paddock.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Selection Probability"
        marks={1}
        statement={<>What is the probability that the number of tagged sheep selected on a given day is zero?</>}
        examinerReport={EXAM_A}
      >
        <Background title="Two layers of independence">
          <p>
            Within a day: four selections, each returned, so a binomial with{' '}
            <Katex tex="n=4" /> and <Katex tex="p=\tfrac13" />.
          </p>
          <p>
            Across days: six independent repeats of that whole experiment. Part (c) is a
            binomial built on top of a binomial — and the trap is to lose a layer and raise{' '}
            <Katex tex="\tfrac23" /> to the power <Katex tex="6" /> instead of{' '}
            <Katex tex="24" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="At Least One"
        marks={1}
        statement={<>What is the probability that at least one tagged sheep is selected on a given day?</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Independent Trials"
        marks={1}
        statement={
          <>
            What is the probability that no tagged sheep are selected on each of six
            consecutive days? Express your answer in the form{' '}
            <Katex tex="\left(\dfrac{a}{b}\right)^{c}" />, where <Katex tex="a" />,{' '}
            <Katex tex="b" /> and <Katex tex="c" /> are positive integers.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
