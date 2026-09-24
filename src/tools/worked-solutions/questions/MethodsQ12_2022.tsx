// 2022 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 52% correct.
// Drawing one of each colour without replacement. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 52, B: 24, C: 6, D: 15, E: 3 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{total pens} = 3+x" />,
    reason: <>Three red and x black.</>,
  },
  {
    working: <Katex display tex="\Pr(RB) = \frac{3}{3+x}\times\frac{x}{2+x}" />,
    reason: <>Without replacement, so the second denominator drops by one.</>,
  },
  {
    working: <Katex display tex="\Pr(BR) = \frac{x}{3+x}\times\frac{3}{2+x}" />,
    reason: <>The same product, in the other order.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{one of each}) = 2\times\frac{3x}{(3+x)(2+x)}" />,
    reason: <>"A pen of each colour" does not specify which comes first, so both orders count — option B keeps only one.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{6x}{(2+x)(3+x)}}" />,
    reason: <>Matches option <b>A</b>. Check at <Katex tex="x=3" />: <Katex tex="\tfrac{18}{30}=0.6" />, which is right for three of each.</>,
  },
]

export default function MethodsQ12_2022() {
  return (
    <MCQShell
      question={
        <p>
          A bag contains three red pens and <Katex tex="x" /> black pens. Two pens are
          randomly drawn from the bag without replacement.
          <br />
          The probability of drawing a pen
          of each colour is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{6x}{(2+x)(3+x)}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\frac{3x}{(2+x)(3+x)}" /> },
        { letter: 'C', content: <Katex tex="\frac{x}{2+x}" /> },
        { letter: 'D', content: <Katex tex="\frac{3+x}{(2+x)(3+x)}" /> },
        { letter: 'E', content: <Katex tex="\frac{3+x}{5+2x}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
