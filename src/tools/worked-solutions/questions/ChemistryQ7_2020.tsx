// 2020 Chemistry Exam, MCQ 7. VCAA examination report: 46% correct. Counting the structural
// isomers of C3H6BrCl by placing the two halogen atoms systematically on a three-carbon chain.
// Question text transcribed from the original paper. The report's comment keeps its typo
// "1-bromo-3-chloroopropane" verbatim (explained in the final row). VCAA report only. Solution
// is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 29, B: 46, C: 18, D: 6 },
  answer: 'B',
  comment: (
    <>
      CH₃CH₂CHBrCl; 1-bromo-1-chloropropane
      <br />
      CH₃CHClCH₂Br; 1-bromo-2-chloropropane
      <br />
      CH₂ClCH₂CH₂Br; 1-bromo-3-chloroopropane
      <br />
      CH₃CHBrCH₂Cl; 2-bromo-1-chloropropane
      <br />
      CH₃CBrClCH₃; 2-bromo-2-chloropropane
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Carbon skeleton: C–C–C (propane) only.</>,
    reason: <>Structural isomers have the same molecular formula but different arrangements of atoms. <Chem eq="C3H6BrCl" /> is propane, <Chem eq="C3H8" />, with two H atoms replaced by one Br and one Cl. Three carbons can only form one unbranched chain, so the isomers differ only in <b>where</b> the Br and Cl sit.</>,
  },
  {
    working: <>The two end carbons are equivalent: call them C1 (either end) and C2 (the middle).</>,
    reason: <>Putting a halogen on &ldquo;C3&rdquo; is the same as putting it on C1 and turning the molecule around — the key to not double-counting.</>,
  },
  {
    working: (
      <>
        <span className="block">Both on the same carbon:</span>
        <span className="block">1. <Chem eq="CH3CH2CHBrCl" /> — 1-bromo-1-chloropropane</span>
        <span className="block">2. <Chem eq="CH3CBrClCH3" /> — 2-bromo-2-chloropropane</span>
      </>
    ),
    reason: <>Both halogens on an end carbon, or both on the middle carbon.</>,
  },
  {
    working: (
      <>
        <span className="block">On neighbouring carbons (end + middle):</span>
        <span className="block">3. <Chem eq="CH2BrCHClCH3" /> — 1-bromo-2-chloropropane</span>
        <span className="block">4. <Chem eq="CH2ClCHBrCH3" /> — 2-bromo-1-chloropropane</span>
      </>
    ),
    reason: <>Br on the end and Cl in the middle is a <b>different</b> molecule from Cl on the end and Br in the middle — swapping two different halogens between non-equivalent carbons gives a new isomer.</>,
  },
  {
    working: (
      <>
        <span className="block">On the two end carbons:</span>
        <span className="block">5. <Chem eq="CH2BrCH2CH2Cl" /> — 1-bromo-3-chloropropane</span>
      </>
    ),
    reason: <>Swapping Br and Cl here gives the same molecule turned around (&ldquo;3-bromo-1-chloropropane&rdquo; is just this one drawn backwards). Naming: substituents in alphabetical order (bromo before chloro); when the locants tie (1 and 3 either way), the lower number goes to the first-cited substituent, bromo.</>,
  },
  {
    working: <b>5 structural isomers</b>,
    reason: <>Matches option <b>B</b>. Option <b>A</b>, 4, is the count if one of the five is missed — for example, by treating 1-bromo-2-chloro and 2-bromo-1-chloropropane as the same molecule. Option <b>C</b>, 6, is the count if 3-bromo-1-chloropropane is also listed as a separate molecule — it is isomer 5 turned around. (Isomers 1, 3 and 4 each have a chiral carbon and so exist as a pair of optical isomers, but the question asks only for <i>structural</i> isomers.) The report&rsquo;s &ldquo;chloroopropane&rdquo; is a typo for chloropropane.</>,
  },
]

export default function ChemistryQ7_2020() {
  return (
    <MCQShell
      question={<p>How many structural isomers have the molecular formula C₃H₆BrCl?</p>}
      options={[
        { letter: 'A', content: '4' },
        { letter: 'B', content: '5', isAnswer: true },
        { letter: 'C', content: '6' },
        { letter: 'D', content: '7' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
