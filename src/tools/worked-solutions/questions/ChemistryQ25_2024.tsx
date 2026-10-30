// 2024 Chemistry Exam, MCQ 25. VCAA examination report: 50% correct. Ordering hexane,
// hexan-2-one and hexan-1-ol by HPLC retention time on a non-polar stationary phase with a polar
// mobile phase, from the strength of each compound's intermolecular forces. Question text
// transcribed from the original paper (rendered from page images — the 2024 exam PDF has no
// extractable text). VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 14, C: 17, D: 50 },
  answer: 'D',
  comment: (
    <>
      Using a non-polar stationary phase, the most non-polar compound will have the highest
      retention time, and the most polar compound will have the lowest retention time.
      <br />
      Hexane is the most non-polar compound present, and hexan-1-ol is the most polar.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Retention time is longer the more strongly a compound <b>adsorbs to the stationary phase</b>, and shorter the more strongly it <b>dissolves in the mobile phase</b>.</>,
    reason: <>In HPLC each component is continually shared between the stationary phase (packed in the column) and the mobile phase (the solvent pumped through). A component that spends more time held on the stationary phase moves more slowly and exits the column later.</>,
  },
  {
    working: <>Stationary phase non-polar, mobile phase polar ⇒ the <b>least polar</b> compound is retained longest; the <b>most polar</b> compound elutes first.</>,
    reason: <>&ldquo;Like attracts like&rdquo;: a non-polar compound is attracted to the non-polar stationary phase by dispersion forces, while a polar compound is held in the polar mobile phase by dipole–dipole forces or hydrogen bonds.</>,
  },
  {
    working: (
      <>
        hexane, C₆H₁₄ — dispersion forces only → <b>non-polar</b>
        <br />hexan-2-one, CH₃CO(CH₂)₃CH₃ — C=O group, dipole–dipole forces → <b>polar</b>
        <br />hexan-1-ol, CH₃(CH₂)₅OH — O–H group, hydrogen bonding → <b>most polar</b>
      </>
    ),
    reason: <>All three have a six-carbon chain, so their dispersion forces are similar; what differs is the functional group. The ketone has no H on O, so it cannot hydrogen bond with itself; the alcohol&rsquo;s –OH can donate and accept hydrogen bonds, so it is the most polar and the most strongly attracted to the polar mobile phase.</>,
  },
  {
    working: <>Retention time: hexan-1-ol &lt; hexan-2-one &lt; hexane</>,
    reason: <>Most polar (shortest time) to least polar (longest time).</>,
  },
  {
    working: <b>Lowest to highest: hexan-1-ol, hexan-2-one, hexane</b>,
    reason: <>Matches option <b>D</b>. Option <b>A</b>, chosen by 19%, is the exact reverse — the order for a <b>polar</b> stationary phase and a non-polar mobile phase, where the most polar compound is held longest.</>,
  },
]

export default function ChemistryQ25_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 25 and 26.</p>
          <p className="mb-3">
            A chemist runs a mixture of hexane, hexan-1-ol and hexan-2-one through a
            high-performance liquid chromatography (HPLC) column using a polar mobile phase and a
            non-polar stationary phase.
          </p>
          <p>Which of the following shows the chemicals in order of their retention times, from lowest to highest?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'hexane, hexan-2-one, hexan-1-ol' },
        { letter: 'B', content: 'hexane, hexan-1-ol, hexan-2-one' },
        { letter: 'C', content: 'hexan-2-one, hexan-1-ol, hexane' },
        { letter: 'D', content: 'hexan-1-ol, hexan-2-one, hexane', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
