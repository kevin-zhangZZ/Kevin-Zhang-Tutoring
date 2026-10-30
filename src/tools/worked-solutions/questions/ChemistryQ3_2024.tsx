// 2024 Chemistry Exam, MCQ 3. VCAA examination report: 45% correct. Limiting and excess
// reactant for the combustion of ethane, with oxygen given as a mass percentage of air. Question
// text transcribed from the original paper (rendered from page images — the 2024 exam PDF has no
// extractable text); the options table is written as text. VCAA report only. Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 45, C: 32, D: 6 },
  answer: 'B',
  comment: (
    <>
      n(O₂) = 22 / 32 = 0.6875 mol
      <br />
      To react with all the ethane, we need 1.75 mol of oxygen.
      <br />
      Therefore, the reactant in excess is ethane.
      <br />
      To react all the O₂, we only need 0.6875 / 3.5 = 0.20 mol, so
      <br />
      0.30 mol of ethane is in excess.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>
      <i>m</i>(O₂) = 22.0% × <i>m</i>(air)<br />
      <i>m</i>(O₂) = 0.220 × 100.0 g<br />
      <i>m</i>(O₂) = 22.0 g
    </>,
    reason: <>Only 22.0% of the air&rsquo;s mass is oxygen (% m/m means grams of O₂ per 100 g of air). Using the whole 100.0 g of air as O₂ is the first trap.</>,
  },
  {
    working: <>
      <i>n</i>(O₂) = <i>m</i>/<i>M</i><br />
      <i>n</i>(O₂) = 22.0 g ÷ 32.0 g mol⁻¹<br />
      <i>n</i>(O₂) = 0.6875 mol
    </>,
    reason: <>Data Book: <i>M</i>(O) = 16.0 g mol⁻¹, so <i>M</i>(O₂) = 2 × 16.0 = 32.0 g mol⁻¹. Compare reactants in <b>moles</b>, never in grams.</>,
  },
  {
    working: <>Mole ratio: <i>n</i>(O₂) : <i>n</i>(C₂H₆) = 3½ : 1</>,
    reason: <>From the balanced equation <Chem eq="C2H6(g) + 3½O2(g) -> 2CO2(g) + 3H2O(l)" />.</>,
  },
  {
    working: <>
      <i>n</i>(O₂) needed = 3.5 × <i>n</i>(C₂H₆)<br />
      <i>n</i>(O₂) needed = 3.5 × 0.50 mol<br />
      <i>n</i>(O₂) needed = 1.75 mol
    </>,
    reason: <>To burn all 0.50 mol of ethane needs 1.75 mol of O₂, but only 0.6875 mol is available. So <b>O₂ is the limiting reactant</b> and <b>ethane is in excess</b> — this rules out C and D.</>,
  },
  {
    working: <>
      <i>n</i>(C₂H₆) reacting = <i>n</i>(O₂) ÷ 3.5<br />
      <i>n</i>(C₂H₆) reacting = 0.6875 mol ÷ 3.5<br />
      <i>n</i>(C₂H₆) reacting = 0.19642… mol
    </>,
    reason: <>The limiting reactant (O₂) is used up completely, so it decides how much ethane reacts. Keep the value unrounded.</>,
  },
  {
    working: <>
      <i>n</i>(C₂H₆) in excess = <i>n</i>(initial) − <i>n</i>(reacting)<br />
      <i>n</i>(C₂H₆) in excess = 0.50 mol − 0.19642… mol<br />
      <i>n</i>(C₂H₆) in excess = 0.30357… mol
    </>,
    reason: <>The excess is what is left over after the reaction stops — the starting amount minus the amount that reacted.</>,
  },
  {
    working: <b>Ethane is in excess, by 0.30 mol.</b>,
    reason: <>Matches option <b>B</b> (2 significant figures, set by 0.50 mol of ethane). Option <b>C</b>, chosen by 32%, and option <b>D</b> name O₂ as the reactant in excess — but O₂ is the limiting reactant: only 0.6875 mol is available against the 1.75 mol needed.</>,
  },
]

export default function ChemistryQ3_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            0.50 mol of ethane, C₂H₆, and 100.0 g of air that is 22.0% m/m oxygen, O₂, are injected
            into a combustion chamber.
            <br />
            The equation of the combustion of ethane is <Chem eq="C2H6(g) + 3½O2(g) -> 2CO2(g) + 3H2O(l)" />.
          </p>
          <p>If complete combustion takes place, which reactant is in excess and by how much?</p>
        </>
      }
      options={[
        { letter: 'A', content: <>Reactant in excess: C₂H₆ · Amount of reactant in excess: 0.25 mol</> },
        { letter: 'B', content: <>Reactant in excess: C₂H₆ · Amount of reactant in excess: 0.30 mol</>, isAnswer: true },
        { letter: 'C', content: <>Reactant in excess: O₂ · Amount of reactant in excess: 12 g</> },
        { letter: 'D', content: <>Reactant in excess: O₂ · Amount of reactant in excess: 97 g</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
