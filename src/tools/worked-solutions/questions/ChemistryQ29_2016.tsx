// 2016 Chemistry Exam, MCQ 29. VCAA examination report: 47% correct — the sixth-hardest MCQ on
// the 2016 paper. A galvanic cell pairs an Fe/Fe2+ half-cell against a standard hydrogen
// electrode (SHE) — work out which electrode is the cathode, and what that does to the pH
// there. Question text transcribed from the original paper; the diagram is the actual VCAA
// figure (cropped from the official exam PDF), not a redrawing. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import galvanicCellSrc from './chem-2016-mcq29-galvanic-cell.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img src={galvanicCellSrc} alt="Galvanic cell: solid Fe rod in 1 M Fe2+ solution vs. a platinum electrode with H2 gas bubbled through 1 M H+ solution (the standard hydrogen electrode), joined by a salt bridge — from the original 2016 VCAA exam paper" className="w-full max-w-[380px]" />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 15, C: 47, D: 23 },
  answer: 'C',
  comment: (
    <>
      At the Fe rod — anode (−): <Chem eq="Fe(s) -> Fe2+(aq) + 2e-" />. At the Pt electrode — cathode
      (+): <Chem eq="2H+(aq) + 2e- -> H2(g)" />. The pH at the platinum electrode increases as{' '}
      <Chem eq="c(H+)" /> decreases due to its reduction to <Chem eq="H2(g)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: DIAGRAM,
    reason: <>The right-hand half-cell is the <b>standard hydrogen electrode (SHE)</b> — <Chem eq="H2" /> gas bubbled over a platinum electrode in 1 M <Chem eq="H+" />, by definition E° = 0.00 V.</>,
  },
  {
    working: <>E°(Fe²⁺/Fe) = −0.44 V   ·   E°(H⁺/H₂) = 0.00 V</>,
    reason: <>The half-reaction with the <em>higher</em> (more positive) reduction potential runs as a reduction — so <Chem eq="H+" /> is reduced, and <Chem eq="Fe" /> is oxidised.</>,
  },
  {
    working: (
      <>
        Fe electrode (anode, −): <Chem eq="Fe(s) -> Fe2+(aq) + 2e-" />
        <br />
        Pt electrode (cathode, +): <Chem eq="2H+(aq) + 2e- -> H2(g)" />
      </>
    ),
  },
  {
    working: <>A: electrons never flow through the solution — only through the external wire (and here, from Fe to Pt, not the reverse). <b>False.</b></>,
    reason: 'Electron flow through solution is a common but fundamental misconception — ions carry charge through the solution/salt bridge, electrons only travel through the external circuit.',
  },
  {
    working: <>B: the platinum electrode is the <b>cathode</b>, not the anode (even though "positive" alone would be correct for a galvanic-cell cathode). <b>False.</b></>,
    reason: 'This option mislabels the electrode role, so the statement as a whole is wrong.',
  },
  {
    working: <>D: <Chem eq="H+" /> is being <b>reduced</b> to <Chem eq="H2" /> at the platinum electrode — that's a reduction, not an oxidation. <b>False.</b></>,
  },
  {
    working: <>C: <Chem eq="H+" /> is <em>consumed</em> at the platinum electrode (turned into neutral <Chem eq="H2" /> gas), so <Chem eq="[H+]" /> there decreases.</>,
    reason: <>Lower <Chem eq="[H+]" /> means higher pH — <b>True.</b></>,
  },
  {
    working: <b>The pH of the solution surrounding the platinum electrode would increase.</b>,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function ChemistryQ29_2016() {
  return (
    <MCQShell
      question={
        <>
          <div className="mb-3">{DIAGRAM}</div>
          <p className="mb-2">
            The diagram above shows a galvanic cell set up in a university laboratory: a solid iron
            rod in 1 M <Chem eq="Fe2+" /> solution (pale green) on the left, connected via a salt
            bridge to a platinum electrode (coated with tiny crystals of platinum) in 1 M{' '}
            <Chem eq="H+" /> solution (colourless) with <Chem eq="H2" /> gas continually bubbled in
            (1 atm, 25°C) on the right — the standard hydrogen electrode (SHE), the reference
            against which all standard redox potentials are compared.
          </p>
          <p>Which one of the following would occur at the platinum electrode when the cell discharges?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Electrons would move from the platinum electrode through the acid solution towards the salt bridge.' },
        { letter: 'B', content: 'The platinum electrode would act as the anode in this cell and have positive polarity.' },
        { letter: 'C', content: 'The pH of the solution surrounding the platinum electrode would increase.', isAnswer: true },
        { letter: 'D', content: "The hydrogen gas would be oxidised at the platinum electrode's surface." },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
