// 2016 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 72% correct.
// Finding a from Arg(−1 + ai) = −2π/3. Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 72, B: 6, C: 7, D: 4, E: 10 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Arg}(z) = -\frac{2\pi}{3} \implies \text{third quadrant}" />,
    reason: <>An argument between <Katex tex="-\pi" /> and <Katex tex="-\tfrac{\pi}{2}" /> puts the point below the real axis and to the left of the imaginary axis. So the imaginary part must be negative, ruling out options D and E straight away.</>,
  },
  {
    working: <Katex display tex="\text{real part} = -1 \ \checkmark" />,
    reason: <>Consistent: the real part is already negative.</>,
  },
  {
    working: <Katex display tex="\tan\!\left(-\frac{2\pi}{3}\right) = \frac{a}{-1}" />,
    reason: <>The tangent of the argument is imaginary part over real part.</>,
  },
  {
    working: <Katex display tex="\tan\!\left(-\frac{2\pi}{3}\right) = \tan\!\left(\frac{\pi}{3}\right) = \sqrt3" />,
    reason: <>Reference angle <Katex tex="\tfrac{\pi}{3}" />, and tangent is positive in the third quadrant.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\sqrt3}" />,
    reason: <>Option A. Check: <Katex tex="-1-\sqrt3i" /> has modulus <Katex tex="2" /> and sits in the third quadrant, <Katex tex="\tfrac{\pi}{3}" /> below the negative real axis — which is <Katex tex="-\pi+\tfrac{\pi}{3}=-\tfrac{2\pi}{3}" /> ✓.</>,
  },
]

export default function SpecialistQ5_2016() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\operatorname{Arg}(-1+ai)=-\dfrac{2\pi}{3}" />, then the real number{' '}
          <Katex tex="a" /> is
        </p>
      }
      background={
        <p>
          Arguments are where quadrant errors live. Decide the quadrant from the sign of the
          argument <em>first</em>, and the sign of the answer follows before any arithmetic
          — here, a negative argument between <Katex tex="-\pi" /> and{' '}
          <Katex tex="-\tfrac{\pi}{2}" /> forces a negative imaginary part.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\sqrt3" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-\dfrac{\sqrt3}{2}" /> },
        { letter: 'C', content: <Katex tex="-\dfrac{1}{\sqrt3}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{1}{\sqrt3}" /> },
        { letter: 'E', content: <Katex tex="\sqrt3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
