// 2024 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 81% correct.
// Antidifferentiating a derivative between two points. Question text transcribed from the original paper (2024 papers are
// image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 4, C: 5, D: 81 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(2)-g(0) = \int_0^2 g'(x)\,dx" />,
    reason: <>The fundamental theorem of calculus — no need to find g itself.</>,
  },
  {
    working: <Katex display tex="\int_0^2\left(x^3-x\right)dx = \left[\frac{x^4}{4}-\frac{x^2}{2}\right]_0^2" />,
    reason: <>Antidifferentiating term by term.</>,
  },
  {
    working: <Katex display tex="= \left(4-2\right)-0 = 2" />,
    reason: <><Katex tex="\tfrac{16}{4}=4" /> and <Katex tex="\tfrac42=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{g(2) = g(0)+2 = 5+2 = 7}" />,
    reason: <>Matches option <b>D</b>. The alternative — antidifferentiate to <Katex tex="g(x)=\tfrac{x^4}{4}-\tfrac{x^2}{2}+c" />, use <Katex tex="g(0)=5" /> to get <Katex tex="c=5" />, then substitute — gives the same thing.</>,
  },
]

export default function MethodsQ2_2024() {
  return (
    <MCQShell
      question={
        <p>
          A function <Katex tex="g:R\to R" /> has the derivative{' '}
          <Katex tex="g'(x)=x^3-x" />.
          <br />
          Given that <Katex tex="g(0)=5" />, the value of{' '}
          <Katex tex="g(2)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" /> },
        { letter: 'C', content: <Katex tex="5" /> },
        { letter: 'D', content: <Katex tex="7" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
