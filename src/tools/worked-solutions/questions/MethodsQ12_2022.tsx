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
    reason: <>Three red and <Katex tex="x" /> black.</>,
  },
  {
    working: <Katex display tex="\Pr(RB) = \frac{3}{3+x}\times\frac{x}{2+x}" />,
    reason: <>Red first: 3 of the <Katex tex="3+x" /> pens. Then black: all <Katex tex="x" /> black pens are still there, but only <Katex tex="2+x" /> pens are left, because the red one is not put back.</>,
  },
  {
    working: <Katex display tex="\Pr(BR) = \frac{x}{3+x}\times\frac{3}{2+x}" />,
    reason: <>Black first, then red. Only the numerators swap places, so this is the same product, <Katex tex="\tfrac{3x}{(3+x)(2+x)}" />.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{one of each}) = 2\times\frac{3x}{(3+x)(2+x)}" />,
    reason: <>"A pen of each colour" can happen in either order, so add the two branches of the tree.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{6x}{(2+x)(3+x)}}" />,
    reason: <>Matches option <b>A</b>. Option B counts only one order (red then black). Option C is just the second-draw factor, the chance of black after a red. A quick check with one black pen (<Katex tex="x=1" />): one of each means the black pen is one of the two drawn, which has probability <Katex tex="1-\tfrac34\times\tfrac23=\tfrac12" />, and only option A gives <Katex tex="\tfrac{6}{3\times4}=\tfrac12" />. (Checking with <Katex tex="x=3" /> would not separate A from C: both give <Katex tex="0.6" />.)</>,
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
