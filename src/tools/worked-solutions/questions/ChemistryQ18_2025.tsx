// 2025 Chemistry Exam, MCQ 18. VCAA examination report: 41% correct. Which statement about
// artificial photosynthesis is correct, by elimination against genuine electrolysis-of-water
// chemistry. Question text transcribed from the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 41, B: 21, C: 15, D: 23 },
  answer: 'A',
  comment: (
    <>
      In artificial photosynthesis, water is converted into hydrogen and oxygen gas by the sole
      application of sunlight as the energy source. Water is oxidised to produce oxygen gas and
      at the same time water is reduced to form hydrogen gas. Natural photosynthesis produces
      oxygen gas and glucose. When hydrogen ions gain electrons to form hydrogen gas, this can
      only occur at the cathode.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Artificial photosynthesis splits water directly into H₂ and O₂ using <b>sunlight alone</b> as the energy source — it's essentially solar-driven electrolysis of water, not a carbon-fixing process.</>,
    reason: 'The key distinction from natural photosynthesis to keep in mind for every option.',
  },
  {
    working: <>A: <Chem eq="2H2O -> O2 + 4H+ + 4e-" /> (oxidation, at the anode) paired with <Chem eq="4H+ + 4e- -> 2H2" /> (reduction, at the cathode) — water is oxidised to O₂ while, simultaneously, water (via H⁺) is reduced to H₂.</>,
    reason: 'Both halves of the process — genuinely correct. Matches option A.',
  },
  {
    working: <>B: natural photosynthesis produces <b>glucose</b> and O₂ from CO₂ and H₂O; artificial photosynthesis produces <b>H₂</b> and O₂ from H₂O alone — the products are different, not the same.</>,
    reason: 'Confuses two genuinely different processes that happen to both use sunlight. Ruled out.',
  },
  {
    working: <>C: hydrogen ions gaining electrons to form H₂ is a <b>reduction</b> half-reaction, and reduction always occurs at the <b>cathode</b>, never the anode.</>,
    reason: "Gets the electrode backwards — the anode is where oxidation happens. Ruled out.",
  },
  {
    working: <>D: the entire point of artificial photosynthesis is that <b>sunlight</b>, not an external power supply, drives the water-splitting reaction — that's what makes it a solar-energy technology rather than ordinary electrolysis.</>,
    reason: 'Contradicts the defining feature of the process. Ruled out.',
  },
  {
    working: <b>Only the description of water being simultaneously oxidised (to O₂) and reduced (to H₂) is correct.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ18_2025() {
  return (
    <MCQShell
      question={<p>In artificial photosynthesis</p>}
      options={[
        { letter: 'A', content: 'water is oxidised and hydrogen gas, H₂, is produced.', isAnswer: true },
        { letter: 'B', content: 'the same products are produced as in natural photosynthesis.' },
        { letter: 'C', content: 'hydrogen ions, H⁺, are reduced to produce hydrogen gas, H₂, at the anode.' },
        { letter: 'D', content: 'electrical energy from an external power supply is required to oxidise water.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
