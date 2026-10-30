// 2024 Chemistry Exam, MCQ 18. VCAA examination report: 48% correct. Choosing the highest
// boiling point among an ester, a carboxylic acid, an alcohol and a diamine that all have a molar
// mass of 88 g mol⁻¹: with dispersion forces roughly equal, the strength of hydrogen bonding
// decides it. Question text transcribed from the original paper (rendered from page images — the
// 2024 exam PDF has no extractable text). VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 48, C: 17, D: 22 },
  answer: 'B',
  comment: (
    <>
      Carboxylic acids easily form dimers with strong intermolecular forces holding them together.
      These forces will be much more significant than the -CH₂-OH, ester or N-methyl bonding.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Boiling point depends on the strength of the <b>intermolecular forces</b> between molecules: dispersion forces, dipole–dipole attractions and hydrogen bonds.</>,
    reason: <>Boiling separates molecules from each other; no covalent bonds inside the molecules are broken. So compare the forces <i>between</i> molecules.</>,
  },
  {
    working: (
      <>
        A: <Chem eq="C4H8O2" />, M = 4(12.0) + 8(1.0) + 2(16.0) = 88.0 g mol⁻¹
        <br />
        B: <Chem eq="C4H8O2" />, M = 88.0 g mol⁻¹
        <br />
        C: <Chem eq="C5H12O" />, M = 5(12.0) + 12(1.0) + 16.0 = 88.0 g mol⁻¹
        <br />
        D: <Chem eq="C4H12N2" />, M = 4(12.0) + 12(1.0) + 2(14.0) = 88.0 g mol⁻¹
      </>
    ),
    reason: <>Data Book: relative atomic masses C 12.0, H 1.0, O 16.0, N 14.0. The question fixes the molar mass so that the molecules are of similar size and have roughly similar <b>dispersion forces</b> — the difference must come from the polar groups.</>,
  },
  {
    working: <>A: <Chem eq="CH3CH2OCOCH3" />, ethyl ethanoate — an <b>ester</b>. No H attached to O or N, so <b>no hydrogen bonding</b> between its molecules; only dipole–dipole and dispersion forces. Lowest boiling point.</>,
    reason: <>Hydrogen bonding needs an H atom bonded directly to N, O or F. In an ester every H is bonded to C.</>,
  },
  {
    working: <>D: <Chem eq="CH3NH(CH2)2NHCH3" /> — a <b>secondary amine</b> (two N–H groups). Hydrogen bonds form, but N–H···N hydrogen bonds are <b>weaker</b> than O–H···O ones.</>,
    reason: <>N is less electronegative than O, so the N–H bond is less polar and its hydrogen bonds are weaker. Having two N–H groups does not make up for this.</>,
  },
  {
    working: <>C: <Chem eq="CH3(CH2)3CH2OH" />, pentan-1-ol — an <b>alcohol</b> with one O–H group, so it forms O–H···O hydrogen bonds.</>,
    reason: <>Stronger than the amine&rsquo;s hydrogen bonds, but each molecule has only one polar group.</>,
  },
  {
    working: <>B: <Chem eq="CH3(CH2)2COOH" />, butanoic acid — a <b>carboxylic acid</b>. The –COOH group has both a polar O–H and a polar C=O, so two molecules hydrogen-bond to each other twice, forming a <b>dimer</b>, plus extra dipole–dipole attraction from C=O. Strongest intermolecular forces, so highest boiling point.</>,
    reason: <>The O–H of one acid molecule hydrogen-bonds to the C=O oxygen of a neighbour, and vice versa: a strongly held pair. This is why carboxylic acids boil higher than alcohols of similar molar mass.</>,
  },
  {
    working: <b>Highest boiling point: <Chem eq="CH3(CH2)2COOH" /> (butanoic acid).</b>,
    reason: <>Matches option <b>B</b>. Order: ester &lt; amine &lt; alcohol &lt; carboxylic acid (for reference, measured boiling points are about 77, 119, 138 and 164 °C respectively — not needed in the exam). Option <b>D</b>, chosen by 22%, has two hydrogen-bonding N–H groups, but N–H hydrogen bonds are weaker than O–H ones. Option <b>C</b> does hydrogen-bond through O–H, but the carboxylic acid&rsquo;s –COOH group forms stronger attractions (dimers).</>,
  },
]

export default function ChemistryQ18_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Each of the following compounds has a molar mass of 88 g mol⁻¹.</p>
          <p>Which one has the highest boiling point?</p>
        </>
      }
      options={[
        { letter: 'A', content: <Chem eq="CH3CH2OCOCH3" /> },
        { letter: 'B', content: <Chem eq="CH3(CH2)2COOH" />, isAnswer: true },
        { letter: 'C', content: <Chem eq="CH3(CH2)3CH2OH" /> },
        { letter: 'D', content: <Chem eq="CH3NH(CH2)2NHCH3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
