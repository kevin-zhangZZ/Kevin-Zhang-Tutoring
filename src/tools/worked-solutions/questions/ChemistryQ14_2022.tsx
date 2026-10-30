// 2022 Chemistry Exam, MCQ 14. VCAA examination report: 53% correct. Identifying the oxidising
// and reducing agents in a vanadium redox battery while it is recharging, by reversing the
// discharge equation and tracking the oxidation number of vanadium. Question text transcribed
// from the original paper. VCAA report only (no second source). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 14, C: 53, D: 23 },
  answer: 'C',
  comment: (
    <>
      Recharging equation – reverse of discharging reaction – is
      <br />
      <Chem eq="V3+(aq) + VO2+(aq) + H2O(l) -> VO₂+(aq) + 2H+(aq) + V2+(aq)" />
      <br />
      The only atom that changes oxidation number(s) in this reaction is V, which decreases during
      reduction and increases during oxidation.
      <br />
      This eliminates options A and B.
      <br />
      VO₂⁺ is a product in the recharge, and so cannot be the oxidising agent, therefore option D
      is not viable.
      <br />
      VO²⁺ is oxidised to VO₂⁺ – oxidation number of V increases from +4 to +5, therefore VO²⁺ is
      the reducing agent.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Recharging reverses the discharge reaction:<br /><Chem eq="V3+(aq) + VO2+(aq) + H2O(l) -> VO₂+(aq) + 2H+(aq) + V2+(aq)" /></>,
    reason: <>A rechargeable cell discharges as a galvanic cell; recharging is electrolysis that forces the <b>reverse</b> reaction, so the reactants and products swap sides. The oxidising and reducing agents must be read from <i>this</i> equation, not the one printed in the question.</>,
  },
  {
    working: <>Oxidation numbers of V (O = −2, H = +1):<br />VO₂⁺: <i>x</i> + 2(−2) = +1, so <i>x</i> = <b>+5</b><br />VO²⁺: <i>x</i> + (−2) = +2, so <i>x</i> = <b>+4</b><br />V³⁺: <b>+3</b> · V²⁺: <b>+2</b></>,
    reason: <>The oxidation numbers in a species add up to its overall charge. Watch the notation: VO₂⁺ (two O atoms, charge 1+) is a different ion from VO²⁺ (one O atom, charge 2+).</>,
  },
  {
    working: <>H stays +1 and O stays −2 throughout (in H⁺, H₂O and the vanadium ions), so H⁺ and H₂O are <b>neither oxidised nor reduced</b>.</>,
    reason: <>Only a species whose element changes oxidation number can be an oxidising or reducing agent. This rules out options <b>A</b> and <b>B</b>.</>,
  },
  {
    working: <>V³⁺ → V²⁺: +3 → +2, <b>gains</b> an electron — <b>reduced</b>, so V³⁺ is the <b>oxidising agent</b>.<br />VO²⁺ → VO₂⁺: +4 → +5, <b>loses</b> an electron — <b>oxidised</b>, so VO²⁺ is the <b>reducing agent</b>.</>,
    reason: <>The reducing agent is the species that is oxidised (it gives electrons to something else); the oxidising agent is the species that is reduced. Students often swap these.</>,
  },
  {
    working: <b>While recharging, VO²⁺ is the reducing agent.</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b> is true of the <i>discharge</i> reaction (there VO₂⁺, +5, is reduced to VO²⁺, +4), but it comes from forgetting to reverse the equation: during recharging VO₂⁺ is a product, so it cannot be the oxidising agent. Options <b>A</b> and <b>B</b> name H⁺ and H₂O, whose oxidation numbers never change.</>,
  },
]

export default function ChemistryQ14_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The discharge reaction in a vanadium redox battery is represented by the following
            equation.
          </p>
          <p className="mb-2 text-center">
            <Chem eq="VO₂+(aq) + 2H+(aq) + V2+(aq) -> V3+(aq) + VO2+(aq) + H2O(l)" />
          </p>
          <p>When the vanadium redox battery is recharging</p>
        </>
      }
      options={[
        { letter: 'A', content: <>H⁺ is the reducing agent.</> },
        { letter: 'B', content: <>H₂O is the oxidising agent.</> },
        { letter: 'C', content: <>VO²⁺ is the reducing agent.</>, isAnswer: true },
        { letter: 'D', content: <>VO₂⁺ is the oxidising agent.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
