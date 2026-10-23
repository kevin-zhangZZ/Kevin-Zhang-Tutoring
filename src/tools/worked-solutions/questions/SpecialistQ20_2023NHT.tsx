// 2023 Specialist NHT — Exam 2, MCQ 20. The NHT report gives the answer key only, with no
// statistics. Statistics: the standard deviation of a linear combination pX + qY of independent
// random variables with equal variance v. Question text transcribed from the original paper.
// Solution is original; the answer B agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Var}(pX+qY)=p^2\operatorname{Var}(X)+q^2\operatorname{Var}(Y)" />,
    reason: <>The formula-sheet rule for independent <Katex tex="X" /> and <Katex tex="Y" />: the coefficients are <em>squared</em>, because variance is measured in squared units.</>,
  },
  {
    working: <Katex display tex="\operatorname{Var}(Z)=p^2v+q^2v=v\left(p^2+q^2\right)" />,
    reason: <>Both variances are <Katex tex="v" />. The common mean <Katex tex="m" /> plays no part in the spread.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{sd}(Z)=\sqrt{v\left(p^2+q^2\right)}}" />,
    reason: <>Matches option <b>B</b>. The standard deviation is the square root of the variance. Check with <Katex tex="p=1,\ q=0" />: <Katex tex="Z=X" /> and the formula gives <Katex tex="\sqrt v" /> ✓.</>,
    more: <>Option A treats <Katex tex="v" /> as the standard deviation, squaring it again. Option E forgets to square <Katex tex="p" /> and <Katex tex="q" />. Option D, <Katex tex="(p+q)\sqrt v" />, adds the standard deviations <Katex tex="p\sqrt v+q\sqrt v" /> instead of the variances.</>,
  },
]

export default function SpecialistQ20_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          <Katex tex="X" /> and <Katex tex="Y" /> are independent random variables, each of which has a mean, <Katex tex="m" />, and
          variance, <Katex tex="v" />.
          <br />
          The standard deviation of the random variable <Katex tex="Z" />, where <Katex tex="Z=pX+qY" />, is given by
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt{v^2\left(p^2+q^2\right)}" /> },
        { letter: 'B', content: <Katex tex="\sqrt{v\left(p^2+q^2\right)}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="v\sqrt{p+q}" /> },
        { letter: 'D', content: <Katex tex="(p+q)\sqrt{v}" /> },
        { letter: 'E', content: <Katex tex="\sqrt{v(p+q)}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
