// 2019 Chemistry Exam, MCQ 15. VCAA examination report: 35% correct. How many chiral centres,
// stereoisomers and optical isomers aspartame has. Question text transcribed from the original
// paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 32, C: 35, D: 18 },
  answer: 'C',
  comment: (
    <>
      Aspartame has two chiral centres. Associated with each chiral centre are two optical
      isomers, so aspartame has four optical isomers. The maximum number of stereoisomers of a
      molecule is 2ⁿ, where n is the number of chiral centres.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Aspartame is a dipeptide-like ester built from aspartic acid and phenylalanine methyl ester — it has <b>two</b> chiral centres: one carbon in the aspartic-acid portion, one in the phenylalanine portion.</>,
    reason: <>A chiral centre is a carbon bonded to four different groups — both of aspartame's "alpha carbons" qualify.</>,
  },
  {
    working: <>Each chiral centre independently can be one of two configurations (R or S).</>,
    reason: 'This is what generates optical isomers.',
  },
  {
    working: <>Maximum number of stereoisomers = 2ⁿ, where n = number of chiral centres.</>,
    reason: 'General rule for molecules built from independent chiral centres.',
  },
  {
    working: <>2² = 4 stereoisomers — and since aspartame's stereoisomers all arise from these chiral centres (not from geometric/cis-trans isomerism), all four are <b>optical</b> isomers.</>,
    reason: <>Matches option <b>C</b>.</>,
  },
  {
    working: <>A: "one chiral centre" undercounts — there are two. B: "two stereoisomers" only accounts for one chiral centre's worth. D: stereoisomers are <i>not</i> structural isomers — they share the same connectivity, differing only in 3D arrangement.</>,
    reason: 'Why the other three options are wrong.',
  },
]

export default function ChemistryQ15_2019() {
  return (
    <MCQShell
      question={
        <p>
          Aspartame — the artificial sweetener, built from an aspartic acid unit and a
          phenylalanine methyl ester unit joined by a peptide bond — has only
        </p>
      }
      options={[
        { letter: 'A', content: 'one chiral centre.' },
        { letter: 'B', content: 'two stereoisomers.' },
        { letter: 'C', content: 'four optical isomers.', isAnswer: true },
        { letter: 'D', content: 'three structural isomers.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
