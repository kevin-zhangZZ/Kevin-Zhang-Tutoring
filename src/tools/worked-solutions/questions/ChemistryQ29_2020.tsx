// 2020 Chemistry Exam, MCQ 29. VCAA examination report: 61% correct. The bonds and interactions
// at each level of protein structure, and which of them are broken when an eaten protein is broken
// down (denaturation and hydrolysis). Question text transcribed from the original paper. VCAA
// report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 61, C: 22, D: 5 },
  answer: 'B',
  noAnswer: 0,
  comment: (
    <ul className="list-disc pl-5 flex flex-col gap-1">
      <li>Primary structure – covalent bonding only.</li>
      <li>Secondary structure – hydrogen bonding only.</li>
      <li>Tertiary structure – multiple bond types including covalent bonding in disulfide links.</li>
      <li>
        Quaternary structure – mainly dispersion forces but ionic; hydrogen bonding and dipole
        attraction also possible but not covalent bonding.
      </li>
    </ul>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <><b>Primary</b>: the sequence of amino acids, joined by <b>covalent peptide (amide) bonds</b> — no hydrogen bonds.</>,
    reason: <>Start by listing what holds each level together; then each option can be checked against the list.</>,
  },
  {
    working: <><b>Secondary</b>: α-helices and β-pleated sheets, held by <b>hydrogen bonds</b> between the C=O and N–H groups of the backbone — no covalent bonds.</>,
    reason: <>The secondary structure is the folding of the backbone itself, so only backbone–backbone hydrogen bonds are involved.</>,
  },
  {
    working: <><b>Tertiary</b>: the 3D folding of one chain, held by interactions between side chains (R groups) — hydrogen bonds, ionic bonds, dipole–dipole and dispersion forces, and <b>covalent disulfide (–S–S–) bridges</b> between cysteine residues.</>,
    reason: <>Tertiary is the only level with a <i>covalent</i> bond other than the peptide bond: the disulfide bridge.</>,
  },
  {
    working: <><b>Quaternary</b>: two or more chains held together by the same kinds of non-covalent interactions — no covalent bonds (as VCAA treats it).</>,
    reason: <>The report: &ldquo;mainly dispersion forces but ionic; hydrogen bonding and dipole attraction also possible but not covalent bonding.&rdquo;</>,
  },
  {
    working: <>Breaking down an eaten protein: <b>denaturation</b> (stomach acid) disrupts the secondary, tertiary and quaternary structure; <b>hydrolysis</b> (by protease enzymes) breaks the peptide bonds, producing amino acids.</>,
    reason: <>The question treats every bond that exists in the protein as one that can be broken as it is broken down to amino acids. So it is really asking which option names bonds that <b>exist</b> at the stated levels.</>,
  },
  {
    working: (
      <>
        A: no covalent bonds in secondary, no hydrogen bonds in primary ✗
        <br />B: covalent (disulfide) in tertiary ✓, hydrogen bonds in secondary ✓
        <br />C: no covalent bonds in secondary ✗
        <br />D: no covalent bonds in quaternary, no hydrogen bonds in primary ✗
      </>
    ),
    reason: <>Check both halves of every option; one wrong half rules it out.</>,
  },
  {
    working: <b>Covalent bonds in the tertiary structure and hydrogen bonds in the secondary structure.</b>,
    reason: <>Matches option <b>B</b>. Option <b>C</b> (22%) has hydrogen bonds in the tertiary structure, which do exist, but there are no covalent bonds in the secondary structure: the peptide bonds run along the helix or sheet, but they are the primary structure — the secondary structure is only the hydrogen bonds that fold the backbone. Options <b>A</b> and <b>D</b> put hydrogen bonds in the primary structure, which has only covalent peptide bonds.</>,
  },
]

export default function ChemistryQ29_2020() {
  return (
    <MCQShell
      question={
        <p>
          Which of the following combinations of bonds can be broken during the breakdown of a
          protein that a person has eaten?
        </p>
      }
      options={[
        { letter: 'A', content: 'covalent bonds in the secondary structure and hydrogen bonds in the primary structure' },
        { letter: 'B', content: 'covalent bonds in the tertiary structure and hydrogen bonds in the secondary structure', isAnswer: true },
        { letter: 'C', content: 'covalent bonds in the secondary structure and hydrogen bonds in the tertiary structure' },
        { letter: 'D', content: 'covalent bonds in the quaternary structure and hydrogen bonds in the primary structure' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
