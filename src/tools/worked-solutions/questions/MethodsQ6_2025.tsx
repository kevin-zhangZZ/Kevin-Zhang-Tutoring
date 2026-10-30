// 2025 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 50% correct.
// The trapezium rule overestimates when the curve is concave up. Question text transcribed from the original paper.
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
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's graph of y = x³ + 1 on [0, 1] with the two trapeziums shaded, their top edges lying above the curve" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\text{top of each trapezium}\\ &\text{= a chord of the curve}\end{aligned}" />,
    reason: <>A chord is the straight segment joining two points of the curve. The estimate is too big when each chord lies above the curve, which happens when the curve is concave up.</>,
    more: <>Picture a curve that bends upwards, like <Katex tex="y=x^2" />: a chord sits above the curve between its two ends, so the trapezium includes extra area. For a curve bending downwards the chord sits below, and the trapezium misses some area. Here the two chords join the points at <Katex tex="x=0" />, <Katex tex="\tfrac12" /> and <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="f''(x) \gt 0 \text{ for } 0 \lt x \lt 1 \implies \text{overestimate}" />,
    reason: <>Concave up means <Katex tex="f''(x)\gt0" />, so find <Katex tex="f''" /> for each option.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A: } f'' &= -e^x < 0\\ \text{C: } f'' &= -3\sin(x) \le 0\end{aligned}" />,
    reason: <>Both concave down on <Katex tex="[0,1]" />, so both underestimate. (For <b>C</b>, <Katex tex="\sin(x)\ge0" /> on <Katex tex="[0,1]" /> because <Katex tex="1\lt\pi" />.)</>,
  },
  {
    working: <Katex display tex="\text{D: } f' = \frac{1}{x+3},\quad f'' = \frac{-1}{(x+3)^2} < 0" />,
    reason: <>Concave down wherever it is defined, so this one underestimates too.</>,
  },
  {
    working: <Katex display tex="\text{B: } f'' = 6x \gt 0 \ \text{ for } 0 \lt x \lt 1" />,
    reason: <>Concave up throughout. (<Katex tex="f''=0" /> only at the endpoint <Katex tex="x=0" />, which does not spoil it.)</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = x^3+1}" />,
    reason: <>Matches option <b>B</b>: the only function concave up on <Katex tex="[0,1]" />.</>,
    more: <>
      A numerical check with two trapeziums of width <Katex tex="\tfrac12" />: for <b>B</b> the estimate is{' '}
      <Katex tex="\tfrac14\left(f(0)+2f\left(\tfrac12\right)+f(1)\right)=\tfrac14\left(1+\tfrac94+2\right)=1.3125" />, larger than the exact{' '}
      <Katex tex="\int_0^1\left(x^3+1\right)dx=1.25" />. For <b>A</b> (18%), <b>C</b> (19%) and <b>D</b> (11%) the estimates come out
      below the exact areas (<Katex tex="1.246" /> vs <Katex tex="1.282" />, <Katex tex="2.350" /> vs <Katex tex="2.379" />,{' '}
      <Katex tex="1.2476" /> vs <Katex tex="1.2493" />). <b>C</b>, the most common wrong answer, is increasing on <Katex tex="[0,1]" /> like <b>B</b>, but it bends downwards: increasing is not the test. Nor is the size of the function, only which way it bends.
    </>,
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
