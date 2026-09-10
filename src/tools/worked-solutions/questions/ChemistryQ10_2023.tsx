// 2023 Chemistry Exam, MCQ 10. VCAA examination report: 26% correct — the hardest MCQ on this
// paper. Which single factor always increases the equilibrium yield of a reaction at constant
// temperature, by elimination against genuine equilibrium principles. Question text transcribed
// from the original paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 26, B: 47, C: 18, D: 8 },
  answer: 'A',
  comment: (
    <>
      A higher value of the equilibrium expression means a higher proportion of products —
      hence a higher yield. An increase in reactant concentration does not always increase
      yield (e.g. compressing H₂(g) + Cl₂(g) ⇌ 2HCl(g) changes nothing), a decrease in
      activation energy only speeds up reaching equilibrium, and a pressure increase does
      nothing when mol of gas is equal on both sides.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>The question asks for what is <b>always</b> true "at constant temperature" — since <i>K</i> itself only changes with temperature, any option that would change <i>K</i> is automatically wrong, and any option that doesn't guarantee a yield increase in <i>every</i> equilibrium is also wrong.</>,
    reason: 'The word "always" is the trap — three of the four options are true only sometimes.',
  },
  {
    working: <>A: the equilibrium expression is <i>K</i> = [products]/[reactants] (raised to their coefficients). A <b>higher value</b> of this expression directly means a higher proportion of products relative to reactants at equilibrium — by definition, that <i>is</i> a higher yield.</>,
    reason: 'This is true by definition, not by circumstance — always holds. Correct.',
  },
  {
    working: <>B: increasing reactant concentration shifts most equilibria toward products, increasing yield. But for a reaction like H₂(g) + Cl₂(g) ⇌ 2HCl(g), where the mol of gas particles is the same on both sides, the reaction quotient [HCl]²/[H₂][Cl₂] is unaffected by a concentration change from compressing the mixture — the yield doesn't change.</>,
    reason: 'A genuine counter-example exists, so this is not always true. Ruled out.',
  },
  {
    working: <>C: a lower activation energy (e.g. from a catalyst) increases the <i>rate</i> the system reaches equilibrium — it speeds up both the forward and reverse reactions equally, so it has no effect on where equilibrium actually sits.</>,
    reason: 'Rate and yield are different things — activation energy affects rate only. Ruled out.',
  },
  {
    working: <>D: an increase in pressure shifts equilibrium toward the side with fewer mol of gas particles — but if both sides have the same mol of gas particles (again, as in H₂(g) + Cl₂(g) ⇌ 2HCl(g)), a pressure increase has no effect on yield at all.</>,
    reason: 'Another genuine counter-example. Ruled out.',
  },
  {
    working: <b>Only the definition of the equilibrium expression itself guarantees a higher yield in every case.</b>,
    reason: <>Matches option <b>A</b>.</>,
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
