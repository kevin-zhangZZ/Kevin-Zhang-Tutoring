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
    reason: <>Choose <Katex tex="u=x^4" /> because its derivative, <Katex tex="4x^3" />, matches the <Katex tex="x^3" /> sitting outside the exponential — every option has <Katex tex="e^{2u}" /> or <Katex tex="e^u" />, so <Katex tex="u" /> is in the exponent.</>,
  },
  {
    working: <Katex display tex="x=a \implies u=a^4; \qquad x=b \implies u=b^4" />,
    reason: <>Change the terminals too. Leaving them as <Katex tex="a" /> and <Katex tex="b" /> is the slip in options A and C.</>,
  },
  {
    working: <Katex display tex="\int_a^b x^3e^{2x^4}\,dx = \int_{a^4}^{b^4} e^{2u}\cdot\frac{du}{4}" />,
    reason: <>Replace <Katex tex="x^3\,dx" /> by <Katex tex="\tfrac{du}{4}" />, <Katex tex="x^4" /> by <Katex tex="u" />, and the terminals by their <Katex tex="u" />-values — no <Katex tex="x" /> may remain.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac14\int_{a^4}^{b^4} e^{2u}\,du}" />,
    reason: <>Matches option <b>D</b>: new terminals <Katex tex="a^4,\ b^4" />, the factor <Katex tex="\tfrac14" />, and the exponent still <Katex tex="2u" />.</>,
    more: <>Each distractor gets at least one piece wrong. A (2%) keeps the old terminals and loses the <Katex tex="\tfrac14" />; B (5%) changes the terminals but loses the <Katex tex="\tfrac14" />. C (9%) and E (12%, the most popular wrong answer) come from <Katex tex="u=2x^4" />, where <Katex tex="du=8x^3\,dx" /> and the integral becomes <Katex tex="\tfrac18\int_{2a^4}^{2b^4} e^{u}\,du" />. C forgets to change the terminals; E substitutes <Katex tex="a" /> and <Katex tex="b" /> into <Katex tex="\tfrac{du}{dx}=8x^3" /> instead of into <Katex tex="u=2x^4" />. New terminals always come from the substitution itself: <Katex tex="x=a\implies u=a^4" />.</>,
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
