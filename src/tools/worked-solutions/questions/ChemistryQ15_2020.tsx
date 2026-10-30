// 2020 Chemistry Exam, MCQ 15. VCAA examination report: 25% correct. Which statement about the
// Haber process equilibrium is correct — testing the distinction between rate, activation
// energy and equilibrium position. Question text transcribed from the original paper. Solution
// is original. VCAA report only.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 25, C: 53, D: 8 },
  answer: 'B',
  noAnswer: 0,
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
    reason: <>Δ<i>H</i> = −92.3 kJ mol⁻¹ — the forward reaction is exothermic: the products sit 92.3 kJ mol⁻¹ below the reactants on an energy profile, so <i>E</i><sub>a</sub>(reverse) = <i>E</i><sub>a</sub>(forward) + 92.3 kJ mol⁻¹. The forward reaction has the lower activation energy.</>,
  },
  {
    working: <>A: a catalyst provides an alternative pathway with lower activation energy — it doesn't change how <i>often</i> particles collide, only what fraction of those collisions succeed.</>,
    reason: <>Ruled out — a catalyst changes the pathway, not how fast the particles move or how often they meet.</>,
  },
  {
    working: <>B: increasing the temperature increases the average kinetic energy of the particles, so collisions are more frequent and a <b>greater proportion</b> of them have energy ≥ <i>E</i><sub>a</sub> ⇒ the rate of the forward reaction increases.</>,
    reason: <>This holds for the exothermic forward reaction <b>and</b> the endothermic reverse reaction — both speed up. Don&rsquo;t confuse <b>rate</b> with <b>position of equilibrium</b>: by Le Chatelier&rsquo;s principle, heating shifts this equilibrium to the left (it favours the endothermic reverse reaction, which speeds up <i>more</i>), lowering the yield of NH<sub>3</sub> — but the forward rate still increases. ✓</>,
  },
  {
    working: <>C: a catalyst lowers the activation energies of the forward and reverse reactions by the <b>same absolute amount</b> — since the forward reaction already has a smaller activation energy here, that fixed decrease is a <i>larger proportion</i> of it, not the same proportion.</>,
    reason: <>Ruled out. For example, if <i>E</i><sub>a</sub>(forward) = 100 kJ mol⁻¹ and <i>E</i><sub>a</sub>(reverse) = 192.3 kJ mol⁻¹, a catalyst lowering both by 40 kJ mol⁻¹ cuts the forward barrier by 40% but the reverse by only about 21%.</>,
  },
  {
    working: <>D: since the forward reaction is exothermic, its activation energy is <b>lower</b> than the reverse reaction's, not greater.</>,
    reason: <>Ruled out — states the relationship backwards.</>,
  },
  {
    working: <b>Only statement B is correct: raising the temperature increases the rate of the forward reaction.</b>,
    reason: <>Matches option <b>B</b>. Option <b>C</b>, chosen by 53%, confuses &ldquo;the same amount&rdquo; with &ldquo;the same proportion&rdquo;. Option <b>A</b> (14%) says a catalyst makes collisions more frequent — it makes a greater proportion of them successful instead. Option <b>D</b> reverses the activation-energy relationship for an exothermic reaction.</>,
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
