// 2020 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 34% correct.
// Given (x+iy)^14 = a+ib, find (y-ix)^14. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 34, B: 29, C: 15, D: 11, E: 11 },
  answer: 'A',
  comment: <Katex tex="(y-ix)^{14} = (-i(x+iy))^{14} = (-i)^{14}(x+iy)^{14} = -(a+ib) = -a-ib" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y - ix = -i(x+iy)" />,
    reason: <>Check: <Katex tex="-i(x+iy) = -ix - i^2y = -ix+y = y-ix" />. ✓</>,
  },
  {
    working: <Katex display tex="(y-ix)^{14} = \big(-i(x+iy)\big)^{14} = (-i)^{14}(x+iy)^{14}" />,
    reason: 'Raise both sides of the identity to the 14th power.',
  },
  {
    working: <Katex display tex="(-i)^2 = -1 \;\implies\; (-i)^{14} = \big((-i)^2\big)^7 = (-1)^7 = -1" />,
    reason: <>Simplify <Katex tex="(-i)^{14}" /> using its square.</>,
  },
  {
    working: <Katex display tex="(y-ix)^{14} = -1\cdot(x+iy)^{14} = -(a+ib)" />,
    reason: <>Substitute the given <Katex tex="(x+iy)^{14}=a+ib" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-a - ib}" />,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ8_2020() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="(x+iy)^{14} = a+ib" />, where <Katex tex="x,y,a,b\in\mathbb{R}" />,{' '}
          <Katex tex="(y-ix)^{14}" /> for all values of <Katex tex="x" /> and <Katex tex="y" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-a-ib" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="b-ia" /> },
        { letter: 'C', content: <Katex tex="-b+ia" /> },
        { letter: 'D', content: <Katex tex="-a+ib" /> },
        { letter: 'E', content: <Katex tex="b+ia" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
