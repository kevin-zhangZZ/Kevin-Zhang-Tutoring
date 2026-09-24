// 2021 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 39% correct. The
// maximum number of solutions of f(x−k) = g(x) as the translation k varies, where f is a
// cubic and g is a single-humped curve. Question text transcribed from the original paper;
// the graph in the report comment is cropped from the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2021-mcq18-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 23, C: 22, D: 39, E: 6 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="f(x)=(2x-1)(2x+1)(3x-1)" /> and
      <br />
      <Katex tex="g(x)=x\log_e(-x)" />
      <br />
      <Katex tex="f(x-k)=g(x)" /> will have a maximum of three solutions if the graph of{' '}
      <Katex tex="f" /> is translated to the left. The graph below shows three points of
      intersection for <Katex tex="k=-1" />.
      <img src={reportGraphSrc} alt="The report's graph: y = (2(x + 1) + 1)(2(x + 1) − 1)(3(x + 1) − 1) and y = x × ln(−x) for −5 ≤ x ≤ 0, crossing at three points" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = (2x-1)(2x+1)(3x-1) = 12x^3-4x^2-3x+1" />,
    reason: <>A positive cubic with <Katex tex="x" />-intercepts <Katex tex="-\tfrac12" />, <Katex tex="\tfrac13" /> and <Katex tex="\tfrac12" />: it rises to a local maximum, falls to a local minimum, then rises again.</>,
  },
  {
    working: <Katex display tex="g(x) = x\log_e(-x),\ x<0: \quad g'(x) = \log_e(-x)+1 = 0 \implies x = -\tfrac1e" />,
    reason: <>A single hump: <Katex tex="g" /> rises to its maximum <Katex tex="\tfrac1e" /> at <Katex tex="x=-\tfrac1e" />, then falls to 0 as <Katex tex="x\to0^-" />. As <Katex tex="x\to-\infty" />, <Katex tex="g(x)\to-\infty" />.</>,
  },
  {
    working: <>The solutions of <Katex tex="f(x-k)=g(x)" /> are the intersections of <Katex tex="y=g(x)" /> with the cubic translated <Katex tex="k" /> units horizontally.</>,
    reason: <>The cubic's rise–fall–rise can weave through <Katex tex="g" />'s curve, so more than one crossing is possible.</>,
  },
  {
    working: <Katex display tex="k=-1: \ f(x+1) = g(x) \text{ at } x \approx -1.561,\ -0.758,\ -0.397" />,
    reason: <>Translating the cubic 1 unit left gives three intersections, the three points on the report's graph. So three is attainable.</>,
  },
  {
    working: <Katex display tex="h(x) = f(x-k)-g(x) \implies h'''(x) = 72+\frac{1}{x^2} > 0" />,
    reason: <>Why never four: <Katex tex="f'''(x)=72" /> and <Katex tex="g'''(x)=-\tfrac{1}{x^2}" />. So <Katex tex="h''" /> is strictly increasing and is zero at most once. Between any two zeros of a smooth function its derivative is zero somewhere, so <Katex tex="h'" /> has at most two zeros and <Katex tex="h" /> at most three.</>,
  },
  {
    working: <Katex display tex="\boxed{3}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function MethodsQ18_2021() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=(2x-1)(2x+1)(3x-1)" /> and{' '}
          <Katex tex="g:(-\infty,0)\to R" />, <Katex tex="g(x)=x\log_e(-x)" />.
          <br />
          The maximum number of solutions for the equation <Katex tex="f(x-k)=g(x)" />, where{' '}
          <Katex tex="k\in R" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
