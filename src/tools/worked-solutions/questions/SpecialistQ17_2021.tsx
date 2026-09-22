// 2021 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 50% correct.
// The distribution of a sample mean of six. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 20, C: 13, D: 11, E: 50 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{N}\!\left(1.26,\ 0.01^2\right)" />,
    reason: 'One bottle.',
  },
  {
    working: <Katex display tex="\bar X \sim \mathrm{N}\!\left(1.26,\ \frac{0.01^2}{6}\right) \implies \mathrm{sd}\!\left(\bar X\right) = \frac{0.01}{\sqrt6}" />,
    reason: <>The question asks about the <em>mean</em> of six bottles, so the standard deviation shrinks by <Katex tex="\sqrt6" />. Using 0.01 unchanged gives option B, the second most popular answer.</>,
  },
  {
    working: <Katex display tex="\Pr\!\left(\bar X \ge 1.25\right) = \Pr\!\left(Z \ge \frac{1.25-1.26}{0.01/\sqrt6}\right) = \Pr\!\left(Z \ge -\sqrt6\right)" />,
    reason: <>The numbers are chosen so the <Katex tex="z" />-score is exactly <Katex tex="-\sqrt6\approx-2.449" />.</>,
  },
  {
    working: <Katex display tex="\boxed{0.9928}" />,
    reason: <>Matches option <b>E</b>. Note the mean is <em>above</em> the labelled volume, so a probability near 1 is what to expect.</>,
  },
]

export default function SpecialistQ17_2021() {
  return (
    <MCQShell
      question={
        <p>
          Bottles of a particular brand of soft drink are labelled as having a volume of 1.25
          L. The machines filling the bottles deliver a volume that is normally distributed
          with a mean of 1.26 L and a standard deviation of 0.01 L. The probability that six
          bottles have a mean volume that is at least the labelled volume of 1.25 L is
          closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.5968" /> },
        { letter: 'B', content: <Katex tex="0.8413" /> },
        { letter: 'C', content: <Katex tex="0.9750" /> },
        { letter: 'D', content: <Katex tex="0.9772" /> },
        { letter: 'E', content: <Katex tex="0.9928" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
