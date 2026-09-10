// 2020 Chemistry Exam, MCQ 28. VCAA examination report: 22% correct. Comparing the
// Maxwell-Boltzmann distributions and chemical energy of the product gases from combusting
// equal moles of two C₂H₄O₂ isomers with different heats of combustion. Question text
// transcribed from the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 22, C: 39, D: 25 },
  answer: 'B',
  comment: (
    <>
      Since the products and their relative amounts are identical for both compounds, the
      chemical energy of the products will be identical for both. Methyl methanoate releases more
      energy per mole, so its product mixture is at a higher temperature and has a broader
      Maxwell–Boltzmann distribution; ethanoic acid's product mixture is at a lower temperature
      and has a narrower distribution.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="C2H4O2 + 2O2 -> 2CO2 + 2H2O" className="mr-2" />,
    reason: <>Both ethanoic acid and methyl methanoate are <Chem eq="C2H4O2" /> isomers, so they combust via the identical equation, producing exactly the same products in the same amounts.</>,
  },
  {
    working: <>Since the products (2 mol CO₂ + 2 mol H₂O per mole burned) are identical either way, the chemical energy <i>stored in the products</i> must also be identical.</>,
    reason: 'Rules out options C and D, which both claim a difference in the chemical energy of the products.',
  },
  {
    working: <Chem eq="Ho(ethanoic acid) = -876" className="mr-1" />,
    reason: <>Given: heat of combustion of ethanoic acid.</>,
  },
  {
    working: <Chem eq="Ho(methyl methanoate) = -973" className="mr-1" />,
    reason: <>Given: heat of combustion of methyl methanoate — more negative, so it releases <b>more</b> energy per mole burned.</>,
  },
  {
    working: <>In a closed vessel, the extra chemical energy released by methyl methanoate's combustion has nowhere to go but into heating up its own product gases.</>,
    reason: 'More energy released means a higher final temperature of the product mixture.',
  },
  {
    working: <>A higher-temperature gas sample has a <b>broader</b> Maxwell-Boltzmann distribution (more spread in particle speeds/energies).</>,
    reason: 'Standard Maxwell-Boltzmann property.',
  },
  {
    working: <b>Ethanoic acid's products, having received less energy, end up cooler — a narrower distribution than methyl methanoate's products.</b>,
    reason: <>Matches option <b>B</b>: narrower distribution, identical chemical energy of the products.</>,
  },
]

export default function ChemistryQ28_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The heat of combustion of ethanoic acid, C₂H₄O₂, is −876 kJ mol⁻¹ and the heat of
            combustion of methyl methanoate, C₂H₄O₂, is −973 kJ mol⁻¹.
          </p>
          <p>
            If 0.1 mol of ethanoic acid and 0.1 mol of methyl methanoate were completely combusted
            in two separate closed vessels under identical conditions, the Maxwell-Boltzmann
            distribution of the product gases from the combustion of ethanoic acid would be
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'broader than the Maxwell-Boltzmann distribution of the methyl methanoate product gases, and the chemical energy of the product gases would be identical.' },
        { letter: 'B', content: 'narrower than the Maxwell-Boltzmann distribution of the methyl methanoate product gases, and the chemical energy of the product gases would be identical.', isAnswer: true },
        { letter: 'C', content: 'broader than the Maxwell-Boltzmann distribution of the methyl methanoate product gases, and the chemical energy of the ethanoic acid product gases would be higher.' },
        { letter: 'D', content: 'narrower than the Maxwell-Boltzmann distribution of the methyl methanoate product gases, and the chemical energy of the ethanoic acid product gases would be higher.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
