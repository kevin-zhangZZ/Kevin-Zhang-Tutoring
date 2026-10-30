// 2023 Chemistry Exam, MCQ 29. VCAA examination report: 46% correct. Interpreting a mass
// spectrum: molecular ion peak versus base peak, what causes the peaks, and the relative-intensity
// scale. Question text transcribed from the original paper. VCAA report only (no second source);
// the report's "parent molecule ion cation" is kept verbatim. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 23, C: 12, D: 46 },
  answer: 'D',
  comment: (
    <>
      In mass spectrometry molecules are ionised as result of bombardment with high-energy
      electrons. The positive ions produced are deflected in a magnetic field according to their
      m/z ratios.
      <br />
      The relative molecular mass of a compound is determined from the significant peak with
      highest m/z ratio.
      <br />
      The base peak is associated with the most abundant species formed during fragmentation / the
      base peak represents the most abundant fragment produced and the relative height of the peak
      at that m/z ratio is set at 100.
      <br />
      The base peak represents the most common fragment produced during the impact of the electron
      beam on the parent molecule ion cation. It can also be formed from fragments larger than
      itself.
      <br />
      The major peaks on a mass spectrum occur at the m/z ratios of the different fragments / ions
      produced in the mass spectrometer. The very small peaks, usually one m/z unit higher, may be
      associated with different isotopes.
      <br />
      The heights of peaks on the mass spectrum are all relative to the height of the base peak,
      which is set at 100.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        Molecule M is ionised: <Chem eq="M -> M+" /> (the <b>molecular ion</b>)
        <br />
        <Chem eq="M+" /> breaks up into positive <b>fragment ions</b> + neutral pieces
        <br />
        Each peak = a positive ion at its m/z; height = <b>relative abundance</b>
      </>
    ),
    reason: <>Only charged (positive) species are detected. The question asks which statement is <i>always</i> correct, so an option that is only sometimes true is wrong. (How the ions are made and deflected — the instrument itself — is no longer examined in the current study design; reading the spectrum is.)</>,
  },
  {
    working: <>A — relative molecular mass comes from the <b>molecular ion peak</b> (the significant peak with the highest m/z), not the base peak ✗</>,
    reason: <>The <b>base peak</b> is simply the <i>tallest</i> peak — the most abundant ion. It is the molecular ion only when the molecular ion happens to be the most abundant ion; usually it is a fragment with a smaller m/z, so A is not always correct.</>,
  },
  {
    working: <>B — the peaks are mainly caused by the <b>different fragment ions</b> ✗</>,
    reason: <>Isotopes account only for small extra peaks, usually one m/z unit above a main peak (e.g. the M+1 peak from molecules containing a ¹³C atom). Most peaks are different fragments, so B is not a correct description of the peaks.</>,
  },
  {
    working: <>C — the base peak is <b>not always</b> made by losing an uncharged piece ✗</>,
    reason: <>Often the base peak is a fragment ion: the molecular ion splits into a charged piece (detected) and an uncharged piece (lost, never detected). But sometimes nothing is removed at all — the base peak can be the molecular ion itself, made by removing an <i>electron</i> (charged) from the molecule — and, as the report notes, a fragment can also come from a larger fragment rather than straight from the molecule. So C is only sometimes true.</>,
  },
  {
    working: <>D — base peak set at <b>100</b>; every other peak&rsquo;s height is given <b>relative to it</b> ✓</>,
    reason: <>The vertical axis of every mass spectrum is relative abundance (or relative intensity): the tallest peak is defined as 100 and each other peak is a percentage of it. This is true of every spectrum, by definition.</>,
  },
  {
    working: <><b>The height of each peak is measured relative to the height of the base peak.</b></>,
    reason: <>Matches option <b>D</b>. Option <b>A</b> confuses the base peak (tallest) with the molecular ion peak (highest significant m/z). Option <b>B</b> gives the cause of only the small isotope peaks. Option <b>C</b> describes how most fragment ions form, but the base peak need not be a fragment at all.</>,
  },
]

export default function ChemistryQ29_2023() {
  return (
    <MCQShell
      question={<p>Which one of the following statements about mass spectrometry is always correct?</p>}
      options={[
        { letter: 'A', content: <>The relative molecular mass of a molecule is determined from the base peak.</> },
        { letter: 'B', content: <>The peaks in a mass spectrum are caused by the presence of different isotopes.</> },
        { letter: 'C', content: <>The base peak is formed when an uncharged species is removed from the molecule.</> },
        { letter: 'D', content: <>The height of each peak in the mass spectrum is measured relative to the height of the base peak.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
