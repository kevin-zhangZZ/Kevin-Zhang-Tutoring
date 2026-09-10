// 2025 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 49% correct. This
// year's paper used four options (A–D) rather than five. Setting up the surface-of-revolution
// integral for a parametric curve rotated about the x-axis. Question text transcribed from
// the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 15, C: 49, D: 29 },
  answer: 'C',
  comment: <>Apply the formula for the surface area of a curve rotated about the <Katex tex="x" />-axis.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = kt,\quad y=e^{kt}" />,
    reason: 'The given parametric curve.',
  },
  {
    working: <Katex display tex="S = 2\pi\int_a^b y\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: 'Surface-of-revolution formula about the x-axis.',
  },
  {
    working: <Katex display tex="\frac{dx}{dt}=k \qquad \frac{dy}{dt}=ke^{kt}" />,
    reason: 'Differentiate each component.',
  },
  {
    working: <Katex display tex="S = 2\pi\int_a^b e^{kt}\cdot k\sqrt{1+e^{2kt}}\,dt" />,
    reason: <>Substitute — factoring <Katex tex="k^2" /> out of the square root leaves <Katex tex="k\sqrt{1+e^{2kt}}" />.</>,
  },
  {
    working: <Katex display tex="u = e^{kt} \;\implies\; du = ke^{kt}\,dt" />,
    reason: <>Substitute — the <Katex tex="e^{kt}\cdot k" /> factor becomes exactly <Katex tex="du" />.</>,
  },
  {
    working: <Katex display tex="\boxed{S = 2\pi\int_{e^{ka}}^{e^{kb}}\sqrt{1+u^2}\,du}" />,
    reason: <>Limits transform via <Katex tex="u=e^{kt}" /> — matches option <b>C</b>.</>,
  },
]

export default function SpecialistQ9_2025() {
  return (
    <MCQShell
      question={
        <p>
          A parametric curve is given by <Katex tex="x=kt" />, <Katex tex="y=e^{kt}" />, where <Katex tex="k" /> is a
          positive constant. The curve is rotated about the <Katex tex="x" />-axis from <Katex tex="t=a" /> to{' '}
          <Katex tex="t=b" />, where <Katex tex="b>a" />, to form a surface of revolution.
          <br />
          The area of this surface is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2\pi\displaystyle\int_a^b e^{kt}\sqrt{k^2t^2+e^{2kt}}\,dt" /> },
        { letter: 'B', content: <Katex tex="2\pi\sqrt{k}\displaystyle\int_a^b e^{kt}\sqrt{1+e^{kt}}\,dt" /> },
        { letter: 'C', content: <Katex tex="2\pi\displaystyle\int_{e^{ka}}^{e^{kb}}\sqrt{1+u^2}\,du" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="2\pi\displaystyle\int_{e^{ka}}^{e^{kb}} u\sqrt{1+u^2}\,du" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
