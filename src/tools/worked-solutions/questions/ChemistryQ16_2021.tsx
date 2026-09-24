// 2021 Chemistry Exam, MCQ 16. VCAA examination report: 15% correct. Which statement about IR
// spectroscopy is correct, by elimination against genuine facts about NMR and IR. Question text
// transcribed from the original paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 25, C: 15, D: 38 },
  answer: 'C',
  comment: (
    <>
      A. It is in NMR spectroscopy that the spin state of the nucleons is altered by the absorption
      of radio wave radiation.
      <br />
      B. Bond wave number is determined by bond strength and the masses of the atoms involved in
      the bond.
      <br />
      C. Every pure compound has a unique fingerprint region on its IR spectrum. So, the purity of
      the sample can be assessed qualitatively by comparing the fingerprint region of the IR
      spectrum of that sample with the fingerprint region of the IR spectrum of the pure compound.
      <br />
      D. High absorption of radiation at a particular wave number in IR spectroscopy means less
      transmittance of radiation at that wave number. So high transmittance is the result of low
      absorption.
      <br />
      Performance on this question suggests that students were not familiar with the use of IR
      spectra in qualitative analysis, the relationship between wave number and atomic mass, and
      the link between NMR and spin states.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A: it's <b>NMR</b> spectroscopy — not IR — where absorbed radio-wave radiation flips the spin state of nucleons (protons). IR radiation instead makes bonds stretch and bend.</>,
    reason: <>Ruled out — mixes up the two techniques.</>,
  },
  {
    working: <>B: bond wave number depends on <i>both</i> bond strength <b>and</b> the masses of the atoms in the bond, not strength alone.</>,
    reason: <>Ruled out — omits the mass dependence.</>,
  },
  {
    working: <>C: the fingerprint region (roughly 1500–500 cm⁻¹) of an IR spectrum is essentially unique to each pure compound — comparing a sample's fingerprint region against a known pure compound's is a standard qualitative purity check.</>,
    reason: <>Correct — this is a standard qualitative check of purity.</>,
  },
  {
    working: <>D: high absorption at a wave number means <i>less</i> radiation gets through — that's <b>low</b> transmittance, not high.</>,
    reason: <>Ruled out — gets absorption and transmittance backwards.</>,
  },
  {
    working: <b>Only the fingerprint-region purity check is a correct statement.</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b>, the most popular answer, reverses absorption and transmittance; option <b>B</b> leaves out the masses of the atoms; option <b>A</b> describes NMR, not IR.</>,
  },
]

export default function ChemistryQ16_2021() {
  return (
    <MCQShell
      question={<p>Which one of the following statements about IR spectroscopy is correct?</p>}
      options={[
        { letter: 'A', content: 'IR radiation changes the spin state of electrons.' },
        { letter: 'B', content: 'Bond wave number is influenced only by bond strength.' },
        { letter: 'C', content: 'An IR spectrum can be used to determine the purity of a sample.', isAnswer: true },
        { letter: 'D', content: 'In an IR spectrum, high transmittance corresponds to high absorption.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
