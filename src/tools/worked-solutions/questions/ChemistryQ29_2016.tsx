// 2016 Chemistry Exam, MCQ 29. VCAA examination report: 47% correct — the sixth-hardest MCQ on
// the 2016 paper. A galvanic cell pairs an Fe/Fe2+ half-cell against a standard hydrogen
// electrode (SHE) — work out which electrode is the cathode, and what that does to the pH
// there. Question text/diagram transcribed from the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

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
    working: (
      <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <GalvanicCellDiagram />
      </div>
    ),
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
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit mb-3">
            <GalvanicCellDiagram />
          </div>
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

// Galvanic cell: Fe rod in 1 M Fe2+(aq) (left) vs. the standard hydrogen electrode — a Pt
// electrode with H2 gas bubbled through 1 M H+(aq) (right) — joined by a salt bridge.
function GalvanicCellDiagram() {
  return (
    <svg viewBox="0 0 280 170" width={280} height={170}>
      <rect x={10} y={40} width={110} height={100} fill="#dcfce7" fillOpacity={0.5} stroke="#9ca3af" strokeWidth={1.5} rx={4} />
      <rect x={160} y={40} width={110} height={100} fill="#e0f2fe" fillOpacity={0.5} stroke="#9ca3af" strokeWidth={1.5} rx={4} />
      <line x1={120} y1={70} x2={160} y2={70} stroke="#9ca3af" strokeWidth={4} />
      <text x={140} y={62} fontSize={9} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400">salt bridge</text>

      <rect x={55} y={20} width={12} height={100} fill="#94a3b8" stroke="#475569" strokeWidth={1.25} />
      <text x={61} y={135} fontSize={9} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300">Fe</text>
      <text x={65} y={150} fontSize={9} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400">1 M Fe²⁺(aq)</text>

      <rect x={210} y={20} width={12} height={100} fill="#cbd5e1" stroke="#475569" strokeWidth={1.25} />
      <text x={216} y={135} fontSize={9} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300">Pt</text>
      <text x={215} y={150} fontSize={9} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400">1 M H⁺(aq)</text>
      <circle cx={218} cy={35} r={2} fill="#38bdf8" />
      <circle cx={222} cy={50} r={2} fill="#38bdf8" />
      <circle cx={216} cy={60} r={2} fill="#38bdf8" />
      <text x={240} y={35} fontSize={8} className="fill-sky-600 dark:fill-sky-400">H₂ gas</text>

      <line x1={61} y1={10} x2={61} y2={20} stroke="#6b7280" strokeWidth={1.5} />
      <line x1={216} y1={10} x2={216} y2={20} stroke="#6b7280" strokeWidth={1.5} />
      <line x1={61} y1={10} x2={216} y2={10} stroke="#6b7280" strokeWidth={1.5} />
      <text x={140} y={6} fontSize={9} textAnchor="middle" className="fill-gray-600 dark:fill-gray-300">wire</text>
    </svg>
  )
}
