// 2022 Chemistry Exam, MCQ 3. VCAA examination report: 78% correct. Choosing the balanced
// equation for the incomplete combustion of ethanol (products CO and H2O). Question text
// transcribed from the original paper. VCAA report only. Report slip: its comment's equation
// "C2H5OH + 3O2 → 2CO + 3H2O" is unbalanced (7 O atoms on the left, 5 on the right) — it should
// have 2O2, as in option C; kept verbatim in the comment and explained in the final row. Solution
// is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 4, C: 78, D: 8 },
  answer: 'C',
  comment: (
    <>
      The products of incomplete combustion of compounds containing C and H are carbon monoxide
      and water.
      <br />
      <Chem eq="C2H5OH + 3O2 -> 2CO + 3H2O" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Complete combustion: C → <Chem eq="CO2" />, H → <Chem eq="H2O" />.<br />Incomplete combustion (limited O₂): C → <Chem eq="CO" /> (or C, soot), H → <Chem eq="H2O" />.</>,
    reason: <>With too little oxygen the carbon is only partly oxidised, to CO instead of CO₂. The hydrogen still ends up in <b>water</b> — combustion never produces H₂ gas.</>,
  },
  {
    working: <>Rule out A and B: their products include <Chem eq="H2(g)" />.</>,
    reason: <>Both are balanced (A: 2 O atoms each side; B: 4 each side), but H₂ is not a combustion product, so neither describes combustion at all.</>,
  },
  {
    working: <>Rule out D: its products are <Chem eq="CO2" /> and <Chem eq="H2O" />.</>,
    reason: <>D is the balanced equation for <b>complete</b> combustion of ethanol — correct chemistry, wrong question.</>,
  },
  {
    working: (
      <>
        Check C: <Chem eq="C2H5OH(l) + 2O2(g) -> 2CO(g) + 3H2O(l)" />
        <br />C: 2 = 2 · H: 6 = 3 × 2 = 6
        <br />O: 1 + 2 × 2 = 5 on the left; 2 × 1 + 3 × 1 = 5 on the right
      </>
    ),
    reason: <>Balance C first (2CO), then H (6 H atoms in ethanol → 3H₂O), then O last: the products need 5 O atoms, ethanol supplies 1, so 4 O atoms = 2O₂. Don&rsquo;t forget the O atom inside ethanol itself.</>,
  },
  {
    working: <b><Chem eq="C2H5OH(l) + 2O2(g) -> 2CO(g) + 3H2O(l)" /></b>,
    reason: <>Matches option <b>C</b>: CO and H₂O as products, balanced. Option <b>A</b> has a balanced equation with CO but makes H₂ instead of water; option <b>B</b> makes H₂ and CO₂ (so its carbon isn&rsquo;t even incompletely burned); option <b>D</b> is complete combustion. Note: the report&rsquo;s comment writes the equation with <b>3O₂</b> — that is a slip. With 3O₂ the left side has 7 O atoms but the right side only 5; the correct coefficient is 2O₂, exactly as in option C.</>,
  },
]

export default function ChemistryQ3_2022() {
  return (
    <MCQShell
      question={<p>The correct equation for the incomplete combustion of ethanol is</p>}
      options={[
        { letter: 'A', content: <Chem eq="C2H5OH(l) + ½O2(g) -> 2CO(g) + 3H2(g)" /> },
        { letter: 'B', content: <Chem eq="C2H5OH(l) + ³⁄₂O2(g) -> 2CO2(g) + 3H2(g)" /> },
        { letter: 'C', content: <Chem eq="C2H5OH(l) + 2O2(g) -> 2CO(g) + 3H2O(l)" />, isAnswer: true },
        { letter: 'D', content: <Chem eq="C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(l)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
