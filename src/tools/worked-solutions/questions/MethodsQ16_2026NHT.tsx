// 2026 Mathematical Methods NHT — Exam 2, MCQ 16. The NHT report gives the answer key only, with
// no statistics; it prints a worked comment for this question (transcribed below from the rendered
// report). Functions: period of a product of trig functions after a sequence of transformations.
// Question text transcribed from the original paper. Solution is original; the answer B agrees with
// the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: (
    <>
      The period of <Katex tex="f(x)" /> is 12.
      <br />
      Of the 3 transformations, only the dilation by a factor of <Katex tex="\dfrac12" /> from the <i>y</i>-axis affects the period.
      <br />
      <Katex tex="\text{period}_h=\dfrac12\times 12" />
      <br />
      <Katex tex="\phantom{\text{period}_h}=6" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\cos\!\left(\tfrac{\pi}{6}x\right):\ \frac{2\pi}{\pi/6}=12,\qquad \sin\!\left(\tfrac{\pi}{3}x\right):\ \frac{2\pi}{\pi/3}=6" />,
    reason: <>Period of <Katex tex="\sin(kx)" /> or <Katex tex="\cos(kx)" /> is <Katex tex="\tfrac{2\pi}{k}" />.</>,
  },
  {
    working: <Katex display tex="\text{period of } f=12" />,
    reason: <>After 12 units both factors have completed whole cycles (one and two), so the product repeats. 12 is the smallest such length: <Katex tex="f(x+6)=\cos\!\left(\tfrac{\pi}{6}x+\pi\right)\sin\!\left(\tfrac{\pi}{3}x+2\pi\right)=-f(x)" />, so 6 doesn&apos;t work.</>,
  },
  {
    working: <Katex display tex="h(x)=2f\big(2(x-2)\big)" />,
    reason: <>Dilation by <Katex tex="\tfrac12" /> from the <i>y</i>-axis replaces <Katex tex="x" /> by <Katex tex="2x" />; dilation by 2 from the <i>x</i>-axis multiplies by 2; the translation replaces <Katex tex="x" /> by <Katex tex="x-2" />.</>,
  },
  {
    working: <Katex display tex="\text{period of } h=\tfrac12\times12=6" />,
    reason: <>Only the dilation from the <i>y</i>-axis changes horizontal lengths, and it halves them. Vertical stretching and sideways shifting leave the period alone.</>,
  },
  {
    working: <Katex display tex="\boxed{6}" />,
    reason: <>Matches option <b>B</b>. Option <b>C</b> is the period of <Katex tex="f" /> with the dilation forgotten; option <b>D</b> applies the dilation the wrong way (<Katex tex="12\times2" />); option <b>A</b> halves the period of the <Katex tex="\sin\!\left(\tfrac{\pi}{3}x\right)" /> factor alone.</>,
  },
]

export default function MethodsQ16_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Let <Katex tex="f:R\to R,\ f(x)=\cos\!\left(\dfrac{\pi}{6}x\right)\sin\!\left(\dfrac{\pi}{3}x\right)" />.
          </p>
          <p>
            Let <Katex tex="h:R\to R" /> be the result of applying the following sequence of transformations to <Katex tex="f" />:
          </p>
          <p>
            1. a dilation by a factor of <Katex tex="\dfrac12" /> from the <i>y</i>-axis
          </p>
          <p>
            2. a dilation by a factor of 2 from the <i>x</i>-axis
          </p>
          <p>
            3. a translation of 2 units in the positive direction of the <i>x</i>-axis
          </p>
          <p>
            The period of <Katex tex="h" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <>3</> },
        { letter: 'B', content: <>6</>, isAnswer: true },
        { letter: 'C', content: <>12</> },
        { letter: 'D', content: <>24</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
