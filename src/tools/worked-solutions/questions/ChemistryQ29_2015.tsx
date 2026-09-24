// 2015 Chemistry Exam, MCQ 29. VCAA examination report: 31% correct — the hardest MCQ on the
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
      Electrorefining is an electrolytic process, so electrons move from the (+) electrode to the
      (–) electrode.
      <br />
      Since the electrons are moving from Electrode I, the site of oxidation, to Electrode II, the
      site of reduction, the electrode signs are:
      <br />
      Electrode I – positive, Electrode II – negative.
      <br />
      The reaction at the cathode, the site of reduction, must be{' '}
      <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" /> because copper is deposited there.
      <br />
      Selection of alternative C suggested that students considered the question to be asking for
      the sign of the electrode at which the reduction reaction occurred. Electrode I was either
      ignored or assumed to be the cathode. This emphasises the importance of effective and
      accurate reading of questions.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Electrode I (impure &lsquo;blister&rsquo; copper) dissolves, leaving sludge beneath it; pure copper is deposited on Electrode II.</>,
    reason: <>Read straight off the diagram and the stem.</>,
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
    reason: <>(In a galvanic cell, by contrast, the anode is negative — it generates the electron flow itself.)</>,
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
    reason: <>Matches option <b>A</b>. Option <b>C</b> gives the right cathode equation with a negative Electrode I — the sign of the <em>cathode</em>; the report suggests students assumed Electrode I was the cathode.</>,
  },
]

export default function ChemistryQ29_2015() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-4 py-3 mb-3 text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300">
            <p className="mb-2 italic">Use the following information to answer Questions 28–30.</p>
            <p className="mb-2">
              An electrolytic cell is set up to obtain pure copper from an impure piece of copper
              called &lsquo;blister copper&rsquo;.
            </p>
            <p className="mb-2">
              The electrolyte solution contains both copper(II) sulfate and sulfuric acid. The
              blister copper, Electrode I, contains impurities such as zinc, cobalt, silver, gold,
              nickel and iron. The cell voltage is adjusted so that only copper is deposited on
              Electrode II. Sludge, which contains some of the solid metal impurities present in the
              blister copper, forms beneath Electrode I. The other impurities remain in solution as
              ions.
            </p>
            <p className="mb-2">The diagram below represents the cell.</p>
            <div className="flex justify-center">
              <img src={electrorefiningSrc} alt="Electrolytic cell refining blister copper: Electrode I (impure copper) and Electrode II (pure copper) in copper(II) sulfate solution with sulfuric acid, from the original 2015 VCAA exam paper" className="w-full max-w-[380px]" />
            </div>
          </div>
          <p>
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
