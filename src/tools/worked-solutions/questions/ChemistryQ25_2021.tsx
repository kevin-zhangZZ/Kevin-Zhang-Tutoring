// 2021 Chemistry Exam, MCQ 25. VCAA examination report: 12% correct — the hardest MCQ on this
// paper. Deducing what change was made to an equilibrium system from a rate–time graph showing
// an instantaneous jump in the reverse rate but no instantaneous change in the forward rate.
// Question text transcribed from the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 29, C: 34, D: 25 },
  answer: 'C',
  comment: (
    <>
      The only change that could cause an instantaneous increase in the rate of the reverse
      reaction at t₁ with no instantaneous effect on the rate of the forward reaction is the
      addition of product(s). The rates slowly return toward each other as the system responds,
      settling at a new equilibrium where the amount of products is higher than before t₁.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="A(g) + 2B(g) <=> C(g) + D(g)" className="mr-2" />,
    reason: 'ΔH > 0: the forward reaction is endothermic.',
  },
  {
    working: <>At <Chem eq="t1" />, the <b>reverse</b> rate jumps up instantly; the <b>forward</b> rate shows no instantaneous change at all, only drifting afterwards as the system re-equilibrates.</>,
    reason: 'The key clue: whatever changed at t₁ must affect the reverse-reaction rate law immediately, but not the forward-reaction rate law.',
  },
  {
    working: <>Only concentrations that appear in the reverse rate expression (i.e. the <b>products</b>, C and D) can jump the reverse rate instantly while leaving the forward rate — which depends only on reactant concentrations — completely untouched at that instant.</>,
    reason: <>This points to a sudden <b>addition of product(s)</b> at <Chem eq="t1" />.</>,
  },
  {
    working: <>A: adding an inert gas like argon changes neither concentration, so neither rate would move at all.</>,
    reason: 'Ruled out.',
  },
  {
    working: <>B: removing reactants would cause an <i>instant decrease</i> in the forward rate (which depends on reactant concentrations) — contradicts the graph showing no instantaneous change to the forward rate.</>,
    reason: 'Ruled out.',
  },
  {
    working: <>D: the equilibrium constant only changes with <b>temperature</b> — but a temperature change would instantly affect <i>both</i> rates (every reaction speeds up or slows down together), not just the reverse one.</>,
    reason: 'Ruled out.',
  },
  {
    working: <>Since product was added at t₁, the system responds by partially consuming the excess (reverse rate exceeds forward for a while), but settles at a <b>new equilibrium with more product overall</b> than existed just before t₁.</>,
    reason: <>Matches option <b>C</b> exactly.</>,
  },
]

export default function ChemistryQ25_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            An equilibrium mixture of four gases is represented by the following equation.
          </p>
          <Chem eq="A(g) + 2B(g) <=> C(g) + D(g)" className="block text-[14px] my-2" />
          <p className="mb-2">ΔH &gt; 0</p>
          <p className="mb-2">
            A graph of the rate of the forward and reverse reactions versus time shows the reverse
            reaction's rate jumping instantly upward at time t₁, with no instantaneous change to
            the forward reaction's rate at that moment. A single change was made to the
            equilibrium mixture at t₁, and equilibrium is re-established at t₂.
          </p>
          <p>Which one of the following is consistent with the information given above?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Argon is added to the equilibrium mixture at time t₁.' },
        { letter: 'B', content: 'At time t₁ reactants are removed from the equilibrium mixture.' },
        { letter: 'C', content: 'The amount of products is higher at time t₂ compared to just before time t₁.', isAnswer: true },
        { letter: 'D', content: 'The change made at time t₁ results in an increase in the equilibrium constant at time t₂.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
