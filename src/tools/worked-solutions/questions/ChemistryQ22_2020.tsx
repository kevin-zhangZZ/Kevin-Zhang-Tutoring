// 2020 Chemistry Exam, MCQ 22. VCAA examination report: 46% correct. Comparing the energy
// released by burning 100 g of four fuels whose energy contents are given in different units
// (MJ tonne⁻¹, kJ g⁻¹, kJ mol⁻¹). Question text transcribed from the original paper. VCAA report
// only. Report slips kept verbatim in the comment and explained in the working: option C's
// "3.73x10³ kJ" should be 3.61 × 10³ kJ, and option D's "5.0x103 kJ" means 5.0 × 10³ kJ.
// Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 12, C: 22, D: 46 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      Option A: Energy = 100 g x 49097x10⁻⁶ MJ g⁻¹ = 4.91 MJ = 4.91x10³ kJ
      <br />
      Option B: Energy = 100 g x 11.63 kJ g⁻¹ = 1.16x10³ kJ
      <br />
      Option C: Energy = (100/74) mol x 2670 kJ mol⁻¹ = 3.73x10³ kJ
      <br />
      Option D: Energy = (100/26) mol x 1300 kJ mol⁻¹ = 5.0x103 kJ
      <br />
      The selection of option A suggests issues with the energy units. However, the popularity of
      option C was surprising given the similar calculation technique to that of the correct
      response.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Convert every fuel to the same basis: energy released (kJ) by 100 g.</>,
    reason: <>The four energy values are in three different units (MJ tonne⁻¹, kJ g⁻¹, kJ mol⁻¹), so the raw numbers can&rsquo;t be compared directly. Per-mass values are multiplied by the mass; per-mole values need the amount in mol first, <i>n</i> = <i>m</i>/<i>M</i>.</>,
  },
  {
    working: (
      <>
        A (pentane): 49 097 MJ tonne⁻¹ = 49 097 × 10³ kJ ÷ 10⁶ g = 49.097 kJ g⁻¹
        <br />
        <i>E</i> = <i>m</i> × (energy per gram)
        <br />
        <i>E</i> = 100 g × 49.097 kJ g⁻¹
        <br />
        <i>E</i> = 4909.7 kJ = <b>4.91 × 10³ kJ</b>
      </>
    ),
    reason: <>1 MJ = 10³ kJ and 1 tonne = 10⁶ g, so MJ tonne⁻¹ → kJ g⁻¹ means dividing by 10³. (The report does the same in one step: 49 097 × 10⁻⁶ MJ g⁻¹.)</>,
  },
  {
    working: (
      <>
        B (nitromethane): <i>E</i> = <i>m</i> × (energy per gram)
        <br />
        <i>E</i> = 100 g × 11.63 kJ g⁻¹
        <br />
        <i>E</i> = 1163 kJ = <b>1.16 × 10³ kJ</b>
      </>
    ),
    reason: <>Already per gram, so just multiply by 100 g. The molar mass given for nitromethane isn&rsquo;t needed.</>,
  },
  {
    working: (
      <>
        C (butanol): <i>n</i> = <i>m</i>/<i>M</i> = 100 g ÷ 74 g mol⁻¹ = 1.351… mol
        <br />
        <i>E</i> = <i>n</i> × (energy per mole)
        <br />
        <i>E</i> = 1.351… mol × 2670 kJ mol⁻¹
        <br />
        <i>E</i> = 3608 kJ = <b>3.61 × 10³ kJ</b>
      </>
    ),
    reason: <>Per mole, so find the amount in 100 g first. The report&rsquo;s comment prints 3.73 × 10³ kJ for this line; (100/74) × 2670 is actually 3.61 × 10³ kJ — a slip in the report that doesn&rsquo;t change the answer.</>,
  },
  {
    working: (
      <>
        D (ethyne): <i>n</i> = <i>m</i>/<i>M</i> = 100 g ÷ 26 g mol⁻¹ = 3.846… mol
        <br />
        <i>E</i> = <i>n</i> × (energy per mole)
        <br />
        <i>E</i> = 3.846… mol × 1300 kJ mol⁻¹
        <br />
        <i>E</i> = <b>5.0 × 10³ kJ</b>
      </>
    ),
    reason: <>Ethyne&rsquo;s small molar mass means 100 g contains far more moles (3.85 mol) than 100 g of butanol (1.35 mol), which outweighs its smaller energy per mole. The report&rsquo;s &ldquo;5.0x103 kJ&rdquo; is 5.0 × 10³ kJ with the superscript lost.</>,
  },
  {
    working: <><b>Ethyne releases the most energy per 100 g: 5.0 × 10³ kJ</b> (vs 4.91, 3.61 and 1.16 × 10³ kJ).</>,
    reason: <>Matches option <b>D</b>. Option <b>C</b> (22%) has the larger energy <i>per mole</i> of the two per-mole fuels (2670 vs 1300 kJ mol⁻¹), but per mole is not per 100 g. Option <b>A</b> (20%) has the biggest number printed (49 097), but in MJ <i>per tonne</i>, which is only 49.1 kJ g⁻¹ — the report puts this choice down to &ldquo;issues with the energy units&rdquo;. The molar masses (74, 26 g mol⁻¹) have only 2 significant figures, so C and D are really 3.6 × 10³ and 5.0 × 10³ kJ — the gaps between the four fuels are far bigger than that rounding, so the ranking is certain.</>,
  },
]

export default function ChemistryQ22_2020() {
  return (
    <MCQShell
      question={<p>The combustion of which fuel provides the most energy per 100 g?</p>}
      options={[
        { letter: 'A', content: <>pentane (M = 72 g mol⁻¹), which releases 49 097 MJ tonne⁻¹</> },
        { letter: 'B', content: <>nitromethane (M = 61 g mol⁻¹), which releases 11.63 kJ g⁻¹</> },
        { letter: 'C', content: <>butanol (M = 74 g mol⁻¹), which releases 2670 kJ mol⁻¹</> },
        { letter: 'D', content: <>ethyne (M = 26 g mol⁻¹), which releases 1300 kJ mol⁻¹</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
