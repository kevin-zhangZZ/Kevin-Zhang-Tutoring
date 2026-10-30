// 2025 Chemistry Exam, MCQ 2. VCAA examination report: 34% correct. Using Data Book energy-
// content values to find a snack bar's total energy per 100 g, then getting the units right.
// Question text transcribed from the original paper. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 35, C: 13, D: 34 },
  answer: 'D',
  comment: (
    <>
      Energy from 65 g = (16 x 45) + (17 x 10) + (37 x 10) = 1260 kJ
      <br />
      Energy from 100 g = 1260 x 100/65 = 1938 kJ = 1.9 x 10⁶ J
      <br />
      The most common error among the responses was unit error.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Energy content (Data Book): carbohydrate 16 kJ g⁻¹, protein 17 kJ g⁻¹, fats and oils 37 kJ g⁻¹</>,
    reason: <>The Data Book table &lsquo;Energy content of biomolecules in food&rsquo; gives the energy the body gets from each gram of each food group. Each food group in the bar contributes (mass × energy content), and the contributions add.</>,
  },
  {
    working: <>Energy in 65.0 g bar = Σ(mass × energy content)<br />= (45.0 g × 16 kJ g⁻¹) + (10.0 g × 17 kJ g⁻¹) + (10.0 g × 37 kJ g⁻¹)<br />= 720 kJ + 170 kJ + 370 kJ = <b>1260 kJ</b></>,
    reason: <>g × kJ g⁻¹ = kJ, so each term is an energy. This is the energy in the <i>whole</i> 65.0 g bar — the question asks for something else.</>,
  },
  {
    working: <>Energy per 100 g = 1260 kJ × (100 g ÷ 65.0 g)<br />= <b>1938 kJ</b> per 100 g</>,
    reason: <>The question asks for the energy per 100 g. 100 g is more than one bar, so the answer must be bigger than 1260 kJ — scale up by 100/65.0.</>,
  },
  {
    working: <>1938 kJ × 1000 J kJ⁻¹ = 1.938 × 10⁶ J ≈ <b>1.9 × 10⁶ J</b></>,
    reason: <>The options are in joules, and 1 kJ = 1000 J. The Data Book energy contents (16, 17, 37 kJ g⁻¹) have only 2 significant figures, which limits the answer to 2 significant figures.</>,
  },
  {
    working: <><b>1.9 × 10⁶ J per 100 g</b></>,
    reason: <>Matches option <b>D</b>. Option <b>B</b>, 1.9 × 10³ J (35%, the most popular answer), has the right number but writes 1938 kJ as if it were joules — the unit error the report describes. Option <b>C</b>, 1.3 × 10⁶ J, is the energy of the 65.0 g bar, not of 100 g. Option <b>A</b>, 1.3 × 10³ J, makes both slips: energy of one bar, left in kJ but labelled J.</>,
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
