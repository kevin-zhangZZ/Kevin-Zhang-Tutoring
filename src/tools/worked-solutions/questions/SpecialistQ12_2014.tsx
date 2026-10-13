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
    reason: <>We know <Katex tex="y" /> at <Katex tex="x=1" /> and want it at <Katex tex="x=4" />, so integrate <Katex tex="\tfrac{dy}{dx}" /> from 1 to 4: integrating a derivative gives the change in the function.</>,
  },
  {
    working: <Katex display tex="y(4) = y(1)+\int_1^4\sqrt{2x^6+1}\,dx" />,
    reason: <>Substituting <Katex tex="\tfrac{dy}{dx}=\sqrt{2x^6+1}" /> and rearranging. The initial value sits <em>outside</em> the integral — it is not part of the integrand.</>,
  },
  {
    working: <Katex display tex="\boxed{y(4) = \int_1^4\sqrt{2x^6+1}\,dx+5}" />,
    reason: <>Substituting <Katex tex="y(1)=5" />; the integral can't be found by hand, so it is left unevaluated. Matches option <b>C</b>.</>,
    more: <>Options A and E put the 5 inside the integral, so it is integrated over an interval of length 3: option A equals <Katex tex="\int_1^4\sqrt{2x^6+1}\,dx+15" /> and option E equals <Katex tex="\int_1^4\sqrt{2x^6+1}\,dx-15" />. Option B gives only the <em>change</em> <Katex tex="y(4)-y(1)" />, forgetting the starting value. Option D (15%, the most popular wrong answer) subtracts the starting value instead of adding it.</>,
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
          The general form: if <Katex tex="\tfrac{dy}{dx}=f(x)" /> and <Katex tex="y(a)=b" />,
          then <Katex tex="y(c)=b+\int_a^c f(x)\,dx" />. Use it whenever <Katex tex="f" /> has
          no antiderivative you can find (as with <Katex tex="\sqrt{2x^6+1}" />): the question
          tests only where the initial value goes, not integrating.
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
