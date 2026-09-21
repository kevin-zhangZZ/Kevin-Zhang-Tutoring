// 2019 Specialist Mathematics — Exam 2, MCQ 18. VCAA examination report: 76% correct. A 98%
// confidence interval for a population mean from a sample mean and known population standard
// deviation. Question text transcribed from the original paper (no diagram).
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 9, C: 8, D: 76, E: 4 },
  noAnswer: 1,
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{CI} = \left(\overline{x}-z\dfrac{\sigma}{\sqrt n},\ \ \overline{x}+z\dfrac{\sigma}{\sqrt n}\right)" />,
    reason: <>Confidence interval for a mean when the population standard deviation is known. Here <Katex tex="\overline{x}=65" />, <Katex tex="\sigma=4" />, <Katex tex="n=36" />.</>,
  },
  {
    working: <Katex display tex="98\% \text{ confidence} \implies 1\% \text{ in each tail} \implies z = \operatorname{invNorm}(0.99) \approx 2.3263" />,
    reason: <>The middle <Katex tex="98\%" /> leaves <Katex tex="2\%" /> split between the two tails, so the <Katex tex="z" /> value is the one with <Katex tex="99\%" /> below it — not <Katex tex="98\%" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{\sigma}{\sqrt n} = \dfrac{4}{\sqrt{36}} = \dfrac{4}{6} \approx 0.6667" />,
    reason: <>The standard deviation of the <em>sample mean</em>, not of individual athletes — dividing by <Katex tex="\sqrt n" /> is what makes the interval narrow.</>,
  },
  {
    working: <Katex display tex="\text{margin of error} = 2.3263\times0.6667 \approx 1.5509" />,
  },
  {
    working: <Katex display tex="\text{CI} \approx (65-1.551,\ 65+1.551) = (63.449,\ 66.551)" />,
  },
  {
    working: <Katex display tex="\boxed{(63.4,\ 66.6)}" />,
    reason: <>Matches option <b>D</b>. Option <b>B</b> uses <Katex tex="z\approx1.96" /> (a 95% interval) and option <b>A</b> forgets to divide by <Katex tex="\sqrt n" /> — both classic slips.</>,
  },
]

export default function SpecialistQ18_2019() {
  return (
    <MCQShell
      question={
        <p>
          The masses of a random sample of <Katex tex="36" /> track athletes have a mean of{' '}
          <Katex tex="65" /> kg. The standard deviation of the masses of all track athletes is
          known to be <Katex tex="4" /> kg. A <Katex tex="98\%" /> confidence interval for the
          mean of the masses of all track athletes, correct to one decimal place, would be
          closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(51.0,\ 79.0)" /> },
        { letter: 'B', content: <Katex tex="(63.6,\ 66.4)" /> },
        { letter: 'C', content: <Katex tex="(63.3,\ 66.7)" /> },
        { letter: 'D', content: <Katex tex="(63.4,\ 66.6)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="(64.3,\ 65.7)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
