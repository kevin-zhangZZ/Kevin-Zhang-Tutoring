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
    reason: <>The sheep is <em>returned to the paddock</em> each time, so the four selections are independent with constant probability: the number of tagged sheep in a day is binomial with <Katex tex="n=4" /> trials.</>,
    more: <>The report says incorrect responses overlooked "four times each day" and so missed the binomial. The four selections are the trials; the day is one run of the experiment.</>,
  },
  {
    working: <Katex display tex="\Pr(X=0) = \left(\frac23\right)^4" />,
    reason: <>Zero tagged means all four selections are untagged, each with probability <Katex tex="\tfrac23" />.</>,
    more: <>The report notes some students worked with untagged sheep instead. Keep <Katex tex="X" /> counting <em>tagged</em> sheep: <Katex tex="\Pr(X=0)=\binom40\left(\tfrac13\right)^0\left(\tfrac23\right)^4" />. Using <Katex tex="p=\tfrac23" /> by mistake gives <Katex tex="\left(\tfrac13\right)^4=\tfrac1{81}" />, the chance that all four are tagged.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{16}{81}}" />,
    reason: <>About <Katex tex="0.198" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X\ge1) = 1-\Pr(X=0)" />,
    reason: <>"At least one" is the complement of "none", which part (a) already gives.</>,
    more: <>The report notes some students wasted time adding <Katex tex="\Pr(X=1)+\Pr(X=2)+\Pr(X=3)+\Pr(X=4)" />. That gives the same <Katex tex="\tfrac{32+24+8+1}{81}=\tfrac{65}{81}" />, but with four chances for an arithmetic slip.</>,
  },
  {
    working: <Katex display tex="= 1-\frac{16}{81}" />,
    reason: <>Substitute <Katex tex="\Pr(X=0)=\tfrac{16}{81}" /> from part (a).</>,
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
    reason: <>Each day is a separate run of the experiment, so the days are independent: multiply six copies of the one-day probability.</>,
    more: <>The report's most common incorrect answer was <Katex tex="\left(\tfrac23\right)^6" />. That is the chance of six untagged <em>selections</em>, but six days contain <Katex tex="6\times4=24" /> selections. Equivalently, if <Katex tex="Y" /> counts the days with no tagged sheep, <Katex tex="Y\sim\mathrm{Bi}\!\left(6,\tfrac{16}{81}\right)" /> and the answer is <Katex tex="\Pr(Y=6)" />.</>,
  },
  {
    working: <Katex display tex="\left(\frac{16}{81}\right)^6 = \left(\left(\frac23\right)^4\right)^6" />,
    reason: <><Katex tex="\left(\tfrac{16}{81}\right)^6" /> already has the required form; rewriting <Katex tex="\tfrac{16}{81}=\left(\tfrac23\right)^4" /> gives the simpler version.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\frac{2}{3}\right)^{24}}" />,
    reason: <>Multiply the indices, <Katex tex="4\times6=24" />. So <Katex tex="a=2" />, <Katex tex="b=3" />, <Katex tex="c=24" /> (the report also gives <Katex tex="\left(\tfrac{16}{81}\right)^6" />). Twenty-four untagged selections in a row; about <Katex tex="5.9\times10^{-5}" />.</>,
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
            Across days: six independent repeats of that whole experiment.
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
