// 2023 Mathematical Methods NHT — Exam 2, MCQ 15. The NHT report gives the answer key only, with
// no statistics. Probability: find a from the total-area condition, then Var(X) = E(X²) − [E(X)]².
// Question text transcribed from the original paper. Solution is original; the answer E agrees
// with the report's key. sympy: a = 1/64, E(X) = 62/15, E(X²) = 268/15, Var(X) = 176/225 ≈ 0.782.
// Verified distractors: C is E(X), D is the standard deviation (0.884…), A is E(X²) − E(X) (13.73…).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'E' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}(6-x)(x-2)(x+2)&=(6-x)(x^2-4)\\&=-x^3+6x^2+4x-24\end{aligned}" />,
    reason: <>Expand first: a polynomial is easy to antidifferentiate term by term.</>,
  },
  {
    working: <Katex display tex="a\int_2^6\left(-x^3+6x^2+4x-24\right)dx=1" />,
    reason: <>The total area under a probability density function is 1. This fixes <Katex tex="a" />, which every later step needs.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}a\left[-\tfrac{x^4}{4}+2x^3+2x^2-24x\right]_2^6&=1\\a\big(36-(-28)\big)=64a&=1\end{aligned}" />,
  },
  {
    working: <Katex display tex="a=\tfrac{1}{64}" />,
  },
  {
    working: <Katex display tex="E(X)=\int_2^6 x\,f(x)\,dx=\tfrac{62}{15}\approx4.13" />,
    reason: <>The mean: integrate <Katex tex="x f(x)" /> over the domain.</>,
    more: <>On CAS, define <Katex tex="f(x)" /> with <Katex tex="a=\tfrac1{64}" /> and evaluate the definite integrals directly; by hand each is just a polynomial integral like the one above. A mean a little above 4, the middle of <Katex tex="[2,6]" />, fits a density that is zero at both ends and peaks around <Katex tex="x\approx4.3" />.</>,
  },
  {
    working: <Katex display tex="E(X^2)=\int_2^6 x^2 f(x)\,dx=\tfrac{268}{15}" />,
    reason: <>Variance needs the mean of <Katex tex="X^2" /> as well: integrate <Katex tex="x^2 f(x)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\operatorname{Var}(X)&=E(X^2)-\big[E(X)\big]^2\\&=\tfrac{268}{15}-\left(\tfrac{62}{15}\right)^2=\tfrac{176}{225}\end{aligned}" />,
    reason: <>The formula-sheet form of the variance. Keep the values exact (or unrounded) until the end: <Katex tex="E(X^2)" /> and <Katex tex="[E(X)]^2" /> are close (about 17.87 and 17.08), so rounding them early wrecks the difference.</>,
    more: <>Equivalently, <Cas fn="nInt" /> or an exact integral of <Katex tex="(x-\tfrac{62}{15})^2 f(x)" /> over <Katex tex="[2,6]" /> gives the same value.</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{Var}(X)\approx0.78}" />,
    reason: <>Matches option <b>E</b>. Sense check: <Katex tex="X" /> lives on an interval of width 4, so its standard deviation must be well under 2; here it is <Katex tex="\sqrt{0.782}\approx0.88" />.</>,
    more: <>Option <b>C</b>, 4.13, is <Katex tex="E(X)" />. Option <b>D</b>, 0.88, is the standard deviation — the square root taken one step too far. Option <b>A</b>, 13.7, is <Katex tex="E(X^2)-E(X)" />, forgetting to square the mean.</>,
  },
]

export default function MethodsQ15_2023NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>For the continuous random variable <Katex tex="X" /> with probability density function</p>
          <Katex display tex="\small f(x)=\begin{cases}a(6-x)(x-2)(x+2) & 2\le x\le 6\\ 0 & \text{elsewhere}\end{cases}" />
          <p>
            where <Katex tex="a" /> is a positive real constant, the variance of <Katex tex="X" /> is
            closest to
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="13.7" /> },
        { letter: 'B', content: <Katex tex="13.1" /> },
        { letter: 'C', content: <Katex tex="4.13" /> },
        { letter: 'D', content: <Katex tex="0.88" /> },
        { letter: 'E', content: <Katex tex="0.78" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
