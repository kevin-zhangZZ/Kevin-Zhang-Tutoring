// 2025 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 14% correct — the
// hardest MCQ on this paper. This year's paper used four options (A–D) rather than five.
// Finding c so that the minimum distance between a line and a curve equals a given value.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2025-mcq19-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 35, B: 25, C: 24, D: 14 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      Option D gives the shortest distance <Katex tex="\sqrt{2}" /> between <Katex tex="y=x" /> and{' '}
      <Katex tex="y=\log_e(x-1)" />.
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's diagram: the line y = x in red with point A at (1, 1), the curve y = logₑ(x − 1) in blue with point B at (2, 0), the dashed segment AB perpendicular to the line, and a dashed blue tangent at B parallel to the line" className="w-full max-w-[360px] mt-1" />
      <br />
      The shortest distance between the line and the curve must be a perpendicular distance.
      <br />
      At the point <Katex tex="B" />, the gradient of the curve must be 1.
      <br />
      Let <Katex tex="f(x)=x+c" /> and <Katex tex="g(x)=\log_e(x-1)" />.
      <br />
      Solving <Katex tex="g'(x)=1" /> and <Katex tex="y=g(x)" /> gives{' '}
      <Katex tex="(x,y)=(2,0)" />.
      <br />
      Let <Katex tex="d(x)=\sqrt{(x-2)^2+(f(x)-0)^2}" /> be the distance between the point{' '}
      <Katex tex="B" /> and a point on the line <Katex tex="y=f(x)" />.
      <br />
      Minimising <Katex tex="d(x)" /> gives <Katex tex="x=\dfrac{2-c}{2}" />, then solving{' '}
      <Katex tex="d\left(\dfrac{2-c}{2}\right)=\sqrt{2}" /> gives <Katex tex="c=-4" /> or{' '}
      <Katex tex="c=0" />, but the value <Katex tex="c=-4" /> is not an available option, so{' '}
      <Katex tex="c=0" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \log_e(x-1),\quad g'(x) = \frac{1}{x-1}" />,
    reason: <>For the shortest <Katex tex="AB" />, the curve's tangent at <Katex tex="B" /> must be parallel to the line, so it has gradient 1.</>,
    more: <>Why: <Katex tex="AB" /> is shortest when it is perpendicular to the line. If the tangent at <Katex tex="B" /> were steeper or flatter than the line, moving <Katex tex="B" /> a little along the curve would bring it closer to the line. The report's diagram shows this: the dashed tangent at <Katex tex="B" /> runs parallel to the red line.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{1}{x-1} &= 1 \;\implies\; x=2 \\ B &= (2,\ \log_e(1)) = (2,0) \end{aligned}" />,
    reason: <>Set <Katex tex="g'(x)=1" /> to find where the curve has gradient 1, then substitute into <Katex tex="g" /> for the <Katex tex="y" />-coordinate.</>,
  },
  {
    working: <Katex display tex="d(x) = \sqrt{(x-2)^2 + (x+c-0)^2}" />,
    reason: <>Distance from <Katex tex="B(2,0)" /> to a general point <Katex tex="A(x,\ x+c)" /> on the line.</>,
  },
  {
    working: <Katex display tex="d'(x) = 0 \;\implies\; x = \frac{2-c}{2}" />,
    reason: <>The closest point <Katex tex="A" /> minimises <Katex tex="d" />: <Katex tex="d'(x)=0" />, solved for <Katex tex="x" /> with <Cas fn="solve" />.</>,
    more: <>By hand, it is enough to minimise the expression under the square root: its derivative is <Katex tex="2(x-2)+2(x+c)=0" />, so <Katex tex="4x=4-2c" /> and <Katex tex="x=\tfrac{2-c}{2}" />. (For <Katex tex="c=0" /> this gives <Katex tex="A=(1,1)" />, as in the report's diagram.)</>,
  },
  {
    working: <Katex display tex="\begin{aligned} d\left(\tfrac{2-c}{2}\right) &= \sqrt{\left(\tfrac{-2-c}{2}\right)^2 + \left(\tfrac{2+c}{2}\right)^2} \\ &= \sqrt{\tfrac{(2+c)^2}{2}} = \frac{|2+c|}{\sqrt2} \end{aligned}" />,
    reason: <>Substitute back: <Katex tex="\tfrac{2-c}{2}-2=\tfrac{-2-c}{2}" /> and <Katex tex="\tfrac{2-c}{2}+c=\tfrac{2+c}{2}" />. This is the minimum length of <Katex tex="AB" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac{|2+c|}{\sqrt2} &= \sqrt2 \;\implies\; |2+c| = 2 \\ c &= 0 \ \text{ or } \ c=-4 \end{aligned}" />,
    reason: <>Set the minimum length equal to <Katex tex="\sqrt2" /> and solve: <Katex tex="2+c=2" /> or <Katex tex="2+c=-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{c=0}" />,
    reason: <>Matches option <b>D</b>; <Katex tex="c=-4" /> is not an option.</>,
    more: <>
      The report rejects <Katex tex="c=-4" /> simply because it is not an option. It also fails on its own terms: <Katex tex="y=x-4" /> actually crosses the curve (between <Katex tex="x=5" /> and <Katex tex="x=6" />), so its minimum distance is 0. For <Katex tex="c=0" /> there is no such problem: the curve lies below its tangent <Katex tex="y=x-2" /> at <Katex tex="B" /> (it is concave down: its gradient <Katex tex="\tfrac{1}{x-1}" /> is decreasing), and that tangent lies below <Katex tex="y=x" />, so the line and curve never meet and <Katex tex="\sqrt2" /> really is the shortest length.
      <br />
      The distractors, using <Katex tex="\tfrac{|2+c|}{\sqrt2}" />: option A (the most popular answer, 35%), <Katex tex="c=\sqrt2-2" />, makes the <em>vertical</em> gap at <Katex tex="x=2" /> equal to <Katex tex="\sqrt2" />, but the perpendicular distance is then only 1. Option B gives <Katex tex="\sqrt2+1\approx2.41" /> and option C gives <Katex tex="\tfrac{3}{\sqrt2}\approx2.12" />.
    </>,
  },
]

export default function MethodsQ19_2025() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="A" /> be a point on the line <Katex tex="y=x+c" /> and <Katex tex="B" /> be a point on the
          curve <Katex tex="y=\log_e(x-1)" />.
          <br />
          If <Katex tex="A" /> and <Katex tex="B" /> are placed such that the line segment <Katex tex="AB" /> has the
          minimum possible length, and this length is <Katex tex="\sqrt2" />, the value of <Katex tex="c" /> must be
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt2-2" /> },
        { letter: 'B', content: <Katex tex="\sqrt2" /> },
        { letter: 'C', content: <Katex tex="1" /> },
        { letter: 'D', content: <Katex tex="0" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
