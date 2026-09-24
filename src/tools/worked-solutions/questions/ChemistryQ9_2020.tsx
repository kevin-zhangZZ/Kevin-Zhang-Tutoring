// 2020 Chemistry Exam, MCQ 9. VCAA examination report: 28% correct. Calculating a solution
// calorimeter's calibration factor from an electrical calibration graph, using the plateau
// temperature rather than the reading at the moment the current stopped. Question text
// transcribed from the original paper; the graph is cropped directly from the original VCAA
// exam PDF, not a redrawing. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './chem-2020-mcq9-calibration-graph.png'
import reportGraphSrc from './chem-2020-mcq9-report-graph.png'

const GRAPH = <img src={graphSrc} alt="Graph of temperature versus time during electrical calibration of the solution calorimeter, plateauing at 21.2 °C, from the original 2020 VCAA exam paper" className="w-full max-w-[420px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 28, C: 29, D: 35 },
  answer: 'B',
  comment: (
    <>
      <img src={reportGraphSrc} alt="The report's copy of the calibration graph with a dashed line marking the maximum temperature, 21.2 °C" className="w-full max-w-[360px] mt-1" />
      According to the temperature v. time graph, the temperature is approximately 21.1 °C when the
      current was stopped at 240 seconds (after being applied for 180 seconds).
      <br />
      However, the temperature continues to rise to 21.2 °C – a more accurate indicator of the
      thermal energy generated from the current flow.
      <br />
      Calibration Factor = Electrical Energy / Change in temperature = <i>VIt</i> / Δ<i>T</i> = 5.4 x
      2.7 x 180 / (21.2 – 18.0) = 2624 J / 3.2 °C = 820 J °C⁻¹
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
    working: <>Read the graph: the current runs from 60 s to 240 s.</>,
    reason: <>Current was applied from 60 s to 240 s; the temperature keeps <i>rising</i> after 240 s before finally levelling off at 21.2 °C — heat takes time to fully mix through the water.</>,
  },
  {
    working: <Chem eq="Calibration factor = Electrical Energy / Change in temperature = VIt / T" />,
    reason: <>Formula relating the known electrical energy input to the resulting temperature rise.</>,
  },
  {
    working: <Chem eq="T = 21.2 - 18.0 = 3.2" className="mr-1" />,
    reason: <>Use the true plateau temperature (21.2 °C), <i>not</i> the ≈21.1 °C reading right when the current stopped — the system hadn't finished equilibrating yet.</>,
  },
  {
    working: (
      <>
        <span className="block">Calibration factor = (5.4 × 2.7 × 180) / 3.2</span>
        <span className="block">= 2624 J / 3.2 °C</span>
      </>
    ),
    reason: <>Substitute <Chem eq="V=5.4" /> V, <Chem eq="I=2.7" /> A, <Chem eq="t=180" /> s.</>,
  },
  {
    working: <b>= 820 J °C⁻¹</b>,
    reason: <>Matches option <b>B</b>. Option <b>C</b>, 847 J °C⁻¹, uses Δ<i>T</i> = 3.1 °C, the reading when the current stopped; option <b>D</b>, 875 J °C⁻¹, uses Δ<i>T</i> = 3.0 °C, an inaccurate reading of the graph (both as the report says).</>,
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
