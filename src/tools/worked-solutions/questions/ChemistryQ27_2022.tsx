// 2022 Chemistry Exam, MCQ 27. VCAA examination report: 46% correct. Comparing the atom economy
// of four reactions that make (or fail to make) an organic molecule: an addition reaction has
// 100% atom economy. Question text transcribed from the original paper. Molar masses recomputed
// from the 2026 Data Book. The report's formula reads "/ 100" where "× 100" is meant — kept
// verbatim in the comment and explained in the working. Solution is original (VCAA report only).

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 14, C: 46, D: 25 },
  answer: 'C',
  comment: (
    <>
      Atom economy = [M(organic product) / M(reactants)] / 100
      <br />
      A. Propyne combustion does not produce any organic molecules.
      <br />
      B. <Chem eq="C3H8 + I2 -> C3H7I + HI" />
      <br />
      Atom economy = [169.9 / (44.0 + 253.8)] x 100 = 57 %
      <br />
      C. <Chem eq="C3H6 + Br2 -> C3H6Br2" />
      <br />
      Atom economy = [201.8 / (42.0 + 159.8)] x 100 = 100 %
      <br />
      D. <Chem eq="2C3H7NO2 -> C6H12N2O3 + H2O" />
      <br />
      Atom economy = [160.0 / (2 x 89.0)] x 100 = 90 %
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>atom economy = (<i>M</i>(desired product) / total <i>M</i>(reactants)) × 100%</>,
    reason: <>Atom economy measures how much of the reactants&rsquo; mass ends up in the product you want. Use the molar masses multiplied by the coefficients in the balanced equation. (The report&rsquo;s formula has &ldquo;/ 100&rdquo; — a slip for &ldquo;× 100&rdquo;, as its own calculations show.)</>,
  },
  {
    working: <>A: <Chem eq="C3H4(g) + 4O2(g) -> 3CO2(g) + 2H2O(l)" /> — products are CO₂ and H₂O only, so <b>no organic molecule</b> is produced: atom economy for an organic product = 0%.</>,
    reason: <>Complete combustion breaks the molecule down to CO₂ and water. (Alkynes such as propyne are no longer in the study design, but nothing here needs alkyne chemistry.)</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span>B: <Chem eq="C3H8(g) + I2(g) -> C3H7I(g) + HI(g)" /> (substitution)</span>
        <span>atom economy = 169.9 g mol⁻¹ / (44.0 + 253.8) g mol⁻¹ × 100%</span>
        <span>= <b>57.1%</b></span>
      </div>
    ),
    reason: <>A substitution always makes a by-product (here HI), so some reactant mass is wasted. Data Book: <i>M</i>(C) = 12.0, <i>M</i>(H) = 1.0, <i>M</i>(I) = 126.9 g mol⁻¹, so <i>M</i>(C₃H₈) = 44.0, <i>M</i>(I₂) = 253.8, <i>M</i>(C₃H₇I) = 169.9 g mol⁻¹.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span>C: <Chem eq="C3H6(g) + Br2(l) -> C3H6Br2(l)" /> (addition)</span>
        <span>atom economy = 201.8 g mol⁻¹ / (42.0 + 159.8) g mol⁻¹ × 100%</span>
        <span>= <b>100%</b></span>
      </div>
    ),
    reason: <>In an addition reaction every reactant atom ends up in the single product, so the atom economy is always 100% — no calculation is strictly needed. Data Book: <i>M</i>(Br) = 79.9 g mol⁻¹, so <i>M</i>(Br₂) = 159.8 g mol⁻¹ and <i>M</i>(C₃H₆Br₂) = 201.8 g mol⁻¹.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span>D: <Chem eq="2C3H7NO2 -> C6H12N2O3 + H2O" /> (condensation)</span>
        <span>mole ratio alanine : dipeptide = 2 : 1</span>
        <span>atom economy = 160.0 g mol⁻¹ / (2 × 89.0 g mol⁻¹) × 100%</span>
        <span>= <b>89.9%</b></span>
      </div>
    ),
    reason: <>Two alanine molecules join by a peptide (amide) link and lose one water molecule — the water is the wasted by-product. Data Book: <i>M</i>(N) = 14.0, <i>M</i>(O) = 16.0 g mol⁻¹, so <i>M</i>(C₃H₇NO₂) = 89.0 and <i>M</i>(C₆H₁₂N₂O₃) = 160.0 g mol⁻¹. The 2 in front of alanine must be included in the reactant mass. (The report rounds this to 90%.)</>,
  },
  {
    working: <b>The reaction of bromine with propene (addition) has the highest atom economy, 100%.</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b> (25%) has a high atom economy, 89.9%, but a condensation reaction always loses water, so it can&rsquo;t reach 100%. Option <b>B</b> is a substitution with HI as a by-product (57.1%). Option <b>A</b> makes no organic product at all.</>,
  },
]

export default function ChemistryQ27_2022() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following reactions has the highest atom economy in the production of an
          organic molecule?
        </p>
      }
      options={[
        { letter: 'A', content: <>complete combustion of propyne, <Chem eq="C3H4" /></> },
        { letter: 'B', content: <>reaction of iodine, <Chem eq="I2" />, with propane, <Chem eq="C3H8" /></> },
        { letter: 'C', content: <>reaction of bromine, <Chem eq="Br2" />, and propene, <Chem eq="C3H6" /></>, isAnswer: true },
        { letter: 'D', content: <>formation of a dipeptide from alanine, <Chem eq="C3H7NO2" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
