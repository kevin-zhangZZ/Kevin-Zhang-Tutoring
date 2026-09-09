// 2018 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 56% correct.
// P(one normal variable > an independent second normal variable), via their difference.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 56, C: 16, D: 10, E: 4 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="M \sim N(71, 10^2), \qquad S \sim N(75, 7^2), \qquad M,S \text{ independent}" />,
    reason: 'A randomly chosen Mathematics score and a randomly chosen Statistics score.',
  },
  {
    working: <Katex display tex="\Pr(M>S) = \Pr(M-S>0)" />,
    reason: <>Reduce a comparison of two variables to a single variable, <Katex tex="D=M-S" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\mathrm{E}(D) = 71-75 = -4" />
        <Katex display tex="\mathrm{Var}(D) = 10^2+7^2 = 149" />
      </>
    ),
    reason: <>For independent variables, the variance of a <em>difference</em> still <em>adds</em> — the minus sign only affects the mean.</>,
  },
  {
    working: <Katex display tex="D \sim N(-4,\,149), \qquad \mathrm{sd}(D)=\sqrt{149}\approx12.207" />,
  },
  {
    working: <Katex display tex="\Pr(D>0) = \Pr\!\left(Z > \frac{0-(-4)}{\sqrt{149}}\right) = \Pr(Z>0.3277)" />,
  },
  {
    working: <Katex display tex="\boxed{\Pr(Z>0.3277) \approx 0.3716}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ20_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The scores on the Mathematics and Statistics tests, expressed as percentages, in a particular
            year were both normally distributed. The mean and the standard deviation of the Mathematics
            test scores were 71 and 10 respectively, while the mean and the standard deviation of the
            Statistics test scores were 75 and 7 respectively.
          </p>
          <p>
            Assuming the sets of test scores were independent of each other, the probability, correct to four
            decimal places, that a randomly chosen Mathematics score is higher than a randomly chosen
            Statistics score is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.2877" /> },
        { letter: 'B', content: <Katex tex="0.3716" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.4070" /> },
        { letter: 'D', content: <Katex tex="0.7123" /> },
        { letter: 'E', content: <Katex tex="0.9088" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
