// 2022 Mathematical Methods — Exam 1 Question 4 (5 marks). A binomial table, then two
// questions where the "given" clause turns out to be irrelevant. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [21, 7, 72],
  average: 1.5,
  comment: (
    <>
      Students were generally successful with this question. There were, however, a
      significant number who did not recognise that the probabilities had to sum to one.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [64, 36],
  average: 0.4,
  comment: (
    <>
      Many students successfully drew tree diagrams to approach this question. A significant
      number of students treated the situation as a conditional probability, which was
      acceptable.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [25, 43, 31],
  average: 1.1,
  comment: (
    <>
      This question was not answered well. A significant number of students treated the
      situation as a conditional probability and did not divide by <Katex tex="\tfrac13" />,
      or erroneously divided by <Katex tex="\tfrac12" />. Some students interpreted the
      question as wanting <Katex tex="\Pr(RRB)" /> only, giving <Katex tex="\tfrac{4}{27}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}\!\left(4,\tfrac12\right) \implies \Pr(X=x) = \binom4x\left(\tfrac12\right)^4" />,
    reason: <>With <Katex tex="p=\tfrac12" /> every outcome carries the same <Katex tex="\left(\tfrac12\right)^4=\tfrac{1}{16}" />, so only the binomial coefficient changes.</>,
  },
  {
    working: <Katex display tex="\binom40,\binom41,\binom42,\binom43,\binom44 = 1,\ 4,\ 6,\ 4,\ 1" />,
    reason: 'The fifth row of Pascal\u2019s triangle — symmetric, which is a useful check.',
  },
  {
    working: <Katex display tex="\boxed{\tfrac{1}{16},\ \tfrac{4}{16},\ \tfrac{6}{16},\ \tfrac{4}{16},\ \tfrac{1}{16}}" />,
    reason: <>The two given entries are <Katex tex="\tfrac1{16}" /> and <Katex tex="\tfrac6{16}" />, and the total is <Katex tex="\tfrac{16}{16}=1" /> ✓ — the check the report says some students skipped.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{draws are independent} \implies \text{the first card tells you nothing}" />,
    reason: 'Cards are replaced, so "given that the first is blue" is decoration — the next three behave exactly as three fresh draws.',
  },
  {
    working: <Katex display tex="Y \sim \mathrm{Bi}\!\left(3,\tfrac12\right), \quad \Pr(Y=2) = \binom32\left(\tfrac12\right)^2\left(\tfrac12\right)" />,
    reason: <>Counting reds among the next three, with <Katex tex="p=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac38}" />,
    reason: <><Katex tex="3\times\tfrac18" />. A conditional-probability set-up gives the same answer, just with more steps.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{red}) = \tfrac23, \quad \Pr(\text{blue}) = \tfrac13" />,
    reason: 'The only change is the bias; replacement and independence are unchanged.',
  },
  {
    working: <Katex display tex="Y \sim \mathrm{Bi}\!\left(3,\tfrac23\right), \quad \Pr(Y=2) = \binom32\left(\tfrac23\right)^2\left(\tfrac13\right)" />,
    reason: <>"Exactly two of the <em>next three</em>", so <Katex tex="n=3" /> — the first card is still irrelevant.</>,
  },
  {
    working: <Katex display tex="= 3\times\tfrac49\times\tfrac13 = \tfrac{12}{27}" />,
    reason: <>The three arrangements <Katex tex="RRB" />, <Katex tex="RBR" />, <Katex tex="BRR" /> each have probability <Katex tex="\tfrac{4}{27}" /> — taking just one of them is the report's named error.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac49}" />,
    reason: <>Dividing by <Katex tex="\tfrac13" /> or <Katex tex="\tfrac12" /> "for the condition" is wrong: the condition is already accounted for by the independence.</>,
  },
]

export default function MethodsQ4_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (5 marks)</p>
        <p>
          A card is drawn from a deck of red and blue cards. After verifying the colour, the
          card is replaced in the deck. This is performed four times. Each card has a
          probability of <Katex tex="\tfrac12" /> of being red and a probability of{' '}
          <Katex tex="\tfrac12" /> of being blue. The colour of any drawn card is independent
          of the colour of any other drawn card. Let <Katex tex="X" /> be a random variable
          describing the number of blue cards drawn from the deck, in any order.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Complete the table by giving the probability of each outcome, given that{' '}
            <Katex tex="\Pr(X=0)=\tfrac1{16}" /> and <Katex tex="\Pr(X=2)=\tfrac6{16}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={
          <>
            Given that the first card drawn is blue, find the probability that exactly two of
            the next three cards drawn will be red.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            The deck is changed so that the probability of a card being red is{' '}
            <Katex tex="\tfrac23" /> and the probability of a card being blue is{' '}
            <Katex tex="\tfrac13" />. Given that the first card drawn is blue, find the
            probability that exactly two of the next three cards drawn will be red.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
