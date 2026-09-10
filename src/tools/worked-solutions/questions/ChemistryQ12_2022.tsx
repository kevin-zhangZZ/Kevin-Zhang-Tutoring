// 2022 Chemistry Exam, MCQ 12. VCAA examination report: 42% correct. Why enzymes are commonly
// ineffective in acidic conditions, by elimination against genuine facts about protein
// chemistry. Question text transcribed from the original paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 42, B: 19, C: 12, D: 27 },
  answer: 'A',
  comment: (
    <>
      In acidic conditions, basic groups (such as NH₂) on the side chains of the amino acids in
      enzymes are protonated and become positively charged, disrupting the enzyme's shape.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>An enzyme's activity depends on its precise 3D shape, which in turn depends on the pattern of charges and bonds (ionic bonds, hydrogen bonds) holding its structure together.</>,
    reason: 'Basic set-up for evaluating each option.',
  },
  {
    working: <>A: excess H⁺ in acidic conditions protonates basic side groups (like –NH₂ becoming –NH₃⁺), adding positive charges that weren't there before and disrupting the ionic bonds and shape that held the enzyme's active site together.</>,
    reason: 'Correct — this is genuinely how low pH denatures enzymes.',
  },
  {
    working: <>B: zwitterions require both a positive <i>and</i> a negative charge to form on the same molecule — an acidic (H⁺-rich) environment pushes toward extra positive charges, not the balanced pairing a zwitterion needs.</>,
    reason: 'Ruled out.',
  },
  {
    working: <>C: esterification requires an alcohol and a carboxylic acid reacting together under specific conditions — acids alone don't esterify or break proteins into smaller molecules.</>,
    reason: 'Ruled out.',
  },
  {
    working: <>D: acids don't chemically react with carboxyl (–COOH) groups — carboxyl groups are already acidic themselves; if anything, more H⁺ suppresses their own ionisation rather than reacting with them.</>,
    reason: 'Ruled out.',
  },
  {
    working: <b>Only the charge-disruption explanation is chemically sound.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ12_2022() {
  return (
    <MCQShell
      question={<p>Enzymes are commonly not effective in acidic conditions because acids</p>}
      options={[
        { letter: 'A', content: "change the charges on the enzymes.", isAnswer: true },
        { letter: 'B', content: 'react with the enzymes to form zwitterions.' },
        { letter: 'C', content: "esterify the enzymes into smaller molecules." },
        { letter: 'D', content: "react with the carboxyl groups on the enzymes' amino acid residues." },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
