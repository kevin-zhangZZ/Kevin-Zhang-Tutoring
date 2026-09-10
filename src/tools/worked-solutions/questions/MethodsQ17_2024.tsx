// 2024 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 27% correct — the
// hardest MCQ on this paper. This year's paper used four options (A–D) rather than five.
// Tracing through an algorithm that searches for a cubic's roots, in decreasing order.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 26, C: 32, D: 27 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="c=f(0)=18" />. Testing <Katex tex="c=17,16,\dots" />: <Katex tex="f(3)=0" />,{' '}
      <Katex tex="f(-3)=0" />, <Katex tex="f(2)=0" /> — printed in that order: <Katex tex="3,\ {-3},\ 2" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^3-2x^2-9x+18" />,
    reason: 'The polynomial the algorithm searches.',
  },
  {
    working: <Katex display tex="f(2) = 8-8-18+18=0 \;\implies\; f(x) = (x-2)(x^2-9) = (x-2)(x-3)(x+3)" />,
    reason: <>Find the roots directly first, to predict what the algorithm should find: <Katex tex="x=2,\ 3,\ -3" />.</>,
  },
  {
    working: <Katex display tex="c \leftarrow f(0) = 18 \qquad (18\geq0,\text{ so the negation step is skipped})" />,
    reason: 'Initialise c.',
  },
  {
    working: <>The loop tests <Katex tex="c=18,17,16,\dots" />, decreasing by 1 each pass, checking <Katex tex="f(c)=0" /> then <Katex tex="f(-c)=0" /> at each value.</>,
    reason: 'Trace the while loop.',
  },
  {
    working: <Katex display tex="c=3:\quad f(3)=0 \;\implies\; \text{print } 3 \qquad f(-3)=0 \;\implies\; \text{print } {-3}" />,
    reason: <>The first value of <Katex tex="c" /> where anything prints. Both checks fire in the <i>same</i> pass, "print c" first.</>,
  },
  {
    working: <Katex display tex="c=2:\quad f(2)=0 \;\implies\; \text{print } 2 \qquad f(-2)=20\neq0" />,
    reason: 'The next value of c to trigger a print.',
  },
  {
    working: <Katex display tex="\boxed{3,\ -3,\ 2}" />,
    reason: <>No other <Katex tex="c" /> between 18 and 1 matches — matches option <b>D</b>.</>,
  },
]

export default function MethodsQ17_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Consider the algorithm below, which prints the roots of the cubic polynomial{' '}
            <Katex tex="f(x)=x^3-2x^2-9x+18" />.
          </p>
          <pre className="text-[11.5px] leading-relaxed bg-gray-100 dark:bg-gray-800 rounded-xl p-3 overflow-x-auto mb-2">{`define f(x)
    return (x^3 - 2x^2 - 9x + 18)
c ← f(0)
if c < 0 then
    c ← (-c)
end if
while c > 0
    if f(c) = 0 then
        print c
    end if
    if f(-c) = 0 then
        print -c
    end if
    c ← c - 1
end while`}</pre>
          <p>In order, the algorithm prints the values</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="-3,\ 3,\ 2" /> },
        { letter: 'B', content: <Katex tex="-3,\ 2,\ 3" /> },
        { letter: 'C', content: <Katex tex="3,\ 2,\ -3" /> },
        { letter: 'D', content: <Katex tex="3,\ -3,\ 2" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
