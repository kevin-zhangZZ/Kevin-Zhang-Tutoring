// 2023 Chemistry Exam, MCQ 9. VCAA examination report: 54% correct. Testing three statements
// about coal seam gas and petroleum gas: both are mixtures, both produce CO₂ on combustion, and
// both are fossil fuels. Question text transcribed from the original paper (no figures). Source:
// VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 3, C: 38, D: 54 },
  answer: 'D',
  comment: (
    <>
      The main component of coal seam gas is a mixture of methane – 88 to 98% – with small amounts
      of other hydrocarbons.
      <br />
      Petroleum gas, associated with crude oil, is also a mixture of lighter hydrocarbons.
      <br />
      Both coal seam gas and petroleum gas are fossil fuels and produce CO₂ on combustion.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>I: <b>coal seam gas</b> (natural gas trapped in coal seams) is mostly methane, CH₄ (about 88–98%), with small amounts of other hydrocarbons and gases. <b>Petroleum gas</b>, found with crude oil, is a mixture of light hydrocarbons such as propane and butane.</>,
    reason: <>&ldquo;Mostly methane&rdquo; is not &ldquo;pure methane&rdquo;: any sample containing more than one substance is a <b>mixture</b>. Statement I is <b>true</b>.</>,
  },
  {
    working: (
      <>
        II: both gases are hydrocarbons, so their complete combustion produces CO₂(g) and H₂O, e.g.
        <br />
        <Chem eq="CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)" />
        <br />
        <Chem eq="C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g)" />
      </>
    ),
    reason: <>Any carbon-containing fuel produces CO₂ when it burns completely (and CO or soot when oxygen is limited). Statement II is <b>true</b>.</>,
  },
  {
    working: <>III: both formed from the remains of ancient organisms buried and compressed over <b>millions of years</b>, coal seam gas in coal deposits and petroleum gas with crude oil.</>,
    reason: <>A fuel that took millions of years to form and cannot be replaced in a short time is a <b>fossil fuel</b> (non-renewable). Statement III is <b>true</b>.</>,
  },
  {
    working: <b>All three statements, I, II and III, are correct.</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b> (II and III only), chosen by 38%, rejects statement I, treating coal seam gas as a pure substance (methane) rather than a mixture that is mostly methane. Options <b>A</b> and <b>B</b> each reject a statement that is plainly true (III and II respectively).</>,
  },
]

export default function ChemistryQ9_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following statements about coal seam gas and petroleum gas.</p>
          <div className="flex flex-col gap-1 mb-2">
            <span>I. Coal seam gas and petroleum gas are both mixtures.</span>
            <span>II. Coal seam gas and petroleum gas both combust to produce carbon dioxide.</span>
            <span>III. Coal seam gas and petroleum gas are both fossil fuels.</span>
          </div>
          <p>Which of the above statements are correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'I and II only' },
        { letter: 'B', content: 'I and III only' },
        { letter: 'C', content: 'II and III only' },
        { letter: 'D', content: 'I, II and III', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
