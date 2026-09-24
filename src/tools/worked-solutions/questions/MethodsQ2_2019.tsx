// 2019 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 59% correct. The set of
// k for which a quadratic has two real solutions, via the discriminant. Question text
// transcribed from the original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 59, C: 15, D: 6, E: 9 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a=1, \quad b=2, \quad c=-k" />,
    reason: <>Matching <Katex tex="x^2+2x-k=0" /> to <Katex tex="ax^2+bx+c=0" />. Watch the sign: the constant term is <Katex tex="-k" />, not <Katex tex="k" /> — that minus sign is what flips the final inequality.</>,
  },
  {
    working: <Katex display tex="\Delta = b^2-4ac = 2^2-4(1)(-k) = 4+4k" />,
    reason: <>The discriminant decides how many real solutions a quadratic has: two if <Katex tex="\Delta>0" />, one if <Katex tex="\Delta=0" />, none if <Katex tex="\Delta<0" />.</>,
  },
  {
    working: <Katex display tex="\text{Two real solutions} \iff \Delta>0 \iff 4+4k>0 \iff k>-1" />,
    reason: <>Strictly greater than zero. At <Katex tex="k=-1" /> the discriminant is zero, giving only <em>one</em> solution — which is why <Katex tex="k=-1" /> must be excluded.</>,
  },
  {
    working: <Katex display tex="\boxed{k\in(-1,\infty)}" />,
    reason: <>Matches option <b>B</b>. The round bracket does the excluding; option <b>E</b>, <Katex tex="[-1,\infty)" />, wrongly includes <Katex tex="k=-1" />, the one-solution case. Option <b>C</b> (<Katex tex="15\%" />) has the inequality the wrong way round — what comes of taking <Katex tex="c=+k" />.</>,
  },
]

export default function MethodsQ2_2019() {
  return (
    <MCQShell
      question={
        <p>
          The set of values of <Katex tex="k" /> for which <Katex tex="x^2+2x-k=0" /> has two
          real solutions is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\{-1,1\}" /> },
        { letter: 'B', content: <Katex tex="(-1,\infty)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="(-\infty,-1)" /> },
        { letter: 'D', content: <Katex tex="\{-1\}" /> },
        { letter: 'E', content: <Katex tex="[-1,\infty)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
