// 2025 Chemistry Exam, MCQ 24. VCAA examination report: 64% correct. Overall percentage yield of
// a two-step synthesis = product of the step yields; solving for the unknown step 2 yield.
// Question text transcribed from the original paper; the process flow diagram is cropped from the
// original VCAA exam PDF. VCAA report only (no second source). Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import processSrc from './chem-2025-mcq24-process.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 10, C: 16, D: 64 },
  answer: 'D',
  comment: (
    <>
      16% = 0.45 x (Yield for Step 2)
      <br />
      %Yield for Step 2 = 16% / 0.45 = 35.5% = 36%
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>overall yield = (yield of step 1) × (yield of step 2)</>,
    reason: <>Each step converts only a fraction of what it is given. Step 2 starts with only the 45% that step 1 produced, so the fractions <b>multiply</b> — they don&rsquo;t add or subtract.</>,
  },
  {
    working: <>0.16 = 0.45 × (yield of step 2)</>,
    reason: <>Write the percentages as decimals: 16% = 0.16 and 45% = 0.45.</>,
  },
  {
    working: <>yield of step 2 = 0.16 ÷ 0.45 = 0.3556 = <b>36%</b></>,
    reason: <>Divide both sides by 0.45. Two significant figures, matching the data (45% and 16%). The report&rsquo;s &ldquo;35.5%&rdquo; is 35.55…% cut short; it rounds to 36% either way.</>,
  },
  {
    working: <>Check: 0.45 × 0.36 = 0.162 ≈ 16% ✓</>,
    reason: <>Sanity check: the step 2 yield must be <i>more</i> than 16%, because the overall yield can never be higher than any single step&rsquo;s yield.</>,
  },
  {
    working: <b>Yield for step 2 ≈ 36%</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b> (29%) subtracts the yields, 45% − 16%. Option <b>B</b> (7.2%) multiplies them, 0.45 × 0.16 = 0.072 — that would be the overall yield if step 2 were 16%. Option <b>A</b> (2.8%) divides the wrong way round, 0.45 ÷ 0.16 = 2.8. A and B are both below 16%, which the sanity check rules out straight away.</>,
  },
]

export default function ChemistryQ24_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">The manufacturing process for a medicine is shown below.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={processSrc}
              alt="Raw materials → (Step 1, yield 45%) → intermediate product → (Step 2, yield ?) → final product — from the original 2025 VCAA exam paper"
              className="w-full max-w-[520px]"
            />
          </div>
          <p>If the overall yield is 16%, the yield for step 2 is closest to</p>
        </>
      }
      options={[
        { letter: 'A', content: <>2.8%</> },
        { letter: 'B', content: <>7.2%</> },
        { letter: 'C', content: <>29%</> },
        { letter: 'D', content: <>36%</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
