// 2018 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 83% correct. Find k
// from an inverse-function value. Question text transcribed from the original paper; VCAA
// printed no diagram and neither does the stem here (guide §7). Answer checked with sympy.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 83, C: 8, D: 6, E: 2 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f^{-1}(1) = 8 \iff f(8) = 1" />,
    reason: <>The defining property of an inverse: it undoes <Katex tex="f" />. Turning the statement around avoids ever having to find <Katex tex="f^{-1}" /> itself, which is the whole shortcut here.</>,
  },
  {
    working: <Katex display tex="f(8) = k\log_2(8) = 1" />,
    reason: <>Substituting <Katex tex="x=8" /> into the given rule.</>,
  },
  {
    working: <Katex display tex="\log_2(8) = 3 \quad \left(2^3 = 8\right)" />,
    reason: <>Read a logarithm as "what power of the base gives this number?".</>,
  },
  {
    working: <Katex display tex="3k = 1" />,
    reason: <>The equation is now linear in <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac13}" />,
    reason: <>Matches option <b>B</b>. Option <b>C</b> <Katex tex="(3)" /> is the reciprocal — the value of <Katex tex="\log_2(8)" /> rather than of <Katex tex="k" />. Option <b>D</b> <Katex tex="(8)" /> just echoes the number in the question. (<Katex tex="\tfrac13\approx0.33" />.)</>,
  },
]

export default function MethodsQ7_2018() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f:R^+\to R,\ f(x)=k\log_2(x),\ k\in R" />.
          Given that <Katex tex="f^{-1}(1)=8" />, the value of <Katex tex="k" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\dfrac13" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="8" /> },
        { letter: 'E', content: <Katex tex="12" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Reading an inverse backwards">
          <p>
            Finding <Katex tex="f^{-1}" /> explicitly here would mean solving{' '}
            <Katex tex="y=k\log_2(x)" /> for <Katex tex="x" /> with an unknown{' '}
            <Katex tex="k" /> still in the way — slow, and unnecessary.
          </p>
          <p>
            Instead use the one fact that defines an inverse:{' '}
            <Katex tex="f^{-1}(b)=a" /> says exactly the same thing as{' '}
            <Katex tex="f(a)=b" />. Flipping the given statement turns an inverse problem
            into a one-line substitution into <Katex tex="f" />.
          </p>
        </Background>
      }
    />
  )
}
