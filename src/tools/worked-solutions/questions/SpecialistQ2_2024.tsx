// 2024 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 48% correct.
// A hybrid whose rational branch cancels to a line, patched at the hole. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 48, B: 10, C: 4, D: 37 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+3x-10 = (x+5)(x-2)" />,
    reason: <>The numerator shares the factor <Katex tex="x-2" /> with the denominator, so there is no asymptote at <Katex tex="x=2" /> — only a possible hole.</>,
  },
  {
    working: <Katex display tex="\frac{(x+5)(x-2)}{x-2} = x+5 \quad (x\ne2)" />,
    reason: 'Away from 2, the function is simply a straight line.',
  },
  {
    working: <Katex display tex="\lim_{x\to2}f(x) = 2+5 = 7" />,
    reason: 'The hole in the line sits at height 7.',
  },
  {
    working: <Katex display tex="f(2) = 7 = \lim_{x\to2}f(x)" />,
    reason: <>The second branch of the hybrid plugs the hole with exactly the right value, so <Katex tex="f" /> is continuous everywhere.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{the function } f \text{ is continuous}}" />,
    reason: <>Option <b>A</b>. Option <b>D</b> (a point of discontinuity), chosen by 37%, would be right if <Katex tex="f(2)" /> were any value other than 7. The graph is a line, so there is no asymptote of either kind — ruling out <b>B</b> and <b>C</b>.</>,
  },
]

export default function SpecialistQ2_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Consider the function <Katex tex="f" /> with rule
          </p>
          <Katex
            display
            tex="f(x)=\begin{cases}\dfrac{x^2+3x-10}{x-2} & x\in\mathbb{R}\setminus\{2\}\\[8pt] 7 & x=2\end{cases}"
          />
          <p>Which of the following statements is correct?</p>
        </div>
      }
      options={[
        { letter: 'A', content: <>The function <Katex tex="f" /> is continuous.</>, isAnswer: true },
        { letter: 'B', content: <>The graph of <Katex tex="y=f(x)" /> has a vertical asymptote.</> },
        { letter: 'C', content: <>The graph of <Katex tex="y=f(x)" /> has a horizontal asymptote.</> },
        { letter: 'D', content: <>The graph of <Katex tex="y=f(x)" /> has a point of discontinuity.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
