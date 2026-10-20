// 2022 Specialist NHT — Exam 2, MCQ 18. The NHT report gives the answer key only, with no
// statistics. Sum of two independent normal waiting times: add the means and the variances,
// then a normal probability. Question text transcribed from the original paper. Solution is
// original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}M&\sim N(8,\,2^2)\\ A&\sim N(10,\,3^2)\end{aligned}\quad\text{independent}" />,
    reason: <>Let <Katex tex="M" /> and <Katex tex="A" /> be the morning and afternoon waiting times, in minutes.</>,
  },
  {
    working: <Katex display tex="T = M+A \implies E(T) = 8+10 = 18" />,
    reason: <>The total for the day is the sum. A sum of independent normal variables is itself normal, with mean equal to the sum of the means.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\mathrm{Var}(T) &= \mathrm{Var}(M)+\mathrm{Var}(A) = 4+9 = 13\\ \mathrm{sd}(T) &= \sqrt{13}\approx3.606\end{aligned}" />,
    reason: <>For independent variables the <em>variances</em> add (<Katex tex="\mathrm{Var}(aX+bY)=a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)" /> on the formula sheet, with <Katex tex="a=b=1" />). Square the standard deviations first, add, then square-root.</>,
    more: <>Adding standard deviations, <Katex tex="2+3=5" />, is the classic slip: it overstates the spread, because a long morning wait is often balanced by a shorter afternoon one.</>,
  },
  {
    working: <Katex display tex="T\sim N\!\left(18,\,13\right)" />,
    reason: <>The second number here is the variance, 13; its standard deviation is <Katex tex="\sqrt{13}" />.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(15, ∞, 18, √(13)) = 0.7973…</Cas>,
    reason: <>&ldquo;More than 15 minutes&rdquo; is the upper tail <Katex tex="\Pr(T>15)" />. <Cas fn="normCdf" /> takes the lower bound, upper bound, mean and <em>standard deviation</em>, in that order.</>,
    more: <>By hand, <Katex tex="\Pr(T>15)=\Pr\!\left(Z>\tfrac{15-18}{\sqrt{13}}\right)=\Pr(Z>-0.832)" />. 15 is below the mean of 18, so the answer must be more than <Katex tex="0.5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(T>15) \approx 0.797}" />,
    reason: <>Matches option <b>D</b>, correct to three decimal places.</>,
    more: <>Option <b>C</b>, 0.726, uses <Katex tex="\mathrm{sd}=2+3=5" />, adding standard deviations instead of variances. Option <b>B</b>, 0.591, uses 13 as the standard deviation, entering the variance where <Cas fn="normCdf" /> wants the standard deviation. Option <b>E</b>, 0.910, uses <Katex tex="\mathrm{sd}=\sqrt{2+3}=\sqrt5" />, adding the standard deviations under a square root instead of squaring them first. Option <b>A</b>, 0.048, is <Katex tex="\Pr(A>15)" />, the afternoon wait alone exceeding 15 minutes.</>,
  },
]

export default function SpecialistQ18_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          A student travels to and from college by bus each day. The time that the student spends waiting for the bus in
          the morning is normally distributed with a mean of 8 minutes and a standard deviation of 2 minutes. The time
          that the student spends waiting for the bus in the afternoon is normally distributed with a mean of 10 minutes
          and a standard deviation of 3 minutes. Morning and afternoon waiting times are independent.
          <br />
          The probability, correct to three decimal places, that the student spends more than 15 minutes in total
          waiting for buses on a particular day is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.048" /> },
        { letter: 'B', content: <Katex tex="0.591" /> },
        { letter: 'C', content: <Katex tex="0.726" /> },
        { letter: 'D', content: <Katex tex="0.797" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="0.910" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
