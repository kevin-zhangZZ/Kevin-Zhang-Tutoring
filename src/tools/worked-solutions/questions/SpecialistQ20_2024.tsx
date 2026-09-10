// 2024 Specialist Mathematics — Exam 2, MCQ 20. VCAA examination report: 48% correct. This
// year's paper used four options (A–D) rather than five. Probability that the total edible
// flesh from four avocados exceeds a given mass, after a linear transformation of a normal
// variable. Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 48, C: 25, D: 17 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="M \sim N(200,\ 7.5^2)" />,
    reason: 'Mass of one avocado.',
  },
  {
    working: <Katex display tex="F = 0.70M \;\implies\; F\sim N\big(0.70(200),\ 0.70^2(7.5^2)\big) = N(140,\ 27.5625)" />,
    reason: <>Linear transformation of a normal variable: mean scales by <Katex tex="0.70" />, variance by <Katex tex="0.70^2" />.</>,
  },
  {
    working: <Katex display tex="S = F_1+F_2+F_3+F_4" />,
    reason: 'Total edible flesh from four independently selected avocados.',
  },
  {
    working: <Katex display tex="S \sim N\big(4(140),\ 4(27.5625)\big) = N(560,\ 110.25)" />,
    reason: 'Means and variances add across independent, identically distributed sums.',
  },
  {
    working: <Katex display tex="\mathrm{sd}(S) = \sqrt{110.25} = 10.5" />,
    reason: 'Standard deviation of the total.',
  },
  {
    working: <Katex display tex="\Pr(S>570) = \Pr\!\left(Z>\frac{570-560}{10.5}\right) = \Pr(Z>0.952)" />,
    reason: 'Standardise.',
  },
  {
    working: <Katex display tex="\boxed{\Pr(S>570) \approx 0.1705}" />,
    reason: <>Evaluate on CAS — matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ20_2024() {
  return (
    <MCQShell
      question={
        <p>
          The masses of avocados in a crop may be assumed to be normally distributed, with a mean of 200 grams
          and a standard deviation of 7.5 grams.
          <br />
          After an avocado of mass <Katex tex="M" /> grams is peeled and the stone is removed, the mass of edible
          flesh <Katex tex="F" /> grams is given by <Katex tex="F=0.70M" />. Four avocados are randomly selected
          from the crop.
          <br />
          What is the probability, correct to four decimal places, that a total of more than 570 grams of edible
          flesh is obtained?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.0868" /> },
        { letter: 'B', content: <Katex tex="0.1705" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.2128" /> },
        { letter: 'D', content: <Katex tex="0.3170" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
