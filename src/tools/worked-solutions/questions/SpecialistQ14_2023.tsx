// 2023 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 48% correct.
// Finding c·n for a unit vector n orthogonal to two given vectors. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 48, C: 16, D: 9, E: 19 },
  answer: 'B',
  comment: <Katex tex="\vec n = x\vec i+y\vec j+z\vec k,\ \ x+y=0,\ \ x-y=0 \;\implies\; x=0,\ y=0" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\vec n = x\vec i + y\vec j + z\vec k" />,
    reason: 'General form of the unknown vector.',
  },
  {
    working: <Katex display tex="\vec a\cdot\vec n = x+y = 0 \qquad \vec b\cdot\vec n = x-y = 0" />,
    reason: <>Apply the two orthogonality conditions with <Katex tex="\vec a=\vec i+\vec j" /> and <Katex tex="\vec b=\vec i-\vec j" />.</>,
  },
  {
    working: <Katex display tex="x+y=0 \text{ and } x-y=0 \;\implies\; x=0,\ y=0" />,
    reason: 'Add and subtract the two equations.',
  },
  {
    working: <Katex display tex="\vec n = z\vec k,\quad |\vec n|=1 \;\implies\; z=\pm1" />,
    reason: <>Only the <Katex tex="\vec k" /> component survives; the unit-length condition pins down <Katex tex="z" /> up to sign.</>,
  },
  {
    working: <Katex display tex="\vec n = \vec k" />,
    reason: 'Take the positive solution (the natural choice, giving one specific unit vector).',
  },
  {
    working: <Katex display tex="\boxed{\vec c\cdot\vec n = (\vec i+2\vec j+3\vec k)\cdot\vec k = 3}" />,
    reason: <>Only the <Katex tex="\vec k" /> component of <Katex tex="\vec c" /> contributes — matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ14_2023() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="\vec a = \vec i+\vec j" />, <Katex tex="\vec b=\vec i-\vec j" /> and{' '}
          <Katex tex="\vec c = \vec i+2\vec j+3\vec k" />.
          <br />
          If <Katex tex="\vec n" /> is a unit vector such that <Katex tex="\vec a\cdot\vec n=0" /> and{' '}
          <Katex tex="\vec b\cdot\vec n=0" />, then <Katex tex="\vec c\cdot\vec n" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="5" /> },
        { letter: 'E', content: <Katex tex="6" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
