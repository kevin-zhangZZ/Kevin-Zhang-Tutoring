// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 3. VCAA examination report: 60% correct.
// Total area between a cubic and the x-axis, which needs the integral split at the root.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 12, C: 5, D: 60, E: 14 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = x(x+2)(x-4) = 0 \implies x = -2,\ 0,\ 4" />,
    reason: <>Three roots, so the curve crosses the axis twice between the outer two — the region comes in two pieces on opposite sides of the axis.</>,
  },
  {
    working: <Katex display tex="-2<x<0:\ y>0; \qquad 0<x<4:\ y<0" />,
    reason: <>Check a point in each: at <Katex tex="x=-1" />, <Katex tex="(-1)(1)(-5)=5>0" />; at <Katex tex="x=1" />, <Katex tex="(1)(3)(-3)=-9<0" />.</>,
  },
  {
    working: <Katex display tex="A = \int_{-2}^{0}y\,dx - \int_{0}^{4}y\,dx" />,
    reason: <>Area is unsigned, so the piece below the axis has its sign flipped. A single integral from <Katex tex="-2" /> to <Katex tex="4" /> would let the two pieces cancel.</>,
  },
  {
    working: <Cas fn="nInt">∫(x(x+2)(x-4), x, -2, 0) - ∫(x(x+2)(x-4), x, 0, 4)</Cas>,
    reason: <>Or integrate <Katex tex="|y|" /> straight across.</>,
  },
  {
    working: <Katex display tex="\int x(x+2)(x-4)\,dx = \int\left(x^3-2x^2-8x\right)dx = \tfrac{x^4}{4}-\tfrac{2x^3}{3}-4x^2" />,
    reason: <>By hand it is only a cubic: expand, then antidifferentiate term by term. Call this <Katex tex="F(x)" />; <Katex tex="F(0)=0" />, <Katex tex="F(-2)=4+\tfrac{16}3-16=-\tfrac{20}3" /> and <Katex tex="F(4)=64-\tfrac{128}3-64=-\tfrac{128}3" />.</>,
  },
  {
    working: <Katex display tex="A = \left[0-\left(-\tfrac{20}{3}\right)\right] - \left[-\tfrac{128}{3}-0\right]" />,
    reason: <>Each piece is <Katex tex="F(b)-F(a)" />; the second is negative, and the minus sign in front turns it positive.</>,
  },
  {
    working: <Katex display tex="= \tfrac{20}{3} + \tfrac{128}{3}" />,
    reason: <>The right-hand piece is much bigger — it is wider and dips further.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{148}{3}}" />,
    reason: <>Matches option <b>D</b>. Option A, <Katex tex="\tfrac{128}3" />, is the right-hand piece alone; option B, <Katex tex="\tfrac{20}3" />, is the left piece alone; the signed integral across <Katex tex="[-2,4]" /> gives <Katex tex="-36" />, whose magnitude is option E.</>,
  },
]

export default function MethodsQ3_2014() {
  return (
    <MCQShell
      question={
        <p>
          The area of the region enclosed by the graph of{' '}
          <Katex tex="y=x(x+2)(x-4)" /> and the <Katex tex="x" />-axis is
        </p>
      }
      background={
        <p>
          Whenever a curve crosses the <Katex tex="x" />-axis inside the interval, "area" and
          "definite integral" part company. Find the roots first, then integrate each piece
          separately and add the magnitudes.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{128}{3}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{20}{3}" /> },
        { letter: 'C', content: <Katex tex="\tfrac{236}{3}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{148}{3}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="36" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
