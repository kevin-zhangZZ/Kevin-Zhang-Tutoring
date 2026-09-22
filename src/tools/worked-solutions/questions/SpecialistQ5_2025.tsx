// 2025 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 69% correct. This
// year's paper used four options (A–D) rather than five. A real cubic with one known
// complex root. Question text transcribed from the original paper. Answers checked with
// sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 69, B: 16, C: 9, D: 6 },
  answer: 'A',
  comment: <>Either substitute and equate coefficients, or use the conjugate root theorem.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a,b\in\mathbb{R} \text{ and } 2-3i \text{ is a root} \implies 2+3i \text{ is also a root}" />,
    reason: 'The conjugate root theorem — it needs the coefficients to be real, which is stated.',
  },
  {
    working: <Katex display tex="(z-(2-3i))(z-(2+3i)) = z^2-4z+13" />,
    reason: 'Sum of the pair is 4 and product is 4 + 9 = 13. A real quadratic factor.',
  },
  {
    working: <Katex display tex="\text{product of all three roots} = -\frac{-52}{1} = 52" />,
    reason: <>For <Katex tex="z^3+az^2+bz+c" /> the product of the roots is <Katex tex="-c" />.</>,
  },
  {
    working: <Katex display tex="13r = 52 \implies r = 4" />,
    reason: 'The third root must be real, and this pins it down without any division.',
  },
  {
    working: <Katex display tex="a = -\text{(sum of roots)} = -\big(4+(2-3i)+(2+3i)\big) = -8" />,
    reason: 'The imaginary parts cancel, as they must.',
  },
  {
    working: <Katex display tex="b = 13+4(2-3i)+4(2+3i) = 13+16 = 29" />,
    reason: 'The sum of the products of the roots taken two at a time.',
  },
  {
    working: <Katex display tex="\boxed{ab = -8\times29 = -232}" />,
    reason: <>Option <b>A</b>. The question asks for the product, not the pair.</>,
  },
]

export default function SpecialistQ5_2025() {
  return (
    <MCQShell
      question={
        <p>
          The equation <Katex tex="z^3+az^2+bz-52 = 0" />, where <Katex tex="a,b\in\mathbb{R}" /> and{' '}
          <Katex tex="z\in\mathbb{C}" />, has a solution <Katex tex="z = 2-3i" />.
          <br />
          The value of <Katex tex="ab" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-232" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-64" /> },
        { letter: 'C', content: <Katex tex="-8" /> },
        { letter: 'D', content: <Katex tex="0" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
