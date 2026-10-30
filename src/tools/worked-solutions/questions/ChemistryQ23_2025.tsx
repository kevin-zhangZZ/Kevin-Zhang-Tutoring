// 2025 Chemistry Exam, MCQ 23. VCAA examination report: 63% correct. Hydrolysis of a protein:
// the amide (peptide) links break and water is a reactant — the reverse of the condensation that
// forms the protein. Question text transcribed from the original paper (the two-column options
// written "·"-separated). VCAA report only (no second source). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 17, C: 63, D: 9 },
  answer: 'C',
  comment: (
    <>
      Hydrolytic reactions occur when water is used to break apart large molecules into smaller
      ones. (Hydrolytic reactions ≡ hydrolysis reactions)
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <><b>Hydrolysis</b> = &ldquo;splitting by water&rdquo; (<i>hydro</i> = water, <i>lysis</i> = splitting): a water molecule is <b>used up</b> to break a bond in a large molecule, giving smaller molecules.</>,
    reason: <>Hydrolytic reactions of proteins, carbohydrates and fats/oils are how large biomolecules are broken down (e.g. in digestion).</>,
  },
  {
    working: <>A protein is a chain of amino acids joined by <b>amide (peptide) links</b>, –CONH–. Hydrolysis breaks each amide link: one <Chem eq="H2O" /> per link adds –OH to the C=O carbon and –H to the N.<br />protein + water → amino acids</>,
    reason: <>So in this reaction the amide links <b>break</b> (first column) and water is a <b>reactant</b> (second column).</>,
  },
  {
    working: <>The reverse reaction — amino acids joining to <i>form</i> amide links — is a <b>condensation</b> reaction, in which water is a <b>product</b>.<br />amino acids → protein + water</>,
    reason: <>Forming amide links is condensation, not hydrolysis, so the first column must say the links <i>break</i>.</>,
  },
  {
    working: <b>The amide links in the protein break; water is a reactant.</b>,
    reason: <>Matches option <b>C</b>. Option <b>B</b> is a correct description of the condensation that builds the protein — the reverse reaction, not hydrolysis. Options <b>A</b> and <b>D</b> each mix half of one reaction with half of the other: A has water as a reactant but the links forming; D has the links breaking but water as a product.</>,
  },
]

export default function ChemistryQ23_2025() {
  return (
    <MCQShell
      question={<p>In a protein hydrolytic reaction, which one of the following combinations is correct?</p>}
      options={[
        { letter: 'A', content: <>The amino acids react to form amide links. · Water is a reactant.</> },
        { letter: 'B', content: <>The amino acids react to form amide links. · Water is a product.</> },
        { letter: 'C', content: <>The amide links in the protein break. · Water is a reactant.</>, isAnswer: true },
        { letter: 'D', content: <>The amide links in the protein break. · Water is a product.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
