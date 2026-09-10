// 2022 Chemistry Exam, MCQ 20. VCAA examination report: 34% correct. What happens when a Zn
// rod is placed directly into a mixed Co²⁺/Mn²⁺ solution — testing whether this counts as a
// working electrochemical cell at all. Question text transcribed from the original paper.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 34, B: 34, C: 15, D: 17 },
  answer: 'B',
  comment: (
    <>
      The strongest oxidising agent present is Co²⁺(aq) and the strongest reducing agent is
      Zn(s). Because these entities are in direct contact, the chemical energy is converted
      straight into heat energy via <Chem eq="Co2+(aq) + Zn(s) -> Co(s) + Zn2+(aq)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A single Zn rod is placed directly into a beaker containing <b>both</b> Co²⁺(aq) and Mn²⁺(aq) — there's no salt bridge, no separate half-cells, just one mixed solution.</>,
    reason: 'This is not a properly set-up electrochemical cell at all — it\'s a direct-contact redox reaction.',
  },
  {
    working: <>Comparing standard reduction potentials: <Chem eq="Co2+/Co" /> (highest of the three species present) is the strongest oxidising agent; <Chem eq="Zn(s)" /> is the strongest reducing agent.</>,
    reason: 'Determines which reaction actually proceeds when everything is in direct contact.',
  },
  {
    working: <Chem eq="Co2+(aq) + Zn(s) -> Co(s) + Zn2+(aq)" className="block my-1" />,
    reason: 'The reaction that occurs — Zn is oxidised, Co²⁺ is reduced, directly (no wire, no controlled electron flow).',
  },
  {
    working: <>Since oxidant and reductant are in direct physical contact, no useful electrical work can be extracted — the chemical energy released converts straight into <b>heat</b>, exactly like any uncontrolled reaction in a beaker.</>,
    reason: <>Matches option <b>B</b>.</>,
  },
  {
    working: <>A: no voltmeter is even connected in a working circuit — there's no "produces 0.48 V" reading to be had from a reaction happening in direct contact.</>,
    reason: 'Ruled out.',
  },
  {
    working: <>C: Zn(s) losing electrons <i>decreases</i> the amount of solid Zn and increases Zn²⁺(aq) — but that's a statement about Zn's own fate, and doesn't correctly describe "concentration of ions" in general (Co²⁺ is simultaneously being consumed).</>,
    reason: 'Ruled out — an incomplete/misleading description.',
  },
  {
    working: <>D: Zn is already the stronger reducing agent than Mn — it doesn't need an applied voltage to react; it reacts with Co²⁺ spontaneously as soon as it's placed in the solution.</>,
    reason: 'Ruled out.',
  },
]

export default function ChemistryQ20_2022() {
  return (
    <MCQShell
      question={
        <p>
          A student places a Zn(s) rod directly into a beaker containing 1 M Co(NO₃)₂(aq) and 1 M
          Mn(NO₃)₂(aq), with no salt bridge or separate half-cells.
          <br />
          Which one of the following is correct?
        </p>
      }
      options={[
        { letter: 'A', content: 'In the beaker, the reaction between Zn(s) and Co²⁺(aq) produces 0.48 V.' },
        { letter: 'B', content: 'In the beaker, chemical energy stored in the reactants is converted to heat energy.', isAnswer: true },
        { letter: 'C', content: 'In the beaker, the concentration of ions increases because Zn(s) loses 2e⁻.' },
        { letter: 'D', content: 'In the beaker, a voltage of greater than 0.42 V must be applied to Zn(s) so that it reacts with Mn²⁺(aq).' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
