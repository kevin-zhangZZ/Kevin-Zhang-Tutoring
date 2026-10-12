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
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's copy of the share-price chart with line segments drawn for the options: two blue segments from day 3 and a red segment from day 14 to day 28, the steepest" className="w-full max-w-[360px] mt-1" />
      <br />
      Average rate of change <Katex tex="\approx\dfrac{39.4-35.0}{28-14}=0.3143" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate of change} = \frac{\text{price}(b)-\text{price}(a)}{b-a}" />,
    reason: <>Average rate of change over <Katex tex="[a,b]" /> is the gradient of the chord joining the endpoints; the ups and downs in between don't matter.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{day }3&\approx34.8, & \text{day }17&\approx37.4 \\ \text{day }10&\approx36.4, & \text{day }21&\approx37.0 \\ \text{day }14&\approx35.0, & \text{day }28&\approx39.4 \end{aligned}" />,
    reason: <>Read the six endpoint prices off the chart: each small square is 1 day across and $0.20 up (five squares per dollar).</>,
    more: <>Every one of these points sits exactly on a grid line, so the readings are exact, not estimates — which matters, because options <b>C</b> and <b>D</b> turn out to be close.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{A: }& \frac{36.4-34.8}{10-3} = \frac{1.6}{7} \approx 0.23 \\[4pt] \text{B: }& \frac{37.4-34.8}{17-3} = \frac{2.6}{14} \approx 0.19 \end{aligned}" />,
    reason: <>Rise ÷ run, in dollars per day. B rises more than A, but over twice as many days, so it is flatter.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{C: }& \frac{37.0-35.0}{21-14} = \frac{2.0}{7} \approx 0.29 \\[4pt] \text{D: }& \frac{39.4-35.0}{28-14} = \frac{4.4}{14} \approx 0.31 \end{aligned}" />,
    reason: <>D covers twice C's days but rises more than twice as much (4.4 against 2.0), so D is steeper.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{day 14 to day 28}}" />,
    reason: <>Matches option <b>D</b>, the steepest of the four chords.</>,
    more: <>
      The report's quicker route is a ruler: lay a straight edge from the first day's point to the last day's
      point for each option and pick the steepest segment, no arithmetic needed. Option <b>C</b> (16%, the
      most common wrong answer) looks steep because the price shoots up from day 14 to about $37.60 on day 18
      — but by day 21 it has fallen back to $37.00, and only the endpoints count. Options <b>A</b> and{' '}
      <b>B</b> start from the day-3 low but climb gently.
    </>,
  },
]

export default function MethodsQ11_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>The chart below shows the daily price of a stock market share over a 30-day period.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
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
