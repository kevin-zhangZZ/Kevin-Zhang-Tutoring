// 2023 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 53% correct.
// The axis of symmetry when the linear coefficient is written as 2b. Question text transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 53, B: 29, C: 3, D: 6, E: 8 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = -\frac{\text{coefficient of } x}{2\times\text{coefficient of } x^2}" />,
    reason: <>The axis of symmetry is the vertical line through the turning point. Use the rule in words, because the familiar <Katex tex="x=-\tfrac{b}{2a}" /> is written for <Katex tex="y=ax^2+bx+c" />, where <Katex tex="b" /> is the whole coefficient of <Katex tex="x" />; in this question <Katex tex="b" /> is only half of it.</>,
  },
  {
    working: <Katex display tex="y = (a)x^2+(2b)x+c" />,
    reason: <>Read the coefficients off the given rule: the coefficient of <Katex tex="x^2" /> is <Katex tex="a" /> and the coefficient of <Katex tex="x" /> is <Katex tex="2b" />.</>,
  },
  {
    working: <Katex display tex="x = -\frac{2b}{2a} = -\frac{b}{a}" />,
    reason: <>Substitute, then cancel the common factor of 2.</>,
    more: <>Check by calculus: the turning point is where <Katex tex="\tfrac{dy}{dx}=2ax+2b=0" />, which gives <Katex tex="x=-\tfrac{b}{a}" /> too.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -\frac{b}{a}}" />,
    reason: <>Matches option <b>A</b>; option <b>B</b> uses <Katex tex="b" /> in place of the coefficient <Katex tex="2b" />.</>,
    more: <>Option <b>B</b> (chosen by 29%) is the memorised rule copied letter for letter, which looks right because the letters match. A quick example shows why it fails: <Katex tex="y=x^2+4x=(x+2)^2-4" /> has <Katex tex="a=1" />, <Katex tex="b=2" /> and its turning point at <Katex tex="x=-2=-\tfrac{b}{a}" />, whereas option <b>B</b> gives <Katex tex="x=-1" />. Options <b>D</b> and <b>E</b> have the wrong sign (and <b>E</b> repeats the slip in <b>B</b>), and option <b>C</b>, <Katex tex="y=c" />, is a horizontal line, so it cannot be an axis of symmetry of this parabola.</>,
  },
]

export default function MethodsQ2_2023() {
  return (
    <MCQShell
      question={
        <p>
          For the parabola with equation <Katex tex="y=ax^2+2bx+c" />, where{' '}
          <Katex tex="a,b,c\in R" />, the equation of the axis of symmetry is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=-\frac{b}{a}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="x=-\frac{b}{2a}" /> },
        { letter: 'C', content: <Katex tex="y=c" /> },
        { letter: 'D', content: <Katex tex="x=\frac{b}{a}" /> },
        { letter: 'E', content: <Katex tex="x=\frac{b}{2a}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
