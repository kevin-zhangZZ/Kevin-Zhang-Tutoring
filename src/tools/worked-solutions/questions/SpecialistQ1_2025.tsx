// 2025 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 93% correct. This
// year's paper used four options (A–D) rather than five. Writing the contrapositive of a
// conditional statement. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 2, C: 93, D: 0 },
  answer: 'C',
  comment: <>The question asked for the contrapositive, which is formed by switching the hypothesis and the conclusion and negating both.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P: \text{ I have a tiger} \qquad Q: \text{ I have a cat}" />,
    reason: 'Name the two statements so the logic can be handled symbolically.',
  },
  {
    working: <Katex display tex="\text{the statement is } P \implies Q" />,
    reason: '"If I have a tiger, then I have a cat."',
  },
  {
    working: <Katex display tex="\text{contrapositive: } \lnot Q \implies \lnot P" />,
    reason: 'Swap the two halves and negate both. This is the one rearrangement that is always logically equivalent to the original.',
  },
  {
    working: <Katex display tex="\boxed{\text{if I do not have a cat, then I do not have a tiger}}" />,
    reason: <>Option <b>C</b>.</>,
  },
  {
    working: <Katex display tex="\text{converse } Q\implies P \text{ is option \textbf{B}}, \quad \text{inverse } \lnot P\implies\lnot Q \text{ is option \textbf{A}}" />,
    reason: 'The two distractors that catch students out. Neither follows from the original — a cat owner need not own a tiger.',
  },
]

export default function SpecialistQ1_2025() {
  return (
    <MCQShell
      question={
        <p>
          A tiger is a type of cat.
          <br />
          Consider the following statement.
          <br />
          &lsquo;If I have a tiger, then I have a cat.&rsquo;
          <br />
          The contrapositive of this statement is
        </p>
      }
      options={[
        { letter: 'A', content: <>if I do not have a tiger, then I do not have a cat.</> },
        { letter: 'B', content: <>if I have a cat, then I have a tiger.</> },
        { letter: 'C', content: <>if I do not have a cat, then I do not have a tiger.</>, isAnswer: true },
        { letter: 'D', content: <>if I do not have a tiger, then I have a different type of cat.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
