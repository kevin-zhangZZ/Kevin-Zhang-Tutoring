// 2021 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 72% correct.
// Two steps of Euler's method. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 10, C: 72, D: 8, E: 5 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y_{n+1} = y_n+h\,f(x_n,y_n), \quad h = 0.1, \ f = y\sin(x)" />,
    reason: <>From <Katex tex="x=1" /> to <Katex tex="x=1.2" /> is <em>two</em> steps, not one — option A stops after the first.</>,
  },
  {
    working: <Katex display tex="y_1 = 2+0.1\times2\sin(1) = 2+0.168294 = 2.168294" />,
    reason: <><Katex tex="\sin(1)=0.841471" /> in radians.</>,
  },
  {
    working: <Katex display tex="y_2 = y_1+0.1\,y_1\sin(1.1)" />,
    reason: <>The second step uses the <em>updated</em> <Katex tex="y" /> and the new <Katex tex="x=1.1" />.</>,
  },
  {
    working: <Katex display tex="= 2.168294+0.1(2.168294)(0.891207) = 2.361534\ldots" />,
    reason: 'Carrying full precision through.',
  },
  {
    working: <Katex display tex="\boxed{2.362}" />,
    reason: <>To three decimal places. Matches option <b>C</b>. Options B and E come from using the gradient at the <em>end</em> of each step instead of the start; option A stops one step short.</>,
  },
]

export default function SpecialistQ8_2021() {
  return (
    <MCQShell
      question={
        <p>
          Euler's method, with a step size of 0.1, is used to approximate the solution of the
          differential equation <Katex tex="\dfrac{dy}{dx}=y\sin(x)" />. Given that{' '}
          <Katex tex="y=2" /> when <Katex tex="x=1" />, the value of <Katex tex="y" />,
          correct to three decimal places, when <Katex tex="x=1.2" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2.168" /> },
        { letter: 'B', content: <Katex tex="2.178" /> },
        { letter: 'C', content: <Katex tex="2.362" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="2.370" /> },
        { letter: 'E', content: <Katex tex="2.381" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
