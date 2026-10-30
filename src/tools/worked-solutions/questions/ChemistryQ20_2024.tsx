// 2024 Chemistry Exam, MCQ 20. VCAA examination report: 51% correct. Drawing every aldehyde
// isomer of C₅H₁₀O (pentanal, 2-methylbutanal, 3-methylbutanal, 2,2-dimethylpropanal) and
// checking each statement against the list. Question text transcribed from the original paper
// (rendered from page images — the 2024 exam PDF has no extractable text). VCAA report only.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 24, B: 19, C: 51, D: 7 },
  answer: 'C',
  comment: (
    <>
      There are four structural isomers that are aldehydes (not including enantiomers). Two of these
      isomers have a single methyl side chain:
      <br />
      <Chem eq="CH3CH2CH(CH3)CHO" /> and <Chem eq="(CH3)2CHCH2CHO" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>An aldehyde has the <b>–CHO</b> group, which can only be at the <b>end</b> of a carbon chain. Its carbon is always numbered <b>C1</b>.</>,
    reason: <>The aldehyde carbon is bonded to one H and double-bonded to O, leaving only one bond to another carbon — so it can never sit in the middle of a chain. (A C=O in the middle of the chain would be a ketone, e.g. pentan-2-one, which is also C₅H₁₀O but not an aldehyde.)</>,
  },
  {
    working: <>Remove the –CHO carbon: the other <b>4 carbons</b> (<Chem eq="C4H9" />) can be arranged in only 4 ways.</>,
    reason: <>A systematic way to count: fix the –CHO, then list every different arrangement of the remaining four carbons — a straight chain, or a chain with branches in each possible place.</>,
  },
  {
    working: (
      <>
        1. <Chem eq="CH3CH2CH2CH2CHO" /> — pentanal (no side branch)
        <br />
        2. <Chem eq="CH3CH2CH(CH3)CHO" /> — 2-methylbutanal (one methyl branch)
        <br />
        3. <Chem eq="(CH3)2CHCH2CHO" /> — 3-methylbutanal (one methyl branch)
        <br />
        4. <Chem eq="(CH3)3CCHO" /> — 2,2-dimethylpropanal (two methyl branches)
      </>
    ),
    reason: <>Name each from the longest chain that includes the –CHO carbon, numbering from that carbon. Check each formula: 5 C, 10 H, 1 O. (2-methylbutanal has a chiral carbon, C2, so it exists as two enantiomers — but they are not different <i>structural</i> isomers, so they count once.)</>,
  },
  {
    working: <>A: there are <b>four</b> aldehyde isomers, not three. False.</>,
    reason: <>A count of three misses one of the four above.</>,
  },
  {
    working: <>B: an ethyl branch on C2 of propanal would be <Chem eq="CH3CH(CH2CH3)CHO" />. Its longest chain through the –CHO carbon is 4 carbons, <Chem eq="CH3CH2CH(CH3)CHO" /> — it is 2-methylbutanal again. No isomer has an ethyl branch. False.</>,
    reason: <>Always find the longest carbon chain containing the functional group before naming branches. An &ldquo;ethyl&rdquo; group on C2 here simply extends the main chain.</>,
  },
  {
    working: <>C: 2-methylbutanal and 3-methylbutanal each have exactly one methyl branch. <b>True.</b></>,
    reason: <>2,2-dimethylpropanal has two methyl branches and pentanal has none, so exactly two isomers have one methyl side branch.</>,
  },
  {
    working: <>D: in every aldehyde the functional group is on <b>C1</b>, not the second carbon. False.</>,
    reason: <>The –CHO carbon is C1 by definition — that is why the names are pentanal, butanal, propanal, with no locant for the aldehyde group.</>,
  },
  {
    working: <b>There are two isomers that have one methyl side branch.</b>,
    reason: <>Matches option <b>C</b>, as the report&rsquo;s two formulas show. Option <b>A</b>, chosen by 24%, undercounts the isomers: there are four. Option <b>B</b> names a chain with an ethyl branch that is really 2-methylbutanal, and option <b>D</b> puts the –CHO group on C2, where only a ketone&rsquo;s C=O can be.</>,
  },
]

export default function ChemistryQ20_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the structural isomers of <Chem eq="C5H10O" /> that are aldehydes.</p>
          <p>Which one of the following statements is correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'There are three isomers.' },
        { letter: 'B', content: 'There is one isomer with an ethyl side branch.' },
        { letter: 'C', content: 'There are two isomers that have one methyl side branch.', isAnswer: true },
        { letter: 'D', content: 'Each isomer has a functional group on the second carbon atom.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
