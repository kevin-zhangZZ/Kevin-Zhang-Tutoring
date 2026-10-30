// 2023 Chemistry Exam, MCQ 24. VCAA examination report: 61% correct. Operation of an acidic
// propan-1-ol fuel cell: the half-equations at each electrode, ion flow through the membrane,
// constant voltage with a continuous supply of reactants. Question text transcribed from the
// original paper. VCAA report only (no second source). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 61, B: 9, C: 23, D: 7 },
  answer: 'A',
  comment: (
    <>
      Half equations in a CH₃CH₂CH₂OH / O₂ fuel cell with acid electrolyte:
      <br />
      Anode (−) <Chem eq="C3H8O(l) + 5H2O(l) -> 3CO2(g) + 18H+(aq) + 18e-" />
      <br />
      Cathode (+) <Chem eq="O2(g) + 4H+(aq) + 4e- -> 2H2O(l)" />
      <br />
      Cations, H⁺(aq), flow through the electrolyte from the anode (−) to the cathode (+).
      <br />
      Since there is a continuous supply of reactants, the voltage would not be expected to
      decrease.
      <br />
      H₂O is formed at the positive electrode and CO₂ is formed at the negative electrode.
      <br />
      All reactants must have direct contact with the relevant electrodes.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Fuel (propan-1-ol) is <b>oxidised at the anode</b>; O₂ is <b>reduced at the cathode</b>. In a galvanic cell (a fuel cell is one), the anode is <b>negative (−)</b> and the cathode is <b>positive (+)</b>.</>,
    reason: <>The fuel is the reductant and gives up electrons; they leave at the anode, making it the negative terminal. Students often mix up the polarity — in an <i>electrolytic</i> cell the anode is positive, but in a galvanic cell it is negative.</>,
  },
  {
    working: (
      <>
        Anode (−), oxidation, acidic:
        <br />
        <Chem eq="CH3CH2CH2OH(l) + 5H2O(l) -> 3CO2(g) + 18H+(aq) + 18e-" />
      </>
    ),
    reason: <>Balance in acid: C first (3 CO₂), then O with H₂O (6 O on the right, 1 in propanol, so 5 H₂O), then H with H⁺ (8 + 10 = 18 H⁺), then charge with e⁻ (18 e⁻). Check: 0 charge on the left; 18+ and 18− on the right.</>,
  },
  {
    working: (
      <>
        Cathode (+), reduction, acidic:
        <br />
        <Chem eq="O2(g) + 4H+(aq) + 4e- -> 2H2O(l)" />
      </>
    ),
    reason: <>Data Book electrochemical series, the O₂/H₂O half-equation in acid (+1.23 V).</>,
  },
  {
    working: <>A — true: H⁺ is <b>produced at the anode</b> and <b>consumed at the cathode</b>, so the positive H⁺ ions flow through the membrane from the anode to the cathode.</>,
    reason: <>Ions in the electrolyte keep each side electrically neutral: positive ions move toward the cathode, which is gaining electrons from the external circuit.</>,
  },
  {
    working: <>B — false: reactants are <b>supplied continuously</b>, so the voltage does not fall as they react.</>,
    reason: <>This is the key difference between a fuel cell and a primary cell, whose voltage drops as its sealed-in reactants are used up.</>,
  },
  {
    working: <>C — false: H₂O forms at the <b>positive</b> electrode (cathode) and CO₂ at the <b>negative</b> electrode (anode) — the option has them reversed.</>,
    reason: <>Read straight from the half-equations above: CO₂ is a product at the anode (−), H₂O at the cathode (+).</>,
  },
  {
    working: <>D — false: the propan-1-ol (and water) at the anode must also contact the electrode, because electrons can only be transferred at the electrode surface.</>,
    reason: <>Being a gas has nothing to do with it. Fuel-cell electrodes are porous so that every reactant — gas or liquid — can reach the catalyst on the electrode surface.</>,
  },
  {
    working: <b>Positive ions flow through the membrane to the cathode.</b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b>, chosen by 23%, swaps the electrodes: it puts the oxidation product, CO₂, at the positive electrode, as if the cell were electrolytic.</>,
  },
]

export default function ChemistryQ24_2023() {
  return (
    <MCQShell
      question={<p>Which one of the following statements about acidic propan-1-ol fuel cells is correct?</p>}
      options={[
        { letter: 'A', content: 'Positive ions flow through the membrane to the cathode.', isAnswer: true },
        { letter: 'B', content: 'The voltage decreases since the reactants are used up in the half-cell reactions.' },
        { letter: 'C', content: <>H₂O is formed at the negative electrode and CO₂ is formed at the positive electrode.</> },
        { letter: 'D', content: <>Since it is a gas, O₂ is the only reactant that must have direct contact with the electrode.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
