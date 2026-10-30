// 2025 Chemistry Exam, MCQ 13. VCAA examination report: 61% correct. Nickel–cadmium secondary
// cell: reversing the discharge reaction for recharge and picking out the reduction
// half-equation. Question text transcribed from the original paper (no diagram). Answer and
// comment from the VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 6, C: 13, D: 61 },
  answer: 'D',
  comment: (
    <>
      Recharge <Chem eq="2Ni(OH)2 + Cd(OH)2 -> 2NiO(OH) + Cd + 2H2O" />
      <br />
      Reduction process is therefore
      <br />
      <Chem eq="Cd(OH)2 + 2e- -> Cd + 2OH-" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Discharge: Cd (oxidation number 0) → Cd(OH)₂ (+2): Cd is <b>oxidised</b>.<br />Ni in NiO(OH) (+3) → Ni(OH)₂ (+2): NiO(OH) is <b>reduced</b>.</>,
    reason: <>Start by finding what is oxidised and reduced in the reaction you are given. In NiO(OH): O is −2 and OH is −1 overall, so Ni = +3; in Ni(OH)₂, Ni = +2.</>,
  },
  {
    working: <>Recharge: <Chem eq="2Ni(OH)2 + Cd(OH)2 -> 2NiO(OH) + Cd + 2H2O" /></>,
    reason: <>Recharging a secondary cell drives the discharge reaction <b>in reverse</b> (an external power supply forces it). So every half-reaction is reversed too: what was oxidised on discharge is now reduced, and vice versa.</>,
  },
  {
    working: <>Recharge reduction: Cd(OH)₂ (+2) → Cd (0)<br /><Chem eq="Cd(OH)2 + 2e- -> Cd + 2OH-" /></>,
    reason: <>Reduction = gain of electrons, so the electrons are on the <b>left</b>. Balanced: 1 Cd, 2 O and 2 H each side; charge −2 = −2.</>,
  },
  {
    working: <>(Recharge oxidation: <Chem eq="Ni(OH)2 + OH- -> NiO(OH) + H2O + e-" />)</>,
    reason: <>For completeness — this is option C, the other half of the recharge reaction.</>,
  },
  {
    working: <b>Reduction during recharge: Cd(OH)₂ + 2e⁻ → Cd + 2OH⁻</b>,
    reason: <>
      Matches option <b>D</b>. The other three are the remaining half-reactions, each a correct
      equation for the wrong process: <b>A</b>, chosen by 20%, is the reduction during{' '}
      <i>discharge</i> (NiO(OH) gaining an electron) — correct for discharge, but recharge reverses
      it. <b>B</b> is the oxidation during discharge (Cd losing electrons), and <b>C</b> is the{' '}
      <i>oxidation</i> during recharge (electrons on the right).
    </>,
  },
]

export default function ChemistryQ13_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">In a nickel–cadmium cell, the following reaction occurs during discharge.</p>
          <p className="mb-3 pl-6"><Chem eq="2NiO(OH) + Cd + 2H2O -> 2Ni(OH)2 + Cd(OH)2" /></p>
          <p>Which one of the following represents the half-equation for reduction during recharge?</p>
        </>
      }
      options={[
        { letter: 'A', content: <Chem eq="NiO(OH) + H2O + e- -> Ni(OH)2 + OH-" /> },
        { letter: 'B', content: <Chem eq="Cd + 2OH- -> Cd(OH)2 + 2e-" /> },
        { letter: 'C', content: <Chem eq="Ni(OH)2 + OH- -> NiO(OH) + H2O + e-" /> },
        { letter: 'D', content: <Chem eq="Cd(OH)2 + 2e- -> Cd + 2OH-" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
