// 2018 Chemistry Exam, MCQ 12. VCAA examination report: 49% correct — the third-hardest MCQ on
// the 2018 paper. Why porous electrodes in an acidic fuel cell — and the trap that a fuel cell
// deliberately keeps H2 and O2 from reacting directly.
// Question text transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 6, C: 49, D: 40 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="2H2(g) + O2(g) -> 2H2O(l)" className="block text-[13.5px]" />,
    reason: 'The overall cell reaction — but a fuel cell must split this into two separate half-reactions, one at each electrode, with electrons forced through an external circuit rather than transferring directly.',
  },
  {
    working: <>D — "provide a surface for H₂ and O₂ to directly react together": this describes ordinary <b>combustion</b>, which a fuel cell is specifically designed to <em>avoid</em>.</>,
    reason: <>If <Chem eq="H2" /> and <Chem eq="O2" /> reacted directly at the electrode surface, the energy would be released as heat, not usable electrical current. <b>False.</b></>,
  },
  {
    working: <>A — "highly reactive": porosity is a physical/structural property, not a measure of chemical reactivity. <b>False</b> (and not really relevant to why porous electrodes specifically help).</>,
  },
  {
    working: <>B — "cheap and readily available": doesn't explain why <em>porosity</em> specifically matters — cost has nothing to do with pore structure. <b>False.</b></>,
  },
  {
    working: <>C — "more efficient than solid electrodes at moving charges and reactants": porous electrodes have far greater surface area, giving gas, electrolyte and electrode more contact points — the "three-phase boundary" where the actual electrode reaction happens.</>,
    reason: <>More surface area means more sites for ions and electrons to move across at once, speeding up the reaction and current flow. <b>True.</b></>,
  },
  {
    working: <b>Porous electrodes are used because they move charges and reactants more efficiently than a solid electrode could.</b>,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function ChemistryQ12_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The overall reaction for an acidic fuel cell is shown below.</p>
          <Chem eq="2H2 + O2 -> 2H2O" className="block text-[14px] my-2" />
          <p>Porous electrodes are often used in acidic fuel cells because they</p>
        </>
      }
      options={[
        { letter: 'A', content: 'are highly reactive.' },
        { letter: 'B', content: 'are cheap to produce and readily available.' },
        { letter: 'C', content: 'are more efficient than solid electrodes at moving charges and reactants.', isAnswer: true },
        { letter: 'D', content: 'provide a surface for the hydrogen and oxygen to directly react together.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
