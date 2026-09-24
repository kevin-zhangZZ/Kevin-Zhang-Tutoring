// 2017 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 75% correct.
// A locus |z − 2 + i| = |z − 4| is a perpendicular bisector; find a point on it. Question
// text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 75, B: 6, C: 5, D: 10, E: 4 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z-(2-i)| = |z-4|" />,
    reason: <>Rewriting <Katex tex="z-2+i" /> as <Katex tex="z-(2-i)" />. The sign flip is the first thing to get right: the fixed point is <Katex tex="2-i" />, not <Katex tex="2+i" />.</>,
  },
  {
    working: <Katex display tex="\text{locus} = \text{perpendicular bisector of } (2,-1) \text{ and } (4,0)" />,
    reason: <>"Equidistant from two fixed points" is always the perpendicular bisector of the segment joining them.</>,
  },
  {
    working: <Katex display tex="\text{midpoint} = \left(\frac{2+4}{2},\ \frac{-1+0}{2}\right) = \left(3,-\frac12\right)" />,
    reason: <>The midpoint always lies on the bisector — and here it is option A, so no line equation is needed at all.</>,
  },
  {
    working: <Katex display tex="\text{full line: } y = -2x+\frac{11}{2}" />,
    reason: <>If the midpoint had not been one of the options: gradient of the segment is <Katex tex="\tfrac12" />, so the bisector's gradient is <Katex tex="-2" />, through <Katex tex="\left(3,-\tfrac12\right)" />. Substituting the other four options shows none of them satisfies this.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(3,-\tfrac12\right)}" />,
    reason: <>Matches option <b>A</b>. Direct check: <Katex tex="\left|3-\tfrac12i-(2-i)\right| = \left|1+\tfrac12i\right| = \tfrac{\sqrt5}{2}" /> and <Katex tex="\left|3-\tfrac12i-4\right| = \left|-1-\tfrac12i\right| = \tfrac{\sqrt5}{2}" /> ✓.</>,
  },
]

export default function SpecialistQ5_2017() {
  return (
    <MCQShell
      question={
        <p>
          On an Argand diagram, a point that lies on the path defined by{' '}
          <Katex tex="|z-2+i|=|z-4|" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left(3,-\tfrac12\right)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\left(-3,-\tfrac12\right)" /> },
        { letter: 'C', content: <Katex tex="\left(-3,\tfrac32\right)" /> },
        { letter: 'D', content: <Katex tex="\left(3,\tfrac12\right)" /> },
        { letter: 'E', content: <Katex tex="\left(3,-\tfrac32\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
