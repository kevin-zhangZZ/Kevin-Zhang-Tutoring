// 2022 Specialist NHT — Exam 2, MCQ 20. The NHT report gives the answer key only, with no
// statistics. Confidence intervals: recover the standard deviation from a 90% interval's width.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\left(\bar{x}-z\frac{\sigma}{\sqrt n},\ \ \bar{x}+z\frac{\sigma}{\sqrt n}\right)\\ &= (80.4,\ 81.7)\end{aligned}" />,
    reason: <>The interval is centred on the sample mean and stretches the same distance, the margin of error <Katex tex="z\tfrac{\sigma}{\sqrt n}" />, either side of it.</>,
  },
  {
    working: <Katex display tex="z\frac{\sigma}{\sqrt n} = \frac{81.7-80.4}{2} = 0.65" />,
    reason: <>The margin of error is half the width of the interval.</>,
    more: <>The centre is <Katex tex="\bar{x}=\tfrac{80.4+81.7}{2}=81.05" /> mg, but the question doesn&rsquo;t need it.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.95) = 1.6448…</Cas>,
    reason: <>A 90% interval leaves 5% in each tail, so <Katex tex="z" /> is the point with 0.95 below it.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}1.6448\ldots\times\frac{\sigma}{\sqrt{25}} &= 0.65\\ \sigma &= \frac{0.65\times5}{1.6448\ldots} = 1.9758\ldots\end{aligned}" />,
    reason: <>Substitute <Katex tex="n=25" />, so <Katex tex="\sqrt n=5" />, and rearrange for <Katex tex="\sigma" />, keeping <Katex tex="z" /> unrounded.</>,
  },
  {
    working: <Katex display tex="\boxed{\sigma\approx1.98}" />,
    reason: <>Matches option <b>E</b>, correct to two decimal places.</>,
    more: <>Option <b>D</b>, 1.97, rounds <Katex tex="z" /> to 1.65 first: <Katex tex="\tfrac{3.25}{1.65}=1.9697" />. That small difference is exactly why <Katex tex="z" /> is kept unrounded. Option <b>C</b>, 1.66, uses the 95% value 1.96: <Katex tex="\tfrac{3.25}{1.96}=1.658" />. Option <b>B</b>, 0.65, is the margin of error itself. Option <b>A</b>, 0.40, forgets the <Katex tex="\sqrt{25}" />: <Katex tex="\tfrac{0.65}{1.6448}=0.395" />, which is the standard deviation of the sample mean, not of the biscuits.</>,
  },
]

export default function SpecialistQ20_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          A 90% confidence interval for the mean sodium content, in milligrams, of a particular type of biscuit is
          calculated to be (80.4, 81.7), based on a sample of 25 of these biscuits.
          <br />
          The standard deviation, correct to two decimal places, used in this calculation is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.40" /> },
        { letter: 'B', content: <Katex tex="0.65" /> },
        { letter: 'C', content: <Katex tex="1.66" /> },
        { letter: 'D', content: <Katex tex="1.97" /> },
        { letter: 'E', content: <Katex tex="1.98" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
