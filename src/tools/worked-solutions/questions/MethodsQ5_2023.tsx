// 2023 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 62% correct.
// Which fractional power leaves a derivative that is zero rather than undefined at the origin. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 16, C: 8, D: 62, E: 4 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = x^{p} \implies \frac{dy}{dx} = p\,x^{p-1}" />,
    reason: <>A horizontal tangent at the origin needs <Katex tex="\tfrac{dy}{dx}=0" /> there, which happens only when the new index <Katex tex="p-1" /> is positive.</>,
  },
  {
    working: <Katex display tex="p = -\tfrac13: \ \tfrac{dy}{dx} \propto x^{-4/3} \ \text{(undefined, and } (0,0) \text{ is not on the curve)}" />,
    reason: <>Option <b>A</b> is out twice over — <Katex tex="0^{-1/3}" /> does not even exist.</>,
  },
  {
    working: <Katex display tex="p = \tfrac13: \ \tfrac{dy}{dx} \propto x^{-2/3} \to \infty; \qquad p = \tfrac23: \ \tfrac{dy}{dx} \propto x^{-1/3}" />,
    reason: <>Options <b>B</b> and <b>C</b> give a vertical tangent and a cusp respectively — steep, not flat.</>,
  },
  {
    working: <Katex display tex="p = \tfrac34: \ \tfrac{dy}{dx} = \tfrac34x^{-1/4} \to \infty \text{ as } x\to0^+" />,
    reason: <>Option <b>E</b>: also vertical. (And it is only defined for <Katex tex="x\ge0" />.)</>,
  },
  {
    working: <Katex display tex="p = \tfrac43: \ \tfrac{dy}{dx} = \tfrac43x^{1/3} \implies \tfrac{dy}{dx}\big|_{x=0} = 0" />,
    reason: <>A positive index, so the derivative is defined and zero at the origin.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x^{4/3}}" />,
    reason: <>Matches option <b>D</b>, and <Katex tex="0^{4/3}=0" /> puts the origin on the curve. The rule of thumb: <Katex tex="x^p" /> is flat at the origin exactly when <Katex tex="p>1" />.</>,
  },
]

export default function MethodsQ5_2023() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following functions has a horizontal tangent at{' '}
          <Katex tex="(0,0)" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=x^{-\frac13}" /> },
        { letter: 'B', content: <Katex tex="y=x^{\frac13}" /> },
        { letter: 'C', content: <Katex tex="y=x^{\frac23}" /> },
        { letter: 'D', content: <Katex tex="y=x^{\frac43}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="y=x^{\frac34}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
