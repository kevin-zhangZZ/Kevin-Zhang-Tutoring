// 2020 Chemistry Exam, MCQ 16. VCAA examination report: 20% correct — the hardest MCQ on this
// paper. Estimating the boiling point of an ester (no O–H hydrogen bonding) from two other
// C₃H₆O₂ isomers with known boiling points. Question text transcribed from the original paper.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import tableSrc from './chem-2020-mcq16-table.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 25, C: 35, D: 20 },
  answer: 'A',
  comment: (
    <>
      Boiling points of molecular compounds such as X, Y and Z are related to the strength of the
      intermolecular bonding.
      <br />
      Since all three are polar molecules, the intermolecular bonding will have contributions from
      both dispersion forces and dipole-dipole bonding.
      <br />
      All three molecules have the same molar mass, so the contribution from dispersion forces will be
      similar for all.
      <br />
      Compounds X and Y will both have hydrogen bonding, due to the O-H groups.
      <br />
      Since compound Z does not have intermolecular hydrogen bonding, it would have the lowest
      boiling point.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="flex flex-col gap-1">
        <span>X = propan-1-ol, <Chem eq="C3H8O" />, M = 60 g mol⁻¹, boiling point 97 °C</span>
        <span>Y = ethanoic acid, <Chem eq="C2H4O2" />, M = 60 g mol⁻¹, boiling point 118 °C</span>
        <span>Z = methyl methanoate (an ester), <Chem eq="C2H4O2" />, M = 60 g mol⁻¹, boiling point unknown</span>
      </div>
    ),
    reason: <>All three compounds have essentially the same molar mass, so dispersion forces are comparable across all three.</>,
  },
  {
    working: <>X (an alcohol) and Y (a carboxylic acid) both have an <b>O–H</b> group, so both can hydrogen bond.</>,
    reason: <>Hydrogen bonding is the strongest of the intermolecular forces available here — it explains why X and Y both boil well above what dispersion forces alone would predict.</>,
  },
  {
    working: <>Z (an ester) has a <b>C=O</b> but <b>no O–H</b> — only dispersion forces and (weaker) dipole-dipole attraction are available.</>,
    reason: <>No hydrogen bonding possible for Z.</>,
  },
  {
    working: <>With the weakest intermolecular attraction of the three, Z should have the <b>lowest</b> boiling point — well below both X (97 °C) and Y (118 °C).</>,
    reason: <>Weaker intermolecular forces mean less energy is needed to separate the molecules into the gas phase.</>,
  },
  {
    working: <b>31 °C is the only option well below 97 °C — consistent with a molecule with no hydrogen bonding.</b>,
    reason: <>Matches option <b>A</b> (methyl methanoate&rsquo;s real boiling point is about 32 °C). Options B, C and D all sit near or above the hydrogen-bonded X and Y, as though Z also hydrogen bonded.</>,
  },
]

export default function ChemistryQ16_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The following table provides information about three organic compounds, X, Y and Z.
          </p>
          <div className="mb-2 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img src={tableSrc} alt="Table of compounds X, Y and Z with structural formulas: X is CH3CH2CH2OH, molar mass 60 g/mol, boiling point 97 °C; Y is CH3COOH, 60 g/mol, 118 °C; Z is HCOOCH3, 60 g/mol, boiling point unknown — from the original 2020 VCAA exam paper" className="w-full max-w-[520px]" />
          </div>
          <p>Which one of the following is the best estimate for the boiling point of Compound Z?</p>
        </>
      }
      options={[
        { letter: 'A', content: '31 °C', isAnswer: true },
        { letter: 'B', content: '101 °C' },
        { letter: 'C', content: '114 °C' },
        { letter: 'D', content: '156 °C' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
