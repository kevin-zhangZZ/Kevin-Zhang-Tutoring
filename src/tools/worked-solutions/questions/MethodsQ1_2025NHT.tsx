// 2025 Mathematical Methods NHT — Exam 2, MCQ 1. The NHT report gives the answer key only, with
// no statistics. Algebra: the factor theorem with the unknown appearing in both the factor and
// the polynomial. Question text transcribed from the original paper (the 2025 NHT paper is
// image-only, so read from the rendered page). Solution is original; the answer D agrees with
// the report's key (sympy: 3a³ − 6a² = 0 gives a = 0 or 2). Distractor B checked: substituting
// x = −a gives −3a³ − 4a² = 0, so a = −4/3.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P(x)=3x^3-5x^2-ax,\qquad P(a)=0" />,
    reason: <>Factor theorem: <Katex tex="x-a" /> is a factor exactly when the polynomial is zero at <Katex tex="x=a" />.</>,
    more: <>The value to substitute is the one that makes the factor zero: <Katex tex="x-a=0" /> means <Katex tex="x=a" />, not <Katex tex="x=-a" />.</>,
  },
  {
    working: <Katex display tex="3a^3-5a^2-a\cdot a=3a^3-6a^2=0" />,
    reason: <>Every <Katex tex="x" /> becomes <Katex tex="a" />, including the one in <Katex tex="-ax" />, which gives <Katex tex="-a^2" />.</>,
  },
  {
    working: <Katex display tex="3a^2(a-2)=0\ \Rightarrow\ a=0\ \text{or}\ a=2" />,
    reason: <>Take out the common factor <Katex tex="3a^2" /> rather than dividing by <Katex tex="a" />, so no solution is lost.</>,
  },
  {
    working: <Katex display tex="\boxed{a=2}" />,
    reason: <>Matches option <b>D</b>. <Katex tex="a=0" /> is rejected because <Katex tex="a\in R\setminus\{0\}" />.</>,
    more: <>Check: with <Katex tex="a=2" />, <Katex tex="3x^3-5x^2-2x=x(3x+1)(x-2)" />, which does have the factor <Katex tex="x-2" />. Option <b>B</b> comes from substituting <Katex tex="x=-a" />: <Katex tex="-3a^3-5a^2+a^2=-a^2(3a+4)=0" /> gives <Katex tex="a=-\tfrac43" />.</>,
  },
]

export default function MethodsQ1_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="x-a" /> is a factor of <Katex tex="3x^3-5x^2-ax" />, where{' '}
          <Katex tex="a\in R\setminus\{0\}" />, then the value of <Katex tex="a" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-2" /> },
        { letter: 'B', content: <Katex tex="-\dfrac{4}{3}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{4}{3}" /> },
        { letter: 'D', content: <Katex tex="2" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
