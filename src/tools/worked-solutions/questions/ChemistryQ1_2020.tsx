// 2020 Chemistry Exam, MCQ 1. VCAA examination report: 73% correct. Glycogen is a condensation
// polymer of glucose, so its hydrolysis gives monosaccharides. Question text transcribed from the
// original paper. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 5, C: 6, D: 73 },
  answer: 'D',
  noAnswer: 0,
  comment: <>Glycogen is a condensation polymer of the monosaccharide glucose.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <>Glycogen is a <b>polysaccharide</b> — a condensation polymer of the monosaccharide <b>glucose</b>, <Chem eq="C6H12O6" />.</>,
    reason: <>Glycogen is the carbohydrate animals store in the liver and muscles. Each glucose unit is joined to the next by a glycosidic (C–O–C) link, with a water molecule released as each link forms (condensation). Its structure is drawn in the Data Book (2026: item 20, &lsquo;Representation of selected biomolecules&rsquo;).</>,
  },
  {
    working: <>Breakdown = <b>hydrolysis</b>: <Chem eq="(C6H10O5)n + nH2O -> nC6H12O6" /></>,
    reason: <>Breaking a condensation polymer down is the reverse of making it: water is added across each glycosidic link, splitting the chain back into its glucose monomers.</>,
  },
  {
    working: <b>Glycogen breaks down into monosaccharides (glucose).</b>,
    reason: <>Matches option <b>D</b>. Each other option belongs to a different biomolecule: glycerol (<b>A</b>, chosen by 16%) is a product of the hydrolysis of fats and oils (triglycerides), together with fatty acids; amino acids (<b>B</b>) come from the hydrolysis of proteins; triglycerides (<b>C</b>) are fats themselves — lipids, not carbohydrates — so they cannot come from glycogen.</>,
  },
]

export default function ChemistryQ1_2020() {
  return (
    <MCQShell
      question={<p>Glycogen breaks down into</p>}
      options={[
        { letter: 'A', content: <>glycerol.</> },
        { letter: 'B', content: <>amino acids.</> },
        { letter: 'C', content: <>triglycerides.</> },
        { letter: 'D', content: <>monosaccharides.</>, isAnswer: true },
      ]}
      background={
        <Background>
          <p>Each food polymer is built from one kind of small molecule, and hydrolysis takes it back to those molecules:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>carbohydrates (starch, glycogen, cellulose) → monosaccharides such as glucose</li>
            <li>proteins → amino acids</li>
            <li>fats and oils (triglycerides) → glycerol + fatty acids</li>
          </ul>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
