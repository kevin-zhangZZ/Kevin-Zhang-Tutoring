// 2019 Chemistry Exam, MCQ 27. VCAA examination report: 35% correct. Identify an alcohol
// isomer from its molar mass and the number of distinct peaks in its ¹³C NMR spectrum.
// Question text transcribed from the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 34, C: 35, D: 22 },
  answer: 'C',
  comment: (
    <>
      Both butan-1-ol (<Chem eq="C4H10O" />) and 2-methylbutan-2-ol (<Chem eq="C5H12O" />) will
      show four distinct peaks on their ¹³C NMR spectra — but only one of them has the right
      molar mass.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="M(C4H10O) = 74" className="mr-1" />,
    reason: <>Rule out option A, butan-1-ol: its molar mass is 74 g mol⁻¹, not the given 88 g mol⁻¹.</>,
  },
  {
    working: <Chem eq="M(C5H12O) = 88" className="mr-1" />,
    reason: <>The remaining three options — 2-methylbutan-1-ol, 2-methylbutan-2-ol, and 2,2-dimethylpropan-1-ol — are all C₅H₁₂O isomers, each with the correct molar mass.</>,
  },
  {
    working: <>B, 2-methylbutan-1-ol: CH₃CH₂CH(CH₃)CH₂OH — every one of its 5 carbons sits in a different environment (no symmetry anywhere in the chain).</>,
    reason: <>5 distinct ¹³C peaks — too many. Ruled out.</>,
  },
  {
    working: <>C, 2-methylbutan-2-ol: (CH₃)₂C(OH)CH₂CH₃ — the two methyl groups directly attached to the C–OH carbon are chemically identical to each other by symmetry.</>,
    reason: <>Distinct carbons: the two equivalent CH₃ groups (1 peak), the C–OH carbon (1), the CH₂ (1), and the terminal CH₃ of the ethyl group (1) — <b>4 peaks</b> total.</>,
  },
  {
    working: <>D, 2,2-dimethylpropan-1-ol: (CH₃)₃C–CH₂OH — three <i>equivalent</i> methyl groups around the central carbon.</>,
    reason: <>Distinct carbons: the three equivalent CH₃ groups (1 peak), the central quaternary carbon (1), and the CH₂OH (1) — only <b>3 peaks</b>. Ruled out.</>,
  },
  {
    working: <b>Only 2-methylbutan-2-ol has both M = 88 g mol⁻¹ and exactly 4 distinct ¹³C environments.</b>,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function ChemistryQ27_2019() {
  return (
    <MCQShell
      question={
        <p>
          An organic compound has a molar mass of 88 g mol⁻¹. The ¹³C NMR spectrum of the organic
          compound shows four distinct peaks.
          <br />
          The organic compound is most likely
        </p>
      }
      options={[
        { letter: 'A', content: 'butan-1-ol.' },
        { letter: 'B', content: '2-methylbutan-1-ol.' },
        { letter: 'C', content: '2-methylbutan-2-ol.', isAnswer: true },
        { letter: 'D', content: '2,2-dimethylpropan-1-ol.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
