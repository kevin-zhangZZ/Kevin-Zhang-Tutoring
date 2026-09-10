// 2024 Chemistry Exam, MCQ 17. VCAA examination report: 38% correct. What actually happens
// during electrorefining of impure ("blister") copper, by elimination against genuine
// electrolytic-cell chemistry. Question text transcribed from the original paper (rendered from
// page images — the 2024 exam PDF has no extractable text). Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 27, C: 15, D: 38 },
  answer: 'D',
  comment: (
    <>
      When either iron or nickel metals present in the blister copper preferentially undergo
      oxidation, Cu²⁺ ions in solution have to undergo reduction at the cathode. With the loss of
      Cu²⁺ ions from the solution — not matched by an equal input of Cu²⁺ from the impure anode —
      the concentration of Cu²⁺ ions in the electrolyte decreases. The blister of copper needs to
      be the anode; the pure copper is held in place until the blister of copper is totally
      reacted.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Electrorefining copper works by making the <b>impure</b> blister copper the anode (oxidised, dissolving into solution as Cu²⁺) and a strip of <b>pure</b> copper the cathode (where Cu²⁺ is reduced and deposits as pure metal).</>,
    reason: 'Sets up the basic cell arrangement every option has to be checked against.',
  },
  {
    working: <>A: if blister copper were the cathode, it would be the electrode where reduction (deposition) happens — but the whole point is to dissolve the impure copper away, which requires it to be oxidised at the <b>anode</b>, not the cathode.</>,
    reason: 'Backwards — blister copper must be the anode. Ruled out.',
  },
  {
    working: <>B: iron and nickel impurities in the blister copper are <i>more reactive</i> than copper, so they oxidise preferentially at the anode and enter the solution as Fe²⁺/Fe³⁺ and Ni²⁺ ions — they dissolve, they don't fall as solid metal.</>,
    reason: 'Reactive impurities go into solution, not to the bottom as solid. Ruled out.',
  },
  {
    working: <>C: the pure copper product builds up on the cathode as a solid coating over time — it's collected once electrolysis is complete, not continuously "removed as it forms" during the process.</>,
    reason: 'Not how the cathode deposit is actually handled. Ruled out.',
  },
  {
    working: <>D: since Fe and Ni oxidise preferentially at the anode instead of Cu, less Cu²⁺ enters solution from the anode than is removed by deposition at the cathode — so the Cu²⁺ concentration in the electrolyte genuinely does change (decrease) as electrolysis proceeds.</>,
    reason: <>A real, non-obvious consequence of the impurities present. Matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ17_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A piece of blister copper contains 98.5% copper. The blister copper also contains
            other metals, including silver, iron and nickel. Electrolysis in an aqueous solution
            of Cu²⁺ ions is used to produce 99.99% pure copper from the blister copper.
          </p>
          <p>In the electrolysis of the blister copper</p>
        </>
      }
      options={[
        { letter: 'A', content: 'blister copper is used as the cathode.' },
        { letter: 'B', content: 'solid iron falls to the bottom of the electrolysis cell.' },
        { letter: 'C', content: 'the 99.99% pure copper product should be removed as it forms.' },
        { letter: 'D', content: 'the concentration of Cu²⁺ ions in the electrolyte changes during the electrolysis.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
