// 2021 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 43% correct.
// Probability that two independent normal times differ by less than a given amount. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 18, C: 43, D: 15, E: 14 },
  answer: 'C',
  comment: <Katex tex="\Pr\big(|T_1-T_2|<3\big) = \Pr\big(-3<T_1-T_2<3\big)" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="T_1,T_2 \sim N(30,5^2),\ \text{independent}" />,
    reason: 'Each machine’s coffee time.',
  },
  {
    working: <Katex display tex="D = T_1-T_2" />,
    reason: 'Let D be the difference in times.',
  },
  {
    working: <Katex display tex="E(D) = E(T_1)-E(T_2) = 30-30 = 0" />,
    reason: 'Mean of a difference.',
  },
  {
    working: <Katex display tex="\mathrm{Var}(D) = \mathrm{Var}(T_1)+\mathrm{Var}(T_2) = 25+25 = 50" />,
    reason: <>Variances <i>add</i> for independent variables, even when subtracting them (the <Katex tex="-1" /> coefficient gets squared).</>,
  },
  {
    working: <Katex display tex="D \sim N(0,\ 50) \;\implies\; \mathrm{sd}(D) = \sqrt{50} = 5\sqrt2" />,
    reason: 'Distribution of the difference.',
  },
  {
    working: <Katex display tex="\Pr(|D|<3) = \Pr(-3<D<3)" />,
    reason: '"Differ by less than 3 seconds" means the difference lies strictly between −3 and 3.',
  },
  {
    working: <Katex display tex="\boxed{\Pr(-3<D<3) \approx 0.329}" />,
    reason: <>Standardising with <Katex tex="Z=D/(5\sqrt2)" /> and evaluating on CAS — matches option <b>C</b>.</>,
  },
]

export default function SpecialistQ20_2021() {
  return (
    <MCQShell
      question={
        <p>
          An office has two coffee machines that operate independently of each other. The time taken for each
          machine to produce a cup of coffee is normally distributed with a mean of 30 seconds and a standard
          deviation of 5 seconds. On a particular morning, a cup of coffee is produced from each machine.
          <br />
          The probability that the time taken by each coffee machine to produce one cup of coffee will differ
          by less than 3 seconds is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.164" /> },
        { letter: 'B', content: <Katex tex="0.236" /> },
        { letter: 'C', content: <Katex tex="0.329" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.451" /> },
        { letter: 'E', content: <Katex tex="0.671" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
