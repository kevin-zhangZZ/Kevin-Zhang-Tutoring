// 2024 Chemistry Exam, MCQ 5. VCAA examination report: 54% correct. Energy transformation and
// direction of electron flow in a Sn⁴⁺/Sn²⁺ | Pb²⁺/Pb galvanic cell. Question text transcribed
// from the original paper (rendered from page images — the 2024 exam PDF has no extractable
// text); the cell diagram is cropped from the original VCAA exam PDF. E° values are the same in
// the 2024 and 2026 Data Books. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import cellSrc from './chem-2024-mcq5-cell.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 11, C: 54, D: 20 },
  answer: 'C',
  comment: (
    <>
      All galvanic cells transform chemical energy to electrical energy. Therefore, when operating,
      a galvanic cell&rsquo;s stored chemical energy will decrease as it produces electrical energy.
      <br />
      The direction of electron flow occurs from half-cell B to half-cell A because Pb(s) is the
      strongest reductant and <Chem eq="Sn4+(aq)" /> is the strongest oxidant.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Galvanic cell: <b>chemical energy → electrical energy</b>, so the total chemical energy <b>decreases</b>.</>,
    reason: <>A galvanic cell runs a spontaneous redox reaction; the energy delivered to the load comes from the chemicals, so their stored chemical energy goes down as the cell operates. (Chemical energy increases only in an electrolytic cell, such as a battery being recharged.) This rules out A and B.</>,
  },
  {
    working: <>
      <Chem eq="Sn4+(aq) + 2e- <=> Sn2+(aq)" />&emsp;<i>E</i>° = +0.15 V<br />
      <Chem eq="Pb2+(aq) + 2e- <=> Pb(s)" />&emsp;<i>E</i>° = −0.13 V
    </>,
    reason: <>Data Book electrochemical series. The species present are Sn⁴⁺, Sn²⁺ and Pt in half-cell A, and Pb²⁺ and Pb in half-cell B.</>,
  },
  {
    working: <>Strongest oxidising agent: <Chem eq="Sn4+(aq)" /> (higher <i>E</i>°) — <b>reduced</b> in half-cell A (cathode)<br />Strongest reducing agent: <Chem eq="Pb(s)" /> (lower <i>E</i>°) — <b>oxidised</b> in half-cell B (anode)</>,
    reason: <>The reaction that occurs is between the strongest oxidising agent present (the left-hand species of the half-equation with the higher <i>E</i>°) and the strongest reducing agent present (the right-hand species of the half-equation with the lower <i>E</i>°). Sn²⁺ is not the reactant here — it is a product, and Pt is an inert electrode.</>,
  },
  {
    working: <>
      Anode (B): <Chem eq="Pb(s) -> Pb2+(aq) + 2e-" /><br />
      Cathode (A): <Chem eq="Sn4+(aq) + 2e- -> Sn2+(aq)" /><br />
      Overall: <Chem eq="Pb(s) + Sn4+(aq) -> Pb2+(aq) + Sn2+(aq)" />
    </>,
    reason: <>Electrons are released at the anode (Pb electrode) and consumed at the cathode (Pt electrode), so they flow through the external circuit <b>from half-cell B to half-cell A</b>. Cell potential = 0.15 − (−0.13) = 0.28 V, positive as expected for a spontaneous reaction.</>,
  },
  {
    working: <b>Total chemical energy decreases; electrons flow to half-cell A.</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b>, chosen by 20%, has the electron flow reversed: Sn⁴⁺ is reduced in half-cell A, so A is the cathode, where electrons arrive. Options <b>A</b> and <b>B</b> describe chemical energy increasing, which happens when a cell is being recharged, not when it operates as a galvanic cell.</>,
  },
]

export default function ChemistryQ5_2024() {
  return (
    <MCQShell
      question={
        <>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={cellSrc}
              alt="A galvanic cell: half-cell A has a Pt(s) electrode in Sn⁴⁺(aq)/Sn²⁺(aq); half-cell B has a Pb(s) electrode in Pb²⁺(aq); the half-cells are joined by a salt bridge and by wires through a load — from the original 2024 VCAA exam paper"
              className="w-full max-w-[520px]"
            />
          </div>
          <p>When the galvanic cell is operating</p>
        </>
      }
      options={[
        { letter: 'A', content: 'total chemical energy is increasing and electrons flow to half-cell A.' },
        { letter: 'B', content: 'total chemical energy is increasing and electrons flow to half-cell B.' },
        { letter: 'C', content: 'total chemical energy is decreasing and electrons flow to half-cell A.', isAnswer: true },
        { letter: 'D', content: 'total chemical energy is decreasing and electrons flow to half-cell B.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
