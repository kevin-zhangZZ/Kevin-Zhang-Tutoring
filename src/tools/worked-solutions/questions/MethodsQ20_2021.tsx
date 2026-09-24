// 2021 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 39% correct. Finding
// Pr(A' ∪ B) for two independent events with Pr(A) + Pr(B) = 1. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 17, C: 11, D: 39, E: 12 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\Pr(A)=p" />, <Katex tex="\Pr(B)=p^2" /> and
      <br />
      <Katex tex="\Pr(A)+\Pr(B)=1" />
      <br />
      <Katex tex="\Pr(A\cap B)=\Pr(A)\times\Pr(B)=p^3" /> since the events are independent
      <br />
      <Katex tex="\Pr(A\cap B')=p-p^3" />
      <br />
      <Katex tex="\Pr(A'\cup B)=1-\Pr(A\cap B')=1-p+p^3" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A)=p,\quad \Pr(B)=p^2,\quad \Pr(A)+\Pr(B)=1" />,
    reason: <>The given information. The condition <Katex tex="p+p^2=1" /> is not needed for this answer.</>,
  },
  {
    working: <Katex display tex="(A'\cup B)' = A\cap B'" />,
    reason: <>De Morgan's law: the complement of "<Katex tex="A" /> doesn't happen or <Katex tex="B" /> does" is "<Katex tex="A" /> happens and <Katex tex="B" /> doesn't".</>,
  },
  {
    working: <Katex display tex="\Pr(A'\cup B) = 1 - \Pr(A\cap B')" />,
    reason: <>Complement rule.</>,
  },
  {
    working: <Katex display tex="\Pr(A\cap B') = \Pr(A)\Pr(B')" />,
    reason: <>Since <Katex tex="A" /> and <Katex tex="B" /> are independent, so are <Katex tex="A" /> and <Katex tex="B'" />.</>,
  },
  {
    working: <Katex display tex="\Pr(B') = 1-\Pr(B) = 1-p^2" />,
    reason: <>Complement rule for <Katex tex="B" />.</>,
  },
  {
    working: <Katex display tex="\Pr(A\cap B') = p(1-p^2) = p-p^3" />,
    reason: <>Multiply out.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(A'\cup B) = 1-(p-p^3) = 1-p+p^3}" />,
    reason: <>Matches option <b>D</b>. Option C is <Katex tex="\Pr(A\cap B')" />, the complement of the event asked for.</>,
  },
]

export default function MethodsQ20_2021() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="A" /> and <Katex tex="B" /> be two independent events from a sample space.
          <br />
          If <Katex tex="\Pr(A)=p" />, <Katex tex="\Pr(B)=p^2" /> and <Katex tex="\Pr(A)+\Pr(B)=1" />, then{' '}
          <Katex tex="\Pr(A'\cup B)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1-p-p^2" /> },
        { letter: 'B', content: <Katex tex="p^2-p^3" /> },
        { letter: 'C', content: <Katex tex="p-p^3" /> },
        { letter: 'D', content: <Katex tex="1-p+p^3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="1-p-p^2+p^3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
