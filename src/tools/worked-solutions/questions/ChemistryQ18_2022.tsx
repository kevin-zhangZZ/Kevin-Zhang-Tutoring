// 2022 Chemistry Exam, MCQ 18. VCAA examination report: 44% correct. Choosing the electrodes and
// solutions for a Sn⁴⁺/Sn²⁺ ‖ Ag⁺/Ag galvanic cell: both members of each conjugate pair must be
// present, with an inert electrode where neither is a metal. Question text transcribed from the
// original paper; the paper's table of options is written out as text, row by row. The report's
// half-equation "Sn²⁺(aq) + e⁻ ⇋ Sn(s)" is a slip for 2e⁻, kept verbatim. E° values are the same in
// the 2022 and 2026 Data Books. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { ReactNode } from 'react'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 13, C: 44, D: 20 },
  answer: 'C',
  comment: (
    <>
      Using the relevant parts of the electrochemical series:
      <br />
      <Chem eq="Ag+(aq) + e- <=> Ag(s)" /> &nbsp; +0.80 V
      <br />
      <Chem eq="Sn4+(aq) + 2e- <=> Sn2+(aq)" /> &nbsp; +0.15 V
      <br />
      <Chem eq="Sn2+(aq) + e- <=> Sn(s)" /> &nbsp; −0.14 V
      <br />
      To match the investigation stated in the stem of this question, one half-cell must contain
      Sn⁴⁺ and Sn²⁺, while the other half-cell must contain Ag⁺ and Ag.
      <br />
      Hence, options A and B will not produce an electrochemical cell that directly explores the
      desired investigation. Sn will always be the reductant.
      <br />
      Option D does not produce an operational galvanic cell.
      <br />
      The half-equations for the Sn⁴⁺(aq)/Sn²⁺(aq) // Ag⁺(aq)/Ag(s) cell will be:
      <br />
      (−) <Chem eq="Sn2+(aq) -> Sn4+(aq) + 2e-" />
      <br />
      (+) <Chem eq="Ag+(aq) + e- -> Ag(s)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Sn⁴⁺/Sn²⁺ half-cell: needs <b>both</b> Sn⁴⁺(aq) and Sn²⁺(aq) in solution and an <b>inert</b> electrode (graphite).</>,
    reason: <>A half-cell holds both members of one conjugate redox pair. Here both members are ions, so neither can be the electrode; an inert conductor (graphite or Pt) carries the electrons. A Sn electrode would bring in a different pair, Sn²⁺/Sn.</>,
  },
  {
    working: <>Ag⁺/Ag half-cell: Ag(s) electrode in AgNO₃(aq).</>,
    reason: <>The metal of the pair is itself the electrode, dipping into a solution of its ion.</>,
  },
  {
    working: (
      <>
        <Chem eq="Ag+(aq) + e- <=> Ag(s)" /> &nbsp; +0.80 V
        <br />
        <Chem eq="Sn4+(aq) + 2e- <=> Sn2+(aq)" /> &nbsp; +0.15 V
      </>
    ),
    reason: <>E° values from the electrochemical series (Data Book). Ag⁺ is the stronger oxidising agent, so it is reduced; Sn²⁺ (on the right of the lower half-equation) is the reducing agent, so it is oxidised.</>,
  },
  {
    working: (
      <>
        Cathode (+), Ag electrode: <Chem eq="Ag+(aq) + e- -> Ag(s)" />
        <br />
        Anode (−), graphite: <Chem eq="Sn2+(aq) -> Sn4+(aq) + 2e-" />
        <br />
        <i>E</i>°<sub>cell</sub> = 0.80 − 0.15 = 0.65 V
      </>
    ),
    reason: <>Oxidation at the anode, which is negative in a galvanic cell; reduction at the cathode (positive). The higher half-equation runs forward and the lower one in reverse, so the reaction is spontaneous and the cell operates. This is option <b>C</b>.</>,
  },
  {
    working: <>A: Sn electrode in Sn(NO₃)₂ only — this is a Sn²⁺/Sn half-cell. B: Sn electrode in the Sn⁴⁺/Sn²⁺ solution — the Sn(s) electrode is the strongest reductant present and reacts.</>,
    reason: <>A Sn electrode with Ag⁺ on the other side would give a working cell, but the stem asks for a Sn⁴⁺/Sn²⁺ half-cell. In both A and B, Sn(s) is the reductant (Sn → Sn²⁺ + 2e⁻, −0.14 V), so neither investigates the Sn⁴⁺/Sn²⁺ half-cell asked about. In B, Sn(s) also reacts directly with Sn⁴⁺ in its own beaker.</>,
  },
  {
    working: <>D: graphite in Sn(NO₃)₄ only. The only reductant in the whole cell is Ag(s), and the only oxidants are Ag⁺ and Sn⁴⁺. Ag(s) cannot reduce Sn⁴⁺ (+0.80 V is above +0.15 V).</>,
    reason: <>With no Sn²⁺ there is nothing in the tin half-cell to oxidise, so no spontaneous reaction links the two half-cells: no current flows.</>,
  },
  {
    working: <b>Graphite in 1 M Sn(NO₃)₄ and 1 M Sn(NO₃)₂; Ag in 1 M AgNO₃.</b>,
    reason: <>Matches option <b>C</b>. Options <b>A</b> and <b>B</b> use a Sn electrode, so tin metal is oxidised and the cell is really built around the Sn²⁺/Sn pair. Option <b>D</b> leaves out Sn²⁺, so the tin half-cell has no reducing agent and the cell cannot operate. (The report&rsquo;s third half-equation, &ldquo;Sn²⁺(aq) + e⁻ ⇋ Sn(s)&rdquo;, should have 2e⁻; it does not affect the answer.)</>,
  },
]

const opt = (snE: string, snSol: ReactNode, agE: string) => (
  <>
    Sn⁴⁺/Sn²⁺ half-cell — Electrode: {snE} · Solution(s): {snSol}
    <br />
    Ag⁺/Ag half-cell — Electrode: {agE} · Solution: 1 M AgNO₃
  </>
)

export default function ChemistryQ18_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A student wants to investigate a galvanic cell consisting of Sn⁴⁺/Sn²⁺ and Ag⁺/Ag
            half-cells.
          </p>
          <p>
            Which one of the following combinations of electrodes and solutions will produce an
            operational galvanic cell?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: opt('Sn', '1 M Sn(NO₃)₂', 'graphite') },
        { letter: 'B', content: opt('Sn', '1 M Sn(NO₃)₄, 1 M Sn(NO₃)₂', 'graphite') },
        { letter: 'C', content: opt('graphite', '1 M Sn(NO₃)₄, 1 M Sn(NO₃)₂', 'Ag'), isAnswer: true },
        { letter: 'D', content: opt('graphite', '1 M Sn(NO₃)₄', 'Ag') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
