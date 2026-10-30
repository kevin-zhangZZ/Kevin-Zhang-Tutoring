// 2024 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 38% correct. This
// year's paper used four options (A–D) rather than five. What must be true of f, given that
// f′ takes both a negative and a positive value on its domain. Question text transcribed
// from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2024-mcq10-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 26, B: 38, C: 16, D: 20 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      Possible graphs of <Katex tex="f" /> and <Katex tex="f'" /> are shown below.
      <br />
      <Katex tex="f" /> does not have to be strictly decreasing on <Katex tex="[0,2]" />.
      <br />
      <Katex tex="f" /> does not have to be positive on <Katex tex="[4,5]" />.
      <br />
      <Katex tex="f" /> does not have to have a local minimum at <Katex tex="x=3" />.
      <br />
      <Katex tex="f" /> is many-to-one on <Katex tex="[2,4]" />, since <Katex tex="f'" /> changes
      sign. So <Katex tex="f" /> does not have an inverse function.
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's example graphs: a cubic-like y = f(x) with a local maximum near x = 0.8 and a local minimum near x = 3.5, and y = f′(x) negative at x = 2 and positive at x = 4" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} f:[0,5]\to R,\quad f' \text{ continuous} \\ f'(2)<0,\qquad f'(4)>0 \end{gathered}" />,
    reason: <>The sign of <Katex tex="f'" /> tells us the direction of <Katex tex="f" />: decreasing at <Katex tex="x=2" />, increasing at <Katex tex="x=4" />. Because <Katex tex="f'" /> is continuous, each sign holds on a small interval around that point. Nothing else is given.</>,
    more: <>Continuity matters because a continuous gradient cannot flip sign instantly: <Katex tex="f'<0" /> on a small interval around <Katex tex="x=2" /> and <Katex tex="f'>0" /> on a small interval around <Katex tex="x=4" />. So <Katex tex="f" /> is strictly decreasing just after <Katex tex="x=2" /> and strictly increasing just before <Katex tex="x=4" />. That is all the information we have: two gradients, at two points, and no values of <Katex tex="f" /> at all.</>,
  },
  {
    working: <Katex display tex="\begin{gathered} f \text{ lowest on } [2,4] \text{ at some } m\in(2,4) \\ \Rightarrow f(x_1)=f(x_2) \text{ for some } x_1\neq x_2 \\ \Rightarrow f \text{ many-to-one on } [2,4] \end{gathered}" />,
    reason: <><Katex tex="f" /> falls just after <Katex tex="x=2" /> and rises just before <Katex tex="x=4" />, so its lowest value on <Katex tex="[2,4]" /> is inside the interval, not at an endpoint. A horizontal line just above that lowest point meets the graph at least twice: two <Katex tex="x" />-values give the same <Katex tex="y" />-value, which is what many-to-one means.</>,
    more: <>More carefully: let <Katex tex="m" /> be where <Katex tex="f" /> is lowest on <Katex tex="[2,4]" />. By row 1, <Katex tex="m" /> is not an endpoint, so <Katex tex="f(2)>f(m)" /> and <Katex tex="f(4)>f(m)" />. Pick any height <Katex tex="k" /> between <Katex tex="f(m)" /> and the smaller of <Katex tex="f(2)" /> and <Katex tex="f(4)" />. The graph is unbroken, so it crosses <Katex tex="y=k" /> at least once on its way down from <Katex tex="x=2" /> to <Katex tex="m" /> and again on its way up from <Katex tex="m" /> to <Katex tex="x=4" />: two <Katex tex="x" />-values with the same <Katex tex="y" />-value. Notice we never needed to know <i>where</i> <Katex tex="m" /> is, or how many times <Katex tex="f'" /> changes sign in between.</>,
  },
  {
    working: <Katex display tex="\boxed{f \text{ has no inverse function}}" />,
    reason: <>Only a one-to-one function has an inverse function. Since <Katex tex="f" /> is many-to-one on part of its domain, it is not one-to-one on <Katex tex="[0,5]" />. Matches option <b>B</b>.</>,
    more: <>
      The other options each claim more than two gradients can tell you. A single example satisfying the question, such as <Katex tex="f(x)=(x-2.5)^2-10" /> (with <Katex tex="f'(2)=-1" />, <Katex tex="f'(4)=3" />), or <Katex tex="f(x)=(x-1)(x-3)^2" /> (with <Katex tex="f'(2)=-1" />, <Katex tex="f'(4)=7" />), is enough to rule one out.
      <br />
      <b>A</b> (26%, the most common wrong answer): <Katex tex="f'(2)<0" /> describes the gradient at one point, not on all of <Katex tex="[0,2]" />. For <Katex tex="f(x)=(x-1)(x-3)^2" />, <Katex tex="f'(0)=15>0" />, so <Katex tex="f" /> is increasing near <Katex tex="x=0" /> (it has a local maximum at <Katex tex="x=\tfrac53" />, like the report's graph).
      <br />
      <b>C</b>: the information is about gradients only. Shifting a graph down does not change <Katex tex="f'" />, and <Katex tex="f(x)=(x-2.5)^2-10" /> gives <Katex tex="f(4)=-\tfrac{31}{4}" />, negative.
      <br />
      <b>D</b>: <Katex tex="f'" /> must be 0 somewhere in <Katex tex="(2,4)" /> (it is continuous and goes from negative to positive), but nothing says where. <Katex tex="f(x)=(x-2.5)^2-10" /> has its minimum at <Katex tex="x=2.5" />, not <Katex tex="x=3" />.
    </>,
  },
]

export default function MethodsQ10_2024() {
  return (
    <MCQShell
      question={
        <p>
          Suppose a function <Katex tex="f:[0,5]\to R" /> and its derivative{' '}
          <Katex tex="f':[0,5]\to R" /> are defined and continuous on their domains. If{' '}
          <Katex tex="f'(2)<0" /> and <Katex tex="f'(4)>0" />, which one of these statements must be true?
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="f" /> is strictly decreasing on [0, 2].</> },
        { letter: 'B', content: <><Katex tex="f" /> does not have an inverse function.</>, isAnswer: true },
        { letter: 'C', content: <><Katex tex="f" /> is positive on [4, 5].</> },
        { letter: 'D', content: <><Katex tex="f" /> has a local minimum at <Katex tex="x=3" />.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
