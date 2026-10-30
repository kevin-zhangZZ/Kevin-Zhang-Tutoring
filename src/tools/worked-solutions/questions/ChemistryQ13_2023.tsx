// 2023 Chemistry Exam, MCQ 13. VCAA examination report: 59% correct. Which molecule can exist
// as cis and trans isomers: a C=C double bond with two different groups on each carbon. Question
// text transcribed from the original paper; the report's cis/trans structures are cropped from
// the original VCAA examination report PDF. Borderline for the current study design: cis/trans
// isomers are not named in the 2024–2027 Units 3&4 dot points (structural isomers and chiral
// centres are) — written up and flagged for KZ. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import structureSrc from './chem-2023-mcq13-report-structure.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 9, C: 59, D: 20 },
  answer: 'C',
  comment: (
    <>
      The terms &lsquo;<i>cis</i>&rsquo; and &lsquo;<i>trans</i>&rsquo; are commonly associated with
      unsaturated compounds with a C=C double bond. These two forms must show the two carbons on
      either end of the double bond attached to two different atoms or groups of atoms.
      <br />
      One of the atoms attached to each C in the C=C double bond must be the same, and these two
      atoms may be on the same side (<i>cis</i>) of the C=C double bond, or on diagonally opposite
      sides of the C=C double bond (<i>trans</i>).
      <br />
      CH<sub>2</sub>CBrCl does not have <i>cis</i> and <i>trans</i> isomers because the two H atoms
      are attached to the same C atom.
      <br />
      CH<sub>3</sub>CHBrCl does not have <i>cis</i> and <i>trans</i> isomers because there is no
      C=C double bond in the molecule.
      <br />
      CH<sub>3</sub>CHCHCl does have <i>cis</i> and <i>trans</i> isomers.
      <br />
      <img loading="lazy" decoding="async"
        src={structureSrc}
        alt="Two structures: cis-1-chloropropene, with CH3 and Cl on the same side of the C=C double bond and the two H atoms on the other side; and trans-1-chloropropene, with CH3 and Cl on diagonally opposite sides — from the 2023 VCAA examination report"
        className="w-full max-w-[360px] mt-1 bg-white rounded"
      />
      <br />
      (CH<sub>3</sub>)<sub>2</sub>CCCl<sub>2</sub> does not have <i>cis</i> and <i>trans</i> isomers
      because there is only one type of atom or group attached to each C.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Cis/trans isomers need <b>(1)</b> a <b>C=C double bond</b> (no rotation about it) and <b>(2)</b> <b>two different atoms or groups on each carbon</b> of the C=C.</>,
    reason: <>Atoms can rotate freely about a C–C single bond, so a saturated molecule can&rsquo;t be &ldquo;locked&rdquo; into two arrangements. A C=C can&rsquo;t rotate, so groups stay on the same side (<i>cis</i>) or opposite sides (<i>trans</i>). But if one carbon carries two identical groups, swapping sides gives the same molecule — so both carbons must carry two <i>different</i> groups.</>,
  },
  {
    working: <>A. <Chem eq="CH2=CBrCl" />: the first carbon carries H and H. ✗</>,
    reason: <>There is a C=C (the formula has too few H for a single bond between the carbons), but one carbon has two identical H atoms, so flipping it gives the same molecule.</>,
  },
  {
    working: <>B. <Chem eq="CH3–CHBrCl" />: no C=C double bond. ✗</>,
    reason: <>Each carbon is saturated (CH<sub>3</sub> has 4 bonds; CHBrCl bonded to CH<sub>3</sub> has 4 bonds), so the C–C bond rotates freely. (Its second carbon carries four different groups — H, Br, Cl, CH<sub>3</sub> — so it is a <b>chiral centre</b> and has optical isomers, but not cis/trans isomers.)</>,
  },
  {
    working: <>C. <Chem eq="CH3–CH=CH–Cl" />: left C carries CH<sub>3</sub> and H; right C carries Cl and H. ✓</>,
    reason: <>Both conditions hold. <i>Cis</i>-1-chloropropene has CH<sub>3</sub> and Cl on the same side of the C=C; <i>trans</i>-1-chloropropene has them on opposite sides (the report draws both).</>,
  },
  {
    working: <>D. <Chem eq="(CH3)2C=CCl2" />: left C carries CH<sub>3</sub> and CH<sub>3</sub>; right C carries Cl and Cl. ✗</>,
    reason: <>There is a C=C, but each carbon carries two identical groups, so there is only one possible arrangement.</>,
  },
  {
    working: <b>CH<sub>3</sub>CHCHCl (1-chloropropene) has cis and trans isomers.</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b> has a C=C double bond but two identical groups on each carbon. Option <b>A</b> also has a C=C but two H atoms on the same carbon. Option <b>B</b> has no C=C at all.</>,
  },
]

export default function ChemistryQ13_2023() {
  return (
    <MCQShell
      question={<p>Which molecule can exist as both a cis and a trans isomer?</p>}
      options={[
        { letter: 'A', content: <Chem eq="CH2CBrCl" /> },
        { letter: 'B', content: <Chem eq="CH3CHBrCl" /> },
        { letter: 'C', content: <Chem eq="CH3CHCHCl" />, isAnswer: true },
        { letter: 'D', content: <Chem eq="(CH3)2CCCl2" /> },
      ]}
      background={
        <Background title="Study Design Note">
          Cis/trans isomers are not named in the current (2024–2027) study design, which lists
          structural isomers and chiral centres. The idea is still useful for drawing and naming
          alkenes, and the method below — checking each option for a C=C bond and the groups on
          each carbon — is the same careful structure-reading the current course examines.
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
