// 2025 Chemistry Exam, MCQ 29. VCAA examination report: 50% correct. Using the moles of iodine
// that react with one mole of a triglyceride to find the number of C=C double bonds in each fatty
// acid chain, then identifying the fatty acid from the Data Book. Question text transcribed from
// the original paper. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 32, B: 50, C: 11, D: 7 },
  answer: 'B',
  comment: (
    <>
      If one mole of a triglyceride reacts with 6 moles of iodine, then each fatty acid must contain
      2 carbon to carbon double bonds.
      <br />
      Only linoleic acid has two C=C bonds.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Iodine <b>adds across each C=C double bond</b>: R–CH=CH–R′ + I₂ → R–CHI–CHI–R′</>,
    reason: <>An addition reaction — one I₂ molecule per C=C. This is how iodine measures the degree of unsaturation. The C=O bonds of the ester groups do not react with I₂.</>,
  },
  {
    working: <>Mole ratio: <i>n</i>(I₂) : <i>n</i>(C=C) = 1 : 1</>,
    reason: <>From the equation above.</>,
  },
  {
    working: <><i>n</i>(C=C) per mole of triglyceride = 6 mol</>,
    reason: <>6 mol I₂ react completely with 1 mol of triglyceride, so 1 mol of triglyceride contains 6 mol of C=C.</>,
  },
  {
    working: <>C=C per fatty acid chain = 6 ÷ 3 = <b>2</b></>,
    reason: <>A triglyceride is glycerol esterified with <b>three</b> fatty acids. The question says only one type of fatty acid is present, so all three chains are identical and share the 6 C=C equally.</>,
  },
  {
    working: (
      <>
        Data Book fatty acids (all C₁₈):
        <br />
        stearic C₁₈H₃₆O₂ — 0 C=C
        <br />
        oleic C₁₈H₃₄O₂ — 1 C=C
        <br />
        linoleic C₁₈H₃₂O₂, CH₃(CH₂)₄CH=CHCH₂CH=CH(CH₂)₇COOH — <b>2 C=C</b>
        <br />
        linolenic C₁₈H₃₀O₂ — 3 C=C
      </>
    ),
    reason: <>Data Book, &lsquo;Formulas of selected fatty acids&rsquo; (item 18 in the 2026 Data Book). Stearic acid is saturated; each C=C removes 2 H, so every 2 H fewer than C₁₈H₃₆O₂ is one more C=C — or count the CH=CH groups in the semi-structural formula.</>,
  },
  {
    working: <>Check, mol I₂ per mol triglyceride = 3 × (C=C per chain): linolenic 9, <b>linoleic 6</b>, oleic 3, stearic 0</>,
    reason: <>Only linoleic acid gives exactly 6 mol I₂.</>,
  },
  {
    working: <b>The fatty acid is linoleic acid.</b>,
    reason: <>Matches option <b>B</b>. Option <b>A</b>, chosen by 32%, is linolenic acid, with 3 C=C per chain: its triglyceride would react with 9 mol I₂. The names linoleic and linolenic differ by a single letter, so it is easy to pick the wrong one: always check the formula in the Data Book (C₁₈H₃₂O₂ vs C₁₈H₃₀O₂), not the name. Oleic acid (C) would need only 3 mol I₂, and stearic acid (D), being saturated, none.</>,
  },
]

export default function ChemistryQ29_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            One mole of a triglyceride containing only one type of fatty acid reacts completely
            with 6 moles of iodine, I₂.
          </p>
          <p>Which one of the following could be the fatty acid?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'linolenic acid' },
        { letter: 'B', content: 'linoleic acid', isAnswer: true },
        { letter: 'C', content: 'oleic acid' },
        { letter: 'D', content: 'stearic acid' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
