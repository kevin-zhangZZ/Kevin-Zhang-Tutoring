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
    working: <Katex display tex="\text{turning points at } -3 \text{ and } 1 \implies f'(x) = (x+3)(x-1)" />,
    reason: <>A monic quadratic with those two roots — no scaling factor is needed.</>,
  },
  {
    working: <Katex display tex="(x+3)(x-1) = x^2+2x-3 \implies 2m = 2, \ n = -3" />,
    reason: <>So <Katex tex="m=1" />. Equivalently, sum of roots <Katex tex="=-2m=-2" /> and product <Katex tex="=n=-3" />.</>,
  },
  {
    working: <Katex display tex="f(3) = 4: \ \tfrac13(27)+1(9)+(-3)(3)+p = 4" />,
    reason: <>The third condition, which fixes the constant.</>,
  },
  {
    working: <Katex display tex="9+9-9+p = 4 \implies p = -5" />,
    reason: <>Arithmetic.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 1, \ n = -3, \ p = -5}" />,
    reason: <>Matches option <b>B</b>. Option C has the right <Katex tex="n" /> but the wrong sign on <Katex tex="m" />, which would put the turning points at 3 and −1.</>,
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
