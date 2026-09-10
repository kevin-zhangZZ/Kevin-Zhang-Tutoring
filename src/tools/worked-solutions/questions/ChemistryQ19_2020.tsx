// 2020 Chemistry Exam, MCQ 19. VCAA examination report: 22% correct. Identifying the change
// made to an NO₂/N₂O₄ equilibrium, and the resulting colour change, from a forward-reaction
// rate–time graph. Question text transcribed from the original paper; the graph is cropped
// directly from the original VCAA exam PDF, not a redrawing. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import rateGraphSrc from './chem-2020-mcq19-rate-graph.png'

const RATE_GRAPH = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
    <img src={rateGraphSrc} alt="Graph of the rate of the forward reaction versus time: constant until t1, then rising to a new, higher steady rate by t2, from the original 2020 VCAA exam paper" className="w-full max-w-[380px]" />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 22, C: 53, D: 5 },
  answer: 'B',
  comment: (
    <>
      Since the forward reaction is exothermic, a temperature increase will favour the reverse
      (endothermic) reaction. The position of equilibrium shifts to the left, and as the
      concentration of NO₂ increases, the colour of the mixture will darken.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="2NO2(g) <=> N2O4(g)" className="mr-2" />,
    reason: <>ΔH = −57.2 kJ mol⁻¹: the <b>forward</b> reaction (making colourless N₂O₄) is exothermic.</>,
  },
  {
    working: RATE_GRAPH,
    reason: <>The graph shows the forward reaction's rate genuinely <b>increasing</b> from t₁ to a new, higher steady rate at t₂.</>,
  },
  {
    working: <>A change in temperature affects the rate of <i>every</i> reaction, forward and reverse alike — a rate increase can only come from a temperature <b>increase</b> (a decrease would slow every reaction down, including the forward one).</>,
    reason: 'This is the key reasoning that rules out a concentration or catalyst change too — only temperature affects both the forward and reverse rate constants.',
  },
  {
    working: <>This rules out options C and D, both of which claim the temperature <b>decreased</b>.</>,
    reason: 'Narrows the choice to A or B — both "temperature increased", differing only in the colour change.',
  },
  {
    working: <>Since the forward reaction is exothermic, adding heat (raising the temperature) shifts the equilibrium <b>away</b> from the exothermic direction — favouring the reverse, endothermic reaction instead.</>,
    reason: "Le Chatelier's principle.",
  },
  {
    working: <>The reverse reaction, <Chem eq="N2O4(g) -> 2NO2(g)" />, produces more of the brown gas, NO₂.</>,
    reason: 'This is the direction favoured after the temperature rise.',
  },
  {
    working: <b>More NO₂ present at the new equilibrium means the mixture's colour darkens.</b>,
    reason: <>Matches option <b>B</b>: temperature increased, colour darkened.</>,
  },
]

export default function ChemistryQ19_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Nitrogen dioxide, NO₂ (brown), and dinitrogen tetroxide, N₂O₄ (colourless), form an
            equilibrium mixture:
          </p>
          <Chem eq="2NO2(g) <=> N2O4(g)" className="block text-[14px] my-2" />
          <p className="mb-2">ΔH = −57.2 kJ mol⁻¹</p>
          <p className="mb-2">
            A change was made at time t₁ to an equilibrium mixture of NO₂ and N₂O₄, which achieved
            a new equilibrium at time t₂. A graph showing the rate of the forward reaction is shown
            below.
          </p>
          <div className="mb-2">{RATE_GRAPH}</div>
          <p>
            Which one of the following describes the change made and the colour change that
            occurred between t₁ and t₂?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'The temperature was increased and the colour lightened.' },
        { letter: 'B', content: 'The temperature was increased and the colour darkened.', isAnswer: true },
        { letter: 'C', content: 'The temperature was decreased and the colour lightened.' },
        { letter: 'D', content: 'The temperature was decreased and the colour darkened.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
