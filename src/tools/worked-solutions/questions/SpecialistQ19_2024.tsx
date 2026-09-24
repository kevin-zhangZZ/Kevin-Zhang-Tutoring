// 2024 Specialist Mathematics — Exam 2, MCQ 19. VCAA examination report: 68% correct.
// Type II error: the false null that survives the test. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 68, B: 8, C: 8, D: 15 },
  answer: 'A',
  comment: (
    <>
      <Katex tex="\Pr\big(\text{Type II error}\big)=\Pr\big(H_0\text{ is not rejected}\,\big|\,H_1\text{ is true}\big)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Type I: reject } H_0 \text{ when } H_0 \text{ is true}" />,
    reason: <>A false alarm. Its probability is the significance level — option B.</>,
  },
  {
    working: <Katex display tex="\text{Type II: do not reject } H_0 \text{ when } H_0 \text{ is false}" />,
    reason: <>A missed detection. The two errors are the two ways the decision can disagree with reality.</>,
  },
  {
    working: <Katex display tex="H_0 \text{ false} \iff H_1 \text{ true}" />,
    reason: <>The hypotheses are complementary, so "<Katex tex="H_0" /> is false" and "<Katex tex="H_1" /> is true" say the same thing.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{a null hypothesis is not rejected when the alternative hypothesis is true}}" />,
    reason: <>Matches option <b>A</b>. Option <b>C</b> is the correct <em>decision</em> in that situation, not an error; option <b>D</b> is not a definition at all, since "doubtful" is not a statistical state — it was chosen by 15%.</>,
  },
]

export default function SpecialistQ19_2024() {
  return (
    <MCQShell
      question={<p>When conducting a hypothesis test, a type II error occurs when</p>}
      options={[
        { letter: 'A', content: <>a null hypothesis is not rejected when the alternative hypothesis is true.</>, isAnswer: true },
        { letter: 'B', content: <>a null hypothesis is rejected when it is true.</> },
        { letter: 'C', content: <>a null hypothesis is rejected when the alternative hypothesis is true.</> },
        { letter: 'D', content: <>a null hypothesis is not rejected when it is doubtful.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
