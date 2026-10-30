// 2020 Chemistry Exam, MCQ 27. VCAA examination report: 53% correct. Using heats of combustion to
// compare the chemical energy of two C₂H₄O₂ isomers, and auto-ignition temperatures to compare
// their activation energies of combustion. Question text transcribed from the original paper.
// VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 53, B: 16, C: 15, D: 14 },
  answer: 'A',
  noAnswer: 0,
  comment: (
    <>
      Heats of combustion indicate the relative amounts of chemical energy converted to heat energy
      during combustion. Ethanoic acid (−876 kJ mol⁻¹) releases less energy per mole so has the
      lower chemical energy per mol.
      <br />
      Autoignition temperatures indicate the relative amounts of energy per mole (activation energy)
      needed to initiate combustion. Methyl methanoate (449 °C) has the lower autoignition
      temperature so has the lower activation energy.
    </>
  ),
}

const H1 = 'Compound with the lower chemical energy per mole'
const H2 = 'Compound with the lower activation energy of combustion per mole'

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="C2H4O2(l) + 2O2(g) -> 2CO2(g) + 2H2O(l)" />,
    reason: <>Both compounds are isomers with formula <Chem eq="C2H4O2" />, so they burn by the <b>same</b> equation and form the <b>same products in the same amounts</b>.</>,
  },
  {
    working: <>Δ<i>H</i> = <i>H</i>(products) − <i>H</i>(reactants)</>,
    reason: <>The products (2 mol CO₂ + 2 mol H₂O) are identical for both, so they sit at the same energy level. Any difference in the heat released must come from a difference in the energy of the <b>reactants</b>.</>,
  },
  {
    working: <>Ethanoic acid releases 876 kJ mol⁻¹; methyl methanoate releases 973 kJ mol⁻¹.</>,
    reason: <>From the stem: Δ<i>H</i><sub>c</sub> = −876 kJ mol⁻¹ and −973 kJ mol⁻¹. Both fall to the same product level, so the one that releases <b>less</b> energy must have started <b>lower</b>.</>,
  },
  {
    working: (
      <>
        difference in chemical energy = |Δ<i>H</i><sub>c</sub>(methyl methanoate)| − |Δ<i>H</i><sub>c</sub>(ethanoic acid)|
        <br />= 973 kJ mol⁻¹ − 876 kJ mol⁻¹
        <br />= 97 kJ mol⁻¹
      </>
    ),
    reason: <>Ethanoic acid (with its 2 mol O₂) holds 97 kJ mol⁻¹ <b>less</b> chemical energy than methyl methanoate (with its 2 mol O₂). The O₂ is the same in both, so the difference is in the compounds. So <b>ethanoic acid has the lower chemical energy per mole</b>.</>,
  },
  {
    working: <>Auto-ignition temperature: methyl methanoate 449 °C &lt; ethanoic acid 485 °C</>,
    reason: <>The auto-ignition temperature is the temperature at which enough molecules have energy ≥ <i>E</i><sub>a</sub> for combustion to start with no spark. A <b>lower</b> auto-ignition temperature means less energy is needed to start the reaction — a <b>lower activation energy</b>.</>,
  },
  {
    working: <>So <b>methyl methanoate has the lower activation energy of combustion</b>.</>,
    reason: <>Δ<i>H</i> and <i>E</i><sub>a</sub> are independent: Δ<i>H</i> compares the start and end levels, <i>E</i><sub>a</sub> is the height of the energy barrier. Read each column from its own data.</>,
  },
  {
    working: <b>Lower chemical energy: ethanoic acid · Lower activation energy: methyl methanoate</b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b> (15%) picks methyl methanoate for the lower chemical energy — the reverse of the logic: releasing <i>more</i> energy to reach the same products means starting with <i>more</i>. Option <b>B</b> (16%) picks ethanoic acid for the lower activation energy, but it has the <i>higher</i> auto-ignition temperature. Option <b>D</b> reverses both.</>,
  },
]

export default function ChemistryQ27_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 27 and 28.</p>
          <p className="mb-3">
            The heat of combustion of ethanoic acid, C₂H₄O₂, is −876 kJ mol⁻¹ and the heat of
            combustion of methyl methanoate, C₂H₄O₂, is −973 kJ mol⁻¹. The auto-ignition
            temperature (the temperature at which a substance will combust in air without a source
            of ignition) of ethanoic acid is 485 °C and the auto-ignition temperature of methyl
            methanoate is 449 °C.
          </p>
          <p>Which one of the following pairs is correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>{H1}: ethanoic acid · {H2}: methyl methanoate</>, isAnswer: true },
        { letter: 'B', content: <>{H1}: ethanoic acid · {H2}: ethanoic acid</> },
        { letter: 'C', content: <>{H1}: methyl methanoate · {H2}: methyl methanoate</> },
        { letter: 'D', content: <>{H1}: methyl methanoate · {H2}: ethanoic acid</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
