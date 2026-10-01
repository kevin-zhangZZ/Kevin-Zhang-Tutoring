// 2021 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 65% correct.
// Reading the mean and standard deviation back out of a confidence interval. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 14, C: 65, D: 10, E: 5 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\bar x = \frac{70.2+75.8}{2} = 73" />,
    reason: <>A 95% confidence interval for the population mean is <Katex tex="\bar x \pm 1.96\frac{\sigma}{\sqrt n}" />. It is centred on the sample mean, so <Katex tex="\bar x" /> is the midpoint of the interval.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{half-width} &= \frac{75.8-70.2}{2} = 2.8\\ 1.96\times\frac{\sigma}{\sqrt{100}} &= 2.8\end{aligned}" />,
    reason: <>Each end of the interval is <Katex tex="1.96\frac{\sigma}{\sqrt n}" /> from the centre, so this margin is <em>half</em> the width. The 1.96 is the <Katex tex="z" />-value with 95% of the standard normal distribution between <Katex tex="-1.96" /> and <Katex tex="1.96" />. Here <Katex tex="n=100" />, so <Katex tex="\sqrt n = 10" />.</>,
  },
  {
    working: <Katex display tex="\sigma = \frac{2.8\times10}{1.96} = \frac{28}{1.96} = 14.2857\ldots" />,
    reason: <>Rearranging for the population standard deviation: multiply both sides by 10, then divide by 1.96.</>,
  },
  {
    working: <Katex display tex="\frac{\bar x}{\sigma} = \frac{73}{14.2857\ldots} = 5.11" />,
    reason: <>The question asks for the sample mean <em>divided by</em> the population standard deviation — an unusual combination, so read it carefully.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{\bar x}{\sigma} \approx 5.1}" />,
    reason: <>Matches option <b>C</b>. Option <b>B</b>, 2.6, comes from using the full width 5.6 as the margin <Katex tex="1.96\frac{\sigma}{10}" /> (giving 2.56), or from leaving out the 1.96 (<Katex tex="\sigma = 28" />, giving 2.61); option <b>E</b>, 13.0, divides 73 by the width of the interval, 5.6.</>,
  },
]

export default function SpecialistQ18_2021() {
  return (
    <MCQShell
      question={
        <p>
          A scientist investigates the distribution of the masses of fish in a particular
          river. A 95% confidence interval for the mean mass of a fish, in grams, calculated
          from a random sample of 100 fish is <Katex tex="(70.2,\ 75.8)" />.
          <br />
          The sample mean divided by the population standard deviation is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1.3" /> },
        { letter: 'B', content: <Katex tex="2.6" /> },
        { letter: 'C', content: <Katex tex="5.1" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="10.2" /> },
        { letter: 'E', content: <Katex tex="13.0" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
