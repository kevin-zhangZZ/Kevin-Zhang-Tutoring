// 2021 Chemistry Exam, MCQ 28. VCAA examination report: 22% correct. Deducing how the
// equilibrium constant and total chemical energy changed, given only that the reverse-reaction
// rate increased after a change to an endothermic-forward equilibrium. Question text
// transcribed from the original paper; the graph (shared with Question 27) is cropped from the
// original VCAA exam PDF. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './chem-2021-mcq27-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 18, C: 29, D: 31 },
  answer: 'A',
  comment: (
    <>
      The only factor that can cause the value of the equilibrium constant for a particular
      equilibrium to change is a change in temperature at <i>t</i>₄.
      <br />
      If the rate of the reverse reaction at <i>t</i>₅ is higher following the temperature change at{' '}
      <i>t</i>₄, the temperature must have increased.
      <br />
      According to <Chem eq="1/2 H2(g) + 1/2 I2(g) <=> HI(g)" />; Δ<i>H</i> = +25.9 kJ mol⁻¹, the
      endothermic forward reaction is favoured, so the total chemical energy of the system will
      have increased.
      <br />
      Options C and D attracted 60 per cent of responses. Many of those students simply assumed
      since the rate of reverse reaction was favoured by the change and, since the reverse
      reaction was exothermic, there was a temperature decrease.
      <br />
      Since the forward reaction is favoured as the system returns to equilibrium at the higher
      temperature, the rate of the forward reaction increases and the rate of the reverse reaction
      decreases. However, at the new equilibrium the rate of the reverse reaction is still higher
      than prior to the temperature increases at <i>t</i>₄.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="1/2 H2(g) + 1/2 I2(g) <=> HI(g)" className="mr-2" />,
    reason: <>ΔH = +25.9 kJ mol⁻¹: the forward reaction is endothermic.</>,
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
    reason: <>Le Chatelier's principle — this also increases the equilibrium constant K, confirming the earlier deduction.</>,
  },
  {
    working: <>Favouring the endothermic forward reaction means more energy has been <b>absorbed</b> into the system overall.</>,
    reason: <>The total chemical energy of the system increases.</>,
  },
  {
    working: <b>Equilibrium constant: increase. Total chemical energy: increase.</b>,
    reason: <>Matches option <b>A</b>. Options <b>C</b> and <b>D</b>, 60% between them, assume the temperature fell because the reverse (exothermic) rate was higher — as the report says.</>,
  },
]

export default function ChemistryQ28_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 27 and 28.</p>
          <p className="mb-2">Hydrogen, H₂, and iodine, I₂, react to form hydrogen iodide, HI.</p>
          <p className="mb-2">
            <Chem eq="1/2 H2(g) + 1/2 I2(g) <=> HI(g)" /> &nbsp;&nbsp;&nbsp; Δ<i>H</i> = +25.9 kJ mol⁻¹
          </p>
          <p className="mb-2">
            The graph below shows the concentrations of H₂, I₂ and HI in a sealed container. One
            change was made to the equilibrium system at time <i>t</i>₂.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={graphSrc}
              alt="Concentration (M) against time: the I₂, H₂ and HI concentrations are constant until t₂, where each steps up to double its value, then stay constant to t₄; times t₁ to t₅ are marked — from the original 2021 VCAA exam paper"
              className="w-full max-w-[440px]"
            />
          </div>
          <p className="mb-2">
            One change was made to the equilibrium system at time <i>t</i>₄, which altered the
            equilibrium constant. Equilibrium was re-established at time <i>t</i>₅. The rate of the
            reverse reaction at time <i>t</i>₅ was higher than at time <i>t</i>₃.
          </p>
          <p>
            Which of the following options correctly shows the change in the equilibrium system
            from time <i>t</i>₃ to time <i>t</i>₅?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'Equilibrium constant: increase · Total chemical energy: increase', isAnswer: true },
        { letter: 'B', content: 'Equilibrium constant: increase · Total chemical energy: decrease' },
        { letter: 'C', content: 'Equilibrium constant: decrease · Total chemical energy: increase' },
        { letter: 'D', content: 'Equilibrium constant: decrease · Total chemical energy: decrease' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
