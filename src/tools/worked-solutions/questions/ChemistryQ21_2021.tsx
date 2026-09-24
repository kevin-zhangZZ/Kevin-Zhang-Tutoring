// 2021 Chemistry Exam, MCQ 21. VCAA examination report: 31% correct. Which change to a nickel
// electroplating cell would reduce the amount of nickel deposited, reasoned from the
// half-equations at each electrode. Question text transcribed from the original paper; the cell
// diagram is cropped from the original VCAA exam PDF. The report's comment writes Ni(NO₃)₃(aq)
// for Ni(NO₃)₂(aq) — kept verbatim and explained in the working. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import cellSrc from './chem-2021-mcq21-cell.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 31, B: 27, C: 25, D: 17 },
  answer: 'A',
  comment: (
    <>
      The half-equations occurring in the electroplating cell are:
      <br />
      Anode: Ni → Ni²⁺ + 2e; Cathode: Ni²⁺ + 2e⁻ → Ni
      <br />
      Prior to the change Ni²⁺ ions were produced at the anode and consumed at the cathode so the
      amount of Ni²⁺ ions in the electrolyte remained constant.
      <br />
      If the amount of Ni electroplated on the cell is reduced following the change to the cell,
      the change must have caused either an alternative reduction half-reaction to be favoured or
      decrease in the amount Ni²⁺ ions available to be reduced.
      <br />
      Consider the correct Option A:
      <br />
      If the Ni electrode is replaced with a Cu electrode, Ni²⁺ ions will not be produced at the
      anode, so as reduction occurs at the cathode the amount of Ni²⁺ ions in the electrolyte
      decreases and the amount of Ni that can be deposited is reduced.
      <br />
      Options B, C and D do not affect the half-reactions occuring at the electrodes. While
      replacing the <Chem eq="Ni(NO3)2(l)" /> with <Chem eq="Ni(NO3)3(aq)" /> will decrease the
      amount of Ni²⁺ ions in the electrolyte, it does not impact on the amount of Ni²⁺ produced at
      the anode, hence the amount of Ni²⁺ ions that can be transferred from the anode and reduced
      at the cathode.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Anode: <Chem eq="Ni(s) -> Ni2+(aq) + 2e-" /> · Cathode: <Chem eq="Ni2+(aq) + 2e- -> Ni(s)" /></>,
    reason: <>The half-equations occurring in the electroplating cell. The Ni electrode is joined to the positive terminal, so it is the anode; the Pt electrode is the cathode, where Ni is plated.</>,
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
    working: <>B: switching from molten <Chem eq="Ni(NO3)2(l)" /> to 1 M aqueous <Chem eq="Ni(NO3)2(aq)" /> doesn't change which half-reactions occur at either electrode: Ni²⁺ is still a stronger oxidising agent than water, and Ni a stronger reducing agent than water.</>,
    reason: <>There are fewer Ni²⁺ ions in the electrolyte, but the anode still replaces each one the cathode uses. Ruled out. (The report&rsquo;s comment writes <Chem eq="Ni(NO3)3(aq)" /> here, a slip for <Chem eq="Ni(NO3)2(aq)" />.)</>,
  },
  {
    working: <>C: replacing the inert Pt cathode with Pb(s) doesn't change the half-reactions occurring, since Ni²⁺ is still the strongest oxidising agent present and gets reduced there.</>,
    reason: <>Ruled out.</>,
  },
  {
    working: <>D: swapping the anion (<Chem eq="NO3-" /> for <Chem eq="Cl-" />) has no effect on the Ni half-reactions at either electrode.</>,
    reason: <>Ruled out.</>,
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
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 20 and 21.</p>
          <p className="mb-2">An electrolysis cell with a 5 V power supply is shown below.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={cellSrc}
              alt="Electrolysis cell: a Ni electrode joined to the positive terminal and a Pt electrode joined to the negative terminal of a 5 V power supply, both dipping into molten Ni(NO₃)₂(l) — from the original 2021 VCAA exam paper"
              className="w-full max-w-[320px]"
            />
          </div>
          <p>
            Using the electrochemical series, which one of the following changes to the
            electrolysis cell may reduce the amount of Ni electroplated onto the Pt electrode?
          </p>
        </>
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
