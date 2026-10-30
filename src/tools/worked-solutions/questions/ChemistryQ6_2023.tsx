// 2023 Chemistry Exam, MCQ 6. VCAA examination report: 43% correct. Deciding which of three
// statements apply to high-performance liquid chromatography (HPLC): qualitative (retention
// times identify components), quantitative (peak areas measure amounts), and the NMR-only idea
// of triplets. Question text transcribed from the original paper (no figures). Source: VCAA
// report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 30, C: 43, D: 10 },
  answer: 'C',
  comment: (
    <>
      HPLC is qualitative in that comparing retention times with those of standard samples enables
      the possible identification of the components of a mixture.
      <br />
      HPLC is quantitative in that relative areas under peaks are used to calculate the percentage
      of each component in the mixture.
      <br />
      Triplets are associated with ¹H NMR spectroscopy.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A <b>qualitative</b> analysis tells you <i>what</i> is present; a <b>quantitative</b> analysis tells you <i>how much</i> is present. Test each statement against what an HPLC chromatogram actually shows.</>,
    reason: <>An HPLC chromatogram has two features to read: <b>where</b> each peak is (its retention time) and <b>how big</b> each peak is (its area).</>,
  },
  {
    working: <>I: each component has a characteristic <b>retention time</b> under fixed conditions (same column, mobile phase, flow rate and temperature). Matching a peak&rsquo;s retention time to that of a <b>standard</b> (a pure sample of a known compound) identifies the component.</>,
    reason: <>Identifying <i>what</i> is in the mixture is a qualitative use. Statement I is <b>true</b>.</>,
  },
  {
    working: <>II: the <b>area under a peak</b> is proportional to the amount of that component. Comparing peak areas gives each component&rsquo;s percentage, and a <b>calibration curve</b> (peak area against concentration for standards of known concentration) gives its concentration.</>,
    reason: <>Measuring <i>how much</i> is present is a quantitative use. Statement II is <b>true</b>.</>,
  },
  {
    working: <>III: a <b>triplet</b> is a peak split into three lines in a high-resolution ¹H NMR spectrum (by the <i>n</i> + 1 rule, the H atoms have 2 neighbouring H atoms). It gives information about molecular structure, but it is an <b>NMR</b> feature, not an HPLC one.</>,
    reason: <>The statement is true of ¹H NMR, but HPLC peaks are never split into triplets. Statement III does <b>not apply</b> to HPLC.</>,
  },
  {
    working: <b>Statements I and II only apply to HPLC.</b>,
    reason: <>Matches option <b>C</b>. Option <b>B</b> (II only), chosen by 30%, leaves out the qualitative use: identifying components by comparing retention times with standards. Option <b>A</b> (I only) leaves out the quantitative use of peak areas. Option <b>D</b> wrongly carries triplets, an ¹H NMR idea, over to HPLC.</>,
  },
]

export default function ChemistryQ6_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following statements.</p>
          <div className="flex flex-col gap-1 mb-2">
            <span>I. HPLC is a qualitative process.</span>
            <span>II. HPLC is a quantitative process.</span>
            <span>III. Triplets give information about molecule structure.</span>
          </div>
          <p>Which of the above statements apply to high-performance liquid chromatography (HPLC)?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'I only' },
        { letter: 'B', content: 'II only' },
        { letter: 'C', content: 'I and II only', isAnswer: true },
        { letter: 'D', content: 'I, II and III' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
