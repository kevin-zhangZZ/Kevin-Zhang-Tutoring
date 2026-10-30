// 2022 Chemistry Exam, MCQ 2. VCAA examination report: 65% correct. When a fuel's combustion
// heats water, the energy is absorbed by the water and the reaction's ΔH is negative (exothermic).
// Question text transcribed from the original paper; the table-style options are written
// "Energy: … · ΔH: …". VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 65, B: 20, C: 13, D: 2 },
  answer: 'A',
  comment: (
    <>
      Combustion is an exothermic reaction, indicated by ΔH &lt; 0.
      <br />
      The energy released during combustion of the fuel is absorbed by the water.
      <br />
      While some energy would be released by the water as it cools down, after heating or due to
      poor insulation, that can only be after the energy released during combustion has been
      absorbed by the water.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>System = the reacting fuel and oxygen. Surroundings = everything else, including the water.</>,
    reason: <>ΔH always describes the <b>reaction</b> (the system), never the water. Keeping the two apart is the whole question.</>,
  },
  {
    working: <>Combustion is <b>exothermic</b>: the products have less enthalpy than the reactants, so ΔH = <i>H</i>(products) − <i>H</i>(reactants) &lt; 0. <b>ΔH is negative.</b></>,
    reason: <>Every combustion reaction releases energy — that is why fuels are burned. The Data Book&rsquo;s table of molar enthalpies of combustion lists every ΔH as a negative value for the same reason. (Its heats of combustion tables, in kJ g⁻¹, are positive: they give the <i>amount</i> of energy released, not the sign of ΔH.)</>,
  },
  {
    working: <>The energy released by the reaction flows into the water, so the water&rsquo;s temperature rises: <b>energy is absorbed by the water</b>.</>,
    reason: <>The water is the surroundings gaining the heat. Its temperature rise is what is measured in calorimetry (<i>q</i> = <i>mc</i>Δ<i>T</i>), and it is positive because the water gained energy — but that does not make ΔH of the reaction positive.</>,
  },
  {
    working: <b>Energy: absorbed by the water · ΔH: negative</b>,
    reason: <>Matches option <b>A</b>. Option <b>B</b> (released by the water) describes the wrong direction of heat flow: the water only releases energy later, as it cools, after first absorbing the energy from combustion (the report&rsquo;s point). Option <b>C</b> gets the energy right but takes the sign of ΔH from the water&rsquo;s point of view — the water gains energy, but ΔH belongs to the reaction, which loses it. Option <b>D</b> reverses both.</>,
  },
]

export default function ChemistryQ2_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">A fuel undergoes combustion to heat water.</p>
          <p>
            Which of the following descriptions of the energy and enthalpy of combustion, <i>ΔH</i>,
            of the reaction is correct?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>Energy: absorbed by the water · <i>ΔH</i>: negative</>, isAnswer: true },
        { letter: 'B', content: <>Energy: released by the water · <i>ΔH</i>: negative</> },
        { letter: 'C', content: <>Energy: absorbed by the water · <i>ΔH</i>: positive</> },
        { letter: 'D', content: <>Energy: released by the water · <i>ΔH</i>: positive</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
