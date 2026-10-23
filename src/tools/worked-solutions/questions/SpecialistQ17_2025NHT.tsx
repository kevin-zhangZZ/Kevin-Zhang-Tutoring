// 2025 Specialist NHT — Exam 2, MCQ 17. The NHT report gives the answer key only, with no
// statistics. Vectors: area of a triangle = ½|u × v|. Question text transcribed from the original
// paper (read from the page image; the 2025 paper has no text layer). Solution is original; the
// answer A agrees with the report's key and with sympy (u × v = −5i − 5j − 5k, magnitude 5√3).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="A=\tfrac12\left|\underset{\sim}{u}\times\underset{\sim}{v}\right|" />,
    reason: <>Call the two vectors <Katex tex="\underset{\sim}{u}" /> and <Katex tex="\underset{\sim}{v}" />. <Katex tex="|\underset{\sim}{u}\times\underset{\sim}{v}|=|\underset{\sim}{u}||\underset{\sim}{v}|\sin\theta" /> is the area of the parallelogram the two vectors span. The triangle on the same two sides is half of it.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{u}\times\underset{\sim}{v}&=\begin{vmatrix}\underset{\sim}{i}&\underset{\sim}{j}&\underset{\sim}{k}\\ 2&1&-3\\ 1&-2&1\end{vmatrix}\\ &=(1-6)\underset{\sim}{i}-(2+3)\underset{\sim}{j}+(-4-1)\underset{\sim}{k}\\ &=-5\underset{\sim}{i}-5\underset{\sim}{j}-5\underset{\sim}{k}\end{aligned}" />,
    reason: <>Expand the determinant along the top row. Watch the minus sign on the <Katex tex="\underset{\sim}{j}" /> term.</>,
    more: <>Check: the result should be perpendicular to both vectors. <Katex tex="(-5)(2)+(-5)(1)+(-5)(-3)=0" /> and <Katex tex="(-5)(1)+(-5)(-2)+(-5)(1)=0" />.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{u}\times\underset{\sim}{v}\right|=\sqrt{25+25+25}=5\sqrt3" />,
  },
  {
    working: <Katex display tex="\boxed{A=\frac{5\sqrt3}{2}}" />,
    reason: <>Matches option <b>A</b> (<Katex tex="\approx4.33" />).</>,
    more: <>Option <b>B</b>, <Katex tex="5\sqrt3" />, is the parallelogram&apos;s area, without the half.</>,
  },
]

export default function SpecialistQ17_2025NHT() {
  return (
    <MCQShell
      question={
        <p>
          Two sides of a triangle are spanned by the vectors{' '}
          <Katex tex="2\underset{\sim}{i}+\underset{\sim}{j}-3\underset{\sim}{k}" /> and{' '}
          <Katex tex="\underset{\sim}{i}-2\underset{\sim}{j}+\underset{\sim}{k}" />.
          <br />
          The area of this triangle is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{5\sqrt3}{2}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="5\sqrt3" /> },
        { letter: 'C', content: <Katex tex="5" /> },
        { letter: 'D', content: <Katex tex="\dfrac{3\sqrt{10}}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
