// 2017 Chemistry Exam, MCQ 9. VCAA examination report: 36% correct — the hardest MCQ on the
// 2017 paper. Use a nutrition information panel to find the percentage of a serving's energy
// that comes from protein — the trap is which nutrients actually contribute food energy.
// Question text transcribed from the original paper; solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 24, C: 36, D: 35 },
  answer: 'C',
  comment: (
    <>
      Energy in a 45 g sample is determined from:
      <br />
      13.2 g protein → 13.2 g × 17 kJ g⁻¹ = 224 kJ
      <br />
      16.3 g fat → 16.3 g × 37 kJ g⁻¹ = 603 kJ
      <br />
      48.2 g carbohydrate → 48.2 × 16 kJ g⁻¹ = 771 kJ
      <br />
      Total available energy = 224 + 603 + 771 = 1598 kJ
      <br />
      % energy from protein = (224/1598) × 100 = 14.0 %
      <br />
      The selection of option D is consistent with the inclusion of the &lsquo;indigestible&rsquo;
      dietary fibre in calculating the energy content of the muesli.
      <br />
      Option B involved simply dividing the mass of protein by the mass of muesli.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: 'Energy per 100 g: 13.2 g protein · 16.3 g fat · 48.2 g carbohydrate (dietary fibre carries no usable energy).',
    reason: <>A 45 g serving has these components in the same proportion.</>,
  },
  {
    working: (
      <>
        protein: 13.2 g → 13.2 × 17 = 224 kJ
        <br />
        fat: 16.3 g → 16.3 × 37 = 603 kJ
        <br />
        carbohydrate: 48.2 g → 48.2 × 16 = 771 kJ
      </>
    ),
    reason: <>Standard energy values (kJ g⁻¹) for each macronutrient — fibre is deliberately excluded, since it isn't digested.</>,
  },
  {
    working: <>Total available energy = 224 + 603 + 771 = <b>1598 kJ</b></>,
  },
  {
    working: <>% energy from protein = (224 / 1598) × 100 = <b>14.0%</b></>,
    reason: <>The serving size doesn&rsquo;t matter: a 45 g serving contains every nutrient in the same proportion, so the percentage is the same as for 100 g. (The report calls these per-100 g figures &ldquo;a 45 g sample&rdquo;; the percentage is unaffected.)</>,
  },
  {
    working: <b>14.0% of the energy comes from protein.</b>,
    reason: <>Matches option <b>C</b>. Option <b>B</b>, 29.3%, is 13.2 g ÷ 45 g — the protein&rsquo;s mass divided by the serving&rsquo;s mass, as the report says. Option <b>D</b>, 13.2%, is the protein&rsquo;s share of the <em>mass</em> per 100 g; the report links it to including the indigestible dietary fibre in the energy total.</>,
  },
]

export default function ChemistryQ9_2017() {
  return (
    <MCQShell
      question={
        <>
          <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-4 py-3 mb-3 text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              The nutrition information panel on a packet of muesli includes the following
              information.
            </p>
            <table className="w-full text-[13px]">
              <thead>
                <tr>
                  <th colSpan={2} className="py-1 text-center font-semibold">
                    Nutrition information
                    <br />
                    <span className="font-normal">average serving size = 45 g</span>
                  </th>
                </tr>
                <tr>
                  <th className="py-0.5"></th>
                  <th className="py-0.5 text-right font-semibold">Average quantity per 100 g</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="py-0.5">protein</td><td className="py-0.5 text-right">13.2 g</td></tr>
                <tr><td className="py-0.5">fat, total</td><td className="py-0.5 text-right">16.3 g</td></tr>
                <tr><td className="py-0.5 pl-3 text-gray-500 dark:text-gray-400">— saturated</td><td className="py-0.5 text-right">2.9 g</td></tr>
                <tr><td className="py-0.5">carbohydrate, total</td><td className="py-0.5 text-right">48.2 g</td></tr>
                <tr><td className="py-0.5 pl-3 text-gray-500 dark:text-gray-400">— sugars</td><td className="py-0.5 text-right">17.4 g</td></tr>
                <tr><td className="py-0.5">dietary fibre</td><td className="py-0.5 text-right">4.9 g</td></tr>
                <tr><td className="py-0.5">sodium</td><td className="py-0.5 text-right">10.5 mg</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Using the information above, the percentage energy content due to protein in an average
            serving size of this muesli is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: '31.2%' },
        { letter: 'B', content: '29.3%' },
        { letter: 'C', content: '14.0%', isAnswer: true },
        { letter: 'D', content: '13.2%' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
