// 2015 Chemistry Exam, MCQ 28. VCAA examination report: 48% correct — the fourth-hardest MCQ
// on the 2015 paper. Electrorefining blister copper: which impurity metals end up as solid
// sludge, rather than dissolving into the electrolyte? Question text transcribed from the
// original paper; the cell diagram is cropped directly from the original VCAA exam PDF (the
// same crop MCQ 29 uses, since both questions share this diagram), not a redrawing. Solution
// is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import electrorefiningSrc from './chem-2015-mcq29-electrorefining.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 30, C: 10, D: 48 },
  answer: 'D',
  comment: (
    <>
      The relative positions in the electrochemical series of the metals present in the impure Cu
      was a key reference in this question:
      <br />
      <Chem eq="Au+(aq) + e- <=> Au(s)" /> &nbsp; <i>E</i>⁰ = 1.68 V
      <br />
      <Chem eq="Ag+(aq) + e- <=> Ag(s)" /> &nbsp; <i>E</i>⁰ = 0.80 V
      <br />
      <Chem eq="Cu2+(aq) + 2e- <=> Cu(s)" /> &nbsp; <i>E</i>⁰ = 0.34 V
      <br />
      <Chem eq="Ni2+(aq) + 2e- <=> Ni(s)" /> &nbsp; <i>E</i>⁰ = –0.23 V
      <br />
      <Chem eq="Co2+(aq) + 2e- <=> Co(s)" /> &nbsp; <i>E</i>⁰ = –0.28 V
      <br />
      <Chem eq="Fe2+(aq) + 2e- <=> Fe(s)" /> &nbsp; <i>E</i>⁰ = –0.44 V
      <br />
      <Chem eq="Zn2+(aq) + 2e- <=> Zn(s)" /> &nbsp; <i>E</i>⁰ = –0.76 V
      <br />
      Since pure copper is deposited at Electrode II it must be the site of reduction, i.e.{' '}
      <Chem eq="Cu2+(aq) + 2e- -> Cu(s)" />
      <br />
      At Electrode I, Cu, and any metals that are stronger reductants than Cu (Zn, Co, Ni and Fe)
      will be oxidised; half-equation <Chem eq="Cu(s) -> Cu2+(aq) + 2e-" />
      <br />
      Metals that are weaker reductants than Cu (Ag and Au) will not be oxidised and will collect
      under Electrode I in the sludge. It is essential that Ag and Au are not oxidised at Electrode
      I, because their ions would be reduced in preference to <Chem eq="Cu2+(aq)" /> and would
      impact on the purity of the Cu collected at Electrode II.
      <br />
      The selection of alternative B ignores the fact that Co, Ni and Fe cannot be present as
      solids if Cu(s) has been oxidised because they are stronger reductants than Cu and, under a
      voltage high enough to oxidise Cu, would also be oxidised.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: 'Impurities in the blister copper: zinc, cobalt, silver, gold, nickel and iron.',
    reason: <>Electrode I is the anode — everything on it is exposed to oxidising conditions, but not everything actually gets oxidised.</>,
  },
  {
    working: <>A metal only dissolves as an ion if it's a <b>stronger</b> reductant than copper — i.e. more reactive, its half-equation sitting below <Chem eq="Cu2+/Cu" /> in the electrochemical series.</>,
    reason: <>Copper itself is being deliberately oxidised at this electrode — so anything that oxidises even more easily will too.</>,
  },
  {
    working: (
      <>
        More reactive than copper (dissolve into solution): <b>Zn, Fe, Ni, Co</b>
        <br />
        Less reactive than copper (stay solid, fall as sludge): <b>Ag, Au</b>
      </>
    ),
    reason: <>Silver and gold are famously unreactive &ldquo;noble&rdquo; metals — both sit well above <Chem eq="Cu2+/Cu" /> in the electrochemical series, so copper&rsquo;s oxidation can&rsquo;t drag them into solution too.<DataBookNote>the report&rsquo;s values come from the 2015 Data Book. The 2026 Data Book gives −0.24 V for Ni²⁺/Ni (the report has −0.23 V) and no longer lists Au⁺/Au (+1.68 V in the report). The order of the metals is the same, so the answer is unchanged.</DataBookNote></>,
  },
  {
    working: <b>Sludge contains: silver and gold.</b>,
    reason: <>Matches option <b>D</b>. Option <b>B</b> lists the three metals that <em>are</em> oxidised along with copper — at a voltage that oxidises Cu, Co, Ni and Fe cannot stay solid.</>,
  },
]

export default function ChemistryQ28_2015() {
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
              The electrolyte solution contains both copper(II) sulfate and sulfuric acid. The blister copper, Electrode I, contains impurities such as zinc,
              cobalt, silver, gold, nickel and iron. The cell voltage is adjusted so that only copper
              is deposited on Electrode II. Sludge, which contains some of the solid metal impurities
              present in the blister copper, forms beneath Electrode I. The other impurities remain
              in solution as ions.
            </p>
            <p className="mb-2">The diagram below represents the cell.</p>
            <div className="flex justify-center">
              <img src={electrorefiningSrc} alt="Electrolytic cell refining blister copper: Electrode I (impure copper) and Electrode II (pure copper) in copper(II) sulfate solution with sulfuric acid, from the original 2015 VCAA exam paper" className="w-full max-w-[380px]" />
            </div>
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
