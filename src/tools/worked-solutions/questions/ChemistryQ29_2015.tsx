// 2015 Chemistry Exam, MCQ 29. VCAA examination report: 38% correct — the hardest MCQ on the
// 2015 paper (VCAA's own report names it first in its "most challenging questions" list).
// Electrorefining of blister copper: identify the cathode half-equation and the polarity of
// the impure-copper electrode. Question text/diagram transcribed from the original paper;
// solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 31, B: 12, C: 38, D: 18 },
  answer: 'A',
  comment: (
    <>
      The cathode reaction must be <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" /> because copper is deposited
      there — reduction always happens at the cathode.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <ElectrorefiningDiagram />
      </div>
    ),
    reason: 'Electrode I (impure "blister" copper) loses mass; Electrode II (pure copper) gains mass, from the diagram.',
  },
  {
    working: <>Electrode I: <Chem eq="Cu(s) -> Cu2+(aq) + 2e-" /> (oxidation, mass is lost)</>,
    reason: <>Oxidation is what dissolves the impure copper — this makes Electrode I the <b>anode</b>.</>,
  },
  {
    working: <>Electrode II: <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" /> (reduction, pure copper deposited)</>,
    reason: <>This makes Electrode II the <b>cathode</b> — the reaction the question actually asks for.</>,
  },
  {
    working: 'This is an electrolytic cell (externally powered), not a galvanic cell.',
    reason: <>Electrolytic and galvanic cells assign anode/cathode <em>polarity</em> oppositely — this is the trap the question is testing.</>,
  },
  {
    working: 'In an electrolytic cell, the external power supply pulls electrons away from the anode — so the anode is connected to (and behaves as) the positive terminal.',
    reason: '(In a galvanic cell, by contrast, the anode is negative — it generates the electron flow itself.)',
  },
  {
    working: <>Electrode I is the anode <Chem eq="->" /> Electrode I is <b>positive</b>.</>,
  },
  {
    working: (
      <>
        Cathode reaction: <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" /> · Electrode I polarity: <b>positive</b>
      </>
    ),
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ29_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            Which of the following correctly shows both the equation for the reaction occurring at
            the cathode and the polarity of Electrode I?
          </p>
        </>
      }
      options={[
        {
          letter: 'A',
          content: (
            <>Cathode reaction: <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" /> · Polarity of Electrode I: positive</>
          ),
          isAnswer: true,
        },
        {
          letter: 'B',
          content: (
            <>Cathode reaction: <Chem eq="Cu(s) -> Cu2+(aq) + 2e-" /> · Polarity of Electrode I: negative</>
          ),
        },
        {
          letter: 'C',
          content: (
            <>Cathode reaction: <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" /> · Polarity of Electrode I: negative</>
          ),
        },
        {
          letter: 'D',
          content: (
            <>Cathode reaction: <Chem eq="Cu(s) -> Cu2+(aq) + 2e-" /> · Polarity of Electrode I: positive</>
          ),
        },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}

// Electrolytic cell for refining blister copper: Electrode I (impure copper, connected to the
// positive terminal — the anode) dissolves into solution; Electrode II (pure copper, the
// cathode) grows as pure copper is deposited on it. Sludge (insoluble noble-metal impurities)
// collects beneath Electrode I.
function ElectrorefiningDiagram() {
  return (
    <svg viewBox="0 0 280 200" width={280} height={200}>
      <rect x={10} y={10} width={260} height={130} fill="#e0f2fe" fillOpacity={0.4} stroke="#9ca3af" strokeWidth={1.5} rx={4} />
      <text x={70} y={30} fontSize={11} textAnchor="middle" className="fill-gray-600 dark:fill-gray-300">
        CuSO₄(aq) + H₂SO₄(aq)
      </text>

      {/* DC power supply */}
      <rect x={95} y={-2} width={90} height={22} fill="white" className="dark:fill-gray-900" stroke="#6b7280" strokeWidth={1.25} rx={3} />
      <text x={140} y={13} fontSize={10} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300">DC supply</text>
      <line x1={95} y1={9} x2={70} y2={9} stroke="#6b7280" strokeWidth={1.5} />
      <line x1={185} y1={9} x2={210} y2={9} stroke="#6b7280" strokeWidth={1.5} />

      {/* Electrode I: impure copper (anode, +) */}
      <rect x={62} y={9} width={16} height={110} fill="#fb923c" stroke="#9a3412" strokeWidth={1.25} />
      <text x={70} y={135} fontSize={10} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300">I</text>
      <text x={70} y={150} fontSize={9} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400">(impure, +)</text>
      <rect x={58} y={110} width={24} height={8} fill="#78350f" fillOpacity={0.6} />
      <text x={70} y={166} fontSize={9} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400">sludge</text>

      {/* Electrode II: pure copper (cathode, -) */}
      <rect x={202} y={9} width={16} height={110} fill="#f97316" stroke="#9a3412" strokeWidth={1.25} />
      <text x={210} y={135} fontSize={10} textAnchor="middle" className="fill-gray-700 dark:fill-gray-300">II</text>
      <text x={210} y={150} fontSize={9} textAnchor="middle" className="fill-gray-500 dark:fill-gray-400">(pure, −)</text>
    </svg>
  )
}
