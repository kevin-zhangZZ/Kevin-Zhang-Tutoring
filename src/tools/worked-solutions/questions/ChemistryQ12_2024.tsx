// 2024 Chemistry Exam, MCQ 12. VCAA examination report: 32% correct. Why butane combustion is
// treated as irreversible — distinguishing a genuine kinetic argument from three plausible-
// sounding but wrong thermodynamic/equilibrium arguments. Question text transcribed from the
// original paper (rendered from page images — the 2024 exam PDF has no extractable text).
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 20, C: 32, D: 32 },
  answer: 'C',
  comment: (
    <>
      Statistically, the probability of successful collisions occurring between the combined
      products of a combustion reaction colliding in the correct orientation with sufficient energy
      is so small that, in practice, it can never happen. Therefore, the reverse reaction of a
      combustion equation of C₄-based compounds or larger never occurs.
      <br />
      The forward reaction is exothermic, but all equilibrium processes involve both an exothermic
      and endothermic reaction.
      <br />
      The products are more stable than the reactants in an exothermic process.
      <br />
      Combustion is not an equilibrium process, so LCP does not apply.
      <br />
      A significant number of students selected &lsquo;D&rsquo; as an option, which is not a valid
      response as to why the reaction is considered irreversible.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Irreversible ⇒ the reaction goes essentially to completion and the <b>reverse reaction does not occur to any noticeable extent</b>.</>,
    reason: <>Start from what &ldquo;irreversible&rdquo; means. Every reaction is reversible in principle; we call one irreversible when the reverse reaction is so slow that it can be ignored. So the question is really asking: <i>why is the reverse of combustion so slow?</i></>,
  },
  {
    working: (
      <>
        <Chem eq="2C4H10(g) + 13O2(g) -> 8CO2(g) + 10H2O(l)" />
        <br />
        Reverse: 8CO₂ + 10H₂O → 2C₄H₁₀ + 13O₂
      </>
    ),
    reason: <>For the reverse reaction to happen, 18 small, scattered product molecules would have to collide together, in exactly the right orientation, with enough energy. The probability of such a collision is so small that, in practice, it never happens (the report&rsquo;s reasoning).</>,
  },
  {
    working: (
      <>
        <i>E</i><sub>a</sub>(reverse) = <i>E</i><sub>a</sub>(forward) + |Δ<i>H</i>|
        <br />
        |Δ<i>H</i>| = 2877 kJ per mol of butane
        <br />
        For the equation as written (2 mol butane): |Δ<i>H</i>| = 2 × 2877 = 5754 kJ
        <br />
        ⇒ <i>E</i><sub>a</sub>(reverse) is enormous ⇒ almost no collisions have enough energy
      </>
    ),
    reason: <>A second way to see it, from an energy profile: the products of combustion sit far below the reactants, so climbing back over the hump needs the forward activation energy <i>plus</i> all the energy released. Data Book: molar enthalpy of combustion of butane = −2877 kJ mol⁻¹. Both arguments say the same thing — the reverse rate is negligible — which is exactly option C.</>,
  },
  {
    working: <>A — exothermic does not mean irreversible: many reversible equilibria have an exothermic forward reaction (e.g. <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" />, Δ<i>H</i> &lt; 0).</>,
    reason: <>Every equilibrium has an exothermic direction and an endothermic direction (the report&rsquo;s point), so being exothermic alone can&rsquo;t explain irreversibility. Ruled out.</>,
  },
  {
    working: <>B — false: combustion is exothermic, so the products (CO₂, H₂O) are <b>lower</b> in energy, i.e. <b>more</b> stable, than the reactants.</>,
    reason: <>The statement gets the energetics backwards (the report: &ldquo;The products are more stable than the reactants in an exothermic process&rdquo;). Ruled out.</>,
  },
  {
    working: <>D — Le Chatelier&rsquo;s principle applies only to a system at equilibrium; combustion is not an equilibrium process.</>,
    reason: <>Even for a real equilibrium, adding more of a reactant only shifts the position — it never makes the reaction irreversible. Ruled out.</>,
  },
  {
    working: <b>The rate of the reverse reaction is so slow that it can be ignored.</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b>, chosen by as many students as <b>C</b> (32% each), applies Le Chatelier&rsquo;s principle to a reaction that isn&rsquo;t an equilibrium — the report notes this is &ldquo;not a valid response&rdquo;. <b>A</b> mistakes exothermic for irreversible, and <b>B</b> reverses the relative stability of reactants and products.</>,
  },
]

export default function ChemistryQ12_2024() {
  return (
    <MCQShell
      question={
        <p>
          The combustion reaction between butane gas, C₄H₁₀, and oxygen gas, O₂, is considered
          irreversible because
        </p>
      }
      options={[
        { letter: 'A', content: 'the forward reaction is exothermic.' },
        { letter: 'B', content: 'the products are less stable than the reactants.' },
        { letter: 'C', content: 'the rate of the reverse reaction is so slow that it can be ignored.', isAnswer: true },
        { letter: 'D', content: 'an unlimited supply of oxygen will favour the forward reaction.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
