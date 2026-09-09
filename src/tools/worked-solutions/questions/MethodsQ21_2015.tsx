// 2015 Mathematical Methods (CAS) — Exam 2, MCQ 21. VCAA examination report: 37% correct.
// Condition on a line and a parabola for them to never intersect, via the discriminant.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 20, C: 30, D: 37, E: 5 },
  answer: 'D',
  noAnswer: 1,
  comment: <>Solve <Katex tex="m^2-4ac<0" /> for <Katex tex="c" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="mx+c = ax^2 \;\implies\; ax^2-mx-c=0" />,
    reason: 'Set the two rules equal to find any intersection points.',
  },
  {
    working: <Katex display tex="\Delta = (-m)^2-4(a)(-c) = m^2+4ac" />,
    reason: <>No real intersection points means this quadratic in <Katex tex="x" /> has no real roots.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{no intersection} \iff \Delta<0" />
        <Katex display tex="\iff\; m^2+4ac<0 \iff ac < -\frac{m^2}{4}" />
      </>
    ),
  },
  {
    working: <Katex display tex="a<0 \;\implies\; c > -\frac{m^2}{4a}" />,
    reason: <>Dividing an inequality by a <em>negative</em> number <Katex tex="a" /> flips its direction.</>,
  },
  {
    working: <Katex display tex="\boxed{a<0 \ \text{and} \ c > -\dfrac{m^2}{4a}}" />,
    reason: <>Matches option <b>D</b>. (For <Katex tex="a>0" /> the same algebra gives <Katex tex="c<-\tfrac{m^2}{4a}" /> instead — option C's inequality points the wrong way, which is why it's a trap.)</>,
  },
]

export default function MethodsQ21_2015() {
  return (
    <MCQShell
      question={
        <p>
          The graphs of <Katex tex="y=mx+c" /> and <Katex tex="y=ax^2" /> will have no points of
          intersection for all values of <Katex tex="m" />, <Katex tex="c" /> and <Katex tex="a" /> such that
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a>0 \text{ and } c>0" /> },
        { letter: 'B', content: <Katex tex="a>0 \text{ and } c<0" /> },
        { letter: 'C', content: <Katex tex="a>0 \text{ and } c>-\dfrac{m^2}{4a}" /> },
        { letter: 'D', content: <Katex tex="a<0 \text{ and } c>-\dfrac{m^2}{4a}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="m>0 \text{ and } c>0" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
