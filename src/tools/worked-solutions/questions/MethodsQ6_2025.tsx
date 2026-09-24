// 2025 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 50% correct.
// The trapezium rule overestimates exactly when the curve is concave up. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2025-mcq6-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 50, C: 19, D: 11 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      The graph of <Katex tex="f(x)=x^3+1" /> is shown below with two trapeziums. The area of the
      trapeziums is larger than the exact area, <Katex tex="\displaystyle\int_0^1 f(x)\,dx" />.
      <img src={reportGraphSrc} alt="The report's graph of y = x³ + 1 on [0, 1] with the two trapeziums shaded, their top edges lying above the curve" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{each trapezium replaces the curve by the chord joining its endpoints}" />,
    reason: <>So the estimate is too big exactly when the chord lies above the curve — that is, when the curve is concave up.</>,
  },
  {
    working: <Katex display tex="\text{overestimate} \iff f''(x) \ge 0 \ \text{ on } [0,1]" />,
    reason: <>Concave up. Sketching the two trapezia is an equally good way to see it.</>,
  },
  {
    working: <Katex display tex="\text{A: } f'' = -e^x < 0; \qquad \text{C: } f'' = -3\sin(x) \le 0 \text{ on } [0,1]" />,
    reason: <>Both concave down, so both underestimate.</>,
  },
  {
    working: <Katex display tex="\text{D: } f'' = \frac{-1}{(x+3)^2} < 0" />,
    reason: <>Every logarithm is concave down, so this one underestimates too.</>,
  },
  {
    working: <Katex display tex="\text{B: } f = x^3+1 \implies f'' = 6x \ge 0 \ \text{ on } [0,1]" />,
    reason: <>Concave up throughout. (It is zero only at the single point <Katex tex="x=0" />, which does not spoil it.)</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = x^3+1}" />,
    reason: <>Matches option <b>B</b>. Checking numerically: the trapezium estimate is <Katex tex="1.3125" /> against an exact <Katex tex="1.25" /> ✓.</>,
  },
]

export default function MethodsQ6_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            The trapezium rule is used, with two trapeziums, to estimate the area bounded by
            the graph of <Katex tex="y=f(x)" />, the <Katex tex="x" />-axis and the lines{' '}
            <Katex tex="x=0" /> and <Katex tex="x=1" />.
          </p>
          <p>
            For which function will the trapezium rule estimate be <b>larger</b> than the
            exact area?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=3-e^x" /> },
        { letter: 'B', content: <Katex tex="f(x)=x^3+1" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="f(x)=3\sin(x)+1" /> },
        { letter: 'D', content: <Katex tex="f(x)=\log_e(x+3)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
