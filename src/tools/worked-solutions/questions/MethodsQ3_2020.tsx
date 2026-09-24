// 2020 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 86% correct.
// Antidifferentiating a derivative and pinning the constant. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 5, C: 86, D: 2, E: 0 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{2}{\sqrt{2x-3}} = 2(2x-3)^{-1/2}" />,
    reason: <>Index form makes the antiderivative mechanical.</>,
  },
  {
    working: <Katex display tex="f(x) = 2\times\frac{(2x-3)^{1/2}}{\tfrac12\times2}+c = 2\sqrt{2x-3}+c" />,
    reason: <>Raise the index by one, divide by the new index <em>and</em> by the coefficient of <Katex tex="x" /> inside. Here both factors of 2 cancel.</>,
  },
  {
    working: <Katex display tex="f(6) = 2\sqrt{12-3}+c = 2(3)+c = 6+c" />,
    reason: <><Katex tex="\sqrt9=3" />.</>,
  },
  {
    working: <Katex display tex="6+c = 4 \implies c = -2" />,
    reason: <>Using the given value.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = 2\sqrt{2x-3}-2}" />,
    reason: <>Matches option <b>C</b>. Option <b>A</b> omits the constant (it gives <Katex tex="f(6)=6" />); options <b>B</b>, <b>D</b> and <b>E</b> have lost the factor of <Katex tex="2" />, and none of them gives <Katex tex="f(6)=4" />.</>,
  },
]

export default function MethodsQ3_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f'(x)=\dfrac{2}{\sqrt{2x-3}}" />.
          </p>
          <p>If <Katex tex="f(6)=4" />, then</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=2\sqrt{2x-3}" /> },
        { letter: 'B', content: <Katex tex="f(x)=\sqrt{2x-3}-2" /> },
        { letter: 'C', content: <Katex tex="f(x)=2\sqrt{2x-3}-2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="f(x)=\sqrt{2x-3}+2" /> },
        { letter: 'E', content: <Katex tex="f(x)=\sqrt{2x-3}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
