// 2025 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 59% correct. This
// year's paper used four options (A–D) rather than five. The area of the triangle a plane
// cuts from the coordinate axes. Question text transcribed from the original paper.
// Answers checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 59, C: 14, D: 8 },
  answer: 'B',
  comment: <>The axis intercepts of the plane are <Katex tex="(a,0,0)" />, <Katex tex="(0,a,0)" /> and <Katex tex="(0,0,a)" />. Connecting these points forms an equilateral triangle, whose side length gives the area.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = z = 0 \implies x = a \implies A(a,0,0)" />,
    reason: 'Setting the other two variables to zero gives each axis intercept in turn.',
  },
  {
    working: <Katex display tex="B(0,a,0), \qquad C(0,0,a)" />,
    reason: 'By the same reasoning — the equation is symmetric in the three variables.',
  },
  {
    working: <Katex display tex="|AB| = \sqrt{(a-0)^2+(0-a)^2+0^2} = |a|\sqrt2" />,
    reason: 'The distance between two of the vertices.',
  },
  {
    working: <Katex display tex="|AB| = |BC| = |CA| = |a|\sqrt2" />,
    reason: 'The symmetry makes all three sides equal, so the triangle is equilateral.',
  },
  {
    working: <Katex display tex="\text{area} = \frac{\sqrt3}{4}\,\ell^2 \quad \text{for an equilateral triangle of side } \ell" />,
    reason: 'The standard formula for an equilateral triangle — half the base times the height.',
  },
  {
    working: <Katex display tex="\boxed{\frac{\sqrt3}{4}\left(|a|\sqrt2\right)^2 = \frac{\sqrt3}{4}\cdot 2a^2 = \frac{a^2\sqrt3}{2}}" />,
    reason: <>Option <b>B</b>. Squaring removes the modulus, so the answer holds for negative a too.</>,
  },
]

export default function SpecialistQ19_2025() {
  return (
    <MCQShell
      question={
        <p>
          The plane with equation <Katex tex="x+y+z = a" />, where <Katex tex="a\in\mathbb{R}" />,
          intersects the coordinate axes at three points that form the vertices of a triangle.
          <br />
          The area of this triangle is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{a^2\sqrt3}{4}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{a^2\sqrt3}{2}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{a^2}{4}" /> },
        { letter: 'D', content: <Katex tex="a^2\sqrt3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
