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
    reason: <>The contrapositive negates both parts and swaps them (<Katex tex="\lnot P" /> means "not <Katex tex="P" />").</>,
    more: <>It always says the same thing as the original: if <Katex tex="Q" /> is false, then <Katex tex="P" /> can't have happened, because <Katex tex="P" /> would have forced <Katex tex="Q" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} P&: \text{my team plays badly} \\ Q&: \text{they are not training enough} \end{aligned}" />,
    reason: <>Name the "if" part <Katex tex="P" /> and the "then" part <Katex tex="Q" /> before negating anything.</>,
  },
  {
    working: <Katex display tex="\lnot Q: \text{they } \textbf{are} \text{ training enough}" />,
    reason: <>Negating "they are not training enough" removes the "not".</>,
  },
  {
    working: <Katex display tex="\lnot P: \text{my team does } \textbf{not} \text{ play badly}" />,
    reason: <>Negating "my team plays badly" adds a "not".</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{If they are training enough, then my} \\ \text{football team does not play badly.}\end{gathered}}" />,
    reason: <>Matches option <b>C</b>: <Katex tex="\lnot Q" /> first, then <Katex tex="\lnot P" />.</>,
    more: <>Option <b>A</b> is the <em>converse</em>, <Katex tex="Q \implies P" /> (swapped, not negated), and option <b>D</b>, the most common wrong answer, is the <em>inverse</em>, <Katex tex="\lnot P \implies \lnot Q" /> (negated, not swapped). Neither says the same thing as the original: a team that plays well but doesn't train enough is allowed by the original, yet breaks both <b>A</b> and <b>D</b>. Option <b>B</b> just restates the original (needing more training means not training enough), and <b>E</b> brings in winning, which the original never mentions.</>,
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
