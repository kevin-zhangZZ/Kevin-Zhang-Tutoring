// 2015 Chemistry Exam, MCQ 15. VCAA examination report: 40% correct — the second-hardest MCQ
// on the 2015 paper. Compare the number of C-H bonds across four different 24-carbon compounds
// (a polypeptide, a fatty acid, a polyethene segment, and a polysaccharide) — testing whether
// students can draw on the structures of isoleucine and glucose given in the data book.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 14, C: 30, D: 40 },
  answer: 'D',
  comment: 'Required using the structures of isoleucine and glucose given in the data book, together with an understanding of fatty acids and polyethene, to count C-H bonds per residue.',
}

const ROWS: WorkingRow[] = [
  {
    working: 'Every option describes a compound built from 24 carbon atoms — so this is a fair comparison of C-H bond density, not just total size.',
    reason: 'Count the C-H bonds contributed by one repeating residue of each compound, then scale up.',
  },
  {
    working: (
      <>
        <b>A — tetrapeptide of isoleucine</b> (4 residues × 6 C each = 24 C): each residue has 1 H on
        the α-carbon, 0 on the carbonyl C, and 3+2+3 = 8 H across the branched side chain — 10 C-H
        bonds per residue.
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
    reason: <>7 C-H bonds per glucose residue — total for maltotetraose: 4 × 7 = <b>28</b>.</>,
  },
  {
    working: 'A: 40    B: 47    C: 48    D: 28',
    reason: <>Sugars pack far more oxygen (as -OH groups) onto their carbon skeleton than proteins, fats, or plain hydrocarbons do — so maltotetraose has the <b>fewest</b> C-H bonds by a wide margin.</>,
  },
  {
    working: <b>Matches option D.</b>,
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
