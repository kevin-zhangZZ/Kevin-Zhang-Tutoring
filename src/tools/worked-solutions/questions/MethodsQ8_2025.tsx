// 2025 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 66% correct.
// Reading the sample size back out of a confidence interval. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 18, C: 66, D: 8 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      95% confidence interval is <Katex tex="(0.248,\ 0.552)" />, correct to three decimal places.
      <br />
      <Katex tex="\hat{p}\approx\dfrac{0.248+0.552}{2}=0.4" />
      <br />
      <Katex tex="1.96\sqrt{\dfrac{0.4\times0.6}{n}}\approx0.152,\ n\approx39.905\ldots" />
      <br />
      <Katex tex="n=40" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\hat{p} = \frac{0.248+0.552}{2} = 0.4" />,
    reason: <>The interval is <Katex tex="\hat{p}\pm\text{margin}" />, so it is symmetric about the sample proportion: <Katex tex="\hat{p}" /> is its midpoint.</>,
  },
  {
    working: <Katex display tex="\text{margin of error} = \frac{0.552-0.248}{2} = 0.152" />,
    reason: <>The margin of error is the distance from <Katex tex="\hat{p}" /> to either end: half the width, not the whole width.</>,
    more: <>Using the whole width 0.304 as the margin gives <Katex tex="n\approx10" />, option <b>A</b>.</>,
  },
  {
    working: <Katex display tex="1.96\sqrt{\frac{0.4\times0.6}{n}} = 0.152" />,
    reason: <>The margin of error is <Katex tex="z\sqrt{\tfrac{\hat{p}(1-\hat{p})}{n}}" />, with <Katex tex="z=1.96" /> for 95% confidence. Only <Katex tex="n" /> is unknown.</>,
    more: <>The 1.96 must be remembered, or found with <Cas fn="invNorm" /> as the value with 0.975 of the standard normal distribution below it (2.5% in each tail). Using 1.645, the 90% value, gives <Katex tex="n\approx28" />, option <b>B</b>, the most common wrong answer.</>,
  },
  {
    working: <Katex display tex="\sqrt{\frac{0.24}{n}} = \frac{0.152}{1.96} = 0.07755" />,
    reason: <>Divide both sides by 1.96 to isolate the square root.</>,
    more: <>On CAS, <Cas fn="solve" /> the equation in the previous line for <Katex tex="n" /> directly; the hand steps here show what it is doing.</>,
  },
  {
    working: <Katex display tex="\frac{0.24}{n} = 0.006014 \implies n = 39.9" />,
    reason: <>Square both sides, then <Katex tex="n=\tfrac{0.24}{0.006014}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 40}" />,
    reason: <>A sample size is a whole number; 39.9 isn&rsquo;t exact because the interval was rounded, so round to the nearest whole number, 40. Matches option <b>C</b>.</>,
    more: <>
      Check: <Katex tex="0.4\pm1.96\sqrt{\tfrac{0.24}{40}} = 0.4\pm0.1518" />, giving <Katex tex="(0.248,\,0.552)" /> ✓. Substituting each option back this way is a fast alternative route:{' '}
      <Katex tex="n=10" /> gives <Katex tex="(0.096,\,0.704)" />, <Katex tex="n=28" /> gives <Katex tex="(0.219,\,0.581)" /> and <Katex tex="n=49" /> gives <Katex tex="(0.263,\,0.537)" />, so only <b>C</b> reproduces the interval. No standard slip leads to 49 (it would need <Katex tex="z\approx2.17" />, a 97% interval), so only this check rules D out. A larger sample always gives a narrower interval.
    </>,
  },
]

export default function MethodsQ8_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            A random sample of <Katex tex="n" /> Victorian households is taken to estimate the
            proportion of all Victorian households that have vegetable gardens. The
            approximate 95% confidence interval calculated using this sample is{' '}
            <Katex tex="(0.248,\,0.552)" />, correct to three decimal places.
          </p>
          <p>
            The number of households, <Katex tex="n" />, in the sample is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="10" /> },
        { letter: 'B', content: <Katex tex="28" /> },
        { letter: 'C', content: <Katex tex="40" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="49" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
