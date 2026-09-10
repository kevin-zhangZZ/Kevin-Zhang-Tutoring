// 2024 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 45% correct. This
// year's paper used four options (A–D) rather than five. Local minimum of a transformed
// function, tracking a known point through a dilation and a translation. Question text
// transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 45, B: 24, C: 17, D: 14 },
  answer: 'A',
  noAnswer: 0,
  comment: (
    <>
      Dilate by a factor of 3 from the <Katex tex="y" />-axis: <Katex tex="f_1(x)=\tfrac{x}{6}+\tfrac6x" />. Translate
      1 unit down: <Katex tex="g(x)=\tfrac{x}{6}+\tfrac6x-1" />. The local minimum of <Katex tex="g" /> is at{' '}
      <Katex tex="(6,1)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{x}{2}+\frac{2}{x},\quad x>0" />,
    reason: 'Given function.',
  },
  {
    working: <Katex display tex="f'(x) = \frac12-\frac{2}{x^2} = 0 \;\implies\; x^2=4 \;\implies\; x=2\ (x>0)" />,
    reason: <>Find <Katex tex="f" />'s own local minimum first.</>,
  },
  {
    working: <Katex display tex="f(2) = 1+1 = 2 \;\implies\; \text{local min at } (2,2)" />,
    reason: 'Evaluate f there.',
  },
  {
    working: <Katex display tex="\text{Dilation by 3 from the } y\text{-axis: } (x,y)\to(3x,y)" />,
    reason: <>Scales <Katex tex="x" />-coordinates by 3, leaves <Katex tex="y" /> unchanged.</>,
  },
  {
    working: <Katex display tex="(2,2) \;\to\; (6,2)" />,
    reason: 'Apply the dilation to the minimum point.',
  },
  {
    working: <Katex display tex="\text{Translation 1 unit down: } (x,y)\to(x,y-1)" />,
    reason: 'Apply the second transformation.',
  },
  {
    working: <Katex display tex="\boxed{(6,2) \;\to\; (6,1)}" />,
    reason: <>Matches option <b>A</b>. (Since dilations and translations preserve the "local minimum" nature of a point, there's no need to re-derive <Katex tex="g" />'s formula and re-differentiate — just track the point through each transformation.)</>,
  },
]

export default function MethodsQ13_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The function <Katex tex="f:(0,\infty)\to\mathbb{R}" />, <Katex tex="f(x)=\dfrac{x}{2}+\dfrac{2}{x}" /> is
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
