// 2019 Chemistry Exam, MCQ 13. VCAA examination report: 20% correct — the hardest MCQ on this
// paper. Which statement about flashpoints is correct, reasoning from butane's physical state
// at room temperature. Question text transcribed from the original paper. Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 28, C: 33, D: 19 },
  answer: 'A',
  comment: (
    <>
      Butane is a gas at 25 °C (see the Data Book), so its flashpoint must be less than 25 °C.
      Butan-1-ol has stronger intermolecular attraction than butane and so has a <i>higher</i>{' '}
      flashpoint, making D incorrect.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A flashpoint is the lowest temperature at which a liquid's vapour will ignite — it only makes sense for something that <i>is</i> a liquid at the temperature in question.</>,
    reason: 'Working definition needed to evaluate each option.',
  },
  {
    working: <><Chem eq="C4H10" /> (butane) is already a <b>gas</b> at 25 °C, per the Data Book.</>,
    reason: 'Key fact — butane has already vaporised well before reaching room temperature.',
  },
  {
    working: <>So butane's flashpoint — the temperature at which enough vapour is present to ignite — must be <b>below</b> 25 °C.</>,
    reason: <>Matches option <b>A</b> directly.</>,
  },
  {
    working: <>B: a <i>higher</i> flashpoint reflects <b>stronger</b> intermolecular attraction (harder to vaporise), which means <i>higher</i> viscosity, not lower.</>,
    reason: 'Ruled out — gets the relationship backwards.',
  },
  {
    working: <>C: flashpoint applies to the <i>liquid</i> phase, so it must be below the boiling temperature, not above it.</>,
    reason: 'Ruled out.',
  },
  {
    working: <>D: butan-1-ol has much stronger intermolecular attraction than butane (hydrogen bonding vs. only dispersion forces), so it has a <b>higher</b> flashpoint than butane, not a lower one.</>,
    reason: 'Ruled out — also gets the relationship backwards.',
  },
]

export default function ChemistryQ13_2019() {
  return (
    <MCQShell
      question={<p>Which one of the following statements about flashpoints is correct?</p>}
      options={[
        { letter: 'A', content: 'The flashpoint of butane is lower than 25 °C.', isAnswer: true },
        { letter: 'B', content: 'As a flashpoint increases, the viscosity decreases.' },
        { letter: 'C', content: 'The flashpoint of a compound is higher than its boiling point.' },
        { letter: 'D', content: 'The flashpoint of butane is greater than the flashpoint of butan-1-ol.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
