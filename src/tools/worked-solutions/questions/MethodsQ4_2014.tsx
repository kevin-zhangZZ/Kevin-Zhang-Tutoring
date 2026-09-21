// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 4. VCAA examination report: 65% correct.
// Classifying a stationary point from the sign of the derivative either side. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 20, C: 4, D: 2, E: 65 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(5) = 0" />,
    reason: <>So <Katex tex="x=5" /> is a stationary point — options C and D are out immediately, since the gradient there is zero, not <Katex tex="\pm5" />.</>,
  },
  {
    working: <Katex display tex="f'(x) < 0 \text{ for all } x \ne 5" />,
    reason: <>The derivative is negative on <em>both</em> sides, so the function is decreasing before <Katex tex="x=5" /> and still decreasing after it.</>,
  },
  {
    working: <Katex display tex="\text{no sign change in } f'" />,
    reason: <>A local minimum needs <Katex tex="f'" /> to go from negative to positive, a local maximum from positive to negative. Neither happens.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{stationary point of inflection}}" />,
    reason: <>Option E: a flat spot on an otherwise decreasing curve. <Katex tex="f(x)=-(x-5)^3" /> is the standard example.</>,
  },
]

export default function MethodsQ4_2014() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f" /> be a function with domain <Katex tex="R" /> such that{' '}
            <Katex tex="f'(5)=0" /> and <Katex tex="f'(x)<0" /> when <Katex tex="x\ne5" />.
          </p>
          <p>At <Katex tex="x=5" />, the graph of <Katex tex="f" /> has a</p>
        </>
      }
      options={[
        { letter: 'A', content: <>local minimum.</> },
        { letter: 'B', content: <>local maximum.</> },
        { letter: 'C', content: <>gradient of 5.</> },
        { letter: 'D', content: <>gradient of −5.</> },
        { letter: 'E', content: <>stationary point of inflection.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
