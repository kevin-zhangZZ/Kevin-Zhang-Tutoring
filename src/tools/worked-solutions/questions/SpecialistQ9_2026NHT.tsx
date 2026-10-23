// 2026 Specialist NHT — Exam 2, MCQ 9. The NHT report gives the answer key and a short comment
// only, with no statistics. Calculus: the substitution x³ − 1 = u² in ∫₁² √(x³ − 1)/x dx, with
// new terminals and the integrand rewritten as 2/3 (1 − 1/(1 + u²)). Question text transcribed
// from the original paper. Solution is original; the answer A agrees with the report's key, and
// both integrals evaluate to 0.95754… numerically.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'A',
  comment: (
    <>
      <Katex tex="x^3=u^2+1\Rightarrow 3x^2=2u\dfrac{du}{dx}" />
      <br />
      Change terminals to match the u-substitution.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}x^3=u^2+1&\implies 3x^2\,\frac{dx}{du}=2u\\ &\implies dx=\frac{2u}{3x^2}\,du\end{aligned}" />,
    reason: <>Differentiate both sides of the substitution implicitly. The right side is <Katex tex="u^2" />, so its derivative is <Katex tex="2u" />, not 1.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x=1&\Rightarrow u^2=0\Rightarrow u=0\\ x=2&\Rightarrow u^2=7\Rightarrow u=\sqrt7\end{aligned}" />,
    reason: <>Change the terminals to <Katex tex="u" />-values, using <Katex tex="u\ge0" /> to take the non-negative square root.</>,
  },
  {
    working: <Katex display tex="\frac{\sqrt{x^3-1}}{x}\,dx=\frac{u}{x}\cdot\frac{2u}{3x^2}\,du=\frac{2u^2}{3x^3}\,du" />,
    reason: <><Katex tex="\sqrt{x^3-1}=\sqrt{u^2}=u" /> because <Katex tex="u\ge0" />. The <Katex tex="x" />&apos;s combine into <Katex tex="x^3" />, which is exactly what the substitution can replace.</>,
  },
  {
    working: <Katex display tex="=\frac{2}{3}\cdot\frac{u^2}{1+u^2}\,du=\frac23\left(1-\frac{1}{1+u^2}\right)du" />,
    reason: <>Replace <Katex tex="x^3" /> with <Katex tex="1+u^2" />. Then split the fraction: <Katex tex="u^2=(1+u^2)-1" />, so <Katex tex="\tfrac{u^2}{1+u^2}=1-\tfrac{1}{1+u^2}" />.</>,
    more: <>That split matters beyond matching the options: <Katex tex="\tfrac{1}{1+u^2}" /> integrates to <Katex tex="\tan^{-1}(u)" />, so the integral is now easy to finish.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^{\sqrt7}\frac23\left(1-\frac{1}{1+u^2}\right)du}" />,
    reason: <>Matches option <b>A</b>. Sanity check: both this and the original integral evaluate to <Katex tex="0.9575\ldots" />.</>,
    more: <>Option <b>B</b> is what you get by differentiating <Katex tex="u^2" /> as if it were <Katex tex="u" /> (so <Katex tex="dx=\tfrac{du}{3x^2}" />), giving <Katex tex="\tfrac{u}{3x^3}=\tfrac13\cdot\tfrac{u}{1+u^2}" />. Options <b>C</b> and <b>D</b> keep the <Katex tex="x" />-terminals 1 and 2 instead of changing them to <Katex tex="u" />-values.</>,
  },
]

export default function SpecialistQ9_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          Using the substitution <Katex tex="x^3-1=u^2" />, <Katex tex="u\ge0" />, the definite integral{' '}
          <Katex tex="\displaystyle\int_1^2\frac{\sqrt{x^3-1}}{x}\,dx" /> can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^{\sqrt7}\frac23\left(1-\frac{1}{1+u^2}\right)du" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\displaystyle\int_0^{\sqrt7}\frac13\left(\frac{u}{1+u^2}\right)du" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int_1^{2}\frac32\left(1+\frac{1}{1-u^2}\right)du" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_1^{2}\frac23\left(1+\frac{1}{1+u^2}\right)du" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
