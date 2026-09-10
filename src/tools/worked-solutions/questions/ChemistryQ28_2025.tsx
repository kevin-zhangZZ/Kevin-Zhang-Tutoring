// 2025 Chemistry Exam, MCQ 28. VCAA examination report: 45% correct. Predicting the melting-
// point range of vanillin blended with significant amounts of impurities, using how impurities
// genuinely affect melting behaviour. Question text transcribed from the original paper.
// Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 45, B: 28, C: 16, D: 11 },
  answer: 'A',
  comment: (
    <>
      If impurities are present in a compound, the melting point range will be broader and lower
      compared with the literature value. The fact that the stem of the question states that the
      vanillin is often blended with significant amounts of impurities discounts option B as
      being a viable response.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Pure vanillin melts sharply at <b>82–83 °C</b>. Impurities disrupt the regular crystal lattice, which does two things: it <b>lowers</b> the melting point below the pure value, and it <b>broadens</b> the range over which melting occurs (impure samples don't melt sharply).</>,
    reason: 'Both effects — lower and broader — must show up together in the correct answer.',
  },
  {
    working: <>C (82–83 °C) is exactly the <b>pure</b> literature range — a blend containing "significant amounts" of impurities cannot possibly melt as sharply and at as high a temperature as the pure compound.</>,
    reason: 'Ruled out — this ignores that impurities are present at all.',
  },
  {
    working: <>D (100–109 °C) is <i>above</i> the pure melting point — impurities always <b>lower</b> the melting point of the majority component, never raise it.</>,
    reason: 'Backwards direction. Ruled out.',
  },
  {
    working: <>B (79–80 °C) is lower than pure vanillin, but the range is very narrow (only 1 °C) and only slightly below 82–83 °C — too small a depression and too sharp a range for a blend described as containing "significant amounts" of impurities.</>,
    reason: "Technically in the right direction, but doesn't match the scale of impurity described in the question. Ruled out.",
  },
  {
    working: <>A (68–79 °C) is both clearly <b>lower</b> than the pure value and <b>much broader</b> (11 °C wide) — consistent with a sample containing a genuinely significant amount of a different compound mixed in.</>,
    reason: <>Matches the expected effect of significant impurity in both direction and scale — matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ28_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Vanillin is a widely used ingredient in the food industry. Pure vanillin has a
            melting point of 82–83 °C. To reduce costs, it is often blended with significant
            amounts of cheaper compounds that have similar melting points.
          </p>
          <p>A blended sample was tested. The melting point range of the blend would be closest to</p>
        </>
      }
      options={[
        { letter: 'A', content: '68–79 °C', isAnswer: true },
        { letter: 'B', content: '79–80 °C' },
        { letter: 'C', content: '82–83 °C' },
        { letter: 'D', content: '100–109 °C' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
