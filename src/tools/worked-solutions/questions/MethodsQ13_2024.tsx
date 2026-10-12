// 2024 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 45% correct. This
// year's paper used four options (A–D) rather than five. Local minimum of a transformed
// function, tracking a known point through a dilation and a translation. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2024-mcq13-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 45, B: 24, C: 17, D: 14 },
  answer: 'A',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="f(x)=\tfrac{x}{2}+\tfrac{2}{x}" />
      <br />
      Dilate by a factor of 3 from the <Katex tex="y" />-axis:
      <br />
      <Katex tex="f_1(x)=\tfrac{x}{6}+\tfrac{6}{x}" />.
      <br />
      Translate 1 unit down:
      <br />
      <Katex tex="g(x)=\tfrac{x}{6}+\tfrac{6}{x}-1" />.
      <br />
      The local minimum of <Katex tex="g" /> is at <Katex tex="(6,1)" />.
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's graph of y = g(x) for x from 0 to 10, a curve falling to its local minimum at (6, 1) and then rising slowly" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{x}{2}+\frac{2}{x},\quad x>0" />,
    reason: <>A dilation and a translation carry a local minimum of <Katex tex="f" /> to a local minimum of <Katex tex="g" />, so find <Katex tex="f" />'s minimum and track that point.</>,
    more: <>This saves finding <Katex tex="g" />'s rule and differentiating again. Neither transformation flips the graph (no reflection, and the dilation factor is positive), so a minimum stays a minimum. The report's method of finding <Katex tex="g(x)=\tfrac{x}{6}+\tfrac{6}{x}-1" /> first gives the same point: <Katex tex="g'(x)=\tfrac16-\tfrac{6}{x^2}=0" /> at <Katex tex="x=6" />, and <Katex tex="g(6)=1+1-1=1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f'(x) = \frac12-\frac{2}{x^2} &= 0\\ x^2&=4\\ x&=2\quad (x>0)\end{aligned}" />,
    reason: <>Stationary point of <Katex tex="f" />; reject <Katex tex="x=-2" /> as it is outside the domain. <Katex tex="f'(1)<0" /> and <Katex tex="f'(3)>0" />, so it is a minimum.</>,
  },
  {
    working: <Katex display tex="f(2) = 1+1 = 2 \;\implies\; \text{local min at } (2,2)" />,
    reason: <>Substitute <Katex tex="x=2" /> into <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\text{Dilation by 3 from the } y\text{-axis: } (x,y)\to(3x,y)" />,
    reason: <>"From the <Katex tex="y" />-axis" means horizontal: each <Katex tex="x" />-coordinate is multiplied by 3, and <Katex tex="y" /> is unchanged.</>,
  },
  {
    working: <Katex display tex="(2,2) \;\to\; (6,2)" />,
    reason: <>Apply the dilation to the minimum point.</>,
  },
  {
    working: <Katex display tex="\text{Translation 1 unit down: } (x,y)\to(x,y-1)" />,
    reason: <>The negative direction of the <Katex tex="y" />-axis is down, so subtract 1 from each <Katex tex="y" />-coordinate.</>,
  },
  {
    working: <Katex display tex="\boxed{(6,2) \;\to\; (6,1)}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>B</b>, <Katex tex="\left(\tfrac23,1\right)" /> (chosen by 24%), divides the <Katex tex="x" />-coordinate by 3 instead of multiplying. Options <b>C</b>, <Katex tex="(2,5)" />, and <b>D</b>, <Katex tex="\left(2,-\tfrac13\right)" />, treat it as a dilation from the <Katex tex="x" />-axis: they multiply or divide the <Katex tex="y" />-coordinate 2 by 3 and then subtract 1, leaving <Katex tex="x=2" />.</>,
  },
]

export default function MethodsQ13_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The function <Katex tex="f:(0,\infty)\to R" />, <Katex tex="f(x)=\dfrac{x}{2}+\dfrac{2}{x}" /> is
            mapped to the function <Katex tex="g" /> with the following sequence of transformations:
          </p>
          <ol className="list-decimal pl-5 mb-2 space-y-1">
            <li>dilation by a factor of 3 from the <Katex tex="y" />-axis</li>
            <li>translation by 1 unit in the negative direction of the <Katex tex="y" />-axis.</li>
          </ol>
          <p>The function <Katex tex="g" /> has a local minimum at the point with the coordinates</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="(6,1)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\left(\tfrac23,1\right)" /> },
        { letter: 'C', content: <Katex tex="(2,5)" /> },
        { letter: 'D', content: <Katex tex="\left(2,-\tfrac13\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
