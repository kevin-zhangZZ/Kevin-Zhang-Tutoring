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
    reason: 'The sample mean sits exactly at the centre of a symmetric confidence interval.',
  },
  {
    working: <Katex display tex="\text{half-width} = \frac{75.8-70.2}{2} = 2.8 = 1.96\times\frac{\sigma}{\sqrt{100}}" />,
    reason: <>A 95% interval uses <Katex tex="z=1.96" />, and <Katex tex="\sqrt{100}=10" />.</>,
  },
  {
    working: <Katex display tex="\sigma = \frac{2.8\times10}{1.96} = \frac{28}{1.96} = 14.2857\ldots" />,
    reason: 'Rearranging for the population standard deviation.',
  },
  {
    working: <Katex display tex="\frac{\bar x}{\sigma} = \frac{73}{14.2857\ldots}" />,
    reason: <>The question asks for the sample mean <em>divided by</em> the population standard deviation — an unusual combination, so read it carefully.</>,
  },
  {
    working: <Katex display tex="\boxed{5.1}" />,
    reason: <>Matches option <b>C</b>. Option D, 10.2, is <Katex tex="\tfrac{73}{\sigma/\sqrt{n}}\div\sqrt{n}" />-flavoured confusion between <Katex tex="\sigma" /> and the standard error.</>,
  },
]

export default function SpecialistQ18_2021() {
  return (
    <MCQShell
      question={
        <p>
          A scientist investigates the distribution of the masses of fish in a particular
          river. A 95% confidence interval for the mean mass of a fish, in grams, calculated
          from a random sample of 100 fish is <Katex tex="(70.2,\ 75.8)" />. The sample mean
          divided by the population standard deviation is closest to
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
