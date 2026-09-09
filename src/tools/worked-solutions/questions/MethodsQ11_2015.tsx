// 2015 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 24% correct —
// the fifth-hardest MCQ in the 2014-2016 Methods Exam 2 papers.
// Identify a single transformation mapping one graph onto a related one.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 24, B: 7, C: 7, D: 32, E: 29 },
  answer: 'A',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="y_1=\sqrt{8x^3+1}" />, <Katex tex="y_2=\sqrt{8(x/2)^3+1}=\sqrt{x^3+1}" />. The graph of{' '}
      <Katex tex="y_1" /> has been dilated by a factor of 2 from the <Katex tex="y" />-axis to get the graph
      of <Katex tex="y_2" />. This can be shown by sketching the graphs of both functions. For example, the
      point with coordinates <Katex tex="(1,3)" /> is transformed to <Katex tex="(2,3)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y_1 = \sqrt{8x^3+1}, \qquad y_2 = \sqrt{x^3+1}" />,
    reason: 'Name the two graphs so the transformation between them can be written algebraically.',
  },
  {
    working: <Katex display tex="\begin{aligned} y_1\!\left(\frac{x}{2}\right) &= \sqrt{8\left(\frac{x}{2}\right)^3+1} \\ &= \sqrt{8\cdot\frac{x^3}{8}+1} \\ &= \sqrt{x^3+1} \\ &= y_2(x) \end{aligned}" />,
    reason: <>Try replacing <Katex tex="x" /> with <Katex tex="\tfrac{x}{2}" /> in <Katex tex="y_1" /> and simplify — the <Katex tex="8" /> and the <Katex tex="\tfrac18" /> from cubing <Katex tex="\tfrac12" /> cancel exactly.</>,
  },
  {
    working: <Katex display tex="\text{replacing } x \text{ with } \tfrac{x}{2} \ \Longleftrightarrow\ \text{dilation by factor 2 from the } y\text{-axis}" />,
    reason: <>A dilation of factor <Katex tex="k" /> from the <Katex tex="y" />-axis sends <Katex tex="(x,y)\to(kx,y)" />, i.e. the new graph's rule is the old rule with <Katex tex="x" /> replaced by <Katex tex="x/k" />. Here <Katex tex="k=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dilation by a factor of 2 from the } y\text{-axis}}" />,
    reason: <>Matches option <b>A</b>. A common trap is to instead try scaling <Katex tex="y" /> (options B/C), but the coefficient <Katex tex="8" /> sits inside the cube on <Katex tex="x" />, not outside the square root — so the fix has to act on <Katex tex="x" />, not on the output.</>,
  },
]

export default function MethodsQ11_2015() {
  return (
    <MCQShell
      question={
        <p>
          The transformation that maps the graph of <Katex tex="y=\sqrt{8x^3+1}" /> onto the graph of{' '}
          <Katex tex="y=\sqrt{x^3+1}" /> is a
        </p>
      }
      options={[
        { letter: 'A', content: <>dilation by a factor of 2 from the <Katex tex="y" />-axis</>, isAnswer: true },
        { letter: 'B', content: <>dilation by a factor of 2 from the <Katex tex="x" />-axis</> },
        { letter: 'C', content: <>dilation by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="x" />-axis</> },
        { letter: 'D', content: <>dilation by a factor of 8 from the <Katex tex="y" />-axis</> },
        { letter: 'E', content: <>dilation by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
