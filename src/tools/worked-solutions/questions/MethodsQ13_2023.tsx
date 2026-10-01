// 2023 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 52% correct.
// Three steps of Newton's method, read out of pseudocode. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 22, C: 52, D: 7, E: 3 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}x_{n+1} &= x_n-\frac{f(x_n)}{f'(x_n)}\\ f(x) &= x^3+3x-3\\ f'(x) &= 3x^2+3\end{aligned}" />,
    reason: <>The line <Katex tex="x_0 \leftarrow x_0-f(x_0)\div df(x_0)" /> is Newton's method. The arrow means "replace <Katex tex="x_0" /> with", so each pass of the loop overwrites the estimate with the next one, and <b>For i from 1 to 3</b> makes exactly three passes. The division-by-zero branch never runs, because <Katex tex="f'(x)=3x^2+3\ge3" />.</>,
  },
  {
    working: <Katex display tex="x_1 = 1-\frac{f(1)}{f'(1)} = 1-\frac{1}{6} = 0.83333" />,
    reason: <><Katex tex="f(1)=1+3-3=1" /> and <Katex tex="f'(1)=6" />. On CAS, <Cas fn="define">Define f(x)=x^3+3x-3</Cas> and define <Katex tex="df(x)=3x^2+3" /> the same way, so each pass is one line, and carry the unrounded value into the next pass.</>,
  },
  {
    working: <Katex display tex="x_2 = 0.83333-\frac{0.078704}{5.08333} = 0.81785" />,
    reason: <>Second pass: <Katex tex="f(x_1)" /> and <Katex tex="f'(x_1)" /> worked out at the unrounded <Katex tex="x_1=\tfrac56" />.</>,
  },
  {
    working: <Katex display tex="x_3 = 0.81785-\frac{0.000596}{5.00664} = 0.81773" />,
    reason: <>Third pass. The loop ends here, so <b>Return x0</b> outputs this value.</>,
  },
  {
    working: <Katex display tex="\boxed{0.81773}" />,
    reason: <>Matches option <b>C</b>. Option <b>A</b> is the value after one pass, <b>B</b> after two passes, and <b>D</b> is the starting value <Katex tex="x_0=1" /> with no passes at all. <b>B</b> and <b>C</b> agree to three decimal places, so only counting exactly three passes tells them apart.</>,
  },
]

export default function MethodsQ13_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The following algorithm applies Newton's method using a <b>For</b> loop with 3
            iterations.
          </p>
          <pre className="text-[12.5px] leading-relaxed bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-xl p-4 overflow-x-auto">
{`Inputs: f(x), a function of x
        df(x), the derivative of f(x)
        x0, an initial estimate

Define newton(f(x), df(x), x0)
    For i from 1 to 3
        If df(x0) = 0 Then
            Return "Error: Division by zero"
        Else
            x0 ← x0 − f(x0) ÷ df(x0)
    EndFor
    Return x0`}
          </pre>
          <p>
            The <b>Return</b> value of the function{' '}
            <Katex tex="\mathrm{newton}\!\left(x^3+3x-3,\ 3x^2+3,\ 1\right)" /> is closest to
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.83333" /> },
        { letter: 'B', content: <Katex tex="0.81785" /> },
        { letter: 'C', content: <Katex tex="0.81773" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="1" /> },
        { letter: 'E', content: <Katex tex="3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
