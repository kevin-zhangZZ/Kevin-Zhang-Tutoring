// 2014 Mathematical Methods (CAS) — Exam 2, MCQ 8. VCAA examination report: 59% correct.
// Linearity of the definite integral. Question text transcribed from the original paper;
// solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 59, B: 11, C: 13, D: 9, E: 7 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_1^4\bigl(5-2f(x)\bigr)dx = \int_1^4 5\,dx - 2\int_1^4 f(x)\,dx" />,
    reason: <>Split the integral at the minus sign and pull the constant 2 outside — the only two rules this question needs.</>,
    more: <>In symbols: <Katex tex="\int (g-h)\,dx = \int g\,dx - \int h\,dx" /> and <Katex tex="\int k\,h\,dx = k\int h\,dx" /> for a constant <Katex tex="k" />, on the same terminals. These let you use the given value <Katex tex="\int_1^4 f(x)\,dx=6" /> without ever knowing <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\int_1^4 5\,dx = 5\times(4-1) = 15" />,
    reason: <>A constant integrand gives a rectangle: height 5, width <Katex tex="4-1=3" />.</>,
    more: <>This is the easy term to mishandle. Writing <Katex tex="\int_1^4 5\,dx" /> as just 5 gives <Katex tex="5-12=-7" />; using only the upper terminal (<Katex tex="5\times4=20" />) gives 8; dropping it altogether gives <Katex tex="-12" />. None of these is an option, which is a useful signal to recheck. Formally, <Katex tex="\int_1^4 5\,dx=\bigl[5x\bigr]_1^4=20-5=15" />.</>,
  },
  {
    working: <Katex display tex="2\int_1^4 f(x)\,dx = 2\times6 = 12" />,
    reason: <>Using the given value <Katex tex="\int_1^4 f(x)\,dx=6" />.</>,
  },
  {
    working: <Katex display tex="\boxed{15-12 = 3}" />,
    reason: <>Matches option <b>A</b> — whatever <Katex tex="f" /> actually is.</>,
    more: <>Check with a concrete example: <Katex tex="f(x)=2" /> satisfies <Katex tex="\int_1^4 2\,dx=2\times3=6" />, and then <Katex tex="\int_1^4(5-4)\,dx=1\times3=3" /> ✓. Option D (6) just repeats the given value. None of the other options (B 4, C 5, E 16) comes from handling both terms correctly — if you chose one, recheck the rectangle <Katex tex="5\times3=15" /> and the doubled value <Katex tex="2\times6=12" />, rather than picking the nearest option.</>,
  },
]

export default function MethodsQ8_2014() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_1^4 f(x)\,dx=6" />, then{' '}
          <Katex tex="\displaystyle\int_1^4\bigl(5-2f(x)\bigr)dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="4" /> },
        { letter: 'C', content: <Katex tex="5" /> },
        { letter: 'D', content: <Katex tex="6" /> },
        { letter: 'E', content: <Katex tex="16" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
