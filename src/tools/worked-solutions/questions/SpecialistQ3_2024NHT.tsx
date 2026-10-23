// 2024 Specialist NHT — Exam 2, MCQ 3. The NHT report gives the answer key only, with no
// statistics. Functions: the values of a for which y = 1/(1 − x²) − a has two x-intercepts.
// Question text transcribed from the original paper. Solution is original; the answer E agrees
// with the report's key (sympy: a = 1 gives the single root x = 0; 0 < a < 1 gives no real roots).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{1-x^2}-a=0\iff\frac{1}{1-x^2}=a" />,
    reason: <>The <Katex tex="x" />-intercepts are where <Katex tex="y=0" />.</>,
  },
  {
    working: <Katex display tex="a=0:\ \ \frac{1}{1-x^2}=0\ \text{ has no solution}" />,
    reason: <>A fraction with numerator 1 is never zero, so <Katex tex="a=0" /> gives no intercepts. For <Katex tex="a\ne0" /> we can take reciprocals.</>,
  },
  {
    working: <Katex display tex="1-x^2=\frac1a\implies x^2=1-\frac1a=\frac{a-1}{a}" />,
    reason: <>Rearrange for <Katex tex="x^2" />.</>,
  },
  {
    working: <Katex display tex="\frac{a-1}{a}>0\iff a<0\ \text{ or }\ a>1" />,
    reason: <><Katex tex="x^2=k" /> has two solutions <Katex tex="x=\pm\sqrt k" /> only when <Katex tex="k>0" />. A quotient is positive when the top and bottom have the same sign: both negative (<Katex tex="a<0" />) or both positive (<Katex tex="a>1" />).</>,
    more: <>Check: <Katex tex="a=2" /> gives <Katex tex="x^2=\tfrac12" />, two intercepts; <Katex tex="a=-2" /> gives <Katex tex="x^2=\tfrac32" />, two intercepts; <Katex tex="a=\tfrac12" /> gives <Katex tex="x^2=-1" />, none. Graphically, <Katex tex="y=\tfrac{1}{1-x^2}" /> takes every value <Katex tex="\ge1" /> between its asymptotes <Katex tex="x=\pm1" /> (minimum 1 at <Katex tex="x=0" />) and every negative value outside them, but never a value in <Katex tex="[0,1)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a<0\ \text{ or }\ a>1}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Option <b>D</b> includes <Katex tex="a=1" />, but then <Katex tex="x^2=0" /> gives only <b>one</b> intercept, <Katex tex="x=0" />: the line <Katex tex="y=1" /> just touches the curve at its turning point.</>,
  },
]

export default function SpecialistQ3_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          The graph of <Katex tex="y=\dfrac{1}{1-x^2}-a" />, where <Katex tex="a\in R" />, has two <Katex tex="x" />-intercepts when
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a<1" /> },
        { letter: 'B', content: <Katex tex="a\ge-1" /> },
        { letter: 'C', content: <Katex tex="-1\le a\le1" /> },
        { letter: 'D', content: <><Katex tex="a<0" /> or <Katex tex="a\ge1" /></> },
        { letter: 'E', content: <><Katex tex="a<0" /> or <Katex tex="a>1" /></>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
