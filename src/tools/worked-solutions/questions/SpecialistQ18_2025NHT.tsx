// 2025 Specialist NHT — Exam 2, MCQ 18. The NHT report gives the answer key only, with no
// statistics. Vectors: n₁ × n₂ is perpendicular to both normals, so it lies along both planes
// (the direction of their line of intersection). Question text transcribed from the original
// paper (read from the page image; the 2025 paper has no text layer). Solution is original; the
// answer A agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const N1 = '\\underset{\\sim}{n}_1'
const N2 = '\\underset{\\sim}{n}_2'

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex={`${N1}\\times ${N2}\\ \\perp\\ ${N1}\\ \\text{ and }\\ ${N1}\\times ${N2}\\ \\perp\\ ${N2}`} />,
    reason: <>The cross product of two vectors is perpendicular to each of them.</>,
  },
  {
    working: <Katex display tex={`${N1}\\times ${N2}\\perp ${N1}\\implies ${N1}\\times ${N2}\\parallel\\Pi_1`} />,
    reason: <>A normal sticks straight out of its plane, so a vector at right angles to the normal lies along the plane. The same holds for <Katex tex={N2} /> and <Katex tex="\Pi_2" />.</>,
    more: <>Lying along both planes at once means it points along the line where they meet: <Katex tex={`${N1}\\times ${N2}`} /> is the direction vector of the line of intersection. That is the standard way to find that line.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{parallel to both }\Pi_1\text{ and }\Pi_2}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>D</b> confuses &ldquo;perpendicular to both normals&rdquo; with &ldquo;perpendicular to both planes&rdquo;; a vector perpendicular to a plane is a normal, which would make the planes parallel. Option <b>B</b> is false: the resolute of <Katex tex={N2} /> perpendicular to <Katex tex={N1} /> is a combination of <Katex tex={N1} /> and <Katex tex={N2} />, so it lies in their plane, while the cross product is at right angles to that plane. Option <b>C</b> is false for the same reason: <Katex tex={N1} />, <Katex tex={N2} /> and their cross product point in three independent directions, so they are linearly <b>independent</b>.</>,
  },
]

export default function SpecialistQ18_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          For two non-parallel planes <Katex tex="\Pi_1" /> and <Katex tex="\Pi_2" />, the cross product of their
          respective normal vectors <Katex tex={N1} /> and <Katex tex={N2} />
        </p>
      }
      options={[
        { letter: 'A', content: <>will be parallel to both <Katex tex="\Pi_1" /> and <Katex tex="\Pi_2" />.</>, isAnswer: true },
        { letter: 'B', content: <>is the vector resolute of <Katex tex={N2} /> perpendicular to <Katex tex={N1} />.</> },
        { letter: 'C', content: <>forms a linearly dependent set with <Katex tex={N1} /> and <Katex tex={N2} />.</> },
        { letter: 'D', content: <>will be perpendicular to both <Katex tex="\Pi_1" /> and <Katex tex="\Pi_2" />.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
