// 2024 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 38% correct. This
// year's paper used four options (A–D) rather than five. What must be true of f, given that
// f′ takes both a negative and a positive value on its domain. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 26, B: 38, C: 16, D: 20 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="f" /> does not have to be strictly decreasing on <Katex tex="[0,2]" />; does not have to be
      positive on <Katex tex="[4,5]" />; does not have to have a local minimum at <Katex tex="x=3" />. But{' '}
      <Katex tex="f" /> is many-to-one on <Katex tex="[2,4]" />, since <Katex tex="f'" /> changes sign there — so{' '}
      <Katex tex="f" /> has no inverse function.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f:[0,5]\to\mathbb{R},\quad f' \text{ continuous},\quad f'(2)<0,\quad f'(4)>0" />,
    reason: 'Given information.',
  },
  {
    working: <>By the Intermediate Value Theorem, since <Katex tex="f'" /> is continuous and changes sign between <Katex tex="x=2" /> and <Katex tex="x=4" />, there is some point <Katex tex="c\in(2,4)" /> with <Katex tex="f'(c)=0" />, where <Katex tex="f'" /> switches from negative to positive.</>,
    reason: <>This is the <i>only</i> thing guaranteed — not exactly <b>where</b> in <Katex tex="(2,4)" /> it happens.</>,
  },
  {
    working: <>So <Katex tex="f" /> decreases up to <Katex tex="c" />, then increases after <Katex tex="c" /> — somewhere inside <Katex tex="[2,4]" />, but not necessarily at <Katex tex="x=3" /> specifically, and nothing is known about <Katex tex="f" /> outside <Katex tex="[2,4]" /> at all.</>,
    reason: <>Rules out A (only one point in <Katex tex="[0,2]" /> is pinned down, not the whole interval), C (no information about the function's <i>values</i>, only its gradient) and D (the minimum could be anywhere strictly between 2 and 4, not necessarily at <Katex tex="x=3" />).</>,
  },
  {
    working: <>Since <Katex tex="f" /> genuinely decreases then increases somewhere in <Katex tex="[2,4]\subset[0,5]" />, it takes at least one output value twice.</>,
    reason: 'A function that is not monotonic on any part of its domain cannot be one-to-one overall.',
  },
  {
    working: <Katex display tex="\boxed{f \text{ has no inverse function}}" />,
    reason: <>This <i>must</i> be true regardless of exactly where the turning point falls — matches option <b>B</b>.</>,
  },
]

export default function MethodsQ10_2024() {
  return (
    <MCQShell
      question={
        <p>
          Suppose a function <Katex tex="f:[0,5]\to\mathbb{R}" /> and its derivative{' '}
          <Katex tex="f':[0,5]\to\mathbb{R}" /> are defined and continuous on their domains. If{' '}
          <Katex tex="f'(2)<0" /> and <Katex tex="f'(4)>0" />, which one of these statements must be true?
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="f" /> is strictly decreasing on [0, 2].</> },
        { letter: 'B', content: <><Katex tex="f" /> does not have an inverse function.</>, isAnswer: true },
        { letter: 'C', content: <><Katex tex="f" /> is positive on [4, 5].</> },
        { letter: 'D', content: <><Katex tex="f" /> has a local minimum at <Katex tex="x=3" />.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
