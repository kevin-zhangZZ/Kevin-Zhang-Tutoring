// 2024 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 60% correct.
// Three Euler steps, then solve backwards for the step size. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 23, C: 60, D: 9 },
  answer: 'C',
  comment: (
    <>
      <Katex tex="x_{n+1}=x_n+h \qquad y_{n+1}=y_n+hx_ny_n^{\,2}" />
      <br />
      <Katex tex="x_0=0, \qquad y_0=1" />
      <br />
      <Katex tex="x_1=h, \qquad y_1=1+h\cdot0\cdot1^2=1" />
      <br />
      <Katex tex="x_2=2h, \qquad y_2=1+h\cdot h\cdot1^2=1+h^2" />
      <br />
      <Katex tex="x_3=3h, \qquad y_3=1+h^2+h\cdot2h\cdot\left(1+h^2\right)^2" />
      <br />
      <Katex tex="=1+h^2+2h^2\left(1+2h^2+h^4\right)=1+3h^2+4h^4+2h^6" />
      <br />
      Solve <Katex tex="1+3h^2+4h^4+2h^6=1.126528" /> for <Katex tex="h>0" />
      <br />
      <Katex tex="h=0.2" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y_{n+1} = y_n+h\,x_n y_n^2, \qquad x_{n+1} = x_n+h" />,
    reason: <>The Euler step for <Katex tex="\tfrac{dy}{dx}=xy^2" />.</>,
  },
  {
    working: <Katex display tex="y_1 = 1+h(0)(1)^2 = 1" />,
    reason: <>The first step does nothing, because <Katex tex="x_0=0" /> makes the gradient zero.</>,
  },
  {
    working: <Katex display tex="y_2 = 1+h(h)(1)^2 = 1+h^2" />,
    reason: <>Now <Katex tex="x_1 = h" />.</>,
  },
  {
    working: <Katex display tex="y_3 = \left(1+h^2\right)+h(2h)\left(1+h^2\right)^2" />,
    reason: <>With <Katex tex="x_2=2h" />. Solving this quartic for <Katex tex="h" /> directly is possible, but testing the four options is far faster.</>,
  },
  {
    working: <Katex display tex="h=0.2: \quad 1.04+2(0.04)(1.04)^2 = 1.04+0.086528" />,
    reason: <>A single substitution settles it.</>,
  },
  {
    working: <Katex display tex="\boxed{h = 0.20}" />,
    reason: <>Matches option <b>C</b>: <Katex tex="1.126528" /> exactly. The smaller steps <Katex tex="0.01" /> and <Katex tex="0.02" /> barely move <Katex tex="y" /> from 1 at all, so the two leading digits of the target already rule them out.</>,
  },
]

export default function SpecialistQ8_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            Consider the differential equation <Katex tex="\dfrac{dy}{dx}=xy^2" /> where{' '}
            <Katex tex="y_0=y(0)=1" />.
          </p>
          <p>
            When Euler’s method is applied using a step size of <Katex tex="h" />, where{' '}
            <Katex tex="h>0" />, <Katex tex="y_3=1.126528" />
          </p>
          <p>
            The value of <Katex tex="h" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.01" /> },
        { letter: 'B', content: <Katex tex="0.02" /> },
        { letter: 'C', content: <Katex tex="0.20" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.36" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
