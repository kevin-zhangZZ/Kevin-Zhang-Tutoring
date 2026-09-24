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
  comment: (
    <>
      Students could have eliminated the following answers:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Option A: Fuel cell electrodes are not reactive.</li>
        <li>
          Option B: The porosity and catalyst impregnation make fuel cell electrodes more expensive
          to produce than solid electrodes such as graphite.
        </li>
        <li>
          Option D: Fuel cell electrodes do not allow <Chem eq="H2" /> and <Chem eq="O2" /> to react
          directly. The function of a fuel cell is to convert chemical energy into electrical
          energy. If the <Chem eq="H2" /> and <Chem eq="O2" /> were able to directly react together,
          no electrical energy would be produced since chemical energy would be converted directly
          to thermal energy.
        </li>
      </ul>
      Hence, option C was the best alternative because fuel cell electrodes have significantly
      higher surface area than solid electrodes.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="2H2(g) + O2(g) -> 2H2O(l)" className="block text-[13.5px]" />,
    reason: <>The overall cell reaction — but a fuel cell must split this into two separate half-reactions, one at each electrode, with electrons forced through an external circuit rather than transferring directly.</>,
  },
  {
    working: <>D — "provide a surface for H₂ and O₂ to directly react together": this describes ordinary <b>combustion</b>, which a fuel cell is specifically designed to <em>avoid</em>.</>,
    reason: <>If <Chem eq="H2" /> and <Chem eq="O2" /> reacted directly at the electrode surface, the energy would be released as heat, not usable electrical current. <b>False.</b></>,
  },
  {
    working: <>A — "highly reactive": porosity is a physical/structural property, not a measure of chemical reactivity. <b>False</b> (and not really relevant to why porous electrodes specifically help).</>,
  },
  {
    working: <>B — &ldquo;cheap and readily available&rdquo;: the reverse is true — the report notes porosity and catalyst impregnation make these electrodes <em>more</em> expensive than solid ones such as graphite. <b>False.</b></>,
  },
  {
    working: <>C — "more efficient than solid electrodes at moving charges and reactants": porous electrodes have far greater surface area, giving gas, electrolyte and electrode more contact points — the "three-phase boundary" where the actual electrode reaction happens.</>,
    reason: <>More surface area means more sites for ions and electrons to move across at once, speeding up the reaction and current flow. <b>True.</b></>,
  },
  {
    working: <b>Porous electrodes are used because they move charges and reactants more efficiently than a solid electrode could.</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b>, chosen by 40%, describes direct reaction — which would turn the chemical energy straight into heat and produce no electricity, the opposite of what a fuel cell is for.</>,
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
