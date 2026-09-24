// 2020 Chemistry Exam, MCQ 28. VCAA examination report: 22% correct. Comparing the
// Maxwell-Boltzmann distributions and chemical energy of the product gases from combusting
// equal moles of two C₂H₄O₂ isomers with different heats of combustion. Question text
// transcribed from the original paper. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './chem-2020-mcq28-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 22, C: 39, D: 25 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      The combustion reaction for both ethanoic acid and ethanoic acid is
      <br />
      <Chem eq="C2H4O2 + 3O2 -> 2CO2 + 2H2O" />.
      <br />
      Since the products and their relative amounts are identical for both compounds, the chemical
      energies of the products will be identical for both.
      <img src={reportGraphSrc} alt="The report's sketch of two Maxwell-Boltzmann distributions: a taller, narrower curve at T1 and a flatter, broader curve at T2, where T2 > T1" className="w-full max-w-[300px] mt-1" />
      Maxwell-Boltzmann distributions show a plot of the number (proportion) of molecules against
      kinetic energy or particle velocity. At higher temperatures the kinetic energies and velocities
      of the particles increases and the distribution flattens and broadens.
      <br />
      The temperature of the product mixture after combustion depends on the amount of heat energy
      released. Since methyl methanoate (-973 kJ mol⁻¹) releases more energy per mole its product
      mixture will be at the higher temperature and it will have a broader Maxwell-Boltzmann
      distribution. Ethanoic acid releases less energy per mol so its product mixture is at a lower
      temperature, and it will have a narrower Maxwell-Boltzmann distribution.
      <br />
      The popularity of alternatives C and D seems to suggest that the difference between chemical
      energy and heat energy and the effect of temperature on the shape of Maxwell-Boltzmann
      distributions are aspects that are not well understood.
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
    reason: <>Rules out options C and D, which both claim a difference in the chemical energy of the products.</>,
  },
  {
    working: <>Δ<i>H</i><sub>c</sub>(ethanoic acid) = −876 kJ mol⁻¹</>,
    reason: <>Given: heat of combustion of ethanoic acid.</>,
  },
  {
    working: <>Δ<i>H</i><sub>c</sub>(methyl methanoate) = −973 kJ mol⁻¹</>,
    reason: <>Given: heat of combustion of methyl methanoate — more negative, so it releases <b>more</b> energy per mole burned.</>,
  },
  {
    working: <>In a closed vessel, the extra chemical energy released by methyl methanoate's combustion has nowhere to go but into heating up its own product gases.</>,
    reason: <>More energy released means a higher final temperature of the product mixture.</>,
  },
  {
    working: <>A higher-temperature gas sample has a <b>broader</b> Maxwell-Boltzmann distribution (more spread in particle speeds/energies).</>,
    reason: <>Standard Maxwell-Boltzmann property.</>,
  },
  {
    working: <b>Ethanoic acid's products, having received less energy, end up cooler — a narrower distribution than methyl methanoate's products.</b>,
    reason: <>Matches option <b>B</b>: narrower distribution, identical chemical energy of the products. Options C and D, chosen by nearly two-thirds, confuse the chemical energy of the products with the heat released. (The report&rsquo;s equation has 3O₂ — it balances with 2O₂ — and says &ldquo;ethanoic acid and ethanoic acid&rdquo; for the two isomers.)</>,
  },
]

export default function ChemistryQ28_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 27 and 28.</p>
          <p className="mb-2">
            The heat of combustion of ethanoic acid, C₂H₄O₂, is −876 kJ mol⁻¹ and the heat of
            combustion of methyl methanoate, C₂H₄O₂, is −973 kJ mol⁻¹. The auto-ignition
            temperature (the temperature at which a substance will combust in air without a source
            of ignition) of ethanoic acid is 485 °C and the auto-ignition temperature of methyl
            methanoate is 449 °C.
          </p>
          <p>
            If 0.1 mol of ethanoic acid and 0.1 mol of methyl methanoate were completely combusted
            in two separate closed vessels under identical conditions, the Maxwell-Boltzmann
            distribution of the product gases from the combustion of ethanoic acid would be
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'broader than the Maxwell-Boltzmann distribution of the methyl methanoate product gases and the chemical energy of the product gases would be identical.' },
        { letter: 'B', content: 'narrower than the Maxwell-Boltzmann distribution of the methyl methanoate product gases and the chemical energy of the product gases would be identical.', isAnswer: true },
        { letter: 'C', content: 'broader than the Maxwell-Boltzmann distribution of the methyl methanoate product gases and the chemical energy of the ethanoic acid product gases would be higher.' },
        { letter: 'D', content: 'narrower than the Maxwell-Boltzmann distribution of the methyl methanoate product gases and the chemical energy of the ethanoic acid product gases would be higher.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
