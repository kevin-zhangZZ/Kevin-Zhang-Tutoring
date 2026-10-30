// 2025 Chemistry Exam, MCQ 12. VCAA examination report: 62% correct. Faraday's laws in a
// hydrogen–oxygen fuel cell: charge → mol of electrons → mol of O₂ (4 e⁻ per O₂) → mass of O₂.
// Question text transcribed from the original paper (no diagram). Answer and comment from the
// VCAA report only; all numbers recomputed with the 2026 Data Book (F = 96 500 C mol⁻¹,
// M(O) = 16.0 g mol⁻¹ — unchanged from 2025). Solution is original.

import Katex from '../../../components/Katex'
import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 62, C: 13, D: 5 },
  answer: 'B',
  comment: (
    <>
      n(e⁻) = Q/F = 36000 / 96500 = 0.373 mol
      <br />
      O₂ + 4H⁺ + 4e⁻ → 2H₂O
      <br />
      n(O₂) = n(e⁻)/4 = 0.373 / 4 = 0.09326 mol
      <br />
      m(O₂) = n x M = 0.09326 x 32 = 2.98 g
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex tex="n(\mathrm{e^-}) = \dfrac{Q}{F}" />,
    reason: <>Faraday&rsquo;s first law: the amount of electrons transferred is set by the charge. Data Book: <i>n</i>(e⁻) = <i>Q</i>/<i>F</i>, with the Faraday constant <i>F</i> = 96 500 C mol⁻¹ (the charge on one mole of electrons).</>,
  },
  {
    working: <Katex tex="n(\mathrm{e^-}) = \dfrac{36\,000\ \mathrm{C}}{96\,500\ \mathrm{C\ mol^{-1}}}" />,
  },
  {
    working: <Katex tex="n(\mathrm{e^-}) = 0.37306\ \mathrm{mol}" />,
    reason: <>Carry the unrounded value forward.</>,
  },
  {
    working: <Chem eq="O2(g) + 4H+(aq) + 4e- -> 2H2O(l)" />,
    reason: <>O₂ is the oxidising agent, so it gains the electrons at the <b>cathode</b>. Data Book (electrochemical series), acidic electrolyte. In an alkaline cell the half-equation is <Chem eq="O2(g) + 2H2O(l) + 4e- -> 4OH-(aq)" /> — either way, <b>each O₂ takes 4 electrons</b>. (Check with the overall equation: 2H₂ give 4e⁻, all of which go to one O₂.)</>,
  },
  {
    working: <>Mole ratio <Katex tex="n(\mathrm{O_2}) : n(\mathrm{e^-}) = 1 : 4" /></>,
  },
  {
    working: <Katex tex="n(\mathrm{O_2}) = \tfrac{1}{4} \times 0.37306\ \mathrm{mol} = 0.093264\ \mathrm{mol}" />,
  },
  {
    working: <Katex tex="m(\mathrm{O_2}) = n \times M" />,
    reason: <>Data Book: <i>M</i>(O) = 16.0 g mol⁻¹, so <i>M</i>(O₂) = 2 × 16.0 = 32.0 g mol⁻¹.</>,
  },
  {
    working: <Katex tex="m(\mathrm{O_2}) = 0.093264\ \mathrm{mol} \times 32.0\ \mathrm{g\ mol^{-1}}" />,
  },
  {
    working: <Katex tex="\boxed{m(\mathrm{O_2}) = 2.98\ \mathrm{g}}" />,
    reason: <>
      Matches option <b>B</b> (2.984… g, to three significant figures like the options and{' '}
      <i>M</i>(O₂) = 32.0). Sanity check: 36 000 C is about 0.37 mol of electrons, so under 0.1 mol
      of O₂ — a few grams is sensible. Distractors: <b>A</b> (11.9 g), chosen by 19%, leaves out
      the 1 : 4 ratio, treating 0.373 mol of electrons as 0.373 mol of O₂ (0.373 × 32.0 = 11.9 g).{' '}
      <b>C</b> (1.49 g) uses the molar mass of an oxygen <i>atom</i>, 16.0, instead of the O₂
      molecule, 32.0 (0.09326 × 16.0 = 1.49 g). <b>D</b> (0.373 g) is the amount of electrons
      in mol, written as if it were a mass.
    </>,
  },
]

export default function ChemistryQ12_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A fuel cell utilises the reaction between hydrogen, H₂, and oxygen, O₂, to produce water,
            as shown in the reaction below.
          </p>
          <p className="mb-3 pl-6"><Chem eq="2H2(g) + O2(g) -> 2H2O(l)" /></p>
          <p>When a fuel cell produces 36 000 C of charge, the mass of O₂ consumed is closest to</p>
        </>
      }
      options={[
        { letter: 'A', content: <>11.9 g</> },
        { letter: 'B', content: <>2.98 g</>, isAnswer: true },
        { letter: 'C', content: <>1.49 g</> },
        { letter: 'D', content: <>0.373 g</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
