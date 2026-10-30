// 2024 Specialist NHT — Exam 2, MCQ 11. The NHT report gives the answer key only, with no
// statistics. Calculus: integration by parts gives a reduction formula for
// I_n = ∫₁^e x²(log_e x)^n dx. Question text transcribed from the original paper. Solution is
// original; the answer D agrees with the report's key. sympy confirms I_n = e³/3 − (n/3)I_(n−1)
// for n = 2 and n = 3.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u=(\log_e(x))^n,\quad \frac{dv}{dx}=x^2" />,
    reason: <>The integrand is a product. Choose the power of the log as <Katex tex="u" />: differentiating it lowers the power to <Katex tex="n-1" />, which is how <Katex tex="I_{n-1}" /> appears. <Katex tex="x^2" /> is easy to integrate.</>,
    more: <>Integration by parts is the product rule rearranged. Choosing <Katex tex="u=x^2" /> instead would need an antiderivative of <Katex tex="(\log_e(x))^n" />, which is harder than the original.</>,
  },
  {
    working: <Katex display tex="\frac{du}{dx}=n(\log_e(x))^{n-1}\cdot\frac{1}{x},\quad v=\frac{x^3}{3}" />,
    reason: <>Chain rule on <Katex tex="u" />: bring down the power <Katex tex="n" />, then multiply by the derivative of the inside, <Katex tex="\tfrac{1}{x}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}I_n&=\left[\frac{x^3}{3}(\log_e(x))^n\right]_1^e\\ &\quad-\int_1^e\frac{x^3}{3}\cdot\frac{n(\log_e(x))^{n-1}}{x}\,dx\end{aligned}" />,
    reason: <>Substitute into the integration by parts formula, <Katex tex="\int_a^b u\,\tfrac{dv}{dx}\,dx = \big[uv\big]_a^b-\int_a^b v\,\tfrac{du}{dx}\,dx" />, keeping the terminals on both pieces.</>,
  },
  {
    working: <Katex display tex="\left[\frac{x^3}{3}(\log_e(x))^n\right]_1^e=\frac{e^3}{3}(1)^n-\frac{1}{3}(0)^n=\frac{e^3}{3}" />,
    reason: <>Evaluate the boundary term: <Katex tex="\log_e(e)=1" /> and <Katex tex="\log_e(1)=0" />, so the lower terminal contributes nothing (since <Katex tex="n\ge 2" />, <Katex tex="0^n=0" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\int_1^e\frac{x^3}{3}\cdot\frac{n(\log_e(x))^{n-1}}{x}\,dx\\ &\quad=\frac{n}{3}\int_1^e x^2(\log_e(x))^{n-1}\,dx\\ &\quad=\frac{n}{3}I_{n-1}\end{aligned}" />,
    reason: <>One <Katex tex="x" /> cancels, leaving <Katex tex="x^2" />, and the constant <Katex tex="\tfrac{n}{3}" /> comes out. What remains is exactly <Katex tex="I_n" /> with <Katex tex="n" /> replaced by <Katex tex="n-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{I_n=\frac{e^3}{3}-\frac{n}{3}I_{n-1}}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option <b>E</b> subtracts an extra <Katex tex="\tfrac13" /> from the lower terminal, forgetting that <Katex tex="\log_e(1)=0" /> makes that term zero. Option <b>C</b> loses the factor <Katex tex="n" /> from the chain rule. Option <b>B</b> leaves the boundary term in terms of <Katex tex="x" /> without substituting the terminals, and option <b>A</b> drops the boundary term altogether. Check with <Katex tex="n=1" />: by parts <Katex tex="I_1=\tfrac{2e^3+1}{9}" /> and <Katex tex="I_0=\tfrac{e^3-1}{3}" />, and <Katex tex="\tfrac{e^3}{3}-\tfrac13 I_0=\tfrac{2e^3+1}{9}" />.</>,
  },
]

export default function SpecialistQ11_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="I_n=\displaystyle\int_1^e x^2\left(\log_e(x)\right)^n\,dx" /> where <Katex tex="n\in N" />, then
          for <Katex tex="n\ge 2" />, <Katex tex="I_n" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\dfrac{n}{3}I_{n-1}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{x^3\left(\log_e(x)\right)^n}{3}-\dfrac{n}{3}I_{n-1}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{e^3}{3}-\dfrac{1}{3}I_{n-1}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{e^3}{3}-\dfrac{n}{3}I_{n-1}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{e^3}{3}-\dfrac{1}{3}-\dfrac{n}{3}I_{n-1}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
