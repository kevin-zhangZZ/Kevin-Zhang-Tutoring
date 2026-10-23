// 2023 Mathematical Methods NHT — Exam 2, MCQ 3. The NHT report gives the answer key only, with
// no statistics, plus a one-line comment and a graph for this question. Functions: where a square
// root of a quadratic is strictly decreasing. Question text transcribed from the original paper.
// The report's graph is taken from the report's own .docx (embedded image), shown in its comment.
// Solution is original; the answer D agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2023nht-mcq3-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      The maximal domain the function <Katex tex="f" />, with rule <Katex tex="f(x)=\sqrt{3-2x-x^2}" />, is strictly decreasing is <Katex tex="[-1,1]" />.
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's graph of y = f(x): an arch rising from (−3, 0) to a maximum of 2 at x = −1 and falling to (1, 0)" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&3-2x-x^2=-(x+3)(x-1)\geq0\\&\implies x\in[-3,1]\end{aligned}" />,
    reason: <>First find where <Katex tex="f" /> exists: the expression under the square root can&apos;t be negative. The quadratic opens downwards with zeros <Katex tex="-3" /> and <Katex tex="1" />, so it is non-negative between them.</>,
  },
  {
    working: <Katex display tex="3-2x-x^2=4-(x+1)^2" />,
    reason: <>Complete the square: the quadratic has its maximum, <Katex tex="4" />, at <Katex tex="x=-1" />. It increases up to <Katex tex="x=-1" /> and decreases after it.</>,
    more: <>Since <Katex tex="\sqrt{\ }" /> is an increasing function, <Katex tex="\sqrt{u}" /> rises and falls exactly when <Katex tex="u" /> does. So <Katex tex="f" /> peaks at <Katex tex="f(-1)=\sqrt4=2" />. In fact <Katex tex="y=\sqrt{4-(x+1)^2}" /> is the top half of the circle with centre <Katex tex="(-1,0)" /> and radius 2.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f'(x)&=\frac{-2-2x}{2\sqrt{3-2x-x^2}}\\&=\frac{-(x+1)}{\sqrt{3-2x-x^2}}<0\ \text{ for } -1<x<1\end{aligned}" />,
    reason: <>The chain rule confirms it: the denominator is positive inside the domain, so <Katex tex="f'(x)" /> has the sign of <Katex tex="-(x+1)" />, negative for <Katex tex="x>-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{[-1,1]}" />,
    reason: <>Matches option <b>D</b>. The endpoints are included: <Katex tex="f" /> is defined there, and every <Katex tex="x_1<x_2" /> in <Katex tex="[-1,1]" /> gives <Katex tex="f(x_1)>f(x_2)" />.</>,
    more: <>Strictly decreasing is defined by that inequality, not by <Katex tex="f'(x)<0" />, so a point where <Katex tex="f'=0" /> (at <Katex tex="x=-1" />) or where <Katex tex="f'" /> is undefined (the vertical tangent at <Katex tex="x=1" />) can still belong to the interval. That rules out option <b>B</b>, <Katex tex="(-1,1)" />, as the largest such domain. Options <b>C</b> and <b>E</b> are the whole maximal domain (open and closed), but <Katex tex="f" /> rises from <Katex tex="0" /> to <Katex tex="2" /> on <Katex tex="[-3,-1]" />. Option <b>A</b> includes values outside the domain, such as <Katex tex="x=2" />, where <Katex tex="3-2x-x^2=-5" />.</>,
  },
]

export default function MethodsQ3_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="f(x)=\sqrt{3-2x-x^2}" /> is strictly decreasing over the domain
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="(-3,3)" /> },
        { letter: 'B', content: <Katex tex="(-1,1)" /> },
        { letter: 'C', content: <Katex tex="(-3,1)" /> },
        { letter: 'D', content: <Katex tex="[-1,1]" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="[-3,1]" /> },
      ]}
      rows={ROWS}
      background={
        <Background title="Strictly Decreasing and Endpoints">
          <p>
            A function is strictly decreasing on an interval if, for any two points in it, the one further
            right has the smaller value: <Katex tex="x_1<x_2\implies f(x_1)>f(x_2)" />. VCAA includes an
            endpoint whenever the function is defined there and the inequality still holds, even if the
            gradient there is zero or undefined.
          </p>
        </Background>
      }
      examinerReport={EXAMINER}
    />
  )
}
