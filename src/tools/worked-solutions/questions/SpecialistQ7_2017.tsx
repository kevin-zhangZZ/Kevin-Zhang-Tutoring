// 2017 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 60% correct.
// Rewriting ∫₁² x²√(2−x) dx after the substitution u = 2 − x. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 6, C: 20, D: 60, E: 9 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = 2-x \implies x = 2-u,\quad \frac{du}{dx}=-1,\quad dx = -du" />,
    reason: <>Every option is in terms of <Katex tex="u" /> with half-integer powers, which points straight at the substitution that turns the surd into <Katex tex="u^{1/2}" />.</>,
  },
  {
    working: <Katex display tex="x=1 \implies u=1; \qquad x=2 \implies u=0" />,
    reason: <>Change the terminals too. Note they come out <em>reversed</em> — the substitution is decreasing — which is what makes the answer look unusual.</>,
  },
  {
    working: <Katex display tex="x^2\sqrt{2-x} = (2-u)^2 u^{\frac12} = \bigl(4-4u+u^2\bigr)u^{\frac12}" />,
    reason: <>Expanding the square before multiplying through.</>,
  },
  {
    working: <Katex display tex="= 4u^{\frac12}-4u^{\frac32}+u^{\frac52}" />,
    reason: <>Adding <Katex tex="\tfrac12" /> to each index.</>,
  },
  {
    working: <Katex display tex="\int_1^2 x^2\sqrt{2-x}\,dx = \int_1^0\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)(-du)" />,
    reason: <>Substituting everything at once, <Katex tex="dx=-du" /> included.</>,
  },
  {
    working: <Katex display tex="\text{value} = \frac{8}{3}-\frac85+\frac27 = \frac{142}{105}\approx1.35" />,
    reason: <>Not asked for, but a quick numerical check settles any doubt between C and D: the original integrand is positive on <Katex tex="[1,2]" />, so the answer must be positive, and only D is.</>,
  },
  {
    working: <Katex display tex="\boxed{-\int_1^0\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du}" />,
    reason: <>Matches option <b>D</b> — the minus pulled out the front, terminals left as <Katex tex="1" /> to <Katex tex="0" />. Option C (20%) swaps the terminals <em>and</em> flips every sign inside, which reverses it twice and makes it the negative of the truth.</>,
  },
]

export default function SpecialistQ7_2017() {
  return (
    <MCQShell
      question={
        <p>
          With a suitable substitution{' '}
          <Katex tex="\displaystyle\int_1^2 x^2\sqrt{2-x}\,dx" /> can be expressed as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\displaystyle\int_1^2\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_1^2\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int_0^1\left(-4u^{\frac12}+4u^{\frac32}-u^{\frac52}\right)du" /> },
        { letter: 'D', content: <Katex tex="-\displaystyle\int_1^0\left(4u^{\frac12}-4u^{\frac32}+u^{\frac52}\right)du" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\displaystyle\int_1^0\left(4u^{\frac12}-4u^{\frac32}-u^{\frac52}\right)du" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
