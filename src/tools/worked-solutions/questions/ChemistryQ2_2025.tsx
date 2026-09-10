// 2025 Chemistry Exam, MCQ 2. VCAA examination report: 34% correct. Using Data Book energy-
// content values to find a snack bar's total energy per 100 g, then getting the units right.
// Question text transcribed from the original paper. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 35, C: 13, D: 34 },
  answer: 'D',
  comment: (
    <>
      Energy from 65 g = (16 × 45) + (17 × 10) + (37 × 10) = 1260 kJ. Energy from 100 g =
      1260 × 100/65 = 1938 kJ ≈ 1.9 × 10⁶ J. The most common error among the responses was a
      unit error.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>From the Data Book, the energy content per gram of each macronutrient is: carbohydrate = 16 kJ g⁻¹, protein = 17 kJ g⁻¹, fat = 37 kJ g⁻¹.</>,
    reason: 'Standard reference values needed for any food-energy calculation.',
  },
  {
    working: <>Energy in the 65.0 g bar = (16 kJ g⁻¹ × 45.0 g) + (17 kJ g⁻¹ × 10.0 g) + (37 kJ g⁻¹ × 10.0 g) = 720 + 170 + 370 = <b>1260 kJ</b>.</>,
    reason: 'Multiplying each macronutrient mass by its energy content and summing gives the total energy in the whole bar.',
  },
  {
    working: <>Scaling to 100 g: energy per 100 g = 1260 kJ × (100 g / 65.0 g) = <b>1938 kJ</b> ≈ 1900 kJ.</>,
    reason: "The question asks for energy per 100 g, not per 65 g bar — this scaling step is the one most students missed or got the ratio backwards on.",
  },
  {
    working: <>Converting to joules: 1938 kJ × 1000 J/kJ = <b>1.9 × 10⁶ J</b>.</>,
    reason: <>Matches option <b>D</b> — the most common wrong answer (B, 1.9 × 10³ J) comes from forgetting to convert kJ to J.</>,
  },
]

export default function ChemistryQ2_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">A 65.0 g snack bar contains:</p>
          <ul className="list-disc list-inside mb-2">
            <li>45.0 g of carbohydrate</li>
            <li>10.0 g of protein</li>
            <li>10.0 g of fats.</li>
          </ul>
          <p>The total energy content per 100 g of the snack bar is closest to</p>
        </>
      }
      options={[
        { letter: 'A', content: '1.3 × 10³ J' },
        { letter: 'B', content: '1.9 × 10³ J' },
        { letter: 'C', content: '1.3 × 10⁶ J' },
        { letter: 'D', content: '1.9 × 10⁶ J', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
