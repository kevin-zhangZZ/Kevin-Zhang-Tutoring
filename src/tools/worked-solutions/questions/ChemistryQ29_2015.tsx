// 2015 Chemistry Exam, MCQ 29. VCAA examination report: 38% correct — the hardest MCQ on the
// 2015 paper (VCAA's own report names it first in its "most challenging questions" list).
// Electrorefining of blister copper: identify the cathode half-equation and the polarity of
// the impure-copper electrode. Question text transcribed from the original paper; the diagram
// is the actual VCAA figure (cropped from the official exam PDF), not a redrawing.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import electrorefiningSrc from './chem-2015-mcq29-electrorefining.png'

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
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
        <img src={electrorefiningSrc} alt="Electrolytic cell refining blister copper: Electrode I (impure copper) and Electrode II (pure copper) in copper(II) sulfate solution with sulfuric acid, from the original 2015 VCAA exam paper" className="w-full max-w-[380px]" />
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
