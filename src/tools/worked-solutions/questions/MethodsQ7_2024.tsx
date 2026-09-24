// 2024 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 68% correct.
// "At least once" over n trials: solve the complement inequality. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 15, C: 68, D: 9 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{at least one six in } n \text{ rolls}) = 1-\left(\frac56\right)^n" />,
    reason: <>The complement of "no sixes at all", which is the only tractable route.</>,
  },
  {
    working: <Katex display tex="1-\left(\frac56\right)^n > 0.95 \implies \left(\frac56\right)^n < 0.05" />,
    reason: <>Rearranging. Note the inequality flips direction.</>,
  },
  {
    working: <Katex display tex="n\log_e\!\left(\frac56\right) < \log_e(0.05)" />,
    reason: <>Taking logs of both sides.</>,
  },
  {
    working: <Katex display tex="n > \frac{\log_e(0.05)}{\log_e(5/6)} = \frac{-2.9957}{-0.18232} = 16.43" />,
    reason: <>Dividing by <Katex tex="\log_e(5/6)" />, which is <em>negative</em>, flips the inequality back.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 17}" />,
    reason: <>Matches option <b>C</b>: the smallest integer above <Katex tex="16.43" />. Check: <Katex tex="1-(5/6)^{16}=0.9457<0.95" /> but <Katex tex="1-(5/6)^{17}=0.9548>0.95" /> ✓.</>,
  },
]

export default function MethodsQ7_2024() {
  return (
    <MCQShell
      question={
        <p>
          A fair six-sided die is repeatedly rolled. What is the minimum number of rolls
          required so that the probability of rolling a six at least once is greater than
          0.95?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="15" /> },
        { letter: 'B', content: <Katex tex="16" /> },
        { letter: 'C', content: <Katex tex="17" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="18" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
