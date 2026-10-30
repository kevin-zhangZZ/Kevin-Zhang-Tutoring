// 2021 Chemistry Exam, MCQ 19. VCAA examination report: 66% correct. Energy content (J g⁻¹)
// of a muesli bar from bomb-calorimeter data: energy released = calibration factor × ΔT, then
// divide by the mass burnt. Bomb calorimetry is not named in the current study design (which
// covers solution calorimetry), but the calibration-factor calculation is identical, so the
// question is written up with a note. Question text transcribed from the original paper (no
// figures). VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 66, C: 13, D: 8 },
  answer: 'B',
  comment: (
    <>
      Energy from sample = <i>CF</i> x Δ<i>T</i>
      <br />
      = 4780 J °C<sup>-1</sup> x 16.7 °C
      <br />
      = 7.98 x 10<sup>4</sup> J
      <br />
      Energy content = 7.98 x 10<sup>4</sup> J / 3.95 g
      <br />
      = 2.02 x 10<sup>4</sup> J g<sup>-1</sup>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Energy released by the sample = <i>CF</i> × Δ<i>T</i></>,
    reason: <>The <b>calibration factor</b> (<i>CF</i>, in J °C⁻¹) is the energy needed to raise the temperature of <i>the whole calorimeter</i> — water, container, thermometer — by 1 °C. It was measured beforehand, so the energy released by the burning muesli bar is simply <i>CF</i> × Δ<i>T</i>. (We do <b>not</b> use <i>q</i> = <i>mc</i>Δ<i>T</i> here: the calibration factor already replaces &ldquo;<i>mc</i>&rdquo;.) Note: bomb calorimeters are not named in the current study design, which covers solution calorimetry — but the calibration-factor calculation is exactly the same.</>,
  },
  {
    working: (
      <>
        <i>E</i> = <i>CF</i> × Δ<i>T</i>
        <br />
        = 4780 J °C⁻¹ × 16.7 °C
        <br />
        = 7.983 × 10⁴ J
      </>
    ),
    reason: <>The units check out: J °C⁻¹ × °C = J. Keep the unrounded value (79 826 J) for the next step.</>,
  },
  {
    working: (
      <>
        energy content = <i>E</i> / <i>m</i>
        <br />
        = 7.983 × 10⁴ J / 3.95 g
        <br />
        = 2.021 × 10⁴ J g⁻¹
      </>
    ),
    reason: <>&ldquo;Energy content in joules per gram&rdquo; means energy released per gram of sample, so divide by the mass burnt.</>,
  },
  {
    working: <>energy content = <b>2.02 × 10⁴ J g⁻¹</b></>,
    reason: <>Matches option <b>B</b>. Three significant figures, set by all three data (4780, 16.7, 3.95). Sanity check: 2.02 × 10⁴ J g⁻¹ = 20.2 kJ g⁻¹, a sensible value for a food that is mostly carbohydrate with some fat (Data Book: carbohydrate 16 kJ g⁻¹, fat 37 kJ g⁻¹). Option <b>C</b>, 1.13 × 10³ J g⁻¹, comes from setting the calculation up wrongly as <i>CF</i> × <i>m</i> ÷ Δ<i>T</i> = 4780 × 3.95 ÷ 16.7. Option <b>D</b>, 7.25 × 10 J g⁻¹, divides the calibration factor by both mass and temperature change, <i>CF</i> ÷ (<i>m</i> × Δ<i>T</i>) = 4780 ÷ (3.95 × 16.7) — the shape of <i>c</i> = <i>q</i>/(<i>m</i>Δ<i>T</i>), with <i>CF</i> wrongly put in place of the energy <i>q</i>.</>,
  },
]

export default function ChemistryQ19_2021() {
  return (
    <MCQShell
      question={
        <p>
          A food chemist conducted an experiment in a bomb calorimeter to determine the energy
          content, in joules per gram, of a muesli bar. A 3.95 g sample of the muesli bar was
          combusted in the calorimeter and the temperature of the water rose by 16.7 °C. The
          calibration factor of the calorimeter was previously determined to be 4780 J °C⁻¹.
          <br />
          The energy content of the muesli bar is
        </p>
      }
      options={[
        { letter: 'A', content: <>3.51 × 10⁵ J g⁻¹</> },
        { letter: 'B', content: <>2.02 × 10⁴ J g⁻¹</>, isAnswer: true },
        { letter: 'C', content: <>1.13 × 10³ J g⁻¹</> },
        { letter: 'D', content: <>7.25 × 10 J g⁻¹</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
