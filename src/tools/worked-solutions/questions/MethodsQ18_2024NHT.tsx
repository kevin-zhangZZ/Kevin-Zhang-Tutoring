// 2024 Mathematical Methods NHT — Exam 2, MCQ 18. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment and a graph for this question (graph taken from the
// report's own file, meth-2024nht-mcq18-report-graph.png). Functions: how far the argument of a
// cosine must run for exactly one maximum and one minimum. Question text transcribed from the
// original paper. Solution is original; the answer D agrees with the report's key, and a numerical
// count of solutions confirms one of each exactly for 11/12 ≤ a < 17/12.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2024nht-mcq18-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      <Katex tex="f:[0,2\pi]\to R,\ f(x)=\cos\left(ax+\dfrac{\pi}{6}\right),\ f(0)=\dfrac{\sqrt3}{2}" />
      <br />
      To get the smallest value of <Katex tex="a" /> such that there is a unique solution to <Katex tex="f(x)=1" /> and
      a unique solution to <Katex tex="f(x)=-1" />, <Katex tex="f(x)" /> must equal 1 when <Katex tex="x=2\pi" /> and
      only at <Katex tex="x=2\pi" />.
      <br />
      Solve <Katex tex="\cos\left(2\pi a+\dfrac{\pi}{6}\right)=1" />, <Katex tex="a=\dfrac{12n-1}{12},\ n\in Z^+" />,{' '}
      <Katex tex="a=\dfrac{11}{12}" /> is the smallest value.
      <br />
      This value can also be found using the slider functionality on CAS.
      <br />
      The graph of <Katex tex="y=f" /> when <Katex tex="a=\dfrac{11}{12}" /> is shown below.
      <br />
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's graph of f(x) = cos(11x/12 + π/6) for x from 0 to 2π, starting near 0.87, falling to its minimum (10π/11, −1) and rising to the endpoint (2π, 1)" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\theta=ax+\tfrac{\pi}{6}:\quad \tfrac{\pi}{6}\le\theta\le 2\pi a+\tfrac{\pi}{6}" />,
    reason: <>Track the argument <Katex tex="\theta" /> of the cosine. As <Katex tex="x" /> runs over <Katex tex="[0,2\pi]" />, <Katex tex="\theta" /> runs from <Katex tex="\tfrac{\pi}{6}" /> up to <Katex tex="2\pi a+\tfrac{\pi}{6}" /> (since <Katex tex="a>0" />).</>,
    more: <>Each value of <Katex tex="\theta" /> in that interval comes from exactly one <Katex tex="x" />, so counting solutions of <Katex tex="f(x)=\pm1" /> is the same as counting how many of the special angles <Katex tex="\theta" /> passes.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\cos\theta=-1&:\ \theta=\pi,3\pi,\ldots\\ \cos\theta=1&:\ \theta=2\pi,4\pi,\ldots\end{aligned}" />,
    reason: <>The starting value <Katex tex="\theta=\tfrac{\pi}{6}" /> is past <Katex tex="\theta=0" />, so the first <Katex tex="-1" /> is at <Katex tex="\pi" /> and the first <Katex tex="1" /> is at <Katex tex="2\pi" />.</>,
  },
  {
    working: <Katex display tex="2\pi a+\tfrac{\pi}{6}\ge 2\pi\ \Rightarrow\ a\ge\tfrac{11}{12}" />,
    reason: <>To have a solution of <Katex tex="f(x)=1" /> at all, <Katex tex="\theta" /> must reach <Katex tex="2\pi" />. That also means it has passed <Katex tex="\pi" />, so <Katex tex="f(x)=-1" /> has a solution as well.</>,
  },
  {
    working: <Katex display tex="2\pi a+\tfrac{\pi}{6}<3\pi\ \Rightarrow\ a<\tfrac{17}{12}" />,
    reason: <>For the solutions to be <b>unique</b>, <Katex tex="\theta" /> must stop before reaching the second <Katex tex="-1" />, at <Katex tex="3\pi" />. (The second <Katex tex="1" />, at <Katex tex="4\pi" />, is further still.)</>,
  },
  {
    working: <Katex display tex="\tfrac{11}{12}\le a<\tfrac{17}{12}\ \Rightarrow\ \boxed{a_{\min}=\tfrac{11}{12}}" />,
    reason: <>Matches option <b>D</b>. At <Katex tex="a=\tfrac{11}{12}" /> the graph reaches its maximum exactly at the endpoint <Katex tex="x=2\pi" />, as in the report&apos;s graph.</>,
    more: <>Option <b>B</b> (<Katex tex="\tfrac{5}{12}" />) only makes <Katex tex="\theta" /> reach <Katex tex="\pi" />: from <Katex tex="2\pi a+\tfrac{\pi}{6}=\pi" />. That gives a unique solution to <Katex tex="f(x)=-1" /> but none to <Katex tex="f(x)=1" />. Option <b>E</b> (<Katex tex="\tfrac{17}{12}" />) is the upper boundary, and is itself excluded: there <Katex tex="\theta" /> reaches <Katex tex="3\pi" />, so <Katex tex="f(x)=-1" /> has two solutions.</>,
  },
]

export default function MethodsQ18_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Let <Katex tex="f:[0,2\pi]\to R,\ f(x)=\cos\left(ax+\dfrac{\pi}{6}\right)" />, where <Katex tex="a>0" />. There
            is a unique solution to <Katex tex="f(x)=1" /> and a unique solution to <Katex tex="f(x)=-1" />.
          </p>
          <p>The minimum possible value of <Katex tex="a" /> is</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{1}{12}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{5}{12}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{5}{6}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{11}{12}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{17}{12}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
