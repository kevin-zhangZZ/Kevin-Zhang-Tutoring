// 2023 Specialist NHT — Exam 2, MCQ 2. The NHT report gives the answer key only, with no
// statistics. Functions: reading a and b in arcsin(ax + b) from the graph's endpoints — the inner
// linear function must map the graph's domain [−1, 3] onto [−1, 1]. Question text transcribed from
// the original paper; the graph is the actual VCAA figure, cropped from the official exam PDF at
// 300 dpi. Solution is original; the answer C agrees with the report's key (sympy solves the two
// endpoint equations to a = −1/2, b = 1/2).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2023nht-mcq2-graph.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async"
      src={graphSrc}
      alt="VCAA's graph of y = f(g(x)): a decreasing arcsine-shaped curve from (−1, π/2) through (1, 0) to (3, −π/2)"
      className="w-full max-w-[340px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(g(x))=\arcsin(ax+b)" />,
    reason: <>The graph is an arcsine curve, so read off where its input <Katex tex="ax+b" /> must equal <Katex tex="1" />, <Katex tex="0" /> and <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=-1:&\ \ \arcsin(\,\cdot\,)=\tfrac{\pi}{2} \implies -a+b=1\\ x=3:&\ \ \arcsin(\,\cdot\,)=-\tfrac{\pi}{2} \implies 3a+b=-1\end{aligned}" />,
    reason: <><Katex tex="\arcsin(1)=\tfrac{\pi}{2}" /> and <Katex tex="\arcsin(-1)=-\tfrac{\pi}{2}" />. The graph starts at <Katex tex="\left(-1,\tfrac{\pi}{2}\right)" /> and ends at <Katex tex="\left(3,-\tfrac{\pi}{2}\right)" />.</>,
  },
  {
    working: <Katex display tex="4a=-2 \implies a=-\tfrac12,\quad b=1+a=\tfrac12" />,
    reason: <>Subtract the first equation from the second.</>,
  },
  {
    working: <Katex display tex="x=1:\ \ -\tfrac12(1)+\tfrac12=0,\ \ \arcsin(0)=0\ \checkmark" />,
    reason: <>Check with the third point on the graph, the <Katex tex="x" />-intercept at <Katex tex="x=1" />.</>,
    more: <>The sign of <Katex tex="a" /> is visible straight away: <Katex tex="\arcsin" /> is increasing, and this graph is decreasing, so the inner function must be decreasing, <Katex tex="a<0" />. That leaves only B, C and E.</>,
  },
  {
    working: <Katex display tex="\boxed{a=-\tfrac12,\ \ b=\tfrac12}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option A has the right size of <Katex tex="a" /> but the wrong sign, giving an increasing graph. Options B and E have the right <Katex tex="a" /> but put the <Katex tex="x" />-intercept at <Katex tex="x=-1" /> and <Katex tex="x=2" /> respectively, instead of <Katex tex="x=1" />.</>,
  },
]

export default function SpecialistQ2_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x)=\arcsin(x)" /> and <Katex tex="g(x)=ax+b" />, where <Katex tex="a,b\in R" />.
          <br />
          The graph of <Katex tex="y=f\left(g(x)\right)" /> is shown below.
          <br />
          The values of <Katex tex="a" /> and <Katex tex="b" /> are, respectively
        </p>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <><Katex tex="\tfrac12" /> and <Katex tex="\tfrac12" /></> },
        { letter: 'B', content: <><Katex tex="-\tfrac12" /> and <Katex tex="-\tfrac12" /></> },
        { letter: 'C', content: <><Katex tex="-\tfrac12" /> and <Katex tex="\tfrac12" /></>, isAnswer: true },
        { letter: 'D', content: <><Katex tex="\tfrac12" /> and <Katex tex="1" /></> },
        { letter: 'E', content: <><Katex tex="-\tfrac12" /> and <Katex tex="1" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
