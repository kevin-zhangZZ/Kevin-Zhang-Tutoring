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
  comment: (
    <>
      The question asked for contrapositive, which occurs when switching the hypothesis and the
      conclusion and negating both.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P: \text{ I have a tiger} \qquad Q: \text{ I have a cat}" />,
    reason: <>Name the two statements: <Katex tex="P" /> is the &ldquo;if&rdquo; part (hypothesis), <Katex tex="Q" /> the &ldquo;then&rdquo; part (conclusion).</>,
  },
  {
    working: <Katex display tex="\text{the statement is } P \implies Q" />,
    reason: <>&ldquo;If I have a tiger, then I have a cat.&rdquo; True, since a tiger is a type of cat.</>,
  },
  {
    working: <Katex display tex="\text{contrapositive: } \lnot Q \implies \lnot P" />,
    reason: <>Swap the hypothesis and conclusion and negate both. The contrapositive is always logically equivalent to the original.</>,
    more: <>Why it is equivalent: if I did have a tiger, the original statement says I would have a cat. So having no cat rules out having a tiger.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{if I do not have a cat,} \\ \text{then I do not have a tiger}\end{gathered}}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: (
      <>
        Option <b>A</b> (5%) is the inverse <Katex tex="\lnot P\implies\lnot Q" />: negated but not swapped. It is false here, since someone with a lion has no tiger but does have a cat. Option <b>B</b> is the converse <Katex tex="Q\implies P" />: swapped but not negated, and false for the same reason. Option <b>D</b> is not a rearrangement of the statement at all: not having a tiger says nothing about owning any cat.
      </>
    ),
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
