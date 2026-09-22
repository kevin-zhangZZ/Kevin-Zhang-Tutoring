// 2020 Mathematical Methods — Exam 2, MCQ 1. VCAA examination report: 84% correct.
// Evaluating a composite function from a table of values. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 6, C: 5, D: 84, E: 1 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g\bigl(f(-1)\bigr)" />,
    reason: <>Work from the inside out: evaluate <Katex tex="f" /> first, then feed the result into <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="f(-1) = 4" />,
    reason: <>Given.</>,
  },
  {
    working: <Katex display tex="g\bigl(f(-1)\bigr) = g(4)" />,
    reason: <>The 4 is now the <em>input</em> to <Katex tex="g" />, not an answer.</>,
  },
  {
    working: <Katex display tex="\boxed{g(4) = 6}" />,
    reason: <>Option D. Answering <Katex tex="4" /> stops one step early; <Katex tex="g(-1)=2" /> would be <Katex tex="g" /> applied to the wrong input.</>,
  },
]

export default function MethodsQ1_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f" /> and <Katex tex="g" /> be functions such that{' '}
            <Katex tex="f(-1)=4" />, <Katex tex="f(2)=5" />, <Katex tex="g(-1)=2" />,{' '}
            <Katex tex="g(2)=7" /> and <Katex tex="g(4)=6" />.
          </p>
          <p>The value of <Katex tex="g\bigl(f(-1)\bigr)" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="4" /> },
        { letter: 'C', content: <Katex tex="5" /> },
        { letter: 'D', content: <Katex tex="6" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="7" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
