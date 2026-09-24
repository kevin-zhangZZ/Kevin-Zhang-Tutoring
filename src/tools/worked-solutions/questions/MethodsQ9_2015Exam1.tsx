// 2015 Mathematical Methods (CAS) — Exam 1, Question 9 (4 marks).
// Total probability with a parameter p, then the reverse conditional and solving for p.
// Question text transcribed from the original paper (no diagram given). Answers checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
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
    reason: <>Every egg comes from one farm or the other.</>,
  },
  {
    working: <Katex display tex="\Pr(W) = \Pr(A)\Pr(W\mid A)+\Pr(B)\Pr(W\mid B)" />,
    reason: <>The law of total probability — the two branches of the tree.</>,
  },
  {
    working: <Katex display tex="= p\times\frac35+(1-p)\times\frac15" />,
    reason: <>Substituting the two given rates.</>,
  },
  {
    working: <Katex display tex="= \frac{3p+1-p}{5}" />,
    reason: <>Common denominator <Katex tex="5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(W) = \frac{2p+1}{5}}" />,
    reason: <>Simplified and in terms of <Katex tex="p" />, both of which the report says were often missing. Sanity check at <Katex tex="p=1" />: all eggs from farm A gives <Katex tex="\tfrac35" /> ✓.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(B\mid W) = \frac{\Pr(B\cap W)}{\Pr(W)}" />,
    reason: <>The conditioning runs backwards here: the colour is known, the farm is not.</>,
  },
  {
    working: <Katex display tex="\Pr(B\cap W) = (1-p)\times\frac15 = \frac{1-p}{5}" />,
    reason: <>The second branch of the tree from part (a) — no new work.</>,
  },
  {
    working: <Katex display tex="\Pr(B\mid W) = \frac{\frac{1-p}{5}}{\frac{2p+1}{5}}" />,
    reason: <>Both numerator and denominator have a <Katex tex="\tfrac15" />, which is about to cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{1-p}{2p+1}}" />,
    reason: <>Dividing algebraic fractions — the report says this is where the marks went. Check at <Katex tex="p=0" />: every egg is from farm B, and the expression gives <Katex tex="1" /> ✓.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1-p}{2p+1} = 0.3" />,
    reason: <>Straight from part (b)(i) — the report says many students missed that connection.</>,
  },
  {
    working: <Katex display tex="1-p = 0.3(2p+1) = 0.6p+0.3" />,
    reason: <>Cross-multiplying.</>,
  },
  {
    working: <Katex display tex="0.7 = 1.6p" />,
    reason: <>Collecting the <Katex tex="p" /> terms.</>,
  },
  {
    working: <Katex display tex="\boxed{p = \frac{7}{16}}" />,
    reason: <><Katex tex="0.4375" />, comfortably inside <Katex tex="[0,1]" />. So a little under half the company's eggs come from farm A.</>,
  },
]

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
      </PartCard>
    </div>
  )
}
