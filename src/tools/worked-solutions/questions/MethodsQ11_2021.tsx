// 2021 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 67% correct.
// Linearity of the definite integral, with a constant term. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 67, B: 6, C: 5, D: 2, E: 20 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^a\bigl(3f(x)+2\bigr)dx = 3\int_0^a f(x)\,dx+\int_0^a 2\,dx" />,
    reason: <>The integral of a sum is the sum of the integrals, and the constant factor 3 comes outside. This makes the given integral <Katex tex="\int_0^a f(x)\,dx" /> appear on its own.</>,
  },
  {
    working: <Katex display tex="3\int_0^a f(x)\,dx = 3k" />,
    reason: <>Substitute the given value <Katex tex="\int_0^a f(x)\,dx=k" />.</>,
  },
  {
    working: <Katex display tex="\int_0^a 2\,dx = \left[2x\right]_0^a = 2a-0 = 2a" />,
    reason: <>An antiderivative of the constant 2 is <Katex tex="2x" />, evaluated from 0 to <Katex tex="a" />. The answer depends on <Katex tex="a" />, not just 2.</>,
    more: (
      <>
        For <Katex tex="a>0" /> this is the area of a rectangle of height 2 and width <Katex tex="a" />, which is
        why it can&apos;t be just 2.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{3k+2a}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: (
      <>
        Option E (chosen by 20% of students) treats <Katex tex="\int_0^a 2\,dx" /> as just 2, forgetting the
        width <Katex tex="a" />. Option B leaves out the <Katex tex="+2" /> term altogether, option C forgets to
        multiply <Katex tex="k" /> by 3, and option D makes both C&apos;s slip and E&apos;s.
      </>
    ),
  },
]

export default function MethodsQ11_2021() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_0^a f(x)\,dx=k" />, then{' '}
          <Katex tex="\displaystyle\int_0^a\bigl(3f(x)+2\bigr)dx" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="3k+2a" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="3k" /> },
        { letter: 'C', content: <Katex tex="k+2a" /> },
        { letter: 'D', content: <Katex tex="k+2" /> },
        { letter: 'E', content: <Katex tex="3k+2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
