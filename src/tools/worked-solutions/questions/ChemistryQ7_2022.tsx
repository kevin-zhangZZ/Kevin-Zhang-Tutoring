// 2022 Chemistry Exam, MCQ 7. VCAA examination report: 78% correct. Which levels of protein
// structure involve hydrogen bonding (secondary, tertiary and quaternary — not primary). Question
// text transcribed from the original paper (no figures). VCAA report only (no second source).
// Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 78, B: 10, C: 8, D: 4 },
  answer: 'A',
  comment: (
    <>
      The primary structure is the only level of protein structure in which hydrogen bonding is not
      involved.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <><b>Primary</b>: the sequence of amino acids, joined by <b>peptide (amide) bonds</b> — covalent bonds. No hydrogen bonding.</>,
    reason: <>The primary structure forms by condensation reactions between the –COOH group of one amino acid and the –NH₂ group of the next. A peptide bond is a covalent bond <i>within</i> the chain, not an attraction between groups, so hydrogen bonds play no part in forming it.</>,
  },
  {
    working: <><b>Secondary</b>: α-helices and β-pleated sheets, held by <b>hydrogen bonds</b> between C=O and N–H groups of the backbone.</>,
    reason: <>The H of an N–H group in one peptide link is attracted to the O of a C=O group further along the chain (or on a neighbouring strand). This is the defining interaction of secondary structure.</>,
  },
  {
    working: <><b>Tertiary</b>: the 3D folding of one chain, held by side-chain (R group) interactions — <b>hydrogen bonds</b>, ionic interactions, disulfide bridges and dispersion forces.</>,
    reason: <>Side chains containing –OH, –NH₂, –COOH or –CONH₂ groups can hydrogen bond to each other.</>,
  },
  {
    working: <><b>Quaternary</b>: two or more chains held together by the same side-chain interactions as tertiary, including <b>hydrogen bonds</b>.</>,
    reason: <>The only difference from tertiary is that the interactions are <i>between</i> separate polypeptide chains rather than within one.</>,
  },
  {
    working: <b>Hydrogen bonding: secondary, tertiary and quaternary structures only.</b>,
    reason: <>Matches option <b>A</b>. Options <b>B</b> and <b>D</b> include the primary structure, mistaking the covalent peptide bond for hydrogen bonding. Option <b>C</b> leaves out the secondary structure, whose helices and sheets are held together by hydrogen bonds.</>,
  },
]

export default function ChemistryQ7_2022() {
  return (
    <MCQShell
      question={<>In a protein, hydrogen bonding takes place during the formation of the</>}
      options={[
        { letter: 'A', content: <>secondary, tertiary and quaternary structures only.</>, isAnswer: true },
        { letter: 'B', content: <>primary, secondary and tertiary structures only.</> },
        { letter: 'C', content: <>tertiary and quaternary structures only.</> },
        { letter: 'D', content: <>primary and tertiary structures only.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
