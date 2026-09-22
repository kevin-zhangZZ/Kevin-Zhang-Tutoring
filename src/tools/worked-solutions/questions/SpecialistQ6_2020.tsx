// 2020 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 79% correct.
// Recovering a real cubic from one real and one purely imaginary root. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 2, C: 79, D: 5, E: 7 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P(3i) = 0 \implies P(-3i) = 0" />,
    reason: 'The coefficients are real, so non-real roots come in conjugate pairs. This is what gives a cubic its third root for free.',
  },
  {
    working: <Katex display tex="\text{roots: } -2, \ 3i, \ -3i" />,
    reason: <>Three roots for a cubic, and the leading coefficient is 1.</>,
  },
  {
    working: <Katex display tex="(z-3i)(z+3i) = z^2+9" />,
    reason: 'Pairing the conjugates first keeps everything real.',
  },
  {
    working: <Katex display tex="P(z) = (z+2)\left(z^2+9\right) = z^3+2z^2+9z+18" />,
    reason: 'Expanding.',
  },
  {
    working: <Katex display tex="\boxed{a=2, \ b=9, \ c=18}" />,
    reason: <>Matches option <b>C</b>. A fast check: <Katex tex="c=18" /> must be minus the product of the roots, <Katex tex="-(-2)(3i)(-3i)=-(-2)(9)=18" /> ✓.</>,
  },
]

export default function SpecialistQ6_2020() {
  return (
    <MCQShell
      question={
        <p>
          For the complex polynomial <Katex tex="P(z)=z^3+az^2+bz+c" /> with real
          coefficients <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" />,{' '}
          <Katex tex="P(-2)=0" /> and <Katex tex="P(3i)=0" />. The values of{' '}
          <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are respectively
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-2,\ 9,\ -18" /> },
        { letter: 'B', content: <Katex tex="3,\ 4,\ 12" /> },
        { letter: 'C', content: <Katex tex="2,\ 9,\ 18" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-3,\ -4,\ 12" /> },
        { letter: 'E', content: <Katex tex="2,\ -9,\ -18" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
