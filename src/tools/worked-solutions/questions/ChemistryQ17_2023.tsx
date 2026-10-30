// 2023 Chemistry Exam, MCQ 17. VCAA examination report: 57% correct. Energy transformation
// efficiency: finding the mass of lignite (brown coal) that must be burnt to deliver 42.0 MJ of
// usable energy from a 39% efficient power station. Question text transcribed from the original
// paper. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 10, C: 24, D: 57 },
  answer: 'D',
  comment: (
    <>
      Since the power station is only 39% efficient, 42 MJ usable energy is only 39% of the total
      energy released by the lignite undergoing combustion.
      <br />
      42 MJ = 0.39 x total energy released from lignite.
      <br />
      Total energy = 42 / 0.39 = 107.7 MJ
      <br />
      <i>m</i>(lignite required) = 107.7 MJ / 19.0 MJ tonne⁻¹
      <br />
      <span className="pl-[11.5em]">= 5.67 tonne</span>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>efficiency = (usable energy ÷ energy released by the fuel) × 100%</>,
    reason: (
      <>
        Only 39% of the chemical energy released by burning the coal ends up as usable energy;
        the other 61% is lost (mostly as heat to the surroundings). So the coal must release{' '}
        <b>more</b> energy than the 42.0 MJ that is wanted — divide by the efficiency, don&rsquo;t
        multiply.
        <Background title="Sanity check on direction">
          Usable energy is always <i>less</i> than the energy released. If your &ldquo;energy
          released&rdquo; comes out smaller than 42.0 MJ, you have multiplied by 0.39 where you
          should have divided.
        </Background>
      </>
    ),
  },
  {
    working: (
      <>
        <i>E</i>(released) = usable energy ÷ efficiency
        <br />
        <i>E</i>(released) = 42.0 MJ ÷ 0.39
        <br />
        <i>E</i>(released) = 107.69… MJ
      </>
    ),
    reason: <>Rearranged from the efficiency formula, with 39% written as the decimal 0.39. Keep the unrounded value for the next step.</>,
  },
  {
    working: (
      <>
        <i>m</i>(lignite) = <i>E</i>(released) ÷ energy per tonne
        <br />
        <i>m</i>(lignite) = 107.69… MJ ÷ 19.0 MJ tonne⁻¹
        <br />
        <i>m</i>(lignite) = 5.67 tonnes
      </>
    ),
    reason: <>Each tonne of lignite releases 19.0 MJ when completely combusted, so the number of tonnes is the total energy needed divided by the energy per tonne (MJ ÷ MJ tonne⁻¹ = tonne).</>,
  },
  {
    working: <span className="font-semibold">5.67 tonnes</span>,
    reason: (
      <>
        Matches option <b>D</b>. Option <b>C</b>, 2.21 tonnes, is 42.0 ÷ 19.0 — it ignores the
        efficiency, as if all the energy released were usable. Option <b>A</b>, 0.862 tonnes, is
        0.39 × 42.0 ÷ 19.0 — it multiplies by the efficiency instead of dividing. Option <b>B</b>,
        1.16 tonnes, is 19.0 ÷ (0.39 × 42.0) — the division turned upside down. Check: D is the
        only option larger than 2.21 tonnes, and a station that wastes energy must burn more coal
        than a perfect one would. (The 39% efficiency has only 2 significant figures, so strictly the answer is 5.7 tonnes;
        the options are given to 3 significant figures, matching 19.0 and 42.0, and only D rounds
        to 5.7.)
      </>
    ),
  },
]

export default function ChemistryQ17_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Lignite is a type of brown coal. When lignite is completely combusted in a power
            station, 19.0 MJ/tonne of energy is released. The efficiency of the power station is
            39%.
          </p>
          <p>What mass of lignite is required to produce 42.0 MJ of usable energy in the power station?</p>
        </>
      }
      options={[
        { letter: 'A', content: '0.862 tonnes' },
        { letter: 'B', content: '1.16 tonnes' },
        { letter: 'C', content: '2.21 tonnes' },
        { letter: 'D', content: '5.67 tonnes', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
