// 2022 Chemistry Exam, MCQ 13. VCAA examination report: 29% correct — the hardest MCQ on this
// paper. Which electrolyte produces a gas at the cathode, found by identifying the strongest
// oxidising agent present in each. Question text transcribed from the original paper. Solution
// is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 29, B: 39, C: 10, D: 21 },
  answer: 'A',
  comment: (
    <>
      KI(aq): oxidants present are K⁺(aq) and H₂O(l). According to the electrochemical series,
      the stronger oxidant is H₂O(l), which is reduced: <Chem eq="2H2O(l) + 2e- -> H2(g) + 2OH-(aq)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>At an inert Pt cathode, the species that gets reduced is whichever <b>oxidising agent present is strongest</b> — so identify all the possible oxidants in each electrolyte first.</>,
    reason: 'The reduction at the cathode always favours the strongest available oxidant.',
  },
  {
    working: <>A: KI(aq) — the only oxidants present are K⁺(aq) and H₂O(l). K⁺ is an extremely weak oxidising agent, so <b>H₂O</b> is reduced: <Chem eq="2H2O(l) + 2e- -> H2(g) + 2OH-(aq)" />.</>,
    reason: <>Produces <b>H₂ gas</b>.</>,
  },
  {
    working: <>B: NaCl(l) (molten) — the only oxidant present is Na⁺(l), reduced to Na(l), a liquid metal.</>,
    reason: 'No gas produced. Ruled out.',
  },
  {
    working: <>C: PbBr₂(l) (molten) — the only oxidant present is Pb²⁺(l), reduced to Pb(s), a solid metal.</>,
    reason: 'No gas produced. Ruled out.',
  },
  {
    working: <>D: CuSO₄(aq) — oxidants present are Cu²⁺(aq) and H₂O(l). Cu²⁺ is the stronger oxidant, so it's reduced instead: <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" />.</>,
    reason: 'Produces solid copper, not a gas. Ruled out.',
  },
  {
    working: <b>Only KI(aq) forces water to be reduced at the cathode, releasing H₂ gas.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ13_2022() {
  return (
    <MCQShell
      question={
        <p>
          An electrolysis cell is set up with inert platinum, Pt, electrodes.
          <br />
          Which one of the following will produce a gas at the cathode when undergoing
          electrolysis in the cell?
        </p>
      }
      options={[
        { letter: 'A', content: 'potassium iodide, KI(aq)', isAnswer: true },
        { letter: 'B', content: 'sodium chloride, NaCl(l)' },
        { letter: 'C', content: 'lead bromide, PbBr₂(l)' },
        { letter: 'D', content: 'copper sulfate, CuSO₄(aq)' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
