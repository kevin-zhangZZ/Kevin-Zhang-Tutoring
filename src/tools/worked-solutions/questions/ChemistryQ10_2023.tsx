// 2023 Chemistry Exam, MCQ 10. VCAA examination report: 26% correct — the hardest MCQ on this
// paper. Which single factor always increases the equilibrium yield of a reaction at constant
// temperature, by elimination against genuine equilibrium principles. Question text transcribed
// from the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 26, B: 47, C: 18, D: 8 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      A. A higher value for the equilibrium expression suggests a higher proportion of products /
      increased product concentration compared to reactants, and hence a higher yield.
      <br />
      B. An increase in reactant concentration will increase the yield in any equilibrium where the
      concentration fraction (reaction quotient) increases, as a result of a change that favours
      the forward reaction. The system moves to compensate for the change by favouring the forward
      reaction.
      <br />
      However, if the concentration increase occurs by decreasing the volume of an equilibrium
      mixture in which there are the same number of mol of particles on both sides, as in the
      equilibrium
      <br />
      <Chem eq="H2(g) + Cl2(g) <=> 2HCl(g)" />,
      <br />
      the value of the concentration fraction (reaction quotient) [HCl]²/[H₂][Cl₂] does not change
      and there is no change in the yield.
      <br />
      C. A decrease in activation energy increases the reaction rate and allows the system to get
      to equilibrium faster but has no effect on the equilibrium yield.
      <br />
      D. A pressure increase will cause the reaction to favour the side of the equilibrium with the
      lower number of mol of particles. However, it has no impact on the yield of an equilibrium
      system with the same number of particles on both sides, as in
      <br />
      <Chem eq="H2(g) + Cl2(g) <=> 2HCl(g)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The question asks what <b>always</b> corresponds to a higher yield — an option fails if there is even one equilibrium where it doesn&rsquo;t raise the yield.</>,
    reason: <>The word "always" is the trap — three of the four options are true only sometimes.</>,
  },
  {
    working: <>A: the equilibrium expression is the concentration fraction [products]/[reactants], each concentration raised to the power of its coefficient. A <b>higher value</b> of it means a higher proportion of products relative to reactants — by definition, a higher yield.</>,
    reason: <>True by definition, whatever the reaction. Correct.</>,
  },
  {
    working: <>B: increasing reactant concentration shifts most equilibria toward products, increasing yield. But for a reaction like H₂(g) + Cl₂(g) ⇌ 2HCl(g), where the mol of gas particles is the same on both sides, the reaction quotient [HCl]²/[H₂][Cl₂] is unaffected by a concentration change from compressing the mixture — the yield doesn't change.</>,
    reason: <>A genuine counter-example exists, so this is not always true. Ruled out.</>,
  },
  {
    working: <>C: a lower activation energy (e.g. from a catalyst) increases the <i>rate</i> the system reaches equilibrium — it speeds up both the forward and reverse reactions equally, so it has no effect on where equilibrium actually sits.</>,
    reason: <>Rate and yield are different things — activation energy affects rate only. Ruled out.</>,
  },
  {
    working: <>D: an increase in pressure shifts equilibrium toward the side with fewer mol of gas particles — but if both sides have the same mol of gas particles (again, as in H₂(g) + Cl₂(g) ⇌ 2HCl(g)), a pressure increase has no effect on yield at all.</>,
    reason: <>Another genuine counter-example. Ruled out.</>,
  },
  {
    working: <b>Only the definition of the equilibrium expression itself guarantees a higher yield in every case.</b>,
    reason: <>Matches option <b>A</b>. Option <b>B</b>, chosen by 47%, fails for an equilibrium like <Chem eq="H2(g) + Cl2(g) <=> 2HCl(g)" /> compressed to raise the concentrations (the report&rsquo;s example).</>,
  },
]

export default function ChemistryQ10_2023() {
  return (
    <MCQShell
      question={
        <p>
          At constant temperature, which one of the following always corresponds to an increase
          of the yield of a chemical reaction?
        </p>
      }
      options={[
        { letter: 'A', content: 'An increase in the value of the equilibrium expression.', isAnswer: true },
        { letter: 'B', content: 'An increase in the concentration of the reactants.' },
        { letter: 'C', content: 'A decrease in the activation energy.' },
        { letter: 'D', content: 'An increase in the pressure.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
