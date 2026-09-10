// 2023 Chemistry Exam, MCQ 15. VCAA examination report: 41% correct. Comparing petrol-powered
// and hydrogen-fuel-cell-powered drones on energy transformations, heat, and products, by
// elimination against genuine combustion/fuel-cell chemistry. Question text transcribed from the
// original paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 41, B: 12, C: 35, D: 12 },
  answer: 'A',
  comment: (
    <>
      Petrol-powered drones convert chemical energy into thermal and mechanical energy, with
      products CO₂(g) and H₂O(g). Hydrogen-fuel-cell-powered drones convert chemical energy into
      electrical and thermal energy, with product H₂O(g). Since energy is released during the
      reaction in both, both reactions are exothermic — and both CO₂(g) and H₂O(g) are
      greenhouse gases.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Petrol-powered drones burn petrol (combustion) to release <b>thermal + mechanical energy</b>, producing CO₂(g) and H₂O(g). Hydrogen-fuel-cell drones react H₂ with O₂ in a fuel cell to release <b>electrical + thermal energy</b>, producing only H₂O(g).</>,
    reason: 'Lays out what each drone actually converts energy into and what each produces — the basis for checking every option.',
  },
  {
    working: <>A: CO₂(g) is a greenhouse gas, and H₂O(g) (water vapour) is also a recognised greenhouse gas. Petrol drones produce both; hydrogen drones produce H₂O(g) — so both types produce at least one greenhouse gas.</>,
    reason: 'True for both drone types. Correct.',
  },
  {
    working: <>B: a fuel cell is never 100% efficient — some energy is always lost as heat in the hydrogen drone too, exactly as in the petrol drone's combustion.</>,
    reason: 'Both produce heat, not just the petrol drone. Ruled out.',
  },
  {
    working: <>C: petrol drones convert chemical energy into thermal <i>and mechanical</i> energy (the engine directly drives motion), while hydrogen drones convert chemical energy into electrical <i>and thermal</i> energy (which then powers an electric motor) — mechanical vs. electrical is a genuinely different transformation pathway.</>,
    reason: 'The energy transformations are different, not the same. Ruled out.',
  },
  {
    working: <>D: energy is released (not absorbed) in both reactions — combustion of petrol and the H₂/O₂ fuel-cell reaction are both <b>exothermic</b>, not endothermic.</>,
    reason: 'Backwards — both reactions release energy. Ruled out.',
  },
  {
    working: <b>Only "they both produce greenhouse gases" holds for both drone types.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ15_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider two types of drone: petrol-powered and hydrogen-fuel-cell powered.</p>
          <p>
            Which one of the following statements is correct about petrol-powered drones and
            hydrogen-fuel-cell powered drones?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'They both produce greenhouse gases.', isAnswer: true },
        { letter: 'B', content: 'Only petrol-powered drones produce heat.' },
        { letter: 'C', content: 'They both have the same energy transformations.' },
        { letter: 'D', content: 'The overall reactions in hydrogen-fuel-cell powered drones are endothermic.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
