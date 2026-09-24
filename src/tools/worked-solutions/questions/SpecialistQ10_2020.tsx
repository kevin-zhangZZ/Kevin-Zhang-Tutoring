// 2020 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 76% correct. A
// mixing-tank differential equation where the volume is not constant. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 1, B: 4, C: 4, D: 76, E: 14 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dm}{dt} = (\text{rate in})-(\text{rate out})" />,
    reason: <>Both rates are in grams per minute, so both need a concentration times a flow.</>,
  },
  {
    working: <Katex display tex="\text{rate in} = 15\,\tfrac{\text{g}}{\text{L}}\times2\,\tfrac{\text{L}}{\text{min}} = 30 \ \text{g/min}" />,
    reason: <>Constant, because the incoming solution has a fixed concentration.</>,
  },
  {
    working: <Katex display tex="V(t) = 50+2t-5t = 50-3t" />,
    reason: <>The trap: 2 L in and 5 L out each minute, so the tank is <em>draining</em> at 3 L/min. Options B and E use <Katex tex="50-5t" />, which forgets the inflow.</>,
  },
  {
    working: <Katex display tex="\text{concentration} = \frac{m}{50-3t} \ \text{g/L}" />,
    reason: <>"Well stirred" is what licenses treating the tank as uniform.</>,
  },
  {
    working: <Katex display tex="\text{rate out} = \frac{m}{50-3t}\times5 = \frac{5m}{50-3t}" />,
    reason: <>Concentration times the outflow rate.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dm}{dt} = 30-\frac{5m}{50-3t}}" />,
    reason: <>Matches option <b>D</b>. Option <b>C</b> keeps the volume fixed at 50 L (<Katex tex="\tfrac{5m}{50}=\tfrac{m}{10}" />). The phrase "for a non-zero volume of mixture" restricts this to <Katex tex="t<\tfrac{50}{3}" />, when the tank runs dry.</>,
  },
]

export default function SpecialistQ10_2020() {
  return (
    <MCQShell
      question={
        <p>
          A tank initially contains 300 grams of salt that is dissolved in 50 L of water. A
          solution containing 15 grams of salt per litre of water is poured into the tank at
          a rate of 2 L per minute and the mixture in the tank is kept well stirred. At the
          same time, 5 L of the mixture flows out of the tank per minute.
          <br />
          A differential
          equation representing the mass, <Katex tex="m" /> grams, of salt in the tank at
          time <Katex tex="t" /> minutes, for a non-zero volume of mixture, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{dm}{dt}=0" /> },
        { letter: 'B', content: <Katex tex="\frac{dm}{dt}=-\frac{5m}{50-5t}" /> },
        { letter: 'C', content: <Katex tex="\frac{dm}{dt}=30-\frac{m}{10}" /> },
        { letter: 'D', content: <Katex tex="\frac{dm}{dt}=30-\frac{5m}{50-3t}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\frac{dm}{dt}=30-\frac{5m}{50-5t}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
