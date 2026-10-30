// 2022 Chemistry Exam, MCQ 6. VCAA examination report: 56% correct. Comparing the energy
// transformations of galvanic cells and fuel cells (chemical → electrical energy plus heat), and
// whether either is reversible. Question text transcribed from the original paper (no figures).
// VCAA report only (no second source). The report's comment has the typo "fuel calls" for "fuel
// cells", kept verbatim. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 56, C: 15, D: 21 },
  answer: 'B',
  comment: (
    <>
      Galvanic cells and fuel calls both convert chemical energy to electrical energy and heat
      energy.
      <br />
      Fuel cells are not reversible.
      <br />
      Students should be familiar with the energy transformations associated with the different
      types of electrochemical cells.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Galvanic cell: <b>chemical energy → electrical energy</b> (+ some heat).</>,
    reason: <>A spontaneous redox reaction drives electrons through the external circuit. No cell is 100% efficient, so some of the chemical energy is always released as heat (the cell warms up as it runs).</>,
  },
  {
    working: <>Fuel cell: <b>chemical energy → electrical energy</b> (+ some heat).</>,
    reason: <>A fuel cell is a type of galvanic cell: the fuel is oxidised at the anode and O₂ is reduced at the cathode — a spontaneous reaction producing electricity. It is more efficient than burning the fuel, but some energy is still lost as heat.</>,
  },
  {
    working: <>So the energy transformations are the <b>same</b> → C and D are wrong.</>,
    reason: <>Both start with chemical energy and end with electrical energy plus heat. C is also wrong because fuel cells produce electricity too. D&rsquo;s second half (porous electrodes) is true of fuel cells, but its first half is false, so the whole statement is false.</>,
  },
  {
    working: <>Fuel cells are <b>not reversible</b> (not recharged) → A is wrong.</>,
    reason: <>A fuel cell runs as long as fuel and oxygen are supplied and products are removed; it is never recharged by reversing the reaction. (Only secondary, rechargeable cells are reversible.)</>,
  },
  {
    working: <b>Same energy transformations, and both produce heat.</b>,
    reason: <>Matches option <b>B</b>. Option <b>D</b> (21%) pairs a true fact about fuel cells (porous electrodes) with the false claim that the energy transformations differ — every part of an option must be true. <b>A</b> treats fuel cells as rechargeable; <b>C</b> forgets that fuel cells also produce electricity.</>,
  },
]

export default function ChemistryQ6_2022() {
  return (
    <MCQShell
      question={<>Galvanic cells and fuel cells have</>}
      options={[
        { letter: 'A', content: <>the same energy transformations and both are reversible.</> },
        { letter: 'B', content: <>the same energy transformations and both produce heat.</>, isAnswer: true },
        { letter: 'C', content: <>different energy transformations but galvanic cells produce electricity.</> },
        { letter: 'D', content: <>different energy transformations but fuel cells use porous electrodes.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
