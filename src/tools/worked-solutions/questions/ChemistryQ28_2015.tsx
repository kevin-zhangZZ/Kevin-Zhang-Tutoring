// 2015 Chemistry Exam, MCQ 28. VCAA examination report: 48% correct — the fourth-hardest MCQ
// on the 2015 paper. Electrorefining blister copper: which impurity metals end up as solid
// sludge, rather than dissolving into the electrolyte? Question text/diagram transcribed from
// the original paper; solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 30, C: 10, D: 48 },
  answer: 'D',
  comment: (
    <>
      At Electrode I, Cu, and any metals that are stronger reductants than copper, are oxidised into
      solution as ions. Metals that are weaker reductants than copper are not oxidised, and fall away
      as solid sludge.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: 'Impurities in the blister copper: zinc, cobalt, silver, gold, nickel and iron.',
    reason: 'Electrode I is the anode — everything on it is exposed to oxidising conditions, but not everything actually gets oxidised.',
  },
  {
    working: <>A metal only dissolves as an ion if it's a <b>stronger</b> reductant than copper — i.e. more reactive, sitting above <Chem eq="Cu2+/Cu" /> in the electrochemical series.</>,
    reason: 'Copper itself is being deliberately oxidised at this electrode — so anything that oxidises even more easily will too.',
  },
  {
    working: (
      <>
        More reactive than copper (dissolve into solution): <b>Zn, Fe, Ni, Co</b>
        <br />
        Less reactive than copper (stay solid, fall as sludge): <b>Ag, Au</b>
      </>
    ),
    reason: <>Silver and gold are famously unreactive "noble" metals — both sit well below <Chem eq="Cu2+/Cu" /> in the electrochemical series, so copper's oxidation can't drag them into solution too.</>,
  },
  {
    working: <b>Sludge contains: silver and gold.</b>,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ28_2015() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-4 py-3 mb-3 text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300">
            An electrolytic cell is set up to obtain pure copper from an impure piece of copper
            called "blister copper". The electrolyte solution contains both copper(II) sulfate and
            sulfuric acid. The blister copper, Electrode I, contains impurities such as zinc,
            cobalt, silver, gold, nickel and iron. The cell voltage is adjusted so that only copper
            is deposited on Electrode II. Sludge, which contains some of the solid metal impurities
            present in the blister copper, forms beneath Electrode I. The other impurities remain
            in solution as ions.
          </div>
          <p>The solid metal impurities that are found in the sludge are</p>
        </>
      }
      options={[
        { letter: 'A', content: 'gold, nickel and cobalt.' },
        { letter: 'B', content: 'cobalt, nickel and iron.' },
        { letter: 'C', content: 'nickel and iron.' },
        { letter: 'D', content: 'silver and gold.', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
