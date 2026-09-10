// 2022 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 42% correct.
// Probability that two independent normal travel times differ by more than a given amount.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 42, C: 13, D: 14, E: 15 },
  answer: 'B',
  comment: (
    <>
      <Katex tex="D = T_1-T_2,\ E(D)=0,\ \mathrm{Var}(D)=1^2\mathrm{Var}(T_1)+(-1)^2\mathrm{Var}(T_2)=12.5" />
      <br />
      <Katex tex="1-\Pr(-6\leq D\leq6) = 0.0897" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="T_1,T_2 \sim N(30,2.5^2),\ \text{independent}" />,
    reason: 'Each student’s travel time.',
  },
  {
    working: <Katex display tex="D = T_1-T_2 \;\implies\; E(D)=0" />,
    reason: 'Let D be the difference in travel times.',
  },
  {
    working: <Katex display tex="\mathrm{Var}(D) = 2.5^2+2.5^2 = 12.5 \;\implies\; \mathrm{sd}(D)=\sqrt{12.5}\approx3.536" />,
    reason: 'Variances add for independent variables, even when subtracting them.',
  },
  {
    working: <Katex display tex="\Pr(|D|>6) = 1 - \Pr(-6\leq D\leq6)" />,
    reason: '"Differ by more than 6 minutes" is the complement of the difference lying within ±6.',
  },
  {
    working: <Katex display tex="\Pr(-6\leq D\leq6) \approx 0.9103" />,
    reason: <>Standardising with <Katex tex="Z=D/3.536" /> and evaluating on CAS.</>,
  },
  {
    working: <Katex display tex="\boxed{1-0.9103 = 0.0897}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ18_2022() {
  return (
    <MCQShell
      question={
        <p>
          The time taken, <Katex tex="T" /> minutes, for a student to travel to school is normally distributed with a
          mean of 30 minutes and a standard deviation of 2.5 minutes.
          <br />
          Assuming that individual travel times are independent of each other, the probability, correct to four
          decimal places, that two consecutive travel times differ by more than 6 minutes is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.0448" /> },
        { letter: 'B', content: <Katex tex="0.0897" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.1151" /> },
        { letter: 'D', content: <Katex tex="0.2301" /> },
        { letter: 'E', content: <Katex tex="0.9103" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
