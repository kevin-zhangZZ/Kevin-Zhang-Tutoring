// 2019 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 30% correct.
// The condition for independence of two events A and B, given conditional probabilities.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 30, B: 23, C: 16, D: 12, E: 19 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A)=p,\quad \Pr(B\mid A)=m,\quad \Pr(B\mid A')=n" />,
    reason: 'Given information.',
  },
  {
    working: <>Events <Katex tex="A" /> and <Katex tex="B" /> are independent exactly when knowing <Katex tex="A" /> occurred doesn't change the probability of <Katex tex="B" />.</>,
    reason: <>The definition of independence: <Katex tex="\Pr(B\mid A) = \Pr(B)" />.</>,
  },
  {
    working: <Katex display tex="\Pr(B) = \Pr(B\mid A)\Pr(A) + \Pr(B\mid A')\Pr(A') = mp+n(1-p)" />,
    reason: 'Law of total probability.',
  },
  {
    working: <>If <Katex tex="A,B" /> are independent, both <Katex tex="\Pr(B\mid A)" /> and <Katex tex="\Pr(B\mid A')" /> must equal the same value, <Katex tex="\Pr(B)" />.</>,
    reason: <>So <Katex tex="m=\Pr(B)=n" /> — the conditional probability doesn't depend on whether <Katex tex="A" /> occurred or not.</>,
  },
  {
    working: <Katex display tex="\boxed{m=n}" />,
    reason: <>Matches option <b>A</b>. (This also makes sense directly: if <Katex tex="\Pr(B\mid A)=\Pr(B\mid A')" />, then <Katex tex="B" /> occurs at the same rate regardless of <Katex tex="A" />, which is exactly independence — and this holds for any value of <Katex tex="p" />.)</>,
  },
]

export default function MethodsQ11_2019() {
  return (
    <MCQShell
      question={
        <p>
          <Katex tex="A" /> and <Katex tex="B" /> are events from a sample space such that <Katex tex="\Pr(A)=p" />,
          where <Katex tex="p>0" />, <Katex tex="\Pr(B\mid A)=m" /> and <Katex tex="\Pr(B\mid A')=n" />.
          <br />
          <Katex tex="A" /> and <Katex tex="B" /> are independent events when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="m=n" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="m=1-p" /> },
        { letter: 'C', content: <Katex tex="m+n=1" /> },
        { letter: 'D', content: <Katex tex="m=p" /> },
        { letter: 'E', content: <Katex tex="m+n=1-p" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
