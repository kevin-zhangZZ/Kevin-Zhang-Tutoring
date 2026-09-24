// 2016 Chemistry Exam, MCQ 25. VCAA examination report: 35% correct — the third-hardest MCQ on
// the 2016 paper. Copper metal in iodine solution showed no visible reaction — which proposed
// explanation is actually impossible? Question text transcribed from the original paper;
// solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 25, C: 35, D: 21 },
  answer: 'C',
  comment: (
    <>
      On the electrochemical series,
      <br />
      <Chem eq="Br2(l) + 2e- <=> 2Br-(aq)" /> &nbsp; <i>E</i>° = 1.09 V
      <br />
      <Chem eq="I2(s) + 2e- <=> 2I-(aq)" /> &nbsp; <i>E</i>° = 0.55 V
      <br />
      <Chem eq="Cu2+(aq) + 2e- <=> Cu(s)" /> &nbsp; <i>E</i>° = 0.34 V
      <br />
      Since <Chem eq="Br2(aq)" /> is a stronger oxidant than <Chem eq="I2" />, the accidental use of
      bromine solution in place of the iodine solution could not explain the &lsquo;no apparent
      change&rsquo; observation.
      <br />
      Slow reaction, equilibrium and a greasy surface, which would prevent effective electrolytic
      conduction in the electrolyte, could all explain the &lsquo;no apparent change&rsquo;
      observation.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Predicted: <Chem eq="Cu(s) + I2(aq) -> Cu2+(aq) + 2I-(aq)" />, with a visible colour change (brown → blue) and a corroded copper strip.</>,
    reason: <>I₂/I⁻ (+0.54 V) is higher on the electrochemical series than Cu²⁺/Cu (+0.34 V): copper is a stronger reductant than iodide, so it should reduce <Chem eq="I2" />.<DataBookNote>the report quotes 0.55 V for I₂/I⁻ and 1.09 V for Br₂/Br⁻; the 2026 Data Book gives +0.54 V and +1.08 V. The order — Br₂ above I₂ above Cu²⁺ — is the same, so the answer is unchanged.</DataBookNote></>,
  },
  {
    working: 'Observed: no apparent change over 10 minutes.',
    reason: <>The task: find which hypothesis could NOT explain this discrepancy.</>,
  },
  {
    working: <>A — reaction rate too slow for the time allowed: entirely plausible; some reactions are just slow, even when thermodynamically favourable.</>,
    reason: <>This could genuinely explain it — rule it out as the answer.</>,
  },
  {
    working: <>B — an equilibrium was established with <Chem eq="[Cu2+]" /> too low to see: also plausible — a small extent of reaction wouldn't visibly change the colour.</>,
    reason: <>This could also genuinely explain it.</>,
  },
  {
    working: <>D — greasy copper surface: plausible — a layer of grease would physically block contact between the metal and the solution.</>,
    reason: <>This could also genuinely explain a lack of reaction.</>,
  },
  {
    working: <>C — bromine solution accidentally used instead of iodine: but <Chem eq="Br2" /> is a <b>stronger</b> oxidant than <Chem eq="I2" /> (and copper reduces both readily).</>,
    reason: <>If anything, using <Chem eq="Br2" /> should make the reaction happen <em>more</em> readily, with an even more obvious colour change — it cannot explain "no apparent change".</>,
  },
  {
    working: <b>Only option C is genuinely impossible as an explanation.</b>,
    reason: <>Matches option <b>C</b>. Options A, B and D are all real reasons a thermodynamically favourable reaction can show no visible change.</>,
  },
]

export default function ChemistryQ25_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A class of Chemistry students investigated the reaction of copper metal and iodine
            solution. After making predictions about the reaction, they placed a copper strip into
            an iodine solution and compared their predictions with their observations.
          </p>
          <p className="mb-2">A number of groups recorded the following.</p>
          <table className="mb-3 text-[13.5px] border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-semibold">Reactants</th>
                <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-semibold">Prediction</th>
                <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-semibold">Observation over 10 minutes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center align-top">
                  Cu metal
                  <br />+<br />
                  <Chem eq="I2" /> solution
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 align-top">
                  A reaction should occur. The expected products are <Chem eq="Cu2+" /> and{' '}
                  <Chem eq="I-" />. The solution should turn from brown to blue as <Chem eq="I2" /> is
                  consumed and <Chem eq="Cu2+" /> is formed. The Cu metal should look corroded.
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 align-top">no apparent change</td>
              </tr>
            </tbody>
          </table>
          <p className="mb-2">
            The predicted results were not observed. The class was asked to suggest some hypotheses
            to explain the unexpected result.
          </p>
          <p>Which one of the following hypotheses could <b>not</b> explain the unexpected result?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'The reaction rate might have been too slow for the time allowed.' },
        { letter: 'B', content: <>An equilibrium was established and <Chem eq="[Cu2+]" /> was too low to be visible.</> },
        { letter: 'C', content: 'A bromine solution was accidentally used in place of the iodine solution.', isAnswer: true },
        { letter: 'D', content: 'The surface of the copper metal was greasy.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
