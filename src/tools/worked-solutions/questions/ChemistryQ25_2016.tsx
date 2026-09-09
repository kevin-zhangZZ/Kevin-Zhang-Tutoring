// 2016 Chemistry Exam, MCQ 25. VCAA examination report: 35% correct — the third-hardest MCQ on
// the 2016 paper. Copper metal in iodine solution showed no visible reaction — which proposed
// explanation is actually impossible? Question text transcribed from the original paper;
// solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 25, C: 35, D: 21 },
  answer: 'C',
  comment: (
    <>
      On the electrochemical series, <Chem eq="Br2(l) + 2e- <=> 2Br-(aq)" /> (E° = 1.09 V) is a
      <em> stronger</em> oxidant than <Chem eq="I2(s) + 2e- <=> 2I-(aq)" /> (E° = 0.55 V) — both stronger
      than <Chem eq="Cu2+(aq) + 2e- <=> Cu(s)" /> (E° = 0.34 V).
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: 'Predicted: Cu + I2 → Cu2+ + I-, with visible colour change (brown → blue) and a corroded copper strip.',
    reason: <>Copper is a stronger reductant than iodide, so it should reduce <Chem eq="I2" />.</>,
  },
  {
    working: 'Observed: no apparent change over 10 minutes.',
    reason: 'The task: find which hypothesis could NOT explain this discrepancy.',
  },
  {
    working: <>A — reaction rate too slow for the time allowed: entirely plausible; some reactions are just slow, even when thermodynamically favourable.</>,
    reason: 'This could genuinely explain it — rule it out as the answer.',
  },
  {
    working: <>B — an equilibrium was established with <Chem eq="[Cu2+]" /> too low to see: also plausible — a small extent of reaction wouldn't visibly change the colour.</>,
    reason: 'This could also genuinely explain it.',
  },
  {
    working: <>D — greasy copper surface: plausible — a layer of grease would physically block contact between the metal and the solution.</>,
    reason: 'This could also genuinely explain a lack of reaction.',
  },
  {
    working: <>C — bromine solution accidentally used instead of iodine: but <Chem eq="Br2" /> is a <b>stronger</b> oxidant than <Chem eq="I2" /> (and copper reduces both readily).</>,
    reason: <>If anything, using <Chem eq="Br2" /> should make the reaction happen <em>more</em> readily, with an even more obvious colour change — it cannot explain "no apparent change".</>,
  },
  {
    working: <b>Only option C is genuinely impossible as an explanation.</b>,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function ChemistryQ25_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A class of Chemistry students investigated the reaction of copper metal and iodine
            solution. A copper strip was placed into an iodine solution. A reaction was predicted
            (products <Chem eq="Cu2+" /> and <Chem eq="I-" />, colour change brown → blue, copper
            visibly corroded), but over 10 minutes, no apparent change was observed.
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
