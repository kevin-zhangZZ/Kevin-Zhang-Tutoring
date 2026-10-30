// 2024 Chemistry Exam, MCQ 24. VCAA examination report: 26% correct — the hardest MCQ on this
// paper. Finding the equivalence-point volume of oxalic acid needed to titrate a fixed amount of
// potassium permanganate, via the redox half-equations' electron balance. Question text
// transcribed from the original paper (rendered from page images — the 2024 exam PDF has no
// extractable text). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 35, C: 24, D: 26 },
  answer: 'D',
  comment: (
    <>
      From the Data Book:
      <br />
      <Chem eq="MnO4-(aq) + 8H+(aq) + 5e- -> Mn2+(aq) + 4H2O(l)" />
      <br />
      Therefore, the reaction between MnO₄⁻ and C₂H₂O₄ will have a 2:5 stoichiometric ratio.
      <br />
      <i>n</i>(MnO₄⁻) = 0.001 mol, therefore <i>n</i>(C₂H₂O₄) = 0.0025 mol
      <br />
      <i>V</i>(C₂H₂O₄) = 0.0025/0.1 = 0.025 L = 25 mL
      <br />
      Many students did not identify and apply the second half-equation and hence establish the
      stoichiometry needed for this question.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        oxidation: <Chem eq="C2H2O4(aq) -> 2CO2(g) + 2H+(aq) + 2e-" />
        <br />
        reduction: <Chem eq="MnO4-(aq) + 8H+(aq) + 5e- -> Mn2+(aq) + 4H2O(l)" />
      </>
    ),
    reason: <>The question gives only the oxidation half-equation. Oxalic acid is the reductant, so the oxidant, permanganate, must be reduced — its half-equation comes from the electrochemical series in the Data Book (MnO₄⁻ is reduced to Mn²⁺ in acidic conditions). The report notes many students did not identify and apply this second half-equation.</>,
  },
  {
    working: (
      <>
        × 5: <Chem eq="5C2H2O4 -> 10CO2 + 10H+ + 10e-" />
        <br />
        × 2: <Chem eq="2MnO4- + 16H+ + 10e- -> 2Mn2+ + 8H2O" />
        <br />
        overall: <Chem eq="2MnO4-(aq) + 5C2H2O4(aq) + 6H+(aq) -> 2Mn2+(aq) + 10CO2(g) + 8H2O(l)" />
      </>
    ),
    reason: <>Electrons lost must equal electrons gained. Oxalic acid gives 2 e⁻ and permanganate takes 5 e⁻, so scale both to 10 e⁻ (the lowest common multiple), add, and cancel the electrons and the 10H⁺ that appear on both sides.</>,
  },
  {
    working: <>mole ratio <i>n</i>(C₂H₂O₄) : <i>n</i>(MnO₄⁻) = 5 : 2</>,
    reason: <>Read straight from the coefficients of the overall equation.</>,
  },
  {
    working: (
      <>
        <i>n</i>(MnO₄⁻) = <i>c</i> × <i>V</i>
        <br />= 0.100 mol L⁻¹ × 0.0100 L
        <br />= 1.00 × 10⁻³ mol
      </>
    ),
    reason: <>KMnO₄ is fully dissociated, so <i>n</i>(MnO₄⁻) = <i>n</i>(KMnO₄). Convert 10.0 mL to 0.0100 L before multiplying.</>,
  },
  {
    working: (
      <>
        <i>n</i>(C₂H₂O₄) = <sup>5</sup>⁄<sub>2</sub> × <i>n</i>(MnO₄⁻)
        <br />= <sup>5</sup>⁄<sub>2</sub> × 1.00 × 10⁻³ mol
        <br />= 2.50 × 10⁻³ mol
      </>
    ),
    reason: <>At the equivalence point the reactants have been added in exactly the 5 : 2 ratio. Put the substance you want on top of the ratio: 5 for C₂H₂O₄ over 2 for MnO₄⁻.</>,
  },
  {
    working: (
      <>
        <i>V</i>(C₂H₂O₄) = <i>n</i> ÷ <i>c</i>
        <br />= 2.50 × 10⁻³ mol ÷ 0.100 mol L⁻¹
        <br />= 0.0250 L = 25.0 mL
      </>
    ),
    reason: <>Rearrange <i>c</i> = <i>n</i>/<i>V</i>. Three significant figures, matching the data (10.0 mL, 0.100 M).</>,
  },
  {
    working: <b>V(C₂H₂O₄) = 25.0 mL</b>,
    reason: <>Matches option <b>D</b>. Option <b>B</b>, 10.0 mL, the most popular answer (35%), is what a 1 : 1 ratio gives — the result of not using the permanganate half-equation. Option <b>A</b>, 4.0 mL, uses the ratio upside down (<sup>2</sup>⁄<sub>5</sub> × 1.00 × 10⁻³ mol = 4.0 × 10⁻⁴ mol). Sanity check: each oxalic acid supplies fewer electrons (2) than each permanganate takes (5), so more oxalic acid than permanganate is needed — more than 10.0 mL at equal concentrations.</>,
  },
]

export default function ChemistryQ24_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Evelyn titrates 10.0 mL of 0.100 M potassium permanganate, KMnO₄, with 0.100 M oxalic
            acid, C₂H₂O₄.
          </p>
          <p className="mb-2">
            The half-equation for the oxidation of oxalic acid in acidic conditions is
          </p>
          <Chem eq="C2H2O4(aq) -> 2CO2(g) + 2H+(aq) + 2e-" className="block mb-2" />
          <p>What volume of C₂H₂O₄ should be added to reach the equivalence point?</p>
        </>
      }
      options={[
        { letter: 'A', content: '4.0 mL' },
        { letter: 'B', content: '10.0 mL' },
        { letter: 'C', content: '12.0 mL' },
        { letter: 'D', content: '25.0 mL', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
