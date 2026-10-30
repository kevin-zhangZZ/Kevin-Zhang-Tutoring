// 2020 Chemistry Exam, MCQ 5. VCAA examination report: 67% correct. Cellular respiration produces
// water, whereas the hydrolysis (digestion) of fats, starch and proteins uses water up. Question
// text transcribed from the original paper. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 67, C: 12, D: 11 },
  answer: 'B',
  noAnswer: 0,
  comment: <>In A, C and D water is a reactant.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <>Digestion breaks large food molecules down by <b>hydrolysis</b>, which <b>uses up</b> water: one H₂O is added across each bond broken.</>,
    reason: <>Hydrolysis is the reverse of the condensation reactions that built the polymer — condensation releases water, so hydrolysis consumes it. So look for the one process that is <i>not</i> a hydrolysis.</>,
  },
  {
    working: <>A: fat (triglyceride) + 3H₂O → glycerol + 3 fatty acids</>,
    reason: <>Three ester links are hydrolysed, so water is a <b>reactant</b>.</>,
  },
  {
    working: <>C: <Chem eq="(C6H10O5)n + nH2O -> nC6H12O6" /></>,
    reason: <>Starch is hydrolysed to glucose: water is a <b>reactant</b>.</>,
  },
  {
    working: <>D: protein + water → amino acids</>,
    reason: <>One H₂O is used for each peptide (amide) link broken: water is a <b>reactant</b>.</>,
  },
  {
    working: <>B: <Chem eq="C6H12O6(aq) + 6O2(g) -> 6CO2(g) + 6H2O(l)" /></>,
    reason: <>Cellular respiration oxidises glucose to release energy, and water is a <b>product</b> — 6 mol of H₂O for every mol of glucose. This is the equation the study design gives for cellular respiration.</>,
  },
  {
    working: <b>Cellular respiration produces water.</b>,
    reason: <>Matches option <b>B</b>. Options <b>A</b>, <b>C</b> and <b>D</b> are all hydrolysis reactions, in which water is a reactant, not a product — as the report says. Keep the pair straight: condensation releases water (building polymers); hydrolysis takes water in (breaking them down).</>,
  },
]

export default function ChemistryQ5_2020() {
  return (
    <MCQShell
      question={<p>The metabolic process that produces water is</p>}
      options={[
        { letter: 'A', content: <>the digestion of fats.</> },
        { letter: 'B', content: <>cellular respiration.</>, isAnswer: true },
        { letter: 'C', content: <>the hydrolysis of starch.</> },
        { letter: 'D', content: <>the breakdown of protein into amino acids.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
