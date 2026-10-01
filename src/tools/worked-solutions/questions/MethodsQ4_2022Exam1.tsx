// 2022 Mathematical Methods — Exam 1 Question 4 (5 marks). A binomial table, then two
// questions where the "given" clause turns out to be irrelevant. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.
// Interactive: part c has an area-model widget (interactives/meth-2022e1-q4c-blue-strip.tsx) —
// "given the first card is blue" keeps only the blue strip, with buttons for the report's slips
// (not dividing by 1/3, dividing by 1/2, Pr(RRB) only).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BlueStripWidget = lazyWidget(() => import('../interactives/meth-2022e1-q4c-blue-strip'))

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
      situation as a conditional probability. Many students who proceeded with calculating
      the question as a conditional probability did not divide by <Katex tex="\tfrac13" /> or
      erroneously divided by <Katex tex="\tfrac12" />. Some students interpreted the question
      as wanting <Katex tex="\Pr(RRB)" /> only and thereby gave <Katex tex="\tfrac{4}{27}" /> as
      the answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} X &\sim \mathrm{Bi}\!\left(4,\tfrac12\right) \\ \Pr(X=x) &= \binom4x\left(\tfrac12\right)^4 = \tfrac{1}{16}\binom4x \end{aligned}" />,
    reason: <>Four independent draws, each blue with the same probability <Katex tex="\tfrac12" />, and <Katex tex="X" /> counts the blues — so <Katex tex="X" /> is binomial with <Katex tex="n=4" />, <Katex tex="p=\tfrac12" />. Because <Katex tex="p" /> and <Katex tex="1-p" /> are both <Katex tex="\tfrac12" />, the factor <Katex tex="\left(\tfrac12\right)^x\left(\tfrac12\right)^{4-x}" /> is <Katex tex="\left(\tfrac12\right)^4=\tfrac{1}{16}" /> for every <Katex tex="x" />, so only the binomial coefficient changes.</>,
  },
  {
    working: <Katex display tex="\binom40,\binom41,\binom42,\binom43,\binom44 = 1,\ 4,\ 6,\ 4,\ 1" />,
    reason: <>The binomial coefficients for <Katex tex="n=4" />: the 1, 4, 6, 4, 1 row of Pascal’s triangle. It reads the same backwards, which is a useful check.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{array}{c|ccccc} x & 0 & 1 & 2 & 3 & 4 \\ \hline \Pr(X=x) & \tfrac{1}{16} & \tfrac{4}{16} & \tfrac{6}{16} & \tfrac{4}{16} & \tfrac{1}{16} \end{array}}" />,
    reason: <>Each coefficient over 16. The given entries <Katex tex="\tfrac1{16}" /> and <Katex tex="\tfrac6{16}" /> match, and the five probabilities add to <Katex tex="\tfrac{16}{16}=1" />, as they must for any probability distribution — the report notes a significant number did not recognise that the probabilities had to sum to one.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\Pr(\text{2 of next 3 red} \mid \text{1st blue}) \\ &\quad = \Pr(\text{2 of 3 red}) \end{aligned}" />,
    reason: <>The cards are replaced and every draw is independent of the others, so knowing the first card is blue changes nothing about the next three: they behave exactly like three fresh draws. Formally, with <Katex tex="A" /> = “exactly two of the next three are red” and <Katex tex="B" /> = “the first card is blue”, independence gives <Katex tex="\Pr(A\cap B)=\Pr(A)\Pr(B)" />, so <Katex tex="\Pr(A\mid B)=\dfrac{\Pr(A)\Pr(B)}{\Pr(B)}=\Pr(A)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} Y &\sim \mathrm{Bi}\!\left(3,\tfrac12\right) \\ \Pr(Y=2) &= \binom32\left(\tfrac12\right)^2\left(\tfrac12\right)^1 \end{aligned}" />,
    reason: <>Let <Katex tex="Y" /> be the number of red cards in the three draws: <Katex tex="n=3" /> independent draws, each red with <Katex tex="p=\tfrac12" />. The <Katex tex="\binom32=3" /> counts the three orders <Katex tex="RRB" />, <Katex tex="RBR" />, <Katex tex="BRR" />.</>,
  },
  {
    working: <Katex display tex="= 3\times\tfrac18 = \boxed{\tfrac38}" />,
    reason: <>Each order has probability <Katex tex="\left(\tfrac12\right)^3=\tfrac18" />. The report notes that treating it as a conditional probability was also acceptable: <Katex tex="\Pr(\text{1st blue and 2 of next 3 red}) \div \Pr(\text{1st blue}) = \left(\tfrac12\times\tfrac38\right)\div\tfrac12" />, the same <Katex tex="\tfrac38" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\Pr(\text{2 of next 3 red} \mid \text{1st blue}) \\ &\quad = \Pr(\text{2 of 3 red}) \end{aligned}" />,
    reason: <>Only the probabilities have changed: now <Katex tex="\Pr(\text{red})=\tfrac23" /> and <Katex tex="\Pr(\text{blue})=\tfrac13" />. The cards are still replaced and the draws are still independent, so, exactly as in part b, knowing the first card is blue tells you nothing about the next three.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} Y &\sim \mathrm{Bi}\!\left(3,\tfrac23\right) \\ \Pr(Y=2) &= \binom32\left(\tfrac23\right)^2\left(\tfrac13\right)^1 \end{aligned}" />,
    reason: <>Let <Katex tex="Y" /> be the number of red cards in the next three draws: <Katex tex="n=3" /> (the first card is not one of the trials) and <Katex tex="p=\Pr(\text{red})=\tfrac23" />.</>,
  },
  {
    working: <Katex display tex="= 3\times\tfrac49\times\tfrac13 = \tfrac{12}{27}" />,
    reason: <>The three orders <Katex tex="RRB" />, <Katex tex="RBR" />, <Katex tex="BRR" /> each have probability <Katex tex="\tfrac23\times\tfrac23\times\tfrac13=\tfrac{4}{27}" /> — the report notes some students gave just <Katex tex="\Pr(RRB)=\tfrac{4}{27}" />, which counts only one of the three orders.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac49}" />,
    reason: <>Simplify <Katex tex="\tfrac{12}{27}" />. Set up as a conditional probability (as the report notes a significant number of students did), <Katex tex="\Pr(\text{1st blue and 2 of next 3 red})=\tfrac13\times\tfrac49=\tfrac{4}{27}" /> must be divided by <Katex tex="\Pr(\text{1st blue})=\tfrac13" />, giving <Katex tex="\tfrac49" /> again. The report notes many did not divide by <Katex tex="\tfrac13" /> (which leaves <Katex tex="\tfrac{4}{27}" />) or divided by <Katex tex="\tfrac12" /> (which gives <Katex tex="\tfrac{8}{27}" />) — with this deck, <Katex tex="\Pr(\text{1st blue})" /> is <Katex tex="\tfrac13" />, not <Katex tex="\tfrac12" />.</>,
  },
]

export default function MethodsQ4_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (5 marks)</p>
        <p>
          A card is drawn from a deck of red and blue cards. After verifying the colour, the
          card is replaced in the deck. This is performed four times.
          <br />
          Each card has a probability of <Katex tex="\tfrac12" /> of being red and a probability
          of <Katex tex="\tfrac12" /> of being blue.
          <br />
          The colour of any drawn card is independent of the colour of any other drawn card.
          <br />
          Let <Katex tex="X" /> be a random variable describing the number of blue cards drawn from the deck, in any order.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Binomial Distribution"
        marks={2}
        statement={
          <>
            Complete the table below by giving the probability of each outcome.
            <table className="mt-2 text-[13px] border-collapse text-center">
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="x" /></td>
                  {[0, 1, 2, 3, 4].map((k) => (
                    <td key={k} className="border border-gray-300 dark:border-gray-700 px-4 py-1">{k}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-3 py-1"><Katex tex="\Pr(X=x)" /></td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1"><Katex tex="\tfrac{1}{16}" /></td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1">&nbsp;</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1"><Katex tex="\tfrac{6}{16}" /></td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1">&nbsp;</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-1">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Conditional Binomial"
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
        topic="Independence"
        marks={2}
        statement={
          <>
            The deck is changed so that the probability of a card being red is{' '}
            <Katex tex="\tfrac23" /> and the probability of a card being blue is{' '}
            <Katex tex="\tfrac13" />.
            <br />
            Given that the first card drawn is blue, find the probability that exactly two of the next three cards drawn will be red.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Given the first card is blue, only the blue strip counts — and inside it the next three cards behave as usual">
          <BlueStripWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
