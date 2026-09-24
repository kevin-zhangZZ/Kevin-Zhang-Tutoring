// 2015 Chemistry Exam, MCQ 15. VCAA examination report: 40% correct — the second-hardest MCQ
// on the 2015 paper. Compare the number of C-H bonds across four different 24-carbon compounds
// (a polypeptide, a fatty acid, a polyethene segment, and a polysaccharide) — testing whether
// students can draw on the structures of isoleucine and glucose given in the data book.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import isoleucineSrc from './chem-2015-mcq15-report-isoleucine.png'
import glucoseSrc from './chem-2015-mcq15-report-glucose.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 14, C: 30, D: 40 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      Isoleucine:
      <img src={isoleucineSrc} alt="The report's structure of isoleucine: H2N–CH–COOH with the side chain CH3CHCH2CH3 drawn below the alpha carbon" className="w-full max-w-[260px] mt-1" />
      Each molecule has 10 C–H bonds, hence 40 C–H bonds in total.
      <br />
      Lignoceric acid: Saturated fatty acid with 24 C atoms
      <br />
      <Chem eq="C24H48O2" /> or <Chem eq="C23H47COOH" />
      <br />
      47 C–H bonds
      <br />
      Polyethene: –(<Chem eq="CH2" />–<Chem eq="CH2" />)–₁₂
      <br />
      12 × 4 = 48 C–H bonds
      <br />
      Maltotetraose: 4 glucose residues
      <br />
      Glucose, <Chem eq="C6H12O6" />, has 6 C–H bonds, as evident in:
      <img src={glucoseSrc} alt="The report's ring structure of glucose with six of its hydrogen atoms boxed" className="w-full max-w-[230px] mt-1" />
      4 glucose residues will provide 4 × 6 = 24 C–H bonds
      <br />
      The selection of alternative C may reflect the fact that it was the only option where the
      number of C–H bonds could be determined easily. Some students may also have selected the
      alternative with the greatest number of C–H bonds.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: 'Every option describes a compound built from 24 carbon atoms — so this is a fair comparison of C-H bond density, not just total size.',
    reason: <>Count the C-H bonds contributed by one repeating residue of each compound, then scale up.</>,
  },
  {
    working: (
      <>
        <b>A — tetrapeptide of isoleucine</b> (4 residues × 6 C each = 24 C): each residue has 1 H on
        the α-carbon, none on the carbonyl carbon, and 1 + 3 + 2 + 3 = 9 H across the branched side
        chain <Chem eq="CH(CH3)CH2CH3" /> — 10 C–H bonds per residue. Forming the peptide bonds
        removes only N–H and O–H hydrogens, so the C–H count is unchanged.
      </>
    ),
    reason: <>Total: 4 × 10 = <b>40</b> C-H bonds.</>,
  },
  {
    working: (
      <>
        <b>B — lignoceric acid</b>, <Chem eq="CH3(CH2)22COOH" />: the carboxyl carbon has 0 H, 22{' '}
        <Chem eq="CH2" /> groups contribute 2 H each, and the terminal <Chem eq="CH3" /> contributes 3 H.
      </>
    ),
    reason: <>Total: 0 + 22(2) + 3 = <b>47</b> C-H bonds — a saturated chain is almost entirely C-H bonds.</>,
  },
  {
    working: (
      <>
        <b>C — a polyethene segment</b> of 12 ethene residues: every one of the 24 carbons is an
        interior <Chem eq="CH2" /> group (2 H each), since it's a segment cut from the middle of a
        much longer chain.
      </>
    ),
    reason: <>Total: 24 × 2 = <b>48</b> C-H bonds — the most of any option, since a saturated hydrocarbon backbone has no room for anything but C-H and C-C bonds.</>,
  },
  {
    working: (
      <>
        <b>D — maltotetraose</b> (4 glucose residues): each glucopyranose ring has exactly 1 H on
        C-1 through C-5 (5 carbons) and 2 H on the exocyclic C-6 (<Chem eq="CH2OH" />) — every other
        position on the ring instead carries an -OH (or, for linked residues, the glycosidic -O-)
        group, not a second H.
      </>
    ),
    reason: <>7 C–H bonds per glucose residue — total for maltotetraose: 4 × 7 = <b>28</b>. (The report counts 6 per glucose and 24 in total: its diagram boxes only one of the two hydrogens on the CH₂OH carbon. The answer is the same either way — D has by far the fewest.)</>,
  },
  {
    working: 'A: 40    B: 47    C: 48    D: 28',
    reason: <>Sugars pack far more oxygen (as -OH groups) onto their carbon skeleton than proteins, fats, or plain hydrocarbons do — so maltotetraose has the <b>fewest</b> C-H bonds by a wide margin.</>,
  },
  {
    working: <b>Maltotetraose has the fewest C–H bonds.</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b>, the polyethene segment, actually has the <em>most</em>; the report suggests it was chosen because it was the only option that was easy to count.</>,
  },
]

export default function ChemistryQ15_2015() {
  return (
    <MCQShell
      question={<p>Which compound of 24 carbon atoms has the least number of carbon-hydrogen, C-H, bonds?</p>}
      options={[
        { letter: 'A', content: 'a polypeptide that consists of four isoleucine residues' },
        { letter: 'B', content: 'a molecule of lignoceric acid, which is a saturated fatty acid' },
        { letter: 'C', content: 'a segment of polyethene that consists of 12 ethene residues' },
        { letter: 'D', content: 'a molecule of maltotetraose, which is a polysaccharide that has four glucose residues', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
