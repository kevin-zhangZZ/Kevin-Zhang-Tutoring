// 2020 Chemistry Exam, MCQ 13. VCAA examination report: 41% correct. Comparing H2 fuel cells with
// H2-powered combustion engines: greenhouse gas emissions (water vapour), efficiency and the
// energy transformations involved. Question text transcribed from the original paper. VCAA report
// only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 14, C: 41, D: 29 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      Statement I: Incorrect. H<sub>2</sub>O(g) is a greenhouse gas.
      <br />
      Statement II: Incorrect. Fuel cells are more efficient than combustion engines hence less
      H<sub>2</sub> is used per kilometre for the H<sub>2</sub> fuel cell powered car.
      <br />
      Statement III: Correct. In combustion engines chemical energy is converted to thermal then to
      mechanical energy. In fuel cell powered vehicles chemical energy is converted to electrical
      energy then to mechanical energy.
      <br />
      Hence correct alternative was option C.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        Both use the same overall reaction:
        <br />
        <Chem eq="2H2(g) + O2(g) -> 2H2O(g)" />
      </>
    ),
    reason: <>In the engine the H<sub>2</sub> burns; in the fuel cell the same reaction is split into two half-reactions at separate electrodes, so the electrons travel through an external circuit. The chemical energy released per mole of H<sub>2</sub> is the same — what differs is the form it is converted into.</>,
  },
  {
    working: <>Statement I: both produce water vapour, <Chem eq="H2O(g)" />, which is a <b>greenhouse gas</b> ⇒ I is <b>incorrect</b>.</>,
    reason: <><Chem eq="CO2" />, <Chem eq="CH4" /> and <Chem eq="H2O" /> are the three major greenhouse gases named in the study design. &ldquo;No <Chem eq="CO2" />&rdquo; is not the same as &ldquo;no greenhouse gases&rdquo;.</>,
  },
  {
    working: (
      <>
        Combustion engine: chemical → <b>thermal (heat)</b> → mechanical energy
        <br />
        Fuel cell: chemical → <b>electrical</b> → mechanical energy
      </>
    ),
    reason: <>A combustion engine has to turn the reaction&rsquo;s energy into heat first, and much of that heat is lost to the surroundings (exhaust, cooling system). A fuel cell converts chemical energy directly into electrical energy with far less released as heat, so it is <b>more efficient</b>.</>,
  },
  {
    working: <>Statement II: the fuel cell is more efficient, so it needs <b>less</b> H<sub>2</sub> per kilometre — the engine needs <b>more</b> ⇒ II is <b>incorrect</b>.</>,
    reason: <>Greater efficiency means more of each kilogram of H<sub>2</sub>&rsquo;s energy ends up moving the car, so fewer kilograms are needed for the same distance. Statement II has this backwards.</>,
  },
  {
    working: <>Statement III: the engine converts the energy released per kilogram of H<sub>2</sub> into heat, while the fuel cell converts most of it into electricity ⇒ more heat per kilogram in the engine ⇒ III is <b>correct</b>.</>,
    reason: <>Note that III is about <b>heat</b>, not total energy: the energy released per kilogram is the same in both, but the engine releases most of it as heat.</>,
  },
  {
    working: <b>III only.</b>,
    reason: <>Matches option <b>C</b>. Option <b>D</b> (29%) accepts statement I, assuming that because H<sub>2</sub> produces no <Chem eq="CO2" /> it produces no greenhouse gas — but water vapour is one. Options <b>A</b> and <b>B</b> include statement II, which reverses the efficiency comparison.</>,
  },
]

export default function ChemistryQ13_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Hydrogen, H<sub>2</sub>, fuel cells and H<sub>2</sub>-powered combustion engines can both
            be used to power cars. Three statements about H<sub>2</sub> fuel cells and
            H<sub>2</sub>-powered combustion engines are given below:
          </p>
          <div className="mb-2 grid grid-cols-[2rem_1fr] gap-y-1">
            <span>I</span>
            <span>Neither H<sub>2</sub> fuel cells nor H<sub>2</sub>-powered combustion engines produce greenhouse gases.</span>
            <span>II</span>
            <span>Less H<sub>2</sub> is required per kilometre travelled when using an H<sub>2</sub>-powered combustion engine than when using H<sub>2</sub> fuel cells.</span>
            <span>III</span>
            <span>More heat per kilogram of H<sub>2</sub> is generated in an H<sub>2</sub>-powered combustion engine than in H<sub>2</sub> fuel cells.</span>
          </div>
          <p>Which of the statements above are correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'II only' },
        { letter: 'B', content: 'I and II only' },
        { letter: 'C', content: 'III only', isAnswer: true },
        { letter: 'D', content: 'I and III only' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
