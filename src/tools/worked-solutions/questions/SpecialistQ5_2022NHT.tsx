// 2022 Specialist NHT — Exam 2, MCQ 5. The NHT report gives the answer key only, with no
// statistics. Algebra: the partial-fraction form for an irreducible quadratic factor and a
// repeated linear factor. Question text transcribed from the original paper. Solution is
// original; the answer B agrees with the report's key. sympy's apart gives A = 7/289,
// B = −23/289, C = 3/17, D = −7/289 (all non-zero), and finds no constants that make the forms in
// options A, D or E work.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x^2+1:\ \ \Delta=0^2-4(1)(1)=-4<0" />,
    reason: <><Katex tex="x^2+1" /> has no real zeros, so it can&apos;t be factorised further over <Katex tex="R" />. An irreducible quadratic factor gets a <b>linear</b> numerator: <Katex tex="\dfrac{Ax+B}{x^2+1}" />.</>,
    more: <>A constant on top would not be enough: the numerator must be allowed every degree below the denominator&apos;s, so for a quadratic denominator that means degree 1.</>,
  },
  {
    working: <Katex display tex="(x-4)^2:\ \ \frac{C}{(x-4)^2}+\frac{D}{x-4}" />,
    reason: <>A repeated linear factor gets one term for <b>each</b> power, from the first up to the one in the denominator, each with a constant numerator.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\frac{x-1}{(x^2+1)(x-4)^2}\\ &\quad=\frac{Ax+B}{x^2+1}+\frac{C}{(x-4)^2}+\frac{D}{x-4}\end{aligned}" />,
    reason: <>Put the two together: four unknown constants, matching the denominator&apos;s degree, <Katex tex="4" />.</>,
  },
  {
    working: <Katex display tex="A=\tfrac{7}{289},\ \ B=-\tfrac{23}{289},\ \ C=\tfrac{3}{17},\ \ D=-\tfrac{7}{289}" />,
    reason: <>Check that this form really works with non-zero constants, as the question requires: <Cas fn="expand">expand((x−1)/((x²+1)(x−4)²), x)</Cas> returns the partial fractions directly.</>,
    more: <>By hand: multiply through by the denominator and put <Katex tex="x=4" /> to get <Katex tex="3=17C" />, then compare coefficients for the rest.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{Ax+B}{x^2+1}+\frac{C}{(x-4)^2}+\frac{D}{x-4}}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option E leaves out the <Katex tex="\tfrac{D}{x-4}" /> term for the lower power of the repeated factor. Option D has only a constant over <Katex tex="x^2+1" />, and option A misses both of these; none of the three can be matched for every <Katex tex="x" />. Option C&apos;s <Katex tex="\tfrac{Dx}{x-4}" /> has a numerator as high in degree as its denominator, which is not a partial fraction.</>,
  },
]

export default function SpecialistQ5_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following, where <Katex tex="A" />, <Katex tex="B" />, <Katex tex="C" /> and <Katex tex="D" /> are
          non-zero real numbers, is a partial fraction form for the expression{' '}
          <Katex tex="\dfrac{x-1}{(x^2+1)(x-4)^2}" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{A}{x^2+1}-\dfrac{B}{(x-4)^2}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{Ax+B}{x^2+1}+\dfrac{C}{(x-4)^2}+\dfrac{D}{x-4}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{Ax+B}{x^2+1}+\dfrac{C}{(x-4)^2}+\dfrac{Dx}{x-4}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{A}{x^2+1}+\dfrac{C}{(x-4)^2}+\dfrac{D}{x-4}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{Ax+B}{x^2+1}+\dfrac{C}{(x-4)^2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
