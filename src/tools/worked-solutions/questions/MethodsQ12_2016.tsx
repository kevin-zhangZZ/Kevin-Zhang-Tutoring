// 2016 Mathematical Methods — Exam 2, MCQ 12. VCAA examination report: 52% correct.
// Tracking a square-root function's rule through a reflection then a dilation. Question
// text transcribed from the original paper (no diagram given — purely algebraic).
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 19, C: 3, D: 52, E: 22 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \sqrt{2x-5} \;\xrightarrow{\text{reflect in }x\text{-axis}}\; y = -\sqrt{2x-5}" />,
    reason: <>A reflection in the <Katex tex="x" />-axis negates the output: <Katex tex="y\to -y" />.</>,
  },
  {
    working: <Katex display tex="\text{Dilation by }\tfrac12\text{ from the }y\text{-axis:}\quad (x,y)\to\left(\tfrac{x}{2},\,y\right)" />,
    reason: <>Every point's <Katex tex="x" />-coordinate is halved; <Katex tex="y" /> is unchanged.</>,
  },
  {
    working: <Katex display tex="\text{If } (x,y) \text{ is on } y=-\sqrt{2x-5}, \text{ its image is } (X,Y)=\left(\tfrac{x}{2},y\right) \;\implies\; x=2X" />,
    reason: <>Express the original coordinate in terms of the new one to substitute back into the rule.</>,
  },
  {
    working: <Katex display tex="Y = -\sqrt{2(2X)-5} = -\sqrt{4X-5}" />,
  },
  {
    working: <Katex display tex="\boxed{f(x) = -\sqrt{4x-5}}" />,
    reason: <>Matches option <b>D</b>.</>,
  },
]

export default function MethodsQ12_2016() {
  return (
    <MCQShell
      question={
        <p>
          The graph of a function <Katex tex="f" /> is obtained from the graph of the function{' '}
          <Katex tex="g" /> with rule <Katex tex="g(x)=\sqrt{2x-5}" /> by a reflection in the{' '}
          <Katex tex="x" />-axis followed by a dilation from the <Katex tex="y" />-axis by a
          factor of <Katex tex="\tfrac12" />.
          <br />
          Which one of the following is the rule for the function <Katex tex="f" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=\sqrt{5-4x}" /> },
        { letter: 'B', content: <Katex tex="f(x)=-\sqrt{x-5}" /> },
        { letter: 'C', content: <Katex tex="f(x)=\sqrt{x+5}" /> },
        { letter: 'D', content: <Katex tex="f(x)=-\sqrt{4x-5}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="f(x)=-\sqrt{4x-10}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
