// 2024 Chemistry Exam, MCQ 29. VCAA examination report: 57% correct. Disulfide bridges between
// cysteine side chains: covalent bonds that contribute to a protein's tertiary structure.
// Question text transcribed from the original paper (rendered from page images — the 2024 exam
// PDF has no extractable text). VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 11, C: 57, D: 19 },
  answer: 'C',
  comment: (
    <>
      The presence of sulfur atoms in amino acids like cysteine allows for the possible formation
      of disulfide links, and these do contribute to the tertiary structure of a protein.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        Primary: the <b>sequence</b> of amino acids, joined by <b>peptide (amide) bonds</b>.
        <br />
        Secondary: α-helices and β-pleated sheets, held by <b>hydrogen bonds between backbone</b>{' '}
        C=O and N–H groups.
        <br />
        Tertiary: the overall 3-D folding of one chain, held by interactions between{' '}
        <b>side chains (R groups)</b>.
        <br />
        Quaternary: two or more chains held together.
      </>
    ),
    reason: <>Start from the four levels of protein structure, and what holds each one together. The question turns on which level a bond between sulfur atoms belongs to.</>,
  },
  {
    working: <>Cysteine&rsquo;s side chain is <Chem eq="–CH2–SH" />. Two –SH groups on different parts of the chain can react (be oxidised) to form a <b>disulfide bridge</b>, <Chem eq="–CH2–S–S–CH2–" />.</>,
    reason: <>Data Book item 19 (2-amino acids) gives cysteine&rsquo;s side chain. The S–S bond is a <b>covalent</b> bond — two non-metal atoms sharing a pair of electrons — not an ionic or hydrogen bond.</>,
  },
  {
    working: <>The two cysteines are usually far apart in the sequence; the S–S bond links their side chains and locks the folded chain into shape → <b>tertiary</b> structure.</>,
    reason: <>The bond is between R groups, not backbone atoms, so it is not secondary. It doesn&rsquo;t change the order of the amino acids, so it is not primary.</>,
  },
  {
    working: <b>Covalent bonds that contribute to the tertiary structure.</b>,
    reason: (
      <>
        Matches option <b>C</b>. Option <b>D</b> (19%) is right that disulfide links form but puts them
        in the primary structure, which is only the amino-acid sequence held by peptide bonds. Option{' '}
        <b>A</b> calls the S–S bond ionic, but both atoms are sulfur, so the electrons are shared:
        it is covalent. (An S–S bridge between two separate chains does help hold a quaternary
        structure together — but it is still a covalent bond, not ionic.) Option <b>B</b> describes the secondary structure&rsquo;s hydrogen bonds between
        backbone groups, which involve no sulfur at all.
      </>
    ),
  },
]

export default function ChemistryQ29_2024() {
  return (
    <MCQShell
      question={<p>A reaction between sulfur atoms in proteins</p>}
      options={[
        { letter: 'A', content: 'contributes to the quaternary structure through ionic bonding.' },
        { letter: 'B', content: 'contributes to the secondary structure through hydrogen bonding.' },
        { letter: 'C', content: 'leads to the formation of covalent bonds, and contributes to the tertiary structure.', isAnswer: true },
        { letter: 'D', content: 'leads to the formation of disulfide linkages, and contributes to the primary structure.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
