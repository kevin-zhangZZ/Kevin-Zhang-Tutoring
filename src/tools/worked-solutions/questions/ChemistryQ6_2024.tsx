// 2024 Chemistry Exam, MCQ 6. VCAA examination report: 43% correct. A galvanic cell made from an
// acidified iodate/iodine half-cell (E° given as +1.20 V) and an O₂/alkaline half-cell: deciding
// which half-cell is the anode, what the reducing agent is, and how [OH⁻] changes at the negative
// electrode. Question text transcribed from the original paper (rendered from page images — the
// 2024 exam PDF has no extractable text). VCAA report only. E° values from the Data Book (the
// O₂/OH⁻ value, +0.40 V, is the same in the 2024 and 2026 Data Books). Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 29, C: 43, D: 16 },
  answer: 'C',
  comment: (
    <>
      The negative electrode is the anode where oxidation occurs and this takes place in half-cell
      2. Therefore, the following reaction will occur in this half-cell:
      <br />
      <Chem eq="4OH- (aq) -> O2(g) + 2H2O(l) + 4e-" />
      <br />
      and the concentration of the hydroxide ion will decrease.
      <br />
      I₂ is produced at the cathode.
      <br />
      The reducing agent is the hydroxide ion.
      <br />
      No electrode undergoes a mass change.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        Half-cell 1: <Chem eq="IO₃-(aq) + 6H+(aq) + 5e- <=> ½I2(aq) + 3H2O(l)" />, <i>E</i>° = +1.20 V
        <br />
        Half-cell 2: <Chem eq="O2(g) + 2H2O(l) + 4e- <=> 4OH-(aq)" />, <i>E</i>° = +0.40 V
      </>
    ),
    reason: (
      <>
        Write down both half-equations first. Half-cell 1&rsquo;s is given in the stem. Half-cell 2
        holds O₂ in an <b>alkaline</b> solution, so its half-equation is the O₂/OH⁻ one from the
        Data Book&rsquo;s electrochemical series (not the acidic O₂/H₂O one, +1.23 V).
      </>
    ),
  },
  {
    working: (
      <>
        +1.20 V &gt; +0.40 V, so IO₃⁻ is the stronger oxidising agent.
        <br />
        Cathode (positive electrode, half-cell 1), reduction:
        <br />
        <Chem eq="IO₃-(aq) + 6H+(aq) + 5e- -> ½I2(aq) + 3H2O(l)" />
      </>
    ),
    reason: (
      <>
        In a galvanic cell the half-reaction with the <b>higher</b> <i>E</i>° goes forward as a{' '}
        <b>reduction</b>. That electrode is the cathode, and in a galvanic cell the cathode is the{' '}
        <b>positive</b> electrode.
      </>
    ),
  },
  {
    working: (
      <>
        Anode (negative electrode, half-cell 2), oxidation — the O₂/OH⁻ half-equation reversed:
        <br />
        <Chem eq="4OH-(aq) -> O2(g) + 2H2O(l) + 4e-" />
        <br />
        Reducing agent: OH⁻ (it loses electrons).
      </>
    ),
    reason: (
      <>
        The half-reaction with the <b>lower</b> <i>E</i>° runs in <b>reverse</b>, as an oxidation, at
        the anode — the <b>negative</b> electrode of a galvanic cell. Reading the reversed equation,
        OH⁻ is the species that is oxidised, so it is the reducing agent. O₂ is a product here, not a
        reactant.
      </>
    ),
  },
  {
    working: (
      <>
        A — at the cathode IO₃⁻ is reduced to I₂, so no H₂ forms. <b>False</b>.
        <br />
        B — the oxidising agent is IO₃⁻, but the reducing agent is OH⁻, not O₂. <b>False</b>.
        <br />
        C — OH⁻ is used up at the negative electrode, so [OH⁻] decreases there. <b>True</b>.
        <br />
        D — the electrodes are inert, and no solid forms or reacts in half-cell 1, so its electrode
        mass does not change. <b>False</b>.
      </>
    ),
    reason: (
      <>
        Check each option against the two half-equations. For D: an inert electrode (e.g. platinum or
        graphite) only carries electrons and is not a reactant, and both IO₃⁻ and I₂ are dissolved
        (aq), so nothing is deposited on or removed from it.
      </>
    ),
  },
  {
    working: <b>The concentration of OH⁻ ions decreases at the negative electrode.</b>,
    reason: (
      <>
        Matches option <b>C</b>. Option <b>B</b>, chosen by 29%, takes O₂ — the gas supplied to
        half-cell 2 — as the reducing agent. But O₂ is the <i>oxidised</i> form in its conjugate
        pair (O₂/OH⁻), so it can only be reduced, never oxidised; in this cell it is a product of
        the oxidation of OH⁻. Sanity check: the cell voltage is 1.20 − 0.40 = 0.80 V, positive, so
        this is the spontaneous direction.
      </>
    ),
  },
]

export default function ChemistryQ6_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following half-equation.</p>
          <p className="mb-2 pl-6">
            <Chem eq="IO₃-(aq) + 6H+(aq) + 5e- <=> ½I2(aq) + 3H2O(l)" />
            <span className="ml-6">
              <i>E</i>° = +1.20 V
            </span>
          </p>
          <p className="mb-1">A galvanic cell is set up using inert electrodes and the following chemicals:</p>
          <ul className="list-disc pl-5 mb-2 flex flex-col gap-1">
            <li>
              half-cell 1: 1.0 M acidified solution of potassium iodate/iodine solution,{' '}
              <Chem eq="KIO3(aq)" />/<Chem eq="I2(aq)" />
            </li>
            <li>
              half-cell 2: oxygen gas, <Chem eq="O2(g)" />, in an alkaline solution.
            </li>
          </ul>
          <p>Which one of the following statements is correct when the galvanic cell is operating?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Hydrogen gas is produced at the cathode.' },
        { letter: 'B', content: <>The oxidising agent is <Chem eq="IO₃-" /> and the reducing agent is <Chem eq="O2" />.</> },
        { letter: 'C', content: <>The concentration of <Chem eq="OH-" /> ions decreases at the negative electrode.</>, isAnswer: true },
        { letter: 'D', content: 'The mass of the electrode in half-cell 1 decreases.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
