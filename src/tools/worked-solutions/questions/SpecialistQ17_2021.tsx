// 2021 Specialist Mathematics — Exam 2, MCQ 17. VCAA examination report: 50% correct.
// The distribution of a sample mean of six. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 20, C: 13, D: 11, E: 50 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{N}\!\left(1.26,\ 0.01^2\right)" />,
    reason: <>Let <Katex tex="X" /> be the volume, in litres, of one bottle.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\bar X \sim \mathrm{N}\!\left(1.26,\ \frac{0.01^2}{6}\right)\\ \mathrm{sd}\!\left(\bar X\right) = \frac{0.01}{\sqrt6}\end{gathered}" />,
    reason: <>The question is about the <em>mean</em> volume of six bottles, <Katex tex="\bar X" />, not one bottle. The mean of a random sample of size <Katex tex="n" /> has the same mean <Katex tex="\mu" />, but its standard deviation is <Katex tex="\frac{\sigma}{\sqrt n}" />: in an average of six bottles, high and low volumes partly cancel, so the sample mean varies less than a single bottle does.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr\!\left(\bar X \ge 1.25\right) &= \Pr\!\left(Z \ge \frac{1.25-1.26}{0.01/\sqrt6}\right)\\ &= \Pr\!\left(Z \ge -\sqrt6\right)\end{aligned}" />,
    reason: <>Standardise: subtract the mean and divide by the standard deviation of <Katex tex="\bar X" />. The <Katex tex="z" />-score simplifies exactly, since <Katex tex="-0.01 \div \frac{0.01}{\sqrt6} = -\sqrt6 \approx -2.449" />.</>,
  },
  {
    working: <Katex display tex="= 0.99284\ldots" />,
    reason: <>By <Cas fn="normCdf" /> with lower 1.25, upper ∞, μ = 1.26, σ = 0.01/√6. A probability close to 1 makes sense: 1.25 L is about 2.4 standard deviations below the mean of <Katex tex="\bar X" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\!\left(\bar X \ge 1.25\right) \approx 0.9928}" />,
    reason: <>Matches option <b>E</b>. Option <b>B</b>, 0.8413, uses the standard deviation of a single bottle, 0.01, instead of <Katex tex="\frac{0.01}{\sqrt6}" /> (giving <Katex tex="\Pr(Z\ge-1)" />); option <b>A</b>, 0.5968, uses 0.1 in place of 0.01.</>,
  },
]

export default function SpecialistQ17_2021() {
  return (
    <MCQShell
      question={
        <p>
          Bottles of a particular brand of soft drink are labelled as having a volume of 1.25
          L. The machines filling the bottles deliver a volume that is normally distributed
          with a mean of 1.26 L and a standard deviation of 0.01 L.
          <br />
          The probability that six bottles have a mean volume that is at least the labelled volume of 1.25 L is
          closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.5968" /> },
        { letter: 'B', content: <Katex tex="0.8413" /> },
        { letter: 'C', content: <Katex tex="0.9750" /> },
        { letter: 'D', content: <Katex tex="0.9772" /> },
        { letter: 'E', content: <Katex tex="0.9928" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
