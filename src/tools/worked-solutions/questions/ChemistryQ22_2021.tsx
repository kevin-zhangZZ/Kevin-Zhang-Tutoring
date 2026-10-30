// 2021 Chemistry Exam, MCQ 22. VCAA examination report: 37% correct. Finding the volume of
// octane needed to deliver a given amount of usable energy, accounting for a combustion engine
// that is only 25% efficient. Question text transcribed from the original paper. The report's
// alternative method gives a mass in "mol" — kept verbatim and explained in the working. The
// 2021 Data Book gave octane −5460 kJ mol⁻¹ (2026: −5470), noted in a DataBookNote.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 19, C: 34, D: 37 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      For 100% efficiency:
      <br />
      <i>m</i>(<Chem eq="C8H18" />) reacting = energy used / energy from 1 g
      <br />
      = 528 x 10³ kJ / 47.9 kJ g⁻¹
      <br />
      = 1.10 x 10⁴ g
      <br />
      Since <i>d</i> = <i>m</i> / <i>V</i>
      <br />
      <i>V</i>(<Chem eq="C8H18" />) = 1.10 x 10⁴ g / 703 g L⁻¹
      <br />
      = 15.7 L
      <br />
      Since the reaction when octane undergoes combustion is only 25% efficient, 15.7 L is only
      25% of the octane consumed.
      <br />
      15.7 = 0.25 x <i>V</i>(<Chem eq="C8H18" />) required.
      <br />
      <i>V</i>(<Chem eq="C8H18" />) = 15.7 / 0.25
      <br />
      = 62.7 L
      <br />
      Alternatively:
      <br />
      <i>n</i>(<Chem eq="C8H18" />) reacting = energy used / energy from 1 mol
      <br />
      = 528 x 10³ kJ / 5460 kJ mol⁻¹
      <br />
      = 96.7 mol
      <br />
      <i>m</i>(<Chem eq="C8H18" />) reacting = 96.7 mol x 114.0 g mol⁻¹
      <br />
      = 1.10 x 10⁴ mol
      <br />
      The main error in this question was not using the efficiency in the calculations; this was
      consistent with Option C.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Usable energy needed = 528 MJ = 528 × 10³ kJ · efficiency = 25.0% · <i>d</i>(octane) = 703 g L⁻¹</>,
    reason: <>Given information. Convert MJ to kJ (1 MJ = 10³ kJ) so the energy matches the kJ mol⁻¹ units in the Data Book.</>,
  },
  {
    working: (
      <>
        efficiency = (usable energy ÷ energy released) × 100
        <br />
        energy released = 528 × 10³ kJ ÷ 0.250
        <br />
        energy released = 2.112 × 10⁶ kJ
      </>
    ),
    reason: <>Only 25.0% of the chemical energy released by burning octane ends up as usable energy; the other 75% is lost (mostly as heat). So the octane must release <b>more</b> energy than the 528 MJ needed: divide by 0.250 (four times as much), never multiply.</>,
  },
  {
    working: (
      <>
        <i>n</i>(<Chem eq="C8H18" />) = energy released ÷ molar enthalpy of combustion
        <br />
        <i>n</i>(<Chem eq="C8H18" />) = 2.112 × 10⁶ kJ ÷ 5470 kJ mol⁻¹
        <br />
        <i>n</i>(<Chem eq="C8H18" />) = 386.1 mol
      </>
    ),
    reason: (
      <>
        Data Book (molar enthalpies of combustion): octane, <Chem eq="C8H18(l)" />, Δ<i>H</i> = −5470 kJ mol⁻¹, so each mole burned releases 5470 kJ. Keep the unrounded value.
        <DataBookNote>the 2026 Data Book gives −5470 kJ mol⁻¹ for octane; the Data Book used for the 2021 exam gave −5460 kJ mol⁻¹ (and 47.9 kJ g⁻¹, which the report uses; the 2026 Data Book has no kJ g⁻¹ value for octane). With 5460 the answer is 62.7 L; with 5470 it is 62.6 L. Option <b>D</b> is still the answer — the 0.1 L difference comes only from the revised value.</DataBookNote>
      </>
    ),
  },
  {
    working: (
      <>
        <i>m</i>(<Chem eq="C8H18" />) = <i>n</i> × <i>M</i>
        <br />
        <i>m</i>(<Chem eq="C8H18" />) = 386.1 mol × 114.0 g mol⁻¹
        <br />
        <i>m</i>(<Chem eq="C8H18" />) = 4.402 × 10⁴ g
      </>
    ),
    reason: <><i>M</i>(<Chem eq="C8H18" />) = 8 × 12.0 + 18 × 1.0 = 114.0 g mol⁻¹ (Data Book periodic table: C 12.0, H 1.0).</>,
  },
  {
    working: (
      <>
        <i>V</i>(<Chem eq="C8H18" />) = <i>m</i> ÷ <i>d</i>
        <br />
        <i>V</i>(<Chem eq="C8H18" />) = 4.402 × 10⁴ g ÷ 703 g L⁻¹
        <br />
        <i>V</i>(<Chem eq="C8H18" />) = 62.6 L
      </>
    ),
    reason: <>&ldquo;1 L of octane has a mass of 703 g&rdquo; is a density of 703 g L⁻¹, so <i>V</i> = <i>m</i> ÷ <i>d</i>. Three significant figures, set by 528 MJ, 703 g and 25.0%. With the 2021 Data Book&rsquo;s 5460 kJ mol⁻¹ the same steps give 62.7 L.</>,
  },
  {
    working: <b>About 62.7 L of octane is required (62.6 L with the 2026 Data Book value).</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b>, 15.7 L, leaves out the efficiency (the report&rsquo;s main error): it is the volume that would be needed if the engine were 100% efficient. Option <b>A</b>, 3.92 L, multiplies 15.7 L by 0.25 instead of dividing, as if inefficiency meant <i>less</i> fuel. Option <b>B</b>, 11.8 L, multiplies 15.7 L by 0.75, using the wasted 75% the wrong way round. (The report&rsquo;s alternative method ends &ldquo;= 1.10 x 10⁴ mol&rdquo;; that is a mass, 1.10 × 10⁴ g, the same as in its first method, and 1.10 × 10⁴ g ÷ 703 g L⁻¹ ÷ 0.25 = 62.7 L again.)</>,
  },
]

export default function ChemistryQ22_2021() {
  return (
    <MCQShell
      question={
        <p>
          1 L of octane has a mass of 703 g at SLC. The efficiency of the reaction when octane
          undergoes combustion in the petrol engine of a car is 25.0%.
          <br />
          What volume of octane stored in a petrol tank at SLC is required to produce 528 MJ of
          usable energy in a combustion engine?
        </p>
      }
      options={[
        { letter: 'A', content: '3.92 L' },
        { letter: 'B', content: '11.8 L' },
        { letter: 'C', content: '15.7 L' },
        { letter: 'D', content: '62.7 L', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
