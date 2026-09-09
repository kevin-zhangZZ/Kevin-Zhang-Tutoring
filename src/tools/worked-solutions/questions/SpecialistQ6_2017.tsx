// 2017 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 46% correct.
// Second derivative of an implicitly-defined function at a point, via the product and chain rules.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 46, C: 10, D: 30, E: 8 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\dfrac{d^2y}{dx^2} = \dfrac{d}{dx}\bigl(e^x\arctan(y)\bigr) = e^x\arctan(y) + \dfrac{e^x}{1+y^2}\dfrac{dy}{dx}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{dy}{dx} = e^x\arctan(y)" />,
    reason: 'The given first-order relation — already implicit, since y appears on the right too.',
  },
  {
    working: (
      <>
        <Katex display tex="\frac{d^2y}{dx^2} = \frac{d}{dx}\Bigl(e^x\arctan(y)\Bigr)" />
        <Katex display tex="= e^x\arctan(y) + e^x\cdot\frac{1}{1+y^2}\cdot\frac{dy}{dx}" />
      </>
    ),
    reason: <>Product rule on <Katex tex="e^x\arctan(y)" />, with the chain rule applied to <Katex tex="\arctan(y)" /> since <Katex tex="y" /> is itself a function of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\text{at } (0,1): \quad \frac{dy}{dx} = e^0\arctan(1) = \frac{\pi}{4}" />,
    reason: 'First evaluate the given first-derivative expression at the point, since it feeds into the second derivative.',
  },
  {
    working: (
      <>
        <Katex display tex="\frac{d^2y}{dx^2}\bigg|_{(0,1)} = e^0\arctan(1) + \frac{e^0}{1+1^2}\cdot\frac{\pi}{4}" />
        <Katex display tex="= \frac{\pi}{4} + \frac{1}{2}\cdot\frac{\pi}{4} = \frac{\pi}{4}+\frac{\pi}{8}" />
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{d^2y}{dx^2}\bigg|_{(0,1)} = \frac{3\pi}{8}}" />,
    reason: <>Matches option <b>B</b>.</>,
  },
]

export default function SpecialistQ6_2017() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="\dfrac{dy}{dx} = e^x\arctan(y)" />, the value of <Katex tex="\dfrac{d^2y}{dx^2}" />{' '}
          at the point <Katex tex="(0,1)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac12" /> },
        { letter: 'B', content: <Katex tex="\dfrac{3\pi}{8}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="-\dfrac12" /> },
        { letter: 'D', content: <Katex tex="\dfrac{\pi}{4}" /> },
        { letter: 'E', content: <Katex tex="-\dfrac{\pi}{8}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
