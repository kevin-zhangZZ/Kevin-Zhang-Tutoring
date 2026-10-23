// 2024 Specialist NHT — Exam 2, MCQ 8. The NHT report gives the answer key only, with no
// statistics. Calculus: the substitution u² = x + 1 in ∫₃⁸ 1/(x√(x+1)) dx, new terminals and partial
// fractions. Question text transcribed from the original paper. Solution is original; the answer B
// agrees with the report's key (sympy: both integrals = log_e(3/2) ≈ 0.4055; option A is half of it).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u^2=x+1\implies 2u\,\frac{du}{dx}=1\implies dx=2u\,du" />,
    reason: <>Differentiate both sides of the substitution with respect to <Katex tex="x" /> (implicitly on the left).</>,
  },
  {
    working: <Katex display tex="x=u^2-1,\qquad\sqrt{x+1}=u" />,
    reason: <>Write every part of the integrand in <Katex tex="u" />. Take <Katex tex="u>0" />, since <Katex tex="u" /> stands for the square root.</>,
  },
  {
    working: <Katex display tex="x=3\Rightarrow u=2,\qquad x=8\Rightarrow u=3" />,
    reason: <>Change the terminals too: <Katex tex="u=\sqrt{x+1}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\int_3^8\frac{1}{x\sqrt{x+1}}\,dx&=\int_2^3\frac{1}{(u^2-1)\,u}\cdot2u\,du\\&=\int_2^3\frac{2}{u^2-1}\,du\end{aligned}" />,
    reason: <>Substitute; the <Katex tex="u" /> from <Katex tex="dx=2u\,du" /> cancels the <Katex tex="u" /> from the square root.</>,
  },
  {
    working: <Katex display tex="\frac{2}{u^2-1}=\frac{2}{(u-1)(u+1)}=\frac{1}{u-1}-\frac{1}{u+1}" />,
    reason: <>The options are in partial fractions. Check: <Katex tex="\tfrac{1}{u-1}-\tfrac{1}{u+1}=\tfrac{(u+1)-(u-1)}{u^2-1}=\tfrac{2}{u^2-1}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_2^3\left(\frac{1}{u-1}-\frac{1}{u+1}\right)du}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>A</b> is exactly half: it is what you get by writing <Katex tex="dx=u\,du" />, dropping the 2. Option <b>C</b> has the partial fractions the wrong way round (it equals <Katex tex="-\tfrac{2}{u^2-1}" />), and option <b>D</b> also keeps the old <Katex tex="x" />-terminals. Sanity check: both the original and <b>B</b> equal <Katex tex="\log_e\!\left(\tfrac32\right)\approx0.405" />; the integrand is positive on <Katex tex="[3,8]" />, so the answer must be positive, which rules out C.</>,
  },
]

export default function SpecialistQ8_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          Using the substitution <Katex tex="u^2=x+1" />, the definite integral{' '}
          <Katex tex="\displaystyle\int_3^8\left(\frac{1}{x\sqrt{x+1}}\right)dx" /> can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac12\displaystyle\int_2^3\left(\frac{1}{u-1}-\frac{1}{u+1}\right)du" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_2^3\left(\frac{1}{u-1}-\frac{1}{u+1}\right)du" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\displaystyle\int_2^3\left(\frac{1}{u+1}-\frac{1}{u-1}\right)du" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_3^8\left(\frac{1}{u+1}-\frac{1}{u-1}\right)du" /> },
        { letter: 'E', content: <Katex tex="\displaystyle\int_2^3\left(\frac{1}{u-1}+\frac{1}{u+1}-\frac{2}{u}\right)du" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
