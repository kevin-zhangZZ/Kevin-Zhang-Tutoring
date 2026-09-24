// 2025 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 66% correct.
// Reading the sample size back out of a confidence interval. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
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
    reason: <>The interval is symmetric about the sample proportion, so its midpoint gives p̂.</>,
  },
  {
    working: <Katex display tex="\text{margin of error} = \frac{0.552-0.248}{2} = 0.152" />,
    reason: <>Half the width.</>,
  },
  {
    working: <Katex display tex="1.96\sqrt{\frac{0.4\times0.6}{n}} = 0.152" />,
    reason: <>For 95% confidence, <Katex tex="z=1.96" />.</>,
  },
  {
    working: <Katex display tex="\sqrt{\frac{0.24}{n}} = \frac{0.152}{1.96} = 0.07755" />,
    reason: <>Isolating the root.</>,
  },
  {
    working: <Katex display tex="\frac{0.24}{n} = 0.006014 \implies n = 39.9" />,
    reason: <>Squaring and rearranging.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 40}" />,
    reason: <>Matches option <b>C</b>. Check: <Katex tex="0.4\pm1.96\sqrt{\tfrac{0.24}{40}} = 0.4\pm0.1518" />, giving <Katex tex="(0.248,\,0.552)" /> ✓. Substituting the four options back is a perfectly fast route.</>,
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
