// 2021 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 35% correct.
// Arg(z·z̄ / (z − z̄)) given Im(z) > 0. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 35, B: 11, C: 21, D: 29, E: 3 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="\mathrm{Arg}\!\left(\dfrac{z\bar z}{z-\bar z}\right) = \mathrm{Arg}\!\left(\dfrac{a^2+b^2}{2bi}\right) = \mathrm{Arg}\!\left(-\dfrac{a^2+b^2}{2b}i\right) = -\dfrac{\pi}{2}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z = a+bi,\quad b>0 \;(\text{since } \mathrm{Im}(z)>0)" />,
    reason: 'Write z in Cartesian form.',
  },
  {
    working: <Katex display tex="z\bar z = a^2+b^2 \qquad z - \bar z = 2bi" />,
    reason: <>Standard identities: <Katex tex="z\bar z = |z|^2" /> is real and positive; <Katex tex="z-\bar z" /> is purely imaginary.</>,
  },
  {
    working: <Katex display tex="\frac{z\bar z}{z-\bar z} = \frac{a^2+b^2}{2bi} = \frac{a^2+b^2}{2bi}\cdot\frac{i}{i} = -\frac{a^2+b^2}{2b}i" />,
    reason: <>Multiply by <Katex tex="i/i" /> to remove <Katex tex="i" /> from the denominator (using <Katex tex="1/i=-i" />).</>,
  },
  {
    working: <>Since <Katex tex="a^2+b^2>0" /> and <Katex tex="b>0" />, the coefficient <Katex tex="-\dfrac{a^2+b^2}{2b}" /> is negative.</>,
    reason: <>The result is a <i>negative</i> purely imaginary number, for every choice of <Katex tex="a" /> and every <Katex tex="b>0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{Arg}\!\left(\frac{z\bar z}{z-\bar z}\right) = -\frac{\pi}{2}}" />,
    reason: <>Any negative purely imaginary number sits at angle <Katex tex="-\pi/2" /> — matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ4_2021() {
  return (
    <MCQShell
      question={
        <p>
          For <Katex tex="z\in\mathbb{C}" />, if <Katex tex="\mathrm{Im}(z)>0" />, then{' '}
          <Katex tex="\mathrm{Arg}\!\left(\dfrac{z\bar z}{z-\bar z}\right)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\tfrac{\pi}{2}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="0" /> },
        { letter: 'C', content: <Katex tex="\tfrac{\pi}{4}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{\pi}{2}" /> },
        { letter: 'E', content: <Katex tex="\pi" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
