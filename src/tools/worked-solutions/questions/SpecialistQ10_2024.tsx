// 2024 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 74% correct.
// A surface of revolution about the y-axis, from a straight parametric segment. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 74, B: 9, C: 15, D: 2 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="2\pi\displaystyle\int_0^k x\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />
      <br />
      <Katex tex="=2\pi\displaystyle\int_0^k 5t\sqrt{(5)^2+(12)^2}\,dt" />
      <br />
      <Katex tex="=10\pi\displaystyle\int_0^k 13t\,dt" />
      <br />
      <Katex tex="=65k^2\pi" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="S = 2\pi\int_a^b x\,\frac{ds}{dt}\,dt, \qquad \frac{ds}{dt} = \sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}" />,
    reason: <>Rotation about the <em>y</em>-axis, so the radius of each band is <Katex tex="x" />, not <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = 5, \qquad \frac{dy}{dt} = 12 \implies \frac{ds}{dt} = \sqrt{25+144} = 13" />,
    reason: <>A 5–12–13 triangle, so the arc-length element is a constant — the curve is a straight line.</>,
  },
  {
    working: <Katex display tex="S = 2\pi\int_0^{k}5t\times13\,dt = 130\pi\int_0^{k}t\,dt" />,
    reason: <>Everything constant comes out the front.</>,
  },
  {
    working: <Katex display tex="= 130\pi\left[\frac{t^2}{2}\right]_0^{k} = 130\pi\cdot\frac{k^2}{2}" />,
    reason: <>A single clean antiderivative.</>,
  },
  {
    working: <Katex display tex="\boxed{65k^2\pi}" />,
    reason: <>Matches option <b>A</b>. Sensible: the surface is a cone of slant height <Katex tex="13k" /> and base radius <Katex tex="5k" />, and <Katex tex="\pi r l = \pi(5k)(13k) = 65k^2\pi" /> ✓. Option <b>B</b> is what forgetting to halve gives.</>,
  },
]

export default function SpecialistQ10_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            The curve defined by the parametric equations
            <br />
            <Katex tex="x=5t" />, <Katex tex="y=12t" />, for <Katex tex="0\le t\le k" />
            <br />
            is rotated about the <Katex tex="y" />-axis to form a surface of revolution.
          </p>
          <p>The area of this surface is</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="65k^2\pi" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="130k^2\pi" /> },
        { letter: 'C', content: <Katex tex="156k^2\pi" /> },
        { letter: 'D', content: <Katex tex="825k^2\pi" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
