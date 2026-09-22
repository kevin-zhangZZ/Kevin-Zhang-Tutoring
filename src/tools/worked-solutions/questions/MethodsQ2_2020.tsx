// 2020 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 56% correct.
// The remainder theorem with an unknown coefficient. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 13, C: 12, D: 10, E: 56 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="p(x) \text{ divided by } x+2 \implies \text{remainder} = p(-2)" />,
    reason: <>The remainder theorem: the divisor is <Katex tex="x-(-2)" />, so substitute <Katex tex="x=-2" />, not <Katex tex="+2" />.</>,
  },
  {
    working: <Katex display tex="p(-2) = (-2)^3-2a(-2)^2+(-2)-1" />,
    reason: <>Substituting into <Katex tex="p(x)=x^3-2ax^2+x-1" />.</>,
  },
  {
    working: <Katex display tex="= -8-8a-2-1 = -11-8a" />,
    reason: <><Katex tex="-2a\times4=-8a" />; the square makes <Katex tex="(-2)^2" /> positive.</>,
  },
  {
    working: <Katex display tex="-11-8a = 5 \implies -8a = 16" />,
    reason: <>Setting the remainder equal to 5.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -2}" />,
    reason: <>Option E. Check: <Katex tex="p(-2)=-8+16-2-1=5" /> ✓.</>,
  },
]

export default function MethodsQ2_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="p(x)=x^3-2ax^2+x-1" />, where <Katex tex="a\in R" />. When{' '}
            <Katex tex="p" /> is divided by <Katex tex="x+2" />, the remainder is 5.
          </p>
          <p>The value of <Katex tex="a" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="-\tfrac74" /> },
        { letter: 'C', content: <Katex tex="\tfrac12" /> },
        { letter: 'D', content: <Katex tex="-\tfrac32" /> },
        { letter: 'E', content: <Katex tex="-2" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
