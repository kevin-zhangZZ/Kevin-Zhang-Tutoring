// 2023 Chemistry Exam, MCQ 23. VCAA examination report: 89% correct. Choosing the semi-structural
// formula of 2-methylpent-1-ene by building it from its name and naming each option. Question text
// transcribed from the original paper; the structural formula in the report's comment is cropped
// from the original VCAA examination report PDF. VCAA report only (no second source). Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportSrc from './chem-2023-mcq23-report-structure.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 4, C: 89, D: 3 },
  answer: 'C',
  comment: (
    <>
      2-methylpent-1-ene.
      <br />
      The structural formula is:
      <br />
      <img
        loading="lazy"
        decoding="async"
        src={reportSrc}
        alt="Structural formula of 2-methylpent-1-ene: a five-carbon chain CH3–CH2–CH2–C(=CH2) with a C=C double bond between carbons 1 and 2 and a CH3 branch on carbon 2, all hydrogens drawn — from the 2023 VCAA examination report"
        className="w-full max-w-[360px] mt-1 bg-white rounded"
      />
      <br />
      Therefore, the semi-structural formula is
      <br />
      <Chem eq="CH3CH2CH2C(CH3)CH2" /> <i>or</i> <Chem eq="CH2C(CH3)CH2CH2CH3" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>pent → longest chain of <b>5 C</b>; -1-ene → <b>C=C between C1 and C2</b>; 2-methyl → <b>–CH₃ branch on C2</b>.</>,
    reason: <>Read an IUPAC name from the end backwards: the parent chain and its suffix first, then the position numbers, then the branches.</>,
  },
  {
    working: <>C1=C2–C3–C4–C5, with CH₃ on C2:<br /><Chem eq="CH2=C(CH3)–CH2–CH2–CH3" /></>,
    reason: <>Fill each carbon up to four bonds with H: C1 has the double bond plus 2 H (CH₂); C2 has the double bond, a bond to C3 and the methyl, so no H; C3 and C4 are CH₂; C5 is CH₃. Molecular formula C₆H₁₂, as expected for an alkene (CₙH₂ₙ).</>,
  },
  {
    working: <>Semi-structural formula: <Chem eq="CH2C(CH3)CH2CH2CH3" /> — option C.</>,
    reason: <>A semi-structural formula may leave out the double bond (&ldquo;=&rdquo;) and the C–C bonds; the brackets show that the CH₃ is a branch on the carbon written just before it.</>,
  },
  {
    working: (
      <>
        Check the others by naming them:
        <br />
        A <Chem eq="(CH3)2C=CHCH2CH3" /> = 2-methylpent-2-ene
        <br />
        B <Chem eq="(CH3)2CHCH2CH=CH2" /> = 4-methylpent-1-ene
        <br />
        D <Chem eq="CH2=CHCH(CH3)CH2CH3" /> = 3-methylpent-1-ene
      </>
    ),
    reason: <>Each is also C₆H₁₂ — all four options are isomers, so counting atoms can&rsquo;t decide it; the positions of the C=C and the branch must be checked. Number the chain from the end that gives the double bond the lowest number: in B that is the CH₂= end, which puts the methyl on C4.</>,
  },
  {
    working: <b><Chem eq="CH2C(CH3)CH2CH2CH3" /></b>,
    reason: <>Matches option <b>C</b>. Option <b>A</b> has the double bond moved to C2 (pent-2-ene); <b>B</b> has the methyl on C4 and <b>D</b> has it on C3. The report&rsquo;s comment writes the same molecule from either end: CH₃CH₂CH₂C(CH₃)CH₂ is option C written backwards.</>,
  },
]

export default function ChemistryQ23_2023() {
  return (
    <MCQShell
      question={<p>Which one of the following is the semi-structural formula of 2-methylpent-1-ene?</p>}
      options={[
        { letter: 'A', content: <Chem eq="(CH3)2CCHCH2CH3" /> },
        { letter: 'B', content: <Chem eq="(CH3)2CHCH2CHCH2" /> },
        { letter: 'C', content: <Chem eq="CH2C(CH3)CH2CH2CH3" />, isAnswer: true },
        { letter: 'D', content: <Chem eq="CH2CHCH(CH3)CH2CH3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
