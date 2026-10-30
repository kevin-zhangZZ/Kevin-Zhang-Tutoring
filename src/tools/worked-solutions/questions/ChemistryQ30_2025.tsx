// 2025 Chemistry Exam, MCQ 30. VCAA examination report: 67% correct. Choosing the ¹³C NMR
// spectrum of pentan-3-one by counting carbon environments (symmetry) and checking for the ketone
// C=O shift. Question text transcribed from the original paper; the four spectra (options) are
// cropped from the original VCAA exam PDF. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optASrc from './chem-2025-mcq30-optA.png'
import optBSrc from './chem-2025-mcq30-optB.png'
import optCSrc from './chem-2025-mcq30-optC.png'
import optDSrc from './chem-2025-mcq30-optD.png'

const opt = (src: string, alt: string) => (
  <img loading="lazy" decoding="async" src={src} alt={`${alt} — from the original 2025 VCAA exam paper`} className="w-full max-w-[320px] bg-white rounded" />
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 67, B: 12, C: 14, D: 7 },
  answer: 'A',
  comment: (
    <>
      Pentan-3-one is a symmetrical ketone and so will have only three carbon signals present in a
      ¹³C NMR spectrum.
      <br />
      Being a ketone, one of these must be found in the region of 205–220 ppm on the spectrum.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Pentan-3-one: CH₃–CH₂–CO–CH₂–CH₃ (five carbons, C=O on carbon 3)</>,
    reason: <>&lsquo;Pent-&rsquo; = 5 carbons, &lsquo;-3-one&rsquo; = ketone C=O on the middle carbon, so the molecule is <b>symmetrical</b> about C3.</>,
  },
  {
    working: (
      <>
        Carbon environments:
        <br />
        C1 and C5 (CH₃) — equivalent
        <br />
        C2 and C4 (CH₂) — equivalent
        <br />
        C3 (C=O) — unique
        <br />
        → <b>3 signals</b>
      </>
    ),
    reason: <>In a ¹³C NMR spectrum, the number of signals = the number of <b>different carbon environments</b>. Carbons that swap places under the molecule&rsquo;s symmetry are in the same environment and give one signal.</>,
  },
  {
    working: (
      <>
        Expected shifts:
        <br />
        C=O (R₂C=O): 205–220 ppm
        <br />
        CH₂ (R–CH₂–R): 20–45 ppm
        <br />
        CH₃ (R–CH₃): 8–25 ppm
      </>
    ),
    reason: <>Data Book, &lsquo;¹³C-NMR data&rsquo; (item 22 in the 2026 Data Book). The ketone carbon is the giveaway: a signal in 205–220 ppm.</>,
  },
  {
    working: <>A: 3 signals, ≈ 211, 35 and 8 ppm — one in 205–220 ppm ✓, three environments ✓</>,
    reason: <>Fits pentan-3-one exactly. Peak heights in ¹³C NMR are not used to count carbons, so the short C=O peak doesn&rsquo;t matter.</>,
  },
  {
    working: <>B: 3 signals, ≈ 64, 26 and 10 ppm — nothing in 205–220 ppm ✗</>,
    reason: <>Right number of environments but no ketone carbon. The 64 ppm signal fits R–CH₂–OH (50–90 ppm): an alcohol, not a ketone.</>,
  },
  {
    working: <>C: 5 signals, ≈ 209, 45, 30, 17 and 14 ppm — has the C=O signal, but 5 environments ✗</>,
    reason: <>A ketone whose five carbons are all different — an <b>unsymmetrical</b> ketone such as pentan-2-one, not pentan-3-one.</>,
  },
  {
    working: <>D: 5 signals, ≈ 62, 32, 28, 22 and 14 ppm — no C=O signal and 5 environments ✗</>,
    reason: <>Fails both tests; the 62 ppm signal again fits R–CH₂–OH, an alcohol.</>,
  },
  {
    working: <b>Spectrum A: three signals, one at about 211 ppm.</b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b>, chosen by 14%, has the ketone signal but counts all five carbons as different, missing the symmetry; option <b>B</b> has three signals but no C=O carbon.</>,
  },
]

export default function ChemistryQ30_2025() {
  return (
    <MCQShell
      question={
        <>
          <p>Which one of the following shows the ¹³C NMR spectrum of pentan-3-one, C₅H₁₀O?</p>
          <p className="mt-2 text-right text-[11.5px] text-gray-500 dark:text-gray-400">
            Data: ChemicalBook, &lt;www.chemicalbook.com&gt;
          </p>
        </>
      }
      options={[
        { letter: 'A', content: opt(optASrc, '13C NMR spectrum with three signals, at about 211, 35 and 8 ppm'), isAnswer: true },
        { letter: 'B', content: opt(optBSrc, '13C NMR spectrum with three signals, at about 64, 26 and 10 ppm') },
        { letter: 'C', content: opt(optCSrc, '13C NMR spectrum with five signals, at about 209, 45, 30, 17 and 14 ppm') },
        { letter: 'D', content: opt(optDSrc, '13C NMR spectrum with five signals, at about 62, 32, 28, 22 and 14 ppm') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
