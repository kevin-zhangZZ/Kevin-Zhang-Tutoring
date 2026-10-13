// 2014 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 77% correct.
// One step of Euler’s method. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 3, C: 8, D: 77, E: 6 },
  answer: 'D',
  noAnswer: 0,
  comment: <><Katex tex="y_1 = 2+0.1\times\left(1^3-1\times2\right)" /></>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y_{n+1} = y_n + h\,f(x_n,y_n)" />,
    reason: <>Euler's method, where <Katex tex="f(x,y)" /> is the given <Katex tex="\tfrac{dy}{dx}=x^3-xy" />: step along the tangent line at the current point.</>,
  },
  {
    working: <Katex display tex="x_0 = 1,\quad y_0 = 2,\quad h = 0.1" />,
    reason: <>From <Katex tex="y=2" /> when <Katex tex="x=1" />, and the given step size. One step takes <Katex tex="x" /> from 1 to 1.1.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx}\Big|_{(1,2)} = 1^3-(1)(2) = -1" />,
    reason: <>The gradient <Katex tex="f(x_0,y_0)" /> at the starting point. It is <em>negative</em>, so the estimate must come out below 2.</>,
  },
  {
    working: <Katex display tex="y_1 = 2+0.1\times(-1)" />,
    reason: <>One step of the formula: new <Katex tex="y" /> = old <Katex tex="y" /> + step size × gradient.</>,
  },
  {
    working: <Katex display tex="\boxed{y \approx 1.9}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option C (1.1, the most common wrong answer) is <Katex tex="x_1" />, not <Katex tex="y_1" /> — the question asks for the value of <Katex tex="y" />. Option E (2.1) has the sign of the gradient wrong: <Katex tex="2+0.1\times1" />; with a negative gradient the estimate must be below 2. Option B (1.0) forgets to multiply by the step size: <Katex tex="2+(-1)" />. Option A (0.9) steps from <Katex tex="x_0=1" /> instead of from <Katex tex="y_0=2" />: <Katex tex="1+0.1\times(-1)" />.</>,
  },
]

export default function SpecialistQ11_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="\dfrac{dy}{dx}=x^3-xy" /> and <Katex tex="y=2" /> when{' '}
            <Katex tex="x=1" />.
          </p>
          <p>
            Using Euler's method with a step size of 0.1, the approximation to{' '}
            <Katex tex="y" /> when <Katex tex="x=1.1" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.9" /> },
        { letter: 'B', content: <Katex tex="1.0" /> },
        { letter: 'C', content: <Katex tex="1.1" /> },
        { letter: 'D', content: <Katex tex="1.9" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="2.1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
