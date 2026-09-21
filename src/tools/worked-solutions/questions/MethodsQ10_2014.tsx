// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 10. VCAA examination report: 66% correct.
// Which rule is its own inverse. Question text transcribed from the original paper; solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 10, C: 11, D: 6, E: 66 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(f(x)) = x \iff f \text{ is its own inverse}" />,
    reason: <>Applying <Katex tex="f" /> twice returns you to the start, so <Katex tex="f^{-1}=f" />. Geometrically, the graph is symmetric about <Katex tex="y=x" />.</>,
  },
  {
    working: <Katex display tex="\text{E: } f(x) = 2-x \implies f(f(x)) = 2-(2-x)" />,
    reason: <>Substituting <Katex tex="2-x" /> wherever <Katex tex="x" /> appears.</>,
  },
  {
    working: <Katex display tex="= 2-2+x = x \ \checkmark" />,
    reason: <>So option E works for every real <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\text{A: } f(f(x)) = 2(2x) = 4x, \qquad \text{D: } f(f(x)) = (x-2)-2 = x-4" />,
    reason: <>Neither returns <Katex tex="x" />. Both are one-to-one, but their inverses (<Katex tex="\tfrac x2" /> and <Katex tex="x+2" />) are not themselves.</>,
  },
  {
    working: <Katex display tex="\text{B: } f(f(x)) = \left(x^2\right)^2 = x^4, \qquad \text{C: } f(f(x)) = 2^{\left(2^x\right)}" />,
    reason: <>Also not <Katex tex="x" />; <Katex tex="x^2" /> is not even one-to-one on <Katex tex="R" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = 2-x}" />,
    reason: <>Option E — a reflection, and reflecting twice puts everything back.</>,
  },
]

export default function MethodsQ10_2014() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following functions satisfies the functional equation{' '}
          <Katex tex="f\bigl(f(x)\bigr)=x" /> for every real number <Katex tex="x" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=2x" /> },
        { letter: 'B', content: <Katex tex="f(x)=x^2" /> },
        { letter: 'C', content: <Katex tex="f(x)=2^x" /> },
        { letter: 'D', content: <Katex tex="f(x)=x-2" /> },
        { letter: 'E', content: <Katex tex="f(x)=2-x" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
