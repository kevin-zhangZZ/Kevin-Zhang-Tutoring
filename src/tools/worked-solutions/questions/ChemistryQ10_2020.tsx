// 2020 Chemistry Exam, MCQ 10. VCAA examination report: 26% correct. What is true of a solution
// calorimeter, by elimination against what's actually true of bomb calorimeters. Question text
// transcribed from the original paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './chem-2020-mcq9-calibration-graph.png'

const GRAPH = <img src={graphSrc} alt="Graph of temperature versus time during electrical calibration of the solution calorimeter: 18.0 °C until 60 s, rising to a maximum of 21.2 °C at about 255–270 s, then falling slightly — from the original 2020 VCAA exam paper" className="w-full max-w-[420px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 16, C: 54, D: 26 },
  answer: 'D',
  comment: (
    <>
      Option A: Incorrect. Heat loss is evident on the graph, as the temperature drops from 21.2 °C.
      <br />
      Option B: Incorrect. Solution calorimeters are not suitable for the combustion reactions
      associated with bomb calorimetry.
      <br />
      Option C: Incorrect. Both types of calorimeters can be calibrated using chemical reactions with
      known heats of reaction.
      <br />
      Option D: Correct. Answers the question best in the sense that, in both types of calorimeter,
      it measures temperature changes that reflect the energy changes occurring during calibration
      or during the reaction under investigation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A: the temperature graph itself shows heat loss — the temperature <b>drops</b> back down slightly from its 21.2 °C peak.</>,
    reason: <>Ruled out — no calorimeter is perfectly insulated.</>,
  },
  {
    working: <>B: solution calorimeters aren't suitable for the combustion reactions bomb calorimetry is built for — combustion needs a sealed, pressurised environment (a "bomb"), which an open solution calorimeter doesn't provide.</>,
    reason: <>Ruled out.</>,
  },
  {
    working: <>C: both types of calorimeter <i>can</i> be calibrated either electrically or using a reaction with a known heat of reaction — calibration isn't restricted to one method.</>,
    reason: <>Ruled out — this restricts calibration more than is actually true.</>,
  },
  {
    working: <>D: whichever type of calorimeter is used, and whatever it's measuring (a calibration or the actual reaction of interest), the underlying principle is the same — a measured temperature change is used to infer an energy change.</>,
    reason: <>This is the one thing genuinely common to both designs.</>,
  },
  {
    working: <b>Both types share the same core principle: temperature change reflects energy change.</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b>, chosen by more than half, is too restrictive: both kinds of calorimeter can also be calibrated with a reaction of known heat of reaction.</>,
  },
]

export default function ChemistryQ10_2020() {
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
          <p>This type of calorimeter</p>
        </>
      }
      options={[
        { letter: 'A', content: 'has no heat loss.' },
        { letter: 'B', content: 'can be used for bomb calorimetry.' },
        { letter: 'C', content: 'requires electrical calibration in order to determine the calibration factor.' },
        { letter: 'D', content: 'measures energy changes that can be measured in a bomb calorimeter.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
