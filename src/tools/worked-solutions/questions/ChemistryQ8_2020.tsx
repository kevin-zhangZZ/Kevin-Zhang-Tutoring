// 2020 Chemistry Exam, MCQ 8. VCAA examination report: 66% correct. Comparing fuel cells with
// secondary (rechargeable) cells: rechargeability, heat, electrode polarity and voltage during
// operation. Question text transcribed from the original paper. VCAA report only. Solution is
// original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 14, C: 9, D: 66 },
  answer: 'D',
  comment: (
    <>
      Option A: Fuel cells are not rechargeable, they have a continuous supply of reactants.
      <br />
      Option B: Thermal energy is produced in both types of cell.
      <br />
      Option C: Anode is negative in a fuel cell; it is either negative (discharging) or positive
      (recharging) in a secondary cell.
      <br />
      Option D: Correct.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Fuel cell: a galvanic cell whose reactants (fuel and O₂) are <b>supplied continuously</b> from outside and whose products are removed.<br />Secondary cell: a galvanic cell with its reactants <b>stored inside</b>, which can be <b>recharged</b> as an electrolytic cell.</>,
    reason: <>Both are galvanic cells while they deliver electricity, so they share the galvanic features (anode negative, some energy lost as heat). The differences come from where the reactants are.</>,
  },
  {
    working: <>A: fuel cells are <b>not recharged</b> ✗.</>,
    reason: <>A fuel cell never runs out while fuel and oxygen keep flowing in, so there is nothing to recharge — it is &ldquo;refuelled&rdquo;, not recharged.</>,
  },
  {
    working: <>B: <b>both</b> produce thermal energy ✗.</>,
    reason: <>No cell converts chemical energy into electrical energy with 100% efficiency; some is always released as heat. (A phone battery warms up as it discharges.)</>,
  },
  {
    working: <>C: the anode of a fuel cell is <b>negative</b> ✗.</>,
    reason: <>The anode is where oxidation happens. In any galvanic cell, electrons are released there, so it is the negative electrode. In a secondary cell the anode is negative while discharging (galvanic) but positive while recharging (electrolytic) — and a fuel cell&rsquo;s anode is not positive at all.</>,
  },
  {
    working: <>D: fuel cell → constant voltage; secondary cell → voltage falls as it discharges ✓.</>,
    reason: <>The fuel cell&rsquo;s reactant concentrations stay constant because they are continuously replenished, so its voltage holds steady. In a secondary cell the stored reactants are used up and products build up as it discharges, so the voltage gradually drops.</>,
  },
  {
    working: <b>Fuel cells give a constant voltage; secondary cells lose voltage as they discharge.</b>,
    reason: <>Matches option <b>D</b>. Option <b>B</b> wrongly assumes a secondary cell is 100% efficient; option <b>A</b> confuses refuelling with recharging; option <b>C</b> reverses the polarity of a galvanic anode.</>,
  },
]

export default function ChemistryQ8_2020() {
  return (
    <MCQShell
      question={<p>Which one of the following is the most correct statement about fuel cells and secondary cells?</p>}
      options={[
        { letter: 'A', content: 'Fuel cells can be recharged like secondary cells.' },
        { letter: 'B', content: 'Fuel cells produce thermal energy, whereas secondary cells do not produce thermal energy.' },
        { letter: 'C', content: 'The anode in a fuel cell is positive, whereas the anode in a secondary cell is negative.' },
        { letter: 'D', content: 'Fuel cells deliver a constant voltage during their operation, whereas secondary cells reduce in voltage as they discharge.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
