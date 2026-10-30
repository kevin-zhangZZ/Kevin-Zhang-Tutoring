// 2025 Chemistry Exam, MCQ 26. VCAA examination report: 60% correct. Working out the molecular
// formulas of geranial and linalool from their skeletal structures by counting the hidden
// hydrogens carbon by carbon. Question text transcribed from the original paper; the skeletal
// structures (shared with MCQ 27) are cropped from the original VCAA exam PDF. VCAA report only.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import structuresSrc from './chem-2025-mcq27-structures.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 10, C: 60, D: 24 },
  answer: 'C',
  comment: (
    <>
      Geranial has a molecular formula of <Chem eq="C10H16O" />
      <br />
      Linalool has a molecular formula of <Chem eq="C10H18O" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Skeletal structure rules: every corner and every line end is a <b>carbon</b> atom; the H atoms on carbon are <b>not drawn</b>; each carbon carries enough H to make <b>4 bonds</b> in total. Atoms other than C (here O), and any H on them, are drawn.</>,
    reason: <>So the H count has to be worked out: for each carbon, H = 4 − (number of bonds drawn to it), counting a double bond as 2.</>,
  },
  {
    working: (
      <>
        Geranial, from the O end along the chain:
        <br />
        C1 (C=O end): 2 bonds to O + 1 to C2 → <b>1 H</b> (this is the aldehyde –CHO)
        <br />
        C2 (=CH–): <b>1 H</b> · C3 (=C&lt; with a CH₃ branch): <b>0 H</b>, CH₃ branch <b>3 H</b>
        <br />
        C4, C5 (–CH₂–): <b>2 H</b> + <b>2 H</b> · C6 (=CH–): <b>1 H</b>
        <br />
        C7 (=C&lt; with two CH₃ ends): <b>0 H</b>, two CH₃ <b>6 H</b>
        <br />
        C: 7 in the chain + 3 CH₃ = 10 · H: 1 + 1 + 3 + 2 + 2 + 1 + 6 = 16 · O: 1
      </>
    ),
    reason: <>Geranial = <Chem eq="C10H16O" />. The carbon at the O end has its H hidden like every other carbon — the line simply ends at C=O, but that carbon still needs a fourth bond, and it&rsquo;s an H.</>,
  },
  {
    working: (
      <>
        Linalool, from the CH₂= end:
        <br />
        C1 (CH₂=): <b>2 H</b> · C2 (=CH–): <b>1 H</b>
        <br />
        C3 (carries OH and a CH₃): <b>0 H</b> on C, CH₃ branch <b>3 H</b>, O–H <b>1 H</b>
        <br />
        C4, C5 (–CH₂–): <b>2 H</b> + <b>2 H</b> · C6 (=CH–): <b>1 H</b>
        <br />
        C7 (=C&lt; with two CH₃ ends): <b>0 H</b>, two CH₃ <b>6 H</b>
        <br />
        C: 7 in the chain + 3 CH₃ = 10 · H: 2 + 1 + 3 + 1 + 2 + 2 + 1 + 6 = 18 · O: 1
      </>
    ),
    reason: <>Linalool = <Chem eq="C10H18O" />. Remember the H of the –OH group: it is drawn (as &ldquo;HO&rdquo;) and must be counted.</>,
  },
  {
    working: (
      <>
        Check: a saturated C₁₀ compound has 2(10) + 2 = 22 H; each double bond removes 2 H.
        <br />
        Geranial: 2 C=C + 1 C=O = 3 double bonds → 22 − 6 = 16 H ✓
        <br />
        Linalool: 2 C=C = 2 double bonds → 22 − 4 = 18 H ✓
      </>
    ),
    reason: <>An independent check on the count. (An O atom with two single bonds, as in an alcohol, doesn&rsquo;t change the H count.) Also, a neutral molecule of only C, H and O always has an <b>even</b> number of H atoms.</>,
  },
  {
    working: <><b>Geranial <Chem eq="C10H16O" /> and linalool <Chem eq="C10H18O" />.</b></>,
    reason: <>Matches option <b>C</b>. Option <b>D</b>, chosen by 24%, and options A and B all contain a formula with an <b>odd</b> number of H (<Chem eq="C10H15O" /> or <Chem eq="C10H17O" />), which is impossible for a neutral C, H, O compound. <Chem eq="C10H15O" /> for geranial is what you get by missing the hidden aldehyde H.</>,
  },
]

export default function ChemistryQ26_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 26 and 27.</p>
          <p className="mb-2">
            Geranial and linalool are two natural organic compounds found in essential oils
            extracted from some citrus fruits. The skeletal structures for geranial and linalool
            are given below.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={structuresSrc}
              alt="Skeletal structures: geranial, a ten-carbon chain with an aldehyde group at one end and two C=C double bonds; linalool, with an OH on a carbon that also carries a methyl group and a vinyl group, and one further C=C — from the original 2025 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>The molecular formulas for geranial and linalool are</p>
        </>
      }
      options={[
        { letter: 'A', content: <><Chem eq="C10H15O" /> and <Chem eq="C10H17O" /></> },
        { letter: 'B', content: <><Chem eq="C10H15O" /> and <Chem eq="C10H18O" /></> },
        { letter: 'C', content: <><Chem eq="C10H16O" /> and <Chem eq="C10H18O" /></>, isAnswer: true },
        { letter: 'D', content: <><Chem eq="C10H16O" /> and <Chem eq="C10H17O" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
