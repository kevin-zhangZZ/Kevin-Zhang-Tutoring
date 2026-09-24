// 2017 Chemistry Exam, MCQ 22. VCAA examination report: 47% correct — tied for fourth-hardest
// MCQ on the 2017 paper. Read a caffeine concentration off an HPLC calibration curve, then
// correct for a dilution before scaling up to a real serving size.
// Question text transcribed from the original paper; the calibration curve is cropped directly
// from the original VCAA exam PDF, not a redrawing. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import calibrationCurveSrc from './chem-2017-mcq22-calibration-curve.png'

const CALIBRATION_CURVE = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
    <img src={calibrationCurveSrc} alt="HPLC calibration curve of peak area (arbitrary units) versus caffeine concentration (g/L), a straight line through the origin, from the original 2017 VCAA exam paper" className="w-full max-w-[380px]" />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 29, B: 13, C: 47, D: 11 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      2400 units → <i>c</i>(caffeine) in diluted sample = 0.040 g L⁻¹
      <br />
      The original sample had been diluted by a factor of 10.
      <br />
      <i>c</i>(caffeine) in undiluted sample = 10 × 0.040 g L⁻¹ = 0.40 g L⁻¹
      <br />
      <i>m</i>(caffeine) in 350 mL = 0.40 × (350/100) = 0.14 g
      <br />
      Many students overlooked the dilution factor.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Read the calibration curve at a peak area of 2400.</>,
    reason: <>The line is straight and passes through the origin — reading directly off it, a peak area of 2400 corresponds to a concentration of about 0.040 g/L (e.g. the line also passes close to (0.050, 3000), consistent with a constant ratio of 60 000 (arbitrary units)/(g/L)).</>,
  },
  {
    working: <>Peak area 2400 (arbitrary units) → reading off the calibration curve, <Chem eq="c(caffeine)" /> in the <em>diluted</em> sample = 0.040 g/L.</>,
    reason: <>The calibration curve directly converts HPLC peak area into concentration.</>,
  },
  {
    working: <>Dilution: 5.0 mL of coffee drink was diluted to 50.0 mL — a factor of <b>10</b>.</>,
    reason: <>The report notes many students overlooked this dilution factor.</>,
  },
  {
    working: <>c(caffeine) in the undiluted drink = 10 × 0.040 = <b>0.40 g/L</b></>,
  },
  {
    working: <>m(caffeine) in 350 mL = 0.40 × (350/1000) = <b>0.14 g</b></>,
    reason: <>Matches option <b>C</b>. Option <b>A</b>, 0.014 g, is 0.040 × 0.350 — the dilution factor left out; option <b>D</b>, 0.40, is the undiluted concentration in g L⁻¹, not a mass. (The report writes 0.40 × (350/100); it means 350/1000 L.)</>,
  },
]

export default function ChemistryQ22_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 21 and 22.</p>
          <p className="mb-2">
            The mass of caffeine in a particular coffee drink was determined by high-performance
            liquid chromatography (HPLC).
            <br />
            The calibration curve produced from running standard solutions of caffeine through an
            HPLC column is shown below.
          </p>
          <div className="mb-2">{CALIBRATION_CURVE}</div>
          <p className="mb-2">
            A 5.0 mL aliquot of the coffee drink was diluted to 50.0 mL with de-ionised water. A
            sample of the diluted coffee drink was run through the HPLC column under identical
            conditions to those used to obtain the calibration curve.
            <br />
            The peak area obtained for this diluted sample was 2400 arbitrary units.
          </p>
          <p>The mass of caffeine, in grams, in 350 mL of the undiluted coffee drink is closest to</p>
        </>
      }
      options={[
        { letter: 'A', content: '0.014' },
        { letter: 'B', content: '0.070' },
        { letter: 'C', content: '0.14', isAnswer: true },
        { letter: 'D', content: '0.40' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
