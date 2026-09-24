// 2023 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 18% correct — the
// hardest MCQ on this paper. If the sum of two unit vectors is a unit vector, find the
// magnitude of their difference. Question text transcribed from the original paper. Solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import sumSrc from './spec-2023-mcq15-report-sum.png'
import diffSrc from './spec-2023-mcq15-report-diff.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 24, C: 32, D: 18, E: 3 },
  answer: 'D',
  comment: (
    <>
      If the sum of two unit vectors is a unit vector, then an equilateral triangle will be
      formed, such as the one in this diagram.
      <img src={sumSrc} alt="The report's diagram: an equilateral triangle with sides a, b and a + b, and a 60° angle between a and b at the base" className="w-full max-w-[200px] mt-1" />
      The difference of the two vectors can be represented as
      <img src={diffSrc} alt="The report's diagram: a triangle formed by a and −b with a 120° angle between them, the third side being a − b" className="w-full max-w-[240px] mt-1" />
      By the cosine rule,{' '}
      <Katex tex="\left|\underset{\sim}{a}-\underset{\sim}{b}\right|=\sqrt{1^2+1^2-2(1)(1)\cos\left(120^\circ\right)}=\sqrt3" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|\underset{\sim}{a}| = |\underset{\sim}{b}| = |\underset{\sim}{a}+\underset{\sim}{b}| = 1" />,
    reason: <>Two unit vectors whose sum is also a unit vector.</>,
  },
  {
    working: <Katex display tex="|\underset{\sim}{a}+\underset{\sim}{b}|^2 = |\underset{\sim}{a}|^2+2\underset{\sim}{a}\cdot\underset{\sim}{b}+|\underset{\sim}{b}|^2 = 2+2\underset{\sim}{a}\cdot\underset{\sim}{b}" />,
    reason: <>Expand the square of the sum.</>,
  },
  {
    working: <Katex display tex="1 = 2+2\underset{\sim}{a}\cdot\underset{\sim}{b} \;\implies\; \underset{\sim}{a}\cdot\underset{\sim}{b} = -\tfrac12" />,
    reason: <>Set equal to <Katex tex="|\underset{\sim}{a}+\underset{\sim}{b}|^2=1^2=1" /> and solve.</>,
  },
  {
    working: <Katex display tex="|\underset{\sim}{a}-\underset{\sim}{b}|^2 = |\underset{\sim}{a}|^2-2\underset{\sim}{a}\cdot\underset{\sim}{b}+|\underset{\sim}{b}|^2 = 2-2\left(-\tfrac12\right) = 3" />,
    reason: <>Expand the square of the difference using the same dot product.</>,
  },
  {
    working: <Katex display tex="\boxed{|\underset{\sim}{a}-\underset{\sim}{b}| = \sqrt3}" />,
    reason: <>Matches option <b>D</b>. (Geometrically, as in the report: <Katex tex="\underset{\sim}{a}" />, <Katex tex="\underset{\sim}{b}" /> and <Katex tex="\underset{\sim}{a}+\underset{\sim}{b}" /> form an equilateral triangle, so <Katex tex="\underset{\sim}{a}" /> and <Katex tex="-\underset{\sim}{b}" /> meet at <Katex tex="120^\circ" />, and the cosine rule gives <Katex tex="\sqrt3" />.)</>,
  },
]

export default function SpecialistQ15_2023() {
  return (
    <MCQShell
      question={<p>If the sum of two unit vectors is a unit vector, then the magnitude of the difference of the two vectors is</p>}
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\tfrac{1}{\sqrt2}" /> },
        { letter: 'C', content: <Katex tex="\sqrt2" /> },
        { letter: 'D', content: <Katex tex="\sqrt3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\sqrt5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
