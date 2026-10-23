// 2023 Specialist NHT — Exam 2, MCQ 9. The NHT report gives the answer key only, with no
// statistics. Calculus: arc length of a Cartesian curve — match 1 + (dy/dx)² to 1 + 1/(4x⁴), so
// dy/dx = ±1/(2x²). Question text transcribed from the original paper. Solution is original; the
// answer D agrees with the report's key (sympy: (dy/dx)² for options A–E is 1/x⁶, 9/x⁸,
// 1/(16x⁸), 1/(4x⁴), 1/(576x¹⁴)).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L=\int_a^b\sqrt{1+\left(\frac{dy}{dx}\right)^2}\,dx" />,
    reason: <>The arc length formula for a curve <Katex tex="y=f(x)" />, from the formula sheet.</>,
  },
  {
    working: <Katex display tex="\left(\frac{dy}{dx}\right)^2=\frac{1}{4x^4} \implies \frac{dy}{dx}=\pm\frac{1}{2x^2}" />,
    reason: <>Compare with the given integrand <Katex tex="\sqrt{1+\tfrac{1}{4x^4}}" />. The square hides the sign, so either sign of the derivative works.</>,
  },
  {
    working: <Katex display tex="y=-\frac{1}{2x}=-\tfrac12x^{-1} \implies \frac{dy}{dx}=\tfrac12x^{-2}=\frac{1}{2x^2}\ \checkmark" />,
    reason: <>Check option D: differentiate using the power rule. Its derivative squared is <Katex tex="\tfrac{1}{4x^4}" />, as required.</>,
    more: <>Or go the other way: an antiderivative of <Katex tex="\tfrac{1}{2x^2}=\tfrac12x^{-2}" /> is <Katex tex="-\tfrac12x^{-1}=-\tfrac{1}{2x}" />, which is option D straight away.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A: }&\ \tfrac{dy}{dx}=-\tfrac{1}{x^3} &\text{B: }&\ \tfrac{dy}{dx}=\tfrac{3}{x^4}\\ \text{C: }&\ \tfrac{dy}{dx}=\tfrac{1}{4x^4} &\text{E: }&\ \tfrac{dy}{dx}=\tfrac{1}{24x^7}\end{aligned}" />,
    reason: <>None of the others has a derivative of <Katex tex="\pm\tfrac{1}{2x^2}" />, so none of them gives the right integrand.</>,
  },
  {
    working: <Katex display tex="\boxed{y=-\frac{1}{2x}}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option C has <Katex tex="\tfrac{dy}{dx}=\tfrac{1}{4x^4}" />, the expression under the square root itself, which forgets that the formula squares the derivative.</>,
  },
]

export default function SpecialistQ9_2023NHT() {
  return (
    <MCQShell
      question={
        <p>
          The length <Katex tex="L" /> of a curve from <Katex tex="x=1" /> to <Katex tex="x=5" /> is given by{' '}
          <Katex tex="\displaystyle\int_1^5\sqrt{1+\frac{1}{4x^4}}\,dx" />.
          <br />
          The equation of the curve could be
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=\dfrac{1}{2x^2}" /> },
        { letter: 'B', content: <Katex tex="y=-\dfrac{1}{x^3}" /> },
        { letter: 'C', content: <Katex tex="y=-\dfrac{1}{12x^3}" /> },
        { letter: 'D', content: <Katex tex="y=-\dfrac{1}{2x}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="y=-\dfrac{1}{144x^6}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
