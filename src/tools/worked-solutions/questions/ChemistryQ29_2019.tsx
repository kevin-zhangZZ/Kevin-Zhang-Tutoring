// 2019 Chemistry Exam, MCQ 29. VCAA examination report: 37% correct. Which error in a vitamin C
// titration would cause the calculated concentration to be underestimated. Question text
// transcribed from the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 23, C: 37, D: 25 },
  answer: 'C',
  comment: (
    <>
      If the initial volume in the burette is read as higher than the true value, the calculated
      V(titre) will be lower than the true value, so the calculated n(I₂), n(vitamin C) and
      c(vitamin C) will all be underestimated.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="C6H8O6(aq) + I2(aq) -> C6H6O6(aq) + 2H+(aq) + 2I-(aq)" className="block text-[13px]" />,
    reason: <>Vitamin C is found from n(vitamin C) = n(I₂) = c(I₂) × V(titre).</>,
  },
  {
    working: <>A: Using 19 mL of water instead of the intended 20 mL only changes the <i>dilution</i> — the actual amount (moles) of vitamin C in the 5 mL sample is unaffected, so the titre volume needed to react with it all is unaffected too.</>,
    reason: 'No effect on the calculated concentration. Ruled out.',
  },
  {
    working: <>B: If the true I₂ concentration was actually <i>lower</i> than the value used in the calculation, then using the higher (wrong) concentration with the true titre volume <b>overstates</b> n(I₂) — and hence n(vitamin C).</>,
    reason: 'Causes an overestimation, not an underestimation. Ruled out.',
  },
  {
    working: <>C: <Chem eq="V(titre) = V(final) - V(initial)" />. If the initial reading is recorded as <b>higher</b> than the true value (2.50 mL instead of the true 1.50 mL), the calculated titre comes out <b>smaller</b> than the true titre.</>,
    reason: <>A smaller titre means less I₂ (and so less vitamin C) is calculated to have reacted — <b>underestimation</b>.</>,
  },
  {
    working: <>D: <Chem eq="% (m/m) = [mass vitamin C / mass juice] x 100" />. A recorded juice mass that's <i>lower</i> than the true mass sits in the denominator, making the calculated percentage <b>larger</b>.</>,
    reason: 'Causes an overestimation, not an underestimation. Ruled out.',
  },
  {
    working: <b>Only the burette-reading error (C) underestimates the result.</b>,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function ChemistryQ29_2019() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The concentration of vitamin C in a filtered sample of grapefruit juice was determined
            by titrating the juice with 9.367 × 10⁻⁴ M iodine, I₂, solution using starch solution
            as an indicator. The molar mass of vitamin C is 176.0 g mol⁻¹. The reaction is:
          </p>
          <Chem eq="C6H8O6(aq) + I2(aq) -> C6H6O6(aq) + 2H+(aq) + 2I-(aq)" className="block text-[13.5px] my-2" />
          <p className="mb-2">Method: weigh a clean conical flask; add 5 mL of grapefruit juice and reweigh; add 20 mL of deionised water; add a drop of starch indicator; titrate against the I₂ solution.</p>
          <p>Which one of the following errors would result in an <b>underestimation</b> of the concentration of vitamin C in grapefruit juice?</p>
        </>
      }
      options={[
        { letter: 'A', content: '19 mL of deionised water was added to the conical flask (instead of the intended 20 mL).' },
        { letter: 'B', content: 'The concentration of the I₂ solution was actually 9.178 × 10⁻⁴ M (not the 9.367 × 10⁻⁴ M used in the calculation).' },
        { letter: 'C', content: 'The initial volume of the I₂ solution in the burette was 1.50 mL, but it was read as 2.50 mL.', isAnswer: true },
        { letter: 'D', content: 'The balance was faulty and the measured mass of grapefruit juice was lower than the actual mass.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
