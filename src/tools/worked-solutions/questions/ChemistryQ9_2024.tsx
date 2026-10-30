// 2024 Chemistry Exam, MCQ 9. VCAA examination report: 29% correct. Balancing the anode
// half-equation for an alkaline ethanol fuel cell to find how much hydroxide reacts per mole of
// ethanol. Question text transcribed from the original paper (rendered from page images — the
// 2024 exam PDF has no extractable text). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 27, C: 23, D: 29 },
  answer: 'D',
  comment: (
    <>
      The negative electrode is the anode, where oxidation occurs:
      <br />
      <Chem eq="C2H6O + 3H2O -> 2CO2 + 12H+ + 12e-" /> (in acidic conditions)
      <br />
      <Chem eq="C2H6O + 12OH- -> 2CO2 + 9H2O + 12e-" /> (in alkaline conditions)
      <br />
      In general this question was not well answered; the use of alkaline conditions for balancing
      half-equations was not well understood.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Negative electrode = anode → <b>oxidation</b> of ethanol to CO₂.</>,
    reason: (
      <>
        In a fuel cell (a galvanic cell) the negative electrode is the anode, where the fuel is
        oxidised. The other half-reaction, O₂ being reduced to OH⁻, happens at the positive
        electrode (cathode) and is not asked about.
      </>
    ),
  },
  {
    working: (
      <>
        <Chem eq="C2H5OH -> 2CO2" />
        <br />
        <Chem eq="C2H5OH + 3H2O -> 2CO2" />
        <br />
        <Chem eq="C2H5OH + 3H2O -> 2CO2 + 12H+" />
        <br />
        <Chem eq="C2H5OH(l) + 3H2O(l) -> 2CO2(g) + 12H+(aq) + 12e-" />
      </>
    ),
    reason: (
      <>
        Balance as if in acidic conditions first, one element at a time. C: 2 C on the left gives 2 CO₂.
        O: 1 O on the left, 4 O on the right, so add 3 H₂O to the left. H: 6 + 6 = 12 H on the left,
        so add 12 H⁺ to the right. Charge: the left is 0 and the right is +12, so add 12 e⁻ to the
        right.
      </>
    ),
  },
  {
    working: (
      <>
        <Chem eq="C2H5OH + 3H2O + 12OH- -> 2CO2 + 12H+ + 12OH- + 12e-" />
        <br />
        <Chem eq="C2H5OH + 3H2O + 12OH- -> 2CO2 + 12H2O + 12e-" />
      </>
    ),
    reason: (
      <>
        The electrolyte is <b>alkaline</b>, so H⁺ cannot appear in the final equation. Add 12 OH⁻
        to <i>both</i> sides (one for each H⁺), then combine each H⁺ + OH⁻ on the right into H₂O.
      </>
    ),
  },
  {
    working: (
      <>
        <Chem eq="C2H5OH(l) + 12OH-(aq) -> 2CO2(g) + 9H2O(l) + 12e-" />
      </>
    ),
    reason: (
      <>
        Cancel water: 3 H₂O on the left and 12 H₂O on the right leave 9 H₂O on the right. Check:
        O is 1 + 12 = 13 on the left and 4 + 9 = 13 on the right; H is 6 + 12 = 18 on both sides;
        charge is −12 on both sides.
      </>
    ),
  },
  {
    working: <b><i>n</i>(OH⁻) : <i>n</i>(C₂H₅OH) = 12 : 1, so 12 mol of OH⁻ reacts with 1 mol of ethanol.</b>,
    reason: (
      <>
        Matches option <b>D</b>. Option <b>A</b> (4 mol) is the number of OH⁻ in the{' '}
        <i>cathode</i> half-equation, <Chem eq="O2(g) + 2H2O(l) + 4e- -> 4OH-(aq)" />, which is
        the wrong electrode and is per mole of O₂, not ethanol. The report writes ethanol as C₂H₆O,
        the same molecular formula as C₂H₅OH.
      </>
    ),
  },
]

export default function ChemistryQ9_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The overall reaction in an alkaline–ethanol fuel cell is shown below.</p>
          <Chem eq="C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)" className="block mb-2" />
          <p>
            What amount of hydroxide ions, OH⁻, reacts with 1 mol of ethanol, C₂H₅OH, at the
            negative electrode of the fuel cell?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '4 mol' },
        { letter: 'B', content: '6 mol' },
        { letter: 'C', content: '8 mol' },
        { letter: 'D', content: '12 mol', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
