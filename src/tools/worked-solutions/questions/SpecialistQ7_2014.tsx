// 2014 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 75% correct.
// The sum of the roots of a cubic, straight from its coefficients. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 4, C: 9, D: 4, E: 75 },
  answer: 'E',
  noAnswer: 0,
  comment: <>The sum of the roots must be a real number.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z^3-5z^2+11z-7 = 0" />,
    reason: <>There is no need to find the roots — the sum is fixed by the coefficients.</>,
  },
  {
    working: <Katex display tex="\text{sum of roots} = -\frac{\text{coefficient of } z^2}{\text{coefficient of } z^3}" />,
    reason: <>Vieta's relation for a cubic.</>,
  },
  {
    working: <Katex display tex="= -\frac{-5}{1} = 5" />,
    reason: <>Real, as the report notes it must be: the coefficients are real, so any non-real roots come in conjugate pairs whose imaginary parts cancel. That alone eliminates options A to D.</>,
  },
  {
    working: <Katex display tex="\boxed{5}" />,
    reason: <>Option E. (The roots happen to be <Katex tex="1" /> and <Katex tex="2\pm\sqrt3 i" />, which do sum to 5.)</>,
  },
]

export default function SpecialistQ7_2014() {
  return (
    <MCQShell
      question={
        <p>
          The sum of the roots of <Katex tex="z^3-5z^2+11z-7=0" />, where{' '}
          <Katex tex="z\in C" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1+2\sqrt3 i" /> },
        { letter: 'B', content: <Katex tex="5i" /> },
        { letter: 'C', content: <Katex tex="4-2\sqrt3 i" /> },
        { letter: 'D', content: <Katex tex="2\sqrt3 i" /> },
        { letter: 'E', content: <Katex tex="5" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
