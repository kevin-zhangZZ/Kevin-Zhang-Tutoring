// 2021 Chemistry Exam, MCQ 12. VCAA examination report: 70% correct. Mass of CO₂ produced by
// the complete combustion of 67.0 g of butane, using the 2 : 8 mole ratio from the equation.
// Question text transcribed from the original paper. The report works it two ways (from the mass,
// 203 g; from the energy with 2880 kJ mol⁻¹, 204 g); the 2026 Data Book gives −2877 kJ mol⁻¹ for
// butane, noted at the cross-check, and the answer is unchanged. VCAA report only. Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 9, C: 16, D: 70 },
  answer: 'D',
  comment: (
    <>
      <i>n</i>(C₄H₁₀) = 67.0 g / 58.0 g mol⁻¹
      <br />
      <i>n</i>(CO₂) = 4 x 67.0 / 58.0
      <br />
      = 4.62 mol
      <br />
      <i>m</i>(CO₂) = 4.62 mol x 44.0 g mol⁻¹
      <br />
      = 203 g
      <br />
      Alternatively:
      <br />
      <i>n</i>(C₄H₁₀) = 3330 kJ / 2880 kJ mol⁻¹
      <br />
      <i>n</i>(CO₂) = 4 x 3330 / 2880
      <br />
      = 4.63 mol
      <br />
      <i>m</i>(CO₂) = 4.63 mol x 44.0 g mol⁻¹
      <br />
      = 204 g
      <br />
      Alternative C is consistent with not using the <i>n</i>(CO₂)/<i>n</i>(C₄H₁₀) ratio
      indication in the combustion equation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Mass of <Chem eq="C4H10" /> → mol <Chem eq="C4H10" /> → mol <Chem eq="CO2" /> → mass <Chem eq="CO2" /></>,
    reason: <>The standard mass-to-mass route. You are given the mass of butane directly, so you don&rsquo;t need the energy figure (3330 kJ) at all — it is only useful as a cross-check.</>,
  },
  {
    working: (
      <>
        <i>n</i>(<Chem eq="C4H10" />) = <i>m</i>/<i>M</i>
        <br />= 67.0 g / 58.0 g mol⁻¹
        <br />= 1.1552 mol
      </>
    ),
    reason: <>Data Book: C 12.0, H 1.0 g mol⁻¹, so <i>M</i>(<Chem eq="C4H10" />) = 4(12.0) + 10(1.0) = 58.0 g mol⁻¹. Keep the unrounded value for the next step.</>,
  },
  {
    working: <><i>n</i>(<Chem eq="CO2" />) : <i>n</i>(<Chem eq="C4H10" />) = 8 : 2 = 4 : 1</>,
    reason: <>The mole ratio comes from the coefficients in the balanced equation: 2 mol of butane produce 8 mol of <Chem eq="CO2" />. (Each butane has 4 C atoms, and each C ends up in one <Chem eq="CO2" />.)</>,
  },
  {
    working: (
      <>
        <i>n</i>(<Chem eq="CO2" />) = 4 × <i>n</i>(<Chem eq="C4H10" />)
        <br />= 4 × 1.1552 mol
        <br />= 4.6207 mol
      </>
    ),
    reason: <>Multiply by the ratio — more <Chem eq="CO2" /> molecules are produced than butane molecules burnt.</>,
  },
  {
    working: (
      <>
        <i>m</i>(<Chem eq="CO2" />) = <i>n</i> × <i>M</i>
        <br />= 4.6207 mol × 44.0 g mol⁻¹
        <br />= 203.3 g ≈ 203 g
      </>
    ),
    reason: <>Data Book: <i>M</i>(<Chem eq="CO2" />) = 12.0 + 2(16.0) = 44.0 g mol⁻¹. Three significant figures, set by the mass 67.0 g.</>,
  },
  {
    working: (
      <>
        Cross-check from the energy: <i>n</i>(<Chem eq="C4H10" />) = 3330 kJ / 2877 kJ mol⁻¹ = 1.1575 mol
        <br /><i>n</i>(<Chem eq="CO2" />) = 4 × 1.1575 mol = 4.6298 mol
        <br /><i>m</i>(<Chem eq="CO2" />) = 4.6298 mol × 44.0 g mol⁻¹ = 203.7 g ≈ 204 g
      </>
    ),
    reason: (
      <>
        Data Book: the molar enthalpy of combustion of butane is −2877 kJ mol⁻¹, so the amount burnt
        is energy released ÷ energy per mole. The two routes agree to within rounding (the 3330 kJ is
        itself given to 3 significant figures), which is why the report shows both 203 g and 204 g.
        <DataBookNote>
          the 2026 Data Book (item 12) gives −2877 kJ mol⁻¹ for butane; the report uses 2880 kJ
          mol⁻¹, giving 4.63 mol and 204 g. The answer is unchanged — and the mass route above
          doesn&rsquo;t use this value at all.
        </DataBookNote>
      </>
    ),
  },
  {
    working: <b><i>m</i>(<Chem eq="CO2" />) ≈ 203–204 g → 204 g</b>,
    reason: <>Matches option <b>D</b>. The mass route gives 203 g and the energy route 204 g — the difference is only rounding, and no other option is anywhere near, so 204 g is the answer. Option <b>C</b> (16%), 50.9 g, comes from leaving out the 4 : 1 ratio — treating mol <Chem eq="CO2" /> as equal to mol butane (1.155 mol × 44.0 g mol⁻¹ = 50.8 g, or 50.9 g via the energy route), as the report notes. Option <b>A</b> (4%), 0.105 g, comes from dividing the amount of <Chem eq="CO2" /> by its molar mass instead of multiplying (4.62 mol ÷ 44.0 g mol⁻¹): mass = amount × molar mass.</>,
  },
]

export default function ChemistryQ12_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Butane, <Chem eq="C4H10" />, undergoes complete combustion according to the following
            equation.
          </p>
          <p className="mb-2 text-center"><Chem eq="2C4H10(g) + 13O2(g) -> 8CO2(g) + 10H2O(g)" /></p>
          <p>
            67.0 g of <Chem eq="C4H10" /> released 3330 kJ of energy during complete combustion at
            standard laboratory conditions (SLC).
            <br />
            The mass of carbon dioxide, <Chem eq="CO2" />, produced was
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>0.105 g</> },
        { letter: 'B', content: <>3.18 g</> },
        { letter: 'C', content: <>50.9 g</> },
        { letter: 'D', content: <>204 g</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
