// 2023 Chemistry Exam, MCQ 7. VCAA examination report: 73% correct. Testing three statements
// about fossil fuels and biofuels: environmental cost of producing biofuels, greenhouse gases from
// combustion, and renewability. Question text transcribed from the original paper (no figures).
// Source: VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 73, C: 21, D: 1 },
  answer: 'B',
  comment: (
    <>
      Biofuel production potentially does damage the environment by degrading land used to grow
      food and through emissions from fuels used in production and transport.
      <br />
      Both biofuel and fossil fuels do generate greenhouse gases – CO₂(g) and/or H₂O(g).
      <br />
      Biofuels are renewable but fossil fuels, while traceable back to plants, take millions of
      years to form and are not considered renewable.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>I: growing and processing biofuel crops uses <b>land</b> (cleared, or taken from food production), fertilisers and water, and the farming, processing and transport burn fuel and release emissions.</>,
    reason: <>&ldquo;Does not damage the environment&rdquo; is an absolute claim, and biofuel production does have environmental costs. Statement I is <b>false</b>.</>,
  },
  {
    working: (
      <>
        II: both kinds of fuel contain carbon and hydrogen, so complete combustion produces CO₂(g) and H₂O(g), e.g. for bioethanol and for methane (natural gas):
        <br />
        <Chem eq="C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(g)" />
        <br />
        <Chem eq="CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)" />
      </>
    ),
    reason: <>CO₂ and water vapour are both <b>greenhouse gases</b>. A biofuel may be closer to carbon neutral (its plants absorbed CO₂ as they grew), but burning it still <i>generates</i> CO₂. Statement II is <b>true</b>.</>,
  },
  {
    working: <>III: a fuel is <b>renewable</b> if it can be replaced by natural processes within a relatively short period of time. Biofuels come from plants grown in months to years, so they are renewable. Fossil fuels also formed from ancient organisms, but over <b>millions of years</b>, so they are <b>non-renewable</b>.</>,
    reason: <>The statement is true for biofuels but false for fossil fuels, so as a whole it is <b>false</b>.</>,
  },
  {
    working: <b>Only statement II is correct.</b>,
    reason: <>Matches option <b>B</b>. Option <b>C</b> (I and II only), chosen by 21%, accepts statement I, treating biofuels as harmless to the environment, but growing, processing and transporting them has real environmental costs. Options <b>A</b> and <b>D</b> also rely on statement I, and D adds the false claim that fossil fuels are renewable.</>,
  },
]

export default function ChemistryQ7_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following statements about fossil fuels and biofuels.</p>
          <div className="flex flex-col gap-1 mb-2">
            <span>I. Production of biofuels does not damage the environment.</span>
            <span>II. Combustion of both biofuels and fossil fuels generates greenhouse gases.</span>
            <span>III. Biofuels and fossil fuels are both renewable as they are produced from plants.</span>
          </div>
          <p>Which of the statements above are correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'I only' },
        { letter: 'B', content: 'II only', isAnswer: true },
        { letter: 'C', content: 'I and II only' },
        { letter: 'D', content: 'I and III only' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
