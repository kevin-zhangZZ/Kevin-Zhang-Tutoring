// 2022 Chemistry Exam, MCQ 25. VCAA examination report: 33% correct. Which statements about
// biodiesel versus petrodiesel are correct. Question text transcribed from the original paper.
// Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 25, B: 31, C: 12, D: 33 },
  answer: 'D',
  comment: (
    <>
      Biodiesel is more hygroscopic because of the polar ester groups in the molecules (I is
      incorrect); biodiesel's stronger dipole-dipole attraction means it solidifies at a higher
      temperature (II correct); biodiesel comes from plants/animals while petrodiesel is a fossil
      fuel (III correct); petrodiesel contains more sulfur, producing more SO₂ (IV correct).
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>I: Biodiesel molecules contain <b>polar ester groups</b>, giving them a stronger affinity for water than the mostly non-polar hydrocarbons in petrodiesel.</>,
    reason: <><b>Biodiesel</b> is the more hygroscopic one — statement I has it backwards. Incorrect.</>,
  },
  {
    working: <>II: Biodiesel's polar ester groups give it dipole-dipole attraction on top of dispersion forces, stronger than petrodiesel's dispersion-forces-only attraction.</>,
    reason: 'Stronger intermolecular attraction means more energy is needed to keep it liquid — it solidifies (freezes) at a higher temperature. Correct.',
  },
  {
    working: <>III: Biodiesel is produced from recently-living plant oils and animal fats; petrodiesel is a fossil fuel, formed from decomposing organic material over millions of years.</>,
    reason: 'Correct — this is exactly the distinction between a biofuel and a fossil fuel.',
  },
  {
    working: <>IV: Petrodiesel, being derived from long-decomposed organic (protein-containing) matter, contains sulfur impurities that biodiesel — made from fresh oils/fats — largely lacks.</>,
    reason: <>More sulfur in the fuel means more <b>SO₂</b> is produced on combustion. Correct.</>,
  },
  {
    working: <b>Statements II, III and IV are correct; only I is wrong.</b>,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function ChemistryQ25_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following statements regarding biodiesel and petrodiesel:</p>
          <ol className="list-none pl-0 mb-2 space-y-1">
            <li>I. Petrodiesel is more hygroscopic than biodiesel.</li>
            <li>II. Biodiesel forms crystals at a higher temperature than petrodiesel.</li>
            <li>III. Biodiesel and petrodiesel are derived from plants and animals.</li>
            <li>IV. The combustion of biodiesel releases less sulfur dioxide than petrodiesel.</li>
          </ol>
          <p>Which of the statements above are correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'I and IV only' },
        { letter: 'B', content: 'III and IV only' },
        { letter: 'C', content: 'I, II and III only' },
        { letter: 'D', content: 'II, III and IV only', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
