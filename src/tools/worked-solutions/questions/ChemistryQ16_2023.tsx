// 2023 Chemistry Exam, MCQ 16. VCAA examination report: 43% correct. Counting the carbon
// environments (¹³C NMR peaks) in an ester, 1-methylethyl 2-methylbutanoate, by spotting the two
// equivalent methyl groups of the isopropyl group. Question text transcribed from the original
// paper; the skeletal structure is cropped from the original VCAA exam PDF and the report's
// numbered structure from the 2023 VCAA examination report. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import moleculeSrc from './chem-2023-mcq16-molecule.png'
import reportSrc from './chem-2023-mcq16-report-structure.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 21, B: 23, C: 43, D: 12 },
  answer: 'C',
  comment: (
    <>
      <Chem eq="CH3CH2CH(CH3)COOCH(CH3)2" />
      <br />
      There are seven different carbon environments.
      <br />
      <img
        loading="lazy"
        decoding="async"
        src={reportSrc}
        alt="The report's skeletal structure with each carbon numbered by environment: 7 (CH3 at the end of the ethyl group), 6 (CH2), 5 (CH), 4 (the CH3 branch), 3 (C=O), 2 (the O–CH) and 1 on both CH3 groups of the isopropyl group — from the 2023 VCAA examination report"
        className="w-full max-w-[360px] mt-1 bg-white rounded"
      />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Number of peaks in a ¹³C NMR spectrum = number of <b>different carbon environments</b>.</>,
    reason: (
      <>
        Carbons that are in identical surroundings — related by the molecule&rsquo;s symmetry, so
        that swapping them gives the same molecule — absorb at the same chemical shift and give{' '}
        <b>one</b> peak. Every carbon in a different position gives its own peak.
        <Background title="Reading a skeletal structure">
          Every corner and every line end is a carbon atom; hydrogens on carbon are not drawn
          (each carbon has enough H to make four bonds). Heteroatoms such as O are written in.
        </Background>
      </>
    ),
  },
  {
    working: (
      <>
        Condensed formula: <Chem eq="CH3CH2CH(CH3)COOCH(CH3)2" />
        <br />
        Total carbons = 5 (acid side: CH₃, CH₂, CH, CH₃ branch, C=O) + 3 (isopropyl side: CH, 2 × CH₃) = <b>8 C</b>
      </>
    ),
    reason: <>Count every carbon first, so none is missed. The molecule is an <b>ester</b>: the C=O carbon is joined to an O, which is joined to the isopropyl group.</>,
  },
  {
    working: (
      <>
        Acid side: CH₃ (end of ethyl) · CH₂ · CH · CH₃ (branch) · C=O → <b>5 environments</b>
      </>
    ),
    reason: <>The two CH₃ groups on this side are <i>not</i> equivalent: one is bonded to the CH₂, the other directly to the CH next to the C=O. Different neighbours ⇒ different environments.</>,
  },
  {
    working: (
      <>
        Isopropyl side, –O–CH(CH₃)₂: O–CH · 2 × CH₃ (identical) → <b>2 environments</b>
      </>
    ),
    reason: <>The two CH₃ groups are both bonded to the same O–CH carbon, so they are interchangeable — the same environment, one peak.</>,
  },
  {
    working: (
      <>
        Total environments = 5 + 2 = 7
        <br />
        <span className="font-semibold">7 peaks</span>
      </>
    ),
    reason: <>Matches option <b>C</b>. Option <b>D</b>, 8, counts every carbon separately, missing that the two isopropyl CH₃ groups are equivalent. Option <b>B</b>, 6, also merges the two CH₃ groups on the acid side (the end of the ethyl group and the branch) — but they have different neighbours. Option <b>A</b>, 5, treats <i>every</i> CH₃ as the same environment: CH₃, CH₂, CH, C=O and O–CH. A carbon&rsquo;s environment depends on what it is bonded to, not just on being &ldquo;a CH₃&rdquo;.</>,
  },
]

export default function ChemistryQ16_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following molecule.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={moleculeSrc}
              alt="Skeletal structure of an ester: an ethyl group on a CH that carries a methyl branch, bonded to a C=O; the C=O carbon is bonded to an O, which is bonded to an isopropyl group CH(CH3)2 — from the original 2023 VCAA exam paper"
              className="w-full max-w-[240px]"
            />
          </div>
          <p>How many peaks will be observed in a ¹³C NMR spectrum of this molecule?</p>
        </>
      }
      options={[
        { letter: 'A', content: '5' },
        { letter: 'B', content: '6' },
        { letter: 'C', content: '7', isAnswer: true },
        { letter: 'D', content: '8' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
