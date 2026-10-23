// 2024 Mathematical Methods NHT — Exam 2, MCQ 13. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Calculus: area under a negative function from its antiderivative's endpoint values.
// Question text transcribed from the original paper. Solution is original; the answer D agrees with
// the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      <Katex tex="A=-\displaystyle\int_{-1}^{2}g(x)\,dx" />, as <Katex tex="g(x)<0" />
      <br />
      <Katex tex="=-\big[f(x)\big]_{-1}^{2}" />, as <Katex tex="f'(x)=g(x)" />
      <br />
      <Katex tex="=-f(2)+f(-1)" />
      <br />
      <Katex tex="=1+2" />
      <br />
      <Katex tex="=3" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area}=-\int_{-1}^{2}g(x)\,dx" />,
    reason: <>The graph of <Katex tex="g" /> is entirely below the <Katex tex="x" />-axis (<Katex tex="g(x)<0" />), so its integral is negative. An area is positive, so take the negative of the integral.</>,
    more: <>Every strip between the curve and the axis has height <Katex tex="0-g(x)=-g(x)" />, which is positive. Adding those strips is <Katex tex="\int_{-1}^{2}\left(-g(x)\right)dx" />.</>,
  },
  {
    working: <Katex display tex="=-\big[f(x)\big]_{-1}^{2}" />,
    reason: <><Katex tex="f'(x)=g(x)" /> says exactly that <Katex tex="f" /> is an antiderivative of <Katex tex="g" />, so the integral is the change in <Katex tex="f" /> (the fundamental theorem of calculus).</>,
  },
  {
    working: <Katex display tex="=-\big(f(2)-f(-1)\big)=-(-1-2)" />,
    reason: <>Substitute <Katex tex="f(2)=-1" /> and <Katex tex="f(-1)=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{3\ \text{square units}}" />,
    reason: <>Matches option <b>D</b>. Sanity check: <Katex tex="f" /> falls from 2 to <Katex tex="-1" />, which fits <Katex tex="f'=g<0" /> (a decreasing function).</>,
    more: <>The signed integral itself is <Katex tex="\int_{-1}^{2}g(x)\,dx=-3" />, which is not among the options: an area must be positive, which is the point of the minus sign in the first line. Option <b>B</b> (1) is <Katex tex="f(2)+f(-1)" />, adding the endpoint values instead of subtracting them.</>,
  },
]

export default function MethodsQ13_2024NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>Suppose that we have two continuous functions, <Katex tex="f" /> and <Katex tex="g" />, with domain <Katex tex="R" />.</p>
          <p>It is known that <Katex tex="g(x)<0" /> for all <Katex tex="x" /> and <Katex tex="f'(x)=g(x)" />.</p>
          <p>
            Given that <Katex tex="f(-1)=2" /> and <Katex tex="f(2)=-1" />, what is the area enclosed by the graph
            of <Katex tex="y=g(x)" />, the <Katex tex="x" />-axis and the lines <Katex tex="x=-1" /> and <Katex tex="x=2" />?
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <>0 square units</> },
        { letter: 'B', content: <>1 square unit</> },
        { letter: 'C', content: <>2 square units</> },
        { letter: 'D', content: <>3 square units</>, isAnswer: true },
        { letter: 'E', content: <>4 square units</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
