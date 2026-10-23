// 2024 Specialist NHT — Exam 2, MCQ 20. The NHT report gives the answer key only, with no
// statistics. Statistics: the variance of a sum of independent items adds once per item, giving
// two linear equations in m and n. Question text transcribed from the original paper. Solution
// is original; the answer A agrees with the report's key. sympy solves the system to m = 9,
// n = 25. Distractors verified: D swaps m and n; E (3, 5) comes from using m² and n² (treating
// the total as m·X rather than a sum of m independent X's).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{Var}(X_1+X_2+\cdots+X_m)=m\operatorname{Var}(X)" />,
    reason: <>Each book&apos;s thickness is a separate, independent random variable, so the variance of a total adds one book&apos;s variance per book.</>,
    more: <>This is <b>not</b> <Katex tex="\operatorname{Var}(mX)=m^2\operatorname{Var}(X)" />. That would be one notebook&apos;s thickness multiplied by <Katex tex="m" />, as if all <Katex tex="m" /> notebooks were the same thickness; separate books vary independently, and their variations partly cancel.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}0.04m+0.16n&=4.36\\ 0.04n+0.16m&=2.44\end{aligned}" />,
    reason: <>First sample: <Katex tex="m" /> notebooks at <Katex tex="0.04" /> each and <Katex tex="n" /> textbooks at <Katex tex="0.16" /> each. Second sample: the numbers swap.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}m+4n&=109\\ 4m+n&=61\end{aligned}" />,
    reason: <>Multiply both equations by 25 to clear the decimals.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}m&=109-4n\\ 4(109-4n)+n&=61\\ 436-15n&=61\\ n&=25\end{aligned}" />,
    reason: <>Substitute the first equation into the second.</>,
    more: <>Or on CAS: <Cas fn="solve">solve(0.04m + 0.16n = 4.36 and 0.04n + 0.16m = 2.44, {'{'}m, n{'}'})</Cas></>,
  },
  {
    working: <Katex display tex="m=109-4(25)=9" />,
    reason: <>Check in the second equation: <Katex tex="0.04(25)+0.16(9)=1+1.44=2.44" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m=9,\ n=25}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option <b>D</b> gives the same two numbers in the wrong order. Option <b>E</b>, 3 and 5, comes from writing the variances as <Katex tex="0.04m^2+0.16n^2" />, the <Katex tex="\operatorname{Var}(mX)" /> mistake: that system gives <Katex tex="m^2=9" /> and <Katex tex="n^2=25" />.</>,
  },
]

export default function SpecialistQ20_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          A publisher prints a large number of notebooks and textbooks.
          <br />
          The thickness of the notebooks is known to have a variance of <Katex tex="0.04\text{ cm}^2" />, and the thickness
          of the textbooks is known to have a variance of <Katex tex="0.16\text{ cm}^2" />. The variance of the total
          thickness of a random sample of <Katex tex="m" /> notebooks and <Katex tex="n" /> textbooks
          is <Katex tex="4.36\text{ cm}^2" />, and the variance of the total thickness of a random sample
          of <Katex tex="n" /> notebooks and <Katex tex="m" /> textbooks is <Katex tex="2.44\text{ cm}^2" />.
          <br />
          The values of <Katex tex="m" /> and <Katex tex="n" /> are respectively
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="9,\ 25" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="6,\ 10" /> },
        { letter: 'C', content: <Katex tex="5,\ 3" /> },
        { letter: 'D', content: <Katex tex="25,\ 9" /> },
        { letter: 'E', content: <Katex tex="3,\ 5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
