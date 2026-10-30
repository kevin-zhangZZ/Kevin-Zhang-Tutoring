// 2023 Specialist NHT — Exam 2, MCQ 19. The NHT report gives the answer key only, with no
// statistics. Statistics: an approximate 95% confidence interval for a population mean from
// n = 50, x̄ = 73, s = 8. Question text transcribed from the original paper. Solution is original;
// the answer A agrees with the report's key. scipy: 73 ± 1.96 × 8/√50 = (70.78, 75.22); dividing by
// n gives ±0.31 (D); 1.96√(8/50) = 0.784 gives C.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="n=50,\quad \bar x=73,\quad s=8" />,
    reason: <>The sample standard deviation stands in for the unknown population standard deviation <Katex tex="\sigma" />, as the question allows.</>,
  },
  {
    working: <Katex display tex="\left(\bar x-z\frac{s}{\sqrt n},\ \bar x+z\frac{s}{\sqrt n}\right),\qquad z\approx1.96" />,
    reason: <>An approximate 95% confidence interval for <Katex tex="\mu" /> reaches about 1.96 standard errors either side of the sample mean. The standard error of the sample mean is <Katex tex="\tfrac{s}{\sqrt n}" />, not <Katex tex="s" /> itself.</>,
    more: <>1.96 is the value with <Katex tex="\Pr(-1.96<Z<1.96)=0.95" />, from <Cas fn="invNorm">invNorm(0.975, 0, 1)</Cas>.</>,
  },
  {
    working: <Katex display tex="1.96\times\frac{8}{\sqrt{50}}=2.2174\ldots" />,
    reason: <>The margin of error. Sample means of 50 people vary far less than individual masses do, hence dividing by <Katex tex="\sqrt{50}\approx7.07" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&(73-2.2174,\ 73+2.2174)\\ &\quad=(70.78\ldots,\ 75.22\ldots)\end{aligned}" />,
    reason: <>Subtract the margin of error from the sample mean for the lower end and add it for the upper end, then round to one decimal place to compare with the options.</>,
  },
  {
    working: <Katex display tex="\boxed{(70.8,\ 75.2)}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Sanity check: the interval is centred on <Katex tex="\bar x=73" />, as every confidence interval for <Katex tex="\mu" /> must be. Option D, <Katex tex="(72.7,\,73.3)" />, divides by <Katex tex="n=50" /> instead of <Katex tex="\sqrt{50}" /> (margin 0.31). Option C, <Katex tex="(72.2,\,73.8)" />, takes the square root of <Katex tex="\tfrac{8}{50}" /> (margin 0.78), treating 8 as the variance.</>,
  },
]

export default function SpecialistQ19_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          A random sample of 50 passengers flying from Melbourne to Brisbane has a mean mass of 73 kg and a standard deviation
          of 8 kg.
          <br />
          Assuming that the standard deviation obtained from the sample is a sufficiently accurate estimate of the population
          standard deviation, an approximate 95% confidence interval for the mean mass of all like passengers is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(70.8,\ 75.2)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="(71.0,\ 75.0)" /> },
        { letter: 'C', content: <Katex tex="(72.2,\ 73.8)" /> },
        { letter: 'D', content: <Katex tex="(72.7,\ 73.3)" /> },
        { letter: 'E', content: <Katex tex="(72.8,\ 73.2)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
