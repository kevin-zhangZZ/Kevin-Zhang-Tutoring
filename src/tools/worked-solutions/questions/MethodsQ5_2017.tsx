// 2017 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 47% correct.
// Recovering the sample proportion from a confidence interval. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 47, B: 20, C: 9, D: 16, E: 7 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="95\%" /> confidence interval is <Katex tex="(0.039,0.121)" />. The sample
      proportion is in the middle of the confidence interval.{' '}
      <Katex tex="0.039+\tfrac{0.121-0.039}{2}=0.080" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\left(\hat p - z\sqrt{\tfrac{\hat p(1-\hat p)}{n}},\ \hat p + z\sqrt{\tfrac{\hat p(1-\hat p)}{n}}\right)" />,
    reason: <>The confidence-interval formula from the formula sheet. The same quantity is subtracted from and added to <Katex tex="\hat p" />, so <Katex tex="\hat p" /> sits exactly in the middle.</>,
  },
  {
    working: <Katex display tex="\hat p = \frac{0.039+0.121}{2}" />,
    reason: <>The midpoint of the two endpoints. Nothing about the confidence level or the sample size is needed.</>,
  },
  {
    working: <Katex display tex="= \frac{0.160}{2}" />,
    reason: <>Adding the endpoints.</>,
  },
  {
    working: <Katex display tex="\boxed{\hat p = 0.080}" />,
    reason: <>Matches option <b>A</b>. The margin of error is then <Katex tex="0.041" />, which is option B — the trap for anyone who computes half the width instead of the midpoint.</>,
  },
]

export default function MethodsQ5_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The <Katex tex="95\%" /> confidence interval for the proportion of ferry tickets
            that are cancelled on the intended departure day is calculated from a large
            sample to be <Katex tex="(0.039,\,0.121)" />.
          </p>
          <p>The sample proportion from which this interval was constructed is</p>
        </>
      }
      background={
        <p>
          A confidence interval is always symmetric about the sample statistic it was built
          from — the same margin of error goes out in both directions. So the sample
          proportion is the midpoint, and you can recover it from the endpoints alone.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.080" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="0.041" /> },
        { letter: 'C', content: <Katex tex="0.100" /> },
        { letter: 'D', content: <Katex tex="0.062" /> },
        { letter: 'E', content: <Katex tex="0.059" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
