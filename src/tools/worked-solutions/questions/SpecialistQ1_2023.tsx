// 2023 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 85% correct.
// The contrapositive: negate both parts and swap them. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 1, C: 85, D: 6, E: 5 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P \implies Q \quad\text{has contrapositive}\quad \lnot Q \implies \lnot P" />,
    reason: <>Negate both statements and reverse the arrow. The contrapositive is always logically equivalent to the original.</>,
  },
  {
    working: <Katex display tex="P: \text{my team plays badly}; \qquad Q: \text{they are not training enough}" />,
    reason: <>Name the two parts before touching them.</>,
  },
  {
    working: <Katex display tex="\lnot Q: \text{they } \textbf{are} \text{ training enough}" />,
    reason: <>The negation of "are not training enough".</>,
  },
  {
    working: <Katex display tex="\lnot P: \text{my team does } \textbf{not} \text{ play badly}" />,
    reason: <>And the negation of the first part.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{If they are training enough, then my football team does not play badly.}}" />,
    reason: <>Matches option <b>C</b>. Option <b>A</b> is the <em>converse</em> (swapped, not negated) and option <b>D</b> is the <em>inverse</em> (negated, not swapped); neither is equivalent to the original.</>,
  },
]

export default function SpecialistQ1_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>Consider the following statement.</p>
          <p>'If my football team plays badly, then they are not training enough.'</p>
          <p>
            Which one of the following statements is the contrapositive of the statement
            above?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <>If they are not training enough, then my football team plays badly.</> },
        { letter: 'B', content: <>If my football team plays badly, then they need more training.</> },
        { letter: 'C', content: <>If they are training enough, then my football team does not play badly.</>, isAnswer: true },
        { letter: 'D', content: <>If my football team doesn't play badly, then they are training enough.</> },
        { letter: 'E', content: <>If they are training enough, then my football team will most likely win.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
