// 2015 Specialist Mathematics — Exam 2, MCQ 14. VCAA examination report: 76% correct.
// Verifying which second-order differential equation y = x sin(x) satisfies. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 4, C: 8, D: 9, E: 76 },
  answer: 'E',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="\tfrac{d^2y}{dx^2}=-x\sin(x)+2\cos(x)" />, therefore option E was correct.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = x\sin(x)" />,
    reason: <>Four of the five options use <Katex tex="\tfrac{d^2y}{dx^2}+y" /> (B uses <Katex tex="x\tfrac{d^2y}{dx^2}+y" />), so find <Katex tex="\tfrac{d^2y}{dx^2}" /> and substitute.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \sin(x)+x\cos(x)" />,
    reason: <>Product rule: <Katex tex="\tfrac{d}{dx}(uv)=u'v+uv'" /> with <Katex tex="u=x" />, <Katex tex="v=\sin(x)" />.</>,
  },
  {
    working: <Katex display tex="\frac{d^2y}{dx^2} = \cos(x)+\bigl(\cos(x)-x\sin(x)\bigr)" />,
    reason: <>Product rule again on <Katex tex="x\cos(x)" />; the derivative of <Katex tex="\sin(x)" /> supplies the first <Katex tex="\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="\frac{d^2y}{dx^2} = 2\cos(x)-x\sin(x)" />,
    reason: <>The two <Katex tex="\cos(x)" /> terms combine — this is where the factor of 2 in the answer comes from.</>,
  },
  {
    working: <Katex display tex="\frac{d^2y}{dx^2}+y = 2\cos(x)-x\sin(x)+x\sin(x)" />,
    reason: <>Adding <Katex tex="y=x\sin(x)" /> — the <Katex tex="x\sin(x)" /> terms cancel, leaving only the cosine term.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{d^2y}{dx^2}+y = 2\cos(x)}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Checking the others: A, <Katex tex="\tfrac{d^2y}{dx^2}+y=0" />, is satisfied by <Katex tex="\sin(x)" /> and <Katex tex="\cos(x)" />, but the extra factor of <Katex tex="x" /> leaves the <Katex tex="2\cos(x)" /> behind. B gives <Katex tex="x\bigl(2\cos(x)-x\sin(x)\bigr)+x\sin(x)" />, which is not zero. C and D have the wrong right-hand side; D, the most common wrong answer, has the right size but the wrong sign — the first <Katex tex="\cos(x)" /> comes from differentiating <Katex tex="\sin(x)" />, the second from <Katex tex="\tfrac{d}{dx}(x)\cdot\cos(x)" />; both are <Katex tex="+\cos(x)" />, so the total is <Katex tex="+2\cos(x)" />, not <Katex tex="-2\cos(x)" />.</>,
  },
]

export default function SpecialistQ14_2015() {
  return (
    <MCQShell
      question={
        <p>
          A differential equation that has <Katex tex="y=x\sin(x)" /> as a solution is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{d^2y}{dx^2}+y = 0" /> },
        { letter: 'B', content: <Katex tex="x\tfrac{d^2y}{dx^2}+y = 0" /> },
        { letter: 'C', content: <Katex tex="\tfrac{d^2y}{dx^2}+y = -\sin(x)" /> },
        { letter: 'D', content: <Katex tex="\tfrac{d^2y}{dx^2}+y = -2\cos(x)" /> },
        { letter: 'E', content: <Katex tex="\tfrac{d^2y}{dx^2}+y = 2\cos(x)" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
