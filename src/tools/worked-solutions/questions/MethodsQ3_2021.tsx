// 2021 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 72% correct.
// A 95% confidence interval for a population proportion. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 72, B: 7, C: 6, D: 8, E: 5 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p \pm z\sqrt{\frac{\hat p\left(1-\hat p\right)}{n}}" />,
    reason: <>The approximate confidence interval from the formula sheet, with <Katex tex="\hat p=0.125" /> and <Katex tex="n=48" />.</>,
  },
  {
    working: <Katex display tex="z = 1.96 \ \text{ for } 95\%" />,
    reason: <>Using 1.645 (90%) instead gives option B; using 2.58 (99%) gives option C.</>,
  },
  {
    working: <Katex display tex="\sqrt{\frac{0.125\times0.875}{48}} = \sqrt{0.0022786\ldots} = 0.047735\ldots" />,
    reason: <>The standard error.</>,
  },
  {
    working: <Katex display tex="1.96\times0.047735\ldots = 0.093561\ldots" />,
    reason: <>The margin of error.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.0314,\ 0.2186)}" />,
    reason: <><Katex tex="0.125\mp0.09356" />. Matches option <b>A</b>.</>,
  },
]

export default function MethodsQ3_2021() {
  return (
    <MCQShell
      question={
        <p>
          A box contains many coloured glass beads.
          <br />
          A random sample of 48 beads is selected and it is found that the proportion of
          blue-coloured beads in this sample is 0.125
          <br />
          Based on this sample, a 95% confidence interval for the proportion of blue-coloured
          glass beads is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(0.0314,\ 0.2186)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="(0.0465,\ 0.2035)" /> },
        { letter: 'C', content: <Katex tex="(0.0018,\ 0.2482)" /> },
        { letter: 'D', content: <Katex tex="(0.0896,\ 0.1604)" /> },
        { letter: 'E', content: <Katex tex="(0.0264,\ 0.2136)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
