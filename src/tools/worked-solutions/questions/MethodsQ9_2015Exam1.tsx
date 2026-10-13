// 2015 Mathematical Methods (CAS) — Exam 1, Question 9 (4 marks).
// Total probability with a parameter p, then the reverse conditional and solving for p.
// Question text transcribed from the original paper (no diagram given). Answers checked
// with sympy and against the VCAA examination report. Solution is original.
// Interactives (b.i 28% and b.ii 19% full marks): b.i an area model of Pr(B | W) as orange share
// of the white eggs, with the reversed Pr(W | B) as a toggle; b.ii the graph of part b.i's answer
// against p, meeting y = 0.3 at p = 7/16. No parts skipped.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [47, 53],
  average: 0.5,
  comment: (
    <>
      Many students made good use of a tree diagram in their formulation of a solution. Some
      students left their answer unsimplified as a sum of two products. A significant number
      of students offered a final expression not in terms of <Katex tex="p" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [46, 26, 28],
  average: 0.8,
  comment: (
    <>
      While most students recognised that this question involved conditional probability,
      many could not apply it within the context of the specific question. Algebraic
      fractions were not handled well.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [81, 19],
  average: 0.2,
  comment: <>Many students missed the specific connection of this part with the previous part.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A) = p, \qquad \Pr(B) = 1-p" />,
    reason: <>Let <Katex tex="A" />, <Katex tex="B" /> be the farm the egg came from and <Katex tex="W" /> a white eggshell. Every egg comes from one farm, so the proportions add to <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\Pr(W) = \Pr(A)\Pr(W\mid A)+\Pr(B)\Pr(W\mid B)" />,
    reason: <>The law of total probability: add the two tree branches that end in a white egg.</>,
    more: <>The given fractions are conditional: <Katex tex="\tfrac35" /> is the white share <em>of farm A's eggs</em>, so it is <Katex tex="\Pr(W\mid A)" />, and each branch's probability is the product along it.</>,
  },
  {
    working: <Katex display tex="= p\times\frac35+(1-p)\times\frac15" />,
    reason: <>Substituting <Katex tex="\Pr(W\mid A)=\tfrac35" /> and <Katex tex="\Pr(W\mid B)=\tfrac15" /> from the stem.</>,
  },
  {
    working: <Katex display tex="= \frac{3p+1-p}{5}" />,
    reason: <>Common denominator <Katex tex="5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(W) = \frac{2p+1}{5}}" />,
    reason: <>Simplified, in terms of <Katex tex="p" />. Check at <Katex tex="p=1" /> (all eggs from farm A): <Katex tex="\tfrac35" /> ✓.</>,
    more: <>The report says some students left the answer unsimplified as a sum of two products, and a significant number gave a final expression not in terms of <Katex tex="p" />. Its general comments add that students who left part a. as a sum of two products often then had difficulty using it in part b., where this expression becomes the denominator. Simplify now and part (b) is short.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(B\mid W) = \frac{\Pr(B\cap W)}{\Pr(W)}" />,
    reason: <>Conditional probability. The egg is known to be white, so <Katex tex="W" /> goes after the bar and in the denominator.</>,
    more: <>The report says most students recognised conditional probability but many could not apply it in this context. A typical slip is answering <Katex tex="\Pr(W\mid B)=\tfrac15" />, which reverses the question: that is &ldquo;given farm B, is it white?&rdquo;. Here the colour is known and the farm is asked for. Whatever follows &ldquo;given that&rdquo; is the event you divide by.</>,
  },
  {
    working: <Katex display tex="\Pr(B\cap W) = (1-p)\times\frac15 = \frac{1-p}{5}" />,
    reason: <>Farm B and white: the farm B → white branch of the tree, the second product in part (a).</>,
  },
  {
    working: <Katex display tex="\Pr(B\mid W) = \frac{\frac{1-p}{5}}{\frac{2p+1}{5}}" />,
    reason: <>The denominator is <Katex tex="\Pr(W)" />, already found in part (a).</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(B\mid W) = \frac{1-p}{2p+1}}" />,
    reason: <>Multiplying numerator and denominator by <Katex tex="5" /> cancels both <Katex tex="\tfrac15" />s.</>,
    more: <>The report says algebraic fractions were not handled well. Dividing by a fraction is multiplying by its reciprocal: <Katex tex="\tfrac{1-p}{5}\times\tfrac{5}{2p+1}" />, and the <Katex tex="5" />s cancel. Check the ends: at <Katex tex="p=0" /> every egg is from farm B and the expression gives <Katex tex="1" /> ✓; at <Katex tex="p=1" /> none is, and it gives <Katex tex="0" /> ✓.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1-p}{2p+1} = 0.3" />,
    reason: <>&ldquo;This egg&rdquo; is the white egg of part (b)(i), so set that answer equal to <Katex tex="0.3" />.</>,
    more: <>The report says many students missed the connection of this part with the previous part. &ldquo;The probability that this egg came from farm B&rdquo; is exactly <Katex tex="\Pr(B\mid W)" />, which part (b)(i) gave as a function of <Katex tex="p" />; part (b)(ii) runs it backwards.</>,
  },
  {
    working: <Katex display tex="1-p = 0.3(2p+1) = 0.6p+0.3" />,
    reason: <>Multiplying both sides by <Katex tex="2p+1" />, which is positive for <Katex tex="0\le p\le 1" />.</>,
  },
  {
    working: <Katex display tex="0.7 = 1.6p" />,
    reason: <>Adding <Katex tex="p" /> to both sides and subtracting <Katex tex="0.3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p = \frac{0.7}{1.6} = \frac{7}{16}}" />,
    reason: <><Katex tex="p=0.4375" /> lies in <Katex tex="[0,1]" />, as a proportion must.</>,
    more: <>Check: <Katex tex="\dfrac{1-\frac{7}{16}}{2\times\frac{7}{16}+1} = \dfrac{9/16}{30/16} = \dfrac{9}{30} = 0.3" /> ✓. So a little under half the company's eggs come from farm A.</>,
  },
]

const WShare = lazyWidget(() => import('../interactives/meth-2015e1-q9bi-share'))
const WSolve = lazyWidget(() => import('../interactives/meth-2015e1-q9bii-solve'))

export default function MethodsQ9_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (4 marks)</p>
        <p>
          An egg marketing company buys its eggs from farm A and farm B. Let{' '}
          <Katex tex="p" /> be the proportion of eggs that the company buys from farm A. The
          rest of the company's eggs come from farm B. Each day, the eggs from both farms
          are taken to the company's warehouse. Assume that <Katex tex="\tfrac35" /> of all
          eggs from farm A have white eggshells and <Katex tex="\tfrac15" /> of all eggs from
          farm B have white eggshells.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Total Probability"
        marks={1}
        statement={
          <>
            An egg is selected at random from the set of all eggs at the warehouse. Find, in
            terms of <Katex tex="p" />, the probability that the egg has a white eggshell.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="One tree, used three times">
          <p>
            Draw the tree once: first branch the farm (<Katex tex="p" /> and{' '}
            <Katex tex="1-p" />), then the shell colour (<Katex tex="\tfrac35" /> and{' '}
            <Katex tex="\tfrac15" />).
          </p>
          <p>
            Part (a) adds the two white-shell branches. Part (b)(i) is one of those branches
            over their sum. Part (b)(ii) sets that equal to a number and solves. Nothing new
            is computed after the tree is drawn.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Conditional Probability"
        marks={2}
        statement={
          <>
            Another egg is selected at random from the set of all eggs at the warehouse.
            Given that the egg has a white eggshell, find, in terms of <Katex tex="p" />, the
            probability that it came from farm B.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
        <Explore title="Given white, the whole is the white eggs only">
          <WShare />
        </Explore>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Solve for p"
        marks={1}
        statement={
          <>
            If the probability that this egg came from farm B is <Katex tex="0.3" />, find
            the value of <Katex tex="p" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
        <Explore title="Part (b)(ii) reads part (b)(i)'s answer backwards">
          <WSolve />
        </Explore>
      </PartCard>
    </div>
  )
}
