// 2016 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 73% correct.
// Rewriting ∫ x³e^(2x⁴) dx after the substitution u = x⁴. Question text transcribed from
// the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 5, C: 9, D: 73, E: 12 },
  answer: 'D',
  noAnswer: 0,
  comment: <><Katex tex="u=x^4" /> leads to option D.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = x^4 \implies \frac{du}{dx} = 4x^3 \implies x^3\,dx = \frac{du}{4}" />,
    reason: <>The exponent is <Katex tex="2x^4" />, so <Katex tex="u=x^4" /> is the substitution that tidies it — and conveniently the leftover <Katex tex="x^3" /> is exactly what the derivative supplies.</>,
  },
  {
    working: <Katex display tex="x=a \implies u=a^4; \qquad x=b \implies u=b^4" />,
    reason: <>Change the terminals too. Leaving them as <Katex tex="a" /> and <Katex tex="b" /> gives options A and C.</>,
  },
  {
    working: <Katex display tex="\int_a^b x^3e^{2x^4}\,dx = \int_{a^4}^{b^4} e^{2u}\cdot\frac{du}{4}" />,
    reason: <>Substituting everything at once.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac14\int_{a^4}^{b^4} e^{2u}\,du}" />,
    reason: <>Option D. Note the exponent stays <Katex tex="2u" /> — option E's <Katex tex="e^u" /> would need <Katex tex="u=2x^4" />, which changes the constant to <Katex tex="\tfrac18" /> and the terminals to <Katex tex="2a^4" /> and <Katex tex="2b^4" />, not <Katex tex="8a^3" />.</>,
  },
]

export default function SpecialistQ8_2016() {
  return (
    <MCQShell
      question={
        <p>
          Using a suitable substitution,{' '}
          <Katex tex="\displaystyle\int_a^b x^3e^{2x^4}\,dx" />, where <Katex tex="a" /> and{' '}
          <Katex tex="b" /> are real constants, can be written as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_a^b e^{2u}\,du" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_{a^4}^{b^4} e^{2u}\,du" /> },
        { letter: 'C', content: <Katex tex="\dfrac18\displaystyle\int_a^b e^{u}\,du" /> },
        { letter: 'D', content: <Katex tex="\dfrac14\displaystyle\int_{a^4}^{b^4} e^{2u}\,du" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac18\displaystyle\int_{8a^3}^{8b^3} e^{u}\,du" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
