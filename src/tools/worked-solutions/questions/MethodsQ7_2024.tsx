// 2024 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 68% correct.
// "At least once" over n trials: solve the complement inequality. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 15, C: 68, D: 9 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{at least one six in } n \text{ rolls}) = 1-\left(\frac56\right)^n" />,
    reason: <>"At least one six" is everything except "no sixes". Each roll misses with probability <Katex tex="\tfrac56" />, so <Katex tex="n" /> misses in a row is <Katex tex="\left(\tfrac56\right)^n" />.</>,
    more: <>This is <Katex tex="\Pr(X\ge1)=1-\Pr(X=0)" /> for <Katex tex="X\sim\text{Bi}\left(n,\tfrac16\right)" />. Adding up <Katex tex="\Pr(X=1)+\Pr(X=2)+\dots" /> directly would be far longer, so whenever a question says "at least once", go to the complement.</>,
  },
  {
    working: <Katex display tex="1-\left(\frac56\right)^n > 0.95 \implies \left(\frac56\right)^n < 0.05" />,
    reason: <>Subtract 1 from both sides, then multiply by <Katex tex="-1" />, which flips the inequality.</>,
  },
  {
    working: <Katex display tex="n\log_e\!\left(\frac56\right) < \log_e(0.05)" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides to bring <Katex tex="n" /> down from the power (<Katex tex="\log_e" /> is increasing, so the sign stays).</>,
    more: <>On CAS you can skip the logs entirely: <Cas fn="solve">solve(1−(5/6)^n&gt;0.95, n)</Cas> returns <Katex tex="n>16.43" /> directly. The log working is shown so you can see why the answer is what it is.</>,
  },
  {
    working: <Katex display tex="n > \frac{\log_e(0.05)}{\log_e(5/6)} = \frac{-2.9957}{-0.18232} = 16.43" />,
    reason: <>Dividing by <Katex tex="\log_e(5/6)" />, which is <em>negative</em>, flips the inequality back.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 17}" />,
    reason: <>Matches option <b>C</b>: <Katex tex="n" /> must be a whole number above <Katex tex="16.43" />, so round <em>up</em>.</>,
    more: <>Check: <Katex tex="1-(5/6)^{16}\approx0.9459<0.95" /> but <Katex tex="1-(5/6)^{17}\approx0.9549>0.95" /> ✓. The most common wrong answer, <b>B</b> (16), rounds <Katex tex="16.43" /> to the nearest integer, but 16 rolls gives only <Katex tex="0.9459" />, short of <Katex tex="0.95" />. With a "minimum number so that the probability exceeds…" question, always round up and test the two integers either side. <b>A</b> (15, giving <Katex tex="0.9351" />) is too few; <b>D</b> (18, giving <Katex tex="0.9624" />) works but is not the minimum.</>,
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
