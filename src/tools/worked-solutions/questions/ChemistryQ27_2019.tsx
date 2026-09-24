// 2019 Chemistry Exam, MCQ 27. VCAA examination report: 35% correct. Identify an alcohol
// isomer from its molar mass and the number of distinct peaks in its ¹³C NMR spectrum.
// Question text transcribed from the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import structuresSrc from './chem-2019-mcq27-report-structures.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 34, C: 35, D: 22 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      <img src={structuresSrc} alt="The report's structural formulas for the four options, labelled A 4 carbon environments, B 5, C 4 and D 3" className="w-full max-w-[420px] mt-1" />
      Both butan-1-ol (<Chem eq="C4H10O" />) and 2-methylbutan-2-ol (<Chem eq="C5H12O" />) will show
      four distinct peaks on their ¹³C NMR spectra.
      <br />
      <i>M</i>(<Chem eq="C4H10O" />) = 74.0 g mol⁻¹
      <br />
      <i>M</i>(<Chem eq="C5H12O" />) = 88.0 g mol⁻¹
      <br />
      Students who selected Options B or D did not accurately identify the number of carbon
      environments in the associated molecules. This may been due to not referring to, or
      inaccurate, structural formulae.
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
    reason: <>Matches option <b>C</b>. Option <b>B</b>, chosen by 34%, has five carbon environments, not four. (The report&rsquo;s drawing for D shows only four carbons — 2-methylpropan-1-ol — but 2,2-dimethylpropan-1-ol also has three environments, so its label stands.)</>,
  },
]

export default function ChemistryQ27_2019() {
  return (
    <MCQShell
      question={
        <p>
          An organic compound has a molar mass of 88 g mol⁻¹.
          <br />
          The ¹³C NMR spectrum of the organic compound shows four distinct peaks.
          <br />
          The organic compound is most likely
        </p>
      }
      options={[
        { letter: 'A', content: 'butan-1-ol.' },
        { letter: 'B', content: '2-methyl-butan-1-ol.' },
        { letter: 'C', content: '2-methyl-butan-2-ol.', isAnswer: true },
        { letter: 'D', content: '2,2-dimethyl-propan-1-ol.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
