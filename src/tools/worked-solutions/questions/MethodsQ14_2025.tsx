// 2025 Mathematical Methods — Exam 2, MCQ 14. VCAA examination report: 66% correct.
// A two-branch density whose total area fixes the constant. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 66, C: 17, D: 5 },
  answer: 'B',
  comment: (
    <>
      Solve <Katex tex="\displaystyle\int_{-\infty}^{\infty}f(x)\,dx=1" /> for <Katex tex="k" />.
      <br />
      <Katex tex="k=\dfrac{\sqrt{2}+2}{2}=\dfrac{1}{2-\sqrt{2}}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{\pi/4}k\sin(x)\,dx+\int_{\pi/4}^{\pi/2}k\cos(x)\,dx = 1" />,
    reason: <>Total area under a density is 1 — the only condition available.</>,
  },
  {
    working: <Katex display tex="k\bigl[-\cos(x)\bigr]_0^{\pi/4} = k\left(-\tfrac{\sqrt2}{2}+1\right)" />,
    reason: <>The first branch, using <Katex tex="\cos\!\left(\tfrac{\pi}{4}\right)=\tfrac{\sqrt2}{2}" />.</>,
  },
  {
    working: <Katex display tex="k\bigl[\sin(x)\bigr]_{\pi/4}^{\pi/2} = k\left(1-\tfrac{\sqrt2}{2}\right)" />,
    reason: <>The second branch gives exactly the same value — the two pieces are mirror images about x = π/4.</>,
  },
  {
    working: <Katex display tex="2k\left(1-\tfrac{\sqrt2}{2}\right) = k\left(2-\sqrt2\right) = 1" />,
    reason: <>Adding and simplifying.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac{1}{2-\sqrt2}}" />,
    reason: <>Matches option <b>B</b>; about <Katex tex="1.71" />. Rationalising gives the equivalent <Katex tex="\tfrac{2+\sqrt2}{2}" /> — note that option <b>D</b> is the <em>reciprocal</em>, which is what forgetting to invert produces.</>,
  },
]

export default function MethodsQ14_2025() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            Let <Katex tex="f" /> be the probability density function for a continuous random
            variable <Katex tex="X" />, where
          </p>
          <Katex
            display
            tex="f(x)=\begin{cases}k\sin(x) & 0\le x<\dfrac{\pi}{4}\\[6pt] k\cos(x) & \dfrac{\pi}{4}\le x\le\dfrac{\pi}{2}\\[6pt] 0 & \text{otherwise}\end{cases}"
          />
          <p>
            and <Katex tex="k" /> is a positive real number.
            <br />
            The value of <Katex tex="k" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\frac{1}{\sqrt2}" /> },
        { letter: 'B', content: <Katex tex="\frac{1}{2-\sqrt2}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\sqrt2+2" /> },
        { letter: 'D', content: <Katex tex="2-\sqrt2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
