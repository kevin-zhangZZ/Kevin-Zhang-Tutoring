// 2024 Specialist NHT — Exam 2, MCQ 1. The NHT report gives the answer key only, with no
// statistics. Proof: recognising a proof by contradiction (assume the negation, reach an
// impossible statement). Question text transcribed from the original paper. Solution is
// original; the answer C agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Assume } \sqrt{15}+\sqrt7\le\sqrt{19}" />,
    reason: <>The proof starts by assuming the <b>opposite</b> of what it wants to prove: the negation of <Katex tex="\sqrt{15}+\sqrt7>\sqrt{19}" /> is <Katex tex="\sqrt{15}+\sqrt7\le\sqrt{19}" />.</>,
    more: <>Squaring is allowed here because both sides are positive, so the inequality keeps its direction.</>,
  },
  {
    working: <Katex display tex="2\sqrt{105}\le-3" />,
    reason: <>This is impossible: a square root is never negative, so <Katex tex="2\sqrt{105}" /> cannot be less than or equal to <Katex tex="-3" />.</>,
    more: <>The assumption has led to a false statement, so the assumption must have been false, and its negation, the original claim, is true. Assume the negation, reach something impossible, conclude the claim: that is exactly the shape of a proof by contradiction.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{proof by contradiction}}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>A <b>direct proof</b> (A) would start from known facts and reach <Katex tex="\sqrt{15}+\sqrt7>\sqrt{19}" /> without assuming anything false. A <b>proof by contrapositive</b> (B) proves an implication <Katex tex="P\Rightarrow Q" /> by proving <Katex tex="\text{not }Q\Rightarrow\text{not }P" />; there is no implication here, just one statement. A <b>counter-example</b> (D) disproves a general claim, and <b>induction</b> (E) proves a statement for every natural number <Katex tex="n" />; neither fits a single numerical inequality.</>,
  },
]

export default function SpecialistQ1_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>Consider the following proof.</p>
          <div className="pl-6 flex flex-col gap-1">
            <p>Prove that <Katex tex="\sqrt{15}+\sqrt7>\sqrt{19}" />.</p>
            <p>Assume <Katex tex="\sqrt{15}+\sqrt7\le\sqrt{19}" />.</p>
            <p>Then <Katex tex="\left(\sqrt{15}+\sqrt7\right)^2\le19" /></p>
            <p className="pl-10"><Katex tex="15+2\sqrt{105}+7\le19" /></p>
            <p className="pl-10"><Katex tex="2\sqrt{105}\le-3" /></p>
            <p>hence <Katex tex="\sqrt{15}+\sqrt7>\sqrt{19}" />.</p>
          </div>
          <p>This proof can be best described as a</p>
        </div>
      }
      options={[
        { letter: 'A', content: <>direct proof.</> },
        { letter: 'B', content: <>proof by contrapositive.</> },
        { letter: 'C', content: <>proof by contradiction.</>, isAnswer: true },
        { letter: 'D', content: <>proof by counter-example.</> },
        { letter: 'E', content: <>proof by mathematical induction.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
