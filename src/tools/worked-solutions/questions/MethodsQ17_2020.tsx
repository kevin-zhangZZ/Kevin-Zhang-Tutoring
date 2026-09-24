// 2020 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 42% correct. Maximum
// possible y-intercept of a tangent line to f(x) = −ln(x + 2). Question text transcribed from
// the original paper (no diagram was given — f is defined purely algebraically). Solution is
// original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2020-mcq17-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 21, C: 42, D: 17, E: 9 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      <img src={reportGraphSrc} alt="The report's graph of y = −ln(x + 2) with its vertical asymptote x = −2" className="w-full max-w-[360px] my-1" />
      The maximum value of <Katex tex="c" /> occurs when the tangent to <Katex tex="f" /> is at <Katex tex="x=0" />.{' '}
      <Katex tex="c=f(0)=-\log_e(2)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = -\log_e(x+2) \;\implies\; f'(x) = -\frac{1}{x+2}" />,
    reason: <>Differentiate.</>,
  },
  {
    working: <Katex display tex="\text{Tangent at } x_0:\quad y = f(x_0) + f'(x_0)(x-x_0)" />,
    reason: <>General tangent line at a point <Katex tex="x_0" />.</>,
  },
  {
    working: <Katex display tex="c = f(x_0) - f'(x_0)\,x_0 = -\log_e(x_0+2) + \frac{x_0}{x_0+2}" />,
    reason: <>The <Katex tex="y" />-intercept: set <Katex tex="x=0" /> in the tangent line.</>,
  },
  {
    working: <Katex display tex="\text{Let } t=x_0+2>0:\quad c(t) = -\log_e(t) + 1 - \frac{2}{t}" />,
    reason: <>Substitute <Katex tex="x_0=t-2" /> to simplify.</>,
  },
  {
    working: <Katex display tex="\frac{dc}{dt} = -\frac1t + \frac{2}{t^2} = 0 \;\implies\; t=2" />,
    reason: <>Maximise <Katex tex="c" /> over <Katex tex="t" /> — set the derivative to zero.</>,
  },
  {
    working: <Katex display tex="t=2 \;\implies\; x_0 = 0" />,
    reason: <>The maximum occurs when the tangent point is exactly at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{c = f(0) = -\log_e(0+2) = -\log_e(2)}" />,
    reason: <>Matches option <b>C</b>. Option <b>A</b> (<Katex tex="-1" />) is the intercept of the tangent at <Katex tex="x=-1" />, which is smaller; option <b>E</b> has the sign of <Katex tex="f(0)" /> wrong.</>,
  },
]

export default function MethodsQ17_2020() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x) = -\log_e(x+2)" />.
          <br />
          A tangent to the graph of <Katex tex="f" /> has a vertical axis intercept at <Katex tex="(0,c)" />.
          <br />
          The maximum value of <Katex tex="c" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-1" /> },
        { letter: 'B', content: <Katex tex="-1+\log_e(2)" /> },
        { letter: 'C', content: <Katex tex="-\log_e(2)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-1-\log_e(2)" /> },
        { letter: 'E', content: <Katex tex="\log_e(2)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
