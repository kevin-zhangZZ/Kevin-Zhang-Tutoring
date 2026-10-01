// 2022 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 66% correct.
// Euler's method run backwards to recover the step size. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 66, C: 13, D: 8, E: 6 },
  answer: 'B',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered} x_{n+1} = x_n + h, \qquad y_{n+1} = y_n + h\,f(x_n) \\ f(x) = 2x^2 \end{gathered}" />,
    reason: <>Euler's method from the formula sheet, with <Katex tex="f(x)" /> the right-hand side of the differential equation. Here <Katex tex="f" /> depends only on <Katex tex="x" />, so each step is easy to write down in terms of <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="y_1 = 2 + h\cdot2(1)^2 = 2+2h, \qquad x_1 = 1+h" />,
    reason: <>One step from <Katex tex="(x_0,y_0)=(1,2)" />, keeping <Katex tex="h" /> as an unknown.</>,
  },
  {
    working: <Katex display tex="y_2 = (2+2h)+h\cdot2(1+h)^2 = 2.976" />,
    reason: <>The second step uses the new <Katex tex="x" /> value, <Katex tex="x_1=1+h" />, not <Katex tex="x_0=1" />. (Re-using <Katex tex="x_0=1" /> gives <Katex tex="2+4h=2.976" />, so <Katex tex="h=0.244" />, which is not an option.)</>,
  },
  {
    working: <Katex display tex="2h^3+4h^2+4h+2 = 2.976" />,
    reason: <>Expanding <Katex tex="2h(1+h)^2=2h+4h^2+2h^3" /> and collecting like terms. This cubic can be solved on CAS with <Cas fn="solve">solve(2h^3+4h^2+4h+2=2.976, h)</Cas>, or you can test the options instead.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} y_2 &= 2+2(0.2)+2(0.2)(1.2)^2 \\ &= 2+0.4+0.576 = 2.976 \end{aligned}" />,
    reason: <>Testing <Katex tex="h=0.2" /> (option <b>B</b>) in the un-expanded line above. Only one value of <Katex tex="h" /> can work: for <Katex tex="h>0" /> every term of the cubic grows as <Katex tex="h" /> grows, so it reaches <Katex tex="2.976" /> exactly once.</>,
  },
  {
    working: <Katex display tex="\boxed{h = 0.2}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ9_2022() {
  return (
    <MCQShell
      question={
        <p>
          Euler's method is used to find an approximate solution to the differential equation{' '}
          <Katex tex="\dfrac{dy}{dx}=2x^2" />.
          <br />
          Given that <Katex tex="x_0=1" />,{' '}
          <Katex tex="y_0=2" /> and <Katex tex="y_2=2.976" />, the value of the step size{' '}
          <Katex tex="h" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.1" /> },
        { letter: 'B', content: <Katex tex="0.2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="0.3" /> },
        { letter: 'D', content: <Katex tex="0.4" /> },
        { letter: 'E', content: <Katex tex="0.5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
