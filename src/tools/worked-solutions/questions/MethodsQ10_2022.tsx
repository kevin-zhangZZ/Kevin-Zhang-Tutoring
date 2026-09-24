// 2022 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 78% correct.
// A 95% confidence interval quoted as a percentage. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 6, C: 10, D: 78, E: 4 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p = 0.55, \quad n = 1000" />,
    reason: <>Work in proportions first, then convert at the end.</>,
  },
  {
    working: <Katex display tex="\sqrt{\frac{0.55\times0.45}{1000}} = 0.015732\ldots" />,
    reason: <>The standard error.</>,
  },
  {
    working: <Katex display tex="0.55 \pm 1.96\times0.015732 = 0.55\pm0.030835" />,
    reason: <>The 1.96 for 95%. Using 1.645 (90%) gives option C; using 2.576 (99%) gives option B.</>,
  },
  {
    working: <Katex display tex="(0.51917,\ 0.58084) \to \boxed{(51.9,\ 58.1)}" />,
    reason: <>Multiply by 100, because the question asks for a <em>percentage</em>. Matches option <b>D</b>.</>,
  },
]

export default function MethodsQ10_2022() {
  return (
    <MCQShell
      question={
        <p>
          An organisation randomly surveyed 1000 Australian adults and found that 55% of
          those surveyed were happy with their level of physical activity.
          <br />
          An approximate
          95% confidence interval for the percentage of Australian adults who were happy
          with their level of physical activity is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(4.1,\ 6.9)" /> },
        { letter: 'B', content: <Katex tex="(50.9,\ 59.1)" /> },
        { letter: 'C', content: <Katex tex="(52.4,\ 57.6)" /> },
        { letter: 'D', content: <Katex tex="(51.9,\ 58.1)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="(45.2,\ 64.8)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
