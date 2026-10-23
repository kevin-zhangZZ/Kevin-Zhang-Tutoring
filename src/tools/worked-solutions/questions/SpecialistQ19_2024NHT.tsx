// 2024 Specialist NHT — Exam 2, MCQ 19. The NHT report gives the answer key only, with no
// statistics. Statistics: the difference of two independent normal variables, Pr(B > A) =
// Pr(B − A > 0). Question text transcribed from the original paper. Solution is original; the
// answer C agrees with the report's key. scipy: Pr = 0.30133. Distractors verified: D (0.393)
// enters the variance 3.69 as the sd, B (0.133) subtracts the variances, E (0.699) is Pr(A > B).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}X_A&\sim N(6,\,1.2^2)\\ X_B&\sim N(5,\,1.5^2)\end{aligned}" />,
    reason: <>Let <Katex tex="X_A" /> and <Katex tex="X_B" /> be the yields, in kg, of a randomly chosen plant of each variety, which are independent.</>,
  },
  {
    working: <Katex display tex="\Pr(X_B>X_A)=\Pr(X_B-X_A>0)" />,
    reason: <>Comparing two random quantities: turn it into one variable, their difference, and ask when it is positive.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}E(X_B-X_A)&=5-6=-1\\ \operatorname{Var}(X_B-X_A)&=1.5^2+1.2^2\\ &=3.69\end{aligned}" />,
    reason: <>A linear combination of independent normal variables is normal. Means subtract, but the variances <b>add</b>: <Katex tex="\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)" /> with <Katex tex="b=-1" />, and <Katex tex="(-1)^2=1" />.</>,
    more: <>Subtracting one random amount from another makes the result <em>more</em> uncertain, not less, so the spread can only grow.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}X_B-X_A&\sim N(-1,\,3.69)\\ \text{sd}&=\sqrt{3.69}=1.9209\ldots\end{aligned}" />,
  },
  {
    working: <Cas fn="normCdf">normCdf(0, ∞, −1, √(3.69)) = 0.30133…</Cas>,
    reason: <><Cas fn="normCdf" /> takes the lower bound, upper bound, mean and <em>standard deviation</em>.</>,
    more: <>Sanity check: the mean difference is <Katex tex="-1" />, about half a standard deviation below 0, so variety B wins less than half the time, but often enough that the answer is well above 0.1.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X_B>X_A)\approx 0.301}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>D</b>, 0.393, enters the variance 3.69 as the standard deviation. Option <b>B</b>, 0.133, subtracts the variances, <Katex tex="2.25-1.44=0.81" />. Option <b>E</b>, 0.699, is the complement, <Katex tex="\Pr(X_A>X_B)" />.</>,
  },
]

export default function SpecialistQ19_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          When grown under the same conditions, two varieties of tomato plant have yields (the quantity of tomatoes
          produced) that are independent and approximately normally distributed.
          <br />
          Variety A has a mean yield of 6 kg per plant, with a standard deviation of 1.2 kg.
          <br />
          Variety B has a mean yield of 5 kg per plant, with a standard deviation of 1.5 kg.
          <br />
          The probability that a randomly selected tomato plant of variety B will have a higher yield than a randomly
          selected plant of variety A is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.108" /> },
        { letter: 'B', content: <Katex tex="0.133" /> },
        { letter: 'C', content: <Katex tex="0.301" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="0.393" /> },
        { letter: 'E', content: <Katex tex="0.699" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
