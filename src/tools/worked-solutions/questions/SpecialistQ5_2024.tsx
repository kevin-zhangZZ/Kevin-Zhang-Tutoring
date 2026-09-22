// 2024 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 70% correct.
// Conjugate then negate: the two reflections compose into one. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 13, C: 70, D: 4 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z = 1+\sqrt3\,i" />,
    reason: 'The point (1, √3) on the Argand diagram.',
  },
  {
    working: <Katex display tex="\bar{z} = 1-\sqrt3\,i" />,
    reason: 'Conjugation reflects in the real axis.',
  },
  {
    working: <Katex display tex="-\bar{z} = -1+\sqrt3\,i" />,
    reason: 'Negating rotates by 180° about the origin.',
  },
  {
    working: <Katex display tex="(1,\sqrt3) \mapsto (-1,\sqrt3)" />,
    reason: <>Comparing start and finish: the imaginary part is unchanged and the real part has flipped sign.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{reflection in the imaginary axis}}" />,
    reason: <>Option <b>C</b>. Reflecting then rotating by 180° is the same single reflection in the perpendicular axis — true for <em>every</em> <Katex tex="z" />, so no calculation with these particular numbers is really needed. Option <b>A</b> describes <Katex tex="\bar{z}" /> alone.</>,
  },
]

export default function SpecialistQ5_2024() {
  return (
    <MCQShell
      question={
        <p>
          If the point <Katex tex="z=1+\sqrt3\,i" /> is represented on an Argand diagram, the
          point representing <Katex tex="-\bar{z}" /> can be located by
        </p>
      }
      options={[
        { letter: 'A', content: <>reflecting the point representing <Katex tex="z" /> in the real axis.</> },
        { letter: 'B', content: <>rotating the point representing <Katex tex="z" /> anticlockwise about the origin by 90°.</> },
        { letter: 'C', content: <>reflecting the point representing <Katex tex="z" /> in the imaginary axis.</>, isAnswer: true },
        { letter: 'D', content: <>rotating the point representing <Katex tex="z" /> clockwise about the origin by 90°.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
