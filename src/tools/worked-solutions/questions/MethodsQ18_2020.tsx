// 2020 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 43% correct.
// Range of a hyperbola-type function on a domain split either side of its asymptote.
// Question text transcribed from the original paper (no diagram given — purely algebraic).
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 8, C: 29, D: 43, E: 6 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      The coordinates of the endpoints are <Katex tex="(-a,\,-1+b)" /> and <Katex tex="(a,\,1+b)" />
      . The range is <Katex tex="(-\infty,\,b-1]\cup[b+1,\,\infty)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h:[-a,0)\cup(0,a]\to\mathbb{R},\quad h(x)=\frac{a}{x}+b,\quad a\in(0,\infty),\ b\in\mathbb{R}" />,
    reason: <>Split the domain into its two pieces and examine <Katex tex="\tfrac{a}{x}" /> on each.</>,
  },
  {
    working: <Katex display tex="x\in(0,a]: \quad \frac{a}{x} \text{ is decreasing, from } \infty \text{ (as }x\to0^+\text{) down to } \frac{a}{a}=1 \text{ (at }x=a\text{)}" />,
    reason: <>On the positive piece, <Katex tex="\tfrac{a}{x}\in[1,\infty)" />.</>,
  },
  {
    working: <Katex display tex="\implies h(x) = \frac{a}{x}+b \in [b+1,\,\infty) \quad \text{for } x\in(0,a]" />,
  },
  {
    working: <Katex display tex="x\in[-a,0): \quad \text{let } x=-t,\ t\in(0,a] \;\implies\; \frac{a}{x} = -\frac{a}{t} \in (-\infty,-1]" />,
    reason: <>By the same reasoning on <Katex tex="t=-x\in(0,a]" />, but negated.</>,
  },
  {
    working: <Katex display tex="\implies h(x) = \frac{a}{x}+b \in (-\infty,\,b-1] \quad \text{for } x\in[-a,0)" />,
  },
  {
    working: <Katex display tex="\boxed{\text{Range} = (-\infty,\,b-1]\cup[b+1,\,\infty)}" />,
    reason: <>Union of the two pieces' ranges — matches option <b>D</b>.</>,
  },
]

export default function MethodsQ18_2020() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="a\in(0,\infty)" /> and <Katex tex="b\in\mathbb{R}" />.
          <br />
          Consider the function <Katex tex="h:[-a,0)\cup(0,a]\to\mathbb{R},\ h(x)=\dfrac{a}{x}+b" />.
          <br />
          The range of <Katex tex="h" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="[b-1,\,b+1]" /> },
        { letter: 'B', content: <Katex tex="(b-1,\,b+1)" /> },
        { letter: 'C', content: <Katex tex="(-\infty,\,b-1)\cup(b+1,\,\infty)" /> },
        { letter: 'D', content: <Katex tex="(-\infty,\,b-1]\cup[b+1,\,\infty)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="[b-1,\,\infty)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
