// 2017 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 64% correct.
// Transposing y = a^(b − 4x) + 2 for x. Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 64, B: 14, C: 6, D: 11, E: 5 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y = a^{\,b-4x}+2" />,
    reason: <>Peel the operations off in reverse order of how they were applied — the <Katex tex="+2" /> is outermost, so it comes off first.</>,
  },
  {
    working: <Katex display tex="y-2 = a^{\,b-4x}" />,
    reason: <>Subtracting <Katex tex="2" />. Option B has <Katex tex="y+2" />, which is this step done with the wrong sign.</>,
  },
  {
    working: <Katex display tex="\log_a(y-2) = b-4x" />,
    reason: <>Taking <Katex tex="\log_a" /> of both sides undoes the base-<Katex tex="a" /> power, by the definition <Katex tex="a^{k}=N \iff \log_a(N)=k" />.</>,
  },
  {
    working: <Katex display tex="4x = b-\log_a(y-2)" />,
    reason: <>Rearranging so <Katex tex="x" /> is alone and positive.</>,
  },
  {
    working: <Katex display tex="\boxed{x=\tfrac14\bigl(b-\log_a(y-2)\bigr)}" />,
    reason: <>Option A. Note the bracket: dividing by <Katex tex="4" /> applies to the whole right-hand side. Option D divides only the <Katex tex="b" />, which is the most common slip here.</>,
  },
]

export default function MethodsQ8_2017() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="y=a^{\,b-4x}+2" />, where <Katex tex="a>0" />, then{' '}
          <Katex tex="x" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac14\bigl(b-\log_a(y-2)\bigr)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\tfrac14\bigl(b-\log_a(y+2)\bigr)" /> },
        { letter: 'C', content: <Katex tex="b-\log_a\!\left(\tfrac14(y+2)\right)" /> },
        { letter: 'D', content: <Katex tex="\tfrac{b}{4}-\log_a(y-2)" /> },
        { letter: 'E', content: <Katex tex="\tfrac14\bigl(b+2-\log_a(y)\bigr)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
