// 2023 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 52% correct.
// Three steps of Newton's method, read out of pseudocode. Question text transcribed from the original paper.
// Solution is original.
// Oct 2026 Concise/Detailed pass (no widget: 52% correct, not a qualifying part): row 1 reason trimmed to the
// three-pass count; tangent meaning, loop trace and the division-by-zero guard moved to its `more`; option
// analysis moved to the last row's `more`. Iterates re-checked in sympy.

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
    reason: <>The line <Katex tex="x_0 \leftarrow x_0-f(x_0)\div df(x_0)" /> is Newton&apos;s method; the arrow means &quot;replace <Katex tex="x_0" /> with&quot;. <b>For i from 1 to 3</b> runs it three times, starting from <Katex tex="x_0=1" />, so the output is the third new estimate, <Katex tex="x_3" />.</>,
    more: (
      <>
        <b>Why this formula:</b> <Katex tex="x_{n+1}" /> is where the tangent to <Katex tex="y=f(x)" /> at{' '}
        <Katex tex="x=x_n" /> crosses the <Katex tex="x" />-axis. That tangent has gradient <Katex tex="f'(x_n)" />, so it
        reaches the axis a horizontal distance <Katex tex="\tfrac{f(x_n)}{f'(x_n)}" /> from <Katex tex="x_n" />.{' '}
        <b>Tracing the loop:</b> <Katex tex="i=1" /> turns <Katex tex="1" /> into <Katex tex="x_1" />,{' '}
        <Katex tex="i=2" /> turns <Katex tex="x_1" /> into <Katex tex="x_2" />, and <Katex tex="i=3" /> turns{' '}
        <Katex tex="x_2" /> into <Katex tex="x_3" />; then <b>Return x0</b> hands back <Katex tex="x_3" />. The starting
        value is an input, not one of the three iterations. The <b>If</b> line only guards against dividing by zero, and
        never triggers here because <Katex tex="f'(x)=3x^2+3\ge3" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x_1 = 1-\frac{f(1)}{f'(1)} = 1-\frac{1}{6} = 0.83333" />,
    reason: <>First pass, from <Katex tex="x_0=1" />: <Katex tex="f(1)=1+3-3=1" /> and <Katex tex="f'(1)=6" />. On CAS, <Cas fn="define">Define f(x)=x^3+3x-3</Cas> and <Cas fn="define">Define df(x)=3x^2+3</Cas>, so each pass is one line.</>,
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
    reason: <>Matches option <b>C</b>, the estimate after exactly three passes.</>,
    more: (
      <>
        Option <b>A</b> is the estimate after one pass and <b>B</b>, the most popular wrong answer, after two (the
        starting value counted as an iteration). <b>D</b> is the starting value with no passes at all, and <b>E</b>,{' '}
        <Katex tex="3" />, is the number of passes, not an estimate of the root. <b>B</b> and <b>C</b> agree to three decimal places
        (<Katex tex="0.818" />), so only counting exactly three passes, and keeping five decimal places, tells them apart.
      </>
    ),
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
