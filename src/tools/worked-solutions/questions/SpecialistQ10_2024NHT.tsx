// 2024 Specialist NHT — Exam 2, MCQ 10. The NHT report gives the answer key only, with no
// statistics. Calculus: surface area of revolution of y = 1/x, 1 ≤ x ≤ a, about the x-axis.
// Question text transcribed from the original paper. Solution is original; the answer C agrees
// with the report's key (sympy: (1/x)√(1 + 1/x⁴) − √(1 + x⁴)/x³ simplifies to 0; option E equals
// (1/x)(1 + 1/x⁴), the root left off).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="S=2\pi\int_1^a y\sqrt{1+\left(\frac{dy}{dx}\right)^2}\,dx" />,
    reason: <>Surface area for rotation about the <Katex tex="x" />-axis (formula sheet). The radius of each thin band is <Katex tex="y" />, its distance from the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}y&=\frac1x=x^{-1}\\ \frac{dy}{dx}&=-\frac{1}{x^2}\\ \left(\frac{dy}{dx}\right)^2&=\frac{1}{x^4}\end{aligned}" />,
    reason: <>Differentiate, then square.</>,
  },
  {
    working: <Katex display tex="\sqrt{1+\frac{1}{x^4}}=\sqrt{\frac{x^4+1}{x^4}}=\frac{\sqrt{1+x^4}}{x^2}" />,
    reason: <>Combine over a common denominator, then <Katex tex="\sqrt{x^4}=x^2" /> (always positive).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}S&=2\pi\int_1^a\frac1x\cdot\frac{\sqrt{1+x^4}}{x^2}\,dx\\&=2\pi\int_1^a\frac{\sqrt{1+x^4}}{x^3}\,dx\end{aligned}" />,
    reason: <>Multiply by <Katex tex="y=\tfrac1x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2\pi\int_1^a\frac{\sqrt{1+x^4}}{x^3}\,dx}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>E</b>, <Katex tex="\tfrac{1+x^4}{x^5}=\tfrac1x\left(1+\tfrac{1}{x^4}\right)" />, is the same working with the square root left off. Sanity check at <Katex tex="x=1" />: the integrand is <Katex tex="y\sqrt{1+1}=\sqrt2" />, and <Katex tex="\tfrac{\sqrt{1+1}}{1}=\sqrt2" /> agrees.</>,
  },
]

export default function SpecialistQ10_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          Consider the surface of revolution formed by rotating the curve <Katex tex="y=\dfrac1x,\ 1\le x\le a" /> about
          the <Katex tex="x" />-axis.
          <br />
          The area of this surface is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2\pi\displaystyle\int_1^a x\sqrt{1+x^2}\,dx" /> },
        { letter: 'B', content: <Katex tex="2\pi\displaystyle\int_1^a\frac{\sqrt{1+x^4}}{x}\,dx" /> },
        { letter: 'C', content: <Katex tex="2\pi\displaystyle\int_1^a\frac{\sqrt{1+x^4}}{x^3}\,dx" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="2\pi\displaystyle\int_1^a\left(1+\frac{1}{x^2}\right)dx" /> },
        { letter: 'E', content: <Katex tex="2\pi\displaystyle\int_1^a\left(\frac{1+x^4}{x^5}\right)dx" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
