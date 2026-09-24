// 2025 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 75% correct.
// The steepest chord on a price chart. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2025-mcq11-report-graph.png'
import chartSrc from './meth-2025-mcq11-chart.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 4, C: 16, D: 75 },
  answer: 'D',
  comment: (
    <>
      Use a ruler to draw line segments for each option. Then, select the line segment with the
      steepest gradient. Day 14 to day 28 has the greatest average rate of change.
      <img src={reportGraphSrc} alt="The report's copy of the share-price chart with line segments drawn for the options: two blue segments from day 3 and a red segment from day 14 to day 28, the steepest" className="w-full max-w-[360px] mt-1" />
      <br />
      Average rate of change <Katex tex="\approx\dfrac{39.4-35.0}{28-14}=0.3143" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate of change} = \frac{\text{price}(b)-\text{price}(a)}{b-a}" />,
    reason: <>The gradient of the chord joining the two endpoints — the interior wiggles are irrelevant.</>,
  },
  {
    working: <Katex display tex="\text{day }3\approx34.8, \quad \text{day }10\approx36.4, \quad \text{day }14\approx35.0" />,
    reason: <>Reading the four required values off the chart.</>,
  },
  {
    working: <Katex display tex="\text{day }17\approx37.4, \quad \text{day }21\approx37.0, \quad \text{day }28\approx39.4" />,
    reason: <>And the other three.</>,
  },
  {
    working: <Katex display tex="\text{A: } \frac{36.4-34.8}{7} \approx 0.23; \qquad \text{B: } \frac{37.4-34.8}{14} \approx 0.19" />,
    reason: <>Option <b>B</b> covers a longer interval for barely more rise, so it is flatter.</>,
  },
  {
    working: <Katex display tex="\text{C: } \frac{37.0-35.0}{7} \approx 0.29; \qquad \text{D: } \frac{39.4-35.0}{14} \approx 0.31" />,
    reason: <>Both start from the low point at day 14, but D captures the whole climb.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{day 14 to day 28}}" />,
    reason: <>Matches option <b>D</b>. The quickest route is a ruler: laying a straight edge across each pair of days makes the steepest one obvious without any arithmetic.</>,
  },
]

export default function MethodsQ11_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>The chart below shows the daily price of a stock market share over a 30-day period.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img
              src={chartSrc}
              alt="A share-price chart over 30 days, dipping to about $34.80 near day 3 and about $35.00 near day 14, then climbing unevenly to about $39.60 near day 29 — from the original 2025 VCAA exam paper"
              className="w-full max-w-[520px]"
            />
          </div>
          <p>
            Over which of the following time intervals did the daily price undergo the
            greatest average rate of change?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <>day 3 to day 10</> },
        { letter: 'B', content: <>day 3 to day 17</> },
        { letter: 'C', content: <>day 14 to day 21</> },
        { letter: 'D', content: <>day 14 to day 28</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
