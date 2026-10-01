// 2021 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 39% correct. Finding
// Pr(A' ∪ B) for two independent events with Pr(A) + Pr(B) = 1. Question text transcribed
// from the original paper. Solution is original. No widget: the probability table in the
// working already shows every region, and p is fixed, so there is nothing to manipulate.

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
    working: <Katex display tex="\Pr(A)=p,\quad \Pr(B)=p^2" />,
    reason: (
      <>
        Every option is written in terms of <Katex tex="p" />, so these are all we need. The condition{' '}
        <Katex tex="\Pr(A)+\Pr(B)=1" /> only fixes the value of <Katex tex="p" />. It does <i>not</i> mean{' '}
        <Katex tex="B" /> is <Katex tex="A'" />: as the next line shows, the events overlap.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(A\cap B)=\Pr(A)\times\Pr(B)=p\times p^2=p^3" />,
    reason: <>The events are independent, so the probability that both happen is the product.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{array}{c|c|c|c} & B & B' & \\ \hline A & p^3 & p-p^3 & p \\ \hline A' & p^2-p^3 & 1-p-p^2+p^3 & 1-p \\ \hline & p^2 & 1-p^2 & 1\end{array}"
      />
    ),
    reason: (
      <>
        A probability table keeps track of the four regions. The totals come from the given probabilities (and{' '}
        <Katex tex="\Pr(A')=1-p" />, <Katex tex="\Pr(B')=1-p^2" />); each other cell is a total minus the cell beside it,
        e.g. <Katex tex="\Pr(A\cap B')=p-p^3" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(A'\cup B)=1-\Pr(A\cap B')" />,
    reason: (
      <>
        <Katex tex="A'\cup B" /> means &ldquo;<Katex tex="A" /> doesn&apos;t happen, or <Katex tex="B" /> does&rdquo;: every
        cell in row <Katex tex="A'" /> or column <Katex tex="B" />. That is three of the four cells, so it is quicker to
        take the one cell left out, <Katex tex="A\cap B'" /> (in <Katex tex="A" /> but not in <Katex tex="B" />), away
        from <Katex tex="1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr(A'\cup B) = 1-(p-p^3) = 1-p+p^3}" />,
    reason: (
      <>
        Matches option <b>D</b>. Options B, C and E are single cells of the table: B is <Katex tex="\Pr(A'\cap B)" />, C
        is <Katex tex="\Pr(A\cap B')" /> (the one cell <Katex tex="A'\cup B" /> leaves out) and E is{' '}
        <Katex tex="\Pr(A'\cap B')" />. Option A is <Katex tex="1-\Pr(A)-\Pr(B)" />, which the given condition makes{' '}
        <Katex tex="0" />.
      </>
    ),
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
