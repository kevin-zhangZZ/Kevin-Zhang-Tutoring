// 2022 Chemistry Exam, MCQ 26. VCAA examination report: 57% correct. Comparing the calibration
// factors of two calorimeters from the temperature–time graphs of the same reaction, including
// extrapolating the cooling line of the poorly insulated calorimeter back to the start of the
// reaction. Question text transcribed from the original paper; the two temperature–time graphs
// are cropped from the original VCAA exam PDF. Solution is original (VCAA report only).

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphsSrc from './chem-2022-mcq26-graphs.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 27, B: 10, C: 57, D: 5 },
  answer: 'C',
  comment: (
    <>
      Since the same amount of energy was produced during the calibration of both calorimeters,
      the relative calibration factors depend on the relative temperature changes.
      <br />
      Calorimeter 1, ΔT = 35 – 15 = 20ºC
      <br />
      Calorimeter 2. To determine ΔT the graph for the cooling phase should be extrapolated back
      to the start; the extrapolation goes back to 27.5ºC so ΔT = 27.5 – 15 = 12.5 ºC.
      <br />
      Since Calibration Factor = E / ΔT, it will be higher for Calorimeter 2.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>CF = <i>E</i> / Δ<i>T</i></>,
    reason: <>The calibration factor (CF) is the energy needed to raise the calorimeter&rsquo;s temperature by 1 °C (Data Book: CF = <i>E</i>/Δ<i>T</i>; electrical calibration gives <i>E</i> = <i>VIt</i>). For a <b>fixed</b> amount of energy, a calorimeter with a <b>larger</b> CF shows a <b>smaller</b> temperature rise.</>,
  },
  {
    working: <>Same reaction, same amounts → same energy released, <i>E</i>, in both calorimeters.</>,
    reason: <>So the reaction graphs can be used to compare the two CFs directly: whichever calorimeter has the smaller (corrected) Δ<i>T</i> has the larger CF.</>,
  },
  {
    working: <>Calorimeter 1: Δ<i>T</i> = 35 °C − 15 °C = 20 °C</>,
    reason: <>The temperature stays flat at 35 °C after the reaction, so no heat is being lost — no correction is needed.</>,
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span>Calorimeter 2: cooling line falls from 25 °C (10 min) to 20 °C (20 min), i.e. 0.5 °C per minute.</span>
        <span>Extrapolate back to the start of the reaction (5 min): 25 °C + 5 min × 0.5 °C min⁻¹ = 27.5 °C</span>
        <span>Δ<i>T</i> = 27.5 °C − 15 °C = 12.5 °C</span>
      </div>
    ),
    reason: <>Calorimeter 2 is losing heat to the surroundings (its temperature falls after the peak), so heat was also being lost while the reaction ran and the peak of 25 °C underestimates the rise. Extending the cooling line back to the time the reaction started corrects for this loss — the standard way to read a temperature–time graph with heat loss.</>,
  },
  {
    working: <>Δ<i>T</i>(2) = 12.5 °C &lt; Δ<i>T</i>(1) = 20 °C, with the same <i>E</i> → CF(2) &gt; CF(1)</>,
    reason: <>Same energy spread over a smaller temperature change means more energy per °C. (Calorimeter 2 might, for example, hold more water.)</>,
  },
  {
    working: <>Check the other statements: A — both calorimeters can be used (Calorimeter 2 after extrapolating), so &ldquo;only Calorimeter 1&rdquo; is false. B — Calorimeter 2 cools after the reaction while Calorimeter 1 holds 35 °C, so Calorimeter 2 has the <b>poorer</b> insulation. D — in the calibration the same electrical energy went into each; Calorimeter 2, with the larger CF, had the <b>smaller</b> temperature rise.</>,
    reason: <>Each wrong statement is tested against the same two ideas: heat loss shows up as a falling line after the peak, and ΔT is inversely related to CF for a fixed energy.</>,
  },
  {
    working: <b>The calibration factor for Calorimeter 2 is higher than for Calorimeter 1.</b>,
    reason: <>Matches option <b>C</b>. Option <b>A</b> (27%) forgets that heat loss can be corrected for by extrapolating the cooling line, so Calorimeter 2&rsquo;s data are still usable. Option <b>B</b> reverses the evidence of the cooling line. Option <b>D</b> reverses the inverse link between CF and ΔT.</>,
  },
]

export default function ChemistryQ26_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Calorimeter 1 and Calorimeter 2 were each electrically calibrated. The same current,
            voltage and time were used to calibrate each calorimeter.
          </p>
          <p className="mb-2">
            A reaction was undertaken in Calorimeter 1 and Calorimeter 2. The same amount and type
            of each reactant was used in both calorimeters. The following temperature versus time
            graphs were produced for the reaction in each calorimeter.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={graphsSrc}
              alt="Temperature (°C) versus time (minutes) for each calorimeter. Calorimeter 1: 15 °C until 5 min, rising to 35 °C at 10 min, then flat at 35 °C to 20 min. Calorimeter 2: 15 °C until 5 min, rising to 25 °C at 10 min, then falling steadily to 20 °C at 20 min — from the original 2022 VCAA exam paper"
              className="w-full max-w-[560px]"
            />
          </div>
          <p>Which one of the following statements is correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>Only Calorimeter 1 can be used to calculate <i>ΔH</i>.</> },
        { letter: 'B', content: <>Calorimeter 2 has better insulation than Calorimeter 1.</> },
        { letter: 'C', content: <>The calibration factor for Calorimeter 2 is higher than the calibration factor for Calorimeter 1.</>, isAnswer: true },
        { letter: 'D', content: <>During the calibration, the temperature increase of Calorimeter 2 was greater than the temperature increase of Calorimeter 1.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
