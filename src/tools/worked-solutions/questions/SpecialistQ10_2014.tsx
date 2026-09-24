// 2014 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 64% correct.
// Setting up a mixing differential equation with a changing volume. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 64, B: 18, C: 9, D: 3, E: 4 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dQ}{dt} = \text{rate in} - \text{rate out}" />,
    reason: <>Both rates are in kilograms of salt per minute.</>,
  },
  {
    working: <Katex display tex="\text{rate in} = 2\ \tfrac{\text{kg}}{\text{L}}\times8\ \tfrac{\text{L}}{\text{min}} = 16\ \tfrac{\text{kg}}{\text{min}}" />,
    reason: <>Concentration times flow rate.</>,
  },
  {
    working: <Katex display tex="V(t) = 1500+(8-10)t = 1500-2t" />,
    reason: <>The tank is <em>losing</em> volume at 2 L/min, so the concentration inside keeps changing — the volume must appear as a function of <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\text{concentration} = \frac{Q}{1500-2t}\ \tfrac{\text{kg}}{\text{L}}" />,
    reason: <>The mixture is stirred continuously, so the salt is spread evenly.</>,
  },
  {
    working: <Katex display tex="\text{rate out} = \frac{Q}{1500-2t}\times10 = \frac{10Q}{1500-2t}" />,
    reason: <>Ten litres leave every minute, each carrying that concentration.</>,
  },
  {
    working: <Katex display tex="\frac{10Q}{1500-2t} = \frac{5Q}{750-t}" />,
    reason: <>Dividing top and bottom by 2 to match the options.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dQ}{dt} = 16-\frac{5Q}{750-t}}" />,
    reason: <>Matches option <b>A</b>. Option B (18%) has <Katex tex="750+t" />, which would be a tank filling up; option C adds the outflow instead of subtracting it; option E uses the flow rates in litres rather than kilograms of salt — 8 in instead of <Katex tex="2\times8=16" />, and the concentration alone out instead of 10 times it. Check at <Katex tex="t=0" />: the tank holds 100 kg in 1500 L, so salt leaves at <Katex tex="\tfrac{100}{1500}\times10\approx0.67" /> kg/min, and option A gives <Katex tex="\tfrac{5\times100}{750}\approx0.67" /> ✓.</>,
  },
]

export default function SpecialistQ10_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A large tank initially holds 1500 L of water in which 100 kg of salt is dissolved.
            A solution containing 2 kg of salt per litre flows into the tank at a rate of 8 L
            per minute. The mixture is stirred continuously and flows out of the tank through
            a hole at a rate of 10 L per minute.
          </p>
          <p>
            The differential equation for <Katex tex="Q" />, the number of kilograms of salt
            in the tank after <Katex tex="t" /> minutes, is given by
          </p>
        </>
      }
      background={
        <p>
          The inflow and outflow rates differ, so the volume is a function of time. Writing{' '}
          <Katex tex="V(t)" /> down before touching the outflow term is what keeps this
          question straightforward.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{dQ}{dt} = 16-\tfrac{5Q}{750-t}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\tfrac{dQ}{dt} = 16-\tfrac{5Q}{750+t}" /> },
        { letter: 'C', content: <Katex tex="\tfrac{dQ}{dt} = 16+\tfrac{5Q}{750-t}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{dQ}{dt} = \tfrac{100Q}{750-t}" /> },
        { letter: 'E', content: <Katex tex="\tfrac{dQ}{dt} = 8-\tfrac{Q}{1500-2t}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
