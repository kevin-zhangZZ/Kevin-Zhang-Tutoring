// 2020 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 42% correct. Maximum
// possible y-intercept of a tangent line to f(x) = −ln(x + 2). Question text and diagram
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 21, C: 42, D: 17, E: 9 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      The maximum value of <Katex tex="c" /> occurs when the tangent to <Katex tex="f" /> is at <Katex tex="x=0" />.{' '}
      <Katex tex="c=f(0)=-\log_e(2)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = -\log_e(x+2) \;\implies\; f'(x) = -\frac{1}{x+2}" />,
    reason: 'Differentiate.',
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
    reason: <>Matches option <b>C</b>.</>,
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
