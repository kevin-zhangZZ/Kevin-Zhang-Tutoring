// 2023 Specialist NHT — Exam 2, MCQ 18. The NHT report gives the answer key only, with no
// statistics. Sum of two independent normal times: add the means and the variances, then a normal
// lower-tail probability. Question text transcribed from the original paper. Solution is original;
// the answer A agrees with the report's key. scipy: Pr(T < 120) = 0.0620 with sd 13; sd 17 gives
// 0.1197 (B), sd 169 gives 0.4529 (C), the upper tail is 0.9380 (D).

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}M&\sim N(100,\,12^2)\\ R&\sim N(40,\,5^2)\end{aligned}\quad\text{independent}" />,
    reason: <>Let <Katex tex="M" /> and <Katex tex="R" /> be the minutes spent on mathematics and on reading.</>,
  },
  {
    working: <Katex display tex="T=M+R\implies E(T)=100+40=140" />,
    reason: <>The total is the sum. A sum of independent normal variables is normal, and its mean is the sum of the means.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\operatorname{Var}(T)&=144+25=169\\ \text{sd}(T)&=\sqrt{169}=13\end{aligned}" />,
    reason: <>For independent variables the <em>variances</em> add, not the standard deviations: square 12 and 5 first, add, then take the square root.</>,
    more: <>Adding the standard deviations, <Katex tex="12+5=17" />, overstates the spread: a long maths session is often offset by a shorter reading one, so the total varies less than that.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(−∞, 120, 140, 13) = 0.0619…</Cas>,
    reason: <>&ldquo;Less than a total of 120 minutes&rdquo; is the lower tail <Katex tex="\Pr(T<120)" />. <Cas fn="normCdf" /> takes the lower bound, upper bound, mean and <em>standard deviation</em>.</>,
    more: <>By hand: <Katex tex="\Pr(T<120)=\Pr\!\left(Z<\tfrac{120-140}{13}\right)=\Pr(Z<-1.54)" />. 120 is about one and a half standard deviations below the mean, so a small probability is expected.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(T<120)\approx0.06}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>Option B, 0.12, uses <Katex tex="\text{sd}=12+5=17" />, adding standard deviations. Option C, 0.45, enters the variance 169 as the standard deviation. Option D, 0.94, is the upper tail <Katex tex="\Pr(T>120)" />.</>,
  },
]

export default function SpecialistQ18_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          Each night, a student typically spends 100 minutes on mathematics homework and 40 minutes reading. The standard
          deviations of the times spent on mathematics and reading are 12 minutes and 5 minutes respectively.
          <br />
          Assuming that the times spent on the two tasks are independent and normally distributed, the probability that the
          student spends less than a total of 120 minutes on mathematics and reading on a particular night is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.06" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="0.12" /> },
        { letter: 'C', content: <Katex tex="0.45" /> },
        { letter: 'D', content: <Katex tex="0.94" /> },
        { letter: 'E', content: <Katex tex="0.99" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
