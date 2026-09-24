// 2021 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 80% correct.
// An average rate of change over twelve months. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 80, C: 9, D: 5, E: 2 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate of change} = \frac{f(12)-f(0)}{12-0}" />,
    reason: <>A gradient between two points, not a derivative — <Katex tex="f" /> is only defined on the integers anyway.</>,
  },
  {
    working: <Katex display tex="f(0) = 2500, \quad f(12) = 2500(1.004)^{12} = 2622.67\ldots" />,
    reason: <><Katex tex="1.004^{12}=1.04907\ldots" />.</>,
  },
  {
    working: <Katex display tex="\frac{2622.676\ldots-2500}{12} = \frac{122.676\ldots}{12}" />,
    reason: <>The 122.68 is the total growth over the year; the average rate divides it by the 12 months.</>,
  },
  {
    working: <Katex display tex="\boxed{\$10.22 \approx \$10.20 \text{ per month}}" />,
    reason: <>Matches option <b>B</b>. Option A, <Katex tex="\$10.00" />, is <Katex tex="0.004\times2500" /> — the growth in the <em>first</em> month only.</>,
  },
]

export default function MethodsQ13_2021() {
  return (
    <MCQShell
      question={
        <>
          <p>
            The value of an investment, in dollars, after <Katex tex="n" /> months can be
            modelled by the function
          </p>
          <Katex display tex="f(n)=2500\times(1.004)^n" />
          <p>
            where <Katex tex="n\in\{0,1,2,\ldots\}" />.
            <br />
            The average rate of change of the value of the investment over the first 12 months
            is closest to
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <>$10.00 per month.</> },
        { letter: 'B', content: <>$10.20 per month.</>, isAnswer: true },
        { letter: 'C', content: <>$10.50 per month.</> },
        { letter: 'D', content: <>$125.00 per month.</> },
        { letter: 'E', content: <>$127.00 per month.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
