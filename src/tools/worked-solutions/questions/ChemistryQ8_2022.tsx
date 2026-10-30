// 2022 Chemistry Exam, MCQ 8. VCAA examination report: 65% correct. How a fuel cell differs from
// direct combustion of the same fuel: the oxidising and reducing agents are kept apart, so the
// energy is released as electrical rather than thermal energy. Question text transcribed from the
// original paper (no figures). VCAA report only (no second source). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

// Chem renders a spaced " + " as a superscript charge, so split equations at " + " and print
// the plus signs as plain text.
const Eq = ({ eq }: { eq: string }) => (
  <>{eq.split(' + ').map((p, i) => <span key={i}>{i > 0 && ' + '}<Chem eq={p} /></span>)}</>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 11, C: 10, D: 65 },
  answer: 'D',
  comment: (
    <>
      In fuel cells, like all electrochemical cells, the reactants must be kept apart to ensure the
      conversion of chemical energy to electrical energy. In combustion, where chemical energy is
      converted to thermal energy, the reactants are in direct contact.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Combustion: fuel and O₂ <b>mix and react directly</b>; electrons transfer straight from fuel to O₂ → <b>chemical → thermal energy</b>.</>,
    reason: <>When the reducing agent (the fuel) touches the oxidising agent (O₂), electrons pass directly between them and the energy is released as heat and light.</>,
  },
  {
    working: <>Fuel cell: fuel at the <b>anode</b> (oxidised), O₂ at the <b>cathode</b> (reduced), <b>separated by the electrolyte</b> → <b>chemical → electrical energy</b>.</>,
    reason: <>Because the reactants never meet, the electrons are forced through the external circuit — that flow is the electric current. Keeping the oxidising and reducing agents apart is what makes any electrochemical cell work.</>,
  },
  {
    working: <>A — false: fuel cells are <b>not recharged</b>; fuel is supplied continuously.</>,
    reason: <>A fuel cell produces electricity for as long as fuel and O₂ are fed in and products removed. Recharging belongs to secondary (rechargeable) cells.</>,
  },
  {
    working: <>B — false: e.g. a methane fuel cell, overall <Eq eq="CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)" />, makes the <b>same CO₂</b> as burning methane.</>,
    reason: <>The overall reaction in a fuel cell is the same as the combustion reaction — only the form of the energy released differs — so a carbon-based fuel still produces CO₂, a greenhouse gas.</>,
  },
  {
    working: <>C — false: fuel cells <b>produce</b> electrical energy; they don&rsquo;t need it put in.</>,
    reason: <>The cell reaction is spontaneous; catalysts in the porous electrodes lower the activation energy so it proceeds at a useful rate. Needing electrical energy to drive a reaction describes an electrolytic cell.</>,
  },
  {
    working: <b>Fuel cells have no direct contact between the oxidising and reducing agents.</b>,
    reason: <>Matches option <b>D</b>. <b>A</b> confuses fuel cells with rechargeable (secondary) cells. <b>B</b> assumes every fuel cell runs on hydrogen — a carbon-based fuel gives CO₂ in a fuel cell just as it does in combustion. <b>C</b> describes an electrolytic cell, not a fuel cell.</>,
  },
]

export default function ChemistryQ8_2022() {
  return (
    <MCQShell
      question={<>Unlike direct combustion of fuel, fuel cells</>}
      options={[
        { letter: 'A', content: <>can be recharged.</> },
        { letter: 'B', content: <>do not produce greenhouse gases.</> },
        { letter: 'C', content: <>require electrical energy to overcome the activation energy barrier.</> },
        { letter: 'D', content: <>do not have direct contact between the oxidising and reducing agents.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
