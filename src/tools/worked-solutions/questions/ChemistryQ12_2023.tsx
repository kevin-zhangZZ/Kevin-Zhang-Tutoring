// 2023 Chemistry Exam, MCQ 12. VCAA examination report: 88% correct. What a catalyst changes
// compared with the uncatalysed pathway: the activation energy only, not ΔH or the enthalpy of
// the reactants. Question text transcribed from the original paper. VCAA report only. Solution
// is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 88, B: 2, C: 2, D: 8 },
  answer: 'A',
  comment: (
    <>
      The presence of a catalyst
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>lowers the activation energy</li>
        <li>has no effect on the enthalpy change, <i>ΔH</i></li>
        <li>has no effect on the enthalpy of reactants or products.</li>
      </ul>
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A catalyst provides an <b>alternative reaction pathway</b> with a <b>lower activation energy</b>. The reactants and products are the same substances as before.</>,
    reason: <>Picture the energy profile: the reactants&rsquo; level and the products&rsquo; level are fixed by <i>what the substances are</i>; the catalyst only lowers the &ldquo;hill&rdquo; in between.</>,
  },
  {
    working: <>I. activation energy — <b>changed</b> (lowered).</>,
    reason: <>This is the whole job of a catalyst: with a lower <i>E</i><sub>a</sub>, a greater proportion of collisions have enough energy to react, so the rate increases.</>,
  },
  {
    working: <>III. enthalpy of the reactants — <b>not changed</b>.</>,
    reason: <>The reactants are the same chemicals at the same conditions, so they have the same enthalpy. A catalyst is not used up and does not add energy to the reactants.</>,
  },
  {
    working: <>II. Δ<i>H</i> = <i>H</i>(products) − <i>H</i>(reactants) — <b>not changed</b>.</>,
    reason: <>Both <i>H</i>(products) and <i>H</i>(reactants) are unchanged, so their difference, Δ<i>H</i>, is unchanged too.</>,
  },
  {
    working: <b>Only I (activation energy) changes.</b>,
    reason: <>Matches option <b>A</b>. Option <b>D</b> treats a catalyst as changing every feature of the energy profile; options <b>B</b> and <b>C</b> include Δ<i>H</i>, but a catalyst never changes Δ<i>H</i>, and B and C both leave out the one thing it does change, the activation energy.</>,
  },
]

export default function ChemistryQ12_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following features of a chemical reaction.</p>
          <ol className="mb-3 flex flex-col gap-0.5">
            <li><span className="inline-block w-9">I.</span>activation energy</li>
            <li><span className="inline-block w-9">II.</span>Δ<i>H</i> of the reaction</li>
            <li><span className="inline-block w-9">III.</span>enthalpy of the reactants</li>
          </ol>
          <p>Compared with the uncatalysed reaction pathway, the presence of a catalyst changes</p>
        </>
      }
      options={[
        { letter: 'A', content: 'I only.', isAnswer: true },
        { letter: 'B', content: 'II only.' },
        { letter: 'C', content: 'II and III only.' },
        { letter: 'D', content: 'I, II and III.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
