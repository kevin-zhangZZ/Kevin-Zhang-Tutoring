// 2025 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 33% correct — the
// hardest question on the paper, with option A drawing exactly as many students as the
// correct D. This year's paper used four options (A–D) rather than five. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 33, B: 13, C: 20, D: 33 },
  answer: 'D',
  comment: (
    <>
      Use the constant acceleration formulas to find the velocity at the midpoint.
      <br />
      <em>u = initial velocity, v = final velocity at B, s = distance between points A and B.</em>
      <br />
      <Katex tex="v_m" /> <em>= velocity at midpoint between A and B</em>
      <br />
      <Katex tex="v^2=u^2+2as\ \Rightarrow 2as=v^2-u^2" />
      <br />
      <Katex tex="{v_m}^2=u^2+2a\dfrac{s}{2}" />
      <br />
      <Katex tex="{v_m}^2=u^2+\dfrac{v^2-u^2}{2}" />
      <br />
      <Katex tex="{v_m}^2=\dfrac{u^2+v^2}{2}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v^2 = u^2+2as" />,
    reason: <>The constant-acceleration formula that links the two velocities to the distance, with s the length of AB.</>,
  },
  {
    working: <Katex display tex="as = \frac{v^2-u^2}{2}" />,
    reason: <>Rearranged — this combination is what the midpoint calculation needs.</>,
  },
  {
    working: <Katex display tex="v_m^2 = u^2+2a\left(\frac{s}{2}\right) = u^2+as" />,
    reason: <>The same formula applied from A to the midpoint, where the distance travelled is half of s.</>,
  },
  {
    working: <Katex display tex="v_m^2 = u^2+\frac{v^2-u^2}{2} = \frac{u^2+v^2}{2}" />,
    reason: <>Substituting. The unknown acceleration and distance both disappear.</>,
  },
  {
    working: <Katex display tex="\boxed{v_m = \sqrt{\frac{u^2+v^2}{2}}}" />,
    reason: <>Matches option <b>D</b>. Option <b>A</b>, <Katex tex="\tfrac{u+v}{2}" />, is the velocity halfway through the <em>time</em>, not halfway along <Katex tex="AB" />: the particle spends longer on the slow half, so the velocity at the midpoint in distance is larger.</>,
  },
]

export default function SpecialistQ12_2025() {
  return (
    <MCQShell
      question={
        <p>
          A particle moves along a straight line with constant acceleration. It passes through a
          point <Katex tex="A" /> with velocity <Katex tex="u" /> m s<Katex tex="^{-1}" /> and then
          through a point <Katex tex="B" /> with velocity <Katex tex="v" /> m s<Katex tex="^{-1}" />.
          <br />
          The velocity of the particle at the midpoint of the line segment <Katex tex="AB" /> is
          given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{u+v}{2}" /> },
        { letter: 'B', content: <Katex tex="u+\dfrac{u+v}{2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{u^2+v^2}{2}" /> },
        { letter: 'D', content: <Katex tex="\sqrt{\dfrac{u^2+v^2}{2}}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
