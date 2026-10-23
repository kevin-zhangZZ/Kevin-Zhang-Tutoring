// 2026 Specialist NHT — Exam 2, MCQ 4. The NHT report gives the answer key and a one-line
// factorisation only, with no statistics. Functions: counting the vertical asymptotes of a
// reciprocal of a cubic by factorising it by grouping. Question text transcribed from the original
// paper. Solution is original; the answer D agrees with the report's key (sympy factors the cubic
// as (x − 1)(x − m)(x + m)).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: (
    <>
      <Katex tex="x^3-x^2-m^2x+m^2=(x-1)\left(x^2-m^2\right)" />
      <br />
      3 vertical asymptotes
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&x^3-x^2-m^2x+m^2\\ &\quad=x^2(x-1)-m^2(x-1)\\ &\quad=(x-1)\left(x^2-m^2\right)\\ &\quad=(x-1)(x-m)(x+m)\end{aligned}" />,
    reason: <>Group the first two terms and the last two: each pair has a factor <Katex tex="x-1" />. What is left, <Katex tex="x^2-m^2" />, is a difference of two squares.</>,
  },
  {
    working: <Katex display tex="x=1,\quad x=m,\quad x=-m" />,
    reason: <>A vertical asymptote of <Katex tex="\tfrac{1}{\text{denominator}}" /> sits at each zero of the denominator, since the numerator 1 is never zero, so nothing cancels.</>,
  },
  {
    working: <Katex display tex="m>1\implies -m<-1<1<m" />,
    reason: <>The condition <Katex tex="m>1" /> is what keeps the three zeros <b>distinct</b>: <Katex tex="m\ne1" /> and <Katex tex="-m\ne1" />, and <Katex tex="m\ne-m" /> since <Katex tex="m\ne0" />.</>,
    more: <>If <Katex tex="m=1" /> the zeros <Katex tex="x=1" /> and <Katex tex="x=m" /> would coincide, leaving only two asymptotes, <Katex tex="x=1" /> and <Katex tex="x=-1" />, which is option <b>C</b>&apos;s count.</>,
  },
  {
    working: <Katex display tex="\boxed{3}" />,
    reason: <>Matches option <b>D</b>. Sanity check with <Katex tex="m=2" />: <Katex tex="x^3-x^2-4x+4=(x-1)(x-2)(x+2)" />, zero at <Katex tex="x=1,\,2,\,-2" />.</>,
  },
]

export default function SpecialistQ4_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          For <Katex tex="m>1" />, how many vertical asymptotes does the graph of{' '}
          <Katex tex="f(x)=\dfrac{1}{x^3-x^2-m^2x+m^2}" /> have?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="1" /> },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="3" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
