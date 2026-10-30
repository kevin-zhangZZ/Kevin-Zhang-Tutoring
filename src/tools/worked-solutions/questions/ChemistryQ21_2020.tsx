// 2020 Chemistry Exam, MCQ 21. VCAA examination report: 48% correct. Identifying a compound
// from its infrared spectrum by matching the N–H, C–H and amide C=O absorption bands to the Data
// Book. Question text transcribed from the original paper; the IR spectrum is cropped from the
// original VCAA exam PDF, and the annotated spectrum in the report's comment is cropped from the
// VCAA examination report (VCAA report only). The report's "The third peaks is" is kept verbatim.
// The working uses the 2026 Data Book's IR ranges; the ester C=O range changed (note in the
// working). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import spectrumSrc from './chem-2020-mcq21-ir-spectrum.png'
import reportGraphSrc from './chem-2020-mcq21-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 10, C: 48, D: 24 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      <img
        loading="lazy"
        decoding="async"
        src={reportGraphSrc}
        alt="The IR spectrum annotated by VCAA: the broad band near 3300 cm⁻¹ labelled N-H 3300-3500 cm⁻¹, the bands just below 3000 cm⁻¹ labelled C-H 2850-3090 cm⁻¹, and the strong band near 1650 cm⁻¹ labelled C=O (amides) 1630-1680 cm⁻¹"
        className="block w-full max-w-[360px] mt-1 mb-2 bg-white"
      />
      The first (leftmost) peak on the spectrum is in the absorption region of N-H and O-H
      (alcohols).
      <br />
      The second peak is in the absorption region of C-H.
      <br />
      The third peaks is in the absorption region of C=O (amides).
      <br />
      Only alternative C is consistent with the data.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Identify the strong, characteristic absorption bands above 1500 cm⁻¹ and match each to a bond using the Data Book IR table.</>,
    reason: <>An IR spectrum shows which <b>bonds</b> are present: each bond type absorbs in a characteristic wave-number range (Data Book: &ldquo;Characteristic ranges for infrared absorption&rdquo;). A low transmittance (a deep trough) means strong absorption. The crowded region below about 1500 cm⁻¹ (the fingerprint region) is not used to identify functional groups.</>,
  },
  {
    working: <>Band 1: broad, strong, about 3150–3400 cm⁻¹ → <b>N–H</b> (amines and amides, 3300–3500 cm⁻¹) or <b>O–H</b> (alcohols, 3200–3600 cm⁻¹).</>,
    reason: <>The compound must contain an N–H or an O–H bond. Options <b>A</b> (<Chem eq="CH3CH2COOCH3" />, an ester) and <b>B</b> (<Chem eq="CH3CH2CH2CHO" />, an aldehyde) have neither, so they are ruled out. The trough has two &ldquo;prongs&rdquo;, typical of an –NH₂ group.</>,
  },
  {
    working: <>Band 2: about 2850–3000 cm⁻¹ → <b>C–H</b> (2850–3090 cm⁻¹).</>,
    reason: <>Every option contains C–H bonds, so this band doesn&rsquo;t discriminate between them — but it is consistent with all of them.</>,
  },
  {
    working: <>Band 3: very strong, sharp, about 1650–1680 cm⁻¹ → <b>C=O</b> (amides, 1630–1680 cm⁻¹).</>,
    reason: (
      <>
        The compound must contain a C=O bond. Option <b>D</b> (<Chem eq="NH2CH2CH2CHOHCH3" />, an amine and an alcohol) has no C=O, so it is ruled out. The band also sits below the ester C=O range (1720–1750 cm⁻¹), a second reason A doesn&rsquo;t fit.
        <DataBookNote>the 2026 Data Book gives C=O (esters) as 1720–1750 cm⁻¹; older Data Books gave 1720–1840 cm⁻¹. The band near 1650–1680 cm⁻¹ is below both ranges, so the answer is unchanged. The N–H, C–H and amide C=O ranges are the same in both.</DataBookNote>
      </>
    ),
  },
  {
    working: <><Chem eq="NH2CH2CH2CONH2" /> contains N–H (amine and amide), C–H and C=O (amide) → consistent with all three bands.</>,
    reason: <>This is 3-aminopropanamide: an –NH₂ amine group at one end and an amide group, –CONH₂, at the other. It is the only option that has <i>both</i> an N–H/O–H bond and a C=O bond.</>,
  },
  {
    working: <b>The compound could be <Chem eq="NH2CH2CH2CONH2" />.</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b> (24%) explains band 1 with its N–H and O–H bonds but has no C=O to explain the strongest band at about 1650–1680 cm⁻¹. Option <b>A</b> (18%) has a C=O, but an ester&rsquo;s C=O absorbs at a higher wave number and it has no N–H or O–H for band 1. Option <b>B</b> has a C=O but no N–H or O–H either. Check every strong band — a correct compound must account for all of them.</>,
  },
]

export default function ChemistryQ21_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The infra-red (IR) spectrum of an organic compound is shown below.</p>
          <div className="mb-1 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              loading="lazy"
              decoding="async"
              src={spectrumSrc}
              alt="IR spectrum, transmittance (%) from 0 to 100 against wave number from 4000 to about 400 cm⁻¹: a broad strong two-pronged trough at about 3150–3400 cm⁻¹, smaller troughs at about 2850–3000 cm⁻¹, a very strong sharp trough at about 1650–1680 cm⁻¹, and many peaks below 1500 cm⁻¹ — from the original 2020 VCAA exam paper"
              className="w-full max-w-[560px]"
            />
          </div>
          <p className="mb-3 text-right text-[11.5px] text-gray-500 dark:text-gray-400">
            Data: SDBS Web, &lt;https://sdbs.db.aist.go.jp&gt;,
            <br />
            National Institute of Advanced Industrial Science and Technology
          </p>
          <p>Referring to the IR spectrum above, the compound could be</p>
        </>
      }
      options={[
        { letter: 'A', content: <Chem eq="CH3CH2COOCH3" /> },
        { letter: 'B', content: <Chem eq="CH3CH2CH2CHO" /> },
        { letter: 'C', content: <Chem eq="NH2CH2CH2CONH2" />, isAnswer: true },
        { letter: 'D', content: <Chem eq="NH2CH2CH2CHOHCH3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
