// 2022 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 38% correct.
// Implicit differentiation: for which m does the tangent at (1, m) have negative gradient —
// where (1, m) must itself lie on the curve. Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 38, B: 7, C: 23, D: 10, E: 21 },
  answer: 'E',
  comment: (
    <>
      At <Katex tex="(1,m)" />, <Katex tex="5m-3m+m^2=10 \;\implies\; m=-1\pm\sqrt{11}" />. Both of these, with{' '}
      <Katex tex="x=1" />, lead to a negative value of <Katex tex="dy/dx" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="(1,m) \text{ lies on the curve:}\quad 5(1)^2m - 3(1)m + m^2 = 10" />,
    reason: <>Before differentiating anything, notice <Katex tex="m" /> isn't a free parameter — the point must actually satisfy the curve's equation.</>,
  },
  {
    working: <Katex display tex="m^2+2m-10=0 \;\implies\; m = \frac{-2\pm\sqrt{4+40}}{2} = -1\pm\sqrt{11}" />,
    reason: <>Solve the resulting quadratic in <Katex tex="m" /> — only these <b>two</b> discrete values of <Katex tex="m" /> are possible, not a continuous range.</>,
  },
  {
    working: <Katex display tex="10xy + 5x^2y' - 3y - 3xy' + 2yy' = 0" />,
    reason: <>Differentiate <Katex tex="5x^2y-3xy+y^2=10" /> implicitly with respect to <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="y' = \frac{3y-10xy}{5x^2-3x+2y}" />,
    reason: <>Collect the <Katex tex="y'" /> terms and solve.</>,
  },
  {
    working: <Katex display tex="\text{At } x=1:\quad y' = \frac{3m-10m}{5-3+2m} = \frac{-7m}{2(1+m)}" />,
    reason: 'Substitute x = 1.',
  },
  {
    working: (
      <>
        <Katex display tex="m=\sqrt{11}-1\approx2.32:\quad y'=\dfrac{-7(2.32)}{2(3.32)}\approx-2.45<0" />
        <Katex display tex="m=-\sqrt{11}-1\approx-4.32:\quad y'=\dfrac{-7(-4.32)}{2(-3.32)}\approx-4.56<0" />
      </>
    ),
    reason: <>Test both of the only two valid <Katex tex="m" /> values — both give a negative gradient.</>,
  },
  {
    working: <Katex display tex="\boxed{m=-\sqrt{11}-1 \text{ or } m=\sqrt{11}-1}" />,
    reason: <>Both possible points give a negative gradient — matches option <b>E</b>. (The trap: options A and C treat <Katex tex="m" /> as if it could be any real number, rather than one of only two values forced by the curve.)</>,
  },
]

export default function SpecialistQ10_2022() {
  return (
    <MCQShell
      question={
        <p>
          Consider the curve given by <Katex tex="5x^2y - 3xy + y^2 = 10" />.
          <br />
          The equation of the tangent to this curve at the point <Katex tex="(1,m)" />, where <Katex tex="m" /> is a
          real constant, will have a negative gradient when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="m\in\mathbb{R}\setminus[-1,0]" /> },
        { letter: 'B', content: <Katex tex="m=-\sqrt{11}-1 \text{ only}" /> },
        { letter: 'C', content: <Katex tex="m\in\mathbb{R}\setminus(-1,0]" /> },
        { letter: 'D', content: <Katex tex="m=\sqrt{11}-1 \text{ only}" /> },
        { letter: 'E', content: <Katex tex="m=-\sqrt{11}-1 \text{ or } m=\sqrt{11}-1" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
