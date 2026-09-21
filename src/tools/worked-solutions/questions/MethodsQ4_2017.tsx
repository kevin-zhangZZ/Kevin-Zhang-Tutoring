// 2017 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 75% correct.
// Evaluating a composite from a table of values. Question text transcribed from the
// original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 10, C: 6, D: 7, E: 75 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(3)=2" />,
    reason: <>Work from the inside out. The inner function is evaluated first, and <Katex tex="g(3)=2" /> is one of the given values.</>,
  },
  {
    working: <Katex display tex="f(g(3)) = f(2)" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="\boxed{f(2)=5}" />,
    reason: <>Reading the last value off the list. The trap is doing it outside-in: <Katex tex="f(3)=4" /> then <Katex tex="g(4)=1" /> gives option A, which is <Katex tex="g(f(3))" />, not <Katex tex="f(g(3))" />.</>,
  },
]

export default function MethodsQ4_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f" /> and <Katex tex="g" /> be functions such that{' '}
            <Katex tex="f(2)=5" />, <Katex tex="f(3)=4" />, <Katex tex="g(2)=5" />,{' '}
            <Katex tex="g(3)=2" /> and <Katex tex="g(4)=1" />.
          </p>
          <p>
            The value of <Katex tex="f(g(3))" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="5" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
