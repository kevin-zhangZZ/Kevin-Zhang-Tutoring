// 2020 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: only 2% correct — the
// hardest MCQ on this entire paper. Partial-fraction form of 1/(ax(x²+b)) with b < 0. Question
// text transcribed from the original paper. Solution is original.
//
// Note: a third-party solutions PDF for this year gives B as the answer, but that option uses
// √b as a literal radical — invalid since b < 0 makes √b non-real. The VCAA examination report's
// own %-correct table (option D at just 2%) confirms D, independently verified below.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 19, B: 70, C: 5, D: 2, E: 5 },
  answer: 'D',
  comment: <>Option A results from not considering that <Katex tex="b<0" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+b = x^2-|b| = \big(x-\sqrt{|b|}\big)\big(x+\sqrt{|b|}\big)" />,
    reason: <>Since <Katex tex="b<0" />, write <Katex tex="b=-|b|" /> so the "difference of squares" factorises into two <i>real</i> linear factors — <Katex tex="\sqrt{b}" /> itself would not be a real number.</>,
  },
  {
    working: <Katex display tex="\frac{1}{ax(x^2+b)} = \frac{1}{ax\big(x-\sqrt{|b|}\big)\big(x+\sqrt{|b|}\big)}" />,
    reason: 'Three distinct linear factors in the denominator, so three partial-fraction terms are needed.',
  },
  {
    working: <Katex display tex="= \frac{A}{x} + \frac{B}{x+\sqrt{|b|}} + \frac{C}{x-\sqrt{|b|}}" />,
    reason: <>The constant <Katex tex="a" /> is just an overall scale factor — it doesn't change <i>which</i> linear expressions appear as denominators, only the values of <Katex tex="A,B,C" /> once solved. So the denominators are exactly <Katex tex="x" />, <Katex tex="x+\sqrt{|b|}" /> and <Katex tex="x-\sqrt{|b|}" /> — not <Katex tex="ax" />, and not <Katex tex="ax\pm\sqrt{|b|}" /> (option C incorrectly scales the roots themselves by <Katex tex="a" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{A}{x} + \frac{B}{x+\sqrt{|b|}} + \frac{C}{x-\sqrt{|b|}}}" />,
    reason: <>Matches option <b>D</b>. (Options B and E use the literal radical <Katex tex="\sqrt{b}" />, which isn't real since <Katex tex="b<0" /> — the trap that caught 70% of students, who picked B.)</>,
  },
]

export default function SpecialistQ7_2020() {
  return (
    <MCQShell
      question={
        <p>
          For non-zero real constants <Katex tex="a" /> and <Katex tex="b" />, where <Katex tex="b<0" />, the expression{' '}
          <Katex tex="\dfrac{1}{ax(x^2+b)}" /> in partial fraction form with linear denominators, where{' '}
          <Katex tex="A" />, <Katex tex="B" /> and <Katex tex="C" /> are real constants, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{A}{ax} + \dfrac{Bx+C}{x^2+b}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{A}{ax} + \dfrac{B}{x+\sqrt{b}} + \dfrac{C}{x-\sqrt{b}}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{A}{x} + \dfrac{B}{ax+\sqrt{|b|}} + \dfrac{C}{ax-\sqrt{|b|}}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{A}{x} + \dfrac{B}{x+\sqrt{|b|}} + \dfrac{C}{x-\sqrt{|b|}}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{A}{ax} + \dfrac{B}{(x+\sqrt{b})^2} + \dfrac{C}{x+\sqrt{b}}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
