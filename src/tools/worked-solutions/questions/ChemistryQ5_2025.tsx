// 2025 Chemistry Exam, MCQ 5. VCAA examination report: 93% correct. Finding the calibration factor
// of a solution calorimeter from the electrical energy supplied (E = VIt) and the temperature rise.
// Question text transcribed from the original paper. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 3, C: 2, D: 93 },
  answer: 'D',
  comment: (
    <>
      CF = VIt/ΔT = 12.0 x 2.50 x 150 / 6.1 = 738 J °C⁻¹
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>CF = <i>E</i> / Δ<i>T</i>, where <i>E</i> = <i>VIt</i></>,
    reason: <>The calibration factor is the energy needed to raise the temperature of the whole calorimeter (water, container, thermometer…) by 1 °C. Calibrating means supplying a <i>known</i> amount of electrical energy and measuring the temperature rise it causes. Both formulas are in the Data Book.</>,
  },
  {
    working: <><i>E</i> = <i>VIt</i><br /><i>E</i> = 12.0 V × 2.50 A × 150 s<br /><i>E</i> = 4500 J = 4.50 × 10³ J</>,
    reason: <>Volts × amps × seconds gives joules. The time is already in seconds, so no conversion is needed (if a time is given in minutes, convert it first).</>,
  },
  {
    working: <>Δ<i>T</i> = 28.4 °C − 22.3 °C = 6.1 °C</>,
    reason: <>The temperature <i>change</i>, final minus initial — not either temperature on its own. A change of 6.1 °C is also a change of 6.1 K, so there is nothing to convert.</>,
  },
  {
    working: <>CF = <i>E</i> / Δ<i>T</i><br />CF = 4500 J / 6.1 °C<br />CF = 737.7 J °C⁻¹ ≈ <b>738 J °C⁻¹</b></>,
    reason: <>The units J °C⁻¹ (joules per degree) are a check that energy has been divided by temperature change. Strictly, Δ<i>T</i> (6.1 °C, 2 significant figures) limits the answer to 7.4 × 10² J °C⁻¹; the option is printed as 738, which is the only one close.</>,
  },
  {
    working: <><b>CF = 738 J °C⁻¹</b></>,
    reason: <>Matches option <b>D</b>. Option <b>B</b>, 158 J °C⁻¹, divides the energy by the final temperature (4500 J ÷ 28.4 °C) instead of the temperature change; option <b>C</b>, 202 J °C⁻¹, divides by the initial temperature (4500 J ÷ 22.3 °C); option <b>A</b>, 16.1 J °C⁻¹, wrongly adds 273 to the temperature change (4500 J ÷ 279 K) — a temperature <i>difference</i> is the same number in °C and K.</>,
  },
]

export default function ChemistryQ5_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Oscar calibrated a solution calorimeter by passing a current of 2.50 A through a heater with
            a voltage of 12.0 V for 150 s. He measured the temperature of the water, which increased
            from 22.3 °C to 28.4 °C.
          </p>
          <p>The calibration factor (CF) of the calorimeter was</p>
        </>
      }
      options={[
        { letter: 'A', content: '16.1 J °C⁻¹' },
        { letter: 'B', content: '158 J °C⁻¹' },
        { letter: 'C', content: '202 J °C⁻¹' },
        { letter: 'D', content: '738 J °C⁻¹', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
