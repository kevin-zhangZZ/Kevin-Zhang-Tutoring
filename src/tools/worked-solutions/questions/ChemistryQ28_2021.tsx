// 2021 Chemistry Exam, MCQ 28. VCAA examination report: 22% correct. Deducing how the
// equilibrium constant and total chemical energy changed, given only that the reverse-reaction
// rate increased after a change to an endothermic-forward equilibrium. Question text
// transcribed from the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 18, C: 29, D: 31 },
  answer: 'A',
  comment: (
    <>
      The only factor that changes the equilibrium constant is a temperature change. Since the
      rate of the reverse reaction is higher at t₅, the temperature must have increased. With the
      endothermic forward reaction favoured, the total chemical energy of the system increases.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="1/2 H2(g) + 1/2 I2(g) <=> HI(g)" className="mr-2" />,
    reason: 'ΔH = +25.9 kJ mol⁻¹: the forward reaction is endothermic.',
  },
  {
    working: <>The equilibrium <b>constant</b> only ever changes in response to a <b>temperature</b> change — nothing else (concentration, volume, catalyst) alters K.</>,
    reason: <>Since the question states K changed at <Chem eq="t4" />, temperature must be what changed.</>,
  },
  {
    working: <>A temperature <b>increase</b> speeds up every reaction — both forward and reverse rates rise. A temperature <b>decrease</b> would do the opposite, slowing the reverse reaction down.</>,
    reason: <>Given the reverse rate at <Chem eq="t5" /> is <i>higher</i> than before, the temperature must have <b>increased</b>.</>,
  },
  {
    working: <>Since the forward reaction is endothermic, a temperature increase shifts the equilibrium <b>toward the products</b> (favouring the direction that absorbs the added heat).</>,
    reason: "Le Chatelier's principle — this also increases the equilibrium constant K, confirming the earlier deduction.",
  },
  {
    working: <>Favouring the endothermic forward reaction means more energy has been <b>absorbed</b> into the system overall.</>,
    reason: 'The total chemical energy of the system increases.',
  },
  {
    working: <b>Equilibrium constant: increase. Total chemical energy: increase.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ28_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Hydrogen, H₂, and iodine, I₂, react to form hydrogen iodide, HI.</p>
          <Chem eq="1/2 H2(g) + 1/2 I2(g) <=> HI(g)" className="block text-[14px] my-2" />
          <p className="mb-2">ΔH = +25.9 kJ mol⁻¹</p>
          <p className="mb-2">
            One change was made to the equilibrium system at time t₄, which altered the
            equilibrium constant. Equilibrium was re-established at time t₅. The rate of the
            reverse reaction at time t₅ was higher than at an earlier time t₃.
          </p>
          <p>
            Which of the following options correctly shows the change in the equilibrium system
            from time t₃ to time t₅?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'Equilibrium constant: increase. Total chemical energy: increase.', isAnswer: true },
        { letter: 'B', content: 'Equilibrium constant: increase. Total chemical energy: decrease.' },
        { letter: 'C', content: 'Equilibrium constant: decrease. Total chemical energy: increase.' },
        { letter: 'D', content: 'Equilibrium constant: decrease. Total chemical energy: decrease.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
