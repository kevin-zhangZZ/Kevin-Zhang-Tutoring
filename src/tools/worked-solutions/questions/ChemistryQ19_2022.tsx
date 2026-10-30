// 2022 Chemistry Exam, MCQ 19. VCAA examination report: 72% correct. Identifying the compound
// with a chiral carbon (a carbon bonded to four different groups) from glycine, glycerol,
// butan-2-ol and 1,1-dichloropropane. Question text transcribed from the original paper (no
// figures); option C is printed "butan-2-o1" (digit 1 for the letter l), kept as printed and
// explained in the working. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 8, C: 72, D: 7 },
  answer: 'C',
  comment: (
    <>
      A chiral C centre is present when a C atom is bonded to four different atoms or groups of
      atoms.
      <br />
      Glycine <Chem eq="NH2CH2COOH" />
      <br />
      Glycerol <Chem eq="CH2OHCHOHCH2OH" />
      <br />
      Butan-2-ol <Chem eq="CH3CHOHCH2CH3" />
      <br />
      1,1-dichloropropane <Chem eq="CH3CH2CHCl2" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Chiral carbon: a C atom bonded to <b>four different</b> atoms or groups.</>,
    reason: <>A carbon with a double bond, or with two identical groups (two H atoms, two Cl atoms, two identical chains), can&rsquo;t be chiral. So check only the carbons with four single bonds, and list their four groups.</>,
  },
  {
    working: <>A — glycine, <Chem eq="NH2CH2COOH" />: the CH₂ carbon has H, H, –NH₂, –COOH. Two H atoms → <b>not chiral</b>.</>,
    reason: <>Glycine (Data Book, table of 2-amino acids) is the only amino acid whose side chain is just H, which is why it is the one amino acid with no chiral carbon. The –COOH carbon has a C=O double bond.</>,
  },
  {
    working: <>B — glycerol, <Chem eq="CH2OHCHOHCH2OH" />: the middle carbon has H, –OH, –CH₂OH, –CH₂OH. Two identical –CH₂OH groups → <b>not chiral</b>. The end carbons each have two H atoms.</>,
    reason: <>The molecule is symmetrical about its middle carbon, so the two &ldquo;arms&rdquo; are the same group.</>,
  },
  {
    working: <>C — butan-2-ol, <Chem eq="CH3CHOHCH2CH3" />: C-2 has H, –OH, –CH₃, –CH₂CH₃. Four different groups → <b>chiral</b>.</>,
    reason: <>The paper prints &ldquo;butan-2-o1&rdquo;, a misprint of butan-2-ol (the letter l printed as the digit 1); the report writes butan-2-ol. A methyl group and an ethyl group are different groups, even though both are alkyl groups.</>,
  },
  {
    working: <>D — 1,1-dichloropropane, <Chem eq="CH3CH2CHCl2" />: C-1 has H, Cl, Cl, –CH₂CH₃ (two Cl); C-2 has H, H, –CH₃, –CHCl₂ (two H) → <b>not chiral</b>.</>,
    reason: <>Both chlorines on the <i>same</i> carbon make that carbon&rsquo;s groups non-distinct. (1,2-dichloropropane, with C-2 bonded to H, Cl, –CH₃ and –CH₂Cl, would be chiral.)</>,
  },
  {
    working: <b>Butan-2-ol contains a chiral carbon (C-2).</b>,
    reason: <>Matches option <b>C</b>. Option <b>A</b> is the one amino acid with no chiral carbon: glycine&rsquo;s side chain is H, so its central carbon has two H atoms. Option <b>B</b> overlooks that glycerol&rsquo;s middle carbon carries two identical –CH₂OH groups, and option <b>D</b> that its substituted carbon carries two Cl atoms.</>,
  },
]

export default function ChemistryQ19_2022() {
  return (
    <MCQShell
      question={<p>Which one of the following chemical compounds contains a chiral carbon centre?</p>}
      options={[
        { letter: 'A', content: 'glycine' },
        { letter: 'B', content: 'glycerol' },
        { letter: 'C', content: 'butan-2-o1', isAnswer: true },
        { letter: 'D', content: '1,1-dichloropropane' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
