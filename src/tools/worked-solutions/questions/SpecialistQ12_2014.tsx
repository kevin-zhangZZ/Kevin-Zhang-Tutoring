// 2014 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 64% correct.
// Writing a solution of a differential equation as an initial value plus a definite integral. Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 6, C: 64, D: 15, E: 6 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_1^4\frac{dy}{dx}\,dx = y(4)-y(1)" />,
    reason: <>The fundamental theorem of calculus: integrating a derivative recovers the change in the function.</>,
  },
  {
    working: <Katex display tex="y(4) = y(1)+\int_1^4\sqrt{2x^6+1}\,dx" />,
    reason: <>Rearranging. The initial value sits <em>outside</em> the integral — it is not part of the integrand.</>,
  },
  {
    working: <Katex display tex="y(1) = 5" />,
    reason: <>Given.</>,
  },
  {
    working: <Katex display tex="\boxed{y(4) = \int_1^4\sqrt{2x^6+1}\,dx+5}" />,
    reason: <>Matches option <b>C</b>. Options A and E put the <Katex tex="5" /> inside the integral, which would add <Katex tex="5\times3=15" /> instead of 5; option D subtracts it.</>,
  },
]

export default function SpecialistQ12_2014() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\dfrac{dy}{dx}=\sqrt{2x^6+1}" /> and <Katex tex="y=5" /> when{' '}
          <Katex tex="x=1" />, then the value of <Katex tex="y" /> when <Katex tex="x=4" />{' '}
          is given by
        </p>
      }
      background={
        <p>
          There is no elementary antiderivative of <Katex tex="\sqrt{2x^6+1}" />, so the
          question is not asking you to integrate at all — only to arrange the initial
          condition and the definite integral correctly.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\int_1^4\left(\sqrt{2x^6+1}+5\right)dx" /> },
        { letter: 'B', content: <Katex tex="\int_1^4\sqrt{2x^6+1}\,dx" /> },
        { letter: 'C', content: <Katex tex="\int_1^4\sqrt{2x^6+1}\,dx+5" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\int_1^4\sqrt{2x^6+1}\,dx-5" /> },
        { letter: 'E', content: <Katex tex="\int_1^4\left(\sqrt{2x^6+1}-5\right)dx" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
