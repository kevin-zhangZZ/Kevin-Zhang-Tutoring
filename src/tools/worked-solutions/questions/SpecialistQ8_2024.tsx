// 2024 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 60% correct.
// Three Euler steps, then solve backwards for the step size. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
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
    reason: <>Euler's method: new <Katex tex="y" /> = old <Katex tex="y" /> + step × gradient, with the gradient <Katex tex="xy^2" /> worked out at the current point <Katex tex="(x_n,y_n)" />.</>,
    more: <>Each step uses the gradient at the <em>start</em> of the step. Starting from <Katex tex="x_0=0" />, <Katex tex="y_0=1" />, the <Katex tex="x" />-values go up by <Katex tex="h" /> each time: <Katex tex="x_1=h" />, <Katex tex="x_2=2h" />. Reaching <Katex tex="y_3" /> takes three steps, using the gradients at <Katex tex="x_0" />, <Katex tex="x_1" /> and <Katex tex="x_2" />.</>,
  },
  {
    working: <Katex display tex="y_1 = 1+h(0)(1)^2 = 1" />,
    reason: <>The first step does nothing, because <Katex tex="x_0=0" /> makes the gradient zero.</>,
  },
  {
    working: <Katex display tex="y_2 = 1+h(h)(1)^2 = 1+h^2" />,
    reason: <>Gradient at <Katex tex="(x_1,y_1)=(h,1)" />.</>,
  },
  {
    working: <Katex display tex="y_3 = \left(1+h^2\right)+h(2h)\left(1+h^2\right)^2" />,
    reason: <>Gradient at <Katex tex="(x_2,y_2)=\left(2h,1+h^2\right)" />. This is <Katex tex="y_3" /> in terms of <Katex tex="h" />, and it must equal <Katex tex="1.126528" />. Solve this equation for <Katex tex="h>0" /> with <Cas fn="solve" />, or test an option as in the next line.</>,
    more: <>Expanded, <Katex tex="y_3=1+3h^2+4h^4+2h^6" /> (the report's form), a degree-6 equation, so solving it by hand is not practical. CAS gives <Katex tex="h=0.2" /> directly; in a multiple-choice question, substituting an option is just as quick.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} h=0.2 &\implies h^2=0.04 \\ y_3 &= 1.04+2(0.04)(1.04)^2 \\ &= 1.04+0.086528 \\ &= 1.126528 \end{aligned}" />,
    reason: <>For small <Katex tex="h" />, <Katex tex="(1+h^2)^2\approx1" />, so <Katex tex="y_3\approx1+3h^2" />. Then <Katex tex="3h^2\approx0.127" /> gives <Katex tex="h^2\approx0.04" />: test <Katex tex="h=0.2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h = 0.20}" />,
    reason: <>Matches option <b>C</b>: it gives <Katex tex="1.126528" /> exactly.</>,
    more: <>The other options, run through the same three steps: <b>A</b> (<Katex tex="h=0.01" />) gives <Katex tex="y_3\approx1.0003" /> and <b>B</b> (<Katex tex="h=0.02" />, the most common wrong answer) gives <Katex tex="y_3\approx1.0012" />. Each step adds a multiple of <Katex tex="h^2" />, which is tiny for small <Katex tex="h" />, so neither gets near <Katex tex="1.13" />. <b>D</b> (<Katex tex="h=0.36" />) overshoots to <Katex tex="y_3\approx1.460" />.</>,
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
