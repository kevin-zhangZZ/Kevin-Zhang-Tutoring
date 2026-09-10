// 2019 Specialist Mathematics — Exam 2, MCQ 16. VCAA examination report: 49% correct.
// Acceleration of a particle from a = v dv/dx, given v as a function of position x. Question
// text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 49, B: 16, C: 26, D: 6, E: 2 },
  answer: 'A',
  noAnswer: 1,
  comment: <>Use <Katex tex="a=v\dfrac{dv}{dx}" />. Note that option C is <Katex tex="\dfrac{dv}{dx}" />, not <Katex tex="a" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="v = e^x\sin(x)" />,
    reason: 'Velocity as a function of position.',
  },
  {
    working: <Katex display tex="\frac{dv}{dx} = e^x\sin(x) + e^x\cos(x) = e^x\big(\sin(x)+\cos(x)\big)" />,
    reason: 'Product rule.',
  },
  {
    working: <Katex display tex="a = v\frac{dv}{dx} = e^x\sin(x)\cdot e^x\big(\sin(x)+\cos(x)\big)" />,
    reason: <>Chain rule for motion described in terms of position: <Katex tex="a=v\,dv/dx" />, not <Katex tex="dv/dt" /> directly.</>,
  },
  {
    working: <Katex display tex="a = e^{2x}\Big(\sin^2(x) + \sin(x)\cos(x)\Big)" />,
    reason: 'Multiply out and combine the exponentials.',
  },
  {
    working: <Katex display tex="\boxed{a = e^{2x}\left(\sin^2(x) + \tfrac12\sin(2x)\right)}" />,
    reason: <>Rewrite <Katex tex="\sin(x)\cos(x)" /> as <Katex tex="\tfrac12\sin(2x)" /> — matches option <b>A</b>.</>,
  },
]

export default function SpecialistQ16_2019() {
  return (
    <MCQShell
      question={
        <p>
          A variable force acts on a particle, causing it to move in a straight line. At time <Katex tex="t" /> seconds,
          where <Katex tex="t\geq0" />, its velocity <Katex tex="v" /> metres per second and position <Katex tex="x" />{' '}
          metres from the origin are such that <Katex tex="v = e^x\sin(x)" />.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="e^{2x}\left(\sin^2(x) + \tfrac12\sin(2x)\right)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="e^x\sin(x)\big(\sin(x)+\cos(x)\big)" /> },
        { letter: 'C', content: <Katex tex="e^x\big(\sin(x)+\cos(x)\big)" /> },
        { letter: 'D', content: <Katex tex="\tfrac12 e^{2x}\sin^2(x)" /> },
        { letter: 'E', content: <Katex tex="e^x\cos(x)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
