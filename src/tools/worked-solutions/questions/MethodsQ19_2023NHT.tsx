// 2023 Mathematical Methods NHT — Exam 2, MCQ 19. The NHT report gives the answer key only, with
// no statistics; it prints a comment with a graph for this question (comment transcribed from the
// rendered report; the graph, for k = 1, is the report's own image, taken from the report .docx
// as meth-2023nht-mcq19-report-graph.png — the report labels its curve ln(x − 1)). Calculus:
// maximising the x-intercept of a tangent to y = log_e(x − k). Question text transcribed from
// the original paper. Solution is original; the answer D agrees with the report's key. sympy:
// the tangent at x = k + u meets the x-axis at x = k + u − u·log_e(u), maximised at u = 1.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2023nht-mcq19-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's example for k = 1: the graph of y = ln(x − 1) with vertical asymptote x = 1, and its tangent y = x − 2 touching it at (2, 0)" className="w-full max-w-[360px] mt-1" />
      <br />
      The graph of <Katex tex="y=\log_e(x-k)" /> has a tangent with a maximum horizontal intercept
      when <Katex tex="\log_e(x-k)=0" />.
      <br />
      <Katex tex="x-k=1" />
      <br />
      <Katex tex="x=1+k" />
      <br />
      An example is shown above for <Katex tex="k=1" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx}=\frac{1}{x-k}" />,
    reason: <>Derivative of <Katex tex="\log_e(x-k)" /> by the chain rule (the inside has derivative 1).</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{at } x=k+u\ (u>0):\\ y-\log_e(u)=\frac1u\big(x-(k+u)\big)\end{gathered}" />,
    reason: <>Write the point of contact as <Katex tex="x=k+u" />, where <Katex tex="u=x-k>0" /> is how far right of the asymptote it is. This keeps the algebra tidy: <Katex tex="y=\log_e(u)" /> and the gradient is <Katex tex="\tfrac1u" />.</>,
  },
  {
    working: <Katex display tex="y=0:\ \ x=k+u-u\log_e(u)" />,
    reason: <>The horizontal-axis intercept of this tangent: set <Katex tex="y=0" /> and solve for <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\frac{d}{du}\big(u-u\log_e(u)\big)&=1-\big(\log_e(u)+1\big)\\&=-\log_e(u)=0\ \Rightarrow\ u=1\end{aligned}" />,
    reason: <><Katex tex="k" /> is a constant, so maximise <Katex tex="u-u\log_e(u)" /> over <Katex tex="u>0" />. Product rule on <Katex tex="u\log_e(u)" />.</>,
    more: <>It is a maximum: <Katex tex="-\log_e(u)" /> is positive for <Katex tex="u<1" /> and negative for <Katex tex="u>1" />, so the intercept rises then falls. Tangents at points closer to the asymptote are steep and cut the axis near <Katex tex="x=k" />; tangents further out are flat and cut it far to the left.</>,
  },
  {
    working: <Katex display tex="x_{\max}=k+1-1\cdot\log_e(1)=k+1" />,
    reason: <>Substitute <Katex tex="u=1" />. At that point <Katex tex="y=\log_e(1)=0" />: the best tangent is the one at the curve&apos;s own <Katex tex="x" />-intercept <Katex tex="(k+1,0)" />, which is how the report puts it.</>,
  },
  {
    working: <Katex display tex="\boxed{x=1+k}" />,
    reason: <>Matches option <b>D</b>. Check with <Katex tex="k=1" /> (the report&apos;s example): the tangent at <Katex tex="(2,0)" /> is <Katex tex="y=x-2" />, crossing at <Katex tex="x=2=1+k" />; the tangent at <Katex tex="x=3" />, <Katex tex="y=\tfrac12(x-3)+\log_e2" />, crosses at <Katex tex="x\approx1.61" />, further left.</>,
    more: <>Option <b>A</b> is the answer only when <Katex tex="k=0" /> — the translation by <Katex tex="k" /> has been forgotten. Option <b>B</b>, <Katex tex="x=k" />, is the vertical asymptote, which no tangent&apos;s intercept actually reaches.</>,
  },
]

export default function MethodsQ19_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=\log_e(x-k)" />, for <Katex tex="k\in R" />, has a tangent with a
          maximum horizontal axis intercept of
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=1" /> },
        { letter: 'B', content: <Katex tex="x=k" /> },
        { letter: 'C', content: <Katex tex="x=e" /> },
        { letter: 'D', content: <Katex tex="x=1+k" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="x=e+k" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
