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
      Option D is consistent with including the "indigestible" dietary fibre in the energy
      calculation. Option B involved simply dividing the mass of protein by the mass of muesli.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: 'Energy per 100 g: 13.2 g protein · 16.3 g fat · 48.2 g carbohydrate (dietary fibre carries no usable energy).',
    reason: 'A 45 g serving has these components in the same proportion.',
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
    reason: <>Matches option <b>C</b>.</>,
  },
  {
    working: <>(Option D's 13.2% comes from wrongly including fibre's mass — but not its energy — somewhere in the total; option B's 29.3% comes from the unrelated "protein mass ÷ muesli mass" shortcut, ignoring energy content entirely.)</>,
    reason: 'Both distractors are simple, easy-to-make shortcuts that skip a real step.',
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
              information (average quantity per 100 g; average serving size = 45 g):
            </p>
            <table className="w-full text-[13px]">
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
