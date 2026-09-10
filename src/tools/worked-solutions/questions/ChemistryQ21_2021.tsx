// 2021 Chemistry Exam, MCQ 21. VCAA examination report: 31% correct. Which change to a nickel
// electroplating cell would reduce the amount of nickel deposited, reasoned from the
// half-equations at each electrode. Question text transcribed from the original paper. Solution
// is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 31, B: 27, C: 25, D: 17 },
  answer: 'A',
  comment: (
    <>
      If the Ni electrode is replaced with a Cu electrode, Ni²⁺ ions will not be produced at the
      anode, so as reduction occurs at the cathode, the amount of Ni²⁺ ions in the electrolyte
      decreases and the amount of Ni that can be deposited is reduced.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Anode: <Chem eq="Ni(s) -> Ni2+(aq) + 2e-" /> · Cathode: <Chem eq="Ni2+(aq) + 2e- -> Ni(s)" /></>,
    reason: 'The half-equations occurring in the electroplating cell.',
  },
  {
    working: <>Normally, Ni²⁺ produced at the anode replenishes exactly what's consumed at the cathode — the concentration of Ni²⁺ in the electrolyte stays constant, and plating continues steadily.</>,
    reason: <>To <i>reduce</i> the amount of Ni deposited, something needs to break this balance — either favour a different reduction at the cathode, or cut off the supply of Ni²⁺.</>,
  },
  {
    working: <>A: with a Cu anode instead of Ni, the anode reaction becomes <Chem eq="Cu(s) -> Cu2+(aq) + 2e-" /> — no fresh Ni²⁺ is produced at all.</>,
    reason: <>Cathode reduction (<Chem eq="Ni2+ + 2e- -> Ni(s)" />) keeps consuming the existing Ni²⁺ without it being replaced, so the Ni²⁺ concentration — and the rate of Ni deposition — steadily falls.</>,
  },
  {
    working: <>B: switching from molten <Chem eq="Ni(NO3)2(l)" /> to 1 M aqueous <Chem eq="Ni(NO3)2(aq)" /> doesn't change which half-reactions occur at either electrode.</>,
    reason: 'The anode still produces Ni²⁺ at the same rate the cathode consumes it. Ruled out.',
  },
  {
    working: <>C: replacing the inert Pt cathode with Pb(s) doesn't change the half-reactions occurring, since Ni²⁺ is still the strongest oxidising agent present and gets reduced there.</>,
    reason: 'Ruled out.',
  },
  {
    working: <>D: swapping the anion (<Chem eq="NO3-" /> for <Chem eq="Cl-" />) has no effect on the Ni half-reactions at either electrode.</>,
    reason: 'Ruled out.',
  },
  {
    working: <b>Only replacing the Ni electrode with Cu cuts off the supply of Ni²⁺ ions being replenished.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ21_2021() {
  return (
    <MCQShell
      question={
        <p>
          Using the electrochemical series, which one of the following changes to the
          electrolysis cell may reduce the amount of Ni electroplated onto the Pt electrode?
        </p>
      }
      options={[
        { letter: 'A', content: 'replacing the Ni electrode with a Cu electrode', isAnswer: true },
        { letter: 'B', content: 'replacing Ni(NO₃)₂(l) with 1 M Ni(NO₃)₂(aq)' },
        { letter: 'C', content: 'replacing the Pt electrode with Pb(s)' },
        { letter: 'D', content: 'replacing Ni(NO₃)₂(l) with NiCl₂(l)' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
