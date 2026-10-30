// 2025 Chemistry Exam, MCQ 11. VCAA examination report: 80% correct. Fuel cell design — why
// porous electrodes (large surface area where gas, electrolyte and catalyst meet) speed up the
// electrode reactions and so improve how effectively the fuel is converted. Question text
// transcribed from the original paper (no diagram). Answer and comment from the VCAA report only.
// Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 4, C: 80, D: 11 },
  answer: 'C',
  comment: (
    <>
      Fuel efficiency relates to the effectiveness of converting the fuel into its products in
      terms of either time or yield. This can be enhanced by increasing the reaction rate. Using
      porous electrodes, which increases the surface area of the electrode, is an effective method.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>In a fuel cell the gaseous reactants react <b>at the surface of the electrodes</b>: the fuel is oxidised at the anode and O₂ is reduced at the cathode.</>,
    reason: <>The reactions can only happen where gas molecules, the electrolyte and the catalyst on the electrode all meet. The fuel and O₂ are fed in continuously, so the cell never &ldquo;runs out&rdquo; — how well it performs depends on <b>how fast</b> the gases can react at these sites.</>,
  },
  {
    working: <>Larger electrode surface area → more reaction sites → more frequent collisions between gas particles and the catalyst → <b>faster reaction rate</b>.</>,
    reason: <>The same collision-theory idea as crushing a solid into a powder. A faster rate means more fuel is converted (and more current produced) per unit time — the report&rsquo;s sense of &ldquo;efficiency&rdquo;: converting the fuel into products effectively &ldquo;in terms of either time or yield&rdquo;.</>,
  },
  {
    working: <>Porous electrodes let the gas diffuse into the electrode, giving a <b>very large surface area</b> for the catalysed reactions.</>,
    reason: <>This is why real fuel cells use porous carbon electrodes coated with a catalyst (e.g. Pt).</>,
  },
  {
    working: <b>Porous electrodes to maximise the surface area for catalytic reactions.</b>,
    reason: <>
      Matches option <b>C</b>. Each distractor makes the cell work worse, not better:{' '}
      <b>A</b> (a dense, non-porous electrode) does the opposite of C — it <i>limits</i> contact
      between the gas and the electrode, lowering the rate. <b>B</b>: the reactants are gases fed
      directly to the electrodes; the electrolyte&rsquo;s job is to carry <i>ions</i> between the
      electrodes, not to transport reactants (if the fuel and O₂ mixed they would react directly,
      releasing their energy as heat rather than electricity). <b>D</b>, chosen by 11%: the
      fuel and O₂ must be kept apart, but a <i>solid, impermeable</i> membrane would also block
      the ions, breaking the internal circuit so no current flows — fuel cells use a membrane
      that ions can pass through.
    </>,
  },
]

export default function ChemistryQ11_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider a fuel cell using gaseous reactants.</p>
          <p>Which one of the following design features would significantly enhance fuel cell efficiency?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>including a dense, non-porous electrode to limit gas diffusion</> },
        { letter: 'B', content: <>using liquid electrolytes to transport reactants between the electrodes</> },
        { letter: 'C', content: <>incorporating porous electrodes to maximise the surface area for catalytic reactions</>, isAnswer: true },
        { letter: 'D', content: <>using a solid, impermeable membrane between electrodes to minimise gas loss between half-cells</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
