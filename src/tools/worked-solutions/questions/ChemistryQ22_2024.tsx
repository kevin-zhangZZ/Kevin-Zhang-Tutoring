// 2024 Chemistry Exam, MCQ 22. VCAA examination report: 49% correct. Working back from the
// methyl ester (biodiesel) made by transesterification to the fatty acid, then building the
// triglyceride from three fatty acids and glycerol by condensation. Question text transcribed
// from the original paper (rendered from page images — the 2024 exam PDF has no extractable
// text). VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 21, C: 21, D: 49 },
  answer: 'D',
  comment: (
    <>
      The fatty acid for this methyl ester must be C₁₈H₂₈O₂.
      <br />
      To form the triglyceride, 3C₁₈H₂₈O₂ + C₃H₈O₃ – 3H₂O gives C₅₇H₈₆O₆
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>triglyceride + 3CH₃OH → glycerol + 3 methyl esters (Compound J)</>,
    reason: <>This is <b>transesterification</b>, the reaction that makes biodiesel: the KOH catalyst lets methanol swap places with glycerol, so each of the three fatty-acid chains leaves the triglyceride as a methyl ester. Compound J is therefore a <b>fatty acid methyl ester</b>, R–COOCH₃.</>,
  },
  {
    working: (
      <>
        fatty acid R–COOH = J − CH₃ + H = J − CH₂
        <br />= C₁₉H₃₀O₂ − CH₂
        <br />= <b>C₁₈H₂₈O₂</b>
      </>
    ),
    reason: <>The methyl ester R–COO<b>CH₃</b> has the methyl group where the acid R–COO<b>H</b> has an H. Swapping CH₃ back for H removes one C and two H, and leaves the two O atoms unchanged.</>,
  },
  {
    working: <>3 fatty acids + glycerol → triglyceride + 3H₂O</>,
    reason: <>A triglyceride is the <b>triester</b> of glycerol, <Chem eq="C3H8O3" /> (its structure is in the Data Book), with three fatty acids. Each of glycerol&rsquo;s three –OH groups condenses with one –COOH, and each ester link releases one H₂O.</>,
  },
  {
    working: (
      <>
        triglyceride = 3C₁₈H₂₈O₂ + C₃H₈O₃ − 3H₂O
        <br />C: 3 × 18 + 3 = 57 &nbsp; H: 3 × 28 + 8 − 3 × 2 = 86 &nbsp; O: 3 × 2 + 3 − 3 × 1 = 6
        <br />= <b>C₅₇H₈₆O₆</b>
      </>
    ),
    reason: <>Add the atoms of the three acids and glycerol, then subtract the three water molecules lost. Check by going the other way: C₅₇H₈₆O₆ + 3CH₃OH = C₆₀H₉₈O₉ = C₃H₈O₃ + 3C₁₉H₃₀O₂ ✓, so the atoms balance in the reaction in the stem.</>,
  },
  {
    working: <b>The triglyceride is C₅₇H₈₆O₆.</b>,
    reason: <>Matches option <b>D</b>. Every triglyceride has <b>6 O</b> (three ester groups, two O each), which rules out options <b>A</b> and <b>C</b> (O₃). Options <b>A</b> and <b>B</b> have only 54 C — the carbons of the three fatty-acid chains — leaving out glycerol&rsquo;s 3 carbons.</>,
  },
]

export default function ChemistryQ22_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 22 and 23.</p>
          <p className="mb-3">
            A triglyceride is reacted with methanol, CH₃OH, in the presence of concentrated KOH(aq).
            The products of this reaction are glycerol and Compound J.
          </p>
          <p className="mb-2">The molecular formula of Compound J is C₁₉H₃₀O₂.</p>
          <p>What is the molecular formula of the triglyceride?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'C₅₄H₈₂O₃' },
        { letter: 'B', content: 'C₅₄H₈₂O₆' },
        { letter: 'C', content: 'C₅₇H₈₄O₃' },
        { letter: 'D', content: 'C₅₇H₈₆O₆', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
