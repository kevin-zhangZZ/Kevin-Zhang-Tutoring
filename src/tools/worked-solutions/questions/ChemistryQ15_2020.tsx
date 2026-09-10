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
      A catalyst reduces the activation energies of the forward and backward reactions by the{' '}
      <b>same amount</b>, not the same proportion — since the forward reaction here has a lower
      activation energy, an equal absolute decrease is a larger fraction of it.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" className="mr-2" />,
    reason: 'ΔH = −92.3 kJ mol⁻¹ — the forward reaction is exothermic, so it has a lower activation energy than the reverse.',
  },
  {
    working: <>A: a catalyst provides an alternative pathway with lower activation energy — it doesn't change how <i>often</i> particles collide, only what fraction of those collisions succeed.</>,
    reason: 'Ruled out.',
  },
  {
    working: <>B: increasing the temperature increases the average kinetic energy of <i>all</i> particles, which increases the rate of the forward reaction (and every other reaction too).</>,
    reason: <>This is universally true, regardless of whether the reaction is exo- or endothermic — matches option <b>B</b>.</>,
  },
  {
    working: <>C: a catalyst lowers the activation energies of the forward and reverse reactions by the <b>same absolute amount</b> — since the forward reaction already has a smaller activation energy here, that fixed decrease is a <i>larger proportion</i> of it, not the same proportion.</>,
    reason: 'Ruled out.',
  },
  {
    working: <>D: since the forward reaction is exothermic, its activation energy is <b>lower</b> than the reverse reaction's, not greater.</>,
    reason: 'Ruled out — states the relationship backwards.',
  },
  {
    working: <b>Only the effect of temperature on the forward rate holds up unconditionally.</b>,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function ChemistryQ15_2020() {
  return (
    <MCQShell
      question={
        <p>
          For the reaction <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" />, which one of the following is
          correct?
        </p>
      }
      options={[
        { letter: 'A', content: 'A catalyst increases the number of collisions between the reactants.' },
        { letter: 'B', content: 'The rate of the forward reaction increases when the temperature increases.', isAnswer: true },
        { letter: 'C', content: 'A catalyst reduces the activation energy of the forward and backward reactions by the same proportion.' },
        { letter: 'D', content: 'The activation energy of the forward reaction is greater than the activation energy of the reverse reaction.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
