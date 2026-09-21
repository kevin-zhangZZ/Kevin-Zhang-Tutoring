// 2019 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 66% correct. Finding
// unknown coordinates from a midpoint in three dimensions. Question text transcribed from the
// original paper (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 6, C: 13, D: 5, E: 66 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Midpoint of } MN = \left(\dfrac{x_M+x_N}{2},\ \dfrac{y_M+y_N}{2},\ \dfrac{z_M+z_N}{2}\right)" />,
    reason: <>The midpoint formula works coordinate by coordinate in three dimensions exactly as it does in two — average each one separately.</>,
  },
  {
    working: <Katex display tex="\dfrac{a+(-3)}{2} = -5 \implies a-3=-10 \implies a=-7" />,
    reason: <>The <Katex tex="x" />-coordinates. Multiply by <Katex tex="2" /> first, then solve.</>,
  },
  {
    working: <Katex display tex="\dfrac{1+b}{2} = \dfrac32 \implies 1+b=3 \implies b=2" />,
  },
  {
    working: <Katex display tex="\dfrac{-2+(-1)}{2} = c \implies c = -\dfrac32" />,
    reason: <>Here both <Katex tex="z" />-coordinates are known and it is the midpoint that is unknown — so this one is a direct evaluation rather than an equation to solve.</>,
  },
  {
    working: <Katex display tex="\boxed{a=-7,\quad b=2,\quad c=-\dfrac32}" />,
    reason: <>Matches option <b>E</b>. Option <b>C</b> has the right <Katex tex="a" /> and <Katex tex="c" /> but <Katex tex="b=-2" />; option <b>A</b> comes from doubling instead of halving.</>,
  },
]

export default function SpecialistQ11_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let point <Katex tex="M" /> have coordinates <Katex tex="(a,1,-2)" /> and let point{' '}
          <Katex tex="N" /> have coordinates <Katex tex="(-3,b,-1)" />. If the coordinates of the
          midpoint of <Katex tex="MN" /> are <Katex tex="\left(-5,\tfrac32,c\right)" /> and{' '}
          <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are real constants, then the
          values of <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are respectively
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-13,\ 2 \text{ and } -\tfrac12" /> },
        { letter: 'B', content: <Katex tex="-2,\ \tfrac12 \text{ and } -3" /> },
        { letter: 'C', content: <Katex tex="-7,\ -2 \text{ and } -\tfrac32" /> },
        { letter: 'D', content: <Katex tex="-2,\ -\tfrac12 \text{ and } -3" /> },
        { letter: 'E', content: <Katex tex="-7,\ 2 \text{ and } -\tfrac32" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
