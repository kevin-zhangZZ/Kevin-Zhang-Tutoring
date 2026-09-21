// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 12. VCAA examination report: 60% correct.
// At least one red ball in three draws without replacement. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 7, C: 9, D: 13, E: 60 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{at least one red}) = 1-\Pr(\text{no red})" />,
    reason: <>"At least one" almost always means "one minus none" — here the alternative is adding three separate cases.</>,
  },
  {
    working: <Katex display tex="\Pr(BBB) = \frac38\times\frac27\times\frac16" />,
    reason: <>Three blues in a row, without replacement: the pool shrinks each time and so does the blue count.</>,
  },
  {
    working: <Katex display tex="= \frac{6}{336} = \frac{1}{56}" />,
    reason: <>Only one way to pick all three blues out of three.</>,
  },
  {
    working: <Katex display tex="\boxed{1-\frac{1}{56} = \frac{55}{56}}" />,
    reason: <>Option E, about <Katex tex="0.982" />. Sensible: with five of the eight balls red, drawing three and getting no red at all would be remarkable.</>,
  },
]

export default function MethodsQ12_2015() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A box contains five red balls and three blue balls. John selects three balls from
            the box, without replacing them.
          </p>
          <p>
            The probability that at least one of the balls that John selected is red is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac57" /> },
        { letter: 'B', content: <Katex tex="\dfrac{5}{14}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{7}{28}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{15}{56}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{55}{56}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
