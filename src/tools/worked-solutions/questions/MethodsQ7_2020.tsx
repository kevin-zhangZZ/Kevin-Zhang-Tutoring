// 2020 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 70% correct.
// A double chain rule through an unknown inner function. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 10, C: 70, D: 11, E: 4 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = e^{g(x^2)}" />,
    reason: <>Three layers: the exponential, then <Katex tex="g" />, then <Katex tex="x^2" />. The chain rule peels them off one at a time.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}e^{u} = e^{u}\cdot\frac{du}{dx}, \quad u = g\!\left(x^2\right)" />,
    reason: <>The outermost layer. The exponential reappears unchanged.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}g\!\left(x^2\right) = g'\!\left(x^2\right)\times2x" />,
    reason: <>The middle layer: <Katex tex="g" /> becomes <Katex tex="g'" /> evaluated at the <em>same</em> input <Katex tex="x^2" />, times the derivative of that input.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = 2xg'\!\left(x^2\right)e^{g\left(x^2\right)}}" />,
    reason: <>Option C. Option B drops the prime on <Katex tex="g" />; option D evaluates <Katex tex="g'" /> at <Katex tex="2x" /> instead of <Katex tex="x^2" />; option E puts the <Katex tex="2x" /> inside the exponential's index.</>,
  },
]

export default function MethodsQ7_2020() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="f(x)=e^{g\left(x^2\right)}" />, where <Katex tex="g" /> is a
          differentiable function, then <Katex tex="f'(x)" /> is equal to
        </p>
      }
      background={
        <p>
          Four of the five options are the correct shape with one detail altered, so the
          value is in naming the layers before differentiating: where the prime goes, and
          what each function is evaluated at.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2xe^{g\left(x^2\right)}" /> },
        { letter: 'B', content: <Katex tex="2xg\!\left(x^2\right)e^{g\left(x^2\right)}" /> },
        { letter: 'C', content: <Katex tex="2xg'\!\left(x^2\right)e^{g\left(x^2\right)}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="2xg'(2x)e^{g\left(x^2\right)}" /> },
        { letter: 'E', content: <Katex tex="2xg'\!\left(x^2\right)e^{g(2x)}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
