// 2024 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 41% correct. This
// year's paper used four options (A–D) rather than five. Definite integral of a period-2
// function over two periods, given its average value on one period. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 23, C: 41, D: 14 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\tfrac12\int_0^2 f(x)\,dx=k \;\implies\; \int_0^2f(x)\,dx=2k" />, and{' '}
      <Katex tex="\int_0^2f=\int_2^4f=\int_4^6f=2k" />, so <Katex tex="\int_2^6f(x)\,dx=4k" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=f(x+2) \text{ for all } x\in\mathbb{R}" />,
    reason: <><Katex tex="f" /> is periodic with period 2.</>,
  },
  {
    working: <Katex display tex="\text{Average value on } [0,2] = \frac{1}{2-0}\int_0^2 f(x)\,dx = k" />,
    reason: 'Definition of average value.',
  },
  {
    working: <Katex display tex="\int_0^2 f(x)\,dx = 2k" />,
    reason: 'Rearrange.',
  },
  {
    working: <Katex display tex="\int_2^4 f(x)\,dx = \int_0^2 f(x)\,dx = 2k \qquad \int_4^6 f(x)\,dx = \int_0^2 f(x)\,dx = 2k" />,
    reason: <>Because <Katex tex="f" /> repeats every 2 units, the integral over <i>any</i> length-2 interval equals the integral over <Katex tex="[0,2]" />.</>,
  },
  {
    working: <Katex display tex="\int_2^6 f(x)\,dx = \int_2^4 f(x)\,dx + \int_4^6 f(x)\,dx = 2k+2k" />,
    reason: <>Split <Katex tex="[2,6]" /> into two length-2 pieces.</>,
  },
  {
    working: <Katex display tex="\boxed{4k}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function MethodsQ20_2024() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="f:\mathbb{R}\to\mathbb{R}" /> has an average value <Katex tex="k" /> on the
          interval <Katex tex="[0,2]" /> and satisfies <Katex tex="f(x)=f(x+2)" /> for all{' '}
          <Katex tex="x\in\mathbb{R}" />. The value of the definite integral{' '}
          <Katex tex="\displaystyle\int_2^6 f(x)\,dx" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2k" /> },
        { letter: 'B', content: <Katex tex="3k" /> },
        { letter: 'C', content: <Katex tex="4k" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="6k" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
