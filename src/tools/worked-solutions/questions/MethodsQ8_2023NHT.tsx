// 2023 Mathematical Methods NHT — Exam 2, MCQ 8. The NHT report gives the answer key only, with
// no statistics. Probability: an inverse normal cut-off (the 25th percentile of apple weights).
// Question text transcribed from the original paper. Solution is original; the answer A agrees
// with the report's key. scipy: invNorm(0.25, 182, 10) = 175.255…, invNorm(0.75, 182, 10) = 188.745….

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="W\sim\text{N}(182,10^2)" />,
    reason: <>Let <Katex tex="W" /> be the weight of an apple in grams: mean 182, standard deviation 10.</>,
  },
  {
    working: <Katex display tex="\Pr(W<a)=0.25" />,
    reason: <>The 25% that are <b>not</b> heavy enough are the lightest apples, so the minimum weight <Katex tex="a" /> is the cut-off with 25% of the distribution below it.</>,
    more: <>Sketch the bell curve and shade the left tail with area 0.25: the cut-off must be <b>below</b> the mean of 182, because less than half of the apples fall short. That alone rules out options C, D and E.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.25, 182, 10) = 175.255…</Cas>,
    reason: <><Cas fn="invNorm" /> takes the area to the <b>left</b> of the cut-off, then the mean and standard deviation.</>,
    more: <>By hand with the standard normal: <Katex tex="\Pr(Z<z)=0.25" /> gives <Katex tex="z\approx-0.6745" />, so <Katex tex="a=182+(-0.6745)(10)\approx175.26" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a\approx175\text{ g}}" />,
    reason: <>Matches option <b>A</b>, rounded to the nearest integer as asked.</>,
    more: <>Option <b>D</b>, 189, is <Katex tex="\text{invNorm}(0.75,182,10)=188.74\ldots" />: the cut-off for the heaviest 25%, as if the 25% were the apples that <b>are</b> sold. Check: 175 is about two-thirds of a standard deviation below the mean, and a quarter of a normal distribution lies more than <Katex tex="0.67" /> standard deviations below its mean ✓.</>,
  },
]

export default function MethodsQ8_2023NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            The weights of apples that have been picked from an orchard are normally distributed with a mean of 182 grams and a standard deviation of 10 grams. 25% of the apples are not heavy enough to be sold to a supermarket.
          </p>
          <p>
            What is the minimum weight required, in grams, for an apple to be sold to a supermarket, rounded to the nearest integer?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="175" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="177" /> },
        { letter: 'C', content: <Katex tex="187" /> },
        { letter: 'D', content: <Katex tex="189" /> },
        { letter: 'E', content: <Katex tex="190" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
