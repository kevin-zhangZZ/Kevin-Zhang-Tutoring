// 2026 Mathematical Methods NHT — Exam 2, MCQ 9. The NHT report gives the answer key only, with no
// statistics; its worked comment is transcribed below, with its graph cropped from the report PDF
// (meth-2026nht-mcq9-report-graph.png). Algebra: a common tangent to two parabolas, via turning points or two discriminants.
// Question text transcribed from the original paper. Solution is original; the answer B agrees with
// the report's key. Checked with sympy: the two discriminant equations (4 − m)² + 4c = 0 and
// (10 − m)² − 4(21 − c) = 0 have the single solution m = 0, c = −4.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './meth-2026nht-mcq9-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: (
    <>
      The most efficient method to solve this is by considering the graphs of
      <br />
      <Katex tex="y=x^2+4x" /> and <Katex tex="y=(x+5)^2-4" />.
      <br />
      <img loading="lazy" decoding="async" src={reportGraphSrc} alt="The report's graphs of y = (x + 5)² − 4 in black and y = x² + 4x in blue, both with their minimum on the red dashed line y = −4" className="w-full max-w-[360px] mt-1" />
      <br />
      Both graphs have a turning point at <Katex tex="y=-4" />, and this horizontal line is the only line that is
      tangent to both graphs. The gradient is zero.
      <br />
      Alternatively, students can consider the equations
      <br />
      <Katex tex="x^2+4x=mx+c" />
      <br />
      <Katex tex="x^2+(4-m)x-c=0" />
      <br />
      and
      <br />
      <Katex tex="(x+5)^2-4=mx+c" />
      <br />
      <Katex tex="x^2+(10-m)x+(21-c)=0" />
      <br />
      Both quadratic equations must have one solution, which means they must both have a discriminant of zero.
      <br />
      <Katex tex="(4-m)^2+4c=0" />
      <br />
      <Katex tex="(10-m)^2-4(21-c)=0" />
      <br />
      Solving these equations gives <Katex tex="m=0" /> and <Katex tex="c=-4" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y=x^2+4x=(x+2)^2-4" />,
    reason: <>Complete the square to see the turning point: <Katex tex="(-2,-4)" />.</>,
  },
  {
    working: <Katex display tex="y=(x+5)^2-4\ \text{ has turning point }(-5,-4)" />,
    reason: <>Already in turning-point form. Both parabolas open upward with their minimum at the <b>same height</b>, <Katex tex="y=-4" />.</>,
    more: <>In fact the second parabola is just the first translated 3 units left, so the two are identical in shape and sit side by side on the line <Katex tex="y=-4" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&y=-4\ \text{ touches both graphs}\\&\text{at their turning points}\end{aligned}" />,
    reason: <>A horizontal line through a parabola&apos;s turning point is a tangent there. So <Katex tex="y=-4" /> is tangent to both, with gradient 0.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x^2+4x&=mx+c\\\implies x^2+(4-m)x-c&=0\\[4pt](x+5)^2-4&=mx+c\\\implies x^2+(10-m)x+21-c&=0\end{aligned}" />,
    reason: <>To be sure no other line works, let the line be <Katex tex="y=mx+c" />. A tangent meets each parabola exactly once, so each of these quadratics has a single solution.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Delta_1&=(4-m)^2+4c=0\\\Delta_2&=(10-m)^2-4(21-c)=0\end{aligned}" />,
    reason: <>One solution means discriminant <Katex tex="b^2-4ac=0" /> for each.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Delta_2-\Delta_1:\ (10-m)^2-(4-m)^2-84&=0\\-12m&=0\\m&=0\end{aligned}" />,
    reason: <>Subtract to eliminate <Katex tex="c" />: <Katex tex="(100-20m+m^2)-(16-8m+m^2)-84=-12m" />. Then <Katex tex="c=-\tfrac{(4-0)^2}{4}=-4" />, the line <Katex tex="y=-4" /> again — and it is the only common tangent.</>,
    more: <><Cas fn="solve">solve({'{'}(4−m)²+4c=0, (10−m)²−4(21−c)=0{'}'}, {'{'}m, c{'}'})</Cas> returns <Katex tex="m=0,\ c=-4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{gradient}=0}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>A</b>, <Katex tex="-4" />, is the height of the tangent line (its <Katex tex="y" />-intercept <Katex tex="c" />), not its gradient.</>,
  },
]

export default function MethodsQ9_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            A straight line is tangent to the graphs of both <Katex tex="y=x^2+4x" /> and{' '}
            <Katex tex="y=(x+5)^2-4" />.
          </p>
          <p>The gradient of this line is</p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="-4" /> },
        { letter: 'B', content: <Katex tex="0" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
