// 2018 Chemistry Exam, MCQ 2. VCAA examination report: 38% correct — the second-hardest MCQ on
// the 2018 paper. Aspartame: work through each statement against its actual structure — a
// dipeptide methyl ester, not a sugar and not a glycoside.
// Question text transcribed from the original paper; solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 26, B: 9, C: 38, D: 28 },
  answer: 'C',
  comment: (
    <>
      Aspartame is used as a sugar substitute because it has effectively the same energy content
      as sucrose (17 kJ g⁻¹) but is 200 times sweeter, so very small amounts are required.
      <br />
      Aspartame molecules have a peptide link and an ester link. Aspartame is not a sugar; it is a
      methyl ester of a dipeptide. Aspartame is hydrolysed into two amino acids and an alcohol.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: 'Aspartame is the methyl ester of the dipeptide aspartic acid–phenylalanine (Asp-Phe-OMe).',
    reason: <>Structurally it's a small <b>peptide</b>, not a carbohydrate.</>,
  },
  {
    working: <>A — "contains a glycosidic link": a glycosidic link joins two <em>sugar</em> units. Aspartame has no sugar rings at all — its two units are joined by a peptide (amide) bond instead. <b>False.</b></>,
  },
  {
    working: <>B — "is a naturally occurring sugar": aspartame is neither a sugar nor naturally occurring — it's a synthesised dipeptide derivative. <b>False.</b></>,
  },
  {
    working: <>D — "contains two amino groups": the peptide bond between the two residues consumes phenylalanine's amino group, leaving only <b>one</b> free amino group (on the aspartic acid residue). <b>False.</b></>,
    reason: <>Counting amino groups in a peptide means checking which ones survive bond formation, not just the number of residues.</>,
  },
  {
    working: <>C — "has an energy content similar to that of sucrose": like any amino-acid-based compound, aspartame releases roughly the same energy <em>per gram</em> as protein or sugar (≈17 kJ g⁻¹, comparable to sucrose's ≈16 kJ g⁻¹).</>,
    reason: <>This is the classic "diet sweetener" misconception — aspartame isn't calorie-free at all; it's just used in such tiny amounts that its total calorie contribution is negligible.</>,
  },
  {
    working: <b>Aspartame's energy content, gram for gram, is similar to sucrose.</b>,
    reason: <>Matches option <b>C</b>. Option <b>A</b> mistakes aspartame&rsquo;s peptide link for a glycosidic link — it has no sugar units; option <b>D</b> counts an amino group for each residue, but one of them is used up in the peptide link.</>,
  },
]

export default function ChemistryQ2_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Aspartame is a widely used sweetener.</p>
          <p>Aspartame</p>
        </>
      }
      options={[
        { letter: 'A', content: 'contains a glycosidic link.' },
        { letter: 'B', content: 'is a naturally occurring sugar.' },
        { letter: 'C', content: 'has an energy content similar to that of sucrose.', isAnswer: true },
        { letter: 'D', content: 'contains two amino groups in its chemical structure.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
