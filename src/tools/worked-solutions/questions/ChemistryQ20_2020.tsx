// 2020 Chemistry Exam, MCQ 20. VCAA examination report: 47% correct. HPLC with a polar
// stationary phase and non-polar mobile phase: which changes to the operating parameters reduce
// the retention time of a (polar) sugar. Question text transcribed from the original paper. The
// report's comment on II says "a more tightly packed mobile phase" — a slip for stationary phase;
// kept verbatim and explained in the working. Statements I and II concern HPLC operation, which
// the current study design excludes ("excluding features of instrumentation and operation") — a
// note says so. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 47, C: 15, D: 18 },
  answer: 'B',
  noAnswer: 0,
  comment: (
    <>
      I – decreasing the viscosity of the mobile phase will enable it to move through the column
      more quickly; this will reduce retention time.
      <br />
      II – a more tightly packed mobile phase will make it more difficult for the mobile phase to
      move through the column; this will increase retention time.
      <br />
      III – since sugar molecules are polar (due to the presence of O-H groups), they will be
      strongly attracted to a more polar mobile phase and elute more quickly; this reduces
      retention time.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Retention time = time for a component to travel through the column to the detector.</>,
    reason: <>It is <b>shorter</b> when the mobile phase flows faster, or when the component spends more of its time dissolved in the mobile phase and less time adsorbed onto the stationary phase.</>,
  },
  {
    working: <>Sugar: many <b>O–H</b> groups ⇒ highly <b>polar</b>, can hydrogen bond.</>,
    reason: <>So with the original set-up (polar stationary phase, non-polar mobile phase) the sugar is strongly attracted to the stationary phase and has a long retention time.</>,
  },
  {
    working: <>I — lower viscosity ⇒ mobile phase flows through the column more quickly ⇒ retention time <b>decreases</b>. ✓</>,
    reason: <>A less viscous (&ldquo;thinner&rdquo;) liquid meets less resistance as it is pumped through the packed column, so it carries the sugar to the detector sooner.</>,
  },
  {
    working: <>II — more tightly packed stationary phase ⇒ mobile phase flows more slowly, and there is more stationary-phase surface for the sugar to adsorb to ⇒ retention time <b>increases</b>. ✗</>,
    reason: <>The report&rsquo;s comment on II says &ldquo;a more tightly packed mobile phase&rdquo; — a slip for <i>stationary</i> phase (the packing is the stationary phase); its conclusion, that retention time increases, is right.</>,
  },
  {
    working: <>III — mobile phase more polar than the stationary phase ⇒ the polar sugar is now more strongly attracted to the mobile phase ⇒ spends more time in it ⇒ retention time <b>decreases</b>. ✓</>,
    reason: <>&ldquo;Like attracts like&rdquo;: a polar component is carried along by a polar mobile phase.</>,
  },
  {
    working: <b>I and III only</b>,
    reason: <>Matches option <b>B</b>. Option <b>A</b> (20%) misses III, and option <b>C</b> misses I — each reduces the retention time on its own. Option <b>D</b> includes II, but tighter packing slows the sugar down rather than speeding it up.</>,
  },
]

export default function ChemistryQ20_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Consider the following changes that could be applied to the operating parameters for a
            chromatogram set up to carry out high-performance liquid chromatography (HPLC) with a
            polar stationary phase and a non-polar mobile phase:
          </p>
          <div className="mb-3 flex flex-col gap-1">
            <div className="flex gap-4"><span className="w-6">I</span><span>decreasing the viscosity of the mobile phase</span></div>
            <div className="flex gap-4"><span className="w-6">II</span><span>using a more tightly packed stationary phase</span></div>
            <div className="flex gap-4"><span className="w-6">III</span><span>using a mobile phase that is more polar than the stationary phase</span></div>
          </div>
          <p>Which of the changes would be most likely to reduce the retention time of a sugar in the HPLC?</p>
        </>
      }
      background={
        <Background title="Study design note">
          HPLC is on the current study design, but only its principles — retention times and
          calibration curves, &ldquo;excluding features of instrumentation and operation&rdquo;.
          Statement III (polarity of the phases) is examinable today; statements I and II (mobile
          phase viscosity, packing of the column) are operating details that a current exam is
          unlikely to ask about. The reasoning is still worth knowing.
        </Background>
      }
      options={[
        { letter: 'A', content: 'I only' },
        { letter: 'B', content: 'I and III only', isAnswer: true },
        { letter: 'C', content: 'III only' },
        { letter: 'D', content: 'II and III only' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
