// 2020 Chemistry Exam, MCQ 15. VCAA examination report: 25% correct. Which statement about the
// Haber process equilibrium is correct — testing the distinction between rate, activation
// energy and equilibrium position. Question text transcribed from the original paper. Solution
// is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 25, C: 53, D: 8 },
  answer: 'B',
  comment: (
    <>
      Option A: Incorrect. A catalyst increases the proportion of collisions which are successful (by
      lowering activation energy) but does not affect the frequency of collisions.
      <br />
      Option B: Correct. Increase in temperature increases the rate of nearly all reactions.
      <br />
      Option C: Incorrect. A catalyst reduces the activation energies of forward and backward
      (reverse) reaction by the same amount – not the same proportion.
      <br />
      Option D: Incorrect. Since the forward reaction is exothermic, it has a lower activation energy
      than the reverse reaction.
      <br />
      Students should note that while an increase in temperature will favour the endothermic
      reaction in an equilibrium system it increases the rate of both endothermic and exothermic
      reactions.
      <br />
      In the equilibrium with exothermic forward reaction, the activation energy of the forward
      reaction is lower than the activation energy of the reverse reaction. While the introduction
      of a catalyst will decrease the activation energies for both forward and reverse reactions
      equally, this decrease will be a greater proportion (fraction) of the smaller activation energy
      of the forward reaction.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" className="mr-2" />,
    reason: <>ΔH = −92.3 kJ mol⁻¹ — the forward reaction is exothermic, so it has a lower activation energy than the reverse.</>,
  },
  {
    working: <>A: a catalyst provides an alternative pathway with lower activation energy — it doesn't change how <i>often</i> particles collide, only what fraction of those collisions succeed.</>,
    reason: <>Ruled out.</>,
  },
  {
    working: <>B: increasing the temperature increases the average kinetic energy of <i>all</i> particles, which increases the rate of the forward reaction (and every other reaction too).</>,
    reason: <>This is universally true, regardless of whether the reaction is exo- or endothermic — matches option <b>B</b>.</>,
  },
  {
    working: <>C: a catalyst lowers the activation energies of the forward and reverse reactions by the <b>same absolute amount</b> — since the forward reaction already has a smaller activation energy here, that fixed decrease is a <i>larger proportion</i> of it, not the same proportion.</>,
    reason: <>Ruled out.</>,
  },
  {
    working: <>D: since the forward reaction is exothermic, its activation energy is <b>lower</b> than the reverse reaction's, not greater.</>,
    reason: <>Ruled out — states the relationship backwards.</>,
  },
  {
    working: <b>Only the effect of temperature on the forward rate holds up unconditionally.</b>,
    reason: <>Matches option <b>B</b>. Option <b>C</b>, chosen by more than half, confuses &ldquo;the same amount&rdquo; with &ldquo;the same proportion&rdquo;.</>,
  },
]

export default function ChemistryQ15_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 14 and 15.</p>
          <p className="mb-2">
            The magnitude of the equilibrium constant, <i>K</i><sub>c</sub>, at 25 °C for the
            following reaction is 640.
          </p>
          <p className="mb-2 text-[14px]">
            <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" /> &nbsp;&nbsp; Δ<i>H</i> = −92.3 kJ mol⁻¹
          </p>
          <p>For the reaction <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" /></p>
        </>
      }
      options={[
        { letter: 'A', content: 'a catalyst increases the number of collisions between the reactants.' },
        { letter: 'B', content: 'the rate of the forward reaction increases when the temperature increases.', isAnswer: true },
        { letter: 'C', content: 'a catalyst reduces the activation energy of the forward and backward reactions by the same proportion.' },
        { letter: 'D', content: 'the activation energy of the forward reaction is greater than the activation energy of the reverse reaction.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
