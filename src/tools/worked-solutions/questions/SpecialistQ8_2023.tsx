// 2023 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 37% correct.
// Setting up a mixing/dilution differential equation with unequal in/out flow rates.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 37, B: 6, C: 13, D: 14, E: 29 },
  answer: 'A',
  comment: (
    <Katex tex="\frac{dQ}{dt} = 15(0) - 20\cdot\frac{Q}{8000-5t} = \frac{-20Q}{8000-5t} = \frac{4Q}{t-1600}" />
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dV}{dt} = 15-20 = -5 \;\implies\; V(t) = 8000-5t" />,
    reason: <>Fresh water enters at 15 L/min, mixture leaves at 20 L/min — the volume shrinks at a constant net rate.</>,
  },
  {
    working: <Katex display tex="\frac{dQ}{dt} = (\text{rate in})(\text{conc. in}) - (\text{rate out})(\text{conc. out})" />,
    reason: 'Standard mixing-problem setup.',
  },
  {
    working: <Katex display tex="\frac{dQ}{dt} = 15(0) - 20\cdot\frac{Q}{V(t)}" />,
    reason: <>Incoming water is fresh (0 concentration); outgoing concentration is <Katex tex="Q/V" /> since the tank is well-stirred.</>,
  },
  {
    working: <Katex display tex="\frac{dQ}{dt} = \frac{-20Q}{8000-5t}" />,
    reason: 'Substitute V(t).',
  },
  {
    working: <Katex display tex="\frac{-20Q}{8000-5t} = \frac{-20Q}{5(1600-t)} = \frac{-4Q}{1600-t}" />,
    reason: 'Factor out 5 from the denominator and simplify.',
  },
  {
    working: <Katex display tex="\boxed{\frac{dQ}{dt} = \frac{4Q}{t-1600}}" />,
    reason: <>Flip the sign of numerator and denominator together — matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ8_2023() {
  return (
    <MCQShell
      question={
        <p>
          Initially a spa pool is filled with 8000 litres of water that contains a quantity of dissolved chemical.
          It is discovered that too much chemical is contained in the spa pool water. To correct this situation,
          20 litres of well-mixed spa pool water is pumped out every minute while 15 litres of fresh water is
          pumped in each minute.
          <br />
          Let <Katex tex="Q" /> be the number of kilograms of chemical that remains dissolved in the spa pool after{' '}
          <Katex tex="t" /> minutes.
          <br />
          The differential equation relating <Katex tex="Q" /> to <Katex tex="t" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{dQ}{dt}=\dfrac{4Q}{t-1600}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{dQ}{dt}=\dfrac{Q}{400}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{dQ}{dt}=\dfrac{3Q}{t-1600}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{dQ}{dt}=\dfrac{3Q}{1600-t}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{dQ}{dt}=\dfrac{4Q}{1600-t}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
