// 2023 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 52% correct.
// Three steps of Newton's method, read out of pseudocode. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 22, C: 52, D: 7, E: 3 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x_{n+1} = x_n-\frac{f(x_n)}{f'(x_n)}, \qquad f(x) = x^3+3x-3, \ f'(x) = 3x^2+3" />,
    reason: <>The pseudocode line <Katex tex="x_0 \leftarrow x_0-f(x_0)\div df(x_0)" /> is Newton's method. The loop runs three times, so three steps.</>,
  },
  {
    working: <Katex display tex="x_1 = 1-\frac{f(1)}{f'(1)} = 1-\frac{1}{6} = 0.83333" />,
    reason: <><Katex tex="f(1)=1+3-3=1" /> and <Katex tex="f'(1)=6" />. This is option <b>A</b> — the answer after one iteration, not three.</>,
  },
  {
    working: <Katex display tex="x_2 = 0.83333-\frac{0.07870}{5.08333} = 0.81785" />,
    reason: <>Option <b>B</b> is this, the two-iteration value. The three options <b>A</b>, <b>B</b>, <b>C</b> are the successive estimates, so miscounting the loop is the whole trap.</>,
  },
  {
    working: <Katex display tex="x_3 = 0.81785-\frac{0.00057}{5.00662} = 0.81773" />,
    reason: 'The third pass, which is where the For loop ends and the value is returned.',
  },
  {
    working: <Katex display tex="\boxed{0.81773}" />,
    reason: <>Option <b>C</b>. The true root is <Katex tex="0.817731\ldots" />, so three steps have already converged to five decimal places — Newton's method roughly doubles the number of correct digits each step.</>,
  },
]

export default function MethodsQ13_2023() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The following algorithm applies Newton's method using a For loop with 3
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
            The Return value of the function{' '}
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
