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
      products of a combustion reaction colliding in the correct orientation with sufficient
      energy is so small that, in practice, it can never happen. Therefore the reverse reaction
      of a combustion equation of C4-based compounds or larger never occurs. The forward reaction
      is exothermic, but all equilibrium processes involve both an exothermic and an endothermic
      reaction, and combustion is not an equilibrium process, so Le Chatelier's principle does not
      apply.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Combustion of <Chem eq="C4H10" /> produces many small, highly dispersed product molecules (CO₂ and H₂O gas) — for the reverse reaction to occur, an enormous number of these scattered molecules would all need to collide simultaneously, in exactly the right orientation, with enough energy.</>,
    reason: 'Sets up why the reverse reaction is practically never observed, regardless of energetics.',
  },
  {
    working: <>A: being exothermic only describes the energy released — plenty of reversible equilibrium reactions are also exothermic in the forward direction (e.g. the Haber process), so exothermicity alone doesn't make a reaction irreversible.</>,
    reason: 'Exothermic ≠ irreversible. Ruled out.',
  },
  {
    working: <>B: products being less stable than reactants would actually make the forward reaction <i>endothermic</i>, not exothermic — this gets the energetics of combustion backwards. Combustion products (CO₂, H₂O) are lower in energy (more stable) than the fuel and O₂.</>,
    reason: 'Factually backwards. Ruled out.',
  },
  {
    working: <>C: the reverse reaction requires many product molecules to collide together at once, in a very specific arrangement — the probability of this happening is astronomically small, so in practice the reverse reaction simply never occurs.</>,
    reason: 'The genuine, correct reason — a kinetic (collision-probability) argument, not a thermodynamic one. Correct.',
  },
  {
    working: <>D: combustion is not treated as an equilibrium system at all, so Le Chatelier's principle (which describes how equilibria shift in response to changes like reactant supply) doesn't apply here — there's no equilibrium position to "favour".</>,
    reason: 'Misapplies an equilibrium concept to a non-equilibrium reaction. Ruled out.',
  },
  {
    working: <b>Only the collision-probability argument correctly explains why combustion of C4+ compounds is irreversible.</b>,
    reason: <>Matches option <b>C</b>.</>,
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
