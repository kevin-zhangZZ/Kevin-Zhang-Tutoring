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
        <Katex tex="\Pr(A)+\Pr(B)=1" /> only fixes the value of <Katex tex="p" />.
      </>
    ),
    more: (
      <>
        The condition does <i>not</i> mean <Katex tex="B" /> is <Katex tex="A'" />: the next line shows{' '}
        <Katex tex="\Pr(A\cap B)=p^3" />, which is not <Katex tex="0" />, so the events overlap. (Solving{' '}
        <Katex tex="p+p^2=1" /> gives <Katex tex="p=\tfrac{\sqrt5-1}{2}\approx0.618" />, but no option needs it.)
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
        A probability table tracks the four regions. Totals: <Katex tex="\Pr(A')=1-p" />,{' '}
        <Katex tex="\Pr(B')=1-p^2" />. Each other cell is its row (or column) total minus the cell beside it.
      </>
    ),
    more: (
      <>
        For example, <Katex tex="\Pr(A\cap B')=p-p^3" /> (row <Katex tex="A" /> total minus{' '}
        <Katex tex="\Pr(A\cap B)" />), <Katex tex="\Pr(A'\cap B)=p^2-p^3" /> (column <Katex tex="B" /> total minus{' '}
        <Katex tex="\Pr(A\cap B)" />), and <Katex tex="\Pr(A'\cap B')=(1-p)-(p^2-p^3)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(A'\cup B)=1-\Pr(A\cap B')" />,
    reason: (
      <>
        <Katex tex="A'\cup B" /> is every cell in row <Katex tex="A'" /> or column <Katex tex="B" />: three of the four.
        Quicker to subtract the one cell left out, <Katex tex="A\cap B'" />, from <Katex tex="1" />.
      </>
    ),
    more: (
      <>
        <Katex tex="A'\cup B" /> means &ldquo;<Katex tex="A" /> doesn&apos;t happen, or <Katex tex="B" /> does&rdquo;.
        The only outcome it misses is &ldquo;<Katex tex="A" /> happens and <Katex tex="B" /> doesn&apos;t&rdquo;, which
        is <Katex tex="A\cap B'" />. Check with the addition rule:{' '}
        <Katex tex="\Pr(A')+\Pr(B)-\Pr(A'\cap B)=(1-p)+p^2-(p^2-p^3)=1-p+p^3" />, the same answer.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr(A'\cup B) = 1-(p-p^3) = 1-p+p^3}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: (
      <>
        Options B, C and E are single cells of the table: B is <Katex tex="\Pr(A'\cap B)" />, C is{' '}
        <Katex tex="\Pr(A\cap B')" /> (the one cell <Katex tex="A'\cup B" /> leaves out, so choosing it means forgetting
        to subtract from <Katex tex="1" />) and E is <Katex tex="\Pr(A'\cap B')" />. Option A is{' '}
        <Katex tex="1-\Pr(A)-\Pr(B)" />, which the given condition makes <Katex tex="0" />; it would be{' '}
        <Katex tex="\Pr(A'\cap B')" /> only if <Katex tex="A" /> and <Katex tex="B" /> didn&apos;t overlap.
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
