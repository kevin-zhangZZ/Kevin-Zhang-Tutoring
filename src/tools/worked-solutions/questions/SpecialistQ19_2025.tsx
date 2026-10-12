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
  comment: (
    <>
      The axis intercepts of the plane are <Katex tex="(a,0,0)" />, <Katex tex="(0,a,0)" />,{' '}
      <Katex tex="(0,0,a)" />. Connecting these points forms an equilateral triangle of side length{' '}
      <Katex tex="\sqrt{2}a" />, which allows us to find the area using
      <br />
      <Katex tex="\dfrac{1}{2}ab\sin(C)=\dfrac{1}{2}\left(\sqrt{2}a\right)^2\sin(60)" />
      <br />
      <Katex tex="=\dfrac{1}{2}\times2a^2\times\dfrac{\sqrt{3}}{2}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = z = 0 \implies x = a \implies A(a,0,0)" />,
    reason: <>On the <Katex tex="x" />-axis, <Katex tex="y=z=0" />. Setting the other two variables to zero gives each axis intercept in turn.</>,
  },
  {
    working: <Katex display tex="B(0,a,0), \qquad C(0,0,a)" />,
    reason: <>By the same reasoning — the equation is symmetric in the three variables.</>,
  },
  {
    working: <Katex display tex="|AB| = \sqrt{(a-0)^2+(0-a)^2+0^2} = |a|\sqrt2" />,
    reason: <>The sides of the triangle join the intercepts; use the distance formula in 3D. Note <Katex tex="\sqrt{a^2}=|a|" />.</>,
  },
  {
    working: <Katex display tex="|AB| = |BC| = |CA| = |a|\sqrt2" />,
    reason: <>The symmetry makes all three sides equal, so the triangle is equilateral.</>,
  },
  {
    working: <Katex display tex="\text{area} = \tfrac12\,\ell\cdot\ell\,\sin 60^\circ = \tfrac{\sqrt3}{4}\,\ell^2" />,
    reason: <>Area <Katex tex="=\tfrac12\times" /> side <Katex tex="\times" /> side <Katex tex="\times\sin" />(included angle). Here both sides are <Katex tex="\ell=|a|\sqrt2" /> and every angle is <Katex tex="60^\circ" />.</>,
    more: (
      <>
        A vector check that needs no geometry: with{' '}
        <Katex tex="\overrightarrow{AB}=-a\underset{\sim}{i}+a\underset{\sim}{j}" /> and{' '}
        <Katex tex="\overrightarrow{AC}=-a\underset{\sim}{i}+a\underset{\sim}{k}" />, the area is{' '}
        <Katex tex="\tfrac12\left|\overrightarrow{AB}\times\overrightarrow{AC}\right|=\tfrac12\left|a^2\underset{\sim}{i}+a^2\underset{\sim}{j}+a^2\underset{\sim}{k}\right|=\tfrac{\sqrt3}{2}a^2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{\sqrt3}{4}\left(|a|\sqrt2\right)^2 = \frac{\sqrt3}{4}\cdot 2a^2 = \frac{a^2\sqrt3}{2}}" />,
    reason: <>Matches option <b>B</b>. Squaring removes the modulus, so the answer holds for negative <Katex tex="a" /> too.</>,
    more: (
      <>
        Option <b>A</b> is the area of an equilateral triangle of side <Katex tex="a" />: it takes the intercept
        distance <Katex tex="a" /> as the side instead of <Katex tex="\sqrt2|a|" />. Option <b>D</b> forgets the{' '}
        <Katex tex="\tfrac12" /> in the area formula. Option <b>C</b> has no <Katex tex="\sqrt3" />, but every
        equilateral triangle's area is <Katex tex="\tfrac{\sqrt3}{4}\times(\text{side})^2" />, so <b>C</b> comes from
        not treating the triangle as equilateral.
      </>
    ),
  },
]

export default function SpecialistQ19_2025() {
  return (
    <MCQShell
      question={
        <p>
          The plane with equation <Katex tex="x+y+z = a" />, where <Katex tex="a\in R" />,
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
