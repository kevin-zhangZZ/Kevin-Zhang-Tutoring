// 2022 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 59% correct.
// Two turning points and a point fix three unknown coefficients. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 59, C: 14, D: 11, E: 4 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = x^2+2mx+n" />,
    reason: <>Differentiating <Katex tex="\tfrac13x^3+mx^2+nx+p" />. The leading coefficient is 1, which makes the next step easy.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}f'(-3)=0,\ f'(1)=0\\ \implies f'(x) = (x+3)(x-1)\end{gathered}" />,
    reason: <>At a turning point the gradient is zero, so <Katex tex="x=-3" /> and <Katex tex="x=1" /> are the solutions of <Katex tex="f'(x)=0" />. A quadratic with those roots is <Katex tex="k(x+3)(x-1)" />, and <Katex tex="k=1" /> because the <Katex tex="x^2" /> coefficient of <Katex tex="f'(x)" /> is 1.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}(x+3)(x-1) = x^2+2x-3\\ \implies 2m = 2, \ n = -3\end{gathered}" />,
    reason: <>Equating the <Katex tex="x" /> coefficients and the constant terms with <Katex tex="x^2+2mx+n" />, so <Katex tex="m=1" />. (Alternatively, solve <Katex tex="f'(-3)=0" /> and <Katex tex="f'(1)=0" />, that is <Katex tex="9-6m+n=0" /> and <Katex tex="1+2m+n=0" />, simultaneously.)</>,
  },
  {
    working: <Katex display tex="f(3) = 4: \ \tfrac13(27)+1(9)+(-3)(3)+p = 4" />,
    reason: <>The graph passes through <Katex tex="(3,4)" />, so <Katex tex="f(3)=4" />. Substitute <Katex tex="m=1" /> and <Katex tex="n=-3" />; this fixes the constant <Katex tex="p" />.</>,
  },
  {
    working: <Katex display tex="9+9-9+p = 4 \implies p = -5" />,
    reason: <>Arithmetic.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 1, \ n = -3, \ p = -5}" />,
    reason: <>Matches option <b>B</b>. Option C has the right <Katex tex="n" /> but the wrong sign on <Katex tex="m" />, which would put the turning points at 3 and −1. Option A comes from treating −3 and 1 as <Katex tex="x" />-intercepts instead of turning points: it solves <Katex tex="f(-3)=0" />, <Katex tex="f(1)=0" /> and <Katex tex="f(3)=4" />.</>,
  },
]

export default function MethodsQ16_2022() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="f(x)=\tfrac13x^3+mx^2+nx+p" />, for{' '}
          <Katex tex="m,n,p\in R" />, has turning points at <Katex tex="x=-3" /> and{' '}
          <Katex tex="x=1" /> and passes through the point <Katex tex="(3,4)" />.
          <br />
          The values of <Katex tex="m" />, <Katex tex="n" /> and <Katex tex="p" /> respectively are
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="m=0,\ n=-\tfrac73,\ p=2" /> },
        { letter: 'B', content: <Katex tex="m=1,\ n=-3,\ p=-5" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="m=-1,\ n=-3,\ p=13" /> },
        { letter: 'D', content: <Katex tex="m=\tfrac54,\ n=\tfrac32,\ p=-\tfrac{83}{4}" /> },
        { letter: 'E', content: <Katex tex="m=\tfrac52,\ n=6,\ p=-\tfrac{91}{2}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
