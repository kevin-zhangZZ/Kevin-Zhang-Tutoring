// 2022 Mathematical Methods — Exam 1 Question 4 (5 marks). A binomial table, then two
// questions where the "given" clause turns out to be irrelevant. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.
// Interactive: part c has an area-model widget (interactives/meth-2022e1-q4c-blue-strip.tsx) —
// "given the first card is blue" keeps only the blue strip, with buttons for the report's slips
// (not dividing by 1/3, dividing by 1/2, Pr(RRB) only). Re-audited 9 Oct 2026: kept, numbers
// re-checked with sympy. Part b (36% full marks) has no widget on purpose: it is the same
// "the condition drops out" idea with p = 1/2, which the part c area model already shows on the
// deck where the report's slips actually happened; a second strip model would repeat it.
// Concise/Detailed pass 9 Oct 2026: reasons trimmed to the step itself; report commentary, the
// conditional-probability route, the replacement/Pascal checks and the slips moved to rows' `more`.
// Final review 9 Oct 2026: the conditional routes in b and c now get Pr(A∩B) from the four-draw
// tree (not from the answer); the widget's band heights moved outside the square.

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
    more: <>Replacing the card is what keeps <Katex tex="\Pr(\text{blue})" /> at <Katex tex="\tfrac12" /> on every draw. Without replacement the deck would change after each draw, the probability would change with it, and <Katex tex="X" /> would not be binomial.</>,
  },
  {
    working: <Katex display tex="\binom40,\binom41,\binom42,\binom43,\binom44 = 1,\ 4,\ 6,\ 4,\ 1" />,
    reason: <>The binomial coefficients for <Katex tex="n=4" />: the 1, 4, 6, 4, 1 row of Pascal’s triangle.</>,
    more: <>Without the triangle: <Katex tex="\binom41=4" /> because the one blue card can be any of the four draws, and <Katex tex="\binom42=\tfrac{4\times3}{2\times1}=6" />. The row reads the same backwards because choosing which <Katex tex="x" /> draws are blue is the same as choosing which <Katex tex="4-x" /> are red — a quick check.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{array}{c|ccccc} x & 0 & 1 & 2 & 3 & 4 \\ \hline \Pr(X=x) & \tfrac{1}{16} & \tfrac{4}{16} & \tfrac{6}{16} & \tfrac{4}{16} & \tfrac{1}{16} \end{array}}" />,
    reason: <>Each coefficient over 16. The given entries <Katex tex="\tfrac1{16}" /> and <Katex tex="\tfrac6{16}" /> match, and the five probabilities add to <Katex tex="\tfrac{16}{16}=1" />, as they must for any probability distribution.</>,
    more: <>The report notes a significant number did not recognise that the probabilities had to sum to one. That fact alone nearly fills the table: with <Katex tex="p=\tfrac12" /> the table is symmetric, so <Katex tex="\Pr(X=4)=\Pr(X=0)=\tfrac1{16}" /> and <Katex tex="\Pr(X=3)=\Pr(X=1)" />; the sum of 1 then leaves <Katex tex="1-\tfrac{1+6+1}{16}=\tfrac{8}{16}" /> to share equally between them, <Katex tex="\tfrac4{16}" /> each.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\Pr(\text{2 of next 3 red} \mid \text{1st blue}) \\ &\quad = \Pr(\text{2 of 3 red}) \end{aligned}" />,
    reason: <>The cards are replaced and every draw is independent of the others, so knowing the first card is blue changes nothing about the next three: they behave exactly like three fresh draws.</>,
    more: <>Formally, with <Katex tex="A" /> = “exactly two of the next three are red” and <Katex tex="B" /> = “the first card is blue”, independence gives <Katex tex="\Pr(A\cap B)=\Pr(A)\Pr(B)" />, so <Katex tex="\Pr(A\mid B)=\dfrac{\Pr(A)\Pr(B)}{\Pr(B)}=\Pr(A)" />. So the word “given” doesn’t always change the answer: here the first card simply drops out.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} Y &\sim \mathrm{Bi}\!\left(3,\tfrac12\right) \\ \Pr(Y=2) &= \binom32\left(\tfrac12\right)^2\left(\tfrac12\right)^1 \end{aligned}" />,
    reason: <>Let <Katex tex="Y" /> be the number of red cards in the next three draws: <Katex tex="n=3" /> independent draws (the first card is not one of them), each red with <Katex tex="p=\tfrac12" />. The <Katex tex="\binom32=3" /> counts the three orders <Katex tex="RRB" />, <Katex tex="RBR" />, <Katex tex="BRR" />.</>,
  },
  {
    working: <Katex display tex="= 3\times\tfrac18 = \boxed{\tfrac38}" />,
    reason: <>Each of the three orders has probability <Katex tex="\left(\tfrac12\right)^3=\tfrac18" />.</>,
    more: (
      <>
        <p>
          The tree diagram many students drew shows the same thing: the next three draws make 8 equally
          likely paths, each <Katex tex="\tfrac18" />, and exactly two are red on 3 of them.
        </p>
        <p>
          The report notes a significant number treated it as a conditional probability, which was
          acceptable. On a tree of all four draws, <Katex tex="A\cap B" /> is the three paths that start
          blue and then go <Katex tex="RRB" />, <Katex tex="RBR" /> or <Katex tex="BRR" />, each with
          probability <Katex tex="\left(\tfrac12\right)^4=\tfrac1{16}" />:
        </p>
        <Katex display tex="\begin{aligned} \Pr(A\mid B) &= \dfrac{\Pr(A\cap B)}{\Pr(B)} \\ &= \dfrac{3\times\tfrac1{16}}{\tfrac12} = \dfrac{\tfrac3{16}}{\tfrac12} = \tfrac38 \end{aligned}" />
        <p>
          Stopping at the numerator, <Katex tex="\Pr(A\cap B)=\tfrac3{16}" />, would give the probability that the first
          card is blue <em>and</em> two of the next three are red — not the probability given that the
          first is blue.
        </p>
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\Pr(\text{2 of next 3 red} \mid \text{1st blue}) \\ &\quad = \Pr(\text{2 of 3 red}) \end{aligned}" />,
    reason: <>Only the probabilities have changed: the cards are still replaced and the draws still independent, so, as in part b, knowing the first card is blue tells you nothing about the next three.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} Y &\sim \mathrm{Bi}\!\left(3,\tfrac23\right) \\ \Pr(Y=2) &= \binom32\left(\tfrac23\right)^2\left(\tfrac13\right)^1 \end{aligned}" />,
    reason: <>Let <Katex tex="Y" /> be the number of red cards in the next three draws: <Katex tex="n=3" /> (the first card is not one of the trials) and <Katex tex="p=\Pr(\text{red})=\tfrac23" />.</>,
  },
  {
    working: <Katex display tex="= 3\times\tfrac49\times\tfrac13 = \tfrac{12}{27}" />,
    reason: <>Each of the three orders <Katex tex="RRB" />, <Katex tex="RBR" />, <Katex tex="BRR" /> has two reds and one blue, so each has probability <Katex tex="\left(\tfrac23\right)^2\times\tfrac13=\tfrac{4}{27}" />.</>,
    more: <>The report notes some students interpreted the question as wanting <Katex tex="\Pr(RRB)" /> only and gave <Katex tex="\tfrac{4}{27}" />. “Exactly two of the next three” doesn’t say <em>which</em> two, so all three orders count — that is what the <Katex tex="\binom32=3" /> is for.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac49}" />,
    reason: <>Simplify <Katex tex="\tfrac{12}{27}" /> by dividing top and bottom by 3.</>,
    more: (
      <>
        <p>
          The report notes a significant number of students set it up as a conditional probability. That
          works too, provided you divide by the right thing. With <Katex tex="A" /> = “exactly two of the
          next three are red” and <Katex tex="B" /> = “the first card is blue”, a tree of all four draws
          has three paths in <Katex tex="A\cap B" />: blue, then <Katex tex="RRB" />, <Katex tex="RBR" /> or{' '}
          <Katex tex="BRR" />, each with probability <Katex tex="\tfrac13\times\tfrac4{27}=\tfrac4{81}" />.
        </p>
        <Katex display tex="\begin{aligned} \Pr(A\mid B) &= \dfrac{\Pr(A\cap B)}{\Pr(B)} \\ &= \dfrac{3\times\tfrac4{81}}{\tfrac13} = \dfrac{\tfrac4{27}}{\tfrac13} = \tfrac49 \end{aligned}" />
        <p>
          The report notes many did not divide by <Katex tex="\tfrac13" />, which leaves{' '}
          <Katex tex="\tfrac{4}{27}" /> (the probability that the first card is blue <em>and</em> two of
          the next three are red — the same number as <Katex tex="\Pr(RRB)" /> only because{' '}
          <Katex tex="3\times\tfrac13=1" />, so a different slip from counting one order), or
          divided by <Katex tex="\tfrac12" />, which gives{' '}
          <Katex tex="\tfrac{8}{27}" />. The <Katex tex="\tfrac12" /> was <Katex tex="\Pr(\text{blue})" /> for
          part b’s deck; with this deck <Katex tex="\Pr(\text{1st blue})=\tfrac13" />. The diagram below
          shows all three slips on an area model.
        </p>
      </>
    ),
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
