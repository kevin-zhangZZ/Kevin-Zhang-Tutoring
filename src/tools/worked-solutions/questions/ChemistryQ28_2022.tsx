// 2022 Chemistry Exam, MCQ 28. VCAA examination report: 42% correct. Identifying which of four
// pentenol/pentynol isomers matches a ¹³C NMR spectrum with 5 signals, one in the C=C region.
// Question text transcribed from the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 32, C: 12, D: 42 },
  answer: 'D',
  comment: (
    <>
      The spectrum, having five signals, suggests the molecule has five different carbon
      environments. The signal with a chemical shift close to 140 ppm indicates the presence of
      C=C.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The spectrum shows <b>5 distinct signals</b>, with one sitting close to <b>140 ppm</b> — the characteristic region for an sp² C=C carbon (110–140 ppm in the Data Book).</>,
    reason: 'Two things the correct structure must satisfy simultaneously: exactly 5 carbon environments, and a genuine C=C double bond.',
  },
  {
    working: <>A: <Chem eq="CH3CH2CH(CH3)CH2OH" /> — 5 distinct carbon environments, but <b>no C=C</b> anywhere in the molecule.</>,
    reason: 'Fails the 140 ppm signal. Ruled out.',
  },
  {
    working: <>B: <Chem eq="CH3CH2CH=CHCH2CH2OH" /> — does have a C=C, but with 6 carbons in the chain all in different environments, it gives <b>6 signals</b>, not 5.</>,
    reason: 'Wrong number of signals. Ruled out.',
  },
  {
    working: <>C: <Chem eq="HC≡CCH2CH2CH2OH" /> — 5 distinct carbon environments, but this is a C≡C triple bond (an <b>alkyne</b>), which resonates in a different region (roughly 65–90 ppm), not 140 ppm.</>,
    reason: 'The unsaturation is present but in the wrong spectral region. Ruled out.',
  },
  {
    working: <>D: <Chem eq="CH2=CHCH2CH2CH2OH" /> — 5 distinct carbon environments, <b>and</b> a genuine C=C double bond that resonates near 140 ppm.</>,
    reason: <>Matches both features of the spectrum — matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ28_2022() {
  return (
    <MCQShell
      question={
        <p>
          The ¹³C NMR spectrum of an organic compound shows five signals, one of which has a
          chemical shift close to 140 ppm.
          <br />
          The organic compound could be
        </p>
      }
      options={[
        { letter: 'A', content: <>2-methylbutan-1-ol, <Chem eq="CH3CH2CH(CH3)CH2OH" /></> },
        { letter: 'B', content: <>hex-3-en-1-ol, <Chem eq="CH3CH2CH=CHCH2CH2OH" /></> },
        { letter: 'C', content: <>pent-4-yn-1-ol, <Chem eq="HC≡CCH2CH2CH2OH" /></> },
        { letter: 'D', content: <>pent-4-en-1-ol, <Chem eq="CH2=CHCH2CH2CH2OH" /></>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
