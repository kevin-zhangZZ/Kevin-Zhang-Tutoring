// 2020 Chemistry Exam, MCQ 9. VCAA examination report: 28% correct. Calculating a solution
// calorimeter's calibration factor from an electrical calibration graph, using the plateau
// temperature rather than the reading at the moment the current stopped. Question text
// transcribed from the original paper; the graph is cropped directly from the original VCAA
// exam PDF, not a redrawing. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './chem-2020-mcq9-calibration-graph.png'
import reportGraphSrc from './chem-2020-mcq9-report-graph.png'

const GRAPH = <img loading="lazy" decoding="async" src={graphSrc} alt="Graph of temperature versus time during electrical calibration of the solution calorimeter, plateauing at 21.2 °C, from the original 2020 VCAA exam paper" className="w-full max-w-[420px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 28, C: 29, D: 35 },
  answer: 'B',
  comment: (
    <>
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's copy of the calibration graph with a dashed line marking the maximum temperature, 21.2 °C" className="w-full max-w-[360px] mt-1" />
      According to the temperature v. time graph, the temperature is approximately 21.1 °C when the
      current was stopped at 240 seconds (after being applied for 180 seconds).
      <br />
      However, the temperature continues to rise to 21.2 °C – a more accurate indicator of the
      thermal energy generated from the current flow.
      <br />
      Calibration Factor = Electrical Energy / Change in temperature
      <br />
      = <i>VIt</i> / Δ<i>T</i>
      <br />
      = 5.4 x 2.7 x 180 / (21.2 – 18.0)
      <br />
      = 2624 J / 3.2 °C
      <br />
      = 820 J °C⁻¹
      <br />
      This calibration factor is higher than the true value because it does not allow for energy loss
      due to the quality of the insulation.
      <br />
      This is a better value for the calibration factor than that which would be determined using
      Δ<i>T</i> = 3.1 °C (consistent with T when current is stopped), i.e. 847 J °C⁻¹ (option C).
      <br />
      Option D is consistent with Δ<i>T</i> = 3.0 °C, which is an inaccurate reading of the
      temperature.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Calibration factor: CF = <i>E</i> / Δ<i>T</i>, where <i>E</i> = <i>VIt</i></>,
    reason: <>The calibration factor is the energy needed to raise the calorimeter&rsquo;s temperature by 1 °C. In electrical calibration a known amount of electrical energy, <i>E</i> = <i>VIt</i> (Data Book), is put in and the temperature rise it causes is measured. The 350 mL of water is not needed — the calibration factor already includes the water and the calorimeter.</>,
  },
  {
    working: (
      <>
        <span className="block"><i>E</i> = <i>VIt</i></span>
        <span className="block"><i>E</i> = 5.4 V × 2.7 A × 180 s</span>
        <span className="block"><i>E</i> = 2624.4 J</span>
      </>
    ),
    reason: <><i>t</i> is the time the current flowed, 180 s (from 60 s to 240 s) — not 240 s or 300 s read off the time axis.</>,
  },
  {
    working: (
      <>
        <span className="block">Δ<i>T</i> = <i>T</i><sub>max</sub> − <i>T</i><sub>initial</sub></span>
        <span className="block">Δ<i>T</i> = 21.2 °C − 18.0 °C</span>
        <span className="block">Δ<i>T</i> = 3.2 °C</span>
      </>
    ),
    reason: <>The temperature keeps <i>rising</i> after the current stops at 240 s (≈21.1 °C) and peaks at 21.2 °C at about 255–270 s: the heat takes time to spread evenly through the water. Use the <b>maximum</b> temperature, 21.2 °C, not the reading when the current stopped. After the peak the temperature falls slowly as heat is lost to the surroundings.</>,
  },
  {
    working: (
      <>
        <span className="block">CF = <i>E</i> / Δ<i>T</i></span>
        <span className="block">CF = 2624.4 J / 3.2 °C</span>
        <span className="block">CF = 820.1 J °C⁻¹</span>
      </>
    ),
    reason: <>Units: joules per degree Celsius, J °C⁻¹.</>,
  },
  {
    working: <b>CF ≈ 820 J °C⁻¹ (8.2 × 10² J °C⁻¹)</b>,
    reason: <>Matches option <b>B</b>. Two significant figures, set by 5.4 V, 2.7 A and 3.2 °C. Option <b>C</b>, 847 J °C⁻¹, uses Δ<i>T</i> = 3.1 °C, the reading when the current stopped; option <b>D</b>, 875 J °C⁻¹, uses Δ<i>T</i> = 3.0 °C, an inaccurate reading of the graph (both as the report says). Option <b>A</b>, 125 J °C⁻¹, is 2624.4 J divided by the final temperature, 21 °C, instead of the temperature <i>change</i>.</>,
  },
]

export default function ChemistryQ9_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 9 and 10.</p>
          <p className="mb-2">
            A solution calorimeter containing 350 mL of water was set up. The calorimeter was
            calibrated electrically and the graph of the results is shown below.
          </p>
          <p className="mb-1 text-center font-semibold text-[13px]">
            Graph of temperature versus time during electrical calibration of solution calorimeter
          </p>
          <div className="mb-2 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">{GRAPH}</div>
          <p className="mb-2">
            The calorimeter was calibrated using a current of 2.7 A, starting at 60 s. The current
            was applied for 180 s and the applied voltage was 5.4 V.
          </p>
          <p>What is the calibration factor for this calorimeter?</p>
        </>
      }
      options={[
        { letter: 'A', content: '125 J °C⁻¹' },
        { letter: 'B', content: '820 J °C⁻¹', isAnswer: true },
        { letter: 'C', content: '847 J °C⁻¹' },
        { letter: 'D', content: '875 J °C⁻¹' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
