// 2024 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 72% correct.
// A contrapositive: swap the two halves and negate both. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 3, C: 72, D: 6 },
  answer: 'C',
  comment: (
    <>
      Asked for contrapositive – therefore, switch the hypothesis and the conclusion and negate
      both.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P \implies Q \quad\text{has contrapositive}\quad \neg Q \implies \neg P" />,
    reason: <>Both halves are negated and their order is swapped. Doing only one of the two gives the converse or the inverse instead.</>,
  },
  {
    working: <Katex display tex="P: \ m+n\ge9, \qquad Q: \ m\ge5 \text{ or } n\ge5" />,
    reason: <>Naming the two halves first keeps the negations straight.</>,
  },
  {
    working: <Katex display tex="\neg Q: \ \neg(m\ge5 \text{ or } n\ge5) \equiv m<5 \text{ and } n<5" />,
    reason: <>De Morgan: negating an <em>or</em> turns it into an <em>and</em>. This is the step that separates the right answer from option <b>A</b>, chosen by 20%.</>,
  },
  {
    working: <Katex display tex="\neg P: \ m+n<9" />,
    reason: <>The negation of <Katex tex="\ge" /> is <Katex tex="<" />, not <Katex tex="\le" /> — which rules out option <b>D</b>.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{if } m<5 \text{ and } n<5, \text{ then } m+n<9}" />,
    reason: <>Matches option <b>C</b>. A contrapositive is logically equivalent to the original, and indeed both are true here: two integers each below 5 are each at most 4, so their sum is at most 8.</>,
  },
]

export default function SpecialistQ1_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>Consider the statement</p>
          <p className="pl-5 italic">
            &lsquo;for any integers <Katex tex="m" /> and <Katex tex="n" />, if{' '}
            <Katex tex="m+n\ge9" /> then <Katex tex="m\ge5" /> or <Katex tex="n\ge5" />&rsquo;.
          </p>
          <p>The contrapositive of this statement is</p>
        </div>
      }
      options={[
        { letter: 'A', content: <>if <Katex tex="m<5" /> or <Katex tex="n<5" />, then <Katex tex="m+n<9" /></> },
        { letter: 'B', content: <>if <Katex tex="m\ge5" /> or <Katex tex="n\ge5" />, then <Katex tex="m+n\ge9" /></> },
        { letter: 'C', content: <>if <Katex tex="m<5" /> and <Katex tex="n<5" />, then <Katex tex="m+n<9" /></>, isAnswer: true },
        { letter: 'D', content: <>if <Katex tex="m\le5" /> and <Katex tex="n\le5" />, then <Katex tex="m+n\le9" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
