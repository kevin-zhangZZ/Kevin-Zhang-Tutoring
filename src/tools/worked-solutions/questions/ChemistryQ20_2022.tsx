// 2022 Chemistry Exam, MCQ 20. VCAA examination report: 34% correct. What happens when a Zn
// rod is placed directly into a mixed Co²⁺/Mn²⁺ solution — testing whether this counts as a
// working electrochemical cell at all. Question text transcribed from the original paper; the
// equipment diagram is cropped from the original VCAA exam PDF (it labels the solution
// Co(NO₂)₂/Mn(NO₂)₂, kept as printed). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import equipmentSrc from './chem-2022-mcq20-equipment.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 34, B: 34, C: 15, D: 17 },
  answer: 'B',
  comment: (
    <>
      Referring to the electrochemical series
      <br />
      <Chem eq="Co2+(aq) + 2e- <=> Co(s)" /> &nbsp; −0.28 V
      <br />
      <Chem eq="Zn2+(aq) + 2e- <=> Zn(s)" /> &nbsp; −0.76 V
      <br />
      <Chem eq="2H2O + 2e- <=> H2(g) + 2OH-(aq)" /> &nbsp; −0.83 V
      <br />
      The strongest oxidising agent present is Co²⁺(aq) and the strongest reducing agent is Zn(s).
      <br />
      Because these entities are in contact during the reaction, the chemical energy will be
      converted into heat energy, via the reaction <Chem eq="Co2+(aq) + Zn(s) -> Co(s) + Zn2+(aq)" />
      <br />
      The equipment clearly did not represent an electrochemical cell as it would require separated
      half-cells, so options A and D are not feasible.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The equipment is a single beaker: a Zn(s) rod dipping straight into one solution containing both Co²⁺(aq) and Mn²⁺(aq). There is no second half-cell, no salt bridge and no external circuit.</>,
    reason: <>So this is not an electrochemical cell — any redox reaction happens by direct contact.</>,
  },
  {
    working: <>Oxidising agents present: Co²⁺ (<i>E</i>° = −0.28 V), H₂O (−0.83 V) and Mn²⁺ (−1.18 V). Reducing agent: Zn(s) (Zn²⁺/Zn, −0.76 V).</>,
    reason: <>Co²⁺ is the strongest oxidising agent present and Zn the strongest reducing agent. Co²⁺/Co is higher on the electrochemical series than Zn²⁺/Zn, so they react.</>,
  },
  {
    working: <Chem eq="Co2+(aq) + Zn(s) -> Co(s) + Zn2+(aq)" className="block my-1" />,
    reason: <>Zn is oxidised and Co²⁺ is reduced directly on the surface of the rod. With the reactants in contact, the chemical energy released is converted to <b>heat energy</b>.</>,
  },
  {
    working: <>A: 0.48 V = −0.28 − (−0.76), the voltage a Co²⁺/Co ‖ Zn²⁺/Zn galvanic cell would give under standard conditions. With no separate half-cells and no external circuit, no voltage is produced in the beaker.</>,
    reason: <>Ruled out.</>,
  },
  {
    working: <>C: each Zn atom that loses 2e⁻ becomes one Zn²⁺ ion, but each Co²⁺ ion that gains those 2e⁻ leaves the solution as Co(s) — one ion in, one ion out. The total concentration of ions doesn&rsquo;t change.</>,
    reason: <>Ruled out.</>,
  },
  {
    working: <>D: 0.42 V = −0.76 − (−1.18), the least voltage an electrolytic cell would need to force Zn to reduce Mn²⁺. The equipment has no power supply, and Zn reacts spontaneously with Co²⁺ anyway.</>,
    reason: <>Ruled out.</>,
  },
  {
    working: <b>In the beaker, chemical energy is converted to heat energy.</b>,
    reason: <>Matches option <b>B</b>. Options <b>A</b> and <b>D</b> treat the beaker as an electrochemical cell, which it is not (the report&rsquo;s point); option <b>A</b>, chosen by as many students as <b>B</b>, is the voltage of a Co²⁺/Co ‖ Zn²⁺/Zn galvanic cell. (The diagram labels the solution Co(NO₂)₂(aq) and Mn(NO₂)₂(aq); the anion plays no part in the answer.)</>,
  },
]

export default function ChemistryQ20_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The equipment below was set up by a student.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={equipmentSrc}
              alt="A Zn(s) rod dipping into a single beaker of 1 M Co(NO₂)₂(aq) and 1 M Mn(NO₂)₂(aq) — from the original 2022 VCAA exam paper"
              className="w-full max-w-[360px]"
            />
          </div>
          <p>Which one of the following is correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'In the beaker, the reaction between Zn(s) and Co²⁺(aq) produces 0.48 V.' },
        { letter: 'B', content: 'In the beaker, chemical energy stored in the reactants is converted to heat energy.', isAnswer: true },
        { letter: 'C', content: 'In the beaker, the concentration of ions increases because Zn(s) loses 2e⁻.' },
        { letter: 'D', content: 'In the beaker, a voltage of greater than 0.42 V must be applied to Zn(s) so that it reacts with Mn²⁺(aq).' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
