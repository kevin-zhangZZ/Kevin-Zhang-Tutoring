// 2024 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 72% correct.
// A product-to-sum identity is what makes the equation separable. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 15, C: 72, D: 6 },
  answer: 'C',
  comment: (
    <>
      <Katex tex="\cos(x-y)-\cos(x+y)" />
      <br />
      <Katex tex="=\big(\cos(x)\cos(y)+\sin(x)\sin(y)\big)-\big(\cos(x)\cos(y)-\sin(x)\sin(y)\big)" />
      <br />
      <Katex tex="=2\sin(x)\sin(y)" />
      <br />
      <Katex tex="\dfrac{dy}{dx}=e^{x-y}\big(\cos(x-y)-\cos(x+y)\big)" />
      <br />
      <Katex tex="=e^{x-y}\times2\sin(x)\sin(y)" />
      <br />
      <Katex tex="=\big(2e^x\sin(x)\big)\left(\dfrac{\sin(y)}{e^y}\right)" />
      <br />
      <Katex tex="\displaystyle\int\frac{e^y}{\sin(y)}\,dy=\int2e^x\sin(x)\,dx" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(x-y)-\cos(x+y) = 2\sin(x)\sin(y)" />,
    reason: <>Every option separates <Katex tex="x" /> from <Katex tex="y" />, so the bracket must become a product. Expand both with the compound-angle formulas: the <Katex tex="\cos(x)\cos(y)" /> terms cancel and the <Katex tex="\sin(x)\sin(y)" /> terms double.</>,
    more: <>The formulas are <Katex tex="\cos(x-y)=\cos(x)\cos(y)+\sin(x)\sin(y)" /> and <Katex tex="\cos(x+y)=\cos(x)\cos(y)-\sin(x)\sin(y)" />.</>,
  },
  {
    working: <Katex display tex="e^{x-y} = e^x e^{-y}" />,
    reason: <>Split the exponential with index laws, so it too becomes an <Katex tex="x" />-factor times a <Katex tex="y" />-factor.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 2e^x e^{-y}\sin(x)\sin(y)" />,
    reason: <>Now every factor belongs to one variable or the other.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{e^{-y}\sin(y)} = 2e^x\sin(x)\,dx" />,
    reason: <>Separate: divide both sides by the <Katex tex="y" />-factors <Katex tex="e^{-y}\sin(y)" />, keeping the <Katex tex="x" />-factors on the right.</>,
    more: <>Dividing by <Katex tex="\sin(y)" /> assumes <Katex tex="\sin(y)\ne0" />. The constant solutions <Katex tex="y=n\pi" /> (where <Katex tex="\tfrac{dy}{dx}=0" />) are lost this way, but none of the options is affected.</>,
  },
  {
    working: <Katex display tex="\boxed{\int\frac{e^{y}}{\sin(y)}\,dy = 2\int e^x\sin(x)\,dx}" />,
    reason: <>Matches option <b>C</b>, since <Katex tex="\tfrac{1}{e^{-y}}=e^{y}" />.</>,
    more: <>Option <b>B</b>, the most common wrong answer, has the correct <Katex tex="y" /> side but <Katex tex="e^{-x}" /> on the right: the <Katex tex="x" />-part of <Katex tex="e^{x-y}" /> is <Katex tex="e^{+x}" />. Option <b>A</b> uses <Katex tex="\cos" /> where the identity gives <Katex tex="\sin" />, and has <Katex tex="\cos(y)" /> multiplying instead of dividing. Option <b>D</b> multiplies by the <Katex tex="y" />-factors instead of dividing by them, and puts <Katex tex="\cos(x)" /> in a denominator.</>,
  },
]

export default function SpecialistQ7_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>A solution to the differential equation</p>
          <p>
            <Katex tex="\dfrac{dy}{dx} = e^{x-y}\bigl(\cos(x-y)-\cos(x+y)\bigr)" /> can be found using
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="\int e^{y}\cos(y)\,dy = 2\int e^x\cos(x)\,dx" /> },
        { letter: 'B', content: <Katex tex="\int \frac{e^{y}}{\sin(y)}\,dy = 2\int e^{-x}\sin(x)\,dx" /> },
        { letter: 'C', content: <Katex tex="\int \frac{e^{y}}{\sin(y)}\,dy = 2\int e^{x}\sin(x)\,dx" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\int e^{-y}\sin(y)\,dy = 2\int \frac{e^{x}}{\cos(x)}\,dx" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
