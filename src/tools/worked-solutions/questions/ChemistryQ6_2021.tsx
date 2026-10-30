// 2021 Chemistry Exam, MCQ 6. VCAA examination report: 61% correct. Which bonds break when a
// protein is denatured (hydrogen and ionic bonds between side chains) and when it is hydrolysed
// (covalent peptide bonds). Question text transcribed from the original paper; the options' table
// is written out as "Denaturation: … · Hydrolysis: …". Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 3, C: 16, D: 61 },
  answer: 'D',
  comment: (
    <>
      In denaturation the tertiary and secondary structures are broken down. The tertiary
      structure is maintained by ionic bonding (and other types of bonding such as covalent,
      ionic, dipole-dipole, etc.) and the secondary structure by hydrogen bonding.
      <br />
      In hydrolysis, covalent peptide bonds between amino acids are broken.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Primary structure: the sequence of amino acids, joined by <b>covalent peptide (amide) bonds</b>, –CO–NH–.</>,
    reason: <>Start by recalling the levels of protein structure and which bonds hold each level together — that is all this question tests.</>,
  },
  {
    working: <>Secondary structure (α-helices, β-pleated sheets): <b>hydrogen bonds</b> between the C=O of one peptide link and the N–H of another.<br />Tertiary structure (the 3D folding): interactions between side chains — <b>hydrogen bonds</b>, <b>ionic bonds</b> (–COO⁻ ··· ⁺H₃N–), dispersion forces, dipole–dipole attractions and covalent disulfide bridges.</>,
    reason: <>These are the bonds that give the protein its shape. Most of them are much weaker than the covalent bonds of the backbone.</>,
  },
  {
    working: <>Denaturation (e.g. heating, change of pH) → secondary and tertiary structures unfold → <b>hydrogen and ionic bonds</b> break. The primary structure is unchanged.</>,
    reason: <>Denaturation changes the protein&rsquo;s <i>shape</i>, not its sequence: the amino acids are still joined in the same order afterwards. Heat gives the chain enough energy to break the weak side-chain attractions; a change of pH changes the charges on –COOH/–COO⁻ and –NH₂/–NH₃⁺ groups, which breaks ionic bonds.</>,
  },
  {
    working: <>Hydrolysis: protein + water → amino acids, so <b>covalent peptide bonds</b> break.</>,
    reason: <>Hydrolysis is the reverse of the condensation reaction that made the protein: a water molecule is added across each peptide (amide) bond, splitting the C–N bond to give –COOH and –NH₂ ends. Breaking the chain into separate amino acids means breaking covalent bonds.</>,
  },
  {
    working: <b>Denaturation: hydrogen and ionic · Hydrolysis: covalent</b>,
    reason: <>Matches option <b>D</b>. Option <b>A</b> swaps the two processes — it puts the strong covalent bonds in denaturation and the hydrogen bonds in hydrolysis. Option <b>C</b> gets denaturation right but says hydrolysis breaks hydrogen bonds; hydrolysis splits the covalent peptide bonds of the backbone. Option <b>B</b> has denaturation breaking covalent bonds, but denaturation leaves the amino-acid sequence (the covalent backbone) intact.</>,
  },
]

export default function ChemistryQ6_2021() {
  return (
    <MCQShell
      question={
        <>
          <p>
            Which of the following correctly identifies the bonds that break in a protein when it
            undergoes denaturation and when it undergoes hydrolysis?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'Denaturation: covalent · Hydrolysis: hydrogen' },
        { letter: 'B', content: 'Denaturation: covalent · Hydrolysis: covalent' },
        { letter: 'C', content: 'Denaturation: hydrogen and ionic · Hydrolysis: hydrogen' },
        { letter: 'D', content: 'Denaturation: hydrogen and ionic · Hydrolysis: covalent', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
