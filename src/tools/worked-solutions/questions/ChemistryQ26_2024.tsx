// 2024 Chemistry Exam, MCQ 26. VCAA examination report: 63% correct. Using a calibration curve
// of hexane standards, run through the same HPLC column under the same conditions, to find the
// concentration of hexane in a mixture. Question text transcribed from the original paper
// (rendered from page images — the 2024 exam PDF has no extractable text), including the shared
// stem for Questions 25 and 26. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 63, B: 11, C: 21, D: 4 },
  answer: 'A',
  comment: (
    <>
      Using a series of known concentration solutions and establishing a calibration curve is the
      most common method used to accurately determine the concentration of an unknown material in
      an HPLC trace.
      <br />
      Using published data is not a valid technique as each HPLC set-up will have unique
      responses, which is why individually prepared calibration curves must be used.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Retention time identifies <b>which</b> compound a peak is; the peak <b>area</b> (or height) tells <b>how much</b> of it is present.</>,
    reason: <>These are the two pieces of information an HPLC chromatogram gives. A concentration question is about peak area, not retention time.</>,
  },
  {
    working: <>Peak area is proportional to concentration, but the constant of proportionality is unknown — it depends on the particular column, mobile phase, flow rate, temperature and detector.</>,
    reason: <>So one peak area on its own can&rsquo;t be turned into a concentration. It has to be compared with peak areas of hexane samples of <b>known</b> concentration, measured on the <b>same</b> set-up.</>,
  },
  {
    working: (
      <>
        1. Run several hexane standards of known concentration under the same conditions.
        <br />
        2. Plot peak area against concentration: the <b>calibration curve</b>.
        <br />
        3. Run the mixture, measure the hexane peak area and read its concentration off the curve.
      </>
    ),
    reason: <>This is the calibration-curve method the study design names for finding the concentration of an organic compound by HPLC. &ldquo;Under the same conditions&rdquo; is essential: change anything and the area–concentration relationship changes.</>,
  },
  {
    working: <b>Run a series of known concentrations of hexane through the column under the same conditions.</b>,
    reason: (
      <>
        Matches option <b>A</b>. Option <b>C</b> (21%) uses published standard chromatograms, but
        peak sizes from someone else&rsquo;s instrument and conditions don&rsquo;t apply to this
        column, as the report notes. Option <b>B</b> swaps the polarity of the phases: that only
        changes the order and retention times of the peaks (Question 25), not how peak area relates
        to concentration. Option <b>D</b> might improve separation, but better-separated peaks still
        give no concentration without standards to compare against.
      </>
    ),
  },
]

export default function ChemistryQ26_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 25 and 26.</p>
          <p className="mb-3 italic">
            A chemist runs a mixture of hexane, hexan-1-ol and hexan-2-one through a
            high-performance liquid chromatography (HPLC) column using a polar mobile phase and a
            non-polar stationary phase.
          </p>
          <p className="mb-2">The chemist wants to determine the concentration of hexane in the mixture.</p>
          <p>
            Which one of the following will provide information to allow the hexane concentration
            to be accurately calculated?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'running a series of known concentrations of hexane through the HPLC column under the same conditions', isAnswer: true },
        { letter: 'B', content: 'running the HPLC experiment using a non-polar mobile phase and a polar stationary phase' },
        { letter: 'C', content: 'using published retention times and peak sizes of standard hexane chromatographs' },
        { letter: 'D', content: 'reducing the HPLC column temperature to achieve better separation of the compounds' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
