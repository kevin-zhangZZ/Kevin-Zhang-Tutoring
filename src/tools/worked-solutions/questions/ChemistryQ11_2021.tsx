// 2021 Chemistry Exam, MCQ 11. VCAA examination report: 69% correct. Identifying an organic
// molecule (propan-2-ol) from a table of ¹³C NMR, ¹H NMR, mass spectrum and IR data. Question
// text transcribed from the original paper; the data table is transcribed as an HTML table and
// the four structural formulas (options) are cropped from the original VCAA exam PDF. VCAA
// report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optASrc from './chem-2021-mcq11-optA.png'
import optBSrc from './chem-2021-mcq11-optB.png'
import optCSrc from './chem-2021-mcq11-optC.png'
import optDSrc from './chem-2021-mcq11-optD.png'

const opt = (src: string, alt: string) => (
  <img loading="lazy" decoding="async" src={src} alt={`${alt} — from the original 2021 VCAA exam paper`} className="w-full max-w-[200px] bg-white rounded" />
)

const td = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 align-top'

const dataTable = (
  <table className="text-[13px] border border-gray-300 dark:border-gray-700 border-collapse">
    <tbody>
      <tr><td className={td}>number of peaks in <sup>13</sup>C NMR</td><td className={td}>2</td></tr>
      <tr><td className={td}>number of sets of peaks in <sup>1</sup>H NMR</td><td className={td}>3</td></tr>
      <tr><td className={td}>m/z of the last peak in the mass spectrum</td><td className={td}>60</td></tr>
      <tr><td className={td}>infra-red (IR) spectrum</td><td className={td}>an absorption peak appears at 3350 cm⁻¹</td></tr>
    </tbody>
  </table>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 69, C: 19, D: 2 },
  answer: 'B',
  comment: (
    <>
      Looking for the structure that exhibits all the spectroscopy properties provided.
      <div className="my-2">{dataTable}</div>
      Only propan-2-ol – Option B – has all four designated properties.
      <br />
      2-aminopropane – Option C – has <i>M</i><sub>r</sub> = 59.0.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Test each structure against all four pieces of data; the answer must pass <b>every</b> test.</>,
    reason: <>Each technique tells you something different: MS gives the molar mass, IR the bonds present, ¹³C NMR the number of carbon environments and ¹H NMR the number of hydrogen environments. Several options pass some tests — only one passes all four.</>,
  },
  {
    working: (
      <>
        Mass spectrum: last peak (molecular ion) m/z = 60, so <i>M</i> = 60 g mol⁻¹.
        <br />A: <Chem eq="C2H4O2" /> = 2(12.0) + 4(1.0) + 2(16.0) = 60.0 g mol⁻¹ ✓
        <br />B: <Chem eq="C3H8O" /> = 3(12.0) + 8(1.0) + 16.0 = 60.0 g mol⁻¹ ✓
        <br />C: <Chem eq="C3H9N" /> = 3(12.0) + 9(1.0) + 14.0 = 59.0 g mol⁻¹ ✗
        <br />D: <Chem eq="C3H6O" /> = 3(12.0) + 6(1.0) + 16.0 = 58.0 g mol⁻¹ ✗
      </>
    ),
    reason: <>The last (highest-m/z) peak is the molecular ion, M⁺, so its m/z equals the molar mass. Count the atoms in each structure; Data Book: C 12.0, H 1.0, N 14.0, O 16.0 g mol⁻¹. C and D are out.</>,
  },
  {
    working: <>IR: 3350 cm⁻¹ lies in the O–H (alcohols) range, 3200–3600 cm⁻¹, and also in the O–H (acids) range, 2500–3500 cm⁻¹. A and B both have an O–H bond ✓.</>,
    reason: <>Data Book, characteristic ranges for infrared absorption. (It would also fit N–H, 3300–3500 cm⁻¹, in C — but C has already failed on molar mass. D, a ketone, has no O–H or N–H.) This test doesn&rsquo;t separate A from B.</>,
  },
  {
    working: <>¹³C NMR, 2 peaks: A has <Chem eq="CH3" /> and COOH carbons → 2 ✓. B has two identical <Chem eq="CH3" /> carbons and one CH carbon → 2 ✓.</>,
    reason: <>Each peak is one carbon <i>environment</i>. In B the molecule is symmetrical about the middle carbon, so the two end <Chem eq="CH3" /> carbons are equivalent and give a single peak. Still no separation.</>,
  },
  {
    working: <>¹H NMR, 3 sets: A has <Chem eq="CH3" /> and O–H hydrogens → 2 sets ✗. B has 2 × <Chem eq="CH3" /> (6H), C–H (1H) and O–H (1H) → 3 sets ✓.</>,
    reason: <>Each set of peaks is one hydrogen environment. Hydrogens on equivalent carbons are equivalent (B&rsquo;s six methyl H are one set), but the H on the O is a different environment from the H on a carbon.</>,
  },
  {
    working: <b>B — propan-2-ol, <Chem eq="CH3CH(OH)CH3" /></b>,
    reason: <>Matches option <b>B</b>: the only structure that passes all four tests. Option <b>C</b> (19%), 2-aminopropane, passes the NMR and IR tests (two C environments; <Chem eq="CH3" />, CH and <Chem eq="NH2" /> H environments; an N–H stretch near 3350 cm⁻¹) but has <i>M</i> = 59.0 g mol⁻¹, not 60. Option <b>A</b> (10%), ethanoic acid, has <i>M</i> = 60.0 g mol⁻¹, two C environments and an O–H, but only two H environments. Option <b>D</b>, propanone, has <i>M</i> = 58.0 g mol⁻¹, one H environment and no O–H.</>,
  },
]

export default function ChemistryQ11_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The spectroscopy information for an organic molecule is given below.</p>
          <div className="mb-3">{dataTable}</div>
          <p>The organic molecule is</p>
        </>
      }
      options={[
        { letter: 'A', content: opt(optASrc, 'Structural formula of ethanoic acid, CH3COOH') },
        { letter: 'B', content: opt(optBSrc, 'Structural formula of propan-2-ol, CH3CH(OH)CH3'), isAnswer: true },
        { letter: 'C', content: opt(optCSrc, 'Structural formula of 2-aminopropane, CH3CH(NH2)CH3') },
        { letter: 'D', content: opt(optDSrc, 'Structural formula of propanone, CH3COCH3') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
