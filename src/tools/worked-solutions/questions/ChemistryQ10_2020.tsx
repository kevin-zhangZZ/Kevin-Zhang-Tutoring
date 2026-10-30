// 2020 Chemistry Exam, MCQ 10. VCAA examination report: 26% correct. What is true of a solution
// calorimeter, by elimination against what's actually true of bomb calorimeters (bomb
// calorimetry is not named in the current study design — borderline, kept). Question text
// transcribed from the original paper; the graph is cropped from the original VCAA exam PDF.
// VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './chem-2020-mcq9-calibration-graph.png'

const GRAPH = <img loading="lazy" decoding="async" src={graphSrc} alt="Graph of temperature versus time during electrical calibration of the solution calorimeter: 18.0 °C until 60 s, rising to a maximum of 21.2 °C at about 255–270 s, then falling slightly — from the original 2020 VCAA exam paper" className="w-full max-w-[420px]" />

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
    working: <>Solution calorimeter: an insulated container of water in which a reaction in solution (dissolving, neutralisation) changes the temperature.<br />Bomb calorimeter: a sealed steel &ldquo;bomb&rdquo; filled with oxygen under pressure, sitting in water, in which a substance is burnt.</>,
    reason: <>Both work the same way: the energy released or absorbed changes the temperature of the water, and energy = CF × Δ<i>T</i>. (Bomb calorimetry is not named in the current study design, which covers solution calorimetry — but the question can be answered by testing each option against the graph and the principle.)</>,
  },
  {
    working: <>A: the graph shows heat loss ✗.</>,
    reason: <>After its peak of 21.2 °C the temperature <b>drops</b> (to about 21.0 °C by 300 s), even though no more energy is being added. No calorimeter is perfectly insulated.</>,
  },
  {
    working: <>B: a solution calorimeter cannot be used for bomb calorimetry ✗.</>,
    reason: <>Bomb calorimetry means combustion — burning a fuel or food in excess O₂ inside a sealed, pressurised vessel. An open, insulated cup of water cannot contain a combustion reaction.</>,
  },
  {
    working: <>C: electrical calibration is <b>not required</b> ✗.</>,
    reason: <>Electrical calibration is one way to find CF, not the only one. A calorimeter can also be calibrated with a chemical reaction whose heat of reaction is known: the known energy released divided by the measured Δ<i>T</i> gives CF. The word &ldquo;requires&rdquo; makes the statement false.</>,
  },
  {
    working: <>D: both types measure energy changes through a temperature change ✓.</>,
    reason: <>Whether it is being calibrated or used for the reaction under investigation, each calorimeter measures a temperature change that reflects an energy change — the same kind of quantity (energy, in J or kJ) that a bomb calorimeter measures.</>,
  },
  {
    working: <b>The solution calorimeter measures energy changes, as a bomb calorimeter does.</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b>, chosen by 54%, treats electrical calibration as the only method, when a reaction with a known heat of reaction also works. Option <b>B</b> confuses the two calorimeters; option <b>A</b> ignores the fall in temperature on the graph.</>,
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
