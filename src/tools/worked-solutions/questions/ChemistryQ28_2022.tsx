// 2022 Chemistry Exam, MCQ 28. VCAA examination report: 42% correct. Identifying which of four
// alcohols matches a ¹³C NMR spectrum with 5 signals, one in the C=C region. Question text
// transcribed from the original paper; the spectrum and the four skeletal structures are cropped
// from the original VCAA exam PDF. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import spectrumSrc from './chem-2022-mcq28-spectrum.png'
import optASrc from './chem-2022-mcq28-optA.png'
import optBSrc from './chem-2022-mcq28-optB.png'
import optCSrc from './chem-2022-mcq28-optC.png'
import optDSrc from './chem-2022-mcq28-optD.png'

const opt = (src: string, alt: string, w: number) => (
  <img src={src} alt={`${alt} — from the original 2022 VCAA exam paper`} className="bg-white rounded" style={{ width: w }} />
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 32, C: 12, D: 42 },
  answer: 'D',
  comment: (
    <>
      The ¹³C spectrum shows two significant pieces of information.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          The spectrum, having five signals, suggests that the molecules of the compound have five
          different carbon environments.
        </li>
        <li>
          The signal with a chemical shift close to 140 ppm indicates the presence of C=C according
          to Table 15 in the Book: R₂C=CR₂ 110-140 ppm.
        </li>
      </ul>
      A. <Chem eq="CH3CH2CH(CH3)CH2OH" />: 5 carbon environments, no C=C
      <br />
      B. <Chem eq="CH3CH2CH=CHCH2CH2OH" />: 6 carbon environments, C=C.
      <br />
      C. <Chem eq="CHCCH2CH2CH2OH" />: 5 carbon environments, no C=C
      <br />
      D. <Chem eq="CH2=CHCH2CH2CH2OH" />: 5 carbon environments and C=C
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The spectrum shows <b>5 signals</b> (near 138, 115, 62, 32 and 30 ppm), one of them close to <b>140 ppm</b> — in the Data Book&rsquo;s range for a C=C carbon, R₂C=CR₂ 110–140 ppm.</>,
    reason: <>The compound must have exactly 5 carbon environments and a C=C double bond.</>,
  },
  {
    working: <>A: 2-methylbutan-1-ol, <Chem eq="CH3CH2CH(CH3)CH2OH" /> — 5 carbon environments, but <b>no C=C</b>.</>,
    reason: <>Nothing to give the signal near 140 ppm. Ruled out.</>,
  },
  {
    working: <>B: hex-3-en-1-ol, <Chem eq="CH3CH2CH=CHCH2CH2OH" /> — has a C=C, but its 6 carbons are all in different environments, giving <b>6 signals</b>, not 5.</>,
    reason: <>Wrong number of signals. Ruled out.</>,
  },
  {
    working: <>C: pent-4-yn-1-ol, <Chem eq="HC≡CCH2CH2CH2OH" /> — 5 carbon environments, but its multiple bond is a triple bond, C≡C, so there is <b>no C=C</b>.</>,
    reason: <>Nothing to give the signal near 140 ppm. Ruled out. (Alkynes are no longer in the study design; all that matters here is the missing C=C.)</>,
  },
  {
    working: <>D: pent-4-en-1-ol, <Chem eq="CH2=CHCH2CH2CH2OH" /> — 5 carbon environments <b>and</b> a C=C. Its two C=C carbons give the signals near 138 and 115 ppm, the CH₂OH carbon the one near 62 ppm, and the other two CH₂ carbons the pair near 30 ppm.</>,
    reason: <>Fits both features of the spectrum.</>,
  },
  {
    working: <b>The compound could be pent-4-en-1-ol.</b>,
    reason: <>Matches option <b>D</b>. Option <b>B</b>, chosen by 32%, has the C=C but one carbon environment too many.</>,
  },
]

export default function ChemistryQ28_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The <sup>13</sup>C NMR spectrum of an organic compound is shown below.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={spectrumSrc}
              alt="¹³C NMR spectrum, chemical shift 200 to 0 ppm: five signals, near 138, 115, 62, 32 and 30 ppm — data from SDBS Web, National Institute of Advanced Industrial Science and Technology, from the original 2022 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>The organic compound could be</p>
        </>
      }
      options={[
        { letter: 'A', content: opt(optASrc, 'Skeletal structure of CH₃CH₂CH(CH₃)CH₂OH', 120) },
        { letter: 'B', content: opt(optBSrc, 'Skeletal structure of CH₃CH₂CH=CHCH₂CH₂OH', 181) },
        { letter: 'C', content: opt(optCSrc, 'Skeletal structure of HC≡CCH₂CH₂CH₂OH', 152) },
        { letter: 'D', content: opt(optDSrc, 'Skeletal structure of CH₂=CHCH₂CH₂CH₂OH', 122), isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
