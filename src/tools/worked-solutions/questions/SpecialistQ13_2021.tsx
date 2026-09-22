// 2021 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 46% correct.
// Turning a scalar resolute back into a vector resolute. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 22, B: 9, C: 14, D: 8, E: 46 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{vector resolute} = (\text{scalar resolute})\times\hat{\underset{\sim}{b}}" />,
    reason: <>The scalar resolute tells you <em>how far</em> along; the unit vector tells you <em>which way</em>.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{b} = -3\underset{\sim}{i} \implies \hat{\underset{\sim}{b}} = \frac{-3\underset{\sim}{i}}{3} = -\underset{\sim}{i}" />,
    reason: <>Dividing by the magnitude 3. The unit vector points in the <em>negative</em> <Katex tex="\underset{\sim}{i}" /> direction — this is the step that flips the sign.</>,
  },
  {
    working: <Katex display tex="-4\times\left(-\underset{\sim}{i}\right) = 4\underset{\sim}{i}" />,
    reason: 'Two negatives.',
  },
  {
    working: <Katex display tex="\boxed{4\underset{\sim}{i}}" />,
    reason: <>Matches option <b>E</b>. Option A, <Katex tex="-4\underset{\sim}{i}" />, is what you get by forgetting that <Katex tex="\underset{\sim}{b}" /> itself points backwards — the most popular wrong answer.</>,
  },
]

export default function SpecialistQ13_2021() {
  return (
    <MCQShell
      question={
        <p>
          The scalar resolute of vector <Katex tex="\underset{\sim}{a}" /> in the direction
          of vector <Katex tex="\underset{\sim}{b}" /> is <Katex tex="-4" />. If{' '}
          <Katex tex="\underset{\sim}{b}=-3\underset{\sim}{i}" />, the vector resolute of{' '}
          <Katex tex="\underset{\sim}{a}" /> in the direction of{' '}
          <Katex tex="\underset{\sim}{b}" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-4\underset{\sim}{i}" /> },
        { letter: 'B', content: <Katex tex="-3\underset{\sim}{i}" /> },
        { letter: 'C', content: <Katex tex="\tfrac13\underset{\sim}{i}" /> },
        { letter: 'D', content: <Katex tex="3\underset{\sim}{i}" /> },
        { letter: 'E', content: <Katex tex="4\underset{\sim}{i}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
