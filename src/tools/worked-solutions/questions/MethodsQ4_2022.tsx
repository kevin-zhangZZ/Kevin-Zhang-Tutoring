// 2022 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 68% correct.
// Which of five functions fails to be continuous on a closed interval. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 4, C: 7, D: 68, E: 11 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <>Look for a break with <Katex tex="x\in[0,5]" /></>,
    reason: <>A function is continuous over an interval when it is defined at every point of the interval and its graph has no breaks there. Breaks come from a denominator of zero, a square root of a negative, or an asymptote of <Katex tex="\tan" />, so find where each of those happens and check whether it lies inside <Katex tex="[0,5]" />.</>,
    more: <>"No breaks" means the graph can be drawn over the interval without lifting the pen. Only the points <em>inside</em> <Katex tex="[0,5]" /> matter: a function can break somewhere outside the interval and still be continuous over it. On CAS, graphing each option over <Katex tex="0\le x\le5" /> is a quick check: only one of them shoots off to <Katex tex="\pm\infty" /> part-way along.</>,
  },
  {
    working: <Katex display tex="\text{A: } \frac{1}{(x+3)^2} \ \text{ breaks only at } x=-3" />,
    reason: <>The denominator is zero only at <Katex tex="x=-3" />, which is outside <Katex tex="[0,5]" />, so A is continuous there.</>,
  },
  {
    working: <Katex display tex="\text{B: } \sqrt{x+3} \ \text{ needs } x\ge-3" />,
    reason: <>Every <Katex tex="x" /> in <Katex tex="[0,5]" /> satisfies this, and a square root is continuous on its domain.</>,
  },
  {
    working: <Katex display tex="\text{C: } x^{1/3} \ \text{ is continuous everywhere}" />,
    reason: <>A cube root is defined for every real number (negatives too), with no gaps.</>,
    more: <>Here only <Katex tex="x\ge0" /> matters anyway, and <Katex tex="0^{1/3}=0" /> is defined. The graph of <Katex tex="y=x^{1/3}" /> does have a vertical tangent at <Katex tex="x=0" />, so it is not <em>differentiable</em> there. But a vertical tangent is not a break: the graph is still drawn without lifting the pen, so the function is continuous. Continuous and differentiable are different tests.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{D: } \tan\!\left(\frac{x}{3}\right) \ \text{ breaks where} \\ \frac{x}{3} = \frac\pi2+k\pi,\ k\in Z\end{gathered}" />,
    reason: <><Katex tex="\tan\theta=\frac{\sin\theta}{\cos\theta}" /> has a vertical asymptote wherever <Katex tex="\cos\theta=0" />, that is at <Katex tex="\theta=\tfrac\pi2+k\pi" />. Multiplying by 3 gives <Katex tex="x=\tfrac{3\pi}{2}+3k\pi" />.</>,
  },
  {
    working: <Katex display tex="k=0:\ x = \tfrac{3\pi}{2} \approx 4.71 \in [0,5]" />,
    reason: <>An asymptote inside the interval, so <Katex tex="\tan\!\left(\tfrac{x}{3}\right)" /> is the one that fails.</>,
    more: <>One asymptote inside <Katex tex="[0,5]" /> is enough. The neighbouring ones, from <Katex tex="k=-1" /> and <Katex tex="k=1" />, are at <Katex tex="-\tfrac{3\pi}{2}\approx-4.71" /> and <Katex tex="\tfrac{9\pi}{2}\approx14.14" />, both outside.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{E: } \sin^2\!\left(\frac{x}{3}\right) \\ \text{is continuous everywhere}\end{gathered}" />,
    reason: <>Sine is defined for every real number with no breaks, and squaring a continuous function cannot create one.</>,
    more: <>Option E was the most popular wrong answer. Unlike <Katex tex="\tan" />, it involves no division by <Katex tex="\cos" />, so there is nowhere for an asymptote to come from.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{D}}" />,
    reason: <>Matches option <b>D</b>: the only function with a break in <Katex tex="[0,5]" />.</>,
  },
]

export default function MethodsQ4_2022() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following functions is not continuous over the interval{' '}
          <Katex tex="x\in[0,5]" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=\frac{1}{(x+3)^2}" /> },
        { letter: 'B', content: <Katex tex="f(x)=\sqrt{x+3}" /> },
        { letter: 'C', content: <Katex tex="f(x)=x^{1/3}" /> },
        { letter: 'D', content: <Katex tex="f(x)=\tan\!\left(\tfrac{x}{3}\right)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="f(x)=\sin^2\!\left(\tfrac{x}{3}\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
