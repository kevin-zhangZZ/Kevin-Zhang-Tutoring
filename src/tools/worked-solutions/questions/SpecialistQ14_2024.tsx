// 2024 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 36% correct. This
// year's paper used four options (A–D) rather than five. Given the vector resolute of r in
// the direction of s, find the scalar resolute of s in the direction of r. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 36, C: 33, D: 17 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{vector resolute of } \vec r \text{ on } \vec s = \left(\frac{\vec r\cdot\vec s}{|\vec s|^2}\right)\vec s" />,
    reason: 'Standard formula for a vector resolute.',
  },
  {
    working: <Katex display tex="-4\vec i+4\vec j-2\vec k = -2\big(2\vec i-2\vec j+\vec k\big) = -2\vec s" />,
    reason: <>Recognise the given resolute as a scalar multiple of <Katex tex="\vec s" /> itself.</>,
  },
  {
    working: <Katex display tex="\frac{\vec r\cdot\vec s}{|\vec s|^2} = -2 \;\implies\; \vec r\cdot\vec s = -2|\vec s|^2" />,
    reason: 'Match coefficients with the formula above.',
  },
  {
    working: <Katex display tex="|\vec s|^2 = 2^2+(-2)^2+1^2 = 9 \;\implies\; \vec r\cdot\vec s = -18" />,
    reason: <>Compute <Katex tex="|\vec s|^2" /> directly from its components.</>,
  },
  {
    working: <Katex display tex="\text{scalar resolute of } \vec s \text{ on } \vec r = \frac{\vec s\cdot\vec r}{|\vec r|}" />,
    reason: <>Different formula from the vector resolute — this one divides by <Katex tex="|\vec r|" />, not <Katex tex="|\vec r|^2" />, and the dot product is symmetric.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{-18}{9} = -2}" />,
    reason: <>Using <Katex tex="|\vec r|=9" /> — matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ14_2024() {
  return (
    <MCQShell
      question={
        <p>
          Consider the vectors <Katex tex="\vec r" /> and <Katex tex="\vec s" /> where <Katex tex="|\vec r|=9" /> and{' '}
          <Katex tex="\vec s=2\vec i-2\vec j+\vec k" />.
          <br />
          If the vector resolute of <Katex tex="\vec r" /> in the direction of <Katex tex="\vec s" /> is equal to{' '}
          <Katex tex="-4\vec i+4\vec j-2\vec k" />, then the scalar resolute of <Katex tex="\vec s" /> in the direction
          of <Katex tex="\vec r" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-18" /> },
        { letter: 'B', content: <Katex tex="-2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
